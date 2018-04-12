var NtkoOfficeEditor = {};

NtkoOfficeEditor.windowReceiver1Receive = function(event) {
	Ntko.init(event.data);
	Ntko.edit();
	justep.xbl('windowReceiver1').sendData({
		source : this.form,
		kind : "initFinish"
	});
	// 注入关闭强制保存
	var me = this;
	window.__onBeforeClose = function(close) {
		Ntko._closeHander = null;
		if (!Ntko.readOnly) {
			Ntko._closeHander = close;
			me.btnSaveClick(null);
		} else
			close();
	};
};

NtkoOfficeEditor.NtkoOfficeViewModelConstruct = function(event) {
};

NtkoOfficeEditor.btnSaveClick = function(event) {
	if (Ntko.params.oprKind == "template") {
		try {
			var data = {
				// source : this.form,
				kind : "saveFinish",
				bookMarks : Ntko.getBookMarks()
			};
			justep.xbl('windowReceiver1').sendData(data);
		} catch (err) {
		}
	}
	if (Ntko.params.newFile) {
		this.btnCheckOutClick(null);
		Ntko.params.newFile = false;
	}
	Ntko.save();
};

NtkoOfficeEditor.btnCheckOutClick = function(event) {
	var data = {
		bizKey : Ntko.params.bizKey,
		kind : Ntko.params.kind,
		version : Ntko.params.version,
		parentVersion : Ntko.params.parentVersion,
		template : Ntko.params.template
	};
	var result = butoneEx.Common.callAction(data, "checkOutOffice",
			"/common/officeTemplate/process/template/templateProcess",
			"mainActivity");
	if (!result.canEdit) {
		alert("当前版本编辑中，不允许签出。");
		return;
	}
	Ntko.params.versionId = result.versionId;
	Ntko.setReadOnly(false);
};

NtkoOfficeEditor.btnHistoryClick = function(event) {
	justep.xbl("dlgHistory").open();
};

NtkoOfficeEditor.dlgHistorySend = function(event) {
	event.data = {
		bizKey : Ntko.params.bizKey,
		kind : Ntko.params.kind
	};
	return event.data;
};

NtkoOfficeEditor.btnMaxClick = function(event) {
	if (!Ntko.readOnly) {
		alert("请签入文档信息后，执行此操作 ！");
		return;
	}
	butoneEx.Office.editWord(Ntko.params.bizKey, Ntko.params.version,
			Ntko.params.parentVersion, Ntko.params.template, Ntko.params.track,
			Ntko.params.options);
};

NtkoOfficeEditor.dlgTemplateReceive = function(event) {
	var templateID = event.data;
	if (templateID) {
		Ntko.taohong(templateID);
	}
};

NtkoOfficeEditor.btnInitClick = function(event) {
	justep.xbl("confirmDlg").open2();
};

NtkoOfficeEditor.btnThClick = function(event) {
	justep.xbl("dlgTemplate").open2();
};

NtkoOfficeEditor.confirmDlgReceive = function(event) {
	Ntko.browTemplate();
};

NtkoOfficeEditor.btnShowTrackClick = function(event) {
	TANGER_OCX.ActiveDocument.ShowRevisions = true;
};

NtkoOfficeEditor.btnHideTrackClick = function(event) {
	TANGER_OCX.ActiveDocument.ShowRevisions = false;
};

NtkoOfficeEditor.btnAcceptTrackClick = function(event) {
	TANGER_OCX.TrackRevisions(false);
	TANGER_OCX.ActiveDocument.AcceptAllRevisions();
};

NtkoOfficeEditor.btnExitClick = function(event){
	Ntko.readOnly=true;
	justep.Portal.closeWindow(justep.Portal.getWindowId());
};

NtkoOfficeEditor.btnTestClick = function(event){
	if (Ntko.params.newFile) {
		this.btnCheckOutClick(null);
		Ntko.params.newFile = false;
	}
	Ntko.saveTest();
};
