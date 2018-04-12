var staticActivityTemplate = {};

staticActivityTemplate.modelLoad = function(event) {
	$("#btnBarRight").parent("li").css({
		"float" : "right",
		"margin-left" : "4px"
	});
	var $li = $("#btnBarData2").parent("li");
	$li.css({
		"float" : "right"
	});
	$li.prev().css("float", "right");

	var me = this, config = me.config;
	require(
			[ "base/core/template/simple/functemplate/funcManager", "jquery" ],
			function(FuncManager, jquery) {
				me.funcManager = new FuncManager(config, me);
				me.funcManager.initFormNav();

				me.uiToolbar = new butone.UIComponentToolBar("uiPluginBar");
				me.formUIToolbar = new butone.UIComponentToolBar(
						"formUIPluginBar");

				butone.defer(me.uiToolbar.init, 0, me.uiToolbar,
						[ me.uiPlugins ]);

				me._funcCreatePromise
						|| (me._funcCreatePromise = jquery.Deferred()),
						me._funcCreatePromise.resolve();
			});

};

staticActivityTemplate.modelUnLoad = function(event) {
	this.funcManager.destroy();
	justep.xbl("funcReceiver").sendData({
		source : this.funcManager.mainForm,
		data : "unload"
	});
};

staticActivityTemplate.btnBackClick = function(event) {
	justep.Portal.closeWindow(justep.Portal.getWindowId());

};

staticActivityTemplate.funcReceiverReceive = function(event) {
	if (event.data) {
		var me = this;
		var callInit = function() {
			var mainForm = me.funcManager.mainForm;
			if (vent.data.openParams)
				$.extend(mainForm.openParams, event.data.openParams);
			// mainForm.init();
			if (me.doFinish)
				me.doFinish(event.data);
		};
		require([ "jquery" ], function(jquery) {
			!me._funcCreatePromise
					&& (me._funcCreatePromise = jquery.Deferred()),
					me._funcCreatePromise.then(callInit);
		});
	}

};
