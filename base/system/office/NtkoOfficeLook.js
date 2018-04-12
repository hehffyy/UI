var NtkoOfficeLook = {};
var NtkoOfficeLook = {

};

NtkoOfficeLook.windowReceiver1Receive = function(event) {
	debugger;
	event.data.track = true;
	Ntko.init(event.data);
	Ntko.brow();
};

NtkoOfficeLook.NtkoOfficeViewModelConstruct = function(event) {
	// window.moveTo(0, 0);
	// window.resizeTo(screen.availWidth, screen.availHeight);
	// window.outerWidth = screen.availWidth;
	// window.outerHeight = screen.availHeight;
};

NtkoOfficeLook.NtkoOfficeEditorLoad = function(event) {
	if (justep.Request.URLParams["versionId"]) {
		var params = {
			track : true,
			versionId : justep.Request.URLParams["versionId"]
		};
		Ntko.init(params);
		Ntko.brow();
		window.document.title =decodeURIComponent(justep.Request.URLParams["title"]);
	}
};
