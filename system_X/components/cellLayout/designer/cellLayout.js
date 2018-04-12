var SelectionUnit = function(a) {
	this.zr10 = a
};
SelectionUnit.prototype = {
	tz22 : function(d) {
		this.bound = d;
		var j = this.zr10.element;
		var c = d.x, n = d.y, k = d.w - 1, g = d.h - 1;
		if (!this.tt7) {
			var e = "black";
			var a = "solid";
			var b = ";overflow:visible;font-size:0px;z-index:2200;position:absolute;";
			var m = [];
			m.push("top:" + n + "px;left:" + c + "px;width:1px;height:" + g
					+ "px;line-height:0px;;border-left:2px " + a + " " + e + b);
			m.push("top:" + n + "px;left:" + c + "px;width:" + k
					+ "px;height:1px;line-height:0px;;border-top:2px " + a
					+ " " + e + b);
			m.push("top:" + (n) + "px;left:" + (c + k) + "px;width:1px;height:"
					+ (g + 1) + "px;line-height:0px;;border-left:2px " + a
					+ " " + e + b);
			m.push("top:" + (n + g) + "px;left:" + c + "px;width:" + k
					+ "px;height:1px;line-height:0px;;border-top:2px " + a
					+ " " + e + b);
			this.tt7 = [];
			for ( var f = 0, c = m.length; f < c; f++) {
				this.tt7.push(this.no23(j, m[f]))
			}
		} else {
			$(this.tt7[0]).css({
				top : n + "px",
				left : c + "px",
				height : g + "px"
			});
			$(this.tt7[1]).css({
				top : n + "px",
				left : c + "px",
				width : k + "px"
			});
			$(this.tt7[2]).css({
				top : n + "px",
				left : (c + k) + "px",
				height : (g + 2) + "px"
			});
			$(this.tt7[3]).css({
				top : (n + g) + "px",
				left : c + "px",
				width : k + "px"
			})
		}
		return this
	},
	no23 : function(b, d, c) {
		var a = document.createElement("div");
		b.appendChild(a);
		a.style.cssText = d;
		return a
	},
	em24 : function() {
		return this.lw25()[2]
	},
	lw25 : function() {
		var d = this.ea26();
		var c = d.x - 2, b = d.x + d.w - 2;
		var e = this.zr10.uo47(d.x + 1, d.y + 1);
		var a = this.zr10.uo47(d.x + d.w - 3, d.y + d.h - 3);
		var f = this.zr10.em24(e[0], a[0] - 1, c, b);
		return [ e, a, f ]
	},
	ea26 : function() {
		return this.bound
	},
	dispose : function() {
		if (this.tt7) {
			for ( var b = 0, a = this.tt7.length; b < a; b++) {
				this.tt7[b].parentNode.removeChild(this.tt7[b])
			}
		}
		this.tt7 = null
	}
};
justep.design.CellLayout = function(a) {
	selctionChangeCaller = null;
	selectionClearCaller = null;
	this.zy17 = [];
	this.xc16 = {};
	this.xh21 = {
		x : 0,
		y : 0
	};
	if (a.isTest) {
		var b = document.getElementById("webExcel");
		b.innerHTML = "<div  id='" + this.id
				+ "' class='cell-layout' uiEditable='false'></div>";
		this.element = b.firstChild;
		this.init(this)
	} else {
		justep.design.CellLayout.superclass.constructor.call(this, a)
	}
};
justep
		.extend(
				justep.design.CellLayout,
				justep.design.Container,
				{
					paintContent : function(k) {
						this.gl14 = true;
						if (!this.element) {
							this
									.createElement(
											"<div  id='"
													+ this.id
													+ "' class='cell-layout' uiEditable='false' tabindex='0'></div>",
											k)
						}
						this.rowHeight = k.getAttribute("row-height");
						this.columnWidth = k.getAttribute("column-width");
						if (!this.rowHeight || this.rowHeight == "0") {
							this.rowHeight = "19"
						}
						if (!this.columnWidth || this.columnWidth == "0") {
							this.columnWidth = "80"
						}
						this.rowHeight += "px";
						this.columnWidth += "px";
						var m = k.childNodes;
						var h;
						for ( var f = 0, d = m.length; f < d; f++) {
							var c = m[f];
							if (c.tagName == "layout-content") {
								var a = c.childNodes;
								var b = [];
								for ( var e = 0; e < a.length; e++) {
									if (a[e].nodeType == 4) {
										b.push(a[e].nodeValue)
									}
								}
								h = this.canvas.loadXML(b.join(""));
								h = h.firstChild;
								k.removeChild(c);
								break
							}
						}
						this.init(this, h);
						this.paintChild(k);
						this.gl14 = false;
						var g = this.jc46();
						this.ab71(g[0], g[1])
					},
					copyCells : function() {
						if (this.zy17.length > 1) {
							alert("不能同时复制多个区域");
							return
						} else {
							if (this.zy17.length == 1) {
								var o = {};
								var f = this.zy17[0].lw25();
								var k = f[0];
								var c = f[1];
								var g = c[1] - k[1];
								var h = c[0] - k[0];
								var m = f[2];
								for ( var e = 0, d = m.length; e < d; e++) {
									var j = m[e];
									var n = o[j.parentNode.rowIndex];
									if (!n) {
										n = o[j.parentNode.rowIndex] = []
									}
									n.push(this.ay32(j))
								}
								var a = [ '<cellData rowNums="' + h
										+ '" colNums="' + g + '">' ];
								for ( var b in o) {
									a.push("<row>" + o[b].join("") + "</row>")
								}
								a.push("</cellData>");
								return a.join("")
							}
						}
					},
					parseCells : function(J) {
						var o = J.cells;
						if (o) {
							o = o.replace(new RegExp("#C1C1C1|#c1c1c1", "gm"),
									"#010101");
							var m, F;
							var z = this.zy17[0].em24();
							var b = z[0];
							var E = b.parentNode.rowIndex;
							var C = this.canvas.loadXML(o).childNodes[0];
							var aa, O;
							var K = C.childNodes;
							for ( var W = 0; W < K.length; W++) {
								var D = K[W];
								if (D.tagName == "cellData") {
									aa = D
								} else {
									if (D.tagName == "subComs") {
										O = D
									}
								}
							}
							var H = parseInt(aa.getAttribute("rowNums"));
							var G = parseInt(aa.getAttribute("colNums"));
							var p = b.parentNode.rowIndex;
							var k = this.ib59(b);
							var c = p + H - 1;
							var h = k + G - 1;
							var U = this.ew20.rows[0].cells[k];
							var Z = this.ew20.rows[0].cells[h];
							if (!Z) {
								alert("列数不足！");
								return
							}
							var e = this.ew20.rows[c];
							if (!e) {
								alert("行数不足！");
								return
							}
							var a = e.cells[0];
							var R = U.offsetLeft;
							var Q = U.offsetTop;
							var y = Z.offsetLeft + Z.offsetWidth;
							var w = a.offsetTop + a.offsetHeight;
							var s = 50000, ad = 50000, q = 0, ab = 0;
							var S = "";
							var M = this.em24(p, c, R, y);
							var N;
							for ( var W = 0; W < M.length; W++) {
								var B = M[W];
								var f = B.offsetLeft;
								var g = B.offsetTop;
								var L = B.offsetWidth + f;
								var I = B.offsetHeight + g;
								s = Math.min(s, f);
								ad = Math.min(ad, g);
								q = Math.max(L, q);
								ab = Math.max(I, ab);
								if (!S
										&& (f < R || g < Q
												|| (B.offsetWidth + f) > y || (B.offsetHeight + g) > w)) {
									S = "不能对合并单元格做部分修改！"
								}
								N = B
							}
							if (N != b) {
								this.zy17[this.zy17.length - 1].tz22({
									x : s,
									y : ad,
									w : q - s,
									h : ab - ad
								});
								this.ps33(N, true)
							}
							if (S) {
								alert(S);
								return
							}
							this.cancelCellMerging();
							var z = this.zy17[0].em24();
							var X = [];
							var Y = 0;
							var p = -1;
							for ( var W = 0; W < z.length; W++) {
								var B = z[W];
								if (p == -1) {
									p = B.parentNode.rowIndex
								}
								var r = X[B.parentNode.rowIndex - p];
								if (!r) {
									Y += 1;
									r = X[B.parentNode.rowIndex - p] = []
								}
								r.push(B)
							}
							var n = X[0];
							if (Y != H || n.length != G) {
								alert("不能对合并单元格做部分修改！");
								return
							}
							var x = aa.childNodes;
							this.zy18 = {};
							for ( var W = 0; W < x.length; W++) {
								var r = x[W];
								var v = r.childNodes;
								for ( var V = 0; V < v.length; V++) {
									var B = v[V];
									B.setAttribute("class", "cell");
									B.setAttribute("isViewPartContent", "true");
									var u = $(B).xml();
									var d = $(u).insertBefore(X[W][0])[0];
									var P = d.getAttribute("componentId");
									if (P) {
										var ac = P.split(",");
										for ( var T = 0; T < ac.length; T++) {
											this.zy18[ac[T]] = [
													d.parentNode.rowIndex,
													d.cellIndex ]
										}
									}
								}
							}
							this.mw53(z);
							this.gl14 = true;
							this.paintChild(O);
							var l = this;
							var A = this.sz29();
							this.fw9 = this.zy17[0].em24()[0];
							setTimeout(function() {
								l.element.focus()
							}, 200);
							return A
						}
					},
					ao27 : function(J) {
						var A = [ "<table class='nohead' cellspacing=0 cellpadding=0 isViewPartContent='false' style='background:white;border-collapse: collapse;table-layout:fixed; top:0px;left:0px;width:1px;'>" ];
						var u = J ? J.getElementsByTagName("tr") : [];
						var p = u.length;
						var x = u.length > 0 ? u[0].childNodes.length : 0;
						var y = Math.max(8, x);
						var e = Math.max(20, p);
						var d = {};
						for ( var F = 0; F < e; F++) {
							A.push("<tr isViewPartContent='false'>");
							var b = "cell";
							if (F == 0) {
								b += " first-row"
							}
							var a = u[F];
							if (!a) {
								for ( var E = 0; E < y; E++) {
									var g = b;
									if (F == 0 && E == 0) {
										g += " first-cell"
									}
									A.push("<td name='"
											+ (F + "-" + E)
											+ "' isViewPartContent='"
											+ ((F > 0 && E > 0) ? "true"
													: "false")
											+ "' class='"
											+ g
											+ (E > 0 ? "" : " first-col")
											+ "'"
											+ (E > 0 ? "" : " height='"
													+ this.rowHeight + "' ")
											+ (F > 0 ? "" : " width='"
													+ this.columnWidth + "' ")
											+ "></td>")
								}
							} else {
								var G = a.childNodes;
								for ( var E = 0; E < y; E++) {
									var m = G[E];
									var s = "";
									var g = b;
									if (F == 0 && E == 0) {
										g += " first-cell"
									}
									if (m) {
										var w = m.getAttribute("class");
										if (w) {
											w = w.split(" ");
											for ( var C = w.length - 1; C >= 0; C -= 1) {
												if (w[F] == "cell"
														|| w[F] == "first-col"
														|| w[F] == "first-row"
														|| w[F] == "first-cell") {
													w.splice(C, 1)
												}
											}
											g += " " + w.join(" ")
										}
										var z = [];
										var I = m.getAttribute("style");
										if (I) {
											I = I.replace(new RegExp(
													"#C1C1C1|#c1c1c1", "gm"),
													"#010101");
											z.push("style='" + I + "'")
										}
										if (F >= 0) {
											var f = m.getAttribute("rowSpan");
											if (f) {
												z.push("rowspan=" + f + "")
											}
											var l = m.getAttribute("colSpan");
											if (l) {
												z.push("colspan=" + l + "")
											}
											var o = m.getAttribute("_cellAttr");
											if (o) {
												z.push("_cellAttr='" + o + "'")
											}
											var h = m.getAttribute("format");
											if (h) {
												z.push('format="' + h + '"')
											}
											z.push("noWrap='true'");
											var H = m
													.getAttribute("componentId");
											if (H) {
												z.push("componentId='" + H
														+ "'");
												var D = H.split(",");
												for ( var r = 0; r < D.length; r++) {
													d[D[r]] = [ F, E ]
												}
											}
											s = m.text
										}
										var k = [];
										var B = m.childNodes;
										for ( var C = 0, c = B.length; C < c; C++) {
											if (B[C].nodeType == 1) {
												k.push(B[C].xml)
											} else {
												k.push(B[C].nodeValue)
											}
										}
										var q = k.join("");
										if (q) {
											q = q.replaceAll(">", "&gt;")
													.replaceAll("<", "&lt;")
										}
										A
												.push("<td "
														+ z.join(" ")
														+ " isViewPartContent='"
														+ ((F > 0 && E > 0) ? "true"
																: "false")
														+ "' class='"
														+ g
														+ (E > 0 ? ""
																: " first-col")
														+ "'"
														+ (E > 0 ? ""
																: " height='"
																		+ this.rowHeight
																		+ "' ")
														+ (F > 0 ? ""
																: " width='"
																		+ this.columnWidth
																		+ "' ")
														+ ">" + q + "</td>")
									} else {
										if (E >= x) {
											A.push("<td isViewPartContent='"
													+ ((F > 0) ? "true"
															: "false")
													+ "'  class='"
													+ g
													+ (E > 0 ? ""
															: " first-col")
													+ "'"
													+ (E > 0 ? "" : " height='"
															+ this.rowHeight
															+ "' ")
													+ (F > 0 ? "" : " width='"
															+ this.columnWidth
															+ "' ") + ">" + s
													+ "</td>")
										}
									}
								}
							}
							A.push("</tr>")
						}
						A.push("</table>");
						this.zy18 = d;
						return A.join("")
					},
					insertValidate : function(c, a) {
						if (a == this.element) {
							return "false"
						}
						var b = a.childNodes[0];
						if (b) {
							return "false"
						}
						return justep.design.CellLayout.superclass.insertValidate
								.call(this, c, a)
					},
					init : function(k, d) {
						var f = new Date().getTime();
						var j = document.getElementById("webExcel");
						var e = this.ao27(d);
						this.element.innerHTML = e;
						$("<input style='position:absolute;top:-100px;'>")
								.appendTo(this.element);
						this.ew20 = this.element.childNodes[0];
						var b = [];
						var g = false;
						var a;
						var c = $(k.element).offset();
						var i, h;
						$(this.element)
								.bind(
										"mousedown",
										function(m) {
											i = m.clientX;
											h = m.clientY;
											if (k.canvas.ctx.action != null) {
												return
											}
											var l = m.target;
											if (k.currentTextInput) {
												k.currentTextInput.blur()
											}
											var n = $(m.target);
											if (m.target.tagName != "TD"
													|| !n.hasClass("cell")) {
												if (n.hasClass("cell")
														&& n
																.hasClass("first-col")) {
													k.ps33(m.target, null, "s");
													k.zf12 = m.target.parentNode.rowIndex
												} else {
													if (n.hasClass("cell")
															&& n
																	.hasClass("first-row")) {
														k.ps33(m.target, null,
																"e");
														k.headerSelectColIndex = m.target.cellIndex
													}
												}
												return
											}
											k.wa8 = true;
											k.ob19 = l;
											if (m.button == 2
													&& k.um48(m.target)) {
												return
											}
											if (l
													.getAttribute("isViewPartContent") != "true") {
												k.rj49();
												return
											}
											k.fe54(m, l);
											k.fw9 = l;
											a = l;
											k.lx11 = a.parentNode.rowIndex
										})
								.bind("mouseup", function(m) {
									g = false;
									a = null;
									k.wa8 = false;
									if (m.ctrlKey && !k.isDragSelect) {
										m.stopPropagation();
										var n = m.target;
										var l = k.canvas.getOwnerComponent(n);
										if (l != k || !l.isSelected()) {
											k.canvas.mouseUp(m)
										}
									}
								})
								.bind(
										"mousemove",
										function(l) {
											if (!g
													&& a
													&& (Math.abs(l.clientX - i) > 1 || Math
															.abs(l.clientY - h) > 1)) {
												g = true;
												k.dragSelect(l, a, k)
											}
										})
								.bind(
										"dblclick",
										function(m) {
											var l = m.target;
											if (l.tagName == "TD"
													&& $(l).hasClass("cell")
													&& l
															.getAttribute("isViewPartContent") == "true") {
												if ($.browser.msie
														|| $.browser.safari) {
													k.dz58(l)
												} else {
													setTimeout(function() {
														k.dz58(l)
													}, 400)
												}
											}
										})
								.bind(
										"keydown",
										function(l) {
											if (!k.fw9) {
												return
											}
											var m = l.keyCode;
											if (m == 37) {
												k.mf62(k.fw9, l.shiftKey);
												return false
											} else {
												if (m == 39 || m == 9) {
													if (m == 9 && l.shiftKey) {
														k.mf62(k.fw9, false)
													} else {
														k.ag64(k.fw9,
																l.shiftKey)
													}
													return false
												} else {
													if (m == 38) {
														k.cb65(k.fw9,
																l.shiftKey);
														return false
													} else {
														if (m == 40 || m == 13) {
															if (m == 13
																	&& l.shiftKey) {
																k.cb65(k.fw9,
																		false)
															} else {
																k
																		.yu67(
																				k.fw9,
																				l.shiftKey);
																return false
															}
														} else {
															if (m == 32
																	|| m == 113) {
																k.dz58(k.an13);
																l
																		.preventDefault()
															} else {
																if (m == 46) {
																	l
																			.stopPropagation();
																	k
																			.clearCellContent()
																} else {
																	if (l.ctrlKey
																			&& (l.keyCode == 67 || l.keyCode == 88)) {
																	} else {
																		if (m == 27) {
																			if (k.zy17
																					&& k.zy17.length > 0) {
																				k
																						.rj49();
																				return false
																			}
																		}
																	}
																}
															}
														}
													}
												}
											}
										})
					},
					getComponentPosition : function(c) {
						var b = c.componentId;
						var g = this.colRowIndicsMap[b];
						if (g) {
							return g
						}
						var a = {};
						var f = document.getElementById(b);
						if (f) {
							var d = f.parentNode;
							if (this.canvas.getOwnerComponent(d) == this) {
								return d.parentNode.rowIndex + "-"
										+ d.cellIndex
							}
						}
					},
					zl28 : function(a, b) {
						var d = [];
						for ( var c = 0; c < a; c++) {
							d.push("<td isViewPartContent='true' class='cell'>"
									+ (b || "") + "</td>")
						}
						return d.join("")
					},
					stopBub : function() {
						return true
					},
					addChild : function(d, c, b) {
						if (this.canvas.insertPos) {
							c = this.canvas.insertPos.parentElement
						} else {
							if (d.rowIdx != undefined && d.colIdx != undefined) {
								c = this.ew20.rows[d.rowIdx].cells[d.colIdx];
								if (b) {
									if (b.parentNode != c) {
										b = null
									}
								}
								d.rowIdx = null
							}
						}
						if (!$(c).hasClass("cell")) {
						}
						if (c && c != this.element) {
							if (b) {
								b.parentNode.insertBefore(d.element, b)
							} else {
								c.appendChild(d.element)
							}
						} else {
							var e = this.zy18[d.control];
							var a;
							if (e) {
								var f = this.ew20.rows[e[0]];
								if (f) {
									a = f.cells[e[1]]
								}
							} else {
								this.xc16[d.control] = d;
								d.before = b
							}
							if (a || b) {
								if (a && b && b.parentNode != a) {
									b = null
								}
								if (b) {
									b.parentNode.insertBefore(d.element, b)
								} else {
									a.appendChild(d.element)
								}
								if (d.element.tagName == "TEXTAREA") {
									d.element.style.height = a.style.height
								}
							}
						}
						if (!this.gl14) {
							this.qw30();
							this.mouseDownFlag = true;
							this.mouseDownFlag = false
						}
					},
					setAutoUpdateLayoutFlag : function(a) {
						this.gl14 = a.gl14
					},
					sz29 : function() {
						var k = new Date().getTime();
						var g = this.jc46();
						this.ab71(g[0], g[1]);
						var d = this.sc45();
						var b = d.x, a = d.y;
						var h = [];
						if (b > 0 && a > 0) {
							var o = this.ew20.rows;
							h
									.push('\n  <table cellspacing="0" cellpadding="0" rowHeight="'
											+ this.rowHeight.replace("px", "")
											+ '" columnWidth="'
											+ this.columnWidth
													.replace("px", "")
											+ '" style="border-collapse:collapse;table-layout:fixed;width:1px;">\n');
							for ( var e = 0;; e++) {
								var n = o[e];
								if (!n || n.offsetTop + 2 > a) {
									break
								}
								h.push("     <tr>");
								var m = n.cells;
								for ( var c = 0;; c++) {
									var l = m[c];
									if (!l || l.offsetLeft + 2 > b) {
										break
									}
									l.noWrap = true;
									h.push(this.ay32(l, e, c))
								}
								h.push("</tr>\n")
							}
							h.push("  </table>\n")
						}
						var f = new Date().getTime();
						return h.join("")
					},
					qw30 : function(e) {
						e = e || [];
						var f = this.sz29();
						var d = "false";
						if ($.browser.msie && document.documentMode == 8) {
							var b = [];
							var c = 0;
							var a = f.indexOf(">");
							while (c != -1 && a != -1) {
								b.push(f.substring(c, a + 1));
								c = f.indexOf("<", a);
								if (c != -1) {
									var g = f.substring(a + 1, c);
									if (g) {
										b.push(this.qu31(g))
									}
								}
								a = f.indexOf(">", a + 1)
							}
							f = b.join("");
							d = "true"
						}
						f = f.replaceAll(" ", "__nbsp__");
						this.callJavaMethod("setContent", {
							isEncode : d,
							layoutContent : f,
							removeComIds : e
						});
						return f
					},
					qu31 : function(b) {
						var a = b.replace(/[^\u0000-\u00FF]/g, function(c) {
							return escape(c).replace(/(%u)(\w{4})/gi, "&#x$2;")
						});
						a = a.replace(/;/g, "");
						a = a.replace(/&#x/g, "\\u");
						return a
					},
					ay32 : function(p, l, o) {
						var d = p.style.cssText;
						var k = p.className;
						if (k) {
							var r = k.split(" ");
							for ( var f = r.length - 1; f >= 0; f -= 1) {
								if (r[f] == "cell" || r[f] == "first-col"
										|| r[f] == "first-row"
										|| r[f] == "first-cell") {
									r.splice(f, 1)
								}
							}
							k = r.join(" ")
						}
						k = k ? ' class="' + k + '" ' : "";
						d = d.replace(new RegExp("#010101", "gm"), "#C1C1C1");
						var j = (p.colSpan > 1 ? ' colSpan="' + p.colSpan + '"'
								: "")
								+ (p.rowSpan > 1 ? ' rowSpan="' + p.rowSpan
										+ '"' : "")
								+ k
								+ (d ? ' style="' + d + '"' : "");
						var q = "";
						var g = [], h = [];
						var b = p.childNodes;
						for ( var a = 0, m = b.length; a < m; a++) {
							var c = b[a];
							if (c.nodeType == 1) {
								if (c.component) {
									h.push(c.component.control)
								} else {
									if (c.getAttribute("realId")) {
										h.push(c.getAttribute("realId"))
									} else {
										g.push("<" + c.tagName + "/>")
									}
								}
							} else {
								if (l != 0 && o != 0) {
									g.push(c.nodeValue)
								}
							}
						}
						if (h.length > 0) {
							j += ' componentId="' + h.join(",") + '"'
						}
						j = this.buildOtherAttribute(p, j);
						var e = g.join("");
						if (e) {
							e = e.replace(new RegExp("<", "gm"), "&lt;");
							e = e.replace(new RegExp(">", "gm"), "&gt;")
						}
						return "<td " + j + ">" + e + "</td>"
					},
					buildOtherAttribute : function(b, a) {
						return a
					},
					ps33 : function(i, n, g) {
						this.fw9 = i;
						var c = this.vn40(i);
						var b = c.x - 3, m = c.y - 3, j = c.w, e = c.h;
						var a = [
								[
										b
												+ j
												+ ((i.parentNode.cells.length - 1 == i.cellIndex) ? -2
														: 2), m + e / 2 ],
								[
										b + j / 2,
										m
												+ e
												+ ((this.ew20.rows.length - 1 == i.parentNode.rowIndex) ? -2
														: 2) ] ];
						if (!this.resizeBoxes || this.resizeBoxes.length == 0) {
							var f = this.element;
							var d = [];
							if (!g) {
								g = "e,s"
							}
							if (g.indexOf("e") != -1) {
								d.push(this.zy34(a[0], "e", "e-resize"))
							}
							if (g.indexOf("s") != -1) {
								d.push(this.zy34(a[1], "s", "s-resize"))
							}
							this.resizeBoxes = [];
							var k = this;
							$(d.join("")).appendTo(f).each(function(h, l) {
								k.resizeBoxes.push(l)
							}).bind("mousedown", function(h) {
								if ($(this).attr("direction") == "e") {
									k.vr56(h, k.fw9, k)
								} else {
									k.bw57(h, k.fw9, k)
								}
								h.stopPropagation();
								h.preventDefault()
							})
						} else {
							$(this.resizeBoxes[0]).css("top", a[0][1]).css(
									"left", a[0][0]);
							$(this.resizeBoxes[1]).css("top", a[1][1]).css(
									"left", a[1][0])
						}
					},
					zy34 : function(c, b, d) {
						var a = "top:" + c[1] + "px;left:" + c[0] + "px;";
						return "<div class='select-box' isResizeBox='true' direction='"
								+ b
								+ "' cursor='"
								+ d
								+ "' style='cursor:"
								+ d
								+ ";z-index:3500;" + a + "'></div>"
					},
					te35 : function() {
						if (this.resizeBoxes) {
							for ( var b = 0, a = this.resizeBoxes.length; b < a; b++) {
								$(this.resizeBoxes[b]).unbind();
								this.resizeBoxes[b].parentNode
										.removeChild(this.resizeBoxes[b])
							}
							this.resizeBoxes = null
						}
					},
					or36 : function(a, c, b) {
						if (a >= b.x && a <= b.x + b.w && c >= b.y
								&& c <= b.y + b.h) {
							return true
						}
					},
					setProperty : function(o, m, y, d) {
						if (o == "layout-data") {
							if (m == this.sz29()) {
								return
							}
							if (!m) {
								this.canvas.setSelection(this);
								this.rj49();
								this.element.innerHTML = this.ao27();
								this.ew20 = this.element.childNodes[0]
							} else {
								this.canvas.setSelection(this);
								this.rj49();
								var g = this.canvas.loadXML(m);
								var w = this.ew20;
								var x = [];
								var k = w.rows;
								for ( var u = 0, s = k.length; u < s; u++) {
									var c = k[u].cells;
									for ( var t = 0, h = c.length; t < h; t++) {
										var b = c[t].childNodes;
										for ( var r = 0; r < b.length; r++) {
											if (b[r].nodeType == 1
													&& b[r].component) {
												x.push(b[r].component)
											}
										}
										for ( var r = b.length - 1; r >= 0; r--) {
											c[t].removeChild(b[r])
										}
										c[t].innerHTML = ""
									}
								}
								this.element.innerHTML = this
										.ao27(g.childNodes[0]);
								this.ew20 = this.element.childNodes[0];
								for ( var q in this.xc16) {
									x.push(this.xc16[q])
								}
								for ( var u = 0, s = x.length; u < s; u++) {
									var e = x[u];
									var q = e.control;
									var z = this.zy18[q];
									var a;
									if (z) {
										var f = this.ew20.rows[z[0]];
										if (f) {
											a = f.cells[z[1]];
											if (e.before
													&& e.before.parentNode == a) {
												a.insertBefore(e.element,
														e.before)
											} else {
												a.appendChild(e.element)
											}
										}
									}
								}
								this.xc16 = {};
								this.canvas.dispatchSelectionChangedEvent()
							}
						} else {
							if (o == "row-height") {
								if (!m || m == "0") {
									m = 19
								}
								this.rowHeight = m + "px";
								var k = this.ew20.rows;
								for ( var u = 1; u < k.length; u++) {
									k[u].cells[0].height = this.rowHeight
								}
								this.rj49();
								this.qw30()
							} else {
								if (o == "column-width") {
									if (!m || m == "0") {
										m = 80
									}
									this.columnWidth = m + "px";
									var c = this.ew20.rows[0].cells;
									for ( var u = 1; u < c.length; u++) {
										c[u].width = this.columnWidth
									}
									this.rj49();
									this.qw30()
								} else {
									justep.design.CellLayout.superclass.setProperty
											.call(this, o, m, y, d)
								}
							}
						}
					},
					setCellStyle : function(config) {
						if (!this.zy17) {
							return
						}
						if (config["border-color"] || config["border-width"]
								|| config["border-style"]) {
							return
						}
						delete config.methodType;
						delete config.methodName;
						if (!config["cell-layout-border-style"]) {
							for ( var i = 0, l = this.zy17.length; i < l; i++) {
								var cells = this.zy17[i].em24();
								for ( var j = 0, cCount = cells.length; j < cCount; j++) {
									var cell = cells[j];
									if (config["border-color"] != undefined) {
										if (cell.style.borderWidth == "") {
											continue
										}
										if (config["border-color"] == "") {
											config["border-color"] = "#000000"
										}
									}
									if (config["border-style"] != undefined) {
										if (cell.style.borderWidth == "") {
											continue
										}
									}
									$(cell).css(config);
									this.zl55(cell)
								}
							}
						} else {
							eval("style=" + config["cell-layout-border-style"]);
							var borderStyle = style.style;
							var defaultWidth = style.width + "px";
							var defaultColor = style.color;
							if (!defaultColor) {
								defaultColor = "#010101"
							}
							var defaultPattern = style.pattern;
							for ( var i = 0, l = this.zy17.length; i < l; i++) {
								var bound = this.zy17[i].ea26();
								var cells = this.zy17[i].em24();
								for ( var j = 0, cCount = cells.length; j < cCount; j++) {
									config = [];
									var cell = cells[j];
									var c = {};
									if (borderStyle == "border_all") {
										config["border-width"] = defaultWidth;
										config["border-color"] = defaultColor;
										config["border-style"] = defaultPattern;
										this.oi37(bound, cell, true, true,
												defaultWidth, defaultColor,
												defaultPattern)
									} else {
										if (borderStyle == "border_remove") {
											config["border-width"] = "";
											config["border-color"] = "";
											config["border-style"] = "";
											this.oi37(bound, cell, true, true,
													"", "", "")
										} else {
											if (borderStyle == "border_left"
													|| borderStyle == "border_outline"
													|| borderStyle == "border_left_right") {
												if (cell.offsetLeft == bound.x) {
													config["border-left-width"] = defaultWidth;
													config["border-left-color"] = defaultColor;
													config["border-left-style"] = defaultPattern;
													this.oi37(bound, cell,
															true, false,
															defaultWidth,
															defaultColor,
															defaultPattern)
												}
											}
											if (borderStyle == "border_right"
													|| borderStyle == "border_outline"
													|| borderStyle == "border_left_right") {
												if (cell.offsetLeft
														+ cell.offsetWidth == bound.x
														+ bound.w) {
													config["border-right-width"] = defaultWidth;
													config["border-right-color"] = defaultColor;
													config["border-right-style"] = defaultPattern
												}
											}
											if (borderStyle == "border_top"
													|| borderStyle == "border_outline"
													|| borderStyle == "border_top_bottom") {
												if (cell.offsetTop == bound.y) {
													config["border-top-width"] = defaultWidth;
													config["border-top-color"] = defaultColor;
													config["border-top-style"] = defaultPattern;
													this.oi37(bound, cell,
															false, true,
															defaultWidth,
															defaultColor,
															defaultPattern)
												}
											}
											if (borderStyle == "border_bottom"
													|| borderStyle == "border_outline"
													|| borderStyle == "border_top_bottom") {
												if (cell.offsetTop
														+ cell.offsetHeight == bound.y
														+ bound.h) {
													config["border-bottom-width"] = defaultWidth;
													config["border-bottom-color"] = defaultColor;
													config["border-bottom-style"] = defaultPattern
												}
											}
											if (borderStyle == "border_center_v"
													|| borderStyle == "border_center_v_h") {
												if (cell.offsetLeft
														+ cell.offsetWidth != bound.x
														+ bound.w) {
													config["border-right-width"] = defaultWidth;
													config["border-right-color"] = defaultColor;
													config["border-right-style"] = defaultPattern
												}
											}
											if (borderStyle == "border_center_h"
													|| borderStyle == "border_center_v_h") {
												if (cell.offsetTop
														+ cell.offsetHeight != bound.y
														+ bound.h) {
													config["border-bottom-width"] = defaultWidth;
													config["border-bottom-color"] = defaultColor;
													config["border-bottom-style"] = defaultPattern
												}
											}
										}
									}
									$(cell).css(config);
									this.zl55(cell)
								}
							}
						}
						this.qw30()
					},
					oi37 : function(f, k, e, h, a, g, i) {
						if (e && k.offsetLeft == f.x) {
							var b = this.pc63(k);
							if (b) {
								var j = {};
								j["border-right-width"] = a;
								j["border-right-color"] = g;
								j["border-right-style"] = i;
								$(b).css(j)
							}
						}
						if (h && k.offsetTop == f.y) {
							var d = this.dy66(k);
							if (d) {
								var j = {};
								j["border-bottom-width"] = a;
								j["border-bottom-color"] = g;
								j["border-bottom-style"] = i;
								$(d).css(j)
							}
						}
					},
					setCellStyleStr : function(d) {
						var a = d.style;
						var b = d.isClass;
						var p = d["class"];
						for ( var g = 0, c = this.zy17.length; g < c; g++) {
							var e = this.zy17[g].ea26();
							var o = this.zy17[g].em24();
							for ( var f = 0, k = o.length; f < k; f++) {
								config = [];
								var m = o[f];
								if (b == "true") {
									var n = [];
									var h = m.className;
									if (h) {
										h = h.split(" ");
										for ( var g = 0; g < h.length; g += 1) {
											if (h[g] == "cell"
													|| h[g] == "first-cell"
													|| h[g] == "first-col"
													|| h[g] == "first-row") {
												n.push(h[g])
											}
										}
									}
									if (p) {
										n.push(p)
									}
									m.className = n.join(" ")
								} else {
									m.style.cssText = a
								}
							}
						}
						this.qw30()
					},
					xf38 : function(b, a) {
						if (a < 0) {
							a = 2
						}
						this.ew20.rows[0].cells[b].style.width = a + "px";
						this.qw30()
					},
					zr39 : function(b, a) {
						if (a < 0) {
							return
						}
						this.ew20.rows[b].cells[0].style.height = a + "px";
						this.qw30()
					},
					vn40 : function(a) {
						return {
							x : a.offsetLeft,
							y : a.offsetTop,
							w : a.offsetWidth,
							h : a.offsetHeight
						}
					},
					iz41 : function(b) {
						var a = b;
						while (a) {
							if ($(a).hasClass("cell")) {
								return a
							}
							a = a.parentNode
						}
						return a
					},
					getActivteViewPartElement : function() {
						if (this.fw9) {
							return this.fw9
						}
						justep.design.CellLayout.superclass.getActivteViewPartElement
								.call(this)
					},
					ef42 : function(g, e) {
						var h = this.ew20.rows;
						var c = -1, b = -1;
						for ( var d = 0, a = h.length; d < a; d++) {
							var f = h[d].offsetTop + 2;
							if (f >= g && c == -1) {
								c = d
							}
							if (f >= e) {
								b = d - 1;
								break
							}
						}
						if (b == -1) {
							b = h.length - 1
						}
						return [ c, b ]
					},
					ym43 : function(a) {
						var e = this.ew20.rows;
						var f = e[0];
						var c = f.cells;
						for ( var d = 0, b = c.length; d < b; d++) {
							if (a >= c[d].offsetLeft
									&& a < c[d].offsetLeft + c[d].offsetWidth) {
								return c[d]
							}
						}
					},
					jv44 : function(e) {
						var d = this.ew20.rows;
						for ( var c = 1, b = d.length; c < b; c++) {
							var a = d[c].cells[0];
							if (e >= a.offsetTop
									&& e < a.offsetTop + a.offsetHeight) {
								return a
							}
						}
					},
					sc45 : function() {
						var g = this.ew20.rows;
						var h = 0, f = 0;
						for ( var d = g.length - 1; d > 0; d--) {
							var c = g[d].cells;
							for ( var b = c.length - 1; b > 0; b--) {
								var a = c[b];
								if (a.colSpan > 1
										|| a.rowSpan > 1
										|| a.firstChild
										|| (a.style.cssText && a.style.cssText != "HEIGHT: 19px")
										|| a._cellAttr) {
									var e = this.vn40(a);
									h = Math.max(e.x + e.w, h);
									f = Math.max(e.y + e.h, f)
								}
							}
						}
						return {
							x : h,
							y : f
						}
					},
					jc46 : function() {
						var a = this.sc45();
						var d = a.x, c = a.y;
						if (d > 0 && c > 0) {
							var b = this.uo47(d - 3, c - 3);
							return [ b[0] - 1, b[1] - 1 ]
						} else {
							return [ -1, -1 ]
						}
					},
					uo47 : function(g, f) {
						var j = this.ew20.rows;
						var c = j[0];
						var h = c.cells;
						var d = -1, a = -1;
						for ( var e = 0, b = h.length; e < b; e++) {
							if ((h[e].offsetLeft + 2) >= g) {
								d = e;
								break
							}
						}
						for ( var e = 0, b = j.length; e < b; e++) {
							if (j[e].offsetTop + 2 >= f) {
								a = e;
								break
							}
						}
						if (d == -1) {
							d = h.length
						}
						if (a == -1) {
							a = j.length
						}
						return [ a, d ]
					},
					em24 : function(e, g, m, a) {
						var o = this.ew20.rows;
						var h = [];
						for ( var f = e; f <= g; f++) {
							var n = o[f].cells;
							for ( var d = 0, c = n.length; d < c; d++) {
								var k = n[d];
								if (!k) {
									break
								}
								var b = k.offsetLeft;
								if (b >= m && b < a) {
									h.push(k)
								} else {
									if (b > a) {
										break
									}
								}
							}
						}
						return h
					},
					createSelectionUnit : function(a) {
						if (!a) {
							return
						}
						if (!this.um48(a)) {
							this.an13 = a;
							this.zy17.push(new SelectionUnit(this).tz22(this
									.vn40(a)));
							this.ps33(a);
							if (selctionChangeCaller) {
								clearTimeout(selectionClearCaller);
								selectionClearCaller = null;
								clearTimeout(selctionChangeCaller);
								selctionChangeCaller = null
							}
							var c = this;
							var b = a.className;
							var e = [];
							if (b) {
								b = b.split(" ");
								for ( var d = 0; d < b.length; d += 1) {
									if (b[d] != "cell" && b[d] != "first-cell"
											&& b[d] != "first-col"
											&& b[d] != "first-row") {
										e.push(b[d])
									}
								}
							}
							selctionChangeCaller = setTimeout(function() {
								if (c.canvas) {
									c.canvas.dispatchEvent({
										className : e.join(" "),
										event : "cellLayoutSelectionChanged",
										id : c.control,
										style : a.style.cssText,
										value : a.innerHTML
									})
								}
							}, 400)
						}
					},
					um48 : function(a) {
						var e = a.offsetTop + 2;
						var d = a.offsetLeft + 2;
						for ( var c = 0, b = this.zy17.length; c < b; c++) {
							if (this.or36(a.offsetLeft + 2, a.offsetTop + 2,
									this.zy17[c].ea26())) {
								return this.zy17[c]
							}
						}
					},
					rj49 : function() {
						for ( var c = 0, a = this.zy17.length; c < a; c++) {
							this.zy17[c].dispose()
						}
						this.zy17 = [];
						this.an13 = null;
						this.fw9 = null;
						this.zf12 = -1;
						this.zf12 = -1;
						this.te35();
						if (selectionClearCaller) {
							clearTimeout(selectionClearCaller);
							selectionClearCaller = null
						}
						var b = this;
						if (b.mouseDownFlag) {
							b.canvas.dispatchEvent({
								event : "cellLayoutClearSeleection",
								id : b.control
							})
						} else {
							selectionClearCaller = setTimeout(function() {
								if (b.canvas) {
									b.canvas.dispatchEvent({
										event : "cellLayoutClearSeleection",
										id : b.control
									})
								}
							}, 400)
						}
					},
					dk50 : function(a, c, g) {
						var b = a.parentNode.rowIndex + "-" + a.cellIndex;
						var f = a.childNodes;
						for ( var e = f.length - 1; e >= 0; e--) {
							if (f[e]) {
								var d = f[e].component;
								if (d) {
									c.push(d.id);
									this.colRowIndicsMap[d.id] = b
								}
							}
						}
					},
					md51 : function(b, a) {
						b = (b.length || b.length == 0) ? b : [ b ];
						for ( var c = b.length - 1; c >= 0; c--) {
							this.dk50(b[c], a)
						}
					},
					dz52 : function() {
					},
					colRowIndicsMap : {},
					mw53 : function(c, e, b, a) {
						this.stopFireUpdateContent = true;
						try {
							c = (c.length || c.length == 0) ? c : [ c ];
							if (a) {
								for ( var d = c.length - 1; d >= 0; d--) {
									this.dk50(c[d], a)
								}
							}
							if (!a) {
								a = [];
								for ( var d = c.length - 1; d >= 0; d--) {
									this.dk50(c[d], a)
								}
								if (a.length > 0) {
									this.canvas.dispatchEvent({
										event : "removeSelections",
										selections : JSON.stringify(a)
									})
								}
							}
							for ( var d = c.length - 1; d >= 0; d--) {
								if (!b) {
									(e || c[d].parentNode).removeChild(c[d])
								}
							}
							if (b) {
								for ( var d = c.length - 1; d >= 0; d--) {
									c[d].innerHTML = "";
									c[d].setAttribute("componentId", "")
								}
							}
						} finally {
							this.stopFireUpdateContent = false
						}
					},
					clearCellContent : function() {
						var b = this.zy17.length;
						var a = [];
						this.colRowIndicsMap = {};
						for ( var d = 0; d < b; d++) {
							var c = this.zy17[d].em24();
							this.mw53(c, null, true, a)
						}
						if (b > 0) {
							this.qw30(a)
						}
					},
					fe54 : function(c, a) {
						if (!a) {
							return
						}
						var b = this.zy17.length;
						if (c.ctrlKey) {
							this.createSelectionUnit(a)
						} else {
							if (c.shiftKey && b > 0) {
								var d = c.target;
								d = this.iz41(d);
								if (!d
										|| d.tagName != "TD"
										|| d.getAttribute("isViewPartContent") != "true") {
									return
								}
								this.um68(d)
							} else {
								if (this.fw9 != a) {
									this.rj49();
									this.createSelectionUnit(a)
								}
							}
						}
					},
					executeDrag : function(b, a) {
						if (this.wa8) {
							return
						}
						justep.design.CellLayout.superclass.executeDrag.call(
								this, b, a)
					},
					dragSelect : function(f, a, b) {
						try {
							var d = b.um48(a);
							if (!d) {
								return
							}
							justep.design.Util.setCapture(a);
							b.element.style.cursor = "default";
							var c = function(e) {
								var i = e.target;
								i = b.iz41(i);
								if (!i
										|| i.tagName != "TD"
										|| i.getAttribute("isViewPartContent") != "true") {
									return
								}
								b.um68(i);
								b.isDragSelect = true;
								e.stopPropagation()
							};
							var h = function(e) {
								justep.design.Util.releaseCapture(a);
								$(b.element).unbind("mouseover", c).unbind(
										"mouseup", h);
								b.isDragSelect = false;
								e.stopPropagation()
							};
							$(b.element).bind("mouseover", c)
									.bind("mouseup", h)
						} catch (g) {
							alert("选择出错" + g)
						}
					},
					zl55 : function(a) {
						var b = this.vn40(a);
						this.xh21.x = Math.max(this.xh21.x, b.x + b.w - 2);
						this.xh21.y = Math.max(this.xh21.y, b.y + b.h - 2)
					},
					vr56 : function(b, g, j) {
						j.isResize = true;
						justep.design.Util.setCapture(g);
						var e = document;
						var i = g.offsetWidth - 1;
						var c = j.element.clientHeight;
						var k = $(
								"<div class='col-resize-line' style='top:"
										+ j.element.scrollTop + "px;left:"
										+ (g.offsetLeft) + "px;width:" + i
										+ "px;height:" + c + "px'></div>")
								.appendTo(j.element);
						var a = i;
						var f = b.clientX;
						e.onmousemove = function(h) {
							var d = (h || window.event).clientX - f + i;
							if (d > 5) {
								k.css("width", a = d)
							}
						};
						e.onmouseup = function(m) {
							j.isResize = false;
							justep.design.Util.releaseCapture(g);
							k.remove();
							k = null;
							e.onmousemove = null;
							e.onmouseup = null;
							e = null;
							if (a != i) {
								var n = j.vn40(g);
								var d = j.ym43(n.x + n.w - 2);
								if (d) {
									j
											.xf38(d.cellIndex, d.offsetWidth
													+ (a - i))
								}
								j.ps33(g, true);
								var l = j.um48(g);
								if (l) {
									var h = l.ea26();
									l.tz22({
										x : h.x,
										y : h.y,
										w : h.w + (a - i),
										h : h.h
									})
								}
							}
						}
					},
					bw57 : function(a, h, i) {
						i.isResize = true;
						justep.design.Util.setCapture(h);
						var c = document;
						var b = h.offsetHeight - 1;
						var g = i.element.clientWidth;
						var j = $(
								"<div class='row-resize-line' style='top:"
										+ (h.offsetTop) + "px;left:"
										+ (i.element.scrollLeft) + "px;width:"
										+ g + "px;height:" + b + "px'></div>")
								.appendTo(i.element);
						var f = b;
						var e = a.clientY;
						c.onmousemove = function(k) {
							var d = (k || window.event).clientY - e + b;
							if (d > 5) {
								j.css("height", f = d)
							}
						};
						c.onmouseup = function(m) {
							i.isResize = false;
							justep.design.Util.releaseCapture(h);
							j.remove();
							j = null;
							c.onmousemove = null;
							c.onmouseup = null;
							c = null;
							if (f != b) {
								var n = i.vn40(h);
								var k = i.jv44(n.y + n.h - 2);
								if (k) {
									i.zr39(k.parentNode.rowIndex,
											k.offsetHeight + (f - b))
								}
								i.ps33(h, true);
								var l = i.um48(h);
								if (l) {
									var d = l.ea26();
									l.tz22({
										x : d.x,
										y : d.y,
										w : d.w,
										h : d.h + (f - b)
									})
								}
							}
						}
					},
					dz58 : function(a) {
						var h = a.childNodes;
						for ( var f = 0, b = h.length; f < b; f++) {
							if (h[f].nodeType == 1 && h[f].component) {
								return
							}
						}
						document.body.onselectstart = "";
						var d = $("<textarea  style='top:"
								+ a.offsetTop
								+ "px;left:"
								+ a.offsetLeft
								+ "px;border:1px solid;position:absolute;font:normal 12px 宋体, arial, serif;overflow:visible;word-wrap:normal;z-index:8000;overflow-y:hidden'/>")[0];
						var g = a.innerHTML;
						d.value = g.replaceAll("&nbsp;", " ").replaceAll(
								"<BR>", "\r\n").replaceAll("&lt;", "<")
								.replaceAll("&gt;", ">");
						var e = this.ly61(d.value);
						$(d).css({
							width : Math.max(a.offsetWidth, e.w) + "px",
							height : Math.max(a.offsetHeight, e.h) + "px"
						});
						this.element.appendChild(d);
						d.onmousedown = function() {
							window.event.cancelBubble = true
						};
						d.onmouseup = function() {
							window.event.cancelBubble = true
						};
						d.onmousemove = function() {
							window.event.cancelBubble = true
						};
						d.onkeydown = function() {
							if (event.keyCode == 13) {
								if (event.altKey) {
									var j = document.selection.createRange();
									j.text = "\r\n"
								} else {
									d.blur();
									c.createSelectionUnit(a);
									setTimeout(function() {
										c.element.focus()
									}, 100)
								}
							}
							var i = c.ly61(d.value);
							$(d).css({
								width : Math.max(a.offsetWidth, i.w) + "px",
								height : Math.max(a.offsetHeight, i.h) + "px"
							});
							window.event.cancelBubble = true
						};
						var c = this;
						c.currentTextInput = d;
						d.onblur = function(k) {
							document.body.onselectstart = function() {
								return false
							};
							var j = d.value || "";
							var i = j.replaceAll("\r\n", "<BR>").replaceAll(
									" ", "&nbsp;").replaceAll("<", "&lt;")
									.replaceAll(">", "&gt;");
							a.innerHTML = i;
							c.zl55(a);
							c.currentTextInput = null;
							c.labelChanging = false;
							c.element.removeChild(d);
							c.qw30();
							a.focus()
						};
						if ($.browser.msie) {
							this.rj49();
							setTimeout(function() {
								d.focus();
								var i = d.createTextRange();
								i.moveStart("character", d.value.length);
								i.collapse(true);
								i.select()
							}, 1)
						} else {
							d.focus()
						}
					},
					
					setDataRegion : function(){
						var selections = this.zy17,headerSelectRowIndex=this.zf12,mainTable = this.ew20;
						if ((!selections[0] || selections[0].em24().length == 0)
								&& !(headerSelectRowIndex >= 0)) {
							return
						}
						
						var m = [];
						if (headerSelectRowIndex >= 0) {
							m = [headerSelectRowIndex]
						} else {
							var colRowIndics=selections[0].lw25(),startIndics = colRowIndics[0],endIndics = colRowIndics[1];// selections.getCellsWithColRowIndics
																															// ;
							for ( var t = startIndics[0]; t < endIndics[0]; t++) {
								m.push(t);
							}
							m = m.sort(function(j, i) {
								return j.rowIndex > i.rowIndex
							})
						}
						var repeatData = prompt("设置数据区域:" +  m.join(","));
						if(!repeatData) return;
						this.callJavaMethod("addDataRegion", {
							data : repeatData,
							rows : m.join(",")
						});
					},
					
					mergeCell : function() {
						var a = [];
						for ( var h = 0, e = this.zy17.length; h < e; h++) {
							a.push(this.zy17[h].ea26())
						}
						if (this.cq69(a)) {
							alert("选择区域存在交集，不能合并");
							return
						}
						var g = [];
						this.colRowIndicsMap = {};
						for ( var h = 0, e = this.zy17.length; h < e; h++) {
							var f = this.zy17[h].ea26();
							var c = f.x - 2, b = f.x + f.w - 2;
							var o = this.uo47(f.x + 1, f.y + 1);
							var d = this.uo47(f.x + f.w - 3, f.y + f.h - 3);
							var m = d[0] - o[0];
							var j = d[1] - o[1];
							var k = this.em24(o[0], d[0] - 1, c, b);
							if (j > 1) {
								k[0].colSpan = j
							}
							if (m > 1) {
								k[0].rowSpan = m
							}
							var n = k[0];
							k.splice(0, 1);
							this.mw53(k, null, null, g);
							this.ps33(n, true);
							this.zl55(n)
						}
						this.qw30(g)
					},
					cancelCellMerging : function() {
						var n = this.ew20.rows;
						for ( var s = 0, q = this.zy17.length; s < q; s++) {
							var d = this.zy17[s].ea26();
							var u = d.x - 2, t = d.x + d.w - 2;
							var x = this.uo47(d.x + 1, d.y + 1);
							var w = this.uo47(d.x + d.w - 3, d.y + d.h - 3);
							var h = w[0] - x[0];
							var k = w[1] - x[1];
							var c = this.em24(x[0], w[0] - 1, u, t);
							for ( var r = 0, m = c.length; r < m; r++) {
								var k = c[r].colSpan;
								var h = c[r].rowSpan;
								if (k > 1) {
									$(this.zl28(k - 1)).insertAfter(c[r]);
									c[r].colSpan = 1
								}
								if (h > 1) {
									var y = this.zl28(k);
									var v = c[r].offsetLeft;
									var o = this.ef42(c[r].offsetTop,
											c[r].offsetTop + c[r].clientHeight);
									for ( var f = o[0] + 1; f <= o[1]; f++) {
										var g = n[f].cells;
										for ( var b = 0, a = g.length; b < a; b++) {
											var e = g[b];
											var p = g[b + 1];
											if (e.offsetLeft < v
													&& ((p && p.offsetLeft > v) || !p)) {
												$(y).insertAfter(e);
												break
											}
										}
									}
									c[r].rowSpan = 1
								}
							}
						}
						this.ps33(this.fw9, true);
						this.qw30()
					},
					insertRowAfter : function() {
						this.insertRow(true)
					},
					insertRow : function(o) {
						if (this.zy17.length > 1) {
							alert("有多个选择区域时不能插入");
							return
						}
						if (this.zy17.length == 0) {
							alert("请选择单元格");
							return
						}
						var m = this.zy17[0];
						var d = 0;
						var l = -1;
						var b = null;
						var n = null;
						if (m && m.em24().length > 0) {
							var k = m.em24()[0];
							var a = k.parentNode;
							var g = a.previousSibling;
							l = a.rowIndex;
							while (g) {
								for ( var e = 0; e < g.cells.length; e++) {
									var c = g.cells[e];
									if (c.rowSpan >= 2
											&& g.rowIndex + c.rowSpan > l) {
										c.rowSpan = c.rowSpan + 1;
										d += c.colSpan
									}
								}
								g = g.previousSibling
							}
						} else {
							if (this.zf12 >= 0) {
								l = this.zf12
							}
						}
						if (o == true) {
							l++
						}
						var f = 0;
						var j = this.ew20.rows[0].cells.length - d;
						var h = l != -1 ? this.ew20.insertRow(l) : this.ew20
								.insertRow();
						h.setAttribute("isViewPartContent", "false");
						for ( var e = 0; e < j; e++) {
							var c = h.insertCell();
							c.className = "cell" + (e == 0 ? " first-col" : "");
							if (e == 0) {
								c.height = this.rowHeight
							}
							c.setAttribute("isViewPartContent", "true");
							if (e == 0) {
								f = c.offsetHeight
							}
						}
						this.rj49();
						this.qw30()
					},
					insertColAfter : function() {
						this.insertCol(true)
					},
					insertCol : function(f) {
						var e = new Date();
						if (this.zy17.length > 1) {
							alert("有多个选择区域时不能插入");
							return
						}
						if (this.zy17.length == 0) {
							alert("请选择单元格");
							return
						}
						var v = this.zy17[0];
						if (v && v.em24().length > 0
								|| this.headerSelectColIndex >= 0) {
							var u = null;
							if (this.headerSelectColIndex >= 0) {
								var u = this.fw9
							} else {
								var u = v.em24()[0]
							}
							var n = this.ib59(u);
							if (f == true) {
								n++
							}
							var q = this.ew20.rows.length;
							var g = [];
							var m = [];
							var d = [];
							for ( var t = 0; t < q; t++) {
								var a = this.ew20.rows[t];
								g[t] = a.cells.length;
								for ( var s = 1, r = a.cells.length; s < r; s++) {
									var k = a.cells[s];
									var o = k.cellIndex;
									if (t <= q) {
										o = this.ib59(k);
										if (o == -1) {
											break
										}
									}
									if (o == n) {
										g[t] = k.cellIndex;
										break
									} else {
										if (k.colSpan >= 2 && o + k.colSpan > n) {
											m.push(k);
											d.push(k.colSpan + 1);
											break
										} else {
											if (o + 1 == n) {
												var h = k.nextSibling;
												if (h) {
													g[t] = h.cellIndex;
													break
												}
											} else {
												if (o > n) {
													break
												}
											}
										}
									}
								}
							}
							for ( var t = 0; t < m.length; t++) {
								m[t].colSpan = d[t]
							}
							var p = 0;
							for ( var t = 0; t < this.ew20.rows.length; t++) {
								if (g[t] != -1) {
									var a = this.ew20.rows[t];
									var b = a.insertCell(g[t]);
									b.className = "cell"
											+ (t == 0 ? " first-row" : "");
									if (t == 0) {
										b.width = this.columnWidth
									}
									b.setAttribute("isViewPartContent", "true");
									if (t == 0) {
										p = b.offsetWidth
									}
								}
							}
							this.rj49()
						} else {
							for ( var t = 0; t < this.ew20.rows.length; t++) {
								var a = this.ew20.rows[t];
								var b = a.insertCell();
								b.className = "cell"
										+ (t == 0 ? " first-row" : "");
								if (t == 0) {
									b.width = this.columnWidth
								}
								b.setAttribute("isViewPartContent", "true")
							}
						}
						var c = new Date();
						this.qw30()
					},
					deleteRow : function() {
						if ((!this.zy17[0] || this.zy17[0].em24().length == 0)
								&& !(this.zf12 >= 0)) {
							return
						}
						var m = [];
						if (this.zf12 >= 0) {
							m = [ this.ew20.rows[this.zf12] ]
						} else {
							var l = {};
							for ( var t = 0; t < this.zy17.length; t++) {
								var e = this.zy17[t].em24();
								for ( var s = 0; s < e.length; s++) {
									var b = e[s].parentNode;
									var n = b.rowIndex;
									if (!l["_" + n]) {
										m.push(b);
										l["_" + n] = true
									}
									for ( var r = 1; r < e[s].rowSpan; r++) {
										if (!l["_" + (n + r)]) {
											m.push(this.ew20.rows[n + r]);
											l["_" + (n + r)] = true
										}
									}
								}
							}
							m = m.sort(function(j, i) {
								return j.rowIndex > i.rowIndex
							})
						}
						var p = m[m.length - 1].previousSibling;
						while (p) {
							for ( var t = 0; t < p.cells.length; t++) {
								var h = p.cells[t];
								if (h.rowSpan >= 2) {
									for ( var s = 0; s < m.length; s++) {
										if (p.rowIndex + h.rowSpan > m[s].rowIndex) {
											h.rowSpan = h.rowSpan - 1
										}
									}
								}
							}
							p = p.previousSibling
						}
						var u = [];
						this.colRowIndicsMap = {};
						for ( var t = m.length - 1; t >= 0; t--) {
							var g = m[t];
							for ( var s = 0; s < g.cells.length; s++) {
								var c = g.cells[s];
								if (c.rowSpan >= 2) {
									var q = this.ib59(c);
									var a = g.nextSibling;
									for ( var r = 0; r < a.cells.length; r++) {
										var o = a.cells[r];
										var f = this.ib59(o);
										if (f >= q) {
											var d = a.insertCell(o.cellIndex);
											d.rowSpan = c.rowSpan - 1;
											d.colSpan = c.colSpan;
											d.className = "cell";
											d.setAttribute("isViewPartContent",
													"true");
											break
										}
									}
								}
							}
							this.mw53(g.cells, g, null, u);
							this.ew20.deleteRow(g.rowIndex)
						}
						this.rj49();
						this.qw30(u)
					},
					deleteCol : function() {
						if ((!this.zy17[0] || this.zy17[0].em24().length == 0)
								&& !(this.headerSelectColIndex >= 0)) {
							return
						}
						var p = [];
						var a = [];
						if (this.headerSelectColIndex >= 0) {
							a
									.push(this
											.vn40(this.ew20.rows[0].cells[this.headerSelectColIndex]))
						} else {
							for ( var b = 0; b < this.zy17.length; b++) {
								a.push(this.zy17[b].ea26())
							}
						}
						for ( var f = 0; f < this.ew20.rows.length; f++) {
							var o = this.ew20.rows[f];
							for ( var e = 0; e < o.cells.length; e++) {
								var n = o.cells[e];
								var h = this.vn40(n);
								for ( var b = 0; b < a.length; b++) {
									var d = a[b];
									if (Math.max(h.x, d.x) < Math.min(
											h.x + h.w, d.x + d.w)) {
										var g = {};
										g.rowIndex = f;
										g.cellIndex = n.cellIndex;
										if (n.colSpan > 1) {
											g.colSpan = n.colSpan - 1
										} else {
											g.del = true
										}
										p.push(g);
										break
									}
								}
							}
						}
						var c = [];
						this.colRowIndicsMap = {};
						for ( var f = p.length - 1; f >= 0; f--) {
							var m = p[f].rowIndex;
							var l = p[f].cellIndex;
							var o = this.ew20.rows[m];
							if (p[f].del) {
								this.mw53(o.cells[l], o, null, c)
							} else {
								o.cells[l].colSpan = p[f].colSpan
							}
						}
						this.rj49();
						this.qw30(c)
					},
					ib59 : function(d) {
						try {
							var c = this.vn40(d);
							var a = this.ym43(c.x, c.w - 2);
							return a.cellIndex
						} catch (b) {
							return -1
						}
					},
					ro60 : function() {
						var c = [];
						var b = this.ew20.rows[0].cells;
						for ( var e = 1; e < b.length; e++) {
							var f = this.vn40(b[e]);
							for ( var a = 0; a < this.zy17.length; a++) {
								var d = this.zy17[a].ea26();
								if (f.x >= d.x && f.x < d.x + d.w) {
									c.push(b[e].cellIndex);
									break
								}
							}
						}
						return c
					},
					ly61 : function(d) {
						var c = window.tempSpan;
						if (!c) {
							c = document.createElement("span");
							c.style.position = "absolute";
							c.style.top = "-100px";
							c.style.font = "normal 13px 宋体, arial, serif;";
							document.body.appendChild(c);
							window.tempSpan = c
						}
						c.style.display = "";
						c.innerHTML = d.replaceAll("\r\n", "<BR>").replaceAll(
								" ", "&nbsp;");
						var a = c.offsetWidth;
						var b = c.offsetHeight * 1.3;
						c.style.display = "none";
						return {
							w : a,
							h : b
						}
					},
					mf62 : function(c, a) {
						var b = this.pc63(c);
						if (b && b.cellIndex > 0) {
							if (b.offsetLeft < this.element.scrollLeft) {
								this.element.scrollLeft = b.offsetLeft
							}
							if (!a) {
								this.rj49();
								this.createSelectionUnit(b)
							} else {
								this.um68(b)
							}
						}
					},
					pc63 : function(c) {
						var j = this.vn40(c);
						var n = this.ym43(j.x, j.w - 2);
						var h = n.previousSibling;
						if (!h) {
							return
						}
						var m = this.vn40(h);
						var a = null;
						var g = c.parentNode;
						if (c.rowSpan > 1) {
							try {
								g = this.ew20.rows[this.lx11]
							} catch (f) {
							}
						}
						while (g && !a) {
							for ( var d = 1, b = g.cells.length; d < b; d++) {
								var k = this.vn40(g.cells[d]);
								if (Math.max(m.x, k.x) < Math.min(m.x + m.w,
										k.x + k.w)) {
									a = g.cells[d];
									break
								}
							}
							g = g.previousSibling
						}
						return a
					},
					ag64 : function(b, f) {
						var j = this.vn40(b);
						var o = this.ym43(j.x, j.w - 2);
						var m = o.nextSibling;
						if (!m) {
							return
						}
						for ( var d = 1; d < b.colSpan; d++) {
							if (m) {
								m = m.nextSibling
							}
						}
						if (!m) {
							return
						}
						var n = this.vn40(m);
						var c = null;
						var h = b.parentNode;
						if (b.rowSpan > 1) {
							try {
								h = this.ew20.rows[this.lx11]
							} catch (g) {
							}
						}
						while (h && !c) {
							for ( var d = 1, a = h.cells.length; d < a; d++) {
								var k = this.vn40(h.cells[d]);
								if (Math.max(n.x, k.x) < Math.min(n.x + n.w,
										k.x + k.w)) {
									c = h.cells[d];
									break
								}
							}
							h = h.previousSibling
						}
						if (c) {
							if (c.offsetLeft + c.offsetWidth + 20 > this.element.scrollLeft
									+ this.element.offsetWidth) {
								this.element.scrollLeft = this.element.scrollLeft
										+ c.offsetWidth
							}
							if (!f) {
								this.rj49();
								this.createSelectionUnit(c)
							} else {
								this.um68(c)
							}
						}
					},
					cb65 : function(c, a) {
						var b = this.dy66(c);
						if (!b || b.parentNode.rowIndex == 0) {
							return
						}
						if (b.offsetTop < this.element.scrollTop) {
							this.element.scrollTop = b.offsetTop
						}
						if (!a) {
							this.rj49();
							this.createSelectionUnit(b)
						} else {
							this.um68(b)
						}
						this.lx11 = b.parentNode.rowIndex
					},
					dy66 : function(g) {
						var d = null;
						var f = g.parentNode.previousSibling;
						while (f && !d) {
							var e = this.vn40(g);
							for ( var b = 1, a = f.cells.length; b < a; b++) {
								var c = this.vn40(f.cells[b]);
								if (Math.max(e.x, c.x) < Math.min(e.x + e.w,
										c.x + c.w)) {
									d = f.cells[b];
									break
								}
							}
							f = f.previousSibling
						}
						return d
					},
					yu67 : function(h, c) {
						var d = null;
						var b = h.parentNode.nextSibling;
						while (b && !d) {
							var g = this.vn40(h);
							for ( var e = 1, a = b.cells.length; e < a; e++) {
								var f = this.vn40(b.cells[e]);
								if (Math.max(g.x, f.x) < Math.min(g.x + g.w,
										f.x + f.w)) {
									d = b.cells[e];
									break
								}
							}
							b = b.nextSibling
						}
						if (!d) {
							return
						}
						if (d.offsetTop + d.offsetHeight + 20 > this.element.scrollTop
								+ this.element.offsetHeight) {
							this.element.scrollTop = this.element.scrollTop
									+ d.offsetHeight
						}
						if (!c) {
							this.rj49();
							this.createSelectionUnit(d)
						} else {
							this.um68(d)
						}
						this.lx11 = d.parentNode.rowIndex
					},
					um68 : function(g) {
						this.fw9 = g;
						var m = this;
						var l = m.vn40(this.an13);
						var b = l.x, k = l.y;
						var a = b + l.w, i = k + l.h;
						if ($(g).hasClass("first-row")
								|| $(g).hasClass("first-col")) {
							return
						}
						var e = m.vn40(g);
						var d = Math.min(b, e.x);
						var c = Math.min(k, e.y);
						var j = Math.max(a, e.x + e.w) - d;
						var f = Math.max(i, e.y + e.h) - c;
						this.zy17[this.zy17.length - 1].tz22({
							x : d,
							y : c,
							w : j,
							h : f
						});
						m.ps33(g, true)
					},
					cq69 : function(e) {
						for ( var d = 0; d < e.length; d++) {
							var c = e[d];
							for ( var b = d + 1; b < e.length; b++) {
								var a = e[b];
								if (Math.max(c.x, a.x) < Math.min(c.x + c.w,
										a.x + a.w)
										&& Math.max(c.y, a.y) < Math.min(c.y
												+ c.h, a.y + a.h)) {
									return true
								}
							}
						}
						return false
					},
					importFromExcel : function() {
					},
					getCurrentCellValue : function() {
						if (this.fw9) {
							return this.fw9.innerHTML
						} else {
							return ""
						}
					},
					setCurrentCellValue : function(a) {
						if (this.fw9) {
							this.fw9.innerHTML = a.data
						}
					},
					getCurrentCellProperties : function() {
						var d = {
							width : 80,
							height : 19
						};
						var c = this.gz70();
						for ( var b = 0; b < c.length; b++) {
							var g = c[b];
							var f = g.cells[0].style.height;
							if (b == 0) {
								if (f) {
									d.height = f
								} else {
									d.height = "19px"
								}
							} else {
								if (f && f != d.height) {
									d.height = "0px";
									break
								}
							}
						}
						d.height = parseInt(d.height.replace("px", ""));
						var e = this.ro60();
						for ( var b = 0; b < e.length; b++) {
							var a = this.ew20.rows[0].cells[e[b]];
							if (b == 0) {
								d.width = a.offsetWidth - 1
							} else {
								if (d.width != a.offsetWidth - 1) {
									d.width = 0;
									break
								}
							}
						}
						return JSON.stringify(d)
					},
					setCellProperties : function(f) {
						var d = [];
						for ( var g = 0; g < this.zy17.length; g++) {
							var b = this.zy17[g];
							var m = b.em24();
							if (m.length > 0) {
								d.push({
									sel : b,
									cells : m
								})
							}
						}
						if (f.columnWidth != 0) {
							var h = this.ro60();
							for ( var g = 0; g < h.length; g++) {
								this.ew20.rows[0].cells[h[g]].style.width = f.columnWidth
										+ "px"
							}
						}
						if (f.rowHeight != 0) {
							var n = this.gz70();
							for ( var g = 0; g < n.length; g++) {
								n[g].cells[0].style.height = f.rowHeight + "px"
							}
						}
						for ( var g = 0; g < d.length; g++) {
							var b = d[g].sel;
							var m = d[g].cells;
							var c = 9999, k = 9999, l = 0, a = 0;
							for ( var e = 0; e < m.length; e++) {
								c = Math.min(c, m[e].offsetLeft);
								k = Math.min(k, m[e].offsetTop);
								l = Math.max(l, m[e].offsetLeft
										+ m[e].offsetWidth);
								a = Math.max(a, m[e].offsetTop
										+ m[e].offsetHeight)
							}
							b.tz22({
								x : c,
								y : k,
								w : l - c,
								h : a - k
							})
						}
						this.qw30()
					},
					gz70 : function() {
						var g = [];
						if (this.zf12 >= 0) {
							g = [ this.ew20.rows[this.zf12] ]
						} else {
							var e = {};
							for ( var d = 0; d < this.zy17.length; d++) {
								var c = this.zy17[d].em24();
								for ( var b = 0; b < c.length; b++) {
									var f = c[b].parentNode;
									var h = f.rowIndex;
									if (!e["_" + h]) {
										g.push(f);
										e["_" + h] = true
									}
									for ( var a = 1; a < c[b].rowSpan; a++) {
										if (!e["_" + (h + a)]) {
											g.push(this.ew20.rows[h + a]);
											e["_" + (h + a)] = true
										}
									}
								}
							}
							g = g.sort(function(j, i) {
								return j.rowIndex > i.rowIndex
							})
						}
						return g
					},
					ab71 : function(m, o) {
						for ( var e = 1; e <= m; e++) {
							var g = this.ew20.rows[e];
							if (!g) {
								break
							}
							var n = g.cells.length;
							var a = g.cells[0].style.height;
							if (a) {
								a = parseInt(a.replace("px", ""))
							} else {
								a = 19
							}
							for ( var d = 1; d <= o && d < n; d++) {
								var p = g.cells[d];
								if (!p) {
									break
								}
								if (p.rowSpan < 2) {
									p.style.height = a + "px"
								} else {
									var r = a;
									for ( var c = 1; c < p.rowSpan; c++) {
										var f = this.ew20.rows[e + c].cells[0].style.height;
										if (f) {
											f = parseInt(f.replace("px", ""))
										} else {
											f = 19
										}
										r += f
									}
									p.style.height = r + "px"
								}
								var q = p.childNodes;
								for ( var c = 0, b = q.length; c < b; c++) {
									if (q[c].tagName == "TEXTAREA") {
										q[c].style.height = p.style.height
									}
								}
							}
						}
					},
					showHideCellBorder : function() {
						var a = this.ew20.className;
						if (a.indexOf("nocellborder") == -1) {
							a += " nocellborder"
						} else {
							a = a.replace("nocellborder", "")
						}
						this.ew20.className = a
					}
				});