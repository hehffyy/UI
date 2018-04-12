var recSelDlg = {};


recSelDlg.trgCancelClick = function(event){
	justep.xbl("windowReceiver1").windowCancel();
};

recSelDlg.trgOKClick = function(event){
	var list = new justep.Request.ListParam();
	list.add(justep.xbl("dsRec").getValue("fBizRecId"));
	var data = list;
	justep.xbl("windowReceiver1").windowEnsure(data);
};
