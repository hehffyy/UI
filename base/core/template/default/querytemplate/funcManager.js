// *******************************************************************************************
// * 功能初始系统初始化
// * 1.创建主窗体的顶级FrameForm
// * 2.初始化表单导航(butone.FormNav)、业务UI组件工具条(butone.UIComponentToolBar)
// * 
// *
// *******************************************************************************************
define(
		[ "./queryForm" ],
		function(QueryForm) {
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
				this.mainForm = new QueryForm(formDoc, window);
				this.mainForm.openParams.closeAutoLoad = !!justep.Request.URLParams['closeAutoLoad'];
				this.config = config;
				if (!butone.Context.waitForReceiveData()) {
					this.mainForm.init();
				}
			};

			FuncManager.prototype.destroy = function() {
				this.mainForm.destroy();
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
				var navs = this.config.navs;
				if (navs.length > 0)
					if (navs[0].forms.length > 0) {
						var config = navs[0].forms[0];
						config.jQNode = $("<a></a>");
						config.frameDiv = $("<div></div>");
						this.showForm(config);
					}
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

			FuncManager.prototype.changeBindingForm = function(form) {
				this.mainForm.currentForm = form;
				form.active();

				var uiToolbar = this.mainForm.formDoc.formUIToolbar;
				uiToolbar.init(form.formUIPlugins, true);

				var me = form, mainData = form.formDoc.mainData;
				var operationOwner = mainData ? me.xbl(mainData.id) : undefined;
				$(".mainData", "#rootView").css("display",
						operationOwner ? "inline-table" : "none");
				// 刷新
				var btnRefresh = justep.xbl("btnRefresh");
				if (btnRefresh.operation) {
					btnRefresh.operation.unregisterObserver(btnRefresh);
				}
				var operation;
				if (operationOwner)
					operation = operationOwner.getOperation("refresh");
				btnRefresh.operation = operation;
				if (operation) {
					operation.registerObserver(btnRefresh);
					if (!justep.String.trim(btnRefresh.getLabel()))
						btnRefresh.setLabel(operation.getLabel());
				} else {
					btnRefresh.setDisabled(true);
				}

				// 高级查询
				var btnSearch = justep.xbl("btnSearch");
				if (btnSearch.operation) {
					btnSearch.operation.unregisterObserver(btnSearch);
					btnSearch.operation = null;
				}

				// 智能模糊查询
				var dataSmartFilter = justep.xbl("dataSmartFilter");
				if (operationOwner) {
					btnSearch.setDisabled(false);
					var filterMenu = justep.xbl("filterMenu");
					filterMenu.filterData = operationOwner;
					btnSearch.operation = filterMenu.getOperation("show");
					btnSearch.operation.registerObserver(btnSearch);

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
				} else {
					dataSmartFilter.getInnerInput().input.value = "";
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
