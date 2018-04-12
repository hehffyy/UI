var personSignImage = {};

personSignImage.windowReceiverReceive = function(event) {
	personSignImage._inputParam = event.data;
	justep.xbl("personSignImg").refreshData();
};

personSignImage.personSignImgRefreshCreateParam = function(event) {
	var variables = event.param.getParam("variables");
	variables.put("pid",
			personSignImage._inputParam ? personSignImage._inputParam.fPersonID
					: "");
};

personSignImage.personSignImgAfterNew = function(event) {
	event.source.saveData();
};

personSignImage.personSignImgAfterDelete = function(event) {
	event.source.saveData();
};

personSignImage.personSignImgNewCreateParam = function(event) {
	event.defaultValues = [ {
		fPersonID : personSignImage._inputParam.fPersonID,
		fPersonCode : personSignImage._inputParam.fPersonCode,
		fName : '签名' + (event.source.getCount() + 1)
	} ];
};

personSignImage.btnCancelClick = function(event) {
	justep.xbl("windowReceiver").windowCancel();
};

personSignImage.btnApplyClick = function(event) {
	xforms.blur(true);
	var data = justep.xbl("personSignImg");
	if (data.saveData()) {
		justep.xbl("windowReceiver").windowEnsure();
	}
};

personSignImage.blobImageSubmit = function(event) {
	personSignImage._calcImageSize = true;
	return true;
};

personSignImage.blobImageRefresh = function(event) {
	if (personSignImage._calcImageSize) {
		delete personSignImage._calcImageSize;
		var img = new Image();
		img.src = event.url;
		img.onload = function() {
			var data = justep.xbl("personSignImg");
			data.setValue("fImgSize", this.width + " x " + this.height);
			data.saveData();
		};
	}
};
