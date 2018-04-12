var mngActivity = {};

mngActivity.btnBjgzClick = function(event) {
	debugger;
	butoneEx.Window.dialog("bzfqDialog",
			"/common/innerBz/process/innerBz/bujiaoDialog.w", "补正告知", null,
			true, null, "700px", "500px", true, function(evt) {
				return {
					bizRecId : justep.xbl("dataBz").getValue("fBizRecId",
							justep.xbl("dataBz").getCurrentID()),
					bzId : justep.xbl("dataBz").getCurrentId(),
					suspendKind : "skApprize",
					isSuspend : justep.xbl("dataBz").getValue("fSFGQ")
				};
			}, function(evt) {
				var options = evt.data.options;
				var isSuspend = evt.data.isSuspend;
				var suspendInfo = {
					suspendKind : options.suspendKind,
					apprizeAgain : !!options.apprizeAgain,
					tables : evt.data.tables
				};
				var jsonStr = JSON.stringify(suspendInfo);
				butoneEx.Common.callAction({
					suspendInfo : jsonStr,
					bizRecId : justep.xbl("dataBz").getValue("fBizRecId",
							justep.xbl("dataBz").getCurrentID()),
					isSuspend : justep.xbl("dataBz").getValue("fSFGQ"),
					reason : evt.data.reason
				}, "bjgzAction");
				justep.xbl("dataBz").refreshData();
			}, null);
};

mngActivity.btnBjslClick = function(event) {
	butoneEx.Window.dialog("bzslDialog",
			"/common/innerBz/process/innerBz/bujiaoShouliDialog.w", "补正受理",
			null, true, null, "700px", "500px", true, function(evt) {
				return {
					bizRecId : justep.xbl("dataBz").getValue("fBizRecId",
							justep.xbl("dataBz").getCurrentID()),
					suspendKind : "skApprize"
				};
			}, function(event) {
				var suspendInfo = {
					suspendKind : event.data.options.suspendKind,
					tables : event.data.tables
				};
				var jsonStr = JSON.stringify(suspendInfo);
				butoneEx.Common.callAction2({
					suspendInfo : jsonStr,
					bizRecId : justep.xbl("dataBz").getValue("fBizRecId",
							justep.xbl("dataBz").getCurrentID())
				}, "bjslAction");
				justep.xbl("dataBz").refreshData();
			}, null);
};

mngActivity.gridFilter1GetCondition = function(event) {
	debugger;
};

// mngActivity.trigger1Click = function(event){
// butoneEx.Window.dialog("bzsqDialog",
// "/common/innerBz/process/innerBz/offerActivity.w", "补正申请", null,
// true, null, "700px", "500px", true, function(evt) {
// return {
// bizRecId :
// justep.xbl("dataBz").getValue("fBizRecId",justep.xbl("dataBz").getCurrentID()),
// isuspended : 0
// };
// }, null, null);
// };
//
// mngActivity.trigger2Click = function(event){
// butoneEx.Window.dialog("bjclDialog",
// "/common/innerBz/process/innerBz/bujiao.w", "补交材料", null,
// true, null, "910px", "550px", true, function(evt) {
// return {
// bizRecId :
// justep.xbl("dataBz").getValue("fBizRecId",justep.xbl("dataBz").getCurrentID())
// };
// }, null, null);
// };

mngActivity.model1Load = function(event) {
	justep.xbl("dataSQ").refreshData();
};

mngActivity.grid1RowDblClick = function(event) {
	var dataBz = justep.xbl("dataBz");
	var fDoState = dataBz.getValue("fDoState", event.rowID);
	if (!!fDoState && fDoState == "补正完成") {
		justep.xbl("tabPanel1").setTabActive("tabPage2");
	} else {
		justep.xbl("tabPanel1").setTabActive("tabPage3");
	}
};

mngActivity.btnSecondBzClick = function(event) {
	debugger;
	butoneEx.Window.dialog("bzfqDialog",
			"/common/innerBz/process/innerBz/sencodeBzDialog.w", "二次补正", null,
			true, null, "700px", "500px", true, function(evt) {

			}, function(evt) {
				butoneEx.Common.callAction({
					bizRecId : justep.xbl("dataBz").getValue("fBizRecId"),
					reason : evt.data.reason
				}, "secondBzAction");
				justep.xbl("dataBz").refreshData();
			}, null);
};

mngActivity.btnHsClick = function(event) {
	butoneEx.Common.callAction({
		bizrecId : justep.xbl("dataBz").getValue("fBizRecId"),
		hsProcess : justep.xbl("dataBz").getValue("HSPROCESS"),
		hsActivity : justep.xbl("dataBz").getValue("HSACTIVITY")
	}, "startHsAction");
	justep.xbl("dataBz").refreshData();
};

mngActivity.setBtnVisible = function() {
	var ds = justep.xbl("dataBz");
	var state = ds.getValue("fState");
	var doState = ds.getValue("fDoState");
	if (state == "已完成") {
		$("#btnBjgz").hide();
		$("#btnBjsl").hide();
		$("#btnHs").hide();
		$("#btnSecondBz").hide();
	} else {
		if (doState == "申请中") {
			$("#btnBjgz").show();
			$("#btnBjsl").hide();
			$("#btnHs").hide();
			$("#btnSecondBz").hide();
		} else if (doState == "已提交") {
			$("#btnBjgz").hide();
			$("#btnBjsl").hide();
			$("#btnHs").hide();
			$("#btnSecondBz").hide();
		} else if (doState == "补正完成") {
			$("#btnBjgz").hide();
			$("#btnBjsl").show();
			$("#btnHs").show();
			$("#btnSecondBz").hide();
		}
	}

};

mngActivity.dataBzIndexChanged = function(event) {
	mngActivity.setBtnVisible();
};

mngActivity.dataBzAfterRefresh = function(event) {
	mngActivity.setBtnVisible();
};

mngActivity.trigger1Click = function(event) {
	require([ "base/system/idcard/CardRouter" ], function(Router) {
		 Router.initInstance({});
	});
};
