define(["jquery"],function($) {
	var trigger = function(target, options) {
		var $C = null, id = null, me = this;
		if (options.declaredClass == "base/plugins/Trigger")
			delete options.declaredClass;
		if (typeof target == "string") {
			$C = $("#" + target);
			id = target;
		} else if (target && target.nodeType) {
			$C = $(target);
			id = $C.attr("id");
		}
		if (!id)
			id = justep.Utils.randomString();

		var isBtn = !(options.appearance == "minimal" || options.appearance == "image-minimal");
		var aHtml = "<a class='xui-button-label'>"
				+ "<i class='icon'></i><span class='xforms-label'></span></a>";
		var bHtml = "<button class='xui-button-label' onmouseout='xforms.Core.setClass(this,\"xforms-trigger-over\")' onmouseover='xforms.Core.setClass(this,\"xforms-trigger-over\",true)' type='button'>"
				+ "<i class='icon'></i><span class='xforms-label'></span></button>";
		var html = "<table cellpadding='0' cellspacing='0' class='trigger xforms-control xforms-trigger xforms-appearance-minimal xui-button' component='/UI/system/components/trigger.xbl.xml#trigger' "
				+ "id="
				+ options.id
				+ " onmouseout='xforms.showMessage(this,false)' onmouseover='xforms.showMessage(this,true)'>"
				+ "<tbody><tr><td class='xxf-value'>"
				+ (isBtn ? bHtml : aHtml)
				+ "</td><td class='xxf-alert'><span class='xforms-alert'><span class='xforms-alert-icon' onmouseout='show(this, null, false)' onmouseover='show(this, null, true)'></span>"
				+ "<div class='xforms-alert-value'></div></span></td> </tr></tbody> </table>";
		if ($C == null || $C.length == 0) {
			$C = $(html);
		} else
			$C.replaceWith(html);
		$C.attr("declaredClass", "base/plugins/Trigger");
		$C.data("__plugin", me);

		if (options.cssClass) {
			$C.addClass(options.cssClass);
		}

		var $btn = null;
		if (isBtn) {
			$btn = $("button.xui-button-label", $C);
		} else {
			$btn = $("a.xui-button-label", $C);
		}

		if ("TB" == options.imageTextMode)
			$btn.addClass("xforms-image-top");

		// 标签
		var $label = $("span.xforms-label", $C);
		$label.text(options.label);

		// 换行
		var needBR = options.imageTextMode == "TB"
				&& options.appearance == "image-text";
		if (needBR) {
			$("<br>").insertBefore($label);
			$C.height("40px");
		}

		if (options.iconClass) {
			$("i.icon", $C).css("display",
					options.iconClass ? "inline-block" : "none").addClass(
					options.iconClass);
		} else {
			$("i.icon", $C).remove();
		}
		me.domNode = $C[0];
		if (options.domAttr) {
			$C.attr(options.domAttr);
		}

		me._init(options);
		$C.click($.proxy(me.execute, me));
	};

	trigger.prototype = {
		_init : function(options) {
			function setDisabled(value, force) {
				if (!force && this.$el.attr("always")) {
					value = false;
				}
				if (value) {
					$(".xui-button-label", this.$el).attr('disabled',
							'disabled');
				} else {
					$(".xui-button-label", this.$el).removeAttr('disabled');
					// this.$el.removeAttr('disabled');
				}
			}

			/* item class */
			function BizPlugin(owner, el, options) {
				function initPlugin(options, Plugin) {
					this._instance = new Plugin(options);
					this._instance.execute();
				}

				function createAndExecutePlugin(options) {
					if (this._instance) {
						this._instance.execute();
					} else {
						var fn = $.proxy(initPlugin, this, options);
						var declaredClass = options.declaredClass;
						require([ options.declaredClass ], fn);
					}
				}
				var me = this;
				me.owner = owner;
				me.$el = $(el);
				me.setDisabled = $.proxy(setDisabled, me);
				me.method = $.proxy(createAndExecutePlugin, me, options);
			}

			var opItem = function OperationItem(owner, el, operationOwner,
					operation) {
				var me = this;
				me.owner = owner;
				me.$el = $(el);
				me.operationNotify = function(event) {
					if (event.type == 'change') {
						var name = event.property;
						if (name == 'label') {
							me.setLabel(event.value);
						}
						if (name == 'enable') {
							me.setDisabled(!event.value);
						}
					}
				};

				me.operationOwner = justep.xbl(operationOwner);
				if (me.operationOwner) {
					me.operation = me.operationOwner.getOperation(operation);
					me.operation.registerObserver(me);
				}

				me.method = function() {
					if (me.operation)
						me.operation.execute();
				};
				me.setDisabled = $.proxy(setDisabled, me);
				me.setLabel = function(value) {
					$('.label', me.$el).html(value);
				};
				if (!justep.String.trim($('.label', me.$el).html()))
					me.setLabel(me.operation.getLabel());
				if (!justep.String.trim($('.label', me.$el).html()))
					me.setLabel(me.operation.getLabel());
				me.setDisabled(!me.operation.getEnable());

				if ($('.icon', me.$el).attr('class') == 'icon empty-icon'
						&& me.operation.getIconClass())
					$('.icon', me.$el).attr('class',
							'icon ' + me.operation.getIconClass());
			};

			opItem.prototype.setDisabled = function(value) {
				setDisabled(value || !this.operation.getEnable());
			};

			function Item(owner, el, method) {
				this.owner = owner;
				this.$el = $(el);
				if (typeof method == "function")
					this.method = method;
				else if (typeof method == "string")
					eval('this.method = function(event){' + method
							+ '(event);}');
				this.setDisabled = $.proxy(setDisabled, this);
			}

			var self = this;
			self.options = options;

			if (options.declaredClass) {
				self._executor = new BizPlugin(self, self.domNode, options);
			} else if (options.operationOwner && options.operation) {
				self._executor = new opItem(self, self.domNode, operationOwner,
						operation);
			} else if (options.onClick) {
				self._executor = new Item(self, self.domNode, options.onClick);
			}
		},

		setDisabled : function(value, force) {
			this._executor && this._executor.setDisabled(value);
		},

		execute : function() {
			var me = this, executor = me._executor;
			if (!executor || executor.$el.attr('disabled'))
				return;
			if (executor.method)
				executor.method({
					source : me,
					data : me.options
				});
		}
	};

	return trigger;
});