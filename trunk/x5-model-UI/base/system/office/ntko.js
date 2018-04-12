/**
 * Ntko Office
 */
(function(global) {
	var config = {
		clsid : "B39F1330-3322-4a1d-9BF0-0BA2BB90E970",
		codebase : justep.Request.convertURL(
				"/UI/base/system/office/ofctnewclsid.cab", true)
				+ "#version=5,0,2,9",
		MakerCaption : "西安博通资讯股份有限公司",
		MakerKey : "9FAA507DF678D0645393EF1A52B026C9CEBFCE2A",
		ProductCaption : "广东省国土资源厅",
		ProductKey : "9C074A2B240B6042F2CE376E3A6807D91117C1DA",
		chromeSteupUrl : justep.Request.convertURL(
				"/UI/base/system/office/NtkoAllControlSetup.msi", true),
		ieSteupUrl : justep.Request.convertURL(
				"/UI/base/system/office/ofctnewclsid.cab", true)

	};

	/**
	 * 接管异常，防止异常提示框被office控件挡住
	 */
	onerror = pageErrorHandler;
	function pageErrorHandler(msg, url, line, stack) {
		msg = ('string' == typeof (msg) && msg) ? msg.replace(
				/Uncaught Error:/, '') : '未知错误！';
		var msgs = msg.split("|");
		var detail = msgs.length > 1 ? (msgs[1] == "" ? msg : msgs[1]) : msg;
		if (url) {
			detail += ('\n at (' + url);
			if (line)
				detail += (':' + line);
			detail += ')';
		}
		if (stack)
			detail += ('\n' + stack);
		alert(new justep.Message(justep.Message.JUSTEP232093, detail)
				.getMessage());
		return false;
	}

	global.NTKOFileCommand = function(TANGER_OCX_str, TANGER_OCX_obj) {
		if (TANGER_OCX_str == 3) {
			TANGER_OCX.CancelLastCommand = true;
		}
		$("body")
				.trigger("NTKOFileCommand", [ TANGER_OCX_str, TANGER_OCX_obj ]);
	}
	global.NTKOCustomMenuCmd = function(menuPos, submenuPos, subsubmenuPos,
			menuCaption, menuID) {
		$("body").trigger("NTKOCustomMenuCmd",
				[ menuPos, submenuPos, subsubmenuPos, menuCaption, menuID ]);
	};

	global.NTKOOnSaveToUrl = function(type, code, html) {
		$("body").trigger("NTKOOnSaveToUrl", [ type, code, html ]);
	};

	global.NTKOOnDocumentOpened = function(file, document) {
		$("body").trigger("NTKOOnDocumentOpened", [ file, document ]);
	};

	global.NTKOAfterOpenFromURL = function(doc, statusCode) {
		$("body").trigger("NTKOAfterOpenFromURL", [ doc, statusCode ]);
	};

	var ua = navigator.userAgent.toLowerCase();
	var s, browser = {};
	(s = ua.match(/msie ([\d.]+)/)) ? browser.ie = s[1] : (s = ua
			.match(/firefox\/([\d.]+)/)) ? browser.firefox = s[1] : (s = ua
			.match(/chrome\/([\d.]+)/)) ? browser.chrome = s[1] : (s = ua
			.match(/mozilla\/([\d.]+)/)) ? browser.mozilla = s[1] : (s = ua
			.match(/opera.([\d.]+)/)) ? browser.opera = s[1] : (s = ua
			.match(/version\/([\d.]+).*safari/)) ? browser.safari = s[1] : 0;
	if (browser.ie || browser.mozilla) {
		document.write('<!-- 用来产生编辑状态的ActiveX控件的JS脚本--> ');
		document.write('<!-- 因为微软的ActiveX新机制，需要一个外部引入的js--> ');
		document.write('<object id="TANGER_OCX" classid="clsid:' + config.clsid
				+ '"');
		document.write('codebase="' + config.codebase
				+ '" width="100%" height="100%" > ');
		document.write('<param name="IsUseUTF8URL" value="-1"> ');
		document.write('<param name="IsUseUTF8Data" value="-1"> ');
		document.write('<param name="BorderStyle" value="1"> ');
		document.write('<param name="BorderColor" value="14402205"> ');
		document.write('<param name="TitlebarColor" value="15658734"> ');
		document.write('<param name="ToolBars" value="false"> ');

		document.write('<param name="MakerCaption" value="'
				+ config.MakerCaption + '"> ');
		document.write('<param name="MakerKey" value="' + config.MakerKey
				+ '"> ');
		document.write('<param name="ProductCaption" value="'
				+ config.ProductCaption + '"> ');
		document.write('<param name="ProductKey" value="' + config.ProductKey
				+ '"> ');

		document.write('<param name="TitlebarTextColor" value="0"> ');
		document.write('<param name="MenubarColor" value="14402205"> ');
		document.write('<param name="MenuButtonColor" VALUE="16180947"> ');
		document.write('<param name="MenuBarStyle" value="3"> ');
		document.write('<param name="MenuButtonStyle" value="7"> ');
		// document.write('<param name="WebUserName" value="NTKO"> ');
		// document.write('<param name="Caption" value=""> ');
		document
				.write('<SPAN STYLE="color:red">不能装载文档控件。请在检查浏览器的选项中检查浏览器的安全设置。</SPAN> ');
		document.write('</object>');
		document
				.write('<script language="JScript" for="TANGER_OCX" event="OnDocumentOpened(file,doc)">NTKOOnDocumentOpened(file,doc);</script>');
		document
				.write('<script language="JScript" for="TANGER_OCX" event="OnSaveToURL(type, code, html)">NTKOOnSaveToUrl(type, code, html);</script>');
	} else if (browser.firefox) {
		document
				.write('<object id="TANGER_OCX" clsid="{' + config.clsid + '}"');
		document.write(' codebase="' + config.codebase
				+ '" width="100%" height="100%" type="application/ntko-plug" ');

		document
				.write(' ForOnSaveToURL="NTKOOnSaveToUrl" ForOndocumentopened="NTKOOnDocumentOpened" ForOnAddTemplateFromURL="OnAddTemplateFromURL"');
		document
				.write(' ForOnSaveAsOtherFormatToUrl="NTKOOnSaveToUrl" ForOnFileCommand="NTKOFileCommand" ForOnCustomMenuCmd2="NTKOCustomMenuCmd"');
		document.write('_IsUseUTF8URL="-1" ');
		document.write('_IsUseUTF8Data="-1" ');

		document.write('_MakerCaption="' + config.MakerCaption + '" ');
		document.write('_MakerKey="' + config.MakerKey + '" ');
		document.write('_ProductCaption="' + config.ProductCaption + '" ');
		document.write('_ProductKey="' + config.ProductKey + '" ');

		document.write('_BorderStyle="2" ');
		document.write('_BorderColor="14482205" ');
		document.write('_MenubarColor="14412205" ');
		document.write('_MenuButtonColor="16180947" ');
		document.write('_ForeColor="14412205" ');
		document.write('_MenuBarStyle="3" ');
		document.write('_MenuButtonStyle="7" ');
		document.write('_TitleBar="false" ');
		document.write('_BackColor="0xFF0000" ');
		// document.write('_WebUserName="NTKO" ');
		// document.write('_Caption="">');
		document
				.write('<SPAN STYLE="color:red">尚未安装NTKO Web Chrome跨浏览器插件。请点击<a href="'
						+ config.chromeSteupUrl + '">安装组件</a></SPAN>');
		document.write('</object>');
	} else if (browser.chrome) {
		document
				.write('<object id="TANGER_OCX" clsid="{' + config.clsid + '}"');
		document.write(' codebase="' + config.codebase
				+ '" width="100%" height="100%" type="application/ntko-plug" ');

		document
				.write(' ForOnSaveToURL="NTKOOnSaveToUrl" ForOndocumentopened="NTKOOnDocumentOpened" ForOnAddTemplateFromURL="OnAddTemplateFromURL"');
		document
				.write(' ForOnSaveAsOtherFormatToUrl="NTKOOnSaveToUrl" ForOnFileCommand="NTKOFileCommand" ForOnCustomMenuCmd2="NTKOCustomMenuCmd"');
		document.write('_IsUseUTF8URL="-1" ');
		document.write('_IsUseUTF8Data="-1" ');

		document.write('_MakerCaption="' + config.MakerCaption + '" ');
		document.write('_MakerKey="' + config.MakerKey + '" ');
		document.write('_ProductCaption="' + config.ProductCaption + '" ');
		document.write('_ProductKey="' + config.ProductKey + '" ');

		document.write('_BorderStyle="2" ');
		document.write('_BorderColor="14482205" ');
		document.write('_MenubarColor="14412205" ');
		document.write('_MenuButtonColor="16180947" ');
		document.write('_ForeColor="14412205" ');
		document.write('_MenuBarStyle="3" ');
		document.write('_MenuButtonStyle="7" ');
		document.write('_TitleBar="false" ');
		document.write('_BackColor="0xFF0000" ');
		// document.write('_WebUserName="NTKO" ');
		// document.write('_Caption="">');
		document
				.write('<SPAN STYLE="color:red">尚未安装NTKO Web Chrome跨浏览器插件。请点击<a href="'
						+ config.chromeSteupUrl + '">安装组件</a></SPAN>');
		document.write('</object>');
	} else if (NTKO.opera) {
		alert("sorry,ntko web印章暂时不支持opera!");
	} else if (NTKO.safari) {
		alert("sorry,ntko web印章暂时不支持safari!");
	}

	var NTKO = {};

	NTKO.getInstance = function() {
		return TANGER_OCX;
	};

	NTKO.getInstanceID = function() {
		return "TANGER_OCX";
	};

	NTKO.init = function(params) {
		this.params = params = params || {};
		TANGER_OCX.FileOpen = false;
		TANGER_OCX.FileNew = params.hasOwnProperty("FileNew") ? !!params.FileNew
				: false;
		TANGER_OCX.FileClose = false;
		TANGER_OCX.FileSave = false;
		TANGER_OCX.FileSaveAs = true;
		TANGER_OCX.ToolBars = true;
		TANGER_OCX.IsResetToolbarsOnOpen = false;
		TANGER_OCX.WebUserName = justep.Context.getCurrentPersonName();// 设置人员
		TANGER_OCX.AddDocTypePlugin(".pdf", "PDF.NtkoDocument", "4.0.0.0", "",
				51, false); // 添加对pdf支持
	};

	NTKO.setReadOnly = function(b) {
		TANGER_OCX.SetReadOnly(b, "");
	};

	NTKO.AcceptAllRevisions = function() {
		TANGER_OCX.ActiveDocument.AcceptAllRevisions();
	};

	NTKO.setShowRevisions = function(b) {
		TANGER_OCX.ActiveDocument.ShowRevisions = b;
	};

	$(document).ready(function() {
		try {
			TANGER_OCX.GetBase64Value();
			NTKO.isValid = true;
		} catch (e) {
			NTKO.isValid = false;
		}
	});

	NTKO.config = config;

	global.NTKO = NTKO;

})(window);
