define(
		"base/plugins/NodeLocator",
		[ "require", "jquery", "css!./css/NodeLocator" ],
		function(require, $) {
			require("css!./css/NodeLocator").load();
			var NodeLocator = function(options) {
				this.init(options);
			};

			NodeLocator.prototype.getNavHtml = function(row, level) {
				var html = '<dd class="catalog-title cate-'
						+ (row.items && row.items.length > 0 ? 'catalog'
								: 'leaf') + ' cate-level' + level + '">'
						+ (level == 1 ? '<em class="pointer"/>' : '')
						+ '<span>'
						+ (row.id ? '<a href="#' + row.id + '">' : '')
						+ (row.title || "") + '</a></span></dd>';
				for ( var n in row.items) {
					html += this.getNavHtml(row.items[n], level + 1);
				}
				return html;
			};

			NodeLocator.prototype.init = function(options) {
				var me = this;
				me.animate = options.animate;
				var parentNode = options.parentNode || $("body");
				if (this.$domNode) {
					this.$domNode.remove();
					delete this.$domNode;
				}

				this.$domNode = $(
						'<div class="side-catalog"><div class="side-bar"><em class="circle start" title="返回顶部"/><em class="circle end" title="跳到底部"/></div>'
								+ '<div class="catalog-scroller"><div class="catalog-list"><dl></dl></div></div></div>')
						.appendTo(parentNode);// style="display: block;"

				var pos = options.position || {
					bottom : 10,
					right : 10
				};
				this.$domNode.css(pos);

				var html = "", rows = options.data;
				for ( var n in rows) {
					var row = rows[n];
					html += this.getNavHtml(row, 1);
				}
				var $dl = $('.catalog-list>dl', this.$domNode).append(html);
				$('.side-bar', this.$domNode).height($dl.outerHeight() + 20);
				if (me.animate) {
					$("a", this.$domNode).click(
							function(e) {
								e.preventDefault();
								var $this = $(this);
								$("dd.active", me.$domNode).removeClass(
										'active');
								$this.parents('dd:eq(0)').addClass('active');
								var currSideObj = $("#"
										+ $this.attr('href').replace(/#/, ''));
								if (currSideObj.length > 0) {
									var offsetTop = currSideObj.offset().top;
									$('html,body').animate({
										scrollTop : offsetTop
									}, 500, 'swing');
								}

							});
				}
				$(".start", this.$domNode).click(function() {
					if (me.animate) {
						$('html,body').animate({
							scrollTop : 0
						}, 500, 'swing');
					} else {
						$('html,body').scrollTop(0);
					}
				});
				$(".end", this.$domNode).click(function() {
					var body = $('body')[0];
					if (me.animate) {
						$('html,body').animate({
							scrollTop : body.scrollHeight
						}, 500, 'swing');
					} else {
						$('html,body').scrollTop(body.scrollHeight);
					}
				});

			};
			return NodeLocator;
		});