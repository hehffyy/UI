var oneYueJian = {};

oneYueJian.selfChuLiAfterNew = function(event) {
	event.source.setValue("fHuoDong", oneYueJian.fHuoDong);
	event.source.setValue("fActivityItem", oneYueJian.fActivityItem);
};

oneYueJian.selfChuLiRefreshCreateParam = function(event) {
	event.param.setString("filter", "B_HuoDongChuLi.fHuoDong='"
			+ oneYueJian.fHuoDong + "' and B_HuoDongChuLi.fActivityItem='"
			+ oneYueJian.fBizRecId
			+ "' and B_HuoDongChuLi.fOrgUnitID=:currentPersonID()");
};

oneYueJian.otherChuliRefreshCreateParam = function(event) {
	event.param
			.setString(
					"filter",
					"B_HuoDongChuLi.fDeptID=:currentDeptID() and B_HuoDongChuLi.fOrgUnitID <> :currentPersonID() and B_HuoDongChuLi.fHuoDong='"
							+ oneYueJian.fHuoDong
							+ "' and B_HuoDongChuLi.fActivityItem='"
							+ oneYueJian.fBizRecId + "'");
};

oneYueJian.dataValueChanged = function(event) {
	if (event.value == "保持未阅") {
		oneYueJian.batchRead(oneYueJian.fHuoDong, true);
		justep.xbl("windowReceiver").sendData("refresh");
	}
};

oneYueJian.windowReceiverReceive = function(event) {
	var data = event.data;
	oneYueJian.fHuoDong = data.fHuoDong;
	if (!data.fBizRecId) {
		var dsHd = justep.xbl('B_GongZuoHuoDong');
		dsHd.setFilter("filter", "B_GongZuoHuoDong='" + data.fHuoDong + "'");
		dsHd.refreshData();
		data.fBizRecId = dsHd.getValue('fActivityItem');
		data.fType = dsHd.getValue('fItemType');
		data.fActivityItem = dsHd.getValue('fActivityItem');
	}
	oneYueJian.fBizRecId = data.fBizRecId;
	oneYueJian.fType = data.fType;
	oneYueJian.fActivityItem = data.fActivityItem;

	if (justep.Context.isReadonlyMode()) {
		$(".xui-borderlayout-top").hide();
		$(".xui-borderlayout-top").attr('size', '0px');
		$(".xui-borderlayout-center").css('top', '0px');
		$(".xui-borderlayout-center").css('width', "100%");
		$(".xui-borderlayout-center").css('height', "100%");
		$(".xui-borderlayout-center").resize(function() {
			$(".xui-borderlayout-center").css('top', '0px');
			$(".xui-borderlayout-center").css('width', "100%");
			$(".xui-borderlayout-center").css('height', "100%");
		});
	}
	justep.xbl("selfChuLi").refreshData();
	var url = "", process = "", activity = "";
	if (data.fType == "网上舆情") {
		url = "/UI/EGovSys/gzzx/wangShangYuQingActivity.w";
		process = "/EGovSys_X/gzzx/gzzxProcess";
		activity = "yueJianActivity";
	} else {
		url = "/UI/EGovSys/gzzx/wenDianPiYueBiaoActivity.w";
		process = "/EGovSys_X/gzzx/gzzxProcess";
		activity = "yueJianActivity";
	}
	justep.xbl("windowFrame").open2({
		'data' : data,
		'url' : url,
		'process' : process,
		'activity' : activity
	});
};

oneYueJian.tabPage1Select = function(event) {
	justep.xbl("otherChuli").refreshData();
};

oneYueJian.textarea2Change = function(event) {
	var selfChuLi = justep.xbl("selfChuLi");
	if (justep.xbl("data") == "保持未阅")
		selfChuLi.setValue("fFinishTime", "");
	else
		selfChuLi.setValue("fFinishTime", justep.System.datetimeString());
	if (selfChuLi.getValue("fHuoDong"))
		selfChuLi.saveData();
};

oneYueJian.trigger1Click = function(event) {
	justep.xbl("windowDialog").setTitle("阅办意见");
	var data = justep.xbl("selfChuLi");
	var idea = "";
	if (data.getCurrentID()) {
		idea = data.getValue("fContent", data.getCurrentID());
	}
	justep.xbl("windowDialog").open({
		idea : idea,
		isYueBan : true
	});
};

oneYueJian.windowDialogReceive = function(event) {
	var data = event.data;
	for ( var i = 0; i < data.length; i++) {
		var ds = i == 0 ? justep.xbl("selfChuLi") : justep.xbl("otherChuli");
		var ids = ds.locate([ data[i][0], data[i][2] ], [ "fOrgUnitID",
				"fDeptID" ]);
		if (ids.length == 0)
			ds.newData();
		ds.setValue("fHuoDong", oneYueJian.fHuoDong);
		ds.setValue("fActivityItem", oneYueJian.fActivityItem);
		ds.setValue("fOrgUnitID", data[i][0]);
		ds.setValue("fOrgUnitName", data[i][1]);
		ds.setValue("fDeptID", data[i][2]);
		ds.setValue("fDeptName", data[i][3]);
		ds.setValue("fGlobalOrder", data[i][5]);
		if (i == 0)
			ds.setValue("fFinishTime", justep.System.datetimeString());
		else
			ds.setValue("fFinishTime", "");
		// fContext 会触发保存
		ds.setValue("fContent", data[i][4]);
	}
	justep.xbl("selfChuLi").saveData();
	justep.xbl("otherChuli").saveData();
	justep.xbl("windowReceiver").sendData("refresh");
};

oneYueJian.trigger2Click = function(event) {
	var data = justep.xbl("selfChuLi");
	var idea = "";
	if (data.getCurrentID()) {
		idea = data.getValue("fContent", data.getCurrentID());
	}
	justep.xbl("windowDialog").open({
		idea : idea,
		isYueBan : false
	});
};

oneYueJian.batchRead = function(huodong, keepUnRead) {
	if (!!huodong) {
		var actionParam = new justep.Request.ActionParam();
		actionParam.setString("fHuoDong", huodong);
		actionParam.setString("type", oneYueJian.fType);
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
				// alert("已阅");
			}
		};
		justep.Request.sendBizRequest2(options);
	} else {
		alert("请选择阅件信息！");
	}
};
