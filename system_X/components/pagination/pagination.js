/**
 * @class justep.pagination 
 */
justep.Pagination = function(config){
	$.extend(this, config);
	
	this.items = this.items || '';
	this._hasFirst = this.items.indexOf('first') != -1;
	this._hasLast = this.items.indexOf('last') != -1;
	this._hasPre = this.items.indexOf('pre') != -1;
	this._hasNext = this.items.indexOf('next') != -1;
	
	this.firstLabel = (new justep.Message(justep.Message.JUSTEP231064)).getMessage(); 
	this.preLabel =  (new justep.Message(justep.Message.JUSTEP231015)).getMessage(); 
	this.nextLabel = (new justep.Message(justep.Message.JUSTEP231014)).getMessage(); 
	this.lastLabel = (new justep.Message(justep.Message.JUSTEP231065)).getMessage();
	
	this.pageCount = this.pageCount || 6;   
	
	if(this.align)
		this.el.addClass('pagination-' + this.align);
	
	if(this.dataId)
		this.data = justep.xbl(this.dataId);
	
	if(this.data){
		this.data.attachEvent(justep.XData.EVENT_REFRESHPAGEDATA_AFTER, this.refresh, this);
		this.data.attachEvent(justep.XData.EVENT_REFRESHDATA_AFTER, this.refresh, this);

		this.refresh();
	}
};

justep.Pagination.prototype = {
	refresh: function(event){
		//size 每页的行数， count 是数据中的总行数，number是页数
		var size = -1, count = 0; 
		this.number = 0;
		if(this.data.active){
			size = this.data.limit;
			count = this.data.getTotal() || 0;
			if(size == -1 && count > 0) 
				this.number = 1;
			else if(size && count > 0)
				this.number = Math.ceil(count/size);
		}
		
		var html = ['<ul>'];
		if(this._hasFirst)
			html.push('<li role="first"><a>' + this.firstLabel + '</a></li>');
		if(this._hasPre)
			html.push('<li role="pre"><a>' + this.preLabel + '</a></li>');
		
		if(this.number <= this.pageCount)
			for(var i = 0; i<this.number; i++ )
				html.push('<li role="' + (i + 1) + '"><a href="#empty" onclick="justep.xbl(\'' + this.el.attr('id') + '\').gotoPage(' + (i + 1) + ')">' + (i + 1) + '</a></li>');
		else
			html.push('<li role="input"><input></input></li>');
		
		if(this._hasNext)
			html.push('<li role="next"><a>' + this.nextLabel + '</a></li>');
		if(this._hasLast)
			html.push('<li role="last"><a>' + this.lastLabel + '</a></li>');
		
		html.push('</ul>');
		this.el.html(html.join(''));
		
		if(this.number > this.pageCount){
			var me = this;
			$('li[role=input]>input', this.el).bind('focus.pagination mouseup.pagination', function(event){
				if (event.type === 'focus') {
					$(this).val(me.index).select();
				}
				if (event.type === 'mouseup') {
					return false;
				}
			}).bind('blur.pagination keydown.pagination', function(event){
				var $self = $(this);			
				// if the user hits escape revert the input back to the original value
				if (event.keyCode === 27) {
					$self.val(me.index);
					$self.blur();
				}

				// if the user hits enter, trigger blur event but DO NOT set the page value
				if (event.keyCode === 13) {
					$self.blur();
				}

				// only set the page is the event is focusout.. aka blur
				if (event.type === 'blur') {
					me.gotoPage($self.val());
				}
			});
		}
		
		var index = 1;
		if(event && event.limit && event.offset){
			index = Math.ceil(event.offset / event.limit) + 1;
		}
		this._set(index);
	},
	//index >= 1
	_set: function(index){
		var me = this;
		this.index = index;
		if(this.number == 0){
			$('li[role=first]', this.el).addClass('disabled').unbind('click');
			$('li[role=pre]', this.el).addClass('disabled').unbind('click');
			$('li[role=next]', this.el).addClass('disabled').unbind('click');
			$('li[role=last]', this.el).addClass('disabled').unbind('click');
			$('li[role=input]>input', this.el).val('');
			return;
		}
			
		if(this.index == 1){
			$('li[role=first]', this.el).addClass('disabled').unbind('click');
			$('li[role=pre]', this.el).addClass('disabled').unbind('click');
		}else{
			$('li[role=first]', this.el).removeClass('disabled').unbind('click').bind('click', function(){me.gotoFirstPage();return false;});
			$('li[role=pre]', this.el).removeClass('disabled').unbind('click').bind('click', function(){me.gotoPrePage();return false;});
		}
			
		if(this.index == this.number){
			$('li[role=last]', this.el).addClass('disabled').unbind('click');
			$('li[role=next]', this.el).addClass('disabled').unbind('click');
		}else{
			$('li[role=last]', this.el).removeClass('disabled').unbind('click').bind('click', function(){me.gotoLastPage();return false;});
			$('li[role=next]', this.el).removeClass('disabled').unbind('click').bind('click', function(){me.gotoNextPage();return false;});
		}
		
		if(this.number <= this.pageCount){
			$('li', this.el).removeClass('active');
			$('li[role=' + this.index + ']', this.el).addClass('active');
		}else{
			$('li[role=input]>input', this.el).val(index + '/' + this.number);
		}
		
	},
	gotoPage: function(index){
		if(isNaN(index) || index < 1 || index > this.number)
			index = 1;
		this.data.loadPageData(index, false);
		this._set(index);
	},
	gotoPrePage: function(){
		this.gotoPage(this.index-1);
	},
	gotoNextPage: function(){
		this.gotoPage(this.index+1);
	},
	gotoLastPage: function(){
		this.gotoPage(this.number);
	},
	gotoFirstPage: function(){
		this.gotoPage(1);
	}
};