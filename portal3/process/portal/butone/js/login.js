$(document).ready(function(){
	function getURLParameter(name) {
	    return decodeURI(
	        (RegExp(name + '=' + '(.+?)(&|$)').exec(location.search)||[,null])[1]
	    );
	}
	var portalType = getURLParameter('type');
	switch(portalType){
		case '1':
		case '2':
			$("#portal-type").hide();
			$('#type' + portalType).attr('checked', true);
			break;
	}
	var setting = (function(){
		var Setting = function(options){
			$.extend(this, options);
			eventable(this);
			this.el = $("#" + this.id);
			this.data = JSON.parse($.cookie("justep-login") || "{}") || {};
			var me = this;
			
			//保存用户名
			this.remEl = $("*[name=remember]", this.el).click(function(){
				me.set("remember", this.checked);
			});
			this.remEl.get(0).checked = !!this.data["remember"];

			//保存门户类型
			this.classEl = $("*[name=class]", this.el).click(function(){
				me.set("class", this.checked);
			});
			//this.classEl.get(0).checked = !!this.data["class"];

			//是否最大化
			this.maxEl = $("*[name=maximize]", this.el).click(function(){
				me.set("maximize", this.checked);
			});
			//this.maxEl.get(0).checked = !!this.data["maximize"];
		};
		Setting.prototype = {
			set: function(name, value){
				if(this.data[name] != value){
					this.data[name] = value;
					this.callEvent('changed', [name, value]);
					this.save();
				}
			},
			get: function(name){
				return this.data[name];
			},
			save: function(){
				$.cookie("justep-login", JSON.stringify(this.data), {expires:7,path:'/'});
			}
		}
		return new Setting({id: 'setting'});
	})();
	
	var loginer = new Login({id: 'login-form', setting: setting});
	loginer.attachEvent('error', function(message){
		if(parent.top.justepApp){
			alert(msg);
		    var eData = [];
		    eData.push("event=loginConfig");
		    eData.push("time="+new Date().getTime());
		    window.justepApp.eventHandle(eData.join("&"));
		}else{
			$('.message').html(message).addClass('error');
		}
		
	});

	setting.attachEvent('changed', function(name, value){
		if(name == "remember"){
			loginer.enableCookie(value);
		};
	});
	//判断license是否有效
	if(!_config.license.success){
		loginer.disable();
		$('.message').html(_config.license.msg);
	}else{
		var expires = _config.license.expires;
		if(expires && expires!=""){
			var value = parseInt(expires);
			if (!(isNaN(value) || value==-1)){
				var msg = "";
				if (value > 0 && value <= 15){
					$('.message').html("平台还有" + value + "天到期，请联系系统管理员");
				}else if(value == -100){
					$('.message').html("平台使用期限到期，请与管理员联系");
					loginer.disable();	
				}
			}
		}
	}
});

//重要:
justep.Context._init = function(){};

