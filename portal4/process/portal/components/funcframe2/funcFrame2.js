(function(global){
	
	var FuncFrame2 = function(options){
		$.extend(this, options);
		this.init();	
	};
	
	FuncFrame2.prototype.init = function(){
		var me = this;
		this.cache = {};
		this.el = $('#' + this.id);
		this.el.addClass('funcFrame');
	};
	
	//option需要
	FuncFrame2.prototype.open = function(option){
		var opened = this.cache[option.id];
		if(!opened){
			//temp
			if(option.opener){
				option.opener = this.getCacheByWindow(option.opener);
			}
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
			
			option.frame = $('<iframe frameBorder=0></iframe>');
			this.cache[option.id] = option;
			this.el.append(option.frame);
			option.frame.src(url, function(iframe, duration){
				if(option.onload) option.onload.apply(this);
			});
		}
		this._active(option);
	};

	FuncFrame2.prototype.refresh = function(option){
		var opened = this.cache[option.oldId];
		if(opened){
			delete this.cache[option.oldId];
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
			option.frame = opened.frame;
			this.cache[option.id] = option;
			option.frame.src(url, function(iframe, duration){
				if(option.onload) option.onload.apply(this);
			});
		}
		this._active(option);
	};
	
	FuncFrame2.prototype.getIFrame = function(url){
		if(this.cache[url])
			return this.cache[url].frame.get(0);
	};
	
	FuncFrame2.prototype.getCacheByWindow = function(win){
		for(var k in this.cache){
			if(this.cache.hasOwnProperty(k)){
				if(this.cache[k].frame.get(0).contentWindow == win)
					return this.cache[k]; 
			}
		}
		return null;
	};
	
	FuncFrame2.prototype.close = function(id){
		if(id){
			if(typeof id == 'object')
				id = id.id;
		}else{
			id = this.activeId;
		}
		var isCurrent = id == this.activeId;
		var	opened = this.cache[id];
		if(!opened) return;
		opened.frame.onload = null;
		opened.frame.hide();
		opened.frame.src('about:blank', function(){
			opened.frame.remove();
		});
		delete this.cache[id];
		isCurrent && (this.activeId = null);
		if(this.onclose){
			opened.isCurrent = isCurrent; 
			this.onclose(opened);
		}
	};
	
	//private
	FuncFrame2.prototype._active = function(option){
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
	
	
	global.FuncFrame2 = FuncFrame2; 
	justep.Portal.FuncFrame2 = FuncFrame2;
})(window);
