var BS = BS || {};
/**
 * 响应式布局组件
 *
 *      @example
 *      var layout = new BS.TableLayout({
 *          renderEl : '.grid-stack',
 *          animate : false,
 *          cell_height:60,//一个单元格的高度(默认值: 60)
 *		    vertical_margin : 10, // 垂直间距
 *		    height : 0,// 最大的行数。 默认值是 0 意思是没有最大的行数
 *          items : [
 *              {id:"xxx11",title:"待办事项",x: 0, y: 0, width: 3, height: 2,url:"a.html"},,
 *              {id:"xxx11",title:"待办事项",x: 0, y: 0, width: 3, height: 2,url:"a.html"},,
 *              {id:"xxx11",title:"待办事项",x: 0, y: 0, wid6th: 3, height: 2,url:"a.html"},
 *          ]
 *      });
 *
 * @class BS.TableLayout
 */
(function(exports) {
	var _defaultConfig = {
		renderEl : '.grid-stack',
		animate : false,
		cell_height:10,
		vertical_margin : 0, // 垂直间距
		height : 0,// 最大的行数。 默认值是 0 意思是没有最大的行数
		disable:true,
		items: [],
		dropEvent:null,
		resizeEvent:null
	};
	function TableLayout() {
		var args = Array.prototype.slice.call(arguments);
		this._init(args[0] || {});
	};
	TableLayout.prototype = {
		_defaultConfig : function(options) {
			return $.extend(_defaultConfig, options);
		},
		_scaleHeight: function(n){
			var vm = this._options.vertical_margin;
			var ch = this._options.cell_height;
			return n*ch +vm*(n-1);
		},
		getHTML:function(node){
			var _height = this._scaleHeight(node.height);
			var _html = 
				'<div id="portlet_'+node.id+'">'
				+'<div class="grid-stack-item-content">'
					+'<section class="portlet">'
						+'<header class="portlet-topper">'
							+'<h1 class="portlet-title">'
								+'<span class="portlet-title-text">'+node.title+'</span>'
							+'</h1>'
							+'<menu type="toolbar" id="portlet-topper-toolbar_'+node.id+'" class="portlet-topper-toolbar">'
							+'<a href="javascript:;" class="close" data-id="'+node.id+'" title="移除">X</a>'
							+'</menu>'
						+'</header>'
						+'<div class="portlet-content">'
						+'<ul class="info">'
						+'<li>宽：占<span class="item-width">'+node.width+"</span>列（总12列）</li>"
						+'<li>高：<span class="item-height">'+_height+"</span></li>"
						+'<li>横向位置：<span class="item-x">'+node.x+"</span></li>"
						+'<li>纵向位置：<span class="item-y">'+node.y+"</span></li>"
						+'<li>地址：<span class="item-url">'+node.url+"</span></li>"
						+'</ul>'
						+'</div>'
					+'</section>'
					+'</div>'
				+'</div>';
			var $el = $(_html);
			return $el;
		},
		getWidgetContent:function(node){
			var that = this;
			var $el = null;
			!!this.renderHTML ? $el = this.renderHTML(node):$el = this.getHTML(node);
			$el.data("OPTION",node);
			$(".close",$el).click(function(){
				if(!!that.closeEvent){
					that.closeEvent($el,node.id);
				}else{
					that.remove($el);
				}
			});
			//预留给新加设置的位置；
			return $el;
		},
		_init : function(options) {
			var o = this._options =  this._defaultConfig(options);
			this.$element = $(o.renderEl);
			this.$element.gridstack(o);
			this.$gridstack = this.$element.data('gridstack');
			// 事件声明
			this.dropEvent = o.dropEvent;
			this.resizeEvent = o.resizeEvent;
			this.closeEvent = o.closeEvent;
			this.renderHTML = o.renderHTML;
			
			this.removeAll();
			if(o.items.length>0) this.loadData(o.items);
			if(!o.disable){
				this.disableDrop();
				return;
			}
			this.btnsEvents();
		},
		loadData:function(data){
			var that = this;
			var $grid = this.$gridstack;
			$.each(data, function (i,node) {
				that.addWidget(node);
			});
		},
		addWidget:function(node){
			var $el = this.getWidgetContent(node);
			this.$gridstack.add_widget($el, node.x, node.y, node.width, node.height);
		},
		removeAll:function(){
			this.$gridstack.remove_all();
		},
		getWidgets:function(){
			var res = $.map(this.$element.find(".grid-stack-item:visible"), function (el) {
				el = $(el);
				var node = el.data('_gridstack_node');
				var option = el.data('OPTION');
				//console.info(option);
				return $.extend({},option,{
						x: node.x,
						y: node.y,
						width: node.width,
						height: node.height
					}
				);
			});
		    return JSON.stringify(res);
		},
		dragstop:function(event, ui){
			// 拖拽完成之后
			var element = event.target;
			var node = $(element).data('_gridstack_node');
			var option = $(element).data('OPTION');
			if(!!this.dropEvent){
				this.dropEvent(node,option)
			}else{
				this._updateWatchPanel(node, option);
			}
		},
		resizestop:function(event, ui){
			// 伸缩完成之后
			var element = event.target;
			var node = $(element).data('_gridstack_node');
			var option = $(element).data('OPTION');
			if(!!this.resizeEvent){
				this.resizeEvent(node,option);
			}else{
				this._updateWatchPanel(node, option);
			}
		},
		_updateWatchPanel:function(node,option){
			var $el = $("#portlet_"+option.id).find(".portlet-content");
			if(!$(".info",$el).size()) return;
			$(".item-x",$el).text(node.x);
			$(".item-y",$el).text(node.y);
			$(".item-width",$el).text(node.width);
		    $(".item-height",$el).text(this._scaleHeight(node.height));
		},
		remove:function(el){
			this.$gridstack.remove_widget(el,true);
		},
		disableDrop:function(){
			//禁止拖拽
		    this.$gridstack.movable('.grid-stack-item', false);
			this.$gridstack.resizable('.grid-stack-item', false);
		},
		btnsEvents:function(){
			this.$element.on('dragstop',$.proxy(this.dragstop,this));
			this.$element.on('resizestop',$.proxy(this.resizestop,this));
		},
		getGridObject:function(){
			return this.$gridstack;
		}
	};
	BS.TableLayout = TableLayout;
}(window));