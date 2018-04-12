var mainActivity = {};

mainActivity.groupType = "案卷中心";

mainActivity.trgSelectProcessClick = function(event) {
	justep.xbl('dlgSelectProcess').open();
};

mainActivity.dlgSelectProcessReceive = function(event) {
	var funcData = justep.xbl("funcData");
	var data = event.data;
	for ( var n in data) {
		var row = data[n];
		if (funcData.find([ "fProcess" ], [ row.fProcess ]).length == 0) {
			funcData.newData({
				defaultValues : [ row ]
			});
		}
	}
};

mainActivity.trgSelectFieldClick = function(event) {
	var groupData = justep.xbl("groupData");
	groupData.saveData();
	var data = {
		"fBusinessGroupId" : groupData.getCurrentID(),
		"queryType":"unionType"
	};
	justep.xbl('dlgSelectField').open(data);

};

mainActivity.grid1_operationRender = function(event) {
	if(mainActivity.groupType == "案卷查询")
		return "<div rowID='"
			+ event.rowID
			+ "'><a href='#' onclick='mainActivity.showGroupDataPermission(event);'>权限</a><a href='#' style='margin-left:5px' onclick='mainActivity.reloadGroupDefine(event);'>重载</a></div>";
	else
		return "<div rowID='"
		+ event.rowID
		+ "'><a href='#' style='margin-left:5px' onclick='mainActivity.reloadGroupDefine(event);'>重载</a></div>";
};

mainActivity.showGroupDataPermission = function(event) {
	var target = event.srcElement || event.target, groupId = $(target).parent()
			.attr("rowID");
	justep
			.xbl("wdDataPermission")
			.open2(
					{
						url : "/UI/common/archives/process/groupdefine/groupDataPermission.w?groupID="
								+ groupId
					});
};

mainActivity.reloadGroupDefine = function(event) {
	var target = event.srcElement || event.target, groupId = $(target).parent().attr(
			"rowID");
	var groupData = justep.xbl("groupData");
	var fGroupType = groupData.getValue("fGroupType", groupId);
	var params = new justep.Request.ActionParam();
	params.setString("groupId", groupId);
	params.setString("type", fGroupType);
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "reloadTaskCenterBizGroupAction",
		parameters : params,
		callback : function(callbackData) {
			if (callbackData.state) {
				alert("完成");
			} else {
				alert(callbackData.response.message);
			}
		}
	});
};

mainActivity.trgInitSysClick = function(event) {
	var groupData = justep.xbl("groupData");
	groupData.saveData();
	var data = {
		fBusinessGroupId : groupData.getCurrentID(),
		type : mainActivity.groupType,
		sysField : true
	};
	justep.xbl('dlgSelectField').open(data);
};

mainActivity.dlgSelectProcessInit = function(event) {
	event.source.dialog.setWidth($(window).width() * 0.8);
	event.source.dialog.setHeight($(window).height() * 0.95);
};

mainActivity.dlgSelectFieldInit = function(event) {
	event.source.dialog.setWidth($(window).width() * 0.8);
	event.source.dialog.setHeight($(window).height() * 0.95);
};

mainActivity.groupDataRefreshCreateParam = function(event) {
	var variables = event.param.getParam("variables");
	variables.put("groupType", new justep.Request.SimpleParam(
			mainActivity.groupType, justep.XML.Namespaces.XMLSCHEMA_STRING));
};

mainActivity.groupDataNewCreateParam = function(event) {
	event.defaultValues = [ {
		fGroupType : mainActivity.groupType,
		fGroupOrder : event.source.getCount() + 1
	} ];
};

mainActivity.trigger2Click = function(event){
	justep.xbl('dlgSelectProcess2').open();
}
mainActivity.dlgSelectProcessReceive2 = function(event) {
	var groupData = justep.xbl("groupData");
	var processes = new justep.Request.ListParam();
	var activities = new justep.Request.ListParam();
	var activitiesFNames = new justep.Request.ListParam();
	var funcData=justep.xbl("funcData");
	for ( var i = 0; i < event.data.getRowsNum(); i++) {
		var process = event.data.getValueByName("process", i);
		//
		if (funcData.find([ "fProcess" ], [ process ]).length > 0) {
			//若已选择过的流程业务，则跳过
			continue;
		}
		var activity = event.data.getValueByName("activity", i);
		var activityFName = event.data.getValueByName("activityFName", i);
		processes.add(new justep.Request.SimpleParam(process,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		activities.add(new justep.Request.SimpleParam(activity,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		activitiesFNames.add(new justep.Request.SimpleParam(activityFName,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
	}
	var params = new justep.Request.ActionParam();
	params.setList("processes", processes);
	params.setList("activitiesFNames", activitiesFNames);
	params.setString("fBusinessGroupId", groupData.getCurrentID());

	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "setTreeFucnAction",
		parameters : params,
		callback : function(callbackData) {
			if (callbackData.state) {
				var funcData = justep.xbl("funcData");
				funcData.refreshData();
			} else {
				throw new Error(callbackData.response.message
						+ ",请检查所选业务是否生成资源");
			}
		}
	});

};

mainActivity.trgSelectFieldV2Click = function(event){
	var groupData = justep.xbl("groupData");
	groupData.saveData();
	var data = {
		"fBusinessGroupId" : groupData.getCurrentID(),
		"queryType":"commonType"
	};
	justep.xbl('dlgSelectField').open(data);
};
