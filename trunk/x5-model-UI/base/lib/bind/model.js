define(
		"base/lib/bind/model",
		[ "require", "bind", "jquery", "./observable", "./express", "./object",
				"./component", "./message", "./system.res" ],
		function(require, Bind, $, Observable, Expr, Object, Component, Message) {
			var INNER_MODEL = "__inner-model__";
			var Model = Object
					.extend({
						mixins : Observable,

						constructor : function(config) {
							this.callParent(config);

							this.__componentDefereds = {};
							this.__components = {}; // 用来存储data组件
							this.__loadedDefereds = {};
							this.__cid = new justep.UUID().toString();
							var self = this;
							this._unloadFn = function() {
								self.destroy();
							};
							$(window).on("unload", this._unloadFn);
							Observable.prototype.constructor.call(this);
						},

						getContextID : function() {
							return this.__cid;
						},

						getContext : function() {
							return justep.Context;
						},

						// contents的延迟加载
						getLoadedDeferred : function(id) {
							id = id || new UUID().toString();

							var result = this.__loadedDefereds[id];
							if (!result) {
								result = $2.Deferred();
								this.__loadedDefereds[id] = result;
							}
							return result;
						},

						_callModelFn : function() {
							var event = arguments[arguments.length - 1];
							event.bindingContext = Bind
									.contextFor(event.currentTarget);
							var args = [ event ];
							if (arguments.length > 3)
								for ( var n = 1; n < arguments.length - 2; n++) {
									args.push(arguments[n]);
								}
							return this[arguments[0]].apply(this, args);
						},

						registeData : function(dataId) {
							if (!this.__components[dataId]) {
								this.__components[dataId] = new Data({
									data : justep.xbl(dataId),
									owner : this
								});
								this[dataId] = this.__components[dataId];
							}
							return this.__components[dataId];
						},

						_getComponentDefered : function(xidOrNode) {
							var key = this._getComponentDeferedKey(xidOrNode);
							var result = this.__componentDefereds[key];
							if (!result) {
								result = $.Deferred();
								this.__componentDefereds[key] = result;
								// 如果xidOrNode是null, undefined, ""时, 直接结束promise
								if (!xidOrNode)
									result.resolve(xidOrNode);
							}
							return result;
						},
						resolvedComponent : function(xidOrNode) {
							var c = this.getComponent(xidOrNode);
							this._getComponentDefered(xidOrNode).resolve(c);
						},

						_getComponentDefered : function(xidOrNode) {
							var key = this._getComponentDeferedKey(xidOrNode);
							var result = this.__componentDefereds[key];
							if (!result) {
								result = $.Deferred();
								this.__componentDefereds[key] = result;
								// 如果xidOrNode是null, undefined, ""时, 直接结束promise
								if (!xidOrNode)
									result.resolve(xidOrNode);
							}
							return result;
						},

						componentPromise : function(xidOrNode) {
							return this._getComponentDefered(xidOrNode)
									.promise();
						},

						_getComponentDeferedKey : function(xidOrNode) {
							var key = null;
							if (xidOrNode) {
								if (typeof (xidOrNode) === 'string') {
									key = xidOrNode;
								} else {
									var $e = $(xidOrNode);
									key = $e.attr("id");
									if (!key) {
										key = new UUID().toString();
										$e.attr("id", key);
									}
								}
							}
							return key;
						},

						getComponentInRange : function(xid, sourceNode) {
							var $sourceNode = $(sourceNode);
							// 忽略compose内的元素
							if (Component.BLOCK_CONTEXT === $sourceNode
									.attr(Component.CONTEXT_ATTR_NAME)) {
								return null;
							}
							var children = $sourceNode.children();
							for ( var i = 0; i < children.length; i++) {
								var child = $(children[i]);
								if (xid === child.attr("xid")) {
									return Component.getComponent(children[i]);
								} else {
									var result = this.getComponentInRange(xid,
											children[i]);
									if (result)
										return result;
								}
							}
							return null;
						},

						getComponent : function(xid, sourceNode) {
							if (typeof (xid) === "string") {
								// 优先找this.__components中的data组件
								if (this.__components[xid]) {
									return this.__components[xid];
								} else if (sourceNode) {
									return this.getComponentInRange(xid,
											sourceNode);
								} else {
									return this._getViewComponentByXid(xid);
								}
							} else {
								// 如果是节点，直接返回节点关联的组件
								return Component.getComponent(xid);
							}
						},

						_getViewComponentByXid : function(xid) {
							var e = this.getElementByXid(xid);
							if (e) {
								return Component.getComponent(e);
							} else {
								return null;
							}
						},

						getElementByXid : function(xid) {
							var id = this.getIDByXID(xid);
							if (id) {
								var items = $("#" + id);
								if (items.length > 0) {
									return items[0];
								} else {
									return null;
								}
							} else {
								return null;
							}
						},

						getIDByXID : function(xid) {
							if (xid) {
								return xid;// this.getContextID() + "_" + xid;
							} else {
								return null;
							}
						},

						/**
						 * @param xidOrNode:
						 *            xid属性或node节点
						 * @param sourceNode:
						 *            源节点，可选
						 * @returns 说明：如果没有指定source，将在当前的页面（即Window）中查找；
						 *          如果指定了sourceNode，将从sourceNode最近的上下文中查找（不跨出Window）；
						 *          会产生上下文的元素有：compose, foreach.
						 *          其中compse产生的上下文件是block;
						 *          foreach产生的上下文件是inline, 在foreach的第一级子节点上,
						 *          会生成__inline-id__ 属性, 用来标识同一行的内容; 查找的过程中,
						 *          忽略上下文为private的节点.
						 */
						comp : function(xidOrNode, sourceNode) {
							var ret = this.getComponent(xidOrNode, sourceNode);
							return ret;
						},
						
						comps : function(xid) {
							return this.getComponents(xid);
						},
						
						getComponents : function(xid) {
							var result = [];
							if (this.__components[xid])
								result[result.length] = this.__components[xid];

							var elements = this.getElementsByXid(xid);
							for (var i = 0; i < elements.length; i++) {
								var element = elements[i];
								var component = Component.getComponent(element);
								if (component) {
									result[result.length] = component;
								}
							}

							return result;
						},
						
						getElementsByXid : function(xid) {
							if (xid) {
								return $("*[id='" + xid + "']");
							} else {
								return [];
							}
						},

						_checkComponentDefereds : function() {
							var allError = "";
							for ( var xid in this.__componentDefereds) {
								if (this.__componentDefereds
										.hasOwnProperty(xid)) {
									var dtd = this.__componentDefereds[xid];
									if (dtd.state() == 'pending') {
										// dtd 待定的
										var err = "";
										var curComponent = this.comp(xid);
										if (curComponent) {
											err = new Message(
													Message.JUSTEP230082, xid,
													curComponent.componentName)
													.getMessage();
										} else {
											err = new Message(
													Message.JUSTEP230081, xid)
													.getMessage();

										}
										dtd.reject(err);
										if (allError)
											allError += ",";
										allError += err;
									}
								}
							}

							if (allError) {
								throw new Error(allError);
							}
						},

						attached : function() {
							// 不检查Defereds，没出处理条件绑定
							// this._checkComponentDefereds();
							var processItemsDeferred = [];
							for ( var id in this.__loadedDefereds) {
								if ((this.__loadedDefereds.hasOwnProperty(id))
										&& this.__loadedDefereds[id].promise) {
									processItemsDeferred
											.push(this.__loadedDefereds[id]
													.promise());
								}
							}

							var self = this;
							$.when.apply($, processItemsDeferred).done(
									function() {
										self.fireEvent(Model.LOADED_EVENT, {
											source : self
										});
									});
						},

						_disposeComponent : function(xidOrNode) {
							var key = this._getComponentDeferedKey(xidOrNode);
							delete this.__componentDefereds[key];
						},

						destroy : function() {
							this.isDestroyed = true;
						}
					});

			Model.LOADED_EVENT = "onLoaded";

			var Row = Object.extend({
				constructor : function(config) {
					var me = this;
					me.data = config.data;
					me.rowid = config.rowid;
					me.row = {};
					this.callParent();
				},
				ref : function(name) {
					var col = this.row[name];
					return col ? col.value : undefined;
				},

				val : function(name, value) {
					if (arguments.length == 1)
						return this.data.getValue(name, this);
					else
						this.data.setValue(name, value, this);
				},

				oval : function(name) {
					return this.data.getOriginalValue(name, this);
				},

				index : function() {
					return this.data.getRowIndex(this);
				},

				getID : function() {
					return this.rowid;
				},
				assign : function(row, cols) {
					if (row instanceof Row) {
						var col;
						if ($.isArray(cols)) {
							for ( var i = 0; i < cols.length; i++) {
								col = cols[i];
								this.val(col, row.val(col));
							}
						} else {
							for (col in this.data.defCols) {
								this.val(col, row.val(col));
							}
						}
					}
				},
				parent : function() {
					return undefined;
				}
			});

			var Data = Object
					.extend({
						mixins : Observable,
						constructor : function(config) {
							Observable.prototype.constructor.call(this);
							var me = this;
							var data = me.__data = config.data;
							me.model = config.owner;
							me.rowsBuff = {};
							// me.currentRow = Bind.observable();
							me._eof = Bind.observable(false);
							me._bof = Bind.observable(false);
							me.datas = me.allDatas = Bind.observableArray();
							me.allDatas.owner = this;
							me.slaveDatas = [];
							me.byMaster = {};
							me._clientFilterExpr = Bind.observable();
							if (data instanceof justep.XBizData) {
								me.defCols = data.defRelations;
							} else {
								data.limit = -1;
								me.defCols = {};
								var fields = data.getStore().fields;
								for ( var f in fields) {
									var fld = fields[f];
									me.defCols[f] = {
										type : fld.type.name
									};
								}
							}

							var row = {}, columns = [];
							for ( var n in me.defCols) {
								var col = me.defCols[n];
								col.name = n;
								row[n] = {
									value : ""
								};
								columns.push(n);
							}
							// 创建一个空行，以便数据未加载前可以进行绑定
							me.currentRow = Bind.observable(me._createBindRow(
									row, columns, Data.__NULL__ROWID));

							me.defTreeOption = data.defTreeOption;
							me.callParent(config);
							me.setTotal(0);
							data.attachEvent(justep.XData.EVENT_CHANGED,
									me._onDataChanged, me);

							data.attachEvent(justep.XData.EVENT_INDEX_CHANGED,
									me._onIndexChanged, me);
							me.loaded = data.loaded;

							if (data.masterData && data.masterData.id) {
								me.master = me.model
										.registeData(data.masterData.id);
								me.masterRelation = data.masterData.relation;
								var master = justep.xbl(data.masterData.id);
								me._bindClientFilter();
								me._bindMaster();
							}

							if (me.loaded) {
								me.rebuild();
							}
						},

						getDataId : function() {
							return this.__data.id;
						},

						getAutoLoad : function() {
							return this.__data.autoLoad;
						},

						_setLoaded : function(v, parent) {
							var old;
							if (!parent) {
								old = this.loaded;
								this.loaded = v;
							} else {
								if (!parent.row.userdata)
									parent.row.userdate = {};
								old = parent.row.userdata._loaded;
								parent.row.userdata._loaded = v;
							}
							if (!old && v) {
								this.fireEvent(Data.EVENT_LOADED, {
									source : this
								});
							}
						},

						getLimit : function() {
							return this.__data.limit;
						},

						getOffset : function(parent) {
							if (!parent)
								return this.offset;
							else
								return parent.row.userdata
										&& parent.row.userdata._offset ? parent.row.userdata._offset
										: 0;
						},
						setOffset : function(v, parent) {
							if (!parent) {
								this.offset = v;
							} else {
								if (!parent.row.userdata)
									parent.row.userdata = {};
								parent.row.userdata._offset = v;
							}
						},
						getTotal : function(parent) {
							if (this.getLimit() !== -1) {
								if (!parent)
									return this.total.get();
								else
									return parent.row.userdata
											&& parent.row.userdata._total ? parent.row.userdata._total
											.get()
											: 0;
							} else
								return this.getCount(parent);
						},

						setTotal : function(v, parent) {
							if (!parent) {
								if (!this.total)
									this.total = Bind.observable();
								this.total.set(v);
							} else {
								if (!parent.row.userdata)
									parent.row.userdata = {};
								if (!parent.row.userdata._total)
									parent.row.userdata._total = Bind
											.observable();
								parent.row.userdata._total.set(v);
							}
						},

						getColumns : function() {
							if (!this.columns) {
								this.columns = this.__data.getColumns(",")
										.split(",");
							}
							return this.columns;
						},

						_onDataChanged : function(event) {
							if (!event.selfChanged)
								return;
							var me = this, data = event.changedSource;
							if (event.type == "refresh" || event.type == "load") {
								// TODO 明细表refresh优化
								me.rebuild();
							} else if (event.type == "delete") {
								var deleteIDList = event.deleteIDList;
								for ( var n in deleteIDList) {
									var rowid = deleteIDList[n], row = me.rowsBuff[rowid];
									me.remove(row);
								}
							} else if (event.type == "new") {
								var ids = event.ids, columns = me.getColumns();
								me._bindArrayValueRow(ids, columns);
								me.to(me.rowsBuff[ids[ids.length - 1]]);
							} else if (event.type == "clear") {
								me.clear();
							} else if (event.type == "valueChanged") {
								var rowid = data.getID(event.rowIndex);
								// if (me.__valueSetting == rowid + "." +
								// event.column)
								// return;
								// me.__valueSetting = rowid + "." +
								// event.column;
								var row = me.rowsBuff[rowid];
								try {
									me.setValue(event.column, event.value, row);
								} finally {
									// me.__valueSetting = "";
								}
							}
							if (!me.loaded) {
								me._setLoaded(true);
							}
						},

						_onIndexChanged : function(event) {
							var me = this;
							setTimeout(function() {
								var row = me.rowsBuff[event.rowID];
								me.to(row);
							}, 1);
						},

						rebuild : function() {
							var me = this, data = me.__data, rows = data
									.getJson().rows, bindRows = [], columns = me
									.getColumns();
							me.clear();
							me._reloadDefByUserData();
							for ( var n in rows) {
								var r = rows[n], rowid = r.userdata.id.value;
								var bindRow = me.rowsBuff[rowid] = me
										._createBindRow(r, columns, rowid);
								bindRows.push(bindRow);
							}
							if (me.master) {
								me.master.currentRow.valueWillMutate();
							} else {
								var row = me.rowsBuff[me.__data.getID()];
								me.to(row);
							}
							me.allDatas.push.apply(me.allDatas, bindRows);
						},

						_reloadDefByUserData : function(parent) {
							this._setLoaded(true, parent);
							this.setTotal(this.__data.getInstance().total,
									parent);
							this.setOffset(this.__data.offset, parent);
						},

						_clear : function(parent) {
							this.rowsBuff = {};
							// 清空data代码
							// 当前行是parent的子才进行重置当前行
							if (!parent
									|| this.isChild(this.getCurrentRow(true),
											parent))
								this.currentRow.set(null);

							var arrayRows, row = null;
							if (!parent) {
								arrayRows = this.allDatas.get();
								for (row in arrayRows) {
									this._clear(arrayRows[row]);
								}
								this.allDatas.removeAll();
							} else {
								if (parent.rows) {
									arrayRows = parent.rows.get();
									for (row in arrayRows) {
										this._clear(arrayRows[row]);
									}
									parent.rows.removeAll();
								}
							}
						},

						isChild : function(row, parent) {
							if (!row)
								return false;
							var p = row.parent();
							if (p === parent)
								return true;
							if (p)
								return this.isChild(p, parent);
							else
								return false;
						},
						clear : function(parent) {
							// 清空data代码
							this._clear(parent);
						},

						_createBindRow : function(values, columns, rowid) {
							var me = this, row = new Row({
								data : me,
								rowid : rowid
							});
							for (k in columns) {
								var col = columns[k];
								me._bindValue(row, values[col].value, col,
										rowid);
							}
							return row;

						},
						_bindArrayValueRow : function(ids, columns) {
							var me = this, rows = [];
							for ( var n = 0; n < ids.length; n++) {
								var rowid = ids[n], values = me.__data
										.getRowData(rowid), row = new Row({
									data : me,
									rowid : rowid
								});
								for (k in columns) {
									me._bindValue(row, values[k], columns[k],
											rowid);
								}
								me.rowsBuff[rowid] = row;
								rows.push(row);
							}
							me.allDatas.push.apply(me.allDatas, rows);
							return row;
						},

						_bindValue : function(row, value, column, rowid) {
							if (column == "space-column")
								return;
							if (!$.isPlainObject(row.row[column]))// 这里需要注意，如果修改col为对象需要修改
								row.row[column] = {
									changed : 0,
									value : value,
									originalValue : null
								};

							row.row[column].value = this.bindValueChange(value,
									{
										data : this,
										handler : this._doValueChange,
										caller : this,
										rowID : rowid,
										row : row,
										col : column
									});
							row.row[column].value.define = {
								data : this,
								row : row,
								col : column,
								defCol : this.defCols[column]
							};
						},

						bindValueChange : function(v, option) {
							var interceptor = Bind.observable(v);
							interceptor.subscribe(function(evt) {// 变化中
								if (evt.newValue !== evt.oldValue) {
									evt.source = option.data;
									evt.row = option.row;
									evt.col = option.col;
									option.handler
											&& option.handler.call(
													option.caller, evt);
								}
							}, null, "changing");
							interceptor.subscribe(function(val) {// 变化后
								var evt = {
									source : option.data,
									row : option.row,
									col : option.col,
									value : val
								};
								option.handler
										&& option.handler.call(option.caller,
												evt, true);
							});
							return interceptor;
						},

						disableRecordChange : function() {
							this._disableRecordChange = true;
						},
						enabledRecordChange : function() {
							this._disableRecordChange = false;
						},

						canRecordChange : function() {
							return !this._disableRecordChange;
						},

						// col可以是列名或者列定义
						isCalculateCol : function(col) {
							if (col) {
								if ('string' === typeof (col))
									col = this.defCols[col];
								if ('object' === typeof (col)) {
									return "EXPRESS" === col.relation
											|| "STATISTICAL" == col.relation;
								}
							}
						},

						_doValueChange : function(event, isChanged) {
							// 不记录变化
							if (event.col === this.__data.getVersionColumn()
									|| !this.canRecordChange())
								return;
							if (!isChanged) {
								if (!this.isCalculateCol(event.col)
										&& event.oldValue !== event.newValue) {
									var row = event.row;
									if (row) {
										var recordState = this.__data
												.getState(row.getID());
										if (recordState !== justep.XData.STATE) {
											var col = row.row[event.col];
											if (1 !== col.changed) {// 目前暂时不支持修改回原值后状态复原，原因BIND从组件写回的数据全部变成了str
												col.originalValue = event.oldValue;
												col.changed = 1;
											}
										}
									}
								}
							} else {
								event.changedSource = this;
								event.type = 'valueChanged';
								event.selfChanged = true;
								this.__data.setValue(event.col, event.value,
										event.row.getID());
							}

							if (Data.debug)
								console.log("行[" + event.rowID + "]列["
										+ event.col + "]changed," + "old:"
										+ event.oldValue + ",newValue:"
										+ event.newValue);
						},

						deleteData : function(rows) {
							if (!rows)
								return false;
							for (i = rows.length - 1; i >= 0; i--) {
								row = rows[i];
								this.remove(row);
							}
						},

						remove : function(row) {
							row = row ? row : this.getCurrentRow(true);
							var datas = this.allDatas, index = datas
									.indexOf(row), len = datas.get().length;
							if (index >= 0 && index < len) {
								var isCurrent = row === this
										.getCurrentRow(true), _datas = this.datas, _index = Bind.utils
										.arrayIndexOf(_datas.get(), row);
								var total = this.getTotal(null/* parent */) - 1;
								this
										.setTotal(total >= 0 ? total : 0, null/* parent */);
								datas.splice(index, 1);
								delete this.rowsBuff[row.rowid];
								if (isCurrent) {
									var size = this.getCount();
									len = _datas.get().length;
									if (size <= 0)
										this.to(null);
									else if (_index < len)
										this.to(_datas.get()[_index]);
									else if (_index >= len && len > 0)
										this.to(_datas.get()[_index - 1]);
									else
										this.to(null);
								}
							}
						},

						getCount : function() {
							return this.datas.get().length;
						},

						getRowIndex : function(r) {
							var datas = this.datas.get();
							return $.isArray(datas) ? datas.indexOf(r) : -1;
						},

						getRowByID : function(id, all) {
							if (id !== undefined) {
								var r = null, func = !all ? 'each' : 'eachAll';
								this[func](function(evt) {
									if (id == this.getRowID(evt.row)) {
										evt.cancel = true;
										r = evt.row;
									}
								}, this);
								return r;
							} else
								return this.getCurrentRow(true);
						},

						getCurrentRow : function(peek) {
							return this.currentRow[peek ? 'peek' : 'get']();
						},

						getValue : function(col, row) {
							if (!row)
								row = this.getCurrentRow();
							var cc = row ? row.ref(col) : undefined;
							return Bind.isObservable(cc) ? cc.get() : cc;
						},

						setValue : function(col, value, row) {
							if (!row)
								row = this.getCurrentRow(true);
							// this.data.setValue(col, value, row.rowid);
							var cc = row ? row.ref(col) : undefined;
							if (Bind.isObservable(cc)) {
								cc.set(value);
							}
						},

						getOriginalValue : function(col, row) {
							if (!row)
								row = this.getCurrentRow();
							var cc = row ? row.row[col] : undefined;
							return cc.originalValue;
						},

						getValueByID : function(col, id) {
							return this
									.getValue(col, this.getRowByID(id, true));
						},

						setValueByID : function(col, value, id) {
							this
									.setValue(col, value, this.getRowByID(id,
											true));
						},

						ref : function(name, row) {
							// var me = this;
							// if (me.loaded) {
							// if (typeof (row) !== 'object')
							// row = me.getCurrentRow();
							// return row ? row.ref(name)
							// : (new Object.NullValue());
							// } else
							// return (new Object.NullValue());
							if (typeof (row) !== 'object')
								row = this.getCurrentRow();
							return row ? row.ref(name)
									: (new Object.NullValue());
						},

						val : function(name, row) {
							return this.getValue(name, row);
						},

						next : function() {
							var crow = this.getCurrentRow(true), isNext = false;
							this.each(function(evt) {
								if (isNext) {
									this.to(evt.row);
									evt.cancel = true;
									isNext = false;
								}
								if (evt.row == crow)
									isNext = true;
							}, this);
						},

						pre : function() {
							var crow = this.getCurrentRow(true), preRow = null;
							this.each(function(evt) {
								if (evt.row == crow) {
									if (null !== preRow)
										this.to(preRow);
									evt.cancel = true;
									preRow = null;
								}
								preRow = evt.row;
							}, this);
						},

						first : function() {
							this.to(this.getFirstRow());
						},
						last : function() {
							this.to(this.getLastRow());
						},
						to : function(row) {
							if (typeof (row) == 'string')// 当时string时认为是id
								row = this.getRowByID(row);
							if ((row instanceof Data.Row || row === undefined || row === null)
									&& row !== this.getCurrentRow(true)) {
								this.currentRow.set(row);
							}
							if (row) {
								var idx = this.__data.getIndex(row.getID());
								this.__data.setIndex(idx);
								this._eof
										.set(idx >= this.datas.get().length - 1);
								this._bof.set(idx <= 0);
							} else {
								this._eof.set(false);
								this._bof.set(false);
							}
						},

						eof : function() {
							return this._eof.get();
						},

						bof : function() {
							return this._bof.get();
						},

						getFirstRow : function() {
							var datas = this.datas.get();
							if (datas.length > 0)
								return datas[0];
							else
								return null;
						},
						getLastRow : function() {
							var rows = this.datas.get();
							if (rows.length > 0)
								return this._lastRow(rows);
							else
								return null;
						},

						getCurrentRowID : function() {
							return this.getRowID(this.getCurrentRow(true));
						},
						getRowID : function(r) {
							if (r === undefined)
								r = this.getCurrentRow(true);
							return r ? r.rowid : undefined;
						},
						_lastRow : function(rows) {
							var len = rows.length, ret = rows[len - 1];
							if (len > 0 && ret.rows)
								return this._lastRow(ret.rows.get());
							else
								return ret;
						},

						exchangeRow : function(row1, row2) {
							var index1 = this.allDatas.indexOf(row1);
							if (index1 < 0)
								return;
							var index2 = this.allDatas.indexOf(row2);
							if (index2 < 0)
								return;
							this.allDatas.splice(index1, 1, row2);
							this.allDatas.splice(index2, 1, row1);
						},

						each : function(callback, caller, parent) {
							this.eachAll(callback, caller, !parent ? {
								rows : this.datas
							} : parent);
						},

						eachAll : function(callback, caller, parent) {
							if ('function' !== typeof (callback))
								return;
							var allItems = !parent ? this.allDatas.get()
									: (Bind.isObservable(parent.rows) ? parent.rows
											.get()
											: []);
							var len = allItems.length;
							for ( var i = 0; i < len; i++) {
								var param = {
									index : i,
									row : allItems[i],
									parent : parent,
									cancel : false,
									data : this
								};
								callback.call(caller || param.row, param);
								if (param.cancel)
									return;
								if (Bind.isObservable(param.row.rows))
									if (!this.eachAll(callback, caller,
											param.row))
										return;
							}
							return true;
						},

						isLoaded : function(parent) {
							if (!parent
									|| (this.defTreeOption.isTree && !this.defTreeOption.option.isDelayLoad))
								return this.loaded;
							else
								return parent.row.userdata
										&& parent.row.userdata._loaded ? parent.row.userdata._loaded
										: false;
						},

						loadNextPageData : function(append, options) {
							if (arguments.length == 1
									&& typeof (append) == "object") {
								options = append;
								append = !!options.append;
								delete options.append;
							}
							return this.__data
									.loadNextPageData(append, options);
						},

						locate : function(arrValue, arrCol, first, ignoreCase,
								partialKey) {
							return this.__data.locate(arrValue, arrCol, first,
									ignoreCase, partialKey);
						},
						refreshData : function(option) {
							var async = option && option.async;
							if (async) {
								delete option.async;
								var data = this.__data;
								setTimeout(function() {
									data.refreshData(option);
								}, 1);
							} else {
								this.__data.refreshData(option);
							}
						},

						saveData : function() {
							this.__data.saveData();
						},

						setClientFilter : function(filter) {
							this.clientFilter = filter;
							var filterExpr = null;
							if (filter && 'string' == typeof (filter))
								filterExpr = new Expr(filter);
							this._clientFilterExpr.set(filterExpr);
						},

						_clientFilter : function(allItems) {
							var ret = [];
							var filterExpr = this._clientFilterExpr.get();
							if (filterExpr instanceof Expr) {
								for ( var i = 0; i < allItems.length; i++) {
									var current = allItems[i];
									var ctx = {
										$model : this.getModel(),
										$data : this,
										$row : current
									};
									if (Expr.eval(filterExpr, current, ctx))
										ret.push(current);
								}
							} else
								ret = allItems;
							return ret;
						},

						_filterByMaster : function() {
							var mData = this.master, mr = mData.getCurrentRow(), mrid = mr ? mData
									.getRowID(mr)
									: undefined;
							if (undefined === mrid
									|| mrid === Data.__NULL__ROWID)
								return [];
							var mrid = mData.getRowID(mr), allItems = this.allDatas
									.get();

							var byMaster = this.byMaster[mrid];
							// 根据主加载当前的数据
							if (!byMaster || !byMaster.loaded) {
								var bLoaded = false;
								if (this.isLoaded()) {
									var loadParentIDs = this.__data.getStore().loadParentIDs, bLoaded = Bind.utils
											.arrayIndexOf(loadParentIDs, mrid) >= 0;
									if (!bLoaded) {
										this.master
												.to(this.master.rowsBuff[mrid]);
										bLoaded = true;
									}
								} else {
									// do nothing
								}

								if (byMaster) {
									byMaster.loaded = bLoaded;
								} else {
									byMaster = this.byMaster[mrid] = {
										loaded : bLoaded
									};
								}
							}
							// 查找从数据
							var matchingItems = [];
							for (i = 0; i < allItems.length; i++) {
								var current = allItems[i];
								if (Bind.unwrap(current
										.ref(this.masterRelation).get()) === mrid)
									matchingItems.push(current);
							}
							// 数据过滤
							if (this.clientFilter) {
								matchingItems = this
										._clientFilter(matchingItems);
							}
							// 设置状态
							if (byMaster && byMaster.loaded) {
								if (!byMaster.current
										&& matchingItems.length > 0) {
									byMaster.current = matchingItems[0];
								}
								this.currentRow.set(byMaster.current);
								byMaster.offset !== undefined ? this
										.setOffset(byMaster.offset) : '';
								byMaster.total !== undefined ? this
										.setTotal(byMaster.total) : '';
							} else if (matchingItems.length > 0) {
								this.currentRow.set(matchingItems[0]);
							} else
								this.currentRow.set(null);// 没有数据修改当前行为null
							return matchingItems;
						},

						_filterByClientFilter : function() {
							var allItems = this.allDatas.get();
							// 数据过滤
							var currentRow;
							if (this.clientFilter) {
								allItems = this._clientFilter(allItems);
								var crow = this.getCurrentRow(true);
								$.each(allItems, function(i, row) {
									if (row === crow) {
										currentRow = crow;
										return false;
									}
								});
							}

							// 设置状态
							if (currentRow)
								this.currentRow.set(currentRow);
							if (allItems.length > 0) {
								this.currentRow.set(allItems[0]);
							} else
								this.currentRow.set(null);// 没有数据修改当前行为null

							return allItems;
						},
						// 生成过滤计算,包括主从计算和前端过滤
						_filterBy : function() {
							var ret;
							if (this.master) {
								ret = Bind.computed(this._filterByMaster, this);
								ret.owner = this;
								return ret;
							} else if (this.clientFilter) {
								ret = Bind.computed(this._filterByClientFilter,
										this);
								ret.owner = this;
								return ret;
							} else {
								return this.allDatas;
							}
						},

						_bindClientFilter : function() {
							if (this.clientFilter && !this.master)
								this.datas = this._filterBy();
						},
						_bindMaster : function() {// 不支持多次绑定
							if (this.master) {
								this.master.slaveDatas.push(this);
								// 主从过滤
								this.datas = this._filterBy();
								// 生成主data index监听
								this.master.currentRow.subscribe(function(row) {
									if (undefined === row)
										return;
									var rid = this.master.getRowID(row);
									if (!this.byMaster[rid])
										this.byMaster[rid] = {};
									this.byMaster[rid].current = this
											.getCurrentRow(true);
									this.byMaster[rid].offset = this
											.getOffset();
									this.byMaster[rid].total = this.getTotal();
								}, this, "beforeChange");
							}
						},

						_masterFilter : function(val, row) {
							if (!this.master)
								return true;
							else {
								var mdata = this.master;
								if (row) {
									var v = row
											.ref(mdata.__data.idColumn.relation);
									if (Bind.isObservable(v))
										return val === v.get();
								}
							}
						},

						sort : function(compare) {

						},

						_aggregate : function(type, col, filterCallback, all) {
							var datas = !all ? this.datas.get() : this.allDatas
									.get();
							var ret = 0.0, len = 0, min = null, max = null;
							var isFilter = filterCallback
									&& (typeof (filterCallback) == 'function');
							var masterRow = typeof (filterCallback) == 'object' ? filterCallback
									: undefined;
							for ( var i = 0; i < datas.length; i++) {
								var id = this.master ? datas[i].ref(
										this.masterRelation).get() : null;
								if ((!isFilter && masterRow === undefined)
										|| (isFilter && filterCallback({
											'source' : this,
											'data' : this,
											'row' : datas[i]
										}))
										|| (masterRow !== undefined && this
												._masterFilter(id, masterRow))) {
									len++;
									if (col) {
										var colDef = this.defCols[col];
										var v = this.convert(datas[i].ref(col)
												.get(), colDef.type);
										if (v === undefined || v === null
												|| v instanceof Data.ErrorValue)
											continue;
										ret += v;
										max = max === null ? v : (max < v ? v
												: max);
										min = min === null ? v : (min > v ? v
												: min);
									}
								}
							}
							if ('count' === type)
								return len;
							else if ('avg' === type)
								return ret / len;
							else if ('sum' === type)
								return ret;
							else if ('min' === type)
								return min;
							else if ('max' === type)
								return max;
						},
						Count : function(filterCallback) {
							return this._aggregate("count", null,
									filterCallback);
						},
						countByAll : function(filterCallback) {
							return this._aggregate("count", null,
									filterCallback, true);
						},
						count : function(filterCallback) {
							return this._aggregate("count", null,
									filterCallback);
						},
						Avg : function(col, filterCallback) {
							return this._aggregate("avg", col, filterCallback);
						},
						avgByAll : function(col, filterCallback) {
							return this._aggregate("avg", col, filterCallback,
									true);
						},
						avg : function(col, filterCallback) {
							return this._aggregate("avg", col, filterCallback);
						},
						Sum : function(col, filterCallback) {
							return this._aggregate("sum", col, filterCallback);
						},
						sumByAll : function(col, filterCallback) {
							return this._aggregate("sum", col, filterCallback,
									true);
						},
						sum : function(col, filterCallback) {
							return this._aggregate("sum", col, filterCallback);
						},
						Min : function(col, filterCallback) {
							return this._aggregate("min", col, filterCallback);
						},
						minByAll : function(col, filterCallback) {
							return this._aggregate("min", col, filterCallback,
									true);
						},
						min : function(col, filterCallback) {
							return this._aggregate("min", col, filterCallback);
						},
						Max : function(col, filterCallback) {
							return this._aggregate("max", col, filterCallback);
						},
						maxByAll : function(col, filterCallback) {
							return this._aggregate("max", col, filterCallback,
									true);
						},
						max : function(col, filterCallback) {
							return this._aggregate("max", col, filterCallback);
						}

					});
			Data.Row = Row;

			Data.convert = function(v, t) {
				var errorValue = Data.createErrorValue(v);
				if (-1 < $.inArray(t, [ 'Integer', 'Long' ])
						&& typeof (v) === 'string')
					v = justep.String.toInt(v, errorValue);
				else if (-1 < $.inArray(t, [ 'Double', 'Float', 'Decimal' ])
						&& typeof (v) === 'string')
					v = justep.String.toFloat(v, errorValue);
				else if (t == 'Date' && typeof (v) === 'string' && v) {
					v = justep.Date.fromString(v, "yyyy-MM-dd");
					if (!v)
						v = errorValue;
					else
						v.toString = date2String;
				} else if (t == 'DateTime' && typeof (v) === 'string' && v) {
					v = justep.Date.fromString(v, "yyyy-MM-ddThh:mm:ss.fff");
					if (!v)
						v = errorValue;
					else
						v.toString = dateTime2String;
				}
				return v;
			};
			Data.__NULL__ROWID = "__NULL__";
			Data.ErrorValue = Object.extend({
				constructor : function(value) {
					this.value = value;
				},
				toString : function() {
					return NaN;
				}
			});

			Data.createErrorValue = function(value) {
				var ret = new Data.ErrorValue(value);
				return ret;
			};
			Data.EVENT_LOADED = "onLoaded";
			Model.Data = Data;
			var ___model = new Model();
			butone.Context = butone.Context || {};
			Model.instance = butone.Context.getBindModel = function() {
				return ___model;
			};
			return Model;

		});
