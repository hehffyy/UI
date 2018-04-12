var businessActivityTemplate = {};

businessActivityTemplate.modelLoad = function(event) {
	var me = this;
	if (me.checkEvent("onLoad")) {
		me.callEvent("onLoad", [ {
			source : me
		} ]);
	}

	me.attachEvent("onFormInitFinish", function() {
		$("#floatToolbars").show();
	});

	require([ "base/core/template/simple2/flowtemplate/funcManager" ],
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
				$("#floatToolbars").css({
					top : "5px",
					right : "35px",
					width : "120px"
				}).panel({
					anchor : [ "R" ],
					title : "操作栏",
					enableDrag : true,
					enableExpand : false
				}).hide();
				// 初始化业务操作
				me.initBizOperation();
				// 初始化关注按钮
				me.initAttention();
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
businessActivityTemplate.initBizOperation = function(showBanLiDialog) {
	var bar = $(".bizOperationBar", "#floatToolbars");
	/*bar
			.find("li.save")
			.css(
					"display",
					justep.Context.isReadonlyMode() || justep.Context.getTask() ? "none"
							: "block");*/
	bar.find("li.save").show();
	if (!justep.Context.getTask()) {
		bar.find("li.banLi").hide();
		bar.find("li.showChart").hide();
		bar.find("li.backReason").hide();
		bar.find("li.shouCang").hide();
		bar.find("li.attention").hide();
		return;
	} else {
		if (justep.Context.isReadonlyMode()) {
			bar.find("li.save").hide();
			bar.find("li.banLi").hide();
		} else {
			bar.find("li.save").show();
			bar.find("li.banLi").show();
			bar.find("li.showChart").show();
			bar.find("li.backReason").show();
			bar.find("li.shouCang").show();
			bar.find("li.attention").show();
		}
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
			me.createBizOperationComponent(bizOperations);
			if(!!showBanLiDialog && showBanLiDialog)
				businessActivityTemplate.showBanLiDialog();
		} else {
			butone.Dialog.error("查询案卷操作失败", callbackData.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

businessActivityTemplate.createBizOperationComponent = function(bizOperations) {
	var bar = $(".bizOperationBar", "#floatToolbars");
	bar.find("li").not(".sys").remove();

	// 修正业务操作
	var me = this, bizOperationDefine = butone.BizOperation
			.getBizOperationDefine();

	var idx = justep.Array.indexOf(bizOperations, "finish");
	if (idx >= 0) {
		bizOperations[idx] = "advance";
		bizOperationDefine["advance"].label = "办　　结";
	}

	var menuMore = {
		"declaredClass" : "base/plugins/MenuButton",
		"iconClass" : "icon-system-menu",
		"id" : "menuMore",
		"label" : "更多操作",
		"items" : []
	};
	var process = justep.xbl("process");
	me.allowBizOperations = [];
	for ( var n in bizOperations) {
		var operation = bizOperations[n], def, orgiOperation = operation;
		if (operation.indexOf(":") > 0) {
			orgiOperation = operation.substring(0, operation.indexOf(":"));
			def = $.extend({}, bizOperationDefine[orgiOperation]);
			def.label = operation.substring(operation.indexOf(":") + 1);
			process.defineSpecialTransferOperation(operation, def.label);
		} else {
			def = bizOperationDefine[operation];
		}
		def.operation = operation;

		if (me.checkEvent("getBizOperationLabel")) {
			var label = me.callEvent("getBizOperationLabel", [ operation,
					def.label ]);
			if (label) {
				def.label = label;
			}
		} else if ("advance" == operation) {
			if (justep.Array.contain(bizOperations, "finish"))
				def.label = "办　　结";
		}
		me.allowBizOperations.push(operation);
		if (!orgiOperation.match("advance|transfer|preempt|revokePreempt")) {
			var item = $.extend({
				id : "bizOpt_" + operation,
				operation : operation,
				appearance : "image-text"
			}, def);
			item.onClick = $.proxy(function() {
				me.executeBizOperation(this.operation);
			}, item);
			menuMore.items.push(item);
		}
	}
	if (me.needPreempt) {
		justep.xbl("btnBanLi").setLabel("办　　理");
	} else {
		justep.xbl("btnBanLi").setLabel("办　　理");
	}
	// 撤销签收
	justep.Array.contain(bizOperations, "revokePreempt") ? bar.find(
			"li.revokePreempt").show() : bar.find("li.revokePreempt").hide();

	var uiPlugins = menuMore.items.length === 0 ? me.uiPlugins : [ menuMore ]
			.concat(me.uiPlugins || []);
	// 创建环节ui组件
	if (uiPlugins.length > 0) {
		require(
				[ "base/plugins/Trigger", "base/plugins/MenuButton" ],
				function(Trigger, MenuButton) {
					var $node, instance, $li;

//					var onClick = function(event) {
//						var $el = this.$el, $i = $el.find("i"), b = $i
//								.hasClass("icon-system-angle-double-down");
//						if (b) {
//							$i.removeClass("icon-system-angle-double-down")
//									.addClass("icon-system-angle-double-up");
//							$el.parents("li:eq(0)").nextAll().show();
//						} else {
//							$i.removeClass("icon-system-angle-double-up")
//									.addClass("icon-system-angle-double-down");
//							$el.parents("li:eq(0)").nextAll().hide();
//						}
//					};
//
//					// 创建展开按钮
//					instance = new Trigger(null, {
//						appearance : "image-minimal",
//						iconClass : "icon-system-angle-double-down",
//						onClick : onClick
//					});
//					$node = $(instance.domNode).removeClass("xui-button").css(
//							"width", "100%");
//					$li = $("<li><div/></li>");
//					$li.find("div").append($node);
//					$li.insertAfter(bar.find("li.sys:last"));
//					$li.nextAll().hide();

					// 创建环节ui组件
					for ( var n in uiPlugins) {
						var uiPlugin = uiPlugins[n];
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
	//没意义，保存异步 butone.Context.frameForm.saveDatas();
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
	debugger;
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
			var btn = justep.xbl("btnAttention");
			if (btn.getLabel() == "取消关注")
				btn.setLabel("关注案卷");
			else
				btn.setLabel("取消关注");
		}
	};
	justep.Request.sendBizRequest2(options);
};

businessActivityTemplate.btnBackReasonClick = function(event){
	butone.Window.dialog("sys", "/UI/base/core/flowOperation/preIdeaDialog.w",
			"上阶段意见", {
				id : justep.Context.getTask()
			}, true, null, 550, 300);
};

businessActivityTemplate.btnShouCangClick = function(event) {
	var bizRecData = justep.xbl("BizRec");
	var options = {};
	options.fBizRecId = bizRecData.getValue("fBizRecId");
	options.fTaskID = justep.Context.getTask();
	options.fTitle = bizRecData.getValue("fRecTitle");;
	butoneEx && butoneEx.BizRec && butoneEx.BizRec.openFavoriteDialog(options);
};

businessActivityTemplate.btnShowChartClick = function(event){
	var bizRecData = justep.xbl("BizRec");
	var fBizRecId = bizRecData.getValue("fBizRecId")
	var taskID = justep.Context.getTask();
	butone.Window.run("/UI/SA/task/taskCenter/banLiGuoCheng.w?pi=" + bizRecData.getValue("fFlowId")+"&task="+taskID+"&bizRecID="+fBizRecId,"办理过程");
};

businessActivityTemplate.showBanLiDialog = function() {
	var me = this;
	require(
			[ "base/components/knockout/windowDialog" ],
			function(WindowDialog) {
				if (!me._banLiDlg) {
					me._banLiDlg = new WindowDialog({
						id : "_BanLiDlg",
						parentNode : $("#rootView")[0],
						showTitle : true,
						width:"850px",
						height:"450px"
					});
					me._banLiDlg.init();
				}
				//
				var param = {
					task : justep.Context.getTask(),
					bizRecId : justep.Context.getProcessData1(),
					form : butone.Context.frameForm.currentForm,
					allForms : me.funcManager.getAllForms(),
					visibleForms : me.funcManager.queryVisibleForms(false),
					bizOperations : me.allowBizOperations,
					process : justep.xbl("process")
				};
				me._banLiDlg
						.open(param, "办　　理",
								"/UI/base/core/template/simple2/flowtemplate/banLiDialog.w");
			});
};

businessActivityTemplate.btnBanLiClick = function(event) {
	if (businessActivityTemplate.needPreempt) {
		justep.xbl("process").getOperation("preempt").execute();
	} else {
		butone.Context.frameForm.saveDatas().done(function() {
			businessActivityTemplate.showBanLiDialog();
		});
	}
};

if (typeof (dhtmlxEventable) != 'undefined')
	dhtmlxEventable(businessActivityTemplate);
else if (typeof (justep.Utils.eventable) != 'undefined')
	justep.Utils.eventable(businessActivityTemplate);