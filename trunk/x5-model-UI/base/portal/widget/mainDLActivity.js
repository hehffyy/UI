var mainDLActivity = {};
mainDLActivity.model1Load = function(event){
};
mainDLActivity._defaultConfig = {
    bindTemplate:"<li title='{1}'><a href='javascript:;'><input id='{0}' type='checkbox' name='widget' value='{1}' /><label for='{0}'>{1}</label></a></li>",
    bindShowTemplate:"<li data-id='{0}' title='{1}'><a href='javascript:;'><label>{1}</label></a></li>",
    applyTo:function(dom){
       $("#widgetContainer").append(dom);
    },
    allWidgets:[]
};

mainDLActivity.getWidgetInfo = function(wid){
   var data = this._defaultConfig.allWidgets;
   for(var index = 0;index<data.length;index++){
      if(data[index].id == wid) return data[index];
   }
}
mainDLActivity._readerDom = function(data){
   var _self = this;
   var h_ARR = [];
   if(typeof data == "string"){
     !!data && (data = JSON.parse(data));
   }
   $.each(data,function(index,node){
     // var $el = $(justep.String.format(_self._defaultConfig.bindTemplate,node.id,node.title));
    //  _self._defaultConfig.applyTo($el);
      h_ARR.push(justep.String.format(_self._defaultConfig.bindTemplate,node.id,node.title));
      _self._defaultConfig.allWidgets.push(node);
   });
   _self._defaultConfig.applyTo(h_ARR.join(""));
};
mainDLActivity.emptyEL = function(){
   $("#widgetContainer").empty();
   $("#selectedWidget").empty();
   $(".w-count").text("0");
}
mainDLActivity.addPanelWidget = function(node){
   $("#selectedWidget").append(justep.String.format(this._defaultConfig.bindShowTemplate,node.id,node.title));
   $(".w-count").text($("#selectedWidget li").size());
};
mainDLActivity.removePanelWidget = function(node){
   $("#selectedWidget").find("li[data-id='"+node.id+"']").remove();
   $(".w-count").text($("#selectedWidget li").size());
};
mainDLActivity.windowReceiver1Receive = function(event){
        var self = this;
        this.emptyEL();
        if(!event.data) return;
        if(event.data.widgets){
            var widgets = event.data.widgets;
			this._readerDom(widgets);	
			$("input[name='widget']").bind("change",function() {
				this.blur();
		        this.focus();
		        var title = $(this).val();
		        var id = $(this).attr("id");
		        if(this.checked){
		           self.addPanelWidget({id:id,title:title});
		        }else{
		           self.removePanelWidget({id:id,title:title});
		        }
	       });
        }
    	if(event.data.value){
    	   var data = JSON.parse(event.data.value);
    	   $.each(data,function(index,node){
    	     $("#"+node.id).attr("checked",true);
    	     self.addPanelWidget(node);
    	   });
    	}
};

mainDLActivity.d_closeClick = function(event){
   justep.xbl("windowReceiver1").windowCancel();	
};

mainDLActivity.d_saveClick = function(event){
   var self = this;
   var data = [];
   var sendData = "";
   var $list = $("#selectedWidget").find("li");
   $list.each(function(index,$el){
     var node = self.getWidgetInfo($(this).attr("data-id"));
     !!node && data.push(node);
   });
  if(!!data.length){
      sendData = JSON.stringify(data);
  };
  justep.xbl("windowReceiver1").windowEnsure({widgets:sendData});	
};
