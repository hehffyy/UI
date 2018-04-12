var NtkoOfficeViewer = {};

NtkoOfficeViewer.windowReceiver1Receive = function(event) {

};

NtkoOfficeViewer.getUrl = function(docPath, fileID) {
	var url = justep.doc.InnerUtils.getdocServerAction(docPath,
			"/repository/file/cache/office/" + fileID);
	if (url.indexOf("UI2") != -1) {
		url = url.replace("UI2", "UI");
	}
	return url;
};

NtkoOfficeViewer._request = function(url, data, callback, error) {
	$.ajaxFileUpload({
		async : false,
		url : url, // 用于文件上传的服务器端请求地址
		dataType : 'text', // 返回值类型json、xml、html
		data : data,
		success : callback,
		error : error
	});
};

NtkoOfficeViewer.openOffice = function(param) {
	var data = {
		FileID : param.fileID,
		FileExt : param.fileExt,
		VersionID : param.versionID,
		PartType : param.partType,
		EDA_GETSTREAMDATA : "EDA_YES"
	};
	var me = this, url = me.getUrl(param.host, param.fileID) + "&useNTKO=true";
	var result = me._request(url, data, function(ret) {
		var downlaodURL = justep.Request
				.convertURL("/UI/base/common/downloadTmpFile.j");
		downlaodURL += "&fileId=" + ret + "&$fileExt=" + param.fileExt;
		NTKO.getInstance().OpenFromURL(downlaodURL);
		if (justep.Browser.IE)
			NtkoOfficeViewer.doDocumentOpened(null);
	}, function(xhr, status, e) {
		throw justep.Error.create("下载文件失败:" + e);
	});
};

NtkoOfficeViewer.doDocumentOpened = function(doc) {
	var control = NTKO.getInstance();
	setTimeout(function() {
		try {
			// PDF默认设置
			control.ActiveDocument.ShowSidebar(true, "35021");// 默认打开书签
			control.ActiveDocument.SetViewMode(3);// 按适合页面显示
		} catch (err) {
		}
	}, 1);
//	var control = NTKO.getInstance();
//	// control.SetReadOnly(true, "");
//	if (this.param.partType == "version") {
//		doc.ShowRevisions = true;
//	} else {
//		// doc.AcceptAllRevisions();
//	}
//
//	if (this.param.programID != "History") {
//		// 显示或隐藏批注框
//		doc.ActiveWindow.View.ShowComments = false;
//		// 显示或隐藏插入和删除标记批注框
//		doc.ActiveWindow.View.ShowInsertionsAndDeletions = false;
//		// 显示或隐藏墨迹注释
//		doc.ActiveWindow.View.ShowInkAnnotations = false;
//		// 正在格式化
//		doc.ActiveWindow.View.ShowFormatChanges = false;
//	}

};

NtkoOfficeViewer.modelLoad = function(event) {
	if (NTKO.isValid) {
		NTKO.init();
		// DynamicXplUrl.j形式打打开
		var param = $(justep.Context.getRequestBody()).text();
		if (!param) {
			param = decodeURIComponent(justep.Request.URLParams.param);
		}
		if (param) {
			try {
				NTKO.init();
				this.param = JSON.parse(param);
				this.openOffice(this.param);
			} catch (e) {
			}
		}
	}
	$("body").bind("NTKOOnDocumentOpened", function(event, file, doc) {
		NtkoOfficeViewer.doDocumentOpened(doc);
	});
};
