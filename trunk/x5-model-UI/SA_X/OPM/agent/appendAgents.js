var appendAgents = {};
appendAgents.receiverReceive = function(event) {
	var dPersonMembers = justep.xbl("dPersonMembers");
	dPersonMembers.refreshData();
	var dCurrentAgents = justep.xbl("dCurrentAgents");
	dCurrentAgents.refreshData();
	if (dCurrentAgents.getCount() == 0) {
		$("#divCurrentAgents").hide();
		$("#divPersonMembers").height("100%");
		justep.xbl("gridPersonMembers").onWindowResize();
	} else {
		$("#divCurrentAgents").show();
		$("#divPersonMembers").height("60%");
		justep.xbl("gridPersonMembers").onWindowResize();
	}
	var dTemp = justep.xbl("dTemp");
	dTemp.setValue("agentPersonID", null);
	dTemp.setValue("agentPersonName", null);
	dTemp.setValue("startTime", justep.System.datetimeString());
	dTemp.setValue("finishTime", null);
	dTemp.setValue("canTranAgent", null);
};
appendAgents.btnSelectAgentPersonClick = function(event) {
	//修改代理只能选择当前机构下的人员成员（主要为了市局和分局集中部署的需求 ）,之前代理这里是没有控制，可以选择任何成员
	justep.xbl("wdSelectAgentPerson").open({
		"filter": "(SA_OPOrg.sOrgKindID <> 'psm' or SA_OPOrg.sPersonID <> :operatorID()) and SA_OPOrg.sFCode like '"+justep.Context.getCurrentOgnFCode()+"%'",			
		"rootFilter": "SA_OPOrg.sFCode ='"+justep.Context.getCurrentOgnFCode()+"'",			//sParent is null
		"manageCodes": "",			
		"orgKinds": "psm",			
		"includeDisabledOrg": false			
	});
};
appendAgents.wdSelectAgentPersonReceive = function(event) {
	var dTemp = justep.xbl("dTemp");
	dTemp.setValue("agentPersonID", event.data[0]["sPersonID"]);
	dTemp.setValue("agentPersonName", event.data[0]["sName"]);
};
appendAgents.btnCancelClick = function(event) {
	justep.windowDialogReceiver.windowCancel();
};
appendAgents.btnOKClick = function(event) {
	xforms.blur(true);

	var dTemp = justep.xbl("dTemp");
	var agentPersonID = dTemp.getValue("agentPersonID");
	if (!agentPersonID) {
		justep.OpmUtils.showWarning("请选择代理人！");
		return;
	}
	var startTime = dTemp.getValue("startTime");
	var finishTime = dTemp.getValue("finishTime");
	if (startTime && finishTime && finishTime < startTime) {
		justep.OpmUtils.showWarning("结束时间不能小于开始时间！");
		return;
	}
	var canTranAgent = dTemp.getValue("canTranAgent");
	

	var gridPersonMembers = justep.xbl("gridPersonMembers").grid;
	var checkedIDsPsm = gridPersonMembers.getCheckedRows(gridPersonMembers.getColIndexById("calcCheckBox")).split(",");
	var gridCurrentAgents = justep.xbl("gridCurrentAgents").grid;
	var checkedIDsAgent = gridCurrentAgents.getCheckedRows(gridCurrentAgents.getColIndexById("calcCheckBox")).split(",");

	if (!checkedIDsPsm[0] && !checkedIDsAgent[0]) {
		justep.OpmUtils.showWarning("请勾选需要委托的岗位！");
		return;
	}

	var orgFIDList = new justep.Request.ListParam();
	var processList = new justep.Request.ListParam();
	for ( var i = 0; i < checkedIDsPsm.length; i++) {
		if (!checkedIDsPsm[i]) continue;
		var orgFID = gridPersonMembers.getValueById(checkedIDsPsm[i], "sFID");
		var process = gridPersonMembers.getValueById(checkedIDsPsm[i], "calcProcess");
		orgFIDList.add(new justep.Request.SimpleParam(orgFID, justep.XML.Namespaces.XMLSCHEMA_STRING));
		processList.add(new justep.Request.SimpleParam(process, justep.XML.Namespaces.XMLSCHEMA_STRING));
	}
	for ( var i = 0; i < checkedIDsAgent.length; i++) {
		if (!checkedIDsAgent[i]) continue;
		var orgFID = gridCurrentAgents.getValueById(checkedIDsAgent[i], "sOrgFID");
		var process = gridCurrentAgents.getValueById(checkedIDsAgent[i], "sProcess");
		orgFIDList.add(new justep.Request.SimpleParam(orgFID, justep.XML.Namespaces.XMLSCHEMA_STRING));
		processList.add(new justep.Request.SimpleParam(process, justep.XML.Namespaces.XMLSCHEMA_STRING));
	}
	
	var params = new justep.Request.ActionParam();
	params.setList("orgFIDList", orgFIDList);
	params.setList("processList", processList);
	params.setString("agentPersonID", agentPersonID);
	if (startTime == undefined || startTime == ""){
		params.setNULL("startTime");
	}else{
		params.setDateTime("startTime", startTime);
	}
	
	if (finishTime == undefined || finishTime == ""){
		params.setNULL("finishTime");
	}else{
		params.setDateTime("finishTime", finishTime);
	}
	params.setBoolean("canTranAgent", canTranAgent);
	justep.Request.sendBizRequest2({
		action: "appendAgentsAction", 
		parameters: params, 
		callback: function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				justep.windowDialogReceiver.windowEnsure();
			}
		}
	});
};
appendAgents.setPersonMemberProcess = function(rowID) {
	var dPersonMembers = justep.xbl("dPersonMembers");
	var orgFID = dPersonMembers.getValue("sFID", rowID);
	var process = dPersonMembers.getValue("calcProcess", rowID);
	justep.xbl("wdAgentProcess").open({
		orgFID : orgFID,
		process : process
	});
};
appendAgents.wdAgentProcessReceive = function(event){
	var dPersonMembers = justep.xbl("dPersonMembers");
	dPersonMembers.setValue("calcProcess", event.data.process);
	dPersonMembers.setValue("calcProcessLabel", event.data.processLabel);
};

appendAgents.gridPersonMembers_calcProcessLabelButtonClick = function(event){
	appendAgents.setPersonMemberProcess(event.rowId);
};
