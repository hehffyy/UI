var preIdeaDialog = {};


preIdeaDialog.sysReceiverReceive = function(event){
	var options = {};
	var param = new justep.Request.ActionParam();
	param.setString('id', event.data.id);
	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "getPreTaskId";
	options.callback = function(callbackData) {
		callbackData.ignoreError = false;
		if (callbackData.state) {
			var data = justep.xbl("dsTask");
			var taskId = callbackData.response;
			data.setFilter("filter", "(SA_Task='" + taskId + "' or SA_Task.sParent='"+taskId+"') and  SA_Task.sContent is not null");
			data.refreshData();
		}
	};
	justep.Request.sendBizRequest2(options);

};
