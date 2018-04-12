var bujiaoShouliDialog = {};

bujiaoShouliDialog.bizData_AJGQJLRefreshCreateParam = function(event) {
	var variables = event.param.getParam("variables");
	variables.put("bizRecId",
			bujiaoShouliDialog.bizRecId ? bujiaoShouliDialog.bizRecId : "");
};

bujiaoShouliDialog.receiver1Receive = function(event) {
	this.inputData = event.data;
	this.bizRecId = this.inputData.bizRecId;
	this.suspendKind = this.inputData.options.suspendKind;

	var gqjl = justep.xbl("bizData_AJGQJL");
	gqjl.refreshData();
	var BJGZ = justep.xbl("bizData_BJGZ");
	BJGZ.refreshData();
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
	justep.xbl("bizData_BZYY").refreshData();
	// 获取补正材料
	this.getBjcl();
};

bujiaoShouliDialog.getBjcl = function() {
	var result;
	var clDs = justep.xbl('bizData_CLLB');
	var options = {};
	var param = new justep.Request.ActionParam();
	param.setString("bizrecid", this.bizRecId);
	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "getFlowBZCL";
	options.directExecute = true;
	options.callback = function(callbackData) {
		callbackData.ignoreError = false;
		result = callbackData.response;
		var rows = result.rows;
		for ( var i = 0; i < rows.length; i++) {
			var ids = clDs.find([ 'fCLBH' ], [ rows[i].FYWCLBH.value ], false,
					true, true);
			if (ids.length == 0) {
				clDs.newData({
					defaultValues : [ {
						fCLBH : rows[i].FYWCLBH.value,
						fCLMC : rows[i].FFILENAME.value,
						fFJQD : rows[i].FDOCIDS.value,
						fSWCL : '否'
					} ]
				});
			} else {
				clDs.setValue("fFJQD", rows[i].FDOCIDS.value, ids[0]);
				clDs.setValue("fOldFJQD", rows[i].FOLDFILES.value, ids[0]);
			}
		}
	};
	justep.Request.sendBizRequest2(options);
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
	justep.xbl("bizData_CLLB").revalidate();
	justep.XData.refreshControls();
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
			"suspendKind" : this.suspendKind
		}
	});
};

/**
 * 再次补正
 */
bujiaoShouliDialog.btnBujaioAgainClick = function(event) {
	var CLLB = justep.xbl("bizData_CLLB");
	var CLQRIDs = [], BLYCLIDs = [];
	for(var i = 0; i<CLLB.getCount(); i++){
		var rowID = CLLB.getID(i);
		if(CLLB.getValue("fCLQR",rowID) == "已确认")
			CLQRIDs.push(rowID);
		if(CLLB.getValue("fBLYCL",rowID) == "保留")
			BLYCLIDs.push(rowID);
	}
	justep.xbl("receiver1").windowEnsure({
		"options" : {
			"suspendKind" : this.suspendKind,
			"apprizeAgain" : true,
			"paramExt" : {
				CLQRIDs : CLQRIDs,
				BLYCLIDs : BLYCLIDs
			}
		}
	});
};

bujiaoShouliDialog.cancelBtnClick = function(event) {
	justep.xbl("receiver1").windowCancel();
};

bujiaoShouliDialog.gridCLLB__bzclButtonClick = function(event) {
	justep.xbl("bzclDialog").showDialog();
};

bujiaoShouliDialog.gridCLLB_fFJQDRender = function(event) {
	return "<a>查看附件</a>";
};
