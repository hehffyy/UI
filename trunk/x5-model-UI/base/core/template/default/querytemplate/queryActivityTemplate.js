var queryActivityTemplate = {};

queryActivityTemplate.funcReceiverReceive = function(event) {
	if (event.data && event.data.openParams) {
		var me = this;
		var callInit = function() {
			var mainForm = me.funcManager.mainForm;
			$.extend(mainForm.openParams, event.data.openParams);
			mainForm.init();
		};
		require([ "jquery" ], function(jquery) {
			!me._funcCreatePromise
					&& (me._funcCreatePromise = jquery.Deferred()),
					me._funcCreatePromise.then(callInit);
		});
	}
};

queryActivityTemplate.modelLoad = function(event) {
	// 设置过滤条件后，将当前smartFilter的value记录下来
	justep.xbl("dataSmartFilter").attachEvent("onAfterSetFilter",
			function(event) {
				event.data.target._smartFilterValue = event.source._value;
			});

	var me = this, config = me.config;

	require(
			[ "base/core/template/default/querytemplate/funcManager", "jquery" ],
			function(FuncManager, jquery) {
				me.funcManager = new FuncManager(config, me);
				me.funcManager.initFormNav();
				me.formUIToolbar = new butone.UIComponentToolBar(
						"formUIPluginBar");
				me.uiToolbar = new butone.UIComponentToolBar("uiPluginBar");
				butone.defer(me.uiToolbar.init, 0, me.uiToolbar,
						[ me.uiPlugins ]);
				me._funcCreatePromise
						|| (me._funcCreatePromise = jquery.Deferred()),
						me._funcCreatePromise.resolve();
			});
};

queryActivityTemplate.modelUnLoad = function(event) {
	this.funcManager.destroy();
};

queryActivityTemplate.btnPrintClick = function(event) {
	if (butone.Context.frameForm.currentForm) {
		var win = butone.Context.frameForm.currentForm.contentWindow;
		var htmlPrint = win.butone.HtmlPrint;
		htmlPrint.executePrintout([ "rootView" ], null, false, true, {
			popTitle : butone.Context.frameForm.currentForm.formDoc.name
		});
	}
};

queryActivityTemplate.btnBackClick = function(event) {
	justep.Portal.closeWindow(justep.Portal.getWindowId());
};

if (typeof (dhtmlxEventable) != 'undefined')
	dhtmlxEventable(queryActivityTemplate);
else if (typeof (justep.Utils.eventable) != 'undefined')
	justep.Utils.eventable(queryActivityTemplate);
