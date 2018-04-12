var NtkoImageViewer = {};

NtkoImageViewer.windowReceiver1Receive = function(event) {
debugger;
    //TANGER_OCX.Menubar  = false;
    
	TANGER_OCX.AddDocTypePlugin(".pdf", "PDF.NtkoDocument", "4.0.0.0",
			"./NTKOOleDocAll.dll", 51, true);
	TANGER_OCX.AddDocTypePlugin(".tif", "TIF.NtkoDocument", "4.0.0.0",
			"./NTKOOleDocAll.dll", 52);
	TANGER_OCX.AddDocTypePlugin(".tiff", "TIF.NtkoDocument", "4.0.0.0",
			"/NTKOOleDocAll.dll", 52);
	TANGER_OCX.OpenFromUrl(event.data.url,false);
};
