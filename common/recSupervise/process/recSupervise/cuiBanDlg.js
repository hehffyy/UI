var cuiBanDlg = {};

cuiBanDlg.trigger2Click = function(event){
	justep.xbl("windowReceiver").windowCancel();	
};

cuiBanDlg.trigger1Click = function(event){
	var data = justep.xbl("cuiBanData");
	if(!data.getValue("fCuiBanType")){
		cuiBanDlg.showMessage("催办类型不能为空！",0,"info");
		return;
	}
	if(!data.getValue("fCuiBanInfo")){
		cuiBanDlg.showMessage("催办内容不能为空！",0,"info");
		return;
	}
	justep.xbl("windowReceiver").windowEnsure(data);
};

/**
 * 信息提示框 显示的图标{('info','error','question','right')，或者自定义的img url} 按钮
 * {0(默认):确定；1：确定，取消；2：是，否；3:是,否,取消}
 */
cuiBanDlg.showMessage = function(msg, type, img, callback) {
	new justep.System.showMessage().open({
		msg : msg,
		title : '系统提示',
		type : type,// 0(默认):确定；1：确定，取消；2：是，否；3:是,否,取消
		img : img,// 显示的图标('info','error','question','right')，或者自定义的img url,
		height : 100,
		width : 350,
		callback : callback
	});
};