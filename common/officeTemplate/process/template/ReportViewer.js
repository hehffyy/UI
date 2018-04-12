var ReportViewer = {};

ReportViewer.windowReceiver1Receive = function(event) {
	var templateKey = event.data.templateKey;
	var sqlParam = JSON.stringify(event.data.sqlParam);
	var fileKind=event.data.fileKind;
	var url = "/UI/common/officeTemplate/process/template/genReport.j?templateKey=" + templateKey
	+"&sqlParam="+sqlParam+"&fileKind="+fileKind;
	url = justep.Request.convertURL(url, false);
	url = location.protocol + "//" + location.host + url;
	TANGER_OCX.FileNew = false;
	TANGER_OCX.FileClose = false;
	TANGER_OCX.FileSave = false;
	TANGER_OCX.OpenFromUrl(url);
	//TANGER_OCX.SetReadOnly(true,""); 
	TANGER_OCX.ToolBars = false; 
	//TANGER_OCX.PrintPreview();
};

