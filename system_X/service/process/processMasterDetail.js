var processMasterDetail = {};

//双击时打开流程组件
processMasterDetail.grid1RowDblClick = function(event){
	var fBizRecId = justep.xbl("mTask").getValue("FBIZRECID");
	if(!!fBizRecId)
		butone.BizRec.openBizRec(fBizRecId);
};

processMasterDetail.model1Load = function(event){
	processMasterDetail.taskGuid = justep.Request.URLParams["taskID"];
	processMasterDetail.bizRecID = justep.Request.URLParams["bizRecID"];
	var mTask = justep.xbl("mTask");
	for ( var i = mTask.getCount() - 1; i >= 0; i--) mTask.removeByIndex(i);
	// 调用queryMasterRelationAction 查询关联的案卷信息列表
	
	var params = new justep.Request.ActionParam();
	if(processMasterDetail.taskGuid &&"undefined"!=processMasterDetail.taskGuid){
		params.setString("taskID", processMasterDetail.taskGuid);
	}
	if(processMasterDetail.bizRecID && "undefined"!=processMasterDetail.bizRecID){
		params.setString("bizRecId", processMasterDetail.bizRecID);
	}
	var translateParam = new justep.Request.TranslateParam();
	translateParam.dataType = justep.Request.TranslateParam.DATATYPE_ROW_LIST;
	translateParam.rowOption.sequence = mTask.getColumnIds();
	justep.Request.sendBizRequest2({
		dataType : "json",
		action: "queryRelationBizRecAction", 
		parameters: params, 
		translateParam: translateParam,
		callback: function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				mTask.loadJson(callbackData.response);
			}
		}
	});
	
};

processMasterDetail.trigger1Click = function(event){
	var fBizRecId = justep.xbl("mTask").getValue("FBIZRECID");
	if(!!fBizRecId)
		butone.BizRec.openBizRec(fBizRecId);
};
