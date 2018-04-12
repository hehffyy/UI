var commonScanActivity = {};
var scanControl;

commonScanActivity.windowReceiver1Receive = function(event) {
	$(
			'<OBJECT id="scanControl" height=100% width=100%   TYPE="application/x-itst-activex"  CLSID="{24912356-E1AA-44EB-B0BF-170F0BFCFDEE}"></OBJECT>')
			.appendTo($("#view"));
	try {
		scanControl = document.getElementById("scanControl");
		scanControl.Company = '肇庆不动产登记中心';//如果用客户名称，不同项目需要修改该配置；如果用公司名称，则不需要改动
		scanControl.Key = '9224B527514C5D55238238A4209928D89B5C10';
	} catch (err) {
		scanControl = null;
		alert("初始化设备异常");
	}
	if (event.data) {
		var data = event.data;
		var scanSubPath = data.subPath;
		var materialName = data.materialName;
		var url = "/UI/base/system/scan/attachUpload.j?subPath="
				+ encodeURIComponent(scanSubPath);
		url = justep.Request.convertURL(url, false);
		url = location.protocol + "//" + location.host + url;
		scanControl.InitParam(url, materialName);
	}
};

commonScanActivity.btnCancelClick = function(event) {
	// justep.xbl("windowReceiver1").windowCancel();
	justep.Portal.closeWindow();
};

commonScanActivity.btnUploadClick = function(event) {
	var uploadResult = scanControl.Upload();
	var strs = uploadResult.split("$");
	var resultDocIds = [];
	for ( var i = 0; i < strs.length; i++) {
		var response = justep.XML.fromString(strs[i]);
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
					resultDocIds.push(docIds);
				}
			} else {
				butone.Dialog.error(justep.Request.getMessage(response));
			}
		}
	}
	justep.xbl("windowReceiver1").sendData({
		kind : 'upload',
		attachs : resultDocIds
	});
};
