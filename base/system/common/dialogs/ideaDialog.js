var ideaDialog = {};


ideaDialog.windowReceiver1Receive = function(event){
	var data = event.data;
	var ds = justep.xbl("data1");
	ds.newData();
	if(data!=null){
		ds.setValue('idea',data.idea);
	}
};

ideaDialog.trgOKClick = function(event){
	justep.xbl("windowReceiver1").windowEnsure({idea:justep.xbl("data1").getValue('idea')});
};

ideaDialog.trgCancelClick = function(event){
	justep.xbl("windowReceiver1").windowCancel();
};
