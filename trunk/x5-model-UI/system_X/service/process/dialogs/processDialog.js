var processDialog = {};

// 动态计算布局
processDialog.refreshLayout = function() {
	if (processDialog.inputData == null) {
		// $("#rootView").hide();
		return;
	}
	$("#rootView").show();
	var exts = processDialog.inputData.processControl.getExts();
	var stop = false;
	var msg = "";
	if (exts && exts.rules) {
		for ( var i = 0; i < exts.rules.length; i++) {
			var extRule = exts.rules[i];
			if (!stop)
				stop = extRule.stop; 
			msg += extRule.message + "\n";
		}
		// 如果是禁止规则 ,确认按钮置灰
		justep.xbl("btnExecute").setDisabled(stop);
		$("#textareaContent").html(msg);
	}else{
		justep.xbl("btnExecute").setDisabled(false);
	} 

	// 判断消息提示区域是否显示
	var action = processDialog.inputData.action;
	var messageHeight = 0;
	var message = processDialog.inputData.processControl.getMessage(action);
 
	if (message) {
		$("#labelMsg").text(message);
		$("#divMessage").show();
		messageHeight = $("#divMessage").outerHeight(true);
	} else {
		$("#divMessage").hide();
	}

	// 判读通知区域是否显示 (不显示通知规则)
	var noticesHeight = 0;
	if (false && processDialog.inputData.processControl.getNoticeItems().length > 0) {
		$("#divNotices").show();
		$("#gridNotices").height("100%");
		noticesHeight = $("#divNotices").outerHeight(true);
	} else {
		$("#divNotices").hide();
	}

	// 判断环节区域是否显示
	var activitiesHeight = 0;
	if (processDialog.inputData.processControl.getToItems().length > 0 && !stop) {
		$("#divActivities").show();
		if(action=="backQuery")
			$("#divActivities").height(225);
		else if (msg == "") {
			$("#divActivities").height(
					$(window).height() - messageHeight - noticesHeight
							- $("#divBottom").outerHeight(true) - 8);
		} else {
			$("#divActivities").height(225);
		}
		activitiesHeight = $("#divActivities").outerHeight(true);
		$("#gridActivities").height(activitiesHeight - 12);

	} else {
		$("#divActivities").hide();
	}


	// 计算内容区域高度
	if(action=="backQuery" || msg > ""){
		var contentHeight = $(window).height() - messageHeight
				- activitiesHeight - noticesHeight
				- $("#divBottom").outerHeight(true) - 8;
		$("#divContent").height(contentHeight);
		$("#textareaContent").height(
				contentHeight - $("#divContentTop").outerHeight(true) - 2);
		$("#textareaContent").width($("#divContent").width() - 22);
		$("#divContent").show();
		if(action=="backQuery")
			$("#label4").text("附言");
//		else
//			$("#textareaContent").text("");
	}else{
		$("#divContent").hide();
	}

};

$(window).resize(processDialog.refreshLayout);

processDialog.modelXBLLoaded = function(event) {
	processDialog.refreshLayout();
};

/*******************************************************************************
 * 对话框入口 入参格式 { action: 流程动作 task: 任务ID processControl: processControl }
 ******************************************************************************/
processDialog.inputData = null;
processDialog.windowReceiverReceive = function(event) {
	justep.xbl("wdSelectExecutors").close();
	justep.xbl("wdAdvancedOptionOfTo").close();
	justep.xbl("wdAdvancedOptionOfNotice").close();

	processDialog.inputData = event.data;
	processDialog.inputData.processControl = new justep.ProcessControl();
	processDialog.inputData.processControl
			.loadFromJson(processDialog.inputData.data);

	// 初始化环节数据
	var dActivities = justep.xbl("dActivities");
	var activitiesRows = justep.ProcessDialog.Utils
			.activitiesToRows(processDialog.inputData.processControl
					.getActivities());
	dActivities.loadJson(activitiesRows);

	// 初始化通知数据
	var dNotices = justep.xbl("dNotices");
	var noticesRows = justep.ProcessDialog.Utils
			.noticeItemsToRows(processDialog.inputData.processControl
					.getNoticeItems());
	dNotices.loadJson(noticesRows);

	// 初始化任务数据
	var dTask = justep.xbl("dTask");
	dTask.setFilter("idFilter", "SA_Task = '" + processDialog.inputData.task
			+ "'");
	dTask.refreshData();

	// 刷新布局
	processDialog.refreshLayout();

	// 初始化选中
	var gridActivities = justep.xbl("gridActivities").grid;
	if (gridActivities.getRowsNum() > 0) {
		processDialog.setActivityCheckStatus(gridActivities, gridActivities
				.getRowId(0), true, true, true, true);
	}
	processDialog.refreshNoticesFilter();
};

// 选择执行者
processDialog.selectExecutors = function(type, itemID) {
	var item = null;
	if (type == "to") {
		item = processDialog.inputData.processControl.getToItemByID(itemID);
	} else if (type == "notice") {
		item = processDialog.inputData.processControl.getNoticeItemByID(itemID);
	}
	if (item != null && !item.isEnd()) {
		justep.xbl("wdSelectExecutors").open({
			type : type,
			itemID : itemID,
			range : item.getExecutorRange(),
			selected : item.getExecutors(),
			orgKinds : item.getExecutorKinds().replace(/ /g, ","),
			cascade : true
		});
	}
};

// 执行者对话框返回
processDialog.wdSelectExecutorsReceive = function(event) {
	var data = null;
	var item = null;
	if (event.data.type == "to") {
		item = processDialog.inputData.processControl
				.getToItemByID(event.data.itemID);
		data = justep.xbl("dActivities");
	} else if (event.data.type == "notice") {
		item = processDialog.inputData.processControl
				.getNoticeItemByID(event.data.itemID);
		data = justep.xbl("dNotices");
	}
	item.clearExecutors();
	for ( var i = 0; i < event.data.selected.length; i++) {
		item.addExecutor(event.data.selected[i].fid,
				event.data.selected[i].fname,
				event.data.selected[i].responsible);
	}
	var names = justep.ProcessDialog.Utils
			.getOrgUnitsNames(item.getExecutors());
	data.setValue("executorNames", names, event.data.itemID);

	// 依据是否选择执行者，重置选中状态
	if (event.data.type == "to") {
		var gridActivities = justep.xbl("gridActivities").grid;
		processDialog.setActivityCheckStatus(gridActivities, event.data.itemID,
				names != "", true, true, false);
	} else {
		data.setValue("check", names == "" ? 0 : 1, event.data.itemID);
	}

};

// 取消退出
processDialog.btnExitClick = function(event) {
	xforms.blur(true);
	if (!justep.xbl("dTask").saveData()) {
		return;
	}

	justep.xbl("windowReceiver").windowCancel();
};

// 确定
processDialog.btnExecuteClick = function(event) {
	xforms.blur(true);
	if (!justep.xbl("dTask").saveData()) {
		return;
	}

	if (processDialog.inputData.processControl.getToItems().length > 0) {
		// 设置选中的toItems
		var toItemIDs = [];
		var gridActivities = justep.xbl("gridActivities").grid;
		for ( var i = 0; i < gridActivities.getRowsNum(); i++) {
			var id = gridActivities.getRowId(i);
			var name = gridActivities.getValueByName("name", i);
			var label = gridActivities.getValueByName("label", i);
			if (name != "xor" && name != "and"
					&& gridActivities.isCheckedRow_treegrid(id)) {
				var toItem = processDialog.inputData.processControl
						.getToItemByID(id);
				if (!toItem.isEnd() && toItem.getExecutors().length == 0) {
					alert("请选择环节[" + label + "]的办理人！");
					return;
				}
				toItemIDs.push(id);
			}
		}
		if (toItemIDs.length == 0) {
			alert("至少要选择一个后续环节！");
			return;
		}
		processDialog.inputData.processControl.setSelectedToItems(toItemIDs);
	}

	if (processDialog.inputData.processControl.getNoticeItems().length > 0) {
		// 设置选中的noticeItems
		var noticeItemIDs = [];
		var gridNotices = justep.xbl("gridNotices").grid;
		for ( var i = 0; i < gridNotices.getRowsNum(); i++) {
			var id = gridNotices.getRowId(i);
			var name = gridNotices.getValueByName("name", i);
			if (gridNotices.getValueByName("check", i) == 1) {
				var noticeItem = processDialog.inputData.processControl
						.getNoticeItemByID(id);
				if (noticeItem.getExecutors().length == 0) {
					alert("请选择通知[" + name + "]的接收人！");
					return;
				}
				noticeItemIDs.push(id);
			}
		}
		processDialog.inputData.processControl
				.setSelectedNoticeItems(noticeItemIDs);
	}

	var result = {
		"options" : processDialog.inputData.options,
		"action" : processDialog.inputData.action,
		"task" : processDialog.inputData.task,
		"data" : processDialog.inputData.processControl.getData()
	};
	justep.xbl("windowReceiver").windowEnsure(result);
};

// 设置to高级选项
processDialog.setAdvancedOptionOfTo = function(activityID) {
	var toItem = processDialog.inputData.processControl
			.getToItemByID(activityID);
	if (toItem != null && !toItem.isEnd()) {
		justep.xbl("wdAdvancedOptionOfTo").open({
			action : processDialog.inputData.action,
			toItem : toItem
		});
	}
};

// 设置notice高级选项
processDialog.setAdvancedOptionOfNotice = function(noticeID) {
	var noticeItem = processDialog.inputData.processControl
			.getNoticeItemByID(noticeID);
	justep.xbl("wdAdvancedOptionOfNotice").open({
		noticeItem : noticeItem
	});
};

// 显示环节图标
processDialog.gridActivitiesShowNodeImg = function(event) {
	var instance = event.instance;
	var name = instance.getValue("name", event.rowID);
	if (name == "and") {
		return "/UI/system/images/process/processdata_item_check.gif";
	} else if (name == "xor") {
		return "/UI/system/images/process/processdata_item_radio.gif";
	} else {
		var isOptional = instance.getValue("isOptional", event.rowID);
		if (isOptional) {
			return "/UI/system/images/process/processdata_activity_optional.gif";
		} else {
			return "/UI/system/images/process/processdata_activity.gif";
		}
	}
};

// 显示环节选项链接
processDialog.gridActivities_advancedOptionRender = function(event) {
	var activityID = event.rowId;
	var toItem = processDialog.inputData.processControl
			.getToItemByID(activityID);
	if (toItem != null && !toItem.isEnd()) {
		return "<label class='link' onclick='processDialog.setAdvancedOptionOfTo(\""
				+ activityID + "\")'>高级选项</label>";
	}
};

// 显示环节执行者链接
processDialog.gridActivities_executorNamesRender = function(event) {
	var itemID = event.rowId;
	var executorNames = event.value;
	var checked = event.source.isCheckedRow_treegrid(event.rowId);
	var toItem = processDialog.inputData.processControl.getToItemByID(itemID);
	if (toItem != null && !toItem.isEnd()) {
		if (executorNames == "") {
			return "<label class='link"
					+ (checked ? "" : "_no")
					+ "_checked' onclick='processDialog.selectExecutors(\"to\", \""
					+ itemID + "\")'>选择办理人</label>";
		} else {
			return "<label class='link"
					+ (checked ? "" : "_no")
					+ "_checked' onclick='processDialog.selectExecutors(\"to\", \""
					+ itemID + "\")'>" + executorNames + "</label>";
		}
	}
};

// 显示通知选项链接
processDialog.gridNotices_advancedOptionRender = function(event) {
	var noticeID = event.rowId;
	var noticeItem = processDialog.inputData.processControl
			.getNoticeItemByID(noticeID);
	return "<label class='link' onclick='processDialog.setAdvancedOptionOfNotice(\""
			+ noticeID + "\")'>高级选项</label>";
};

// 显示通知执行者链接
processDialog.gridNotices_executorNamesRender = function(event) {
	var itemID = event.rowId;
	var checked = (event.cell.getValueByColId("check") == 1);
	if (event.value == "") {
		return "<label class='link"
				+ (checked ? "" : "_no")
				+ "_checked' onclick='processDialog.selectExecutors(\"notice\", \""
				+ itemID + "\")'>选择接收人</label>";
	} else {
		return "<label class='link"
				+ (checked ? "" : "_no")
				+ "_checked' onclick='processDialog.selectExecutors(\"notice\", \""
				+ itemID + "\")'>" + event.value + "</label>";
	}
};

// 环节选中
processDialog.refreshNoticesFilter = function() {
	var gridNotices = justep.xbl("gridNotices").grid;
	gridNotices.filterBy(0, function(data) {
		var gridActivities = justep.xbl("gridActivities").grid;
		for ( var i = 0; i < gridActivities.getRowsNum(); i++) {
			if (data == gridActivities.getValueByName("name", i)) {
				return gridActivities.isCheckedRow_treegrid(gridActivities
						.getRowId(i));
			}
		}
		return true;
	});
	for ( var i = 0; i < gridNotices.getRowsNum(); i++) {
		gridNotices.setValueByName("check", true, i);
	}
};

// 环节选中事件
processDialog.gridActivitiesRowChecked = function(event) {
	processDialog.setActivityCheckStatus(event.grid, event.rowID,
			event.checked, true, true, true);
	processDialog.refreshNoticesFilter();
};

// 设置环节选择
processDialog.setActivityCheckStatus = function(grid, selfID, checked, up,
		down, forced) {
	if (forced || grid.isCheckedRow_treegrid(selfID) != checked) {
		// 设置自身
		grid.setItemChecked_treegrid(selfID, checked, false);
		grid.setValueById(selfID, "executorNames", grid.getValueById(selfID,
				"executorNames"));
		if (down) {
			// 向下递归
			processDialog.setActivityChildrenCheckStatus(grid, selfID, checked);
		}
		if (up) {
			// 向上递归，并处理同级节点
			processDialog.setActivityParentCheckStatus(grid, selfID, checked);
		}
	}
};

// 向上递归，并处理同级节点
processDialog.setActivityParentCheckStatus = function(grid, selfID, checked) {
	var parentID = grid.getParentId(selfID);
	// 没有父退出递归
	if (parentID == 0) {
		return;
	}
	var parentName = grid.getValueById(parentID, "name");
	var parentChecked = grid.isCheckedRow_treegrid(parentID);
	// 同级节点
	var subIDs = grid.getSubItems(parentID).split(",");

	// 针对可选节点并且父是and时的特殊处理
	var isOptional = grid.getValueById(selfID, "isOptional");
	if (isOptional && (parentName == "and")) {
		if (checked && parentChecked) {
			// 可选节点被选中，父已被选中，退出不做其它处理
			return;
		} else if (!checked) {
			// 可选节点被取消，但同级节点中存在选中，退出不做其它处理
			for ( var i = 0; i < subIDs.length; i++) {
				if (grid.isCheckedRow_treegrid(subIDs[i])) {
					return;
				}
			}
		}
	}

	// 依据父的类型，处理同级节点
	if (parentName == "and") {
		// 父是and，所有自身以外的同级状态=自身状态
		for ( var i = 0; i < subIDs.length; i++) {
			var subID = subIDs[i];
			if (subID != selfID) {
				processDialog.setActivityCheckStatus(grid, subID, checked,
						false, true, false);
			}
		}
	} else if (parentName == "xor" && checked) {
		// 父是xor并且选中，取消自身以外的同级
		for ( var i = 0; i < subIDs.length; i++) {
			var subID = subIDs[i];
			if (subID != selfID) {
				processDialog.setActivityCheckStatus(grid, subID, false, false,
						true, false);
			}
		}
	}

	// 向上递归
	processDialog.setActivityCheckStatus(grid, parentID, checked, true, false,
			false);
};

// 向下递归
processDialog.setActivityChildrenCheckStatus = function(grid, selfID, checked) {
	var subIDs = grid.getSubItems(selfID).split(",");
	var name = grid.getValueById(selfID, "name");
	if (name == "and") {
		// 当前是and，下级状态=当前状态
		for ( var i = 0; i < subIDs.length; i++) {
			var subID = subIDs[i];
			processDialog.setActivityCheckStatus(grid, subID, checked, false,
					true, false);
		}
	} else if (name == "xor") {
		// 当前是xor，如果选中，选中下级第一个；如果取消，下级全部取消
		if (checked) {
			processDialog.setActivityCheckStatus(grid, subIDs[0], checked,
					false, true, false);
		} else {
			for ( var i = 0; i < subIDs.length; i++) {
				var subID = subIDs[i];
				processDialog.setActivityCheckStatus(grid, subID, checked,
						false, true, false);
			}
		}
	}
};

// 通知选择刷新执行者显示
processDialog.dNoticesValueChanged = function(event) {
	if (event.column == "check") {
		var gridNotices = justep.xbl("gridNotices").grid;
		gridNotices.setValueById(event.rowID, "executorNames", gridNotices
				.getValueById(event.rowID, "executorNames"));
	}
};
