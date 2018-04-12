var mainActivity = {};

mainActivity.modelXBLLoaded = function(event) {
	var windowFrame = justep.xbl("windowFrame");
	var params = new justep.Request.ActionParam();
	var url = "/UI/common/archives/process/archives/archiveQuery.w";
	justep.Request.sendBizRequest2({
		action : "getArchiveQueryFuncUrlAction",
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
