// *******************************************************************************************
// * 功能初始系统初始化
// * 1.创建主窗体的顶级FrameForm
// * 2.初始化表单导航(butone.FormNav)、业务UI组件工具条(butone.UIComponentToolBar)
// * 
// *
// *******************************************************************************************
define(
		[ "./staticForm" ],
		function(StaticForm) {
			var justep = window.justep;
			if (!justep) {
				throw new Error("justep未加载");
			}
			var butone = window.butone;
			if (!butone) {
				throw new Error("butone未加载");
			}

			/**
			 * 功能管理对象，
			 * 
			 * @param config
			 * @param formDoc
			 */
			var FuncManager = function(config, formDoc) {
				this.config = config;
				var mainForm = this.mainForm = new StaticForm(formDoc, window);
				//当URL中含有参数 dataAutoLoad，并且值为 false的时候，不自动打开数据集
				mainForm.openParams.closeAutoLoad = !!justep.Request.URLParams['closeAutoLoad'];
				
				window.__onBeforeClose = function(close) {
					mainForm.refreshControls();
					if (mainForm.isChanged()
							&& !justep.Context.isReadonlyMode()) {
						new justep.System.showMessage().open({
							msg : "是否保存数据?",
							title : "提示信息",
							type : 2,
							callback : function(event) {
								if (event.status == "cancel")
									return;
								if (event.status == "yes") {
									mainForm.saveDatas({
										"onSuccess" : function(event) {
											close();
										},
										"onError" : function(err) {
											var msg = err;
											if (msg && typeof msg == "object") {
												msg = msg.message
														|| err.errorNode;
											}
											new justep.System.showMessage()
													.open({
														img : "error",
														msg : msg,
														title : "提示信息",
														type : 0
													});
										}
									});
								} else {
									close();
								}
							}
						});
					} else {
						close();
					}
				};
				// 绑定数据改变事件,只需绑定主表。明细表的变化会级联给主表
				this.config = config;
				this.dataOperations = {
					"save" : justep.xbl("btnSave"),
					"new" : justep.xbl("btnAppend"),
					"delete" : justep.xbl("btnDelete"),
					"refresh" : justep.xbl("btnRefresh")
				};

				if (!butone.Context.waitForReceiveData()) {
					mainForm.init();
				}
			};

			FuncManager.prototype.destroy = function() {
				this.mainForm.destroy();
			};

			FuncManager.prototype.saveDatas = function() {
				this.mainForm.saveDatas();
			};

			/**
			 * 刷新数据
			 * 
			 * @param event
			 */
			FuncManager.prototype.refreshData = function() {
				this.mainForm.refreshData();
			};

			/**
			 * 构造树列表容
			 */
			FuncManager.prototype.initFormNav = function() {
				var defaultForm, navs = this.config.navs, $container = $('#formNav'), cnt = 0, activeNav = 0;
				var autoOpen = !!this.config.floatView && !!this.config.floatView.autoOpen && (this.config.floatView.autoOpen === "false" ? false : true);
				if (autoOpen) {
					this.openFloatView(this.config.floatView);
				}
				for ( var navIdx in navs) {
					var nav = navs[navIdx];
					$container
							.append("<div class='tree-group-name'><h5 style='padding-left:2em;'>"
									+ nav.name + "</h5></div>");
					var $nav = $("<ul style='padding:0px' class='tree-form-ul'></ul>");
					$container.append($nav);
					for ( var formIdx in nav.forms) {
						var config = nav.forms[formIdx];
						if (config.isDefault && !defaultForm) {
							defaultForm = config;
							activeNav = navIdx;
						}
						var $li = $("<li><span class='formicon'></span><a>"
								+ config.name + "</a></li>");
						cnt++;
						$nav.append($li);
						config.jQNode = $li;
						$li.data("config", config);
						$li.bind("click", $.proxy(function(event) {
							if ($(event.currentTarget).hasClass("selected"))
								return;
							var prev = $(".selected", $container);
							if (prev.length > 0) {
								// 如果前一个表单正在加载中
								if (!prev.data("config").form)
									return;
								prev.removeClass("selected");
							}
							var cfg = $(event.currentTarget).data("config");
							this.showForm(cfg);
						}, this));
					}
				}

				if (!defaultForm) {
					for ( var navIdx in navs) {
						var nav = navs[navIdx];
						for ( var formIdx in nav.forms) {
							defaultForm = nav.forms[formIdx];
							activeNav = navIdx;
							break;
						}
					}
				}

				if (defaultForm) {
					defaultForm.jQNode.click();
				} else {
					$container.append("<h2 style='color:red'>环节未设置工作表单</h2>");
				}
				$container.accordion({
					header : "div",
					active : parseInt(activeNav),
					autoHeight : false,
					icons : {
						header : "ui-icon-circle-arrow-e",
						headerSelected : "ui-icon-circle-arrow-s"
					}
				});
				if (cnt === 1) {
					$(".xui-splitter-handler-h", "#mainHSplitter").hide();
					justep.xbl("mainHSplitter").moveToStart();
				}
			};

			FuncManager.prototype.openFloatView = function(config) {
				var $floatView = $("#floatView");
				$(
						"<div class='xui-autofill' style='width:99%;margin:0 auto' id='"
								+ config.id + "'/>").css({
					height : config.height
				}).appendTo($floatView);
				var css = {
					top : config.top,
					right : config.right,
					width : config.width
				};
				$floatView.css(css).panel({
					anchor : [ "R" ],
					title : config.name,
					enableDrag : true
				});

				var view = new justep.WindowFrame(config.id, config.url);
				var mainForm = this.mainForm;
				mainForm.initDeferred.done(function() {
					var options = {
						data : {
							'form' : mainForm
						}
					};
					view.open2(options);
				});
				$floatView.show();
			};
			
			/**
			 * 切换表单
			 * 
			 * @param form
			 */
			FuncManager.prototype.showForm = function(config) {
				var prevForm = this.mainForm.currentForm;
				if (prevForm) {
					if (prevForm == config.form)
						return;
					// 触发表单切换前
					if (this.mainForm.formDoc.checkEvent("onBeforeChangeForm")) {
						var event = {
							from : prevForm,
							to : config.form,
							cancel : false
						};
						this.mainForm.formDoc.callEvent("onBeforeChangeForm",
								[ event ]);
						if (event.cancel) {
							prevForm.config.jQNode.addClass('selected');
							return;
						}

					}
					// 隐藏前一个窗体 iframe所属的div
					$(prevForm.config.frameDiv).hide();
				}
				config.jQNode.addClass('selected');
				if (config.form) {
					// 强制刷新
					$(config.frameDiv).show();
					this.changeBindingForm(config.form);
				} else {
					this.initForm(config);
				}
			};

			/**
			 * 初始化表单
			 * 
			 * @param form
			 */
			FuncManager.prototype.initForm = function(config) {
				if ($("#" + config.id).length > 0)
					return;
				$('#formView').append(
						"<div class='xui-autofill' style='width:99%;margin:0 auto' id='"
								+ config.id + "'/>");
				config.frameDiv = $('#' + config.id);

				// 创建form对应的视图(WindowFrame)
				$("#statusPanel").css("display", "inherit");
				var view = new justep.WindowFrame(config.id, config.url, null,
						null, $.proxy(this._onReceiveFormInited, this));
				var mainForm = this.mainForm;
				mainForm.initDeferred.done(function() {
					var options = {
						data : {
							'form' : mainForm,
							'config' : config,
							'openParams' : mainForm.openParams
						}
					};
					view.open2(options);
				});
			};

			/**
			 * 刷新操作与控制表的关系
			 * 
			 * @param win
			 * @param optName
			 * @param controlData
			 */
			FuncManager.prototype._refreshOperationControl = function(win, btn,
					optName, controlData) {
				var store = controlData.getStore();
				for ( var i in store.columnIds) {
					var control = store.columnIds[i];
					if (optName.indexOf(control) == 0) {
						var binding = new win.xforms.Binding("instance('"
								+ controlData.id + "')/" + control);
						var xformsObject = btn.domNode.xformsObject;
						xformsObject.binding = binding;
						xformsObject.hasBinding = true;
						var ctx = new win.xforms.ExprContext();
						btn.build(ctx);
						btn.refresh();
						controlData.setValue(control, justep.Utils
								.randomString());
						return;
					}
				}
			};

			FuncManager.prototype.changeBindingForm = function(form) {
				this.mainForm.currentForm = form;
				form.active();
				var uiToolbar = this.mainForm.formDoc.formUIToolbar;
				uiToolbar.init(form.formUIPlugins, true);

				var me = form, mainData = form.formDoc.mainData;
				var operationOwner = mainData ? me.xbl(mainData.id) : undefined;
				$(".mainData", "#rootView").css("display",
						operationOwner ? "inline-table" : "none");
				var controlData = operationOwner ? me.xbl("control_"
						+ operationOwner.id) : null;
				for ( var optName in this.dataOperations) {
					var btn = this.dataOperations[optName];
					var xformsObject = btn.domNode.xformsObject;
					if (xformsObject.operation) {
						xformsObject.operation.unregisterObserver(xformsObject);
						xformsObject.binding = undefined;
						xformsObject.hasBinding = false;
					}
					var operation;
					if (operationOwner)
						operation = operationOwner.getOperation(optName);
					xformsObject.operation = operation;

					if (!operation) {
						btn.$el.hide();
					} else {
						if (operation.getVisible()) {
							btn.$el.show();
						} else {
							btn.$el.hide();
						}
						operation.registerObserver(xformsObject);
						btn.setDisabled(!operation.getEnable()
								|| optName !== "refresh"
								&& operationOwner.getInstance().readonly);
						if (controlData != null) {
							this._refreshOperationControl(form.contentWindow,
									btn, optName, controlData);
						}
					}
				}
				var btnSearch = justep.xbl("btnSearch"), searchxformsObject = btnSearch.domNode.xformsObject;
				if (searchxformsObject.operation) {
					searchxformsObject.operation
							.unregisterObserver(searchxformsObject);
					searchxformsObject.operation = null;
				}
				debugger;
				if (operationOwner) {
					// btnSearch.setDisabled(false);
					var filterMenu = justep.xbl("filterMenu");
					filterMenu.filterData = operationOwner;
					searchxformsObject.operation = filterMenu
							.getOperation("show");
					searchxformsObject.operation
							.registerObserver(searchxformsObject);
					var dataSmartFilter = justep.xbl("dataSmartFilter");
					dataSmartFilter.filterDataID = operationOwner.id;
					dataSmartFilter.filterData = operationOwner;
					dataSmartFilter.filterRelations = mainData.filterRelations;
					if (mainData.filterRelations) {
						$(dataSmartFilter.domNode).show();
					} else {
						$(dataSmartFilter.domNode).hide();
					}
					// 还原之前的smartFilter的值
					dataSmartFilter.getInnerInput().input.value = operationOwner._smartFilterValue
							|| "";
					if($(".xui-borderlayout-top").attr("size")=='0px'){
						$(".xui-borderlayout-top").show();
						$(".xui-borderlayout-top").attr('size', '38px');
						$(".xui-borderlayout-center").css('top', '38px');
						$(".xui-borderlayout-center").css('width', "100%");
						$(".xui-borderlayout-center").css('height', "100%");
						$(".xui-borderlayout-center").resize(function() {
							$(".xui-borderlayout-center").css('top', '38px');
							$(".xui-borderlayout-center").css('width', "100%");
							$(".xui-borderlayout-center").css('height', "100%");
						});
					}
				} else {
					var dataSmartFilter = justep.xbl("dataSmartFilter");
					dataSmartFilter.getInnerInput().input.value = "";
					
					//环节表单主表静态和环节UI组件的都没有按钮的情况下隐藏工具栏
					var $uiPluginBar = $("ul", "#uiPluginBar").children();
					var $formUIPluginBar = $("ul", "#formUIPluginBar").children();
					var hasChild = $uiPluginBar.length || $formUIPluginBar.length;
					
					if(!hasChild){
						$(".xui-borderlayout-top").hide();
						$(".xui-borderlayout-top").attr('size', '0px');
						$(".xui-borderlayout-center").css('top', '0px');
						$(".xui-borderlayout-center").css('width', "100%");
						$(".xui-borderlayout-center").css('height', "100%");
						$(".xui-borderlayout-center").resize(function() {
							$(".xui-borderlayout-center").css('top', '0px');
							$(".xui-borderlayout-center").css('width', "100%");
							$(".xui-borderlayout-center").css('height', "100%");
						});						
					}

				}
			};

			FuncManager.prototype._onReceiveFormInited = function(event) {
				var data = event.data, frameForm = data.source;
				if (data.kind == "initFinish") {
					$("#statusPanel").css("display", "none");
					this.changeBindingForm(frameForm);
				}
				justep.xbl("funcReceiver").sendData(data);
			};
			/**
			 * UIComponentToolBar组件工具条
			 * 
			 * @param barId
			 */

			butone.UIComponentToolBar = function(barId) {
				this.barId = barId;
			};

			butone.UIComponentToolBar.prototype.init = function(uiPlugins,
					clear) {
				var me=this;
				var bar = $("ul", "#" + this.barId);
				if (clear)
					bar.empty();
				if (!uiPlugins)
					return;
				require(
						[ "base/plugins/Trigger", "base/plugins/MenuButton" ],
						function(Trigger, MenuButton) {
							for ( var n in uiPlugins) {
								var uiPlugin = uiPlugins[n];
								var $node, instance;
								if (uiPlugin.declaredClass == "base/plugins/MenuButton") {
									instance = new MenuButton(null, uiPlugin);
								} else {
									instance = new Trigger(null, uiPlugin);
								}
								$node = $(instance.domNode);
								var $li = $("<li></li>");
								$li.append($node);
								bar.append($li);
								bar
										.append("<li class='space nosep' style='margin: 0 4px;'>|</li>");
							}
						}, function(err) {
							alert(err);
						});
			};

			return FuncManager;

		});
