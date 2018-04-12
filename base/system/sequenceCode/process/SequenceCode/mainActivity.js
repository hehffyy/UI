var mainActivity = {};

mainActivity.trigger1Click = function(event) {
	// 构造参数
	var params = new justep.Request.ActionParam();
	params.setString("codeGuid", "123");
	params.setString("concept", "Table_Test");
	// 调用动作
	justep.Request.sendBizRequest2({
		"dataType" : "application/json",
		"action" : "previewSequenceCode",
		"parameters" : params,
		"callback" : function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				justep.xbl("data1")
						.setValue("codeValue", callbackData.response);
			}
		}
	});
};

mainActivity.trigger2Click = function(event) {
	// 构造参数
	var params = new justep.Request.ActionParam();
	params.setString("codeGuid", "123");
	params.setString("concept", "Table_Test");
	params.setString("relation", "Field1");
	params.setString("idValue", justep.Utils.randomString());
	// 调用动作
	justep.Request.sendBizRequest2({
		"dataType" : "application/json",
		"action" : "makeSequenceCode",
		"parameters" : params,
		"callback" : function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				justep.xbl("data1")
						.setValue("codeValue", callbackData.response);
			}
		}
	});
};

mainActivity.model1ModelConstructDone = function(event) {
	debugger;
	justep.xbl("data1").setValue("codeValue", "1");
	justep.xbl("data1").xformsRefresh();
};
