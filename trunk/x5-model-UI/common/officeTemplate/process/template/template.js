var template = {};

template.btnOKClick = function(event) {
	var id = justep.xbl("dsTemplate").getCurrentID();
	justep.xbl("sysReceiver").windowEnsure(id);
};

template.btnCancleClick = function(event) {
	justep.xbl("sysReceiver").windowCancel();
};

template.grid1RowDblClick = function(event) {
	var id = justep.xbl("dsTemplate").getCurrentID();
	justep.xbl("sysReceiver").windowEnsure(id);
};
