/**
 * 为什么要修改？
 */
justep.WindowFrame = function(id, url, autoLoad, onSend, onReceive, onInit,
		onInitFrame, options) {
	if (typeof (dhtmlxEventable) != 'undefined')
		dhtmlxEventable(this);
	else if (typeof (justep.Utils.eventable) != 'undefined')
		justep.Utils.eventable(this);
	var self = this;
	this.id = id;
	this.url = url;
	this.autoLoad = autoLoad == "true";
	this.process = null;
	this.activity = null;
	if (options) {
		this.process = options.process;
		this.activity = options.activity;
	}
	this.sendData = null;
	this.executor = null;
	this.executorContext = null;

	this.$c = $("#" + id);

	if (onSend && onSend != "")
		this.attachEvent("onSend", eval(onSend), this);
	if (onReceive && onReceive != "")
		this.attachEvent("onReceive", eval(onReceive), this);
	if (onInit && onInit != "")
		this.attachEvent("onInit", eval(onReceive), this);
	if (onInitFrame && onInitFrame != "")
		this.attachEvent("onInitFrame", eval(onInitFrame), this);

	if (this.checkEvent("onInit")) {
		this.callEvent("onInit", [ {
			source : this
		} ]);
	}

	if (this.autoLoad) {
		this.callURL(this.url);
	}
};

justep.WindowFrame.prototype.initFrame = function() {
	if ($("#iframe-" + this.id).size() > 0)
		return;
	this.$c
			.html("<iframe id=\"iframe-"
					+ this.id
					+ "\" src=\"about:blank\" frameBorder=\"0\" style=\"width:100%;height:99%;\" scrolling=\"auto\"/>");
	this.$iframe = $("#iframe-" + this.id);
	this.$iframe[0].windowFrame = this;

	if (this.checkEvent("onInitFrame")) {
		this.callEvent("onInitFrame", [ {
			source : this,
			frame : this.$iframe[0]
		} ]);
	}
};

justep.WindowFrame.prototype.open = function(data, url, process, activity,
		executor, executorContext) {
	this.open2({
		'data' : data,
		'url' : url,
		'process' : process,
		'activity' : activity,
		'executor' : executor,
		'executorContext' : executorContext
	});
};

justep.WindowFrame.prototype.open2 = function(options) {
	var url = "";
	this.sendData = undefined;
	if (options) {
		this.sendData = options.data;
		if (options.process)
			this.setProcess(options.process);
		if (options.activity)
			this.setActivity(options.activity);
		if (options.executor)
			this.setExecutor(options.executor);
		if (options.executorContext)
			this.setExecutorContext(options.executorContext);
		url = options.url;
	}
	this.callURL(url);
};

justep.WindowFrame.prototype.getFrame = function() {
	return this.$iframe[0];
};

justep.WindowFrame.prototype.getContentDocument = function() {
	return this.getContentWindow().document;
};

justep.WindowFrame.prototype.getContentWindow = function() {
	return this.$iframe[0].contentWindow;
};

justep.WindowFrame.prototype.sendToFrame = function() {
	if ($("#iframe-" + this.id).size() == 0)
		return;
	var frame = this.$iframe[0];
	var b = false;
	try {// 沉默跨域的url
		b = frame.contentWindow && frame.contentWindow.justep
				&& frame.contentWindow.justep.windowReceiver
				&& frame.contentWindow.justep.windowReceiver.windowReceive;
	} catch (e) {
	}
	
	if (b) {
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
	}
};

justep.WindowFrame.prototype.refresh = function() {
	this.callURL(this.url);
};

justep.WindowFrame.prototype.callURL = function(url) {
	if ($("#iframe-" + this.id).size() == 0)
		this.initFrame();

	this.$iframe.attr("src", "about:blank");
	var frame = this.$iframe[0];

	this.$iframe.unbind("load").bind("load", function() {
		window.setTimeout(function() {
			frame.windowFrame.sendToFrame();
		}, 10);
	});
	if (url)
		this.url = url;
	var urlA = justep.Request.setBizParams(justep.Request.convertURL(this.url),
			this.process, this.activity, this.executor, this.executorContext);
	var self = this;

	// this.$iframe.attr("src", this.url);
	window.setTimeout(function() {
		self.$iframe.attr("src", urlA);
	}, 1);
};

justep.WindowFrame.prototype.ensure = function(store) {
	this.onReceiveByMapping(this, store);
	if (this.checkEvent("onReceive")) {
		this.callEvent("onReceive", [ {
			source : this,
			data : store
		} ]);
	}
};

justep.WindowFrame.prototype.cancel = function() {
	// 没有逻辑空函数
};

justep.WindowFrame.prototype.setExecutor = function(executor) {
	if (executor)
		this.executor = executor;
};

justep.WindowFrame.prototype.setExecutorContext = function(executorContext) {
	if (executorContext)
		this.executorContext = executorContext;
};

justep.WindowFrame.prototype.setProcess = function(process) {
	this.process = process;
};

justep.WindowFrame.prototype.setActivity = function(activity) {
	this.activity = activity;
};

justep.WindowFrame.prototype.getExecutor = function() {
	return this.executor;
};

justep.WindowFrame.prototype.getExecutorContext = function() {
	return this.executorContext;
};

justep.WindowFrame.prototype.getProcess = function() {
	return this.process;
};

justep.WindowFrame.prototype.getActivity = function() {
	return this.activity;
};

justep.WindowFrame.prototype.onReceiveByMapping = function(node, store) {
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
					"WindowFrame");
			throw justep.Error.create(msg);
		}
	}

	if (!dataOri)
		return;
	var c = isArr ? dataOri.length : dataOri.rowsBuffer.length;
	if (operation == "new") {
		for ( var i = 0; i < c; i++) {
			dataTar.newData();
			for ( var j = 0; j < mapping.length; j++) {
				setValue(mapping[j], i);
			}
		}
	} else if (operation == "edit") {
		for ( var i = 0; i < c; i++) {
			var query = dataTar.locate(createLocfrom(locfrom, i), locto, false,
					false, false);

			if (query && query.length > 0) {
				for ( var k = 0; k < query.length; k++) {
					for ( var j = 0; j < mapping.length; j++) {
						setValue(mapping[j], i, query[k]);
					}
				}
			} else {
				dataTar.newData();
				for ( var j = 0; j < mapping.length; j++) {
					setValue(mapping[j], i);
				}
			}

		}

	} else if (operation == "clear") {
		removeAll(dataTar);
		for ( var i = 0; i < c; i++) {
			dataTar.newData();
			for ( var j = 0; j < mapping.length; j++) {
				setValue(mapping[j], i);
			}
		}
	} else if (operation == "modify") {
		for ( var i = 0; i < c; i++) {
			for ( var j = 0; j < mapping.length; j++) {
				setValue(mapping[j], i, dataTar.getCurrentRowId());
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

	function setValue(node, rownum, rowid) {
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
		dataTar.setValue(to, val || "", rowid);
	}

	function createLocfrom(locfrom, rownum) {
		var re = [];
		for ( var i = 0, c = locfrom.length; i < c; i++) {
			if (isArr) {
				re.push((dataOri[rownum])[locfrom]);
			} else {
				re.push(dataOri.getValueByName(locfrom[i], rownum));
			}
		}
		return re;
	}
};

justep.WindowFrame.prototype.dispose = function() {
	this.$iframe = $("#iframe-" + this.id);
	if (this.$iframe[0])
		this.$iframe[0].windowFrame = null;
	justep.XBLObject.prototype.dispose.call(this);
};
