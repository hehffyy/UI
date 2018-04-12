/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(
		"base/lib/bind/uploader",
		[ "require", "jquery", "./object", "./observable" ],
		function(require, $, Object, Observable) {
			var Uploader = Object.extend({
				mixins : Observable,
				constructor : function(selector, config) {
					var defaultConfig = {
						actionUrl : '',
						name : 'userfile',
						data : {},
						multiple : false,
						autoUpload : true,
						states : true,
						requestHeader : {},
						defaultSuccessCodes : [ 200, 201 ]
					};
					var self = this;
					$.extend(this, $.extend(defaultConfig, config));
					self.callParent();
					Observable.prototype.constructor.call(self);
					this.$rootElement = $(selector);
					self.buildTarget();
					self.buildLoadingElement();
					this.inputElement.addEventListener('change', function() {
						self.onChanged.apply(self, arguments);
					});
					/*
					 * this.$rootElement.on('click.uploader', function() {
					 * self.submit.apply(self, arguments); });
					 */
					self.enable = true;
					self.changeState('browse');
				}
			});

			Uploader.prototype.setEnable = function(enable) {
				if (enable == false) {
					this.enable = false;
					$(this.formElement()).css('visibility', 'hidden');
				} else if (enable == true) {
					this.enable = true;
					$(this.formElement()).css('visibility', 'visible');
				}
			};

			Uploader.prototype.addData = function(data) {
				$.extend(this.data, data);
			};

			Uploader.prototype.buildTarget = function() {
				if (this.$rootElement.css('position') != 'absolute') {
					this.$rootElement.css({
						position : 'relative'
					});
				}
				var mutiplyAttr = "";
				var formTpl = '<form style="position:absolute;top:-3px;right:-3px;bottom:-3px;left:-3px;" enctype="multipart/form-data" method="post"><input type="file" '
						+ mutiplyAttr
						+ ' name="userfile" tabindex="-1" style="cursor: pointer;opacity:0;position: relative;z-index:999;width:100%;height:100%;overflow:hidden;"></form>';
				var $formEle = $(formTpl).appendTo(this.$rootElement);
				var self = this;
				$formEle.on('click', function(e) {
					var _data = {
						cancel : false,
						source : self
					};
					self.fireEvent('onFileSelect', _data);
					if (_data.cancel) {
						e.preventDefault();
					}
				});
				this.inputElement = $formEle.find('input').get(0);
				this.formElement = $formEle.get(0);

			};

			Uploader.prototype.buildIframe = function() {
				var self = this;
				var id = (new justep.UUID()).valueOf();
				var $iframe = $('<iframe src="javascript:false;" name="' + id
						+ '" />');
				$iframe.attr('id', id);
				$iframe.css('display', 'none');
				$iframe.appendTo(document.body);
				$(this.formElement).attr('target', id);
				this.iframeElement = $iframe.get(0);
			};

			Uploader.prototype.dispose = function() {
				if (this.$loadingElement) {
					this.$loadingElement.remove();
				}
				if (this.inputElement) {
					$(this.formElement).remove();
					$(this.inputElement).remove();
				}
				if (this.$rootElement) {
					this.$rootElement.off('.uploader');
				}
				if (this.iframeElement) {
					$(this.iframeElement).remove();
				}
			},

			Uploader.prototype.buildLoadingElement = function() {
				var loadingEleTpl = '<span style="display:none"></span>';
				this.$loadingElement = $(loadingEleTpl).appendTo(
						this.$rootElement);
			};

			Uploader.prototype.submit = function() {
				var self = this;
				if (self.currentState == 'ready') {

					var data = {
						source : self,
						file : this.file,
						cancel : false
					}
					self.fireEvent('onStart', data);
					if (data.cancel === true) {
						return;
					}
					self.doUpload(this.file);
				}
			};

			Uploader.prototype.onChanged = function(e) {
				var self = this;
				if (this.inputElement.value) {
					this.fileName = this.inputElement.value.replace(
							/.*(\/|\\)/, "");
					this.file = {};
					this.file.data = {};
					this.file.name = this.fileName;
					var _event = {
						file : this.file,
						cancel : false
					};
					self.fireEvent('onFileSelected', _event);
					if (_event.cancel == true) {
						self.changeState("browse");
					} else {
						self.changeState('ready');
					}
				} else {
					// alert('File selected but not accessible');
					self.changeState('browse');
				}
			};

			Uploader.prototype.changeState = function(state) {
				var self = this;
				self.currentState = state;
				switch (state) {
				case 'browse':
					self.$loadingElement.hide();
					self.reset();
					break;
				case 'ready':
					self.$loadingElement.hide();
					if (self.autoUpload == true) {
						$(self.inputElement).hide();
						$(self.formElement).hide();
						self.submit();
					}
					break;
				case 'loading':
					self.$loadingElement.show();
				}
			};

			Uploader.prototype.parseResponse = function(_xmlHttpRequest) {
				if (_xmlHttpRequest.responseXML) {
					return _xmlHttpRequest.responseXML;
				} else {
					try {
						return JSON.parse(_xmlHttpRequest.response);
					} catch (e) {
						return _xmlHttpRequest.response;
					}
				}
			};

			// 兼容upload-html5的api
			Uploader.prototype.getForm = function(file) {
				var self = this;
				$.each(this.data, function(key, value) {
					$(
							'<input type="hidden" name="' + key + '" value="'
									+ value + '"></input>').appendTo(
							self.formElement);
				});
				if (file.data) {
					$.each(file.data, function(key, value) {
						$(
								'<input type="hidden" name="' + key
										+ '" value="' + value + '"></input>')
								.appendTo(self.formElement);
					});
				}
			};

			Uploader.prototype.getResponse = function() {
				var $iframe = $(this.iframeElement);
				var self = this;
				$iframe
						.on(
								'load',
								function(event) {
									if ($iframe.attr('src') == "javascript:'%3Chtml%3E%3C/html%3E';"
											|| $iframe.attr('src') == "javascript:'<html></html>';") {
										setTimeout(function() {
											$iframe.remove();
										}, 500);
										return;
									} else {
										var doc = this.contentDocument ? this.contentDocument
												: window.frames[this.id].document;
										if (doc.readyState
												&& doc.readyState != 'complete') {
											return;
										}
										if (doc.body
												&& doc.body.innerHTML == "false") {
											return;
										}
										if (doc.XMLDocument) {
											response = doc.XMLDocument;
										} else if (doc.body) {
											response = doc.body.innerHTML;
											/**
											 * <em>
											 *  If the document was sent as 'application/javascript' or 'text/javascript', then the browser wraps the text in a  tag and performs html encoding on the contents. 
											 *  In this case,we need to pull the original text content from the text node's nodeValue property to retrieve the unmangled content.Note that IE6 only understands text/html
											 * </em>
											 */
											if (doc.body.firstChild
													&& doc.body.firstChild.nodeName
															.toUpperCase() == 'PRE') {
												doc.normalize();
												if (doc.body.firstChild.firstChild) {
													response = doc.body.firstChild.firstChild.nodeValue;
												}
											}
											try {
												response = JSON.parse(response);
											} catch (e) {
												response = {};
											}
										} else {
											// response is a xml document
											response = doc;
										}
										self.fireEvent('onSuccess', {
											response : response,
											originalevent : event,
											data : self.file.data
										}, self.fileName);
										$iframe.attr('src',
												"javascript:'<html></html>';");
										self.changeState('browse');
									}
								});
			};

			Uploader.prototype.doUpload = function(file) {
				var self = this;
				self.changeState('uploading');
				var $formElement = $(self.formElement).attr('action',
						self.actionUrl);
				self.fireEvent('onProgress', {
					percentComplete : '20%'
				});
				self.buildIframe();
				self.getForm(file);
				$formElement.submit();
				self.getResponse();
				self.fireEvent('onProgress', {
					percentComplete : '100%'
				});
			};

			Uploader.prototype.reset = function() {
				var self = this;
				$(self.formElement).show();
				$(self.inputElement).show();
				$(self.formElement).find('input[type="hidden"]').remove();
				self.formElement.reset();
			};

			return Uploader;
		});