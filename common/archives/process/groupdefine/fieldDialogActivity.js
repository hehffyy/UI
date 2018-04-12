var fieldDialogActivity = {};
fieldDialogActivity.fBusinessGroupId = null;

fieldDialogActivity.windowReceiverReceive = function(event) {
	fieldDialogActivity.fBusinessGroupId = event.data.fBusinessGroupId;
	fieldDialogActivity.type = event.data.type;
	fieldDialogActivity.queryType = event.data.queryType;
	var data = justep.xbl("main");
	if (event.data.sysField) {
		data.queryAction = "querySysGroupFieldAction";
	}
	data.refreshData();

};

fieldDialogActivity.mainRefreshCreateParam = function(event) {
	var mapParam = new justep.Request.MapParam();
	mapParam.put("groupId", fieldDialogActivity.fBusinessGroupId);
	mapParam.put("queryType", fieldDialogActivity.queryType);
	if (fieldDialogActivity.type)
		mapParam.put("type", fieldDialogActivity.type);
	event.param.setMap("variables", mapParam);
};

fieldDialogActivity.mainAfterRefresh = function(event) {
	var data = event.source;
	for ( var i = 0; i < data.getCount(); i++) {
		var rowid = data.getID(i);
		data.setValue("ch", data.getValue("fChecked", rowid), rowid);
	}
};
