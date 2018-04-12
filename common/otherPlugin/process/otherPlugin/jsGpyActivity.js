var jsGpyActivity = {};

// 初始化插件
jsGpyActivity.init = function() {
	debugger;
	this.inited = false;
	this.files = {};
	// 设置扫描临时文件夹
	this.scanTempFolder = "D:\\扫描临时文件夹";
	var temp = $.cookie("scanTempFolder");
	if (temp) {
		this.scanTempFolder = temp;
		$("#inputScanTempFolder").val(this.scanTempFolder);
	}
	// 创建视频区域
	var html = '<object CLSID="{454C18E2-8B7D-43C6-8C17-B1825B49D7DE}"  TYPE="application/x-itst-activex"   id="captrue"  width=99% height=99% ></object>';
	try {
		$(html).appendTo($("#divCamara"));
	} catch (err) {
	}

	this.captrue = document.getElementById("captrue");
	if (this.captrue.bStartPlay == null) {
		alert('请安装插件');
		return;
	}
	var deviceId = this.captrue.sGetDevicesId();
	if (deviceId == null) {
		alert("无法获取设备信息，请联系管理员！")
	}
	// 创建扫描路径
	this.captrue.bCreateDir(this.scanTempFolder);
	this.captrue.vSetImageQuality(30);
	this.inited = true;
};

jsGpyActivity.model1XBLLoaded = function(event) {
	this.init();
};

jsGpyActivity.btnOpenClick = function(event) {
	if (this.inited) {
		var str = this.captrue.bStopPlay();
		var str = this.captrue.bStartPlay();
	}
};

jsGpyActivity.trigger2Click = function(event) {
	if (this.inited) {
		var str = this.captrue.bStopPlay();
	}
};

jsGpyActivity.trigger3Click = function(event) {
	if (this.inited) {
		var str = this.captrue.bStopPlay();
		var str = this.captrue.bStartPlayRotate(270);
	}
};

jsGpyActivity.trigger4Click = function(event) {
	if (!this.inited)
		return;
	var str = this.captrue.vSetDelHBFlag(1);
};

jsGpyActivity.trigger5Click = function(event) {
	if (!this.inited)
		return;
	var str = this.captrue.vSetCapturePin();
	this.captrue.bStartPlay();
};

jsGpyActivity.trigger1Click = function(event) {
	if (!this.inited)
		return;
	var str = this.captrue.displayVideoPara();
};

jsGpyActivity.trigger7Click = function(event) {
	debugger;
	if (!this.inited)
		return;
	var base64 = this.captrue.sGetBase64();
	base64 = "data:image/jpg;base64," + base64;
	var guid = justep.Utils.randomString();
	var str = this.captrue.bSaveJPG(this.scanTempFolder+"\\", guid);
	var fileName = this.scanTempFolder + "\\" + guid + ".jpg";
	this.files[guid] = {
		fileName : fileName
	};
	// 新增thumb
	var me = this;
	debugger;
	var imgHtml = "<tr  style='height:110px'><td ><div style='height:100px'><img id='"
			+ guid
			+ "' src='"
			+ base64
			+ "' width='100%' height='80px'/><span>"+this.scanFileHead+"("+$(".link").length+")"+"</span></div></td><td width=40px style='text-align:center'><a  class='link'>[删除]</a></td></tr>";
	$(imgHtml).appendTo($("#imgTable"));
	$(".link").click(function(evt) {
		var $tr = $(evt.target).parent().parent();
		var id = $tr.children("td").children("div").children("img")[0].id;
		delete me.files[id];
		$tr.remove();
	});
};

jsGpyActivity.trigger6Click = function(event) {
	$.cookie("scanTempFolder", $("#inputScanTempFolder").val());
	this.scanTempFolder = $("#inputScanTempFolder").val();
	this.captrue.bCreateDir(this.scanTempFolder);
	alert("设置成功！");
};

jsGpyActivity.trigger8Click = function(event) {
	var pdffileName = this.scanFileHead;
	this.captrue.bSavePDFStart(this.scanTempFolder+"\\", pdffileName);
	for ( var key in this.files) {
		var fileName = this.files[key].fileName;
		this.captrue.bAddPDFColorPage(fileName, 0.331);
	}
	this.captrue.bSavePDFEnd();
	if ($("#ckPdf")[0].checked) {
		var url = "/UI/base/system/scan/attachUpload.j?subPath="
				+ encodeURIComponent(this.scanSubPath)+"&fileName="+encodeURIComponent(pdffileName+".pdf");
		url = justep.Request.convertURL(url, false);
		var pdf= this.scanTempFolder+"\\"+pdffileName+".pdf";
		var response = this.captrue.sUpLoadImageEx2(pdf,
				location.hostname, '80', url, true, true);
//		var response = this.captrue.bUpLoadImage(pdf,
//				location.hostname, '80', url);
		response = response.substr(0, response.lastIndexOf('0'));
		response = justep.XML.fromString(response);
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
						butone.Dialog.error(justep.Request
								.getMessage(ret.error));
						return;
					}
					var docIds = ret.result;
					docIds.docName =pdffileName+".pdf";
					justep.xbl("sysReceiver").sendData({
						kind : 'upload',
						attachs : [ docIds ]
					});
				}
			} else {
				butone.Dialog.error(justep.Request.getMessage(response));
			}
		}
	} else {
	};
};

jsGpyActivity.sysReceiverReceive = function(event) {
	if (event.data) {
		var data = event.data;
		this.scanFileHead = data.materialName;
		this.scanSubPath = data.subPath;
	}
};
