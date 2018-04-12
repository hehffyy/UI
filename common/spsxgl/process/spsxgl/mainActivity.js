var mainActivity = {};

mainActivity.btnAppendSXClick = function(event) {
	var data = justep.xbl("dataMain");
	var sxlx = data.getValue("fSXLX");
	var parentID = "";
	if (sxlx == "dir") {
		parentID = data.getCurrentID();
	} else {
		parentID = data.getValue("fSJSX");
	}
	var options = {
		parentID : parentID,
		defaultValues : [ {
			fSXMC : '新增事项'
		} ]
	};
	addSXLX = null;
	data.newData(options);
};

/**
 * name:grid#onShowNodeImg description: 树节点图标回调
 * 
 * @param {object}
 *            event <br/> <b>参数结构：</b> <xmp> { "source" : XFGrid对象, "instance" :
 *            instance, "grid" : dhtmlxGrid对象, "rowID" : 行ID } </xmp>
 * @return {string} 图片路径
 */
mainActivity.grdMainShowNodeImg = function(event) {
	//
	var data = justep.xbl('dataMain');
	var sxlx = data.getValue('fSXLX', event.rowID);
	if (sxlx == 'dir')
		return "/x5/form/dhtmlx/dhtmlxGrid/imgs/folderClosed.gif";
	else
		return "/x5/form/dhtmlx/dhtmlxGrid/imgs/leaf.gif";
};

mainActivity.newRootClick = function(event) {
	var data = justep.xbl("dataMain");
	var options = {
		defaultValues : [ {
			fSXMC : '新增目录',
			fSXLX : 'dir'
		} ]
	};
	data.newData(options);
};

mainActivity.newChildClick = function(event) {
	var data = justep.xbl("dataMain");
	var sxlx = data.getValue("fSXLX");
	if (sxlx == '')
		return;
	var parentID = data.getCurrentID();
	var options = {
		parentID : parentID,
		defaultValues : [ {
			fSXMC : '新增目录',
			fSXLX : 'dir'
		} ]
	};
	data.newData(options);
};

mainActivity.model1ModelConstruct = function(event) {
	$(".xforms-item-radio").width(50);
};

/**
 * name:bizData#onAfterNew description: <b>[回调型事件]</b>业务数据新增后
 * 
 * @param {object}
 *            event <br/><b>结构如下：</b> <xmp> { "source" : 组件的js对象, "ids" :
 *            新增的行Id数组 } </xmp>
 */
mainActivity.dataMainAfterNew = function(event) {
	var data = justep.xbl("dataMain");
	var path = justep.xbl("grdMain").getParentsID();
	data.setValue("fPath", path);
};

/**
 * 添加业务
 */
mainActivity.windowDialog1Receive = function(event) {
	var data = justep.xbl("dataYW");
	for ( var i = 0; i < event.data.getRowsNum(); i++) {
		var process = event.data.getValueByName("process", i);
		var activityFName = event.data.getValueByName("activityFName", i);
		var splitName = activityFName.split('/');
		var processName = splitName[splitName.length - 2];
		var activity = event.data.getValueByName("activity", i);
		var activityName = event.data.getValueByName("label", i);
		data.newData();
		data.setValue("fProcess", process);
		data.setValue("fProcessName", processName);
		data.setValue("fStartActivity", activity);
		data.setValue("fStartActivityName", activityName);
	}
};

// 添加业务open
mainActivity.addBizClick = function(event) {
	justep.xbl("windowDialog1").open2();
};

/** 业务材料编号dlog */
mainActivity.grid2_fYWCLBHButtonClick = function(event) {
	var data = justep.xbl("dataCLDZ");
	var process = data.getValue("fProcess");
	var options = {
		"data" : process
	};
	justep.xbl("windowDialog2").open2(options);
};

/** 重置材料对照信息 */
mainActivity.refreshCLDZ = function(isClearAll) {
	var state = true;
	if(justep.xbl("dataSXCL").getCount()==0 && justep.xbl("dataYW").getCount()==0){
		new justep.System.showMessage().open({
			msg : '请先添加材料和业务',
			img : 'info',
			title : '标题',
			type : 0
		});
	}else if(justep.xbl("dataSXCL").getCount()==0){
		new justep.System.showMessage().open({
			msg : '该审批事项下没有材料,请先添加材料',
			img : 'info',
			title : '标题',
			type : 0
		});
	}else if(justep.xbl("dataYW").getCount()==0){
		new justep.System.showMessage().open({
			msg : '请至少添加一项业务',
			img : 'info',
			title : '标题',
			type : 0
		});
	}else{
		var duizhao = justep.xbl("dataCLDZ"); // 对照
		var data = justep.xbl("dataSXCL"); // 材料
		var msg = "重置全部材料将会清除不存在映射关系，添加新的映射关系，是否重置？";
		if(isClearAll)
			msg = "重置全部材料将会清除已配置的映射关系，是否重置？";
		new justep.System.showMessage().open({
			msg : msg,
			img : 'question',
			title : '提示信息',
			type : 2,
			callback : function(evt) {
				if (evt.status=="yes" && isClearAll) {
					duizhao.deleteAllRow();
				} else if (evt.status=="yes") {
					var deleteIDs = [];
					for ( var i = 0; i < duizhao.getCount(); i++) {
						var rowID = duizhao.getID(i);
						var ids = data.locate([ duizhao.getValue("fSPCLBH",
								rowID) ], [ "fSPCLBH" ]);
						if (ids.length == 0)
							deleteIDs.push(rowID);
					}
					duizhao.deleteData(deleteIDs);
				} else 
					state = false;
				if(state){
					duizhao.saveData();
					var bizProcessUrl = justep.xbl("dataYW").getValue("fProcess"); // 业务URL
					for ( var int = 0; int < data.getCount(); int++) {
						var rowid = data.getID(int);
						if(isClearAll){
							duizhao.newData();
							duizhao.setValue("fSPCLBH", data.getValue("fSPCLBH", rowid));
							duizhao.setValue("fSPCLMC", data.getValue("fSPCLMC", rowid));
							duizhao.setValue("fProcess", bizProcessUrl);
							duizhao.setValue("fSPSXBH", justep.xbl("dataMain").getCurrentID());
						} else {
							var ids = duizhao.locate([ data.getValue("fSPCLBH", rowid) ],[ "fSPCLBH" ]);
							if(ids.length==0){
								duizhao.newData();
								duizhao.setValue("fSPCLBH", data.getValue("fSPCLBH", rowid));
								duizhao.setValue("fSPCLMC", data.getValue("fSPCLMC", rowid));
								duizhao.setValue("fProcess", bizProcessUrl);
								duizhao.setValue("fSPSXBH", justep.xbl("dataMain").getCurrentID());
							}
						}
					}
				}
			}
		});
	}
};

/** 重置全部 */
mainActivity.trigger7Click = function(event) {
	mainActivity.refreshCLDZ(true);
};

/** 编辑重置 **/
mainActivity.trigger4Click = function(event){
	mainActivity.refreshCLDZ(false);
};

mainActivity.trigger3Click = function(event) {
	var data = justep.xbl("dataSXCL");
	data.newData(0);
};

mainActivity.saveTriggerClick = function(event){
	justep.xbl("dataSXCL").refreshData();
};

mainActivity.model1Load = function(event){
	justep.xbl("orgSelectExt1").setRange(
                    "findOrgChildren2(orgUnitsToOrgFIDs(findOrgChildren('/A80FAC070BA944D3BC366E383E3678D7.ogn','org.sName=''厅机关处室'' and org.sOrgKindID=''dpt''',null,false,true)),'org.sOrgKindID=''dpt''',null,false,true,true)");
    justep.xbl("orgSelectExt2").setRange(
                    "findOrgChildren2(orgUnitsToOrgFIDs(findOrgChildren('/A80FAC070BA944D3BC366E383E3678D7.ogn','org.sName=''厅机关处室'' and org.sOrgKindID=''dpt''',null,false,true)),'org.sOrgKindID=''dpt''',null,false,true,true)");
};
