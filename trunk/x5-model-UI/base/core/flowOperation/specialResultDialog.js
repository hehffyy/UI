var specialResultDialog = {};

specialResultDialog.receiver1Receive = function(event) {
	this.inputData = event.data;
	this.bizRecId = this.inputData.bizRecId;
	this.suspendKind = this.inputData.options.suspendKind;

	var gqjl = justep.xbl("bizData_AJGQJL");
	gqjl.refreshData();
	var TBCX = justep.xbl("bizData_TBCX");
	if (TBCX.getCount() == 0) {
		new justep.System.showMessage().open({
			msg : '案卷特别程序申请信息不存在',
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
	TBCX.setValue("fJGCSRQ", justep.Date.toString(new Date(),
			justep.Date.STANDART_FORMAT_SHOT));
	if (TBCX.getValue("fTBCXSFJE") == "")
		TBCX.setValue("fTBCXSFJE", 0.0);
};

specialResultDialog.sureBtnClick = function(event) {
	var B_AJGQJLB = justep.xbl("bizData_AJGQJL");
	var invalidInfo = B_AJGQJLB.getInvalidInfo();
	if (invalidInfo) {
		new justep.System.showMessage().open({
			msg : invalidInfo,
			img : 'info',
			title : '数据检查',
			type : 0
		});
		return;
	}
	var tables = {
		"B_AJGQJLB" : B_AJGQJLB.getJson(),
		"B_TBCX" : justep.xbl("bizData_TBCX").getJson()
	};
	justep.xbl("receiver1").windowEnsure({
		"tables" : tables,
		"options" : {
			"suspendKind" : specialResultDialog.suspendKind
		}
	});
};

specialResultDialog.cancelBtnClick = function(event) {
	justep.xbl("receiver1").windowCancel();
};

specialResultDialog.bizData_AJGQJLRefreshCreateParam = function(event) {
	var variables = event.param.getParam("variables");
	variables.put("bizRecId",
			specialResultDialog.bizRecId ? specialResultDialog.bizRecId : "");
};
