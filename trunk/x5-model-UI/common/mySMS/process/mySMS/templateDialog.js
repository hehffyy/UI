var templateDialog = {};

templateDialog.trigger1Click = function(event){
	justep.xbl("windowReceiver").windowEnsure(justep.xbl("B_personPhoneTemplate").getCurrentID());
};

templateDialog.trigger2Click = function(event){
	justep.xbl("windowReceiver").windowCancel();
};

templateDialog.grid1RowDblClick = function(event){
	justep.xbl("windowReceiver").windowEnsure(justep.xbl("B_personPhoneTemplate").getCurrentID());
};
