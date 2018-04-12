var bizSelDialog = {};


bizSelDialog.windowReceiver1Receive = function(event){
	debugger;
	var sxbh = event.data.sxbh;
	var ds = justep.xbl("dsBiz");
	ds.setFilter("sys_Filter","fFWSXBH='" + sxbh+"'");
	ds.refreshData();
	
};

bizSelDialog.btnCancleClick = function(event){
	justep.xbl("windowReceiver1").windowCancel();
};

bizSelDialog.btnOKClick = function(event){
debugger;
  var ds  = justep.xbl("dsBiz");
  if(ds.getCount()==0)
     justep.xbl("windowReceiver1").windowCancel();
  else
	 justep.xbl("windowReceiver1").windowEnsure(ds.getCurrentID());	
};

bizSelDialog.grid1RowDblClick = function(event){
var ds  = justep.xbl("dsBiz");
  if(ds.getCount()==0)
     return;
  else
	 justep.xbl("windowReceiver1").windowEnsure(ds.getCurrentID());
};
