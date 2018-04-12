var filesBrowse = {};

filesBrowse.windowReceiverReceive = function(event) {
	if (!!event.data)
		filesBrowse.initDocName(event.data);
};

filesBrowse.initDocName = function(data) {
	var attachment = data.docIDs;
	var attachmentHtml = "<ul id='attachmentList'><li class='title'>附件：</li>";
	if (!!attachment && attachment.length > 5) {
		var attachmentJSON = JSON.parse(attachment);
		if (attachmentJSON.length == 1)
			justep.xbl("HSplitter1").moveToStart();
		for ( var i = 0; i < attachmentJSON.length; i++) {
			var rowNum = i + 1;
			var docID = attachmentJSON[i].docID;
			var docName = attachmentJSON[i].docName.replace(/\s/g, "");
			var docPath = attachmentJSON[i].docPath;
			var fileID = attachmentJSON[i].fileID;
			attachmentHtml += "<li class='attachment'><span style='padding-right:10px'>"
					+ rowNum
					+ ".</span><span id='"
					+ docID
					+ "' onClick=filesBrowse.fileOnlineBrowse(\""
					+ docID
					+ "\",\""
					+ docPath
					+ "\",\""
					+ docName
					+ "\",\""
					+ fileID
					+ "\")>"
					+ docName
					+ "</span><span style='margin-left:20px;' onClick=filesBrowse.downloadDocByFileID(\""
					+ docPath + "\",\"" + fileID + "\")>【下载】</span></li>";
		}
		attachmentHtml += "</ul>";
		$("#fileView").html(attachmentHtml);
		var currentDocID = data.docID;
		if (!!currentDocID)
			$("span#" + currentDocID).addClass("currentDocName").click();
		else
			$("ul#attachmentList li>span").get(1).click();
	}
};

filesBrowse.downloadDocByFileID = function(docPath, fileID) {
	justep.doc.InnerUtils.downloadDocByFileID(docPath, fileID);
};

filesBrowse.fileOnlineBrowse = function(docID, docPath, docName, fileID) {
	if (docPath == '')
		return;
	$("li span").removeClass("currentDocName");
	$("span#" + docID).addClass("currentDocName");
	var versionID = versionID ? versionID : "last";
	var partType = partType ? partType : "content";
	if (!fileID) {
		alert('文档不能浏览，数据未提交！');
		return;
	}
	if (!justep.Browser.isInApp
			&& '.doc.docx.xls.xlsx.ppt.mpp.vsd.wps.'.indexOf(String(/\.[^\.]+$/
					.exec(docName))
					+ '.') >= 0) {
		var fileinfo = justep.Doc.queryDocByFileId(docPath, fileID, docName,
				versionID);
		var OVP = {};
		OVP.host = docPath;
		OVP.versionID = versionID;
		if (fileinfo.length < 1)
			throw new Error("文档服务器不存在名称为" + docName + "的office文件！");
		if (partType == 'revision') {
			OVP.partType = !fileinfo.parts.part_3 ? "content" : "revision";
		} else
			OVP.partType = partType;
		OVP.fileID = fileID;
		OVP.fileExt = String(/\.[^\.]+$/.exec(docName));
		OVP.filename = docName.substr(0, docName.lastIndexOf('.'));
		OVP.filename = escape(OVP.filename);
		if (typeof isPrint === "undefined" || isPrint == null)
			isPrint = true;
		OVP.isPrint = isPrint ? true : false;
		var param = unescape(OV.JSON.stringify(OVP));
		var url = "/UI/system/service/doc/ntko/NtkoOfficeViewer.w?process=/SA/doc/system/systemProcess&activity=mainActivity";
		url = url + "&param=" + encodeURIComponent(param);
		var frame = justep.xbl("windowFrame");
		frame.url = url;
		frame.refresh();
	} else if (!justep.Browser.isInApp
			&& '.dwg.dxf.DWG.DXF'.indexOf(String(/\.[^\.]+$/.exec(docName))) >= 0) {
		// 增加CAD在线浏览
		var url = window.location.protocol
				+ "//"
				+ window.location.host
				+ justep.Request
						.convertURL("/UI/system/service/doc/cad/CadViewer.w?process=/SA/doc/system/systemProcess&activity=mainActivity");
		var OVP = {};
		OVP.docPath = docPath;
		OVP.fileID = fileID;
		OVP.fileExt = String(/\.[^\.]+$/.exec(docName));
		OVP.filename = docName.substr(0, docName.lastIndexOf('.'));

		if (typeof isPrint === "undefined" || isPrint == null)
			isPrint = true;
		OVP.isPrint = isPrint ? true : false;
		var param = unescape(JSON.stringify(OVP));
		url = url + "&param=" + encodeURIComponent(param);
		var frame = justep.xbl("windowFrame");
		frame.url = url;
		frame.refresh();
	}else if (!justep.Browser.isInApp
			&& '.bmp.jpg.png.tiff.gif.pcx.tga.exif.fpx.svg.psd.cdr.pcd.dxf.ufo.eps.ai.raw.WMF'.indexOf(String(/\.[^\.]+$/.exec(docName))) >= 0){
		var url = justep.Doc.getdocServerAction(docPath,
				"/repository/file/view/" + fileID + "/" + versionID + "/"
						+ partType);
		if (url.indexOf("#") == -1) {
			var self = this;
			if (url.indexOf(justep.Request.BASE_URL) != -1)
				url = url.split(justep.Request.BASE_URL)[1];
			if (url.indexOf("UI2") != -1)
				url = url.replace("UI2", "UI");
			var iframe = document.getElementById('windowFrame');
			if (iframe) {
				iframe.innerHTML='<div id="buttonlist"><button id="btn3" >放大</button><button id="btn4" >缩小</button><button id="btn1" >右转</button><button id="btn2" >左转</button><button id="btn5" >复位</button></div><div id="imglist"><img id="img" src="'+justep.Request.convertURL(url)+'" /></div>';
				debugger;
				$('#btn1').click(function(){
					$("#img").css({"transform":" rotate(90deg)"},{"margin":"30% 0 0 0;"});
				});
				$('#btn2').click(function(){
					$("#img").css({"transform":" rotate(-90deg)"},{"margin":"30% 0 0 0;"});
				});
					
				$('#btn3').click(function(){
					
					var wValue=1.5 * $("#img").width(); 
					var hValue=1.5 * $("#img").height(); 
					$("#img").animate({width: wValue, 
					height: hValue, 
					left:("-"+(0.5 * $("#img").width())/2), 
					top:("-"+(0.5 * $("#img").height())/2)}, 1000); 
				});
				$('#btn4').click(function(){
					
					
					var wValue=0.5 * $("#img").width(); 
					var hValue=0.5 * $("#img").height(); 
					$("#img").animate({width: wValue, 
					height: hValue, 
					left:0, 
					top:0}, 1000);  
				});
				$('#btn5').click(function(){
					
					$("#img").css({"transform":" rotate(0deg)"},{"margin":"30% 0 0 0;"});

				});	
				 bwidth= $("#img").width(); 
				 bheight= $("#img").height(); 
	}

		} else {
			filesBrowse.showHelp(docName);
		}
	}else if (_read_file_type
			&& _read_file_type.indexOf((String(/\.[^\.]+$/.exec(docName))
					.toLowerCase())) >= 0) {
		var url = justep.Doc.getdocServerAction(docPath,
				"/repository/file/view/" + fileID + "/" + versionID + "/"
						+ partType);
		if (url.indexOf("#") == -1) {
			var self = this;
			if (url.indexOf(justep.Request.BASE_URL) != -1)
				url = url.split(justep.Request.BASE_URL)[1];
			if (url.indexOf("UI2") != -1)
				url = url.replace("UI2", "UI");
			var frame = justep.xbl("windowFrame");
			frame.url = url;
			frame.refresh();

		} else {
			filesBrowse.showHelp(docName);
		}
	} else {
		filesBrowse.showHelp(docName);
	}
};

filesBrowse.showHelp = function(docName) {
	var iframe = document.getElementById('windowFrame');
	if (iframe) {
		iframe.innerHTML = "<table width='100%' height='100%' style='padding-left:40px;padding-right:40px;'>"
				+ "<tr><td><h1 style='text-indent: 2em;'>浏览器不支持在线浏览【"
				+ docName
				+ "】此格式的文件，请点击下载。</h1></td></tr></table>";
	}
};

filesBrowse.model1Load = function(event){
	
	
	debugger;
$('#btn1').click(function(){
	$("#img").css({"transform":" rotate(90deg)"},{"margin":"30% 0 0 0;"});
});
$('#btn2').click(function(){
	$("#img").css({"transform":" rotate(-90deg)"},{"margin":"30% 0 0 0;"});
});
	
$('#btn3').click(function(){
	
	var wValue=1.5 * $("#img").width(); 
	var hValue=1.5 * $("#img").height(); 
	$("#img").animate({width: wValue, 
	height: hValue, 
	left:("-"+(0.5 * $("#img").width())/2), 
	top:("-"+(0.5 * $("#img").height())/2)}, 1000); 
});
$('#btn4').click(function(){
	
	
	var wValue=0.5 * $("#img").width(); 
	var hValue=0.5 * $("#img").height(); 
	$("#img").animate({width: wValue, 
	height: hValue, 
	left:0, 
	top:0}, 1000);  
});
$('#btn5').click(function(){
	
	$("#img").css({"transform":" rotate(0deg)"},{"margin":"30% 0 0 0;"});

});	
};
