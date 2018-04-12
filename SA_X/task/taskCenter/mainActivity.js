var mainActivity = {};

mainActivity.modelXBLLoaded = function(event) {
	var windowFrame = justep.xbl("windowFrame");
	var params = new justep.Request.ActionParam();
	var url = "/UI/SA/task/taskCenter/taskCenter.w";
	justep.Request.sendBizRequest2({
		action : "getTaskCenterFuncUrlAction",
		dataType : "json",
		parameters : params,
		callback : function(result) {
			if (result.state) {
				url = result.response;
			}
		}
	});
	windowFrame.open2({
		url : url
	});
};
