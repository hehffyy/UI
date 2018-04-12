define(function(require) {
	require("css!./css/attachment").load();
	var $ = require("jquery");
	var Bind = require("bind");
	var Uploader = require("base/lib/bind/uploader");
	var BindComponent = require("base/lib/bind/bindComponent"),
	BindMapping = require("base/lib/bind/bind.mapping");
	var url = "$model/UI/base/components/knockout/attachment",
	ComponentConfig = require("./attachment.config");
	var Attachment = BindComponent.extend({
			constructor : function (e) {
				this.callParent(e),
				this.keyID = "",
				this.rootPath = "/defaultDocNameSpace",
				this.limit = "998",
				this.limitSize = "",
				this.subPath = "",
				this.state = "upload",
				this.access = "",
				this.showName = false,
				this.initAttachmentValue([]);
			},
			getDisplayHtml : function (e) {
				if (rowData && rowData.row) {
					var n = rowData.row.val(rowData.colDef.name);
					try {
						var r = JSON.parse(n),
						i = "";
						return
						t.each(r, function (e, t) {
							i = i + t.docName + ";";
						}),
						"<div style='overflow:hidden;white-space:nowrap;text-overflow:ellipsis;padding-right:15px;'>"
						 + i + "</div>";
					} catch (s) {}

				}
			},
			propertyChangedHandler : function (e, t, n) {
				this.callParent(e, t, n);
				if (e == "access") {
					var r = justep.doc.InnerUtils.accessEnum[n] ? justep.doc.InnerUtils.accessEnum[n]
						 : n;
					n != r && this.set({
						access : r
					});
					var i = parseInt(n);
					if(!isNaN(i)){
						this.$access ? this.$access.set(i)
								 : this.$access = Bind.observable(i);
					}
				}
			},
			buildTemplate : function (e) {
				var n = '<div component="' + url + '" access="duud"><div class="x-attachment"><div class="x-attachment-content x-card-border"><div class="x-attachment-cell" data-bind="visible:$state.get() == \'upload\' &amp;&amp; ($limit.get() == \'-1\' || $limit.get() > $attachmentItems.get().length)"><div class="x-attachment-item x-item-upload" data-bind="visible:$state.get() == \'upload\' &amp;&amp; $access.get() % 512 >= 256"></div></div><div class="x-attachment-cell" data-bind="visible:$state.get() == \'upload\'"><div class="x-attachment-item x-item-remove" data-bind="click:changeState.bind($object,\'remove\'),visible:$access.get() % 2048 >= 1024"></div></div><div data-bind="foreach:$attachmentItems"><div class="x-attachment-cell"><div class="x-attachment-item x-item-other" data-bind="click:$model.previewOrRemoveItem.bind($model),style:{opacity: $model.$access.get() % 4 >= 2 || $model.$state.get() == \'remove\' ? \'1.0\' : \'0.5\',backgroundImage:($model.previewPicture.bind($model,$object))()}"><a data-bind="visible:$model.$state.get() == \'remove\'" class="x-remove-barget"></a></div></div></div><div style="clear:both;"></div></div></div></div>';
				var r = $(n).attr(e);
				return r.get(0);
			},
			getConfig : function () {
				return ComponentConfig;
			},
			getContextID : function () {
				return this.getModel().getContextID();
			},
			_callModelFn : function () {
				var event = arguments[2];
				return event.bindingContext = Bind
					.contextFor(event.currentTarget),
				this.getModel()[arguments[0]].apply(
					this.getModel(), [event]);
			},
			_attachDataEvent : function () {
				var data = this.bindData;
				if (data && !this.eventAttached) {
					var t = function (e) {
						this._refreshChangeLog();
					};
					data.__data.attachEvent(justep.XData.EVENT_REFRESHDATA_AFTER, t, this);
					var n = function (e) {
						this.save();
					};
					data.__data.attachEvent(justep.XData.EVENT_SAVEDATA_BEFORE, n, this);
					var r = function (e) {
						justep.doc.InnerUtils.saveDoc(this.changeLog, false),
						this
						._refreshChangeLog();
					};
					data.__data.attachEvent(justep.XData.EVENT_SAVEDATA_AFTER, r, this),
					this.eventAttached = !0;
				}
			},
			getDocLinkDefine : function () {
				var e = justep.doc.InnerUtils.queryDefine(this.process,
						this.activity, this.keyId, true);
				if (e && e.rootPath)
					this.rootPath = e.rootPath;
				if (e.subPath)
					this.subPath = e.subPath;
				if (e.limitSize)
					this.limitSize = e.limitSize;
				if (e.access)
					this.set({
						access : e.access
					});
				if (this.isDisabled())
					this.docAccess = this.access, this.set({
						access : "7"
					});
			},
			getDocPath : function (e) {
				if (!this.subPath) {
					this.docPath = this.rootPath;
					var t = this.docPath.substring(this.docPath
							.lastIndexOf("/") + 1),
					n = justep.doc.InnerUtils
						.queryDoc(t, undefined, ["sDocDisplayPath",
								"sDocName"], undefined, undefined,
							"single"),
					r = n.sDocDisplayPath.value,
					i = n.sDocName.value;
					this.docDisplayPath = justep.doc.InnerUtils
						.getDocFullDisplayPath(i, r);
				} else {
					var option = {},
					params = new justep.Request.ActionParam;
					params.setString("rootPath", this.rootPath),
					params.setString(
						"subPath", this.subPath),
					params.setString("billID",
						this.billID),
					params.setString("process",
						this.process),
					params.setString("activity",
						this.activity),
					params.setBoolean("isTree", !1),
					option.process = "/SA/doc/system/systemProcess",
					option.activity = "mainActivity",
					option.dataType = "json",
					option.parameters = params,
					option.action = "queryLinkDirAction",
					option.directExecute = !0;
					var l = justep.Request.sendBizRequest2(option);
					if (!s.Utils.isBizSuccess(l, "json"))
						throw justep.Error2.create((new justep.Message2(
									justep.Message2.JUSTEP232060)).getMessage());
					var c = justep.Request.responseParseJSON(l).data.value;
					for (var h = 0; h < c.rows.length; h++) {
						var n = c.rows[h];
						if (n.is_exist.value == "true")
							continue;
						var p = "0";
						justep.doc.InnerUtils.addChangeLog(this.changeLog, "newDir",
							[n.userdata.id.value, p, "", "",
								n.sDocName.value, "dir", "",
								n.sParentID.value,
								n.sDocPath.value,
								n.sDocDisplayPath.value, "", "",
								"", "", ""], undefined, "");
					}
					var d = c.userdata;
					t = d["sys.selectedID"],
					this.docPath = d["sys.selectedPath"],
					this.docDisplayPath = d["sys.selectedDisplayPath"];
				}
				this.parentID = t;
			},
			uploadDoc : function (e, t, n, r, i, u) {
				var a = justep.Utils.randomString(),
				f = this.bindData
					.getRowID(this.ref.define.row);
				if (!this.docPath)
					this.getDocPath(f);
				if (!this.parentID) {
					this.docPath = this.rootPath,
					this.parentID = this.docPath
						.substring(this.docPath
							.lastIndexOf("/") + 1);
				}
				typeof i == "undefined" && (i = ""),
				typeof u == "undefined" && (u = ""),
				justep.doc.InnerUtils
				.addChangeLog(this.changeLog, "new", [a,
						"0", "", "", e, t, n,
						this.parentID, this.docPath,
						this.docDisplayPath, "", "", "",
						"", ""], ["attach", r, i, u], f),
				this.setValue(
					"new", a, e, n, this.docPath);
			},
			save : function () {
				this.commit();
			},
			commit : function () {
				var e = justep.doc.InnerUtils.commitDoc(this.changeLog,
						this.rootPath, "commitAttachAction");
				if (e) {
					var t = e.rows;
					for (var n = 0; n < t.length; n++) {
						var r = null,
						row = t[n];
						if ((row.userdata.recordState == "new" || row.userdata.recordState == "edit")
							 && row.sKind.value != "dir") {
							var o = row.userdata.id.value,
							u = row.bill_id.value,
							a = this
								.getValue(u);
							for (var f = 0; f < a.length; f++)
								o == a[f].docID && (r = a[f]);
							r.fileID = row.sFileID.value;
							var l = row.sDocLiveVersionID.value;
							justep.doc.InnerUtils.updateChangeLog(this.changeLog, o,
								r.fileID, l),
							this.setValue("edit", o,
								r.docName, r.size, r.docPath, r.fileID,
								u);
						}
					}
				}
			},
			browseDoc : function (e, t, n) {
				var r = {
					source : this,
					cancel : !1,
					data : {
						docID : e,
						fileID : n
					}
				};
				this.fireEvent("onBrowse", [r]);
				if (r.cancel)
					return;
				justep.doc.InnerUtils.browseDocByFileID(this.rootPath, t, n, "last",
					"content", "OpenOffice", false);
			},
			deleteDoc : function (e, t) {
				var n = {
					cancel : !1,
					data : {
						docID : e,
						docName : t
					},
					source : this
				};
				this.fireEvent("onDelete", [n]);
				if (n.cancel)
					return;
				this.setValue("delete", e);
				var r = this.changeLog.items;
				for (var i in r)
					r[i].doc_id == e && this.changeLog.items.splice(i, 1);
			},
			_refreshChangeLog : function () {
				this.changeLog = {
					items : [],
					createVersionLogs : [],
					operate : "",
					url : "",
					process : this.process,
					activity : this.activity
				};
			},
			initAttachmentValue : function (e) {
				var t = this;
				this.$attachmentItems ? BindMapping.fromJS(e, this.$attachmentItems)
				 : this.$attachmentItems = BindMapping.fromJS(e);
			},
			initUploader : function () {
				var e = this;
				e.uploader = new Uploader(e.$domNode
						.find(".x-item-upload")),
				e.uploader
				.on(
					"onStart",
					function (t) {
					var actionUrl = justep.doc.InnerUtils
						.getdocServerAction( e.rootPath,"/repository/file/cache/upload",true);
					e.uploader.actionUrl = actionUrl;
				}),
				e.uploader.on("onFileSelect", function (t) {
					var n = {
						source : e,
						cancel : !1
					};
					e.fireEvent("onFileSelect", n),
					t.cancel = n.cancel;
				}),
				e.uploader.on("onStart", function (t) {
					var n = {
						source : e,
						event : t,
						cancel : !1
					};
					e.fireEvent("onStart", n),
					t.cancel = n.cancel;
				}),
				e.uploader.on("onProgress", function (t) {
					e.$domNode.find(".x-doc-process-bar").show()
					.css("width", t.percentComplete);
					var n = {
						source : e,
						event : t
					};
					e.fireEvent("onProgress", n);
				}),
				e.uploader.on("onFileSelected", function (t) {
					var n = {
						source : e,
						event : t
					};
					e.fireEvent("onFileSelected", n);
				}),
				e.uploader
				.on(
					"onSuccess",
					function (n, r) {
					e.$domNode.find(
						".x-doc-process-bar")
					.hide().css("width",
						"0%");
					var i = {
						source : e,
						data : n,
						fileName : r
					};
					e.fireEvent("onSuccess", i);
					var s = $(n.response).find(
							"file"),
					o = $(s).attr(
							"mediatype"),
					u = $(s)
						.attr("file-name"),
					a = $(
							s).attr("fileSize");
					e.uploadDoc.call(e, r,
						o, a, u),
					e.changeState("upload");
				}),
				e.uploader.on("onError",
					function (t) {
					var n = {
						source : e,
						event : t
					};
					e.fireEvent("onError", n),
					e
					.changeState("upload");
				});
			},
			controlsDescendantBindings : function () {
				return !0;
			},
			doInit : function (e, n, r) {
				this.callParent(e, n, r),
				this.modelContext = this
					.getModel().getContext(),
				this.process = this.modelContext
					.getCurrentProcess(),
				this.activity = this.modelContext
					.getCurrentActivity(),
				this.$limit = Bind
					.observable(parseInt(this.limit));
				this.$state = Bind.observable(this.state),
				this
				.initUploader();
				var me = this;
				$("body").on(
					"click",
					function (e) {
					me.$state
					 && me.$state.get() == "remove"
					 && !$(e.target).hasClass(
						"x-remove-barget")
					 && !$(e.target).hasClass(
						"x-item-remove")
					 && me.changeState("upload");
				}),
				this.getDocLinkDefine(),
				Bind.applyBindings(
					me, this.$domNode.find(".x-attachment").get(0));
			},
			doUpdate : function (e, t, n) {
				this.callParent(e, t, n);
				if (Bind.isObservable(this.ref) && this.ref.define) {
					if (this.bindData==undefined) {
						this.bindData = this.ref.define.data,
						this._attachDataEvent(),
						this.bindRelation = this.ref.define.defCol.name;
						this.ref.attachmentChangeLog ? this.changeLog = this.ref.attachmentChangeLog
							 : this.changeLog = this.ref.attachmentChangeLog = {
							items : [],
							createVersionLogs : [],
							operate : "",
							url : "",
							process : this.process,
							activity : this.activity
						};
					}
					var r = [];
					try {
						r = JSON.parse(this.ref.get());
					} catch (i) {
						r = [];
					}
					this.initAttachmentValue(r),
					this.$attachmentItems
					.get().length == 0
					 && this.changeState("upload");
					if (this.isDisabled()) {
						this.docAccess = this.access,
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
			changeState : function (e) {
				this.$state.set(e);
			},
			getPictureUrl : function (config) {
				var n = config.fileID.get(),
				r = config.docName.get(),
				i = ".jpg,.jpeg,.jpe,.png,.gif,.tiff,.tif,.svg,.svgz,.svg,.bmp",
				o = "";
				if (i.indexOf(String(/\.[^\.]+$/.exec(r)).toLowerCase()) >= 0) {
					if (!n) {
						var u = config.docID.get(),
						changeLog = justep.doc.InnerUtils
							.evalChangeLog(this.changeLog, u);
						if (!changeLog)
							return;
						n = changeLog.cache_name;
					}
					o = justep.doc.InnerUtils.getdocServerAction(config.docPath.get(), "/repository/file/view/" + n
							 + "/last/content",
							false);
				} else
					".mp3,.wav".indexOf(String(/\.[^\.]+$/.exec(r))
						.toLowerCase()) >= 0 ? o = require
						.toUrl("base/components/knockout/css/mp3.png")
						 : ".mp4,.wmv,.mov,.MOV".indexOf(String(
								/\.[^\.]+$/.exec(r)).toLowerCase()) >= 0 ? o = require
						.toUrl("base/components/knockout/css/mp4.png")
						 : ".avi".indexOf(String(
								/\.[^\.]+$/.exec(r))
							.toLowerCase()) >= 0 ? o = require
						.toUrl("base/components/knockout/css/avi.png")
						 : ".doc,.docx".indexOf(String(
								/\.[^\.]+$/.exec(r))
							.toLowerCase()) >= 0 ? o = require
						.toUrl("base/components/knockout/css/doc.png")
						 : ".ppt,.pptx"
						.indexOf(String(
								/\.[^\.]+$/
								.exec(r))
							.toLowerCase()) >= 0 ? o = require
						.toUrl("base/components/knockout/css/ppt.png")
						 : ".txt,.text"
						.indexOf(String(
								/\.[^\.]+$/
								.exec(r))
							.toLowerCase()) >= 0 ? o = require
						.toUrl("base/components/knockout/css/txt.png")
						 : ".pdf"
						.indexOf(String(
								/\.[^\.]+$/
								.exec(r))
							.toLowerCase()) >= 0 ? o = require
						.toUrl("base/components/knockout/css/pdf.png")
						 : ".xls,.xlsx"
						.indexOf(String(
								/\.[^\.]+$/
								.exec(r))
							.toLowerCase()) >= 0 ? o = require
						.toUrl("base/components/knockout/css/xlsx.png")
						 : o = require
						.toUrl("base/components/knockout/css/other.png");
				return o;
			},
			previewPicture : function (json) {
				var t = this.getPictureUrl(json);
				if (t)
					return "url(" + t + ")";
			},
			previewOrRemoveItem : function (json) {
				if (this.$state.get() == "upload"
					 && this.$access.get() % 4 >= 2) {
					var t = json.fileID.get(),
					n = json.docID.get();
					if (!t) {
						var r = justep.doc.InnerUtils.evalChangeLog(this.changeLog,
								n);
						if (!r)
							return;
						t = r.cache_name;
					}
					this.browseDoc(n, json.docName.get(), t);
				} else
					this.$state.get() == "remove"
					 && this.deleteDoc(json.docID.get(), json.docName
						.get());
			},
			getDataByID : function (e) {
				var t = this.ref.get();
				if (t) {
					var n = JSON.parse(t);
					for (var r = 0; r < n.length; r++)
						if (n[r].docID == e)
							return n[r];
				}
			},
			setValue : function (e, t, n, r, i, s, u) {
				s = s ? s : "";
				u = u || this.bindData.getRowID(this.ref.define.row);
				var docArr = this.getValue(u);
				if (e == "new") {
					var f = {};
					f.docID = t,
					f.docName = n,
					f.size = r,
					f.docPath = i,
					f.fileID = s,
					docArr.push(f);
				} else if (e == "edit") {
					for (var l = 0; l < docArr.length; l++)
						if (t == docArr[l].docID) {
							s && (docArr[l].fileID = s),
							n && (docArr[l].docName = n),
							r
							 && (docArr[l].size = r),
							i
							 && (docArr[l].docPath = i),
							docArr[l].time = justep.Date.toString(new Date,
									justep.Date.STANDART_FORMAT);
							break;
						}
				} else if (e == "delete")
					for (var l = 0; l < docArr.length; l++)
						if (t == docArr[l].docID) {
							docArr.splice(l, 1);
							break;
						}
				this.bindData.setValueByID(this.bindRelation, JSON
					.stringify(docArr), u);
			},
			getValue : function (e) {
				var t = [],
				n = "";
				n = this.bindData.getValueByID(this.bindRelation, e);
				if (n)
					try {
						t = JSON.parse(n);
					} catch (r) {
						console.log("绑定的数据解析失败[value:" + n + "]", r),
						t = [];
					}
				return t;
			}
		});
	butone.Component.register(url, Attachment);
	return Attachment;
});
