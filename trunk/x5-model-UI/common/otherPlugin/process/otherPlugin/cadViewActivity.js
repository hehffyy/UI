var cadViewActivity = {};
var mxOcx;

cadViewActivity.modeLoad = function(event) {
};

cadViewActivity.windowReceiver1Receive = function(event) {
	debugger;
	var html = '<object CLSID="{74A777F8-7A8F-4e7c-AF47-7074828086E2}"  TYPE="application/x-itst-activex"   id="MxDrawXCtrl"  width=99% height=99% ></object>';
	$(html).appendTo($("#rootView"));
	mxOcx = document.getElementById('MxDrawXCtrl');
	if(mxOcx.ShowCommandWindow==null){
		alert('未安装CAD插件，请联系管理员');
		return;
	}
	mxOcx.ShowCommandWindow = false;
	mxOcx.Iniset ='UseTmpMessageCycle=N';
	mxOcx.ShowToolBar("绘图工具", false);
	mxOcx.ShowToolBar("编辑工具", false);
	var data= event.data;
	data = JSON.parse(data);
	data = data[0];
	var docPath = data.docPath
	var fileID =  data.fileID;
	var url = justep.doc.InnerUtils.getURLByFileID(docPath, fileID);
	url = location.protocol + "//" + location.host + url;
	if (!mxOcx.IsIniting()) {
		mxOcx.OpenDwgFile(url);
		mxOcx.setCurrentLayout("布局名");
		mxOcx.focus();
		mxOcx.SendStringToExecute("ZoomE");
		mxOcx.SendStringToExecute("P");
	}
};

cadViewActivity.modeXBLLoaded = function(event) {

};
