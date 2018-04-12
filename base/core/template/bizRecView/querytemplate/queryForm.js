// *******************************************************************************************
// * frameForm，对应每一个window，并构造内部windowFrame的级联关系
// * 1. 顶级窗体默认缓存案卷表
// * 2. 窗体内数据变化获得开发新的工作表时，调用顶级窗体_onDataChanged，对数据进行缓存。同时历遍所有窗体拷贝同名数据。
// * 3. 通过顶级窗体的案卷表进行数据保存，在其AfterSave事件中保存所有变化的数据。
// *
// *******************************************************************************************
define(
		[ "require", "jquery" ],
		function(require, jquery) {
			if (!justep) {
				throw new Error("justep未加载");
			}

			if (!butone) {
				throw new Error("butone未加载");
			}

			var frameFormInitedDeferred = new jquery.Deferred();
			/**
			 * 创建QueryForm
			 * 
			 * @param formDoc
			 *            .w文件对应的json
			 * @param contentWindow
			 *            .w文件的window对象
			 */
			var QueryForm = function(formDoc, contentWindow) {
				var me = this;
				contentWindow.onbeforeunload = function() {
					try {
						me.destroy();
					} catch (e) {
					}
				};
				butone.Context.frameForm = me;
				me._repairSlaveDatas();

				$
						.extend(
								me,
								new butone.EventManager(),
								{
									contentWindow : contentWindow,
									initDeferred : frameFormInitedDeferred
											.promise(),
									formDoc : formDoc,
									subForms : {},
									formUIPlugins : [],
									openParams : eval("("
											+ window
													.decodeURI(justep.Request.URLParams["openParams"])
											+ ")"),
									BizRec : me.xbl("BizRec")
								});

				// 表单UI插件
				var selector = "div[component='/UI/system_X/components/uiPlugin.xbl.xml#uiPlugin'][activityOperation='true']";
				$(selector).each(function() {
					var pluginId = $(this).attr("pluginId");
					me.formUIPlugins.push(contentWindow[pluginId]);
				});

				if (formDoc.title) {
					document.title = formDoc.title;
				}
				// TODO 兼容性保留 tangkejie
				if (formDoc.createUnitFieldManager)
					formDoc.unitFieldManager = butone.UnitFieldManager;

				var bizDatas = formDoc.bizDatas = formDoc.bizDatas || [];
				if (!justep.Array.contain(bizDatas, "BizRec")) {
					bizDatas.push("BizRec");
				}

				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					data.__BUTONE_form = me;
					data.setReadonly(true);
					data.attachEvent(justep.XData.EVENT_SAVEDATA_BEFORE,function(evt){evt.cancel = true;});
				}

				me.attachEvent(me.BizRec, justep.XData.EVENT_CHANGED,
						me._onDataChanged);
				if (formDoc.lookupFilters) {
					for ( var n in formDoc.lookupFilters) {
						var lookupFilter = formDoc.lookupFilters[n];
						var refData = me.xbl(lookupFilter.data);
						var target = me.xbl(lookupFilter.target);
						// 关联数据刷新或者索引改变后刷新lookup数据
						me.attachEvent(refData,justep.XData.EVENT_REFRESHDATA_AFTER, function(){
							target.refreshData();
						},target);
						me.attachEvent(refData,justep.XData.EVENT_INDEX_CHANGED, function(){
							target.refreshData();
						},target);
						
						// lookupData刷新时
						me.attachEvent(target,
								justep.XData.EVENT_REFRESHDATA_CREATEPARAM, $
										.proxy(me._setLookupDataFilter,
												lookupFilter));
						
						
						
					}
				}

				butone.defer(function() {
					if (!butone.Context.waitForReceiveData()) {
						this.init();
					}
				}, 10, me);
			};
			/**
			 * 获得xbl对象
			 */
			QueryForm.prototype.xbl = justep.xbl;

			/**
			 * 修复主从关系。store-type如果为simple但是关联到grid上，会创建2次Store，导致slaveDatas重复，从而使明细数据重复保存
			 */
			QueryForm.prototype._repairSlaveDatas = function() {
				if (!justep.XData)
					return;
				for ( var n in justep.XData._data_list) {
					var data = justep.XData._data_list[n];
					data.getInstance();
				}
				for ( var n in justep.XData._data_list) {
					var data = justep.XData._data_list[n];
					data.slaveInstances = data.slaveDatas = [];
				}
				for ( var n in justep.XData._data_list) {
					var data = justep.XData._data_list[n];
					if (data.masterData && data.masterData.id) {
						var master = justep.xbl(data.masterData.id);
						master.slaveDatas.push(n);
					}
				}
			};

			/**
			 * 表单初始化
			 * 
			 * @param formDoc:
			 *            window模型对应的js对象 <br>
			 * @param param :
			 *            frame的open参数{BizRec:justep.XData,form:QueryForm,config:{id:"",url:"",name:""}}
			 */
			QueryForm.prototype.init = function(param) {
				if (this.__inited)
					return;
				var param = param || {};
				this.config = param.config;
				if (this.config)
					this.config.form = this;
				var parent = param.form;
				this.options = param.options;

				var funcOpenParams = this.getRootForm().openParams;

				var openParams = $.extend({}, funcOpenParams, this.openParams,
						param ? param.openParams : undefined,
						param.form ? param.form.openParams : undefined);
				this.openParams = openParams;

				var isPrint = this.options && this.options.isPrint;
				if (parent) {
					butone.SequenceCodeManager.getCodeManager = parent.contentWindow.butone.SequenceCodeManager.getCodeManager;
					$.extend(this.contentWindow.justep.Context,
							parent.contentWindow.justep.Context);
					// 设置子窗体的requestFlag为主窗体的requestFlag，保证同一事物
					this.contentWindow.justep.Request.requestFlag = parent.contentWindow.justep.Request.requestFlag;
					this.parentForm = parent;
					if (isPrint) {
						this.formDoc.id = "print_" + this.formDoc.id;
					}
					parent.subForms[this.formDoc.id] = this;
					if (parent.currentForm
							&& parent.currentForm.getFormPath() == this
									.getFormPath()) {
						// 子页面重载后
						parent.currentForm = this;
					}
					this.setReadonly(isPrint || parent._readOnly);
					var cacheDatas = this.getCacheDatas();
					this._openDatas(parent.BizRec, cacheDatas);
				} else {
					// 编码字段管理
					for ( var concept in this.formDoc.sequenceCodeFields) {
						butone.SequenceCodeManager.registe(concept,
								this.formDoc.sequenceCodeFields[concept]);
					}

					this.__dataCaches = {};
					this.__dataCopyDefer = {};
					var bizRec = this.BizRec;
					bizRec.autoLoad = true;
					bizRec.getInstance().autoLoad = true;
					var bizRecId = param.bizRecId
							|| decodeURI(justep.Request.URLParams["bizRecId"]
									|| "") || justep.Utils.randomString();
					bizRec.setFilter("__BIZRECID_FILTER",
							bizRec.idColumn.relation + "='" + bizRecId + "'");
					bizRec.loadData();
					justep.Context.setProcessData1(bizRecId);
					this.__dataCaches[bizRec.id] = {
						id : bizRec.id,
						data : bizRec.getJson(),
						owner : bizRec
					};
					this.setReadonly(isPrint);
					this._openDatas(bizRec, this.__dataCaches);
				}
				this.__inited = true;
				frameFormInitedDeferred.resolve();
				if (this.formDoc.checkEvent
						&& this.formDoc.checkEvent("onFormLoad")) {
					var me = this;
					this.formDoc.callEvent("onFormLoad", [ {
						source : me.formDoc,
						data : me
					} ]);
				}
			};

			/**
			 * 获得主窗体
			 * 
			 * @returns {QueryForm}
			 */
			QueryForm.prototype.getRootForm = function() {
				var root = this;
				while (root.parentForm) {
					root = root.parentForm;
				}
				return root;
			};

			/**
			 * 设置表单只读
			 * 
			 * @param value
			 */
			QueryForm.prototype.setReadonly = function(value) {
				if (!value)
					value = !!justep.Context.isReadonlyMode();
				this._readOnly = value;
				var bizDatas = this.formDoc.bizDatas;
				for ( var n in bizDatas) {
					var readonly = justep.Array.contain(this.formDoc.readOnlys,
							bizDatas[n]);
					justep.XData._data_list[bizDatas[n]].setReadonly(readonly
							|| value);
				}
				var subForms = this.subForms;
				for ( var n in subForms) {
					subForms[n].setReadonly(value);
				}
				if (this.parentForm) {
					$(
							"[component='/UI/system/components/trigger.xbl.xml#trigger']")
							.each(
									function() {
										var $this = $(this);
										if (!$this.hasClass("forView"))
											justep.xbl($this.attr("id"))
													.setDisabled(value);
									});
				}
			};

			/**
			 * 设置lookup数据集的过滤
			 * 
			 * @param event
			 */
			QueryForm.prototype._setLookupDataFilter = function(event) {
				var param = event.param;
				var variables = new justep.Request.MapParam();
				var pName = this.data + "_00000_" + this.relation;
				var refData = justep.xbl(this.data);
				if (refData.loaded || refData.active)
					variables.put(pName, justep.xbl(this.data).getValue(
							this.relation));
				else
					variables.put(pName, null);
				param.setMap("variables", variables);
			};

			/**
			 * 打开表单所有数据
			 * 
			 * @param parentBizRec
			 *            父表单的案卷表
			 * @param cacheDatas
			 *            父表单的缓存数据
			 */
			QueryForm.prototype._openDatas = function(parentBizRec, cacheDatas) {
				var bizRec = this.xbl(parentBizRec.id);
				bizRec.autoLoad = true;
				bizRec.getInstance().autoLoad = true;
				if (bizRec != parentBizRec) {
					bizRec.setFilter("__BIZRECID_FILTER",
							bizRec.idColumn.relation + " = '"
									+ parentBizRec.getID() + "'");
				}
				this._syncCacheData(cacheDatas[bizRec.id], bizRec, false);

				// 打开其他工作表
				var bizDatas = this.formDoc.bizDatas;
				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					if (data == bizRec)
						continue;
					this._cascadeLoadData(data, cacheDatas, true, false);
				}
			};

			/**
			 * 内部调用，初始化时级联加载数据
			 * 
			 * @param data
			 * @param cacheDatas
			 */
			QueryForm.prototype._cascadeLoadData = function(data, cacheDatas,
					cascade, force) {
				data.autoLoad = true;
				data.getInstance().autoLoad = true;

				var cacheData = cacheDatas[data.id];
				if (cacheData) {
					// 同步父表单中的缓存数据
					this._syncCacheData(cacheData, data, force);
				} else {
					var master;
					if (data.masterData && data.masterData.id) {
						master = this.getData(data.masterData.id);
						if (!master.loaded && !master.active)
							this._cascadeLoadData(master, cacheDatas, false,
									force);
					}

					// 如果父表单中未缓存，打开工作表后注册到父表单的缓存中
					if (!data.loaded) {
						if (master) {
							data.loadDataByMaster();
						} else {
							data.loadData();
						}
					}

					// 案卷表的明细表自动new
					var autoNew = data.masterData
							&& data.masterData.id == this.BizRec.id;
					this.registerXblData(data);
				}
				if (cascade)
					for ( var n in data.slaveDatas) {
						var child = this.xbl(data.slaveDatas[n]);
						this._cascadeLoadData(child, cacheDatas, true, force);
					}
			};

			/**
			 * 同步父表单中的data数据，内部调用
			 * 
			 * @param cacheData
			 *            {data : data.getJson(),owner:data}
			 * @param data
			 */
			QueryForm.prototype._syncCacheData = function(cacheData, data,
					force) {
				if (cacheData.owner != data /* || force */) {
					if (!data.loaded) {
						// 不应该load失败，
						if (data.masterData && data.masterData.id) {
							data.loadDataByMaster();
						} else {
							data.loadData();
						}
					}
					var dataInstance = data.getInstance(), slaveInstances = dataInstance.slaveInstances, store = data
							.getStore(), win = data.__BUTONE_form.contentWindow;
					justep.XData.disableControls();
					// 关闭rule计算
					store.closeXForms();
					dataInstance.slaveInstances = [];
					try {
						var rowId = data.getID();
						data.loadJson(cacheData.data);
						if (cacheData.loadParentIDs)
							store.loadParentIDs = cacheData.loadParentIDs
									.concat();
						else
							store.loadParentIDs = undefined;
						if (cacheData.data.userdata.deletes) {
							var rows = cacheData.data.userdata.deletes
									.split(",");
							var old = data.deleteConfirm;
							data.deleteConfirm = false;
							data.deleteData(rows);
							data.deleteConfirm = old;
							store.setUserData(null, store.deletesUserDataName,
									cacheData.data.userdata.deletes);
							data.getStore().setUserData(null,
									store.deleteMasterKeysUserDataName,
									cacheData.data.userdata.deletemasterkeys);
						}

						if (rowId != data.getID()) {
							if (rowId) {
								var idx = data.getIndex(rowId);
								if (idx >= 0)
									data.setIndex(idx);
							}
						}

						if (data.checkEvent(justep.XData.EVENT_CHANGED)) {
							data.callEvent(justep.XData.EVENT_CHANGED, [ {
								cloneData : true,
								changedSource : data,
								source : data,
								instance : data.getInstance(),
								limit : data.limit,
								offset : 0,
								selfChanged : true,
								success : true,
								type : "refresh"
							} ]);
						}
					} finally {
						dataInstance.slaveInstances = slaveInstances;
						store.openXForms();
						justep.XData.enableControls();
						data.xformsRefresh();
					}
				}
			};

			/**
			 * 获得当前窗体内的data对象
			 * 
			 * @param id
			 * @returns
			 */
			QueryForm.prototype.getData = function(id, includeChildren) {
				var data = this.xbl(id);
				if (!data && includeChildren) {
					for ( var n in this.subForms) {
						var subForm = this.subForms[n];
						data = subForm.getData(id, includeChildren);
						if (data)
							return data;
					}
				}
				return data;
			};

			/**
			 * 功能窗体处理数据改变事件。1.设置保存按钮状态 2.编码字段处理 3.同步数据
			 * 
			 * @param event
			 */
			QueryForm.prototype._handleDataChangedEvent = function(event) {
				var frameForm = event.source.__BUTONE_form;
				var changedSource = event.changedSource;
				if (frameForm.__inited) {
					if (event.type == "refresh") {
						// 刷新队列,simple->simple->grid，回导致grid不刷新
						if (!frameForm.refreshedStack)
							frameForm.refreshedStack = [];
						// 添加刷新堆栈，并启动延迟刷新检查
						frameForm.refreshedStack.push(changedSource.id);
						if (!frameForm.refreshStackCheck) {
							frameForm.refreshStackCheck = butone
									.defer(function() {
										for ( var n in frameForm.formDoc.bizDatas) {
											var dataId = frameForm.formDoc.bizDatas[n];
											var trgDs = frameForm.xbl(dataId);
											if (!trgDs.masterData
													|| !trgDs.masterData.id)
												continue;
											// 父刷已刷新，单子未刷新
											var b1 = justep.Array.indexOf(
													frameForm.refreshedStack,
													trgDs.masterData.id) >= 0;
											var b2 = justep.Array.indexOf(
													frameForm.refreshedStack,
													dataId) == -1;
											if (b1 && b2)
												trgDs.refreshData();
										}
										frameForm.refreshStackCheck.remove();
										frameForm.refreshStackCheck = undefined;
										frameForm.refreshedStack = [];
									});
						}
					}
					// 同步数据new、delete、refresh、valueChanged、clear(提交成功后触发version？)
					// 初始化时，不分发数据，自动读取缓存
					this.copyDataFromOtherForm(changedSource);
				}
			};

			/**
			 * 数据改变事件处理
			 * 
			 * @param event
			 */
			QueryForm.prototype._onDataChanged = function(event) {
				// 克隆数据会触发一个refresEvent
				if (event.cloneData)
					return;
				var mainForm = this.getRootForm();
				mainForm._handleDataChangedEvent(event);
			};

			/**
			 * 获得文档级联路径
			 * 
			 * @returns
			 */
			QueryForm.prototype.getFormPath = function() {
				var id = this.formDoc.id;
				if (this.parentForm)
					id = this.parentForm.getFormPath() + "." + id;
				return id;
			};

			/**
			 * 执行数据复制
			 * 
			 * @param data
			 */
			QueryForm.prototype._doCopyDataFromOtherForm = function(data) {
				var handler = this.__dataCopyDefer[data.id];
				try {
					if (!handler) {
						// alert("handler is null？？？？");
						return;
					}
					handler.remove();
					var frameForm = data.__BUTONE_form;
					// 拷贝数据，并缓存
					var cacheData = frameForm.registerXblData(data);
					cacheData.form = frameForm;
					this._doLoadCacheData(cacheData);
				} finally {
					delete this.__dataCopyDefer[data.id];
				}
			};
			/**
			 * 延迟0秒，从其他窗体拷贝数据
			 */
			QueryForm.prototype.copyDataFromOtherForm = function(data) {
				// 增加延时器，代码一次修改多个字段只拷贝一次
				if (this.__dataCopyDefer[data.id]) {
					return;
				}
				this.__dataCopyDefer[data.id] = butone.defer(
						this._doCopyDataFromOtherForm, 0, this, [ data ]);
			};

			/**
			 * 执行从主窗体缓存加载数据
			 */
			QueryForm.prototype._doLoadCacheData = function(cacheData) {
				var frameForm = cacheData.form;
				if (frameForm != this) {
					var bizData = this.xbl(cacheData.id);
					if (bizData) {
						this._syncCacheData(cacheData, bizData, true);
						var cacheDatas = this.getCacheDatas();
						for ( var n in bizData.slaveDatas) {
							var child = this.xbl(bizData.slaveDatas[n]);
							this
									._cascadeLoadData(child, cacheDatas, true,
											true);
						}
					}
				}
				for ( var n in this.subForms) {
					var subForm = this.subForms[n];
					cacheData.form = frameForm;
					subForm._doLoadCacheData(cacheData);
				}
			};

			/**
			 * 获得顶级窗体缓存所有子窗体的数据(发生数据改变的)
			 * 
			 * @returns {Object}
			 */
			QueryForm.prototype.getCacheDatas = function() {
				return this.getRootForm().__dataCaches;
			};

			/**
			 * 当数据刷新、修改、删除后，注册新的业务数据到主窗体
			 * 
			 * @param data
			 */
			QueryForm.prototype.registerXblData = function(xData) {
				var frameForm = this.getRootForm();
				return frameForm._doRegisterXblData(xData);
			};

			/**
			 * 执行数据注册
			 * 
			 * @param xData
			 */
			QueryForm.prototype._doRegisterXblData = function(data) {
				if (data.loaded || data.active) {
					var json = data.getJson(), rows = json.rows;
					if (json.userdata.deletes) {
						var deletes = [], deletemasterkeys = [];
						for ( var i = rows.length - 1; i >= 0; i--) {
							var row = rows[i];
							if (row.userdata.recordState == "delete") {
								if (justep.Array.indexOf(deletes,
										row.userdata.id.value) == -1) {
									deletes.push(row.userdata.id.value);
									if (data.masterData
											&& data.masterData.relation)
										deletemasterkeys
												.push(row[data.masterData.relation].value);
								} else {
									justep.Array.remove(rows, row);
								}
							}
						}
						if (deletes.length) {
							json.userdata.deletes = deletes.join(",");
							json.userdata.deletemasterkeys = deletemasterkeys
									.join(",");
						}
					}

					var cacheData = {
						id : data.id,
						data : json,
						owner : data,
						loadParentIDs : data.getStore().loadParentIDs
					};
					this.__dataCaches[data.id] = cacheData;
					return cacheData;
				}
			};

			/**
			 * 注销子表单(windowFrame)表单数据集合，当前表单unload及刷新案卷表时调用
			 */
			QueryForm.prototype.unRegisterXblData = function(data) {
				function findBizData(frameForm) {
					if (frameForm.contentWindow.justep.XData._data_list
							.hasOwnProperty(data.id))
						return frameForm.contentWindow.justep.XData._data_list[data.id];
					for ( var n in frameForm.subForm) {
						if (subForm == data.__BUTONE_form)
							continue;
						var ret = findBizData(subForm);
						if (ret)
							return ret;
					}
					return null;
				}
				var cacheData = this.__dataCaches[data.id];
				if (cacheData && cacheData.owner == data) {
					var other = findBizData(this);
					if (other)
						cacheData.data = other;
					else
						delete this.__dataCaches[data.id];
				}
			};

			/**
			 * 刷新数据
			 * 
			 * @param event
			 */
			QueryForm.prototype.refreshData = function() {
				var mainForm = this.getRootForm();
				if (!mainForm.currentForm)
					return;
				if (arguments.length == 0) {
					// 刷新当前表单
					mainForm.currentForm._refreshAllData();
				} else {
					for ( var n in arguments) {
						var dataId = arguments[n];
						var cacheData = mainForm.__dataCaches[dataId];
						if (cacheData) {
							var data = cacheData.owner;
							data.refreshData();
						}
					}
				}
			};

			/**
			 * 刷新所有表
			 */
			QueryForm.prototype._refreshAllData = function() {
				var bizDatas = this.formDoc.bizDatas;
				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					if (data.masterData && data.masterData.id == this.BizRec.id) {
						// 刷新根表
						data.refreshData();
					}
				}
			};

			/**
			 * 刷新同步所有的控件，当控件还没有把数据写回data时可以调用此方法把数据同步回data
			 */
			QueryForm.prototype.refreshControls = function() {
				for ( var n in this.subForms) {
					this.subForms[n].refreshControls();
				}
				justep.XData.refreshControls();
			};

			/**
			 * 窗口激活
			 */
			QueryForm.prototype.active = function() {
				if (this.formDoc.checkEvent
						&& this.formDoc.checkEvent("onFormActive"))
					this.formDoc.callEvent("onFormActive", [ {
						source : this.formDoc
					} ]);
			};
			/**
			 * 销毁，主窗体unload时调用
			 */
			QueryForm.prototype.destroy = function() {
				if (this.formDoc.checkEvent
						&& this.formDoc.checkEvent("onFormDestroy"))
					this.formDoc.callEvent("onFormDestroy", [ {
						source : this.formDoc
					} ]);

				this.detachEvent();
				var mainForm = this.getRootForm();
				var bizDatas = this.formDoc.bizDatas;
				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					mainForm.unRegisterXblData(data);
				}
				if (this.parentForm) {
					delete this.parentForm.subForms[this.formDoc.id];
				}
			};
			return QueryForm;

		});
