var staticActivityTemplate = {};

staticActivityTemplate.modelLoad = function(event) {
	var me = this, config = me.config;
	if (me.checkEvent("onLoad")) {
		me.callEvent("onLoad", [ {
			source : me
		} ]);
	}
	require([
			"base/core/template/singleDataControl/tabStaticTemplate/funcManager",
			"jquery" ], function(FuncManager, jquery) {
		me.funcManager = new FuncManager(config, me);
		butone.Context.funcManager = me.funcManager;
		me.funcManager.initFormNav();

		me.uiToolbar = new butone.UIComponentToolBar("uiPluginBar");
		if (justep.Context.isReadonlyMode()) {
			$("#btnSave").hide();
		} else {
			butone.defer(me.uiToolbar.init, 0, me.uiToolbar, [ me.uiPlugins ]);
		}
		me.formUIToolbar = new butone.UIComponentToolBar("formUIPluginBar");
		me._funcCreatePromise || (me._funcCreatePromise = jquery.Deferred()),
				me._funcCreatePromise.resolve();
	});

};

staticActivityTemplate.modelUnLoad = function(event) {
	this.funcManager.destroy();
};

/**
 * 打印按钮
 */
staticActivityTemplate.btnPrintClick = function(event) {
	if (butone.Context.frameForm.currentForm) {
		var win = butone.Context.frameForm.currentForm.contentWindow;
		var htmlPrint = win.butone.HtmlPrint;
		htmlPrint.executePrintout([ "rootView" ], null, false, true, {
			popTitle : butone.Context.frameForm.currentForm.formDoc.name
		});
	}
};

staticActivityTemplate.btnRefreshClick = function(event) {
	butone.Context.frameForm.refreshData();
};

staticActivityTemplate.btnBackClick = function(event) {
	justep.Portal.closeWindow(justep.Portal.getWindowId());
};

staticActivityTemplate.funcReceiverReceive = function(event) {
	var me = this;
	var callInit = function() {
		butone.Context.frameForm.init(event.data);
	};
	require([ "jquery" ], function(jquery) {
		!me._funcCreatePromise && (me._funcCreatePromise = jquery.Deferred()),
				me._funcCreatePromise.then(callInit);
	});

};

if (typeof (dhtmlxEventable) != 'undefined')
	dhtmlxEventable(staticActivityTemplate);
else if (typeof (justep.Utils.eventable) != 'undefined')
	justep.Utils.eventable(staticActivityTemplate);
