if (!$.jpolite)
	$.jpolite = {};
if (!$.jpolite.Login)
	$.jpolite.Login = {
		useCA : !!window.GDCA & !$.urlParam('ignoreCA'),
		items : {},
		onGetUserCheckMsgBefore : null,
		onGetUserCheckMsgAfter : null,
		indexPage : "index.templet.html",
		browser : {
			IE : !!(window.attachEvent && !window.opera),
			FF : navigator.userAgent.indexOf('Gecko') > -1
					&& navigator.userAgent.indexOf('KHTML') == -1
		},
		maximize : function(key) {
			var url = window.location.href.replace(/login.*\.w.*/,
					$.jpolite.Login.indexPage);
			var client = $.urlParam('client');
			if (client)
				url += '?client=' + client;
			if (this.browser.IE) {
				var opened = null
				try {
					opened = window
							.open(
									url,
									'title',
									'width='
											+ (screen.availWidth)
											+ ',height='
											+ (screen.availHeight)
											+ ',channelmode =yes,toolbar=0,menubar=0,resizable=1,location=no,status=no');
					if (opened) {
						window.opener = null;
						window.open('', '_self');
						window.close();
					} else {
						$.jpolite.Data.system.User.logout(function(data) {
						});
					}
				} catch (ee) {
					$.jpolite.Data.system.User.logout(function(data) {
					});
				}
			} else {
				var opened = window
						.open(
								url,
								'title',
								'width='
										+ (screen.availWidth - 8)
										+ ',height='
										+ (screen.availHeight - 56)
										+ ',channelmode =yes,toolbar=no,menubar=no,resizable=1,location=no,status=no');
				if (opened.outerHeight == 0 && opened.outerWidth == 0
						&& opened.innerHeight == 0 && opened.innerWidth == 0) {
					$.jpolite.Data.system.User.logout(function(data) {
					});
				} else {
					setInterval(function() {
						window.open('', '_self', '');
						window.close();
					}, 100);
				}
			}

		},
		checkLogin : function() {
			$.jpolite.Data.system.User.check(function(data) {
				if (data && data.status) {
					window.location.href = window.location.href.replace(
							/login.*\.w.*/, $.jpolite.Login.indexPage);
				}
			});
		},
		initUsernameInput : function(inputID) {
			this.items.usernameInput = $("#" + inputID).keydown(
					function(event) {
						if (event.keyCode == 13) {
							$.jpolite.Login.doLogin();
							return false;
						}
					});
			if (this.useCA) {
				try {
					var GDCA = window.GDCA;
					GDCA.ActiveXInit();
					var userName = GDCA.getUserName();
					this.items.usernameInput.val(userName);
				} catch (e) {
				}
			}
		},
		initPasswordInput : function(inputID) {
			this.items.passwordInput = $("#" + inputID).keydown(
					function(event) {
						if (event.keyCode == 13) {
							$.jpolite.Login.doLogin();
							return false;
						}
					});
		},
		initLoginButton : function(inputID) {
			this.items.loginButton = $("#" + inputID).click(function(event) {
				$.jpolite.Login.doLogin();
				return false;
			});
		},
		initCancelButton : function(inputID) {

		},
		/*
		 * 此处为验证图片的时间Js脚本初始化
		 */
		initCaptchaInput : function(inputID) {
			this.items.captchaInput = $("#" + inputID).keydown(function(event) {
				event.keyCode == 13 && $.jpolite.Login.doLogin();
			});
		},
		initCaptchaImage : function(imageID) {
			this.items.captchaImage = $("#" + imageID)
					.click(
							function(event) {
								this.src = this.src.replace("\?(.)*", '') + "?"
										+ Math.random();
								if ($.jpolite.Login.items.captchaInput)
									$.jpolite.Login.items.captchaInput.focus()
											.select();
							});
		},

		initHintLable : function(id) {
			this.items.hintLable = $("#" + id);
		},
		initLoadingImage : function(id) {
			this.items.loadingImage = $("#" + id);
		},
		initRememberCheckbox : function(checkboxID) {
			this.items.rememberCheckbox = $("#" + checkboxID).change(
					function(event) {
						$
								.cookie("justep-remember",
										$.jpolite.Login.items.rememberCheckbox
												.get(0).checked, {
											expires : 7,
											path : '/'
										});
					});
		},
		initMaximize : function(checkboxID) {
			this.items.maximizeCheckbox = $("#" + checkboxID).change(
					function() {
						$
								.cookie("justep-full-screen",
										$.jpolite.Login.items.maximizeCheckbox
												.get(0).checked, {
											expires : 7,
											path : '/'
										});
					});
		},
		initFromCookie : function(forced) {
			var remember = forced || $.cookie("justep-remember") == "true";
			var rememberElement = this.items.rememberCheckbox ? this.items.rememberCheckbox
					.get(0)
					: null;
			if (rememberElement)
				rememberElement.checked = remember;
			if (remember && !this.useCA) {
				$.jpolite.Login.items.usernameInput.val($
						.cookie("justep-username")
						|| "");
			}
			var maximize = $.cookie("justep-full-screen") == "true";
			var maximizeElement = this.items.maximizeCheckbox ? this.items.maximizeCheckbox
					.get(0)
					: null;
			if (maximize)
				maximizeElement.checked = maximize;
		},
		initFocus : function() {
			$(this.items.usernameInput).val() ? $(this.items.passwordInput)
					.focus() : $(this.items.usernameInput).focus();
		},
		doGetDefaultCheckMsg : function() {
			if (this.onGetUserCheckMsgBefore) {
				var msg = this.onGetUserCheckMsgBefore();
				if (msg)
					return msg;
			}
			var username = $.trim($.jpolite.Login.items.usernameInput.val());
			if (username == "") {
				$.jpolite.Login.items.usernameInput.focus();
				return "请输入用户名！";
			}

			if (this.onGetUserCheckMsgAfter) {
				return this.onGetUserCheckMsgAfter();
			}
		},
		doDisabledInput : function(b) {
			for ( var i in this.items) {
				var item = this.items[i];
				if (this.useCA && item == this.items.usernameInput)
					continue;
				var element = item.get(0);
				if (element)
					element.disabled = (this.items[i] == this.items.cancelButton ? !b
							: b);
			}
		},
		doSleep : function(n) {
			var s = "您已经连续3次登录错误，请等待" + n + "秒重新登录！";
			$.jpolite.Login.items.hintLable
					&& $.jpolite.Login.items.hintLable.text(s).show();
			if (--n >= 0) {
				setTimeout("$.jpolite.Login.doSleep(" + n + ")", 1000);
			} else {
				$.jpolite.Login.doDisabledInput(false);
				$.jpolite.Login.items.passwordInput
						&& $.jpolite.Login.items.passwordInput.focus();
				$.jpolite.Login.items.hintLable
						&& $.jpolite.Login.items.hintLable.text("").show();
			}
		},
		getLocale : function() {
			var el = document.getElementById("language");
			if (!el) {
				return "zh_CN";
			}
			return el.options[el.selectedIndex].value;
		},

		doLoginUserPwd : function(username, password) {
			var param = {};
			if (portalConfig.captcha) {
				param['captcha'] = this.items.captchaInput.val();
			}
			var captcha = $("#captcha_input").val();
			$.jpolite.Data.system.User.login(username, password,
					$.jpolite.Login.getLocale(), param, $.proxy(
							this.doCheckLoginData, this));
		},

		/**
		 * 查询GDCA人员信息并执行登陆
		 */
		doQueryGDCAUserInfo : function() {
			var url = window.location.href.replace(/login.*\.w.*/,
					'GDCALogin.j');
			var GDCA = window.GDCA;
			var data = {
				CAKeyId : GDCA.getCAKeyID(),
				language : this.getLocale()
			};
			var me = this;
			$.post(url, data, function(data /* ,textStatus, jqXHR */) {
				if (data && data.flag) {
					var info = data.data.value;
					me.items.usernameInput.val(info.c);
					me.doLoginUserPwd(info.c, info.p);
				} else {
					me._loginError(data.message);
				}
			}, "json");
		},

		/**
		 * 登陆按钮触发
		 */
		doLogin : function() {
			// 输入检查
			var msg = this.doGetDefaultCheckMsg();
			if (msg) {
				this.items.hintLable
						&& this.items.hintLable.text(msg).show();
				return;
			}
			
			this.items.loadingImage && this.items.loadingImage.show();
			this.doDisabledInput(true);
			if (typeof $.jpolite.Login._error_count_ == "undefined")
				$.jpolite.Login._error_count_ = 0;
			
			if (this.useCA) {
				var GDCA = window.GDCA;
				// 先logoff，防止换key
				GDCA.logoff();
				var caValid = GDCA.ActiveXInit();
				if (!caValid) {
					alert("GDCA设备初始化失败");
					return;
				}
				var password = this.items.passwordInput.val();
				if (!GDCA.loginUseKey(password)) {
					this._loginError("密码错误");
					return;
				}
				this.doQueryGDCAUserInfo();
			} else {
				var username = $.trim(this.items.usernameInput.val()
						.toLowerCase());
				var password = this.items.passwordInput.val();
				this.doLoginUserPwd(username, hex_md5(password));
			}
		},

		/**
		 * 检查登陆信息
		 */
		doCheckLoginData : function(data) {
			if (data && data.status) {
				this._loginSuccess();
			} else {
				this._loginError(data.message);
			}
		},

		_loginError : function(message) {
			$.jpolite.Login.items.loadingImage
					&& $.jpolite.Login.items.loadingImage.hide();
			$.jpolite.Login.items.hintLable
					&& $.jpolite.Login.items.hintLable.text(message).show();
			$.jpolite.Login.items.passwordInput
					&& $.jpolite.Login.items.passwordInput.val("").focus();
			$.jpolite.Login._error_count_++;
			if ($.jpolite.Login._error_count_ == 3) {
				$.jpolite.Login._error_count_ = 0;
				setTimeout("$.jpolite.Login.doSleep(" + 10 + ")", 1000);
			} else {
				$.jpolite.Login.doDisabledInput(false);
				$.jpolite.Login.items.passwordInput
						&& $.jpolite.Login.items.passwordInput.focus();
			}
		},

		_loginSuccess : function() {
			var username = $.trim(this.items.usernameInput.val().toLowerCase());
			$.cookie("justep-username", username, {
				expires : 7,
				path : '/'
			});
			if ($.jpolite.Login.items.maximizeCheckbox.get(0).checked) {
				if (!window.opener) {
					$.jpolite.Login.maximize();
				} else {
					var url = window.location.href.replace(/login.*\.w.*/,
							$.jpolite.Login.indexPage)
							+ "?timestamp=" + new Date().valueOf();
					var client = $.urlParam('client');
					if (client)
						url += '&client=' + client;
					window.location.href = url;
				}
			} else {
				var url = window.location.href.replace(/login.*\.w.*/,
						$.jpolite.Login.indexPage)
						+ "?timestamp=" + new Date().valueOf()
				var client = $.urlParam('client');
				if (client)
					url += '&client=' + client;
				window.location.href = url;
			}
		}
	};