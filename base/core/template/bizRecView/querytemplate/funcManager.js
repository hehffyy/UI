// *******************************************************************************************
// * 功能初始系统初始化
// * 1.创建主窗体的顶级FrameForm
// * 2.初始化表单导航(butone.FormNav)、业务UI组件工具条(butone.UIComponentToolBar)
// * 
// *
// *******************************************************************************************
define(
		[ "base/core/template/bizRecView/querytemplate/queryForm" ],
		function(QueryForm) {
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
				this.mainForm = new QueryForm(formDoc, window);
				if (!butone.Context.waitForReceiveData()) {
					this.mainForm.init();
				}
				// 绑定数据改变事件,只需绑定主表。明细表的变化会级联给主表
				this.config = config;

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

			FuncManager.prototype._queryVisibleForms = function() {
				// 构造参数
				var params = new justep.Request.ActionParam();
				params.setString("bizRecId",
						justep.Request.URLParams["bizRecId"]);
				params.setMap("variables", null);
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
				var defaultForm, navs = this.config.navs, $container = $('#formNav'), cnt = 0, activeNav = 0;
				var autoOpen = this.config.floatView && (!this.config.floatView.hasOwnProperty("autoOpen") || this.config.floatView.autoOpen);
				if (autoOpen) {
					this.openFloatView(this.config.floatView);
				}
				var visibleForms = this._queryVisibleForms();
				for ( var navIdx in navs) {
					var nav = navs[navIdx];
					$container
							.append("<div class='tree-group-name'><h5 style='padding-left:2em;'>"
									+ nav.name + "</h5></div>");
					var $nav = $("<ul style='padding:0px' class='tree-form-ul'></ul>");
					$container.append($nav);
					for ( var formIdx in nav.forms) {
						var config = nav.forms[formIdx];
						if (visibleForms != null
								&& !justep.Array.contain(visibleForms,
										config.id))
							continue;
						if (config.isDefault && !defaultForm) {
							defaultForm = config;
							activeNav = navIdx;
						}
						// name属性用于setFormVisible
						var $li = $("<li name=" + config.id + "><a>"
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
					// 如果不存在表单，移除
					if ($nav.children().length == 0) {
						$nav.prev("div").remove();
						$nav.remove();
					}
				}

				if (!defaultForm) {
					for ( var navIdx in navs) {
						var nav = navs[navIdx];
						for ( var formIdx in nav.forms) {
							var config = nav.forms[formIdx];
							if (visibleForms != null
									&& !justep.Array.contain(visibleForms,
											config.id))
								continue;
							defaultForm = config;
							activeNav = navIdx;
							break;
						}
					}
				}

				if (defaultForm) {
					defaultForm.jQNode.click();
				} else {
					$container.append("<h2 style='color:red'>没有可见表单</h2>");
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
				var view = new justep.WindowFrame(config.id, config.url
						+ "?activity-pattern=detail", null, null, $.proxy(
						this._onReceiveFormInited, this));
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
				var title = "<div class='tree-group-name'><h5 style='padding-left:2em;'>材料列表</h5><span>";
				if (materialAuths.toString().indexOf("up") != -1
						) {
					title += "<a title='点击上传' class='group-up' name='up'><i class='iconfont'>&#xf00d4;</i></a>";
				}
				title += "<a title='点击刷新' class='group-refresh' name='refresh'><i class='iconfont'>&#xe601;</i></a>";
				title += "</span></div><ul class='tree-form-ul' id='materialList'  style='padding:0px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'></ul>";
				var title = $(title);
				
				debugger;
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
					debugger;
					this.materialManager();
				} else if (opt == "refresh") {
					this.refreshMaterial();
				}
			};

			FuncManager.prototype.refreshMaterial = function() {
				var me = this, $container = $('#formNav'), $ul = $(
						"#materialList", $container);
				$ul.empty();
				var param = new justep.Request.ActionParam();
				param.setString("bizRecId", justep.xbl('BizRec').getID());
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
									if(total==0)
										total=had;
									$('#matNumId').html(
											'要件(' + had + '/' + total + ')');
									materials = eval(materials);
									for ( var i = 0; i < materials.length; i++) {
										var material = materials[i];
										var $li = $('<li><span class="formicon"></span><a title="'
												+ material.fMaterialName
												+ '">'
												+ material.fMaterialName
												+ '</a></li>');
										$li.data("material", material);

										var $files = $("<ul class='ul-material'></ul>");
										// 区县版，材料不上传，只显示
										if (material.fDocIds != null) {
											var docs = eval(material.fDocIds);
											for ( var j = 0; j < docs.length; j++) {
												var doc = docs[j];
												var $file = $("<li><a title='"
														+ doc.docName + "'>"
														+ doc.docName
														+ "</a></li>");
												$file.data("doc", doc);
												$files.append($file);
											}
											$li.append($files);
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

			FuncManager.prototype.openFile = function(doc) {
				var reqs = [ "system/service/doc/docUtil2" ];
				butone.Loader.requireJS(reqs, function() {
					justep.doc.InnerUtils.browseDocByFileID(doc.docPath,
							doc.docName, doc.fileID);
				});
			};

			/**
			 * 材料维护
			 */
			FuncManager.prototype.materialManager = function() {
				var me = this;
			//	me.mainForm.saveDatas();
				var materialAuths = this.mainForm.formDoc.materialAuths;
				var url = "/UI/base/core/components/material/materialManager.w?fBizRecId="
						+ this.mainForm.BizRec.getID()
						+ "&materialAuths="
						+ materialAuths;
				butone.Window.run(url, "材料维护", null, null, function(event) {
					me.refreshMaterial();
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
