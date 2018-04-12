justep.design.BindTemplate = function(config) {
	justep.design.BindTemplate.superclass.constructor.call(this, config);
	this.allowHighLight = true;
};

justep
		.extend(
				justep.design.BindTemplate,
				justep.design.Component,
				{

					addChild : function(component, parentElement, beforeE) {
						if (LayoutUtils.isAbsoluteLayout(this.layoutType)) {
							$(component.element).css("position", "absolute");
						} else {
							$(component.element).css("position", "");
						}
						justep.design.BindTemplate.superclass.addChild.call(
								this, component, parentElement, beforeE);
					},

					executeDrag : function(event, canvas) {
						var currentE = event.srcElement;
						var targetE = this.getElement();
						if (currentE == targetE
								&& LayoutUtils.isAbsoluteLayout(this)) {

							justep.design.Util.setCapture(targetE);
							var selectDiv;
							var offset = $(targetE).offset();
							var scrollOffset = canvas
									.getParentScrollOffset(targetE);
							var x = event.clientX - offset.left
									+ scrollOffset.left / 2, y = event.clientY
									- offset.top + scrollOffset.top / 2;
							var oldX = event.clientX, oldY = event.clientY;
							var mouseMove = function(event) {
								if (!selectDiv) {
									selectDiv = $(
											"<div style='opacity:0.5;filter:alpha(opacity=50);background:white;position:absolute;line-height:1px;height:1px;border:1px dashed green;top:"
													+ y
													+ "px;left:"
													+ x
													+ "px'>&nbsp;</div>")
											.appendTo($(targetE));
								}
								var w = event.clientX - oldX;
								var h = event.clientY - oldY;

								if (w < 1) {
									selectDiv.css("left", (x + w) + "px");
								}
								if (h < 1) {
									selectDiv.css("top", (y + h) + "px");
								}
								selectDiv.width(Math.abs(w));
								selectDiv.height(Math.abs(h));
							};

							var mouseUp = function(event) {
								justep.design.Util.releaseCapture(targetE);
								$(document).unbind("mousemove", mouseMove)
										.unbind("mouseup", mouseUp);
								if (selectDiv) {
									var position = selectDiv.position();
									var dgBound = {
										x : position.left,
										y : position.top,
										w : selectDiv.outerWidth(),
										h : selectDiv.outerHeight()
									};

									var subComs = [];
									var childNodes = targetE.childNodes;
									for ( var i = 0, l = childNodes.length; i < l; i++) {
										var subCom = childNodes[i].component;
										if (subCom) {
											if (canvas
													.containInBound(
															dgBound,
															canvas
																	.getElementBound(subCom.element))) {
												subComs.push(subCom);
											}
										}
									}
									if (subComs.length > 0) {
										canvas.clearSelections();
									}
									for ( var i = 0, l = subComs.length; i < l; i++) {
										canvas.addSelection(subComs[i]);
									}
									if (subComs.length > 0) {
										canvas.dispatchSelectionChangedEvent();
									}
									selectDiv.remove();
								}
								selectDiv = null;
							};
							$(document).bind("mousemove", mouseMove).bind(
									"mouseup", mouseUp);
						} else {
							justep.design.BindTemplate.superclass.executeDrag
									.call(this, event, canvas);
						}
					},

					/**
					 * 绘制view的内容.
					 */
					paintContent : function(xmlNode) {
						this.createElement("<div id='" + this.id + "'></div>",
								xmlNode);
						this.componentName = "view";

						this.layoutType = xmlNode.getAttribute("type");
						var style = xmlNode.getAttribute('style');// 布局样式

						if (LayoutUtils.isAbsoluteLayout(this.layoutType)) {
							style += ';position:relative';
						}
						$(this.element).css("cssText", style);

						var pCom = this.canvas
								.findComponent(this.element.parentNode);

						if (pCom && LayoutUtils.isAbsoluteLayout(pCom)) {
							this.element.style.position = 'absolute';
						}

						var childNodes = $(xmlNode).children();
						var l = childNodes.length;
						for ( var i = 0; i < l; i++) {
							var node = childNodes[i];
							if (node.nodeType == 1) {
								this.canvas.parseXml(node, this.element);
							}
						}

						var css;
						if (LayoutUtils.isCellLayout(this.getParentComponent())) {
							css = "xui-autofill";
						} else {
//							css = "xui-container";
						}
						this.setProperty("class", css, false, true);
					},

					setFullScreen : function(config) {
						if (this.isFullScreen) {
							return;
						}
						var rootView = this.canvas.getRootView();
						if (rootView == this) {
							return;
						}
						this.oldParent = this.element.parentNode;
						this.oldNextSibling = this.element.nextSibling;
						this.oldPisition = this.element.style.position;
						this.oldBg = this.element.style.background;
						this.oldTop = this.element.style.top;
						this.oldLeft = this.element.style.left;
						this.oldWidth = this.element.style.width;
						this.oldHeight = this.element.style.height;
						this.element.parentNode.removeChild(this.element);
						rootView.getElement().appendChild(this.element);
						$(this.element).css({
							position : 'absolute',
							top : 0,
							left : 0,
							width : "100%",
							height : "100%"
						});
						if (!this.oldBg
								|| this.oldBg == 'none transparent scroll repeat 0% 0%') {
							this.element.style.background = "white";
						}
						// this.element.style.position = "absolute";
						this.updateSelectionBox();
						this.canvas.updateComTip();
						this.doLayout();
						this.isFullScreen = true;
					},
					exitFullScreen : function() {
						if (this.isFullScreen) {
							this.isFullScreen = false;
						} else {
							return;
						}
						var rootView = this.canvas.getRootView();
						if (rootView == this) {
							return;
						}
						this.element.parentNode.removeChild(this.element);
						if (this.oldNextSibling) {
							this.oldParent.insertBefore(this.element,
									this.oldNextSibling);
						} else {
							this.oldParent.appendChild(this.element);
						}
						this.element.style.position = this.oldPisition;
						this.element.style.top = this.oldTop;
						this.element.style.left = this.oldLeft;
						this.element.style.width = this.oldWidth;
						this.element.style.height = this.oldHeight;
						this.element.style.background = this.oldBg;
						this.updateSelectionBox();
						this.canvas.updateComTip();
						this.doLayout();
					},
					getActivteViewPartElement : function() {
						return this.element;
					},
					setProperty : function(p, v, isStyle, isUpdateMode) {
						justep.design.BindTemplate.superclass.setProperty.call(
								this, p, v, isStyle, isUpdateMode);
						if (p == 'style') {
							if (v.indexOf("position") == -1) {
								$(this.element).css('position', 'relative');
							}
						}
						if (p == 'layout-type') {
							this.layoutType = v;
							$(this.element).children().css("position",
									v == "flow" ? "" : "absolute");
							var canvas = this.canvas;
							$(this.element).children().each(
									function() {
										var cssText = $(this).css("cssText")
												|| "";
										var pCom = canvas.findComponent(this);
										pCom.setProperty("style", cssText,
												false, true);
									});
						}
					}
				});
