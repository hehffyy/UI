var hwSignActivity = {};
var HWPenSignObj;
hwSignActivity.model1XBLLoaded = function(event) {
	$(
			'<OBJECT id="HWPenSign" height=0 width=0  TYPE="application/x-itst-activex"  CLSID="{E8F5278C-0C72-4561-8F7E-CCBC3E48C2E3}"></OBJECT>')
			.appendTo($("#viewSign"));
	try {
		HWPenSignObj = document.getElementById("HWPenSign");
		HWPenSignObj.HWSetBkColor(0xE0F8E0);
		HWPenSignObj.HWSetCtlFrame(2, 0x000000);
		HWPenSignObj.HWInitialize();
	} catch (err) {
		HWPenSignObj = null;
		alert("初始化设备异常");
	}
};

hwSignActivity.model1UnLoad = function(event) {
	if (HWPenSignObj)
		HWPenSignObj.HWFinalize();
};

hwSignActivity.btnClearClick = function(event) {
	HWPenSignObj.HWClearPenSign();
};

hwSignActivity.btnMouseModeClick = function(event) {
	HWPenSignObj.HWMouseEnable(1);
};

hwSignActivity.btnKzpClick = function(event) {
	HWPenSignObj.HWSwitchMonitor(1, 0);
};

hwSignActivity.btnXsqClick = function(event) {
	HWPenSignObj.HWSwitchMonitor(0, 0);
};

hwSignActivity.btnSaveClick = function(event) {
	debugger;
	//var stream='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';
	var stream = HWPenSignObj.HWGetBase64Stream(3);
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("imageStr",stream);
	var options = {};
	options.process = "/base/personInfo/process/personInfo/personInfoProcess";
	options.activity = "mainActivity";
	options.action = "saveDeviceSignImageAction";
	options.parameters = actionParam;
	options.contentType = "application/json";
	options.dataType = "json";
	var ret = justep.Request.sendBizRequest2(options);
	if (justep.Request.isSuccess(ret)) {
		justep.xbl("windowReceiver1").windowEnsure(ret.responseJSON.data.value);
	}
};


hwSignActivity.windowReceiver1Receive = function(event){
	debugger;
};
