/**
 * 
 * Base64 encode / decode http://www.webtoolkit.info/
 * 
 */
var Base64 = {

	// private property
	_keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

	// public method for encoding
	encode : function(input) {
		var output = "";
		var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
		var i = 0;

		input = Base64._utf8_encode(input);

		while (i < input.length) {

			chr1 = input.charCodeAt(i++);
			chr2 = input.charCodeAt(i++);
			chr3 = input.charCodeAt(i++);

			enc1 = chr1 >> 2;
			enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
			enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
			enc4 = chr3 & 63;

			if (isNaN(chr2)) {
				enc3 = enc4 = 64;
			} else if (isNaN(chr3)) {
				enc4 = 64;
			}

			output = output + this._keyStr.charAt(enc1)
					+ this._keyStr.charAt(enc2) + this._keyStr.charAt(enc3)
					+ this._keyStr.charAt(enc4);

		}

		return output;
	},

	// public method for decoding
	decode : function(input) {
		var output = "";
		var chr1, chr2, chr3;
		var enc1, enc2, enc3, enc4;
		var i = 0;

		input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

		while (i < input.length) {

			enc1 = this._keyStr.indexOf(input.charAt(i++));
			enc2 = this._keyStr.indexOf(input.charAt(i++));
			enc3 = this._keyStr.indexOf(input.charAt(i++));
			enc4 = this._keyStr.indexOf(input.charAt(i++));

			chr1 = (enc1 << 2) | (enc2 >> 4);
			chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
			chr3 = ((enc3 & 3) << 6) | enc4;

			output = output + String.fromCharCode(chr1);

			if (enc3 != 64) {
				output = output + String.fromCharCode(chr2);
			}
			if (enc4 != 64) {
				output = output + String.fromCharCode(chr3);
			}

		}

		output = Base64._utf8_decode(output);

		return output;

	},

	// private method for UTF-8 encoding
	_utf8_encode : function(string) {
		string = string.replace(/\r\n/g, "\n");
		var utftext = "";

		for ( var n = 0; n < string.length; n++) {

			var c = string.charCodeAt(n);

			if (c < 128) {
				utftext += String.fromCharCode(c);
			} else if ((c > 127) && (c < 2048)) {
				utftext += String.fromCharCode((c >> 6) | 192);
				utftext += String.fromCharCode((c & 63) | 128);
			} else {
				utftext += String.fromCharCode((c >> 12) | 224);
				utftext += String.fromCharCode(((c >> 6) & 63) | 128);
				utftext += String.fromCharCode((c & 63) | 128);
			}

		}

		return utftext;
	},

	// private method for UTF-8 decoding
	_utf8_decode : function(utftext) {
		var string = "";
		var i = 0;
		var c = c1 = c2 = 0;

		while (i < utftext.length) {

			c = utftext.charCodeAt(i);

			if (c < 128) {
				string += String.fromCharCode(c);
				i++;
			} else if ((c > 191) && (c < 224)) {
				c2 = utftext.charCodeAt(i + 1);
				string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
				i += 2;
			} else {
				c2 = utftext.charCodeAt(i + 1);
				c3 = utftext.charCodeAt(i + 2);
				string += String.fromCharCode(((c & 15) << 12)
						| ((c2 & 63) << 6) | (c3 & 63));
				i += 3;
			}

		}

		return string;
	}

};

justep.doc = {};
justep.doc.PROCESS = "/SA/doc/system/systemProcess";
justep.doc.ACTIVITY = "mainActivity";

/*
 * officeViewerDialog.w使用的临时配置文件，将来要在数据库中实现 _seal_doc_node_sid
 * 为签章图片在知识中心所在目录的sid
 */
justep.doc._seal_doc_node_sid2 = "";
/* _seal_doc_node_sid 是否在附件的word编辑框中显示“插入签章”动作 */
justep.doc._seal_default_show2 = false;
/* _word_revision_init 编辑时是否显示文档的修订记录 */
justep.doc._word_all_history2 = false;
/* _office_isPrint 打开office文档时，打印按钮是否可用 */
justep.doc._office_isPrint2 = true;
/* _read_file_type读取文件，默认打开的格式 */
justep.doc._read_file_type2 = ".doc,.docx,.xls,.xlsx,.ppt,.pptx,.mpp,.vsd,.txt,.text,.jsp,.java,.html ,.htm,.xml,.css,.rtf,.wml,.jpg,.jpeg,.jpe,.png,.gif,.tiff,.tif,.svg,.svgz,.svg,.pdf,.wrl,.smil,.js,.vbs,.rdf,.odt,.ott,.uof.wps.";
/* 是否显示菜单 */
justep.doc._show_menubar2 = false;
/* cab文件的动态版本 */
justep.doc._ocx_version2 = "8.0.0.398";
/* ntko cab文件的动态版本 */
justep.doc._ntko_version = "5,0,2,5";

justep.doc.UrlType = {};
justep.doc.UrlType.VIEW = "view";
justep.doc.UrlType.DOWNLOAD = "download";
justep.doc.UrlType.DELETE = "delete";
justep.doc.UrlType.UPLOAD = "cacheUpload";
justep.doc.UrlType.COMMIT = "cacheCommit";
justep.doc.UrlType.OFFICEUPLOADRESULTINFO = "officeUploadResultInfo";
justep.doc.UrlType.OFFICEUPLOAD = "officeUpload";
justep.doc.UrlType.OFFICEDOWNLOAD = "officeDownload";

justep.doc.Utils = {};

justep.doc.Utils._getExecuteContext = function() {
	var process = justep.Context.getCurrentProcess();
	var activity = justep.Context.getCurrentActivity();
	return "process=" + process + ";activity=" + activity;
},

justep.doc.Utils.getDocUrl = function(docIDorDocPath, urlType, versionID,
		partType, resultID) {
	var params = new justep.Request.ActionParam();
	if (docIDorDocPath && docIDorDocPath.indexOf('/') != -1) {
		params.setParam("docPath", docIDorDocPath);
	} else {
		params.setParam("docID", docIDorDocPath);
	}
	params.setParam("urlType", urlType);
	params.setParam("versionID", versionID);
	params.setParam("partType", partType);
	params.setParam("resultID", resultID);

	var _result;
	justep.Request.sendBizRequest2({
		contentType : "application/json",
		dataType : "application/json",
		process : justep.doc.PROCESS,
		activity : justep.doc.ACTIVITY,
		action : "getDocUrlAction",
		parameters : params,
		callback : function(result) {
			if (result.state) {
				var docUrl = result.response;
				if (!docUrl.indexOf(window.location.protocol) < 1) {
					docUrl = justep.Request.BASE_URL4NORESOURCE + docUrl;
				}
				if (docUrl.indexOf("uploadDoc.j") != -1
						&& docUrl.indexOf("#") == -1) {
					docUrl = window.location.protocol + "//"
							+ window.location.host + docUrl;
				}
				_result = justep.Request.addBsessionid(docUrl);
			} else {
				throw new Error("调用失败！|" + result.response.message);
			}
		}
	});
	return _result;
};

justep.doc.PartType = {};
justep.doc.PartType.CONTENT = "content";
justep.doc.PartType.REVISION = "revision";
justep.doc.PartType.COMMENT = "comment";

justep.doc.Utils.queryDocInfo = function(docID) {
	var params = new justep.Request.ActionParam();
	params.setParam("docID", docID);
	var _result;
	justep.Request.sendBizRequest2({
		contentType : "application/json",
		dataType : "application/json",
		process : justep.doc.PROCESS,
		activity : justep.doc.ACTIVITY,
		action : "queryDocInfoAction",
		parameters : params,
		callback : function(result) {
			if (result.state) {
				_result = result.response.object;
			} else {
				throw new Error("调用失败！|" + result.response.message);
			}
		}
	});
	return _result;
};

justep.doc.Utils.changeDocName = function(docID, docName) {
	var params = new justep.Request.ActionParam();
	params.setParam("docID", docID);
	params.setParam("docName", docName);
	justep.Request.sendBizRequest2({
		contentType : "application/json",
		dataType : "application/json",
		process : justep.doc.PROCESS,
		activity : justep.doc.ACTIVITY,
		action : "changeDocNameAction",
		parameters : params
	});
};

/**
 * param.uploaderDiv; param.docPath; param.clickCallBack; param.submitCallBack;
 * param.completeCallBack; param.caller;
 * 
 */
justep.doc.Utils.bindUploader = function(params) {
	params.uploaderDiv = params.uploaderID;
	params.caller = params.caller || this;
	if (params.completeCallBack) {
		var originComplateCB = params.completeCallBack;
		var docPath = params.docPath;
		params.completeCallBack = function(docName, uploader, response) {
			var file = $(response).find("file");
			var kind = $(file).attr("mediatype");
			var fileID = $(file).attr("file-name");
			var size = $(file).attr("fileSize");
			var docID = justep.Utils.randomString();
			originComplateCB.call(this, docID, docName, docPath, fileID, kind,
					size, uploader);
		};
	}
	if (justep.Browser.isInApp && justep.Browser.isIDevice) {
		justep.doc.InnerUtils.getIOSUploader(params);
	} else {
		justep.doc.InnerUtils.getHtml4Uploader(params);
	}
};

justep.doc.Utils.saveDoc = function(docID, docName, docPath, fileID, kind, size) {
	var params = new justep.Request.ActionParam();
	params.setParam("docID", docID);
	params.setParam("docName", docName);
	params.setParam("docPath", docPath);
	params.setParam("fileID", fileID);
	params.setParam("kind", kind);
	params.setParam("size", size);
	justep.Request.sendBizRequest2({
		contentType : "application/json",
		dataType : "application/json",
		process : justep.doc.PROCESS,
		activity : justep.doc.ACTIVITY,
		action : "saveDocAction",
		parameters : params
	});
};

justep.doc.Utils.browseDoc = function(docID, versionID, partType) {
	var row = justep.doc.InnerUtils.queryDoc(docID, undefined, [ "sDocPath",
			"sDocName", "sFileID" ], undefined, undefined, "single");
	var docName = row.sDocName.value;
	var fileID = row.sFileID.value;
	var docPath = row.sDocPath.value;
	justep.doc.InnerUtils.browseDocByFileID(docPath, docName, fileID,
			versionID, partType);
};

justep.doc.Utils.downloadDoc = function(docID, versionID, partType) {
	var row = justep.doc.InnerUtils.queryDoc(docID, undefined, [ "sDocPath",
			"sFileID" ], undefined, undefined, "single");
	var fileID = row.sFileID.value;
	var docPath = row.sDocPath.value;
	justep.doc.InnerUtils.downloadDocByFileID(docPath, fileID, versionID,
			partType);
};

justep.doc.Utils.deleteDoc = function(docID, versionID, isLogicDelete) {
	var params = new justep.Request.ActionParam();
	params.setParam("docID", docID);
	if (typeof versionID == "boolean") {
		params.setParam("isLogicDelete", versionID);
	} else if (typeof versionID == "string") {
		params.setParam("versionID", versionID);
	}
	if (typeof isLogicDelete == "boolean") {
		params.setParam("isLogicDelete", isLogicDelete);
	}
	justep.Request.sendBizRequest2({
		contentType : "application/json",
		dataType : "application/json",
		process : justep.doc.PROCESS,
		activity : justep.doc.ACTIVITY,
		action : "deleteDocByIDAction",
		parameters : params
	});
};

justep.doc.Utils.reverseDoc = function(docID) {
	var params = new justep.Request.ActionParam();
	params.setParam("docID", docID);
	justep.Request.sendBizRequest2({
		contentType : "application/json",
		dataType : "application/json",
		process : justep.doc.PROCESS,
		activity : justep.doc.ACTIVITY,
		action : "reverseDocAction",
		parameters : params
	});
};

justep.doc.Utils.getOfficeViewer = function(id) {
	justep.doc.InnerUtils.checkOcx();
	var ocxID = id + 'innerOfficeViewer';
	$('<div></div>').attr('id', ocxID).css({
		'width' : '100%',
		'height' : '100%'
	}).appendTo($('#' + id));
	var ocxObj = justep.doc.OfficeViewer(ocxID);
	ocxObj.CreateOfficeViewer('100%', '100%');
	return justep.doc.OfficeViewer(ocxID);
};

/**
 * officeViewer 相关
 */
justep.doc.OfficeViewer = (function() {
	// this is window
	if (!this.$OV2)
		this.$OV2 = function(id) {
			var element = document.getElementById(id);
			if (element.OV2_OfficeViewer_extended)
				return element;
			element.OV2_OfficeViewer_extended = true;
			element.resCellRegExp_t = /\.\w*$/;
			element.resCellRegExp_f = /\.[^\.]+$/;
			return OV2.extend(element, OV2.OfficeViewer);
		};
	this.$OV2.OV2_OfficeViewer_extended = [];

	if (!this.OV2)
		this.OV2 = (function() {
			var ProgramID = {
				Word : "Word.Application",
				Excel : "Excel.Application",
				PowerPoint : "PowerPoint.Application",
				Visio : "Visio.Application",
				Project : "MSProject.Application"
			};

			function extend(original, extended) {
				for ( var key in (extended || {})) {
					if (typeof original[key] == "undefined") {
						original[key] = extended[key];
					}
				}
				return original;
			}

			function IsWin() {
				var UserAgent = navigator.userAgent;
				if (UserAgent.indexOf("Windows NT") > -1) {
					return true;
				} else {
					return false;
				}
			}

			function IsIE() {
				if (justep.Browser.IE) {
					return true;
				} else {
					return false;
				}
			}
			function getMultiLine(fn) {
				var lines = fn.apply();
				if (lines.hasOwnProperty("all"))
					return lines.all;
				else {
					if (OV2.IsWin()) {
						if (OV2.IsIE()) {
							return lines.ie;
						} else {
							return lines.webkit;
						}
					} else {
						alert(new justep.Message(justep.Message.JUSTEP232002)
								.getMessage());
					}
				}
			}
			function trim(str) {
				return str.replace(/^\s+|\s+$/g, '');
			}
			function substitute(str, object, regexp) {
				return str.replace(regexp || (/\\?\{([^{}]+)\}/g), function(
						match, name) {
					if (match.charAt(0) == '\\')
						return match.slice(1);
					return OV2.isClear(object[name]) ? '' : object[name];
				});
			}
			function truncate(str, length, truncation) {
				length = length || 30;
				truncation = OV2.isClear(truncation) ? '...' : truncation;
				return str.length > length ? str.slice(0, length
						- truncation.length)
						+ truncation : String(str);
			}
			function tryThese(source) {
				for ( var i = OV2.isFunction(source) ? 0 : 1, l = arguments.length; i < l; i++) {
					try {
						return arguments[i](OV2.isFunction(source) ? undefined
								: source);
					} catch (e) {
					}
				}
				return null;
			}
			function escape(str) {
				var lines = new String(str);
				return lines.replace(/\&/g, "&amp;").replace(/\ /g, "&nbsp;")
						.replace(/\t/g, "&nbsp;&nbsp;&nbsp;&nbsp;").replace(
								/\=/g, "&#61;").replace(/\</g, "&lt;").replace(
								/\>/g, "&gt;").replace(/\r\n/g, "<br/>")
						.replace(/\r/g, "<br/>").replace(/\n/g, "<br/>")
						.replace(/\'/g, "&#39;").replace(/\"/g, "&quot;");
			}
			function getClass(object) {
				return Object.prototype.toString.call(object).match(
						/^\[object\s(.*)\]$/)[1];
			}
			function isArray(object) {
				return OV2.getClass(object) === "Array";
			}
			function isString(object) {
				return OV2.getClass(object) === "String";
			}
			function isNumber(object) {
				return OV2.getClass(object) === "Number";
			}
			function isFunction(object) {
				return typeof object === "function";
			}
			function isObject(object) {
				return typeof object === 'object';
			}
			function isUndefined(object) {
				return typeof object === "undefined";
			}
			function isNull(object) {
				return object == null;
			}
			function isClear(object) {
				return OV2.isUndefined(object) || OV2.isNull(object);
			}
			function isJSON(str) {
				return OV2.isString(str)
						&& Boolean(str.length)
						&& /^[\],:{}\s]*$/
								.test(str
										.replace(
												/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,
												'@')
										.replace(
												/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,
												']').replace(
												/(?:^|:|,)(?:\s*\[)+/g, ''))
						&& !/^[\d\s\+\-\*\/]*$/.test(str);
			}

			var OfficeViewer = (function() {
				/**
				 * 断言函数
				 * 
				 * @expr 断言表达式
				 * @msg 错误信息
				 * @return 返回断言表达式的值
				 */
				function Assert(expr, msg) {
					if (expr === false)
						alert(new justep.Message(justep.Message.JUSTEP232003,
								msg).getMessage());
					return expr;
				}
				/**
				 * 获取OfficeViewer的classid
				 * 
				 * @retrun 返回OfficeViewer的classid
				 */
				function OfficeViewerClassID() {
					return "clsid:"
							+ (this.useNTKO ? NTKO.config.clsid : "7677E74E-5831-4C9E-A2DD-9B1EF9DF2DB4");
				}

				function OfficeViewerClsID() {
					return "{" + (this.useNTKO ? NTKO.config.clsid: "7677E74E-5831-4C9E-A2DD-9B1EF9DF2DB4")+ "}";
				}
				/**
				 * 判断是否是OfficeViewer
				 * 
				 * @retrun 返回是否是OfficeViewer
				 */
				function IsOfficeViewer() {
					return this.classid == this.OfficeViewerClassID()
							|| this.getAttribute('clsid') == this.OfficeViewerClsID();
				}

				function getOcxVersion() {
					return this.useNTKO ? justep.doc._ntko_version : OV2
							.isClear(justep.doc._ocx_version2) ? 0
							: justep.doc._ocx_version2;
				}

				/**
				 * 创建OfficeViewer
				 * 
				 * @width 宽度，默认650
				 * @height 高度，默认450
				 * @return 返回是否执行了创建操作
				 */
				function CreateOfficeViewer(width, height) {
					var fnOffice2 = function() {
						return {
							ie : '<object id="{id}" classid="{classid}" width="{width}" height="{height}" codebase="/UI/system/service/doc/office/office2.cab#version=${version}">'
									+ '<param name="BorderColor" value="-2147483632"/>'
									+ '<param name="BackColor" value="-2147483643"/>'
									+ '<param name="ForeColor" value="-2147483640"/>'
									+ '<param name="TitlebarColor" value="-2147483635"/>'
									+ '<param name="TitlebarTextColor" value="-2147483634"/>'
									+ '<param name="BorderStyle" value="0"/>'
									+ '<param name="Titlebar" value="0"/>'
									+ '<param name="Toolbars" value="{toolbar}"/>'
									+ '<param name="Menubar" value="0"/>'
									+ '<param name="ActivationPolicy" value="1"/>'
									+ '<param name="FrameHookPolicy" value="0"/>'
									+ '<param name="MenuAccelerators" value="1"/>'
									+ '</object>',
							webkit : '<object id="{id}" clsid="{clsid}" width="{width}" height="{height}" codebase="/UI/system/service/doc/office/office2.cab#version=${version}"'
									+ ' type="application/justep-activex"'
									+ ' param_BorderColor="-2147483632"'
									+ ' param_BackColor="-2147483643"'
									+ ' param_BorderColor="-2147483643"'
									+ ' param_ForeColor="-2147483632"'
									+ ' param_TitlebarColor="-2147483632"'
									+ ' param_TitlebarTextColor="-2147483632"'
									+ ' param_Titlebar="1"'
									+ ' param_Toolbars="{toolbar}"'
									+ ' param_BorderStyle="1"'
									+ ' param_BorderColor="-2147483632"'
									+ ' param_LicenseName="3AYYK3L-B3V5RU"'
									+ ' param_LicenseCode="EDO8-550D-124A-ABEB"'
									+ ' param_Menubar="1"'
									+ ' param_ActivationPolicy="1"'
									+ ' param_FrameHookPolicy="1"'
									+ ' param_MenuAccelerators="1">'
									+ ' </object>'
						};
					};
					if (!this.IsOfficeViewer()) {
						this.removeAttribute('OV2_OfficeViewer_extended');
						var s = this.outerHTML;
						if (!this.useNTKO) {
							if (OV2.IsIE()) {
								this.outerHTML = OV2
										.substitute(
												OV2.getMultiLine(fnOffice2),
												{
													id : this.id,
													classid : this
															.OfficeViewerClassID(),
													width : OV2.isClear(width) ? 650
															: width,
													height : OV2
															.isClear(height) ? 450
															: height,
													version : OV2
															.isClear(justep.doc._ocx_version2) ? 0
															: justep.doc._ocx_version2,
													toolbar : $('#' + this.id)
															.attr('showToolbar') == 'false' ? 0
															: 1
												});
							} else {
								this.outerHTML = OV2
										.substitute(
												OV2.getMultiLine(fnOffice2),
												{
													id : this.id,
													clsid : "{"
															+ this
																	.OfficeViewerClsID()
															+ "}",
													width : OV2.isClear(width) ? 650
															: width,
													height : OV2
															.isClear(height) ? 450
															: height,
													version : OV2
															.isClear(justep.doc._ocx_version2) ? 0
															: justep.doc._ocx_version2,
													toolbar : $('#' + this.id)
															.attr('showToolbar') == 'false' ? 0
															: 1
												});
							}
						}
						var OVObj = $OV2(this.id);
						OVObj.$outerHTML = s;
						OVObj.useNTKO = this.useNTKO;
						if (justep.Browser.IE) {
							// 修复ie下对object的100%属性感知缺陷,刺激重绘一次
							$('html')
									.css('overflow', $('html').css('overflow'));
						}

						if (this.useNTKO) {

						} else {
							OVObj.LicenseName = "3AYYK3L-B3V5RU";
							OVObj.LicenseCode = "EDO8-550D-124A-ABEB";
							if (justep.Browser.IE) {
								OVObj.WordDisableDragAndDrop(true);
								OVObj.DisableFileCommand(1, true);// wdUIDisalbeOfficeButton
								OVObj.DisableFileCommand(2, true);// wdUIDisalbeNew
								OVObj.DisableFileCommand(4, true);// wdUIDisalbeOpen
								OVObj.DisableFileCommand(16, true);// wdUIDisalbeSave
								OVObj.DisableFileCommand(32, true);// wdUIDisalbeSaveAs
								OVObj.DisableFileCommand(64, true);// wdUIDisalbeSaveAsAttachment
								OVObj.DisableFileCommand(256, true);// wdUIDisalbeClose
								OVObj.DisableFileCommand(4096, true); // wdUIDisalbeSaveAsMenu
								// this.ShowRibbonTitlebar(false); 这个函数和
								// f11全屏有冲突
								OVObj.ShowMenubar(false);
								OVObj.DisableStandardCommand(1, true); // cmdTypeSave
								// =
								// 0x00000001,
								OVObj.DisableStandardCommand(2, true); // cmdTypeClose
								// =
								// 0x00000002,
							}
						}
						return true;
					} else {
						return false;
					}
				}

				function DisablePrint(disable) {
					if (this.useNTKO) {

					} else {
						if (justep.Browser.IE) {
							this.DisableFileCommand(512, disable); // wdUIDisalbePrint
							// (Ctrl+P)
							this.DisableFileCommand(1024, disable); // wdUIDisalbePrintQuick
							this.DisableFileCommand(2048, disable); // wdUIDisalbePrintPreview
							this.DisableStandardCommand(4, disable); // cmdTypePrint
							// =
							// 0x00000004
							try {
								this.WordDisablePrintHotKey(disable);
							} catch (e) {
							}
							;
						}
					}
				}

				function GetProgIDByDocType(docType) {
					var progID = OV2.ProgramID.Word;
					if (typeof docType == "string") {
						if (docType.indexOf('doc') != -1) {
							progID = OV2.ProgramID.Word;
						} else if (docType.indexOf('xls') != -1) {
							progID = OV2.ProgramID.Excel;
						} else if (docType.indexOf('ppt') != -1) {
							progID = OV2.ProgramID.PowerPoint;
						} else if (docType.indexOf('vsd') != -1) {
							progID = OV2.ProgramID.Visio;
						} else if (docType.indexOf('mpp') != -1) {
							progID = OV2.ProgramID.Project;
						}
					} else if (typeof docType == "number") {
						if (docType == 1) {
							progID = OV2.ProgramID.Word;
						} else if (docType == 2) {
							progID = OV2.ProgramID.Excel;
						} else if (docType == 3) {
							progID = OV2.ProgramID.PowerPoint;
						} else if (docType == 4) {
							progID = OV2.ProgramID.Visio;
						} else if (docType == 5) {
							progID = OV2.ProgramID.Project;
						} else if (docType == 6) {
							progID = "WPS.Document";
						} else if (docType == 7) {
							progID = "ET.WorkBook";
						}
					}
					return progID;
				}
				;

				function GetHttpResult(url) {
					var result;
					$.ajax({
						async : false,
						type : "POST",
						url : url,
						dataType : "json",
						success : function(msg) {
							result = msg;
						},
						error : function(XmlHttpRequest, textStatus,
								errorThrown) {
							throw justep.Error.create(new justep.Message(
									justep.Message.JUSTEP232016,
									XmlHttpRequest.responseText).getMessage());
						}
					});
					if (result && result.size == 0) {
						throw justep.Error.create(new justep.Message(
								justep.Message.JUSTEP232017).getMessage());
					}
					return result;
				}

				function GetOpenedFileExt() {
					return "." + this.GetDocumentName().split('.')[1];
				}
				function DisableSaveHotKey(disable) {
					try {
						this.WordDisableSaveHotKey(disable);
					} catch (e) {
					}

				}
				function DisableCopyHotKey(disable) {
					try {
						this.WordDisableCopyHotKey(disable);
					} catch (e) {
					}

				}

				function DisablePrintHotKey(disable) {
					this.WordDisablePrintHotKey(disable);
				}
				function DisableHotKey(disable) {
					try {
						this.WordDisableSaveHotKey(disable);
						this.WordDisablePrintHotKey(disable);
						this.WordDisableCopyHotKey(disable);
					} catch (e) {
					}
				}

				/**
				 * 检查source是否为OfficeViewer
				 * 
				 * @return 返回是否为OfficeViewer的布尔值
				 */
				function CheckViewer() {
					return this.Assert(this.IsOfficeViewer(), OV2.substitute(
							"The {nodeName}[{id}] is not OfficeViewer.", {
								nodeName : this.nodeName,
								id : this.id
							}));
				}

				/**
				 * 检查操作系统是否安装了MSOffice中某个应用程序
				 * 
				 * @programID 应用程序标识，参考ProgramID
				 * @return 返回是否安装了MSOffice中某个应用程序的布尔值
				 */
				function CheckInstalled(programID) {
					return this.CheckViewer()
							&& this
									.Assert(
											this.IsOfficeInstalled(programID),
											OV2
													.substitute(
															"The computer hasn't installed Microsoft {pid}.",
															{
																pid : programID
																		.replace(
																				/MS|\.\w*/,
																				"")
															}));
				}
				/**
				 * 创建MSOffice中某个应用程序的文档
				 * 
				 * @programID 应用程序标识，参考ProgramID
				 * @return 返回是否安装了该程序
				 */
				function CreateDoc(programID) {
					if (this.CheckViewer() && this.CheckInstalled(programID)) {
						this.CreateNew(programID);
						this.SetAppFocus();
						return true;
					} else {
						return false;
					}
				}
				/**
				 * 创建MSWord
				 * 
				 * @return 返回是否安装了MSWord
				 */
				function CreateWord() {
					return this.CreateDoc(OV2.ProgramID.Word);
				}
				/**
				 * 创建MSExcel
				 * 
				 * @return 返回是否安装了MSExcel
				 */
				function CreateExcel() {
					return this.CreateDoc(OV2.ProgramID.Excel);
				}
				/**
				 * 创建MSPowerPoint
				 * 
				 * @return 返回是否安装了MSPowerPoint
				 */
				function CreatePowerPoint() {
					return this.CreateDoc(OV2.ProgramID.PowerPoint);
				}
				/**
				 * 创建MSVisio
				 * 
				 * @return 返回是否安装了MSVisio
				 */
				function CreateVisio() {
					return this.CreateDoc(OV2.ProgramID.Visio);
				}
				/**
				 * 创建MSProject
				 * 
				 * @return 返回是否安装了MSProject
				 */
				function CreateProject() {
					return this.CreateDoc(OV2.ProgramID.Project);
				}

				/**
				 * 判断是否打开了MSOffice中某个应用程序的文档
				 * 
				 * @programID 应用程序标识，参考ProgramID
				 * @return 返回是否打开了该文档
				 */
				function IsDocOpened(programID) {
					if (!this.CheckViewer()) {
						return false;
					} else if (OV2.isClear(programID)) {
						return this.IsOpened;
					} else if (OV2.isString(programID)) {
						if (this.useNTKO) {
							return this.GetProgIDByDocType(this.docType) == programID;
						} else {
							return this.GetCurrentProgID() == programID;
						}

					} else {
						return false;
					}
				}
				/**
				 * 判断是否打开了MSWord
				 * 
				 * @return 返回是否打开了MSWord
				 */
				function IsWordOpened() {
					return this.IsDocOpened(OV2.ProgramID.Word);
				}
				/**
				 * 判断是否打开了MSExcel
				 * 
				 * @return 返回是否打开了MSExcel
				 */
				function IsExcelOpened() {
					return this.IsDocOpened(OV2.ProgramID.Excel);
				}
				/**
				 * 判断是否打开了MSPowerPoint
				 * 
				 * @return 返回是否打开了MSPowerPoint
				 */
				function IsPowerPointOpened() {
					return this.IsDocOpened(OV2.ProgramID.PowerPoint);
				}
				/**
				 * 判断是否打开了MSVisio
				 * 
				 * @return 返回是否打开了MSVisio
				 */
				function IsVisioOpened() {
					return this.IsDocOpened(OV2.ProgramID.Visio);
				}
				/**
				 * 判断是否打开了MSProject
				 * 
				 * @return 返回是否打开了MSProject
				 */
				function IsProjectOpened() {
					return this.IsDocOpened(OV2.ProgramID.Project);
				}

				/**
				 * 书签相关用法 function readbookmarkExample() { var officeObj =
				 * $OV2('ov'); var count = officeObj.GetWordBookmarkCount();
				 * for(var i=1; i <= count; i++) { var name =
				 * officeObj.GetWordBookmarkInfo(i, true);
				 * officeObj.WriteWordBookmarkInfo(name,"test"); } }
				 */
				function GetWordBookmarkCount() {
					return this.WordGetBookmarkCount();
				}
				function ReadWordBookmarkInfo(pos) {
					return this.WordReadBookmarkInfo(pos, true);
				}

				function WriteWordBookmarkInfo(name, value) {
					var selection = this.GetApplication().Selection;
					var endName = name + "End";
					var isAppend = true;
					// 查找结束书签
					var count = this.WordGetBookmarkCount();
					for ( var i = 1; i <= count; i++) {
						var bmName = this.WordReadBookmarkInfo(i, true);
						if (bmName == endName) {
							isAppend = false;
							break;
						}
					}
					if (isAppend) {
						return this.WordWriteBookmarkInfo(name, value);
					} else {
						// 这次在上次内容插入前缀
						this.WordWriteBookmarkInfo(name, '--BMPrefix2DB');
						// 定位到书签内容结束
						this.WordWriteBookmarkInfo(endName, '');
						// 移动到上次插入内容的最后2位
						selection.MoveLeft(1, 1);
						this.WordInsertText("BMSuffix2DB--", 1);
						// 切换到上一页
						selection.GoTo(1, 3, 1);
						return selection.Find.Execute(
								'--BMPrefix2D*BMSuffix2DB--', false, false,
								true, false, false, 1, false, false, value, 2,
								false, false, false, false);
					}
				}

				/**
				 * 初始化MSWord的痕迹保留，主要用于保留MSWord修订历史，具体操作如下： 接受当前文件的所有修订内容 不显示修订痕迹
				 * 启动痕迹保留
				 * 
				 * @acceptAllRevisions 是否接受所有修订
				 * @userName 用户名，为undefined则保留原来的用户名
				 * @userInitials 简称，为undefined则保留原来的简称
				 * @return 返回是否打开了MSWord
				 */
				function WordRevisionInit(acceptAllRevisions, userName,
						userInitials) {
					if (this.CheckViewer() && this.IsWordOpened()) {
						var document = typeof this.ActiveDocument == "function" ? this
								.ActiveDocument()
								: this.ActiveDocument;
						if (acceptAllRevisions) {
							document.AcceptAllRevisions();
						}
						document.ShowRevisions = false;
						document.TrackRevisions = true;
						if (!OV2.isClear(userName)) {
							this.GetApplication().UserName = userName;
						}
						if (!OV2.isClear(userInitials)) {
							this.GetApplication().UserInitials = userInitials;
						}
						return true;
					} else {
						return false;
					}
				}
				/**
				 * 复位MSWord的痕迹保留状态，主要用于查看MSWord修订历史，具体操作如下： 关闭痕迹保留 显示修订痕迹
				 * 
				 * @return 返回是否打开了MSWord
				 */
				function WordRevisionNone() {
					if (this.CheckViewer() && this.IsWordOpened()) {
						var document = typeof this.ActiveDocument == "function" ? this
								.ActiveDocument()
								: this.ActiveDocument;
						document.TrackRevisions = false;
						document.ShowRevisions = true;
						return true;
					} else {
						return false;
					}
				}
				/**
				 * 获取MSWord痕迹保留的JSON格式修订记录
				 * 
				 * @return 返回JSON格式修订记录，undefined表示获取失败
				 */
				function WordGetRevisionJSON() {
					if (this.CheckViewer() && this.IsWordOpened()) {
						var result = OV2
								.tryThese(
										this,
										function(source) {
											var r = [], document = source.ActiveDocument
													|| source.ActiveDocument();
											for ( var i = 1; i <= document.Revisions.Count; i++) {
												var revision = document.Revisions
														.Item(i);
												r[i - 1] = {
													Author : revision.Author,
													Date : new Date(
															revision.Date),
													Index : revision.Index,
													Text : revision.Range.Text,
													Type : revision.Type
												};
											}
											return r;
										}, function(source) {
											return [];
										});
						return OV2.JSON.stringify(result);
					}
				}
				/**
				 * 获取MSWord痕迹保留的修订记录
				 * 
				 * @json JSON格式修订记录，如果为undefined则获取当前打开MSWORD文档的修订记录
				 * @template 用于格式化修订内容的模板，为undefined则使用默认模板，模板参数： #{Index} 索引序号
				 *           #{Author} 修订此内容的作者 #{Type}
				 *           修订类型，参考WordRevisionTypeToStr方法 #{Date} 修订时间 #{Text}
				 *           简化修订内容，默认只有30字符并且不包含多余空行和换行符等 #{FullText} 完整修订内容
				 *           #{HTMLText} HTML修订内容
				 * @textLength 简化修订内容的长度，默认30字符
				 * @truncation 简化修订内容的后缀，默认为...
				 * @return 返回修订记录，undefined表示获取失败
				 */
				function WordGetRevisionInfo(json, template, textLength,
						truncation) {
					var revisions = OV2.tryThese(this,
							function(source) {
								return OV2.isClear(json) ? OV2.JSON
										.parse(source.WordGetRevisionJSON())
										: (OV2.isString(json) && OV2
												.isJSON(json)) ? OV2.JSON
												.parse(json) : json;
							}, function(source) {
								return json;
							});
					if (OV2.isArray(revisions)) {
						template = OV2.isClear(template) ? '<revisioninfo index="{Index}" author="{Author}" type="{Type}" date="{Date}">{Text}</revisioninfo>\r\n'
								: template;
						var result = "";
						for ( var i = 0, length = revisions.length; i < length; i++) {
							var revision = revisions[i];
							result += OV2.substitute(template, {
								Author : revision.Author,
								Date : OV2.trim(revision.Date.replace(
										/\"|[T|Z]/g, ' ')),
								Index : revision.Index,
								Text : OV2.truncate(revision.Text.replace(
										/\s+/g, ' '), textLength, truncation),
								FullText : revision.Text,
								HTMLText : OV2.escape(revision.Text),
								Type : this
										.WordRevisionTypeToStr(revision.Type)
							});
						}
						return result;
					} else {
						return revisions;
					}
				}
				/**
				 * 转换痕迹保留的修订类型
				 * 
				 * @type 修订类型，整数0~18，参考WdRevisionType
				 * @return 返回修订类型的文字描述，undefined表示转换失败
				 */
				function WordRevisionTypeToStr(type) {
					return [ 'None', 'Insert', 'Delete', 'Property',
							'ParagraphNumber', 'DisplayField', 'Reconcile',
							'Conflict', 'Style', 'Replace',
							'ParagraphProperty', 'TableProperty',
							'SectionProperty', 'StyleDefinition', 'MovedFrom',
							'MovedTo', 'CellInsertion', 'CellDeletion',
							'CellMerge' ][type];
				}

				function DisableOfficeReviewingBar(isShow) {
					if (this.CheckViewer() && this.IsWordOpened()) {
						var document = typeof this.ActiveDocument == "function" ? this
								.ActiveDocument()
								: this.ActiveDocument;
						// 显示或隐藏批注框
						document.ActiveWindow.View.ShowComments = isShow;
						// 显示或隐藏插入和删除标记批注框
						document.ActiveWindow.View.ShowInsertionsAndDeletions = isShow;
						// 显示或隐藏墨迹注释
						document.ActiveWindow.View.ShowInkAnnotations = isShow;
						// 正在格式化
						document.ActiveWindow.View.ShowFormatChanges = isShow;
					} else {
						return false;
					}
				}

				return {
					Assert : Assert,
					OfficeViewerClassID : OfficeViewerClassID,
					OfficeViewerClsID : OfficeViewerClsID,
					IsOfficeViewer : IsOfficeViewer,
					CreateOfficeViewer : CreateOfficeViewer,
					GetHttpResult : GetHttpResult,
					GetProgIDByDocType : GetProgIDByDocType,
					GetOpenedFileExt : GetOpenedFileExt,
					DisableHotKey : DisableHotKey,
					DisableSaveHotKey : DisableSaveHotKey,
					DisableCopyHotKey : DisableCopyHotKey,
					DisablePrintHotKey : DisablePrintHotKey,
					DisablePrint : DisablePrint,
					CheckViewer : CheckViewer,
					CheckInstalled : CheckInstalled,
					CreateDoc : CreateDoc,
					CreateWord : CreateWord,
					CreateExcel : CreateExcel,
					CreatePowerPoint : CreatePowerPoint,
					CreateVisio : CreateVisio,
					CreateProject : CreateProject,
					IsDocOpened : IsDocOpened,
					IsWordOpened : IsWordOpened,
					IsExcelOpened : IsExcelOpened,
					IsPowerPointOpened : IsPowerPointOpened,
					IsVisioOpened : IsVisioOpened,
					IsProjectOpened : IsProjectOpened,
					GetWordBookmarkCount : GetWordBookmarkCount,
					ReadWordBookmarkInfo : ReadWordBookmarkInfo,
					WriteWordBookmarkInfo : WriteWordBookmarkInfo,
					WordRevisionInit : WordRevisionInit,
					WordRevisionNone : WordRevisionNone,
					WordGetRevisionJSON : WordGetRevisionJSON,
					WordGetRevisionInfo : WordGetRevisionInfo,
					WordRevisionTypeToStr : WordRevisionTypeToStr,
					DisableOfficeReviewingBar : DisableOfficeReviewingBar,
					getOcxVersion : getOcxVersion
				};
			})();
			/**
			 * 历史修订模板 OV2.RevisionTemplate.defaultHTMLContent 默认的HTML格式修订存储模板
			 */
			var RevisionTemplate = (function() {
				var defaultHTMLContent = (function() {
					var fn = function() {
						return {
							all : "<div class='revision_item'><div class='revision_title'><div class='revision_left'>{Index}.{Type}</div><div class='revision_center'>{Author}</div>"
									+ "<div class='revision_right'>{Date}</div></div><div class='revision_content'>{Text}</div><div class='revision_content_full'>{HTMLText}</div></div>"
						};
					};
					return getMultiLine(fn);
				})();
				return {
					defaultHTMLContent : defaultHTMLContent
				};
			})();

			return {
				JSON : this.JSON || {},
				Base64 : this.Base64 || {},
				ProgramID : ProgramID,
				extend : extend,
				IsIE : IsIE,
				IsWin : IsWin,
				getMultiLine : getMultiLine,
				trim : trim,
				substitute : substitute,
				truncate : truncate,
				tryThese : tryThese,
				escape : escape,
				getClass : getClass,
				isArray : isArray,
				isString : isString,
				isNumber : isNumber,
				isFunction : isFunction,
				isObject : isObject,
				isUndefined : isUndefined,
				isNull : isNull,
				isClear : isClear,
				isJSON : isJSON,
				OfficeViewer : OfficeViewer,
				RevisionTemplate : RevisionTemplate
			};
		})();
	return $OV2;
})();

justep.doc.Dialog = {
	docInfoDialog : null,
	openDocInfoDialog : function(data, afterEnsureFun, caller) {
		if (!this.docInfoDialog) {
			this.docInfoDialog = new justep.WindowDialog("docInfoDialog",
					"/system/service/doc/dialog/docInfoDialog.w", "文件属性", true,
					null, 544, 545, 0, 0, true);
			this.docInfoDialog.attachEvent("onSend", function(event) {
				return this.data;
			}, this.docInfoDialog);
			this.docInfoDialog.attachEvent("onReceive", function(event) {
				afterEnsureFun.call(caller, event);
			}, this.docInfoDialog);
		}
		this.docInfoDialog.data = data;
		this.docInfoDialog.open();
	},
	dirInfoDialog : null,
	openDocDirInfoDialog : function(data, afterEnsureFun, caller) {
		if (!this.dirInfoDialog) {
			this.dirInfoDialog = new justep.WindowDialog("docInfoDialog",
					"/system/service/doc/dialog/dirInfoDialog.w", "文件夹属性",
					true, null, 440, 525, 0, 0, true);
			this.dirInfoDialog.attachEvent("onSend", function(event) {
				return this.data;
			}, this.dirInfoDialog);
			this.dirInfoDialog.attachEvent("onReceive", function(event) {
				afterEnsureFun.call(caller, event);
			}, this.dirInfoDialog);
		}
		this.dirInfoDialog.data = data;
		this.dirInfoDialog.open();
	},
	historyDialog : null,
	openDocHistoryDialog : function(docID, fileID, docPath, access, isPrint) {
		if (!this.historyDialog) {
			this.historyDialog = new justep.WindowDialog("historyDialog",
					"/system/service/doc/dialog/docHistoryDialog.w", "历史版本",
					true, true, 652, 485, 0, 0, true);
			this.historyDialog.attachEvent("onSend", function(event) {
				return this.data;
			}, this.historyDialog);
		}
		this.historyDialog.data = {
			docID : docID,
			fileID : fileID,
			docPath : docPath,
			access : access,
			isPrint : isPrint
		};
		this.historyDialog.open();
	},
	downloadHistoryDialog : null,
	openDocDownloadHistoryDialog : function(docID) {
		if (!this.downloadHistoryDialog) {
			this.downloadHistoryDialog = new justep.WindowDialog(
					"docDownloadHistoryDialog",
					"/system/service/doc/dialog/docDownloadHistoryDialog.w",
					"下载记录", true, true, 644, 445, 0, 0, true);
			this.downloadHistoryDialog.attachEvent("onSend", function(event) {
				return this.data;
			}, this.downloadHistoryDialog);
		}
		this.downloadHistoryDialog.data = {
			docID : docID
		};
		this.downloadHistoryDialog.open();
	},
	templateDialog : null,
	openDocTemplateDialog : function(data, afterSelectFun, caller) {
		if (!this.templateDialog) {
			this.templateDialog = new justep.WindowDialog("templateDialog",
					"/system/service/doc/dialog/docTemplateDialog.w", "选择模板",
					true, null, 500, 400, 0, 0, false);
		}
		if (this.templateDialog.onSendId)
			this.templateDialog.detachEvent(this.templateDialog.onSendId);
		if (this.templateDialog.onReciveId)
			this.templateDialog.detachEvent(this.templateDialog.onReciveId);
		this.templateDialog.onSendId = this.templateDialog.attachEvent(
				"onSend", function(event) {
					return this.data;
				}, this.templateDialog);
		this.templateDialog.onReciveId = this.templateDialog.attachEvent(
				"onReceive", function(event) {
					afterSelectFun.call(caller, event);
				}, this.templateDialog);
		this.templateDialog.data = data;
		this.templateDialog.open();
	},
	officeFieldDialog : null,
	openOfficeFieldDialog : function(data, afterSelectFun, caller) {
		if (!this.officeFieldDialog) {
			this.officeFieldDialog = new justep.WindowDialog(
					"officeFieldDialog",
					"/system/service/doc/office/officeViewerFieldDialog.w",
					"文档域编辑", true, null, 550, 350, 0, 0, true);
			this.officeFieldDialog.attachEvent("onSend", function(event) {
				return this.data;
			}, this.officeFieldDialog);
			this.officeFieldDialog.attachEvent("onReceive", function(event) {
				afterSelectFun.call(caller, event);
			}, this.officeFieldDialog);
		}
		this.officeFieldDialog.data = data;
		this.officeFieldDialog.open();
	},
	getOfficeEditorUrl : function(customUrl) {
		var url = justep.Request
				.addBsessionid(window.location.protocol
						+ "//"
						+ window.location.host
						+ justep.Request
								.convertURL((customUrl || "/UI/system/service/doc/office/officeEditorDialog.w")
										+ "?process=/SA/doc/system/systemProcess&activity=mainActivity"));
		return url;
	},

	openOfficeDialog : function(callback, OVP, caller) {
		var self = caller;
		if (!self.officeEditor) {
			var option = {
				url : justep.doc.Dialog
						.getOfficeEditorUrl(caller ? caller.officeEditorUrl
								: ""),
				modal : "true",
				resizable : "true",
				status : "fullscreen"
			};
			self.officeEditor = new justep.WindowOpener(option);
		}
		if (self.officeEditor) {
			try {
				if (self.officeEditor.eventID) {
					self.officeEditor.detachEvent(self.officeEditor.eventID);
				}
			} catch (e) {
			}
			;
			var eventID = self.officeEditor.attachEvent("onReceive", callback,
					self);
			self.officeEditor.eventID = eventID;
			self.officeEditor.open({
				data : JSON.stringify(OVP)
			});
		}
	}
};

justep.doc.InnerUtils = {
	/*
	 * 附件权限枚举值 列表(list) : l ; 读取(read) : r ; 下载(download) : d ; 下载上传 (download
	 * upload) : du ; 下载上传修改(download upload update) : duu ; 下载上传修改删除(download
	 * upload update delete) : duud
	 */
	accessEnum : {
		l : 1,
		r : 3,
		d : 7,
		du : 263,
		duu : 775,
		duud : 1799
	},

	isHttps : function() {
		return window.location.protocol == "https:";
	},

	getdocServerAction : function(docPath, urlPattern, isFormAction) {
		if (!isFormAction)
			isFormAction = false;
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setBoolean("isHttps", this.isHttps());
		sendParam.setString('docPath', docPath);
		sendParam.setString('urlPattern', urlPattern);
		sendParam.setBoolean('isFormAction', isFormAction);

		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";

		options.dataType = "json";
		options.parameters = sendParam;
		var isDocCenter = false;
		var process = justep.Context.getCurrentProcess();
		var activity = justep.Context.getCurrentActivity();
		if ("/SA/doc/docCenter/docCenterProcess" == process
				&& "mainActivity" == activity) {
			isDocCenter = true;
		}
		if (isDocCenter) {
			options.action = "queryHostAction";
		} else {
			options.action = "queryNoPermissionHostAction";
		}
		options.directExecute = true;
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var res = "#";
		try {
			res = justep.Request.sendBizRequest2(options);
		} catch (e) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232109).getMessage());
		}

		if (!justep.Request.isBizSuccess(res, 'json')) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232110).getMessage());
		}
		var __XHR = res;
		// __checkMD5CodeByJSON__
		var docUrl = justep.Request.responseParseJSON(res).data.value;
		if (docUrl == '#') {
			alert('您没有相应操作的权限');
		}
		if (!docUrl.indexOf(window.location.protocol) < 1 && docUrl != '#') {
			docUrl = justep.Request.BASE_URL4NORESOURCE + docUrl;
		}
		var docUrlUI = docUrl + "&" + this.getBSessionIDParam();
		if (docUrlUI.indexOf("$UI") != -1) {
			docUrlUI = docUrlUI.replace("$UI", "/UI");
		}
		return docUrlUI;
	},

	getBSessionIDParam : function() {
		return "bsessionid=" + justep.Request.URLParams["bsessionid"];
	},

	getCookie : function(cookieName) {
		var data = this.getShareData();
		if (!data)
			return "";
		return data["__docShareData__" + cookieName];
	},

	getShareData : function() {
		var currentWindow = window;
		var parentWindow = currentWindow.parent;
		while (parentWindow && currentWindow != parentWindow) {
			currentWindow = parentWindow;
			parentWindow = window.parent;
		}
		if (!parentWindow)
			return this.__docShareData;
		if (parentWindow.__docShareData)
			return parentWindow.__docShareData;
		parentWindow.__docShareData = {};
		return parentWindow.__docShareData;
	},

	setCookie : function(cookieName, value) {
		var data = this.getShareData();
		if (!data)
			return;

		data["__docShareData__" + cookieName] = value;
	},

	getAuthList : function(person, personId) {
		if (typeof person == "undefined") {
			person = justep.Context.getCurrentPersonMemberFID();
		}
		if (typeof personId == "undefined") {
			personId = justep.Context.getCurrentPersonCode();
		}
		var deptPath = justep.Context.getCurrentPersonMemberFID();
		var personId = justep.Context.getCurrentPersonCode();

		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('deptPath', deptPath);
		sendParam.setString('personId', personId);
		// __checkMD5Code2__
		response = justep.Request
				.sendBizRequest(
						"/SA/doc/system/systemProcess",
						"mainActivity",
						"queryPermissionAction",
						sendParam,
						null,
						null,
						true,
						null,
						('undefined' != typeof (__executeContext__)) ? __executeContext__
								: null);
		if (justep.Request.isBizSuccess(response)) {
			var __XHR = response;
			// __checkMD5CodeByXML__
			return response;
		} else {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232111).getMessage());
		}
	},

	queryNameSpaces : function() {
		var options = {};
		var param = this.createParam("queryNameSpace", [], []);
		var sendParam = new justep.Request.ActionParam();
		sendParam.setXml('param', new justep.Request.XMLParam(param));

		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";

		options.dataType = "json";
		options.parameters = sendParam;
		options.action = "dispatchOptAction";
		options.directExecute = true;
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var resQN = justep.Request.sendBizRequest2(options);
		if (!justep.Request.isBizSuccess(resQN, 'json')) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232112).getMessage());
		}
		var __XHR = resQN;
		// __checkMD5CodeByJSON__
		var nameSpaces = justep.Request.responseParseJSON(resQN).data.value.rows;
		var oNameSpaces = {};
		for ( var i = 0; i < nameSpaces.length; i++) {
			var nameSpace = nameSpaces[i];
			var rootID = nameSpace.SA_DocNode.value;
			var url = nameSpace.sUrl.value;
			oNameSpaces[rootID] = {
				url : url
			};
		}
		this.setCookie("docNameSpaces", JSON.stringify(oNameSpaces));
		return oNameSpaces;
	},

	getDocServerByDocPath : function(fullPath) {
		if (!fullPath) {
			alert(new justep.Message(justep.Message.JUSTEP232104).getMessage());
			return;
		}
		fullPath = fullPath.substring(1);
		var rootID = fullPath.indexOf("/") == -1 ? fullPath : fullPath
				.substring(0, fullPath.indexOf("/"));
		var sNameSpaces = this.getCookie("docNameSpaces");
		if (sNameSpaces) {
			var oNameSpaces = JSON.parse(sNameSpaces);
		} else {
			var oNameSpaces = this.queryNameSpaces();
		}
		return oNameSpaces[rootID];
	},

	queryDefine : function(process, activity, keyId, linkDefineOnly) {
		var linkAll;
		if (this.attmentLinkDefines) {
			linkAll = this.attmentLinkDefines;
		} else {
			var options = {};
			var param = new justep.Request.ActionParam();
			param.setString('linkProcess', process);
			param.setString('linkActivity', activity);
			options.process = "/SA/doc/system/systemProcess";
			options.activity = "mainActivity";

			options.dataType = "json";
			options.parameters = param;
			options.action = "queryLinkDefineMap";
			options.directExecute = true;
			options.callback = function(data) {
			};
			// __checkMD5Code2__
			options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
					: null;
			var response = justep.Request.sendBizRequest2(options);
			if (!justep.Request.isBizSuccess(response, 'json')) {
				throw justep.Error.create(new justep.Message(
						justep.Message.JUSTEP232113).getMessage());
			}
			linkAll = justep.Request.responseParseJSON(response).data.value;
			this.attmentLinkDefines = linkAll;
		}

		var define = linkAll;

		if (keyId && !!linkAll.keys[keyId]) {
			define = linkAll.keys[keyId];
			// define.hostInfo = linkAll.hostInfo;
		}

		return define;
	},
	/**
	 * @description: 查询当前应显示的目录
	 * @param: billID - 业务ID
	 * @param: process - 过程名
	 * @param: activity - 活动名
	 * @param: rootPath - 文档关联定义根目录
	 * @param: subPath - 文档关联定义子目录
	 * @return: loader - 结构是tree的目录信息
	 */

	queryLinkedDir : function(billID, process, activity, rootPath, subPath) {
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString("rootPath", rootPath);
		sendParam.setString("subPath", subPath);
		sendParam.setString("billID", billID);
		sendParam.setString("process", process);
		sendParam.setString("activity", activity);
		sendParam.setBoolean("isTree", true);

		var tp = new justep.Request.TranslateParam();
		tp.dataType = justep.Request.TranslateParam.DATATYPE_ROW_TREE;
		tp.setTreeOption("tree-parent-relation", "sParentID");

		options.translateParam = tp;

		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";

		options.dataType = "xml";
		options.parameters = sendParam;
		options.action = "queryLinkDirAction";
		options.directExecute = true;
		options.callback = function(data) {
		};
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var response = justep.Request.sendBizRequest2(options);
		if (justep.Request.isBizSuccess(response)) {
			var __XHR = response;
			// __checkMD5CodeByXML__
			return response;
		} else {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232114).getMessage());
		}
	},

	/**
	 * @description: 查询当前应显示的文件
	 * @param: billID - 业务ID
	 * @param: process - 过程名
	 * @param: activity - 活动名
	 * @param: pattern - 返回结果列表的字段名数组
	 * @param: orderBy - 排序字段名
	 * @return: loader - 结构是list的文件信息
	 */

	queryLinkedDoc : function(billID, rootPath, subPath) {
		var param = this.createParam("queryLinkedDoc", [ "bill-id", "rootPath",
				"subPath" ], [ billID, rootPath, subPath ]);
		var sendParam = new justep.Request.ActionParam();
		sendParam.setXml('param', new justep.Request.XMLParam(param));
		var response = justep.Request.sendBizRequest(
				"/SA/doc/system/systemProcess", "mainActivity",
				"dispatchOptAction", sendParam, null, null, true);
		if (justep.Request.isBizSuccess(response)) {
			var __XHR = response;
			// __checkMD5CodeByXML__
			return response;
		} else {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232115).getMessage());
		}
	},

	/**
	 * @description: 获取文档信息
	 * @param: docID - 文档ID
	 * @param: docPath - 文档docPath
	 * @param: pattern - 返回结果列表的字段名数组
	 * @param: orderBy - 排序字段名
	 * @return: loader - 结构是list的文件信息
	 */
	queryDoc : function(docID, docPath, pattern, orderBy, custom, single) {
		if (typeof docID == "undefined") {
			docID = "";
		}
		if (typeof docPath == "undefined") {
			docPath = "";
		}
		if (typeof pattern == "undefined") {
			pattern = "";
		}
		if (typeof orderBy == "undefined") {
			orderby = "";
		}
		if (typeof custom == "undefined") {
			custom = "";
		}
		if (pattern != "") {
			pattern = pattern.join(",");
		}

		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('docID', docID);
		sendParam.setString('docPath', docPath);
		sendParam.setString('pattern', pattern);
		sendParam.setString('orderBy', orderBy);
		sendParam.setString('custom', custom);
		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";

		options.dataType = "json";
		options.parameters = sendParam;
		options.action = "queryDocAction";
		options.directExecute = true;
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var response = justep.Request.sendBizRequest2(options);
		if (!justep.Request.isBizSuccess(response, 'json')) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232116).getMessage());
		}
		var __XHR = response;
		// __checkMD5CodeByJSON__
		var rows = justep.Request.responseParseJSON(response).data.value.rows;
		/* 返回单行数据 */
		if (single == "single") {
			if (rows.length != 1) {
				throw justep.Error.create(new justep.Message(
						justep.Message.JUSTEP232116).getMessage());
			}
			return rows[0];
		}
		/* 返回多行数据 */
		return rows;
	},

	getFlashUploader : function(param) {
		return this.getUploader2(param);
	},

	getUploader : function(containerID, docPath, limitSize, uploadResponse,
			click, width, height, zIndex, filter, multiFiles, caller, selected,
			completed) {
		return this.getUploader2({
			containerID : containerID,
			docPath : docPath,
			limitSize : limitSize,
			uploadResponse : uploadResponse,
			click : click,
			width : width,
			height : height,
			zIndex : zIndex,
			filter : filter,
			multiFiles : multiFiles,
			caller : caller,
			selected : selected,
			completed : completed
		});
	},

	getUploader2 : function(param) {
		var containerID = param.containerID;
		var docPath = param.docPath;
		var limitSize = param.limitSize;
		var uploadResponse = param.uploadResponse;
		var click = param.click;
		var ready = param.ready;
		var zIndex = param.zIndex;
		var filter = param.filter;
		var multiFiles = param.multiFiles;
		var caller = param.caller;
		var selected = param.selected;
		var completed = param.completed;
		YAHOO.widget.Uploader.SWFURL = justep.Request.convertURL(
				"/UI/system/service/doc/transport/uploader.swf", true);

		// position: absolute; background-color: transparent; ; width: 54px;
		// height: 15px; color: rgb(51, 102, 255); text-decoration: none;
		var flashContainer = containerID + 'flashWarpper';
		$('<div></div>').attr('id', flashContainer).css({
			'position' : 'absolute',
			'top' : '0px',
			'background-color' : 'transparent',
			'width' : '100%',
			'height' : '100%',
			'z-index' : zIndex
		}).appendTo($('#' + containerID));
		var uploader = new YAHOO.widget.Uploader(flashContainer);
		uploader.setDocPath = function(docPath) {
			this.docPath = docPath;
		};
		uploader.setDocPath(docPath);
		uploader.allCount = 0;
		uploader.finishCount = 0;
		uploader.fileList;
		uploader.click = function() {
			if (click != undefined) {
				click.call(caller);
			}
			uploader.clearFileList();
		};
		uploader.contentReady = function() {
			if (ready != undefined) {
				// TODO : flash 暂时不支持上传点击事件中取消
				ready.call(caller);
			}
			uploader.setAllowMultipleFiles(multiFiles ? true : false);
			if (filter) {
				uploader.setFileFilters(filter);
			}
		};
		uploader.fileSelect = function(event) {
			if (selected != undefined) {
				var cancel = selected.call(caller, event.fileList, this);
				if (cancel) {
					event.fileList = {};
					uploader.clearFileList();
				}
			}
			uploader.allCount = 0;
			uploader.finishCount = 0;
			uploader.completedCount = 0;
			uploader.fileList = event.fileList;

			var fileData = [];
			for ( var p in uploader.fileList) {
				var file = uploader.fileList[p];
				if ((file.size > limitSize) && (limitSize > 0)) {
					alert(new justep.Message(justep.Message.JUSTEP232105,
							justep.doc.InnerUtils.formatSize(limitSize))
							.getMessage());
					uploader.removeFile(file.id);
					continue;
				}
				fileData.push({
					id : file.id,
					name : file.name,
					size : file.size,
					progress : "0"
				});
				uploader.allCount++;
			}
			;
			if (uploader.allCount == 0)
				return;
			this.openUploadProgressDialog(fileData);
			this.currentUploader = uploader;
			/*
			 * uploader.uploadAll(uploader.host +
			 * "/repository/file/cache/upload", "POST", "uploadInfo",
			 * "Filedata");
			 */
			try {
				var host = justep.doc.InnerUtils.getdocServerAction(
						uploader.docPath, "/repository/file/cache/upload");

			} catch (e) {
				alert(new justep.Message(justep.Message.JUSTEP232106)
						.getMessage());
				throw e;
			}
			if (host.indexOf("uploadDoc.j") == -1 && host.indexOf("#") == -1) {
				uploader.loadAppPolicy(host.substr(0, host
						.indexOf("repository"))
						+ "crossdomain.xml");
			} else if (host.indexOf("#") != -1) {
				this.getUploadProgressDialog().close();
				throw e;
			}
			try {
				uploader.uploadAll(host, "POST", "uploadInfo", "Filedata");
			} catch (e) {
				alert(new justep.Message(justep.Message.JUSTEP232107)
						.getMessage());
				throw e;
			}
		};
		uploader.uploadStart = function(event) {
		};
		uploader.uploadProgress = function(event) {
			var prog = Math
					.round(100 * (event["bytesLoaded"] / event["bytesTotal"]));
			if (this.uploadPprogressTable) {
				var idx = this.uploadPprogressTable.find("id", event["id"]);
				this.uploadPprogressTable.setValue(idx + 1, "progress", prog);
				this.uploadPprogressTable.dm[idx].prog = prog;
			}
		};
		uploader.uploadCancel = function(event) {
		};
		uploader.uploadComplete = function(event) {
			uploader.completedCount++;
			if (uploader.completedCount == uploader.allCount) {
				if (completed != undefined) {
					completed.call(caller, uploader.fileList, this);
				}
			}
		};
		uploader.uploadResponse = function(event) {
			uploader.finishCount++;
			var eventData = justep.XML.fromString(event.data);
			var docName = uploader.fileList[event.id].name;
			var kind = justep.XML.getNodeText(justep.XML.eval0(eventData,
					"//file/@mediatype")[0]);
			var size = uploader.fileList[event.id].size;
			cacheName = justep.XML.getNodeText(justep.XML.eval0(eventData,
					"//file/@file-name")[0]);
			uploadResponse.call(caller, docName, kind, size, cacheName);
			if (uploader.finishCount == uploader.allCount) {
				if (this.uploadPprogressTable) {
					this.uploadPprogressTable.deleteAllRow();
					this.uploadPprogressTable.deleteQueue = null;
				}
				this.getUploadProgressDialog().close();
			}
		};
		uploader.uploadError = function(event) {
			alert(new justep.Message(justep.Message.JUSTEP232108, event.status)
					.getMessage());
		};
		uploader.addListener('click', uploader.click);
		uploader.addListener('contentReady', uploader.contentReady);
		uploader.addListener('fileSelect', uploader.fileSelect, null, this);
		uploader.addListener('uploadStart', uploader.uploadStart);
		uploader.addListener('uploadProgress', uploader.uploadProgress, null,
				this);
		uploader.addListener('uploadCancel', uploader.uploadCancel);
		uploader.addListener('uploadComplete', uploader.uploadComplete, null,
				this);
		uploader.addListener('uploadCompleteData', uploader.uploadResponse,
				null, this);
		uploader.addListener('uploadError', uploader.uploadError);
		return uploader;
	},

	getHtml4Uploader : function(param) {
		var uploaderDiv = param.uploaderDiv;
		var docPath = param.docPath;
		var onClickCallBack = param.clickCallBack;
		var onSubmitCallBack = param.submitCallBack;
		var onCompleteCallBack = param.completeCallBack;
		var caller = param.caller;
		var filter = param.filter ? param.filter : '*/*';
		var button = $('#' + uploaderDiv), interval;

		var dialog = document.createElement('div');
		dialog.id = uploaderDiv + '-waiting';
		dialog.style.position = "absolute";
		dialog.style.zIndex = "2000";
		dialog.style.background = "#fff";
		dialog.style.border = "1px solid #C2D5DC";
		dialog.style.width = "310px";
		dialog.style.height = "80px";
		AjaxUpload.prototype.setDocPath = function(docPath) {
			this._settings.action = justep.doc.InnerUtils.getdocServerAction(
					docPath, "/repository/file/cache/upload", true);
		};
		AjaxUpload.prototype.getButton = function() {
			return this._button;
		};

		var uploader = new AjaxUpload(
				button,
				{
					action : '',
					name : 'myfile',
					filter : filter,
					multiple : !!param.multiple,

					onClick : function() {
						$(dialog).empty();
						if (onClickCallBack) {
							var success = onClickCallBack.call(caller, this);
							if (success == false) {
								return false;
							}
						}
					},

					onSubmit : function(file, ext) {
						var filter = this._settings.filter;
						if (filter == '*/*'
								|| ext
								&& new RegExp('^(' + filter + ')$', '\i')
										.test(ext)) {

							this.setDocPath(docPath);
							if (onSubmitCallBack) {
								var success = onSubmitCallBack.call(caller,
										file, this);
								if (success == false) {
									return false;
								}
							}
						} else {
							alert(new justep.Message(
									justep.Message.JUSTEP232010).getMessage());
							return false;
						}
					},
					
					onProgress : function(files){
						var names = "", dialogHeight = 80;
						for(var n=0;n<files.length;n++){
							names += "<div style='padding:5px 0px'>" +  "("+(n+1)+") "  + files[n] + "</div>";
							dialogHeight += 30;
						}
						
						var top = $(this._button).offset().top;
						var topValue = (top > (50 + dialogHeight) ? top
								- 50 - dialogHeight : top);
						var leftValue = ($(this._button).offset().left + 50);
						if (topValue <= 0) {
							topValue = window.screen.height / 2 - 50
									- dialogHeight;
						}

						if (leftValue <= 0) {
							leftValue = window.screen.width / 2 - 50;
						}
						dialog.style.top = topValue + "px";
						dialog.style.left = leftValue + "px";
						dialog.innerHTML = "<div id='uploadingDialog' style='position:relative;'>"
							+ "<img style='position:absolute;top:20px;left:20px;' src='"
							+ justep.Request.convertURL("/UI/system/service/report/dialog/waiting1.gif")
							+ "'/>"
							+ "<div style='position:absolute;top:32px;left:60px;font-size:13px;width:230px;overflow:hidden;height:"+(dialogHeight-45)+"px;padding-left:10px;'><div>正在上传:</div>"
							+ names
							+ "<div>请稍等...</div></div>"
							+ "<div style='position:relative;top:32px;left:290px;float:left;width:20px;'></div></div>";
						document.body.appendChild(dialog);
						dialog.style.height = dialogHeight + "px";
					},
					
					onComplete : function(files, response) {
						var fileList = $(response).find("file");
						$("#" + uploaderDiv + '-waiting').remove();
						if (fileList.length == 0) {
							throw justep.Error.create(new justep.Message(
									justep.Message.JUSTEP232026, response)
									.getMessage());
						} else {
							if (onCompleteCallBack) {
								onCompleteCallBack.call(caller, files, this,
										response);
							}
						}

					}
				});
		return uploader;
	},

	getIOSUploader : function(param) {
		var uploaderDiv = param.uploaderDiv;
		var docPath = param.docPath;
		var onClickCallBack = param.clickCallBack;
		var onCompleteCallBack = param.completeCallBack;
		var caller = param.caller;
		var button = $('#' + uploaderDiv);
		$(button)
				.bind(
						'click',
						function() {
							if (onClickCallBack) {
								var success = onClickCallBack
										.call(caller, this);
								if (success == false) {
									return false;
								}
							}

							var justepApp = justep.getJustepApp();
							var getUploadUrl = function() {
								var docUrl = justep.doc.InnerUtils
										.getdocServerAction(
												docPath,
												"/repository/file/cache/upload",
												true);
								if (docUrl.indexOf("uploadDoc.j") != -1
										&& docUrl.indexOf("#") == -1) {
									docUrl = window.location.protocol + "//"
											+ window.location.host + docUrl;
								}
								return docUrl;
							};
							var uploadCallback = function(response, fileName) {
								var file = $(response).find("file");
								var kind = $(file).attr("mediatype");
								var cacheName = $(file).attr("file-name");
								var size = $(file).attr("fileSize");
								onCompleteCallBack.call(caller, fileName, kind,
										size, cacheName);
								if (onCompleteCallBack) {
									onCompleteCallBack.call(caller, docName,
											this, response);
								}
							};
							justepApp.attachment.uploadAttachment(getUploadUrl,
									uploadCallback);
						});
	},

	trim : function(value) {
		return value || "";
	},

	addCreateVersionLog : function(changeLog, attachmentValue, billID) {
		var item = {};
		item.billID = billID;
		item.attachmentValue = attachmentValue;
		changeLog.createVersionLogs.push(item);
	},

	addChangeLog : function(changeLog, operate, values, filePorps, billID) {
		var item = {};
		item.operation_type = operate;
		/* 当前环境信息 */
		item.process = justep.Context.getCurrentProcess();
		item.activity = justep.Context.getCurrentActivity();
		item.person = justep.Context.getCurrentPersonMemberFID();
		item.person_name = justep.Context.getCurrentPersonName();
		item.dept_name = justep.Context.getCurrentDeptName() ? justep.Context
				.getCurrentDeptName() : "";
		item.bill_id = this.trim(billID);

		/* 文档属性 */
		item.doc_id = this.trim(values[0]);
		item.version = this.trim(values[1] + "");
		item.file_id = this.trim(values[2]);
		item.doc_version_id = this.trim(values[3]);
		item.doc_name = this.trim(values[4]);
		item.kind = this.trim(values[5]);
		item.size = this.trim(values[6]);
		item.parent_id = this.trim(values[7]);
		item.doc_path = this.trim(values[8]);
		item.doc_display_path = this.trim(values[9]);
		item.description = this.trim(values[10]);
		item.classification = this.trim(values[11]);
		item.keywords = this.trim(values[12]);
		item.finish_time = this.trim(values[13]);
		item.serial_number = this.trim(values[14]);
		/* 文档服务器文件属性 */
		if (typeof filePorps != "undefined") {
			item.doc_type = this.trim(filePorps[0]);
			item.cache_name = this.trim(filePorps[1]);
			item.revision_cache_name = this.trim(filePorps[2]);
			item.comment_file_content = this.trim(filePorps[3]);
		} else {
			item.doc_type = "";
			item.cache_name = "";
			item.revision_cache_name = "";
			item.comment_file_content = "";
		}

		/* 存储时需要的辅助信息 */
		if (("new" == operate) || ("link" == operate) || ("newDir" == operate)) {
			item.link_id = (new justep.UUID()).valueOf();
		} else
			item.link_id = "";
		item.access_record_id = (new justep.UUID()).valueOf();

		changeLog.items.push(item);
	},

	updateChangeLog : function(changeLog, docId, fileId, docVersionId) {
		var items = changeLog.items;
		for ( var i = 0; i < items.length; i++) {
			var item = items[i];
			if (item.doc_id == docId) {
				item.file_id = fileId;
				item.doc_version_id = docVersionId;
				return;
			}
		}
	},

	removeChangeLog : function(changeLog, docID) {
		var items = changeLog.items;
		for ( var item in items) {
			var item = items[item];
			if (item.doc_id == docID) {
				changeLog.items.pop(item);
			}
		}
	},
	/*
	 * 向changeLog中的row修改记录，需保证values和filePorps顺序 values为[doc-id, version,
	 * file-id, doc-version-id, doc-name, kind, size, parent-id, doc-path,
	 * doc-display-path, description, classification, keywords, finish-time,
	 * serial-number]. filePorps为[doc-type, cache-name, revision-cache-name,
	 * comment-file-content]
	 */
	modifyChangeLog : function(item, values, filePorps) {
		item.version = values[0];
		item.file_id = values[1];
		item.doc_version_id = values[2] == null ? "" : values[2];
		item.doc_name = values[3];
		item.kind = values[4];

		item.size = values[5];
		item.parent_id = values[6];
		item.doc_path = values[7];
		item.doc_display_path = values[8];
		item.description = values[9] == null ? "" : values[9];

		item.classification = values[10] == null ? "" : values[10];
		item.keywords = values[11] == null ? "" : values[11];
		item.finish_time = values[12] == null ? "" : values[12];
		item.serial_number = values[13] == null ? "" : values[13];
		if (item.operation_type == "editInfo" && values[14]) {
			item.operation_type = values[14];
		}

		/* 文档服务器文件属性 */
		if (typeof filePorps != "undefined") {
			item.doc_type = filePorps[0];
			item.cache_name = filePorps[1];
			item.revision_cache_name = filePorps[2];
			item.comment_file_content = filePorps[3];
		} else {
			item.doc_type = "";
			item.cache_name = "";
			item.revision_cache_name = "";
			item.comment_file_content = "";
		}
	},

	evalChangeLog : function(changeLog, docId) {
		var items = changeLog.items;
		for ( var item in items) {
			if (items[item].doc_id == docId)
				return items[item];
		}
		return null;
	},

	addAccessRecord : function(changeLog) {
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('param', JSON.stringify(changeLog));
		response = justep.Request.sendBizRequest(
				"/SA/doc/system/systemProcess", "mainActivity",
				"addAccessRecordAction", sendParam, null, null, false);
		if (!justep.Request.isBizSuccess(response)) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232117).getMessage());
		}
		var __XHR = response;
		// __checkMD5CodeByXML__
	},

	createElement : function(changeLog, name, value) {
		var element = changeLog.createElement(name);
		if (value != null && value !== "") {
			justep.XML.setNodeText(element, '.', value);
		}
		return element;
	},
	createVersion : function(sDocID, isSaveDocLink, sDocName) {
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('sDocID', sDocID);
		sendParam.setBoolean("isSaveDocLink", isSaveDocLink ? isSaveDocLink
				: false);
		sendParam.setBoolean("isHttps", this.isHttps());
		if (sDocName) {
			sendParam.setString("sDocName", sDocName);
		}
		var response = justep.Request.sendBizRequest(
				"/SA/doc/system/systemProcess", "mainActivity",
				"createVersionAction", sendParam, null, null, true);
		if (justep.Request.isBizSuccess(response)) {
			var __XHR = response;
			// __checkMD5CodeByXML__
			var createSucess = justep.Request.transform(justep.Request
					.getData(response.responseXML));
			return createSucess;
		} else {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232118).getMessage());
		}
	},
	deleteVersion : function(docPath, fileID, LogID, docVersion) {
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('sDocPath', docPath);
		sendParam.setString('sFileID', fileID);
		sendParam.setString('sLogID', LogID);
		sendParam.setString('sDocVersion', docVersion);
		sendParam.setBoolean("isHttps", this.isHttps());
		var response = justep.Request.sendBizRequest(
				"/SA/doc/system/systemProcess", "mainActivity",
				"deleteVersionAction", sendParam, null, null, true);
		if (!justep.Request.isBizSuccess(response)) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232119).getMessage());
		}
	},
	createVersionFromJsonStr : function(billID, jsonStr, isHttps) {
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('billID', billID);
		sendParam.setString('jsonStr', jsonStr);
		sendParam.setBoolean("isHttps", this.isHttps());
		var response = justep.Request.sendBizRequest(
				"/SA/doc/system/systemProcess", "mainActivity",
				"createVersionFromJsonStrAction", sendParam, null, null, true);
		if (justep.Request.isBizSuccess(response)) {
			var __XHR = response;
			// __checkMD5CodeByXML__
			return true;
		} else {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232120).getMessage());
		}
	},

	// 锁定自己已经锁定的文档返回false,函数queryDocCache会返回锁定的真正情况。TODO ：更好的函数命名
	lockDoc : function(sDocID) {
		var sendParam = new justep.Request.ActionParam();
		sendParam.setBoolean('isLockDoc', true);
		sendParam.setString('sDocID', sDocID);
		var response = justep.Request.sendBizRequest(
				"/SA/doc/system/systemProcess", "mainActivity",
				"changeDocStateAction", sendParam, null, null, true);
		if (justep.Request.isBizSuccess(response)) {
			var __XHR = response;
			// __checkMD5CodeByXML__
			var affactRow = justep.Request.transform(justep.Request
					.getData(response.responseXML));
			if (affactRow && affactRow == '0') {
				return false;
			}
			return true;
		} else {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232121).getMessage());
		}
	},
	unLockDoc : function(sDocID) {
		var sendParam = new justep.Request.ActionParam();
		sendParam.setBoolean('isLockDoc', false);
		sendParam.setString('sDocID', sDocID);
		var response = justep.Request.sendBizRequest(
				"/SA/doc/system/systemProcess", "mainActivity",
				"changeDocStateAction", sendParam, null, null, true);
		if (justep.Request.isBizSuccess(response)) {
			var __XHR = response;
			// __checkMD5CodeByXML__
			var affactRow = justep.Request.transform(justep.Request
					.getData(response.responseXML));
			if (affactRow && affactRow == '0') {
				return false;
			}
			return true;
		} else {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232122).getMessage());
		}
	},

	/**
	 * @description: 下载文档
	 * @param: docID - 文档ID
	 * @param: host - 文档服务器地址ID
	 */
	downloadDoc : function(docPath, docID) {
		var row = this.queryDoc(docID, undefined, [ "sFileID" ], undefined,
				undefined, "single");
		var fileID = row.sFileID.value;
		this.downloadDocByFileID(docPath, fileID);
	},

	downloadDocByFileID : function(docPath, fileID, versionID, partType) {
		if (justep.Browser.hasTouch) {
			if (justep.Browser.isInApp) {
				if (justep.Browser.isAndroid) {
					window.open(this.getURLByFileID(docPath, fileID, versionID,
							partType), '附件下载', null, true);
				} else if (justep.Browser.isIDevice) {
					var self = this;
					var getDownloadUrl = function() {
						var docUrl = self.getURLByFileID(docPath, fileID,
								versionID, partType);
						if (docUrl.indexOf("uploadDoc.j") != -1
								&& docUrl.indexOf("#") == -1) {
							docUrl = justepApp.utils.getFullUrl(docUrl);
						}
						return docUrl;
					};
					var justepApp = justep.getJustepApp();
					justepApp.attachment.downloadAttachment(getDownloadUrl);
				}
			} else {
				window.open(this.getURLByFileID(docPath, fileID, versionID,
						partType));
			}
		} else {
			window.open(this.getURLByFileID(docPath, fileID, versionID,
					partType), "_blank");

		}
	},

	getURL : function(docPath, docID) {
		var row = this.queryDoc(docID, undefined, [ "sFileID" ], undefined,
				undefined, "single");
		var fileID = row.sFileID.value;
		return this.getURLByFileID(docPath, fileID);
	},

	getURLByFileID : function(docPath, fileID, versionID, partType) {
		var versionID = versionID ? versionID : "last";
		var partType = partType ? partType : "content";
		return this.getdocServerAction(docPath, "/repository/file/download/"
				+ fileID + "/" + versionID + "/" + partType);
	},

	browseFileComment : function(docPath, fileID, docVersionID) {
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setBoolean("isHttps", this.isHttps());
		sendParam.setString('docPath', docPath);
		sendParam.setString('fileID', fileID);
		sendParam.setString('docVersionID', docVersionID);

		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";

		options.dataType = "json";
		options.parameters = sendParam;
		options.action = "queryCommentFileContent";
		options.directExecute = true;
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		try {
			var res = justep.Request.sendBizRequest2(options);
		} catch (e) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232123).getMessage());
		}

		if (!justep.Request.isBizSuccess(res, 'json')) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232123).getMessage());
		}
		var __XHR = res;
		// __checkMD5CodeByJSON__
		var v = justep.Request.responseParseJSON(res).data.value;
		return JSON.parse(v);
	},

	browseDoc : function(docPath, docID) {
		var row = this.queryDoc(docID, undefined, [ "sDocName,sFileID" ],
				undefined, undefined, "single");
		var docName = row.sDocName.value;
		var fileID = row.sFileID.value;
		this.browseDocByFileID(docPath, docName, fileID);
	},

	browseDocByFileID : function(docPath, docName, fileID, versionID, partType,
			programID, isPrint) {
		var versionID = versionID ? versionID : "last";
		var partType = partType ? partType : "content";
		if (!fileID) {
			alert('文档不能浏览，数据未提交！');
			return;
		}
		var fileinfo = this.queryDocByFileId(docPath, fileID, docName,
				versionID);
		if (!justep.Browser.isInApp
				&& '.doc.docx.xls.xlsx.ppt.mpp.vsd.wps.'
						.indexOf(String(/\.[^\.]+$/.exec(docName)) + '.') >= 0) {
			var OVP = {};
			OVP.host = docPath;
			OVP.programID = programID;
			OVP.versionID = versionID;

			if (fileinfo.length < 1)
				throw new Error("文档服务器不存在名称为" + docName + "的office文件！");
			if (partType == 'revision') {
				OVP.partType = !fileinfo.parts.part_3 ? "content" : "revision";
			} else
				OVP.partType = partType;

			OVP.fileID = fileID;
			OVP.fileExt = String(/\.[^\.]+$/.exec(docName));
			OVP.filename = docName.substr(0, docName.lastIndexOf('.'));

			if (typeof isPrint === "undefined" || isPrint == null)
				isPrint = true;
			OVP.isPrint = isPrint ? true : false;
			var param = unescape(JSON.stringify(OVP));
			OVP.filename = encodeURI(OVP.filename);
			var url = window.location.protocol
					+ "//"
					+ window.location.host
					+ justep.Request
							.convertURL("/UI/system/service/doc/ntko/NtkoOfficeViewer.w?process=/SA/doc/system/systemProcess&activity=mainActivity");
			url = url + "&param=" + encodeURIComponent(param);
			justep.Portal.openWindow("附件浏览", url);
		} else if (!justep.Browser.isInApp
				&& '.dwg.dxf.DWG.DXF'.indexOf(String(/\.[^\.]+$/.exec(docName))) >= 0) {
			var url = window.location.protocol
					+ "//"
					+ window.location.host
					+ justep.Request
							.convertURL("/UI/system/service/doc/cad/CadViewer.w?process=/SA/doc/system/systemProcess&activity=mainActivity");
			var OVP = {};
			OVP.docPath = docPath;
			OVP.fileID = fileID;
			OVP.fileExt = String(/\.[^\.]+$/.exec(docName));
			OVP.filename = docName.substr(0, docName.lastIndexOf('.'));

			if (typeof isPrint === "undefined" || isPrint == null)
				isPrint = true;
			OVP.isPrint = isPrint ? true : false;
			var param = unescape(JSON.stringify(OVP));
			url = url + "&param=" + encodeURIComponent(param);
			justep.Portal.openWindow("附件浏览", url);
		} else if (justep.doc._read_file_type2
				&& justep.doc._read_file_type2.indexOf((String(/\.[^\.]+$/
						.exec(docName)).toLowerCase())) >= 0) {
			var url = this.getdocServerAction(docPath, "/repository/file/view/"
					+ fileID + "/" + versionID + "/" + partType);
			if (url.indexOf("#") == -1) {
				var self = this;
				if (justep.Browser.isInApp) {
					var justepApp = justep.getJustepApp();
					var getBrowserUrl = function() {
						var docUrl = url;
						if (docUrl.indexOf("uploadDoc.j") != -1
								&& docUrl.indexOf("#") == -1) {
							docUrl = window.location.protocol + "//"
									+ window.location.host + docUrl;
						}
						return docUrl;
					};
					var getDocName = function() {
						return docName;
					};
					justepApp.attachment.browserAttachment(getBrowserUrl,
							getDocName);
				} else {
					if(url.indexOf(justep.Request.BASE_URL) != -1)
						url = url.split(justep.Request.BASE_URL)[1];
					if (url.indexOf("UI2") != -1)
						url = url.replace("UI2", "UI");
					justep.Portal.openWindow("附件浏览", url);
				}
			}
		} else {
			alert("浏览器不支持在线浏览【"+ docName+ "】此格式的文件。");
		}
	},

	/**
	 * @description: 构造请求参数
	 * @param: operation - 操作类型
	 * @param: nodes - 节点名数组与值对应
	 * @param: values - 节点值数组与名对应
	 * @return: param - 参数字符串
	 * 
	 */
	createParam : function(operate, nodes, values) {
		var items = [];
		items.push("<data>");
		items.push("<operate>");
		items.push(operate);
		items.push("</operate>");
		for (i = 0; i < nodes.length; i++) {
			items.push("<");
			items.push(nodes[i]);
			items.push(">");
			items.push(values[i]);
			items.push("</");
			items.push(nodes[i]);
			items.push(">");
		}
		items.push("</data>");
		return items.join("");
	},

	/**
	 * @description: 构造请求参数
	 * @param: pattern - 条件模板节点名数组
	 * @return: param - 条件模板
	 * 
	 */
	createQueryPattern : function(pattern) {
		var items = [];
		for (i = 0; i < pattern.length; i++) {
			items.push("<");
			items.push(pattern[i]);
			items.push("/>");
		}
		return items.join("");
	},

	transB2KB : function(v) {
		if (v.value == '') {
			return;
		}
		var tempValue = v.value;
		var resultValue = "";
		var tempValueStr = new String(tempValue);
		if ((tempValueStr.indexOf('E') != -1)
				|| (tempValueStr.indexOf('e') != -1)) {
			var regExp = new RegExp('^((\\d+.?\\d+)[Ee]{1}(\\d+))$', 'ig');
			var result = regExp.exec(tempValue);
			var power = "";
			if (result != null) {
				resultValue = result[2];
				power = result[3];
				result = regExp.exec(tempValueStr);
			}
			if (resultValue != "") {
				if (power != "") {
					var powVer = Math.pow(10, power);
					resultValue = resultValue * powVer / 1000;
				}
			}
			return parseInt(resultValue) + 1;
		} else {
			return parseInt(tempValue / 1000) + 1;
		}
	},

	formatSize : function(size) {
		var format = "";
		if (size == 0) {
			format = "0.0 KB";
		} else {
			if (size < 1048576) {
				format = (Math.ceil(size / 1024 * 10) / 10).toFixed(1) + " KB";
			} else {
				format = (Math.ceil(size / 1048576 * 10) / 10).toFixed(1)
						+ " MB";
			}
		}
		return format;
	},

	getDocFullPath : function(docID, docPath) {
		if (docPath == "/") {
			return docPath.concat(docID);
		} else {
			return docPath.concat("/").concat(docID);
		}
	},

	getDocFullDisplayPath : function(docName, docDisplayPath) {
		if (docDisplayPath == "/") {
			return docDisplayPath.concat(docName);
		} else {
			return docDisplayPath.concat("/").concat(docName);
		}
	},

	/**
	 * @description: 获取文档操作记录
	 * @param: docID - 文档ID
	 * @param: opaerationTypes - 是否包含此操作
	 * @return: resopnse - 操作记录dom
	 * 
	 */

	getAccessRecord : function(docID, hasDownload, hasNew, hasEdit) {
		if (typeof hasDownload == "undefined") {
			hasDownload = true;
		}
		if (typeof hasNew == "undefined") {
			hasNew = true;
		}
		if (typeof hasEdit == "undefined") {
			hasEdit = true;
		}
		var param = this
				.createParam("queryAccessRecord", [ "doc-id", "has-new",
						"has-download", "has-edit" ], [ docID,
						hasNew.toString(), hasDownload.toString(),
						hasEdit.toString() ]);
		var sendParam = new justep.Request.ActionParam();
		sendParam.setXml('param', new justep.Request.XMLParam(param));
		response = justep.Request.sendBizRequest(
				"/SA/doc/system/systemProcess", "mainActivity",
				"dispatchOptAction", sendParam, null, null, true);

		if (justep.Request.isBizSuccess(response)) {
			var __XHR = response;
			// __checkMD5CodeByXML__
			return response;
		} else {
			alert("getAccessRecord Error :查询操作记录失败！");
		}
	},

	openNeoOfficeDialog : function(OVP) {
		var url = "/system/service/doc/office/neoOfficeEditDialog.w";
		if (!this.NeoOfficeEditRunner) {
			this.NeoOfficeEditRunner = new justep.windowRunner(url, "", true,
					null, null);
			this.NeoOfficeEditRunner.setProcess("/SA/doc/system/systemProcess");
			this.NeoOfficeEditRunner.setActivity("mainActivity");

		}
		OVP.filename = encodeURI(OVP.filename);
		this.NeoOfficeEditRunner.open(JSON.stringify(OVP), url);
	},

	execOfficeAction : function(id, param) {
		if (id == 'officeAction') {
			if (param) {
				var data = JSON.parse(param);
				justep.doc.InnerUtils.afterOfficeViewerDialogSelect.call(
						justep.doc.InnerUtils.caller, data);
			} else {
				// 点编辑进去，点关闭出来需要解锁
				justep.doc.InnerUtils.afterOfficeViewerDialogSelect.call(
						justep.doc.InnerUtils.caller, "");
			}
		} else if (id == "undefined") {
			if (typeof officeAutomation == "function") {
				officeAutomation.call(justep.doc.InnerUtils.caller, id, param);
			}
		}
	},

	checkOcx : function() {
		var showUploadDialog = false;
		if (navigator.userAgent.toLowerCase().indexOf("windows") == -1) {
			alert("当前环境不支持此功能");
			return false;
		} else {
			if (justep.Browser.IE) {
				if (!document.getElementById("justepDoc_ocx")) {
					$('<div style="height:0px;weight:0px;display:none;"></div>')
							.html(
									'<object id="justepDoc_ocx" classid="clsid:4771E057-4202-4F93-8F73-4C6654A9573D" width="0" height="0"'
											+ 'codebase='
											+ justep.Request
													.convertURL(
															"/UI/system/service/doc/office/office.cab",
															true)
											+ '>'
											+ '</object>').appendTo('body');
				}
				var isExsitOcx = document.getElementById("justepDoc_ocx").innerHTML;
				if (isExsitOcx == '') {
					showUploadDialog = true;
				} else {
					return true;
				}
			} else {
				if (!document.getElementById("justepDoc_ocx")) {
					$('<div style="height:0px;weight:0px;"></div>')
							.html(
									'<object id="justepDoc_ocx" type="application/justep-activex" style="width:0px;height:0px;" clsid="{4771E057-4202-4F93-8F73-4C6654A9573D}" '
											+ 'codebase='
											+ justep.Request
													.convertURL(
															"/UI/system/service/doc/office/office.cab",
															true)
											+ '>'
											+ '</object>').appendTo('body');
				}
				var isExsitOcx = document.getElementById("justepDoc_ocx");
				if (typeof isExsitOcx.openWebForm != "function") {
					showUploadDialog = true;
				} else {
					return true;
				}
			}
			if (showUploadDialog) {
				if (!this.checkOcxDialog) {
					var self = this;
					this.checkOcxDialog = new justep.Dialog(
							"justepCheckOcxDialog",
							"安装提示",
							true,
							null,
							400,
							150,
							null,
							null,
							function() {
								var str = '<div style="width:100%;height:100%;position:relative;">                                                     '
										+ '<div style="font:12px;margin-top:30px;margin-left:50px;margin-right:50px;" align="center" >                           '
										+ ' 未安装文档相关辅助控件<br/><br/>点击                                                                                         '
										+ '	 <a href="#" onclick="justep.doc.InnerUtils.updateOcx()">                 '
										+ '	 更新                                                                                                     '
										+ '	 </a>                                      '
										+ ' 跳转到控件安装页面。                                                                      '
										+ '</div>                                         '
										+ '<div style="width:75px; height:22px; position:absolute;bottom:0;right:0;margin:8px">'
										+ '	<button class="xui-button" onclick="justep.doc.InnerUtils.checkOcxDialog.close();" style="width:75px">确定</button>'
										+ '</div>                                                                                                     '
										+ '</div> ';
								self.checkOcxDialog.setContentHTML(str);
							});

				}
				this.checkOcxDialog.setMinmaxable(false);
				this.checkOcxDialog.setResizable(false);
				this.checkOcxDialog.open();
			}
		}
	},

	updateOcx : function() {
		justep.doc.InnerUtils.checkOcxDialog.close();
		justep.Portal.openWindow('工具下载', "/SA/update/update.j");
	},

	getImage : function() {
		return '/form/dhtmlx/dhtmlxGrid/imgs/folderClosed.gif';
	},

	getUploadProgressDialog : function() {
		var self = this;
		if (!this.uploadProgressDialog) {
			this.uploadProgressDialog = new justep.Dialog(
					"docUploadProgressDialog",
					"正在上传...",
					true,
					null,
					550,
					215,
					null,
					null,
					function() {
						var str = "<div id='progressTable'></div>";

						self.uploadProgressDialog.setContentHTML(str);

						self.uploadPprogressTable = new justep.doc.InnerUtils.ProgressTable(
								{
									renderTo : "progressTable",
									width : "550px",
									columns : [
											{
												text : "名称",
												width : "270",
												name : "name"
											},
											{
												text : "大小(byte)",
												width : "100",
												name : "size"
											},
											{
												text : "上传进度",
												name : "progress",
												width : "150",
												render : function(prog, record) {
													if (prog == '0') {
														return "<div style='height:5px;width:150px;background-color:#CCC;'></div>";
													} else if (prog != '100') {
														return "<div style='height:12px;width:150px;background-color:#CCC;'><div style='height:5px;background-color:#0EBE0E;width:"
																+ (prog / 100)
																* 150
																+ "px;'></div></div>";
													} else if (prog == '100') {
														return "<div style='height:12px;background-color:#0EBE0E;width:150px;'></div>";
													}
												}
											}, {
												text : "",
												name : "cancal",
												width : "24"
											} ]
								});
					});
			this.uploadProgressDialog.setMinmaxable(false);
			this.uploadProgressDialog.setResizable(false);

		}
		return this.uploadProgressDialog;
	},

	openUploadProgressDialog : function(data) {
		if (!data)
			return;
		var dlg = this.getUploadProgressDialog();
		if (null != dlg) {
			dlg.open();
			if (this.uploadPprogressTable) {
				if (this.uploadPprogressTable) {
					this.uploadPprogressTable.deleteAllRow();
					this.uploadPprogressTable.deleteQueue = null;
				}
				for (i = 0; i < data.length; i++) {
					var record = data[i];
					if (!this.uploadPprogressTable.dm) {
						this.uploadPprogressTable.dm = [];
					}
					if (this.uploadPprogressTable.deleteQueue) {
						this.uploadPprogressTable.deleteByField("id",
								this.uploadPprogressTable.deleteQueue.shift());
					}
					record.cancal = justep.doc.InnerUtils.ProgressTable
							.createCancalButton(record.id);
					this.uploadPprogressTable.dm.push(record);
					this.uploadPprogressTable.appendRow(record);
				}
			}

		}
	},
	queryDocCache : function(docID) {
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('docID', docID);
		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";

		options.dataType = "json";
		options.parameters = sendParam;
		options.action = "queryDocCacheAction";
		options.directExecute = true;
		options.callback = function(data) {
		};
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var response = justep.Request.sendBizRequest2(options);
		if (!justep.Request.isBizSuccess(response, 'json')) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232124).getMessage());
		}
		var __XHR = response;
		// __checkMD5CodeByJSON__
		var fileinfo = justep.Request.responseParseJSON(response).data.value;
		return fileinfo;
	},
	queryDocByFileId : function(docPath, fileid, filename, version) {
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setBoolean('isHttps', this.isHttps());
		sendParam.setString('host', docPath);
		sendParam.setString('fileId', fileid);
		sendParam.setString('docVersion', !version ? "last" : version);
		// /options.contentType = 'json';
		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";

		options.dataType = "json";
		options.parameters = sendParam;
		options.action = "queryDocInfoByIdAction";
		options.directExecute = true;
		options.callback = function(data) {
		};
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var response = justep.Request.sendBizRequest2(options);
		if (!justep.Request.isBizSuccess(response, 'json')) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232125).getMessage());
		}
		var __XHR = response;
		// __checkMD5CodeByJSON__
		var fileinfo = justep.Request.responseParseJSON(response).data.value;
		if (fileinfo.queryFlag == "false") {
			throw new Error('提示：'
					+ (!filename ? '此文件不存在，可能文档服务配置存在问题，请联系系统管理员！' : '“'
							+ filename + '”文件不存在，可能文档服务配置存在问题，请联系系统管理员！'));
		}
		return fileinfo;
	},
	syncCustomFileds : function(docID) {
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('sDocID', docID);
		sendParam.setBoolean('isHttps', this.isHttps());
		response = justep.Request.sendBizRequest(
				"/SA/doc/system/systemProcess", "mainActivity",
				"syncCustomFiledsAction", sendParam, null, null, true);
		if (!justep.Request.isBizSuccess(response)) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232126).getMessage());
		}
		var __XHR = response;
		// __checkMD5CodeByXML__

	},
	commitDocCache : function(docID, changeLog) {
		var node = justep.doc.InnerUtils.evalChangeLog(changeLog, docID);
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('changeLog', JSON.stringify(node));
		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";
		options.dataType = "json";
		options.parameters = sendParam;
		options.action = "commitDocCacheAction";
		options.directExecute = true;
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var response = justep.Request.sendBizRequest2(options);
		if (!justep.Request.isBizSuccess(response, 'json')) {
			throw new Error("commitError: 数据保存失败！");
		}
		var __XHR = response;
		// __checkMD5CodeByJSON__
	},
	// 知识中心新建word文件的时候要提交flag的
	commitDocFlag : function(changeLog) {
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('changeLog', JSON.stringify(changeLog));
		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";
		options.dataType = "json";
		options.parameters = sendParam;
		options.action = "commitDocFlagAction";
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var response = justep.Request.sendBizRequest2(options);
		if (!justep.Request.isBizSuccess(response, 'json')) {
			throw new Error("commitError: commitDocFlag失败！");
		}
		var __XHR = response;
		// __checkMD5CodeByJSON__
	},

	/*
	 * @param: 知识中心使用commitDocAction 附件使用commitAttachAction
	 */
	commitDoc : function(changeLog, rootPath, action) {
		// changeLog.url = host+"/repository/file/cache/commit";
		changeLog.isHttps = this.isHttps();
		changeLog.operate = "commitDoc";
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('changeLog', JSON.stringify(changeLog));
		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";
		options.dataType = "json";
		options.parameters = sendParam;
		options.action = action ? action : "commitDocAction";
		options.directExecute = true;
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var response = justep.Request.sendBizRequest2(options);
		if (!justep.Request.isBizSuccess(response, 'json')) {
			throw new Error("commitError: 数据提交失败！");
		}
		var __XHR = response;
		// __checkMD5CodeByJSON__
		return justep.Request.responseParseJSON(response).data.value;
	},

	saveDoc : function(changeLog, isSaveDocLink) {
		changeLog.operate = "saveDoc";
		var options = {};

		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('changeLog', JSON.stringify(changeLog));
		sendParam.setBoolean("isSaveDocLink", isSaveDocLink ? isSaveDocLink
				: false);

		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";
		options.dataType = "json";
		options.parameters = sendParam;
		options.action = "saveAttachAction";
		options.directExecute = false;
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var response = justep.Request.sendBizRequest2(options);

		if (!justep.Request.isBizSuccess(response, 'json')) {
			throw new Error("saveDocError: 数据保存失败！");
		}
		var __XHR = response;
		// __checkMD5CodeByJSON__
		return response;
	},

	deleteDocAction : function(changeLog, rootPath) {
		changeLog.isHttps = this.isHttps();
		changeLog.operate = "deleteDocAction";
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('changeLog', JSON.stringify(changeLog));
		options.process = "/SA/doc/system/systemProcess";
		options.activity = "mainActivity";
		options.dataType = "json";
		options.parameters = sendParam;
		options.action = "deleteDocAction";
		options.directExecute = true;
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var response = justep.Request.sendBizRequest2(options);
		if (!justep.Request.isBizSuccess(response, 'json')) {
			throw new Error("commitError: 数据提交失败！");
		}
		var __XHR = response;
		// __checkMD5CodeByJSON__
	},

	getDocAuthList : function() {
		var options = {};
		var sendParam = new justep.Request.ActionParam();
		sendParam.setString('deptPath', justep.Context
				.getCurrentPersonMemberFID());
		sendParam.setString('personId', justep.Context.getCurrentPersonCode());
		options.process = justep.Context.getCurrentProcess();
		options.activity = justep.Context.getCurrentActivity();
		options.dataType = "json";
		options.parameters = sendParam;
		options.action = "queryPermissionAction";
		options.directExecute = false;
		// __checkMD5Code2__
		options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
				: null;
		var response = justep.Request.sendBizRequest2(options);

		if (!justep.Request.isBizSuccess(response, 'json')) {
			throw new Error("getDocAuthListError: 获取文档权限列表失败！");
		}
		var __XHR = response;
		// __checkMD5CodeByJSON__
		return justep.Request.responseParseJSON(response).data.value;
	}
};

justep.doc.InnerUtils.ProgressTable = function(config) {
	this.columns = config.columns;
	this.tbObj = document.createElement("table");
	this.tbObj.border = "1px";
	this.tbObj.style.borderColor = "#DDDDDD";
	this.tbObj.cellpadding = "0";
	this.tbObj.cellspacing = "0";
	this.tbObj.style.fontSize = "9pt";
	this.tbObj.style.borderCollapse = "collapse";
	document.getElementById(config.renderTo).appendChild(this.tbObj);

	this.hd = this.tbObj.insertRow(0);
	for ( var i = 0; i < this.columns.length; i++) {
		if (!this.columns[i].hide) {
			var cell = this.hd.insertCell(i);
			cell.style.backgroundColor = "#EDEEF0";
			cell.valign = "center";
			cell.width = this.columns[i].width || "100";
			cell.innerHTML = this.columns[i].text;
		}
	}
};

justep.doc.InnerUtils.ProgressTable.prototype.appendRow = function(record) {
	var rIdx = this.tbObj.rows.length;
	var r = this.tbObj.insertRow(rIdx);
	r.style.backgroundColor = "#FAFAFA";
	for ( var i = 0; i < this.columns.length; i++) {
		var cell = r.insertCell(i);
		var render = this.columns[i].render;
		var value = record[this.columns[i].name];
		if (render) {
			value = render.call(this, value, record);
		}
		cell.innerHTML = value || '&nbsp;';
		/*
		 * cell.style.borderLeft="1px solid #CCCCCC";
		 * cell.style.borderRight="1px solid #CCCCCC";
		 * cell.style.borderBottom="1px solid #CCCCCC";
		 */
	}
};

justep.doc.InnerUtils.ProgressTable.prototype.loadData = function(dm) {
	if (!dm)
		return;
	this.deleteAllRow();
	this.dm = dm;
	for ( var i = 0; i < this.dm.length; i++) {
		this.appendRow(this.dm[i]);
	}
};

justep.doc.InnerUtils.ProgressTable.prototype.reload = function() {
	this.loadData(this.dm);
};

justep.doc.InnerUtils.ProgressTable.prototype.find = function(fieldName, value) {
	for ( var i = 0; i < this.dm.length; i++) {
		if (this.dm[i][fieldName] == value) {
			return i;
		}
	}
	return -1;
};

justep.doc.InnerUtils.ProgressTable.prototype.setValue = function(idx,
		fieldName, value) {
	var cRow = this.tbObj.rows[idx];
	var cellIdx = -1;
	for ( var i = 0; i < this.columns.length; i++) {
		if (this.columns[i].name == fieldName) {
			var render = this.columns[i].render;
			if (render) {
				value = render.call(this, value);
			}
			cRow.cells[i].innerHTML = value;
			break;
		}
	}
};

justep.doc.InnerUtils.ProgressTable.prototype.deleteAllRow = function() {
	var length = this.tbObj.rows.length;
	for (i = 1; i < length; i++) {
		this.tbObj.deleteRow(1);
	}
	this.dm = [];
};

justep.doc.InnerUtils.ProgressTable.prototype.deleteByField = function(
		fieldName, value) {
	var idx = -1;
	for ( var i = 0; i < this.dm.length; i++) {
		if (this.dm[i][fieldName] == value) {
			idx = i;
			break;
		}
	}
	if (idx != -1) {
		this.tbObj.deleteRow(idx + 1);
		this.dm.splice(idx, 1);
	}
};

justep.doc.InnerUtils.ProgressTable.createCancalButton = function(id) {
	return "<img id="
			+ id
			+ " src='"
			+ justep.Request.convertURL('/UI/system/images/doc/deletefile.gif',
					true)
			+ "' onclick='justep.doc.InnerUtils.ProgressTable.cancal(this.id);' alt='取消上传'/>";
};

justep.doc.InnerUtils.ProgressTable.cancal = function(id) {
	if (justep.doc.InnerUtils.uploadPprogressTable) {
		var uploader = justep.doc.InnerUtils.currentUploader;
		uploader.cancel(id);
		uploader.removeFile(id);
		--uploader.allCount;
		if (uploader.allCount == 0)
			justep.doc.InnerUtils.getUploadProgressDialog().close();
		justep.doc.InnerUtils.uploadPprogressTable.deleteByField("id", id);
	}
};

justep.doc.InnerUtils.compatible = function() {
	_me = justep.doc.InnerUtils;
	// __initMD5Code__
}();
// for npapi interface
function _execOfficeAction(id, param) {
	justep.doc.InnerUtils.execOfficeAction(id, param);
}