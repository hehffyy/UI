var bujiao = {};

bujiao.trigger1Click = function(event){
   debugger;
   var bjInfo = justep.xbl("bzInfo");  
   bjInfo.setValue("fDoState", "补正完成");
   bjInfo.setValue("fReplyPerson", justep.Context.getOperatorName());
   bjInfo.setValue("fReplyTime", justep.System.datetime());
   bjInfo.saveData();
   justep.xbl("receiver1").windowCancel();	
};

bujiao.windowReceiver1Receive = function(event){
	this.bizRecId = event.data.bizRecId;	
	var bzInfo = justep.xbl("bzInfo");
	bzInfo.setFilter("f1", "fBizRecId='" + this.bizRecId+"' and fState='未完成'");
	bzInfo.refreshData();
};

bujiao.trigger2Click = function(event){
   justep.xbl("receiver1").windowCancel();	
};
