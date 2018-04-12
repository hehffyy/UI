var bujiaoShouliDialog = {};

bujiaoShouliDialog.bizData_AJGQJLRefreshCreateParam = function(event) {
	debugger;
	var variables = event.param.getParam("variables");
	variables.put("bizRecId",
			bujiaoShouliDialog.bizRecId ? bujiaoShouliDialog.bizRecId : "");
};

bujiaoShouliDialog.receiver1Receive = function(event) {
	this.bizRecId = event.data.bizRecId;
	this.suspendKind = event.data.suspendKind;
	var gqjl = justep.xbl("bizData_AJGQJL");
	gqjl.refreshData();
	var BJGZ = justep.xbl("bizData_BJGZ");
	if (BJGZ.getCount() == 0) {
		new justep.System.showMessage().open({
			msg : '案卷补正告知信息不存在',
			img : 'error',
			title : '错误信息',
			type : 0,
			callback : function() {
				setTimeout(function() {
					justep.xbl("receiver1").windowCancel();
				}, 0);
			}
		});
		return;
	}
	if (!BJGZ.getValue("fBZSLDD"))
		BJGZ.setValue("fBZSLDD", justep.Context.getCurrentDeptName());
};

bujiaoShouliDialog.getMessageDialog = function() {
	if (!this._messageDialog)
		this._messageDialog = new justep.System.showMessage();
	return this._messageDialog;
};

/**
 * 补正受理
 */
bujiaoShouliDialog.sureBtnClick = function(event) {
	// 判断是否所有材料均已确认
	var me = bujiaoShouliDialog;
	var B_AJGQJLB = justep.xbl("bizData_AJGQJL");
	var invalidInfo = B_AJGQJLB.getInvalidInfo();

	var cllb = justep.xbl("bizData_CLLB");
	for ( var i = 0; i < cllb.getCount(); i++) {
		var rowId = cllb.getID(i);
		var fCLQR = cllb.getValue("fCLQR", rowId);
		if (fCLQR != "已确认") {
			invalidInfo += "\n[" + cllb.getValue("fCLMC", rowId) + "]" + fCLQR;
		}
	}

	if (invalidInfo) {
		me.getMessageDialog().open({
			msg : invalidInfo,
			img : 'info',
			title : '数据检查',
			type : 0
		});
		return;
	}
	var tables = {
		"B_AJGQJLB" : B_AJGQJLB.getJson(),
		"B_BZGZ" : justep.xbl("bizData_BJGZ").getJson(),
		"B_BZCLQD" : justep.xbl("bizData_CLLB").getJson()
	};
	justep.xbl("receiver1").windowEnsure({
		"tables" : tables,
		"options" : {
			"suspendKind" : bujiaoShouliDialog.suspendKind
		}
	});
};

/**
 * 再次补正
 */
bujiaoShouliDialog.btnBujaioAgainClick = function(event) {
	justep.xbl("receiver1").windowEnsure({
		"options" : {
			"apprizeAgain" : true
		}
	});
};

bujiaoShouliDialog.cancelBtnClick = function(event) {
	justep.xbl("receiver1").windowCancel();
};
