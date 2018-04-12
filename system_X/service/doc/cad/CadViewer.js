var CadViewer = {};

CadViewer.modelLoad = function(event) {
	setTimeout(
			function() {
				debugger;
				var DWGViewX = document.getElementById('DWGViewX');
				$("#DWGViewX").width("100%");
				if (!justep.Browser.IE && DWGViewX.HttpOpen == null) {
					$("#DWGViewX").hide();
					var baseInstall = "<center style='margin-top:300px'><font color='#FF00FF'>Chrome支持Activex控件未安装!点击这里<a href='"
							+ justep.Request
									.convertURL(
											"/UI/base/plugins/ffactivex-setup-r39.exe",
											true)
							+ "' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font></center>";

					var strHtmInstall = "<center style='margin-top:10px'><font color='#FF00FF'>CAD控件未安装!点击这里<a href='"
							+ justep.Request
									.convertURL(
											"/UI/system_X/service/doc/cad/CADViewerX.exe",
											true)
							+ "' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font></center>";
					if (justep.Browser.IE)
						$(strHtmInstall).appendTo($("#rootView"));
					else
						$(baseInstall + strHtmInstall).appendTo($("#rootView"));
					return;
				}

			}, 500);
};

CadViewer.modelModelConstructDone = function(event) {
	var html = '<object CLSID="{3F029CF6-B113-4551-A719-5BB2620D3CB1}"  TYPE="application/x-itst-activex"   id="DWGViewX"  width=99% height=99% ></object>';
	if (justep.Browser.IE)
		html = '<object classid=clsid:3F029CF6-B113-4551-A719-5BB2620D3CB1 VIEWASTEXT   id="DWGViewX"  name="DWGViewX" width=99% height=99% ></object>';
	$(html).appendTo($("#rootView"));
	var param = $(justep.Context.getRequestBody()).text();
	if (!param) {
		param = decodeURIComponent(justep.Request.URLParams.param);
	}
	if (param) {
		try {
			var DWGViewX = document.getElementById('DWGViewX');
			this.param = JSON.parse(param);
			var docPath = this.param.docPath;
			var fileID = this.param.fileID;
			var url = justep.doc.InnerUtils.getURLByFileID(docPath, fileID);
			url = location.protocol + "//" + location.host + url;
			//DWGViewX.DrawingFile = url;
			DWGViewX.HttpOpen(url, "");
		} catch (e) {
		}
	}
};


CadViewer.input1Click = function(event){
 debugger;	
 var DWGViewX = document.getElementById('DWGViewX');
};
