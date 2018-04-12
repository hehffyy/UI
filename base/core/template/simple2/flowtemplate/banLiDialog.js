var banLiDialog = {};

banLiDialog.windowReceiverReceive = function(event) {
	banLiDialog.mainForm = event.data.form;
	banLiDialog.process = event.data.process;
	banLiDialog.bizOperations = event.data.bizOperations;
	banLiDialog.initFormNav(event.data.allForms, event.data.visibleForms);
};

banLiDialog.initFormNav = function(allForms, visibleForms) {
	var $bar = $('#formNav');
	if ($bar.children().length == 0) {
		require([ "base/plugins/Trigger" ], function(Trigger) {
			allForms.sort(function(a,b){
				if(a.hasOwnProperty("order") && b.hasOwnProperty("order"))
					return a.order-b.order;
				else
					return 0;
			});
			for ( var n in allForms) {
				var config = allForms[n], instance = new Trigger(null, {
					label : config.name,
					appearance : "minimal"
				});
				var $node = $(instance.domNode);
				$node.data("config", config);
				$node.bind("click", $.proxy(function(event) {
					var cfg = $(event.currentTarget).data("config");
					banLiDialog.showForm(cfg);
					$('#formNav.formNav table').removeClass("current");
					$(event.currentTarget).addClass("current");
				}, this));
				var $li = $("<li name='" + config.id
						+ "' style='display:none'><div/></li>");
				$li.find("div").append($node);
				$bar.append($li);
				config.jQNode = $li;
			}
			banLiDialog.checkVisibleForms(visibleForms);
			$bar.find("li:visible:eq(0) table").click();
		});
	} else {
		banLiDialog.checkVisibleForms(visibleForms);
//		this.mainForm.currentForm.active();
		$bar.find("li:visible:eq(0) table").click();
	}
};

banLiDialog.checkVisibleForms = function(visibleForms) {
	var $bar = $('#formNav');
	if (visibleForms && visibleForms.length > 0) {
		$bar.find("li")
				.each(
						function() {
							var $this = $(this);
							justep.Array.contain(visibleForms, $this
									.attr("name")) ? $this.show() : $this
									.hide();
						});
	}
};

banLiDialog.showForm = function(config) {
	var prevForm = this.mainForm.currentForm;
	if (prevForm) {
		if (prevForm == config.form)
			return;
		// 触发表单切换前
		if (this.mainForm.getRootForm().formDoc
				.checkEvent("onBeforeChangeForm")) {
			var event = {
				from : prevForm,
				to : config.form,
				cancel : false
			};
			this.mainForm.getRootForm().formDoc.callEvent("onBeforeChangeForm",
					[ event ]);
			if (event.cancel) {
				return;
			}
		}
		// 隐藏前一个窗体 iframe所属的div
		$(prevForm.config.frameDiv).hide();
	}
	// 发送按钮状态
	if (config.form) {
		$(config.frameDiv).show();
		this.changeBindingForm(config.form);
	} else {
		this.initForm(config);
	}
};

banLiDialog.initForm = function(config) {
	var formViewContainer = $("#formView");
	if ($("#" + config.id, formViewContainer).length > 0)
		return;
	formViewContainer
			.append("<div class='xui-autofill' style='width:99%;margin:0 auto' id='"
					+ config.id + "'/>");
	config.frameDiv = $('#' + config.id);

	// 创建form对应的视图(WindowFrame)
	$("#statusPanel").css("display", "inherit");
	var view = new justep.WindowFrame(config.id, config.url, null, null, $
			.proxy(this._onReceiveFormInited, this));
	var mainForm = this.mainForm;
	mainForm.initDeferred.done(function() {
		var options = {
			data : {
				'form' : mainForm,
				'config' : config
			}
		};
		view.open2(options);
	});
};

banLiDialog._onReceiveFormInited = function(event) {
	var data = event.data, frameForm = data.source;
	if (data.kind == "initFinish") {
		$("#statusPanel").css("display", "none");
		this.changeBindingForm(frameForm);
	}
};

banLiDialog.changeBindingForm = function(form) {
	this.mainForm.currentForm = form;
	form.active();
	form.config.processOperation ? $("#btnNext").show() : $("#btnNext").hide();
	justep.xbl("btnNext").setDisabled(
			!justep.Array.contain(this.bizOperations,
					form.config.processOperation));
};

banLiDialog.btnNextClick = function(event) {
	banLiDialog.mainForm
			.saveDatas()
			.done(
					function() {
						var op = banLiDialog.process
								.getOperation(banLiDialog.mainForm.currentForm.config.processOperation);
						op && op.getEnable() && op.execute();
					});
};

banLiDialog.btnCloseClick = function(event) {
	justep.xbl("windowReceiver").windowCancel();
};

banLiDialog.model1Load = function(event) {
	if (justep.WindowReceiver.windowParentObj) {
		var cb = function() {
			banLiDialog.mainForm && banLiDialog.mainForm.saveDatas();
		};

		if (justep.WindowReceiver.windowParentObj.attachEvent) {
			justep.WindowReceiver.windowParentObj.attachEvent("onClose", cb);
		} else if (justep.WindowReceiver.windowParentObj.on) {
			justep.WindowReceiver.windowParentObj.on("onClose", cb);
		}
	}
};
