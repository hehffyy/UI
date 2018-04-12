var gpyFrame = {};
// 取文件全名名称
function GetFileName(filepath) {
	if (filepath != "") {
		var names = filepath.split("\\");
		return names[names.length - 1];
	}
}

gpyFrame.getParam = function() {
	return window.parent.materialManager.systemRunnerSend({});
};

gpyFrame.model1XBLLoaded = function(event) {
	$(
			'<object id="view1" type="application/x-eloamplugin" width="100%" height="95%" name="view"></object>')
			.appendTo($("#divCamara"));
	$(
			'<object id="thumb1" type="application/x-eloamplugin" width="100%" height="100%" name="thumb"></object>')
			.appendTo($("#divThumb"));

	$(
			'<OBJECT id="uploadOcx" height=0 width=0  TYPE="application/x-itst-activex"  CLSID="{A71EAFBE-E90D-4224-AB73-B4A8214F8858}"></OBJECT>')
			.appendTo($("#rootView"));
};

gpyFrame.model1Load = function(event) {
	// 检测是否安装插件
	if (!justep.Browser.IE && uploadOcx.ToPDF == null) {
		$("#view1").hide();
		$("#thumb1").hide();
		var baseInstall = "<center style='margin-top:100px'><font color='#FF00FF'>博通基础运行插件未安装!点击这里<a href='"
				+ justep.Request.convertURL("/UI/base/plugins/博通基础运行插件.exe",true)
				+ "' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font></center>";
		$(baseInstall).appendTo($("#divCamara"));
		return;
	}
	try {
		Load();
	} catch (err) {
		alert(err);
	}
};

gpyFrame.model1UnLoad = function(event) {
	Unload();
};

gpyFrame.btnOpenClick = function(event) {
	OpenVideo();
};

gpyFrame.trigger2Click = function(event) {
	CloseVideo();
};

gpyFrame.trigger7Click = function(event) {
	scanFileHead = gpyFrame.getParam().materialName;
	Scan();
	setTimeout(function() {
		thumb1().Thumbnail_SetCheck(thumb1().Thumbnail_GetCount(), true);
		setTimeout(function() {
			saveScanFiles();
		}, 100);
	}, 100);
};

gpyFrame.EnableDateClick = function(event) {
	EnableDate(event.currentTarget);
};

gpyFrame.AddTextClick = function(event) {
	AddText(event.currentTarget);
};

gpyFrame.DeskewClick = function(event) {
	Deskew(event.currentTarget);
};

gpyFrame.SetStateClick = function(event) {
	SetState(event.currentTarget);
};

gpyFrame.trigger3Click = function(event) {
	Left();
};

gpyFrame.trigger4Click = function(event) {
	Right();
};

gpyFrame.trigger5Click = function(event) {
	ShowProperty();
};

gpyFrame.oldUpload = function() {
	if ($("#ckPdf")[0].checked)
		uploadPdf();
	else
		uploadImage();
};

function getUrl() {
	var url = "/UI/base/system/scan/attachUpload.j?subPath="
			+ encodeURIComponent(gpyFrame.getParam().subPath);
	url = justep.Request.convertURL(url, false);
	url = location.protocol + "//" + location.host + url;
	return url;
};

function uploadPdf1() {
	var uploadOcx = document.getElementById("uploadOcx");
	uploadOcx.ServerUrl = getUrl();
	uploadOcx.StartProcess("文件上传");
	uploadOcx.AddInfo("开始打包图片转成 PDF格式");
	try {
		var ds = window.parent.materialManager.getCurrentDs();
		var files = ds.getValue("files");
		if (files == "")
			return;
		files = JSON.parse(files);
		var lFiles = "";
		for ( var j = 0; j < files.length; j++) {
			if (j == 0)
				lFiles = files[0];
			else
				lFiles = lFiles + "&" + files[j];
		}
		var fileName = gpyFrame.getParam().materialName + ".pdf";
		var response = '';
		if (!!uploadOcx.ToPdfBase64) {
			var fileBase64 = uploadOcx.ToPdfBase64(lFiles);
			var param = {
				fileName : fileName,
				file : fileBase64
			};
			param = JSON.stringify(param);
			var xhr = justep.Request.sendHttpRequest(uploadOcx.ServerUrl, param,
					"application/json");
			if (justep.Request.isSuccess(xhr))
				response = xhr.responseText;
		} else {
			var filePath = scanTempFolder + "\\" + fileName;
			filePath = uploadOcx.ToPDF(lFiles, filePath);
			uploadOcx.AddInfo("开始上传文件[" + fileName);
			response = uploadOcx.Upload(filePath);
		}

		if (response == '')
			return;
		var ret = JSON.parse(response);
		var result = ret.result;
		window.parent.materialManager.systemRunnerReceive({
			data : {
				kind : 'upload',
				attachs : [ result ]
			}
		});
	} finally {
		uploadOcx.StopProcess();
	}
};

function uploadImage1() {
	var uploadOcx = document.getElementById("uploadOcx");
	uploadOcx.ServerUrl = getUrl();
	uploadOcx.StartProcess("文件上传");
	try {
		var reg = /\\/g;
		var response,fileName,fileBase64,xhr,ret;
		for ( var i = 0; i < thumb1().Thumbnail_GetCount(); i++) {
			response = "";
			filePath = thumb1().Thumbnail_GetFileName(i);
			uploadOcx.AddInfo("开始上传文件[" + filePath);
			if (!!uploadOcx.ToBase64) {
				fileName = filePath.replace(reg, '/');
				fileName = fileName.substring(fileName.lastIndexOf("/")+1);
				var param = {
					fileName : fileName,
					file : uploadOcx.ToBase64(filePath)
				};
				param = JSON.stringify(param);
				xhr = justep.Request.sendHttpRequest(uploadOcx.ServerUrl, param,
						"application/json");
				if (justep.Request.isSuccess(xhr))
					response = xhr.responseText;
			}else{
				response = uploadOcx.Upload(filePath);
			}
			ret = JSON.parse(response);
			window.parent.materialManager.systemRunnerReceive({
				data : {
					kind : 'upload',
					attachs : [ ret.result ]
				}
			});
		}
		thumb1().Thumbnail_Clear(true);
	} finally {
		uploadOcx.StopProcess();
	}
}
gpyFrame.trigger8Click = function(event) {
	if (thumb1().Thumbnail_GetCount() == 0)
		return;
	if ($("#ckPdf")[0].checked)
		uploadPdf1();
	else
		uploadImage1();
};

function createHtttp() {
	var url = "/UI/base/system/scan/attachUpload.j?subPath="
			+ encodeURIComponent(gpyFrame.getParam().subPath);
	url = justep.Request.convertURL(url, false);
	url = location.protocol + "//" + location.host + url;
	var http = plugin().Global_CreateHttp(url);// asp服务器demo地址
	return http;
}
function httpUpload(http, filePath, fileName) {
	var plg = plugin();
	if (plg == null || plg.Http_UploadImageFile == null
			|| plg.Http_GetServerInfo == null) {
		alert("未知异常，请重试");
		return;
	}
	var b = plg.Http_UploadImageFile(http, filePath,
			encodeURIComponent(fileName));
	if (plg == null || plg.Http_UploadImageFile == null
			|| plg.Http_GetServerInfo == null) {
		alert("未知异常，请重试");
		return;
	}
	var resp = plg.Http_GetServerInfo(http);
	if (resp.indexOf('}0') > 0)
		response = resp.substr(0, resp.lastIndexOf('0'));
	else
		response = resp;
	var ret = JSON.parse(response);
	var result = ret.result;
	window.parent.materialManager.systemRunnerReceive({
		data : {
			kind : 'upload',
			attachs : [ result ]
		}
	});
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
		var fileName = gpyFrame.getParam().materialName + ".pdf";
		var filePath = scanTempFolder + "\\" + fileName;
		plugin().ImageList_SaveToPDF(imgList, 2, filePath, pdfFlag);
		var b = httpUpload(http, filePath, fileName);
		plugin().ImageList_Release(imgList);
		plugin().Http_Release(http);

		if (b) {
			thumb1().Thumbnail_Clear(true);
		}
	} else {
		alert("url 错误");
	}
}

function uploadImage() {
	for ( var i = 0; i < thumb1().Thumbnail_GetCount(); i++) {
		if (!thumb1().Thumbnail_GetCheck(i)) {
			continue;
		}
		var http = createHtttp();
		var filePath = thumb1().Thumbnail_GetFileName(i);
		var fileName = GetFileName(filePath);
		var b = httpUpload(http, filePath, fileName);
		if (!b) {
			alert('上传异常！');
			return;
		}
		plugin().Http_Release(http);
	}
	alert("上传成功！");
	thumb1().Thumbnail_Clear(true);
}

gpyFrame.trigger6Click = function(event) {
	$.cookie("scanTempFolder", $("#inputScanTempFolder").val());
	alert("设置成功！");
};

gpyFrame.model1ModelConstruct = function(event) {
	$("#lblLoading").hide();
};

gpyFrame.trgRefreshClick = function(event) {
	location.reload();
};

// --------------------一键上传
function saveScanFiles(ds, rowID) {
	if (ds == null) {
		ds = window.parent.materialManager.getCurrentDs();
		rowID = ds.getCurrentID();
	}
	var list = [];
	ds.setValue("pdf", "是", rowID);
	for ( var i = 0; i < thumb1().Thumbnail_GetCount(); i++) {
		// if (!thumb1().Thumbnail_GetCheck(i)) {
		// continue;
		// }
		var filePath = thumb1().Thumbnail_GetFileName(i);
		list.push(filePath);
	}
	if (list.length == 0) {
		ds.setValue("scanCount", "", rowID);
		ds.setValue("files", "", rowID);
	} else {
		ds.setValue("scanCount", list.length, rowID);
		ds.setValue("files", JSON.stringify(list), rowID);
	}
};

function showScanFiles(ds) {
	thumb1().Thumbnail_Clear(false);
	var files = ds.getValue("files");
	if (files == "")
		return;
	files = JSON.parse(files);
	for ( var i = 0; i < files.length; i++) {
		thumb1().Thumbnail_Add(files[i]);
	}
	setTimeout(function() {
		for ( var i = 0; i < files.length; i++) {
			thumb1().Thumbnail_SetCheck(i, true);
		}
	}, 100);
};

function uploadAll(ds) {
	var uploadOcx = document.getElementById("uploadOcx");
	uploadOcx.ServerUrl = getUrl();
	uploadOcx.StartProcess("批量文件上传");
	try {
		for ( var i = 0; i < ds.getCount(); i++) {
			var id = ds.getID(i);
			var files = ds.getValue("files", id);
			if (files == "")
				continue;
			var pdf = ds.getValue("pdf", id) == "是";
			files = JSON.parse(files);
			if (pdf) {
				var lFiles = "";
				for ( var j = 0; j < files.length; j++) {
					if (j == 0)
						lFiles = files[0];
					else
						lFiles = lFiles + "&" + files[j];
				}
				uploadOcx.AddInfo("开始打包PDF");
				var response = "";
				var fileName = ds.getValue('fMaterialName', id) + ".pdf";
				fileName = scanTempFolder + "\\"
						+ fileName.replace(/^\s+|\s+$/gm, '');
				if (!!uploadOcx.ToPdfBase64) {
					var fileBase64 = uploadOcx.ToPdfBase64(lFiles);
					if(fileBase64==""){
						alert("转换"+fileName+"异常");
						continue;
					}
					var param = {
						fileName : fileName,
						file : fileBase64
					};
					param = JSON.stringify(param);
					var xhr = justep.Request.sendHttpRequest(uploadOcx.ServerUrl, param,
							"application/json");
					if (justep.Request.isSuccess(xhr))
						response = xhr.responseText;
				} else{
					var filePath = uploadOcx.ToPDF(lFiles, fileName);
					if (filePath == "") {
						alert("转换"+fileName+"异常");
						continue;
					}
					uploadOcx.AddInfo("开始上传文件" + filePath);
					response = uploadOcx.Upload(filePath);
				}
				if (response == "")
					continue;
				var ret = JSON.parse(response);
				window.parent.materialManager.systemRunnerReceive({
					data : {
						kind : 'upload',
						attachs : [ ret.result ],
						rowID : id
					}
				});
			}
		}
	} finally {
		uploadOcx.StopProcess();
	}
};

