var mainActivity = {};

mainActivity.openDialog = function(operator, id){
	justep.xbl("detailDialog").open({
		operator : operator,
		id : id
	});
}

mainActivity.insertItemClick = function(event){
	mainActivity.openDialog("new");
};

mainActivity.listGridRowDblClick = function(event){
	var data = justep.xbl('listData');
	var id = data.getCurrentRowId();
	if (!!id)
		mainActivity.openDialog("edit", id);
};
mainActivity.detailDialogReceive = function(event){
	var data = justep.xbl("listData");
	data.refreshData();
	id = event.data.id;
	if (!!id && (data.getCurrentRowId() != id) && (data.getIndex(id) >= 0))
		data.setIndex(data.getIndex(id));
};
mainActivity.editItemClick = function(event){
	var data = justep.xbl('listData');
	var id = data.getCurrentRowId();
	if (!!id)
		mainActivity.openDialog("edit", id);
};

mainActivity.trigger2Click = function(event){
 
	debugger;
	 
	var result;
	var options = {};
	var param = new justep.Request.ActionParam();
	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "scActivityMappingAction";
	options.callback = function(callbackData) {
		callbackData.ignoreError = false;
		if (callbackData.state) {
			result = callbackData.response;
			var data = justep.xbl('listData');
			data.refreshData();
			
		} else {
			alert("执行后台函数失败!" );
		}
	};
	justep.Request.sendBizRequest2(options);
};

mainActivity.trigger5Click = function(event){
	var data = justep.xbl('listData');
	var rowID = data.getCurrentID();
	data.setValue("fStatus", '启用', rowID);
	data.saveData();
	data.refreshData();
};

mainActivity.trigger6Click = function(event){
	var data = justep.xbl('listData');
	var rowID = data.getCurrentID();
	data.setValue("fStatus", '停用', rowID);
	data.saveData();
	data.refreshData();
};
