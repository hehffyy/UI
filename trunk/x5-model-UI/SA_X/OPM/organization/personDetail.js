var personDetail = {};

personDetail._inputParams = {};
personDetail._defaultInputParams = {
	openMode : null,
	personID : null,
	orgID : null
};

personDetail.clearData = function() {
	var personData = justep.xbl("dPerson");
	personData.setFilter("idFilter", "1=0");
	personData.refreshData();
};

personDetail.receiverReceive = function(event) {
	for (o in personDetail._defaultInputParams)
		personDetail._inputParams[o] = personDetail._defaultInputParams[o];

	personDetail._inputParams.openMode = event.data.openMode;
	if (event.data.personID)
		personDetail._inputParams.personID = event.data.personID;
	if (event.data.orgID)
		personDetail._inputParams.orgID = event.data.orgID;

	var personData = justep.xbl("dPerson");
	var mainOrgData = justep.xbl("dMainOrg");
	if (personDetail._inputParams.openMode == "new") {
		personDetail.clearData();
		personData.newData();
		personData.setValue("sMainOrgID", personDetail._inputParams.orgID);
		personData.setValue("sName", "新建人员");
	} else {
		personData.setFilter("idFilter", "SA_OPPerson = '"
				+ personDetail._inputParams.personID + "'");
		personData.refreshData();
	}
	mainOrgData.setFilter("idFilter", "SA_OPOrg = '"
			+ personData.getValue("sMainOrgID") + "'");
	mainOrgData.refreshData();
};

personDetail.getReadOnly = function() {
	return (!personDetail._inputParams || personDetail._inputParams.openMode == "view");
};

personDetail.btnCancelClick = function(event) {
	justep.windowDialogReceiver.windowCancel();
};

personDetail.btnOKClick = function(event) {
	xforms.blur(true);
	var personData = justep.xbl("dPerson");
	if (personData.saveData()) {
		if (personDetail._inputParams.openMode == "new") {
			personDetail._inputParams.personID = personData.getRowId();
			personDetail._inputParams.orgID = personData.getValue("sMainOrgID");
			personDetail._inputParams.name = personData.getValue("sName");
			personDetail._inputParams.passwordClearText = personData
					.getUserData("password");
		}
		justep.windowDialogReceiver.windowEnsure(personDetail._inputParams);
	}
};

personDetail.btnReadCAClick = function(event) {
	var GDCA = window.GDCA;
	var personData = justep.xbl("dPerson");
	// 换Key处理
	GDCA.ActiveXEnd();
	// 重新初始化
	GDCA.ActiveXInit();
	var msg = prompt("请输入设备密码", "");
	if (!msg)
		return;
	if (!GDCA.loginUseKey(msg)) {
		alert("密码错误");
		return;
	}
	var keyId = GDCA.getCAKeyID();
	personData.setValue("sMsn", keyId);
};

personDetail.loadPersonLevel = function() {
	var options = {};
	options.process = "/base/OPM/organization/organizationProcess";
	options.activity = "mainActivity";
	options.action = "queryPersonLevelDictAction";
	options.contentType = "application/json";
	options.dataType = "json";
	var ret = justep.Request.sendBizRequest2(options);
	if (justep.Request.isSuccess(ret)) {
		var me = this, levels = ret.responseJSON ? ret.responseJSON.data.value
				: JSON.parse(ret.responseText).data.value;
		justep.xbl("personLevel").loadJson(levels);
	}
};

personDetail.model1ModelConstruct = function(event) {
	this.loadPersonLevel();
	var caSupport = !!window.GDCA && !!window.GDCASupport;
	if (!caSupport) {
		justep.xbl("btnReadCA").setDisabled(true);
	}
};

personDetail.btnClearCAClick = function(event) {
	var personData = justep.xbl("dPerson");
	personData.setValue("sMsn", null);
};
