var signImageSelector = {};

signImageSelector.windowReceiverReceive = function(event) {
	var imgs = signImageSelector._imageParams = event.data;
	var imgHtml = "";
	for ( var n in imgs) {
		var img = imgs[n];
		imgHtml += "<li style='padding:10px;line-height:20px;border-bottom:1px dotted #c1c1c1' rowid='"
				+ img.rowid
				+ "'><img src='"
				+ signImageSelector.getSignImgUrl(img.rowid)
				+ "' alt='"
				+ img.name + "'/></li>";
	}
	var $ul = $("#imgList");
	$(imgHtml).appendTo($ul);

	$ul.children("li").dblclick(function() {
		justep.xbl("windowReceiver").windowEnsure($(this).attr("rowid"));
	});
};

signImageSelector.getSignImgUrl = function(rowid) {
	return justep.Request.setBizParams(justep.Request
			.convertURL("/UI/system/service/common/bizAction.j")
			+ "&blobDataModel=/base/personInfo/data"
			+ "&blobConcept=B_PersonSignImage"
			+ "&blobRelation=fImage"
			+ "&blobConceptValue="
			+ rowid
			+ "&process="
			+ justep.Context.getCurrentProcess()
			+ "&activity="
			+ justep.Context.getCurrentActivity()
			+ "&action=blobDownloadAction"
			+ "&$query-version="
			+ (new justep.UUID()).valueOf());
};
