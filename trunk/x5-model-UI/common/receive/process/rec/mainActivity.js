var mainActivity = {};
var buttonArray = new Array();
var flevel;

mainActivity.trigger4Click = function(event){
	justep.xbl('windowDialog1').open();
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
mainActivity.dataMainAfterRefresh = function(event){
	var data = justep.xbl("dataMain");
	if (!data)
		return;
	data.expandAll(true);
};

/**
	name:windowDialog#onReceive}
	@param {function} onInit 初始化事件，参见{@link UI.windowDialog#onInit}
	@param {function} onOpen 对话框打开事件，参见{@link UI.windowDialog#onOpen}
	@param {function} onClose 对话框关闭事件，参见{@link UI.windowDialog#onClose}
description: 构造函数
	@example
	//动态创建
	var dialog = new justep.WindowDialog(id, url, title);
*/
mainActivity.windowDialog1Receive = function(event){
	var groupData = justep.xbl("dataMain");
	var processes = new justep.Request.ListParam();
	var activities = new justep.Request.ListParam();
	var activitiesFNames = new justep.Request.ListParam();
	for ( var i = 0; i < event.data.getRowsNum(); i++) {
		var process = event.data.getValueByName("process", i);
		var activity = event.data.getValueByName("activity", i);
		var activityFName = event.data.getValueByName("activityFName", i);
		processes.add(new justep.Request.SimpleParam(process, justep.XML.Namespaces.XMLSCHEMA_STRING));
		activities.add(new justep.Request.SimpleParam(activity,	justep.XML.Namespaces.XMLSCHEMA_STRING));
		activitiesFNames.add(new justep.Request.SimpleParam(activityFName, justep.XML.Namespaces.XMLSCHEMA_STRING));
	}
	var params = new justep.Request.ActionParam();
	params.setInteger("flevel", flevel);
	params.setList("activities", activities);
	params.setList("processes", processes);
	params.setList("activitiesFNames", activitiesFNames);
	params.setString("fBusinessGroupId", groupData.getCurrentID());
	
	justep.Request.sendBizRequest2({
		dataType: "json",
		action: "setTreeCatalogAction",
		parameters: params, 
		callback: function(callbackData) {
			if (callbackData.state) {
				groupData.refreshData();
			}
		}
	});
	
};

//添加收件信息	
mainActivity.trigger1Click = function(event){
	justep.xbl('windowDialog2').open();
};


/**
	name:windowDialog#onReceive}
	@param {function} onInit 初始化事件，参见{@link UI.windowDialog#onInit}
	@param {function} onOpen 对话框打开事件，参见{@link UI.windowDialog#onOpen}
	@param {function} onClose 对话框关闭事件，参见{@link UI.windowDialog#onClose}
description: 构造函数
	@example
	//动态创建
	var dialog = new justep.WindowDialog(id, url, title);
*/
mainActivity.windowDialog2Receive = function(event){
	var groupData = justep.xbl("dataMain");
	
	var processes = new justep.Request.ListParam();
	var activities = new justep.Request.ListParam();
	var activitiesFNames = new justep.Request.ListParam();
	for ( var i = 0; i < event.data.getRowsNum(); i++) {
		var process = event.data.getValueByName("process", i);
		var activity = event.data.getValueByName("activity", i);
		var activityFName = event.data.getValueByName("activityFName", i);
		processes.add(new justep.Request.SimpleParam(process, justep.XML.Namespaces.XMLSCHEMA_STRING));
		activities.add(new justep.Request.SimpleParam(activity,	justep.XML.Namespaces.XMLSCHEMA_STRING));
		activitiesFNames.add(new justep.Request.SimpleParam(activityFName, justep.XML.Namespaces.XMLSCHEMA_STRING));
	}
	var params = new justep.Request.ActionParam();
	params.setList("activities", activities);
	params.setList("processes", processes);
	params.setList("activitiesFNames", activitiesFNames);
	params.setString("fBusinessGroupId", groupData.getCurrentID());
	
	justep.Request.sendBizRequest2({
		dataType: "json",
		action: "setTreeReceiveAction",
		parameters: params, 
		callback: function(callbackData) {
			if (callbackData.state) {
				var listData = justep.xbl("listData");
				listData.refreshData();
			}
		}
	});
	
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
mainActivity.grdMainRowClick = function(event){
	var groupData = justep.xbl("dataMain");
	var listData = justep.xbl("listData");
	var currentID = groupData.getCurrentID();
	flevel = groupData.getValue("fLevel",currentID);
	if(flevel == ""){
		justep.xbl("trigger4").setDisabled(true);
		justep.xbl("trigger1").setDisabled(true);
		justep.xbl("deleteTrigger").setDisabled(true);
		cancelDisabled();
	}
	else if(flevel ==1){
		justep.xbl("trigger4").setDisabled(false);
		justep.xbl("deleteTrigger").setDisabled(false);
		justep.xbl("trigger1").setDisabled(false);
		cancelDisabled();
	}
	else if(flevel ==2){
		justep.xbl("trigger4").setDisabled(false);
		justep.xbl("trigger1").setDisabled(false);
		justep.xbl("deleteTrigger").setDisabled(false);
		//禁止新建子节点
		$("div#menuButton1-menu li:eq("+0+")")
			.find("a").unbind("click")
			.bind("click",function(){return false;})
			.attr("onclick","")
			.find("span.label").css("color","#ccc");

	}
	else if(flevel >= 3){
		justep.xbl("trigger4").setDisabled(true);
		
		justep.xbl("deleteTrigger").setDisabled(false);
		//禁止新建子节点
		$("div#menuButton1-menu li:eq("+0+")")
			.find("a").unbind("click")
			.bind("click",function(){return false;})
			.attr("onclick","")
			.find("span.label").css("color","#ccc");
			
		$("div#menuButton1-menu li:eq("+1+")")
			.find("a").unbind("click")
			.bind("click",function(){return false;})
			.attr("onclick","")
			.find("span.label").css("color","#ccc");
			
		if(listData.getCount()>=1){
			justep.xbl("trigger1").setDisabled(true);
		}else{
			justep.xbl("trigger1").setDisabled(false);
		}
	}
		

	

};

mainActivity.model1Load = function(event){
	justep.xbl("trigger4").setDisabled(true);
	justep.xbl("deleteTrigger").setDisabled(true);
	var index = 0;
	$("div#menuButton1-menu li a").each(function(){
		buttonArray[index++] = $(this).attr("onclick");
	});
};

function cancelDisabled(){
		$("div#menuButton1-menu li:eq("+0+")")
			.find("a").unbind("click")
			.bind("click",buttonArray[0])
			.find("span.label").css("color","black");
			
		$("div#menuButton1-menu li:eq("+1+")")
			.find("a").unbind("click")
			.bind("click",buttonArray[1])
			.find("span.label").css("color","black");
}