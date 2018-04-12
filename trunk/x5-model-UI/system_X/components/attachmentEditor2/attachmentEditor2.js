justep.AttachmentEditor2 = function() {
};
justep.AttachmentEditor2.prototype = {
	// 组件初始化
	initComponent : function() {
		this.id = this.getAttribute("id");
		this.container = this.id + "_container";
		this.containerHead = this.id + "_containerHead";
		this.containerBody = this.id + "_containerBody";
		this.uploaderButton = this.id + "_uploaderButton";
		this.templateButton = this.id + "_templateButton";
		this.enableLog = false;
		this.replaceing = false;
		// 使用水印
		this.useWaterMark = false;//this.getAttribute("useWaterMark") == "true";
		this.useWaterMarkCallBack=null;
		
		this.displayStyle = this.getAttribute("display-style", "list");
		var displayButtonsStr = this
				.getAttribute("display-buttons",
						"upload:true;template:true;download:true;edit:true;delete:true;history:true;");
		//如果使用水印 增加替换按钮
		//if (this.useWaterMark)
		displayButtonsStr = displayButtonsStr +"replace:true;";
		var displayButtons = displayButtonsStr.split(";");
		this.buttons = {};
		for ( var i = 0; i < displayButtons.length; i++) {
			var button = displayButtons[i].split(":");
			this.buttons[jQuery.trim(button[0])] = "false" == jQuery
					.trim(button[1]) ? false : true;
		}

		/* 兼容之前权限直接写权限的数值 */
		this.access = 1799;
		var domAccess = this.getAttribute("access");
		if (domAccess) {
			this.access = justep.doc.InnerUtils.accessEnum[domAccess] ? justep.doc.InnerUtils.accessEnum[domAccess]
					: domAccess;
		}
		this.limitSize = this.getAttribute("limit-size");
		this.limit = parseInt(this.getAttribute("limit", -1));
		var defaultRootPath = "/defaultDocNameSpace";
		this.rootPath = this.getAttribute("root-path", defaultRootPath);
		this.runtime = this.getAttribute("runtime", "flash");
		this.subPath = this.getAttribute("sub-path", "");
		this.process = justep.Context.getCurrentProcess();
		this.activity = justep.Context.getCurrentActivity();
		this.extensionFilter = this.getAttribute("extension-filter");

		this.relationXPath = this.getAttribute("ref");
		this.bindDataId = this.relationXPath.match(/data\('(\S*)\'\)/i)[1];
		this.bindData = justep.xbl(this.bindDataId);
		this.relation = this.relationXPath.match(/data\('\S*\'\)\/(\S*)/)[1];
		this.autoLoad = "false" == this.getAttribute("auto-load") ? false
				: true;
		this.keyId = this.getAttribute("keyId");
		// TODO this.data
		this.autoCreateVersion = ("true" == this
				.getAttribute("autoCreateVersion") ? true : false);
		this.changeLog = {
			items : [],
			autoCreateVersion : this.autoCreateVersion,
			createVersionLogs : [],
			"operate" : "",
			"url" : "",
			process : this.process,
			activity : this.activity
		};
		var currentDeptName = justep.Context.getCurrentDeptName();
		this.userName = justep.Context.getCurrentPersonName()
				+ (currentDeptName ? ('(' + currentDeptName + ')') : '');
		this.userInitials = justep.Context.getCurrentPersonName();
		// 使用NTKO
		this.useNTKO = this.getAttribute("useNTKO") == "true";
		if (this.useNTKO)
			this.setOfficeEditorUrl("/UI/system/service/doc/ntko/ntkoEditorDialog.w");
		dhtmlxEventable(this);
		this.addEvents();
	},

	initContent : function() {
		if (!this.inited) {
			var self = this;
			if (self.autoLoad) {
				if (justep.Browser.IE6) {
					setTimeout(function() {
						self.refresh();
					}, 2000);
				} else {
					self.refresh();
				}
			}
			this.inited = true;
		}
	},

	refresh : function() {
		this.getDocLinkDefine();
		this._attachStoreEvent();
		this.refreshData();
	},
	refreshData : function() {
		if (this.bindData) {
			if (this.bindData.getCount() > 0) {
				this.loadData();
			}
		}
	},
	_attachStoreEvent : function() {
		var data = this.bindData;
		if (data && (!this.eventAttached)) {
			var dataValueChangedCallback = function(event) {
				if (event.column == this.relation || event.column == undefined) {
					this.dataValueChanged();
				}
			};

			data.attachEvent(justep.XData.EVENT_INDEX_CHANGED,
					dataValueChangedCallback, this);
			data.attachEvent(justep.XData.EVENT_DATA_CHANGED,
					dataValueChangedCallback, this);

			var dataRefreshCallback = function(event) {
				this.dataValueChanged();
				this._refreshChangeLog();
			};
			data.attachEvent(justep.XData.EVENT_REFRESHPAGEDATA_AFTER,
					dataRefreshCallback, this);
			data.attachEvent(justep.XData.EVENT_REFRESHDATA_AFTER,
					dataRefreshCallback, this);

			var saveCallback = function(event) {
				this.save();
			};
			data.attachEvent(justep.XData.EVENT_SAVEDATA_BEFORE, saveCallback,
					this);

			var saveAfterCallback = function(event) {
				justep.doc.InnerUtils.saveDoc(this.changeLog);
				this._refreshChangeLog();
			};
			data.attachEvent(justep.XData.EVENT_SAVEDATA_AFTER,
					saveAfterCallback, this);

			this.eventAttached = true;
		}
	},

	dataValueChanged : function() {
		this.render();
	},

	// 数据部分
	/**
	 * loadData 只在autoload的时候执行一次 或者在调用refresh的时候执行一次
	 */
	loadData : function() {
		// this._refreshChangeLog();
		if (this.checkEvent("onLoadData")) {
			var eventData = {
				'cancel' : false,
				'source' : this
			};
			this.callEvent("onLoadData", [ eventData ]);
			if (eventData.cancel) {
				return false;
			}
		}
		this.render();
	},

	// 页面展现部分
	render : function() {
		if (this.attInnerContainerEle) {
			this.attInnerContainerEle.html("");
		}
		this.renderContainer();
		this.renderContent();

	},

	//绘制页面
	renderContainer : function() {
		var self = this;
		if ($('#' + this.container).length == 0) {
			var containerEle = $('<div></div>').attr('id', this.container)
					.addClass('att_container');
			var containerHeadEle = $('<div></div>').addClass('att_head').attr(
					'id', this.containerHead);
			if (this.buttons.upload) {
				var uploadEle = $('<span></span>').addClass('att_head_btn')
						.addClass('att_upload_btn').attr('id',
								this.uploaderButton).text(
								new justep.Message(justep.Message.JUSTEP232501)
										.getMessage());
				// TODO:有可能在初始化附件的时候没有uploadDiv
				if (this.access % 512 < 256) {
					uploadEle.addClass('att_btn_dis');
				}
				uploadEle.appendTo(containerHeadEle);
			}
			if (this.buttons.template) {
				var teplEle = $('<a></a>').addClass('att_head_btn').attr('id',
						this.templateButton)
						.attr('href', 'javascript:void(0);').text(
								new justep.Message(justep.Message.JUSTEP232500)
										.getMessage());
				if (this.access % 512 >= 256) {
					teplEle.bind('click', function() {
						self.newFormTemplate();
					});
				} else {
					teplEle.addClass('att_btn_dis');
				}
				teplEle.appendTo(containerHeadEle);
			}
			containerHeadEle.appendTo(containerEle);
			var innerContainerEle = $('<table><tbody></tbody></table>');
			var attListTheadEle = $('<thead></thead>');
			$('<th></th>').addClass('att_name_col').appendTo(attListTheadEle);
			$('<th></th>').addClass('att_size_col').appendTo(attListTheadEle);
			$('<th></th>').addClass('att_person_col').appendTo(attListTheadEle);
			$('<th></th>').addClass('att_time_col').appendTo(attListTheadEle);
			if (this.buttons.edit) {
				$('<th></th>').addClass('att_edit_col').appendTo(
						attListTheadEle);
			}
			if (this.buttons.download) {
				$('<th></th>').addClass('att_down_col').appendTo(
						attListTheadEle);
			}
			if (this.buttons["delete"]) {
				$('<th></th>').addClass('att_del_col')
						.appendTo(attListTheadEle);
			}
			if (this.buttons.history) {
				$('<th></th>').addClass('att_his_col')
						.appendTo(attListTheadEle);
			}
			//增加替换按钮
			/*if (this.buttons["replace"]) {
				$('<th></th>').addClass('att_del_col')
						.appendTo(attListTheadEle);
			}*/
			
			attListTheadEle.prependTo(innerContainerEle);

			var containerBodyEle = $('<div></div>').attr("id",
					this.containerBody).addClass('att_body');
			$('<div></div>').addClass('att_scroll_area').append(
					innerContainerEle).appendTo(containerBodyEle);
			containerBodyEle.appendTo(containerEle);
			containerEle.appendTo('#' + this.id);
			if (this.buttons.upload) {
				if (justep.Browser.IE6) {
					setTimeout(function() {
						self.initUploader.call(self);
					}, 5);
				} else {
					this.initUploader();
				}

			}
			this.containerEle = $('#' + this.container);
			this.containerHeadEle = $('#' + this.containerHead);
			this.containerBodyEle = $('#' + this.containerBody);
			this.attInnerContainerEle = this.containerBodyEle.find('tbody');

		} else {
			if (this.buttons.upload) {
				if (this.access % 512 < 256) {
					$('#' + this.uploaderButton).addClass('att_btn_dis');
					if (this.runtime == "flash") {
						this.uploader.disable();
					}
				} else {
					$('#' + this.uploaderButton).removeClass('att_btn_dis');
					if (this.runtime == "flash") {
						this.uploader.enable();
					}
				}
			}
			if (this.buttons.template) {
				var teplEle = $('#' + this.templateButton);
				if (this.access % 512 < 256) {
					teplEle.addClass('att_btn_dis');
				} else {
					teplEle.removeClass('att_btn_dis');
				}
			}
		}
		if (this.checkEvent("onRender")) {
			var eventData = {
				'element' : this.containerEle,
				'type' : 'renderConatiner',
				'source' : this
			};
			this.callEvent("onRender", [ eventData ]);
		}
	},

	renderContent : function() {
		var value = this.bindData.getValue(this.relation);
		if (value) {
			var data = [];
			try {
				data = JSON.parse(value);
			} catch (e) {
				this.log("绑定的数据解析失败[value:" + value + "]", e);
				data = [];
			}
			for ( var i = 0; i < data.length; i++) {
				this.renderOne(value, data[i], i);
				if (i + 1 == this.limit) {
					break;
				}
			}
			/**
			 * 根据limit调整展现
			 */
			if (this.limit != -1 && data.length >= this.limit) {
				this.containerBodyEle.removeClass('att_body').addClass(
						'att_body_limited');
				this.containerHeadEle.removeClass('att_head').addClass(
						'att_head_limited');
			} else {
				this.containerBodyEle.removeClass('att_body_limited').addClass(
						'att_body');
				this.containerHeadEle.removeClass('att_head_limited').addClass(
						'att_head');
			}

			this.getScrollArea().scrollTop(9999);
		}
	},

	//绘制附件信息
	renderOne : function(datas, data, i) {
		var isOdd = i % 2 == 0 ? true : false;
		var self = this;
		var docID = data.docID;
		var item = self.getDataByID(docID);
		var attRowEle = $('<tr></tr>').addClass('att_body_row').addClass(
				isOdd ? 'att_body_row_odd' : 'att_body_row_ev');
		
		var browseDocFn = (this.access % 4 >= 2 && item.fileID != "") ? function() {
			self.browseDoc(datas, docID, item.docName, item.fileID);
		}:function(){};
		if ("docName") {
			var displayEle = $('<span></span>').addClass(
					'att_body_btn att_name_btn').attr('name',
					this.id + '_docDisplay').text(data.docName);
			var docNameTD = $('<td></td>').addClass('att_body_btn');
			if (browseDocFn) {
				docNameTD.bind('click', browseDocFn);
			} else {
				displayEle.addClass('att_btn_dis');
			}
			docNameTD.append(displayEle).appendTo(attRowEle);
		}
		if ("docSize") {
			$('<td></td>').append(
					$('<span></span>').addClass('att_body_btn').addClass(
							'att_size_btn').attr('name', this.id + '_docSize')
							.text(justep.doc.InnerUtils.formatSize(data.size)))
					.appendTo(attRowEle).bind("click",browseDocFn);
		}
		if ("docPerson") {
			var person = "";
			if(data.person)
				person = data.person;
			$('<td></td>').append(
					$('<span></span>').addClass('att_body_btn').addClass(
							'att_person_btn').attr('name', this.id + '_docPerson')
							.text(person))
					.appendTo(attRowEle).bind("click",browseDocFn);
			
		}
		if ("docTime") {
			var time = "";
			if(data.time)
				time = justep.Date.toString(justep.Date.fromString(data.time, justep.Date.STANDART_FORMAT), justep.Date.DEFAULT_FORMAT);
			//else
				//time = justep.Date.toString(justep.System.datetime(), justep.Date.DEFAULT_FORMAT);
			$('<td></td>').append(
					$('<span></span>').addClass('att_body_btn').addClass(
							'att_time_btn').attr('name', this.id + '_docTime').text(time))
					.appendTo(attRowEle).bind("click",browseDocFn);
		}
		
		if (this.buttons.edit) {
			var editEle = $('<span></span>').attr('id',
					this.id + '_' + docID + '_docEdit').addClass(
					'att_body_btn att_edit_btn').attr('name',
					this.id + '_docEdit').text(
					new justep.Message(justep.Message.JUSTEP232504)
							.getMessage());
			if (this.access % 1024 >= 512) {
				editEle.bind('click', function() {
					self
							.editDoc(docID, item.fileID, item.docName,
									item.docPath);
				});
			} else {
				editEle.addClass('att_btn_dis');
			}
			$('<td></td>').append(editEle).appendTo(attRowEle);
		}
		if (this.buttons.download) {
			var downEle = $('<span></span>').addClass('att_body_btn').addClass(
					'att_down_btn').attr('name', this.id + '_docDown').text(
					new justep.Message(justep.Message.JUSTEP232502)
							.getMessage());
			if (this.access % 8 >= 4 && item.fileID != "") {
				downEle.bind('click', function() {
					if (item.outUrl){
						self.downloadDoc(docID, item.fileID,item.outUrl);	
					}
					else
					    self.downloadDoc(docID, item.fileID,null);
				});
			} else {
				downEle.addClass('att_btn_dis');
			}
			$('<td></td>').append(downEle).appendTo(attRowEle);
		}
		if (this.buttons["delete"]) {
			var deleteEle = $('<span></span>').addClass('att_body_btn')
					.addClass('att_del_btn').attr('name', this.id + '_docDel')
					.text(
							new justep.Message(justep.Message.JUSTEP232503)
									.getMessage());
			if (this.access % 2048 >= 1024) {
				deleteEle.bind('click', function() {
					self.deleteDoc(docID, item.docName);
				});
			} else {
				deleteEle.addClass('att_btn_dis');
			}
			$('<td></td>').append(deleteEle).appendTo(attRowEle);
		}
		if (this.buttons.history) {
			var hisEle = $('<span></span>').addClass('att_body_btn').addClass(
					'att_his_btn').attr('name', this.id + '_docHis').attr(
					'href', 'javascript:void(0);').text(
					new justep.Message(justep.Message.JUSTEP232505)
							.getMessage());
			if (this.access % 1024 >= 512) {
				hisEle.bind('click', function() {
					self.openDocHistoryDialog(docID, item.fileID);
				});
			} else {
				hisEle.addClass('att_btn_dis');
			}
			$('<td></td>').append(hisEle).appendTo(attRowEle);
		}
		//增加替换按钮
		/*if (this.buttons["replace"]) {
			var replaceEle = $('<span></span>').addClass('att_body_btn').addClass(
					'att_his_btn').attr('name', this.id + '_docReplace').attr(
					'href', 'javascript:void(0);').text('替换');
			if (this.access % 1024 >= 512) {
				replaceEle.bind('click', function() {
					self.replaceDoc(docID, item);
				});
			} else {
				replaceEle.addClass('att_btn_dis');
			}
			$('<td></td>').append(replaceEle).appendTo(attRowEle);
		}*/
		if (this.checkEvent("onRender")) {
			var eventData = {
				'element' : attRowEle,
				'type' : 'renderRow',
				'source' : this,
				'data' : data
			};
			this.callEvent("onRender", [ eventData ]);
		}
		attRowEle.appendTo(this.attInnerContainerEle);

	},

	// 附件操作逻辑部分
	uploadDoc : function(docName, kind, size, cacheName, revisionCacheName,
			commentFileContent) {
		if(this.useWaterMark){
			var ext = docName.substring(docName.lastIndexOf("."));
			docName = docName.replace(ext,".pdf");
		}
		var docID = (new justep.UUID()).valueOf();
		var billID = this.bindData.getCurrentRowId();
		if (!this.docPath) {
			this.getDocPath(billID);
		}
		if (!this.parentID) {
			this.docPath = this.rootPath;
			this.parentID = this.docPath.substring(this.docPath
					.lastIndexOf("/") + 1);
		}
		if (typeof revisionCacheName == "undefined") {
			revisionCacheName = "";
		}
		if (typeof commentFileContent == "undefined") {
			commentFileContent = "";
		}
		justep.doc.InnerUtils.addChangeLog(this.changeLog, "new", [ docID, "0",
				"", "", docName, kind, size, this.parentID, this.docPath,
				this.docDisplayPath, "", "", "", "", "" ], [ "attach",
				cacheName, revisionCacheName, commentFileContent ], billID);
		try {
			this.setValue("new", docID, docName, size, this.docPath);

			//删除原来的docId
			if(this.uploader._replaceDocId !=''){
				this.setValue("delete", this.uploader._replaceDocId );
				var items = this.changeLog.items;
				for ( var item in items) {
					if (items[item].doc_id == this.uploader._replaceDocId) {
						this.changeLog.items.splice(item, 1);
					}
				}
			}
			this.uploader._replaceDocId = '';
			this.uploader._settings.data.wmFileId = '';
		} catch (e) {
			// flash 会吃异常，所以索性alert出来
			alert(new justep.Message(justep.Message.JUSTEP232054).getMessage());
			throw e;
		}
	},

	updateDoc : function(docID, fileID, docPath, docName, kind, size,
			cacheName, revisionCacheName, commentFileContent, createVersion) {
		var node = justep.doc.InnerUtils.evalChangeLog(this.changeLog, docID);
		if (node) {
			var version = node.version;
			var parentID = node.parent_id;
			var displayPath = node.doc_display_path;
			var docVersionID = node.doc_version_id;
			var description = node.description;
			var classification = node.classification;
			var keywords = node.keywords;
			var finishTime = node.finish_time;
			var serialNumber = node.serial_number;
			justep.doc.InnerUtils.modifyChangeLog(node, [ version, fileID,
					docVersionID, docName, kind, size, parentID, docPath,
					displayPath, description, classification, keywords,
					finishTime, serialNumber ], [ "attach", cacheName,
					revisionCacheName, commentFileContent ]);
		} else {
			var row = justep.doc.InnerUtils.queryDoc(docID, undefined, [
					"version", "sParentID", "sDocDisplayPath",
					"sDocLiveVersionID", "sDescription", "sClassification",
					"sKeywords", "sFinishTime", "sDocSerialNumber" ],
					undefined, undefined, "single");
			var version = row.version.value;
			var parentID = row.sParentID.value;
			var displayPath = row.sDocDisplayPath.value;
			var docVersionID = row.sDocLiveVersionID.value;
			var description = row.sDescription.value;
			var classification = row.sClassification.value;
			var keywords = row.sKeywords.value;
			var finishTime = !row.sFinishTime.value ? ""
					: row.sFinishTime.value;
			var serialNumber = row.sDocSerialNumber.value;
			var billID = this.bindData.getCurrentRowId();
			justep.doc.InnerUtils.addChangeLog(this.changeLog, "edit", [ docID,
					version, fileID, docVersionID, docName, kind, size,
					parentID, docPath, displayPath, description,
					classification, keywords, finishTime, serialNumber ],
					[ "attach", cacheName, revisionCacheName,
							commentFileContent ], billID);
		}

		this.setValue("edit", docID, docName, size);
		if (fileID) {
			justep.doc.InnerUtils.commitDocCache(docID, this.changeLog);
		}
		if (createVersion && fileID) {
			this.createVersion(docID, fileID, docName, docPath);
		}
	},

	/**
	 * 删除对应记录，文档服务器不删除
	 */
	deleteDoc : function(docID, docName) {
		if(this.bindData.getReadonly()) return;
		if (this.checkEvent("onDeleteClick")) {
			var eventData = {
				'cancel' : false,
				'data' : {
					'docID' : docID,
					'docName' : docName
				},
				'source' : this
			};
			this.callEvent("onDeleteClick", [ eventData ]);
			if (eventData.cancel)
				return;
		}
		var dialog = new justep.System.showMessage(), me = this;
		dialog.open({
			msg : new justep.Message(justep.Message.JUSTEP232506, docName)
					.getMessage(),
			img : 'question',
			title : '确认信息',
			type : 2,
			callback : function(e) {
				if (e.status == "yes") {
					me.setValue("delete", docID);
					var items = me.changeLog.items;
					for ( var item in items) {
						if (items[item].doc_id == docID) {
							me.changeLog.items.splice(item, 1);
						}
					}
				}
			}
		});
	},
	
	/*
	 * 替换文档 
	 */
	replaceDoc: function(docID,item){
		var dialog = new justep.System.showMessage(), me = this;
		dialog.open({
			msg : '确认要替换文档['+item.docName+']吗？ ',
			img : 'question',
			title : '确认信息',
			type : 2,
			callback : function(e) {
				if (e.status == "yes") {
					me.replaceing = true;
					try{
						me.uploader.forceCreateInput();
						me.uploader._replaceDocId = docID;
						me.uploader._settings.data.wmFileId = item.wmFileId;
						me.uploader._input.click();
					}catch(err){
						
					}
					me.replaceing = false;
				}
			}
		});
	},

	editMsDoc : function(docID, fileID, docName, docPath) {
		var OVP = {};
		OVP.host = this.rootPath;
		OVP.userName = this.userName;
		OVP.userInitials = this.userInitials;
		OVP.programID = "OpenOffice";
		OVP.showField = false;
		OVP.fileID = fileID;
		OVP.filename = docName.substr(0, docName.lastIndexOf('.'));
		OVP.fileExt = String(/\.[^\.]+$/.exec(docName));
		OVP.isPrint = true;
		OVP.useNTKO = this.useNTKO;
		var currentNode = justep.doc.InnerUtils.evalChangeLog(this.changeLog,
				docID);
		if (currentNode != null) {
			var node;
			OVP.cacheName = !currentNode.cache_name ? ""
					: currentNode.cache_name;
			OVP.revisionCacheName = !currentNode.revision_cache_name ? ""
					: currentNode.revision_cache_name;
		} else if (fileID) {
			var cacheInfo = justep.doc.InnerUtils.queryDocCache(docID);
			if (cacheInfo.isLockSuccess == "success"
					|| cacheInfo.isLockSuccess == "noNeedLock") {
				OVP.cacheName = cacheInfo.sCacheName;
				OVP.revisionCacheName = cacheInfo.sRevisionCacheName;
				this.lastOperation = cacheInfo.isLockSuccess;
			} else if (cacheInfo.isLockSuccess == "failure") {
				alert(new justep.Message(justep.Message.JUSTEP232055)
						.getMessage());
				return;
			}
		}

		var callback = function(event) {
			var data = event.data;
			if (data.type == "officeAction") {
				if (data.changes != 'W10=') {
					this.updateDoc(docID, fileID, docPath, data.filename,
							data.mediatype, data.size, data.cacheName,
							data.revisionCacheName, data.changes,
							data.createVersion);
				} else if (data.createVersion) {
					this.createVersion(docID, fileID, data.filename, docPath);
				} else {
					var currentNode = justep.doc.InnerUtils.evalChangeLog(
							this.changeLog, docID);
					if (currentNode == null && this.lastOperation == "success") {
						justep.doc.InnerUtils.unLockDoc(docID);
					}
				}
			} else if (data.type == "officeLoaded") {
				if (this.checkEvent("onOfficeLoaded")) {
					var self = this;
					var officeEditorContext = {};
					officeEditorContext.execute = function(func, params) {
						var execPart = {
							func : func.toString(),
							params : params,
							type : "officeLoaded"
						}
						var oldData = self.officeEditor.sendData;
						self.officeEditor.sendData = JSON.stringify(execPart);
						self.officeEditor.sendToWindow(execPart);
						self.officeEditor.sendData = oldData;
					};
					var eventData = {
						'source' : this,
						'officeEditorContext' : officeEditorContext
					};
					this.callEvent("onOfficeLoaded", [ eventData ]);
				}
			}
		};
		this.openOfficeEditor(callback, OVP);
	},

	openOfficeEditor : function(callback, OVP) {
		if (this.checkEvent("onOpenOfficeEditor")) {
			var eventData = {
				'data' : OVP,
				'source' : this
			};
			this.callEvent("onOpenOfficeEditor", [ eventData ]);
		}
		justep.doc.Dialog.openOfficeDialog(callback, OVP, this);
	},
	setOfficeEditorUrl : function(url) {
		this.officeEditorUrl = url;
	},
	editOdtDoc : function(docID, fileID, docName, docPath) {
		var OVP = {};
		OVP.docId = docID;
		OVP.host = this.rootPath;
		OVP.userName = this.userName;
		OVP.userInitials = this.userInitials;
		OVP.programID = "OpenOffice";
		OVP.showField = false;
		OVP.fileID = fileID;
		OVP.filename = docName.substr(0, docName.lastIndexOf('.'));
		OVP.fileExt = String(/\.[^\.]+$/.exec(docName));
		OVP.isPrint = true;
		var currentNode = justep.doc.InnerUtils.evalChangeLog(this.changeLog,
				docID);

		var caller = this;
		var zbEditor = new justep.XBLObject();
		zbEditor.windowRunner1Send = function(event) {
			OVP.filename = encodeURI(OVP.filename);
			return JSON.stringify(OVP);
		};
		var afterOfficeViewerDialogSelect = function(response) {
			var self = this;
			var file = $(response).find("file");
			var kind = $(file).attr("mediatype");
			var cacheName = $(file).attr("file-name");
			var size = $(file).attr("fileSize");
			var oldValue = self.bindDataXbl.getValue(self.relation);
			var oldValueObj = JSON.parse(oldValue);
			for ( var i = 0; i < oldValueObj.length; i++) {
				if (oldValueObj[i].docID == OVP.docId) {
					oldValueObj[i].fileID = cacheName;
					oldValueObj[i].time = justep.Date.toString(new Date(),
							justep.Date.STANDART_FORMAT);
				}
			}
			var oldValue = self.bindData.setValue(self.relation, JSON
					.stringify(oldValueObj));
			self.refreshButtons.call(self);

		};
		zbEditor.windowRunner1Receive = function(event) {
			if (event.data) {
				afterOfficeViewerDialogSelect.call(caller, event.data);
			}
		};
		var wr = new justep.windowRunner(
				"/UI/system/service/doc/office/NeoshineOffice.w?process=/SA/doc/system/systemProcess&activity=mainActivity",
				"中标office在线编辑", false, zbEditor.windowRunner1Send,
				zbEditor.windowRunner1Receive);
		wr.setProcess(justep.Context.getCurrentProcess());
		wr.setActivity(justep.Context.getCurrentActivity());
		justep.Object.extend(zbEditor, wr);
		zbEditor.open();
		return;
	},

	editDoc : function(docID, fileID, docName, docPath) {
		if (this.checkEvent("onEditClick")) {
			var eventData = {
				'cancel' : false,
				'source' : this
			};
			this.callEvent("onEditClick", [ eventData ]);
			if (eventData.cancel)
				return;
		}
		if (!justep.doc.InnerUtils.checkOcx())
			return;

		if ('.doc.docx.xls.xlsx.ppt.mpp.vsd.odt.wps.'
				.indexOf(String(/\.[^\.]+$/.exec(docName)) + '.') < 0) {
			alert(new justep.Message(justep.Message.JUSTEP232056).getMessage());
			return;
		}
		if ('.wps.'.indexOf(String(/\.[^\.]+$/.exec(docName)) + '.') >= 0) {
			this.useNTKO = true;
			this
					.setOfficeEditorUrl("/UI/system/service/doc/ntko/ntkoEditorDialog.w");
		}

		if ('.odt.'.indexOf(String(/\.[^\.]+$/.exec(docName)) + '.') >= 0) {
			this.editOdtDoc(docID, fileID, docName, docPath);
		} else {
			this.editMsDoc(docID, fileID, docName, docPath);
		}
	},
	newFormTemplate : function() {
		if (this.access % 512 < 256) {
			this.log("权限不足" + this.access);
			return;
		}
		if (!justep.doc.InnerUtils.checkOcx())
			return;
		this.getTemplate();
		if (this.checkEvent("onNewFromTemplate")) {
			var eventData = {
				'cancel' : false,
				'data' : this.officeTemplates,
				'source' : this
			};
			this.callEvent("onNewFromTemplate", [ eventData ]);
			if (eventData.cancel)
				return;
		}
		var OVP = {};
		OVP.host = this.rootPath;
		OVP.userName = justep.Context.getCurrentPersonName()
				+ justep.Context.getCurrentDeptName();
		OVP.userInitials = justep.Context.getCurrentPersonName();
		OVP.programID = "Template";
		OVP.showField = true;
		if (this.officeTemplates.length == 1) {
			var cell = this.officeTemplates[0];
			var templateDocName = cell.sDocName;
			// var docServerInfo =
			// justep.doc.InnerUtils.getDocServerByDocPath(cell.sDocPath);
			OVP.templateHost = this.rootPath;
			OVP.templateID = cell.sFileId;
			OVP.templateExt = String(/\.[^\.]+$/.exec(templateDocName));
			OVP.filename = templateDocName.substr(0, templateDocName
					.lastIndexOf('.'));
			var uploadDoc = function(event) {
				var data = event.data;
				if (data.type == "officeAction") {
					if (data.changes != 'W10=') {
						this.uploadDoc(data.filename, data.mediatype,
								data.size, data.cacheName,
								data.revisionCacheName, data.changes);
					}
				} else if (data.type == "officeLoaded") {
					if (this.checkEvent("onOfficeLoaded")) {
						var self = this;
						var officeEditorContext = {};
						officeEditorContext.execute = function(func, params) {
							var execPart = {
								func : func.toString(),
								params : params,
								type : "officeLoaded"
							}
							var oldData = self.officeEditor.sendData;
							self.officeEditor.sendData = JSON
									.stringify(execPart);
							self.officeEditor.sendToWindow(execPart);
							self.officeEditor.sendData = oldData;
						};
						var eventData = {
							'source' : this,
							'officeEditorContext' : officeEditorContext
						};
						this.callEvent("onOfficeLoaded", [ eventData ]);
					}
				}
			};
			this.openOfficeEditor(uploadDoc, OVP);
		} else if (this.officeTemplates.length > 0) {
			var afterSelectFun = function(event) {
				var templateDocName = event.data.templateDocName;
				OVP.templateHost = event.data.templateHost;
				OVP.templateID = event.data.templateFileID;
				OVP.templateExt = String(/\.[^\.]+$/.exec(templateDocName));
				OVP.filename = templateDocName.substr(0, templateDocName
						.lastIndexOf('.'));
				var uploadDoc = function(event) {
					var data = event.data;
					if (data.type == "officeAction") {
						if (data.changes != 'W10=') {
							this.uploadDoc(data.filename, data.mediatype,
									data.size, data.cacheName,
									data.revisionCacheName, data.changes);
						}
					} else if (data.type == "officeLoaded") {
						if (this.checkEvent("onOfficeLoaded")) {
							var self = this;
							var officeEditorContext = {};
							officeEditorContext.execute = function(func, params) {
								var execPart = {
									func : func.toString(),
									params : params,
									type : "officeLoaded"
								}
								var oldData = self.officeEditor.sendData;
								self.officeEditor.sendData = JSON
										.stringify(execPart);
								self.officeEditor.sendToWindow(execPart);
								self.officeEditor.sendData = oldData;
							};
							var eventData = {
								'source' : this,
								'officeEditorContext' : officeEditorContext
							};
							this.callEvent("onOfficeLoaded", [ eventData ]);
						}
					}
				};
				this.openOfficeEditor(uploadDoc, OVP);
			};
			justep.doc.Dialog.openDocTemplateDialog(this.officeTemplates,
					afterSelectFun, this);
		} else {
			alert(new justep.Message(justep.Message.JUSTEP232057).getMessage());
		}
	},

	// 保存相关逻辑
	save : function() {
		var data = this.bindData;
		var changedIDs = data.getChangedIDList('edit');
		for ( var j = 0; j < changedIDs.length; j++) {
			var billID = changedIDs[j];
			var attachValue = data.getValue(this.relation, billID);
			if (attachValue) {
				justep.doc.InnerUtils.addCreateVersionLog(this.changeLog, JSON
						.parse(attachValue), billID);
			}
		}
		this.commit();
	},

	commit : function() {
		var commitRows = justep.doc.InnerUtils.commitDoc(this.changeLog,
				this.rootPath, "commitAttachAction");
		if (commitRows) {
			var items = commitRows.rows;
			for ( var i = 0; i < items.length; i++) {
				var doc = null;
				var item = items[i];
				if ((item.userdata.recordState == 'new' || item.userdata.recordState == 'edit')
						&& item.sKind.value != 'dir') {
					var docID = item.userdata.id.value;
					var billID = item.bill_id.value;
					var data = this.bindData.getValue(this.relation, billID);
					if (!data) {
						continue;
					}
					data = data ? JSON.parse(data) : [];
					for ( var j = 0; j < data.length; j++) {
						if (docID == data[j].docID) {
							doc = data[j];
						}
					}
					doc.fileID = item.sFileID.value;
					var docLiveVersionID = item.sDocLiveVersionID.value;
					justep.doc.InnerUtils.updateChangeLog(this.changeLog,
							docID, doc.fileID, docLiveVersionID);
					// type,docID,docName,size,docPath,fileID,billID
					this.setValue("edit", docID, doc.docName, doc.size,
							doc.docPath, doc.fileID, billID);
				}
			}
		}

	},
	createVersion : function(docID, fileID, docName, docPath) {
		if (fileID == '') {
			return;
		}
		if (this.checkEvent("onCreateVersion")) {
			var eventData = {
				'cancel' : false,
				'source' : this
			};
			this.callEvent("onCreateVersion", [ eventData ]);
			if (eventData.cancel)
				return;
		}
		if ('.doc.docx.xls.xlsx.ppt.mpp.vsd.odt.'.indexOf(String(/\.[^\.]+$/
				.exec(docName))
				+ '.') < 0) {
			alert(new justep.Message(justep.Message.JUSTEP232058).getMessage());
			return;
		}

		var currentNode = justep.doc.InnerUtils.evalChangeLog(this.changeLog,
				docID);
		if (currentNode != null) {
			justep.doc.InnerUtils.removeChangeLog(this.changeLog, docID);
		}
		justep.doc.InnerUtils.createVersion(docID, false, docName);
	},

	// 查询文档关联信息
	getDocLinkDefine : function() {
		var define = justep.doc.InnerUtils.queryDefine(this.process,
				this.activity, this.keyId, true);
		if (define) {
			if (define.rootPath) {
				this.rootPath = define.rootPath;
			}
			if (define.subPath) {
				this.subPath = define.subPath;
			}
			if (define.limitSize) {
				this.limitSize = define.limitSize;
			}
			if (define.showChildren) {
				this.showChildren = define.showChildren;
			}
			if (define.access) {
				this.access = define.access;
			}
		}

	},

	getDocPath : function(billID) {
		if (!this.subPath) {
			this.docPath = this.rootPath;
			var parentID = this.docPath
					.substring(this.docPath.lastIndexOf("/") + 1);
			var row = justep.doc.InnerUtils.queryDoc(parentID, undefined, [
					"sDocDisplayPath", "sDocName" ], undefined, undefined,
					"single");
			var parentDocDisplayPath = row.sDocDisplayPath.value;
			var parentDocName = row.sDocName.value;
			this.docDisplayPath = justep.doc.InnerUtils.getDocFullDisplayPath(
					parentDocName, parentDocDisplayPath);
		} else {
			var options = {};
			var sendParam = new justep.Request.ActionParam();
			sendParam.setString("rootPath", this.rootPath);
			sendParam.setString("subPath", this.subPath);
			sendParam.setString("billID", this.billID);
			sendParam.setString("process", this.process);
			sendParam.setString("activity", this.activity);
			sendParam.setBoolean("isTree", false);

			options.process = "/SA/doc/system/systemProcess";
			options.activity = "mainActivity";

			options.dataType = "json";
			options.parameters = sendParam;
			options.action = "queryLinkDirAction";
			options.directExecute = true;
			options.callback = function(data) {
			};
			// __checkMD5Code2__
			options.executeContext = ('undefined' != typeof (__executeContext__)) ? __executeContext__
					: null;
			var response = justep.Request.sendBizRequest2(options);
			if (!justep.Request.isBizSuccess(response, 'json')) {
				throw justep.Error.create(new justep.Message(
						justep.Message.JUSTEP232060).getMessage());
			}

			var rv = justep.Request.responseParseJSON(response).data.value;

			for ( var i = 0; i < rv.rows.length; i++) {
				var row = rv.rows[i];
				if (row.is_exist.value == "true")
					continue;
				var version = "0";
				justep.doc.InnerUtils.addChangeLog(this.changeLog, "newDir", [
						row.userdata.id.value, version, "", "",
						row.sDocName.value, "dir", "", row.sParentID.value,
						row.sDocPath.value, row.sDocDisplayPath.value, "", "",
						"", "", "" ], undefined, "");
			}
			var userData = rv.userdata;
			parentID = userData["sys.selectedID"];
			this.docPath = userData["sys.selectedPath"];
			this.docDisplayPath = userData["sys.selectedDisplayPath"];
		}
		this.parentID = parentID;
	},

	// 适配不同上传方式
	initUploader : function() {
		if (justep.Browser.isInApp && justep.Browser.isIDevice) {
			this.runtime = "ios";
			this.initIOSUploader();
		} else if (this.runtime == "flash") {
			this.initFlashUploader();
		} else if (this.runtime == "html4") {
			this.initHtml4Uploader();
		}
	},

	initIOSUploader : function() {
		/*
		 * ios 暂未实现fileSelected事件
		 */
		var button = document.getElementById(this.uploaderButton);
		var self = this;
		$(button).bind(
				'click',
				function() {
					if(self.bindData.getReadonly()) return false;
					
					if (self.access % 512 < 256) {
						return false;
					}

					if (self.bindData.getCount() < 1) {
						alert(new justep.Message(justep.Message.JUSTEP232059)
								.getMessage());
						return false;
					}

					if (self.checkEvent("onUploadClick")) {
						var eventData = {
							'cancel' : false,
							'source' : self
						};
						self.callEvent("onUploadClick", [ eventData ]);
						if (eventData.cancel)
							return false;
					}
					var justepApp = justep.getJustepApp();
					var getUploadUrl = function() {
						var docUrl = justep.doc.InnerUtils.getdocServerAction(
								self.rootPath, "/repository/file/cache/upload",
								true);
						if (docUrl.indexOf("uploadDoc.j") != -1
								&& docUrl.indexOf("#") == -1) {
							docUrl = window.location.protocol + "//"
									+ window.location.host + docUrl;
						}
						return docUrl;
					};
					var uploadCallback = function(response, files) {
						var file = $(response).find("file");
						var kind = $(file).attr("mediatype");
						var cacheName = $(file).attr("file-name");
						var size = $(file).attr("fileSize");
						self.uploadDoc.call(self, fileName, kind, size,
								cacheName);
						$('#' + self.uploaderButton).css('width', '54px');
					};
					justepApp.attachment.uploadAttachment(getUploadUrl,
							uploadCallback);
				});
	},

	initHtml4Uploader : function() {
		if (this.extensionFilter) {
			var filter = this.transformExtensionFilter(this.extensionFilter);
		}
		var clickCallback = function() {
			if(this.bindData.getReadonly()) return false;
			if (this.access % 512 < 256) {
				return false;
			}
			if (this.bindData.getCount() < 1) {
				alert(new justep.Message(justep.Message.JUSTEP232059)
						.getMessage());
				return false;
			}
			//如果水印处理 判断是替换  还是上传 
			if(this.useWaterMarkCallBack)
				this.useWaterMark = this.useWaterMarkCallBack();
			else
				this.useWaterMark = false;
			if(!this.replaceing) {
				this.uploader._replaceDocId = '';
				this.uploader._settings.data.wmFileId='';
				if(this.useWaterMark)
					this.uploader._settings.data.wmFileId = justep.Utils.randomString();
			}
			if (this.checkEvent("onUploadClick")) {
				var eventData = {
					'cancel' : false,
					'source' : this
				};
				this.callEvent("onUploadClick", [ eventData ]);
				if (eventData.cancel)
					return false;
			}
		};
		var selectedCallback = function(docName, uploader) {
			if (this.bindData.getCount() < 1) {
				alert(new justep.Message(justep.Message.JUSTEP232059)
						.getMessage());
				return false;
			}
			var fileNum = this.getValue().length + 1;
			if (this.checkEvent("onFileSelected")) {
				var eventData = {
					'cancel' : false,
					'source' : this,
					'fileList' : docName,
					'uploader' : uploader,
					'fileNum' : fileNum
				};
				this.callEvent("onFileSelected", [ eventData ]);
				if (eventData.cancel) {
					return false;
				}
			}
		};
		var completedCallback = function(docNames, uploader, response) {
			if (this.checkEvent("onUploadCompleted")) {
				var eventData = {
					'source' : this,
					'uploader' : uploader
				};
				this.callEvent("onUploadCompleted", [ eventData ]);
			}
			var files = $(response).find("file");
			for(var i=0;i<files.length;i++){
				var file = files.get(i);
				var kind = $(file).attr("mediatype");
				var cacheName = $(file).attr("file-name");
				var size = $(file).attr("fileSize");
				this.uploadDoc(docNames[i], kind, size, cacheName);
			}
			
			
		};
		var uploadParam = {
			'uploaderDiv' : this.uploaderButton,
			'docPath' : this.subPath ? this.rootPath + "/" + this.subPath
					: this.rootPath,
			'clickCallBack' : clickCallback,
			'submitCallBack' : selectedCallback,
			'completeCallBack' : completedCallback,
			'caller' : this,
			'filter' : filter,
			'multiple' : !this.useWaterMark
		};
		this.uploader = justep.doc.InnerUtils.getHtml4Uploader(uploadParam);
	},

	initFlashUploader : function() {
		if (this.extensionFilter) {
			var filter = this.transformExtensionFilter(this.extensionFilter);
		}
		var clickCallback = function() {
			if(this.bindData.getReadonly()) return false;
			var self = this;
			
			if (this.access % 512 < 256) {
				return false;
			}
			if (this.bindData.getCount() < 1) {
				alert(new justep.Message(justep.Message.JUSTEP232059)
						.getMessage());
				return false;
			}
			if (self.checkEvent("onUploadClick")) {
				var eventData = {
					'cancel' : false,
					'source' : this
				};
				self.callEvent("onUploadClick", [ eventData ]);
				if (eventData.cancel) {
					return false;
				}
			}
			return true;
		};

		var selectedCallback = function(fileList, uploader) {
			var selectedCount = 0;
			for ( var p in fileList) {
				selectedCount++;
			}
			var fileNum = this.getValue().length + selectedCount;
			var self = this;
			if (self.checkEvent("onFileSelected")) {
				var eventData = {
					'cancel' : false,
					'source' : this,
					'fileList' : fileList,
					'uploader' : uploader,
					'fileNum' : fileNum
				};
				self.callEvent("onFileSelected", [ eventData ]);
				if (eventData.cancel) {
					return false;
				}
			}
		};

		var completedCallback = function(fileList, uploader) {
			var self = this;
			if (self.checkEvent("onUploadCompleted")) {
				var eventData = {
					'source' : this,
					'fileList' : fileList,
					'uploader' : uploader
				};
				self.callEvent("onUploadCompleted", [ eventData ]);
			}
		};

		var readyCallback = function() {
			if (this.access % 512 < 256) {
				this.uploader.disable();
			} else {
				this.uploader.enable();
			}
		}
		var uploaderEle = $('#' + this.uploaderButton);
		var width = uploaderEle.outerWidth(true);
		var height = uploaderEle.outerHeight(true);

		var param = {
			containerID : this.uploaderButton,
			docPath : this.subPath ? this.rootPath + "/" + this.subPath
					: this.rootPath,
			limitSize : this.limitSize,
			uploadResponse : this.uploadDoc,
			click : clickCallback,
			ready : readyCallback,
			width : width,
			height : height,
			zIndex : 1,
			filter : filter,
			multiFiles : true,
			caller : this,
			selected : selectedCallback,
			completed : completedCallback
		};
		this.uploader = justep.doc.InnerUtils.getFlashUploader(param);

	},

	// 事件部分
	addEvents : function() {
		this.__onRender = this.domNode.getAttribute("onRender") ? justep.Function
				.get(this.domNode.getAttribute("onRender"))
				: null;
		if (this.__onRender && typeof this.__onRender == "function") {
			this.attachEvent("onRender", this.__onRender, this);
		}

		this.__onOpenOfficeEditor = this.domNode
				.getAttribute("onOpenOfficeEditor") ? justep.Function
				.get(this.domNode.getAttribute("onOpenOfficeEditor")) : null;
		if (this.__onOpenOfficeEditor
				&& typeof this.__onOpenOfficeEditor == "function") {
			this.attachEvent("onOpenOfficeEditor", this.__onOpenOfficeEditor,
					this);
		}
		this.__onOfficeLoaded = this.domNode.getAttribute("onOfficeLoaded") ? justep.Function
				.get(this.domNode.getAttribute("onOfficeLoaded"))
				: null;
		if (this.__onOfficeLoaded && typeof this.__onOfficeLoaded == "function") {
			this.attachEvent("onOfficeLoaded", this.__onOfficeLoaded, this);
		}

		this.__onCreate = this.domNode.getAttribute("onCreate") ? justep.Function
				.get(this.domNode.getAttribute("onCreate"))
				: null;
		if (this.__onCreate && typeof this.__onCreate == "function") {
			this.attachEvent("onCreate", this.__onCreate, this);
		}
		this.__onNewFromTemplate = this.domNode
				.getAttribute("onNewFromTemplate") ? justep.Function
				.get(this.domNode.getAttribute("onNewFromTemplate")) : null;
		if (this.__onNewFromTemplate
				&& typeof this.__onNewFromTemplate == "function") {
			this.attachEvent("onNewFromTemplate", this.__onNewFromTemplate,
					this);
		}
		this.__onBrowseDocClick = this.domNode.getAttribute("onBrowseDocClick") ? justep.Function
				.get(this.domNode.getAttribute("onBrowseDocClick"))
				: null;
		if (this.__onBrowseDocClick
				&& typeof this.__onBrowseDocClick == "function") {
			this.attachEvent("onBrowseDocClick", this.__onBrowseDocClick, this);
		}
		this.__onLoadData = this.domNode.getAttribute("onLoadData") ? justep.Function
				.get(this.domNode.getAttribute("onLoadData"))
				: null;
		if (this.__onLoadData && typeof this.__onLoadData == "function") {
			this.attachEvent("onLoadData", this.__onLoadData, this);
		}
		this.__onUploadClick = this.domNode.getAttribute("onUploadClick") ? justep.Function
				.get(this.domNode.getAttribute("onUploadClick"))
				: null;
		if (this.__onUploadClick && typeof this.__onUploadClick == "function") {
			this.attachEvent("onUploadClick", this.__onUploadClick, this);
		}
		this.__onFileSelected = this.domNode.getAttribute("onFileSelected") ? justep.Function
				.get(this.domNode.getAttribute("onFileSelected"))
				: null;
		if (this.__onFileSelected && typeof this.__onFileSelected == "function") {
			this.attachEvent("onFileSelected", this.__onFileSelected, this);
		}
		this.__onUploadCompleted = this.domNode
				.getAttribute("onUploadCompleted") ? justep.Function
				.get(this.domNode.getAttribute("onUploadCompleted")) : null;
		// 兼容1900的方法
		if (this.__onUploadCompleted == null) {
			this.__onUploadCompleted = this.domNode
					.getAttribute("onAfterUpload") ? justep.Function
					.get(this.domNode.getAttribute("onAfterUpload")) : null;
		}
		if (this.__onUploadCompleted
				&& typeof this.__onUploadCompleted == "function") {
			this.attachEvent("onUploadCompleted", this.__onUploadCompleted,
					this);
		}
		this.__onEditClick = this.domNode.getAttribute("onEditClick") ? justep.Function
				.get(this.domNode.getAttribute("onEditClick"))
				: null;
		if (this.__onEditClick && typeof this.__onEditClick == "function") {
			this.attachEvent("onEditClick", this.__onEditClick, this);
		}
		this.__onDeleteClick = this.domNode.getAttribute("onDeleteClick") ? justep.Function
				.get(this.domNode.getAttribute("onDeleteClick"))
				: null;
		if (this.__onDeleteClick && typeof this.__onDeleteClick == "function") {
			this.attachEvent("onDeleteClick", this.__onDeleteClick, this);
		}
		this.__onDownloadClick = this.domNode.getAttribute("onDownloadClick") ? justep.Function
				.get(this.domNode.getAttribute("onDownloadClick"))
				: null;
		if (this.__onDownloadClick
				&& typeof this.__onDownloadClick == "function") {
			this.attachEvent("onDownloadClick", this.__onDownloadClick, this);
		}
		this.__onHistoryClick = this.domNode.getAttribute("onHistoryClick") ? justep.Function
				.get(this.domNode.getAttribute("onHistoryClick"))
				: null;
		if (this.__onHistoryClick && typeof this.__onHistoryClick == "function") {
			this.attachEvent("onHistoryClick", this.__onHistoryClick, this);
		}
		this.__onGetIsPrint = this.domNode.getAttribute("onGetIsPrint") ? justep.Function
				.get(this.domNode.getAttribute("onGetIsPrint"))
				: null;
		if (this.__onGetIsPrint && typeof this.__onGetIsPrint == "function") {
			this.attachEvent("onGetIsPrint", this.__onGetIsPrint, this);
		}
		if (this.checkEvent("onCreate")) {
			this.callEvent("onCreate", [ {
				'source' : this
			} ]);
		}

	},
	// API
	setPermission : function(access) {
		this.access = access;
		this.render();
	},
	getScrollArea : function() {
		return $('#' + this.containerBody + ' .att_scroll_area');
	},
	getValue : function(billID) {
		var data = [];
		var value = "";
		if (billID) {
			value = this.bindData.getValue(this.relation, billID);
		} else {
			value = this.bindData.getValue(this.relation);
		}
		if (value) {
			try {
				data = JSON.parse(value);
			} catch (e) {
				this.log("绑定的数据解析失败[value:" + value + "]", e);
				data = [];
			}
		}
		return data;
	},
	//add by lzh exInfo
	setValue : function(type, docID, docName, size, docPath, fileID, billID) {
		this.log("setValue:[" + type + "][" + docID + "][" + docName + "]["
				+ size + "][" + docPath + "][" + fileID + "][" + billID + "]");
		fileID = fileID ? fileID : "";
		var data = null;
		if (billID) {
			data = this.getValue(billID);
		} else {
			data = this.getValue();
		}

		if (type == "new") {
			var item = {};
			item.docID = docID;
			item.docName = docName;
			item.size = size;
			item.docPath = docPath;
			item.fileID = fileID;
			//新增 使用水印 增加wmFileId;
			if(this.useWaterMark)
				item.wmFileId = this.uploader._settings.data.wmFileId;
			data.push(item);
		} else if (type == "edit") {
			for ( var j = 0; j < data.length; j++) {
				if (docID == data[j].docID) {
					if (fileID) {
						data[j].fileID = fileID;
					}

					if (docName) {
						data[j].docName = docName;
					}
					if (size) {
						data[j].size = size;
					}
					if (fileID) {
						data[j].fileID = fileID;
					}
					if (docPath) {
						data[j].docPath = docPath;
					}
					data[j].person = justep.Context.getCurrentPersonName();
					data[j].time = justep.Date.toString(new Date(),
							justep.Date.STANDART_FORMAT);
					break;
				}
			}
		} else if (type == "delete") {
			for ( var j = 0; j < data.length; j++) {
				if (docID == data[j].docID) {
					data.splice(j, 1);
					break;
				}
			}
		}

		this.bindData.setValue(this.relation, JSON.stringify(data), billID);
		// 操作附件后，自动保存
		// if(butone && butone.Context && butone.Context.frameForm){
		// butone.Context.frameForm.saveDatas();
		// }

	},

	// Utils 函数
	getDataByID : function(docID) {
		var value = this.bindData.getValue(this.relation);
		if (value) {
			var data = JSON.parse(value);
			for ( var i = 0; i < data.length; i++) {
				if (data[i].docID == docID) {
					return data[i];
				}
			}
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232061).getMessage());
		}
	},
	browseDoc : function(docIDs, docID, docName, fileID) {
		if (this.checkEvent("onBrowseDocClick")) {
			var eventData = {
				'source' : this,
				'cancel' : false,
				'data' : {
					'docID' : docID,
					'fileID' : fileID
				}
			};
			this.callEvent("onBrowseDocClick", [ eventData ]);
			if (eventData.cancel)
				return;
		}
		var data = {docIDs:docIDs,docID:docID};
		var windowRunner = new justep.windowRunner(
				"/UI/base/core/components/material/filesBrowse.w?process=/SA/doc/system/systemProcess&activity=mainActivity&docID="+docID,
				"附件浏览", false, null, null);
		windowRunner.setProcess(justep.Context.getCurrentProcess());
		windowRunner.setActivity(justep.Context.getCurrentActivity());
		windowRunner.open(data);
	},
	downloadDoc : function(docID, fileID,outUrl) {
		if (this.checkEvent("onDownloadClick")) {
			var eventData = {
				'cancel' : false,
				'data' : {
					'docID' : docID,
					'fileID' : fileID
				},
				'source' : this
			};
			this.callEvent("onDownloadClick", [ eventData ]);
			if (eventData.cancel)
				return;
		}
		if (outUrl){
			window.open(outUrl);	
		}
		else
		{
		    justep.doc.InnerUtils.downloadDocByFileID(this.rootPath, fileID);
		}
	},

	openDocHistoryDialog : function(docID, fileID) {
		if (this.checkEvent("onHistoryClick")) {
			var eventData = {
				'cancel' : false,
				'data' : {
					'docID' : docID,
					'fileID' : fileID
				},
				'source' : this
			};
			this.callEvent("onHistoryClick", [ eventData ]);
			if (eventData.cancel)
				return false;
		}
		justep.doc.Dialog.openDocHistoryDialog(docID, fileID, this.rootPath,
				this.access);
	},
	getTemplate : function() {
		if (!this.officeTemplates)
			this.officeTemplates = new Array();
		var define = justep.doc.InnerUtils.queryDefine(this.process,
				this.activity, this.keyId);
		this.officeTemplates = define.docTemplate;
	},
	transformExtensionFilter : function(extensionFilter) {
		if (this.runtime == "flash") {
			var filter = [];
			extensionFilter = extensionFilter.split(",");
			for ( var i = 0; i < extensionFilter.length; i++) {
				var item = extensionFilter[i].split("|");
				filter.push({
					description : jQuery.trim(item[0]),
					extensions : jQuery.trim(item[1])
				});
			}
			return filter;
		} else if (this.runtime == "html4") {
			var filter = new Array();
			extensionFilter = extensionFilter.split(",");
			for ( var i = 0; i < extensionFilter.length; i++) {
				var item = extensionFilter[i].split("|");
				var miniType = jQuery.trim(item[1]).replace(
						new RegExp('\\*\\.', 'gm'), '');
				miniType = miniType.replace(new RegExp(';', 'gm'), '|');
				filter.push(miniType);
			}
			return filter.join('|');
		}
	},
	_refreshChangeLog : function() {
		this.changeLog = {
			items : [],
			autoCreateVersion : this.autoCreateVersion,
			createVersionLogs : [],
			"operate" : "",
			"url" : "",
			process : this.process,
			activity : this.activity
		}
	},
	getAttribute : function(attrName, defaultValue) {
		var attrValue = this.domNode.getAttribute(attrName);
		if (defaultValue) {
			return attrValue ? attrValue : defaultValue;
		} else {
			return attrValue;
		}
	},
	log : function(msg, e) {
		if (!this.enableLog) {
			return;
		}
		if (window.console) {
			if (e && e.message) {
				console.info(msg + ":" + e.message);
			} else {
				console.info(msg);
			}
		} else {
			return;
		}
	}
};
