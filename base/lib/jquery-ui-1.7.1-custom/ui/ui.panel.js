/*
 * jQuery UI Panel 1.7.1
 *
 * Depends:
 *   ui.core.js
 */
(function($) {
	var panel = {

		_init : function() {
			var o = this.options, self = this, ele = this.element, hidden = ele
					.is(":hidden");
			if (hidden)
				ele.show();
			ele.addClass(
					"ui-panel" + " ui-widget" + " ui-widget-content"
							+ " ui-corner-bottom").attr({
				role : "panel"
			}).css({
				"box-shadow" : "5px 3px 3px 0px rgba(0,0,0,0.5)",
				"box-sizing" : "border-box",
				"-moz-box-sizing" : "border-box", /* Firefox */
				"-webkit-box-sizing" : "border-box" /* Safari */
			});

			ele.bind("selectstart", function() {
				return false;
			});
			// dhtmlx_wins_td_header_middle ui-widget-header
			this.titleDiv = $(
					'<div class="dhtmlx_wins_td_header_middle" style="width:100%;line-height:30px;text-align:'
							+ o.titleAlign
							+ ';border:0px">'
							+ '<span role="panel.title" class="dhtmlx_wins_title_dhx_blue" style="padding-left:10px">'
							+ o.title
							+ '</span><span role="panel.action.expand" class="ui-icon" style="cursor:pointer;float:right;margin:5px 5px 0px 0px"/></div>')
					.prependTo(ele);
			this.btnExpand = $("span[role='panel.action.expand']",
					this.titleDiv).bind("click", function() {
				self.expand(!o.expanded);
			});
			this._titleMinWidth = o.minWidth || $("span[role='panel.title']", this.titleDiv).outerWidth() + 40 || 60;

			this.enableExpand(o.enableExpand);

			if (o.content) {
				this.content = ele.find(o.content);
			} else {
				if (ele.children().length == 1) {
					this.content = $("<div></div>").appendTo(ele);
				} else {
					this.content = $(ele.children()[1]);
				}
			}
			this._eleWidth = ele.outerWidth() + 2;
			this._eleRight = ele.position().left + ele.outerWidth();

			this._toggleExpand(o.expanded);
			this._setExpandIcon(o.expanded);
			this.enableDrag(o.enableDrag);
			if (hidden)
				ele.hide();
		},

		destroy : function() {
			this.element.removeClass(
					"ui-panel" + " ui-widget" + " ui-widget-content"
							+ " ui-corner-bottom").removeAttr("role")
					.removeData("panel").unbind(".panel");

			this.titleDiv.remove();
			$.widget.prototype.destroy.apply(this, arguments);
		},

		enableExpand : function(newValue) {
			arguments.length && this._setData("enableExpand", newValue);
			return this._getData("enableExpand");
		},

		enableDrag : function(newValue) {
			arguments.length && this._setData("enableDrag", newValue);
			return this._getData("enableDrag");
		},

		expand : function(newValue) {
			arguments.length && this._setData("expanded", newValue);
			return this._getData("expanded");
		},

		_toggleExpand : function(value) {
			if (value) {
				var opt = {
					width : this._eleWidth,
					height : "auto"
				};
				this.element.css(opt);

			} else {
				var opt = {
					width : this._titleMinWidth,
					height : this.titleDiv.outerHeight() + 2
				};
				this.element.css(opt);
			}
		},

		_setExpandIcon : function(value) {
			if (value) {
				this.btnExpand.addClass("ui-icon-triangle-1-n").removeClass(
						"ui-icon-triangle-1-s");
				this.content.show();
			} else {
				this.btnExpand.addClass("ui-icon-triangle-1-s").removeClass(
						"ui-icon-triangle-1-n");
				this.content.hide();
			}
		},

		_setData : function(key, value) {
			var self = this, ele = self.element;
			switch (key) {
			case 'expanded':
				this._toggleExpand(value);
				this._setExpandIcon(value);
				break;
			case 'enableDrag':
				if (value) {
					this.element.draggable({
						stop : function() {
							if ($.inArray("R", self.options.anchor) >= 0) {
								ele.css({
									left : "",
									right : $(window).width()
											- ele.position().left - ele.width()
											- 2

								});
							}
							if ($.inArray("B", self.options.anchor) >= 0) {
								ele.css({
									top : "",
									bottom : $(window).height()
											- ele.position().top - ele.height()
											- 2
								});
							}

						},
						start : function() {
							ele.css({
								bottom : ""
							});
						}
					});
				} else {
					this.element.draggable("destroy");
				}
				this.titleDiv.css("cursor", value ? "move" : "default");
				break;
			case "enableExpand":
				if (value) {
					this.btnExpand.show();
				} else {
					this.btnExpand.hide();
				}
				break;
			case 'content':
				this.content.remove();
				this.content = $(value).appendTo(ele);
				return;
			case 'title':
				break;
			}
			$.widget.prototype._setData.apply(this, arguments);
		}
	};

	$.widget("ui.panel", panel);

	$.extend($.ui.panel, {
		version : "1.7.1",
		defaults : {
			title : "No Title",
			titleAlign : "center",
			enableExpand : true,
			expanded : true,
			anchor : []
		}
	});

})(jQuery);
