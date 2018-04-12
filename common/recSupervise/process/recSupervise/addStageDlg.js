var addStageDlg = {};
var dbid;
addStageDlg.trgCancelClick = function(event){
	justep.xbl("windowReceiver1").windowCancel();
};

addStageDlg.trgOKClick = function(event){
	var dsStage = justep.xbl("dsStage");
	dsStage.saveData();
	justep.xbl("windowReceiver1").windowEnsure({});
};

addStageDlg.windowReceiver1Receive = function(event){
	dbid = event.data;
	justep.xbl("dsStage").setFilter("fDbID", "fDbID='"+dbid+"'");
	justep.xbl("dsStage").refreshData();
};

addStageDlg.trgAddClick = function(event){
	var dsStage = justep.xbl("dsStage");
	dsStage.newData();
	dsStage.setValue("fDbID", dbid);
	dsStage.setValue("fStage", "新增阶段");
};

addStageDlg.trgDelClick = function(event){
	var dsStage = justep.xbl("dsStage");
	dsStage.deleteData();
};
