var yueJianActivity = {};

yueJianActivity.selectTabPage = "tabPage1";

yueJianActivity.model1Load = function(event) {
	this.selectTabPage = justep.xbl("tabPanel1").getActiveID();
	var posName = butone.Context.getCurrentPersonPostName();
	if (!!posName && posName.match("正厅级|副厅级")) {
		justep.xbl("tabPanel1").setVisable("tabPage1", false);
		justep.xbl("tabPanel1").setVisable("tabPage2", false, "tabPage3");
		justep.xbl("data").setValue("wsyqStatus", "未阅");
	} else if (!!posName && posName.match("正处级|副处级")) {
		justep.xbl("tabPanel1").setVisable("tabPage1", true);
		justep.xbl("tabPanel1").setVisable("tabPage2", true, "tabPage1");
		justep.xbl("data").setValue("ycjStatus", "未阅");
	} else {
		justep.xbl("tabPanel1").setVisable("tabPage1", true);
		justep.xbl("tabPanel1").setVisable("tabPage2", true);
		justep.xbl("tabPanel1").setTabActive("tabPage1");
		justep.xbl("data").setValue("ycjStatus", "未阅");
	}
	// 正处不显示阅处件的 批量已阅按钮
	if (!!posName && posName == "正处级")
		$("#trigger1").hide();
};

// 网上舆情
yueJianActivity.trigger39Click = function(event) {
	var grid = justep.xbl("grid7").grid;
	var checkColIndex = grid.getColIndexById("checkbox");
	var checkedIDs = grid.getCheckedRows(checkColIndex);
	yueJianActivity.batchRead(checkedIDs, false);
};
// 阅处件（非正处可以处理）
yueJianActivity.trigger1Click = function(event) {
	var grid = justep.xbl("grid1").grid;
	var checkColIndex = grid.getColIndexById("checkbox");
	var checkedIDs = grid.getCheckedRows(checkColIndex);
	yueJianActivity.batchRead(checkedIDs, false);
};

// 普通阅件
yueJianActivity.trigger36Click = function(event) {
	var grid = justep.xbl("grid2").grid;
	var checkColIndex = grid.getColIndexById("checkbox");
	var checkedIDs = grid.getCheckedRows(checkColIndex);
	yueJianActivity.batchRead(checkedIDs, false);
};

// 公告信息
yueJianActivity.trigger42Click = function(event) {
	var grid = justep.xbl("grid8").grid;
	var checkColIndex = grid.getColIndexById("checkbox");
	var checkedIDs = grid.getCheckedRows(checkColIndex);
	yueJianActivity.batchRead(checkedIDs, false);
};

yueJianActivity.batchRead = function(huodong, keepUnRead) {
	if (!!huodong) {
		var type = "阅处件";
		if (yueJianActivity.selectTabPage == "tabPage2")
			type = "普通阅件";
		else if (yueJianActivity.selectTabPage == "tabPage3")
			type = "网上舆情";
		else if (yueJianActivity.selectTabPage == "tabPage4")
			type = "公告信息";
		var actionParam = new justep.Request.ActionParam();
		actionParam.setString("fHuoDong", huodong);
		actionParam.setString("type", type);
		actionParam.setBoolean("keepUnRead", keepUnRead);
		var options = {};
		options.process = justep.Context.getCurrentProcess();
		options.activity = justep.Context.getCurrentActivity();
		options.action = "batchReadAction";
		options.parameters = actionParam;
		options.contentType = "application/json";
		options.dataType = "json";
		options.callback = function(ret) {
			if (ret.state) {
				yueJianActivity.refreshCurrentPageData();
			}
		};
		justep.Request.sendBizRequest2(options);
	} else {
		yueJianActivity.showMessage("请选择阅件信息！");
	}
};

yueJianActivity.getCurDs = function() {
	var ds = null;
	if (yueJianActivity.selectTabPage == "tabPage1") {
		ds = justep.xbl("yueChuJian");
	} else if (yueJianActivity.selectTabPage == "tabPage2") {
		ds = justep.xbl("puTongYueJian");
	} else if (yueJianActivity.selectTabPage == "tabPage3") {
		ds = justep.xbl("wangShangYuQing");
	} else if (yueJianActivity.selectTabPage == "tabPage4") {
		ds = justep.xbl("gongGaoXinXI");
	}
	return ds;
};
yueJianActivity.dataValueChanged = function(event) {
	var filter = "(1=1)";
	var posName = butone.Context.getCurrentPersonPostName();
	if (event.value == "未阅") {
		filter = "(not exists (select 1 from B_HuoDongChuLi B_HuoDongChuLi where B_GongZuoHuoDong.FGUID = B_HuoDongChuLi.fHuoDong "
				+ "AND B_HuoDongChuLi.fOrgUnitID = :currentPersonID() and B_HuoDongChuLi.fFinishTime is not null))";
		if (!!posName && posName.match("正厅级|副厅级"))
			filter += " and not exists(select 1 from B_HuoDongChuLi psyj join B_GongZuoHuoDong ps on psyj.fHuoDong=ps where psyj.fOrgUnitID=:currentPersonID() and psyj.fFinishTime is not null and ps.fZhuXian=B_GongZuoHuoDong.fZhuXian and ps.fItemType='领导批示')";
	} else if (event.value == "已阅") {
		filter = "(exists (select 1 from B_HuoDongChuLi B_HuoDongChuLi where B_GongZuoHuoDong.FGUID = B_HuoDongChuLi.fHuoDong "
				+ "AND B_HuoDongChuLi.fOrgUnitID = :currentPersonID() and B_HuoDongChuLi.fFinishTime is not null))";
		if (!!posName && posName.match("正厅级|副厅级"))
			filter += " or exists(select 1 from B_HuoDongChuLi psyj join B_GongZuoHuoDong ps on psyj.fHuoDong=ps where psyj.fOrgUnitID=:currentPersonID() and psyj.fFinishTime is not null and ps.fZhuXian=B_GongZuoHuoDong.fZhuXian and ps.fItemType='领导批示')";
	}
	if (yueJianActivity.selectTabPage == "tabPage1") {
		var yueChuJian = justep.xbl("yueChuJian");
		yueChuJian.setFilter("filter", filter);
		yueChuJian.refreshData();
	} else if (yueJianActivity.selectTabPage == "tabPage2") {
		var puTongYueJian = justep.xbl("puTongYueJian");
		puTongYueJian.setFilter("filter", filter);
		var offset = puTongYueJian.offset - puTongYueJian.limit;
		if (offset < 0)
			offset = 0;
		puTongYueJian.refreshPageData(offset, puTongYueJian.limit, false);
		puTongYueJian.refreshData();
	} else if (yueJianActivity.selectTabPage == "tabPage3") {
		var wangShangYuQing = justep.xbl("wangShangYuQing");
		wangShangYuQing.setFilter("filter", filter);
		wangShangYuQing.refreshData();
	} else if (yueJianActivity.selectTabPage == "tabPage4") {
		var gongGaoXinXI = justep.xbl("gongGaoXinXI");
		gongGaoXinXI.setFilter("filter", filter);
		gongGaoXinXI.refreshData();
	}
};

yueJianActivity.tabPage1Select = function(event) {
	yueJianActivity.selectTabPage = "tabPage1";
	justep.xbl("data").setValue("ycjStatus", "未阅");
};

yueJianActivity.tabPage2Select = function(event) {
	yueJianActivity.selectTabPage = "tabPage2";
	justep.xbl("data").setValue("yzStatus", "未阅");
};

yueJianActivity.tabPage3Select = function(event) {
	yueJianActivity.selectTabPage = "tabPage3";
	justep.xbl("data").setValue("wsyqStatus", "未阅");
};

yueJianActivity.tabPage4Select = function(event) {
	yueJianActivity.selectTabPage = "tabPage4";
	justep.xbl("data").setValue("qtyStatus", "未阅");
};

yueJianActivity.grid7RowDblClick = function(event) {
	var data = justep.xbl("wangShangYuQing");
	var fBizRecId = data.getValue("fActivityItem", event.rowID);
	var fItemType = data.getValue("fItemType", event.rowID);
	var attachment = data.getValue("fAttachment", event.rowID);
	var fActivityItem = data.getValue("fActivityItem", event.rowID);
	var runner = justep.xbl("oneYueJianRunner");
	runner.open({
		fHuoDong : event.rowID,
		fBizRecId : fBizRecId,
		fType : "网上舆情",
		fActivityItem : fActivityItem
	});
	yueJianActivity.batchRead(event.rowID, false);
};

yueJianActivity.grid1RowDblClick = function(event) {
	var data = justep.xbl("yueChuJian");
	var fBizRecId = data.getValue("fActivityItem", event.rowID);
	var fItemType = data.getValue("fItemType", event.rowID);
	var attachment = data.getValue("fAttachment", event.rowID);
	var fActivityItem = data.getValue("fActivityItem", event.rowID);
	var runner = justep.xbl("oneYueJianRunner");
	runner.open({
		fHuoDong : event.rowID,
		fBizRecId : fBizRecId,
		fType : "阅处件",
		fActivityItem : fActivityItem
	});
	var posName = butone.Context.getCurrentPersonPostName();
	if (!posName || !(!!posName && posName == "正处级"))
		yueJianActivity.batchRead(event.rowID, false);
};

yueJianActivity.grid2RowDblClick = function(event) {
	var data = justep.xbl("puTongYueJian");
	var fBizRecId = data.getValue("fActivityItem", event.rowID);
	var fItemType = data.getValue("fItemType", event.rowID);
	var attachment = data.getValue("fAttachment", event.rowID);
	var fActivityItem = data.getValue("fActivityItem", event.rowID);
	var runner = justep.xbl("oneYueJianRunner");
	runner.open({
		fHuoDong : event.rowID,
		fBizRecId : fBizRecId,
		fType : "普通阅件",
		fActivityItem : fActivityItem
	});
	yueJianActivity.batchRead(event.rowID, false);
};

yueJianActivity.grid8RowDblClick = function(event) {
	var data = justep.xbl("gongGaoXinXI");
	var fBizRecId = data.getValue("fActivityItem", event.rowID);
	var fItemType = data.getValue("fItemType", event.rowID);
	var attachment = data.getValue("fAttachment", event.rowID);
	var fActivityItem = data.getValue("fActivityItem", event.rowID);
	var runner = justep.xbl("oneYueJianRunner");
	runner.open({
		fHuoDong : event.rowID,
		fBizRecId : fBizRecId,
		fType : "公告信息",
		fActivityItem : fActivityItem
	});
	yueJianActivity.batchRead(event.rowID, false);
};

yueJianActivity.wenDianPiYueBiaoRunnerReceive = function(event) {
	yueJianActivity.refreshCurrentPageData();
};

yueJianActivity.wangShangYuQingRunnerReceive = function(event) {
	yueJianActivity.refreshCurrentPageData();
};

yueJianActivity.refreshCurrentPageData = function(){
	var data = yueJianActivity.getCurDs();
	var offset = data.offset - data.limit;
	if (offset < 0)
		offset = 0;
	data.refreshPageData(offset, data.limit, false);
};

/**
 * 信息提示框 显示的图标{('info','error','question','right')，或者自定义的img url} 按钮
 * {0(默认):确定；1：确定，取消；2：是，否；3:是,否,取消}
 */
yueJianActivity.showMessage = function(msg, type, img, callback) {
	new justep.System.showMessage().open({
		msg : msg,
		title : '系统提示',
		type : type,// 0(默认):确定；1：确定，取消；2：是，否；3:是,否,取消
		img : img,// 显示的图标('info','error','question','right')，或者自定义的img url,
		height : 100,
		width : 350,
		callback : callback
	});
};
