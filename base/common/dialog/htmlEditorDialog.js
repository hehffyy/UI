var htmlEditorDialog = {};

htmlEditorDialog.funcReceiverReceive = function(event) {
	if (event.data) {
		if (event.data.style=="text") {
			$("#trHtml").hide();
			$("#trText").show();
		} else {
			$("#trText").hide();
			$("#trHtml").show();
		}
		var data = justep.xbl("data");
		if (event.data.value) {
			data.setValue("value", event.data.value);
		}
		var textarea1 = justep.xbl("textarea1");
		if (event.data.attachment) {
			$("#tr_attachment").show();
			data.setValue("attachment", event.data.attachment);
		} else {
			$("#tr_attachment").hide();
		}
	}

};

htmlEditorDialog.btnCancelClick = function(event) {
	justep.xbl("funcReceiver").windowCancel();
};

htmlEditorDialog.btnApplyClick = function(event) {
	var data = justep.xbl("data");
	justep.xbl("funcReceiver").windowEnsure({
		value : data.getValue("value"),
		attachment : data.getValue("attachment")
	});
};

htmlEditorDialog.attachmentEditor21UploadCompleted = function(event) {
	justep.xbl("data").saveData();
};

htmlEditorDialog.model1ModelConstruct = function(event) {
	var promise = butone.Context.getBindModelPromise();
	promise && promise.then(htmlEditorDialog._initBindModel);
};

htmlEditorDialog._initBindModel = function() {
	var Composition = butone.Composition, $2 = require("jquery");
	var model = butone.Context.getBindModel();
	model.registeData("data");
	var modelExtend = {};
	butone.Util.apply(model, modelExtend);
	Composition.bindAndShow($2("#rootView").get(0), model);
};
