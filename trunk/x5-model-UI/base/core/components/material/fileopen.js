var fileopen = {};

 

fileopen.model1Load = function(event){
  
};

/**
	name:windowReceiver#onReceive
	@event 
description: <b>[回调型事件]</b> window接收调用者传入的数据
	@param event 
	<br/><b>格式说明：</b>
	<xmp>
	{
		"source" : 组件的js对象,
		"data" : 传入的数据
	}
	</xmp>
	@example
	//接受传入的rowid，组成filter刷新data
	1、data组件上定义filter1 = DEMO_TABLE1 = :rowid
	2、接管onReceive
	windowReceiverReceive = function(event){
		if(event.data && event.data.rowid){
			var data = justep.xbl('mainData');
			//给变参:rowid赋值
			data.filters.setStringVar('rowid', event.data.rowid);
			data.refreshData();
		}
	}
*/
fileopen.windowReceiver1Receive = function(event){

	   var docData = event.data;
 
		var iframe = document.getElementById('_detail-data-frame_');
	 	if (iframe) {
		if (iframe.contentWindow.document.body){
			iframe.contentWindow.document.body.innerHTML = "<table width='100%' height='100%'><tr><td align='center' style='font-size: 11pt'>正在载入页面，请稍候......</td></tr></table>";
		}
 
		var versionID = versionID ? versionID : "last";
		var partType = partType ? partType : "content";
		var docPath =docData.docPath;
		var fileID=docData.fileID;
		var docID = docData.docID;
		var docName=docData.docName;
   
		if(!fileID){
	         alert(new justep.Message(justep.Message.JUSTEP232011).getMessage());
	         return;
		}
		var fileinfo = justep.Doc.queryDocByFileId(docPath,fileID,docName,versionID);
	 
		if (!justep.Browser.isInApp && '.doc.docx.xls.xlsx.ppt.mpp.vsd.'.indexOf(String(/\.[^\.]+$/.exec(docName)) + '.') >= 0) {
			var OVP = {};
			OVP.host = docPath;	
			OVP.programID = null;
			OVP.versionID = versionID;
			debugger;
			if(fileinfo.length < 1) 
				   throw new Error("文档服务器不存在名称为"+ docName + "的office文件！");
				if(partType=='revision'){
					OVP.partType = !fileinfo.parts.part_3 ? "content" : "revision";
				}else
					OVP.partType= partType;
						
				OVP.fileID = fileID;
				OVP.fileExt = String(/\.[^\.]+$/.exec(docName));
				OVP.filename = docName.substr(0, docName.lastIndexOf('.'));
				OVP.filename = escape(OVP.filename);
				if(typeof isPrint === "undefined" || isPrint == null) isPrint = true;
				OVP.isPrint = isPrint ? true : false;			
				var param = "<data>" + unescape(JSON.stringify(OVP)) + "</data>";
				justep.Request.callURL("/system/service/doc/office/officeViewerWindow.w?process=" 
			      + justep.Context.getCurrentProcess()
			      + "&activity=" + justep.Context.getCurrentActivity(), "_detail-data-frame_", param);
//				justep.Request.callURL("/system/service/doc/office/officeViewerWindow.w?process=" 
//					      + justep.Context.getCurrentProcess()
//					      + "&activity=" + justep.Context.getCurrentActivity(), "_detail-data-frame_", param);
 
		}else
		{
			var sdocPath = justep.Doc.getDocFullPath(docID ,docPath);
			var url = justep.Doc.getdocServerAction(sdocPath,'/repository/file/view/' + fileID + '/last/content');
			if(url.indexOf(justep.Request.BASE_URL) != -1)
				url = url.split(justep.Request.BASE_URL)[1];
		 
 		    justep.Request.callURL(url  , "_detail-data-frame_", null, false);
		}
		
	}
	
};
