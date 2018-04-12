/**
 * 页面导航
 */
define(
		[ "require", "base/lib/jquery-tmpl/jquery.tmpl",
				"css!base/lib/cateNav/cateNav" ],
		function(require, j_tmpl, css) {
			var $ = require("jquery");
			css.load();

			var template = $.template || jQuery.template;
			var tmpl = $.tmpl || jQuery.tmpl;
			var cNavTemplate = '<div><div class="side-catalog">'
					+ '  <div class="side-bar">'
					+ '    <em class="circle start"></em>'
					+ '    <em class="circle end"></em>' + '  </div>'
					+ '  <div class="catalog-scroller">'
					+ '	   <div class="catalog-list">'
					+ '      <dl style="display: block;"/>' + '	   </div>'
					+ '  </div></div></div>';
			var cNavControlTemplate = '<dd class="catalog-title cate-level${level}">'
					+ '{{if level == 1}}<em class="pointer"></em>{{/if}}'
					+ '<span></span><a href="#" control="${id}">${name}</a></dd>';

			function S4() {
				return (((1 + Math.random()) * 0x10000) | 0).toString(16)
						.substring(1);
			}
			function guid() {
				return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4()
						+ "-" + S4() + S4() + S4());
			}

			var CateNav = function(options) {
				var me = this;
				me._prevScrollTop = 0;
				me._onWindowScroll = function(e) {
					me._delay && clearTimeout(me._delay);
					me._delay = setTimeout(function() {
						delete me._delay;
						if (me._lastLink
								&& new Date().getTime() - me._lastLink < 1000)
							return;
						me._activeNavAfterScroll();
					}, 100);
				}.bind(this);
				me.init(options);
			};

			CateNav.prototype._activeNavAfterScroll = function() {
				var me = this, scrollTop = $(window).scrollTop();
				$(".catalog-title a", me.$domNode).each(
						function() {
							var $link = $(this), $control = $("#"
									+ $link.attr("control"), me.$container);
							if ($control.length > 0) {
								var h = row && row.heigh || 0, row = $link
										.data("row");
								if ($control.offset().top + h >= scrollTop) {
									$link.parent().addClass("active")
											.siblings().removeClass("active");
									return false;
								}
							}
						});
			};

			CateNav.prototype._hookScrollWin = function() {
				$(window).unbind("scroll", this._onWindowScroll).bind("scroll",
						this._onWindowScroll);
			};

			CateNav.prototype.init = function(options) {
				var me = this;
				if (me.$domNode) {
					me.$domNode.remove();
					delete me.$domNode;
				}
				if (!options)
					return;

				if (options.container) {
					if (typeof options.container == "string"
							&& options.container.indexOf("#") != 0) {
						me.$container = $("#" + options.container);
					} else {
						me.$container = $(options.container);
					}
					var containerID = me.$container.attr("id");
					if (!containerID) {
						containerID = guid();
						me.$container.attr("id", containerID);
					}
					// 返回容器顶部
					$(
							"<a href='#" + containerID
									+ "' class='sysRightarrow'></a>")
							.prependTo("body");
				}
				// 创建导航栏
				me.$domNode = $(cNavTemplate).appendTo("body");
				options.hasOwnProperty("left")
						&& me.$domNode.css("left", options.left);
				options.hasOwnProperty("top")
						&& me.$domNode.css("left", options.top);

				if (options.rows && $.isArray(options.rows)) {
					$(".side-catalog .side-bar", me.$domNode).css("height",
							(options.rows.length + 1) * 45 + "px");
					// 创建导航项
					template('cateNav_template', cNavControlTemplate);
					options.rows
							&& tmpl('cateNav_template', options.rows).appendTo(
									$('.catalog-list dl', me.$domNode));
					var callback = function(e) {
						me._lastLink = new Date().getTime();
						e.preventDefault();
						var $this = $(this);
						$this.parent().addClass("active").siblings()
								.removeClass("active");
						var $control = $("#" + $this.attr('control'),
								me.$container);
						if ($control.length > 0) {
							$("html,body").animate({
								scrollTop : $control.offset().top
							}, 500, 'swing', $this.data("row").onAfterNav);
						}

					};
					$(".catalog-title a", me.$domNode).each(function(idx) {
						$(this).data("row", options.rows[idx]);
					}).click(callback);
				}
				this._hookScrollWin();
			};

			CateNav.createNav = function(contentElem, rows) {
				var options = arguments.length == 1
						&& (typeof arguments[0] == "object") ? arguments[0] : {
					container : arguments[0],
					rows : arguments[1]
				};
				return new CateNav(options);
			};

			return CateNav;
		});