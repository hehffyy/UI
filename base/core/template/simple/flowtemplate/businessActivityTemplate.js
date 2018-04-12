var businessActivityTemplate = {};

businessActivityTemplate.modelLoad = function(event) {
	var me = this;
	if (me.checkEvent("onLoad")) {
		me.callEvent("onLoad", [ {
			source : me
		} ]);
	}
	require([ "base/core/template/simple/flowtemplate/funcManager" ], function(
			FuncManager) {
		var config = me.config;
		me.funcManager = new FuncManager(config, me);
		butone.Context.funcManager = me.funcManager;
		if (!justep.Context.getTask()) {
			var p = justep.xbl("process");
			p.attachEvent("onBeforeStart", $.proxy(
					me.funcManager.mainForm._onBeforeStartProcess,
					me.funcManager.mainForm));
		}
		me.funcManager.initFormNav();
		$("#floatToolbars").css({
			top : "5px",
			right : "25px",
			width : "120px"
		}).panel({
			anchor : [ "R" ],
			title : "",
			enableDrag : true,
			enableExpand : false
		});
		// 初始化业务操作
		me.initBizOperation();
	});
};

businessActivityTemplate.modelUnLoad = function(event) {
	this.funcManager.destroy();
};

/**
 * 返回自定义流转框url
 */
businessActivityTemplate.processBeforeCreateDialog = function(event) {
	return butone.BizOperation.getBizOperationDialogUrl(event);
};

/**
 * 初始化业务操作
 */
businessActivityTemplate.initBizOperation = function() {
	var bar = $(".bizOperationBar", "#floatToolbars");
	if (bar.find("li.save").length == 0) {
		var $li_Save = $("<li class='save'><div/></li>");
		$li_Save.appendTo(bar).find("div").append($("#btnSaveView").show());
	}
	if (!justep.Context.getTask()) {
		return;
	}
	if(justep.Context.isReadonlyMode())
		bar.find("li.save").hide();
	else
		bar.find("li.save").show();
	// 查询内部操作
	var me = this, options = {}, param = new justep.Request.ActionParam();
	param.setString('id', justep.Context.getTask());
	
	options.async = true;
	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "queryTaskBizOperationAction";
	options.callback = function(callbackData) {
		callbackData.ignoreError = false;
		if (callbackData.state) {
			var info = me.processInfo = callbackData.response, bizOperations = info.allowOperation;
			me.needPreempt = justep.Array.contain(bizOperations, "preempt");
			butone.Context.frameForm.setReadonly(info.readOnly);
			me.createBizOperationComponent(bizOperations);
		} else {
			butone.Dialog.error("查询案卷操作失败", callbackData.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

businessActivityTemplate.createBizOperationComponent = function(bizOperations) {
	var me = this, bar = $(".bizOperationBar", "#floatToolbars");
	bar.find("li").not(".save").remove();
	var uiPlugins = [], item, bizOperationDefine = butone.BizOperation
			.getBizOperationDefine();
	var menuMore = {
			"declaredClass" : "base/plugins/MenuButton",
			"iconClass" : "icon-system-menu",
			"id" : "menuMore",
			"label" : "更多操作",
			"items" : []
	};
	if (bizOperations.indexOf("preempt") >= 0) {
		item = $.extend({
			id : "bizOpt_preempt",
			operation : "preempt",
			appearance : "image-text"
		}, bizOperationDefine["preempt"]);
		item.label = "签　　收";
		item.onClick = $.proxy(function() {
			me.executeBizOperation(this.operation);
		}, item);
		bizOperations.splice(bizOperations.indexOf("preempt"), 1);
		uiPlugins.push(item);
	} else {
		if (bizOperations.indexOf("revokePreempt") >= 0) {
			item = $.extend({
				id : "bizOpt_revokePreempt",
				operation : "revokePreempt",
				appearance : "image-text"
			}, bizOperationDefine["revokePreempt"]);
			item.label = "撤销签收";
			item.onClick = $.proxy(function() {
				me.executeBizOperation(this.operation);
			}, item);
			bizOperations.splice(bizOperations.indexOf("revokePreempt"), 1);
			uiPlugins.push(item);
		}
		if(!justep.Context.isReadonlyMode()){
			item = {
				id : "bizOpt_next",
				appearance : "image-text",
				label : "发　　送",
				iconClass : "icon-system-play",
				cssClass : "button-green",
				onClick : $.proxy(function() {
					var opts = this;
					me.funcManager.mainForm.saveDatas().done(function(){
						me.showBizOperationDialog(opts);
					});
				}, bizOperations)
			};
			uiPlugins.unshift(item);
		}
	}
	item = {
			id : "bizOpt_proceeChar",
			appearance : "image-text",
			label : "办理过程",
			iconClass : "icon-system-flow-tree",
			cssClass : "",
			onClick : $.proxy(function() {
				me.showProcessChar();
			}, item)
	};
	uiPlugins.push(item);
	item = {
			id : "btnBackReason",
			appearance : "image-text",
			label : "上阶段意见",
			cssClass : "button-darkcyan",
			onClick : $.proxy(function() {
				me.btnBackReasonClick();
			}, item)
	};
	uiPlugins.push(item);
	item = {
			id : "bizOpt_bizRec",
			appearance : "image-text",
			label : "收藏案卷",
			iconClass : "icon-system-star",
			cssClass : "button-green",
			onClick : $.proxy(function() {
				me.showBizFavoriteDialog();
			}, item)
	};
	uiPlugins.push(item);
	item = {
			id : "btnAttention",
			appearance : "image-text",
			label : "关注案卷",
			iconClass : "icon-system-star",
			cssClass : "button-darkcyan",
			onClick : $.proxy(function() {
				me.btnAttentionClick();
			}, item)
	};
	uiPlugins.push(item);

	require([ "base/plugins/Trigger" ],
			function(Trigger) {
				var $node, instance, $li;
				for ( var n in uiPlugins) {
					var uiPlugin = uiPlugins[n], instance = new Trigger(null,
							uiPlugin);
					$node = $(instance.domNode);
					$li = $("<li><div/></li>");
					$li.find("div").append($node);
					bar.append($li);
					me.initAttention();
				}
			}, function(err) {
				butone.Dialog.error("加载业务操作组件失败", err);
			});
	if (me.uiPlugins.length > 0) {
		require(
				[ "base/plugins/Trigger", "base/plugins/MenuButton" ],
				function(Trigger, MenuButton) {
					var $node, instance, $li;
					for ( var n in me.uiPlugins) {
						var uiPlugin = me.uiPlugins[n];
						if (uiPlugin.declaredClass == "base/plugins/MenuButton") {
							instance = new MenuButton(null, uiPlugin);
						} else {
							instance = new Trigger(null, uiPlugin);
						}
						$node = $(instance.domNode);
						$li = $("<li><div/></li>");
						$li.find("div").append($node);
						bar.append($li);
					}
				}, function(err) {
					butone.Dialog.error("加载业务操作组件失败", err);
				});
	}
};

/**
 * 执行业务操作
 */
businessActivityTemplate.executeBizOperation = function(operation) {
	var me = this;
	butone.Context.frameForm.saveDatas().done(function(){
		var op = justep.xbl("process").getOperation(operation);
		op.getEnable() && op.execute();
	});
};

/**
 * 执行业务动作前，显示自定义的提示信息
 */
businessActivityTemplate.processBeforeExecute = function(event) {
	if (businessActivityTemplate.checkEvent("questionBizOperation")) {
		var questionMsg = businessActivityTemplate.callEvent(
				"questionBizOperation", [ event.action ]);
		event.cancel = !!questionMsg;
		if (event.cancel) {
			event.continuePromise = new $2.Deferred();
			butone.Dialog.question(questionMsg, null, function(e) {
				(e.status == "yes" || e.status == "ok") ? event.continuePromise
						.resolve() : event.continuePromise.reject();
			});
		}
	}
};

/**
 * 流程对话框打开前，为挂起、解挂增加sendData参数
 */
businessActivityTemplate.processBeforeOpenDialog = function(event) {
	event.bizRecId = justep.Context.getProcessData1();
	if (event.data && event.data.to && event.data.to[0]
			&& event.data.to[0]["@is-end"] == "true") {
		var me = businessActivityTemplate;
		if (me.checkEvent("onCreateFinishInfo")) {
			var e = {
				source : me,
				isAbort : event.options.isAbort,
				finishKind : event.options.finishKind
			};
			event.finishInfo = me.callEvent("onCreateFinishInfo", [ e ]);
			event.options.finishKind = e.finishKind;
		}
	}
};

/**
 * 操作查询前，保存数据
 */
businessActivityTemplate.beforeBizOperationQuery = function(event) {
	// 没意义，保存是异步的 butone.Context.frameForm.saveDatas();
};

/**
 * 流程启动前，增加案卷提交后监听
 */
businessActivityTemplate.processBeforeStart = function(event) {
	var me = businessActivityTemplate, bizRec = justep.xbl("BizRec");
	me._refreshBizRecHander = butone.Context.frameForm.attachEvent(bizRec,
			justep.XData.EVENT_SAVE_COMMIT_AFTER, function() {
				bizRec.refreshData();
			}, true);
};

/**
 * 流程启动失败，移除启动前的刷新句柄
 */
businessActivityTemplate.processStartError = function(event) {
	var me = businessActivityTemplate;
	if (me._refreshBizRecHander) {
		me._refreshBizRecHander.remove();
		delete me._refreshBizRecHander;
	}
};

/**
 * 启动成功后，同步上下文数据到子表单
 */
businessActivityTemplate.processStartCommit = function(event) {
	butone.Context.frameForm.copyContextToSubForm();
	businessActivityTemplate.initBizOperation();
	businessActivityTemplate.afterProcessOperationCommit();
};

/**
 * 解挂后，通知任务中心，并刷新页面
 */
businessActivityTemplate.processAfterResume = function(event) {
	var data = {
		source : butone.Context.frameForm,
		kind : "refreshTaskCenter"
	};
	justep.xbl("funcReceiver").sendData(data);
	var href = window.location.href.replace("activity-pattern=detail",
			"activity-pattern=do");
	window.location.replace(href);
};

/**
 * 办理后，刷新当前页
 */
businessActivityTemplate.processAfterPreempt = function(event) {
	// window.location.reload();
	butone.Context.frameForm.saveDatas().done(function() {
		businessActivityTemplate.initBizOperation(true);
	});
};
/**
 * 取消办理后，刷新当前页
 */
businessActivityTemplate.processAfterRevokePreempt = function(event) {
	// window.location.reload();
	var me = businessActivityTemplate;
	if(me.checkEvent("onAfterRevokePreempt"))
		me.callEvent("onAfterRevokePreempt",[me]);
	butone.Context.frameForm.saveDatas().done(function() {
		businessActivityTemplate.initBizOperation();
	});
};

businessActivityTemplate.afterProcessOperationCommit = function(event) {
	var data = {
		source : butone.Context.frameForm,
		kind : "refreshTaskCenter"
	};
	justep.xbl("funcReceiver").sendData(data);
};

businessActivityTemplate.btnBackReasonClick = function(event){
	butone.Window.dialog("sys", "/UI/base/core/flowOperation/preIdeaDialog.w",
			"上阶段意见", {
				id : justep.Context.getTask()
			}, true, null, 550, 300);
};

businessActivityTemplate.initAttention = function() {
	var bizRecData = justep.xbl("BizRec");
	var options = {}, param = new justep.Request.ActionParam();
	param.setString('bizRecId', bizRecData.getID());
	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "isBizRecAttentiveAction";
	options.callback = function(callbackData) {
		if (callbackData.state) {
			var btn = $("#btnAttention span.xforms-label");
			if (callbackData.response == "true") {
				btn.text("取消关注");
			} else if (callbackData.response == "false") {
				btn.text("关注案卷");
			}
		}
	};
	justep.Request.sendBizRequest2(options);
};

businessActivityTemplate.btnAttentionClick = function(event){
	var bizRecData = justep.xbl("BizRec");
	var param = new justep.Request.ActionParam();
	param.setString('bizRecId', bizRecData.getValue("fBizRecId"));
	var options = {};
	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "updateAttentionStatusAction";
	options.callback = function(callbackData) {
		callbackData.ignoreError = false;
		if (callbackData.state) {
			var btn = $("#btnAttention span.xforms-label");
			if (btn.text() == "取消关注")
				btn.text("关注案卷");
			else
				btn.text("取消关注");
		}
	};
	justep.Request.sendBizRequest2(options);
};

businessActivityTemplate.showBizFavoriteDialog = function(event) {
	var bizRecData = justep.xbl("BizRec");
	var options = {};
	options.fBizRecId = bizRecData.getValue("fBizRecId");
	options.fTaskID = justep.Context.getTask();
	options.fTitle = bizRecData.getValue("fRecTitle");;
	butoneEx && butoneEx.BizRec && butoneEx.BizRec.openFavoriteDialog(options);
};

businessActivityTemplate.showProcessChar = function(event){
	var bizRecData = justep.xbl("BizRec");
	var fBizRecId = bizRecData.getValue("fBizRecId")
	var taskID = justep.Context.getTask();
	butone.Window.run("/UI/SA/task/taskCenter/banLiGuoCheng.w?pi=" + bizRecData.getValue("fFlowId")+"&task="+taskID+"&bizRecID="+fBizRecId,"办理过程");
};

businessActivityTemplate.showBizOperationDialog = function(bizOperations) {
	var me = this;
	require([ "base/components/knockout/windowDialog" ],
			function(WindowDialog) {
				if (!me._bizOperationDlg) {
					me._bizOperationDlg = new WindowDialog({
						id : "_bizOperationDlg",
						parentNode : $("#rootView")[0],
						showTitle : true,
						reloadOnOpen : true
					});
					me._bizOperationDlg.init();
				}
				//
				var param = {
					task : justep.Context.getTask(),
					bizRecId : justep.Context.getProcessData1(),
					form : butone.Context.frameForm,
					bizOperations : bizOperations,
					template : me,
					process : justep.xbl("process")
				};
				me._bizOperationDlg.open(param, "发　　送",
						"/UI/base/core/flowOperation/bizOperationDialog.w");
			});
};

if (typeof (dhtmlxEventable) != 'undefined')
	dhtmlxEventable(businessActivityTemplate);
else if (typeof (justep.Utils.eventable) != 'undefined')
	justep.Utils.eventable(businessActivityTemplate);
