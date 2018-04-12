var bizOperationDialog = {};

bizOperationDialog.windowReceiverReceive = function(event) {
	this.inputData = event.data;
	butone.Context.frameForm = this.inputData.form;
	this.createBizOperationComponent();
};

/**
 * 创建业务操作组件
 */
bizOperationDialog.createBizOperationComponent = function() {
	var bar = $("#bizOperationNav"), bizOperationDefine = butone.BizOperation
			.getBizOperationDefine();
	bar.find("li").remove();

	var me = this, bizOperations = this.inputData.bizOperations, uiPlugins = [];

	var idx = justep.Array.indexOf(bizOperations, "finish");
	if (idx >= 0) {
		bizOperations[idx] = "advance";
		bizOperationDefine["advance"].label = "办结";
	}

	var process = this.inputData.process;
	for ( var n in bizOperations) {
		var opt = bizOperations[n], def, action;
		if (opt.indexOf(":") > 0) {
			action = opt.substring(0, opt.indexOf(":"));
			def = $.extend({}, bizOperationDefine[action]);
			def.label = opt.substring(opt.indexOf(":") + 1);
			process.defineSpecialTransferOperation(opt, def.label);
		} else {
			action = opt;
			def = bizOperationDefine[action];
		}

		if (me.inputData.template.checkEvent("getBizOperationLabel")) {
			var label = me.inputData.template.callEvent("getBizOperationLabel",
					[ action, def.label ]);
			if (label) {
				def.label = label;
			}
		} else if ("advance" == action) {
			if (justep.Array.contain(bizOperations, "finish"))
				def.label = "办结";
		}
		var item = $.extend({
			id : "bizOpt_" + opt,
			operation : opt,
			appearance : "image-text"
		}, def);
		item.onClick = $.proxy(function(event) {
			var $C = $(event.source.domNode);
			if (me._currentOperation != this.operation) {
				me._currentOperation = this.operation;
				$C.parents("li:eq(0)").find("table:eq(0)").addClass(
						"button-blue");
				$C.parents("li:eq(0)").siblings().find("table:eq(0)")
						.removeClass("button-blue");
				me.executeBizOperation(this.operation);
			}
		}, item);
		delete item.cssClass;
		uiPlugins.push(item);
	}

	require([ "base/plugins/Trigger" ],
			function(Trigger) {
				for ( var n in uiPlugins) {
					var uiPlugin = uiPlugins[n], instance = new Trigger(null,
							uiPlugin);
					var $node = $(instance.domNode);
					var $li = $("<li><div/></li>");
					$li.find("div").append($node);
					bar.append($li);
					if (n == 0)
						instance.execute();
				}

			}, function(err) {
				butone.Dialog.error("加载业务操作组件失败", err);
			});
};

/**
 * 执行业务操作
 */
bizOperationDialog.executeBizOperation = function(operation) {
	var process = this.inputData.process, task = this.inputData.task;
	if (process._validateTask(task, operation)) {
		var op = process.getOperation(operation), options = op.getExecuteOptions
				&& op.getExecuteOptions(), operationQuery = op.queryImpl ? op.queryImpl
				: (operation + "Query");
		var eventData = {
			"source" : process,
			"action" : operationQuery,
			"task" : this.inputData.task,
			"bizRecId" : this.inputData.bizRecId,
			"options" : $.extend({}, options, {
				context : butone && butone.Context ? butone.Context : null
			})
		};
		var queryImpl = process._getQueryImpl(operationQuery);
		if (queryImpl && process[queryImpl]) {
			var processControl = process[queryImpl](task, options);
			eventData.data = processControl.getData();
		}

		var dialogUrl = null;
		if (process.checkEvent(process.BEFORE_CREATE_DIALOG)) {
			dialogUrl = process.callEvent(process.BEFORE_CREATE_DIALOG,
					[ eventData ]);
		}

		if (process.checkEvent(process.BEFORE_OPEN_DIALOG)) {
			process.callEvent(process.BEFORE_OPEN_DIALOG, [ eventData ]);
		}

		var wfId = ("wf_" + operation).replace(":", "_"), wf = justep.xbl(wfId);
		if ($("#" + wfId).length == 0) {
			$("<div id='" + wfId + "' style='width:100%;height:100%'/>")
					.appendTo("#bizOperationContainer");
			var receiceCallback;
			if (!eventData.data && !dialogUrl) {
				// 解挂操作
				dialogUrl = "/UI/base/core/flowOperation/blankBizOperation.w";
				receiceCallback = function() {
					op.execute();
				};
			} else {
				(!dialogUrl)
						&& (dialogUrl = "/UI/base/core/flowOperation/batchProcessDialog.w");
				receiceCallback = process.getProcessDialogOnReceive(operation);
			}

			wf = new justep.WindowFrame(wfId, dialogUrl, undefined, undefined,
					"bizOperationDialog.wfReceive");
			wf.cancel = function() {
				justep.xbl("windowReceiver").windowCancel();
			};
			wf.$c[0].xblObject = wf;
			wf.open2({
				data : eventData
			});
			wf.__processDialogOnReceive = receiceCallback;
		}
		$("#" + wfId).show().siblings().hide();
	}
};

bizOperationDialog.wfReceive = function(event) {
	var me = bizOperationDialog, process = me.inputData.process;
	var call = function(){
		event.source.__processDialogOnReceive(event);
		justep.xbl("windowReceiver").windowEnsure(event);
	};
	if (event.data && event.data.data){
		butone.Context.frameForm && butone.Context.frameForm.saveDatas().done(function(){
			call();
		});
	}else{
		call();
	}
};
