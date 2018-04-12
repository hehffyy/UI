//******************************************************
// *  初始化butone全局对象，依赖jQuery
// *  butone.defer(fn,delay,thisObject) 延迟执行器，用于频发触发但只需执行一次的情况
// *
// *
// *****************************************************
(function($, global) {
	/**
	 * Simple转为Grid时，回2次调用setSysOption，导致EVENT_XFORMS_DATA_CHANGING、EVENT_XFORMS_INDEX_CHANGING注册2次
	 */
	if (justep.XBizData) {
		if (!justep.XBizData.prototype._original_setSysOption) {
			var _original_setSysOption = justep.XBizData.prototype._original_setSysOption = justep.XBizData.prototype.setSysOption;
			// 替换原型函数
			justep.XBizData.prototype.setSysOption = function() {
				if (this.__SysOption) {
					// simple转为grid时，设置gridStore的排序事件
					var b = this.getStore();
					b.attachEvent(justep.XData.EVENT_CUSTOM_SORT, this.sort,
							this);
					// 设置gridStore的列定义等store选项
					this.setStoreOption();
				} else {
					_original_setSysOption.apply(this, arguments);
					this.__SysOption = true;
				}
			};
		}

		justep.XBizData.prototype.doSaveData = function(f, b, c, h) {
			if (!this.getSaveAction()) {
				this.doSaveDataAfter({
					state : true
				}, h);
				if (f) {
					f(j);
				}
				return this.doSlaveDataSave();
			} else {
				var i = true;
				var e = this;
				this._createSaveParam();
				var g = this;
				var a = justep.Request
						.sendBizRequest2({
							contentType : this.dataType,
							dataType : this.dataType,
							process : this.getProcess(),
							activity : this.getActivity(),
							action : this.getSaveAction(),
							executeContext : ("undefined" != typeof (__executeContext__)) ? __executeContext__
									: null,
							parameters : this.saveParam,
							callback : function(j) {
								g.doSaveDataAfter(j, h);
								if (f) {
									f(j)
								}
							}
						});
				i = justep.Request.isBizSuccess(a, this.dataType);
				if (!i) {
					return false
				}
				i = this.doSlaveDataSave();
				return i
			}
		}
	}

	justep.Request._getActionFlag = function() {
		if (this.batchFlag) {
			return "__" + this.batchFlag + "action_" + this.requestList.length
					+ "__";
		} else {
			// no batch情况下，多个Widnow下的actionFlag = ___action_N__ 可能重复，
			this.__winFlag = this.__winFlag || (new justep.UUID()).valueOf();
			return "__" + this.__winFlag + "_action_" + this.requestList.length
					+ "__";
		}
	};

	var butone = $.extend(global.butone, {
		/**
		 * 延迟执行回调函数
		 */
		defer : function(fcn, delay, thisObject, args) {
			var timer = setTimeout($.proxy(function() {
				if (!timer) {
					return;
				}
				clearTimeout(timer);
				timer = null;
				// 兼容IE
				if (!args)
					args = [];
				fcn.apply(thisObject, args);
			}, thisObject), delay || 0);
			var handle = {
				remove : function() {
					if (timer) {
						clearTimeout(timer);
						timer = null;
					}
					// so this works well: handle = handle.remove();
					return null;
				}
			};
			return handle;
		},

		/**
		 * 输出debug
		 */
		debug : function(info) {
			if (global.console) {
				if (global.console.debug) {
					console.debug(info);
				} else if (global.console.log) {
					console.log(info);
				}
			}
		},

		/**
		 * 打开引用表单，即WindowFrame
		 * 
		 * @param id
		 */
		openRefView : function(id) {
			var fw = justep.xbl(id);
			if (fw && !fw.$iframe) {
				fw.open();
			}
		}
	});
	/**
	 * 字符串扩展
	 */
	butone.String = $.extend(butone.String, {
		/**
		 * 格式化
		 * 
		 * @param source
		 * @param opts
		 * @returns
		 */
		format : function(source, opts) {
			var result = String(source);
			var data = Array.prototype.slice.call(arguments, 1);
			if (data.length > 0) {
				if (data.length == 1 && typeof (opts) == "object") {
					for ( var key in opts) {
						var obj = opts[key];
						if ("function" == typeof (obj)) {
							obj = obj.apply(opts);
						}
						if (!obj)
							obj = "";
						result = result.replace(new RegExp("({" + key + "})",
								"g"), obj);
					}
				} else {
					for ( var i = 0; i < data.length; i++) {
						if (data[i] !== undefined) {
							result = result.replace(new RegExp("({[" + i
									+ "]})", "g"), data[i]);
						}
					}
				}
			}
			return result;
		},
		/**
		 * ifNull
		 * 
		 * @param source
		 * @param cwant
		 * @returns
		 */
		ifNull : function(source, cwant) {
			var result = String(source);
			if ((result == null) || (result == "")) {
				return cwant;
			} else {
				return result;
			}
		}
	});

	var _TableInstance = function(store) {
		this.store = store;
	};

	_TableInstance.prototype = xforms.XFInstance2.prototype;

	butone.Data = {
		loadXML : function(data, xml) {
			if (typeof (xml) == "object" && xml.tagName == "rows") {
				xml = xml.outerHTML;
			}
			if (!typeof (xml) == "string")
				throw new Error("无法转换xml");
			var store = new SimpleStore();
			store.id = data.id;
			store.loadXMLString(xml);
			var global = store.UserData.gridglobaluserdata;
			if (global) {
				store.columnIds = global.get("relation-alias").split(",") || [];
			}
			store.init();
			data.instance = new _TableInstance(store);
		},
		loadJSON : function(data, json) {
			var store = new SimpleStore();
			store.id = data.id;
			store.columnIds = json.userdata.relationAlias.split(",") || [];
			store.init();
			store.loadData(null, json, null, false, true, "json");
			data.instance = new _TableInstance(store);
		},
		/**
		 * 转换xml为table
		 */
		transformTable : function(xml) {
			if (typeof (xml) == "object" && xml.tagName == "rows") {
				xml = xml.outerHTML;
			}
			if (!typeof (xml) == "string")
				throw new Error("无法转换xml");
			var store = new SimpleStore();
			store.loadXMLString(xml);
			var global = store.UserData.gridglobaluserdata;
			if (global) {
				store.columnIds = global.get("relation-alias").split(",") || [];
			}
			store.init();
			var table = new justep.XCommonData(null, false, true, null, '', '',
					{
						'deleteConfirm' : false,
						'refreshConfirm' : false
					}, {});
			table.instance = new _TableInstance(store);
			return table;
		},

		transformJson2Table : function(json) {
			var store = new SimpleStore();
			store.columnIds = json.userdata.relationAlias.split(",") || [];
			store.init();
			store.loadData(null, json, null, false, true, "json");
			var table = new justep.XCommonData(null, false, true, null, '', '',
					{
						'deleteConfirm' : false,
						'refreshConfirm' : false
					}, {});
			table.instance = new _TableInstance(store);
			return table;
		}
	};

	butone.Context = butone.Context || {};

	butone.Context.waitForReceiveData = function() {
		if (!!justep.Request.URLParams["hasData"])
			return true;
		else {
			var openerId = justep.Request.URLParams['$opener'], winOpener;
			if (openerId && opener) {
				winOpener = opener.justep.openers[openerId];
			}
			// dialog打开时，frameElement挂的是opener
			else if (window.frameElement && window.frameElement.opener) {
				winOpener = window.frameElement.opener;
			}// windowFrame打开时，frameElement挂的是windowFrame
			else if (window.frameElement && window.frameElement.windowFrame) {
				winOpener = window.frameElement.windowFrame;
			}
			return !!winOpener
					&& (!!winOpener.sendData || winOpener.checkEvent("onSend"));
		}
		// return !!justep.Request.URLParams["hasData"]
		// || justep.windowReceiver.windowParentObj
		// && (justep.windowReceiver.windowParentObj.sendData ||
		// justep.windowReceiver.windowParentObj
		// .checkEvent("onSend"));
	};

	/**
	 * 获取当前人职务名称
	 */
	butone.Context.getCurrentPersonPostName = function() {
		debugger;
		return justep.Context._getNodeValue("/form/bizParams/postName/text()");
	};

	/**
	 * 获取当前人全局顺序
	 */
	butone.Context.getCurrentPersonGlobalSequence = function() {
		return justep.Context
				._getNodeValue("/form/bizParams/globalSequence/text()");
	};
	global.butone = butone;

})(jQuery, window);

// ********************通用编码字段
(function(butone) {
	var sequenceCodeManager = function(dataId, codeConfig) {
		this.dataId = dataId;
		this.codeConfig = codeConfig;
		this.rowsBuffer = [];
		this.rowsAr = {};
	};

	/**
	 * data对象的编码字段管理
	 * 
	 * @param dataId
	 * @param codeConfig
	 */
	sequenceCodeManager.prototype = {

		_getParamValueCallBack : function(fnName) {
			return window.eval(fnName);
		},
		/**
		 * 数据改变(new,changeValued)时，自动处理预览值。
		 * 
		 * @param column
		 * @param contentWindow
		 */
		previewSequenceCodeValue : function(column, contentWindow) {
			var me = this;
			if (me._executing)
				return;
			me._executing = true;
			try {
				contentWindow = contentWindow || window;
				var data = contentWindow.justep.xbl(me.dataId), codeConfig = me.codeConfig, rowID = data
						.getID(), row = me.rowsAr[rowID];
				for ( var fldName in codeConfig) {
					if (fldName == column) // 编码字段自身改变，不做处理.
						continue;
					// 编码field
					var codeField = codeConfig[fldName];
					// 手动编码
					if (codeField.manual)
						continue;
					var name = me.dataId + "." + column;
					// 如果特定字段(new时无字段)变化，并且编码字段有关联，但是不关联此字段
					if (column) {
						if (!codeField.relations
								|| codeField.relations
								&& !justep.Array.contain(codeField.relations,
										name))
							continue;
					}
					// 如果没有paramNodes,后台create时自动预览编码，无需前端计算了
					if (!codeField.paramNodes)
						continue;
					// 计算节点值
					var nodeValues = new justep.Request.MapParam();
					for ( var paramName in codeField.paramNodes) {
						var fn = codeField.paramNodes[paramName];
						if (typeof fn == "string") {
							fn = me._getParamValueCallBack(fn);
						}
						if (typeof fn == "function") {
							var event = {
								source : data,
								column : fldName,
								frameForm : butone.Context.frameForm
							};
							var paramValue = fn.apply(contentWindow, [ event ])
									|| "";
							nodeValues.put(paramName, paramValue);
						}
					}
					var ret = me._doPreviewSequenceCodeValue(codeField.guid,
							me.dataId, nodeValues);
					if (row) {
						var codeValue = row[fldName];
						// 编码分组未变化
						if (codeValue && codeValue.groupValue == ret.groupValue)
							continue;
					}
					data.setValue(fldName, ret.sequenceValue, rowID);
					me._appendRow(rowID, fldName, nodeValues, ret.groupValue);
				}
			} finally {
				me._executing = false;
			}
		},

		getUnusedCodeValues : function(data, fldName, contentWindow) {
			var me = this, codeField = me.codeConfig[fldName];
			if (!codeField) {
				throw justep.Error.create(new justep.Message("不存在指定字段"
						+ fldName + "的编码定义"));
			}
			contentWindow = contentWindow || window;
			var nodeValues = new justep.Request.MapParam();
			for ( var paramName in codeField.paramNodes) {
				var fn = codeField.paramNodes[paramName];

				if (typeof fn == "string") {
					fn = me._getParamValueCallBack(fn);
				}

				if (typeof fn == "function") {
					var event = {
						source : data,
						column : fldName,
						frameForm : butone.Context.frameForm
					};
					var paramValue = fn.apply(contentWindow, [ event ]) || "";
					nodeValues.put(paramName, paramValue);
				}
			}
			return me._doQueryUnusedSequenceCodeValues(codeField.guid,
					me.dataId, nodeValues);
		},

		/**
		 * 锁定未使用的编码值。设置data编码字段的编码值,保存后执行锁定动作。
		 */
		lockUnusedCodeValue : function(data, fldName, groupValue, codeValue) {
			var me = this, codeField = me.codeConfig[fldName];
			if (!codeField) {
				throw justep.Error.create(new justep.Message("不存在指定字段"
						+ fldName + "的编码定义"));
			}
			var idValue = data.getID();
			if (!idValue) {
				throw justep.Error.create(new justep.Message("当前记录为空，请先新增数据"));
			}
			var eventManager = new butone.EventManager();
			eventManager.attachEvent(data, justep.XData.EVENT_SAVEDATA_AFTER,
					function() {
						me._doLockUnusedCodeValue(codeField.guid, groupValue,
								me.dataId, fldName, idValue, codeValue);
					}, true);
			data.setValue(fldName, codeValue);
			data.saveData();
		},

		/**
		 * 释放使用的编码值
		 */
		releaseUsedCodeValue : function(data, fldName) {
			var me = this, codeField = me.codeConfig[fldName], rowID = data
					.getID(), row = me.rowsAr[rowID];
			if (!codeField) {
				throw justep.Error.create(new justep.Message("不存在指定字段"
						+ fldName + "的编码定义"));
			}
			if (row) {
				delete row[fldName];
				var hasValue = false;
				for ( var n in me.codeConfig) {
					if (row[n]) {
						hasValue = true;
						break;
					}
				}
				if (!hasValue) {
					me.remove(rowID);
				}
			}

			if (!!data.getValue(fldName)) {
				var eventManager = new butone.EventManager();
				eventManager.attachEvent(data,
						justep.XData.EVENT_SAVEDATA_AFTER, function() {
							me._doReleaseUsedCodeValue(me.dataId, fldName,
									rowID);
						}, true);
				data.setValue(fldName, "");
				data.saveData();
			} else {
				me._doReleaseUsedCodeValue(me.dataId, fldName, rowID);
			}
		},

		removeCodeValue : function(rowID, column) {
			var me = this, row = me.rowsAr[rowID];
			if (row)
				delete row[column];
		},

		/**
		 * 编码字段立即编码
		 */
		manualCode : function(data, fldName, contentWindow) {
			data.saveData();
			var me = this, codeField = me.codeConfig[fldName], contentWindow = contentWindow
					|| window;
			if (!codeField) {
				throw justep.Error.create(new justep.Message("不存在指定字段"
						+ fldName + "的编码定义"));
			}
			var nodeValues = new justep.Request.MapParam();
			for ( var paramName in codeField.paramNodes) {
				var fn = codeField.paramNodes[paramName];
				if (typeof fn == "string") {
					fn = me._getParamValueCallBack(fn);
				}
				if (typeof fn == "function") {
					var event = {
						source : data,
						column : fldName,
						frameForm : butone.Context.frameForm
					};
					var paramValue = fn.apply(contentWindow, [ event ]) || "";
					nodeValues.put(paramName, paramValue);
				}
			}
			var prevValue = me._doPreviewSequenceCodeValue(codeField.guid,
					me.dataId, nodeValues);
			butone.Dialog.question("当前编号为【<font color='red'>"
					+ prevValue.sequenceValue + "</font>】<br>确认请点击“是”", null,
					function(evt) {
						if (evt.status == "yes") {
							var rowID = data.getID();
							var ret = me._doMakeSequenceCodeValue(
									codeField.guid, me.dataId, fldName,
									nodeValues, rowID);
							data.setValue(fldName, ret);
							data.saveData();
						}
					});
		},

		/**
		 * 添加编码记录
		 */
		_appendRow : function(rowID, column, nodeValues, groupValue) {
			var me = this, row = me.rowsAr[rowID], exists = !!row;
			if (!exists) {
				row = {
					id : rowID
				};
			}
			row[column] = {
				nodeValues : nodeValues,
				groupValue : groupValue
			};
			me.rowsAr[rowID] = row;
			if (!exists) {
				me.rowsBuffer.push(row);
			}
		},

		/**
		 * 是否存在指定行的编码记录
		 */
		isExist : function(rowID) {
			return !!this.rowsAr[rowID];
		},

		/**
		 * 数据刷新后，如果编码字段依赖前台，尝试重新计算编码。
		 */
		refreshData : function(contentWindow) {
			var me = this, data = contentWindow.justep.xbl(me.dataId), codeConfig = me.codeConfig;
			var rows = me.rowsBuffer.concat();
			// 移除已删除数据的编码记录
			for ( var n in rows) {
				var rowID = rows[n].id;
				if (!data.isExist(rowID))
					me.remove(rowID);
			}
			var count = data.getCount();
			for ( var i = 0; i < count; i++) {
				var rowID = data.getID(i);
				if (!me.isExist(rowID))
					continue;
				var row = me.rowsAr[rowID];
				for ( var fldName in codeConfig) {
					var codeField = codeConfig[fldName];
					// 如果手动编码 或者 不依赖前台参数，则不重新计算
					if (codeField.manual || !codeField.paramNodes)
						continue;
					var nodeValueChanged = false, nodeValues = new justep.Request.MapParam(), codeValue = row[fldName];
					if (!codeValue)
						continue;
					for ( var paramName in codeField.paramNodes) {
						var fn = codeField.paramNodes[paramName];
						if (typeof fn == "string") {
							fn = me._getParamValueCallBack(fn);
						}
						if (typeof fn == "function") {
							var event = {
								source : data,
								column : fldName,
								frameForm : butone.Context.frameForm
							};
							var paramValue = fn.apply(contentWindow, [ event ])
									|| "";
							nodeValues.put(paramName, paramValue);
							if (!nodeValueChanged
									&& codeValue.nodeValues.get(paramName).value != paramValue) {
								nodeValueChanged = true;
							}
						}
					}
					if (!nodeValueChanged) {
						continue;
					}
					var ret = me._doPreviewSequenceCodeValue(codeField.guid,
							me.dataId, nodeValues);
					if (codeValue.groupValue == ret.groupValue)
						continue;
					data.setValue(fldName, ret.sequenceValue, rowID);
					codeValue.groupValue = ret.groupValue;
					codeValue.nodeValues = nodeValues;
				}
			}
		},

		/**
		 * 编码记录数量
		 */
		getCount : function() {
			return this.rowsBuffer.length;
		},

		/**
		 * 删除编码记录,表记录删除时
		 */
		remove : function(rowID) {
			var me = this, row = me.rowsAr[rowID];
			if (row) {
				justep.Array.remove(me.rowsBuffer, row);
				delete me.rowsAr[rowID];
			}
		},

		getSequenceNodeValues : function() {
			var rowsAr = this.rowsAr;
			var sequenceNodeValues = new justep.Request.MapParam();
			for ( var rowID in rowsAr) {
				var row = rowsAr[rowID];
				for ( var column in row) {
					var rowNodeValues = sequenceNodeValues.get(column);
					if (!rowNodeValues) {
						rowNodeValues = new justep.Request.MapParam();
						sequenceNodeValues.put(column, rowNodeValues);
					}
					rowNodeValues.put(rowID, row[column].nodeValues);
				}
			}
			return sequenceNodeValues;
		},

		isNeedRefreshAfterSaveCommit : function(data) {
			var me = this, codeConfig = me.codeConfig;
			if (me.getCount() > 0) {
				return true; // 存在编码记录
			} else if (!data.isChanged("self")) {
				return false; // 不存在编码记录，且数据未改变
			}
			var allManual = true;
			for ( var fldName in codeConfig) {
				var codeField = codeConfig[fldName];
				// 如果手动编码 或者 不依赖前台参数，则不重新计算
				if (!codeField.manual) {
					allManual = false;
					break;
				}
			}
			// 所有均为手动
			if (allManual)
				return false;
			// 不存在编码记录，但是数据改变了
			for ( var n = 0; n < data.getCount(); n++) {
				var rowid = data.getID(n), state = data.getState(rowid);
				if (state == justep.XData.STATE.NEW)
					return true;
			}
			return false;
		},

		_doPreviewSequenceCodeValue : function(codeGuid, concept, nodeValues) {
			// 构造参数
			var params = new justep.Request.ActionParam();
			params.setString("codeGuid", codeGuid);
			params.setString("concept", concept);
			params.setMap("nodeValues", nodeValues);
			// 调用动作
			var ret;
			justep.Request.sendBizRequest2({
				"dataType" : "json",
				"action" : "previewSequenceCode",
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
		},

		/**
		 * 立即编码
		 */
		_doMakeSequenceCodeValue : function(codeGuid, concept, relation,
				nodeValues, rowid) {
			// 构造参数
			var params = new justep.Request.ActionParam();
			params.setString("codeGuid", codeGuid);
			params.setString("concept", concept);
			params.setString("relation", relation);
			params.setMap("nodeValues", nodeValues);
			params.setString("idValue", rowid);
			// 调用动作
			var ret;
			justep.Request.sendBizRequest2({
				"dataType" : "json",
				"action" : "makeSequenceCode",
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
		},

		_doQueryUnusedSequenceCodeValues : function(codeGuid, concept,
				nodeValues) {
			// 构造参数
			var params = new justep.Request.ActionParam();
			params.setString("codeGuid", codeGuid);
			params.setString("concept", concept);
			params.setMap("nodeValues", nodeValues);
			// 调用动作
			var ret;
			justep.Request.sendBizRequest2({
				"dataType" : "json",
				"action" : "queryUnusedSequenceCodeValuesAction",
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
		},

		_doLockUnusedCodeValue : function(codeGuid, groupValue, concept,
				fldName, idValue, codeValue) {
			var params = new justep.Request.ActionParam();
			params.setString("codeGuid", codeGuid);
			params.setString("groupValue", groupValue);
			params.setString("concept", concept);
			params.setString("relation", fldName);
			params.setString("idValue", idValue);
			params.setString("codeValue", codeValue);

			justep.Request.sendBizRequest2({
				"dataType" : "json",
				"action" : "lockUnusedSequenceCodeValueAction",
				"parameters" : params,
				"async" : false
			});
		},

		_doReleaseUsedCodeValue : function(concept, fldName, idValue) {
			var params = new justep.Request.ActionParam();
			params.setString("concept", concept);
			params.setString("relation", fldName);
			params.setString("idValue", idValue);

			justep.Request.sendBizRequest2({
				"dataType" : "json",
				"action" : "releaseUsedSequenceCodeValueAction",
				"parameters" : params,
				"async" : false
			});
		}
	};

	var codeManagers = {};

	butone.SequenceCodeManager = sequenceCodeManager;

	butone.SequenceCodeManager.registe = function(id, codeConfig) {
		codeManagers[id] = new sequenceCodeManager(id, codeConfig);

	};

	butone.SequenceCodeManager.getCodeManager = function(id) {
		return codeManagers[id];
	};

})(butone);

// ************************EventManager事件管理*************************************
(function(justep, butone) {
	butone.EventManager = function() {
		this.eventBinds = {};
	};
	/**
	 * 解除对象的事件绑定，并移除缓存记录
	 */
	function removeEvent(/* Array */binds, /* Object */target, bind) {
		for ( var n = binds.length - 1; n >= 0; n--) {
			var handler = binds[n];
			if (!target || handler.target == target) {
				if (!bind) {
					handler.target.detachEvent(handler.bind);
					justep.Array.remove(binds, handler);
					return;
				} else if (handler.bind == bind) {
					handler.target.detachEvent(handler.bind);
					justep.Array.remove(binds, handler);
					return;
				}
			}
		}
	}

	butone.EventManager.prototype = {
		/**
		 * 绑定数据事件，不检查重复绑定
		 * 
		 * @param target
		 *            Event对象
		 * @param event
		 *            事件名
		 * @param fn
		 *            事件回调函数
		 * @param once
		 *            调用一次(回调前执行移除)，无论回调是否成功
		 * @returns {Object} 返回回调句柄
		 */
		attachEvent : function(target, event, fn, once) {
			if (!target.attachEvent) {
				if (typeof (dhtmlxEventable) != 'undefined')
					dhtmlxEventable(target);
				else if (typeof (justep.Utils.eventable) != 'undefined')
					justep.Utils.eventable(target);
			}

			var binds = this.eventBinds[event];
			if (!binds) {
				binds = [];
				this.eventBinds[event] = binds;
			}

			var handler;
			if (once) {
				var orgiFn = fn;
				var onceFn = function() {
					try {
						var o = orgiFn.apply(this, arguments);
					} finally {
						handler.remove();
					}
					return o;
				};
				handler = this.attachEvent(target, event, onceFn);
				return handler;
			} else {
				var bind = target.attachEvent(event, fn, this);
				handler = {
					"event" : event,
					"target" : target,
					"bind" : bind,
					remove : $.proxy(function() {
						this.detachEventHandler(handler);
					}, this)
				};
				binds.push(handler);
				return handler;
			}
		},

		detachEventHandler : function(handler) {
			var binds = this.eventBinds[handler.event];
			if (binds)
				removeEvent(binds, handler.target, handler.bind);
		},
		/**
		 * 解除数据绑定事件
		 * 
		 * @param target
		 * @param event
		 */
		detachEvent : function(target, event) {
			if (event) {
				var binds = this.eventBinds[event];
				if (binds)
					removeEvent(binds, target);
			} else {
				for ( var n in this.eventBinds)
					removeEvent(this.eventBinds[n], target);
			}
		}
	};
})(justep, butone);

(function(justep, butone) {
	// *******************************页面打印*******************************
	var Wsh;
	try {
		Wsh = new ActiveXObject("WScript.Shell");
	} catch (e) {
	}

	butone.HtmlPrint = {
		PAGESETTING : [ "header", "footer", "margin_bottom", "margin_left",
				"margin_right", "margin_top", "Shrink_To_Fit",
				"Print_Background" ],
		HKEY_Root : "HKEY_CURRENT_USER",
		HKEY_Path : "\\Software\\Microsoft\\Internet Explorer\\PageSetup\\",

		/**
		 * 取得页面打印设置
		 * 
		 * @returns {}
		 */
		getPageSetup : function() {
			var ret = {};
			if (Wsh) {
				for ( var n in this.PAGESETTING) {
					ret[n] = Wsh.RegRead(HKEY_Root + HKEY_Path + n);
				}
			}
			return ret;
		},

		/**
		 * 清除页面打印设置
		 */
		clearPageSetup : function() {
			if (Wsh) {
				Wsh.RegWrite(HKEY_Root + HKEY_Path + "header", "");
				Wsh.RegWrite(HKEY_Root + HKEY_Path + "footer", "");
				Wsh.RegWrite(HKEY_Root + HKEY_Path + "margin_bottom", "0");
				Wsh.RegWrite(HKEY_Root + HKEY_Path + "margin_bottom", "0");
				Wsh.RegWrite(HKEY_Root + HKEY_Path + "margin_right", "0");
				Wsh.RegWrite(HKEY_Root + HKEY_Path + "margin_top", "0");
				Wsh.RegWrite(HKEY_Root + HKEY_Path + "margin_top", "0");
				Wsh.RegWrite(HKEY_Root + HKEY_Path + "Shrink_To_Fit", "no");
				Wsh.RegWrite(HKEY_Root + HKEY_Path + "Print_Background", "no");
			}
		},

		/**
		 * 设置页面打印设置
		 * 
		 * @param settings
		 */
		setPageSetup : function(settings) {
			if (!Wsh || !settings)
				return;
			for ( var n in this.PAGESETTING) {
				if (settings.hasOwnProperty(n)) {
					Wsh.RegWrite(HKEY_Root + HKEY_Path + n, settings[n]);
				}
			}
		},

		/**
		 * 获取当前url,构建url基本路径.
		 */
		getHref : function() {
			var href = window.location.href;
			var idx = href.indexOf("UIServer");
			href = href.substring(0, idx + 10);
		},

		fixInputElement : function($ele) {
			// TODO xyh
			// ie9下，通过input.value="xxx"赋值，.html()无法取出来。setAttribute方式赋值可以取出来，所以特殊处理
			// ie8,ie9,xforms-radio值无法取出，特殊处理
			var inputs = $ele.find("input");
			for ( var j = 0; j < inputs.length; j++) {
				var input = inputs[j];

				if (input.value != null && input.value != "") {
					input.setAttribute("value", input.value);
				}
				if (input.type == "radio" || input.type == "checkbox") {
					if (input.checked) {
						input.setAttribute("checked", "true");
					}
				}
			}
		},
		/**
		 * 获取要打印区域的html内容.
		 */
		getHtml : function(win, formId, links) {
			var self = this, html = "";
			for ( var i = 0; i < formId.length; i++) {
				var $ele = $("#" + formId[i]);
				$ele.addClass("noscroll");
				self.fixInputElement($ele);
				html += "<div>"
						+ ($ele[0].nodeName.toLowerCase().match("table|ul") ? $ele[0].outerHTML
								: $ele.html()) + "</div>";
			}
			var tmp = document.createElement('div');
			$(tmp).html(html);
			var headLink = self.transHtml(win, tmp, links);
			html = $(tmp).html();
			return {
				"html" : html,
				"headLink" : headLink
			};
		},

		getFrameHtml : function(win, $body, links) {
			var self = this, html = "";
			self.fixInputElement($body);
			html = "<div>" + $body.html() + "</div>";

			var tmp = document.createElement('div');
			$(tmp).html(html);
			var headLink = self.getLinks(win.document, links)
					+ self.transHtml(win, tmp, links);
			html = $(tmp).html();
			return {
				"html" : html,
				"headLink" : headLink
			};
		},

		getLinks : function(doc, links) {
			var linkHTML = "";
			$(doc)
					.find("link")
					.filter(
							function() {
								return $(this).attr("rel").toLowerCase() == "stylesheet";
							})
					.filter(
							function() {
								var media = $(this).attr("media");
								return (media.toLowerCase() == "" || media
										.toLowerCase() == "print");
							})
					.each(
							function() {
								var href = $(this).attr("href");
								if (!justep.Array.contain(links, href)) {
									linkHTML += '<link type="text/css" rel="stylesheet" href="'
											+ href + '" >';
									links.push(href);
								}

							});
			return linkHTML;
		},

		getActiveX : function(isPreview) {
			return (justep.Browser.IE && isPreview) ? "<OBJECT id=wb height=0 width=0 classid='CLSID:8856F961-340A-11D0-A96B-00C04FD705A2' name=wb></OBJECT>"
					: "";
		},

		/**
		 * 打印表单.
		 */
		printForm : function(formId, beforePrint, closeWin) {
			this.executePrintout(formId, beforePrint, closeWin, false);
		},
		/** 打印预览 * */
		printPreview : function(formId, beforePrint, closeWin) {
			this.executePrintout(formId, beforePrint, closeWin, true);
		},

		/** 执行打印输出 * */
		executePrintout : function(formId, beforePrint, closeWin, isPreview,
				options) {
			if (!formId) {
				justep.System.showMessage((new justep.Message(
						justep.Message.JUSTEP231072, formId)).getMessage());
				return;
			}

			var defaults = {
				mode : "popup",
				popHt : 500,
				popWd : 400,
				popX : 200,
				popY : 200,
				popTitle : ''
			};
			var settings = {};
			$.extend(settings, defaults, options);

			var writeDoc;
			var printWindow;
			if (settings.mode == "iframe") {
				var f = new this.Iframe();
				writeDoc = f.doc;
				printWindow = f.contentWindow || f;
			} else {
				printWindow = new this.Popup();
				writeDoc = printWindow.doc;
			}

			var links = [];
			var link1 = this.getLinks(document, links);
			var data = this.getHtml(window, formId, links);
			var title = $('title');
			var noPrintStyle = "<style type='text/css' media='print'>.noprint {display: none;} .noscroll:{overflow:visible} *{overflow:visible}</style>";
			var head = "<head><meta http-equiv='Content-Type; content='text/html; charset=utf-8'/><title>"
					+ (settings.popTitle ? settings.popTitle
							: (document.title ? document.title : "打印"))
					+ "</title>";
			head += noPrintStyle + link1 + data.headLink;
			head += "</head>";

			var btnClick = "onclick='window.print();'";
			if (justep.Browser.IE) {
				if (isPreview) {
					btnClick = " onclick='if(wb){wb.ExecWB(7, 1);}else{alert(\"ActiveX创建失败\");}'";
				} else {
					btnClick = " onclick='if(wb){wb.ExecWB(6, 1)else{window.print();}'";
				}
			}
			var btnHTML = "<div class='noprint'><button style='position: absolute;left:10px;top:5px;' type='button'"
					+ btnClick
					+ ">"
					+ (isPreview ? "预览" : "打印")
					+ "</button></div>";
			var docContent = '<!DOCTYPE html  PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd"> '
					+ "<html>"
					+ head
					+ "<body class='noscroll' "
					+ ((justep.Browser.IE && isPreview) ? "onload=' try{ __beforePrint && __beforePrint(); wb.execWB(7,1);}catch(e){alert(\"ActiveX未能正常加载\");}'"
							: "onload='try{__beforePrint && __beforePrint(); window.print();"
									+ (settings.mode == "popup" && closeWin ? "close()"
											: "")
									+ "}catch(e){alert(\"ActiveX未能正常加载\");}'")
					+ " style='margin: 0;padding: 0;height: 100%;width: 100%'>"
					+ this.getActiveX(isPreview)
					+ btnHTML
					+ data.html
					+ "</body>" + "</html>";
			writeDoc.open();
			writeDoc.write(docContent);
			writeDoc.close();
			printWindow.__beforePrint = beforePrint;
			printWindow.focus();
		},

		Iframe : function(parent) {
			var frameId = "print_html_frame";
			var iframeStyle = 'border:0;position:absolute;width:0px;height:0px;left:0px;top:0px;';
			var iframe;
			try {
				iframe = document.createElement('iframe');
				if (!parent)
					parent = document.body;
				parent.appendChild(iframe);
				$(iframe).attr({
					style : iframeStyle,
					id : frameId,
					src : "",
					name : "hhhh"
				});
				iframe.doc = null;
				iframe.doc = iframe.contentDocument ? iframe.contentDocument
						: (iframe.contentWindow ? iframe.contentWindow.document
								: iframe.document);
			} catch (e) {
				throw e;
			}

			if (iframe.doc == null) {
				var msg = new justep.Message(justep.Message.JUSTEP231073);
				throw justep.Error.create(msg);
			}

			return iframe;
		},

		Popup : function() {
			var windowAttr = "location=no,statusbar=no,directories=no,menubar=no,resizable=yes,scrollbars=yes,titlebar=no,toolbar=no,dependent=no";
			var newWin = window.open("", "_blank", windowAttr);
			if (newWin == null) {
				throw "您的浏览器禁止打开" + location.protocol + "//" + location.host
						+ "的弹出窗口";
			}
			newWin.doc = newWin.document;
			return newWin;
		},

		transHtml : function(win, node, links) {
			var self = this;
			var linkHTML = "";
			// xftext处理
			$(node).find(".xforms-textarea").each(
					function() {
						var v = win.justep.xbl(this.id).getValue();
						$(".xxf-value", this).css("vertical-align", "top")
								.html(
										"<div style='text-align:left;'>"
												+ (v ? v : '') + "</div>");
					});
			$(node)
					.find("iframe")
					.each(
							function() {
								var node = $(this);
								var srcFrame = win.frames[this.id];
								if (srcFrame) {
									var srcDoc = srcFrame.contentDocument ? srcFrame.contentDocument
											: (srcFrame.contentWindow ? srcFrame.contentWindow.document
													: srcFrame.document);
									var data = self.getFrameHtml(
											srcFrame.contentWindow || srcFrame,
											$(srcDoc.body), links);
									$(data.html).insertBefore(node);
									linkHTML += data.headLink;
									node.remove();
								}
							});
			$(node).find("input").each(function() {
				this.setAttribute("readonly", "true");
			});

			$(node)
					.find("textarea")
					.each(
							function() {
								this.parentNode.style.cssText = "word-break:break-all;";
								this.parentNode.innerHTML = this.value ? self
										.replaceAll(
												self
														._dhx_encoding(("" + this.value)),
												"\n", "<br/>")
										: "&nbsp;";
							});

			$(node).find("table").each(function() {
				self.clearHtmlEvent(this);
			});

			$(node).find("div").each(function() {
				self.clearHtmlEvent(this);
			});

			$(node).find("span").each(function() {
				self.clearHtmlEvent(this);
			});

			// grid
			$(node).find(".gridbox").each(function() {
				self.combineJSGrid(this);
			});

			// trigger
			$(node)
					.find("table.xui-button")
					.each(
							function() {
								$(this).find("button").each(function() {
									this.parentNode.innerHTML = "&nbsp;";
								});
								$(this).find("a").each(function() {
									this.parentNode.innerHTML = "&nbsp;";
								});
								$(this)
										.css("cssText",
												"background-color:white!important;border:none");
							});

			// $(node).find("button")
			// .each(
			// function() {
			// // Tabs的标签
			// if (!(this.parentNode
			// && this.parentNode.parentNode && $(
			// this.parentNode.parentNode).hasClass(
			// "tabItems"))) {
			// this.parentNode.innerHTML = "&nbsp;";
			// $(this).css({
			// "background-color" : "",
			// border : "none"
			// });//
			//
			// }
			//
			// });

			$(".dhx_combo_box img,.xforms-ext-select img,.xxf-alert img", node)
					.remove();
			return linkHTML;
		},

		clearHtmlEvent : function(node) {
			if (node.onmouseover) {
				node.onmouseover = null;
			}
			if (node.onmouseout) {
				node.onmouseout = null;
			}

			if (node.onclick) {
				node.onclick = null;
			}
		},

		/**
		 * 转换表单元素，主要是使用div来代替表单组件以及去掉图片.
		 */
		transPrintForm : function(parentNode) {
			var node = parentNode.firstChild;
			while (node) {
				if (node.tagName == 'DIV') {

					if (node.getAttribute('component') == '/UI/system/components/toolbars.xml#toolbars') {
						node.parentNode.parentNode.innerHTML = "";
					} else if (node.getAttribute('component') == '/UI/system/components_client/toolbars.xml#toolbars') {
						this.resetTrHeight(node, 1);
						node.parentNode.innerHTML = "";
					} else if (node.className.indexOf('gridbox') != -1) {
						this.combineJSGrid(node);
					} else if (node.getAttribute('component') == '/UI/system/components/grid.xml#grid') {
						node.parentNode.style.borderLeft = "#c0c0c0 1px solid";
						node.parentNode.style.verticalAlign = "top";
						this.combineOpsGrid(node);
					} else {
						if (node.innerHTML == '') {
							var nextNode = node.nextSibling;
							if (nextNode) {

							}
							node.parentNode.removeChild(node);
							node = nextNode;
							continue;
						} else {
							this.transPrintForm(node);
						}
					}
				} else {
					this.transFormItem(node);
				}

				if (node.onmouseover) {
					node.onmouseover = null;
				}
				if (node.onmouseout) {
					node.onmouseout = null;
				}
				node = node.nextSibling;
			}
		},

		transFormItem : function(node) {
			if (node.tagName == 'INPUT') {
				var inputType = node.getAttribute('type');
				node.parentNode.style.textAlign = node.style.textAlign;
				if (inputType == 'radio' || inputType == 'checkbox') {

				} else if (inputType == 'button') {
					node.parentNode.innerHTML = "&nbsp;";
				} else {
					var nextNode = node.nextSibling;
					if (nextNode) {
						if (nextNode.tagName == 'IFRAME') { // 处理富文本
							node.parentNode.style.fontSize = "13px";
							node.parentNode.innerHTML = window.frames[nextNode.id].document.frames[0].document.body.innerHTML
									|| "&nbsp;";
						} else {
							node.parentNode.style.fontSize = "13px";
							node.parentNode.innerHTML = node.value ? ("" + node.value)
									._dhx_encoding()
									: "&nbsp;";
						}
					} else { // 普通input处理
						node.parentNode.style.fontSize = "13px";

						node.parentNode.innerHTML = node.value ? ("" + node.value)
								._dhx_encoding()
								: "&nbsp;";
					}
				}
			} else if (node.tagName == 'TEXTAREA') {
				node.parentNode.innerHTML = node.value ? ("" + node.value)
						._dhx_encoding().replaceAll("\n", "<br/>") : "&nbsp;";
			} else if (node.tagName == 'BUTTON') {
				node.parentNode.innerHTML = "&nbsp;";
			} else if (node.tagName == 'LABEL') {
				// node.innerHTML = "&nbsp;";
			} else {
				this.transPrintForm(node);
			}
		},

		findTableByClsName : function(node, clsName) {
			if (node.tagName == 'TABLE' && node.className
					&& node.className.indexOf(clsName) != -1) {
				return node;
			}
			if (node.tagName == 'TABLE' && node.parentNode.className == clsName) {
				return node;
			} else {
				var cNodes = node.childNodes;
				for ( var i = 0; cNodes.length > i; i++) {
					var tb = this.findTableByClsName(cNodes[i], clsName);
					if (tb) {
						return tb;
					}
				}
			}
		},

		combineOpsGrid : function(grid) {
			return;
			var headTable = this.findTableByClsName(grid,
					"justep-grid-board-scroll-head");
			var dataTable = this.findTableByClsName(grid,
					"justep-grid-board-scroll-content");
			this.combineGrid(headTable, dataTable);
		},

		/**
		 * js grid.
		 */
		combineJSGrid : function(grid) {
			var headTable = this.findTableByClsName(grid, "hdr");
			var dataTable = this.findTableByClsName(grid, "obj");
			var footTable = this.findTableByClsName(grid, "ftr");
			this.resetTrHeight(headTable);
			this.resetTrHeight(dataTable);
			this.combineGrid(headTable, dataTable, footTable);
			this.clearGridBlankBlock(grid);
		},

		clearGridBlankBlock : function(table) {
			var childNodes = table.childNodes;
			for ( var i = 0; i < childNodes.length; i++) {
				if (childNodes[i].tagName == 'DIV') {
					if (childNodes[i].innerHTML == "") {
						childNodes[i].style.display = "none";
					}

					if (childNodes[i].className == "objbox") {
						if (justep.Browser.IE) {
							childNodes[i].style.removeAttribute("height");
						} else {
							childNodes[i].style.removeProperty("height");
						}
					}
				}
			}
		},

		resetTrHeight : function(e, h) {
			if (!e) {
				return;
			}
			var pNode = e.parentNode;
			while (pNode) {
				if (pNode.style) {
					pNode.style.overFlow = "";
				}
				if (pNode.tagName == 'TR') {
					pNode.height = h || "";
					break;
				}
				pNode = pNode.parentNode;
			}
		},

		/**
		 * 把grid的的表头和表体合并.
		 */
		combineGrid : function(hdTable, dataTable, footTable) {
			if (!hdTable) {
				return;
			}
			var rows = hdTable.rows;
			var hiddenColIdx = [];
			var cells = rows[0].cells;
			for ( var i = 0, l = cells.length; i < l; i += 1) {
				var id = cells[i].id;
				if (cells[i].style.width == "0px"
						|| (id && id.indexOf("_space-column") != -1)) {
					hiddenColIdx.push(i);
				}
			}
			var hdTR;
			for ( var i = rows.length - 1; i >= 0; i--) {
				var r = rows[i];
				var cells = r.cells;
				var colIdx = 0;
				for ( var j = 0; j < cells.length; j += 1) {
					var cell = cells[j];
					if ($.inArray(colIdx, hiddenColIdx) != -1) {
						cell.style.display = "none";
					}
					var colSpan = cell.getAttribute("colSpan")
							|| cell.getAttribute("colspan");
					if (colSpan) {
						colIdx += parseInt(colSpan || "1");
					} else {
						colIdx += 1;
					}
					cell.style.textAlign = "center";
				}

				if ($.inArray(colIdx, hiddenColIdx) != -1) {
					cell.style.display = "none";
				}

				r.parentNode.removeChild(r);
				if (r.style.position == 'absolute' || r.style.height == 'auto') {
					hdTR = r;
				} else {
					dataTable.firstChild.insertBefore(r, dataTable.rows[0]);
				}
			}

			// 去掉grid head中没用的tr
			hdTable.parentNode.innerHTML = "";

			if (dataTable) {
				var hdCells = hdTR.childNodes;
				var removeRows = [];
				var rows = dataTable.rows;
				for ( var i = 0; i < rows.length; i++) {
					if (rows[i].style.position == 'absolute'
							|| rows[i].style.height == 'auto') {
						removeRows.push(rows[i]);
					} else {
						var cells = rows[i].cells;
						var colIdx = 0;
						for ( var j = 0; j < cells.length; j += 1) {
							var cell = cells[j];
							if ($.inArray(colIdx, hiddenColIdx) != -1) {
								cell.style.display = "none";
							}
							var colSpan = cell.getAttribute("colSpan")
									|| cell.getAttribute("colspan");
							if (colSpan) {
								colIdx += parseInt(colSpan || "1");
							} else {
								colIdx += 1;
							}

							cells[j].style.cssText = (cells[j].style.cssText || "")
									+ ";word-break:break-all;border:solid #999;border-width:0px 1px 1px 0px;padding-left:2px;";
							if (hdCells[j] && hdCells[j].style.width == "0px") {
								cells[j].style.display = "none";
								continue;
							} else if (hdCells[j]) {
								var colSpan = parseInt(cells[j]
										.getAttribute("colSpan")
										|| cells[j].getAttribute("colspan")
										|| "1");
								if (colSpan <= 1) {
									cells[j].width = hdCells[j].style.width;
								}
							}

							this.transFormItem(cells[j]);// .innerHTML =
							// "ww";
							if (!cells[j].innerHTML) {
								cells[j].innerHTML = "&nbsp;";
							}
						}
					}
				}
				for ( var i = 0; i < removeRows.length; i++) {
					removeRows[i].parentNode.removeChild(removeRows[i]);
				}
				removeRows = null;
			}
			if (footTable) {
				var rows = footTable.rows;
				var rowBuf = [];
				for ( var i = 0; i < rows.length; i++) {
					var r = rows[i];
					if (r.style.position != 'absolute') {
						rowBuf.push(r);
					}
				}

				for ( var i = 0; i < rowBuf.length; i++) {
					dataTable.firstChild.appendChild(rowBuf[i]);
					var tdNodes = rowBuf[i].childNodes;
					for ( var j = 0; j < tdNodes.length; j++) {
						tdNodes[j].style.cssText = (tdNodes[j].style.cssText || "")
								+ ";BORDER-RIGHT: #999 1px solid; BORDER-TOP:0px; PADDING-LEFT: 1px; BORDER-LEFT: #999 0px solid; WORD-BREAK: break-all; BORDER-BOTTOM: #999 1px solid";
					}
				}
				footTable.parentNode.innerHTML = "";

				var rows = dataTable.rows;
				var lastRow = rows[rows.length - 1];
				var tdNodes = lastRow.childNodes;
				for ( var i = 0; i < tdNodes.length; i++) {
					// tdNodes[i].style.cssText ="BORDER-RIGHT: #999 1px solid;
					// BORDER-TOP: #999 0px solid; PADDING-LEFT: 2px;
					// BORDER-LEFT:
					// #999 0px solid; WORD-BREAK: break-all; BORDER-BOTTOM:
					// #999
					// 1px solid";
				}
			}
			dataTable.parentNode.style.overflow = "hidden";
			dataTable.style.cssText = dataTable.style.cssText
					+ ";border-collapse:collapse;  border:solid #999; border-width:1px 0 0 1px; ";
			// BORDER-RIGHT: #999 1px solid; BORDER-TOP: #999 0px solid;
			// PADDING-LEFT: 2px; BORDER-LEFT: #999 0px solid; WORD-BREAK:
			// break-all; BORDER-BOTTOM: #999 1px solid
			// alert(rows[rows.length-1]);
			// prompt(null,dataTable.outerHTML);
		},

		_dhx_encoding : function(str) {
			var res = "";
			for ( var i = 0; i < str.length; i++) {
				var ch = str.charAt(i);
				if (ch == '>') {
					res += "&gt;";
				} else if (ch == '<') {
					res += "&lt;";
				} else if (ch == '&') {
					res += "&amp;";
				} else {
					var c = str.charCodeAt(i);
					res += c >= 160 ? "&#" + c + ";" : str.charAt(i);
				}
			}
			return res;
		},

		replaceAll : function(str, s1, s2) {
			return str.replace(new RegExp(s1, "gm"), s2);
		}
	};

	// ******************页面组件特殊处理***************************

	butone.doTextArea = function(textareaIds) {
		if (!textareaIds)
			return;
		var array = typeof textareaIds == "string" ? textareaIds.split(',') : $
				.isArray(textareaIds) ? textareaIds : [];
		for ( var i = 0; i < array.length; i++) {
			var $comp = $("#" + array[i]), $td = $comp.parent("td");
			if ($td.length > 0)
				$comp.height($td[0].clientHeight + "px");
		}
	};

	// ******************数学计算****************************
	butone.math = $.extend(butone.math, {
		/**
		 * 合计函数 参数 srcDsID:明细数据集ID,
		 * srcFlds:明细字段,trgDsID:主数据集ID,trgFlds:主数据集字段,scales保留小数位
		 */
		sum : function(event, srcDsID, srcFlds, trgDsID, trgFlds, trgContext,
				scales) {
			isNaN(parseInt(scales)) && (scales = -1);
			var srcData = justep.xbl(srcDsID);
			var trgData = null;
			if (trgContext)
				trgData = trgContext.xbl(trgDsID);
			else
				trgData = justep.xbl(trgDsID);
			if (srcData == null || trgData == null)
				return;
			if (!srcData.active || !trgData.active)
				return;
			var index = srcFlds.indexOf(event.column);
			var sumValue = 0;
			var sumValues = new Array();
			for ( var i = 0; i < srcFlds.length; i++) {
				sumValues[i] = 0;
			}
			if (event.type != "delete" && index < 0)
				return;
			// 先计算出合计值之后再赋值，避免循环赋值时字段自动填充运算
			if (event.type != "delete") {
				for ( var i = 0; i < srcData.getCount(); i++) {
					var id = srcData.getID(i);
					var value = srcData.getValue(event.column, id);
					if (value == null || value == "")
						value = 0;
					else
						value = parseFloat(value);
					sumValue = sumValue + value;
				}
				if (trgData.getCount() == 0)
					trgData.newData();
				(scales >= 0) && (sumValue = this.toFixed(sumValue, scales));
				trgData.setValue(trgFlds[index], sumValue);
			} else {
				for ( var i = 0; i < srcData.getCount(); i++) {
					var id = srcData.getID(i);
					for ( var j = 0; j < srcFlds.length; j++) {
						var value = srcData.getValue(srcFlds[j], id);
						if (value == null || value == "")
							value = 0;
						else
							value = parseFloat(value);
						sumValues[j] = sumValues[j] + value;
					}
				}
				if (trgData.getCount() == 0)
					trgData.newData();
				for ( var j = 0; j < trgFlds.length; j++) {
					(scales >= 0)
							&& (sumValues[j] = this.toFixed(sumValues[j],
									scales));
					trgData.setValue(trgFlds[j], sumValues[j]);
				}
			}

		},
		/**
		 * 获得数字值,空值返回0
		 */
		getFldNumberVal : function(ds, fldId, rowid) {
			if (typeof ds == "string")
				ds = justep.xbl(ds);
			var value = parseFloat(arguments.length == 3 ? ds.getValue(fldId,
					rowid) : ds.getValue(fldId));
			return isNaN(value) ? 0 : value;
		},
		/**
		 * 计算2个数的百分比，默认保留2位小数 xx.xx%
		 */
		get2FldRation : function(fld1, fld2, dsId, scales) {
			isNaN(parseInt(scales)) && (scales = 2);
			var value1 = this.getFldNumberVal(dsId, fld1);
			var value2 = this.getFldNumberVal(dsId, fld2);
			if (value2 == 0)
				return "";
			else {
				return this.toFixed(value1 * 100 / value2, scales);
			}
		},
		/**
		 * 保留小数位
		 */
		toFixed : function(value, scales) {
			if (value == undefined || value == null || value == "")
				return value;
			isNaN(parseInt(scales)) && (scales = 0);
			result = parseFloat(value);
			var p = Math.pow(10, scales);
			return Math.round(value * p) / p;
		},

		getFldRation3 : function(fld, dsId, scales) {
			var value = this.getFldNumberVal(dsId, fld);
			var result = value / 1000000;
			if (parseInt(result) != result)
				result = this.toFixed(result, scales);
			return result;
		}
	});

	// **************************共享消息框************************
	butone.Dialog = {
		dialog : function() {
			if (!this._MsgDialog) {
				this._MsgDialog = new justep.System.showMessage();
			}
			return this._MsgDialog;
		},

		error : function(msg, details) {
			this.dialog().open({
				msg : msg,
				details : details,
				img : 'error',
				title : '错误信息',
				type : 0
			});
		},
		simple : function(msg, title, callback) {
			this.dialog().open({
				msg : msg,
				details : '',
				img : 'question',
				title : title,
				type : 0,
				callback : callback
			});
		},
		question : function(msg, details, callback) {
			this.dialog().open({
				msg : msg,
				details : details,
				img : 'question',
				title : '确认信息',
				type : 2,
				callback : callback
			});
		},

		info : function(msg, details, callback) {
			this.dialog().open({
				msg : msg,
				details : details,
				img : 'info',
				title : '提示信息',
				type : 0
			});
		},
		success : function(msg, details, callback) {
			this.dialog().open({
				msg : msg,
				details : details,
				img : 'right',
				title : '成功信息',
				type : 0
			});
		}

	};

	// ****************** 窗体显示****************************
	butone.Window = {
		hint : function(msg, delay) {
			var container = $("#butoneWindowHint");
			if (container.length == 0) {
				container = $("<div id='butoneWindowHint' class='x-hint x-hint-top'></div>")
				container.appendTo($("body"));
			}
			var html = '<div class="alert alert-info" style="z-index: 50000;">'
					+ (delay > 0 ? ""
							: '<span aria-hidden="true">&times;</span>') + msg
					+ '</div>';
			var $el = $(html).appendTo(container).show('slow');

			function closeFn() {
				$el.fadeTo(1000, 0.25, function() {
					$el.remove();
				});
			}
			if (delay > 0) {
				var iid = setTimeout(function() {
					clearTimeout(iid);
					closeFn();
				}, delay);
			} else {
				$el.click(closeFn);
			}
		},
		/**
		 * 通过.w的url路径解析process和activity
		 * 
		 * @param url
		 * @returns {}
		 */
		parseProcessActivityFormUrl : function(url) {
			var process = url.substring(3, url.lastIndexOf("/"));
			return {
				process : process + "/"
						+ process.substring(process.lastIndexOf("/") + 1)
						+ "Process",
				activity : url.substring(url.lastIndexOf("/") + 1, url
						.indexOf("."))
			};
		},

		run : function(url, title, data, onSend, onReceive) {
			var options;
			var rn;// 增加一个返回值
			if (arguments.length > 1) {
				options = {
					url : arguments[0],
					title : arguments[1],
					data : arguments[2],
					onSend : arguments[3],
					onReceive : arguments[4]
				};
			} else {
				options = arguments[0];
			}
			function doRunner() {
				var runner = new justep.WindowRunner(options.url,
						options.title, true, options.onSend, options.onReceive);
				runner.setProcess(options.process);
				runner.setActivity(options.activity);
				rn = runner;// 增加一个返回值
				if (options.data) {
					runner.open2({
						data : options.data
					});
				} else
					runner.open();
			}
			if (justep.WindowRunner) {
				doRunner();
				// 增加一个返回值
				return rn;
			} else {
				butone.Loader.requireJS(
						[ "system/components/windowRunner/windowRunner" ])
						.done(doRunner);
			}

		},

		dialog : function() {
			var options;
			if (arguments.length > 1) {
				options = {
					id : arguments[0],
					url : arguments[1],
					title : arguments[2],
					data : arguments[3],
					modal : arguments[4],
					status : arguments[5],
					width : arguments[6],
					height : arguments[7],
					reloadOnOpen : arguments[8],
					onSend : arguments[9],
					onReceive : arguments[10],
					onClose : arguments[11],
					process : arguments[12],
					activity : arguments[13]
				};
			} else {
				options = arguments[0];
			}

			var me = this;
			function showDialog(dlg) {
				var sendHandler, receiveHandler;
				if (options.onSend) {
					sendHandler = dlg
							.attachEvent("onSend", options.onSend, dlg);
				}
				if (options.onReceive) {
					receiveHandler = dlg.attachEvent("onReceive",
							options.onReceive, dlg);
				}

				var closeHandler = dlg.attachEvent("onClose", function(event) {
					dlg.detachEvent(closeHandler);
					sendHandler && dlg.detachEvent(sendHandler);
					receiveHandler && dlg.detachEvent(receiveHandler);
					options.onClose && options.onClose.apply(null, arguments);
				}, dlg);
				if(options.data && options.data.process){
					dlg.setProcess(options.data.process);
					delete options.data.process;
				}else if(options.process){
					dlg.setProcess(options.process);
				}
				if(options.data && options.data.activity){
					dlg.setActivity(options.data.activity);
					delete options.data.activity;
				}else if(options.activity){
					dlg.setActivity(options.activity);
				}
				if (options.data) {
					dlg.open2({
						data : options.data
					});
				} else
					dlg.open();
			}
			function createDialog() {
				var dlg = new justep.WindowDialog(options.id, options.url,
						options.title, options.modal, options.status,
						options.width, options.height, null, null,
						options.reloadOnOpen);
				if (options.id) {
					me._dialogs = me._dialogs || {};
					me._dialogs[options.id] = dlg;
				}
				return dlg;
			}
			var dialog;
			if (options.id && me._dialogs) {
				dialog = me._dialogs[options.id];
			}
			if (dialog) {
				showDialog(dialog);
			} else {
				if (justep.WindowDialog) {
					showDialog(createDialog());
				} else {
					butone.Loader
							.requireJS(
									[ "system/components/dialog/dialog",
											"system/components/windowDialog/windowDialog" ])
							.done(function() {
								showDialog(createDialog());
							});
				}
			}
		},

		open : function() {
			var options;
			if (arguments.length > 1) {
				options = {
					id : arguments[0],
					url : arguments[1],
					data : arguments[2],
					modal : arguments[3],
					status : arguments[4],
					width : arguments[5],
					height : arguments[6],
					resizeable : arguments[7],
					onSend : arguments[8],
					onReceive : arguments[9],
					onClose : arguments[10]
				}
			} else {
				options = arguments[0];
			}
			function createOpener() {
				var opener = new justep.WindowOpener({
					id : options.id,
					url : options.url,
					modal : options.modal,
					status : options.status,
					width : options.width,
					height : options.height,
					resizable : options.resizeable
				});
				var sendHandler, receiveHandler;
				if (options.onSend) {
					sendHandler = opener.attachEvent("onSend", options.onSend,
							opener);
				}
				if (options.onReceive) {
					receiveHandler = opener.attachEvent("onReceive",
							options.onReceive, opener);
				}
				var closeHandler = opener.attachEvent("onClose",
						function(event) {
							opener.detachEvent(closeHandler);
							sendHandler && opener.detachEvent(sendHandler);
							receiveHandler
									&& opener.detachEvent(receiveHandler);
							options.onClose
									&& options.onClose.apply(null, arguments);
						}, opener);
				opener.setProcess(options.process);
				opener.setActivity(options.activity);
				return opener;
			}
			var opener;
			if (options.id && justep.openers) {
				opener = justep.openers[options.id];
			}
			if (opener && (!opener.window || opener.window.closed)) {
				opener = null;
			}
			if (opener == null) {
				if (justep.WindowOpener) {
					createOpener().open({
						data : options.data
					});
				} else {
					butone.Loader.requireJS(
							[ "system/components/windowOpener/windowOpener" ])
							.done(function() {
								createOpener().open({
									data : options.data
								});
							});
				}
			} else {
				opener.window.focus();
			}
		}
	};

	butone.Request = $.extend(butone.Request,
			{
				/**
				 * 执行java表达式
				 * 
				 * @param expr
				 *            表达式
				 * @param key1,value1,key2,value2...
				 *            表达式中使用的宿主参数
				 * @eg butone.Request.executeJavaExpr('currentAreaIdOrName(:p1)','p1',false)
				 * @returns
				 */
				executeJavaExpr : function() {
					var result, expr = arguments[0];
					var options = {}, param = new justep.Request.ActionParam();
					param.setString("expr", expr);
					if (arguments.length > 1) {
						var n = 1;
						variables = new justep.Request.MapParam();
						param.setMap("variables", variables);
						while (n < arguments.length - 1) {
							variables.put(arguments[n], arguments[n + 1]);
							n = n + 2;
						}
					}
					options.dataType = "json";
					options.parameters = param;
					options.action = "executeJavaExprAction";
					options.callback = function(callbackData) {
						callbackData.ignoreError = false;
						if (callbackData.state) {
							result = callbackData.response;
						} else {
							butone.Dialog.info("执行后台函数失败!",
									callbackData.response.message);
						}
					};
					justep.Request.sendBizRequest2(options);
					return result;
				},
				// 获得当前区域名称
				getCurrentAreaName : function() {
					return this.executeJavaExpr('currentAreaIdOrName(:p1)',
							'p1', false);
				},
				// 获得当前区域ID
				getCurrentAreaID : function() {
					return this.executeJavaExpr('currentAreaIdOrName(:p1)',
							'p1', true);
				},
				// 获得上级区域名称
				getParentAreaName : function() {
					return this.executeJavaExpr('getHigherLevelArea(:p1)',
							'p1', false);
				},
				// 获得上级区域ID
				getParentAreaID : function() {
					return this.executeJavaExpr('getHigherLevelArea(:p1)',
							'p1', true);
				},
				// 获得要件模板 模板定义已放到设计器上，该系统参数兼容老版本
				getMaterialMobile : function() {
					return this.executeJavaExpr('getSysPara(:p1)',
							'p1', '要件模板');
				},
				executeBizLogicPlugin : function(options) {
					require([ "base/plugins/LogicTrigger" ], function(Plugin) {
						var plugin = new Plugin();
						if (options.onCommitAfter)
							plugin.attachEvent("onCommitAfter", options.onCommitAfter);
						plugin.execute(options);
					});
				},
				// 转换URL
				convertUrl : function(url) {
					url = justep.Request.convertURL(url, false);
					url = location.protocol + "//" + location.host + url;
					return url;
				}
			});

	// 数据校验(不能删除，兼容已经搭建的系统)
	butone.validate = function(field, expr) {
		butone
				.debug("butone.validate函数已废弃，请使用工作字段校验属性,或参考新的数据格式验证:butone.DataFormatRegex");
		return false;
		// // IP
		// var ip =
		// /^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/;
		// var ip_info = "请输入正确的IP！";
		// // 15位数身份证正则表达式
		// var card15 = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$/;
		// // 18位数身份证正则表达式
		// var card18 =
		// /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[X|x])$/;
		//
		// var card = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
		// var card_info = "请输入正确的身份证号！";
		// // 固定电话
		// var tel = /^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/;
		// var tel_info = "请输入正确的固定电话！";
		// // 移动电话
		// var mobile = /^(?:13\d|15[89])-?\d{5}(\d{3}|\*{3})$/;
		// var mobile_info = "请输入正确的移动电话！";
		// // 邮政编码
		// var post = /^[1-9][0-9]{5}$/;
		// var post_info = "请输入正确的邮政编码！";
		// // 邮箱
		// var email =
		// /[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g;
		// var email_info = "请输入正确的邮箱！";
		// // URL
		// var url =
		// /(?:https|http|ftp|rtsp|rtsp|igmp|file|rtspt|rtspu):\/\/[^\/]+(\/.*)?\/([^\/]+\.[^\/\.]+)$/;
		// var url_info = "请输入正确的URL地址！";
		//
		// // 日期 2015-08-30
		// var date = /^(\d{1,4})(-|\/)(\d{1,2})\2(\d{1,2})$/;
		// var date_info = "请输入正确的日期格式！";
		// // 时间 12:12:12
		// var time = /^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/;
		// var time_info = "请输入正确的时间格式！";
		// // 日期时间 2015-08-30 12:12:12
		// var dateTime =
		// /^(?:19|20)[0-9][0-9]-(?:(?:0[1-9])|(?:1[0-2]))-(?:(?:[0-2][1-9])|(?:[1-3][0-1]))
		// (?:(?:[0-2][0-3])|(?:[0-1][0-9])):[0-5][0-9]:[0-5][0-9]$/;
		// var dateTime_info = "请输入正确的日期时间格式！";
		//
		// if (field[0] || field.length != 0) {
		// var data = justep.xbl(field[0].store.concept);
		// var fieldValue = data.getValue(field[0].fieldName);
		// var result = (eval(expr)).test(fieldValue);
		// return result;
		// }
		// return false;
	};
	// butone.BizRec.openBizRec();
	butone.BizRec = {
		// 浏览案卷
		openBizRec : function(fBizRecId, bDo, sActivity) {
			var taskId = "", url = "", process = "", processName = "", activity = "", executor = "", pattern = "";
			var param = new justep.Request.ActionParam();
			param.setString("fBizRecId", fBizRecId);
			justep.Request.sendBizRequest2({
				action : "openBizRecAction",
				dataType : "json",
				parameters : param,
				callback : function(result) {
					if (result.state) {
						taskId = result.response.taskId;
						url = result.response.url;
						process = result.response.process;
						processName = result.response.processName;
						activity = result.response.activity;
						executor = result.response.executor;
						pattern = result.response.pattern || "detail";
					} else {
						throw justep.Error.create("查询案卷任务信息失败，"
								+ result.response.message);
					}
				}
			});
			if (!!taskId) {
				var executor = executor || justep.Context.getCurrentPersonID();
				if (url.indexOf(".a") !== -1) {
					// 强制使用UI的w文件，否则windowRunner会出问题
					url = url.substring(0, url.length - 2) + ".w";
				}
				var realUrl = url + "?task=" + taskId + "&process=" + process;
				if (!!sActivity) {
					realUrl += "&activity=" + sActivity;
				} else {
					realUrl += "&activity=" + activity;
				}
				if (bDo) {
					realUrl += "&activity-pattern=do";
				} else
					realUrl += "&activity-pattern=" + pattern;

				realUrl += "&bizRecId=" + fBizRecId;
				justep.Portal.openWindow(processName, realUrl, false, null,
						executor);
			} else {
				butone.Window.hint("未找到案卷信息！", 1000);
			}
		},
		// 回退
		backProcess : function(act, fids) {
			butone.Window.dialog("customBackDlg",
					'/UI/base/system/common/dialogs/ideaDialog.w', "回退对话框", {},
					true, null, "600px", "300px", true, null, function(evt) {
						var idea = evt.data.idea;
						butone.Request.executeJavaExpr(
								'backToAct(:taskId,:act,:fids,:idea)',
								'taskId', justep.Context.getTask(), 'act', act,
								'fids', fids, "idea", idea);
						justep.Portal.closeWindow(justep.Portal.getWindowId());
					});
		},
		// 纸纸办结
		paperFinish : function(bizrecId) {
			butone.Dialog.question("确认纸质办结吗？", null, function(evt) {
				if (evt.status == "yes") {
					butone.Request.executeJavaExpr(
							'paperFinish(:bizRecId,:reason)', 'bizRecId',
							bizrecId, 'reason', "纸质办结");
					justep.Portal.closeWindow(justep.Portal.getWindowId());
				}
			});
		}
	};

	var portal = justep.Portal._isPortal2() ? justep.Portal._getPortal2().justep.Portal
			: justep.Portal._getJPolite().justep.Portal;
	if (portal && !portal.getGDCA) {
		console.error("portal没有getGDCA方法，api.js...");
	}
	var GDCA = portal && portal.getGDCA ? portal.getGDCA() : null;

	butone.Components = {};

	butone.Components.Sign = {
		getDateTimeText : function(date) {
			if (!date)
				return "";
			if (typeof date == "string")
				return date;
			return justep.Date.toString(date, justep.Date.STANDART_FORMAT);
		},
		/**
		 * 获得保护数据
		 * 
		 * @param data
		 * @param protectFields
		 * @param options
		 */
		getProtectData : function(data, protectFields, options) {
			var ret = {
				text : "",
				data : {}
			};
			for ( var n in protectFields) {
				var protectField = protectFields[n];
				var args = protectField.split(".");
				var target = args.length == 2 ? justep.xbl(args[0]) : data;
				if (target == null) {
					throw new Error("数据对象不存在");
				} else if (!target.loaded) {
					if (target.masterData && target.masterData.id) {
						target.loadDataByMaster();
					} else {
						target.loadData();
					}
				}
				var v = target.getValue(args.length == 2 ? args[1] : args[0])
						|| "";
				ret.data[protectField] = v;
				ret.text += v;
			}
			ret.data["fSignName"] = data.getValue(options.signField),
					ret.text += ret.data["fSignName"];

			ret.data["fSignTime"] = this
					.getDateTimeText(options.signDateField ? data
							.getValue(options.signDateField) : justep.System
							.datetime()), ret.text += ret.data["fSignTime"];

			return ret;
		},

		/**
		 * 获得验证信息
		 * 
		 * @param data
		 * @param options
		 * @returns {Object}
		 */
		getSignVerifyInfo : function(data, options) {
			var ret = new Object();
			if (!options.signDataField) {
				ret["tag"] = 1;
				ret["msg"] = "签名的认证字段不存在";
				return ret;
			}
			var signDataStr = data.getValue(options.signDataField);
			if (!signDataStr) {
				if (!!data.getValue(options.signField)) {
					ret["tag"] = 2;
					ret["msg"] = "无签名认证数据";
				} else {
					ret["tag"] = 0;
				}
				return ret;
			}
			var signData;
			try {
				signData = JSON.parse(signDataStr);
			} catch (e) {
				ret["tag"] = -1;
				ret["msg"] = "原始签名加密数据格式有误，可能已被篡改。";
				ret["details"] = signDataStr;
				return;
			}
			var currData = this.getProtectData(data, signData.protectedFields,
					options);
			var b = this.verifySignData(signData.algoName, signData.algoParam,
					currData.text, signData.encryptData);
			if (!b) {
				ret = {
					tag : -1,
					msg : "数据已被篡改<br>"
							+ this.compareSignData(this.getProtectFieldsLabel(
									data, signData.protectedFields),
									signData.orgiData, currData.data),
					orgiSignData : signData.orgiData,
					currSignData : currData.data
				};
			} else {
				ret = {
					tag : 0,
					msg : "验证通过"
				};
			}
			return ret;
		},

		compareSignData : function(labels, orgiData, currData) {
			var ret = $("<table style='border:1px solid #ccc' cellpadding='0' cellspacing='0'/>");
			ret
					.append("<tr><th style='border-right:1px solid #ccc;border-bottom:1px solid #ccc'>数据项</th><th style='border-right:1px solid #ccc;border-bottom:1px solid #ccc'>原始数据</th><th style='border-bottom:1px solid #ccc'>当前数据</th></tr>");
			for ( var n in orgiData) {
				var l = labels[n] || n;
				ret
						.append("<tr><td style='border-right:1px solid #ccc;border-bottom:1px solid #ccc'>"
								+ l
								+ "</td><td style='border-right:1px solid #ccc;border-bottom:1px solid #ccc'>"
								+ orgiData[n]
								+ "</td><td style='border-bottom:1px solid #ccc;color:"
								+ (currData[n] != orgiData[n] ? "red" : "#000")
								+ "'>" + currData[n] + "</td></tr>");
			}
			ret.find("tr:last td").css("border-bottom", "0px");
			return ret.get(0).outerHTML;
		},

		getProtectFieldsLabel : function(data, protectFields) {
			var ret = {
				fSignName : "签名人",
				fSignTime : "签名时间"
			};
			for ( var n in protectFields) {
				var protectField = protectFields[n];
				var args = protectField.split(".");
				var target = args.length == 2 ? justep.xbl(args[0]) : data;
				if (target != null) {
					var f = args.length == 2 ? args[1] : args[0];
					var info = target.getRelationInfo(f);
					ret[protectField] = info.relation ? info.label
							: ("(字段" + f + "不存在)");
				} else {
					ret[protectField] = n + "(工作表" + args[0] + "未加载)";
				}
			}
			return ret;
		},

		getSignImages : function() {
			var actionParam = new justep.Request.ActionParam();
			actionParam.setString("personID", justep.Context
					.getCurrentPersonID());
			var options = {};
			options.process = "/base/personInfo/process/personInfo/personInfoProcess";
			options.activity = "mainActivity";
			options.action = "queryPersonSignImageInfoAction";
			options.parameters = actionParam;
			options.contentType = "application/json";
			options.dataType = "json";
			var ret = justep.Request.sendBizRequest2(options);
			if (justep.Request.isSuccess(ret)) {
				return ret.responseJSON ? ret.responseJSON.data.value : JSON
						.parse(ret.responseText).data.value;
			} else {
				throw justep.Error.create(ret.responseText);
			}
		},

		/**
		 * 签名保护
		 * 
		 * @param data{justep.XData}
		 * @param protectFields{String|Array}
		 * @param options{Object}
		 *            signField,signDateField,signDataField,useImage
		 */
		signProtect : function(data, protectFields, options) {
			if (protectFields && (typeof protectFields == "string"))
				protectFields = protectFields.split(",");
			var signData = new Object(), protectData = this.getProtectData(
					data, protectFields, options);
			// 保护的字段
			signData.protectedFields = protectFields;
			// 原始数据
			signData.orgiData = protectData.data;
			if (!!GDCA) {
				if (GDCA.ActiveXInit(true)) {
					signData.algoName = "GDCA";
					signData.algoParam = GDCA.getCertData(2);
					GDCA.getSignData(protectData.text, function(data) {
						signData.encryptData = data;
					}, function(err) {
						throw justep.Error.create(err);
					});
				} else {
					GDCA.getLastError().then(function(err) {
						throw justep.Error.create("初始化GDCA错误," + err);
					});
				}
			} else {
				signData.encryptData = hex_md5(protectData.text);
			}
			if (options.signDataField) {
				var oldSignData = data.getValue(options.signDataField);
				if (oldSignData) {
					try {
						oldSignData = JSON.parse(oldSignData);
						if (oldSignData.signImage) {
							signData.signImage = oldSignData.signImage
						}
					} catch (e) {
					}
				}
				var setSignData = function() {
					// 设置加密字段的值
					data.setValue(options.signDataField, JSON
							.stringify(signData));
					options.callback && options.callback();
				};
				if (options.useImage && !signData.signImage) {
					var imgs = this.getSignImages() || [];
					if (imgs.length == 1) {
						signData.signImage = {
							rowid : imgID,
							left : 0,
							top : 0
						};
						setSignData();
					} else {
						butone.Window
								.dialog({
									id : "wd_signImageSelector",
									title : "签名图片",
									status : "maximize",
									url : "/UI/system/components/sign/signImageSelector.w",
									data : imgs,
									onReceive : function(event) {
										signData.signImage = {
											rowid : event.data,
											left : 0,
											top : 0
										};
										setSignData();
									}
								});
					}
				} else {
					setSignData();
				}
			}
		},

		signVerify : function(data, options) {
			var ret = this.getSignVerifyInfo(data, options);
			this.showMessage("验证信息", ret.tag == 0 ? "验证通过"
					: ("验证不通过," + ret.msg), 0,
					ret.tag == 0 ? "right" : "error", ret.details);

		},

		showMessage : function(title, msg, type, img, details, callback) {
			if (!this.messageDialog) {
				this.messageDialog = new justep.System.showMessage();
			}
			this.messageDialog.open({
				title : title || "",
				msg : msg,
				type : type || 0,
				img : img || 'right',
				details : details,
				callback : callback
			});
		},

		verifySignData : function(algoName, algoParam, text, encryptData) {
			if ("GDCA" == algoName) {
				return this.verifyGDCASignData(algoParam, text, encryptData);
			} else {
				return hex_md5(text) == encryptData;
			}
		},

		verifyGDCASignData : function(signCert, inData, encData) {
			var actionParam = new justep.Request.ActionParam();
			actionParam.setString("signCert", signCert);
			actionParam.setString("inData", inData);
			actionParam.setString("encData", encData);
			var options = {};
			options.process = "/base/thirdLogin/process/thirdLoginProcess";
			options.activity = "mainActivity";
			options.action = "gdcaVerifySignDataAction";
			options.parameters = actionParam;
			options.dataType = "json";
			options.contentType = "json";
			var response = justep.Request.sendBizRequest2(options);
			if (justep.Request.isBizSuccess(response, options.dataType)) {
				var o = justep.Request.responseParseJSON(response);
				return o.data.value;
			} else {
				return false;
			}
		}
	};

	// ********************文本格式校验*************************
	/**
	 * butone.DataFormatRegex
	 * 
	 * @eg butone.DataFormatRegex[format].check(text)
	 * @eg butone.DataFormatRegex.checkValue(format,text)
	 */
	butone.DataFormatRegex = (function() {
		var ip = new RegExp(
				/^(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])\.(\d{1,2}|1\d\d|2[0-4]\d|25[0-5])$/);
		var card = new RegExp(/(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/);
		// 固定电话
		var tel = new RegExp(
				/^(([0\+]\d{2,3}-)?(0\d{2,3})-)(\d{7,8})(-(\d{3,}))?$/);
		// 移动电话
		var mobile = new RegExp(
				/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/);
		// 邮政编码
		var post = new RegExp(/^[1-9][0-9]{5}$/);
		// 邮箱
		var email = new RegExp(
				/[A-Za-z0-9_-]+[@](\S*)(net|com|cn|org|cc|tv|[0-9]{1,3})(\S*)/g);
		// URL
		var url = new RegExp(
				/(?:https|http|ftp|rtsp|rtsp|igmp|file|rtspt|rtspu):\/\/[^\/]+(\/.*)?\/([^\/]+\.[^\/\.]+)$/);

		//  日期 2015-08-30  不仅仅匹配了日期格式，而且对日期的逻辑做了严格要求，判断了大月31天，小月30天，2月28，闰年情况2月29天 
		var date = new RegExp(/((^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(10|12|0?[13578])([-\/\._])(3[01]|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(11|0?[469])([-\/\._])(30|[12][0-9]|0?[1-9])$)|(^((1[8-9]\d{2})|([2-9]\d{3}))([-\/\._])(0?2)([-\/\._])(2[0-8]|1[0-9]|0?[1-9])$)|(^([2468][048]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([3579][26]00)([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][0][48])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][2468][048])([-\/\._])(0?2)([-\/\._])(29)$)|(^([1][89][13579][26])([-\/\._])(0?2)([-\/\._])(29)$)|(^([2-9][0-9][13579][26])([-\/\._])(0?2)([-\/\._])(29)$))/ig);
		// 时间 12:12:12
		var time = new RegExp(/^(\d{1,2})(:)?(\d{1,2})\2(\d{1,2})$/);
		// 日期时间 2015-08-30 12:12:12 (实际数据为: 2015-08-30T12:12:12)
		var dateTime = new RegExp(
				/^([1][7-9][0-9][0-9]|[2][0][0-9][0-9])(\-)([0][1-9]|[1][0-2])(\-)([0-2][1-9]|[3][0-1])(T)([0-1][0-9]|[2][0-3])(:)([0-5][0-9])(:)([0-5][0-9])$/g);
		return {
			// IP地址
			"ip" : {
				tip : "请输入正确的IP地址",
				check : function(text) {
					return ip.test(text);
				}
			},
			// 身份证号
			"card" : {
				tip : "请输入正确的身份证号",
				check : function(text) {
					return card.test(text);
				}
			},
			// 固定电话
			"tel" : {
				tip : "请输入正确的固定电话",
				check : function(text) {
					return tel.test(text);
				}
			},
			// 移动电话
			"mobile" : {
				tip : "请输入正确的移动电话",
				check : function(text) {
					return mobile.test(text);
				}
			},
			// 邮政
			"post" : {
				tip : "请输入正确的邮政编码",
				check : function(text) {
					return post.test(text);
				}
			},
			// 邮箱
			"email" : {
				tip : "请输入正确的邮箱",
				check : function(text) {
					return email.test(text);
				}
			},
			// URL
			"url" : {
				tip : "请输入正确的URL地址",
				check : function(text) {
					return url.test(text);
				}
			},
			// 日期 2015-08-30
			"date" : {
				tip : "请输入正确的日期格式",
				check : function(text) {
					return date.test(text);
				}
			},
			// 时间 12:12:12
			"time" : {
				tip : "请输入正确的时间格式",
				check : function(text) {
					return time.test(text);
				}
			},
			// 日期时间 2015-08-30 12:12:12
			"dateTime" : {
				tip : "请输入正确的日期时间格式",
				check : function(text) {
					return dateTime.test(text);
				}
			},

			/**
			 * 检查文本值
			 * 
			 * @param text
			 *            文本内容
			 * @param format
			 *            格式名称
			 * @returns
			 */
			checkValue : function(format, text) {
				return this[format].check(text);
			}
		};

	})();

})(justep, butone);
