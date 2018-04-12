/**
 * windowDialog
 * 
 * @author zn
 * @createDate 2010年5月10日
 */
(function() {
	// 解决重复引用WindowDialog导致的class不一致
	if(justep.WindowDialog) return;
	justep.WindowDialog = function(id, url, title, modal, status, width,
			height, left, top, initEveryTimes, onSendToFrame,
			onReceiveFromFrame, onDialogInit, onDialogOpen, onDialogClose) {
		if (typeof (dhtmlxEventable) != 'undefined')
			dhtmlxEventable(this);
		else if (typeof (justep.Utils.eventable) != 'undefined')
			justep.Utils.eventable(this);
		this.id = id ? id : (new justep.UUID()).valueOf();

		// process url
		this.url = url;

		this.dlgId = this.id + "_dlg";
		this.frameId = this.id + "_frame";
		this.loadingPanelId = this.id + "_loading_panel";
		this.reloadOnOpen = initEveryTimes;
		this.process = null;
		this.activity = null;
		this.executor = null;
		this.executorContext = null;

		this.isCall = false;
		this.isInited = false;
		this.dialog = new justep.Dialog(this.dlgId, title, modal, status,
				width, height, left, top);
		var self = this;
		this.dialog.attachEvent("onClose", function() {
			self.controlObject(window.document, true);
			if (self.checkEvent("onClose")) {
				self.callEvent("onClose", [ {
					source : self
				} ]);
			}
		}, this.dialog);

		if (onSendToFrame && onSendToFrame != "") {
			var f = null;
			try {
				f = eval(onSendToFrame);
			} catch (e) {
			}
			if (f && typeof f == "function") {
				this.attachEvent("onSend", f, this);
			}
		}

		if (onReceiveFromFrame && onReceiveFromFrame != "") {
			var f = null;
			try {
				f = eval(onReceiveFromFrame);
			} catch (e) {
			}
			if (f && typeof f == "function") {
				this.attachEvent("onReceive", f, this);
			}
		}

		if (onDialogInit && onDialogInit != "") {
			var f = null;
			try {
				f = eval(onDialogInit);
			} catch (e) {
			}
			if (f && typeof f == "function") {
				this.attachEvent("onInit", f, this);
			}
		}

		if (onDialogClose && onDialogClose != "") {
			var f = null;
			try {
				f = eval(onDialogClose);
			} catch (e) {
			}
			if (f && typeof f == "function") {
				this.attachEvent("onClose", f, this);
			}
		}

		if (onDialogOpen && onDialogOpen != "") {
			var f = null;
			try {
				f = eval(onDialogOpen);
			} catch (e) {
			}
			if (f && typeof f == "function") {
				this.attachEvent("onOpen", f, this);
			}
		}

	};

	justep.WindowDialog.prototype.setURL = function(url) {
		this.url = url;
		this.isInited = false;
		this.isCall = false;
	};

	/**
	 * dialog设置的初始化
	 */
	justep.WindowDialog.prototype.initWindowDialog = function() {
		this.controlObject(window.document, false);
		if (this.isInited) {
			if (this.reloadOnOpen) {
				this.removeFrame();
				this.addFrame();
			}
			return;
		} else {
			this.removeFrame();
			this.addFrame();
			if (this.checkEvent("onInit")) {
				this.callEvent("onInit", [ {
					source : this
				} ]);
			}
			this.isInited = true;
		}
	};

	/**
	 * 设置iframe
	 */

	justep.WindowDialog.prototype.addFrame = function() {
		var size = $("#" + this.frameId).size();
		if (size > 0) {
			return;
		}
		var content = "<table id='"
				+ this.loadingPanelId
				+ "' style=\"z-index:-1000;background-color:white;position:absolute;table-layout:fixed;border:0px solid;width:100%;height:100%;left:0;top:0;\" cellpadding=\"0\" cellspacing=\"0\"><tr valign=\"middle\"><td align=\"center\">数据加载中... ...</td></tr></table>"
				+ "<iframe id=\""
				+ this.frameId
				+ "\" frameborder=\"0\" style=\"width:100%;height:100%\" scrolling=\"auto\" src=\"about:blank\"/>";
		this.dialog.setContentHTML(content);
		var frameE = $('#' + this.frameId).get(0);
		// frameE.windowDialog = this;
		// TODO TKJ 统一windowDialog windowRunner的打开方式
		frameE.opener = this;
	};

	/**
	 * 删除iframe
	 */
	justep.WindowDialog.prototype.removeFrame = function() {
		$('#' + this.frameId).attr('src', 'about:blank').remove();
	};

	justep.WindowDialog.prototype.getFrame = function() {
		return $("#" + this.frameId)[0];
	};

	justep.WindowDialog.prototype.getContentDocument = function() {
		return this.getContentWindow().document;
	};

	justep.WindowDialog.prototype.getContentWindow = function() {
		return $("#" + this.frameId)[0].contentWindow;
	};

	/**
	 * TODO 谁增加的，控制activeX的显示，加上CLID判断
	 * 
	 * @param curDoc
	 * @param bShow
	 */
	justep.WindowDialog.prototype.controlObject = function(curDoc, bShow) {
		var iframes = $(curDoc).find("iframe");
		for ( var i = 0; i < iframes.length; i++) {
			var iframe = iframes[i];
			var doc = iframe.contentWindow.document;
			if (bShow)
				$(doc).find("object").css("width", "100%");
			else
				$(doc).find("object").css("width", "0px");
			this.controlObject(doc, bShow);
		}
	};

	/**
	 * 打开dialog
	 */
	justep.WindowDialog.prototype.open = function(data, title, url, process,
			activity, executor, executorContext) {
		this.open2({
			'data' : data,
			'title' : title,
			'url' : url,
			'process' : process,
			'activity' : activity,
			'executor' : executor,
			'executorContext' : executorContext
		});
	};

	justep.WindowDialog.prototype.open2 = function(options) {
		this.sendData = undefined;
		if (options) {
			this.sendData = options.data;
			if (options.title)
				this.setTitle(options.title);
			if (options.process)
				this.setProcess(options.process);
			if (options.activity)
				this.setActivity(options.activity);
			if (options.executor)
				this.setExecutor(options.executor);
			if (options.executorContext)
				this.setExecutorContext(options.executorContext);
			if (options.url)
				this.setURL(options.url);
		}
		this.dialog.open();
		this.initWindowDialog();
		if (this.reloadOnOpen || !this.isCall) {
			this.callURL();
		} else {
			this.sendToFrame();
		}

		if (this.checkEvent("onOpen")) {
			this.callEvent("onOpen", [ {
				source : this
			} ]);
		}
	};

	/**
	 * 关闭dialog
	 */
	justep.WindowDialog.prototype.close = function() {
		if (this.dialog) {
			if (this.checkEvent("onClose")) {
				this.callEvent("onClose", [ {
					source : this
				} ]);
			}
			this.dialog.close();
		}
	};

	/**
	 * 确定 接收从frame获得的数据
	 */
	justep.WindowDialog.prototype.ensure = function(store, noclose) {
		var frame = $("#" + this.frameId).get(0);
		if (frame.contentWindow && frame.contentWindow.xforms
				&& frame.contentWindow.xforms.blur)
			frame.contentWindow.xforms.blur(true);

		if (this.checkEvent("onReceive")) {
			this.callEvent("onReceive", [ {
				source : this,
				data : store
			} ]);
		}

		this.onReceiveByMapping(this, store);

		// 如果是xforms页面直接进行页面向instance写值
		if (typeof (noclose) == "undefined" || noclose == false) {
			this.dialog.close();
		}
	};

	/**
	 * 刷新
	 */
	justep.WindowDialog.prototype.refresh = function() {
		$('#' + this.frameId).attr("src", "about:blank").hide();
		this.callURL();
	};

	/**
	 * 取消
	 */
	justep.WindowDialog.prototype.cancel = function() {
		this.dialog.close();
	};

	/**
	 * 请求特定的url
	 */
	justep.WindowDialog.prototype.callURL = function() {
		if (this.url) {
			var url = justep.Request.setBizParams(justep.Request
					.convertURL(this.url), this.process, this.activity,
					this.executor, this.executorContext);
			var id = this.frameId;
			var $iframe = $('#' + id);
			var frame = $iframe[0];
			// TODO TKJ 改由windowReceiver.initXBL2中调用opener.sendToFrame
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
	};

	/**
	 * 向frame发送数据
	 */
	justep.WindowDialog.prototype.sendToFrame = function() {
		$('#' + this.loadingPanelId).css('display', 'none');
		var frame = $("#" + this.frameId).get(0);
		var b = false;
		try {// 沉默跨域的url
			b = !!(frame.contentWindow.name + "name");
		} catch (e) {
		}
		;
		if (b && frame.contentWindow && frame.contentWindow.justep
				&& frame.contentWindow.justep.windowReceiver
				&& frame.contentWindow.justep.windowReceiver.windowReceive) {
			frame.contentWindow.justep.windowReceiver.windowParentObj = this;
			var eventData = {
				source : this,
				data : this.sendData
			};
			if (this.checkEvent("onSend")) {
				eventData.data = this.callEvent("onSend", [ {
					source : this,
					data : this.sendData
				} ]);
			}
			frame.contentWindow.justep.windowReceiver.windowReceive(eventData);
		} else if (b && frame.contentWindow
				&& frame.contentWindow.windowReceive) {// 兼容旧版本
			frame.contentWindow.windowParentObj = this;
			var eventData = {
				source : this,
				data : this.sendData
			};
			if (this.checkEvent("onSend")) {
				eventData.data = this.callEvent("onSend", [ {
					source : this,
					data : this.sendData
				} ]);
			}
			frame.contentWindow.windowReceive(eventData);
		}
	};

	/**
	 * 是否显示关闭按钮
	 */
	justep.WindowDialog.prototype.setClosable = function(flag) {
		this.dialog.setClosable(flag);
	};

	/**
	 * 是否显示最大最小化按钮
	 */
	justep.WindowDialog.prototype.setMinmaxable = function(flag) {
		this.dialog.setMinmaxable(flag);
	};

	/**
	 * 是否允许拖拽改变大小
	 */
	justep.WindowDialog.prototype.setResizable = function(flag) {
		this.dialog.setResizable(flag);
	};

	/**
	 * 设置停靠对象
	 */
	justep.WindowDialog.prototype.setNeighbor = function(neighbor) {
		this.dialog.setNeighbor(neighbor);
	};

	/**
	 * 是否允许自动大小
	 */
	justep.WindowDialog.prototype.setAutoSize = function(flag) {
		this.dialog.setAutoSize(flag);
	};

	justep.WindowDialog.prototype.setTitle = function(title) {
		this.dialog.title = title;
		if (this.dialog.dlg)
			this.dialog.setTitle(title);
	};

	justep.WindowDialog.prototype.setExecutor = function(executor) {
		this.executor = executor;
	};

	justep.WindowDialog.prototype.setExecutorContext = function(executorContext) {
		this.executorContext = executorContext;
	};

	justep.WindowDialog.prototype.setProcess = function(process) {
		this.process = process;
	};

	justep.WindowDialog.prototype.setActivity = function(activity) {
		this.activity = activity;
	};

	justep.WindowDialog.prototype.getExecutor = function() {
		return this.executor;
	};

	justep.WindowDialog.prototype.getExecutorContext = function() {
		return this.executorContext;
	};

	justep.WindowDialog.prototype.getProcess = function() {
		return this.process;
	};

	justep.WindowDialog.prototype.getActivity = function() {
		return this.activity;
	};

	justep.WindowDialog.prototype.onReceiveByMapping = function(node, store) {
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

		if (!dataId || dataId == "" || !operation || operation == "") {
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
				var msg = new justep.Message(justep.Message.JUSTEP231067,
						"WindowDialog");
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
					dataTar.newData(dataTar.getCount(), null, newData);
			} finally {
				justep.XData.enableControls();
			}
		} else if (operation == "edit") {
			var newData = [];
			for ( var i = 0; i < c; i++) {
				var query = dataTar.locate(createLocfrom(locfrom, i), locto,
						false, false, false);

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
					dataTar.newData(dataTar.getCount(), null, newData);
			} finally {
				justep.XData.enableControls();
			}

		} else if (operation == "modify") {
			for ( var i = 0; i < c; i++) {
				for ( var j = 0; j < mapping.length; j++) {
					setValue(null, mapping[j], i, dataTar.getCurrentRowId());
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
					re.push(dataOri.getValueByName(locfrom[i], rownum));
				}
			}
			return re;
		}
	};

	justep.WindowDialog.prototype.setShowTitle = function(isShow) {
		this.dialog.setShowTitle(isShow);
	};

	justep.WindowDialog.prototype.setWidth = function(value) {
		this.dialog.setWidth(value);
	};

	justep.WindowDialog.prototype.getWidth = function() {
		return this.dialog.getWidth();
	};
	
	justep.WindowDialog.prototype.setHeight = function(value) {
		this.dialog.setHeight(value);
	};
})();
