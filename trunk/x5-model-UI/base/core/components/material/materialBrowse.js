var materialBrowse = {};

materialBrowse.materialDataRefreshCreateParam = function(event) {
	var mapParam = new justep.Request.MapParam();
	mapParam.put("fBizRecId", justep.Context.getRequestParameter("fBizRecId"));
	event.param.setMap("variables", mapParam);
};

materialBrowse.tree1RowDblClick = function(event) {
	var materialData = justep.xbl("materialData");
	var rowID = materialData.getCurrentID();
	var docPath = materialData.getValue("fDocPath", rowID);
	var fileID = materialData.getValue("fFileID", rowID);
	var docID = materialData.getValue("fDocID", rowID);
	var docName = materialData.getValue("fDocName", rowID);
	/*var outUrl = materialData.getValue("outUrl", rowID);
	if (outUrl) {
		window.open(outUrl);

	} else {*/
		if (docPath == '')
			return;
		var iframe = document.getElementById('_detail-data-frame_');
		if (iframe) {
			var versionID = versionID ? versionID : "last";
			var partType = partType ? partType : "content";
			if (!fileID) {
				alert('文档不能浏览，数据未提交！');
				return;
			}
			var fileinfo = justep.Doc.queryDocByFileId(docPath, fileID,
					docName, versionID);
			if (!justep.Browser.isInApp
					&& '.doc.docx.xls.xlsx.ppt.mpp.vsd.'
							.indexOf(String(/\.[^\.]+$/.exec(docName)) + '.') >= 0) {
				var OVP = {};
				OVP.host = docPath;
				// OVP.programID = programID;
				OVP.versionID = versionID;

				if (fileinfo.length < 1)
					throw new Error("文档服务器不存在名称为" + docName + "的office文件！");
				if (partType == 'revision') {
					OVP.partType = !fileinfo.parts.part_3 ? "content"
							: "revision";
				} else
					OVP.partType = partType;

				OVP.fileID = fileID;
				OVP.fileExt = String(/\.[^\.]+$/.exec(docName));
				OVP.filename = docName.substr(0, docName.lastIndexOf('.'));
				OVP.filename = escape(OVP.filename);
				if (typeof isPrint === "undefined" || isPrint == null)
					isPrint = true;
				OVP.isPrint = isPrint ? true : false;
				var param = "<data>" + unescape(OV.JSON.stringify(OVP))
						+ "</data>";
				justep.Request.callURL(
						"/system/service/doc/ntko/NtkoOfficeViewer.w?process="
								+ justep.Context.getCurrentProcess()
								+ "&activity="
								+ justep.Context.getCurrentActivity(),
						"_detail-data-frame_", param);
			} else if (_read_file_type
					&& _read_file_type.indexOf((String(/\.[^\.]+$/
							.exec(docName)).toLowerCase())) >= 0) {
				var url = justep.Doc.getdocServerAction(docPath,
						"/repository/file/view/" + fileID + "/" + versionID
								+ "/" + partType);
				if (url.indexOf("#") == -1) {
					var self = this;
					if (justep.Browser.isInApp) {
						var justepApp = justep.getJustepApp();
						var getBrowserUrl = function() {
							var docUrl = url;
							if (docUrl.indexOf("uploadDoc.j") != -1
									&& docUrl.indexOf("#") == -1) {
								docUrl = window.location.protocol + "//"
										+ window.location.host + docUrl;
							}
							return docUrl;
						};
						var getDocName = function() {
							return docName;
						};
						justepApp.attachment.browserAttachment(getBrowserUrl,
								getDocName);
					} else {
						if (url.indexOf(justep.Request.BASE_URL) != -1)
							url = url.split(justep.Request.BASE_URL)[1];
						if (url.indexOf("UI2") != -1)
							url = url.replace("UI2", "UI");
						justep.Request.callURL(url, "_detail-data-frame_",
								null, false);
					}
				} else {
					materialBrowse.showHelp(iframe, docName);
				}
			} else {
				materialBrowse.showHelp(iframe, docName);
			}
		}
};

materialBrowse.showHelp = function(iframe,docName){
	if (iframe.contentWindow.document.body) {
		iframe.contentWindow.document.body.setAttribute("style", "");
		iframe.contentWindow.document.body.innerHTML = "<table width='100%' height='100%' style='padding-left:40px;padding-right:40px;'>"
				+ "<tr><td><h1 style='text-indent: 2em;'>浏览器不支持在线浏览【"+ docName+ "】此格式的文件，请点击附件下载按钮。</h1></td></tr></table>";
	}
};

materialBrowse.model1Load = function(event) {
	var materialData = justep.xbl("materialData");
	materialData.expandAll(true);
	var grid1 = justep.xbl("tree1").grid;
	for ( var i = 0; i < materialData.getCount(); i++) {
		var id = materialData.getID(i);
		if (materialData.getValue("fMaterialName", id) == justep.Context
				.getRequestParameter("fMaterialName")) {
			grid1.selectRowById(id);
		}
	}
	
	var rowID = materialData.getCurrentID();
	var docPath = materialData.getValue("fDocPath", rowID);
	if(docPath=="" && materialData.find(["fParentId"],[rowID]).length>0)
		materialData.next();
	this.tree1RowDblClick(event);
};

materialBrowse.fileDownloadClick = function(event){
	var data = justep.xbl("materialData");
	var rowID = data.getCurrentID();
	var docPath = data.getValue("fDocPath", rowID);
	var fileID = data.getValue("fFileID", rowID);
	if(!!docPath){
		justep.doc.InnerUtils.downloadDocByFileID(docPath, fileID);
	}else{
		alert("请选择附件！");
	}
};
