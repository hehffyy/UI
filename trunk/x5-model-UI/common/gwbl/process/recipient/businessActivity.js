var businessActivity = {};

businessActivity.newItemClick = function(event) {
	justep.xbl("dataMain").newData();
	justep.xbl("tabPanel1").setTabActive("tabDetail");
};

businessActivity.grid1RowDblClick = function(event) {
	justep.xbl("tabPanel1").setTabActive("tabDetail");
};

businessActivity.grid2RowDblClick = function(event) {
	justep.xbl("tabPanel1").setTabActive("tabDetail");
};
