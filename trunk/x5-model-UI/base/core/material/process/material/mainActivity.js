var mainActivity = {};

mainActivity.trigger2Click = function(event) {
	justep.xbl('dlgSelectProcess2').open();
};

mainActivity.trgSelectProcessClick = function(event) {
	justep.xbl('dlgSelectProcess').open();
};

mainActivity.dlgSelectProcessReceive2 = function(event) {
	var groupData = justep.xbl("groupData");
	var processes = new justep.Request.ListParam();
	var activities = new justep.Request.ListParam();
	var activitiesFNames = new justep.Request.ListParam();
	for ( var i = 0; i < event.data.getRowsNum(); i++) {
		var process = event.data.getValueByName("process", i);
		var activity = event.data.getValueByName("activity", i);
		var activityFName = event.data.getValueByName("activityFName", i);
		processes.add(new justep.Request.SimpleParam(process,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		activities.add(new justep.Request.SimpleParam(activity,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		activitiesFNames.add(new justep.Request.SimpleParam(activityFName,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
	}
	var params = new justep.Request.ActionParam();
	params.setList("processes", processes);
	params.setList("activitiesFNames", activitiesFNames);

	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "materialProcessAction",
		parameters : params,
		callback : function(callbackData) {
			if (callbackData.state) {
				var funcData = justep.xbl("funcData");
				funcData.saveData();
				funcData.refreshData();
			} else {
				throw new Error(callbackData.response.message
						+ ",请检查所选业务是否生成资源");
			}
		}
	});

};

mainActivity.dlgSelectProcessReceive = function(event) {
	var funcData = justep.xbl("funcData");
	var data = event.data;
	for ( var n in data) {
		var row = data[n];
		if (funcData.find([ "fProcess" ], [ row.fProcess ]).length == 0) {
			funcData.newData({
				defaultValues : [ row ]
			});
		}
	}
};

mainActivity.dlgSelectProcessInit = function(event) {
	event.source.dialog.setWidth($(window).width() * 0.8);
	event.source.dialog.setHeight($(window).height() * 0.95);
};

mainActivity.tabPage2Select = function(event) {

};

mainActivity.trigger1Click = function(event) {
	var funcData = justep.xbl("funcData");
	var fProcess = funcData.getValue("fProcess");
	var mainData = justep.xbl("mainData");
	mainData.setValue("fProcess", fProcess, mainData.getCurrentID());
	mainData.saveData();
	mainData.refreshData();
};

mainActivity.trigger6Click = function(event) {


};

mainActivity.materialDataRefreshCreateParam = function(event) {

	var mapParam = new justep.Request.MapParam();
	mapParam.put('dictType', 'clsx');
	event.param.setMap('variables', mapParam);
};

mainActivity.funcDataIndexChanged = function(event) {
	debugger;
	var funcData = justep.xbl("funcData");
	var fProcess = funcData.getValue("fProcess");
	var mainData = justep.xbl("mainData");
	mainData.setFilter("B_UserProcess", "B_UserProcess.fProcess='" + fProcess
			+ "'  and B_UserProcess.fUserID  is null");
	mainData.refreshData();
};

mainActivity.grid6RowClick = function(event) {
	var mainData = justep.xbl("mainData");
	var guid = mainData.getCurrentID();
	var detailData = justep.xbl("detailData");
	detailData.saveData();
	detailData.setFilter("B_UserBusinessMaterial",
			"B_UserBusinessMaterial.fUserProcessID='" + guid + "'");
	detailData.refreshData();
};

mainActivity.mainDataAfterRefresh = function(event) {
	var mainData = justep.xbl("mainData");
	var guid = mainData.getCurrentID();
	var detailData = justep.xbl("detailData");
	detailData.saveData();
	detailData.setFilter("B_UserBusinessMaterial",
			"B_UserBusinessMaterial.fUserProcessID='" + guid + "'");
	detailData.refreshData();
};



mainActivity.mainDataNewCreateParam = function(event) {
	var data = {
		"fUserID" : ""
	};
	event.defaultValues.push(data);

};

/**
	name:bizData#onAfterRefresh
	description: <b>[回调型事件]</b>业务数据刷新后
	@param {object} event 
	<br/><b>结构如下：</b>
	<xmp> 
	{
		"source" : 组件的js对象
		"limit" : 页大小, 
		"offset" : 偏移,
		"success" : 是否成功刷新
	}
	</xmp>	
*/
mainActivity.funcDataAfterRefresh = function(event){
debugger;

	var funcData = justep.xbl("funcData");
	var fProcess = funcData.getValue("fProcess");
	var mainData = justep.xbl("mainData");
	mainData.setFilter("B_UserProcess", "B_UserProcess.fProcess='" + fProcess
			+ "'  and B_UserProcess.fUserID  is null");
	mainData.refreshData();	
};





/**
	name:grid#onRowClick
	description: 行单击事件
	@param {object} event <br/>
	<b>参数结构：</b>
	<xmp>
	{
		"source" : XFGrid对象, 
		"instance" : instance,
		"grid" : dhtmlxGrid对象,
		"rowID" : 行ID
	}
	</xmp>
*/
mainActivity.grid3RowClick = function(event){
mainActivity.funcDataIndexChanged();	
};
