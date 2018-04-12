var deptProcessOrder = {};

deptProcessOrder.gridOrgTreeRowDblClick = function(event){
	justep.xbl("dOrgTree").expandRow(event.rowID);
};

deptProcessOrder.gridOrgTreeRowClick = function(event){
	var deptID = justep.xbl("dOrgTree").getCurrentID();
	var B_ProcessOrder = justep.xbl("B_ProcessOrder");
	B_ProcessOrder.setFilter("filter","B_ProcessOrder.fDeptID='"+deptID+"'");
	B_ProcessOrder.refreshData();
};

deptProcessOrder.model1Load = function(event){
	var deptID = justep.xbl("dOrgTree").getCurrentID();
	justep.xbl("dOrgTree").expandRowsToLevel(0,deptID);
	var B_ProcessOrder = justep.xbl("B_ProcessOrder");
	B_ProcessOrder.setFilter("filter","B_ProcessOrder.fDeptID='"+deptID+"'");
	B_ProcessOrder.refreshData();
};

deptProcessOrder.selectProcessClick = function(event){
	justep.xbl("dlgSelectProcess").open();
};

deptProcessOrder.dlgSelectProcessReceive = function(event){
	var deptID = justep.xbl("dOrgTree").getCurrentID();
	var B_ProcessOrder = justep.xbl("B_ProcessOrder");
	var data = event.data;
	for ( var n in data) {
		var row = data[n];
		row.fDeptID = deptID;
		if (B_ProcessOrder.find([ "fProcess" ], [ row.fProcess ]).length == 0) {
			B_ProcessOrder.newData({
				defaultValues : [ row ]
			});
		}
	}
};

deptProcessOrder.dlgSelectProcessInit = function(event){
	event.source.dialog.setWidth($(window).width() * 0.8);
	event.source.dialog.setHeight($(window).height() * 0.95);
};
