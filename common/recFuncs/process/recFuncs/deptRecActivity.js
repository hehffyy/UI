var deptRecActivity = {};
var fldOption = {
	fCount : '总计',
	fInZcCount : '待办正常',
	fInYjCount : '待办预警',
	fInYellowCount : '待办黄牌',
	fInRedCount : '待办红牌',
	fApprizeCount : '补正告知',
	fSpecialProcedureCount : '特别程序',
	fQtGqCount : '其它挂起',
	fOutZcCount : '经办（未办结）正常',
	fOutYellowCount : '经办（未办结）预警',
	fOutYjCount : '经办（未办结）黄牌',
	fOutRedCount : '经办（未办结）红牌',
	fFinsishCount : '经办（已办结）'
};
deptRecActivity.model1Load = function(event) {
	// 加载所属部门
	var params = new justep.Request.ActionParam();
	justep.Request.sendBizRequest2({
		action : "getAllDepts",
		dataType : "json",
		parameters : params,
		async : true,
		callback : function(result) {
			var ds = justep.xbl("dsDept");
			for ( var key in result.response) {
				ds.newData(ds.getCount());
				ds.setValue("fDeptID", key, ds.getCurrentID());
				ds.setValue("fDeptName", result.response[key], ds
						.getCurrentID());
			}
			var rowIDs = ds.locate([ justep.Context.getCurrentDeptID() ],
					[ "fDeptID" ]);
			if (rowIDs.length == 1)
				ds.setIndex(ds.getIndex(rowIDs[0]));
			else
				ds.first();
			var dsParam = justep.xbl("dsParam");
			dsParam.newData();
			dsParam.setValue("fDeptID", ds.getValue("fDeptID"));
			dsParam.setValue("fDeptName", ds.getValue("fDeptName"));
			// justep.xbl("dsRec").refreshData();
		}
	});
};

deptRecActivity.dsParamValueChanged = function(event) {
	var dsSum = justep.xbl("dsSum");
	var curDeptID = justep.xbl("dsParam").getValue("fDeptID");
	if (event.column == "fDeptID") {
		dsSum.setFilter("sysFilter", "fDeptID='" + curDeptID + "'");
		dsSum.refreshData();
	}
};

deptRecActivity.dsSumIndexChanged = function(event) {
	justep.xbl("dsRec").refreshData();
};

deptRecActivity.dsRecRefreshCreateParam = function(event) {
	var dsParam = justep.xbl("dsParam");
	var variables = event.param.param.variables;
	variables.put("fDeptID", dsParam.getValue("fDeptID"));
	variables.put("fBizName", dsParam.getValue("fBizName"));
	variables.put("fKind", dsParam.getValue("fKind"));
	variables.put("fCustomFilter", dsParam.getValue("fCustomFilter"));
};
deptRecActivity.doRender = function(column, event) {
	var rowID = event.cell.rowText[1];
	var count = event.value;
	var color;
	if (column == "fInYjCount" || column == "fOutYjCount")
		color = "#9DFF22";
	else if (column == "fInYellowCount" || column == "fOutYellowCount")
		color = "yellow";
	else if (column == "fInRedCount" || column == "fOutRedCount")
		color = "red";
	if (count > 0)
		return "<div  onclick=doQueryRec('"
				+ rowID
				+ "','"
				+ column
				+ "') "
				+ "style='color:blue;text-decoration:underline;cursor:Pointer;background-color:"
				+ color + "'>" + count + "</div>";
	else
		return "<div >" + count + "</div>";
};
// 查询
function doQueryRec(bizName, kind) {
	document.getElementById("lblGroup").innerHTML = bizName + "--"
			+ fldOption[kind];
	var dsParam = justep.xbl("dsParam");
	dsParam.setValue("fBizName", bizName);
	dsParam.setValue("fKind", kind);
	justep.xbl("dsRec").refreshData();
}

deptRecActivity.grid1_fCountRender = function(event) {
	return deptRecActivity.doRender('fCount', event);
};

deptRecActivity.grid1_fInZcCountRender = function(event) {
	return deptRecActivity.doRender('fInZcCount', event);
};

deptRecActivity.grid1_fInYjCountRender = function(event) {
	return deptRecActivity.doRender('fInYjCount', event);
};

deptRecActivity.grid1_fInYellowCountRender = function(event) {
	return deptRecActivity.doRender('fInYellowCount', event);
};

deptRecActivity.grid1_fInRedCountRender = function(event) {
	return deptRecActivity.doRender('fInRedCount', event);
};

deptRecActivity.grid1_fApprizeCountRender = function(event) {
	return deptRecActivity.doRender('fApprizeCount', event);
};

deptRecActivity.grid1_fSpecialProcedureCountRender = function(event) {
	return deptRecActivity.doRender('fSpecialProcedureCount', event);
};

deptRecActivity.grid1_fQtGqCountRender = function(event) {
	return deptRecActivity.doRender('fQtGqCount', event);
};

deptRecActivity.grid1_fOutZcCountRender = function(event) {
	return deptRecActivity.doRender('fOutZcCount', event);
};

deptRecActivity.grid1_fOutYellowCountRender = function(event) {
	return deptRecActivity.doRender('fOutYellowCount', event);
};

deptRecActivity.grid1_fOutRedCountRender = function(event) {
	return deptRecActivity.doRender('fOutRedCount', event);
};

deptRecActivity.grid1_fOutYjCountRender = function(event) {
	return deptRecActivity.doRender('fOutYjCount', event);
};

deptRecActivity.grid2_calculate1Render = function(event) {
	var days = event.cell.rowText[9], alterClass = "circle";
	days = parseInt(days);
	if (isNaN(days)) {
		alterClass += " nolimit";
	} else if (days > 5) {
		// 绿牌
		alterClass += " green";
	} else if (days <= 5 && days >= 2) {
		// 预警
		alterClass += " warning";
		days = "";
	} else if (days < 2 && days >= 0) {
		// 黄牌
		alterClass += " yellow";
	} else if (days < 0) {
		// 红牌
		alterClass += " red";
	}
	isNaN(days) && (days = "");
	var warn = '<div class="' + alterClass + '"></div>';
	return warn;
};

deptRecActivity.trgBlgcClick = function(event) {
	var dsRec = justep.xbl("dsRec");
	var pi = dsRec.getValue("fFlowId");
	if (!pi)
		return;
	justep.xbl("dlgChart").open(null, "流程轨迹",
			"/UI/SA_X/task/taskCenter/banLiGuoCheng.w?pi=" + pi);
};

deptRecActivity.trgExecuteClick = function(event) {
	var id = justep.xbl("dsRec").getCurrentID();
	if (!id)
		return;
	butone.BizRec.openBizRec(id);
};

deptRecActivity.dsSumAfterRefresh = function(event) {
	var from = justep.Request.URLParams["from"];
	if (!!from && from == "widget")
		doQueryRec("汇总", "fInYjCount");
	else
		doQueryRec("汇总", "fCount");
	// var ds= event.source;
	// var total = "";
	// var zCount=0,yjCount=0,yellowCount=0,redCount=0;
	// for(var i=0;i<ds.getCount();i++){
	// var id= ds.getID(i);
	// zCount = zCount +ds.getValue('fCount',id);
	// yjCount = yjCount +ds.getValue('fInYjCount',id);
	// yellowCount = yellowCount +ds.getValue('fInYellowCount',id);
	// redCount = redCount +ds.getValue('fInRedCount',id);
	// }
	// // total = "部门案卷总数："+zCount +" | 预警总数："+yjCount+" | 黄牌总数：" + yellowCount
	// +" | 红牌总数：" + redCount;
	// $("#lblTotal").text(zCount);
	// $("#lblYj").text(yjCount);
	// $("#lblYellow").text(yellowCount);
	// $("#lblRed").text(redCount);
};




deptRecActivity.trigger4Click = function  (event) {
	var dsSum = justep.xbl("dsSum");
	var curDeptID = justep.xbl("dsParam").getValue("fDeptID");
	dsSum.setFilter("sysFilter", "fDeptID='" + curDeptID + "'");
	dsSum.refreshData();
};
