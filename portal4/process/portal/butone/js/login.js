/**
 * 扩展JQ zhengff 2016-11 内容发生改变触发【input，textarea】
 */
$.event.special.valuechange = {

	teardown : function(namespaces) {
		$(this).unbind('.valuechange');
	},

	handler : function(e) {
		$.event.special.valuechange.triggerChanged($(this));
	},

	add : function(obj) {
		$(this)
				.on(
						'keyup.valuechange cut.valuechange paste.valuechange input.valuechange',
						obj.selector, $.event.special.valuechange.handler)
	},

	triggerChanged : function(element) {
		var current = element[0].contentEditable === 'true' ? element.html()
				: element.val(), previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue
				: element.data('previous')
		if (current !== previous) {
			element.trigger('valuechange', [ element.data('previous') ])
			element.data('previous', current)
		}
	}
}

/**
 * 登录配置 zhengff 2016-10
 */
var defaultOpts = $.extend({
	LG_ID : "login-btn",
	LG_FORM_ID : "login-form",
	CK_KEY : "justep-login",
	ERR : {
		NAME : "msg-wrap",
		STYLE : "msg-error"
	},
	VD_INFO : {
		USER : "用户名不能为空!",
		PWD : "密码不能为空!"
	}
}, window.options || {});

;
(function(global) {
	var Login = function(options) {
		$.extend(this, options);
		this.el = $('#' + this.id);
		eventable(this);
		this.enable_cookie = !!this.setting.get("remember");
		// this.init();

	};

	Login.prototype = {
		init : function() {
			var me = this;
			this.clearBtn = $(".clear-btn");
			this.nameEl = $('input[name=username]', this.el);
			!!this.enable_cookie
					&& this.nameEl.val(this.setting.get("username") || "");

			this.pwdEl = $('input[name=password]', this.el);
			this.vcodeEl = $('input[name=vcode]', this.el);
			this.loginEl = $("#" + defaultOpts.LG_ID);
			// 20161117 zhengff
			this.nameEl.focus(function() {
				$(this).parent().addClass("item-focus");
			}).blur(function() {
				$(this).parent().removeClass("item-focus");
			}).on("valuechange", function(e, previous) {
				if (!$(this).val()) {
					me.clearBtn.hide();
				} else {
					me.clearBtn.show();
				}

			});
			this.clearBtn.click(function() {
				me.nameEl.val("");
				me.clearBtn.hide();
				me.nameEl.focus();
			});

			this.pwdEl.focus(function() {
				$(this).parent().addClass("item-focus");
			}).blur(function() {
				$(this).parent().removeClass("item-focus");
			});

			this.nameEl.keydown(function(event) {
				if (event.keyCode == 13) {
					me.login();
					return false;
				}
			});
			this.pwdEl.keydown(function(event) {
				if (event.keyCode == 13) {
					me.login();
					return false;
				}
			});
			this.vcodeEl.keydown(function(event) {
				if (event.keyCode == 13) {
					me.login();
					return false;
				}
			});
			this.loginEl.click(function() {
				me.login();
				return false;
			});
			this.nameEl.focus();

			this.useCA = !!window.GDCA && !justep.Request.URLParams['ignoreCA'];
			if (this.useCA) {
				if (GDCA.inited) {
					this._bindGDCA();
				} else {
					GDCA.attachEvent("onInited", this._bindGDCA, this);
				}
			}
		},

		_bindGDCA : function() {
			this.nameEl.attr("disabled", "disabled");
			if (GDCA.isValid) {
				try {
					if (GDCA.ActiveXInit())
						this.nameEl.val(GDCA.getUserName());
					else {
						this.callEvent('error', [ "GDCA设备初始化失败" ]);
					}
				} catch (e) {
					this.callEvent('error', [ e.message ]);
					this.disable();
				}

			} else {
				this.callEvent('error', [ "GDCA设备初始化失败" ]);
			}

		},

		disable : function() {
			$('input', this.el).attr("disabled", "disabled");
		},

		disableLogin : function(wait) {
			if (this.loginEl.attr("disabled"))
				return;
			$('input', this.el).attr("readonly", "readonly");
			this.loginEl.attr("disabled", "disabled");
			var s = new Date(), me = this;
			var timer = setInterval(
					function() {
						var waited = parseInt((new Date().getTime() - s
								.getTime()) / 1000);
						if (waited >= wait) {
							clearInterval(timer);
							me.enableLogin();
							me.destroyError();
						} else {
							me.callEvent("error", [ "3次登录名或密码错误，等待"
									+ (wait - waited) + "秒" ]);
						}

					}, 1000);
		},

		enableLogin : function() {
			$('input', this.el).removeAttr("readonly");
			this.loginEl.removeAttr("disabled");
		},

		login : function() {
			if (this.loginEl.attr("disabled")) {
				return;
			}
			if (this.useCA) {
				this._doLoginGDCA();
			} else {
				this._doLoginUserPwd();
			}
		},

		/**
		 * GDCA登陆
		 */
		_doLoginGDCA : function() {
			if (!GDCA.isValid) {
				this.callEvent("error", [ "浏览器不支持GDCA安全插件" ]);
				return;
			}
			// 先ActiveXEnd，防止换key
			GDCA.ActiveXEnd();
			if (!GDCA.ActiveXInit()) {
				this.callEvent("error", [ "GDCA设备初始化失败" ]);
				return;
			}
			if (!this.checkPwd())
				return;

			var password = this.pwdEl.val();
			if (!GDCA.loginUseKey(password)) {
				this.callEvent("error", [ "密码错误" ]);
				return;
			}

			var userName = GDCA.getUserName();
			this.nameEl.val(userName);

			var loginDate = (function() {
				var date = new Date(), y, M, d;
				y = date.getFullYear();
				M = date.getMonth() + 1;
				d = date.getDate();
				return y + "-" + (M < 10 ? "0" : "") + M + "-"
						+ (d < 10 ? "0" : "") + d;
			})();

			var data = {
				CAKeyId : GDCA.getCAKeyID(),
				certData : GDCA.getCertData(2),
				language : this.getLocale(),
				loginDate : loginDate
			};
			if (justep.Request.URLParams["client"] != undefined) {
				data.client = justep.Request.URLParams["client"];
			}
			var me = this, url = window.location.protocol + "//"
					+ window.location.host + justep.Request.BASE_URL
					+ "/UI/portal2/process/portal/GDCALogin.j"; // url =
			// window.location.href.replace(/login.*\.w.*/,'GDCALogin.j');
			$.post(url, data, function(data/* ,textStatus,jqXHR */) {
				me._checkLoginResult(data);
			}, "json");
		},

		_doLoginUserPwd : function() {
			var username = this.nameEl.val(), password = this.pwdEl.val()
			if (this.check()) {
				var url = this.getLoginURL(), loginDate = (function() {
					var date = new Date(), y, M, d;
					y = date.getFullYear();
					M = date.getMonth() + 1;
					d = date.getDate();
					return y + "-" + (M < 10 ? "0" : "") + M + "-"
							+ (d < 10 ? "0" : "") + d;
				})();
				url += '?username=' + username + '&password='
						+ hex_md5(password) + '&language=' + this.getLocale()
						+ '&loginDate=' + loginDate + '&$vcode='
						+ this.vcodeEl.val();
				if (justep.Request.URLParams["client"] != undefined) {
					url += '&client=' + justep.Request.URLParams["client"];
				}
				var result = justep.Request.sendHttpRequest(encodeURI(url));
				result = justep.Request.responseParseJSON(result);
				this._checkLoginResult(result);

			}
		},

		_checkLoginResult : function(result) {
			if (result.flag) {
				this.setting.set("username", this.nameEl.val());
				var url = this.getIndexURL();
				var process = "/portal2/process/portal/portalProcess";
				url += '?language=' + this.getLocale() + '&bsessionid='
						+ result.bsessionid + '&activity=index' + '&process='
						+ process;
				if (justep.Request.URLParams["client"] != undefined) {
					url += '&client=' + justep.Request.URLParams["client"];
				}
				if (_config.appName) {
					url += '&appName=' + _config.appName;
				}

				window.location.href = url;
			} else {
				if (result.code == "BUTONE150003") {
					this.disableLogin(parseInt(result.messages[0]));
				}else if(result.code == "BUTONE150002"){
					reloadVerifyCode();
				}
				this.pwdEl.val(''), this.callEvent('error', [ result.message ]);
			}
		},

		getLoginURL : function() {
			return window.location.href.replace(/login.*\.w.*/, 'DoLogin.j');
		},
		getIndexURL : function() {
			var index = $('input[name=index]:checked').val() || 'index.w';
			return window.location.href.replace(/login.*\.w.*/, index);
		},
		check : function() {
			return this.checkName() && this.checkPwd();
		},
		checkName : function() {
			var username = this.nameEl.val();
			if (!username || username == '') {

				this.nameEl.focus();
				this.nameEl.parent().addClass("item-error");

				this.callEvent('error', [ defaultOpts.VD_INFO.USER ]);
				return false;
			}
			this.nameEl.parent().removeClass("item-error");
			this.destroyError();
			return true;
		},
		checkPwd : function() {
			var value = this.pwdEl.val();
			if (!value || value == '') {
				this.pwdEl.focus();
				this.pwdEl.parent().addClass("item-error");
				this.callEvent('error', [ defaultOpts.VD_INFO.PWD ]);
				return false;
			}
			this.pwdEl.parent().removeClass("item-error");
			this.destroyError();
			return true;
		},
		destroyError : function() {
			var $msgWrap = $('.' + defaultOpts.ERR.NAME);
			var $msgError = $msgWrap.children("." + defaultOpts.ERR.STYLE);
			// 先隐藏，在清空
			$msgError.hide();
			$msgError.children(".txt").empty();

			this.nameEl.focus();
		},
		getLocale : function() {
			var el = document.getElementById("language");
			if (!el) {
				return "zh_CN";
			}
			return el.options[el.selectedIndex].value;
		},
		enableCookie : function(value) {
			this.enable_cookie = value;
		}
	};
	global.Login = Login;
	justep.Portal.Login = Login;
})(window);
$(document).ready(
		function() {
			var setting = (function() {
				var Setting = function(options) {
					$.extend(this, options);
					eventable(this);
					this.el = $("#" + this.id);
					this.data = JSON
							.parse($.cookie(defaultOpts.CK_KEY) || "{}")
							|| {};
					var me = this;
					// 保存用户名
					this.remEl = $("*[name=remember]", this.el).click(
							function() {
								me.set("remember", this.checked);
							});
					this.remEl.get(0).checked = !!this.data["remember"];
				};
				Setting.prototype = {
					set : function(name, value) {
						if (this.data[name] != value) {
							this.data[name] = value;
							this.callEvent('changed', [ name, value ]);
							this.save();
						}
					},
					get : function(name) {
						return this.data[name];
					},
					save : function() {
						$.cookie(defaultOpts.CK_KEY, JSON.stringify(this.data),
								{
									expires : 7,
									path : '/'
								});
					}
				};
				return new Setting({
					id : defaultOpts.LG_FORM_ID
				});
			})();

			var loginer = new Login({
				id : defaultOpts.LG_FORM_ID,
				setting : setting
			});
			// TODO tangkj 增加事件监听再初始化，用于处理init的error事件
			loginer.attachEvent('error', function(message) {
				var $msgWrap = $('.' + defaultOpts.ERR.NAME);
				var $msgError = $msgWrap.children("." + defaultOpts.ERR.STYLE);
				// 先显示，在清空添加错误信息
				$msgError.show()
				$msgError.children(".txt").empty().append(message);
			});
			loginer.init();

			setting.attachEvent('changed', function(name, value) {
				if (name == "remember") {
					loginer.enableCookie(value);
				}
				;
			});
			// 判断license是否有效
			if (!_config.license.success) {
				loginer.disable();
				loginer.callEvent('error', [ _config.license.msg ]);
			} else {
				var expires = _config.license.expires;
				if (expires && expires != "") {
					var value = parseInt(expires);
					if (!(isNaN(value) || value == -1)) {
						var msg = "";
						if (value > 0 && value <= 15) {
							loginer.callEvent('error', [ "平台还有" + value
									+ "天到期，请联系系统管理员" ]);
						} else if (value == -100) {
							loginer.callEvent('error', [ "平台使用期限到期，请与管理员联系" ]);
							loginer.disable();
						}
					}
				}
			}
		});
// 重要:
justep.Context._init = function() {
};