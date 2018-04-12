var finishDialog = {};

finishDialog.cancelBtnClick = function(event) {
	justep.xbl("receiver1").windowCancel();
};

finishDialog.syncFinishInfo = function(data){
	for(var n in this.inputData.finishInfo){
		data.setValue(n, this.inputData.finishInfo[n]);
	}
};

finishDialog.receiver1Receive = function(event) {
	this.inputData = event.data;
	this.inputData.processControl = new justep.ProcessControl();
	this.inputData.processControl.loadFromJson(this.inputData.data);
	this.bizRecId = this.inputData.bizRecId;
	
	this.isAbort = this.inputData.options.isAbort;
	var finishKind = this.finishKind = this.isAbort ? this.inputData.options.finishKind : this.inputData.processControl.getExt("finishKind");

	var msg = "",stop = false;
	var exts = this.inputData.processControl.getExts();
	if (exts && exts.rules) {
		for ( var i = 0; i < exts.rules.length; i++) {
			var extRule = exts.rules[i];
			if (!stop)
				stop = extRule.stop;
			msg += extRule.message + "\n";
		}
	}
	$("#rules").html(msg);
	if(!msg)
		$("#rules").hide();
	if(stop)
		$("#sureBtn").hide();
	
	var data = justep.xbl("bizData_BJJL");
	var dict = justep.xbl("dataFinishResult");
	data.refreshData();
	dict.refreshData();
	if (data.getCount() > 0) {
		new justep.System.showMessage().open({
			msg : '此案卷已经存在办结信息，是否修改？',
			img : 'question',
			title : '提示信息',
			type : 2, // yes/no
			callback : function(event) {
				if (event.status == "yes")
					data.setReadonly(false);
				finishDialog.syncFinishInfo(data);
			}
		});
		data.setReadonly(true);
	} else {
		if (this.isAbort) {
			// 隐藏发证信息
			$("#rowFZXX").hide();
		} else {
			// 隐藏作废信息
			$("#rowAbort").hide();
		}
		data.newData();
		data.setValue("fBizRecId", this.bizRecId);
		if (finishKind) {
			if(finishKind=="fkNormal"){
				$("#rowBJJG").hide();
				data.setValue("fBJJGMS", "无");
			}
			data.setValue("xtbjlx", finishKind);
			var dictId = this.getBJJGByXYBJLX(finishKind);
			if (dictId >= 0) {
				data.setValue("fBJJGDM", dict.getValue("code", dictId));
				data.setValue("fBJJGMC", dict.getValue("name", dictId));
				data.setValue("fBJJGMS", dict.getValue("name", dictId));
			} else {
				alert("无效办结类型:" + finishKind);
				justep.xbl("sureBtn").setDisabled(true);
			}
		}
		finishDialog.syncFinishInfo(data);
	}

};

finishDialog.getBJJGByXYBJLX = function(xtbjlx) {
	var dict = justep.xbl("dataFinishResult");
	var n = dict.getCount();
	for ( var i = 0; i < n; i++) {
		if (xtbjlx == dict.getValue("finishKind"), dict.getID(i))
			return dict.getID(i);
	}
	return null;
};

finishDialog.sureBtnClick = function(event) {
	var data = justep.xbl("bizData_BJJL");
	var invalidInfo = data.getInvalidInfo();
	if (invalidInfo) {
		new justep.System.showMessage().open({
			msg : invalidInfo,
			img : 'info',
			title : '数据检查',
			type : 0
		});
		return;
	}
	if (data.getValue("xtbjlx") != "fkCertification") {
		data.setValue("fZJBH", null);
		data.setValue("fZJHGZMC", null);
		data.setValue("fFZHGZDW", null);
		data.setValue("fZJYXQX", null);
		data.setValue("fSFJE", 0);
	}

	var result = {
		"options" : this.inputData.options,
		"action" : this.inputData.action,
		"task" : this.inputData.task,
		"data" : this.inputData.processControl.getData(),
		"exts" : {
			"finishInfo" : {
				"finishKind" : finishDialog.isAbort ? finishDialog.finishKind
						: data.getValue("xtbjlx"),
				"tables" : {
					"B_BJJLB" : data.getJson()
				}
			}
		}
	};
	justep.xbl("receiver1").windowEnsure(result);
};

finishDialog.bizData_BJJLValueChanged = function(event) {
	if (event.column == "xtbjlx") {
		if (event.value == "fkCertification") {
			$("#rowFZXX").show();
		} else {
			$("#rowFZXX").hide();
		}
		var dict = justep.xbl("dataFinishResult");
		var dictId = finishDialog.getBJJGByXYBJLX(event.value);
		if (dictId >= 0 && dict.getValue("isAbort", dictId) == "Y") {
			$("#rowAbort").show();
		} else {
			$("#rowAbort").hide();
		}
	}
};

finishDialog.bizData_BJJLRefreshCreateParam = function(event) {
	var variables = event.param.getParam("variables");
	variables.put("bizRecId", finishDialog.bizRecId ? finishDialog.bizRecId
			: "");
};

finishDialog.model1Load = function(event) {
	$("#rowFZXX").hide();
};

finishDialog.dataFinishResultCustomRefresh = function(event) {
	var options = {};
	options.dataType = "json";
	options.action = "queryFinishResultDictAction";
	options.contentType = "application/json";
	var response = justep.Request.sendBizRequest2(options);
	if (justep.Request.isSuccess(response)) {
		event.source.loadJson(justep.Request.getData(response));
		var data = event.source, del = [], isAbort = finishDialog.isAbort ? "Y"
				: "N";
		for ( var i = 0; i < data.getCount(); i++) {
			var rowid = data.getID(i);
			if (finishDialog.finishKind
					&& finishDialog.finishKind != data.getValue("finishKind",
							rowid)
					|| data.getValue("isAbort", rowid) != isAbort) {
				del.push(rowid);
			}
		}
		data.deleteData(del);
		data.getCount() <= 1 ? $("#rowBJLX").hide() : $("#rowBJLX").show();
	} else {
		throw justep.Request.getMessage(response);
	}
};
