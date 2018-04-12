var ntkoEditorDialog = {};
ntkoEditorDialog.noChange = 'W10=';

window.isSaved = false;
window.isCreateVersion = false;
window.onbeforeunload = function() {
	if (!window.isCreateVersion) {
		// 点击关闭按钮时候
		if (!window.isSaved) {
			var data = {
				changes : ntkoEditorDialog.noChange,
				type : "officeAction"
			};
			justep.xbl('attachmentEditor2Receiver').sendData(data);
		}
		return "请检查文件是否已经保存/成文,如果有未保存的数据会丢失的!";
	}
};

$(window).resize(function() {
	if ($.browser.version != "6.0" && $.browser.version != "7.0") {
		$('#TANGER_OCX').width($('#ovParent').width());
		$('#TANGER_OCX').height($('#ovParent').height());
	}
});

var OfficeEditor = function(data) {
	this.OVP = data;
	this.OVP.filename = decodeURI(this.OVP.filename);
	this.OVP.saving = false;
	this.OVP.isModified = false;
	this.OVP.state = (this.OVP.programID != "OpenOffice")
			&& (this.OVP.programID != "Template") ? "new" : "edit";
	this.OVP.showSeal = justep.doc._seal_default_show2 ? true
			: this.OVP.showSeal;
	this.OVP.useNTKO = true;
	$("#fileName").val(this.OVP.filename);
};

OfficeEditor.prototype = {
	init : function() {
		var control = $OV2(NTKO.getInstanceID());
		control.useNTKO = true;
		control.CreateOfficeViewer('100%', '100%');

		$("body").bind("NTKOOnDocumentOpened", function() {
			if (control.DocType < 1 || control.DocType > 7) {
				$("#toolbars1").hide();
			}
			control.IsOpened = true;
			control.TrackRevisions(true);
		});

		if ($.browser.version == "6.0" || $.browser.version == "7.0") {
			$('#toolbars1').css('position', 'static');
			$('#ov').height($('#ov').height() - 55);
		}
		if (this.OVP.programID == "OpenOffice") {
			this.openOffice();
		} else if (this.OVP.programID == "Template") {
			this.openTemplate();
		} else if (this.OVP.programID != "-") {
			this.createOffice();
		}
		if (this.OVP.programID.indexOf('Application') != -1
				|| this.OVP.programID == "Template") {
			$('#docSave').hide();
		}
		if ($.browser.msie && this.OVP.programID == "OpenOffice"
				&& this.OVP.showSeal) {
			// TODO:签章能力，仅在ie环境 ，并且文档服务配置为直连的方式才可以
			this.renderSealArea();
		} else if (!$.browser.msie && this.OVP.showSeal) {
			$('#saveTip').find('span').text('签章能力仅在IE浏览器下支持').end().fadeIn(
					2000, function() {
						$(this).fadeOut(1000, function() {
							$('#saveTip').text('保存成功');
						})
					});
		}
		justep.xbl('attachmentEditor2Receiver').sendData({
			type : "officeLoaded"
		});

	},
	getUrl : function(docPath, fileID, resultID) {
		var u = "";
		if (fileID) {
			u = justep.doc.InnerUtils.getdocServerAction(docPath,
					"/repository/file/cache/office/" + fileID);
		} else if (resultID) {
			u = justep.doc.InnerUtils.getdocServerAction(docPath,
					"/repository/resultInfo/" + resultID);
		} else {
			u = justep.doc.InnerUtils.getdocServerAction(docPath,
					"/repository/file/cache/office/new");
		}
		if (u.indexOf("/UI2/") >=0)
			u = u.replace("/UI2/", "/UI/");
//		this.docUrl = u.indexOf(window.location.protocol) < 1 ? u
//				: window.location.protocol + "//" + window.location.host + u;
		return u;
	},

	_request : function(url, data, callback, error) {
		$.ajaxFileUpload({
			async : false,
			url : url, // 用于文件上传的服务器端请求地址
			dataType : 'text', // 返回值类型json、xml、html
			data : data,
			success : callback,
			error : error
		});
	},

	openOffice : function() {
		this.OVP.isModified = !(this.OVP.cacheName == "" || OV2
				.isClear(this.OVP.cacheName));
		var OVObj = $OV2(NTKO.getInstanceID());
		OVObj.FileSave = false;
		var param = {
			EDA_GETSTREAMDATA : "EDA_YES",
			FileExt : this.OVP.fileExt
		};
		if (this.OVP.isModified) {
			var fileID = this.OVP.fileID;
			var partType = "content";
			if (this.OVP.revisionCacheName) {
				fileID = this.OVP.revisionCacheName;
				partType = "revision";
			} else if (this.OVP.cacheName) {
				fileID = this.OVP.cacheName;
			}
			param = $.extend(param, {
				FileID : fileID,
				PartType : partType
			});

		} else {
			param = $.extend(param, {
				FileID : this.OVP.fileID
			});
			// TODO:_word_all_history2 不推荐采用全局变量 这个特性暂时没人用,需要重构成组件属性
			if (justep.doc._word_all_history2) {
				var fileinfo = justep.doc.InnerUtils.queryDocByFileId(
						this.OVP.host, this.OVP.fileID, this.OVP.filename);
				// TODO: part_3 逻辑已经过时
				param.PartType = !fileinfo.parts.part_3 ? "content"
						: "revision";
			}
		}
		var me = this, url = me.getUrl(me.OVP.host) + "&useNTKO=true";
		var result = me._request(url, param, function(data) {
			var downlaodURL = justep.Request
					.convertURL("/UI/base/common/downloadTmpFile.j");
			downlaodURL += "&fileId=" + data + "&$fileExt=" + me.OVP.fileExt;
			var start = new Date();
			OVObj.BeginOpenFromURL(downlaodURL);
		}, function(xhr, status, e) {
			throw justep.Error.create("下载文件失败:" + e);
		});

	},
	openTemplate : function() {
		var OVObj = $OV2(NTKO.getInstanceID());
		// 从模版新建
		OVObj.HttpInit();
		OVObj.HttpAddPostString("FileID", this.OVP.templateID);
		OVObj.HttpAddPostString("FileExt", this.OVP.templateExt);
		OVObj.HttpOpenFileFromStream(this.getUrl(this.OVP.templateHost), OVObj
				.GetProgIDByDocType(this.OVP.templateExt));
		var errorCode = OVObj.GetErrorCode();
		if (errorCode != 0) {
			alert(new justep.Message(justep.Message.JUSTEP232092).getMessage());
		}
		if (OVObj.IsWordOpened()) {
			OVObj.WordRevisionInit(true, this.OVP.userName,
					this.OVP.userInitials);
		}
	},
	renderSealArea : function() {
		$('#toogleSeal').show();
		$('#toogleSeal').toggle(function() {
			$('#ovParent').width('80%');
			$('#slider').show();
		}, function() {
			$('#ovParent').width('100%');
			$('#slider').hide();
		});
		var self = this;
		// TODO: 签章权限应该走数据权限,所以这块从文档中心读取权限的代码不抽取到docUtils.js中
		function getDocAuthList() {
			var docAuthList = justep.doc.InnerUtils.getDocAuthList();
			var docAuthListArr = {};
			for ( var deptFID in docAuthList) {
				var authItems = docAuthList[deptFID];
				var deptAuth = new Array();
				var i = 0;
				for ( var authId in authItems) {
					var authItem = authItems[authId];
					deptAuth[i] = {
						"authId" : authId,
						"sDocPath" : authItem.sDocPath,
						"sAuthorizeeFID" : authItem.sAuthorizeeFID,
						"sAccess" : authItem.sAccess
					};
					i++;
				}
				docAuthListArr[deptFID] = deptAuth;
			}
			self.docAuthListArr = docAuthListArr;
		}

		function getAccessBysDocPath(docFullPath) {
			var access = 1;
			for ( var item in self.docAuthListArr) {
				var docAccess = null;
				while (docFullPath) {
					$.each(self.docAuthListArr[item], function(n, value) {
						if (value.sDocPath == docFullPath) {
							docAccess = value.sAccess;
							return false;
						}
					});
					if (docAccess != null)
						break;
					if ("/" == docFullPath) {
						docAccess = 1;
						break;
					}
					docFullPath = docFullPath.substring(0, docFullPath
							.lastIndexOf("/"));
					if ("" == docFullPath)
						docFullPath = "/";
				}
				if (docAccess > access)
					access = docAccess;
			}
			return access;
		}

		var sealNodeID = justep.doc._seal_doc_node_sid2;
		if (!sealNodeID)
			return;
		var resRow = justep.doc.InnerUtils.queryDoc("", "", [ "sFileID",
				"sDocName", "sDocPath" ], "", "sParentID='" + sealNodeID + "'");
		var sealJSON = [];
		for ( var i = 0; i < resRow.length; i++) {
			if (self.docAuthListArr == undefined) {
				getDocAuthList();
			}
			var rowId = resRow[i].userdata.id.value;
			var sDocPath = resRow[i].sDocPath.value;
			var imageAccess = getAccessBysDocPath(sDocPath + '/' + rowId, -1);
			if (imageAccess % 8 < 4) {
				continue;
			}
			var sFileID = resRow[i].sFileID.value;
			var sDocName = resRow[i].sDocName.value;
			var resCell_t = sDocName.replace(
					$OV2(NTKO.getInstanceID()).resCellRegExp_t, "");
			var resCell_f = JSON.stringify({
				sDocPath : sDocPath,
				sFileID : sFileID,
				sDocName : sDocName
			});
			sealJSON.push({
				picName : resCell_t,
				picInfo : resCell_f
			});
		}

		if (resRow.length > 0) {
			$("#sealsDiv").show();
			var sealListEle = $('<ul></ul>').attr('id', 'sealList');
			var self = this;
			for ( var i in sealJSON) {
				$('<li></li>').append(
						$('<span></span>').bind('click', function() {
							self.insertSeal(sealJSON[i].picInfo);
						}).text(sealJSON[i].picName)).appendTo(sealListEle);
			}
			sealListEle.appendTo('#sealsDiv');
		}
	},
	insertSeal : function(params) {
		params = JSON.parse(params);
		var sDocPath = params.sDocPath;
		var sFileID = params.sFileID;
		var docServer = justep.doc.InnerUtils.getdocServerAction(sDocPath,
				'/repository/file/view/' + sFileID + '/last/content');
		if (docServer.indexOf('http') != 0) {
			docServer = window.location.protocol + "//" + window.location.host
					+ docServer;
		}
		try {
			var shape = $OV2(NTKO.getInstanceID()).getApplication().Selection.InlineShapes
					.AddPicture(docServer, false, true);
			if (shape) {
				var oShape = shape.ConvertToShape();
				oShape.WrapFormat.Type = 5;
				oShape.ZOrder(4);
				oShape.PictureFormat.TransparentBackground = true;
				oShape.PictureFormat.TransparencyColor = 0xFFFFFF;
			}
		} catch (e) {
		}
	},
	createOffice : function() {
		// 新建空白office文件
		var OVObj = $OV2(NTKO.getInstanceID());
		OVObj.CreateDoc(this.OVP.programID);
		if (OVObj.IsWordOpened()) {
			OVObj.WordRevisionInit(true, this.OVP.userName,
					this.OVP.userInitials);
		}
	},

	_setUploadForm : function(action, options) {
		var form = $("#uploadForm").attr("action", action).empty();
		// form.append("<input type='file' id='EDITFILE' name='EDITFILE'/>");
		for ( var n in options) {
			form.append("<input name='" + n + "' type='hidden' value='"
					+ options[n] + "'/>");
		}
	},

	_doAferSaveToServer : function(OVObj, filename, resultID, createVersion) {
		// 2. /repository/resultInfo/resultID
		try {
			var me = this, url = me.getUrl(me.OVP.host, '', resultID);
			var HTTPResult = OVObj.GetHttpResult(url);
			HTTPResult.filename = filename;
			HTTPResult.changes = "";

			if (OVObj.IsWordOpened()) {
				HTTPResult.changes = OV2.Base64.encode(OVObj
						.WordGetRevisionJSON());
				if (createVersion) {
					OVObj.ActiveDocument.AcceptAllRevisions();
				}
			}

			// 3.上传修改记录
			url = me.getUrl(me.OVP.host);
			resultID = justep.Utils.randomString();
			var param = {
				fileID : (me.OVP.fileID ? me.OVP.fileID : ""),
				cacheName : HTTPResult.cacheName,
				partType : "content",
				resultID : resultID,
				changes : HTTPResult.change
			};
			me._setUploadForm(url, param);

			$("body")
					.unbind("NTKOOnSaveToUrl")
					.bind(
							"NTKOOnSaveToUrl",
							function() {
								$("body").unbind("NTKOOnSaveToUrl");
								// 4. /repository/resultInfo/resultID
								try {
									url = me.getUrl(me.OVP.host, '', resultID);
									var revisionHTTPResult = OVObj
											.GetHttpResult(url);
									revisionHTTPResult.revisionCacheName = HTTPResult.cacheName;
									revisionHTTPResult.filename = HTTPResult.filename;
									revisionHTTPResult.changes = HTTPResult.changes;
									HTTPResult = revisionHTTPResult;
									HTTPResult.isReadOnly = false;
									HTTPResult.createVersion = createVersion;
									HTTPResult.type = "officeAction";
									justep.xbl('attachmentEditor2Receiver')
											.sendData(HTTPResult);
									me.OVP.saving = false;
									if (createVersion) {
										window.isCreateVersion = true;
										window.close();
									} else {
										window.isSaved = true;
										if (!NTKO.chrome) {
											// chrome下plugin的事件中不能显示任何浏览器信息，包括异常
											$('#saveTip').fadeIn(2000,
													function() {
														$(me).fadeOut(1000);
													});
										}
									}
								} catch (e) {
									throw justep.Error.create("更新文档中心失败:" + e);
								}
							});
			OVObj.SaveToURL(url, "trackdata", "", filename, 0);
		} catch (e) {
			throw justep.Error.create("保存文件失败:" + e);
		}

	},

	saveToServer : function(createVersion) {
		var OVObj = $OV2(NTKO.getInstanceID()), me = this;
		if (this.OVP.saving == false && OVObj.IsDocOpened()
				&& !OVObj.ActiveDocument.Saved) {
			var docExt = me.OVP.fileExt, filename = $('#fileName').val()
					+ docExt, resultID = justep.Utils.randomString();

			// 1.上传当前文档
			var url = me.getUrl(me.OVP.host);
			var param = {
				fileID : (me.OVP.fileID ? me.OVP.fileID : ""),
				cacheName : (me.OVP.cacheName ? me.OVP.cacheName : ""),
				partType : "revision",
				resultID : resultID
			};
			me._setUploadForm(url, param);
			$("body").unbind("NTKOOnSaveToUrl").bind(
					"NTKOOnSaveToUrl",
					function() {
						$("body").unbind("NTKOOnSaveToUrl");
						me._doAferSaveToServer(OVObj, filename, resultID,
								createVersion);
					});
			OVObj.SaveToURL(url, "trackdata", "", filename, 0);
		} else {
			window.isSaved = true;
			$('#saveTip').fadeIn(2000, function() {
				$(this).fadeOut(1000);
			});
		}
	}
};
/**
 * 接管异常，防止异常提示框被office控件挡住
 */
onerror = pageErrorHandler;
function pageErrorHandler(msg, url, line, stack) {
	msg = ('string' == typeof (msg) && msg) ? msg
			.replace(/Uncaught Error:/, '') : '未知错误！';
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
	alert(new justep.Message(justep.Message.JUSTEP232093, detail).getMessage());
	return false;
}

ntkoEditorDialog.docSaveClick = function(event) {
	ntkoEditorDialog.officeEditor.saveToServer(false);
};

ntkoEditorDialog.docCreateVersionClick = function(event) {
	// ntkoEditorDialog.officeEditor.saveToServer(true);
};

ntkoEditorDialog.attachmentEditor2ReceiverReceive = function(event) {
	var data = JSON.parse(event.data);
	if (data.type == "officeLoaded") {
		var func = data.func;
		var params = data.params;
		var officeEditor = ntkoEditorDialog.officeEditor;
		var execFunc = new Function("params", "officeEditor", "return ("
				+ func.toString() + ")")(params, officeEditor);
		execFunc.call(window);
	} else {
		var officeEditor = new OfficeEditor(data);
		ntkoEditorDialog.officeEditor = officeEditor;
		officeEditor.init();
		$('body').trigger("officeOpened");
	}
};

ntkoEditorDialog.modelLoad = function(event) {
	if (NTKO.isValid) {
		NTKO.init({
			FileNew : true
		});
	}
};
