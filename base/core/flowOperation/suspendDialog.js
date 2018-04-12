var suspendDialog = {};

suspendDialog.bizData_AJGQJLRefreshCreateParam = function(event) {
	var variables = event.param.getParam("variables");
	variables.put("bizRecId", suspendDialog.bizRecId ? suspendDialog.bizRecId
			: "");
};

suspendDialog.receiver1Receive = function(event) {
	this.inputData = event.data;
	this.inputData.processControl = new justep.ProcessControl();
	this.inputData.processControl.loadFromJson(this.inputData.data);
	this.bizRecId = this.inputData.bizRecId;
	this.suspendKind = this.inputData.options.suspendKind;


	var gqjl = justep.xbl("bizData_AJGQJL");
	gqjl.refreshData();
	if (gqjl.getCount() > 0) {
		new justep.System.showMessage().open({
			msg : '案卷正处于' + gqjl.getValue("fGQLX") + "中，不允许" + title,
			img : 'info',
			title : '提示信息',
			type : 0,
			callback : function() {
				justep.xbl("receiver1").windowCancel();
			}
		});
	} else {
		var newData = {
			defaultValues : [ {
				fBizRecId : this.bizRecId
			} ]
		};
		gqjl.newData(newData);
	}
};

suspendDialog.cancelBtnClick = function(event) {
	justep.xbl("receiver1").windowCancel();
};

suspendDialog.sureBtnClick = function(event) {
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
	var result = {
		"options" : this.inputData.options,
		"action" : this.inputData.action,
		"task" : this.inputData.task,
		"data" : this.inputData.processControl.getData(),
		"exts" : {
			"suspendInfo" : {
				"suspendKind" : this.suspendKind,
				"tables" : {
					"B_AJGQJLB" : B_AJGQJLB.getJson()
				}
			}
		}
	};
	justep.xbl("receiver1").windowEnsure(result);
};