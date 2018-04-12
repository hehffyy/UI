// *******************************************************************************************
// * 功能初始系统初始化
// * 1.创建主窗体的顶级FrameForm
// * 2.初始化表单导航(butone.FormNav)、业务UI组件工具条(butone.UIComponentToolBar)
// * 
// *
// *******************************************************************************************
define(
		[ "base/core/template/prepBizRec/statictemplate/staticForm" ],
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
				var mainForm = this.mainForm = new StaticForm(formDoc, window);
				window.__onBeforeClose = function(close) {
					mainForm.refreshControls();
					mainForm.xbl('funcReceiver').sendData(null);
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
				// 绑定数据改变事件,只需绑定主表。明细表的变化会级联给主表
				this.config = config;
				if (!butone.Context.waitForReceiveData()) {
					mainForm.init();
				}
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

			FuncManager.prototype.setFormVisible = function(guid, visible) {
				var $li = $("li[id='form_" + guid + "']", '#formNav'), hideNav = true;
				visible ? $li.show() : $li.hide();
				$li.siblings().each(function() {
					if ($(this).css("display") != "none") {
						hideNav = false;
						return false;
					}
				});
				if (!visible && hideNav) {
					$($li.parents("div.tree-group")[0]).hide();
				} else {
					$($li.parents("div.tree-group")[0]).show();
				}
			};
			/**
			 * 构造树列表容
			 */
			FuncManager.prototype.initFormNav = function() {
				var defaultForm, navs = this.config.navs, $container = $('#formNav'), cnt = 0, activeNav = 0;
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
						// 修改 去掉左侧导航图标
						// var $li = $("<li><span class='formicon'></span><a>"
						var $li = $("<li><a>" + config.name + "</a></li>");
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

				// 初始化材料
				this._initMaterialNav();
				// 创建accordion
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
				}
				justep.xbl("funcReceiver").sendData(data);
			};

			FuncManager.prototype.changeBindingForm = function(form) {
				this.mainForm.currentForm = form;
				form.active();
				var uiToolbar = this.mainForm.formDoc.formUIToolbar;
				uiToolbar.init(form.formUIPlugins, true);
			};

			/**
			 * *********************************************************要件信息导航*******************************************************************
			 */

			FuncManager.prototype._initMaterialNav = function(option) {
				var $container = $('#formNav'), materialAuths = this.mainForm.formDoc.materialAuths
						|| "";
				var title = "<div class='tree-group-name'><h5  id='matNumId' style='padding-left:2em;  '>要件</h5><span>";
				if (materialAuths.toString().indexOf("up") != -1
						&& !justep.Context.isReadonlyMode()) {
					title += "<a title='点击上传' class='group-up' name='up'><i class='iconfont'>&#xf00d4;</i></a>";
				}
				title += "<a title='点击刷新' class='group-refresh' name='refresh'><i class='iconfont'>&#xe601;</i></a>";
				title += "</span></div><ul class='tree-form-ul' id='materialList'  style='padding:0px;white-space:nowrap;text-overflow:ellipsis;'></ul>";
				var title = $(title);
				$container.append(title);
				$("a", title)
						.bind("click", $.proxy(this.materialOperate, this))
						.css({
							padding : "0px 5px",
							display : "inline",
							fontSize : "18px"
						});
				this.refreshMaterial();
			};

			FuncManager.prototype.materialOperate = function(event) {
				var opt = $(event.currentTarget).attr("name");
				if (opt == "up") {
					this.materialManager();
				} else if (opt == "refresh") {
					this.refreshMaterial();
				}
			};

			FuncManager.prototype.refreshMaterial = function() {
				var me = this, $container = $('#formNav'), $ul = $(
						"#materialList", $container);
				var isShowFiles = false;// 是否显示要件附件
				$ul.empty();
				var param = new justep.Request.ActionParam();
				var bizRecId = me.mainForm.BizRec.loaded? me.mainForm.BizRec.getID(): justep.Request.URLParams["bizRecId"];
				param.setString("bizRecId",bizRecId);
				justep.Request
						.sendBizRequest2({
							async : true,
							dataType : "json",
							parameters : param,
							action : 'getBizRecMaterialListAction',
							callback : function(result) {
								if (result.state) {
									var materials = result.response.materials;
									var total = result.response.total;
									var had = result.response.had;
									$('#matNumId').html(
											'要件(' + had + '/' + total + ')');
									materials = eval(materials);
									for ( var i = 0; i < materials.length; i++) {
										var material = materials[i];
										var $li = $('<li><span>' + '('
												+ material.numb + ')'
												+ '</span><a title="'
												+ material.fMaterialName + '">'
												+ material.fMaterialName
												+ '</a></li>');
										$li.data("material", material);

										// 区县版，材料不上传，只显示
										if (isShowFiles) {
											var $files = $("<ul class='ul-material'></ul>");
											if (material.fDocIds != null) {
												var docs = eval(material.fDocIds);
												for ( var j = 0; j < docs.length; j++) {
													var doc = docs[j];
													var $file = $("<li><a title='"
															+ doc.docName
															+ "'>"
															+ doc.docName
															+ "</a></li>");
													$file.data("doc", doc);
													$files.append($file);
												}
												$li.append($files);
											}
										}

										$ul.append($li);

									}
									$(">li>a", $ul)
											.bind(
													"click",
													$
															.proxy(
																	function(
																			event) {
																		this
																				.browserMaterial($(
																						event.currentTarget.parentNode)
																						.data(
																								"material"));
																	}, me));
									$(">li>ul>li>a", $ul)
											.bind(
													"click",
													$
															.proxy(
																	function(
																			event) {
																		this
																				.openFile($(
																						event.currentTarget.parentNode)
																						.data(
																								"doc"));
																	}, me));
								}
							}
						});

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
					var materialTemplate = me.mainForm.formDoc.materialTemplate;
					var url,param="";
					if(me.mainForm.formDoc.treeMaterial){
						if(!!materialTemplate && 'userCustom'==materialTemplate){
							url = "/UI/base/core/components/materialUser/treeMaterialManager.w";
						}else{
							url = "/UI/base/core/components/material/treeMaterialManager.w";
						}
						if(typeof me.mainForm.formDoc.getRelBizRecIds == "function")
							param = "relBizRecIds=" + me.mainForm.formDoc.getRelBizRecIds(me.mainForm.BizRec.getID()) + "&";
					}else{
						if(!!materialTemplate && 'userCustom'==materialTemplate){
							url = "/UI/base/core/components/materialUser/materialManager.w";
						}else{
							url = "/UI/base/core/components/material/materialManager.w";
						}
					}
					url += "?" + param + "fBizRecId="+ me.mainForm.BizRec.getID()+ "&materialAuths="+ materialAuths;
					
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
