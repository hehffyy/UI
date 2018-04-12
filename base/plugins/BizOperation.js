define(["jquery"],function($) {

	var Action = function(operation, action, actionName, options) {
		this.operation = operation;
		this.action = action;
		this.actionName = actionName;
		$.extend(this, options);
	};

	var processDialog = {};
	function getProcessDialog(action) {
		if (!action.dialogUrl)
			return null;
		var dialog = processDialog[action.dialogUrl];
		if (!dialog) {
			dialog = new justep.WindowDialog(
			// id,url,title
			null, action.dialogUrl, action.actionName,
			// modal, status,width
			true, action.dialogStatus, action.dialogWidth || 650,
			// height, left,options.top,
			action.dialogHeight || 450, null, null,
			// reloadOnOpen,onSend,onReceive,onInit,onOpen
			action.dialogReloadOnOpen, null, null, null, null, null);
			// dialog.setAutoSize(true);
			dialog.setResizable(action.dialogResizable);
			dialog.setMinmaxable(action.dialogMinmaxable);
			processDialog[action.dialogUrl] = dialog;
		}
		return dialog;
	}

	/**
	 * 执行办理 context this is bizOperation
	 */
	function executePreempt(action, options) {
		var me = this;
		var param = new justep.Request.ActionParam();
		param.setString("task", justep.Context.getTask());
		param.setString("executor", justep.Context.getExecutor());
		justep.Request.sendBizRequest2({
			async : true,
			contentType : 'application/json',
			dataType : "json",
			parameters : param,
			action : "preemptTaskAction",
			callback : function(callbackData) {
				callbackData.ignoreError = false;
				if (callbackData.state) {
					if (options.onSuccess) {
						options.onSuccess({
							source : action,
							data : callbackData.response
						});
					}
				} else {
					if (options.onError) {
						options.onError({
							source : action,
							data : callbackData.response
						});
					}
					throw new Error(callbackData.response.message);
				}
			}
		});
	}

	/**
	 * 执行放弃办理
	 */
	function executeRevokePreempt(action, options) {
		var me = this;
		var param = new justep.Request.ActionParam();
		param.setString("task", justep.Context.getTask());
		var ret = justep.Request.sendBizRequest(null, null,
				"revokePreemptTaskAction", param, null, null, true);
		if (justep.Request.isSuccess(ret)) {
			if (options.onSuccess) {
				options.onSuccess({
					source : action,
					data : ret
				});
			}
		} else {
			if (options.onError) {
				options.onError({
					source : action,
					data : ret
				});
			}
			throw new Error(justep.XML.eval(ret.responseXML,
					"/root/message/text()", "single").nodeValue);
		}

	}

	/**
	 * 执行解挂
	 */
	function executeResume(action, options) {
		var me = this;

		var sendData = {
			bizRecId : justep.Context.getProcessData1(),
			title : action.actionName
		};

		sendData.suspendKind = action.suspendKind;
		var dialog = getProcessDialog(action);
		if (dialog == null) {
			// 解除挂起
			var param = new justep.Request.ActionParam();
			param.setString("task", justep.Context.getTask());
			var suspendInfo = new justep.Request.MapParam();
			suspendInfo.put("suspendKind", "skSuspend");
			param.setMap("suspendInfo", suspendInfo);
			ret = justep.Request.sendBizRequest(justep.Context
					.getCurrentProcess(), justep.Context.getCurrentActivity(),
					"butoneResumeProcessAction", param);
			if (justep.Request.isBizSuccess(ret)) {
				if (options.onSuccess) {
					options.onSuccess({
						source : action,
						data : ret
					});
				}
			} else {
				if (options.onError) {
					options.onError({
						source : action,
						data : ret
					});
				}
				throw new Error(justep.XML.eval(ret.responseXML,
						"/root/message/text()", "single").nodeValue);
			}
		} else {
			dialog.setTitle(action.actionName);
			if (dialog.__onReceiveHandler) {
				dialog.detachEvent(dialog.__onReceiveHandler);
			}
			dialog.__onReceiveHandler = dialog.attachEvent("onReceive",
					function(event) {
						var ret;
						if (action.action == "apprizeAccept"
								&& event.data.options.apprizeAgain) {
							// 如果是补正受理，并且是再次补正，执行挂起
							setTimeout(function() {
								action = bizOperationAction["apprize"];
								action.apprizeAgain = true;
								me.currentAction = action;
								me.process.getOperation(action.operation)
										.execute(options);
							}, 0);
						} else {
							// 解除挂起
							var param = new justep.Request.ActionParam();
							param.setString("task", justep.Context.getTask());
							var suspendInfo = new justep.Request.MapParam();
							suspendInfo.put("suspendKind",
									event.data.options.suspendKind);
							suspendInfo.put("tables", event.data.tables);
							param.setMap("suspendInfo", suspendInfo);
							ret = justep.Request.sendBizRequest(justep.Context
									.getCurrentProcess(), justep.Context
									.getCurrentActivity(),
									"butoneResumeProcessAction", param);
							if (justep.Request.isBizSuccess(ret)) {
								if (options.onSuccess) {
									options.onSuccess({
										source : action,
										data : ret
									});
								}
							} else {
								if (options.onError) {
									options.onError({
										source : action,
										data : ret
									});
								}
								throw new Error(
										justep.XML.eval(ret.responseXML,
												"/root/message/text()",
												"single").nodeValue);
							}
						}
					});

			if (dialog.__onCloseHandler) {
				dialog.detachEvent(dialog.__onCloseHandler);
			}
			dialog.__onCloseHandler = dialog.attachEvent("onClose", $.proxy(
					me._onCloseActionDialog, me));

			dialog.open2({
				data : sendData
			});
		}

	}

	var bizOperationAction = {};
	// 办理
	bizOperationAction["preempt"] = new Action("preempt", "preempt", "办理", {
		doAction : executePreempt
	});

	bizOperationAction["revokePreempt"] = new Action("revokePreempt",
			"revokePreempt", "取消办理", {
				doAction : executeRevokePreempt
			});

	bizOperationAction["advance"] = new Action("advance", "advance", "发送到下一环节");
	bizOperationAction["batchAdvance"] = new Action("advance", "batchAdvance",
			"批量发送", {
				dialogUrl : "/UI/base/core/flowOperation/batchProcessDialog.w",
				dialogStatus : "maximize",
				dialogResizable : true,
				dialogMinmaxable : true

			});
	bizOperationAction["transfer"] = new Action("transfer", "transfer", "转发");
	bizOperationAction["back"] = new Action("back", "back", "回退");
	bizOperationAction["special"] = new Action("special", "special", "特事特办");

	// 挂起-普通
	bizOperationAction["suspend"] = new Action("suspend", "suspend", "挂起", {
		dialogUrl : "/UI/base/core/flowOperation/suspendDialog.w",
		suspendKind : "skSuspend"
	});

	// 挂起-补正告知
	bizOperationAction["apprize"] = new Action("suspend", "apprize", "补正告知", {
		dialogUrl : "/UI/base/core/flowOperation/bujiaoDialog.w",
		suspendKind : "skApprize"
	});

	// 挂起-特别程序
	bizOperationAction["specialProcedure"] = new Action("suspend",
			"specialProcedure", "特别程序", {
				dialogUrl : "/UI/base/core/flowOperation/specialDialog.w",
				suspendKind : "skSpecialProcedure"
			});
	// 挂起-转报办结
	bizOperationAction["submit"] = new Action("suspend", "submit", "转报办结", {
		dialogUrl : "/UI/base/core/flowOperation/suspendDialog.w",
		suspendKind : "skSubmit"
	});

	// 作废
	bizOperationAction["abort"] = new Action("abort", "abort", "作废办结", {
		dialogUrl : "/UI/base/core/flowOperation/finishDialog.w",
		finishKind : "fkAbort",
		isAbort : true
	});
	// 作废 - 退文
	bizOperationAction["untread"] = new Action("abort", "untread", "退回办结", {
		dialogUrl : "/UI/base/core/flowOperation/finishDialog.w",
		finishKind : "fkUntread",
		isAbort : true
	});
	// 作废 - 删除
	bizOperationAction["delete"] = new Action("abort", "delete", "删除办结", {
		dialogUrl : "/UI/base/core/flowOperation/finishDialog.w",
		finishKind : "fkDelete",
		isAbort : true
	});
	// 作废 - 补正不来
	bizOperationAction["apprizeAbort"] = new Action("abort", "apprizeAbort",
			"补正不来办结", {
				dialogUrl : "/UI/base/core/flowOperation/finishDialog.w",
				finishKind : "fkApprizeAbort",
				isAbort : true
			});

	// 办结
	bizOperationAction["finish"] = new Action("finish", "finish", "办结", {
		dialogUrl : "/UI/base/core/flowOperation/finishDialog.w",
		isAbort : false,
		isFinish : true
	});

	// 解挂
	bizOperationAction["resume"] = new Action("resume", "resume", "解挂", {
		doAction : executeResume,
		suspendKind : "skSuspend"
	});
	// 解挂 - 补正受理
	bizOperationAction["apprizeAccept"] = new Action("resume", "apprizeAccept",
			"补正受理", {
				dialogUrl : "/UI/base/core/flowOperation/bujiaoShouliDialog.w",
				suspendKind : "skApprize",
				doAction : executeResume
			});
	// 解挂 - 特别程序结果
	bizOperationAction["specialProcResult"] = new Action(
			"resume",
			"specialProcResult",
			"特别程序结果",
			{
				dialogUrl : "/UI/base/core/flowOperation/specialResultDialog.w",
				suspendKind : "skSpecialProcedure",
				doAction : executeResume
			});

	var bizOperation = function(options) {
		var me = this, process = options.process;
		me.process = process;
		me._processDialog = {};
		me.onSuccess = me._getFunction(options.onSuccess);
		me.onError = me._getFunction(options.onError);
	};

	bizOperation.prototype = {
		/**
		 * 注册流程操作
		 */
		registerProcessOperation : function(operation, action, actionName) {
			bizOperationAction[action] = new Action(operation, action,
					actionName);
		},

		_getFunction : function(obj) {
			if (!obj)
				return undefined;
			var fn = obj;
			if (typeof obj === "string")
				fn = justep.Function.get(obj);
			if (typeof fn != "function")
				throw new Error(obj + "不是有效的函数");
			return fn;
		},

		execute : function(actionName) {
			var me = this;
			var action = bizOperationAction[actionName];
			me.currentAction = action;
			var method = action.doAction;
			if (method) {
				$.proxy(method, me)(action, {
					onSuccess : me.onSuccess,
					onError : me.onError
				});
			} else {
				me.process.getOperation(action.operation).execute(me.onSuccess);
			}
		},

		sureBizOperationDialog : function(event) {
			var me = this, action = me.currentAction;
			delete me.currentAction;

			var processControl = new justep.ProcessControl();
			processControl.loadFromJson(event.data);

			var exts = processControl.getExts();
			var stop = false;
			var msg = "";
			if (exts && exts.rules) {
				for ( var i = 0; i < exts.rules.length; i++) {
					var extRule = exts.rules[i];
					if (!stop)
						stop = extRule.stop;
					msg += extRule.message + "\n";
				}
			}
			if (stop) {
				new justep.System.showMessage().open({
					msg : msg,
					img : "info",
					title : '提示信息',
					type : 0
				});
				event.cancel = true;
			} else {
				event.cancel = !!action.dialogUrl;
				if (event.action == "advanceQuery") {
					if (processControl.getToItems().length == 1
							&& processControl.getToItems()[0].isEnd()) {
						event.cancel = true;
						action = bizOperationAction["finish"];
					}
				}
				if (event.cancel) {
					me.processControl = processControl;
					me.queryAction = event.action;
					butone
							.defer(this.openCustomDialog, 0, me, [ action ],
									true);
				}
			}

		},

		_submitAction : function(action, data) {
			var me = this;
			var processControl = me.processControl;
			if (action.operation == "finish" || action.operation == "abort") {
				// 办结、终止
				var finishInfo = new justep.Request.MapParam();
				finishInfo.put("finishKind", data.options.finishKind);
				if (data.tables)
					finishInfo.put("tables", data.tables);
				processControl.setExt("finishInfo", finishInfo);
			} else if (action.operation == "suspend") {
				// 挂起
				var suspendInfo = new justep.Request.MapParam();
				suspendInfo.put("suspendKind", data.options.suspendKind);
				suspendInfo.put("apprizeAgain", !!data.options.apprizeAgain);
				suspendInfo.put("tables", data.tables);
				processControl.setExt("suspendInfo", suspendInfo);
			} else if (action.action == "batchAdvance") {
				var batchData = new justep.Request.MapParam();
				var tasks = new justep.Request.ListParam();
				for ( var n in data.tasks) {
					var task = data.tasks[n];
					if (task == justep.Context.getTask())
						continue;
					tasks.add(task);
				}
				batchData.put("tasks", tasks);
				processControl.setExt("batchData", batchData);
			}
			var implName = me.process._getQueryCallBack(me.queryAction);
			var fn = me.process[implName];
			if (fn.apply(me.process,
					[ justep.Context.getTask(), processControl ])) {
				delete me.processControl;
			}
		},

		_onReceiveActionDialog : function(action, event) {
			this._submitAction(action, event.data);
		},

		_onCloseActionDialog : function(event) {
			delete this.processControl;
		},

		openCustomDialog : function(action) {
			var me = this;
			var sendData = {
				bizRecId : justep.Context.getProcessData1(),
				title : action.actionName
			};

			if (action.operation == "finish" || action.operation == "abort") {
				// 办结
				sendData.isFinish = action.isFinish;
				sendData.isAbort = action.isAbort;
				sendData.finishKind = action.finishKind;
			} else if (action.operation == "suspend") {
				// 挂起
				sendData.suspendKind = action.suspendKind;
				if (action.action == "apprize") {
					sendData.apprizeAgain = action.apprizeAgain;
					delete action.apprizeAgain;
				}
			} else if (action.action == "batchAdvance") {
				sendData.isBatch = true;
				sendData.data = me.processControl.getData();
				sendData.mainForm = butone.Context.frameForm.getRootForm();
				sendData.task = justep.Context.getTask();
				sendData.action = "advanceQuery";
			}
			var dialog = getProcessDialog(action);
			dialog.setTitle(action.actionName);
			if (dialog.__onReceiveHandler) {
				dialog.detachEvent(dialog.__onReceiveHandler);
			}
			dialog.__onReceiveHandler = dialog.attachEvent("onReceive", $
					.proxy(me._onReceiveActionDialog, me, action));
			if (dialog.__onCloseHandler) {
				dialog.detachEvent(dialog.__onCloseHandler);
			}
			dialog.__onCloseHandler = dialog.attachEvent("onClose", $.proxy(
					me._onCloseActionDialog, me));
			dialog.open2({
				data : sendData
			});
		}
	};

	return bizOperation;
});