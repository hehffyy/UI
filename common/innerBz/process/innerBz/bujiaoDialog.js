var bujiaoDialog = {};

bujiaoDialog.cancelBtnClick = function(event) {
	justep.xbl("receiver1").windowCancel();
};

bujiaoDialog.sureBtnClick = function(event) {
	debugger;
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
		"B_BZGZ" : justep.xbl("bizData_BJGZ").getJson(),
		"B_BZCLQD" : justep.xbl("bizData_CLLB").getJson()
	};
	justep.xbl("receiver1").windowEnsure({
		"tables" : tables,
		"options" : {
			"apprizeAgain" : false,
			"suspendKind" : bujiaoDialog.suspendKind
		},
		"reason" : justep.xbl("bizData_AJGQJL").getValue("fGQYY")
	});

};

// 获得申请原因
bujiaoDialog.getReason = function() {
	var bzyy = "";
	var bzsq = justep.xbl("bzSQ");
	bzsq.refreshData();
	bzsq.setFilter("filter_Bzsq", "fBzId='" + this.bzId + "'");
	bzsq.refreshData();
	for ( var i = 0; i < bzsq.getCount(); i++) {
		var key = bzsq.getID(i);
		var curReason = (i + 1) + "," + bzsq.getValue("fReason", key);
		bzyy = i == 0 ? curReason : bzyy + "\n" + curReason;
	}
	return bzyy;
};

bujiaoDialog.receiver1Receive = function(event) {
	this.bizRecId = event.data.bizRecId;
	this.bzId = event.data.bzId;
	var dataTask = justep.xbl("dataTask");
	dataTask
			.setFilter(
					"f1",
					"sData1='"
							+ this.bizRecId
							+ "' and sStatusID in ('tesExecuting','tesReady') and sKindID='tkTask'");
	dataTask.refreshData();

	this.suspendKind = event.data.suspendKind;
	this.isSuspend = event.data.isSuspend;
	var apprizeAgain = this.apprizeAgain = event.data.apprizeAgain;

	var gqjl = justep.xbl("bizData_AJGQJL");
	gqjl.refreshData();
	if (gqjl.getCount() > 0) {
		if (!apprizeAgain) {
			new justep.System.showMessage().open({
				msg : '案卷正处于' + gqjl.getValue("fGQLX") + "中，不允许补正告知",
				img : 'info',
				title : '提示信息',
				type : 0,
				callback : function() {
					justep.xbl("receiver1").windowCancel();
				}
			});
		}
	} else {
		var newData = {
			defaultValues : [ {
				fBizRecId : this.bizRecId
			} ]
		};
		if (this.isSuspend == 1) {
			gqjl.newData(newData);
			gqjl.setValue("fGQYY", this.getReason());
		}
		justep.xbl("bizData_BJGZ").newData(newData);
		justep.xbl("bizData_CLLB").newData({
			defaultValues : [ {
				fCLMC : "详见补正原因",
				fCLBH : '补充材料',
				fSWCL : '否'
			} ]
		});
	}
};

bujiaoDialog.btnBCCLClick = function(event) {
	var info = prompt("请材料名称:");
	if (info) {
		justep.xbl("bizData_CLLB").newData({
			defaultValues : [ {
				fCLMC : info,
				fCLBH : '补充材料',
				fSWCL : '否'
			} ]
		});
	}
};

bujiaoDialog.bizData_AJGQJLRefreshCreateParam = function(event) {
	var variables = event.param.getParam("variables");
	variables.put("bizRecId", bujiaoDialog.bizRecId ? bujiaoDialog.bizRecId
			: "");
};

bujiaoDialog.btnRemoveCLClick = function(event) {
	var grid = justep.xbl("gridCLLB").grid;
	var rowIDs = grid.getCheckedRows(grid.getColIndexById("checkNo"));
	if (rowIDs)
		justep.xbl("bizData_CLLB").deleteData(rowIDs);
};
