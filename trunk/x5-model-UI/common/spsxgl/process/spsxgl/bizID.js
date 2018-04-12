var bizID = {};
var process;
bizID.windowReceiverReceive = function(event) {
	process = event.data;
	justep.xbl("main").refreshData();
};

bizID.mainRefreshCreateParam = function(event) {
	var mapParam = new justep.Request.MapParam();
	mapParam.put("fProcess", new justep.Request.SimpleParam(process,
			justep.XML.Namespaces.XMLSCHEMA_STRING));
	event.param.setMap("variables", mapParam);
};
