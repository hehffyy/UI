var folderDlg = {};
folderDlg.windowReceiver1Receive = function(event){
	this._data=event.data;
};

folderDlg.btnCancelClick = function(event){
   justep.xbl("windowReceiver1").windowCancel();	
};

folderDlg.btnOKClick = function(event){
	 var data = this._data;
	 data.name = document.getElementById("folderInput").value;
	 justep.xbl("windowReceiver1").windowEnsure(data);
};
