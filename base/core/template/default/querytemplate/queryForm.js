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

				$.extend(me,new butone.EventManager(),
								{
									contentWindow : contentWindow,
									initDeferred : frameFormInitedDeferred.promise(),
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

				// queryActivityTemplate上没有data，justep.XData为空
				var bizDatas = formDoc.bizDatas;
				for ( var n in bizDatas) {
					var data = justep.XData._data_list[bizDatas[n]];
					data.__BUTONE_form = this;
					// data.setReadonly(true);
					me.attachEvent(data, justep.XData.EVENT_REFRESHDATA_AFTER,
							me._onAfterRefreshData);
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

			QueryForm.prototype.getRootForm = function() {
				var root = this;
				while (root.parentForm) {
					root = root.parentForm;
				}
				return root;
			};
			/**
			 * 表单初始化
			 * 
			 * @param param :
			 *            frame的open参数{config:{id:"",url:"",jQNode:"导航dom的jquery对象"},form:QueryForm}
			 */

			QueryForm.prototype.init = function(param) {
				if (this.__inited)
					return;
				var param = param || {};
				this.options = param.options;
				var isPrint = this.options && this.options.isPrint;
				var parent = param.form;
				if (parent) {
					this.parentForm = parent;
					// 查询环节默认禁用所有按钮，如需打开需要在onFormLoad中处理
					$(
							"[component='/UI/system/components/trigger.xbl.xml#trigger']")
							.each(
									function() {
										justep.xbl($(this).attr("id"))
												.setDisabled(true);
									});
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
				}

				this.config = param.config;
				if (this.config)
					this.config.form = this;

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
			
			QueryForm.prototype.getFormPath = function() {
				var id = this.formDoc.id;
				if (this.parentForm)
					id = this.parentForm.getFormPath() + "." + id;
				return id;
			};

			QueryForm.prototype._openAsPrint = function() {
				this.formDoc.id = "print_" + this.formDoc.id;
				this.parentForm.subForms["print_" + this.formDoc.id] = this;
			};
			/**
			 * 级联加载数据，先加载masterData
			 * 
			 * @param data
			 */
			QueryForm.prototype._cascadeLoadData = function(data) {
				if (data.masterData) {
					var master = this.getData(data.masterData.id);
					this._cascadeLoadData(master);
				}
				if (!data.loaded) {
					data.loadData();
				}

			};

			QueryForm.prototype._onAfterRefreshData = function(event) {
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
			 * 增加formDoc事件监听
			 * 
			 * @param name
			 * @param callback
			 * @param once
			 * @returns
			 */
			QueryForm.prototype.attachFormEvent = function(name, callback, once) {
				if (!this.formDoc.attachEvent) {
					if (typeof (dhtmlxEventable) != 'undefined')
						dhtmlxEventable(this.formDoc);
					else if (typeof (justep.Utils.eventable) != 'undefined')
						justep.Utils.eventable(this.formDoc);
				}
				return this.attachEvent(this.formDoc, name, callback, once);
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
				if (this.parentForm) {
					delete this.parentForm.subForms[this.formDoc.id];
				}
			};
			return QueryForm;
		});
