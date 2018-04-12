justep.WindowRunner = function(url, title, maximise, onSend, onReceive) {
	if (typeof (dhtmlxEventable) != 'undefined')
		dhtmlxEventable(this);
	else if (typeof (justep.Utils.eventable) != 'undefined')
		justep.Utils.eventable(this);
	this.maximise = maximise == "true";
	this.title = title || "";
	this.url = url;
	this.sendData = null;
	this.process = null;
	this.activity = null;
	this.executor = null;
	this.executorContext = null;

	if (onSend && onSend != "")
		this.attachEvent("onSend", (typeof (onSend) == 'string') ? eval(onSend)
				: onSend, this);
	if (onReceive && onReceive != "")
		this.attachEvent("onReceive",
				(typeof (onReceive) == 'string') ? eval(onReceive) : onReceive,
				this);
};

justep.WindowRunner.prototype.open = function(data, url, title, process,
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

justep.WindowRunner.prototype.open2 = function(options) {
	this.sendData = undefined;
	if (options) {
		if (options.process)
			this.setProcess(options.process);
		if (options.activity)
			this.setActivity(options.activity);
		if (options.executor)
			this.setExecutor(options.executor);
		if (options.executorContext)
			this.setExecutorContext(options.executorContext);
		if (options.url)
			this.url = options.url;
		this.sendData = options.data;
		if (options.title)
			this.title = options.title;
	}
	var tabid = justep.Portal.openWindow(this.title, this.convertURL(this.url),
			this.maximise);// TODO ,this.sendToFrame TKJ
	// 改由windowReceiver.initXBL2中调用opener.sendToFrame

	if (tabid && (typeof tabid == "object")) {
		// TODO TKJ UI运行在UI2下的兼容处理
		var self = this;
		tabid.done(function() {
			self.iframe = $(
					arguments[0].container.getInnerModel().getRootNode()).find(
					"iframe")[0];
			// TODO TKJ 统一windowDialog windowRunner的打开方式
			// self.iframe.windowRunner = self;
			self.iframe.opener = self;
		});

	} else {
		this.iframe = justep.Portal.Tab.getFuncIframe(tabid);
		// TODO TKJ 统一windowDialog windowRunner的打开方式
		// this.iframe.windowRunner = this;
		this.iframe.opener = this;
	}
};

justep.WindowRunner.prototype.refresh = function() {
	if (this.iframe)
		this.iframe.contentWindow.location.reload();
};

justep.WindowRunner.prototype.getFrame = function() {
	return this.iframe;
};

justep.WindowRunner.prototype.getContentDocument = function() {
	return this.getContentWindow().document;
};

justep.WindowRunner.prototype.getContentWindow = function() {
	return this.iframe.contentWindow;
};

justep.WindowRunner.prototype.sendToFrame = function() {
	var frame = this.getFrame(), wo = this;
	if (frame.contentWindow && frame.contentWindow.justep
			&& frame.contentWindow.justep.windowReceiver
			&& frame.contentWindow.justep.windowReceiver.windowReceive) {
		frame.contentWindow.justep.windowReceiver.windowParentObj = wo;
		var eventData = {
			source : wo,
			data : wo.sendData
		};
		if (wo.checkEvent("onSend")) {
			eventData.data = wo.callEvent("onSend", [ {
				source : wo,
				data : wo.sendData
			} ]);
		}
		frame.contentWindow.justep.windowReceiver.windowReceive(eventData);
	}
};

justep.WindowRunner.prototype.ensure = function(store, noclose) {
	if (typeof (noclose) == "undefined" || noclose == false) {
		justep.Portal.closeWindow();
	}
	if (this.checkEvent("onReceive")) {
		this.callEvent("onReceive", [ {
			source : this,
			data : store
		} ]);
	}
};

justep.WindowRunner.prototype.cancel = function() {
	// justep.Portal.closeWindow();
};

justep.WindowRunner.prototype.setTitle = function(title) {
	this.title = title;
};

justep.WindowRunner.prototype.setURL = function(url) {
	if (url)
		this.url = url;
};

justep.WindowRunner.prototype.getURL = function() {
	return this.url;
};

justep.WindowRunner.prototype.setMaximise = function(maximise) {
	this.maximise = maximise;
};

justep.WindowRunner.prototype.setExecutor = function(executor) {
	if (executor)
		this.executor = executor;
};

justep.WindowRunner.prototype.setExecutorContext = function(executorContext) {
	if (executorContext)
		this.executorContext = executorContext;
};

justep.WindowRunner.prototype.getProcess = function() {
	return this.process;
};

justep.WindowRunner.prototype.getActivity = function() {
	return this.activity;
};

justep.WindowRunner.prototype.setProcess = function(process) {
	this.process = process;
};

justep.WindowRunner.prototype.setActivity = function(activity) {
	this.activity = activity;
};

justep.WindowRunner.prototype.convertURL = function(url) {
	if (!url)
		return url;
	var urlHead = url;
	var urlTail = "";
	var params = new Array();

	var hasProcess = false;
	var hasActivity = false;
	var hasExecutor = false;
	var hasExecutorContext = false;
	var idx = url.indexOf("?");
	if (idx != -1) {
		urlHead = url.substring(0, idx);
		var st = url.substring(idx + 1);
		idx = st.indexOf("#");
		if (idx != -1) {
			urlTail = st.substring(idx);
			st = st.substring(0, idx);
		}
		params = st.split("&");
		for ( var i = 0; i < params.length; i++) {
			var tm = params[i];
			idx = tm.indexOf("process=");
			if (idx == 0)
				hasProcess = true;
			idx = tm.indexOf("activity=");
			if (idx == 0)
				hasActivity = true;
			idx = tm.indexOf("executor=");
			if (idx == 0)
				hasExecutor = true;
			idx = tm.indexOf("executorContext=");
			if (idx == 0)
				hasExecutorContext = true;
		}
	}
	if (hasProcess != true)
		params.push("process="
				+ (this.process ? this.process : justep.Context
						.getCurrentProcess()));
	if (hasActivity != true)
		params.push("activity="
				+ (this.activity ? this.activity : justep.Context
						.getCurrentActivity()));
	if (hasExecutor != true)
		params
				.push("executor="
						+ (this.executor ? this.executor : justep.Context
								.getExecutor()));
	if (hasExecutorContext != true)
		params.push("executorContext="
				+ (this.executorContext ? this.executorContext : justep.Context
						.getExecuteContext()));

	var aimParams = params.join("&") + urlTail;
	return aimParams == "" ? urlHead : (urlHead + "?" + aimParams);
};

justep.WindowRunner.prototype.dispose = function() {
	if (this.iframe)
		this.iframe.windowRunner = null;
	justep.XBLObject.prototype.dispose.call(this);
};

justep.windowRunner = justep.WindowRunner;