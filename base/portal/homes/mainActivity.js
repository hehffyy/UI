var mainActivity = {};

function tabActive(){
	mainActivity.init();
};

mainActivity.init = function(rid){
	this.removeAll();
    // 获取系统设置信息 系统名称以及导航配置
    var that = this;
	var options = {};
	var param = new justep.Request.ActionParam();
	options.process = "/SA/OPM/system/systemProcess";
	options.activity = "mainActivity";
	options.action = "getWidgetsToHomeAction";
	options.dataType = "json";
	options.callback = function(result){
		var roleData = result.response;	
		var layoutInfo = roleData["layoutInfo"];
		//console.info(roleData);
		if(!!layoutInfo){
			that.loadData(JSON.parse(layoutInfo));
			that.disableDrop();
		}else{
		   var imgUrl =justep.Request.convertURL("/UI/base/portal/homes/images/home.jpg",false);
		   $('.grid-stack').append("<img width='100%' height='100%' src=\""+imgUrl+"\"/>").css({
		   "background-color":"#f3f6fb",
		   "height": "100%",
           "overflow": "hidden"
		   });
		}
	};
	justep.Request.sendBizRequest2(options);
};
mainActivity.modifiyData = function(data){
    for(var index=0;index<data.length;index++){
        data[index].url = justep.Request.convertURL(this.openNewTab(data[index]),false);
    }
    return data;
};

mainActivity.openNewTab = function(option){
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
			return url;
	};

mainActivity.getRealityHeight = function(scale){
   var c = this.getDefault("cell_height");
   var m = this.getDefault("vertical_margin");
   var n = scale;
   return n*c +m*(n-1);
};
mainActivity.loadLayout = function(data){
    var that = this;
	var animate = true;
	if ($("#animate").val() !== "yes") {
		animate = !!0;
	}
	var vertical_margin = +$("#vertical_margin").val() || 10;
	var cell_height = +$("#cell_height").val() || 10;
	var height = +$("#rows").val() || 0;
	this.setDefault({
		renderEl : '.grid-stack',
		cell_height:cell_height,
		animate : false,
		vertical_margin : 0, // 垂直间距
		height : 0// 最大的行数。 默认值是 0 意思是没有最大的行数
	});
	return new BS.TableLayout($.extend({
		items : data,
		renderHTML:function(node){
			var _height = that.getRealityHeight(node.height)-50;
			var url = justep.Request.convertURL(that.openNewTab(node),false);
			var _html = 
				'<div id="portlet_'+node.id+'"">'
					+'<div class="grid-stack-item-content portlet">'
						+'<div class="portlet-topper">'
							+((!!node.isTitle && node.isTitle=="true")||!node.isTitle ?'<h1 class="portlet-title">'+node.title+'</h1>'
							+(!node.more?"":'<a href="javascript:;" class="more" style="display: inline-block ;padding: 5px;float:right;overflow:hidden;" data-id="'+node.id+'" title="更多">更多</a>')
							+(node.isRefresh=='true'?'<a href="javascript:;" class="refresh" style="display: inline-block ;padding: 5px;float:right;overflow:hidden;" data-id="'+node.id+'" title="刷新">刷新</a>':"")
							+'<div type="toolbar" id="portlet-topper-toolbar_'+node.id+'" class="portlet-topper-toolbar">'
							+'</div>':"")
						+'</div>'
						+'<div class="portlet-content" style="height:'+_height+'px;">'
						+'<iframe src="'+url+'" style="display: inline;height:100%;width:100%;" overflow="hidden" frameborder="0"></iframe>'
						+'</div>'
					+'</div>'
				+'</div>';
				var $el = $(_html);
				$(".more",$el).click(function(){
				    var _url =  justep.Request.convertURL(that.openNewTab(node.more),false);
				    var uiserverName = window.location.pathname.split('/')[1];
				    if(_url.indexOf(uiserverName) >-1){
				         _url = _url.substring(3);
				    };
				    justep.Portal.openWindow(node.title, _url, false, null,justep.Context.getCurrentPersonID());
				});
				
				$(".refresh",$el).click(function(){
					$(this.parentNode.parentNode).find("iframe").get(0).contentWindow.location.reload(true);
				});
				
				return $el;
		}
	},this.getDefault()));
};
mainActivity.loadData = function(data){
   this.TableLayout.loadData(data);
}; 
mainActivity.disableDrop = function(){
   this.TableLayout.disableDrop();
}; 
mainActivity.getDefault = function(item){
   if(!item) return this._defaultConfig;
   return this._defaultConfig[item];
};
mainActivity.setDefault = function(options){
   this._defaultConfig = options;
};
mainActivity.removeAll = function(){
   this.TableLayout.removeAll();
};  
mainActivity.model1Load = function(event){
    this.TableLayout = this.loadLayout();
    this.disableDrop();
    this.init();
};
