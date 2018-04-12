var mainActivity = {};
 
mainActivity.grid1RowDblClick = function(event){
	justep.xbl("tabPanel1").setTabActive("tabDetail");	
};
 
mainActivity.trigger3Click = function(event){
	justep.xbl("dataMain").newData();
	justep.xbl("tabPanel1").setTabActive("tabDetail");	
};
