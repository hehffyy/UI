(function(globel){
	var FuncTreeMenu = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};
	
	//private
	FuncTreeMenu.prototype.init = function(){
		this.data = this.funcMng.getFuncTree();
		function walkData(data, level, path, cb){
			for(var i=0; i<data.length; i++){
				var item = data[i];
				cb(item, level, path);
				item.childNodes && walkData(item.childNodes, level+1, path + '/' + item.label, cb);
			}
		}
		var me = this;
		this.el.addClass('functreemenu');
		
		//create root column
		this.el.empty();
//		this.el.append($("<a class='close' href='#close'>close</a>").click(function(){
//			$('#fun-map-close-btn').click();
//		}));
		this.el.append('<a class="prev icon icon-system-left-open" href="#"></a>');
		this.el.append('<a class="next icon icon-system-right-open" href="#"></a>');
		this.el.append('<div class="wrap"></div>');
		
		this.rootColumn = this.createColumn(this.data);
		this.rootColumn.addClass('sf-menu');
		$('.wrap', this.el).append(this.rootColumn);

		var cfd = this.rootColumn.carouFredSel({
			circular: false,
			auto: false,
			width: '100%',
			align: 'left',
			padding: [0, 5, 0, 0],
			prev: $('.prev', this.el),
			next: $('.next', this.el)
		});
		$('>li >ul', this.rootColumn).addClass('down');
		$('>li', this.rootColumn).mouseover(function(){
			me.rootColumn.addClass('open');
			$('>ul', this).css({
				top: $(this).offset().top - $('body').scrollTop() + $(this).height(), 
				left: $(this).offset().left - $('body').scrollLeft()
			}).show();
		}).mouseout(function(){
			$('>ul', this).hide();
		});
		
		$('li ul', this.rootColumn).mouseover(function(){
			var p = $(this).parent();
			if(($(window).width() - (p.offset().left + p.width())) < 150){
				$(this).addClass('right');
			}
		});
	};
	
	//private
	FuncTreeMenu.prototype.createColumn = function(data, level){
		var html = [];
		var print = function(data, isboot){
			html.push('<ul>');
			for(var i in data){
				var item = data[i];
				if(item.url == undefined){
					html.push('<li><a href="#">');
					html.push(item.label);
					if(isboot)
						html.push('<i class="icon icon-system-angle-down"></i>');
					else
						html.push('<i class="icon icon-system-angle-right"></i>');
					html.push('</a>');
					if(item.childNodes && item.childNodes.length > 0)
						print(item.childNodes);
					html.push('</li>');
				}else {
					html.push('<li funcId="', item.id, '"><a href="#">');
					html.push(item.label);
					html.push('</a></li>');
				}	
			}
			html.push('</ul>');
		};
		
		print(data, true);
		
		var rst = $(html.join('')), me = this;
		$('li', rst).click(function(){
			var id = $(this).attr('funcId');
			if(id){
				me.rootColumn.removeClass('open');
				$('>li >ul', me.rootColumn).hide();
				me.funcMng.runFunc(id);
			}	
		});
		return rst;
	};
	
	globel.FuncTreeMenu = FuncTreeMenu; 
	justep.Portal.FuncTreeMenu = FuncTreeMenu;
})(window);
