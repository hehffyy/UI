var huoDongCuiBan = {};

huoDongCuiBan.funcReceiverReceive = function(event) {
	if (event.data) {
		justep.xbl("data").setValue("value", event.data.value);
		if (event.data.rowid) {
			huoDongCuiBan.rowid = event.data.rowid;
			$("#btnShowHistory").show();
			justep.xbl("bizData").refreshData();
		}
	}
};

huoDongCuiBan.btnApplyClick = function(event) {
	justep.XData.refreshControls();
	justep.xbl("funcReceiver").windowEnsure({
		value : justep.xbl("data").getValue("value"),
		sendMsg : $("#chkSendMsg").attr("checked")
	});
};

huoDongCuiBan.btnCancelClick = function(event) {
	justep.xbl("funcReceiver").windowCancel();
};

huoDongCuiBan.btnShowHistoryClick = function(event) {
	if (huoDongCuiBan._showHistory) {
		$("#tdHistory").hide();
	} else {
		$("#tdHistory").show();
	}
	huoDongCuiBan._showHistory = !huoDongCuiBan._showHistory;

};

huoDongCuiBan.bizDataRefreshCreateParam = function(event) {
	event.param.getParam("variables").put("hd", huoDongCuiBan.rowid);
};

huoDongCuiBan.model1ModelConstruct = function(event) {
	$("textarea", "#tdMemo").css("font-size", "14px");
	$("#btnShowHistory").hide();
	var promise = butone.Context.getBindModelPromise();
	promise && promise.then(huoDongCuiBan._initBindModel);
};

huoDongCuiBan._initBindModel = function(Composition) {
	var data = justep.xbl("data");
	var model = butone.Context.getBindModel();
	var modelExtend = {
		copyContent : function(row, event) {
			data.setValue("value", row.val("fContent"));
		}
	};
	butone.Util.apply(model, modelExtend);
	butone.Composition.bindAndShow($("#rootView").get(0), model);
};
