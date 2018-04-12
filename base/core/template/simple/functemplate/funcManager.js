// *******************************************************************************************
// * 功能初始系统初始化
// * 1.创建主窗体的顶级FrameForm
// * 2.初始化表单导航(butone.FormNav)、业务UI组件工具条(butone.UIComponentToolBar)
// * 
// *
// *******************************************************************************************
define(
		[ "base/core/template/default/statictemplate/staticForm" ],
		function(StaticForm) {
			if (!justep) {
				throw new Error("justep未加载");
			}

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
				this.mainForm = new StaticForm(formDoc, window);
				this.mainForm.init();
				// 绑定数据改变事件,只需绑定主表。明细表的变化会级联给主表
				this.config = config;
			};

			FuncManager.prototype.destroy = function() {
				this.mainForm.destroy();
			};

			FuncManager.prototype.saveDatas = function() {
				return this.mainForm.saveDatas();
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
				var defaultForm, navs = this.config.navs, $container = $('#'
						+ this.config.formNavID), cnt = 0, activeNav = 0;
				for ( var navIdx in navs) {
					var nav = navs[navIdx];
					$container
							.append("<div class='tree-group-name'><h5 style='padding-left:2em;'>"
									+ nav.name + "</h5></div>");
					var $nav = $("<ul style='padding:0px' class='tree-form-ul'></ul>");
					$container.append($nav);
					nav.jQNode = $nav;
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
							debugger;
							if ($(event.currentTarget).hasClass("selected"))
								return;
							var prev = $(".selected", $container);
							if (prev.length > 0) {
								// 如果前一个表单正在加载中
								// if (!prev.data("config").form)
								// return;
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

			/**
			 * 构造树列表容
			 */
			FuncManager.prototype.initExtendFormNav = function(jqGroup) {
				var defaultForm, navs = this.config.extendNavs, $container = $('#'
						+ this.config.formNavID), cnt = 0, activeNav = 0;
				if (navs == null)
					return;
				for ( var formIdx in navs.forms) {
					var config = navs.forms[formIdx];
					if (config.isDefault && !defaultForm) {
						defaultForm = config;
						activeNav = navIdx;
					}
					var $li = $("<li><span class='formicon'></span><a>"
							+ config.name + "</a></li>");
					cnt++;
					jqGroup.append($li);
					config.jQNode = $li;
					$li.data("config", config);
					$li.bind("click", $.proxy(function(event) {
						if ($(event.currentTarget).hasClass("selected"))
							return;
						var prev = $(".selected", $container);
						if (prev.length > 0) {
							prev.removeClass("selected");
						}
						var cfg = $(event.currentTarget).data("config");
						if (cfg.beforeClick)
							cfg.beforeClick();
						this.showForm(cfg);
					}, this));
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

			};

			/**
			 * 切换表单
			 * 
			 * @param form
			 */
			FuncManager.prototype.showForm = function(config) {
				config.jQNode.addClass('selected');
				var prevForm = this.mainForm.currentForm;
				if (prevForm) {
					if (prevForm == config.form)
						return;
					// 强制保存
					// prevForm.saveDatas();
					// 触发表单切换前
					if (this.onBeforeChangeForm) {
						var event = {
							from : prevForm,
							to : config.form,
							cancel : false
						};
						this.onBeforeChangeForm(event);
						if (event.cancel)
							return;
					}
					// 隐藏前一个窗体 iframe所属的div
					$(prevForm.config.frameDiv).hide();
				}
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
				$('#' + this.config.formViewID).append(
						"<div class='xui-autofill' style='width:99%;margin:0 auto' id='"
								+ config.id + "'/>");
				config.frameDiv = $('#' + config.id);

				// 创建form对应的视图(WindowFrame)
				$("#statusPanel").css("display", "inherit");
				var view = new justep.WindowFrame(config.id, config.url, true,
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
						btn.binding = binding;
						btn.hasBinding = !!binding;
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
				if (form.active) {
					form.active();

					var uiToolbar = this.mainForm.formDoc.formUIToolbar;
					uiToolbar.init(form.formUIPlugins, true);
				}
			};

			FuncManager.prototype._onReceiveFormInited = function(event) {
				debugger;
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
				debugger;
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
