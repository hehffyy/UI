var byslDialog = {};


byslDialog.receiver1Receive = function(event){
	if(event.data.bizRecId){
		var ds = justep.xbl("bizData1");
		ds.setFilter("sys_filter","fBizRecId='" + event.data.bizRecId+"'");
		ds.refreshData();
	}
};

byslDialog.sureBtnClick = function(event){
	var idea = justep.xbl("bizData1").getValue("fBYSLYJ");
	if(idea=="")
		return;
   justep.xbl("receiver1").windowEnsure(idea);	
};

byslDialog.cancelBtnClick = function(event){
  justep.xbl("receiver1").windowCancel();	
};
