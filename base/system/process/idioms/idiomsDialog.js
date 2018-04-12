var idiomsDialog = {};

idiomsDialog.model1Load = function(event) {
	var idiomsData = justep.xbl("idiomsData");
	var li = "";
	if (idiomsData.getCount() > 0) {
		for ( var i = 0; i < idiomsData.getCount(); i++) {
			var rowID = idiomsData.getID(i);
			var fContent = idiomsData.getValue("fContent", rowID);
			li += "<li title='"
					+ fContent
					+ "' onclick='idiomsDialog.selectIdiom(this)'><span class='xh'>"
					+ (i + 1) + ".</span><span class='idiomContext'>"
					+ fContent + "</span></li>";
		}
	} else {
		li = "<li>未设置惯用语</li>";
	}
	$("#idiomList").html(li);
};

idiomsDialog.windowReceiverReceive = function(event) {
	idiomsDialog.data = event.data;
};

idiomsDialog.selectIdiom = function(event) {
	var idiomInfo = $(event).find("span[class='idiomContext']").text();
	if (!!idiomInfo) {
		var data = idiomsDialog.data;
		if (data.info && data.info.length > 0) {
			data.info += "\r\n" + idiomInfo;
		} else {
			data.info = idiomInfo;
		}
		justep.xbl("windowReceiver").windowEnsure(data);
	}
};
