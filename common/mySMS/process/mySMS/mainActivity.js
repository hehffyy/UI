var mainActivity = {};

mainActivity.trigger1Click = function(event){
	justep.xbl("templateRunner").open();
};

mainActivity.trigger2Click = function(event){
	justep.xbl("sendRunner").open();
};

mainActivity.grid1RowDblClick = function(event){
	justep.xbl("sendRunner").open({rowID:justep.xbl("VIEW_SMSINFO").getValue("FID"),operate:"edit"});
};

mainActivity.sendRunnerReceive = function(event){
	justep.xbl("VIEW_SMSINFO").refreshData();
};
