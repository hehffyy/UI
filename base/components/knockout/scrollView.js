/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var Component = require("base/lib/bind/component");
	var iScroll = require("base/lib/require/iscroll").iScroll;
	var $ = require("jquery");
	var ViewComponent = require("base/lib/bind/viewComponent");
	var url = "$model/UI/base/components/knockout/scrollView";
	// for designer
	var scrollViewConfig = require("./scrollView.config");
	require('css!./css/scrollView').load();

	var ScrollView = ViewComponent
			.extend({
				getConfig : function() {
					return scrollViewConfig;
				},
				set : function(args) {
					var self = this;
					$.each(args, function(key, value) {
						if (!self.hasOwnProperty(key)) {
							self[key] = undefined;
						}
					});
					this.callParent(args);
				},

				buildTemplate : function(config) {
					config = config || {};
					return $(
							'<div class="x-scroll"><div class="x-scroll-content"></div></div>')
							.data("config", config).attr("component", url);
				},
				dispose : function() {
					if (this.scroller) {
						this.scroller.destroy();
					}
					this.callParent();
				},
				init : function(value, bindingContext) {
					var self = this;
					this.pullDownLabel = "下拉刷新";
					this.pullDownMoveLabel = "松开刷新";
					this.pullDownLoadingLabel = "加载中....";

					this.pullUpLabel = "加载更多";
					this.pullUpMoveLabel = "释放加载";
					this.pullUpLoadingLabel = "加载中....";
					this.noMoreLoadLabel = "已经到最后.";
					this.autoPullUp = true;
					this.autoAppend = true;
					this.recycleSelector = "";
					this.callParent(value, bindingContext);
					this.$rootEle = $(this.domNode).parent();
					this.$rootEle.addClass('x-scroll-view');
					this.$scrollEle = this.$rootEle.find('>.x-scroll');
					if (this.$scrollEle.find('>.x-pull-down').length === 0) {
						this.$scrollEle.css("top", "0");
					}
					if (this.getModel()._status >= 3) {
						__justep.cssReady(function() {
							self.render();
						});
					} else {
						this.getModel().on('onModelConstructDone', function() {
							__justep.cssReady(function() {
								self.render();
							});
						}, this);
					}
					this
							.getModel()
							.on(
									'onScrollRefresh',
									function(event) {
										if (this.$rootEle
												.find($(event.source.$rootEle)).length > 0) {
											this.refresh();
										}
									}, this);
					this.useIscrollLite = true;
					if (justep.Browser.isYuanXin) {
						this.useIscrollLite = false;
						this.$scrollEle.addClass("x-iscoll5");
						iScroll = iScroll5;
					}
				},

				propertyChangedHandler : function(name, oldValue, value) {
					this.callParent(name, oldValue, value);
					if (name == "pullDownLabel") {
						if (this.$puEle && this.$pdEle.hasClass('x-pull-down')) {
							var $pdlEle = this.$scrollEle
									.find('.x-pull-down>.x-pull-down-label');
							$pdlEle.text(value);
						}
					} else if (name == "pullUpLabel") {
						if (this.$puEle && this.$puEle.hasClass('x-pull-up')) {
							var $pulEle = this.$scrollEle
									.find('.x-pull-up>.x-pull-up-label');
							$pulEle.text(value);
						}
					}
				},

				render : function() {
					var self = this;
					var warpperHeight = this.$rootEle.parent()
							.outerHeight(true);
					var rootHeight = this.$rootEle.outerHeight(true);
					var scrollHeight = this.$scrollEle.outerHeight(true);
					if (rootHeight == scrollHeight
							&& rootHeight > warpperHeight) {
						this.$rootEle.css('height', '100%');
					}
					if (this.$rootEle.css('position') != 'absolute') {
						if (self.$rootEle.css('position') != 'absolute') {
							self.$rootEle.css({
								'position' : 'relative'
							});
						}
						if (this.$scrollEle.css('position') === "static") {
							this.$scrollEle.css({
								'position' : 'relative'
							});
						}
					} else if (this.$scrollEle.css('position') === 'static') {
						this.$scrollEle.css({
							'width' : '100%',
							'top' : '0',
							'position' : 'absolute'
						});
					}

					/**
					 * 兼容flex布局情况
					 */
					if (this.$scrollEle.height() <= 50) {
						if (!this.$rootEle.hasClass('x-full')) {
							this.$rootEle.addClass('x-full');
							if (this.$scrollEle.height() <= 50) {
								this.$rootEle.removeClass('x-full');
							}
						}
					}

					var config = this.$domNode.data('config') || {};

					if (typeof MutationObserver == 'function') {
						var target = this.$scrollEle.find('.x-scroll-content');
						var observer = new MutationObserver(
								function(mutations) {
									self.refresh();
								});
						var childNodes = target.find('div,ul');
						for ( var childIndex = 0; childIndex < Math.min(
								childNodes.length, 3); childIndex++) {
							observer.observe(childNodes.get(childIndex), {
								childList : true
							});
						}
						config.checkDOMChanges = false;
					} else {
						config.checkDOMChanges = true;
					}
					config.autoPullUp = this.autoPullUp;

					var defaultConfig = {
						hideScrollbar : true,
						onRefresh : function() {
							return self.fireEvent('onScrollRefresh', {
								source : self
							});
						},
						onScrollMove : function() {
							return self.fireEvent('onScrollMove', {
								source : self
							});
						},
						onScrollEnd : function(scrollType) {
							return self.fireEvent('onScrollEnd', {
								source : self,
								scrollType : scrollType
							});
						},
						recycleSelector : this.recycleSelector
					};

					config = $.extend(defaultConfig, config);
					this.scroller = new iScroll(this.$rootEle.get(0), config);
					this.getModel().on(
							'reflow',
							function(domNode) {
								if ($(domNode).find(this.$rootEle).length > 0
										|| $(domNode).is(this.$rootEle)) {
									this.refresh(true);
								}
							}, this);
					if (this.$scrollEle.find('>.x-pull-down').length > 0) {
						this.pullDown(function() {
							var event = {
								source : this
							};
							var dtds = [];
							this.fireEvent('onPullDown', event);
							if (event.dtd) {
								dtds.push(event.dtd);
								event.dtd = null;
							}
							if (this.getModel()) {
								this.getModel().fireEvent('onPullDown', event);
							}
							if (event.dtd) {
								dtds.push(event.dtd);
							}
							var dtd = $.Deferred();
							$.when.apply($, dtds).done(function() {
								dtd.resolve();
							}).fail(function() {
								dtd.reject();
							});
							return dtd.promise();
						});
					}
					if (this.$scrollEle.find('>.x-pull-up').length > 0) {
						this.pullUp(function(_event) {
							this.noMoreLoad = false;
							var dtds = [];
							var event = {
								source : this,
								noMoreLoad : false
							};
							if (event.dtd) {
								dtds.push(event.dtd);
								event.dtd = null;
							}
							this.fireEvent('onPullUp', event);
							if (event.dtd) {
								dtds.push(event.dtd);
							}
							if (this.getModel()) {
								this.getModel().fireEvent('onPullUp', event);
							}
							if (event.noMoreLoad) {
								this.noMoreLoad = true;
								this.scroller.noMoreElement = true;
							} else {
								this.scroller.noMoreElement = false;
							}
							var dtd = $.Deferred();
							$.when.apply($, dtds).done(function() {
								dtd.resolve();
							}).fail(function() {
								dtd.reject();
							});
							return dtd.promise();
						});
					}
					debugger;
					self.getModel().fireEvent('onScrollRefresh', {
						source : this
					});
					if (this.$scrollEle.find('>.x-pull-down').length > 0) {
						this.scroller.options.topOffset = 50;
						this.$scrollEle.find('>.x-pull-down').show();
					}
					this.refresh(true);
				},
				scrollTo : function(y) {
					if (typeof y !== "number") {
						if (y === "top") {
							y = 0;
						} else if (y === "end") {
							y = -this.scroller.maxScrollY;

						}
					}
					if (this.scroller && this.useIscrollLite) {
						this.scroller.scrollTo(y);
					} else {
						this.scroller.scrollTo(0, -y);
					}
				},
				scrollToElement : function(el) {
					this.scroller.scrollToElement(el);
				},
				refresh : function(isFast) {
					var dfd = $.Deferred();
					if (this.scroller) {
						var self = this;
						if (self.getModel()) {
							// TODO:防止在js执行的时候css文件还没有被加载完毕
							if (self.$pdEle && self.$pdEle.length > 0) {
								var threshold = self.$pdEle.outerHeight(true);
								if (threshold === 0) {
									threshold = 50;
								}
								self.scroller.options.topOffset = threshold;
								self.scroller.minScrollY = -threshold;
							}

							if (self.$pdEle && self.$pdEle.length > 0) {
								setTimeout(function() {
									self.$pdEle.css('opacity', '0.99');
								}, 200);
							}
							if (self.$puEle && self.$puEle.length > 0) {
								setTimeout(function() {
									self.$puEle.css('opacity', '0.99');
								}, 200);
							}
							var refreshDfd = self.scroller.refresh(isFast);
							if (refreshDfd && refreshDfd.done) {
								refreshDfd.done(function() {
									dfd.resolve();
								});
							} else {
								dfd.resolve();
							}
							debugger;
							self.getModel().fireEvent('onScrollRefresh', {
								source : self
							});
						}
					}
					return dfd.promise();
				},

				pullDown : function(refreshCallback) {
					this.$pdEle = this.$scrollEle.find('>.x-pull-down');
					this.$pdiEle = this.$scrollEle
							.find('.x-pull-down>.x-pull-down-img');
					this.$pulEle = this.$scrollEle
							.find('.x-pull-up>.x-pull-up-label');
					if (this.$pdEle.length == 0) {
						this.$pdEle = $('<div class="x-pull-down"><span class="x-pull-down-label">'
								+ this.pullDownLabel + '</span></div>');
						this.$scrollEle.prepend(this.$pdEle);
						this.refresh();
					}

					var threshold = this.$pdEle.outerHeight(true);

					if (this.scroller.options.topOffset !== threshold) {
						this.scroller.options.topOffset = threshold;
					}

					var self = this;
					var $pdlEle = this.$pdEle.find('.x-pull-down-label');
					this._pdRefresh = function() {
						if (self.$pdEle.hasClass('x-loading')) {
							self.$pdEle.removeClass('x-loading');
							self.$pdEle.addClass('x-pull-down');
							$pdlEle.text(this.pullDownLabel);
						}
						self.$pdiEle.css({
							"transform" : "rotate(0deg) translate3d(0,0,0)"
						});
					};

					this.on('onScrollRefresh', this._pdRefresh);
					this._pdScrollMove = function() {
						if (self.scroller.y > -15 && self.scroller.y < 5) {
							var deg = ((self.scroller.y - 5) / 20 + 1) * -180;
							self.$pdiEle.css({
								"transform" : "rotate(" + deg
										+ "deg) translate3d(0,0,0)"
							});
						} else if (self.scroller.y > 5) {
							self.$pdiEle
									.css({
										"transform" : "rotate(-180deg) translate3d(0,0,0)"
									});
						}

						if (self.scroller.y > 5
								&& !self.$pdEle.hasClass('x-flip')) {
							// 超过阀值
							self.$pdEle.addClass('x-flip');
							self.$pdEle.removeClass('x-restore');

							self.$pdEle.addClass('x-flip');
							self.$pdEle.removeClass('x-restore');
							$pdlEle.text(self.pullDownMoveLabel);
							self.scroller.minScrollY = 0;
						} else if (self.scroller.y < 5
								&& self.$pdEle.hasClass('x-flip')) {
							// 不到阀值
							self.$pdEle.removeClass('x-flip');
							self.$pdEle.addClass('x-restore');
							$pdlEle.text(self.pullDownLabel);
							self.scroller.minScrollY = -threshold;
						}
					};
					this.on('onScrollMove', this._pdScrollMove);

					this._pdScrollEnd = function(event) {
						if (event.scrollType === "pullDown"
								|| this.useIscrollLite == false) {
							if (self.$pdEle.hasClass('x-flip')) {
								self.noMoreLoad = false;
								self.$pdEle.removeClass('x-flip');
								self.$pdEle.addClass('x-loading');
								$pdlEle.text(self.pullDownLoadingLabel);
								if (!self.noMoreLoad) {
									this.scroller.noMoreElement = false;
									self.$pulEle.text(self.pullUpLabel);
								}

								try {
									var result = refreshCallback.call(this,
											event);
									if ($.type(result) === "object") {
										$.when(result).done(function() {
											self.pullDownFinish();
										}).fail(function() {
											self.pullDownError();
										});
									} else if ($.type(result) === "boolean") {
										if (result) {
											self.pullDownFinish(event);
										} else {
											self.pullDownError(event);
										}
									}
								} catch (e) {
									self.pullDownError(event);
									throw new Error(e);
								}
							} else if (self.$pdEle.hasClass('x-restore')) {
								self.$pdEle.removeClass('x-restore');
								self.$pdEle.addClass('x-pull-down');
								this.refresh();
							}
						}
					};
					this.on('onScrollEnd', this._pdScrollEnd);
				},

				pullDownFinish : function(event) {
					var self = this;
					this.refresh().done(function() {
						self._autoPullUp({
							type : "scroll"
						});
					});
				},

				pullDownError : function(event) {
					this.refresh();
				},

				pullUp : function(loadCallback) {
					this.$puEle = this.$scrollEle.find('>.x-pull-up');
					if (this.$puEle.length == 0) {
						this.$puEle = $('<div class="x-pull-up"><span class="x-pull-up-label">'
								+ this.pullUpLabel + '</span></div>');
						this.$scrollEle.append($puEle);
						this.refresh();
					}

					var threshold = this.$puEle.outerHeight(true);
					var self = this;
					var $pulEle = this.$puEle.find('.x-pull-up-label');

					this._puRefresh = function() {
						debugger;
						if (self.$puEle.hasClass('x-loading')) {
							self.$puEle.removeClass('x-loading');
							self.$puEle.addClass('x-pull-up');
						}
						if (self.noMoreLoad) {
							$pulEle.text(self.noMoreLoadLabel);
						} else {
							$pulEle.text(self.pullUpLabel);
						}
					};
					this.on('onScrollRefresh', this._puRefresh);
					this._puScrollMove = function() {
						/**
						 * 
						 * scrollLite 滚动区域为x-scroll部分 里面包含 x-pull-down
						 * x-scroll-content x-pull-up三部分 maxScrollY
						 * 是按照可以滚动的最大距离计算 没滚动条时候为0 有滚动条时候为 负值 y 是滚动出去的距离 滚上去后
						 * y为复制 所以初始化时候 y本应该为0 但是上面让出来了一个50的下拉刷新 提示框 所以值为 -50
						 * 下拉刷新完全拉出来后为0 iScroll maxScrollY iscroll 在没有撑出滚动条的时候
						 * 值为正值是说还有多少距离才能滚动
						 */

						var maxScrollY = self.scroller.maxScrollY;
						if (maxScrollY > 0) {
							maxScrollY = 0;
						}
						if (self.scroller.y < maxScrollY
								&& self.scroller.y < maxScrollY - threshold
								&& !self.$puEle.hasClass('x-flip')) {
							self.$puEle.removeClass('x-restore');
							self.$puEle.addClass('x-flip');
							$pulEle.text(self.pullUpMoveLabel);
						} else if (self.scroller.y > (maxScrollY - threshold)
								&& self.$puEle.hasClass('x-flip')) {
							self.$puEle.removeClass('x-flip');
							self.$puEle.addClass('x-restore');
							$pulEle.text(self.pullUpLabel);
						}
					};
					this.on('onScrollMove', this._puScrollMove);

					this._pullUp = function(event) {
						self.$puEle.addClass('x-loading');
						$pulEle.text(self.pullUpLoadingLabel);
						var result = loadCallback.call(self, event);
						if ($.type(result) === "object") {
							$.when(result).done(function() {
								self.pullUpFinish();
							}).fail(function() {
								self.pullUpError();
							});
						} else if ($.type(result) === "boolean") {
							if (result) {
								self.pullUpFinish();
							} else {
								self.pullUpError();
							}
						}
					};

					this._puScrollEnd = function(event) {
						if (event.scrollType === "pullUp"
								|| this.useIscrollLite == false) {
							if (self.$puEle.hasClass('x-flip')) {
								self.$puEle.removeClass('x-flip');
								self._pullUp(event);
							}
						} else if (event.scrollType === "scroll") {
							self._autoPullUp(event);
						}
					};
					this.on('onScrollEnd', this._puScrollEnd);
					self.$puEle.on('click', self._pullUp);
				},

				_autoPullUp : function(event) {
					var self = this;
					if (this.autoPullUp === true) {
						if (event
								&& event.scrollType === "scroll"
								&& Math.abs(Math.abs(self.scroller.y)
										- Math.abs(self.scroller.maxScrollY)) < 100) {
							if (self.scroller.maxScrollY === 0
									&& self.autoAppend == true) {
								self._pullUp(event);
							} else if (self.scroller.maxScrollY != 0) {
								self._pullUp(event);
							}
						}
					}
				},

				pullUpFinish : function(event) {
					this.refresh();
				},

				pullUpError : function(event) {
					this.refresh();
				}
			});
	Component.register(url, ScrollView);
	return ScrollView;
});