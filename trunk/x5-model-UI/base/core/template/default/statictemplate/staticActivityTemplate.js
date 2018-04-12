var staticActivityTemplate = {};

staticActivityTemplate.modelLoad = function(event) {
	// 设置过滤条件后，将当前smartFilter的value记录下来
	justep.xbl("dataSmartFilter").attachEvent("onAfterSetFilter",
			function(event) {
				event.data.target._smartFilterValue = event.source._value;
			});

	var me = this, config = me.config;
	if (me.uiPlugins) {
		if (me.materialAuths && me.materialAuths != 'undefined') {
			var auths_array = me.materialAuths.split(":");
			var auths = auths_array[0];
			if (auths.search(/up/) != -1 && auths_array.length > 1) {
				me.uiPlugins[me.uiPlugins.length] = staticActivityTemplate
						.upLoadFiledjson(true, auths, auths_array[1]);
			}
			if (auths.search(/brs/) != -1 && auths_array.length > 1) {
				me.uiPlugins[me.uiPlugins.length] = staticActivityTemplate
						.upLoadFiledjson(false, auths, auths_array[1]);
			}
		}
	}

	require(
			[ "base/core/template/default/statictemplate/funcManager", "jquery" ],
			function(FuncManager, jquery) {
				me.funcManager = new FuncManager(config, me);
				me.funcManager.initFormNav();

				me.formUIToolbar = new butone.UIComponentToolBar(
						"formUIPluginBar");

				me.uiToolbar = new butone.UIComponentToolBar("uiPluginBar");
				if (justep.Context.isReadonlyMode()) {
					$("#btnSave").hide();
				} else {
					butone.defer(me.uiToolbar.init, 0, me.uiToolbar,
							[ me.uiPlugins ]);
				}

				me._funcCreatePromise
						|| (me._funcCreatePromise = jquery.Deferred()),
						me._funcCreatePromise.resolve();
			});

};

staticActivityTemplate.modelUnLoad = function(event) {
	this.funcManager.destroy();
	justep.xbl("receiver1").sendData({
		source : this.funcManager.mainForm,
		data : "unload"
	});
};

staticActivityTemplate.upLoadFiledjson = function(upOrBrs, auths, updfiled) {

	uploadJson = {
		"declaredClass" : "base/plugins/Trigger",
		"id" : justep.Utils.randomString(),
		"label" : upOrBrs ? "要件上传" : "要件浏览",
		"onClick" : function(event) {
			var form = butone.Context.frameForm.getRootForm().currentForm;
			var array = updfiled.split(".");
			var fieldData = form.xbl(array[0]);
			var uploadField = fieldData.getValue(array[1]);

			if (uploadField == null || uploadField == "") {
				alert("要件关联字段值为空，" + (upOrBrs ? "不能上传!" : "不能浏览!"));
				return;
			}

			var url = "/UI/base/core/components/material/materialManager.w?fBizRecId="
					+ uploadField + "&materialAuths=" + auths;

			if (!upOrBrs)
				url = "/UI/base/core/components/material/materialBrowse.w?fBizRecId="
						+ uploadField + "&fMaterialName=";
			var runner = new justep.WindowRunner(url, upOrBrs ? "要件上传" : "要件浏览");
			runner.setProcess(justep.Context.getCurrentProcess());
			runner.setActivity(justep.Context.getCurrentActivity());
			runner.open2({
				"data" : null
			});
		}
	};

	return uploadJson;

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

staticActivityTemplate.btnBackClick = function(event) {
	justep.Portal.closeWindow(justep.Portal.getWindowId());

};

staticActivityTemplate.funcReceiverReceive = function(event) {
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

if (typeof (dhtmlxEventable) != 'undefined')
	dhtmlxEventable(staticActivityTemplate);
else if (typeof (justep.Utils.eventable) != 'undefined')
	justep.Utils.eventable(staticActivityTemplate);
