/**
 * Ntko Office
 */
var Ntko = {
	config : {
		clsid : "B39F1330-3322-4a1d-9BF0-0BA2BB90E970",
		codebase : justep.Request.convertURL(
				"/UI/base_X/system/office/ofctnewclsid.cab", true)
				+ "#version=5,0,2,9",
		MakerCaption : "西安博通资讯股份有限公司",
		MakerKey : "9FAA507DF678D0645393EF1A52B026C9CEBFCE2A",
		ProductCaption : "广东省国土资源厅",
		ProductKey : "9C074A2B240B6042F2CE376E3A6807D91117C1DA",
		chromeSteupUrl : justep.Request.convertURL(
				"/UI/base_X/system/office/NtkoAllControlSetup.msi", true),
		ieSteupUrl : justep.Request.convertURL(
				"/UI/base_X/system/office/ofctnewclsid.cab", true)

	}
};
var ua = navigator.userAgent.toLowerCase();
var s;
(s = ua.match(/msie ([\d.]+)/)) ? Ntko.ie = s[1] : (s = ua
		.match(/firefox\/([\d.]+)/)) ? Ntko.firefox = s[1] : (s = ua
		.match(/chrome\/([\d.]+)/)) ? Ntko.chrome = s[1] : (s = ua
		.match(/opera.([\d.]+)/)) ? Ntko.opera = s[1] : (s = ua
		.match(/version\/([\d.]+).*safari/)) ? Ntko.safari = s[1] : 0;

Ntko.init = function(params) {
	
	// 默认设置
	this.params = params;
	if (document.getElementById("TANGER_OCX") == null
			|| TANGER_OCX.ToolBars == null) {
		return;
	}
	TANGER_OCX.FileNew = false;
	TANGER_OCX.FileClose = false;
	TANGER_OCX.FileSaveAs = true;
	
	TANGER_OCX.FileSave = false;
	TANGER_OCX.ToolBars = true;
	//TANGER_OCX.IsResetToolbarsOnOpen = true;
	TANGER_OCX.WebUserName = justep.Context.getCurrentPersonName();// 设置人员
	if (this.params.newFile){
		if(this.params.checkPerson==null)
			this.params.checkPerson = justep.Context.getCurrentPersonName();
	}
};

Ntko.edit = function() {
	if (document.getElementById("TANGER_OCX") == null
			|| TANGER_OCX.ToolBars == null) {
		return;
	}
	TANGER_OCX.IsShowFileErrorMsg = true;
	if (this.params.newFile) {
		if (this.params.docKind == "WORD" || this.params.docKind == "套红") {
			try {
				TANGER_OCX.CreateNew("KWPS.Document");
			} catch (err) {
				TANGER_OCX.CreateNew("word.document");
			}
		} else if (this.params.docKind == "EXCEL") {
			TANGER_OCX.CreateNew("Excel.Sheet");
		}
		Ntko.setReadOnly(false);
	} else {
		var url = "/UI/base/system/office/officeDown.j?bizKey="
				+ encodeURIComponent(this.params.bizKey) + "&kind="
				+ encodeURIComponent(this.params.kind) + "&version="
				+ encodeURIComponent(this.params.version) + "&parentVersion="
				+ encodeURIComponent(this.params.parentVersion) + "&template="
				+ encodeURIComponent(this.params.template);
		url = justep.Request.convertURL(url, false);
		url = location.protocol + "//" + location.host + url;
		if (TANGER_OCX.GetWPSVer() != 100)
			TANGER_OCX.OpenFromUrl(url, false, 'KWPS.Document');
		else
			TANGER_OCX.OpenFromUrl(url);
		if(justep.Browser.IE)
			Ntko.doDocumentOpened();
		this.fileUrl = url;
	}
};

Ntko.brow = function() {
	if (document.getElementById("TANGER_OCX") == null
			|| TANGER_OCX.ToolBars == null) {
		return;
	}
	var url = "/UI/base/system/office/officeBrow.j?versionId="
			+ this.params.versionId;
	debugger;
	url = justep.Request.convertURL(url, false);
	url = location.protocol + "//" + location.host + url;
	TANGER_OCX.OpenFromUrl(url);
	if(justep.Browser.IE)
		Ntko.doDocumentOpened();
};

Ntko.browTemplate = function() {
	if (this.params.template == null || this.params.template == "-1") {
		Ntko.showMsg("当前文档未使用模板");
		return;
	}
	if (document.getElementById("TANGER_OCX") == null
			|| TANGER_OCX.ToolBars == null) {
		return;
	}
	var url = "/UI/base/system/office/officeBrow.j?template="
			+ this.params.template;
	url = justep.Request.convertURL(url, false);
	url = location.protocol + "//" + location.host + url;
	TANGER_OCX.OpenFromUrl(url);
	if(justep.Browser.IE)
		Ntko.doDocumentOpened();
};

Ntko.taohong = function(template) {
	if (document.getElementById("TANGER_OCX") == null
			|| TANGER_OCX.ToolBars == null) {
		return;
	}
	this.thTemplate = template;
	//獲得套紅書簽
	var bk = butoneEx.Common.callAction({templateid:template,bizrecid:this.params.bizKey}, "getBookMarks",
			"/common/officeTemplate/process/template/templateProcess",
			"mainActivity");
	if (bk) {
		for (attr in bk) {
			var temp = bk[attr];
			if (temp == null)
				continue;
			bk[attr] = justep.Base64.decode(temp);
		}
	}
	this.params.bookMarks = bk;
	this.params.versionState = "签出";
	// 选择对象当前文档的所有内容
	var curSel = TANGER_OCX.ActiveDocument.Application.Selection;
	curSel.WholeStory();
	curSel.Cut();
	// 插入模板
	var url = "/UI/base/system/office/officeBrow.j?template=" + template;
	url = justep.Request.convertURL(url, false);
	url = location.protocol + "//" + location.host + url;
	//TANGER_OCX.AddTemplateFromURL(url);
	if (TANGER_OCX.GetWPSVer() !=100)
		TANGER_OCX.OpenFromUrl(url, false, 'KWPS.Document');
	else
		TANGER_OCX.OpenFromUrl(url);
	if(justep.Browser.IE)
		Ntko.doDocumentOpened();
};

Ntko.showMsg = function(msg) {
	TANGER_OCX.ShowTipMessage("系统提示", msg);
	// var t=setTimeout(function(){
	// clearTimeout(t);
	// TANGER_OCX.ShowTipMessage("系统提示", msg);
	// },100);
};
Ntko.save = function() {
	if (this.params.versionId == null) {
		//alert("版本ID为空");
		Ntko.setReadOnly(true);
	} else {
		var url = "/UI/base/system/office/officeUpload.j";
		url = url + "?versionId=" + this.params.versionId;
		url = justep.Request.convertURL(url, false);
		url = location.protocol + "//" + location.host + url;
		if (this.params.oprKind == "template")
			url = url + "&isTemplate=TRUE";
		var fileName = "newdoc.doc";
		if (this.params.docKind == "EXCEL")
			fileName = "newdoc.xlsx";
		var saveResult = null;
		// 0：保存为word Txt格式；
		// 1：保存为MHT格式。需要客户机安装OFFICE XP及以上版本；
		// 2：保存为XML格式。需要客户机安装OFFICE 2003及以上版本；
		// 3：保存为RTF格式；
		// 4：保存为UnicodeText格式；
		// 5：保存为兼容WORD文档格式；

		if (this.params.docKind == "EXCEL")
			saveResult = TANGER_OCX.SaveToURL(url, "EDITFILE", "", fileName, 0);
		else
			if(this.params.saveDefaultVer)
			   saveResult = TANGER_OCX.SaveToURL(url, "EDITFILE", "", fileName, 0);
			else
			   saveResult = TANGER_OCX.SaveAsOtherFormatToURL(5, url, "EDITFILE",
					"", fileName, 0);
		if(justep.Browser.IE)
			Ntko.onIESaveToUrl();
	}
};


Ntko.getBookMarks = function() {
	var bookmarks = [];
	if (!TANGER_OCX.activeDocument)
		return;
	var document = TANGER_OCX.activeDocument;
	var items = document.BookMarks;
	for ( var i = 1; i <= items.Count; i++) {
		var item = items.Item(i);
		bookmarks.push({
			name : item.name,
			value : item.Range.text
		});
	}
	return bookmarks;
};

// 替换书签
Ntko.replaceBookMarks = function() {
	if (this.params.bookMarks) {
		// 替换书签
		if (!TANGER_OCX.activeDocument)
			return;
		var doc = TANGER_OCX.activeDocument;
		var items = doc.BookMarks;
		for ( var i = 1; i <= items.Count; i++) {
			var item = items.Item(i);
			var name = item.name;
			var keyName = name.replace(new RegExp("_s", "gm"), "");
			keyName = keyName.replace(new RegExp("_S", "gm"), "");
			var value = this.params.bookMarks[keyName.toUpperCase()];
			if (value == null)
				continue;
			var curVal = TANGER_OCX.GetBookmarkValue(name);
			if (curVal != value)
				TANGER_OCX.SetBookmarkValue(name, value);
		}
	}
};

Ntko.doDocumentOpened = function(str, doc) {
	if (this.params) {
		this.replaceBookMarks();
//		if (this.params.track) {
//			TANGER_OCX.TrackRevisions = true;
//			//TANGER_OCX.EnterRevisionMode(true);
//		} else {
//			TANGER_OCX.TrackRevisions = false;
//			//TANGER_OCX.EnterRevisionMode(false);
//			//TANGER_OCX.activeDocument.AcceptAllRevisions();
//		}
		if (this.params.oprKind == "template"
				&& this.params.versionState == "签出")
			this.setReadOnly(false);
		else if (this.params.checkPerson == justep.Context
				.getCurrentPersonName()
				&& this.params.versionState == "签出") {
			this.setReadOnly(false);
		} else {
			this.setReadOnly(true);
		}

	}
	 TANGER_OCX.activeDocument.Activate();
	if (this.thTemplate) {
		OnAddTemplateFromURL();
	}
	if (this.params.track){
		try{
			TANGER_OCX.ActiveDocument.Application.ActiveWindow.View.SplitSpecial=20;
		}catch(err){
			
		}
	}
};

Ntko.setReadOnly = function(b) {
	TANGER_OCX.SetReadOnly(b, "",null,3);
	this.readOnly = b;
	TANGER_OCX.FileOpen = !b;
	this.params.versionState =b?"签入":"签出";
	if ($("#btnCheckOut").length>0) {
		$("#btnCheckOut")[0].disabled = !b;
		$("#btnSave")[0].disabled = b;
		$("#btnTh")[0].disabled = b;
		$("#btnInit")[0].disabled = b;
		$("#btnShowTrack")[0].disabled = b;
		$("#btnHideTrack")[0].disabled = b;
		$("#btnAcceptTrack")[0].disabled = b;
	}
	if (!b) {
		if (this.params.track){
			TANGER_OCX.TrackRevisions(true);
		    //TANGER_OCX.EnterRevisionMode(true); 此方法可能导致文档被保护
		}
	}
};

Ntko.onIESaveToUrl = function(){
	Ntko.setReadOnly(true);
	if (Ntko._closeHander)
		Ntko._closeHander();
};
/*
 * 谷歌浏览器事件接管
 */
function onChromSaveToUrl(type, code, html) {
	var saveResult = html;
	if (saveResult) {
		var result = JSON.parse(saveResult);
		if (result.sucess) {
			Ntko.setReadOnly(true);
			if (Ntko._closeHander)
				Ntko._closeHander();
		} else {
			TANGER_OCX.ShowTipMessage("系统提示", result.content);
		}
	}
}


/**
 * 套红实现
 * 
 * @param type
 * @param code
 * @param html
 */
function OnAddTemplateFromURL(type, code, html) {
	try {
		var BookMarkName = "正文";
		if (!TANGER_OCX.ActiveDocument.BookMarks.Exists(BookMarkName)) {
			Ntko.showMsg("Word 模板中不存在名称为：\"" + BookMarkName + "\"的书签！");
			return;
		}
		var items = TANGER_OCX.ActiveDocument.BookMarks;
		var bkmkObj;
		for ( var i = 1; i <= items.Count; i++) {
			var item = items.Item(i);
			if (item.name == BookMarkName) {
				bkmkObj = item;
				break;
			}
		}
		var saverange = bkmkObj.Range;
//		var selection = TANGER_OCX.ActiveDocument.Application.Selection;
//		selection.GoTo('-1','正文');
//		selection.MoveDown(5,1);
//		selection.PasteAndFormat(16);
		saverange.Paste();
		// TANGER_OCX.ActiveDocument.Bookmarks.Add(BookMarkName, saverange);
		//Ntko.replaceBookMarks();
	} catch (err) {
		Ntko.showMsg(err);
	}

}
function OnComplete(type, code, html) {

}
function OnComplete3(str, doc) {
	Ntko.doDocumentOpened();
}
function publishashtml(type, code, html) {
	// alert(html);
	// alert("Onpublishashtmltourl成功回调");
}
function publishaspdf(type, code, html) {
	// alert(html);
	// alert("Onpublishaspdftourl成功回调");
}
function saveasotherurl(type, code, html) {
	// alert(html);
	// alert("SaveAsOtherformattourl成功回调");
}
function dowebget(type, code, html) {
	// alert(html);
	// alert("OnDoWebGet成功回调");

}
function webExecute(type, code, html) {
	// /alert(html);
	// alert("OnDoWebExecute成功回调");
}
function webExecute2(type, code, html) {
	// alert(html);
	// alert("OnDoWebExecute2成功回调");
}
function FileCommand(TANGER_OCX_str, TANGER_OCX_obj) {
	if (TANGER_OCX_str == 3) {
		TANGER_OCX.CancelLastCommand = true;
	}
}
function CustomMenuCmd(menuPos, submenuPos, subsubmenuPos, menuCaption, menuID) {

}

function test123(Document, StatusCode) {
}
if (justep.Browser.IE) {
	document.write('<!-- 用来产生编辑状态的ActiveX控件的JS脚本-->   ');
	document.write('<!-- 因为微软的ActiveX新机制，需要一个外部引入的js-->   ');
	document.write('<object id="TANGER_OCX" classid="clsid:'
			+ Ntko.config.clsid + '"');
	document.write('codebase="' + Ntko.config.codebase
			+ '" width="100%" height="100%" >   ');
	document.write('<param name="IsUseUTF8URL" value="-1">   ');
	document.write('<param name="IsUseUTF8Data" value="-1">   ');
	document.write('<param name="BorderStyle" value="1">   ');
	document.write('<param name="BorderColor" value="14402205">   ');
	document.write('<param name="TitlebarColor" value="15658734">   ');
	document.write('<param name="ToolBars" value="false">   ');

	document.write('<param name="MakerCaption" value="'
			+ Ntko.config.MakerCaption + '"> ');
	document.write('<param name="MakerKey" value="' + Ntko.config.MakerKey
			+ '"> ');
	document.write('<param name="ProductCaption" value="'
			+ Ntko.config.ProductCaption + '">  ');
	document.write('<param name="ProductKey" value="' + Ntko.config.ProductKey
			+ '"> ');

	document.write('<param name="TitlebarTextColor" value="0">   ');
	document.write('<param name="MenubarColor" value="14402205">   ');
	document.write('<param name="MenuButtonColor" VALUE="16180947">   ');
	document.write('<param name="MenuBarStyle" value="3">   ');
	document.write('<param name="MenuButtonStyle" value="7">   ');
	document.write('<param name="WebUserName" value="NTKO">   ');
	document.write('<param name="Caption" value="">   ');
	document
			.write('<SPAN STYLE="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</SPAN>   ');
	document.write('</object>');
	document
			.write('<script language="JScript" for="TANGER_OCX" event="OnDocumentOpened">');
	document.write('Ntko.doDocumentOpened();</script>');
} else if (Ntko.chrome || Ntko.firefox) {// if (Ntko.chrome)
	document
			.write('<object id="TANGER_OCX" clsid="{'
					+ Ntko.config.clsid
					+ '}"  ForOnSaveToURL="onChromSaveToUrl" ForOnBeginOpenFromURL="OnComplete" ForOndocumentopened="OnComplete3"');
	document.write('ForOnAddTemplateFromURL="OnAddTemplateFromURL"');
	document.write('ForAfterOpenFromURL="test123"');
	document.write('ForOnpublishAshtmltourl="publishashtml"');
	document.write(' ForOnpublishAspdftourl="publishaspdf"');
	document.write(' ForOnSaveAsOtherFormatToUrl="onChromSaveToUrl"');
	document.write(' ForOnDoWebGet="dowebget"');
	document.write(' ForOnDoWebExecute="webExecute"');
	document.write(' ForOnDoWebExecute2="webExecute2"');
	document.write(' ForOnFileCommand="FileCommand"');
	document.write(' ForOnCustomMenuCmd2="CustomMenuCmd"');
	document.write(' codebase="' + Ntko.config.codebase
			+ '" width="100%" height="100%" type="application/ntko-plug" ');
	document.write('_IsUseUTF8URL="-1"   ');
	document.write('_IsUseUTF8Data="-1"   ');

	document.write('_MakerCaption="' + Ntko.config.MakerCaption + '" ');
	document.write('_MakerKey="' + Ntko.config.MakerKey + '" ');
	document.write('_ProductCaption="' + Ntko.config.ProductCaption + '"  ');
	document.write('_ProductKey="' + Ntko.config.ProductKey + '" ');

	document.write('_BorderStyle="2"   ');
	document.write('_BorderColor="14482205"   ');
	document.write('_MenubarColor="14412205"   ');
	document.write('_MenuButtonColor="16180947"   ');
	document.write('_ForeColor="14412205"   ');
	document.write('_MenuBarStyle="3"  ');
	document.write('_MenuButtonStyle="7"   ');
	document.write('_TitleBar="false"   ');
	//document.write('_BackColor="0xFF0000"   ');
	document.write('_WebUserName="NTKO"   ');
	document.write('_Caption="">    ');
	document
			.write('<SPAN STYLE="color:red">尚未安装NTKO Web Chrome跨浏览器插件。请点击<a href="'
					+ Ntko.config.chromeSteupUrl + '">安装组件</a></SPAN>   ');
	document.write('</object>');
} else if (Ntko.opera) {
	alert("sorry,ntko web印章暂时不支持opera!");
} else if (Ntko.safari) {
	alert("sorry,ntko web印章暂时不支持safari!");
}