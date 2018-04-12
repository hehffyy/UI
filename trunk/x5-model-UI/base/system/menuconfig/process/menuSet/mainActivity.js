var mainActivity = {};
// 记录tree打开的路径
mainActivity.fLongPath = "";

// 解析菜单
mainActivity.parseXMLClick = function(event) {
	butone.Dialog.question("解析后菜单将会更新，确认解析?", null, function(e) {
		if (e.status == "yes" || e.status == "ok") {
			mainActivity.parseXML("parseMenu");
		}
	});
};

// 初始化系统菜单
mainActivity.trg_menuInitClick = function(event) {
	butone.Dialog.question("是否确认要初始化菜单，如果解析目前维护的数据会被更新?", null, function(e) {
		if (e.status == "yes" || e.status == "ok") {
			mainActivity.parseXML("menuInit");
		}
	});
};

// 解析XML
mainActivity.parseXML = function(type) {
	var textSuccess;
	var treeData = justep.xbl("bizSA_Menu");
	var listData = justep.xbl("bizSA_Menu_1");
	var rowID = treeData.getCurrentID();
	var map = new justep.Request.MapParam();
	var param = new justep.Request.ActionParam();
	map.put("type", type);
	map.put("fID", rowID);
	map.put("fName", treeData.getValue("fName"));
	param.setMap("variables", map);
	if (type == "parseMenu")
		textSuccess = "解析xml完成！";
	else
		textSuccess = "初始化菜单完成！";
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "readXmlAction",
		parameters : param,
		callback : function(result) {
			if (result.state && result.response == "成功") {
				treeData.refreshData();
				listData.filters.clear();
				listData.setFilter('filter', "fParentID='" + rowID + "'");
				listData.refreshData();
				butone.Dialog.success(textSuccess);
			} else if(result.state)
				butone.Dialog.error(result.response);
			else
				butone.Dialog.error("解析xml失败,请检查function是否正确！");
		}
	});

};

mainActivity.model1Load = function(event) {
	var treeData = justep.xbl("bizSA_Menu");
	if(treeData.getCurrentID()){
		var listData = justep.xbl("bizSA_Menu_1");
		listData.setFilter("filter", "fParentID = '"+ treeData.getCurrentID() +"'");
		listData.refreshData();
		mainActivity.fLongPath = "/"+treeData.getCurrentID();
	}
	mainActivity.trgSetting();
};

mainActivity.grid2RowClick = function(event) {
	var treeData = justep.xbl("bizSA_Menu");
	var listData = justep.xbl("bizSA_Menu_1");
	var fprocess = treeData.getValue("fActivityUrl");
	var fName = treeData.getValue("fName");
	listData.saveData();
	mainActivity.fLongPath = event.source.getParentsID();
	if (fName == "系统菜单目录") {
		listData.setFilter('filter', "fParentID is null");
		listData.refreshData();
	} else {
		var rowID = treeData.getCurrentID();
		listData.setFilter('filter', "fParentID='" + rowID + "'");
		listData.refreshData();
	}
};

// appName管理
mainActivity.trg_rootClick = function(event) {
	justep.xbl("appNameDialog").open();
};

// appName管理关闭
mainActivity.appNameDialogClose = function(event){
	var treeData = justep.xbl("bizSA_Menu");
	treeData.refreshData();
	if(treeData.getCurrentID()){
		var listData = justep.xbl("bizSA_Menu_1");
		listData.setFilter("filter", "fParentID ='"+treeData.getCurrentID()+"'");
		listData.refreshData();
		mainActivity.fLongPath = "/"+treeData.getCurrentID();
		treeData.expandTreeByIdPath(mainActivity.fLongPath);
	}
};

// 添加子目录
mainActivity.trg_addChildClick = function(event) {
	var treeData = justep.xbl("bizSA_Menu");
	var listData = justep.xbl("bizSA_Menu_1");
	listData.newData();
	var rowID = treeData.getCurrentID();
	listData.setValue("fParentID", rowID);
	listData.saveData();
	listData.refreshData();
	treeData.refreshData();

};
// 保存按钮
mainActivity.trg_saveClick = function(event) {
	var listData = justep.xbl("bizSA_Menu_1");
	listData.saveData();
	listData.refreshData();
	justep.xbl("bizSA_Menu").refreshData();
};

// 删除按钮
mainActivity.trg_delClick = function(event) {
	var listData = justep.xbl("bizSA_Menu_1");
	var rowID = listData.getCurrentID();
	if (!rowID)
		return;
	var param = new justep.Request.ActionParam();
	param.setString("fParentID", rowID);
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "hasChildAction",
		parameters : param,
		callback : function(result) {
			if (result.state && !result.response) {
				listData.deleteData(rowID);
				listData.saveData();
				justep.xbl("bizSA_Menu").refreshData();
			} else
				butone.Dialog.info("请先删除右侧列表子菜单项！");
		}
	});
};

// 添加功能菜单按钮
mainActivity.trg_menuSelectClick = function(event) {
	justep.xbl('windowDialog2').open();
};

mainActivity.windowDialog2Receive = function(event) {
	var treeData = justep.xbl("bizSA_Menu");
	var fIcon16List = new justep.Request.ListParam();
	var fIcon32List = new justep.Request.ListParam();
	var fIcon64List = new justep.Request.ListParam();
	var fDisplayList = new justep.Request.ListParam();
	var processes = new justep.Request.ListParam();
	var activities = new justep.Request.ListParam();
	var activitiesFNames = new justep.Request.ListParam();
	for ( var i = 0; i < event.data.getRowsNum(); i++) {
		var fIcon16 = event.data.getValueByName("icon16", i);
		var fIcon32 = event.data.getValueByName("icon32", i);
		var fIcon64 = event.data.getValueByName("icon64", i);
		var fdisplay = event.data.getValueByName("display", i);
		var process = event.data.getValueByName("process", i);
		var activity = event.data.getValueByName("activity", i);
		var activityFName = event.data.getValueByName("activityFName", i);
		fIcon16List.add(new justep.Request.SimpleParam(fIcon16,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		fIcon32List.add(new justep.Request.SimpleParam(fIcon32,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		fIcon64List.add(new justep.Request.SimpleParam(fIcon64,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		fDisplayList.add(new justep.Request.SimpleParam(fdisplay,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		processes.add(new justep.Request.SimpleParam(process,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		activities.add(new justep.Request.SimpleParam(activity,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		activitiesFNames.add(new justep.Request.SimpleParam(activityFName,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
	}
	var params = new justep.Request.ActionParam();
	params.setList("fIcon16", fIcon16List);
	params.setList("fIcon32", fIcon32List);
	params.setList("fIcon64", fIcon64List);
	params.setList("fDisplay", fDisplayList);
	params.setList("activities", activities);
	params.setList("processes", processes);
	params.setList("activitiesFNames", activitiesFNames);
	params.setString("fParentID", treeData.getCurrentID());
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "setTreeReceiveAction",
		parameters : params,
		callback : function(callbackData) {
			if (callbackData.state) {
				var listData = justep.xbl("bizSA_Menu_1");
				listData.setFilter('filter', "fParentID='" + treeData.getCurrentID() + "'");
				listData.refreshData();
				treeData.refreshData();
			}
		}
	});
};

// 添加URL参数
mainActivity.trg_addURLClick = function(event) {
	var listData = justep.xbl("bizSA_Menu_1");
	var fActivityUrl = listData.getValue("fActivityUrl");
	var param = fActivityUrl.indexOf("?")>0?fActivityUrl.substring(fActivityUrl.indexOf("?")+1):"";
	justep.xbl('windowDialog1').open({
		param : param
	});
};

// 接收URL参数配置的返回值
mainActivity.windowDialog1Receive = function(event) {
	var param = event.data;
	var listData = justep.xbl("bizSA_Menu_1");
	var rowID = listData.getCurrentID();
	var url = listData.getValue("fActivityUrl", rowID);
	url = url.indexOf("?")>0?url.substring(0,url.indexOf("?")):url;
	if(!!param){
		url = url + "?" + param;
	}
	listData.setValue("fActivityUrl", url, rowID);
	listData.saveData();
	listData.refreshData();
};

// 上移
mainActivity.trg_upClick = function(event) {
	mainActivity.sortData("moveUp");
};

// 下移
mainActivity.trg_downClick = function(event) {
	mainActivity.sortData("moveDown");
};

// 排序
mainActivity.sortData = function(UpOrDown){
	var listData = justep.xbl("bizSA_Menu_1");
	var store = listData.getStore();
	var rowID = store.getSelectedRowId();
	if (!rowID)
		return;
	if(UpOrDown=="moveUp")
		store.moveRowPro(-1, rowID);
	else
		store.moveRowPro(1, rowID);
	for ( var i = 0; i < listData.getCount(); i++) {
		var rowID = listData.getID(i);
		listData.setValue("fOrder", i, rowID);
	}
	listData.saveData();
	listData.refreshData();
	justep.xbl("bizSA_Menu").refreshData();
};

// 生成xml
mainActivity.generateXMLClick = function(event) {
	var treeData = justep.xbl("bizSA_Menu");
	var listData = justep.xbl("bizSA_Menu_1");
	var rowID = treeData.getCurrentID();
	var fName = treeData.getValue("fName");
	if (fName) {
		butone.Dialog.question("是否确认要生成菜单，生成菜单会更新系统菜单配置文件?", null, function(e) {
			if (e.status == "yes" || e.status == "ok") {
				var fid = justep.xbl("bizSA_Menu_1").getCurrentID();
				var param = new justep.Request.ActionParam();
				param.setString("fName", fName);
				param.setString("rowID", rowID);
				var options = {};
				options.contentType = 'application/json';
				options.dataType = "json";
				options.action = "generateXMLAction";
				options.parameters = param;
				options.callback = function(data) {
					if (data.state && data.response)
						butone.Dialog.success("生成xml完成！");
					else
						butone.Dialog.error("生成xml失败！");
				};
				var result = justep.Request.sendBizRequest2(options);
			}
		});
	} else
		butone.Dialog.info("请点击系统菜单目录,维护系统名称！");
};

mainActivity.bizSA_Menu_1AfterRefresh = function(event){
	mainActivity.trgSetting();
};

mainActivity.trgSetting = function(){
	var treeData = justep.xbl("bizSA_Menu");
	var listData = justep.xbl("bizSA_Menu_1");
	var treeRowID = treeData.getCurrentID();
	var listRowID = listData.getCurrentID();
	var fParentID = treeData.getValue("fParentID", treeRowID);
	if (!!treeRowID && fParentID=="") {
		justep.xbl("parseXML").setDisabled(false);
		justep.xbl("generateXML").setDisabled(false);
		justep.xbl("trg_menuInit").setDisabled(false);
	} else {
		justep.xbl("parseXML").setDisabled(true);
		justep.xbl("generateXML").setDisabled(true);
		justep.xbl("trg_menuInit").setDisabled(true);
	}
	// 添加URL参数按钮
	if(!!listData.getValue("fActivityUrl"))
		justep.xbl("trg_addURL").setDisabled(false);
	else 
		justep.xbl("trg_addURL").setDisabled(true);
		
	if(!!treeRowID) {
		justep.xbl("trg_addChild").setDisabled(false);
		justep.xbl("trg_menuSelect").setDisabled(false);
	} else {
		justep.xbl("trg_addChild").setDisabled(true);
		justep.xbl("trg_menuSelect").setDisabled(true);
	}
	
	// 删除按钮
	if (!!listRowID) {
		justep.xbl("trg_del").setDisabled(false);
		justep.xbl("trg_up").setDisabled(false);
		justep.xbl("trg_down").setDisabled(false);
	} else {
		justep.xbl("trg_del").setDisabled(true);
		justep.xbl("trg_up").setDisabled(true);
		justep.xbl("trg_down").setDisabled(true);
	}
};

mainActivity.bizSA_Menu_1AfterNew = function(event){
	mainActivity.trgSetting();
};

mainActivity.bizSA_MenuAfterRefresh = function(event){
	event.source.expandTreeByIdPath(mainActivity.fLongPath);
};
