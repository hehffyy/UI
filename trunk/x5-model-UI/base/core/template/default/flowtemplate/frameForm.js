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
			var justep = window.justep;
			if (!justep) {
				throw new Error("justep未加载");
			}
			var butone = window.butone;
			if (!butone) {
				throw new Error("butone未加载");
			}
			var frameFormInitedDeferred = jquery.Deferred();
			/**
			 * 创建FrameForm
			 * 
			 * @param formDoc
			 *            .w文件对应的json
			 * @param contentWindow
			 *            .w文件的window对象
			 */
			var FrameForm = function(formDoc, contentWindow) {
				var me = this;
				contentWindow.onbeforeunload = function() {
					try {
						me.destroy();
					} catch (e) {
					}
				};
				butone.Context.frameForm = me;
				me._repairSlaveDatas();

				$.extend(me, new butone.EventManager(), {
					contentWindow : contentWindow,
					initDeferred : frameFormInitedDeferred.promise(),
					formDoc : formDoc,
					subForms : {},
					formUIPlugins : [],
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

				var bizDatas = formDoc.bizDatas;
				if (!justep.Array.contain(bizDatas, "BizRec")) {
					bizDatas.push("BizRec");
				}
				var handlerSaveCreateParam = formDoc.handlerSaveCreateParam;
				for ( var n in handlerSaveCreateParam) {
					var data = justep.XData._data_list[handlerSaveCreateParam[n]];
					me.attachEvent(data,
							justep.XData.EVENT_SAVEDATA_CREATEPARAM,
							me._setTabeLogicPluginSaveParam);
				}

				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					data.__BUTONE_form = me;
					me.attachEvent(data, justep.XData.EVENT_SAVEDATA_BEFORE,
							me._onBeforeSaveBizData);
					me.attachEvent(data, justep.XData.EVENT_SAVEDATA_AFTER,
							me._doLogSavedBizData);
					me.attachEvent(data, justep.XData.EVENT_SAVE_COMMIT_AFTER,
							me._onAfterCommitBizData);
				}

				me.attachEvent(me.BizRec, justep.XData.EVENT_CHANGED,
						me._onDataChanged);
				if (formDoc.lookupFilters) {
					for ( var n in formDoc.lookupFilters) {
						var lookupFilter = this.formDoc.lookupFilters[n];
						var data = me.xbl(lookupFilter.data);
						// lookupData刷新时
						var target = me.xbl(lookupFilter.target);
						me.attachEvent(target,
								justep.XData.EVENT_REFRESHDATA_CREATEPARAM, $
										.proxy(me._setLookupDataFilter,
												lookupFilter));
					}
				}

			};
			/**
			 * 获得xbl对象
			 */
			FrameForm.prototype.xbl = justep.xbl;

			/**
			 * 修复主从关系。store-type如果为simple但是关联到grid上，会创建2次Store，导致slaveDatas重复，从而使明细数据重复保存
			 */
			FrameForm.prototype._repairSlaveDatas = function() {
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
			 *            frame的open参数{BizRec:justep.XData,form:FrameForm,config:{id:"",url:"",name:""}}
			 */
			FrameForm.prototype.init = function(param) {
				if (this.__inited)
					return;
				justep.XData.disableControls();
				var param = param || {};
				this.config = param.config;
				if (this.config)
					this.config.form = this;
				var parent = param.form;
				this.options = param.options;
				var isPrint = this.options && this.options.isPrint;

				if (parent) {
					butone.SequenceCodeManager.getCodeManager = parent.contentWindow.butone.SequenceCodeManager.getCodeManager;
					$.extend(this.contentWindow.justep.Context,
							parent.contentWindow.justep.Context);
					// 设置子窗体的requestFlag为主窗体的requestFlag，保证同一事物
					this.contentWindow.justep.Request.requestFlag = parent.contentWindow.justep.Request.requestFlag;
					this.parentForm = parent;
					if (param.prevFixed) {
						// batchAdvance传入，同名表单不会进行数据复制
						this.formDoc.id = param.prevFixed + this.formDoc.id;
					} else if (isPrint) {
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
					// 数据同步延迟器
					this._dataChangedSyncDtd = {};
					this.__dataCaches = {};
					this.__dataCopyDefer = {};
					var bizRec = this.BizRec;
					bizRec.autoLoad = true;
					bizRec.getInstance().autoLoad = true;
					// 环境中无任务，可能是收件未启动
					if (!justep.Context.getTask()) {
						if (bizRec.getCount() == 0) {
							// 增加过滤条件，用于刷新数据
							var bizRecId = justep.Utils.randomString();
							bizRec.setFilter("__BIZRECID_FILTER",
									bizRec.idColumn.relation + "='" + bizRecId
											+ "'");
							bizRec.relationDefaultValues['fBizRecId'] = "'"
									+ bizRecId + "'";
							bizRec.newData();
							bizRec.setID(bizRec.getID(), bizRecId);
						}
						justep.Context.setProcessData1(bizRec.getID());
					} else {
						this.attachEvent(bizRec,
								justep.XData.EVENT_SAVEDATA_AFTER,
								this._doSaveCacheDatas);
						if (!bizRec.loaded) {
							bizRec.loadData();
						}
					}
					this.setReadonly(isPrint);
					this.__dataCaches[bizRec.id] = {
						id : bizRec.id,
						data : bizRec.getJson(),
						owner : bizRec
					};
					this._openDatas(bizRec, this.__dataCaches);

				}
				this.__inited = true;
				justep.XData.enableControls();

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
			 * 打开浮动表单
			 */
			FrameForm.prototype.openFloatView = function() {
				if (this.formDoc.config.floatView)
					this.formDoc.funcManager
							.openFloatView(this.formDoc.config.floatView);
			};

			/**
			 * 获得主窗体
			 * 
			 * @returns {FrameForm}
			 */
			FrameForm.prototype.getRootForm = function() {
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
			FrameForm.prototype.setReadonly = function(value) {
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
				// TODO 这个条件不合适，可能打开独立act_xxx表单
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
			FrameForm.prototype._setLookupDataFilter = function(event) {
				var param = event.param;
				var variables = new justep.Request.MapParam();
				var pName = this.data + "_00000_" + this.relation;
				var refData = justep.xbl(this.data);
				if (refData.loaded || refData.active)
					variables.put(pName, refData.getValue(this.relation));
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
			FrameForm.prototype._openDatas = function(parentBizRec, cacheDatas) {
				var bizRec = this.xbl(parentBizRec.id);
				bizRec.autoLoad = true;
				bizRec.getInstance().autoLoad = true;
				if (bizRec != parentBizRec) {
					bizRec.setFilter("__BIZRECID_FILTER",
							bizRec.idColumn.relation + " = '"
									+ parentBizRec.getCurrentID() + "'");
				}
				this._syncCacheData(cacheDatas[bizRec.id], bizRec, false);

				// 打开其他工作表
				var bizDatas = this.formDoc.bizDatas;
				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					if (data == bizRec)
						continue;
					this._cascadeLoadData(data, cacheDatas, true, false);
					if (this.formDoc.lookupFilters) {
						for ( var m in this.formDoc.lookupFilters) {
							var lookupFilter = this.formDoc.lookupFilters[m];
							if (lookupFilter.data == data.id) {
								var target = this.xbl(lookupFilter.target);
								target.refreshData();
							}
						}
					}
				}
			};

			/**
			 * 内部调用，初始化时级联加载数据
			 * 
			 * @param data
			 * @param cacheDatas
			 */
			FrameForm.prototype._cascadeLoadData = function(data, cacheDatas,
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
					// 简单数据并且autoNew(非从表引用数据集不能autoNew)
					if (!justep.Array.contain(this.formDoc.readOnlys, data.id)) {
						if (autoNew && data.getCount() == 0 && data.limit == 1
								&& !!data.newAction && !!data.saveAction)
							data.newData();
					}
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
			FrameForm.prototype._syncCacheData = function(cacheData, data,
					force) {
				if (cacheData.owner != data /* || force */) {
					var store = data.getStore();
					// justep.XData.disableControls();
					// 关闭rule计算
					store.closeXForms();
					try {
						if (!data.loaded) {
							// 不应该load失败，
							if (data.masterData && data.masterData.id) {
								data.loadDataByMaster();
							} else {
								data.loadData();
							}
						}
						// data.__cloneData = true;
						var dataInstance = data.getInstance(), slaveInstances = dataInstance.slaveInstances;
						dataInstance.slaveInstances = [];

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
						// data.__cloneData = false;
						dataInstance.slaveInstances = slaveInstances;
						store.openXForms();
						// justep.XData.enableControls();
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
			FrameForm.prototype.getData = function(id, includeChildren) {
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
			FrameForm.prototype._handleDataChangedEvent = function(event) {
				var frameForm = event.source.__BUTONE_form, changedSource = event.changedSource;
				if (event.type == "valueChanged" && event.rowIndex == -1) {
					// 页面打开后，即便数据未加载依然会进行字段计算表达式计算
					return;
				}
				if (event.type != "refresh" && "version" != event.column) {
					var bizRec = this.BizRec;
					var state = bizRec.getState(bizRec.getID());
					if (changedSource == bizRec) {
						// 如果是案卷表，删除虚拟编辑标识
						delete bizRec.__virtualEdit;
					} else if (!state || state == justep.XData.STATE.NONE) {
						// 如果案卷表未变化，那么设置虚拟编辑，案卷BeforeSave会进行处理。
						bizRec.__virtualEdit = true;
						bizRec.setState(bizRec.getCurrentID(),
								justep.XData.STATE.EDIT);
					}
					bizRec.setOperationEnable("save", true);
				}

				if (!this.currentForm && changedSource.__BUTONE_form != this/* this==rootForm */) {
					// 预览回调函数可能会使用currentForm
					this.currentForm = changedSource.__BUTONE_form;
				}
				var codeFieldManager = butone.SequenceCodeManager
						.getCodeManager(changedSource.id);
				if (codeFieldManager) {
					// 存在编码字段管理
					if (event.type == "delete") {
						codeFieldManager.remove(changedSource.getCurrentID());
					} else if (event.type == "valueChanged"
							&& "version" != event.column || event.type == "new") {
						// 数据新增和字段改变(不包括版本变化)
						codeFieldManager.previewSequenceCodeValue(event.column,
								frameForm.contentWindow);
					} else if (event.type == "refresh") {
						frameForm.__inited
								&& event.success
								&& codeFieldManager
										.refreshData(frameForm.contentWindow);
					}
				}

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
			FrameForm.prototype._onDataChanged = function(event) {
				// 克隆数据会触发一个refresEvent
				if (event.cloneData) {
					if (event.changedSource == this.BizRec
							&& this.BizRec.isChanged("self")) {
						delete this.BizRec.__virtualEdit;
					}
					return;
				}
				var mainForm = this.getRootForm();
				mainForm._handleDataChangedEvent(event);
			};

			/**
			 * 获得文档级联路径
			 * 
			 * @returns
			 */
			FrameForm.prototype.getFormPath = function() {
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
			FrameForm.prototype._doCopyDataFromOtherForm = function(data) {
				var handler = this.__dataCopyDefer[data.id];
				try {
					if (handler)
						handler.remove();
					else {
						alert("handler is null？？？？");
						return;
					}
					delete this.__dataCopyDefer[data.id];
					var frameForm = data.__BUTONE_form;
					// 拷贝数据，并缓存
					var cacheData = frameForm.registerXblData(data);
					cacheData.form = frameForm;
					this._doLoadCacheData(cacheData);
					this._dataChangedSyncDtd[data.id].resolve();
				} catch (e) {
					this._dataChangedSyncDtd[data.id] && this._dataChangedSyncDtd[data.id].reject();
				}
			};
			/**
			 * 延迟0秒，从其他窗体拷贝数据
			 */
			FrameForm.prototype.copyDataFromOtherForm = function(data) {
				// 增加延时器，代码一次修改多个字段只拷贝一次
				if (this.__dataCopyDefer[data.id]) {
					return;
				}
				this._dataChangedSyncDtd[data.id] = jquery.Deferred();
				this.__dataCopyDefer[data.id] = butone.defer(
						this._doCopyDataFromOtherForm, 0, this, [ data ]);
			};

			/**
			 * 执行从主窗体缓存加载数据
			 */
			FrameForm.prototype._doLoadCacheData = function(cacheData) {
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
			FrameForm.prototype.getCacheDatas = function() {
				return this.getRootForm().__dataCaches;
			};

			/**
			 * 当数据刷新、修改、删除后，注册新的业务数据到主窗体
			 * 
			 * @param data
			 */
			FrameForm.prototype.registerXblData = function(xData) {
				var frameForm = this.getRootForm();
				return frameForm._doRegisterXblData(xData);
			};

			/**
			 * 执行数据注册
			 * 
			 * @param xData
			 */
			FrameForm.prototype._doRegisterXblData = function(data) {
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
			FrameForm.prototype.unRegisterXblData = function(data) {
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
			FrameForm.prototype.refreshData = function() {
				var mainForm = this.getRootForm();
				if (!mainForm.currentForm)
					return;
				var targets = [].slice.call(arguments);
				this.saveDatas().done(function() {
					if (targets.length == 0) {
						// 刷新当前表单
						mainForm.currentForm._refreshAllData();
					} else {
						for ( var n in targets) {
							var dataId = targets[n];
							var cacheData = mainForm.__dataCaches[dataId];
							if (cacheData) {
								var data = cacheData.owner;
								data.refreshData();
							}
						}
					}
					mainForm.refreshBizRecSaveState();
				});
			};

			/**
			 * 刷新所有表
			 */
			FrameForm.prototype._refreshAllData = function() {
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
			FrameForm.prototype.refreshControls = function() {
				justep.XData.refreshControls();
				for ( var n in this.subForms) {
					this.subForms[n].refreshControls();
				}
			};
			
			FrameForm.prototype.promiseRefreshControls = function(){
				var mainForm = this.getRootForm(); 
				mainForm.refreshControls();
				var syncs = [];
				for ( var n in mainForm._dataChangedSyncDtd) {
					syncs.push(mainForm._dataChangedSyncDtd[n].promise());
				}
				return jquery.when.apply(jquery, syncs);
			};

			/**
			 * 保存所有数据，通过保存案卷表级联实现。任意数据修改后都会将主窗体案卷状态修改为需要保存。
			 */
			FrameForm.prototype.saveDatas = function(options) {
				var mainForm = this.getRootForm();
				return mainForm.promiseRefreshControls().then(
						function() {
							mainForm._dataChangedSyncDtd = {};
							var bizRec = mainForm.BizRec;
							if (bizRec.isChanged("all")) {
								if (bizRec.__virtualEdit) {
									try {
										mainForm._doSaveCacheDatas();
										delete bizRec.__virtualEdit;
										bizRec
												.setOperationEnable("save",
														false);
										bizRec.setState(bizRec.getID(),
												justep.XData.STATE.NONE);
										options && options.onSuccess
												&& options.onSuccess();
									} catch (e) {
										options && options.onError
												&& options.onError(e);
										throw justep.Error.create(e);
									}
								} else {
									bizRec.saveData(options);
									mainForm._doSaveCacheDatas();
								}
							}
						},function(){
							mainForm._dataChangedSyncDtd = {};
						});
			};
			/**
			 * 拷贝justep.Context到子窗体
			 */
			FrameForm.prototype.copyContextToSubForm = function() {
				for ( var n in this.subForms) {
					var subForm = this.subForms[n];
					$.extend(subForm.contentWindow.justep.Context,
							this.contentWindow.justep.Context);
					subForm.copyContextToSubForm();
				}
			};

			/**
			 * 业务数据保存前
			 * 
			 * @param event
			 */
			FrameForm.prototype._onBeforeSaveBizData = function(event) {
				var data = event.source;
				var mainForm = this.getRootForm();
				if (data.id == "BizRec") {
					if (data.__BUTONE_form == mainForm) {
						// 主窗体的案卷表保存，如果是虚拟编辑(表单数据改变强制设置的BizRec为修改状态)，手动保存缓存中变化的数据，并修改案卷状态为NON
						if (data.__virtualEdit) {
							butone.defer(function() {
								// 保存缓存数据
								this._doSaveCacheDatas();
								delete data.__virtualEdit;
								data.setOperationEnable("save", false);
								data.setState(data.getID(),
										justep.XData.STATE.NONE);
							}, 0, this);
							event.cancel = true;
						} else {
							butone.defer(function() {
								// 保存缓存数据
								this._doSaveCacheDatas();
							}, 0, this);
						}
					} else {
						// 不允许子表保存案卷表
						throw justep.Error.create("不允许调用表单中的案卷表保存");
						// event.cancel = true;
					}
				} else {
					// 如果是编码字段并且，存在编码记录，添加EVENT_SAVEDATA_CREATEPARAM(传递创建save参数)，EVENT_SAVE_COMMIT_AFTER刷新编码字段
					var codeFieldManager = mainForm.contentWindow.butone.SequenceCodeManager
							.getCodeManager(data.id);
					if (codeFieldManager) {
						if (codeFieldManager.getCount() > 0) {
							// 保存参数追加编码字段的节点值
							mainForm
									.attachEvent(
											data,
											justep.XData.EVENT_SAVEDATA_CREATEPARAM,
											mainForm._setSequenceCodeFieldSaveParameter,
											true);
						}
						if (codeFieldManager.isNeedRefreshAfterSaveCommit(data)) {
							// 数据保存提交后,刷新编码值
							mainForm.attachEvent(data,
									justep.XData.EVENT_SAVE_COMMIT_AFTER,
									mainForm._refreshSequenceCodeFieldValue,
									true);
						}
					}
				}
			};

			/**
			 * 流程启动前保存其缓存的工作表数据
			 */
			FrameForm.prototype._onBeforeStartProcess = function(event) {
				this._doSaveCacheDatas();
			};

			/**
			 * 流程启动后将保存缓存数据处理挂到案卷表保存后
			 */
			FrameForm.prototype._onStartProcessCommit = function(event) {
				this.attachEvent(this.BizRec,
						justep.XData.EVENT_SAVEDATA_AFTER,
						this._doSaveCacheDatas);
			};
			
			FrameForm.prototype._doLogSavedBizData = function(event){
				var rootForm = this.getRootForm();
				rootForm.__saveDatas = [event.source.id].concat(rootForm.__saveDatas || []);  
			};
			
			/**
			 * 保存所有缓存的工作表。
			 */
			FrameForm.prototype._doSaveCacheDatas = function() {
				this.__saveDatas = [];
				var cacheDatas = this.__dataCaches;
				for ( var n in cacheDatas) {
					var data = cacheDatas[n].owner;
					if (data.id == this.BizRec.id)
						continue;
					if (data.isChanged("self")) {
						var casSave = [ data ], p = data;
						while (p.masterData && p.masterData.id
								&& p.masterData.id != "BizRec") {
							p = p.__BUTONE_form.xbl(p.masterData.id);
							if (p.isChanged("self")) {
								casSave = [p].concat(casSave);
							}
						}
						for ( var n in casSave) {
							if (!justep.Array.contain(this.__saveDatas, casSave[n].id))
								casSave[n].saveData();
						}
					}
				}
				this.__saveDatas = [];
			};

			/**
			 * 刷新编码字段值
			 * 
			 * @param event
			 */
			FrameForm.prototype._refreshSequenceCodeFieldValue = function(event) {
				var data = event.source;
				// 如果事务中，commit后数据并未提交到数据库需要延迟刷新
				if (justep.Request.batchExecutCount > 0)
					butone.defer(data.refreshData, 0, data);
				else
					data.refreshData();
			};

			/**
			 * 设置编码字段保存参数 sequenceNodeValues Map<FieldName,Map<rowid,Map<ParamName,ParamValue>>>
			 * 
			 * @param event
			 */
			FrameForm.prototype._setSequenceCodeFieldSaveParameter = function(
					event) {
				var variants = event.param.getParam("variants")
						|| new justep.Request.MapParam(), codeManager = butone.SequenceCodeManager
						.getCodeManager(event.source.id);
				variants.put("sequenceNodeValues", codeManager
						.getSequenceNodeValues().toJson());// 注：不转Json的话，variants有问题
				event.param.setMap("variants", variants);
			};

			/**
			 * 设置工作逻辑插件保存参数
			 * 
			 * @param event
			 */
			FrameForm.prototype._setTabeLogicPluginSaveParam = function(event) {
				var variants = event.param.getParam("variants")
						|| new justep.Request.MapParam();
				variants.put("tableName", event.source.id);
				variants.put("bizRecId", justep.Context.getProcessData1());
				event.param.setParam("variants", variants);
			};

			/**
			 * 业务表保存后，同步业务数据到其他表单,并延迟刷新主窗体案卷表保存状态。
			 * 
			 * @param event
			 */
			FrameForm.prototype._onAfterCommitBizData = function(event) {
				var mainForm = this.getRootForm();
				mainForm.copyDataFromOtherForm(event.source);
				// 多个数据集连续提交后，只执行一次刷新状态
				if (mainForm.__refreshBizRecSaveStateHandler)
					mainForm.__refreshBizRecSaveStateHandler.remove();
				mainForm.__refreshBizRecSaveStateHandler = butone.defer(
						mainForm.refreshBizRecSaveState, 10, mainForm);
			};

			/**
			 * 刷新主窗体案卷表保存状态
			 */
			FrameForm.prototype.refreshBizRecSaveState = function() {
				if (this.__refreshBizRecSaveStateHandler) {
					this.__refreshBizRecSaveStateHandler.remove();
					delete this.__refreshBizRecSaveStateHandler;
				}

				var bizRec = this.BizRec;
				var state = bizRec.getState(bizRec.getID());
				if (state && state != justep.XData.STATE.NONE
						&& !bizRec.__virtualEdit) {
					// 如果案卷非虚拟编辑中
					bizRec.setOperationEnable("save", true);
				} else {
					// justep.XData.STATE.NONE || __virtualEdit
					var haveChangedData = false;
					for ( var n in this.__dataCaches) {
						var cacheData = this.__dataCaches[n];
						var data = cacheData.owner;
						if (data != bizRec && data.isChanged("all")) {
							haveChangedData = true;
							break;
						}
					}
					if (haveChangedData) {
						bizRec.setOperationEnable("save", true);
						if (bizRec.__virtualEdit) {
							bizRec.setState(bizRec.getCurrentID(),
									justep.XData.STATE.EDIT);
						}
					} else {
						bizRec.setOperationEnable("save", false);
						delete bizRec.__virtualEdit;
					}
				}
			};

			/**
			 * 窗体激活
			 */
			FrameForm.prototype.active = function() {
				if (this.formDoc.checkEvent
						&& this.formDoc.checkEvent("onFormActive"))
					this.formDoc.callEvent("onFormActive", [ {
						source : this.formDoc
					} ]);
			};

			/**
			 * 销毁，主窗体unload时调用
			 */
			FrameForm.prototype.destroy = function() {
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

			return FrameForm;
		});