define(
		"base/components/knockout/bindTemplate",
		[ "require", "jquery", "bind", "base/lib/bind/express",
				"base/lib/bind/bindComponent", "base/lib/bind/model",
				"./bindTemplate.config" ],
		function(require, $, Bind, Express, BindComponent, Model,
				ComponentConfig) {
			var Component = butone.Component;
			var Data = Model.Data;
			var url = "$model/UI/base/components/knockout/bindTemplate";
			var rowClickCallback = function(evt) {
				evt.data.comp._doRowClick(evt);
				return true;
			};
			var BindTemplate = BindComponent
					.extend({

						getConfig : function() {
							return ComponentConfig;
						},

						constructor : function(config) {
							this.filter = config.filter;
							this.limit = config.hasOwnProperty("limit") ? config.limit
									: -1;
							this.id = config.id;
							this.relDatas = config.relDatas;
							this.list = config.list;
							this.data = config.data;
							this.shadow = config.shadow;
							this.virtual = config.virtual;
							if (config.owner
									&& config.owner instanceof BindTemplate)
								this.owner = config.owner;

							this.pageIndex = Bind.observable(-1);
							this._canLoadData = false;
							this.hasMore = false;

							this.disablePullToRefresh = false;
							this.disableInfiniteLoad = false;
							this.callParent(config);

						},

						buildTemplate : function(config) {
							config = config || {};
							if (config.virtual)
								return;
							this.set(config);
							if (!config['class'])
								config['class'] = 'x-list';
							var id = config.id || justep.Utils.randomString();
							var $list = $("<div class='"
									+ config['class']
									+ "' "
									+ (config.style ? (" style='"
											+ config.style + "' ") : "")
									+ (id ? (" id='" + id + "' ") : "")
									+ " component='" + url + "' " + " >"
									+ (config.template ? config.template : '')
									+ "</div>");

							var $tpl = $list.hasClass("x-list-template") ? $list
									: $list.find('.x-list-template:first');
							if (config.data) {
								var foreachFunc = "$model.foreach_" + id
										+ "($element)";
								var foreachAfterRenderFunc = "$model.foreach_afterRender_"
										+ id + ".bind($model,$element)";
								$tpl.hide().attr(
										'bind-foreach',
										"{data:" + foreachFunc
												+ ",afterRender:"
												+ foreachAfterRenderFunc + "}");
							}
							return $list;
						},

						_doVirtualElementAfterRender : function(evt) {
							var me = evt.source, td = $("td.autoMegre:eq(0)",
									evt.$element);
							if (td.length > 0) {
								var prev = td.parent().prevAll("tr." + me.id)
										.children("td.autoMegre:eq(0)");
								if (prev.length > 0 && prev.text() == td.text()) {
									var rowSpan = prev[0].rowSpan ? prev[0].rowSpan
											: 1;
									var rowCount = prev.attr("rowCount") ? parseInt(prev
											.attr("rowCount"))
											: 1;
									if (td[0].parentNode.rowIndex = prev[0].parentNode.rowIndex
											+ rowSpan) {
										td.remove();
										prev
												.attr(
														"rowSpan",
														rowSpan
																+ (td[0].rowSpan ? td[0].rowSpan
																		: 1));
										prev.attr("rowCount", rowCount + 1);
									}
								}
							}
							$(evt.$element).on('click', {
								comp : this
							}, rowClickCallback);
						},

						_doVirtualElementBeforeRemove : function(evt) {
							var me = evt.source, td = $("td.autoMegre:eq(0)",
									evt.$element);
							if (td.length > 0 && td.attr("rowCount")) {
								var rowCount = parseInt(td.attr("rowCount")), rowIndex = td[0].parentNode.rowIndex, rows = td[0].parentNode.parentNode.rows;
								if (rowCount > 1) {
									var rowSpan = td[0].rowSpan / rowCount;
									var nextRow = rows[rowIndex + 1 * rowSpan];
									var newTD = td.clone().attr("rowSpan",
											(rowCount - 1) * rowSpan);
									newTD.attr("rowCount", rowCount - 1);
									newTD.insertBefore(nextRow.cells[rowIndex]);
								}
							}
						},

						_bindVirtualElement : function($template) {
							var me = this, data = me.getModel().registeData(
									me.data);
							var foreach = me._createForeachData();
							var comment = $(
									"<!-- ko foreach: " + foreach + " -->")
									.insertBefore($template[0]);
							$("<!-- /ko -->").insertAfter(
									$template[$template.length - 1]);
							$template.each(function() {
								$(this).addClass(me.id);
							});

							me.$template = $template;
							me._bind(comment[0]);

							// 是否受主表控制，这个代码5.3由服务端生成。主从
							if (data.master) {
								var pTemplate = me.getModel().comp(
										me.owner.$domNode.parents(
												".bindTemplate[data='"
														+ data.master
																.getDataId()
														+ "']:eq(0)")
												.attr("id"));
								me._fetchAll = pTemplate && pTemplate.list;
								if (me._fetchAll) {
									me.filter = "$object.getID() == $row.val('"
											+ data.masterRelation + "')";
								}
							}

							me.on("onBeforeRemove",
									this._doVirtualElementBeforeRemove);
							me.on("onAfterRender",
									this._doVirtualElementAfterRender);
							if (!data.isLoaded()) {
								data.on(Data.EVENT_LOADED, this.refresh.bind(
										this, false));
							} else {
								this.refresh(false);
							}

						},

						doInit : function(value, bindingContext,
								allBindingsAccessor) {
							var me = this;
							me.$domNode.attr("component", url);
							if (!me.id) {
								me.id = me.$domNode.attr('id');
							}

							var model = me.getModel();
							if (me.relDatas) {
								var relDatas = me.relDatas.split(",");
								for ( var n = 0; n < relDatas.length; n++) {
									model.registeData(relDatas[n]);
								}
							}
							// 查询table数据区域绑定
							var tableTemplate = $(
									"table.celllayout[data-config]:eq(0)",
									me.$domNode);
							if (tableTemplate.length > 0
									&& tableTemplate
											.parents(".bindTemplate:eq(0)")[0] == me.domNode) {
								me._virtualElementBindTemplates = [];
								// table模板绑定
								var celllayoutCfg = tableTemplate
										.data("config");
								typeof (celllayoutCfg) == "string"
										&& (celllayoutCfg = eval("("
												+ celllayoutCfg + ")"));
								for ( var dataId in celllayoutCfg) {
									var args = celllayoutCfg[dataId].split(",");
									var virtualBind = new BindTemplate({
										id : me.id + "_DataRegion_"
												+ args.join("_"),
										data : dataId,
										virtual : true,
										owner : me
									});
									me._virtualElementBindTemplates
											.push(virtualBind);
									virtualBind.setModel(model);
									if (args.length == 1) {
										virtualBind._bindVirtualElement($(
												"table.celllayout>tbody>tr:eq("
														+ args[0] + ")",
												me.$domNode));
									} else if (args[0] == "0") {
										virtualBind
												._bindVirtualElement($(
														"table.celllayout>tbody>tr:lt("
																+ (parseInt(args[args.length - 1]) + 1)
																+ ")",
														me.$domNode));
									} else {
										virtualBind
												._bindVirtualElement($(
														"table.celllayout>tbody>tr:eq("
																+ args[0]
																+ +(parseInt() - 1)
																+ "):lt("
																+ (parseInt(args[args.length - 1]) + 1)
																+ ")",
														me.$domNode));
									}
									$("." + virtualBind.id, this.domNode).on(
											'click', {
												comp : virtualBind
											}, rowClickCallback);
								}

							} else if (me.list && me.data) {
								// 普通模板绑定
								var data = me.getData();
								if (!me.filter && data.master) {
									// 是否受主表控制，这个代码5.3由服务端生成。
									var pTemplate = me
											.getModel()
											.comp(
													me.$domNode
															.parents(
																	".bindTemplate[data='"
																			+ data.master
																					.getDataId()
																			+ "']:eq(0)")
															.attr("id"));
									me._fetchAll = pTemplate && pTemplate.list;
									if (me._fetchAll) {
										me.filter = "$object.getID() == $row.val('"
												+ data.masterRelation + "')";
									}
								}
								me._bindEvent();
								me._createForeachData();

								if (!data.isLoaded()) {
									data.on(Data.EVENT_LOADED, me.refresh.bind(
											me, false));
								} else {
									me.refresh(false);
								}
							}
						},

						dispose : function() {
							var model = this.getModel();
							delete model["foreach_" + this.id];
							delete model["foreach_afterRender_" + this.id];
							delete model["foreachBeforeRemove" + this.id];
							if (this.virtual) {
								Bind.utils
										.arrayRemoveItem(
												this.owner._virtualElementBindTemplates,
												this);
							}
							this.pageIndex && this.pageIndex.dispose
									&& this.pageIndex.dispose();
							this.pageIndex = null;
							this.callParent();
						},

						_bindEvent : function() {
							var model = this.getModel();
							// 只能接自己祖先节点的上的pullDown, pullUp这两个事件
							model.on("onPullDown", function(evt) {
								if (!this.disablePullToRefresh
										&& this._isSelfRefresh(evt.source)) {
									if (this.hasListener("onPullToRefresh")) {
										this.fireEvent("onPullToRefresh", {
											source : this
										});
									}
									this.refresh(true);
								}
							}, this);
							model.on("onPullUp", function(evt) {
								if (!this.disableInfiniteLoad
										&& this._isSelfRefresh(evt.source)) {
									this.loadNextPage();
									if (this.hasListener("onInfiniteLoad")) {
										var evtData = {
											source : this,
											hasMore : this.hasMore
										};
										this.fireEvent("onInfiniteLoad",
												evtData);
										this.hasMore = evtData.hasMore;
									}
									evt.noMoreLoad = !this.hasMore;
								}
							}, this);
							this._getForeachNode().on('click', {
								comp : this
							}, rowClickCallback);
						},
						getData : function() {
							try {
								return this.getModel().comp(this.data);
							} catch (e) {
								return null;
							}
						},

						_getForeachNode : function() {
							return this.virtual ? this.$template
									: this.$domNode.hasClass('x-list-template') ? this.$domNode
											: this.$domNode
													.find('.x-list-template:first');
						},

						_isSelfRefresh : function(refreshComp) {
							return this._getForeachNode().parents('.x-scroll')[0] == refreshComp.domNode;
						},

						_doRowClick : function(evt) {
							var bindContext = Bind.contextFor(evt.target
									|| evt.srcElement);
							if (bindContext) {
								var row = bindContext.$object;
								if (row instanceof Data.Row)
									row.data.to(row);
							}
						},
						_createForeachData : function() {
							// 创建bind的foreach数据源
							var model = this.getModel(), self = this, id = this.id;
							var foreachFunc = "foreach_" + id, foreachAfterRenderFunc = "foreach_afterRender_"
									+ id, foreachBeforeRemove = "foreach_beforeRemove_"
									+ id;
							if ('function' != typeof (model[foreachFunc]))
								model[foreachFunc] = function($element) {
									var comp = Component.getComponent($element);
									if (!comp
											|| !(comp instanceof BindTemplate))
										comp = Component.getComponent($(
												$element).parents(
												"[component='"
														+ self.componentName
														+ "']:first")[0]);
									return comp._computedForeach();
								};
							if ('function' != typeof (model[foreachAfterRenderFunc]))
								model[foreachAfterRenderFunc] = function(
										$listTemplate, $element, $object) {
									var comp = Component
											.getComponent($listTemplate);
									if (!comp
											|| !(comp instanceof BindTemplate))
										comp = Component.getComponent($(
												$listTemplate).parents(
												"[component='"
														+ self.componentName
														+ "']:first")[0]);
									return comp._afterRenderForeach(
											$listTemplate, $element, $object);
								};

							if ('function' != typeof (model[foreachBeforeRemove]))
								model[foreachBeforeRemove] = function($element,
										index, $object) {
									var comp = self.virtual ? self : Component
											.getComponent($element);
									if (!comp
											|| !(comp instanceof BindTemplate))
										comp = Component.getComponent($(
												$element).parents(
												"[component='"
														+ self.componentName
														+ "']:first")[0]);
									return comp._beforeRemoveForeach($element,
											index, $object);
								};

							return "{data : $model."
									+ foreachFunc
									+ "($element),afterRender:$model."
									+ foreachAfterRenderFunc
									+ ".bind($model,$element),beforeRemove : $model."
									+ foreachBeforeRemove + ".bind($model)}";
						},

						_afterRenderForeach : function($listTemplate, $element,
								$object) {
							this._getForeachNode().trigger('afterRenderList');
							this.fireEvent('onAfterRender', {
								source : this,
								$listTemplate : $listTemplate,
								$element : $element,
								$object : $object
							});
							if (this.owner) {
								this.owner.fireEvent('onAfterRender', {
									source : this,
									$listTemplate : $listTemplate,
									$element : $element,
									$object : $object
								});
							}
						},

						_beforeRemoveForeach : function($element, index,
								$object) {
							this._getForeachNode().trigger(
									'beforeRemoveElement');
							this.fireEvent('onBeforeRemove', {
								source : this,
								$element : $element,
								index : index,
								$object : $object
							});
							$($element).remove();
							return true;
						},

						_computedForeach : function() {
							if (!this.__computed) {
								this.__computed = true;
								try {
									this.bindingObjects = this.getForeachData();
									return this.bindingObjects;
								} finally {
									this.__computed = false;
								}
							}
						},

						getBindingObjects : function() {
							return this.bindingObjects ? this.bindingObjects
									: [];
						},

						getForeachData : function() {
							if (this.pageIndex.get() == -1)
								return [];
							if (this.data) {
								var data = this.getData();
								var ctx, ret, i, j, b;
								if (data instanceof Data) {
									var datas = this._fetchAll ? data.allDatas
											.get() : data.datas.get(), list_limit = (-1 == this.limit ? data
											.getLimit()
											: this.limit);
									var size = datas.length, offset = (-1 == this.limit ? (-1 == data
											.getLimit() ? size : data
											.getOffset())
											: (list_limit * this.pageIndex
													.get())), total = data
											.getTotal();
									this.hasMore = offset < size
											|| (size > 0 && total > 0 && (offset - (-1 == this.limit ? 0
													: list_limit)) < total);
									if (data.getLimit() != list_limit
											|| this.filter) {
										if (this.filter
												&& 'string' == typeof (this.filter)){
											this.filter = new Express(
													this.filter);
										}
											
										ret = [], ctx = Bind
												.contextFor(this.domNode);
										for (i = 0, j = 0; (i < offset && j < size); j++) {
											b = true;
											if (this.filter instanceof Express) {
												ctx.$row = datas[j];
												b = Express.eval(this.filter,
														ctx.$object, ctx);
											}
											if (b) {
												ret.push(datas[j]);
												i++;
											}
										}
										delete ctx.$row;
										if (i < offset && size < total
												&& this._canLoadData) {
											if (data.isLoaded()) {
												data
														.loadNextPageData({
															append : true,
															onSuccess : function(
																	datas, size) {
																if (datas.length > size)
																	return this
																			.getForeachData();// 增加判断，如果没有加载到数据不再进行数据加载
															}.bind(this, datas,
																	size)
														});
											}
										}
										return ret;
									} else {
										if (offset <= size) {
											return datas;
										} else {
											if (data.isLoaded() && size < total
													&& this._canLoadData) {
												data
														.loadNextPageData({
															append : true,
															onSuccess : function(
																	datas, size) {
																if (datas.length > size)
																	return this
																			.getForeachData();// 增加判断，如果没有加载到数据不再进行数据加载
															}.bind(this, datas,
																	size)
														});
												return datas;
											} else
												return datas;
										}
									}
								} else {
									// 支持使用表达式返回data的数据
									ctx = Bind.contextFor(this.domNode);
									var dataExpr;
									/* jshint -W085 */
									with (this.getModel()) {
										/* jshint +W085 */
										/* jshint -W085 */
										with (ctx) {
											/* jshint +W085 */
											dataExpr = eval('(' + this.data
													+ ')');
										}
									}
									var temps;
									if ('function' === typeof (dataExpr)) {
										temps = dataExpr.call(ctx.$model);
									} else
										temps = dataExpr;
									if (Bind.isObservable(temps)
											|| Bind.isComputed(temps))
										temps = temps.get();
									if (-1 !== this.limit && $.isArray(temps)) {
										if (this.filter
												&& 'string' == typeof (this.filter)){
											this.filter = new Express(
													this.filter);
										}
										ret = [];
										ctx = Bind.contextFor(this.domNode);
										var len = temps.length;
										var listOffset = this.limit
												* this.pageIndex.get();
										this.hasMore = len > listOffset;
										for (i = 0, j = 0; (i < listOffset && j < len); j++) {
											b = true;
											if (this.filter instanceof Express) {
												ctx.$row = temps[j];
												b = Express.eval(this.filter,
														ctx.$object, ctx);
											}
											if (b) {
												ret.push(temps[j]);
												i++;
											}
										}
										delete ctx.$row;
										return ret;
									} else
										return temps;
								}
							}
							return [];
						},

						loadNextPage : function() {
							if (this.hasMore) {
								if (-1 == this.limit)
									this.getData().loadNextPageData({
										append : true
									});
								else {
									var i = this.pageIndex.get();
									this._canLoadData = true;
									try {
										this.pageIndex.set(i + 1);
									} finally {
										this._canLoadData = false;
									}
								}
							}
						},
						refresh : function(refreshData) {
							if (this.data) {
								this.pageIndex.set(-1);
								var data = this.getData();
								var fn = function() {
									this._canLoadData = true;
									try {
										this.pageIndex.set(1);
									} finally {
										this._canLoadData = false;
									}
									if (data instanceof Data)
										data.first();
								}.bind(this);
								if (data instanceof Data
										&& (refreshData || (!data.getAutoLoad() && !data
												.isLoaded()))) {
									data.refreshData({
										async : true,
										onSuccess : fn
									});
								} else
									fn();
							}
							this._getForeachNode().show();
						}
					});

			Component.register(url, BindTemplate);
			return BindTemplate;
		});
