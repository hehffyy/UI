(function(global){
	
	var Login = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		eventable(this);
		this.enable_cookie = !!this.setting.get("remember");
		this.init(); 
	};
	
	Login.prototype = {
		init: function(){
			var me = this;
			this.el.addClass('login');
			this.el.empty();
			this.emptyText = '请输入';
			this.el.append($('<div class="cform">' +
					'<input id="login-name" class="name" name="username" placeholder="用户名"></input>' +
					'<input id="login-pwd" type="password" class="pwd" name="password" placeholder="密&nbsp;码"></input>' +
					'</div>' +
				''));
			this.nameEl = $('input[name=username]',this.el);
			if(this.enable_cookie)
				this.nameEl.val(this.setting.get("username") || "");
			this.pwdEl = $('input[name=password]',this.el);
			this.loginEl = $('.loginBtn',"#main");
			
			this.nameEl.keydown(function(event){
				if(event.keyCode==13){
					 me.login();
					 return false;
				}	 
			});
			this.genFunPlaceholder(document.getElementById("login-name"));
			this.genFunPlaceholder(document.getElementById("login-pwd"));
			this.pwdEl.keydown(function(event){
				if(event.keyCode==13){
					 me.login();
					 return false;
				}	 
			});
		//	this.pwdEl.focus();
			this.loginEl.click(function(){
				me.login();
				return false;
			});
			
		},
		disable: function(){
			$('input', this.el).attr("disabled", true);
		},
		login: function(){
			var username = this.nameEl.val(),
				password = this.pwdEl.val(),
				me = this;
			if(this.check()){
				
				var url = this.getLoginURL(),
					loginDate = (function(){
						var date = new Date(), y, M, d;
						y = date.getFullYear();
						M = date.getMonth() + 1;
						d = date.getDate();
						return y + "-" + (M<10?"0":"") +  M + "-" + (d<10?"0":"") + d;
					})();
				
				url += '?username=' + username + '&password=' + hex_md5(password) + '&language=' + this.getLocale() + '&loginDate=' + loginDate;
				if (justep.Request.URLParams["client"]!=undefined){
					url += '&client=' + justep.Request.URLParams["client"];
				}
				var result = justep.Request.sendHttpRequest(encodeURI(url));
				result = justep.Request.responseParseJSON(result);
				if(result.flag){
					this.setting.set("username", username);
					/*
					if(true){
						var url = 'portal/directLogin.w?username=' + username + '&password=' + hex_md5(password);
						if (justep.Request.URLParams["client"]!=undefined){
							url += '&client=' + justep.Request.URLParams["client"];
						}
						url += '&language=' + this.getLocale();
						return;
					}	
				  */
					var url = this.getIndexURL();
					var process = "/portal2/process/portal/portalProcess";
					url += '?language=' + this.getLocale() + '&bsessionid=' + result.bsessionid + '&activity=index'+'&process='+process;
					if (justep.Request.URLParams["client"]!=undefined){
						url += '&client=' + justep.Request.URLParams["client"];
					}
					if(_config.appName){
						url += '&appName=' + _config.appName;
					}
					
					if(this.setting.get("maximize")){
						if(false && window.IE){
//							var opened = null
//							try{					
//								opened = window.open(url,'title','width=' + (screen.availWidth) + ',height=' + (screen.availHeight)+',channelmode =yes,toolbar=0,menubar=0,resizable=1,location=no,status=no');
//								if(opened){
//									window.opener=null;
//									window.open('','_self');
//									window.close();
//								}else{
//									$.jpolite.Data.system.User.logout(function(data){});
//								}
//							}catch(ee){
//								$.jpolite.Data.system.User.logout(function(data){});
//							}
						}else{
							var opened = window.open(url,'justep','width=' + (screen.availWidth-8) + ',height=' + (screen.availHeight-56)+',channelmode =yes,toolbar=no,menubar=no,resizable=1,location=no,status=no');
							if(opened.outerHeight==0&&opened.outerWidth==0&&opened.innerHeight==0&&opened.innerWidth==0){
								//$.jpolite.Data.system.User.logout(function(data){});
							}else{
								setInterval(function(){ 
								    window.open('', '_self', ''); 
								    window.close(); 
								}, 100); 
							}
						}
						
					}else{
						window.location.href = url;
					}
				}else{
					this.pwdEl.val(''),
					this.callEvent('error', [result.message]);
				}
			}
		},
		getLoginURL: function(){
			return window.location.href.replace(/login.*\.w.*/, 'DoLogin.j');
		},
		getIndexURL: function(){
			var index = $('input[name=index]:checked').val() || 'index.w';
			return window.location.href.replace(/login.*\.w.*/, index);
		},
		check: function(){
			return this.checkName() && this.checkPwd(); 
		},
		genFunPlaceholder:function(element){
			//检测是否需要模拟placeholder
		    var placeholder = '';
		    if (element && !("placeholder" in document.createElement("input")) && (placeholder = element.getAttribute("placeholder"))) {
		        //当前文本控件是否有id, 没有则创建
		        var idLabel = element.id ;
		        if (!idLabel) {
		            idLabel = "placeholder_" + new Date().getTime();
		            element.id = idLabel;
		        }

		        //创建label元素
		        var eleLabel = document.createElement("label");
		        eleLabel.htmlFor = idLabel;
		        eleLabel.style.position = "absolute";
		        //根据文本框实际尺寸修改这里的margin值
		        eleLabel.style.margin = "2px 0 0 3px";
		        eleLabel.style.color = "graytext";
		        eleLabel.style.cursor = "text";
		        //插入创建的label元素节点
		        element.parentNode.insertBefore(eleLabel, element);
		        //事件
		        element.onfocus = function() {
		            eleLabel.innerHTML = "";
		        };
		        element.onblur = function() {
		            if (this.value === "") {
		                eleLabel.innerHTML = placeholder;  
		            }
		        };

		        //样式初始化
		        if (element.value === "") {
		            eleLabel.innerHTML = placeholder;   
		        }
		    }	
		},
		checkName: function(){
			var username = this.nameEl.val();
			if(!username || username==''){
				this.nameEl.addClass('error');
				return false;
			}	
			this.nameEl.removeClass('error');
			return true;
		},
		checkPwd: function(){
			var value = this.pwdEl.val();
			if(!value || value==''){
				this.pwdEl.addClass('error');
				return false;
			}	
			this.pwdEl.removeClass('error');
			return true;
		},
		getLocale: function(){
			var el = document.getElementById("language");
			if(!el){
				return "zh_CN";
			}
			return el.options[el.selectedIndex].value;
		},
		enableCookie: function(value){
			this.enable_cookie = value;
		}
		
	};
	
	global.Login = Login;
	justep.Portal.Login = Login;
})(window);
