define(["jquery"],function($) {
	butone.loadCss([ "/UI/system/components/menuButton/menuButton.css" ]);
	var menuButton = function(target, options) {
		var $C = null, id = null, me = this, mh = options.height ? options.height
				: "26px";
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
		me.id = id;

		var label = (options.label ? options.label : "");
		var btnHtml = "<div class='menuButton xui-button' style='height:"
				+ mh
				+ "' component='/UI/system/components/menuButton.xbl.xml#menuButton' id='"
				+ id
				+ "'><a class='head' style='background-color:transparent;padding-top:6px' href='#'>"+(
						options.iconClass ? "<span class='icon "+options.iconClass+"'></span>":""
				)+"<span class='label'>"
				+ label + "</span><span class='arr'></span></a></div>";
		if ($C == null || $C.length == 0) {
			$C = $(btnHtml);
		} else {
			var style = $C.attr("style");
			var classes = $C.attr("class");
			$C.replaceWith(btnHtml);
			$C.css("cssText", style);
			$C.addClass(classes);
		}
		$C.attr("declaredClass", "base/plugins/MenuButton");
		$C.data("__plugin", me);

		if (options.cssClass) {
			$C.addClass(options.cssClass);
		}

		var listHtml = "<div class='menuButton menu' id='"
				+ id
				+ "-menu' onselectstart='return false;'><div class='list'>"
				+ "<ul></ul></div><div class='overlay' style='display: none;'></div></div>";
		$("body").append(listHtml);

		me.domNode = $C[0];
		me.$node = $(this.domNode);
		me.$head = $(">.head", me.$node);
		// me.$head.css("cssText", "background-color:transparent!important");
		me.$menu = $("#" + me.domNode.id + "-menu");
		me.$list = $(".list", me.$menu);

		me.$listHead = $(">.head", me.$list);
		me.$listBody = $(">ul", me.$list);
		me.mode = me.$node.attr("mode") || '';

		var onLabelClick = justep.Function.get(me.$node.attr("onLabelClick"));
		if (onLabelClick) {
			me.$head.click(onLabelClick);
			me.$listHead.click(function(event) {
				me.close();
				onLabelClick.call(null, event);
			});
		}

		(onLabelClick ? $('.arr', me.$head) : me.$head).click(function() {
			me.open();
			return false;
		});

		(onLabelClick ? $('.arr', me.$listHead) : me.$listHead)
				.click(function() {
					me.close();
					return false;
				});

		me.$listBody.click(function() {
			me.close();
			return false;
		});

		me.$overlay = $('>.overlay', me.$menu).click(function() {
			me.close();
		});

		me._init(options);
	};

	menuButton.prototype = {
		_init : function(options) {
			function setDisabled(value, force) {
				if (!force && this.$el.attr("always")) {
					value = false;
				}
				if (value) {
					this.$el.attr('disabled', 'disabled');
				} else {
					this.$el.removeAttr('disabled');
				}
			}

			/* item class */
			function BizPlugin(owner, name, $el, options) {
				function initPlugin(options, Plugin) {
					this.instance = new Plugin(options);
					this.instance.execute();
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

				this.owner = owner;
				this.name = name;
				this.$el = $el;
				this.setDisabled = $.proxy(setDisabled, this);
				this.method = $.proxy(createAndExecutePlugin, this, options);
			}

			var opItem = function OperationItem(owner, name, $el,
					operationOwner, operation) {
				this.owner = owner;
				this.name = name;
				this.$el = $el;
				var me = this;

				this.operationNotify = function(event) {
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

				this.operationOwner = justep.xbl(operationOwner);
				if (this.operationOwner) {
					this.operation = this.operationOwner
							.getOperation(operation);
					this.operation.registerObserver(this);
				}
				this.method = function() {
					if (me.operation)
						me.operation.execute();
				};
				this.setDisabled = $.proxy(setDisabled, this);
				this.setLabel = function(value) {
					$('.label', this.$el).html(value);
				};
				if (!justep.String.trim($('.label', this.$el).html()))
					this.setLabel(this.operation.getLabel());
				if (!justep.String.trim($('.label', this.$el).html()))
					this.setLabel(this.operation.getLabel());
				this.setDisabled(!this.operation.getEnable());

				if ($('.icon', this.$el).attr('class') == 'icon empty-icon'
						&& this.operation.getIconClass())
					$('.icon', this.$el).attr('class',
							'icon ' + this.operation.getIconClass());
			};

			opItem.prototype.setDisabled = function(value) {
				setDisabled(value || !this.operation.getEnable());
			};

			function Item(owner, name, $el, method) {
				this.owner = owner;
				this.name = name;
				this.$el = $el;
				if (typeof method == "function")
					this.method = method;
				else if (typeof method == "string")
					eval('this.method = function(event){' + method
							+ '(event);}');
				this.setDisabled = $.proxy(setDisabled, this);
			}

			function createMenuItemHandler(owner, opt, $item) {
				var obj;
				if (opt.declaredClass) {
					obj = new BizPlugin(owner, opt.name, $item, opt);
				} else if (opt.operationOwner && opt.operation) {
					obj = new opItem(owner, opt.name, $item, operationOwner,
							operation);
				} else if (opt.onClick) {
					obj = new Item(owner, opt.name, $item, opt.onClick);
				}
				obj.options = opt;
				$item.click(function() {
					obj.method({
						source : obj,
						data : opt
					});
				});
				return obj;
			}

			var me = this;
			me.options = options, me.handlers = {};
			if (options.items) {
				for ( var n in options.items) {
					var opt = options.items[n];
					if (!opt.name) {
						opt.name = justep.Utils.randomString();
					}
					var $item = $(
							"<li><a href='#' <a href='#' id='"
									+ me.id
									+ "_"
									+ opt.name
									+ "' name='"
									+ opt.name
									+ "'>"
									// icon
									+ (opt.iconClass ? "<span class='icon "
											+ opt.iconClass + "'></span>" : "")
									// label
									+ "<span class='label'>" + opt.label
									+ "</span></a></li>")
							.appendTo(me.$listBody);

					if (opt.domAttr) {
						$item.attr(opt.domAttr);
					}
					if (opt.separator) {
						$item.addClass("sep");
					} else {
						me.handlers[opt.name] = createMenuItemHandler(me, opt,
								$item);
					}
				}
			}
		},
		open : function() {
			this.$listHead.width(this.$head.width());
			/* 清空上次计算的样式 */
			this.$listBody.attr('style', ' ');
			var cls = 'dropdown';
			if (this.mode == 'auto') {
				/* 通过显示计算区域大小 */
				var oriStyle = this.$node.attr("style") || ' ';
				this.$node.attr('style', oriStyle + ';overflow: hidden');
				this.$list.addClass('test');
				var w = Math.max(this.$listBody.outerWidth(), this.$listHead
						.outerWidth()), h = this.$listBody.outerHeight()
						+ this.$listHead.outerHeight();
				this.$list.removeClass('test');
				this.$node.attr('style', oriStyle);

				if ((this.$node.offset().top - $(document).scrollTop() + h) > $(
						window).height())
					cls = 'dropup';
				if ((this.$node.offset().left - $(document).scrollLeft() + w) > $(
						window).width())
					cls += ' left';
			} else {
				if (this.mode.indexOf('up') != -1) {
					cls = 'dropup';
				}
				if (this.mode.indexOf('left') != -1) {
					cls += ' left';
				}
			}

			this.$menu.css(this.$head.offset());
			this.$list.addClass(cls);
			this.$overlay.show();

			/* 计算最小宽度 */
			this.$listBody.css("min-width", Math.max(this.$listBody
					.outerWidth(), this.$listHead.outerWidth())
					- (this.$listBody.outerWidth() - this.$listBody.width()));

			/* 计算偏移位置 */
			this.$listBody.css(((cls.indexOf('dropdown') != -1) ? 'top'
					: 'bottom'), this.$listHead.innerHeight());

			$("span:last", this.$head).removeClass("arr").addClass("arr_u");
		},

		close : function() {
			this.$list.removeClass("dropdown dropup left");
			this.$overlay.hide();

			$("span:last", this.$head).removeClass("arr_u").addClass("arr");
		},

		setDisabled : function(value) {
			var items = this.items;
			for ( var n in items) {
				items[n].setDisabled(value);
			}
		},

		setItemDisabled : function(name, value) {
			this.getItem(name) && this.getItem(name).setDisabled(value);
		},

		getItem : function(name) {
			return this.items[name];
		},

		execItem : function(name) {
			var handler = this.getItem(name);
			if (!handler || handler.$el.attr('disabled'))
				return;
			if (handler.method)
				handler.method({
					source : handler,
					data : handler.options
				});
		}

	};

	return menuButton;
});