var offerActivity = {};

offerActivity.trigger1Click = function(event){
	this.dataBz.setFilter("bz_Filter","fBizRecId='" + this.bizRecId+"'");
	this.dataBz.refreshData();
	if(this.dataBz.getCount()<1){
		this.dataBz.newData();
		this.dataBz.setValue("fBizRecId", this.bizRecId);
		this.dataBz.setValue("fSFGQ", this.isuspended);
		this.dataBz.saveData();
	}
	this.dataBzsq.setValue("fBzId",this.dataBz.getCurrentID());
	this.dataBzsq.setValue("fBizRecId",this.bizRecId);
	this.dataBzsq.saveData();
	justep.xbl("sysReceiver").windowEnsure();
};

offerActivity.btnCancelClick = function(event){
	justep.xbl("sysReceiver").windowCancel();
};

offerActivity.sysReceiverReceive = function(event){
   this.bizRecId = event.data.bizRecId;
   this.isuspended = event.data.isuspended;
   this.dataBz = justep.xbl("dataBz");
   this.dataBzsq = justep.xbl("dataBzsq");
   this.dataBzsq.setFilter("offer_Filter","fBizRecId='" + this.bizRecId+ "' and fPersonId='" + justep.Context.getCurrentPersonID()+"'");
   this.dataBzsq.refreshData();
   if(this.dataBzsq.getCount()==0){
	   this.dataBzsq.newData();
	   this.dataBzsq.setValue("fBizRecId",this.bizRecId);
   }
};
