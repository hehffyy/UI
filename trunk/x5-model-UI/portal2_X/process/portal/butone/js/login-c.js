(function(global) {
	var GDCA = global.GDCA;
	var Login = function(options) {
		$.extend(this, options);
		this.el = $('#' + this.id);
		eventable(this);
		this.enable_cookie = !!this.setting.get("remember");
		// tangkj 2015-4-19 启用CA标记
		this.useCA = !!GDCA & !justep.Request.URLParams['ignoreCA'];
		if (this.useCA) {
			GDCA.attachEvent("onInited", this._bindGDCA, this);
		}
		this.init();
	};

	Login.prototype = {
		init : function() {
			var me = this;
			this.el.addClass('login');
			this.el.empty();
			this.emptyText = '请输入';
			this.el
					.append($('<div class="cform">'
							+ '<input class="name" name="username" value="用户名"></input>'
							+ '<input type="password" class="pwd" name="password" value="密 码"></input>'
							+ '</div>' + ''));
			this.nameEl = $('input[name=username]', this.el);
			if (this.enable_cookie)
				this.nameEl.val(this.setting.get("username") || "");
			this.pwdEl = $('input[name=password]', this.el);
			this.loginEl = $('.loginBtn', "#main");

			this.nameEl.focus(function(event) {
				if (this.value == this.defaultValue) {
					this.value = '';
				}
			});
			this.nameEl.blur(function(event) {
				if (!this.value) {
					this.value = this.defaultValue;
					this.type = 'text';
				}
			});

			this.nameEl.keydown(function(event) {
				if (event.keyCode == 13) {
					me.login();
					return false;
				}
			});

			this.pwdEl.focus(function(event) {
				// if (this.value == this.defaultValue) {
				// this.value = '';
				// this.type = 'password';
				// }
			});
			this.pwdEl.blur(function(event) {
				// if (!this.value) {
				// this.value = this.defaultValue;
				// this.type = 'text';
				// } else {
				// this.type = 'password';
				// }
			});

			this.pwdEl.keydown(function(event) {
				debugger;
				if (event.keyCode == 13) {
					me.login();
					return false;
				}
			});
			this.pwdEl.focus();

			this.loginEl.click(function() {
				me.login();
				return false;
			});

			// tangkj 2015-4-19 开启CA登陆框处理
			if (this.useCA && GDCA.inited) {
				this._bindGDCA();
			}
		},
		
		_bindGDCA : function(){
			this.nameEl.attr("disabled", "disabled");
			if(GDCA.ActiveXInit()){
				this.nameEl.val(GDCA.getUserName());
			}else{
				 this.callEvent('error', [ "GDCA设备初始化失败" ]);
			}
		},

		disable : function() {
			$('input', this.el).attr("disabled", true);
		},

		/**
		 * GDCA登陆
		 */
		_doLoginGDCA : function() {
			// 先ActiveXEnd，防止换key
			if(!GDCA.isValid){
				this.callEvent("error",["浏览器不支持GDCA安全插件"]);
				return;
			}
			GDCA.ActiveXEnd();
			var caValid = GDCA.ActiveXInit();
			if (!caValid) {
				alert("GDCA设备初始化失败");
				return;
			}
			if (!this.checkPwd())
				return;

			var password = this.pwdEl.val();
			if (!GDCA.loginUseKey(password)) {
				alert("密码错误");
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
			var me = this, url = window.location.href.replace(/login.*\.w.*/,
					'GDCALogin.j');
			$.post(url, data, function(data/* ,textStatus,jqXHR */) {
				me._checkLoginResult(data);
			}, "json");
		},

		/**
		 * 用户名密码登陆
		 * 
		 * @param callback
		 */
		_doLoginUserPwd : function() {
			var username = this.nameEl.val(), password = this.pwdEl.val(), me = this;
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
						+ '&loginDate=' + loginDate;
				if (justep.Request.URLParams["client"] != undefined) {
					url += '&client=' + justep.Request.URLParams["client"];
				}
				var result = justep.Request.sendHttpRequest(encodeURI(url));
				result = justep.Request.responseParseJSON(result);
				this._checkLoginResult(result);
			}
		},

		/**
		 * 检查登陆返回的数据
		 */
		_checkLoginResult : function(result) {
			var me = this;
			if (result.flag) {
				me.setting.set("username", me.nameEl.val());
				var url = me.getIndexURL();
				var process = "/portal2/process/portal/portalProcess";
				url += '?language=' + this.getLocale() + '&bsessionid='
						+ result.bsessionid + '&activity=index' + '&process='
						+ process;
				// url += '?language=' + me.getLocale() + '&bsessionid='+
				// result.bsessionid + '&activity=index';
				if (justep.Request.URLParams["client"] != undefined) {
					url += '&client=' + justep.Request.URLParams["client"];
				}
				if (me.setting.get("maximize")) {
					var opened = window
							.open(
									url,
									'justep',
									'width='
											+ (screen.availWidth - 8)
											+ ',height='
											+ (screen.availHeight - 56)
											+ ',channelmode =yes,toolbar=no,menubar=no,resizable=1,location=no,status=no');
					if (opened.outerHeight == 0 && opened.outerWidth == 0
							&& opened.innerHeight == 0
							&& opened.innerWidth == 0) {
						// $.jpolite.Data.system.User.logout(function(data){});
					} else {
						setInterval(function() {
							window.open('', '_self', '');
							window.close();
						}, 100);
					}
				} else {
					window.location.href = url;
				}
			} else {
				me.pwdEl.val(''), me.callEvent('error', [ result.message ]);
			}
		},

		login : function() {
			if (this.useCA) {
				this._doLoginGDCA();
			} else {
				this._doLoginUserPwd();
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
				this.nameEl.addClass('error');
				return false;
			}
			this.nameEl.removeClass('error');
			return true;
		},
		checkPwd : function() {
			var value = this.pwdEl.val();
			if (!value || value == '') {
				this.pwdEl.addClass('error');
				return false;
			}
			this.pwdEl.removeClass('error');
			return true;
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
