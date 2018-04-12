var gpyForm = {};
// 取文件全名名称
function GetFileName(filepath) {
	if (filepath != "") {
		var names = filepath.split("\\");
		return names[names.length - 1];
	}
}
gpyForm.model1XBLLoaded = function(event) {
	$(
			'<object id="view1" type="application/x-eloamplugin" width="100%" height="95%" name="view"></object>')
			.appendTo($("#divCamara"));
	$(
			'<object id="thumb1" type="application/x-eloamplugin" width="100%" height="100%" name="thumb"></object>')
			.appendTo($("#divThumb"));
};

gpyForm.model1Load = function(event) {
	try {
		Load();
	} catch (err) {
		alert(err);
	}
};

gpyForm.model1UnLoad = function(event) {
	Unload();
};

gpyForm.btnOpenClick = function(event) {
	OpenVideo();
};

gpyForm.trigger2Click = function(event) {
	CloseVideo();
};

gpyForm.trigger7Click = function(event) {
	Scan();
};

gpyForm.sysReceiverReceive = function(event) {
	justep.xbl('sysReceiver').sendData({
		kind : 'initFinish',
		source : this.form
	});
	if (event.data) {
		var data = event.data;
		scanFileHead = data.materialName;
		if(scanFileHead)
			scanFileHead=scanFileHead.replace(/^\s+|\s+$/gm,'');
		scanSubPath = data.subPath;
	}
};

gpyForm.EnableDateClick = function(event) {
	EnableDate(event.currentTarget);
};

gpyForm.AddTextClick = function(event) {
	AddText(event.currentTarget);
};

gpyForm.DeskewClick = function(event) {
	Deskew(event.currentTarget);
};

gpyForm.SetStateClick = function(event) {
	SetState(event.currentTarget);
};

gpyForm.trigger3Click = function(event) {
	Left();
};

gpyForm.trigger4Click = function(event) {
	Right();
};

gpyForm.trigger5Click = function(event) {
	ShowProperty();
};

gpyForm.trigger8Click = function(event) {
	if ($("#ckPdf")[0].checked)
		uploadPdf();
	else
		uploadImage();
};

function createHtttp() {
	var url = "/UI/base/system/scan/attachUpload.j?subPath=" + encodeURIComponent(scanSubPath);
	url = justep.Request.convertURL(url, false);
	url = location.protocol + "//" + location.host + url;
	var http = plugin().Global_CreateHttp(url);// asp服务器demo地址
	return http;
}
function httpUpload(http,filePath, fileName) {
	var b = plugin().Http_UploadImageFile(http, filePath,
			encodeURIComponent(fileName));
	var response = plugin().Http_GetServerInfo(http);
	response = response.substr(0, response.lastIndexOf('0'));
	var response = justep.XML.fromString(response);
	var flag = justep.Request.getFlag(response);
	if (flag) {
		var isok = 'false' != flag;
		if (isok) {
			var data = justep.Browser.IE >= 9 ? justep.XML.eval0(response,
					"/root/data/*", "single") : justep.Request
					.getData(response);
			if (data) {
				var ret = justep.Request.transform(data);
				ret = JSON.parse(ret);
				if (!ret.sucess) {
					butone.Dialog.error(justep.Request.getMessage(ret.error));
					return;
				}
				var docIds = ret.result;
				justep.xbl("sysReceiver").sendData({
					kind : 'upload',
					attachs : [ docIds ]
				});
			}
		} else {
			butone.Dialog.error(justep.Request.getMessage(response));
		}
	}
	return true;
}
function uploadPdf() {
	var http = createHtttp();
	if (http) {
		var imgList = plugin().Video_CreateImageList(video1, 0,
				view1().View_GetObject());
		plugin().ImageList_Clear(imgList);
		for ( var i = 0; i < thumb1().Thumbnail_GetCount(); i++) {
			if (!thumb1().Thumbnail_GetCheck(i)) {
				continue;
			}
			var filePath = thumb1().Thumbnail_GetFileName(i);
			var flag = 0;
			var img = plugin().Global_CreateImageFromFile(filePath, flag);
			plugin().ImageList_Add(imgList, img);
			// plugin().Image_Release(img);
		}
		var pdfFlag = 0;
		var fileName = scanFileHead + ".pdf";
		var filePath = scanTempFolder + "\\" + fileName;
		plugin().ImageList_SaveToPDF(imgList, 2, filePath, pdfFlag);
		var b = httpUpload(http,filePath, fileName);
		plugin().ImageList_Release(imgList);
		plugin().Http_Release(http);
		if (b)
			alert("上传成功！");
	} else {
		alert("url 错误");
	}
}

function uploadImage() {
	var http = createHtttp();
	if (http) {
		for ( var i = 0; i < thumb1().Thumbnail_GetCount(); i++) {
			if (!thumb1().Thumbnail_GetCheck(i)) {
				continue;
			}
			var filePath = thumb1().Thumbnail_GetFileName(i);
			var fileName = GetFileName(filePath);
			var b = httpUpload(http,filePath, fileName);
			if (!b) {
				alert('上传异常！');
				return;
			}
		}
		plugin().Http_Release(http);
		alert("上传成功！");
	} else {
		alert("url 错误");
	}
}

gpyForm.trigger6Click = function(event) {
	$.cookie("scanTempFolder", $("#inputScanTempFolder").val());
	alert("设置成功！");
};
