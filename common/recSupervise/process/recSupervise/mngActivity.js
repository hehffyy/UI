var mngActivity = {};

mngActivity.trgSelClick = function(event) {
	justep.xbl("recDlg").open2();
};

mngActivity.recDlgReceive = function(event) {
	var list = event.data;
	var param = new justep.Request.ActionParam();
	param.setList("bizrecids", list);

	var options = {};
	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "addBizRecs";
	options.directExecute = true;
	options.callback = function(callbackData) {
		callbackData.ignoreError = false;
		justep.xbl("dsRec").refreshData();
	};
	justep.Request.sendBizRequest2(options);
};

mngActivity.trgDelClick = function(event) {
	var fStatus = justep.xbl("dsRec").getValue("fStatus");
	if(!fStatus || fStatus == "已完成"){
		butone.Dialog.info("当前督办案卷已督办完成，不允许删除！");
		return;
	}
	
	butone.Dialog.question("确认删除当前督办案卷吗？", null, function(evt) {
		if (evt.status == "yes") {
			var param = new justep.Request.ActionParam();
			param.setString("dbid", justep.xbl("dsRec").getCurrentID());
			var options = {};
			options.contentType = 'application/json';
			options.dataType = "json";
			options.parameters = param;
			options.action = "delBizRec";
			options.directExecute = true;
			options.callback = function(callbackData) {
				callbackData.ignoreError = false;
				justep.xbl("dsRec").refreshData();
			};
			justep.Request.sendBizRequest2(options);
		}
	});
};

mngActivity.model1Load = function(event) {
	var dsRec = justep.xbl("dsRec");
	dsRec.setFilter("filter1", "fCreatorID ='"
			+ justep.Context.getCurrentPersonID() + "'");
	dsRec.refreshData();
	justep.xbl("dsStage").refreshData();
};

mngActivity.trgLookClick = function(event) {
	var id = justep.xbl("dsRec").getValue("fBizRecID");
	if (!id)
		return;
	butone.BizRec.openBizRec(id);
};

mngActivity.trgBlgcClick = function(event) {
	var dsRec = justep.xbl("dsRec");
	var pi = dsRec.getValue("fFlowId");
	if (!pi)
		return;
	justep.xbl("dlgChart").open(null, "流程轨迹",
			"/UI/SA_X/task/taskCenter/banLiGuoCheng.w?pi=" + pi);
};

mngActivity.trgAddStatgeClick = function(event) {
	var fStatus = justep.xbl("dsRec").getValue("fStatus");
	if(!fStatus || fStatus == "已完成"){
		butone.Dialog.info("当前督办案卷已督办完成，不能编辑阶段！");
		return;
	}

	justep.xbl("addStageDlg").open2({
		data : justep.xbl("dsRec").getValue("fDbID")
	});
};

mngActivity.addStageDlgReceive = function(event) {
	justep.xbl("dsStage").refreshData();
};

mngActivity.grid2RowDblClick = function(event) {
	justep.xbl("tabPanel1").setTabActive("tabPage2");
};

mngActivity.trgCgClick = function(event) {
	var fStatus = justep.xbl("dsRec").getValue("fStatus");
	if(!fStatus || fStatus == "已完成"){
		butone.Dialog.info("当前督办案卷已督办完成，不能修改阶段成果！");
		return;
	}
	
	justep.xbl("cgDlg").open2({
		data : justep.xbl("dsStage").getCurrentID()
	});
};

mngActivity.trgFinishClick = function(event) {
	var dsRec = justep.xbl("dsRec");
	var dbid = dsRec.getCurrentID();
	if(!dbid){
		butone.Dialog.info("请选择需要结束督办的案卷！");
		return;
	}
	var fStatus = dsRec.getValue("fStatus");
	/*if(!fStatus || fStatus == "已完成"){
		butone.Dialog.info("当前督办案卷已督办完成，不需要重新设置！");
		return;
	}*/
	butone.Dialog.question("确认结束当前督办案卷吗？", null, function(evt) {
		if (evt.status == "yes") {
			var param = new justep.Request.ActionParam();
			param.setString("dbid", justep.xbl("dsRec").getCurrentID());
			var options = {};
			options.contentType = 'application/json';
			options.dataType = "json";
			options.parameters = param;
			options.action = "finishBizRec";
			options.directExecute = true;
			options.callback = function(callbackData) {
				callbackData.ignoreError = false;
				justep.xbl("dsRec").refreshData();
				justep.xbl("dsStage").refreshData();
			};
			justep.Request.sendBizRequest2(options);
		}
	});
};


mngActivity.cgDlgReceive = function(event){
	justep.xbl("dsStage").refreshData();
};

mngActivity.orgDialogReceive = function(event){
	var rows = event.data;
	var dsRec = justep.xbl("dsRec");
	if (rows.length > 0) {
		var row = rows[0];
		dsRec.setValue("fDbrID",row.sPersonID);
		dsRec.setValue("fDbr",row.sName);
	}
	dsRec.saveData();
};

mngActivity.updateDBRClick = function(event){
	var fStatus = justep.xbl("dsRec").getValue("fStatus");
	if(!fStatus || fStatus == "已完成"){
		butone.Dialog.info("当前督办案卷已督办完成，不允许修改督办人！");
		return;
	}
	justep.xbl("orgDialog").open();
};

mngActivity.cuibanClick = function(event){
	var dsRec = justep.xbl("dsRec");
	var fStatus = dsRec.getValue("fStatus");
	if(!fStatus || fStatus == "已完成"){
		butone.Dialog.info("当前督办案卷已督办完成，不允许修改督办人！");
		return;
	}
	justep.xbl("cuiBanDialog").open();
};

mngActivity.cuiBanDialogReceive = function(event){
	var retData = event.data;
	var dsRec = justep.xbl("dsRec");
	var fStatus = dsRec.getValue("fStatus");
	var FInComeDocName = dsRec.getValue("FInComeDocName");
	if(!fStatus || fStatus == "已完成"){
		butone.Dialog.info("当前督办案卷已督办完成，不需要发送催办信息！");
		return;
	}
	
	butone.Dialog.question("确认发送案卷【"+FInComeDocName+"】的催办信息？", null, function(evt) {
		if (evt.status == "yes") {
			var param = new justep.Request.ActionParam();
			param.setString("fDbID", dsRec.getCurrentID());
			param.setString("fCuiBanInfo", retData.getValue("fCuiBanInfo"));
			param.setString("fCuiBanType", retData.getValue("fCuiBanType"));
			param.setString("fBizRecID", dsRec.getValue("fBizRecID"));
			var options = {};
			options.contentType = 'application/json';
			options.dataType = "json";
			options.parameters = param;
			options.action = "sendCuiBanInfoAction";
			options.directExecute = true;
			options.callback = function(result) {
				result.ignoreError = false;
				if(result.state)
					butone.Dialog.success(result.response);
				else
					butone.Dialog.error(result.response);
			};
			justep.Request.sendBizRequest2(options);
		}
	});
};

mngActivity.edit_trgClick = function(event){
	var dsRec = justep.xbl("dsRec");
	justep.xbl("editRecDlg").open({fStatus:dsRec.getValue("fStatus"),fLevel:dsRec.getValue("fLevel")});
};

mngActivity.editRecDlgReceive = function(event){
	var retData = event.data;
	var dsRec = justep.xbl("dsRec");
	dsRec.setValue("fStatus",retData.getValue("fStatus"));
	dsRec.setValue("fLevel",retData.getValue("fLevel"));
	dsRec.saveData();
};
