var mainActivity = {};
mainActivity.defaultConfig = {
   cacheWidgets:null,
   columnLayout:2,// 初始化列布局模式
   cellHeight:240,// 默认widget高度
   showTitle:true,// 默认标题显示/隐藏
   showRefresh:false
};

function getPTemplate(name){
	return "<li>人员列表中【<span class='warn'>"+name+"</span>】已分配模版，请检查配置！</li>";
}
function getHasTemplate(name,value){
	return "<li>【<span class='warn'>"+name+"</span>】==>检测结果："+value+"</li>";
}

mainActivity.wdSelectOrgsReceive = function(event){
	if (event.data.getRowsNum == 0)
		return;

	var dWidget = justep.xbl("dWidget");
	var tID = dWidget.getCurrentRowId();
	var params = new justep.Request.ActionParam();
	params.setString("fMBID", tID);
	params.setString("orgInfo", JSON.stringify(event.data));
	justep.Request.sendBizRequest2({
		action: "addWidgetRelationAction",
		dataType: "json", 
		parameters: params, 
		callback: function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
			    // console.info(callbackData.response.result);
			      var msg = "";
			      var _res = callbackData.response.result;
			      var rLength = _res.length;
			      $(".inspectContent").empty();
			      $(".inspectTitle").text("");
			      if(!!rLength){
			           var $el = $("<ul>");
				       $.each(_res,function(index,node){
				         $el.append(getPTemplate(node["sName"]));
				      });
				      $(".inspectContent").append($el);
				      msg = "发现重复分配，请检查！";
			      }
			      justep.xbl("reaOrg").refreshData();
			      layer.msg('分配人员成功！'+msg, {icon: 1,time: 2000});
			} 
		}
	});
};



/**
*发送数据
**/
mainActivity.wdSelectInfoSend = function(event){
   var bdata = justep.xbl("dWidget");
   return {
     value:bdata.getValue("fMBNR", bdata.getCurrentID()),
     widgets:mainActivity.defaultConfig.cacheWidgets
   };	
};

/**
*保存数据
**/
mainActivity.wdSelectInfoReceive = function(event){
	//console.info(event.data.widgets);
	var value = event.data.widgets;
	var bdata = justep.xbl("dWidget");
	bdata.setValue("fMBNR", value, bdata.getCurrentID());
	bdata.saveData();
	bdata.refreshData();
};
mainActivity._getWidgetInfo = function(){
    var _self = this;
	var params = new justep.Request.ActionParam();
	    params.setString("portal",justep.Request.URLParams['portal'] );
	justep.Request.sendBizRequest2({
		action: "getWidgetListAction", 
		dataType: "json",
		parameters: params, 
		callback: function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				var data = callbackData.response;
				if(!data) return;
				_self.defaultConfig.cacheWidgets = data.widgets;
			} 
		}
	});
};

mainActivity.model1Load = function(event){
    this.dWidgetIndexChanged();
    this._getWidgetInfo();
    $('#splitter_sp .xui-splitter-btn').prepend('<span class="setorg">设置人员</span>');
    this.TableLayout = this.loadLayout();
};

mainActivity.grid1_fMBNRRender = function(event){
   var _arr = [];
   var data = event.value;
   if(!event.value){
      return "<span class='warn'>无数据</span>";
   }
   var _data = JSON.parse(data);
   if(!_data.length){return "<span class='warn'>无数据</span>";}
   $.each(_data,function(index,node){
      !!node && _arr.push(node.title);
   });
   return _arr.join("，");	
};
// 清空内容
mainActivity.retNRBtnClick = function(event){
	layer.confirm('你确定要清空内容信息吗？', {
	  icon: 3,
	  btn: ['确定','取消'] //按钮
	}, function(){
		var dWidget = justep.xbl("dWidget");
		dWidget.setValue("fMBNR", "", dWidget.getCurrentID());
		dWidget.saveData();
		dWidget.refreshData();
	  layer.msg('清除成功！', {icon: 1});
	}, function(){});
};
// 清空布局
mainActivity.retLayoutBtnClick = function(event){
	layer.confirm('你确定要清空布局信息吗？', {
	  icon: 3,
	  btn: ['确定','取消'] //按钮
	}, function(){
		var dWidget = justep.xbl("dWidget");
		dWidget.setValue("fMBBJXX", "", dWidget.getCurrentID());
		dWidget.saveData();
		dWidget.refreshData();
	  layer.msg('清除成功！', {icon: 1});
	}, function(){});
};
// 权限校验
mainActivity.authorityInspectBtnClick = function(event){
    justep.xbl("authorityInspectBtn").setDisabled(true);
    var dLength = justep.xbl("dWidget").getCount();
    var orgLength = justep.xbl("reaOrg").getCount();
	if (!dLength || !orgLength) {
	   layer.msg('请选择模板和人员！', {icon: 5});
	   justep.xbl("authorityInspectBtn").setDisabled(false);
	}else{
		var dWidget = justep.xbl("dWidget");
		var tID = dWidget.getCurrentRowId();
		var fMBNR = dWidget.getValue("fMBNR", tID);
		if(!fMBNR){
		   layer.msg('请选择widget项！', {icon: 5});
		   justep.xbl("authorityInspectBtn").setDisabled(false);
		   return;
		}
		layer.load();
		var params = new justep.Request.ActionParam();
		params.setString("wid", tID);
		params.setString("fMBNR", fMBNR);
		justep.Request.sendBizRequest2({
			action: "hasWidgetPermissionAction",
			dataType: "json", 
			parameters: params, 
			callback: function(callbackData) {
				callbackData.ignoreError = false;
				if (callbackData.state) {
				     var data = callbackData.response;
				     $(".inspectContent").empty();
				     var $el = $("<ul>");
				     for(var key in data){
				         $el.append(getHasTemplate(key,data[key]));			     
				     }
				     $(".inspectTitle").text("无权限检测");
				     $(".inspectContent").append($el);
				     justep.xbl("authorityInspectBtn").setDisabled(false);
				     layer.closeAll('loading');
				} 
			}
		});
	}
};

// 选择widget
mainActivity.selectWidgetClick = function(event){
    var data = justep.xbl("dWidget");
    var tName = data.getValue("fMBMC", data.getCurrentID());
  	if (data.getCount() > 0 && !!tName ) {
        var widgets = mainActivity.defaultConfig.cacheWidgets;
  	    if(!!widgets && widgets.length>0){
  	        justep.xbl("wdSelectInfo").open();
  	    }else{
  	       layer.msg('widget列表配置为空，请检查!', {icon: 5});
  	       return;
  	    }
	}else{
	    layer.msg('模板名称不能为空!', {icon: 5});
	}
};
// 选择的widget列表与布局信息进行比对 // 将新增的widget，添加到尾巴上
mainActivity.loadWidgetAddItem = function(newData,oldData){
   var newDataArr = JSON.parse(newData);
   var oldDataArr = JSON.parse(oldData);
   var nLength = newDataArr.length;
   var oLength = oldDataArr.length;
   var addItem = [];
   for(var i = 0; i < nLength ; i++){
      var cState = false;
        for(var j = 0; j < oLength ; j++){
            if(oldDataArr[j].id == newDataArr[i].id){
               cState = true;
            };
        }
        if(!cState){
          addItem.push(newDataArr[i]);
        }
    }
    this.loadCloumnLayout(addItem);
    return addItem;
};

// 选择的widget列表与布局信息进行比对
mainActivity.comparisonWidgets = function(newData,oldData){
   var newDataArr = JSON.parse(newData);
   var oldDataArr = JSON.parse(oldData);
   var nLength = newDataArr.length;
   var oLength = oldDataArr.length;
   var count = 0; // 匹配个数
   for(var i = 0; i < nLength ; i++){
        for(var j = 0; j < oLength ; j++){
            if(oldDataArr[j].id == newDataArr[i].id) ++count;
        }
    }
    if(count == nLength && (nLength == oLength)){
       // 匹配个数一样，元数据集合数目一样，完全相等
       return 0;
    }else if(count >= oLength && (nLength > oLength)){
       // 新增项
       return 1;
    }else{
       // 混排，需要重置（可能新增、可能减少）
       return -1;
    }
};
/*设置布局*/
mainActivity.setLayoutClick = function(rowId){
   var _self = this;
   var bdata = justep.xbl("dWidget");
   var title = bdata.getValue("fMBMC",rowId);
   // 根据rowid将所有数据取出来。填充
   var widgetInfo = bdata.getValue("fMBNR", rowId);
   var layoutInfo = bdata.getValue("fMBBJXX", rowId);
   if(!!widgetInfo && !layoutInfo){
       this.removeAll();
       // 直接初始化两栏布局或者三栏布局
	   this.loadCloumnLayout(widgetInfo);
	   this.showLayoutPage(title,1);
   }else if(!widgetInfo && !!layoutInfo){ // 设置过布局信息,想对目前布局进行设置，提示是否重新
   	layer.confirm('widget未选择，是否需要清空重载布局信息？', {
	  icon: 3,
	  btn: ['确定','进入旧版','取消'] //按钮
	}, function(index){
		 _self.removeAll();
	     bdata.setValue("fMBBJXX", "", rowId);
	     bdata.saveData();
	     bdata.refreshData();
	     layer.close(index);
	}, function(index){
	   _self.loadData(JSON.parse(layoutInfo));
	   _self.showLayoutPage(title,compState);
	   layer.close(index);
	});
   }else if(!!widgetInfo && !!layoutInfo){
      this.removeAll();
      // 对选中的widget列表和布局信息进行数据比对
      var compState = this.comparisonWidgets(widgetInfo,layoutInfo);
      if(compState == 0){ // 相等
         this.loadData(JSON.parse(layoutInfo));
         this.showLayoutPage(title,compState);
      }else if(compState == 1){ // 有新增widget
         // 将新增的widget，添加到尾巴上
        this.loadData(JSON.parse(layoutInfo));
		layer.confirm('发现新增widget项，是否载入到布局面板中？', {
		  icon: 3,
		  btn: ['确定','进入旧版','取消'] //按钮
		}, function(index){
		  _self.loadWidgetAddItem(widgetInfo,layoutInfo);
		  _self.showLayoutPage(title,compState);
		  layer.close(index);
		}, function(index){
		  _self.showLayoutPage(title,compState);
		  layer.close(index);
		});
      }else if(compState == -1){ // 混合
         // 提示是否情况重载
         layer.confirm('widget有变动，是否重新载入widget列表信息？重新载入将会恢复配置信息！！', {
		  icon: 3,
		  btn: ['确定','进入旧版','取消'] //按钮
		}, function(index){
			 _self.loadCloumnLayout(widgetInfo);
		     layer.close(index);
		     _self.showLayoutPage(title,compState);
		}, function(index){
		    _self.loadData(JSON.parse(layoutInfo));
		    layer.close(index);
		    _self.showLayoutPage(title,compState);
		});
      }
   }     
};
mainActivity.showLayoutPage = function(title,state){
   $("#tPanel").hide();
   $("#layPanel").show();
   $("#lay_tempName").text(title);
   if(state == 1){
      $("#msg_warning").empty().text("有新增widget项！");
   }else if(state == -1){
      $("#msg_warning").empty().text("widget项有变动！");
   }
};
mainActivity.grid1_optionRender = function(event){
   //var tName = event.cell.rowText[0];
   //if(!tName){return "";}
   var widgetsValue = event.cell.rowText[2];
   var layoutValue = event.cell.rowText[3];
   var bars = [];
   bars.push("<li><a href='javascript:;' onclick='mainActivity.selectWidgetClick(\""+event.rowId+"\")'>选择widget</a><li>");
   (!!widgetsValue || !!layoutValue) && bars.push("<li><a href='javascript:;'  onclick='mainActivity.setLayoutClick(\""+event.rowId+"\")'>设置布局</a><li>");
   return "<ul class='tb-option'>"+bars.join("")+"</ul>";	
};
// 新增人员
mainActivity.selectOrgBtnClick = function(event){
	if (justep.xbl("dWidget").getCount() > 0) {
		justep.xbl("wdSelectOrgs").open();
	}	
};

mainActivity.dWidgetIndexChanged = function(event){
	var dWidget = justep.xbl("dWidget");
   	var reaOrg = justep.xbl("reaOrg");
   	reaOrg.filters.setFilter("doOrgFilter", "fMBID='" + dWidget.getCurrentID()+ "'");
   	reaOrg.refreshData();
};
// 模板删除
mainActivity.deleteLayClick = function(event){
  	layer.confirm('你确定要删除当前模板吗？', {
	  icon: 3,
	  btn: ['确定','取消'] //按钮
	}, function(){
	   var dWidget = justep.xbl("dWidget");
	   var deleteConfirm = dWidget.deleteConfirm;
       var directDeleteMode = dWidget.directDeleteMode;
	   dWidget.deleteConfirm = false;
	   dWidget.deleteData(dWidget.getID());
	   dWidget.deleteConfirm = deleteConfirm;
       dWidget.directDeleteMode = directDeleteMode;
	   layer.msg('删除信息成功！', {icon: 1});
	}, function(){});  	
};
// 人员删除
mainActivity.btnDeleteClick = function(event){
  	var gridOrg = justep.xbl("orgGrid").grid;
	var checkColIndex = gridOrg.getColIndexById("calCheck");
	var checkedIDs = gridOrg.getCheckedRows(checkColIndex);
	if (!checkedIDs) {
		layer.msg('请勾选要删除的人员！', {icon: 5});
		return;
	} 
    var checkedIDsArray = checkedIDs.split(",");
    var reaOrg = justep.xbl("reaOrg");
	if (reaOrg.getCount() > 0) {
		layer.confirm('你确定要删除当前记录吗？', {
		  icon: 3,
		  btn: ['确定','取消'] //按钮
		}, function(){
		   reaOrg.deleteConfirm = false;
		   reaOrg.deleteData(checkedIDsArray);
		   reaOrg.saveData();
		   reaOrg.refreshData();
		   layer.msg('删除成功！', {icon: 1});
		   justep.xbl("dWidget").refreshData();
		});
	}else{
	   layer.msg('请选择需要删除的记录！', {icon: 5});
	}	
	
};

// 关闭布局页面
mainActivity.closeLayoutClick = function(event){
   $("#tPanel").show();
   $("#layPanel").hide();
   // 显示左侧区域隐藏右侧
    justep.xbl('splitter_sp').moveToEnd();
   // justep.xbl('splitter_sp').moveToMiddle();
};
// 保存布局
mainActivity.saveLayoutClick = function(event){
    var currentText = $("#lay_tempName").text();
	layer.confirm('你确定要发布【'+currentText+'】布局信息吗？', {
	  icon: 3,
	  btn: ['确定','取消'] //按钮
	}, function(){
	      justep.xbl("saveLayout").setDisabled(true);
		  var ly_Info =  mainActivity.getVisibleWidgets();
		  var dWidget = justep.xbl("dWidget");
	      dWidget.setValue("fMBBJXX", ly_Info, dWidget.getCurrentID());
		  dWidget.saveData();
		  dWidget.refreshData();
		  justep.xbl("saveLayout").setDisabled(false);
		  layer.msg('布局信息发布成功！', {icon: 1});
	}, function(){
	});

};
/********************************************layout******************************************************************/
mainActivity.loadCloumnLayout = function(data){
      var _self = this;
      if(!data) return;
      if(typeof data == "string"){
         data = JSON.parse(data).reverse();
      }
      var dHeight = this.defaultConfig.cellHeight; // 默认高
      var cloumn = this.defaultConfig.columnLayout;// 2列或者3列
      var cloumn_X = 12/cloumn;
      var groupCount = data.length/cloumn;// 分组数目
      
      for(var index = 0;index<groupCount;index++){
         var currentWidgets = data.splice(0,cloumn).reverse();
         $.each(currentWidgets,function(i,node){
           var _widget = $.extend({},node,{
              x : i*cloumn_X,
			  y : 0,
			  width : cloumn_X,//12等分6列
			  height : dHeight/10
            });
            _self.addWidget(_widget);
         });
      }
      return;
};
mainActivity.getWidgetsConfig = function(id){
    var widgets = this.defaultConfig.cacheWidgets || [];
    var defaults = {
            x : 0,
			y : 0,
			width : 6,//12等分6列
			height : 20
	};
    for(var index = 0;index<widgets.length;index++){
    	if(widgets[index].id == id){
     	   var _CW = widgets[index];
     	   // 不存在和值为1的时候-显示状态 存在值为0的时候-隐藏状态
     	  if(!_CW.isTitle)  widgets[index].isTitle = "1";
     	   return $.extend({},widgets[index],defaults);
        }
    }
};
mainActivity.addWidget = function(node){
   var config = this.defaultConfig;
   var node = $.extend(node,{
      isTitle:config.showTitle,
      isRefresh:config.showRefresh
   });
   this.TableLayout.addWidget(node);
};
mainActivity.removeWidget = function(_id){
   this.TableLayout.remove("#portlet_"+_id);
};  
mainActivity.removeAll = function(){
   this.TableLayout.removeAll();
};  
mainActivity.loadData = function(data){
   this.TableLayout.loadData(data);
}; 

mainActivity.getVisibleWidgets = function(){
  return this.TableLayout.getWidgets();
};  
mainActivity.getDefault = function(item){
   if(!item) return this._defaultConfig;
   return this._defaultConfig[item];
};
mainActivity.setDefault = function(options){
   this._defaultConfig = options;
};
mainActivity.getRealityHeight = function(scale){
   var c = this.getDefault("cell_height");
   var m = this.getDefault("vertical_margin");
   var n = scale;
   return n*c +m*(n-1);
};
mainActivity.loadLayout = function(data){
    var self = this;
	this.setDefault({
	    animate:true,
	    float:false,
		renderEl : '.grid-stack',
		cell_height:10,
		animate : false,
		vertical_margin : 0 // 垂直间距
	});
	return new BS.TableLayout($.extend({
		items : data,
		renderHTML:function(node){
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
										+'<a href="javascript:;" class="portlet-config" data-id="'+node.id+'"  title="配置">配置</a>'
										+'<a href="javascript:;" class="close" data-id="'+node.id+'" title="移除">X</a>'
									+'</menu>'
								+'</header>'
								+'<div class="portlet-content">'
									+'<ul class="info">'
										+'<li>宽：<span class="item-width">'+node.width+'</span>列（12列）<span class="warn">'+((node.width/12)*100).toFixed(2)+'%</span></li>'
										+'<li>高：<span class="item-height">'+_height+"</span>PX</li>"
										+'<li>水平位置：<span class="item-x">'+node.x+"</span></li>"
										+'<li>垂直位置：<span class="item-y">'+node.y+"</span></li>"
										+'<li>widget标题：<span class="item-title">'+((!!node.isTitle && node.isTitle=="true")? "显示":"隐藏")+"</span></li>"
										+'<li>刷新按钮：<span class="item-refresh">'+((!!node.isRefresh && node.isRefresh=="true")? "显示":"隐藏")+"</span></li>"
										+'<li>地址：<span class="item-url">'+node.url+"</span></li>"
									+'</ul>' 
								+'</div>'
							+'</section>'
						+'</div>'
					+'</div>';
				var $el = $(_html);	
				//点击配置显示或者隐藏title、刷新按钮
				$(".portlet-config",$el).click(function(){
				    self.setCurrentWidget($el);
				    var $data = $el.data("OPTION");
				    var isTitle = $data.isTitle;
				    var isRefresh = $data.isRefresh;
				    var showTitle = "", hideTitle="checked", showRefresh="", hideRefresh="checked";
				    if(!!isTitle && isTitle === "true"){
				    	showTitle = "checked";
				    	hideTitle = "";
				    }
				    
				    if(!!isRefresh && isRefresh === "true"){
				    	showRefresh = "checked";
				    	hideRefresh = "";
				    }
				    
				    var _html = '<div style="padding:20px;">标题栏：<label><input name="isTitle" type="radio" value="true" '+showTitle
				    +' />显示 </label> <label><input name="isTitle" type="radio" value="false"  '+hideTitle+' />隐藏 </label></div>'
				    +'<div style="padding:20px;">刷新按钮：<label><input name="isRefresh" type="radio" value="true" '+showRefresh
				    +' />显示 </label> <label><input name="isRefresh" type="radio" value="false"  '+hideRefresh+' />隐藏 </label></div>';
				    layer.open({
					  type: 1,
					  btn: ['保存设置','关闭'],
					  yes: function(index, layero){
					    var isTitleValue = $('input[name="isTitle"]:checked ').val();
					    var isRefreshValue = $('input[name="isRefresh"]:checked ').val();
					    self.saveOption({"isTitleValue":isTitleValue,"isRefresh":isRefreshValue});
					    layer.msg('栏目配置完成（发布后生效）！', {icon: 1});
					    layer.close(index);
					  },
					  title:"栏目设置",
					  skin: 'layui-layer-rim', //加上边框
					  area: ['380px', '240px'], //宽高
					  content: _html
					});
				}); 

				return $el;
		}
	},this.getDefault()));
};
//配置保存扩展开始
mainActivity.saveOption = function(data){
	var option = this.getCurrentOption();
	option.isTitle = data.isTitleValue;
	option.isRefresh = data.isRefresh;
	this.setCurrentOption(option);
	this.refreshPanel(data);
};
// 刷新面板信息
mainActivity.refreshPanel = function(data){
	this.$currentWidget.find(".item-title").text((!!(!!data.isTitleValue && data.isTitleValue=="true")? "显示":"隐藏"));
	this.$currentWidget.find(".item-refresh").text((!!(!!data.isRefresh && data.isRefresh=="true")? "显示":"隐藏"));
};
mainActivity.setCurrentOption = function(option){
	this.$currentWidget.data("OPTION",option);
};
mainActivity.getCurrentOption = function(){
	return this.$currentWidget.data("OPTION");
}
mainActivity.setCurrentWidget = function($el){
	this.$currentWidget = $el;
};


