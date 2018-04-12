define(["jquery"],function($) {
	var printForm = function(options) {
		if (typeof (dhtmlxEventable) != 'undefined')
			dhtmlxEventable(this);
		else if (typeof (justep.Utils.eventable) != 'undefined')
			justep.Utils.eventable(this);
		butone.attachEvent(this, "onSend", options);
		this.options = options;
	};

	printForm.prototype = {
		execute : function() {
			var me = this;
			if (me._target)
				me._target.open();
			else {
				me._createOpenner(me.options).then(function() {
					me._target.open();
				});
			}
		},

		onSend : function(event) {
			var param = event.data || {};
			if (this.checkEvent("onSend")) {
				var e = {
					source : this,
					data : param
				};
				param = this.callEvent("onSend", [ e ]);
			}
			param.options = param.options || {};
			param.options.isPrint = true;
			return {
				data : param,
				url : this.options.url,
				title : this.options.title || this.options.label
			};
		},

		onReceive : function(event) {
			this._target.close();
		},

		_createOpenner : function(options) {
			var me = this, reqs = [ "system/components/windowOpener/windowOpener" ];
			var dtd = $.Deferred().promise();
			butone.Loader.requireJS(reqs, function() {
				var option = {
					url : "/UI/base/core/components/dialogs/printPreview.w",
					modal : true,
					resizable : true,
					process : options.process,
					activity : options.activity,
					onSend : $.proxy(me.onSend, me),
					onReceive : $.proxy(me.onReceive, me)
				};
				me._target = new justep.WindowOpener(option);
			}, function() {
				dtd.reject();
			});
			return dtd;
		}
	};

	return printForm;
});