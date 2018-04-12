var editRecDlg = {};

editRecDlg.trigger2Click = function(event){
	justep.xbl("windowReceiver").windowCancel();	
};

editRecDlg.trigger1Click = function(event){
	justep.xbl("windowReceiver").windowEnsure(justep.xbl("data"));
};

editRecDlg.windowReceiverReceive = function(event){
	var data = justep.xbl("data");
	data.setValue("fStatus",event.data.fStatus);
	data.setValue("fLevel",event.data.fLevel);
};
