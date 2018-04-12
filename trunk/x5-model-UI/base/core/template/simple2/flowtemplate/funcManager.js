// *******************************************************************************************
// * 功能初始系统初始化
// * 1.创建主窗体的顶级FrameForm
// * 2.初始化表单导航(butone.FormNav)、业务UI组件工具条(butone.UIComponentToolBar)
// * 
// *
// *******************************************************************************************
define(
		[ "base/core/template/default/flowtemplate/frameForm" ],
		function(FrameForm) {

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
				// 绑定数据改变事件,只需绑定主表。明细表的变化会级联给主表
				this.config = config;
				var mainForm = this.mainForm = new FrameForm(formDoc, window);
				window.__onBeforeClose = function(close) {
					mainForm.refreshControls();
					if (mainForm.BizRec.isChanged("all")
							&& !justep.Context.isReadonlyMode()) {
						new justep.System.showMessage().open({
							msg : "是否保存数据?",
							title : "提示信息",
							type : 3,
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
				mainForm.init();
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

			FuncManager.prototype.getAllForms = function() {
				var ret = [];
				for ( var navIdx in this.config.navs) {
					var nav = this.config.navs[navIdx];
					for ( var formIdx in nav.forms) {
						if (nav.forms[formIdx].isDefault)
							continue;
						ret.push(nav.forms[formIdx]);
					}
				}
				return ret;
			};

			FuncManager.prototype.queryVisibleForms = function(checkMainForm) {
				// 构造参数
				var params = new justep.Request.ActionParam();
				params.setString("bizRecId", justep.Context.getProcessData1());
				if (!checkMainForm && this.mainForm.formDoc
						.checkEvent("onBeforeCheckVisibleForms")) {

					var event = {
						source : this.mainForm,
						checkMainForm : checkMainForm,
						allForms : this.getAllForms(),
						visibleForms : [],
						variables : new justep.Request.MapParam()
					};
					this.mainForm.formDoc.callEvent(
							"onBeforeCheckVisibleForms", [ event ]);
					params.setMap("variables", event.variables
							|| new justep.Request.MapParam());
					if (event.visibleForms.length > 0) {
						return event.visibleForms;
					}
				}
				// 调用动作
				var ret;
				justep.Request.sendBizRequest2({
					"dataType" : "application/json",
					"action" : "queryActivityVisibleFormsAction",
					"parameters" : params,
					"async" : false,
					"callback" : function(callbackData) {
						callbackData.ignoreError = false;
						if (callbackData.state) {
							ret = callbackData.response;
						}
					}
				});
				return ret;
			};
			/**
			 * 构造树列表容
			 */
			FuncManager.prototype.initFormNav = function() {
				var defaultForm, navs = this.config.navs;
				var autoOpen = !!this.config.floatView
						&& !!this.config.floatView.autoOpen
						&& (this.config.floatView.autoOpen === "false" ? false
								: true);
				if (autoOpen) {
					this.openFloatView(this.config.floatView);
				}
				var visableForm = this.queryVisibleForms(true);
				for ( var navIdx in navs) {
					var nav = navs[navIdx];
					for ( var formIdx in nav.forms) {
						var config = nav.forms[formIdx];
						if (config.isDefault
								&& justep.Array.contain(visableForm, config.id)) {
							this.showForm(config);
							return;
						}
					}
				}
			};

			// 手动设置表单的显示状态
			FuncManager.prototype.setFormVisible = function(guid, visible) {

			};

			// 切换表单
			FuncManager.prototype.changeToForm = function(pid) {

			};

			FuncManager.prototype.openFloatView = function(config) {
				var $floatToolbars = $("#floatToolbars");
				$(
						"<div class='xui-autofill' style='width:100%;margin:0 auto' id='"
								+ config.id + "'/>").css({
					height : config.height
				}).appendTo($floatToolbars);
				var css = {
					top : config.top,
					right : config.right,
					width : config.width
				};
				$floatToolbars.css(css).panel({
					anchor : [ "R" ],
					title : config.name,
					enableDrag : true,
					enableExpand : false
				});

				var view = new justep.WindowFrame(config.id, config.url, null);
				var mainForm = this.mainForm;
				mainForm.initDeferred.done(function() {
					var options = {
						data : {
							'form' : mainForm
						}
					};
					view.open2(options);
				});
				$floatToolbars.show();
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
							return;
						}

					}
					// 隐藏前一个窗体 iframe所属的div
					$(prevForm.config.frameDiv).hide();
				}
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
				var formViewContainer = $("#formView");
				if ($("#" + config.id, formViewContainer).length > 0)
					return;
				formViewContainer
						.append("<div class='xui-autofill' style='width:100%;margin:0 auto' id='"
								+ config.id + "'/>");
				config.frameDiv = $('#' + config.id);

				// 创建form对应的视图(WindowFrame)
				$("#statusPanel").css("display", "inherit");
				var url = justep.Context.isReadonlyMode() ? config.url
						+ "?activity-pattern=detail" : config.url;
				var view = new justep.WindowFrame(config.id, url, null, null, $
						.proxy(this._onReceiveFormInited, this));
				var mainForm = this.mainForm;
				mainForm.initDeferred.done(function() {
					var options = {
						data : {
							'form' : mainForm,
							'config' : config
						}
					};
					view.open2(options);
				});
			};

			FuncManager.prototype._onReceiveFormInited = function(event) {
				var data = event.data, frameForm = data.source;
				if (data.kind == "initFinish") {
					$("#statusPanel").css("display", "none");
					this.changeBindingForm(frameForm);
					if (this.mainForm.formDoc.checkEvent("onFormInitFinish")) {
						this.mainForm.formDoc.callEvent("onFormInitFinish", [ {
							source : this,
							form : frameForm
						} ]);
					}
				}
				justep.xbl("funcReceiver").sendData(data);
			};

			FuncManager.prototype.changeBindingForm = function(form) {
				this.mainForm.currentForm = form;
				form.active();
			};

			/**
			 * 要件浏览
			 * 
			 * @param material
			 */
			FuncManager.prototype.browserMaterial = function(material) {
				var url = "/UI/base/core/components/material/materialBrowse.w?fBizRecId="
						+ justep.xbl('BizRec').getID()
						+ "&fMaterialName="
						+ material.fMaterialName;
				butone.Window.run(url, justep.Context.getCurrentProcessLabel()
						+ "-材料浏览");
			};

			/**
			 * 材料维护
			 */
			FuncManager.prototype.materialManager = function() {
				var me = this;
				me.mainForm.saveDatas().done(function(){
					var materialAuths = me.mainForm.formDoc.materialAuths;
					var url = "/UI/base/core/components/material/materialManager.w?fBizRecId="
							+ me.mainForm.BizRec.getID()
							+ "&materialAuths="
							+ materialAuths;
					butone.Window.run(url, "材料维护", null, null, function(event) {
						me.refreshMaterial();
					});
				});
			};

			FuncManager.prototype.openFile = function(doc) {
				var reqs = [ "system/service/doc/docUtil2" ];
				butone.Loader.requireJS(reqs, function() {
					justep.doc.InnerUtils.browseDocByFileID(doc.docPath,
							doc.docName, doc.fileID);
				});
			};

			return FuncManager;
		});
