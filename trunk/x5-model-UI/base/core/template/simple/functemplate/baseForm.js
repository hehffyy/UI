var baseForm = {
	"bizDatas" : [],
	"createUnitFieldManager" : false,
	"id" : "zdInfoReport",
	"lookupFilters" : [],
	"mainData" : {},
	"readOnlys" : [],
	"refreshAfterNew" : []
};

baseForm.model_onModelConstruct = function(event) {
	var me = this;
	me._delayOpenViews = [];
	$(
			"[component='/UI/system/components/windowFrame.xbl.xml#windowFrame'][auto-load='true']")
			.each(function() {
				var a = $(this);
				me._delayOpenViews.push(a.attr("id"));
				a.attr("auto-load", "false")
			});
	require(
			[ "jquery", "base/core/template/default/statictemplate/staticForm" ],
			function(a, b) {
				me.form = new b(me, window);
				me._fromCreatePromise || (me._fromCreatePromise = a.Deferred());
				me._fromCreatePromise.resolve()
			});

};

baseForm.activieFormOpenParamsReceiver_onReceive = function(event) {
	var me = this, callInit = function() {
		delete me._fromCreatePromise;
		me.form.init(event.data);
		justep.xbl("activieFormOpenParamsReceiver").sendData({
			kind : "initFinish",
			source : me.form
		});
		$.each(me._delayOpenViews, function(a, b) {
			justep.xbl(b).open();
		});
	};
	require([ "jquery" ], function(a) {
		!me._fromCreatePromise && (me._fromCreatePromise = a.Deferred());
		me._fromCreatePromise.then(callInit);
	});
};

baseForm.model_onUnLoad = function(event) {
	this.form.destroy();
};
