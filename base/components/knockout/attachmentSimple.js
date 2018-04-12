/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var Component = require("base/lib/bind/component"), BindComponent = require("base/lib/bind/bindComponent"), BindMapping = require("base/lib/bind/bind.mapping"), Uploader = require("base/lib/bind/uploader");
	var url = "$model/UI/base/components/knockout/attachmentSimple";
	var $ = require("jquery");
	var ComponentConfig = require("./attachmentSimple.config");

	require('css!./css/attachment').load();

	var AttachmentSimple = BindComponent
			.extend({
				// 构造函数
				constructor : function(options) {
					this.callParent(options);
					this.state = "upload";
					this.initAttachmentValue([]);
				},

				getDisplayHtml : function(context) {
					if (context && context.row) {
						var value = context.row.val(context.colDef.name)
						try {
							var docs = JSON.parse(value);
							var result = "";
							$.each(docs, function(index, doc) {
								result = result + doc.realFileName + ";";
							});
							return "<div style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding-right:15px;'>"
									+ result + "</div>";
						} catch (e) {
						}
					}
				},

				getConfig : function() {
					return ComponentConfig;
				},

				getContextID : function() {
					return this.getModel().getContextID();
				},

				_callModelFn : function() {
					var event = arguments[2];
					event.bindingContext = butone.Bind
							.contextFor(event.currentTarget);
					return this.getModel()[arguments[0]].apply(this.getModel(),
							[ event ]);
				},

				_attachDataEvent : function() {
					var data = this.bindData;
					if (data && (!this.eventAttached)) {
						/*
						 * var dataRefreshCallback = function(event) {
						 * this._refreshChangeLog(); };
						 * data.on("onAfterRefresh",dataRefreshCallback,this);
						 */

						this.eventAttached = true;
					}
				},

				/**
				 * 组件展现逻辑
				 * 
				 * @param initValue
				 */
				initAttachmentValue : function(initValue) {
					var self = this;
					if (this.$attachmentItems) {
						BindMapping.fromJS(initValue, this.$attachmentItems);
					} else {
						this.$attachmentItems = BindMapping.fromJS(initValue);
					}
				},
				initUploader : function() {
					var self = this;
					var actionUrl = require
							.toUrl("base/common/simpleFileStore.j");
					self.uploader = new Uploader(self.$domNode
							.find('.x-item-upload'), {
						actionUrl : actionUrl
					});

					self.uploader.on('onStart', function(event) {

						var storeFileName = justep.Utils.randomString();
						event.file.data = {
							fileName : event.file.name,
							storeFileName : storeFileName,
							ownerID : self.getOwnerID()
						};
					});

					self.uploader.on('onProgress', function(event) {
						self.$domNode.find('.x-doc-process-bar').show().css(
								'width', event.percentComplete);
						var _data = {
							source : self,
							event : event
						};
						self.fireEvent('onProgress', _data);
					});
					self.uploader.on('onFileSelected', function(event) {
						var _data = {
							source : self,
							event : event
						};
						self.fireEvent('onFileSelected', _data);
					});
					self.uploader.on('onSuccess', function(event) {
						self.$domNode.find('.x-doc-process-bar').hide().css(
								'width', '0%');
						var _data = {
							source : self,
							data : event.data,
							fileName : event.data.fileName
						};
						self.fireEvent('onSuccess', _data);
						self.changeState("upload");
						self.addItem(_data.data.fileName,
								_data.data.storeFileName, _data.data.ownerID);
					});
					self.uploader.on('onError', function(event) {
						var _data = {
							source : self,
							event : event
						};
						self.fireEvent('onError', _data);
						self.changeState("upload");
					});
				},
				controlsDescendantBindings : function() {
					return true;
				},
				doInit : function(value, bindingContext, allBindings) {
					this.callParent(value, bindingContext, allBindings);
					this.$state = butone.Bind.observable(this.state);

					this.initUploader();
					var self = this;

					$('body').on(
							'click',
							function(event) {
								if (self.$state
										&& self.$state.get() == 'remove'
										&& (!$(event.target).hasClass(
												'x-remove-barget'))
										&& (!$(event.target).hasClass(
												'x-item-remove'))) {
									self.changeState("upload");
								}
							});
					butone.Bind.applyBindings(self, this.$domNode.find(
							'.x-attachment').get(0));
				},

				doUpdate : function(value, bindingContext, allBindings) {
					this.callParent(value, bindingContext, allBindings);
					if (butone.Bind.isObservable(this.ref)
							&& this.ref['define']) {
						if (this.bindData == undefined) {
							this.bindData = this.ref['define'].data;
							this._attachDataEvent();
							this.bindRelation = this.ref['define'].defCol.name;
						}
						var _value = [];
						try {
							_value = JSON.parse(this.ref.get());
						} catch (e) {
							_value = [];
						}
						this.initAttachmentValue(_value);
						if (this.$attachmentItems.get().length == 0) {
							this.changeState("upload");
						}
						if (this.isDisabled()) {
							this.changeState("readonly");
						} else {
							this.changeState("upload");
						}
					}
				},
				/**
				 * controller
				 */
				changeState : function(state) {
					this.$state.set(state);
				},

				getFileUrl : function(realFileName, storeFileName, ownerID,
						operateType) {
					var url = 'base/common/simpleFileStore.j?realFileName='
							+ realFileName + '&storeFileName=' + storeFileName
							+ '&ownerID=' + ownerID + '&operateType='
							+ operateType;
					return require.toUrl(url);
				},

				getPictureUrl : function($object) {
					var realFileName = $object.realFileName.get();
					var storeFileName = $object.storeFileName.get();
					var ownerID = this.getOwnerID($object);
					var operateType = "browse";
					var imgFileType = ".jpg,.jpeg,.jpe,.png,.gif,.tiff,.tif,.svg,.svgz,.svg";
					var url = "";
					if (imgFileType.indexOf((String(/\.[^\.]+$/
							.exec(realFileName)).toLowerCase())) >= 0) {
						url = this.getFileUrl(realFileName, storeFileName,
								ownerID, operateType);
					} else if (".mp3,.wav".indexOf((String(/\.[^\.]+$/
							.exec(realFileName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/mp3.png');
					} else if (".mp4,.wmv,.mov,.MOV"
							.indexOf((String(/\.[^\.]+$/.exec(realFileName))
									.toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/mp4.png');
					} else if (".avi".indexOf((String(/\.[^\.]+$/
							.exec(realFileName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/avi.png');
					} else if (".doc,.docx".indexOf((String(/\.[^\.]+$/
							.exec(realFileName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/doc.png');
					} else if (".ppt,.pptx".indexOf((String(/\.[^\.]+$/
							.exec(realFileName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/ppt.png');
					} else if (".txt,.text".indexOf((String(/\.[^\.]+$/
							.exec(realFileName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/txt.png');
					} else if (".pdf".indexOf((String(/\.[^\.]+$/
							.exec(realFileName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/pdf.png');
					} else if (".xls,.xlsx".indexOf((String(/\.[^\.]+$/
							.exec(realFileName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/xlsx.png');
					} else {
						url = require
								.toUrl('base/components/knockout/css/other.png');
					}
					return url;
				},

				previewPicture : function($object) {
					var url = this.getPictureUrl($object);
					if (url) {
						return "url(" + url + ")";
					}
				},

				deleteFile : function(storeFileName, ownerID) {
					if (typeof storeFileName === "object") {
						var $object = storeFileName;
						storeFileName = $object.storeFileName.get();
						ownerID = this.getOwnerID($object);
					}
					this.removeItemByStoreID(storeFileName, ownerID);
				},

				downloadFile : function(realFileName, storeFileName, ownerID) {
					var url = this.getFileUrl(realFileName, storeFileName,
							ownerID, "download");
					window.open(url, "_download_");
				},

				previewOrRemoveItem : function($object) {
					var realFileName = $object.realFileName.get();
					var storeFileName = $object.storeFileName.get();
					var ownerID = this.getOwnerID($object);
					if (this.$state.get() == 'upload') {
						this.downloadFile(realFileName, storeFileName, ownerID);
					} else if (this.$state.get() == 'remove') {
						this.deleteFile(storeFileName, ownerID);
					}
				},

				copyFile : function(ownerID, storeFileName, currentOwnerID) {
					var url = 'base/common/simpleFileStore.j?targetOwnerID='
							+ currentOwnerID + '&storeFileName='
							+ storeFileName + '&ownerID=' + ownerID
							+ '&operateType=copy';
					url = require.toUrl(url);
					$.ajax({
						url : url,
						cache : false,
						async : false
					}).fail(function() {
						throw "copyFile error";
					});
				},

				/**
				 * todo :国产化
				 */
				edit : function($object) {
					var self = this;
					var realFileName = $object.realFileName.get();
					var storeFileName = $object.storeFileName.get();
					var ownerID = this.getOwnerID($object);
					var currentOwnerID = this.bindData
							.getRowID(this.ref['define'].row);
					if (this.$state.get() == 'remove') {
						this.deleteFile(storeFileName, ownerID);
						return;
					}

					if (realFileName.indexOf('wps') == -1) {
						return;
					}
					if (currentOwnerID !== ownerID) {
						this.copyFile(ownerID, storeFileName, currentOwnerID);
						this.removeItemOwnerIDByStoreID(storeFileName,
								currentOwnerID, ownerID);
						ownerID = currentOwnerID;
					}
					var userAgent = navigator.userAgent.toUpperCase();
					if (userAgent.indexOf('X11') == -1
							|| userAgent.indexOf('FIREFOX') == -1) {
						justep.Util.hint("请先安装当前浏览器的wps插件");
						return;
					}
					var editorUrl = require
							.toUrl('system_X/service/doc/wps/wpsEditorDialog.w');
					var editorUrlObj = new justep.URL(editorUrl);
					editorUrlObj.setParam('storeFileName', storeFileName);
					editorUrlObj.setParam('ownerID', ownerID);
					editorUrlObj.setParam('realFileName', realFileName);

					require(
							[ '$UI/system/components/justep/windowOpener/windowOpener' ],
							function(WindowOpener) {
								if (!self.editorDialog) {
									self.editorDialog = new WindowOpener({
										url : editorUrlObj.toString(),
										modal : "true",
										resizable : "true",
										status : "fullscreen"
									});
									self.editorDialog
											.on(
													"onReceive",
													function(event) {
														var data = event.data;
														if ('fileOpened' === data.eventName) {
															var editorContext = {};
															editorContext.exec = function(
																	func,
																	params) {
																var execPart = {
																	func : func
																			.toString(),
																	params : params,
																	type : "fileOpened"
																}
																self.editorDialog.sendData = JSON
																		.stringify(execPart);
																self.editorDialog
																		.sendToWindow();
															};
															var eventData = {
																'source' : this,
																data : {
																	'editorContext' : editorContext
																}
															};
															self
																	.fireEvent(
																			"fileOpened",
																			eventData);
														}
													});

								} else {
									self.editorDialog.setURL(editorUrlObj
											.toString());
								}
								self.editorDialog.open();
							});

				},

				// Utils
				getItemByStoreID : function(storeFileName, ownerID) {
					var items = this.getItems(ownerID);
					if (items) {
						for ( var i = 0; i < items.length; i++) {
							if (items[i].storeFileName == storeFileName) {
								return items[i];
							}
						}
					}
				},
				removeItemByStoreID : function(storeFileName, ownerID) {
					var items = this.getItems(ownerID);
					if (items) {
						for ( var i = 0; i < items.length; i++) {
							if (items[i].storeFileName == storeFileName) {
								items.splice(i, 1);
							}
						}
					}
					this.bindData.setValueByID(this.bindRelation, JSON
							.stringify(items), ownerID);
				},
				removeItemOwnerIDByStoreID : function(storeFileName, ownerID,
						fileOwnerID) {
					var items = this.getItems(ownerID);
					if (items) {
						for ( var i = 0; i < items.length; i++) {
							if (items[i].storeFileName == storeFileName) {
								if (items[i].ownerID === fileOwnerID) {
									delete items[i].ownerID;
								}
							}
						}
					}
					this.bindData.setValueByID(this.bindRelation, JSON
							.stringify(items), ownerID);
				},
				addItem : function(realFileName, storeFileName, ownerID) {
					var items = this.getItems();
					items.push({
						storeFileName : storeFileName,
						realFileName : realFileName
					});
					this.bindData.setValueByID(this.bindRelation, JSON
							.stringify(items), ownerID);
				},
				getOwnerID : function($object) {
					if ($object && $object.ownerID) {
						return $object.ownerID.get();
					}
					return this.bindData.getRowID(this.ref['define'].row);
				},
				getItems : function(ownerID) {
					var data = [];
					var value = "";
					value = this.bindData.getValueByID(this.bindRelation,
							ownerID);
					if (value) {
						try {
							data = JSON.parse(value);
						} catch (e) {
							if (console) {
								console
										.log("绑定的数据解析失败[value:" + value + "]",
												e);
							}
							data = [];
						}
					}
					return data;
				}
			});

	Component.register(url, AttachmentSimple);
	return AttachmentSimple;
});
