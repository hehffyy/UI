var confirmDlg = {};

confirmDlg.btnOKClick = function(event) {
	justep.xbl("windowReceiver1").windowEnsure("OK");
};

confirmDlg.btnCancleClick = function(event) {
	justep.xbl("windowReceiver1").windowCancel();
};
