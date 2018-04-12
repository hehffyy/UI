(function(global){
	
	var FuncFrame3 = function(options){
		$.extend(this, options);
		this.init();	
	};
	
	FuncFrame3.prototype.init = function(){
		var me = this;
		this.el = $('#' + this.id);
		this.el.addClass('funcFrame');
		this.title = $('.func-title', this.el);
		this.frame = $('iframe', this.el);
		$(window).resize(function(){
			me.resize();
		});
		this.resize();
		this.menu = new AccordionMenuTree({
			el: $('.left', this.el),
			onclick: function(data){
				me.open(data);
			}
		});
	};
	
	FuncFrame3.prototype.resize = function(){
		var hh = this.title.outerHeight() || 20;
		this.frame.height(this.el.height() - hh - 3);/*fixed iframe bug*/
		console.log(this.el.height());
		console.log(this.frame.height());
	};
	
	FuncFrame3.prototype.reload = function(option){
		if(option.id){
			var parent = justep.Portal.controllers.funcManager.getItem(option.id);;
			if(parent){
				option = parent;
				while(parent.parent){
					parent = parent.parent;
				}
				this.menu.load(parent);
				this.menu.open(option);
			}else{
				this.menu.cancelOpenedFunc();
				this.open(option);
			}
		}else{
			this.menu.load(option);
		}
	};
	
	//option需要
	FuncFrame3.prototype.open = function(option){
		var uiserverName = window.location.pathname.split('/')[1];
		var url = option.url;
		if(/^http.*/.test(url)){
			if(option.params){
				if(url.indexOf('?') != -1)
					url += '&';
				else
					url += '?';
				url += option.params;
			}
			
		}else{
			if(url.indexOf('?') != -1)
				url += '&$log=1';
			else
				url += '?$log=1';
				
			url = '/' + uiserverName + url + '&bsessionid=' + this.bsessionid;
			if(option.process)
				url += '&process=' + option.process;
			if(option.activity)
				url += '&activity=' + option.activity;
			if(option.executor)
				url += '&executor=' + option.executor;
			
			url += '&language=' + justep.Portal.language;
			
			if(option.params)
				url += option.params;
		}
		this.title.html(option.label);
		this.frame.src(url, function(iframe, duration){
			if(option.onload) option.onload.apply(this);
		});
	};
	
	FuncFrame3.prototype.getIFrame = function(url){
		if(this.cache[url])
			return this.cache[url].frame.get(0);
	};
	
	FuncFrame3.prototype.getCacheByWindow = function(win){
		for(var k in this.cache){
			if(this.cache.hasOwnProperty(k)){
				if(this.cache[k].frame.get(0).contentWindow == win)
					return this.cache[k]; 
			}
		}
		return null;
	};
	
	FuncFrame3.prototype.close = function(id){
		id = id || this.activeId;
		if(typeof id == 'object')
			id = id.id;
		var	opened = this.cache[id];
		if(!opened) return;
		opened.frame.onload = null;
		opened.frame.hide();
		opened.frame.src('about:blank', function(){
			opened.frame.remove();
		});
		delete this.cache[id];
		this.activeId = null;
		if(this.onclose){
			this.onclose(opened);
		}
	};
	
	//private
	FuncFrame3.prototype._active = function(option){
		for(var k in this.cache){
			if(this.cache.hasOwnProperty(k)){
				this.cache[k].frame.hide();
			}
		}
		this.activeId = option.id;
		$('.title', this.headEl).html(option.label);
		var opened = this.cache[option.id];
		opened.frame.show();
		//兼容
		if (opened.frame.get(0).contentWindow.tabActive)
			opened.frame.get(0).contentWindow.tabActive();
		
	}
	
	
	global.FuncFrame3 = FuncFrame3; 
	justep.Portal.FuncFrame3 = FuncFrame3;
})(window);
