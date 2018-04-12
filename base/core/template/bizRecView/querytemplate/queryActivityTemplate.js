var queryActivityTemplate = {};

queryActivityTemplate.modelLoad = function(event) {

	var me = this;
	var config = me.config;
	
	//根据调用的url里面是否含有参数canUploadMaterial，来决定是否允许上传附件
	if (!!justep.Request.URLParams['canUploadMaterial']
			&& justep.Request.URLParams['canUploadMaterial'] == 'true')
		me.materialAuths = "brs,up,del";
	 else
		me.materialAuths = "brs";
		
	require([ "base/core/template/bizRecView/querytemplate/funcManager",
			"jquery" ], function(FuncManager, jquery) {
		me.funcManager = new FuncManager(config, me);
		butone.Context.funcManager = me.funcManager;
		me.funcManager.initFormNav();

		me.uiToolbar = new butone.UIComponentToolBar("uiPluginBar");
		butone.defer(me.uiToolbar.init, 0, me.uiToolbar, [ me.uiPlugins ]);

		me.formUIToolbar = new butone.UIComponentToolBar("formUIPluginBar");

		me._funcCreatePromise || (me._funcCreatePromise = jquery.Deferred()),
				me._funcCreatePromise.resolve();
		me.initAttention();
	});

	// 靠右显示
	$("#btnBarRight").parent("li").css({
		"float" : "right",
		"margin-left" : "3px"
	});

	var $panel_material = $("#panel_material");
	$panel_material.css({
		left : $("body")[0].clientWidth - 210,
		top : 55
	}).panel({
		title : "关联材料",
		enableDrag : true
	});
};

queryActivityTemplate.modelUnLoad = function(event) {
	this.funcManager.destroy();

};

/**
 * 打印按钮
 */
queryActivityTemplate.btnPrintClick = function(event) {
	if (butone.Context.frameForm.currentForm) {
		var win = butone.Context.frameForm.currentForm.contentWindow;
		var htmlPrint = win.butone.HtmlPrint;
		htmlPrint.executePrintout([ "rootView" ], null, false, true, {
			popTitle : butone.Context.frameForm.currentForm.formDoc.name
		});
	}
};

queryActivityTemplate.btnRefreshClick = function(event) {
	butone.Context.frameForm.refreshData();
};

queryActivityTemplate.btnBackClick = function(event) {
	justep.Portal.closeWindow(justep.Portal.getWindowId());
};

queryActivityTemplate.initAttention = function() {
	if (justep.xbl("BizRec").getValue("attention") == "true")
		justep.xbl("btnAttention").setLabel("取消关注");
	else
		justep.xbl("btnAttention").setLabel("关注案卷");
};

queryActivityTemplate.btnAttentionClick = function(event){
	var bizRecData = justep.xbl("BizRec");
	var param = new justep.Request.ActionParam();
	param.setString('bizRecId', bizRecData.getValue("fBizRecId"));
	var options = {};
	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "updateAttentionStatusAction";
	options.callback = function(callbackData) {
		callbackData.ignoreError = false;
		if (callbackData.state) {
			var btn = justep.xbl("btnAttention");
			if (btn.getLabel() == "取消关注")
				btn.setLabel("关注案卷");
			else
				btn.setLabel("取消关注");
		}
	};
	justep.Request.sendBizRequest2(options);
};

queryActivityTemplate.funcReceiverReceive = function(event) {
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
	dhtmlxEventable(queryActivityTemplate);
else if (typeof (justep.Utils.eventable) != 'undefined')
	justep.Utils.eventable(queryActivityTemplate);

queryActivityTemplate.showChartClick = function(event){
    var mainData = justep.xbl("BizRec");
	var pi = mainData.getValue("fFlowId");
	var fBizRecId = mainData.getValue("fBizRecId");
	if (pi) {
		justep.xbl("dlgChart").open(
				null,
				"办理过程",
				"/UI/SA_X/task/taskCenter/banLiGuoCheng.w?pi=" + pi
						+ "&bizRecID=" + fBizRecId);
	} else {
		alert("案卷无流程编号?");	
		}
};
