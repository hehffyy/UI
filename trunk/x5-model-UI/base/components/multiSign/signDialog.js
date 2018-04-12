var signDialog = {};

signDialog.trg_ensureClick = function(event) {
	signDialog.windowEnsure();
};

signDialog.trg_cancelClick = function(event) {
	justep.xbl("windowReceiver").windowCancel();
};

signDialog.grid1RowDblClick = function(event) {
	if (!signDialog.readonly)
		selectIdiom(event.rowID);
};

signDialog.windowEnsure = function() {
	var data = justep.xbl("data");
	if (justep.xbl("idiomsData").saveData() && justep.xbl("data").saveData()) {
		justep.xbl("windowReceiver").windowEnsure({
			info : data.getValue("info"),
			attachment : data.getValue("attachment")
		});
	}
};

signDialog.windowReceiverReceive = function(event) {
	var data = justep.xbl("data");
	var attachment = event.data.attachment;
	this.isAttachment = event.data.isAttachment;
	data.setValue("info", event.data.msg);
	data.setValue("attachment", attachment);

	if (!!event.data.readonly) {
		signDialog.readonly = true;
		data.setReadonly(true);
		$("#isIdiom").hide();
		$("#trg_clear").hide();
		$("#trg_ensure").hide();
		$("#trg_cancel").hide();
		justep.xbl("attachmentEditor").setPermission(7);
		data.setValue("isIdiom", "0");
	} else {
		signDialog.readonly = false;
		data.setReadonly(false);
		$("#isIdiom").show();
		$("#trg_clear").show();
		$("#trg_cancel").show();
		justep.xbl("attachmentEditor").setPermission(1799);
		data.setValue("isIdiom", "1");
	}
	event.data.showAttachment ? $("#attachment").show(): $("#attachment").hide();
	
};

signDialog.settingRefresh = function() {
	var cH = $(".xui-borderlayout-center","#borderLayout1").height();
	var iH = $("#idioms:visible").height();
	var aH = $("#attachment:visible").height();
	$("#signInfo").css("height", cH - iH - aH);
};

signDialog.dataValueChanged = function(event) {
	if (event.column == "isIdiom") {
		event.value == "1" ? ($("#idioms").show(),justep.xbl("VSplitter1").moveToMiddle()) : ($("#idioms").hide(),justep.xbl("VSplitter1").moveToStart());
		signDialog.settingRefresh();
	}if(event.column == "attachment"){
		setTimeout(function(){signDialog.settingRefresh();},10);
	} 
	
};

signDialog.idiomsDataAfterNew = function(event) {
	justep.xbl("idiomsData").setValue("owner", 0);
};

signDialog.trg_clearClick = function(event) {
	justep.xbl("data").setValue("info", "");
	justep.xbl("data").setValue("attachment", "");
};

signDialog.attachmentEditorUploadClick = function(event) {
	if (signDialog.limitAttachmentCount > 0) {
		var value = justep.xbl("data").getValue("attachment");
		if (value) {
			try {
				data = JSON.parse(value);
				if (data.length >= signDialog.limitAttachmentCount) {
					justep.System.showMessage("只允许上传"
							+ signDialog.limitAttachmentCount + "个附件");
					event.cancel = true;
				}
			} catch (e) {
			}
		}
	}
};



function selectIdiom(rowID) {
	if (!signDialog.readonly) {
		justep.xbl("textarea2").blur();
		var data = justep.xbl("data");
		var info = data.getValue("info") + "  "
				+ justep.xbl("idiomsData").getValue("fContent", rowID);
		data.setValue("info", info);
	}
};

signDialog.grid1_xhRender = function(event) {
	var rowID = event.rowID;
	return "<input id =\""
			+ rowID
			+ "\" type=\"radio\" name=\"select\" style=\"width:16px;height:16px;\" onclick=\"selectIdiom('"
			+ rowID + "')\"/>";
};



signDialog.model1Load = function(event) {
	$("#textarea2 textarea").attr("placeholder", "请输入意见...");
};
