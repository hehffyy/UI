define(function(require) {
	require("base/lib/bind/system.res");
	var $ = require("jquery");
	var Dialog = require("./dialog");
	var url = "$model/base/components/knockout/windowDialog";
	var ComponentConfig = require("./windowDialog.config");

	var WindowDialog = Dialog
			.extend({
				getConfig : function() {
					return ComponentConfig;
				},
				constructor : function(options) {
					this.id = null;
					this.url = null;
					this.process = null;
					this.activity = null;
					this.reloadOnOpen = false;
					this.executor = null;
					this.executorContext = null;
					this.isCall = false;
					this.isFrameInited = false;

					this.callParent(options);
					this.status = null;
				},
				dispose : function() {
					if (this._compose) {
						this._compose.free();
					}
					this.callParent();
				},
				doInit : function(value, bindingContext) {
					this.callParent(value, bindingContext);
					// 产生组件通讯的唯一标识,使用xid
					var id = this.$domNode.attr('id');
					if (!id) {
						id = this.id = justep.Utils.randomString();
						this.$domNode.attr('id', id);
					}
					this.dlgId = this.id + "_dlg";
					this.frameId = this.id + "_frame";

				},

				propertyChangedHandler : function(key, oldVal, value) {
					switch (key) {
					case "url":
						if(oldVal!= value){
							this.isFrameInited = false;
							this.isCall = false;
						}
					case "process":
					case "activity":
						if (oldVal != value && this._inited) {

						}
						break;
					default:
						this.callParent(key, oldVal, value);
					}
				},

				send : function(data) {
					if (data) {// 判断投递给自己的消息才处理
						var evtData = {
							source : this,
							data : data
						};
						this.fireEvent('onReceive', evtData);
						// 增加mapping处理
						this.onReceiveByMapping(this, evtData.data);
						this.fireEvent('onReceived', evtData);
					}
				},

				refresh : function(data) {
					$('#' + this.frameId).attr("src", "about:blank").hide();
					this.callURL();
				},

				/**
				 * 打开dialog
				 */
				open : function(data, title, url, process, activity, executor,
						executorContext) {
					var option = {
						'data' : data,
						'title' : title,
						'url' : url,
						'process' : process,
						'activity' : activity,
						'executor' : executor,
						'executorContext' : executorContext
					};
					this.open2(option);
					this.callParent(option);
				},

				open2 : function(option) {
					this.sendData = undefined;
					if (option) {
						this.sendData = option.data;
						if (option.title)
							this.set("title", option.title);
						if (option.process)
							this.set("process", option.process);
						if (option.activity)
							this.set("activity", option.activity);
						if (option.executor)
							this.set("executor", option.executor);
						if (option.executorContext)
							this.set("executorContext", option.executorContext);
						if (option.url)
							this.set("url", option.url);
					}
					this.initWindowDialog();
					if (this.reloadOnOpen || !this.isCall) {
						this.callURL();
					} else {
						this.sendToFrame();
					}
				},

				initWindowDialog : function() {
					if (this.isFrameInited) {
						if (this.reloadOnOpen) {
							this.removeFrame();
							this.addFrame();
						}
					} else {
						this.removeFrame();
						this.addFrame();
						this.fireEvent("onInit", {
							source : this
						});
						this.isFrameInited = true;
					}
				},
				addFrame : function() {
					var size = $("#" + this.frameId).size();
					if (size > 0) {
						return;
					}
					var content = "<iframe id=\""
							+ this.frameId
							+ "\" frameborder=\"0\" style=\"width:100%;height:100%\" scrolling=\"auto\" src=\"about:blank\"/>";//
					this.setContent(content);
					var frameE = $('#' + this.frameId);
					// frameE[0].windowDialog = this;
					// TODO TKJ 统一windowDialog windowRunner的打开方式
					frameE[0].opener = this;
					frameE.parent().css("overflow","hidden");
				},
				removeFrame : function() {
					$('#' + this.frameId).attr('src', 'about:blank').remove();
				},
				getFrame : function() {
					return $("#" + this.frameId)[0];
				},
				getContentDocument : function() {
					return this.getContentWindow().document;
				},
				getContentWindow : function() {
					return $("#" + this.frameId)[0].contentWindow;
				},

				callURL : function(option) {
					if (this.url) {
						var url = justep.Request.setBizParams(justep.Request
								.convertURL(this.url), this.process,
								this.activity, this.executor,
								this.executorContext);
						var id = this.frameId;
						var $iframe = $('#' + id);
						var frame = $iframe[0];
						// TODO TKJ
						// 改由windowReceiver.initXBL2中调用opener.sendToFrame
						// $iframe.unbind("load").bind("load", function() {
						// window.setTimeout(function() {
						// frame.windowDialog.sendToFrame();
						// }, 10);
						// });
						window.setTimeout(function() {
							$iframe.attr("src", url).show();
						}, 1);
					}
					this.isCall = true;
				},

				sendToFrame : function() {
					var frame = $("#" + this.frameId).get(0);
					var b = false;
					try {// 沉默跨域的url
						b = !!(frame.contentWindow.name + "name");
					} catch (e) {
					}
					if (b
							&& frame.contentWindow
							&& frame.contentWindow.justep
							&& frame.contentWindow.justep.windowReceiver
							&& frame.contentWindow.justep.windowReceiver.windowReceive) {
						frame.contentWindow.justep.windowReceiver.windowParentObj = this;
						var eventData = {
							source : this,
							data : this.sendData
						};
						this.fireEvent("onSend", {
							source : this,
							data : this.sendData
						});

						frame.contentWindow.justep.windowReceiver
								.windowReceive(eventData);
					} else if (b && frame.contentWindow
							&& frame.contentWindow.windowReceive) {// 兼容旧版本
						frame.contentWindow.windowParentObj = this;
						var eventData = {
							source : this,
							data : this.sendData
						};
						this.fireEvent("onSend", {
							source : this,
							data : this.sendData
						});
						frame.contentWindow.windowReceive(eventData);
					}
				},

				ensure : function(store, noclose) {
					var frame = $("#" + this.frameId).get(0);
					if (frame.contentWindow && frame.contentWindow.xforms
							&& frame.contentWindow.xforms.blur)
						frame.contentWindow.xforms.blur(true);
					var eventData = {
						source : this,
						data : store
					};
					this.fireEvent("onReceive", eventData);

					this.onReceiveByMapping(this, eventData.data);

					this.fireEvent("onReceived", eventData);

					// 如果是xforms页面直接进行页面向instance写值
					if (typeof (noclose) == "undefined" || noclose == false) {
						this.close();
					}
				},

				cancel : function() {
					this.close();
				},

				onReceiveByMapping : function(node, store) {
					if (!node.domNode)
						return;
					var $C = $(node.domNode), mapping = [], operation = null, dataId = null, locfrom = [], locto = [], isArr = false;

					dataId = $C.find('result').attr("concept");
					operation = $C.find('result').attr("operation");
					$C.find('mapping').each(function() {
						mapping.push(this);
						if (this.getAttribute("locator") == "true") {
							locfrom.push(this.getAttribute("from"));
							locto.push(this.getAttribute("to"));
						}
					});

					if (!dataId || dataId == "" || !operation
							|| operation == "") {
						return;
					}

					var dataTar = justep.xbl(dataId);
					if (!dataTar)
						return;

					var dataOri = null;
					if (Object.prototype.toString.apply(store) === '[object Array]') {
						dataOri = store;
						isArr = true;
					} else {
						try {
							dataOri = store.getSimpleStore();
						} catch (e) {
							var msg = new justep.Message(
									justep.Message.JUSTEP231067, "WindowDialog");
							throw justep.Error.create(msg);
						}
					}

					if (!dataOri)
						return;
					var c = isArr ? dataOri.length : dataOri.rowsBuffer.length;
					if (operation == "new") {
						justep.XData.disableControls();
						try {
							var newData = [];
							for ( var i = 0; i < c; i++) {
								var o = {};
								for ( var j = 0; j < mapping.length; j++) {
									setValue(o, mapping[j], i);
								}
								newData.push(o);
							}
							if (newData.length > 0)
								dataTar.newData(dataTar.getCount(), null,
										newData);
						} finally {
							justep.XData.enableControls();
						}
					} else if (operation == "edit") {
						var newData = [];
						for ( var i = 0; i < c; i++) {
							var query = dataTar.locate(
									createLocfrom(locfrom, i), locto, false,
									false, false);

							if (query && query.length > 0) {
								for ( var k = 0; k < query.length; k++) {
									for ( var j = 0; j < mapping.length; j++) {
										setValue(null, mapping[j], i, query[k]);
									}
								}
							} else {
								var o = {};
								for ( var j = 0; j < mapping.length; j++) {
									setValue(o, mapping[j], i);
								}
								newData.push(o);
							}
						}
						if (newData.length > 0)
							dataTar.newData(dataTar.getCount(), null, newData);
					} else if (operation == "clear") {
						removeAll(dataTar);
						justep.XData.disableControls();
						try {
							var newData = [];
							for ( var i = 0; i < c; i++) {
								var o = {};
								for ( var j = 0; j < mapping.length; j++) {
									setValue(o, mapping[j], i);
								}
								newData.push(o);
							}
							if (newData.length > 0)
								dataTar.newData(dataTar.getCount(), null,
										newData);
						} finally {
							justep.XData.enableControls();
						}

					} else if (operation == "modify") {
						for ( var i = 0; i < c; i++) {
							for ( var j = 0; j < mapping.length; j++) {
								setValue(null, mapping[j], i, dataTar
										.getCurrentRowId());
							}
						}
					} else {
						return;
					}

					function removeAll(data) {
						var c = data.getCount();
						data.deleteConfirm = false;
						for (i = 0; i < c; i++) {
							data.deleteData(data.getRowId(i));
						}
						data.deleteConfirm = true;
					}

					function setValue(data, node, rownum, rowid) {
						var from = node.getAttribute("from");
						var to = node.getAttribute("to");
						if (!from || from == "" || !to || to == "")
							return;
						var val = "";
						if (isArr) {
							val = (dataOri[rownum])[from];
						} else {
							if (from == "rowid")
								val = dataOri.getRowId(rownum);
							else
								val = dataOri.getValueByName(from, rownum);
						}
						if (data)
							data[to] = val || "";
						else
							dataTar.setValue(to, val || "", rowid);
					}

					function createLocfrom(locfrom, rownum) {
						var re = [];
						for ( var i = 0, c = locfrom.length; i < c; i++) {
							if (isArr) {
								re.push((dataOri[rownum])[locfrom[i]]);
							} else {
								re.push(dataOri.getValueByName(locfrom[i],
										rownum));
							}
						}
						return re;
					}
				}

			});
	butone.Component.register(url, WindowDialog);
	return WindowDialog;
});