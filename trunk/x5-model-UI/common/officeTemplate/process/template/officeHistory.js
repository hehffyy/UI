var officeHistory = {};

officeHistory.gridMainRowDblClick = function(event) {
	var url = '/UI/base/system/office/NtkoOfficeLook.w?versionId='
			+ justep.xbl("dataVersion").getCurrentId();
	var title = "历史版本:" + justep.xbl("dataVersion").getValue("fVersionName");
	url = justep.Request.convertURL(url, false)
			+ "&process=/common/officeTemplate/process/template/templateProcess&activity=mainActivity&title="
			+ encodeURIComponent(title);
	url = location.protocol + "//" + location.host + url;
	var newWin = window.open(url, "_blank");
};

officeHistory.windowReceiver1Receive = function(event) {
	officeHistory.data = event.data;
	justep.xbl("dataVersion").refreshData();
};

officeHistory.windowRunnerSend = function(event) {
	event.data = {
		versionId : justep.xbl("dataVersion").getCurrentId()
	};
	return event.data;
};

officeHistory.gridMain_opertaionRender = function(event){
	var data = justep.xbl("dataVersion"),rowID=event.rowID;
	var url = "/UI/base/system/office/officeBrow.j?versionId="
				+ rowID;
	url = justep.Request.convertURL(url, false);
	url = location.protocol + "//" + location.host + url;
	return '<a href="'+url+'" >下载</a>';
};

officeHistory.dataVersionRefreshCreateParam = function(event){
	var variables = event.param.param.variables;
	variables.put("fBizKey", officeHistory.data.bizKey);
	if (!!officeHistory.data.kind)
		variables.put("fKind", officeHistory.data.kind);
	if (!!officeHistory.data.templateKey)
		variables.put("fTemplateKey", officeHistory.data.templateKey);
};
