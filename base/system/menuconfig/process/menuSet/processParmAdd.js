var processParmAdd = {};

processParmAdd.trg_ensureClick = function(event) {
	var param = justep.xbl("data1").getValue("param");
	
	justep.xbl("windowReceiver1").windowEnsure(param);
};

processParmAdd.trg_cancelClick = function(event) {
	justep.xbl("windowReceiver1").windowCancel();
};

processParmAdd.windowReceiver1Receive = function(event) {
	var param = event.data.param;
	justep.xbl("data1").setValue("param", param);
};
