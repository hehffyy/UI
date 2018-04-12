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
			 * 创建StaticForm
			 * 
			 * @param formDoc
			 *            .w文件对应的json
			 * @param contentWindow
			 *            .w文件的window对象
			 */
			var StaticForm = function(formDoc, contentWindow) {
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
									openParams : eval(decodeURI(justep.Request.URLParams["openParams"]
											|| "({})")),
									formUIPlugins : []
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
				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					data.__BUTONE_form = me;
					// 增加数据改变监听，用于生成通用编码
					this.attachEvent(data, justep.XData.EVENT_CHANGED,
							this._onDataChanged);
					// 增加数据保存前，用于提交通用编码
					this.attachEvent(data, justep.XData.EVENT_SAVEDATA_BEFORE,
							this._onBeforeSaveData);
					// 数据打开后 执行定位或新增
					me.attachEvent(data, justep.XData.EVENT_REFRESHDATA_AFTER,
							this._onAfterRefreshData);

				}

				if (formDoc.lookupFilters) {
					for ( var n in formDoc.lookupFilters) {
						var lookupFilter = formDoc.lookupFilters[n];
						var data = this.xbl(lookupFilter.data);
						// lookupData刷新时
						var target = this.xbl(lookupFilter.target);
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
			StaticForm.prototype.xbl = justep.xbl;

			/**
			 * 修复主从关系。store-type如果为simple但是关联到grid上，会创建2次Store，导致slaveDatas重复，从而使明细数据重复保存
			 */
			StaticForm.prototype._repairSlaveDatas = function() {
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
			 * 打开浮动表单
			 */
			StaticForm.prototype.openFloatView = function() {
				if (this.formDoc.config.floatView)
					this.formDoc.funcManager
							.openFloatView(this.formDoc.config.floatView);
			};

			StaticForm.prototype.getRootForm = function() {
				var root = this;
				while (root.parentForm) {
					root = root.parentForm;
				}
				return root;
			};

			/**
			 * 表单初始化
			 * 
			 * @param formDoc:
			 *            window模型对应的js对象 <br>
			 * @param param :
			 *            frame的open参数{BizRec:justep.XData,form:StaticForm,config:{id:"",url:"",name:""}}
			 */

			StaticForm.prototype.init = function(param) {
				if (this.__inited)
					return;
				var param = param || {};
				this.config = param.config;
				if (this.config)
					this.config.form = this;
				var parent = param.form;
				this.options = param.options;
				var isPrint = this.options && this.options.isPrint;

				if (parent) {
					butone.SequenceCodeManager.getCodeManager = parent.contentWindow.butone.SequenceCodeManager.getCodeManager;
					this.parentForm = parent;
					if (isPrint) {
						this._openAsPrint();
					} else {
						parent.subForms[this.formDoc.id] = this;
					}
					if (parent.currentForm
							&& parent.currentForm.getFormPath() == this
									.getFormPath()) {
						// 子页面重载后
						parent.currentForm = this;
					}
					this.setReadonly(isPrint || parent._readOnly);
				} else {
					// 编码字段管理
					for ( var concept in this.formDoc.sequenceCodeFields) {
						butone.SequenceCodeManager.registe(concept,
								this.formDoc.sequenceCodeFields[concept]);
					}
					this.setReadonly(isPrint);
				}
				// 克隆功能打开参数
				var funcOpenParams = this.getRootForm().openParams;
				var openParams = $.extend({}, funcOpenParams, this.openParams,
						param ? param.openParams : undefined);
				this.openParams = openParams;
				var dataControl = this.openParams.dataControl;
				if (dataControl) {
					for ( var n in dataControl) {
						var openControl = dataControl[n];
						var data = justep.xbl(openControl.id);
						if (!data)
							continue;
						data._openControl = openControl;
						if (openControl.filter) {
							data.setFilter("OPENFILTER", openControl.filter);
						}
					}
				}

				var bizDatas = this.formDoc.bizDatas;
				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					data.autoLoad = true;
					data.getInstance().autoLoad = true;
					if(this.openParams.closeAutoLoad || data._openControl && data._openControl.closeAutoLoad){
						// not loadData
					}else{
						this._cascadeLoadData(data);
					}
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
			 * 级联加载数据，先加载masterData
			 * 
			 * @param data
			 */
			StaticForm.prototype._cascadeLoadData = function(data) {
				if (data.masterData) {
					var master = this.getData(data.masterData.id);
					this._cascadeLoadData(master);
				}
				if (!data.loaded) {
					data.loadData();
				}
			};

			StaticForm.prototype._onAfterRefreshData = function(event) {
				var openControl = event.source._openControl;
				if (openControl) {
					var data = event.source;
					if (openControl.locate) {
						var query = data
								.locate(openControl.locate.values,
										openControl.locate.columns, false,
										false, false);
						if (query && query.length > 0) {
							var rowId = query[0];
							data.setIndex(data.getIndex(rowId));
						}
					} else if (openControl.autoNew) {
						if (data.getCount() == 0) {
							if (openControl.idColumn) {
								function fixRowId(event) {
									var data = event.source;
									for ( var n in event.ids) {
										var rowId = event.ids[n];
										data.setID(rowId, data.getValue(
												openControl.idColumn, rowId));
									}

								}
								this.attachEvent(data,
										justep.XData.EVENT_NEWDATA_AFTER,
										fixRowId, true);
							}
							var opt = {};
							if (openControl.defaultValues) {
								if (justep.Array
										.isArray(openControl.defaultValues)) {
									opt.defaultValues = openControl.defaultValues;
								} else {
									opt.defaultValues = [ openControl.defaultValues ];
								}
							}
							data.newData(opt);
						}
					}
				}
			};

			StaticForm.prototype._openAsPrint = function() {
				this.formDoc.id = "print_" + this.formDoc.id;
				this.parentForm.subForms["print_" + this.formDoc.id] = this;
			};

			StaticForm.prototype.setReadonly = function(value) {
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
					$("[component='/UI/system/components/trigger.xbl.xml#trigger']").each(function() {
										var $this = $(this);
										if (!$this.hasClass("forView"))
											justep.xbl($this.attr("id"))
													.setDisabled(value);
										//非流程功能保存按钮默认高亮的问题 ，不应在这里处理见FuncManager.prototype.changeBindingForm
									});
				}
			};

			/**
			 * 设置lookup数据集的过滤
			 * 
			 * @param event
			 */
			StaticForm.prototype._setLookupDataFilter = function(event) {
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
			 * 获得当前窗体内的data对象
			 * 
			 * @param id
			 * @returns
			 */
			StaticForm.prototype.getData = function(id, includeChildren) {
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
			 * 数据改变事件，处理单位字段、编码字段的数据改变。
			 * 
			 * @param event
			 */
			StaticForm.prototype._onDataChanged = function(event) {
				this.getRootForm()._doDataChanged(event);
			};

			/**
			 * 主窗体处理数据改变事件，编码字段处理
			 * 
			 * @param event
			 */
			StaticForm.prototype._doDataChanged = function(event) {
				var frameForm = event.source.__BUTONE_form, changedSource = event.changedSource;
				if (!changedSource.loaded) {
					// 页面打开后，即便数据未加载依然会进行字段计算表达式计算
					return;
				}
				// 编码字段
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
						if (event.success) {
							codeFieldManager
									.refreshData(frameForm.contentWindow);
						}
						changedSource.xformsRefresh();
					}
				}
			};

			StaticForm.prototype.getFormPath = function() {
				var id = this.formDoc.id;
				if (this.parentForm)
					id = this.parentForm.getFormPath() + "." + id;
				return id;
			};

			/**
			 * 刷新数据
			 * 
			 * @param event
			 */
			StaticForm.prototype.refreshData = function() {
				if (arguments.length == 0) {
					this._refreshAllData();
				} else {
					for ( var n in arguments) {
						var dataId = arguments[n];
						var data = this.xbl(dataId);
						if (data) {
							data.refreshData();
						}
					}
					var subForms = this.subForms;
					for ( var n in subForms) {
						var subForm = subForms[n];
						subForm.refreshData.apply(subForm, arguments);
					}
				}
			};

			/**
			 * 刷新所有表
			 */
			StaticForm.prototype._refreshAllData = function() {
				var bizDatas = this.formDoc.bizDatas;
				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					if (!data.masterData || !data.masterData.id) {
						// 刷新根表
						data.refreshData();
					}
				}
			};

			/**
			 * 刷新同步所有的控件，当控件还没有把数据写回data时可以调用此方法把数据同步回data
			 */
			StaticForm.prototype.refreshControls = function() {
				justep.XData.refreshControls();
				for ( var n in this.subForms) {
					this.subForms[n].refreshControls();
				}
			};
			
			StaticForm.prototype.promiseRefreshControls = function(){
				var dtd = jquery.Deferred();
				dtd.resolve();
				return dtd.promise();
			};

			/**
			 * 保存所有数据，通过保存案卷表级联实现
			 */
			StaticForm.prototype.saveDatas = function(options) {
				var me = this;
				var mainForm = this.getRootForm();
				return mainForm.promiseRefreshControls().done(function() {
					try {
						var bizDatas = me.formDoc.bizDatas;
						for ( var n in bizDatas) {
							var data = justep.XData._data_list[bizDatas[n]];
							if (!data.masterData || !data.masterData.id) {
								// 保存根表
								data.saveData();
							}
						}
						var subForms = me.subForms;
						for ( var n in subForms) {
							var subForm = subForms[n];
							subForm.saveDatas();
						}
						options && options.onSuccess && options.onSuccess();
					} catch (e) {
						options && options.onError && options.onError(e);
					}
				});
			};

			StaticForm.prototype.isChanged = function() {
				var bizDatas = this.formDoc.bizDatas;
				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					if (!data.masterData || !data.masterData.id) {
						if (data.isChanged("all"))
							return true;
					}
				}
				var subForms = this.subForms;
				for ( var n in subForms) {
					var subForm = subForms[n];
					if (subForm.isChanged())
						return true;
				}
				return false;
			};

			/**
			 * 数据保存前，主窗体获得编码字段配置。如果编码字段变化
			 * 1.增加一次性的EVENT_SAVEDATA_CREATEPARAM监听，用于传递通用编码字段的保存参数
			 * 2.增加一次性的EVENT_SAVE_COMMIT_AFTER监听，保存数据后刷新编码值
			 * 
			 * @param event
			 */
			StaticForm.prototype._onBeforeSaveData = function(event) {
				// 提升到主窗体执行
				var me = this.getRootForm(), data = event.source, codeFieldManager = me.contentWindow.butone.SequenceCodeManager
						.getCodeManager(data.id);
				if (codeFieldManager) {
					if (codeFieldManager.getCount() > 0) {
						// 保存参数追加编码字段的节点值
						me.attachEvent(data,
								justep.XData.EVENT_SAVEDATA_CREATEPARAM,
								me._setSequenceCodeFieldSaveParameter, true);
					}
					if (codeFieldManager.isNeedRefreshAfterSaveCommit(data)) {
						// 数据保存提交后,刷新编码值
						me.attachEvent(data,
								justep.XData.EVENT_SAVE_COMMIT_AFTER,
								me._refreshSequenceCodeFieldValue, true);
					}
				}

			};

			/**
			 * 设置编码字段保存参数 sequenceNodeValues Map<FieldName,Map<rowid,Map<ParamName,ParamValue>>>
			 * 
			 * @param event
			 */
			StaticForm.prototype._setSequenceCodeFieldSaveParameter = function(
					event) {
				var variants = event.param.getParam("variants")
						|| new justep.Request.MapParam(), codeFieldManager = butone.SequenceCodeManager
						.getCodeManager(event.source.id);
				variants.put("sequenceNodeValues", codeFieldManager
						.getSequenceNodeValues().toJson());
				event.param.setMap("variants", variants);
			};

			/**
			 * 刷新编码字段值
			 * 
			 * @param event
			 */
			StaticForm.prototype._refreshSequenceCodeFieldValue = function(
					event) {
				var data = event.source;
				data.refreshData();
			};

			/**
			 * 窗口激活
			 */
			StaticForm.prototype.active = function() {
				if (this.formDoc.checkEvent
						&& this.formDoc.checkEvent("onFormActive"))
					this.formDoc.callEvent("onFormActive", [ {
						source : this.formDoc
					} ]);
			};
			/**
			 * 销毁，主窗体unload时调用
			 */
			StaticForm.prototype.destroy = function() {
				if (this.formDoc.checkEvent
						&& this.formDoc.checkEvent("onFormDestroy"))
					this.formDoc.callEvent("onFormDestroy", [ {
						source : this.formDoc
					} ]);
				this.detachEvent();
				if (this.parentForm) {
					delete this.parentForm.subForms[this.formDoc.id];
				}
				this._destroyed = true;
			};
			return StaticForm;
		});
