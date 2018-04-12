define(function() {

	var logicTrigger = function(options) {
		if (typeof (dhtmlxEventable) != 'undefined')
			dhtmlxEventable(this);
		else if (typeof (justep.Utils.eventable) != 'undefined')
			justep.Utils.eventable(this);
		this.bizPlugin = butone.getOption(options, "bizPlugin");
		if (options && options.hasOwnProperty("autoSave"))
			this.autoSave = butone.getOption(options, "autoSave");
		else
			this.autoSave = true;
		if (options && options.hasOwnProperty("autoClose"))
			this.autoClose = butone.getOption(options, "autoClose");
		butone.attachEvent(this, "onClick", options);
		butone.attachEvent(this, "onBeforeExecute", options);
		butone.attachEvent(this, "onAfterExecute", options);
		butone.attachEvent(this, "onCommitAfter", options);
		butone.attachEvent(this, "onCommitError", options);
	};

	logicTrigger.prototype = {
		/**
		 * 组件执行
		 * 
		 * @param opt
		 *            {Object}
		 *            {onSuccess:function(event){},onError:function(event){}}
		 */
		execute : function(opt) {
			if (this.checkEvent("onClick")) {
				this.callEvent("onClick", [ {
					source : this
				} ]);
			}
			if (!!opt && !!opt.url) {
				this.bizPlugin = opt.url;
			}
			if (this.bizPlugin) {
				this._doExecutePluginLogic(opt);
			}
		},

		/**
		 * 执行
		 * 
		 * @param opt
		 *            {Object}
		 * @returns {Boolean}
		 */
		_doExecutePluginLogic : function(opt) {
			// 自动保存
			if (this.autoSave && butone && butone.Context
					&& butone.Context.frameForm
					&& butone.Context.frameForm.saveDatas) {
				var me = this, ret = butone.Context.frameForm.saveDatas();
				if (ret && ret.done) {
					ret.done(function() {
						me._actualExecutePluginLogic(opt);
					});
				} else {
					me._actualExecutePluginLogic(opt);
				}
			} else {
				this._actualExecutePluginLogic(opt);
			}
		},

		_actualExecutePluginLogic : function(opt) {
			opt = opt || {};
			var onSuccessCB = butone.getOption(opt, "onSuccess");
			var onErrorCB = butone.getOption(opt, "onError");
			// TODO 暂时关闭批量处理，weblogic、集群许可下 提交无法解析结果。
			// var begineExecute = false;
			try {
				// begineExecute = justep.Request.beginBatch();
				// if (!begineExecute) {
				// var msg = new justep.Message("启动批量事务失败");
				// throw justep.Error.create(msg);
				// }
				var variants = opt.variants || new justep.Request.MapParam();
				var filters = opt.filters || new justep.Request.MapParam();
				var beforeEventData = {
					'cancel' : false,
					'source' : this,
					'data' : variants,
					'variants' : variants,
					'filters' : filters
				};

				if (this.checkEvent("onBeforeExecute")) {
					this.callEvent("onBeforeExecute", [ beforeEventData ]);
				}

				if (beforeEventData.cancel) {
					// justep.Request.cancelBatch();
					return false;
				}

				var actionParam = new justep.Request.ActionParam();
				actionParam.setString("url", opt.url || this.bizPlugin);
				actionParam.setString("bizRecId", opt.bizRecId
						|| justep.Context.getProcessData1());
				actionParam.setMap("variants", beforeEventData.variants);
				actionParam.setMap("filters", beforeEventData.filters);

				var options = {};
				options.process = opt.process
						|| justep.Context.getCurrentProcess();
				options.activity = opt.activity
						|| justep.Context.getCurrentActivity();
				options.action = "executeBizLogicPluginAction";
				options.parameters = actionParam;
				options.contentType = "application/json";

				var self = this;
				options.callback = function(data) {
					if (data.state) {

						var ret = justep.Request.getData(data.response);
						if (ret) {
							var dataType = ret.tagName;
							if (dataType == "xbiz:simple") {
								ret = justep.Request.transformSimple(ret);
							} else if (dataType == "xbiz:map") {
								ret = justep.Request.transformMap(ret);
							} else if (dataType == "xbiz:list") {
								ret = justep.Request.transformList(ret);
							}
						}

						var commitAfterEventData = {
							'cancel' : false,
							'source' : self,
							'data' : ret
						};

						if (onSuccessCB) {
							onSuccessCB({
								"source" : self,
								"data" : ret
							});
						}

						if (self.checkEvent("onCommitAfter")) {
							self.callEvent("onCommitAfter",
									[ commitAfterEventData ]);
						}
						var autoClose = opt.hasOwnProperty("autoClose")
								&& opt.autoClose
								|| !opt.hasOwnProperty("autoClose")
								&& self.autoClose;
						if (autoClose) {
							setTimeout(function() {
								justep.Portal.closeWindow();
							}, 1);
						}

					} else {
						var commitErrorEventData = {
							'error' : data.response,
							'cancel' : false,
							'errorType' : "server",
							'source' : self
						};
						if (onErrorCB) {
							onErrorCB({
								"source" : self
							});
							onErrorCB = undefined;
						}
						if (self.checkEvent("onCommitError")) {
							self.callEvent("onCommitError",
									[ commitErrorEventData ]);
						}
						data.ignoreError = commitErrorEventData.cancel;
					}
				};

				var response = justep.Request.sendBizRequest2(options);
				var afterEventData = {
					'cancel' : false,
					'source' : this,
					'response' : response
				};
				if (this.checkEvent("onAfterExecute")) {
					this.callEvent("onAfterExecute", [ afterEventData ]);
				}
				if (afterEventData.cancel) {
					// justep.Request.cancelBatch();
					return false;
				}
				// justep.Request.endBatch();
				// begineExecute = false;
				return true;
			} catch (e) {
				// if (begineExecute) {
				// justep.Request.cancelBatch();
				// }
				var errorEventData = {
					'cancel' : false,
					'errorType' : "client",
					'error' : e,
					'source' : this
				};
				if (onErrorCB) {
					onErrorCB({
						"source" : self
					});
					onErrorCB = undefined;
				}
				if (this.checkEvent("onCommitError")) {
					this.callEvent("onCommitError", [ errorEventData ]);
				}
				if (!errorEventData.cancel) {
					throw e;
				}
				return false;
			}
		}
	};
	return logicTrigger;
});