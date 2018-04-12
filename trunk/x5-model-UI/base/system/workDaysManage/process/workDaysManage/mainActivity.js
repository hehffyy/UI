var mainActivity = {};

mainActivity.model1Load = function(event) {
	var year = justep.System.datetime().getFullYear();
	justep.xbl("nsYear").setParam(year, year + 10, 1, 10);
	var data1 = justep.xbl("data1");
	data1.setValue("year", year);
	data1.setValue("month", justep.System.datetime().getMonth() + 1);
};

mainActivity.trgInitClick = function(event) {
	var param = new justep.Request.ActionParam();
	param.setInteger("year", parseInt(justep.xbl("data1").getValue("year")));
	justep.Request.sendBizRequest2({
		async : true,
		contentType : 'application/json',
		dataType : "json",
		parameters : param,
		action : "initWorkDaysAction",
		callback : function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				justep.xbl("bizB_WorkDaysMang").refreshData();
			} else {
				throw new Error(callbackData.response.message);
			}
		}
	});
};

mainActivity.trgChangeClick = function(event) {
	var data = justep.xbl("bizB_WorkDaysMang");
	var rowdId = data.getCurrentID();
	var fDate = data.getValue("fDate");
	fDate = new Date(fDate);
	var w = fDate.getDay();
	var isWorkDay = data.getValue("fIsWorkDay");
	isWorkDay = isWorkDay == "是" ? "否" : "是";
	data.setValue("fIsWorkDay", isWorkDay);
	if (w == 0 || w == 6) {
		// 休息日
		if (isWorkDay == "否") {
			data.setValue("fKind", "无变化");
		} else {
			data.setValue("fKind", "休息日转工作日");
		}
	} else {
		// 工作日
		if (isWorkDay == "是") {
			data.setValue("fKind", "无变化");
		} else {
			data.setValue("fKind", "工作日转休息日");
		}
	}
};

mainActivity.grid3RowDblClick = function(event) {
	mainActivity.trgChangeClick();
};

mainActivity.weekNames = [ "周日", "周一", "周二", "周三", "周四", "周五", "周六" ];
mainActivity.grid3_fWeekRender = function(event) {
	var dayInWeek = parseInt(event.value);
	return mainActivity.weekNames[dayInWeek - 1];
};

mainActivity.bizB_WorkDaysMangSaveCommit = function(event) {
	mainActivity.trigger5Click();
};

mainActivity.grid3_fKindRender = function(event) {

	var td = event.cell.cell.parentNode.cells[event.source
			.getColIndexById("fDate")];
	var fIsWorkDay;
	if (event.cell.rowText) {
		fIsWorkDay = event.cell.rowText[event.source
				.getColIndexById("fIsWorkDay")] == "是";
	} else {
		fIsWorkDay = justep.xbl("bizB_WorkDaysMang").getValue("fIsWorkDay",
				event.rowID) == "是";
	}
	$(td).css("color", fIsWorkDay ? "black" : "red");
	if (event.value != "无变化") {
		$(event.cell.cell).css("color", "red");
	} else {
		$(event.cell.cell).css("color", "black");
	}
	return event.value;
};

mainActivity.data1ValueChanged = function(event) {
	var data = justep.xbl("bizB_WorkDaysMang");
	if (event.column == "year") {
		if (event.value)
			data.setFilter("filter_year", "fYear=" + event.value);
		else
			data.setFilter("filter_year", "");
	} else if (event.column == "month") {
		if (event.value)
			data.setFilter("filter_month", "fMonth=" + event.value);
		else
			data.setFilter("filter_month", "");
	}
	data.refreshData();
};

mainActivity.grid3_fDateRender = function(event) {
	var data = justep.xbl("bizB_WorkDaysMang");
	if (event.cell.rowText[event.source.getColIndexById("fIsWorkDay")] == "否") {
		$(event.cell.cell).css("color", "red");
	} else
		$(event.cell.cell).css("color", "black");
	return event.value;
};

mainActivity.trigger5Click = function(event) {
	var param = new justep.Request.ActionParam();
	var data1 = justep.xbl("data1");
	param.setInteger("year", parseInt(data1.getValue("year")));
	param.setInteger("month", parseInt(data1.getValue("month")));
	justep.Request.sendBizRequest2({
		async : true,
		contentType : 'application/json',
		dataType : "json",
		parameters : param,
		action : "refreshWorkDayCahceAction",
		callback : function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				justep.xbl("bizB_WorkDaysMang").refreshData();
			} else {
				throw new Error(callbackData.response.message);
			}
		}
	});
};
