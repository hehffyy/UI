var mainActivity = {};
$.event.special.valuechange = {

  teardown: function (namespaces) {
    $(this).unbind('.valuechange');
  },

  handler: function (e) {
    $.event.special.valuechange.triggerChanged($(this));
  },

  add: function (obj) {
    $(this).bind('keyup.valuechange cut.valuechange paste.valuechange input.valuechange', obj.selector, $.event.special.valuechange.handler)
  },

  triggerChanged: function (element) {
    var current = element[0].contentEditable === 'true' ? element.html() : element.val()
      , previous = typeof element.data('previous') === 'undefined' ? element[0].defaultValue : element.data('previous')
    if (current !== previous) {
      element.trigger('valuechange', [element.data('previous')]);
      element.data('previous', current);
    }
  }
};	
function _getSysThemeConfig(callback){
	// 获取系统设置信息 系统名称以及导航配置
		var params = new justep.Request.ActionParam();
	    params.setString("portal",justep.Request.URLParams['portal'] );
	    var  subSystem = justep.Request.URLParams['subSystem']==null?"default":justep.Request.URLParams['subSystem'];
	    
	    params.setString("subSystem",subSystem);
	justep.Request.sendBizRequest2({
		action: "getSysThemeConfigAction", 
		dataType: "json",
		parameters: params, 
		callback: function(result) {
		  callback(result.response);
		}
	});
	
//	var options = {};
//	options.action = "getSysThemeConfigAction";
//	options.dataType = "json";
//	options.callback = function(result){
//	    callback(result.response);
//	};
//	justep.Request.sendBizRequest2(options);
}

mainActivity.modelLoad = function(){
        var that = this;
			/* 设置页签切换*/
		$("#page-sidebar .tabs a").click(function (){
			    var _vid = $(this).attr("data-href");
			    var $parentEl = $(this).parent();
			    var isActive = $parentEl.hasClass("on");
			    
			    if(isActive){
			       $(_vid).removeClass("active")
			              .addClass("active");
			    }else{
			       $parentEl.addClass("on").siblings().removeClass("on");
			       $(_vid).siblings().removeClass("active");
			       $(_vid).addClass("active");
			    }
		});	
		
	    _getSysThemeConfig(function(data){
		    that.initSys(data);
			that.initThemTab(data);
			that.initWidget();
			that.initToolsConfig(data);
	    });
		

};
mainActivity.initToolsConfig = function(data){
	var configData = data["toolbar"];
	if(!configData) return;
	if(typeof configData == "string"){
		configData = JSON.parse(configData);
	};		  
	for(var i=0, iLen = configData.length; i < iLen; i++){
	   var currentObj = configData[i];
	   $("#setSys a[data-id="+currentObj.id+"]").children().removeClass("off").addClass(currentObj.status);
	}

	 $("#setSys ul li a").click(function(){
			// 执行数据保存
			var _id = $(this).attr("className");
			var sign_id = $(this).attr("data-id");
			var sign_name = $(this).attr("data-name");
			var defStatus = "off";
			var value = _id.split("-")[1];
			var $elem = $(this).children();		
			if($elem.hasClass("on")){
				$elem.removeClass("on").addClass("off");
				defStatus = "off";
			}else{
				$elem.removeClass("off").addClass("on");
				defStatus = "on";
			}
			
		   // $('#tab-3 .loading').show().delay(500); 

		   
		   // $('#tab-3 .loading').hide(0);
			//$(".other-change").html("设置变更，请重新登录").show(); 
	});
	$('#saveIconData').click(function(){
		var data = JSON.stringify(eachLiFn());
	   console.info("param==>",data);
		var params = new justep.Request.ActionParam();	
		params.setString("setInfo", data);
		params.setString('personID', justep.Context.getCurrentPersonID());
		var action ="saveSettingProfilesAction";
		var response = justep.Request.sendBizRequest("/portal2/process/portal/portalProcess", "index", action, params, null, null, false);
		console.info(response);
			alert('保存成功');
			
		});
	function eachLiFn(){
		var resData = [];
		$("#setSys a").each(function(){
		   var sign_id = $(this).attr("data-id");
		   var sign_name = $(this).attr("data-name");
		   var def_status = "off";
		   var $elem = $(this).children();
		   if($elem.hasClass("on")){
				def_status = "on";
			}
		   resData.push({
				"id":sign_id,
				"name":sign_name,
				"status":def_status
		 }); 
		});
		return resData;
	}
	
}
// 主题部分代码
mainActivity.initThemTab = function(data){
   var loadData = function(){
	   //step 1 加载主题列表 -动态ajax
		var options = {};
		options.action = "getThemeListAction";
		options.dataType = "json";
		options.callback = function(result){
		        var data = result.response.rows;
				var index = 0,maxLength = data.length;
				var result = [];
				for(;index < maxLength;index++){
				    var state = data[index].sThemeActivity.value;
				    if(state == "activity"){state = "active";}
					result.push('<li class=image1><span>'+data[index].sThemeName.value+'</span><a class='+state+' data-name='+data[index].sThemeName.value+'><p></p></a></li>');
				}
				$(el+" ul").append(result.join(""));
				if(maxLength ==0){
				    $(".d-message").text("主题不存在，请先初始化主题列表!").show();
				}
		};
		justep.Request.sendBizRequest2(options);
   };
	// 主题部分代码
	var el = "#reset_theme";
    var data = data["sSysConf"];
    // 重置主题按钮
    $("#startTheme").click(function(){
         //执行初始化数据库主题列表 -ajax
			var options = {};
			options.action = "resetThemeListAction";
			options.dataType = "json";
			options.callback = function(result){
			    if(result.state){
			       $(".d-message").text("初始化成功，请刷新主题列表!").show();
			    }else{
			       alert("error");
			    }
			    
			};
			justep.Request.sendBizRequest2(options);
		 
    });
    
	$(el).click(function(e){
		var $elem = $(e.target);
		if(e.target.nodeName === "A"){
			// 1、添加选择标示
			if(!$elem.hasClass("active")){
				$elem.addClass("active").parents().siblings().children("a").removeClass("active");
				
				var options = {};
				var param = new justep.Request.ActionParam();
			    param.setString("value", $elem.attr("data-name"));
			    options.parameters = param;
				options.action = "updataThemeStateAction";
				options.dataType = "json";
				options.callback = function(result){
				    
				};
				justep.Request.sendBizRequest2(options);
			}
		}
	});
	loadData();

};
// 系统设置部分代码
mainActivity.initSys = function(sData){
	var logoType = "lt_1"; // 图文类型
	var sendArr = [];
	
	function _setLogoType(_v){
	    logoType = _v;
	}
	function _callStyelType($el){
		   var _id = $el.attr("id");
		   if(_id =="tw"){
		      $(".logo-content .logo img").show();
		      $(".logo-content .title-zh").show();
		      $(".logo-content .title-en").show();
		   }else if(_id =="bt"){
		       // 标题
		      $(".logo-content .logo img").hide();
		      $(".logo-content .title-zh").show();
		      $(".logo-content .title-en").show();
		   }else if(_id =="tp"){
		      // 图片
		      $(".logo-content .logo img").show();
		      $(".logo-content .title-zh").hide();
		      $(".logo-content .title-en").hide();
		   };
	};
	   
	// 系统设置部分代码
	var logoViewReader = function(callback){
		var el = $("#logo-title");
		$("#logo-title .tabs a").click(function(e){
		   e.stopPropagation(); 
		   e.preventDefault();
		   var $el = $(this).children("input");
		   $el.attr("checked","true");
		   $(this).attr("data-checked","true");
		   $(this).parent().siblings().children().attr("data-checked","false");
		    _callStyelType($el);
		    _setLogoType($el.val());
		});
		//input 改变后下面也改变
	    $('input[name=chinese]').bind("valuechange",function(e, previous){
	        $(".logo-content .title-zh").empty().append($(this).val());
		  });
		  
	     $('input[name=english]').bind("valuechange",function(e, previous){
	          var $el = $(".logo-content .title-en");
	          var v = $(this).val();
	          if(!v){
	              $el.hide();
	              $el.parent().addClass("no-en");
	          }else{
	              $el.show();
	              $el.parent().removeClass("no-en");
	          }
		      $el.empty().append(v);
		  });
	};
	//数据保存
	function _getIconRemoteData(){
		if(!!sData["iconList"]){
			return sData["iconList"].split(",");
		}
		return [];
	}
	
	function _getNavRemoteData(){
	  return JSON.parse(sData["sNavIcon"]);
	}
	
	var _processArrData = function(data){
		for(var index=0;index<data.length;index++){
			   var cItems = data[index]["items"];
			   var isAdd = false;
			   var _tempArr = [];
			   for(var i=0;i<cItems.length;i++){
			     if(!cItems[i]["cname"]){
			        cItems[i]["cname"] = "nav-icon-default";
			        _tempArr.push(cItems[i]);
			        isAdd = true;
			     }
			   }
			   isAdd && sendArr.push({
				   "fileName":data[index]["fileName"],
				   "items":_tempArr
			   });
			}
	};
	
	var _processLogicData = function(fName,cName,cLabel){
	     var fileName = fName;
	     var _tempObj = {"cname":cName,"label":cLabel};
	     if(!sendArr.length){
					sendArr.push({
						   "fileName":fileName,
						   "items":[_tempObj]
					});
				}else{
					for(var index =0;index<sendArr.length;index++){
						var _fileName = sendArr[index]["fileName"];
						var _items = sendArr[index]["items"];
						
						if( _fileName == fileName){
							var isItem = false;
							for(var i =0;i<_items.length;i++){
								if(_items[i]["label"] == cLabel){
									_items[i]["cname"] = cName;
									isItem = true;
								}
							}
							if(!isItem){
								// 当前数组对象不存在当前元素
								_items.push(_tempObj);
							}
						}else{
							sendArr.push({
								   "fileName":fileName,
								   "items":[_tempObj]
							});
						}
					}
					
				}
	};
	
	var addEvent = function(){
	       var righticon = "<p class='righticon'></p>";
			// 导航功能区域
			$("#menu-list li").click(function(){
				$(this).addClass("only").siblings().removeClass("only");
				$("#icon-list p").remove();
				var _class = $(this).find("i").attr("class");
				$("#icon-list li").removeClass("active");
				_class = _class.split(" ");
				var rCurrentEL = $("#icon-list").find("i."+_class[_class.length-1]);
				rCurrentEL.parent().addClass("active").append(righticon);
			});
			
			//图标库-雪碧图
			$("#icon-list li").click(function(){
				var cName = $(this).find("i").attr("class");
				var $child = $(this).children();
				var $siblings = $(this).siblings();
				$(this).children('p').remove().html();
				$(this).addClass("active").append(righticon);
				
				$siblings.removeClass("active");
				$siblings.children('p').remove().html();
				
				$("#menu-list li.only").find("i").removeAttr("class").addClass("nav-icon").addClass(cName);	
				var $tObj = $("#menu-list li.only");
				var dataLabel = $tObj.attr("data-label").split(",");
			
				_processLogicData(dataLabel[1],cName,dataLabel[0]);
			});
	};
	
	var loadDefaultLogic = function(){
	   $(".d-message").hide();	
	    var data = sData["sSysConf"];
	    if(!data) {
	    	$(".d-message").text("主题不存在，请先初始化主题列表!").show();
	    	return;
	    	}
		var sConfig = JSON.parse(data);
		var title_zh = "国土资源管理系统";
		var title_en = "";
		if(sConfig.length>0){
		   title_zh = sConfig[0].title_zh;
		   title_en = sConfig[0].title_en;
		}
		
		$("input[name=chinese]").val(title_zh);
		$("input[name=english]").val(title_en);
		
		$(".logo-content .title-zh").empty().append(title_zh);
		$(".logo-content .title-en").empty().append(title_en);
	};
	
	var loadPageView =function(data,iconlist){
		 var icon = [];
		 if(!!iconlist){
			 for(var index =0;index<iconlist.length;index++){
				 icon.push('<li><i class='+iconlist[index]+'></i></li>');
			 }
			$("#icon-list ul").empty().append(icon.join(""));
		 }
		 
	      var result = [];
	      var $el = $("#menu-list ul");
			$.each(data,function(n,value){
				var arrs = value.items;
				$.each(arrs,function(v,values){
				    result.push('<li data-label='+values.label+","+value.fileName+'><span><i class=\''+values.cname+'\'></i></span>'+values.label+'</li>');
				});
			});
			$el.append(result.join("") );
	};
	var loadIconReader = function(){
	    var data = _getNavRemoteData();
	    var iconList = _getIconRemoteData();
	   _processArrData(data);
	   loadPageView(data,iconList);
	   addEvent();
	   $("#menu-list li:first").trigger("click");
	};
	// 加载显示logo;	
	logoViewReader();
	//编辑菜单目录图标
	loadIconReader();
	
	loadDefaultLogic();
     
	  var $el = $(".logo-content .title-en");
	  var v = $("input[name=english]").val();
	  if(!v){
	      $el.hide();
	      $el.parent().addClass("no-en");
	  }else{
	      $el.show();
	      $el.parent().removeClass("no-en");
	  }

	$("#saveData").click(function(){
	   var type = logoType;
	   var title_zh = $("input[name=chinese]").val();
	   var title_en = $("input[name=english]").val();
	   if(!title_zh){
	       alert("平台名称不能为空（中文）!");
	   }
	   var sPortal = {"logo":{
		   "type":type,
		   "title_zh":title_zh,
		   "title_en":title_en
	   }};
		//console.info("发送到数据库的值：",JSON.stringify(sPortal),JSON.stringify(sendArr));
		
		// 保存设置-icon方法 config data
		// 获取系统设置信息 系统名称以及导航配置
		var options = {};
		var param = new justep.Request.ActionParam();
			param.setString("config", JSON.stringify(sPortal));
			param.setString("data", JSON.stringify(sendArr));
		options.action = "saveMenuOfIconAction";
		options.dataType = "json";
		options.parameters = param;
		options.callback = function(result){
		    if(result.state){
		       sendArr = [];
		       alert("保存成功！");
		    }else{
		       alert("error");
		    }
		    
		};
		justep.Request.sendBizRequest2(options);
	});
};

// 首页设置部分代码
mainActivity.initWidget = function(){
	// 首页设置部分代码
	var data = [{id:"clickBox"},{Class:"on",value:"部门职位"},{value2:"角色"}];
	for(var i=0;i<data.length;i++){
		var result = "";
	}
	var el = $("#clickBox");
	$(el).append(result).html();
	$("#clickBox .tab a").click(function(){
		var _vid = $(this).attr("href");
		var $parentEl = $(this).parent();
		var isActive = $parentEl.hasClass("on");
		if(isActive){
			$(_vid).removeClass("active").addClass("active");
		}else{
			$parentEl.addClass("on").siblings().removeClass("on");
			$(_vid).siblings().removeClass("active");
			$(_vid).addClass("active");
		}
	});
};
