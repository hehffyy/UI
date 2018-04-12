var mainActivity = {};

// 重新加载
mainActivity.trg_reloadClick = function(event) {
	var input = $("#inputProcessUrl");
	var params = new justep.Request.ActionParam();
	params.setString("process", input.val());
	// 调用动作
	justep.Request.sendBizRequest2({
		"dataType" : "application/json",
		"action" : "reloadBizInfoAction",
		"parameters" : params,
		"callback" : function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				$("#textarea1").val("调用成功");
			}
		}
	});
};

// 计算
mainActivity.trg_calcClick = function(event) {
	var expr = $("#inputJsFn").val();
	var ret = butone.Request.executeJavaExpr(expr);
	$("#textarea1").val(ret);
};

// 工作表列表（所有工作表）
mainActivity.trg_tablelistClick = function() {
	this.getTableList(false);
};

// 工作表列表（为创建物理表的工作表）
mainActivity.trg_unCreateTableListClick = function(event){
	this.getTableList(true);
};

// 获取工作表列表，checkStatus：true表示需要查看是否已创建物理表，false不关注是否已创建屋里表
mainActivity.getTableList = function(checkStatus) {
	var input = $("#inputProcessUrl");
	$("#textarea1").val("");
	var params = new justep.Request.ActionParam();
	params.setString("path", input.val());
	params.setBoolean("checkStatus", checkStatus);
	// 调用动作
	justep.Request.sendBizRequest2({
		"dataType" : "application/json",
		"action" : "getConceptStoreInModelAction",
		"parameters" : params,
		"callback" : function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				$("#textarea1").val(callbackData.response);
			}
		}
	});
};


mainActivity.trg_clearClick = function(event){
	$("#inputProcessUrl").val("");
	$("#inputJsFn").val("");
	$("#textarea1").val("");
};
