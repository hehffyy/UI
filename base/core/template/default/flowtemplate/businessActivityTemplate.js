/**
 * 通用审批流程模板，暂时去掉收藏MOA内功能，待平台整理后提供
 */
var businessActivityTemplate = {};

businessActivityTemplate.modelLoad = function(event) {
	var processDialogWindow = justep.Context
			._getNodeValue("/form/bizParams/processDialogWindow/text()");
	if (processDialogWindow)
		justep.xbl("process").setProcessDialogWindow(processDialogWindow);

	var me = this;
	// 如果不使用导航 隐藏
	if (!!this.config.notUseNav) {
		justep.xbl('HSplitter1').moveToStart();
	}
	if (me.checkEvent("onLoad")) {
		me.callEvent("onLoad", [ {
			source : me
		} ]);
	}
	require([ "base/core/template/default/flowtemplate/funcManager" ],
			function(FuncManager) {
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
				me.formUIToolbar = new butone.UIComponentToolBar(
						"formUIPluginBar");
				me.uiToolbar = new butone.UIComponentToolBar("uiPluginBar");
				me.uiToolbar.hide();
				$("#bizOperationBar").hide();
				if (justep.Context.isReadonlyMode()) {
					$("#btnSave").hide();
				} else {
					butone.defer(me.uiToolbar.init, 0, me.uiToolbar,
							[ me.uiPlugins ]);
				}
				// 初始化业务操作
				me.initBizOperation();
				// 初始化关注按钮
				me.initAttention();
			});
};

businessActivityTemplate.modelUnLoad = function(event) {
	this.funcManager.destroy();
};

businessActivityTemplate.processBeforeCreateDialog = function(event) {
	return butone.BizOperation.getBizOperationDialogUrl(event);
};

businessActivityTemplate.initBizOperation = function() {
	if (!justep.Context.getTask()) {
		return;
	}
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
			if (me.checkEvent("onBeforeCreateBizOperation")) {
				me.callEvent("onBeforeCreateBizOperation", [ me ]);
			}
			me.createBizOperationComponent(bizOperations);
		} else {
			butone.Dialog.error("查询案卷操作失败", callbackData.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);

};

businessActivityTemplate.createBizOperationComponent = function(bizOperations) {
	var me = this, uiPlugins = [], mb_fzcbj = {
		"declaredClass" : "base/plugins/MenuButton",
		"id" : "mb_fzcbj",
		"label" : "非正常办结",
		"items" : []
	}, bizOperationDefine = butone.BizOperation.getBizOperationDefine();

	var idx = justep.Array.indexOf(bizOperations, "finish");
	if (idx >= 0) {
		bizOperations[idx] = "advance";
		bizOperationDefine["advance"].label = "办结";
	}

	var process = justep.xbl("process");
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

		if (me.checkEvent("getBizOperationLabel")) {
			var label = me.callEvent("getBizOperationLabel", [ action,
					def.label ]);
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
		item.onClick = $.proxy(function() {
			me.executeBizOperation(this.operation);
		}, item);
		if (action.match("abort|untread|delete")) {
			mb_fzcbj.items.push(item);
		} else {
			uiPlugins.push(item);
		}
	}
	if (mb_fzcbj.items.length > 0)
		uiPlugins.push(mb_fzcbj);
	var bar = $("ul", "#bizOperationBar");
	bar.empty();
	if (bizOperations && bizOperations.length > 0) {
		$("#bizOperationBar").show();
	}
	require(
			[ "base/plugins/Trigger", "base/plugins/MenuButton" ],
			function(Trigger, MenuButton) {

				for ( var n in uiPlugins) {
					var uiPlugin = uiPlugins[n];
					var $node, instance;
					if (uiPlugin.declaredClass == "base/plugins/MenuButton") {
						instance = new MenuButton(null, uiPlugin);
					} else {
						instance = new Trigger(null, uiPlugin);
					}
					var $node = $(instance.domNode);
					var $li = $("<li></li>");
					$li.append($node);
					bar.append($li);
					bar
							.append("<li class='space nosep' style='margin: 0 4px;'>|</li>");
				}
				// IE8下按钮会乱掉，会跑到工具栏的下一行， 再找原因，乱改样式导致
			}, function(err) {
				butone.Dialog.error("加载业务操作组件失败", err);
			});

};

/**
 * 打印按钮
 */
businessActivityTemplate.btnPrintClick = function(event) {
	if (butone.Context.frameForm.currentForm) {
		var win = butone.Context.frameForm.currentForm.contentWindow;
		var htmlPrint = win.butone.HtmlPrint;
		htmlPrint.executePrintout([ "rootView" ], null, false, true, {
			popTitle : butone.Context.frameForm.currentForm.formDoc.name
		});
	}
};

/**
 * 执行业务操作
 */
businessActivityTemplate.executeBizOperation = function(operation) {
	var me = this;
	butone.Context.frameForm.saveDatas().done(function() {
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
	// 没意义，保存是异步的... butone.Context.frameForm.saveDatas();
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
	// location.href = location.href + "&task=" + justep.Context.getTask();
};

businessActivityTemplate.btnRefreshClick = function(event) {
	butone.Context.frameForm.refreshData();
};

businessActivityTemplate.btnBackClick = function(event) {
	justep.Portal.closeWindow(justep.Portal.getWindowId());
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
	businessActivityTemplate.initBizOperation();
};
/**
 * 取消办理后，刷新当前页
 */
businessActivityTemplate.processAfterRevokePreempt = function(event) {
	// window.location.reload();
	businessActivityTemplate.initBizOperation();
};

businessActivityTemplate.afterProcessOperationCommit = function(event) {
	var data = {
		source : butone.Context.frameForm,
		kind : "refreshTaskCenter"
	};
	justep.xbl("funcReceiver").sendData(data);
};

businessActivityTemplate.btnBackReasonClick = function(event) {
	butone.Window.dialog("sys", "/UI/base/core/flowOperation/preIdeaDialog.w",
			"上阶段意见", {
				id : justep.Context.getTask()
			}, true, null, 550, 300);
};

businessActivityTemplate.btnFavoriteClick = function(event) {
	var bizRecData = justep.xbl("BizRec");
	var options = {};
	options.fBizRecId = bizRecData.getValue("fBizRecId");
	options.fTaskID = justep.Context.getTask();
	options.fTitle = bizRecData.getValue("fRecTitle");
	butoneEx && butoneEx.BizRec && butoneEx.BizRec.openFavoriteDialog(options);
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
			var btn = justep.xbl("btnAttention");
			if (callbackData.response == "true") {
				btn.setLabel("取消关注");
			} else if (callbackData.response == "false") {
				btn.setLabel("关注案卷");
			} else {
				btn.setVisible(false);
			}
		}
	};
	justep.Request.sendBizRequest2(options);
};

businessActivityTemplate.btnAttentionClick = function(event) {
	var bizRecData = justep.xbl("BizRec");
	var param = new justep.Request.ActionParam();
	param.setString('bizRecId', bizRecData.getID());
	var options = {};
	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "updateAttentionStatusAction";
	options.callback = function(callbackData) {
		callbackData.ignoreError = false;
		if (callbackData.state) {
			var btn = justep.xbl("btnAttention");
			if (btn.getLabel() == "取消关注")
				btn.setLabel("关注案卷");
			else
				btn.setLabel("取消关注");
		}
	};
	justep.Request.sendBizRequest2(options);
};

if (typeof (dhtmlxEventable) != 'undefined')
	dhtmlxEventable(businessActivityTemplate);
else if (typeof (justep.Utils.eventable) != 'undefined')
	justep.Utils.eventable(businessActivityTemplate);
