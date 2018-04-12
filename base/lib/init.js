// 扩展butone和jquery

var jqueryResizeHandler = function($, h, c) {
	var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j
			+ "-special-event", b = "delay", f = "throttleWindow";
	e[b] = 1000;
	e[f] = true;
	$.event.special[j] = {
		setup : function() {
			if (!e[f] && this[k]) {
				return false;
			}
			var l = $(this);
			a = a.add(l);
			$.data(this, d, {
				w : l.width(),
				h : l.height()
			});
			if (a.length === 1) {
				g();
			}
		},
		teardown : function() {
			if (!e[f] && this[k]) {
				return false;
			}
			var l = $(this);
			a = a.not(l);
			l.removeData(d);
			if (!a.length) {
				clearTimeout(i);
			}
		},
		add : function(l) {
			if (!e[f] && this[k]) {
				return false;
			}
			var n;
			function m(s, o, p) {
				var q = $(this), r = $.data(this, d);
				r.w = o !== c ? o : q.width();
				r.h = p !== c ? p : q.height();
				n.apply(this, arguments);
			}
			if ($.isFunction(l)) {
				n = l;
				return m;
			} else {
				n = l.handler;
				l.handler = m;
			}
		}
	};
	function g() {
		i = h[k](function() {
			a.each(function() {
				var n = $(this), m = n.width(), l = n.height(), o = $.data(
						this, d);
				if (m !== o.w || l !== o.h) {
					n.trigger(j, [ o.w = m, o.h = l ]);
				}
			});
			g();
		}, e[b]);
	}
};

(function(jQuery, global) {
	jqueryResizeHandler(jQuery, global);
	var baseUrl = location.protocol + "//" + location.host
			+ justep.Request.BASE_URL + "/UI";
	var language = jQuery("script[src]:eq(0)", "head").attr("src");
	language = language.substring(language.indexOf("=") + 1);
	/**
	 * 同步加载javascript，带/UI的全路径
	 */
	function loadJavaScript(urls, callback) {
		function getScript(url) {
			jQuery.ajax({
				async : false,
				type : "GET",
				url : justep.Request.BASE_URL + url,
				success : function() {
					callback && callback.apply(null, arguments);
				},
				dataType : "script",
				error : function(err) {
					alert(err);
				}
			});
		}
		jQuery.each(urls, function(idx, url) {
			var loadIt = jQuery("script[src$='" + url + "?language=" + language
					+ "']").length == 0;
			if (loadIt) {
				getScript(url);
			} else {
				callback && callback(url);
			}
		});
	}

	// ******************************requireJS初始化配置************************************
	function initRequireJS() {
		var rootContext = require.config({
			waitSeconds : 300,
			baseUrl : baseUrl,
			// 第三方脚本模块的别名
			paths : {
				jquery : 'base/lib/jquery-1.11.1/jquery-1.11.1',
				text : "base/lib/require/text.2.0.10",
				bind : "base/lib/bind/bind.debug"
			},
			map : {
				'*' : {
					css : baseUrl + "/base/lib/require/css.js"
				}
			},
			packages : [ {
				name : 'echarts',
				location : 'base/lib/echarts',
				main : 'echarts'
			}, {
				name : 'zrender',
				location : 'base/lib/zrender', // zrender与echarts在同一级目录
				main : 'zrender'
			}, {
				name : '$UI',
				location : '.'
			}, {
				name : 'base',
				location : 'base'
			}, {
				name : 'base_X',
				location : 'base_X'
			}, {
				name : 'system',
				location : 'system'
			}, {
				name : 'system_X',
				location : 'system_X'
			} ]

		});
	}

	// *************************************加载同步加载requireJS,异步加载jquery-1.11.1,knockout*************************
	var loadKO = false;
	jQuery("script[src$='/base/lib/init.js?language=" + language + "']", "head")
			.each(
					function() {
						return loadKO
								|| (loadKO = $(this).attr("loadKO") == "true"),
								!loadKO;
					});

	var butone = global.butone = global.butone || {};
	var _bindModelDeferred;
	butone.Context = {
		getBindModelPromise : function() {
			if (_bindModelDeferred)
				return _bindModelDeferred.promise();
			else
				null;
		}
	};
	// 同步加载requireJS
	loadJavaScript([ "/UI/base/lib/require/require.2.1.10.debug.js" ],
			function() {
				initRequireJS();
				// 异步jquery1.11.1,requireJS加载js在head最后，意味着init~jquery1.11.1之间的js中使用的应该是jquery1.4.2
				require([ "jquery" ], function($2) {
					_bindModelDeferred = $2.Deferred();
					jqueryResizeHandler($2, this);
					if (loadKO) {
						var js = [ "bind", "base/lib/bind/composition",
								"base/lib/bind/model",
								"css!base/lib/bootstrap/bootstrap.min",
								"css!base/components/knockout/css/comp.min" ]
								.concat(global.__requireComponents);
						require(js, function(Bind, Composition, Model, css1,
								css2) {
							// 先不处理版本冲突，konockout需要1.11.1,bind加载后解决版本冲突
							butone.Bind = Bind;
							global.$2 = $2.noConflict(true);
							css1.load();
							css2.load();
							_bindModelDeferred.resolve(Model.instance());

						});
					} else {
						// 解决版本冲突
						global.$2 = $2.noConflict(true);
					}
				});
			});

	// **********************************butone初始化************************************
	butone = $.extend(butone, {
		getOption : function(options, name) {
			var result = undefined;
			if ((options != null) && (options != undefined)) {
				if ((options[name] != undefined) && (options[name] != null)) {
					result = options[name];
				}
			}
			return result;
		},

		attachEvent : function(target, event, options) {
			var f = this.getOption(options, event);
			if (f) {
				if (typeof (f) == "string") {
					try {
						f = eval(f);
					} catch (e) {
					}
				}

				if (f && typeof f == "function") {
					target.attachEvent(event, f, target);
				}
			}
		},

		/**
		 * 加载Css
		 * 
		 * @param urls
		 * @returns
		 */
		loadCss : function(urls) {
			for ( var n in urls) {
				var href = justep.Request.BASE_URL + urls[n] + "?language="
						+ language;
				if ($("link[href$='" + href + "']", "head").length == 0) {
					if (document.createStyleSheet) {
						document.createStyleSheet(href);
					} else {
						$("<link>").attr({
							rel : "stylesheet",
							type : "text/css",
							href : href
						}).appendTo("head");
					}
				}
			}
		}
	});

	(function() {
		var userAgent = navigator.userAgent, rMsie = /(msie\s|trident.*rv:)([\w.]+)/, rEdge = /(edge)\/([\w.]+)/, rFirefox = /(firefox)\/([\w.]+)/, rOpera = /(opera).+version\/([\w.]+)/, rChrome = /(chrome)\/([\w.]+)/, rSafari = /version\/([\w.]+).*(safari)/;
		var ua = userAgent.toLowerCase();
		function uaMatch(ua) {
			var match = rMsie.exec(ua);
			if (match != null) {
				return {
					browser : "IE",
					version : match[2] || "0"
				};
			}
			match = rEdge.exec(ua)
			if (match != null) {
				return {
					browser : match[1] || "",
					version : match[2] || "0"
				};
			}
			match = rFirefox.exec(ua);
			if (match != null) {
				return {
					browser : match[1] || "",
					version : match[2] || "0"
				};
			}
			match = rOpera.exec(ua);
			if (match != null) {
				return {
					browser : match[1] || "",
					version : match[2] || "0"
				};
			}
			match = rChrome.exec(ua);
			if (match != null) {
				return {
					browser : match[1] || "",
					version : match[2] || "0"
				};
			}
			match = rSafari.exec(ua);
			if (match != null) {
				return {
					browser : match[2] || "",
					version : match[1] || "0"
				};
			}
			if (match != null) {
				return {
					browser : "",
					version : "0"
				};
			}
		}
		var browserMatch = uaMatch(userAgent.toLowerCase());
		if (browserMatch.browser) {
			butone.Browser = browserMatch;
		}
	})();

	butone.Fn = $.extend(butone.Fn || {}, {
		ln : "\n",
		// 字符串相加函数
		strAdd : function() {
			var result = "";
			for ( var i = 0; i < arguments.length; i++) {
				if (i == arguments.length - 1)
					result += arguments[i];
				else
					result += arguments[i] + '\n';

			}
			return result;
		}
	});

	/**
	 * 查询模块是否需要引用,不包含UI,不包含.js的requireJS模块名
	 * 
	 * @param modelNames
	 * @returns {Array}
	 */
	function queryRequireModel(modelNames) {
		var ret = [];
		for ( var n in modelNames) {
			var modelName = modelNames[n];
			if ($("script[src$='/UI/" + modelName + ".js?language=" + language
					+ "']").length == 0) {
				ret.push(modelName);
			}
		}
		return ret;
	}

	butone.Loader = $.extend(butone.Loader || {}, {
		loadKnockout : function(reqs, callback, errback) {
			require(reqs, callback, errback);
		},

		requireJS : function(reqs, callback, errback) {
			if (!$2) {
				alert("系统资源加载中，请稍后尝试");
				return;
			}
			var reqs = queryRequireModel(reqs);
			if (reqs.length > 0) {
				var dtd = $2.Deferred();
				require(reqs, function() {
					try {
						callback && callback.apply(null, arguments);
					} finally {
						dtd.resolve(arguments);
					}
				}, function(err) {
					alert(err);
					try {
						errback && errback.apply(null, arguments);
					} finally {
						dtd.reject(err);
					}
				});
				return dtd.promise();
			} else {
				return $2.when();
			}
		}
	});
	
	/*****************扩展justep****************************/
	justep.Context.getCurrentPersonPostName = function(){
		return justep.Context.getCurrentPersonPostName()
	};
	
	justep.Context.getCurrentPersonGlobalSequence = function(){
		return justep.Context.getCurrentPersonGlobalSequence();
	};

}(jQuery, this));