var editStageDlg = {};

editStageDlg.trgCancelClick = function(event){
	justep.xbl("windowReceiver1").windowCancel();
};

editStageDlg.trgOKClick = function(event){
	var dsStage = justep.xbl("dsStage");
	dsStage.saveData();
	justep.xbl("windowReceiver1").windowEnsure({});
};


editStageDlg.windowReceiver1Receive = function(event){
	var id = event.data;
	justep.xbl("dsStage").setFilter("id", "B_SuperviseStage='"+id+"'");
	justep.xbl("dsStage").refreshData();
};
