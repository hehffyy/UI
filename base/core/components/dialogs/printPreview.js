var printPreview = {};

/**
 * 接收到初始化参数，用于打开docForm
 */
printPreview.windowReceiver1Receive = function(event) {
	var param = event.data;
	if (param.title) {
		document.title = param.title;
		delete param.title;
	}
	justep.xbl("docFrame").open2(param);
};

/**
 * 接收到表单初始化完成后，开启打印按钮
 */
printPreview.docFrameReceive = function(event) {
	justep.xbl("btnPrint").setDisabled(false);
	justep.xbl("btnPreview").setDisabled(false);
};

printPreview.createPrintFrame = function(preview) {
	butone.HtmlPrint.clearPageSetup();

	var self = printPreview;
	if (self.iframe) {
		$(self.iframe).remove();
		self.iframe = null;
	}

	var $iframe_docFrame = $("#iframe-docFrame");
	self.iframe = new butone.HtmlPrint.Iframe($iframe_docFrame.parent()[0]);

	$iframe_docFrame.css("cssText", "display:none");
	var $iframe = $(self.iframe);
	$iframe.css("cssText", "display:block;width:100%;height:100%");

	var printDoc = self.iframe.doc;
	var printWindow = self.iframe.contentWindow || self.iframe;

	var docFrame = justep.xbl("docFrame");
	var scrDoc = docFrame.getContentDocument();
	var srcWin = docFrame.getContentWindow();

	var links = [];
	var data = butone.HtmlPrint.getFrameHtml(srcWin, $(scrDoc.body), links);
	var head = "<head><meta http-equiv='Content-Type; content='text/html; charset=utf-8'/>"
			+ data.headLink + "</head>";
	var docContent = '<!DOCTYPE html  PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">'
			+ "<html>"
			+ head
			+ "<body style='margin: 0;padding: 0;height: 100%;width: 100%'>"
			+ butone.HtmlPrint.getActiveX(preview)
			+ data.html
			+ "</body></html>";
	printWindow.focus();
	printDoc.open("text/html", "replace");
	printDoc.write(docContent);
	printDoc.close();
	$("#statusPanel").css("display", "none");
	if (justep.Browser.IE) {
		if (preview)
			document.all[self.iframe.id].ExecWB(7, 1);
		else
			document.all[self.iframe.id].ExecWB(6, 1);
	} else {
		printWindow.print();
	}
};

printPreview.btnPrintClick = function(event) {
	printPreview.createPrintFrame(false);
};

printPreview.btnPreviewClick = function(event) {
	printPreview.createPrintFrame(true);
};

printPreview.btnCloseClick = function(event) {
	// debugger;
	// var frameForm =
	// justep.xbl("docFrame").getContentWindow().butone.Context.frameForm;
	// frameForm.destroy();
	// delete frameForm.parentForm.subForms [frameForm.id];
	justep.xbl("windowReceiver1").sendData("close");
};

printPreview.model1UnLoad = function(event) {
	printPreview.btnCloseClick();
};

printPreview.btnPageSetupClick = function(event) {
	var wbActiveX = $("#wb")[0];
	if (wbActiveX) {
		wbActiveX.ExecWB(8, 1);
	}
};

printPreview.model1ModelConstruct = function(event) {
	if (justep.Browser.IE) {
		$("body").append(butone.HtmlPrint.getActiveX(true));
	}
	if ($("#wb").length == 0) {
		$("#btnPageSetup").css("display", "none");
	}
};
