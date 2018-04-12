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
			XFTrigger = function(id, binding, src, disSrc, disabled, readonly,
					clone, opOwner, op, iconClass) {
				this.element = justep(id);
				$(this.element).addClass(iconClass);
				this.element.xformsObject = this;

				this.htmlReadonly = readonly;
				this.htmlDisabled = disabled;
				this.binding = binding;
				this.hasBinding = !!binding;
				this.isTrigger = true;
				this.src = src;
				this.disSrc = disSrc;
				this.button = this.element.getElementsByTagName("a")[0]
						|| this.element.getElementsByTagName("button")[0]
						|| this.element.getElementsByTagName("input")[0];
				this.image = this.element.getElementsByTagName("img")[0];
				this.initFocus(this.button);
				this.controlElement = this.button;
				this.opOwner = opOwner;
				this.operation = op;
				this.iconClass = iconClass;

			};
			XFTrigger.prototype = new xforms.XFControl();

			XFTrigger.prototype.initOperation = function() {
				if (this.opOwner && this.operation) {
					this.operation = this.opOwner.getOperation(this.operation);
					this.operation.registerObserver(this);

					if (!justep.String.trim(this.getLabel()))
						this.setLabel(this.operation.getLabel());

					if (!this.src)
						this.src = this.operation.getImgSrc();

					if (!this.disSrc)
						this.disSrc = this.operation.getDisSrc();

					if (!this.htmlDisabled) {
						this.setDisabled(!this.operation.getEnable());
					}

					if (!this.iconClass) {
						this.iconClass = this.operation.getIconClass();
						$('>i', this.button).addClass(this.iconClass);
					}
				}
			};

			XFTrigger.prototype.operationNotify = function(event) {
				if (event.type == 'change') {
					var name = event.property;
					if (name == 'label') {
						this.setLabel(event.value);
					}
					if (name == 'enable') {
						this.setDisabled(!event.value);
					}
				}
			}

			XFTrigger.prototype.getLabel = function() {
				return $(this.element).find(".xforms-label:first").text();
			};

			XFTrigger.prototype.setLabel = function(label) {
				$(this.element).find(".xforms-label").text(label);
			};

			XFTrigger.prototype.setValue = function() {
			};

			XFTrigger.prototype.setTabIndex = function(tabIndex) {
				if (this.image)
					this.image.tabIndex = tabIndex;
				else if (this.controlElement)
					this.controlElement.tabIndex = tabIndex;
			}

			XFTrigger.prototype.getTabIndex = function() {
				if (this.image)
					return this.image.tabIndex;
				else if (this.controlElement)
					return this.controlElement.tabIndex;
			}

			XFTrigger.prototype.changeReadonly = function() {
				var disabled = this.htmlDisabled;
				if (this.binding)
					disabled = this.readonly || this.htmlDisabled;
				if (disabled) {
					$(this.button).attr('disabled', 'disabled');
				} else {
					$(this.button).removeAttr('disabled');
				}

				if (this.image) {
					var img = this.button.disabled ? this.disSrc : this.src;
					if (img)
						this.image.src = justep.Request.convertURL(img, true);
				}
				if (this.button.disabled)
					$(this.element).find(".xforms-label").addClass(
							"xforms-readonly-trigger");
				else
					$(this.element).find(".xforms-label").removeClass(
							"xforms-readonly-trigger");
			};

			XFTrigger.prototype.click = function(target, evt) {
				if (!this.htmlDisabled
						&& (!this.binding || (this.binding && !this.readonly))) {
					if (this.operation)
						this.operation.execute(window.event || evt);
					xforms.openAction();
					try {
						xforms.XMLEvents.dispatch(this, "DOMActivate");
					} finally {
						xforms.closeAction();
					}
				}
			};

			XFTrigger.prototype.blur = function() {
			};

			XFTrigger.prototype.refresh = function() {
				var element = this.element;
				var node = element.node;

				if (node) {
					var value = xforms.getValue(node, true, this.rowIndex);
					xforms.openAction();
					try {
						var changed = value !== this.currentValue;

						if (this.relevant) {
							xforms.Core.setClass(element, "xforms-disabled",
									false);
						}

						this.changeProp(node, "required", "xforms-required",
								"xforms-optional", changed);
						this.changeProp(node, "relevant", "xforms-enabled",
								"xforms-disabled", changed);
						this.changeProp(node, "readonly", "xforms-readonly",
								"xforms-readwrite", changed);

						if (!(this instanceof xforms.XFTrigger)) {
							this.changeProp(node, "valid", "xforms-valid",
									"xforms-invalid", changed);
						} else {
							this.changeProp(node, "valid", "xforms-valid",
									"xforms-valid", changed);
						}

						if (changed) {
							this.currentValue = value;
							this.setValue(value);

							if (!this.nodeChanged && !this.isTrigger) {
								xforms.XMLEvents.dispatch(element,
										"xforms-value-changed");
							}
						}
						// xyh 提供给 xbl 控件绑定ref，通过 xforms:input/output 等控件模拟的时候使用
						if (this.element.refreshCallback) {
							this.element.refreshCallback(this);
						}

					} finally {
						xforms.closeAction();
					}
				} else if (this.outputValue != null) {
					this.setValue(this.outputValue);
				} else {
					// md: 20100326为了当节点不存在的时候也触发事件
					if (this.currentValue != null) {
						this.currentValue = null;
						xforms.XMLEvents.dispatch(element,
								"xforms-value-changed");
					}
					// emd
					xforms.Core.setClass(element, "xforms-disabled",
							!this.hasValue);
				}

				this.nodeChanged = false;
			};

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
				var mainForm = this.mainForm = new StaticForm(formDoc, window);
				window.__onBeforeClose = function(close) {
					mainForm.refreshControls();
					var controlData = mainForm.currentForm && mainForm.currentForm.BizRec;
					if (controlData && controlData.isChanged("all")
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

			FuncManager.prototype._queryVisibleForms = function() {

				// 构造参数
				var params = new justep.Request.ActionParam();
				params.setString("bizRecId", justep.Request.URLParams["rowid"]);

				var event = {
					source : this.mainForm,
					// tableNames : new justep.Request.ListParam(),
					variables : new justep.Request.MapParam()
				};

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
			
			FuncManager.prototype.locateForm=function(navIndex,formIndex,callback){
				var nav=this.config.navs[navIndex];
				var config = nav.forms[formIndex];
				config.jQNode.parent().prev().click();
				config.jQNode.click();
				if(config.form)
					callback(config.form);
				else{
					config.onAfterChangeNav = callback;
				}
			};
			FuncManager.prototype.locateElement=function(navIndex,formIndex,elementId,beforeLocatCallBack){
				this.locateForm(navIndex, formIndex,  function(form) {
					if(elementId==null || elementId==undefined || elementId=="")
						return;
					var eleList=elementId.split(",");
					var eleString="";
					for(var i=0;i<eleList.length;i++)
					{
						eleString+="#"+eleList[i]+",";
					}
					if(eleString.length>=0)
					{
						eleString=eleString.substring(0,eleString.length-1);
					}
					var ele = form.contentWindow.$(eleString);
					if(ele==null)
						return;
					if(beforeLocatCallBack)
						beforeLocatCallBack(form);
					var target = ele;
					var offsetTop = target.offset().top;
					form.contentWindow.$('html,body').animate({
						scrollTop : offsetTop
					}, 500, 'swing');
					var iCount = 0;
					var time = setInterval(function(){
						if(target.hasClass("form-ErrorInfo"))
							target.removeClass("form-ErrorInfo");
						else
							target.addClass("form-ErrorInfo");
						iCount++;
						if(iCount==6){
							clearInterval(time);
						}
					},500);
				});
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
					var formLI = $("ul>li", '#formNav');
					defaultForm = $("ul>li:eq(0)", '#formNav').data("config");
					activeNav = 0;
				}

				if (defaultForm) {
					defaultForm.jQNode.click();
				} else {
					$container.append("<h2 style='color:red'>环节未设置工作表单</h2>");
				}

				// 初始化材料
				this._initMaterialNav();
				
				if(!this.mainForm.formDoc.materialAuths && cnt===1){
					var splitter = justep.xbl("mainHSplitter");
					splitter.handlerEl.hide();
					splitter.moveToStart();
				}
				
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
				// 应该用浮动表单的宽度修改 HSplitter2.right的宽度
				var $floatView = $("#customView");
				$("<div class='xui-autofill' style='width:99%;margin:0 auto' id='"
								+ config.id + "'/>").css({
					height : '100%'
				}).appendTo($floatView);
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
				var view = new justep.WindowFrame(config.id, config.url, null,
						$.proxy(this._onSendOpenParams, this), $.proxy(
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

			FuncManager.prototype._onSendOpenParams = function(event) {
				this.mainForm.currentForm = event.source.getContentWindow().butone.Context.frameForm;
				return event.data;

			};

			FuncManager.prototype._onReceiveFormInited = function(event) {
				var data = event.data, frameForm = data.source;
				if (data.kind == "initFinish") {
					$("#statusPanel").css("display", "none");
					this.changeBindingForm(frameForm);
					if(frameForm.config.onAfterChangeNav)
						frameForm.config.onAfterChangeNav(frameForm);
				}
				justep.xbl("funcReceiver").sendData(data);
			};

			FuncManager.prototype.changeBindingForm = function(frameForm) {
				this.mainForm.currentForm = frameForm;
				frameForm.active();

				var uiToolbar = this.mainForm.formDoc.formUIToolbar;
				uiToolbar.init(frameForm.formUIPlugins, true);
				if (this.btnSave) {
					this.btnSave.dispose();
				}
				this.btnSave = new XFTrigger('btnSave', null, null, null,
						false, false, false, frameForm.BizRec, "save", null);
				this.btnSave.initOperation();
				this.btnSave.operation.setEnable(frameForm.BizRec
						.isChanged("all"));
			};

			/**
			 * *********************************************************要件信息导航*******************************************************************
			 */

			FuncManager.prototype._initMaterialNav = function(option) {
				var materialAuths = this.mainForm.formDoc.materialAuths;
				if (!materialAuths) {
					return;
				}
				var $container = $('#formNav'), title = "<div class='tree-group-name'><h5 style='padding-left:2em;'>材料列表</h5><span>";
				if (materialAuths.toString().indexOf("up") != -1) {
					title += "<a title='点击上传' class='group-up' name='up'><i class='iconfont'>&#xf00d4;</i></a>";
				}
				title += "<a title='点击刷新' class='group-refresh' name='refresh'><i class='iconfont'>&#xe601;</i></a>";
				title += "</span></div><ul class='tree-form-ul' id='materialList'  style='padding:0px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;'></ul>";
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
				$ul.empty();
				var param = new justep.Request.ActionParam();
				var rowid = justep.Request.URLParams["rowid"];
				param.setString("bizRecId", rowid);
				justep.Request
						.sendBizRequest2({
							async : true,
							dataType : "json",
							parameters : param,
							action : 'getBizRecMaterialListAction',
							callback : function(result) {
								if (result.state) {
									var materials = result.response.materials;
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
				var rowid = justep.Request.URLParams["rowid"];
				var url = "/UI/base/core/components/material/materialBrowse.w?fBizRecId="
						+ rowid + "&fMaterialName=" + material.fMaterialName;
				butone.Window.run(url, justep.Context.getCurrentProcessLabel()
						+ "-材料浏览");
			};

			/**
			 * 材料维护
			 */
			FuncManager.prototype.materialManager = function() {
				var me = this;
				me.mainForm.saveDatas().done(function(){
					var rowid = justep.Request.URLParams["rowid"];
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
							param = "relBizRecIds=" + me.mainForm.formDoc.getRelBizRecIds(rowid) + "&";
					}else{
						if(!!materialTemplate && 'userCustom'==materialTemplate){
							url = "/UI/base/core/components/materialUser/materialManager.w";
						}else{
							url = "/UI/base/core/components/material/materialManager.w";
						}
					}
					
					// 添加水印材料设置 add by lzh
					if (me.mainForm.formDoc.config.waterMarkAuths)
						param += "waterMarkAuths=" + me.mainForm.formDoc.config.waterMarkAuths + "&";
					url += "?" + param + "fBizRecId="+ rowid+ "&materialAuths="+ materialAuths;
					
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
