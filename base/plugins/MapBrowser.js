define(["jquery"],function($) {
	var mapBrowserUrl = "/UI/base/mapBrowser/mapBrowser.w";

	var browser = function(options) {
		if (typeof (dhtmlxEventable) != 'undefined')
			dhtmlxEventable(this);
		else if (typeof (justep.Utils.eventable) != 'undefined')
			justep.Utils.eventable(this);
		butone.attachEvent(this, "onCreateInitActions", options);
		butone.attachEvent(this, "onMapInited", options);
		this.options = options;
	};

	browser.prototype = {
		execute : function() {
			var me = this;
			if (me._target) {
				me._target.open();
			} else {
				me._createAndOpenTarget();
			}
		},

		onSend : function(event) {
			var param = event.data || {};
			param.subSystemName = this.options.subSystemName;
			if (this.checkEvent("onCreateInitActions")) {
				var e = {
					source : this
				};
				param.actions = this.callEvent("onCreateInitActions", [ e ]);
			}
			return param;
		},

		onReceive : function(event) {
			this.mapBrowser = event.data;
			if (this.checkEvent("onMapInited")) {
				var e = {
					source : this,
					data : event.data
				};
				this.callEvent("onMapInited", [ e ]);
			}
		},

		_createAndOpenTarget : function() {
			var me = this, dtd;
			if ("runner" == me.options.runKind) {
				dtd = me._createRunner(me.options);
			} else if ("opener" == me.options.runKind) {
				dtd = me._createOpenner(me.options);
			} else {
				dtd = me._createDialog(me.options);
			}
			dtd.then(function() {
				me._target.open();
			}, function(err) {
				alert(err);
			});
		},

		_createRunner : function(options) {
			var self = this, reqs = [ "base/mapBrowser/gisUtils",
					"system/components/windowRunner/windowRunner" ];
			var dtd = $.Deferred();
			butone.Loader.requireJS(reqs, function() {
				var runner = new justep.WindowRunner(mapBrowserUrl,
						options.title, null, $.proxy(self.onSend, self), $
								.proxy(self.onReceive, self));
				runner.setProcess(options.process);
				runner.setActivity(options.activity);
				self._target = runner;
				dtd.resolve();
			}, function() {
				dtd.reject();
			});
			return dtd.promise();
		},

		_createOpenner : function(options) {
			var self = this;
			var reqs = [ "base/mapBrowser/gisUtils",
					"system/components/windowOpener/windowOpener" ];
			var dtd = $.Deferred();
			debugger;
			butone.Loader.requireJS(reqs, function() {
				var option = {
					url : mapBrowserUrl,
					modal : options.modal == "true",
					width : options.width,
					height : options.height,
					left : options.left,
					top : options.top,
					parameters : options.parameters,
					status : options.status == "maximize" ? "fullscreen" : "",
					resizable : options.resizable != "false",
					process : options.process,
					activity : options.activity,
					onSend : $.proxy(self.onSend, self),
					onReceive : $.proxy(self.onReceive, self),
					onOpen : options.onOpen,
					onClose : options.onClose
				};
				self._target = new justep.WindowOpener(option);
				dtd.resolve();
			}, function() {
				dtd.reject();
			});
			return dtd.promise();
		},

		_createDialog : function(options) {
			var self = this;
			var reqs = [ "base/mapBrowser/gisUtils",
					"system/components/dialog/dialog",
					"system/components/windowDialog/windowDialog" ];
			var dtd = $.Deferred();
			butone.Loader.requireJS(reqs, function() {
				var dialog = new justep.WindowDialog(null, mapBrowserUrl,
						options.title, options.modal == "true", options.status,
						options.width, options.height, options.left,
						options.top, options.reloadOnOpen == 'true', $.proxy(
								self.onSend, self), $.proxy(self.onReceive,
								self), options.onInit, options.onOpen,
						options.onClose);
				dialog.setClosable(options.closable != "false");
				dialog.setMinmaxable(options.minmaxable != "false");
				dialog.setResizable(options.resizable != "false");
				dialog.setNeighbor(options.neighbor);
				dialog.setAutoSize(options.autosize == "true");
				dialog.setShowTitle(options.showTitle != "false");
				dialog.setProcess(options.process);
				dialog.setActivity(options.activity);
				self._target = dialog;
				dtd.resolve();
			}, function() {
				dtd.reject();
			});
			return dtd.promise();
		}
	};
	return browser;
});
