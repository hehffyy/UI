define(function(require) {
	var Component = require("base/lib/bind/component"), BindComponent = require("base/lib/bind/bindComponent"), BindMapping = require("base/lib/bind/bind.mapping"), DocUtils = justep.doc, DocDialog = justep.doc.Dialog, Uploader = require("base/lib/bind/uploader"), url = "$model/UI/base/components/knockout/attachmentPC";
	var $ = require("jquery");
	var ComponentConfig = require("./attachmentPC.config");

	require('css!./css/attachment').load();

	var Attachment = BindComponent
			.extend({
				// 构造函数
				constructor : function(options) {
					this.callParent(options);
					this.keyID = "";
					this.rootPath = "/defaultDocNameSpace";
					this.limit = "998";
					this.limitSize = "";
					this.subPath = "";
					this.state = "upload";
					this.access = "";
					this.initAttachmentValue([]);
				},

				getDisplayHtml : function(context) {
					if (context && context.row) {
						var value = context.row.val(context.colDef.name);
						try {
							var docs = JSON.parse(value);
							var result = "";
							$.each(docs, function(index, doc) {
								result = result + doc.docName + ";";
							});
							return "<div style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding-right:15px;'>"
									+ result + "</div>";
						} catch (e) {
						}
					}
				},

				propertyChangedHandler : function(key, oldValue, value) {
					this.callParent(key, oldValue, value);
					if (key == "access") {
						var _value = DocUtils.InnerUtils.accessEnum[value] ? DocUtils.InnerUtils.accessEnum[value]
								: value;
						if (value != _value) {
							this.set({
								'access' : _value
							});
						}
						var accessValue = parseInt(value);
						if (!isNaN(accessValue)) {
							if (!this.$access) {
								this.$access = butone.Bind
										.observable(accessValue);
							} else {
								this.$access.set(accessValue);
							}
						}
					}
				},

				getTemplate : function() {
					if (!this.officeTemplates) {
						this.officeTemplates = new Array();
					}
					var define = DocUtils.InnerUtils.queryDefine(this.process,
							this.activity, this.keyId, undefined);
					this.officeTemplates = define.docTemplate;
				},

				newFormTemplate : function() {
					var self = this;
					if (!DocUtils.InnerUtils.checkOcx()) {
						return;
					}
					this.getTemplate();
					var eventData = {
						'cancel' : false,
						'data' : this.officeTemplates,
						'source' : this
					};
					this.fireEvent("onNewFromTemplate", eventData);
					if (eventData.cancel) {
						return;
					}
					var OVP = {};
					OVP.host = this.rootPath;
					OVP.userName = this.modelContext.getCurrentPersonName()
							+ this.modelContext.getCurrentDeptName();
					OVP.userInitials = this.modelContext.getCurrentPersonName();
					OVP.programID = "Template";
					OVP.showField = true;
					if (this.officeTemplates.length == 1) {
						var cell = this.officeTemplates[0];
						var templateDocName = cell.sDocName;
						OVP.templateHost = this.rootPath;
						OVP.templateID = cell.sFileId;
						OVP.templateExt = String(/\.[^\.]+$/
								.exec(templateDocName));
						OVP.filename = templateDocName.substr(0,
								templateDocName.lastIndexOf('.'));
						var uploadDoc = function(event) {
							var data = event.data;
							if (data.type == "officeAction") {
								if (data.changes != 'W10=') {
									self.uploadDoc(data.filename,
											data.mediatype, data.size,
											data.cacheName,
											data.revisionCacheName,
											data.changes);
								}
							} else if (data.type == "officeLoaded") {
								var officeEditorContext = {};
								officeEditorContext.execute = function(func,
										params) {
									var execPart = {
										func : func.toString(),
										params : params,
										type : "officeLoaded"
									};
									self.officeEditor.sendData = JSON
											.stringify(execPart);
									self.officeEditor.sendToWindow();
								};
								var eventData = {
									'source' : this,
									'officeEditorContext' : officeEditorContext
								};
								self.fireEvent("onOfficeLoaded", eventData);
							}
						};
						this.openOfficeEditor(uploadDoc, OVP);
					} else if (this.officeTemplates.length > 0) {
						var afterSelectFun = function(event) {
							var templateDocName = event.data.templateDocName;
							OVP.templateHost = event.data.templateHost;
							OVP.templateID = event.data.templateFileID;
							OVP.templateExt = String(/\.[^\.]+$/
									.exec(templateDocName));
							OVP.filename = templateDocName.substr(0,
									templateDocName.lastIndexOf('.'));
							var uploadDoc = function(event) {
								var data = event.data;
								if (data.type == "officeAction") {
									if (data.changes != 'W10=') {
										self.uploadDoc(data.filename,
												data.mediatype, data.size,
												data.cacheName,
												data.revisionCacheName,
												data.changes);
									}
								} else if (data.type == "officeLoaded") {

									var officeEditorContext = {};
									officeEditorContext.execute = function(
											func, params) {
										var execPart = {
											func : func.toString(),
											params : params,
											type : "officeLoaded"
										};
										self.officeEditor.sendData = JSON
												.stringify(execPart);
										self.officeEditor.sendToWindow();
									};
									var eventData = {
										'source' : self,
										'officeEditorContext' : officeEditorContext
									};
									self.fireEvent("onOfficeLoaded", eventData);
								}
							};
							self.openOfficeEditor(uploadDoc, OVP);
						};
						DocDialog.openDocTemplateDialog(self.officeTemplates,
								afterSelectFun, self);
					} else {
						butone.Util.hint(new justep.Message2(
								justep.Message2.JUSTEP232057).getMessage());
					}
				},

				// 动态创建组件
				buildTemplate : function(config) {
					// default value
					var tpl = ("<div component=\""+url+"\" access=\"duud\">")
							+ ("	<div class=\"x-attachment-pc\">")
							+ ("		<div class=\"x-attachment-content x-card-border\">")
							+ ("			<div class=\"x-doc-process\">")
							+ ("				<div class=\"progress-bar x-doc-process-bar\" role=\"progressbar\" style=\"width:0%;\"/>")
							+ ("			</div>")
							+ ("			<div class=\"x-attachment-cell-tpl\" data-bind=\"foreach:$attachmentItems\">")
							+ ("				<div class=\"x-attachment-cell x-attachment-item\">")
							+ ("					<div class=\"x-item-other x-item-icon\" data-bind=\"event:{mouseover:function(){if($model.$state.get()!=\'upload\'){return;} $model.$activeDoc.set($object)}},click:$model.previewOrRemoveItem.bind($model),style:{opacity: $model.$access.get() % 4 &gt;= 2 || $model.$state.get() == \'remove\' ? \'1.0\' : \'0.5\',backgroundImage:($model.previewPicture.bind($model,$object))()},css:{\'x-doc-item-active\':$model.$activeDoc.get() == $object}\">")
							+ ("						<a data-bind=\"visible:$model.$state.get() == \'remove\'\" class=\"x-remove-barget\"/>")
							+ ("					</div>")
							+ ("				</div>")
							+ ("			</div>")
							+ ("			<div class=\"x-attachment-cell x-attachment-item\" data-bind=\"visible:$state.get() == \'upload\' &amp;&amp; ($limit.get() == \'-1\' || $limit.get() &gt; $attachmentItems.get().length)\">")
							+ ("				<div class=\"x-item-icon x-item-upload\" data-bind=\"visible:$state.get() == \'upload\' &amp;&amp; $access.get() % 512 &gt;= 256\"/>")
							+ ("			</div>")
							+ ("			<div class=\"x-attachment-cell x-attachment-item\" data-bind=\"visible:$state.get() == \'upload\' &amp;&amp; ($limit.get() == \'-1\' || $limit.get() &gt; $attachmentItems.get().length)\">")
							+ ("				<div class=\"x-item-icon x-item-new-tpl\" data-bind=\"visible:$state.get() == \'upload\' &amp;&amp; $access.get() % 512 &gt;= 256,click:$model.newFormTemplate.bind($model)\"/>")
							+ ("			</div>")
							+ ("			<div class=\"x-attachment-cell x-attachment-item\" data-bind=\"visible:$state.get() == \'upload\' &amp;&amp; $attachmentItems.get().length &gt; 0\">")
							+ ("				<div class=\"x-item-icon x-item-remove\" data-bind=\"click:changeState.bind($object,\'remove\'),visible:$access.get() % 2048 &gt;= 1024\"/>")
							+ ("			</div>")
							+ ("			<div class=\"x-attachment-toolbar\" data-bind=\"if:$model.$activeDoc.get(),style:{display:$model.$activeDoc.get()?($('html').hasClass('flexboxlegacy')?'flex':'inline-block'):'none'}\">")
							+ ("				<div class=\"x-item-name\">")
							+ ("					<a class=\"btn btn-link\" data-bind=\"enable:($model.$activeDoc.get().fileID.get() &amp;&amp; $model.$access.get() % 4 &gt;= 2),click:$model.previewOrRemoveItem.bind($model,$model.$activeDoc.get()),text:$model.$activeDoc.get().docName.get()\"/>")
							+ ("					<span class=\"btn btn-link\" data-bind=\"enable:false,text:$model.getFormatSize($model.$activeDoc.get())\"/>")
							+ ("				</div>")
							+ ("				<div class=\"x-item-edit\">")
							+ ("					<a class=\"btn btn-link\" data-bind=\"enable:$model.$access.get() % 1024 &gt;= 512,click:$model.editDoc.bind($model,$model.$activeDoc.get())\">编辑</a>")
							+ ("				</div>")
							+ ("				<div class=\"x-item-download\">")
							+ ("					<a class=\"btn btn-link\" data-bind=\"enable:$model.$access.get() % 1024 &gt;= 512,click:$model.showHistory.bind($model,$model.$activeDoc.get())\">历史</a>")
							+ ("				</div>")
							+ ("				<div class=\"x-item-download\">")
							+ ("					<a class=\"btn btn-link\" data-bind=\"enable:($model.$activeDoc.get().fileID.get() &amp;&amp; $model.$access.get() % 8 &gt;= 4),click:$model.downloadDoc.bind($model,$model.$activeDoc.get())\">下载</a>")
							+ ("				</div>")
							+ ("				<div class=\"x-item-delete\">")
							+ ("					<a class=\"btn btn-link\" data-bind=\"enable:$model.$access.get() % 2048 &gt;= 1024,click:$model.deleteDoc.bind($model,$model.$activeDoc.get())\">删除</a>")
							+ ("				</div>")
							+ ("			</div>")
							+ ("			<div style=\"clear:both;\"/>")
							+ ("		</div>")
							+ ("	</div>")
							+ ("</div>");
					var tplNode = $(tpl).attr(config);
					return tplNode.get(0);
				},

				getConfig : function() {
					return ComponentConfig;
				},

				getContextID : function() {
					return this.getModel().getContextID();
				},

				_callModelFn : function() {
					var event = arguments[2];
					event.bindingContext = butone.Bind
							.contextFor(event.currentTarget);
					return this.getModel()[arguments[0]].apply(this.getModel(),
							[ event ]);
				},

				_attachDataEvent : function() {
					var data = this.bindData;
					if (data && (!this.eventAttached)) {
						var dataRefreshCallback = function(event) {
							this._refreshChangeLog();
						};
						data.on("onAfterRefresh", dataRefreshCallback, this);

						var saveBeforeCallback = function(event) {
							this.save();
						};
						data.on("onBeforeSave", saveBeforeCallback, this);

						var saveAfterCallback = function(event) {
							DocUtils.InnerUtils.saveDoc(this.changeLog, false);
							this._refreshChangeLog();
						};
						data.on("onAfterSave", saveAfterCallback, this);
						this.eventAttached = true;
					}
				},
				/**
				 * 附件相关逻辑
				 */

				// 查询文档关联信息
				getDocLinkDefine : function() {
					var define = DocUtils.InnerUtils.queryDefine(this.process,
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
						if (define.access) {
							this.set({
								access : define.access
							});
						}

					}
					if (this.isDisabled()) {
						this.docAccess = this.access;
						this.set({
							access : "7"
						});
					}
				},
				getDocPath : function(billID) {
					if (!this.subPath) {
						this.docPath = this.rootPath;
						var parentID = this.docPath.substring(this.docPath
								.lastIndexOf("/") + 1);
						var row = DocUtils.InnerUtils.queryDoc(parentID,
								undefined, [ "sDocDisplayPath", "sDocName" ],
								undefined, undefined, "single");
						var parentDocDisplayPath = row.sDocDisplayPath.value;
						var parentDocName = row.sDocName.value;
						this.docDisplayPath = DocUtils.InnerUtils
								.getDocFullDisplayPath(parentDocName,
										parentDocDisplayPath);
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
						var response = justep.Request.sendBizRequest2(options);
						if (!DocUtils.Utils.isBizSuccess(response, 'json')) {
							throw justep.Error2.create(new justep.Message2(
									justep.Message2.JUSTEP232060).getMessage());
						}

						var rv = justep.Request.responseParseJSON(response).data.value;

						for ( var i = 0; i < rv.rows.length; i++) {
							var row = rv.rows[i];
							if (row.is_exist.value == "true")
								continue;
							var version = "0";
							DocUtils.InnerUtils.addChangeLog(this.changeLog,
									"newDir", [ row.userdata.id.value, version,
											"", "", row.sDocName.value, "dir",
											"", row.sParentID.value,
											row.sDocPath.value,
											row.sDocDisplayPath.value, "", "",
											"", "", "" ], undefined, "");
						}
						var userData = rv.userdata;
						parentID = userData["sys.selectedID"];
						this.docPath = userData["sys.selectedPath"];
						this.docDisplayPath = userData["sys.selectedDisplayPath"];
					}
					this.parentID = parentID;
				},

				uploadDoc : function(docName, kind, size, cacheName,
						revisionCacheName, commentFileContent) {
					var docID = justep.Utils.randomString();
					var billID = this.ref.define.row.getID();
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
					DocUtils.InnerUtils.addChangeLog(this.changeLog, "new", [
							docID, "0", "", "", docName, kind, size,
							this.parentID, this.docPath, this.docDisplayPath,
							"", "", "", "", "" ], [ "attach", cacheName,
							revisionCacheName, commentFileContent ], billID);
					this.setValue("new", docID, docName, size, this.docPath);
				},

				getFormatSize : function($object) {
					var size = $object.size.get();
					return "(" + DocUtils.InnerUtils.formatSize(size) + ")";
				},

				downloadDoc : function($object) {
					var fileID = $object.fileID.get();
					var docID = $object.docID.get();
					var eventData = {
						'source' : this,
						'cancel' : false,
						'data' : {
							'docID' : docID,
							'fileID' : fileID
						}
					};
					this.fireEvent("onDownload", eventData);
					if (eventData.cancel)
						return;
					DocUtils.InnerUtils.downloadDocByFileID(this.rootPath,
							fileID);
				},

				browseDoc : function(docID, docName, fileID) {
					var eventData = {
						'source' : this,
						'cancel' : false,
						'data' : {
							'docID' : docID,
							'fileID' : fileID
						}
					};
					this.fireEvent("onBrowse", eventData);
					if (eventData.cancel)
						return;
					DocUtils.InnerUtils.browseDocByFileID(this.rootPath,
							docName, fileID, "last", "content", 'OpenOffice',
							false);
				},

				/**
				 * 删除对应记录，文档服务器不删除
				 */
				deleteDoc : function($object) {
					var docName = $object.docName.get();
					var docID = $object.docID.get();
					var eventData = {
						'cancel' : false,
						'data' : {
							'docID' : docID,
							'docName' : docName
						},
						'source' : this
					};
					this.fireEvent("onDelete", eventData);
					if (eventData.cancel) {
						return;
					}
					this.setValue("delete", docID);
					var items = this.changeLog.items;
					for ( var item in items) {
						if (items[item].doc_id == docID) {
							this.changeLog.items.splice(item, 1);
						}
					}
				},

				editDoc : function($object) {
					var docID = $object.docID.get();
					var fileID = $object.fileID.get();
					var docName = $object.docName.get();
					var docPath = $object.docPath.get();
					var eventData = {
						'cancel' : false,
						'source' : this
					};
					this.fireEvent("onEdit", eventData);
					if (eventData.cancel)
						return;
					if (!DocUtils.InnerUtils.checkOcx())
						return;
					if ('.doc.docx.xls.xlsx.ppt.mpp.vsd.'
							.indexOf(String(/\.[^\.]+$/.exec(docName)) + '.') < 0) {
						butone.Util.hint(new justep.Message2(
								justep.Message2.JUSTEP232056).getMessage());
						return;
					}
					this.editMsDoc(docID, fileID, docName, docPath);
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
					var currentNode = DocUtils.InnerUtils.evalChangeLog(
							this.changeLog, docID);
					if (currentNode != null) {
						var node;
						OVP.cacheName = !currentNode.cache_name ? ""
								: currentNode.cache_name;
						OVP.revisionCacheName = !currentNode.revision_cache_name ? ""
								: currentNode.revision_cache_name;
					} else if (fileID) {
						var cacheInfo = DocUtils.InnerUtils
								.queryDocCache(docID);
						if (cacheInfo.isLockSuccess == "success"
								|| cacheInfo.isLockSuccess == "noNeedLock") {
							OVP.cacheName = cacheInfo.sCacheName;
							OVP.revisionCacheName = cacheInfo.sRevisionCacheName;
							this.lastOperation = cacheInfo.isLockSuccess;
						} else if (cacheInfo.isLockSuccess == "failure") {
							butone.Util.hint(new justep.Message2(
									justep.Message2.JUSTEP232055).getMessage());
							return;
						}
					}
					var self = this;
					var callback = function(event) {
						var data = event.data;
						if (data.type == "officeAction") {
							if (data.changes != 'W10=') {
								self.updateDoc(docID, fileID, docPath,
										data.filename, data.mediatype,
										data.size, data.cacheName,
										data.revisionCacheName, data.changes,
										data.createVersion);
							} else if (data.createVersion) {
								self.createVersion(docID, fileID,
										data.filename, docPath);
							} else {
								var currentNode = DocUtils.InnerUtils
										.evalChangeLog(self.changeLog, docID);
								if (currentNode == null
										&& self.lastOperation == "success") {
									DocUtils.InnerUtils.unLockDoc(docID);
								}
							}
						} else if (data.type == "officeLoaded") {
							var officeEditorContext = {};
							officeEditorContext.execute = function(func, params) {
								var execPart = {
									func : func.toString(),
									params : params,
									type : "officeLoaded"
								};
								self.officeEditor.sendData = JSON
										.stringify(execPart);
								self.officeEditor.sendToWindow();
							};
							var eventData = {
								'source' : self,
								'officeEditorContext' : officeEditorContext
							};
							self.fireEvent("onOfficeLoaded", eventData);
						}
					};
					this.openOfficeEditor(callback, OVP);
				},

				openOfficeEditor : function(callback, OVP) {
					var eventData = {
						'data' : OVP,
						'source' : this
					};
					this.fireEvent("onOpenOfficeEditor", eventData);
					DocDialog.openOfficeEditorDialog(callback, OVP, this);
				},
				setOfficeEditorUrl : function(url) {
					this.officeEditorUrl = url;
				},

				updateDoc : function(docID, fileID, docPath, docName, kind,
						size, cacheName, revisionCacheName, commentFileContent,
						createVersion) {
					var node = DocUtils.InnerUtils.evalChangeLog(
							this.changeLog, docID);
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
						DocUtils.InnerUtils.modifyChangeLog(node, [ version,
								fileID, docVersionID, docName, kind, size,
								parentID, docPath, displayPath, description,
								classification, keywords, finishTime,
								serialNumber ], [ "attach", cacheName,
								revisionCacheName, commentFileContent ]);
					} else {
						var row = DocUtils.InnerUtils.queryDoc(docID,
								undefined, [ "version", "sParentID",
										"sDocDisplayPath", "sDocLiveVersionID",
										"sDescription", "sClassification",
										"sKeywords", "sFinishTime",
										"sDocSerialNumber" ], undefined,
								undefined, "single");
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
						var billID = this.bindData
								.getRowID(this.ref.define.row);
						DocUtils.InnerUtils.addChangeLog(this.changeLog,
								"edit", [ docID, version, fileID, docVersionID,
										docName, kind, size, parentID, docPath,
										displayPath, description,
										classification, keywords, finishTime,
										serialNumber ],
								[ "attach", cacheName, revisionCacheName,
										commentFileContent ], billID);
					}

					this.setValue("edit", docID, docName, size);
					if (fileID) {
						DocUtils.InnerUtils.commitDocCache(docID,
								this.changeLog);
					}
					if (createVersion && fileID) {
						this.createVersion(docID, fileID, docName, docPath);
					}
				},

				createVersion : function(docID, fileID, docName, docPath) {
					if (fileID == '') {
						return;
					}
					var eventData = {
						'cancel' : false,
						'source' : this
					};
					this.fireEvent("onCreateVersion", eventData);
					if (eventData.cancel)
						return;
					if ('.doc.docx.xls.xlsx.ppt.'.indexOf(String(/\.[^\.]+$/
							.exec(docName))
							+ '.') < 0) {
						butone.Util.hint(new justep.Message2(
								justep.Message2.JUSTEP232058).getMessage());
						return;
					}

					var currentNode = DocUtils.InnerUtils.evalChangeLog(
							this.changeLog, docID);
					if (currentNode != null) {
						DocUtils.InnerUtils.removeChangeLog(this.changeLog,
								docID);
					}
					DocUtils.InnerUtils.createVersion(docID, false, docName);
				},

				// 保存相关逻辑
				save : function() {
					var data = this.bindData;
					var changedIDs = this._getChangedIDList();
					for ( var j = 0; j < changedIDs.length; j++) {
						var billID = changedIDs[j];
						var attachValue = data.getValue(this.relation, data
								.getRowByID(billID));
						if (attachValue) {
							DocUtils.InnerUtils.addCreateVersionLog(
									this.changeLog, JSON.parse(attachValue),
									billID);
						}
					}
					this.commit();
				},

				_getChangedIDList : function() {
					var ids = [];
					var bindData = this.bindData;
					bindData.eachAll(function(data) {
						var row = data.row;
						var recordState = row.row.userdata.recordState;
						if ("edit" == recordState) {
							ids.push(bindData.getRowID(row));
						}
					}, bindData);
					return ids;
				},

				commit : function() {
					var commitRows = DocUtils.InnerUtils
							.commitDoc(this.changeLog, this.rootPath,
									"commitAttachAction");
					if (commitRows) {
						var items = commitRows.rows;
						for ( var i = 0; i < items.length; i++) {
							var doc = null;
							var item = items[i];
							if ((item.userdata.recordState == 'new' || item.userdata.recordState == 'edit')
									&& item.sKind.value != 'dir') {
								var docID = item.userdata.id.value;
								var billID = item.bill_id.value;
								var data = this.getValue(billID);
								for ( var j = 0; j < data.length; j++) {
									if (docID == data[j].docID) {
										doc = data[j];
									}
								}
								doc.fileID = item.sFileID.value;
								var docLiveVersionID = item.sDocLiveVersionID.value;
								DocUtils.InnerUtils.updateChangeLog(
										this.changeLog, docID, doc.fileID,
										docLiveVersionID);
								// type,docID,docName,size,docPath,fileID,billID
								this.setValue("edit", docID, doc.docName,
										doc.size, doc.docPath, doc.fileID,
										billID);

							}
						}
					}
				},

				showHistory : function($object) {
					var fileID = $object.fileID.get();
					var docID = $object.docID.get();
					var eventData = {
						'cancel' : false,
						'data' : {
							'docID' : docID,
							'fileID' : fileID
						},
						'source' : this
					};
					this.fireEvent("onShowHistory", eventData);
					if (eventData.cancel)
						return false;
					DocDialog.openDocHistoryDialog(docID, fileID,
							this.rootPath, this.access);
				},

				_refreshChangeLog : function() {
					this.changeLog = {
						items : [],
						createVersionLogs : [],
						"operate" : "",
						"url" : "",
						process : this.process,
						activity : this.activity
					};
				},

				/**
				 * 组件展现逻辑
				 * 
				 * @param initValue
				 */
				initAttachmentValue : function(initValue) {
					var self = this;
					if (this.$attachmentItems) {
						BindMapping.fromJS(initValue, this.$attachmentItems);
					} else {
						this.$attachmentItems = BindMapping.fromJS(initValue);
					}
				},
				initUploader : function() {
					var self = this;

					self.uploader = new Uploader(self.$domNode
							.find('.x-item-upload'));

					self.uploader.on('onStart', function(data) {
						var actionUrl = DocUtils.InnerUtils.getdocServerAction(
								self.rootPath, "/repository/file/cache/upload",
								true);
						self.uploader.actionUrl = actionUrl;
					});

					self.uploader.on('onFileSelect', function(data) {
						var _data = {
							source : self,
							cancel : false
						};
						self.fireEvent('onFileSelect', _data);
						data.cancel = _data.cancel;
					});

					self.uploader.on('onStart', function(event) {
						var _data = {
							source : self,
							event : event,
							cancel : false
						};
						self.fireEvent('onStart', _data);
						event.cancel = _data.cancel;
					});

					self.uploader.on('onProgress', function(event) {
						self.$domNode.find('.x-doc-process-bar').show().css(
								'width', event.percentComplete);
						var _data = {
							source : self,
							event : event
						};
						self.fireEvent('onProgress', _data);
					});
					self.uploader.on('onFileSelected', function(event) {
						var _data = {
							source : self,
							event : event
						};
						self.fireEvent('onFileSelected', _data);
					});
					self.uploader.on('onSuccess', function(data, fileName) {
						self.$domNode.find('.x-doc-process-bar').hide().css(
								'width', '0%');
						var _data = {
							source : self,
							data : data,
							fileName : fileName
						};
						self.fireEvent('onSuccess', _data);
						// data.response 为 ResponseXML
						var file = $(data.response).find("file");
						var kind = $(file).attr("mediatype");
						var cacheName = $(file).attr("file-name");
						var size = $(file).attr("fileSize");
						self.uploadDoc.call(self, fileName, kind, size,
								cacheName);
						self.changeState("upload");
					});
					self.uploader.on('onError', function(event) {
						var _data = {
							source : self,
							event : event
						};
						self.fireEvent('onError', _data);
						self.changeState("upload");
					});
				},
				controlsDescendantBindings : function() {
					return true;
				},
				doInit : function(value, bindingContext, allBindings) {
					this.callParent(value, bindingContext, allBindings);
					this.modelContext = this.getModel().getContext();

					var currentDeptName = this.modelContext
							.getCurrentDeptName();
					this.userName = this.modelContext.getCurrentPersonName()
							+ (currentDeptName ? ('(' + currentDeptName + ')')
									: '');
					this.userInitials = this.modelContext
							.getCurrentPersonName();

					this.process = this.modelContext.getCurrentProcess();
					this.activity = this.modelContext.getCurrentActivity();
					this.$limit = butone.Bind.observable(parseInt(this.limit));
					this.$state = butone.Bind.observable(this.state);
					this.$activeDoc = butone.Bind.observable();

					this.initUploader();
					var self = this;

					$('body').on(
							'click',
							function(event) {
								if (self.$state
										&& self.$state.get() == 'remove'
										&& (!$(event.target).hasClass(
												'x-remove-barget'))
										&& (!$(event.target).hasClass(
												'x-item-remove'))) {
									self.changeState("upload");
								}
							});
					this.getDocLinkDefine();
					/* $.extend(self,self.getModel()); */
					butone.Bind.applyBindings(self, this.$domNode.find(
							'.x-attachment-pc').get(0));
				},

				doUpdate : function(value, bindingContext, allBindings) {
					this.callParent(value, bindingContext, allBindings);
					if (butone.Bind.isObservable(this.ref)
							&& this.ref['define']) {
						if (this.bindData == undefined) {
							this.bindData = this.ref['define'].data;
							this._attachDataEvent();
							this.bindRelation = this.ref['define'].defCol.name;
							if (this.ref.attachmentChangeLog) {
								this.changeLog = this.ref.attachmentChangeLog;
							} else {
								this.changeLog = this.ref.attachmentChangeLog = {
									items : [],
									createVersionLogs : [],
									"operate" : "",
									"url" : "",
									process : this.process,
									activity : this.activity
								};
							}
						}
						var _value = [];
						try {
							_value = JSON.parse(this.ref.get());
						} catch (e) {
							_value = [];
						}
						this.initAttachmentValue(_value);
						if (this.$attachmentItems.get().length == 0) {
							this.changeState("upload");
						}
						if (this.isDisabled()) {
							this.docAccess = this.access;
							this.set({
								access : "7"
							});
						} else if (this.docAccess) {
							this.set({
								access : this.docAccess
							});
						}
					} else {
						this.initAttachmentValue([]),
						this.set({
							access : "7"
						});
					}
				},
				/**
				 * controller
				 */
				changeState : function(state) {
					this.$activeDoc.set();
					this.$state.set(state);
				},

				previewPicture : function($object) {
					var url = this.getPictureUrl($object);
					if (url) {
						return "url(" + url + ")";
					}
				},

				getPictureUrl : function($object) {
					var fileID = $object.fileID.get();
					var docName = $object.docName.get();
					var imgFileType = ".jpg,.jpeg,.jpe,.png,.gif,.tiff,.tif,.svg,.svgz,.svg,.bmp";
					var url = "";
					if (imgFileType.indexOf((String(/\.[^\.]+$/.exec(docName))
							.toLowerCase())) >= 0) {
						if (!fileID) {
							var docID = $object.docID.get();
							var changeLog = DocUtils.InnerUtils.evalChangeLog(
									this.changeLog, docID);
							// 兼容一种情况，一个页面上有多个附件，其他附件传的文件当前附件没有changeLog
							// 所以不会有fileID
							if (changeLog) {
								fileID = changeLog.cache_name;
							} else {
								return;
							}
						}
						url = DocUtils.InnerUtils.getdocServerAction(
								$object.docPath.get(), "/repository/file/view/"
										+ fileID + "/last/content", false);
					} else if (".mp3,.wav".indexOf((String(/\.[^\.]+$/
							.exec(docName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/mp3.png');
					} else if (".mp4,.wmv,.mov,.MOV"
							.indexOf((String(/\.[^\.]+$/.exec(docName))
									.toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/mp4.png');
					} else if (".avi"
							.indexOf((String(/\.[^\.]+$/.exec(docName))
									.toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/avi.png');
					} else if (".doc,.docx".indexOf((String(/\.[^\.]+$/
							.exec(docName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/doc.png');
					} else if (".ppt,.pptx".indexOf((String(/\.[^\.]+$/
							.exec(docName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/ppt.png');
					} else if (".txt,.text".indexOf((String(/\.[^\.]+$/
							.exec(docName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/txt.png');
					} else if (".pdf"
							.indexOf((String(/\.[^\.]+$/.exec(docName))
									.toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/pdf.png');
					} else if (".xls,.xlsx".indexOf((String(/\.[^\.]+$/
							.exec(docName)).toLowerCase())) >= 0) {
						url = require
								.toUrl('base/components/knockout/css/xlsx.png');
					} else {
						url = require
								.toUrl('base/components/knockout/css/other.png');
					}
					return url;
				},

				previewOrRemoveItem : function($object) {
					if (this.$state.get() == 'upload'
							&& this.$access.get() % 4 >= 2) {
						var fileID = $object.fileID.get();
						var docID = $object.docID.get();
						if (!fileID && fileID == "") {
							var changeLog = DocUtils.InnerUtils.evalChangeLog(
									this.changeLog, docID);
							// 兼容一种情况，一个页面上有多个附件，其他附件传的文件当前附件没有changeLog
							// 所以不会有fileID
							if (changeLog) {
								fileID = changeLog.cache_name;
								this.browseDoc(docID, $object.docName.get(),
										fileID);
							}
						} else {
							this
									.browseDoc(docID, $object.docName.get(),
											fileID);
						}
					} else if (this.$state.get() == 'remove') {
						this.deleteDoc($object);
					}
				},

				// Utils
				getDataByID : function(docID) {
					var value = this.ref.get();
					if (value) {
						var data = JSON.parse(value);
						for ( var i = 0; i < data.length; i++) {
							if (data[i].docID == docID) {
								return data[i];
							}
						}
					}
				},

				setValue : function(type, docID, docName, size, docPath,
						fileID, billID) {
					fileID = fileID ? fileID : "";
					billID = billID
							|| this.bindData.getRowID(this.ref.define.row);
					var data = this.getValue(billID);
					if (type == "new") {
						var item = {};
						item.docID = docID;
						item.docName = docName;
						item.size = size;
						item.docPath = docPath;
						item.fileID = fileID;
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
								if (docPath) {
									data[j].docPath = docPath;
								}
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
					this.bindData.setValueByID(this.bindRelation, JSON
							.stringify(data), billID);
				},
				getValue : function(billID) {
					var data = [];
					var value = "";
					value = this.bindData.getValueByID(this.bindRelation,
							billID);
					if (value) {
						try {
							data = JSON.parse(value);
						} catch (e) {
							if (console) {
								console
										.log("绑定的数据解析失败[value:" + value + "]",
												e);
							}
							data = [];
						}
					}
					return data;
				}
			});

	Component.register(url, Attachment);
	return Attachment;
});
