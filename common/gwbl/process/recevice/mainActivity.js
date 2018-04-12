var mainActivity = {};
!function(exports,$){
    function ReceiveDoc(options){
        $.extend(this, options);
        this.myBoxAdress = $('#' + this.mid);
        this.receiveTypeBox = $('#' + this.rid);
        this.cache = [];
		this.init();
    };
    
    ReceiveDoc.prototype.init = function() {
		this.initMyBoxAdress();
		this.initReceiveType();
		this.addLisnter();
		//如果子的宽度小于父的宽度，以父宽度为准
		$(".isDir",".boxBody").each(function(){
			if($(this).width()>$(this).find("ul").width())
				$(this).find("ul").width($(this).width());
		});
    };
    
    ReceiveDoc.prototype.initMyBoxAdress = function(){
       var _self = this;
	   var _B_Data = justep.xbl("B_CommonlyUsed");
	   _B_Data.filters.setFilter("_b", "B_CommonlyUsed.fUserId='"+justep.Context.getCurrentPersonID()+"'");
	   _B_Data.refreshData({onSuccess:function(){
	        var data = _B_Data.getJson().rows;
	       _self._loadMyBoxAdress(_B_Data.getJson().rows);
	   }});
    };
    
    ReceiveDoc.prototype._loadMyBoxAdress = function(data){
       var _tp = '<li><a class="js-children" title="#{fName}" data-code="#{userdata}" data-url="#{fURL}" data-process="#{fProcess}" data-activity="#{fActivity}">#{fName}</a><a class="ui-close" title="点击移除" style="display: none;"><span class="ui-icon-close"></span></a></li>';
	   function _fnTemplate(template, json){
			//格式化指定键值的模板
			return template.replace(/\#\{(.*?)\}/g,function(all,key){
			       if(key == "userdata"){
			           return json[key].id.value;
			       }
			    return json && (key in json) ? json[key].value : "";
            });
		}
		
	   var $ul = $("<ul></ul>");
	   
	   var _dataArr = [];
	   for(var key in data){
	       var _key = key;
	       var _data = data[key];
	      _dataArr.push(_fnTemplate(_tp,_data));
	   };
	  $(".boxBody",this.myBoxAdress).empty()
	  .prepend($ul.append(_dataArr.join("")))
	  .append("<div style='clear:both'></div>");
   
    };
    
    ReceiveDoc.prototype.getRecord= function(data,fn) {
        // one record
	       for(var key in _subData){
	          if(key == "name"){
	             var value = _subData[key].value;
	          }
	          if(key == "prcess"){
	             var value = _subData[key].value;
	          }
	          if(key == "activity"){
	             var value = _subData[key].value;
	          }
	          if(key == "ismodel"){
	             var value = _subData[key].value;
	          }
	          fn(key);
	       }
	       // 模版，加入到记录
	       
    };
    ReceiveDoc.prototype._fnTemplate = function(template, json){
			//格式化指定键值的模板
			return template.replace(/\#\{(.*?)\}/g,function(all,key){
            	return json && (key in json) ? json[key] : "";
            });
	};
	
	ReceiveDoc.prototype.truncate = function(target, length, truncation){
		length = length || 30;
		truncation = truncation === void(0) ?"..." : truncation;
		return target.length > length ?
			   target.slice(0, length - truncation.length) + truncation : String(target);
	};
	
	ReceiveDoc.prototype.loadReceiveTypeBox = function(data){
	   var $table = $("<table class='tableGrid'></table>");
	   var trTempalte = '<tr><td class="titleType_TD"><div class="titleType">#{name}</div></td><td>#{_value}</td></tr>';
	   var _dataArr = [];
	   for(var key in data){
	       var _data = data[key];
	      _data.childNodes && (_data._value = this.getChildNodesUL(_data.childNodes));
	      _dataArr.push(this._fnTemplate(trTempalte,_data));
	   };
	  $(".boxBody",this.receiveTypeBox).prepend($table.append(_dataArr.join("")));
	  $(".tableGrid>tbody>tr:even").addClass("ui-tb-even");
	  $(".tableGrid>tbody>tr:nth-child(even)").addClass("ui-tb-nth");
    };
    
    ReceiveDoc.prototype.initReceiveType = function(){
        var self = this;		
		var map = new justep.Request.MapParam();
		var param = new justep.Request.ActionParam();
		//param.setMap("map" , map);
		
		justep.Request.sendBizRequest2({
			dataType : "json",
			parameters : param,
			action : 'shoujianAction',
			callback : function(result) {
				if (result.state) { 
					//返回Map对象
					var map = result.response;
					self.loadReceiveTypeBox(map.jsonObject);
				} 
			}
		});
    };
    
     ReceiveDoc.prototype.getChildNodesUL = function(data){
    	 var liTempalte =
         '<div><li class="isDir">'+
             '<div><span class="js-children" title="${name}" data-url="${url}" data-process="${process}" data-activity="${activity}">${name}</span><a class="ui-favorites ui-favorites-default" title="点击添加收藏" style="display: block;"><span class="ui-icon-favorites"></span></a></div>'+
    	 '</li></div>';
         var _dataArr = [];
         
         for(var key in data){
           if(data[key].childNodes.length){
              _dataArr.push(this.getNodesJoin(data[key]));
	       }else{
	           $.template('template', liTempalte);
	          _dataArr.push( $.tmpl('template', data[key])[0].innerHTML);
	       }
	    };
	    return "<ul>"+_dataArr.join("")+"</ul>";
     };
     
     
     ReceiveDoc.prototype.getNodesJoin = function(data){
         var outTmp = '<li class="isDir">'+
                 '<div><span>#{name}</span><i class="icon_dir"></i></div>'+
                 '#{content}'+
        	 '</li>';
         var innerTmp =
        	     '<li><a class="js-children" title="#{title}" data-url="#{url}" data-process="#{process}" data-activity="#{activity}">#{title}</a><a class="ui-favorites ui-favorites-default" title="点击添加收藏" style="display: block;"><span class="ui-icon-favorites"></span></a></li>'
         var _iData = data.childNodes;
         var _innerArr = [];
         //计算最大字符数量，计算UL宽度
         var maxCharCount=0;
         for(var _iKey in _iData){
        	 var curCharCount = _iData[_iKey].name.length;
        	 if(curCharCount>maxCharCount)
        		 maxCharCount = curCharCount;
              _iData[_iKey].title = _iData[_iKey].name;
              _iData[_iKey].name = this.truncate(_iData[_iKey].name,8);
             _innerArr.push(this._fnTemplate(innerTmp,_iData[_iKey]));
         }
               
         data.content =  "<ul style='width:[maxWidth]px'>"+_innerArr.join("")+"</ul>";
         data.content = data.content.replace("[maxWidth]",maxCharCount*20+10);
         return this._fnTemplate(outTmp,data);
    };
    
    ReceiveDoc.prototype.addLisnter= function() {
        var that = this;
        $("li",this.myBoxAdress).mouseover(function(){
				$(this).find("a.ui-close").show();
		}).mouseleave(function(){
				$(this).find("a.ui-close").hide();
		});
        $(".boxBody .isDir").mouseover(function(){
				$(this).find("ul").show();
		}).mouseleave(function(){
				$(this).find("ul").hide();
		});
		
		$("a.ui-close",this.myBoxAdress).unbind( "click" ).click(function(){
		       var _B_Data = justep.xbl("B_CommonlyUsed");
		       var _sibObj = $(this).siblings(".js-children");
		       _B_Data.deleteData(_sibObj.attr("data-code"));
		       _B_Data.saveData({onSuccess:function(){
		           that.initMyBoxAdress();
		           that.addLisnter();
	           }});
		});
		
		$(".js-children",this.myBoxAdress).unbind( "click" ).click(function(){
		       var _url =  ""+$(this).attr("data-url")
		       + "?&process=" + $(this).attr("data-process") 
		       + "&activity="  + $(this).attr("data-activity");
			  justep.Portal.openWindow($(this).text(), _url, false, null);
		});
		
		$(".js-children",this.receiveTypeBox).unbind( "click" ).click(function(){
		       var _url = $(this).attr("data-url")
		       + "?&process=" + $(this).attr("data-process") 
		       + "&activity="  + $(this).attr("data-activity");
			  justep.Portal.openWindow($(this).text(), _url, false, null);
		});
		// 添加收藏事件
		$("a.ui-favorites",this.receiveTypeBox).unbind( "click" ).click(function(){
		       var _B_Data = justep.xbl("B_CommonlyUsed");
		       var _sibObj = $(this).siblings(".js-children");
		       _B_Data.newData();
		       _B_Data.setValue("fProcess", _sibObj.attr("data-process"));
		       _B_Data.setValue("fActivity", _sibObj.attr("data-activity"));
		       _B_Data.setValue("fURL", _sibObj.attr("data-url"));
		       _B_Data.setValue("fName", _sibObj.attr("title"));
		       _B_Data.saveData({onSuccess:function(){
		          that.initMyBoxAdress();
		          that.addLisnter();
	           }});
		});
		
    };
    
    exports.ReceiveDoc= ReceiveDoc;
    
    exports.truncate = function(target, length, truncation){
		length = length || 30;
		truncation = truncation === void(0) ?"..." : truncation;
		return target.length > length ?
			   target.slice(0, length - truncation.length) + truncation : String(target);
	};
}(window,jQuery);

mainActivity.model1Load = function(event){
  new ReceiveDoc({mid:"boxAdress",rid:"receiveTypeBox"});	
};

/**
	name:bizData#onSaveError
	description: <b>[回调型事件]</b>保存数据失败
	@param {object} event 
	<br/><b>结构如下：</b>
	<xmp> 
	{
		"source" : 组件的js对象,
		"errorType" : 'server',
		"errorNode" : 错误信息,
		"httpError" : http请求失败(true/false),
		"httpState" : http请求返回码
	}
	</xmp>	
*/
mainActivity.B_CommonlyUsedSaveError = function(event) {
	var _B_Data = justep.xbl("B_CommonlyUsed");
	_B_Data.refreshConfirm = false;
	_B_Data.filters.setFilter("_c", "B_CommonlyUsed.fUserId='"
			+ justep.Context.getCurrentPersonID() + "'");
	_B_Data.refreshData();
	var errornode = event.errorNode.stack;
	if (errornode.indexOf("违反唯一约束条件"))
		mainActivity.showMessage("此业务已经添加，不能重复添加！");
	else
		mainActivity.showMessage("请联系管理员！");
};

/** 信息提示框   
    显示的图标{('info','error','question','right')，或者自定义的img url}
	按钮 {0(默认):确定；1：确定，取消；2：是，否；3:是,否,取消}
*/
mainActivity.showMessage = function(msg,type,img,callback){
	new justep.System.showMessage().open({
		msg : msg,
		title : '系统提示',
		type : type,// 0(默认):确定；1：确定，取消；2：是，否；3:是,否,取消
		img : img,//显示的图标('info','error','question','right')，或者自定义的img url,
		height : 100,
		width : 350,
		callback : callback
	});
};
