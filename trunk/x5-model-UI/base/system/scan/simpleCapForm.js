var simpleCapForm = {};

simpleCapForm.btnOkClick = function(event) {
	var device = capOcx.GetDevice();
	$.cookie("capDevice", device);
	var fileName = 'D:\\扫描临时文件夹\\' + $("#inputFile").val() + ".jpg";
	var fileName = capOcx.SaveJPG(fileName);
	if (fileName == "") {
		alert("您可能未拍摄");
		return;
	}
	var response = uploadOcx.Upload(fileName);
	if (response == '')
		return;
	var ret = JSON.parse(response);
	var result = ret.result;
	justep.xbl("windowReceiver").windowEnsure({
		kind : 'upload',
		attachs : [ result ]
	});
};

simpleCapForm.btnCancelClick = function(event) {
	justep.xbl("windowReceiver").windowCancel();
};

simpleCapForm.model1XBLLoaded = function(event) {
	$(
			'<OBJECT id="uploadOcx" height=0 width=0  TYPE="application/x-itst-activex"  CLSID="{A71EAFBE-E90D-4224-AB73-B4A8214F8858}"></OBJECT>')
			.appendTo($("#capView"));
	$(
			'<OBJECT id="capOcx" height=100% width=100%  TYPE="application/x-itst-activex"  CLSID="{0541294C-6298-47D4-8A07-D60B36C6826E}"></OBJECT>')
			.appendTo($("#capView"));
	uploadOcx = document.getElementById("uploadOcx");
	capOcx = document.getElementById("capOcx");
};

simpleCapForm.windowReceiverReceive = function(event) {
	debugger;
	var materialName = event.data.materialName;
	$("#inputFile").val(materialName);
	subPath = event.data.subPath;
};
function getUrl() {
	var url = "/UI/base/system/scan/attachUpload.j?subPath="
			+ encodeURIComponent(subPath);
	url = justep.Request.convertURL(url, false);
	url = location.protocol + "//" + location.host + url;
	return url;
};

simpleCapForm.model1Load = function(event) {
	// 检测是否安装插件
	if (!justep.Browser.IE && capOcx.Open == null) {
		$("#capOcx").hide();
		var baseInstall = "<center style='margin-top:100px'><font color='#FF00FF'>博通基础运行插件未安装!点击这里<a href='"
				+ justep.Request.convertURL(
						"/UI/base/plugins/博通基础运行插件.exe", true)
				+ "' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font></center>";
			$(baseInstall).appendTo($("#capView"));
		return;
	}
	var device = $.cookie("capDevice");
	if (device) {
		capOcx.Open(device);
	}
	uploadOcx.ServerUrl = getUrl();
};
