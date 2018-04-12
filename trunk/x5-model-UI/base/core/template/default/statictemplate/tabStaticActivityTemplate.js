var tabStaticActivityTemplate = {};

tabStaticActivityTemplate.modelLoad = function(event) {
	var me = staticActivityTemplate, config = me.config;
	require(
			[ "base/core/template/default/statictemplate/funcManager", "jquery" ],
			function(FuncManager, jquery) {
				me.funcManager = new FuncManager(config, me);
				// me.funcManager.initFormNav();
				me.funcManager.initForm = tabStaticActivityTemplate.initForm;
				tabStaticActivityTemplate.initFormNav();
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

tabStaticActivityTemplate.selectNav = function(tab) {
	if (tab.hasClass("selected"))
		return;
	var prev = $(".selected", $('#formNav'));
	if (prev.length > 0) {
		// 如果前一个表单正在加载中
		if (!prev.data("config").form)
			return false;
		prev.removeClass("selected");
	}
	var cfg = tab.data("config");
	staticActivityTemplate.funcManager.showForm(cfg);
	return true;
}

/**
 * 初始化表单
 * 
 * @param form
 */
tabStaticActivityTemplate.initForm = function(config) {
	config.frameDiv = $('#' + config.id);
	// 创建form对应的视图(WindowFrame)
	$("#statusPanel").css("display", "inherit");
	var view = new justep.WindowFrame(config.id, config.url, null, $.proxy(
			staticActivityTemplate.funcManager._onSendOpenParams,
			staticActivityTemplate.funcManager), $.proxy(
			staticActivityTemplate.funcManager._onReceiveFormInited,
			staticActivityTemplate.funcManager));
	var mainForm = staticActivityTemplate.funcManager.mainForm;
	mainForm.initDeferred.done(function() {
		var options = {
			data : {
				'form' : mainForm,
				'config' : config
			}
		};
		view.open2(options);
	});
	$('#formNav').resize();
};

/**
 * 构造树列表容
 */
tabStaticActivityTemplate.initFormNav = function() {
	var defaultForm, navs = staticActivityTemplate.funcManager.config.navs, $container = $('#formNav'), cnt = 0, activeNav = 0;
	$container.resize(function(event) {
		$('#formNav iframe').height($container.height() - 60);
	});
	// 创建
	var ulNavs = $("<ul style='padding:0px' '></ul>");
	$container.append(ulNavs);
	for ( var navIdx in navs) {
		var nav = navs[navIdx];
		for ( var formIdx in nav.forms) {
			var config = nav.forms[formIdx];
			if (config.isDefault && !defaultForm) {
				defaultForm = config;
				activeNav = navIdx;
			}
			var $li = $("<li><a href='#" + config.id + "'>" + config.name
					+ "</a></li>");
			cnt++;
			ulNavs.append($li);
			var tab = $li.children();
			config.jQNode = tab;
			tab.data("config", config);
			$container
					.append("<div class='xui-autofill' style='width:99%;margin:0 auto' id='"
							+ config.id + "'>" + config.id + "</div>");
		}
	}
	// 创建accordion
	var me = staticActivityTemplate.funcManager;
	$container.tabs({
		selected : 0,
		select : $.proxy(function(event, ui) {
			return tabStaticActivityTemplate.selectNav($(ui.tab));
		}, staticActivityTemplate.funcManager)

	});

	if (!defaultForm) {
		defaultForm = $("ul>li:eq(0)>a", '#formNav').data("config");
		activeNav = 0;
	}

	if (defaultForm) {
		tabStaticActivityTemplate.selectNav(defaultForm.jQNode);
	} else {
		$container.append("<h2 style='color:red'>环节未设置工作表单</h2>");
	}

};
