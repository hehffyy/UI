var butone = {};butone.portal = {};
if (window.BS == null) {
    window.BS = {};
}
butone.portal.toolbar = {};
BS.homeURL = '/x5/UI/base/portal/homes/mainActivity.w?process=/SA/OPM/system/systemProcess&activity=mainActivity';
/**
 *首页工具栏-事件执行队列
 **/
(function(exports){
    var _config = exports._config;
	var defaultConfig ={
		UN_ID_EL:"#userName .txt"
	};
	// 待办数量
    var setScheduleInfo = function(){
    	$("#schedule").click(function(){$(".daiban-child").toggle("slow");})
    };
    
	// 用户名+部门信息
	var setUserInfoFn = function(callback){
		//alert(justep.Context.getCurrentDeptName())
		var OrgName = justep.Context.getCurrentOgnFName();

		var showName = justep.Context.getOperatorName();
		if(justep.Portal.agentInfo){
			showName = justep.Portal.agentInfo.currentPersonName + '(' + showName + ')';
		}
		//!!callback ? callback()+showName:""+showName
		OrgName = OrgName.replace(/(.).*\1/g,"$1");
		OrgName = OrgName.replace("/","");
		$(defaultConfig.UN_ID_EL).html(OrgName+":"+showName);
	};
	/*2016.12.14 系统工具栏-设置[配置]信息加载 by ancheng*///layoutPermission
	var settingFn = function(){
		/*设置按钮事件*/
		$("#setting-btn").click(function(){	
		   $("#right-sidebar").toggle("slow");
		});
		/* 设置页签切换*/
		$("#right-sidebar .tabs a").click(function (){
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
		// 设置密码
		new SetPwd({id: 'reset_pwd'});
		
		var hasPermission = butone.portal.toolbar.hasPermission;
		if(hasPermission !== "true"){
		   $("#right-sidebar .tabs .page-set").hide();
		   $("#tab-3").hide();
		   return;
		}
		// 其他设置
		~function(){
		    var configData = butone.portal.toolbar.toolsData;
		    for(var i=0, iLen = configData.length; i < iLen; i++){
		       var currentObj = configData[i];
		       $("#setSys a[data-id="+currentObj.id+"]").children().removeClass("off").addClass(currentObj.status);
		    }
		    $("#setSys a").click(function(){
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
		        
		        $('#tab-3 .loading').show().delay(500);
		        
		        var data = JSON.stringify(eachLiFn());
		        console.info("param==>",data);
		        var params = new justep.Request.ActionParam();	
				params.setString("setInfo", data);
				params.setString('personID', justep.Context.getCurrentPersonID());
				var action ="saveSettingProfilesAction";
				var response = justep.Request.sendBizRequest("/portal2/process/portal/portalProcess", "index", action, params, null, null, false);
		        console.info(response);
		        $('#tab-3 .loading').hide(0);
		        $(".other-change").html("设置变更，请重新登录").show(); 
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
		}();
		
	};
	
	var logout = function(){
		if(!window.logouted){
			var logoutURL = window.location.href.replace(/index.*\.w.*/, 'DoLogout.j') + '?bsessionid=' + _config.bsessionid;
			var xhr = $.ajax({
				type: "post",
				url: logoutURL,
				data: {},
				async: false
			});
			window.logouted = true;
		}
	};
	
	// 退出系统
	var logoutFn = function(){
		//页面退出按钮提示信息
		if(!justep.Portal.agentInfo){
			$("#logout").click(function(){
				layer.confirm('请您注意，是否打开的功能已保存，关闭系统将导致未保存的数据丢失！\r\r您确定要退出吗？',function(index){
					logout();
					var href = window.location.href.replace(/index.*\.w.*/,'login.w');
					if(justep.Context.getClient()){
						href += '?client=' + justep.Context.getClient();
					}
					// TODO 增加appName
					if(_config.appName)
						href += (href.indexOf("?")>0?"&":"?")+"appName=" + _config.appName;
					window.location.href = href;
				});
			});
			try{//沉默跨域的url
				setTimeout(function(){
					if(parent.top.justepApp || (justep.Browser.isInApp && justep.Browser.isAndroid)){
						$("#logout").css('display','none');
					}
				},1000);
			}catch (e){};
		}else{
			$("#logout").click(function(){
				layer.confirm("\"\"关闭代理\"\"将导致未保存的数据丢失！\r \r 您确定要关闭吗？",function(index){
					try{//沉默跨域的url
						if(parent.top.justepApp){
							justep.getJustepApp().portal.refresh();
						}else{
							window.close();
						}
					}catch(e){};				
				});		
			});	
		}
		
		justep.Portal.controllers.logouter = {
				logout: function(){
					logout();
					if(parent.top.justepApp){
						window.location.href = "about:blank";
					}else{
						var href  = window.location.href.replace(/index.*\.w.*/,'login.w');
						if(justep.Context.getClient()){
							href += '?client=' + justep.Context.getClient();
						}
						// TODO 增加appName
						if(_config.appName)
							href += (href.indexOf("?")>0?"&":"?")+"appName=" + _config.appName;
						window.location.href = href;
					}
				}
			};
	};
	
	// 默认执行的函数【获取用户信息-个人设置-退出系统】
	exports.add_handel_init = function(){
		setUserInfoFn();
		
		settingFn();
		logoutFn();
	
	};
	// 工具栏元素-执行方法(事件、业务逻辑)
	
	exports.add_handel_schedule = function(){
		setScheduleInfo();
	};
	
	// 显示部门信息
	exports.add_handel_bmxx = function(){
		setUserInfoFn(function(){
			var deptName = justep.Context.getCurrentDeptName();
			
			if(!!deptName){
				deptName = deptName+"：";
			}else{
				deptName = "";
			}
			return deptName;
		});

	};
	// 收藏
	exports.add_handel_collect = function(){};
	// 代理人
	exports.add_handel_agentlist = function(e){
     //////////////////////////////////////////*2016.12.15 代理人ac*////////////////////////
		if(!justep.Portal.agentInfo){
			new AgentList({id: 'agentlist', mng: justep.Portal.controllers.funcManager});
			$('#agentlist').click(function(e){
			    e.stopPropagation();
				$('.js-short').toggle(); 
			});
		};
	};
	// 帮助
	exports.add_handel_help = function(e){
		/*
		$(e).click(function(){
			window.open("url");
		});
		*/
	};
	
	// 全屏
	exports.add_handel_full = function(){
		/****************************全屏模式-功能-START**********************************************/    
		var fullScreen = function() {
		   var $full = $("#full");
		   if($full.hasClass("fullScreen")){
		      fullScreenFn();
		      $full.removeClass("fullScreen").addClass("exitFullScreen");;
		   }else{
		      exitFullScreenFn();
		      $full.removeClass("exitFullScreen").addClass("fullScreen");;
		   } 
		};
		
		 var fullScreenFn = function() {
	        var el = document.documentElement,
	        rfs = el.requestFullScreen || el.webkitRequestFullScreen || el.mozRequestFullScreen || el.msRequestFullScreen,
	        wscript;
	 
		    if(typeof rfs != "undefined" && rfs) {
		        rfs.call(el);
		        return;
		    }
		 
		    if(typeof window.ActiveXObject != "undefined") {
		        wscript = new ActiveXObject("WScript.Shell");
		        if(wscript) {
		            wscript.SendKeys("{F11}");
		        }
		    }    
		};
		var exitFullScreenFn =function () {
		    var el = document,
		        cfs = el.cancelFullScreen || el.webkitCancelFullScreen || el.mozCancelFullScreen || el.exitFullScreen,
		        wscript;
		 
		    if (typeof cfs != "undefined" && cfs) {
		      cfs.call(el);
		      return;
		    } 
		    if (typeof window.ActiveXObject != "undefined") {
		        wscript = new ActiveXObject("WScript.Shell");
		        if (wscript != null) {
		            wscript.SendKeys("{F11}");
		        }
		  }
		};
		$("#full").click(function(){
			fullScreen();
		});
	};
	exports.logout = logout;
}(window));

/**
 *头部工具栏-初始化
 **/
(function(win,exports){
	var defaultConfig ={
		FN_SIGN:"add_handel_"
	};
	var _toolsData = win._config.customized.other;
	function callFnBacks(calls){
	     var calls = calls || [];
	     if(calls.length === 0) return false;
	     for(var i=0, iLen = calls.length; i < iLen; i++){
	         try{
	            eval(calls[i]+"("+calls[i]+")");
	         }catch(err){
	            console.error("执行队列中函数异常==>",calls[i],err);
	         }
	     }
	}
	
	function callConvertArr(calls,target,sign,func){
	     var calls = calls || [];
	     var arr = [];
	     if(calls.length === 0) return [];
	     for(var i=0, iLen = calls.length; i < iLen; i++){
	    	 var _v = calls[i][target];
	    	 
	    	 if(func(_v)) continue;
	    	 !!sign && (_v = sign + _v);
	    	 arr.push(_v);
	     }
	     return arr;
	}
	
	function callConvertArrCell(calls,target,func){
	     var calls = calls || [];
	     var arr = [];
	     if(calls.length === 0) return [];
	     for(var i=0, iLen = calls.length; i < iLen; i++){
	    	 if(func(calls[i][target])) continue;
	    	 arr.push(calls[i]);
	     }
	     return arr;
	}

	// 初始化显示排列个数【隐藏/显示】
    var genToolsBar = function(data,callback){
    	var _tabs_arr = [];
    	var index = 0,maxLength = data.length;
    	var fnArr = [];
    	for(;index < maxLength;index++ ){
    	    var _id = data[index].id;
    	    var _name = data[index].name;
    	    $("#"+_id).parents("li").show();
    	}
    	
    	!!callback && callback(fnArr);
    };
	
	// 工具栏按钮组挂载事件
	var callBarHandelFn = function(data){
		// 过滤部门信息 
		var filter = [];
		var cdata = callConvertArr(data,"id",defaultConfig.FN_SIGN,function(_v){
			 for(var index = 0;index<filter.length;index++){
				 if(_v === filter[index]){
					return true; 
				 }
			 }
		});
		cdata.unshift(defaultConfig.FN_SIGN + "init");
		callFnBacks(cdata);
	};
	
   exports.init = function(){
	   // step1:初始化显示排列个数【隐藏/显示】
	   _toolsData = callConvertArrCell(_toolsData,"status",function(value){
				 if(value === "off"){
					return true; 
				 }
	           });
	   genToolsBar(_toolsData);
	   //step2:初始化工具栏区域元素的行为 ==> 1、显示的内容（用户信息/待办 2、挂载事件（点击）
	   callBarHandelFn(_toolsData);
   };
   exports.hasPermission =  win._config.customized.layoutPermission || null;
   exports.toolsData = _toolsData;
}(window,butone.portal.toolbar||{}));
/*
 *系统初始化
 **/
(function(exports){
     var _config = exports._config;
     exports.loadHomPage = function(){
        $("#homeFrame").src(BS.homeURL +"&bsessionid="+_config.bsessionid,function(){});
     };
     exports.init = function(){
		justep.Portal.language = util.getParameterByName('language') || 'zh_CN';
		justep.Portal.agentInfo = _config.agentInfo;
		var customizer = new Customizer(_config.customized);
		var funcMng = new FuncManager({
			bsessionid : _config.bsessionid,
			data : _config.functree.childNodes,
			customizer : customizer,
			agents : _config.agents
		});
		justep.Portal.controllers.funcManager = funcMng;
		
		var funcFrame = new FuncFrame2({
			id: 'funcFrame',
			bsessionid: _config.bsessionid,
			onclose: function(option){
				// 如果有opener则激活，否则回首页
				funcMng.closeTab(option);
				
				if(option.opener){
					funcMng.runFunc(option.opener);
				}else{
					// 显示首页
					//portalMng.refresh();
				}
			}
		});
		justep.Portal.controllers.funcFrame = funcFrame;
		var menu = new FuncTreeMenu({
			id:'cv2', 
			funcMng: funcMng,
			resize:function(){
				funFrameResize();
		}});
		funcMng.attachEvent('close-func', function(option){
			funcFrame.close(option);
		});

		if(customizer.other["func-map-opened"] === false){
			$('.fun-map').hide();
			$('#fun-map-show-btn').show();
			$('#fun-map-close-btn').hide();
		}
		    
		funcMng.attachEvent('run-func', function(option){
			QuickTab._addNewTabFromEntry(option);
		});

		funcMng.attachEvent('refresh-func', function(option){
		   //	openedList.refresh(option);
		});
		
		funcMng.attachEvent('close-tab', function(option){
			QuickTab._doCloseTab(QuickTab._findLoadedTabFromEntry({"id":option.id}));
		});

		
		QuickTab._init({
		     // TODO TKJ 关闭前增加 关闭判断
		     onbeforeclose : function(option,callback){
				 funcFrame.beforeClose(option,callback)
			  },
			 destroy:function(item){
			     funcMng.closeFunc(item);
				 funcMng.closeTab(item);
			 },
			 open:function(item){
				 item && funcFrame.open(item);
			 },onHomePage:function(){
				  exports.loadHomPage();
			 }
		});
		funcMng.attachEvent('refresh-func', function(option){
			funcFrame.refresh(option);
		});
		
		// TODO TKJ 关闭前判断
		funcMng.attachEvent('before-close-func', function(option,callback){
			funcFrame.beforeClose(option,callback);
		});
		
		funcMng.attachEvent('run-func', function(option){
			$('.sider-title-draw').trigger("click");
			$('#bs-content-homepage').hide();
			$('#funcFrame').show();
			// layer loding状态加载器
			var _layer =null;// layer.load('正在加载', 3);
			funcFrame.open(option,_layer);
		});
		/************************************激活后选中当前项*****************************/
		funcMng.attachEvent('active-func', function(option){
			$('#bs-content-homepage').hide();
			$('#funcFrame').show();
			QuickTab._doSelectTab(QuickTab._findLoadedTabFromEntry({"id":option.id}));
		});
		justep.System.onunloads.push(function(){
			funcMng.closeAllAgentPage();
		});
		
		window.onbeforeunload = function(){
			if(!justep.Portal.agentInfo) logout();
		};
				////////////////////////计算各部分宽高//////////////////////////////////////////////////////////////
		function funFrameResize(){
			var headHeight = $('.header').outerHeight();
			var bodyHeight = $('body').outerHeight();
			var bodyWidth = $('body').width();
			var contentHeight = bodyHeight - headHeight;	
			$(".index-page").children(".content").height(contentHeight);
			
			// 计算 导航区域宽度 && 内容区域宽度
			var sidebarHeight = $('.bs-tab').outerHeight();
			var funHeight = contentHeight - sidebarHeight;
			var navHeight = contentHeight;		
			$('#funcFrame').height(funHeight-5)
			.css({
	            position: "absolute",
	            top: 34,
	            width:"100%"
            });
            $('#bs-content-homepage').height(funHeight-5)
			.css({
	            position: "absolute",
	            top: 34,
	            width:"100%"
            });
			$(".left-nav",'#bs-frame-menu').height(navHeight);
			
			var iLeftMenuWidth = $('#bs-frame-menu').width();
			//将contentWidth的宽给#bs-frame-content并增加一个CSS样式margin-left为iLeftMenuWidth+5。
			$("#bs-frame-content").css({marginLeft:iLeftMenuWidth+5,"height":"100%"});
			QuickTab._resizeTabs();
		};
		$(window).resize(funFrameResize);
		funFrameResize();
		
		if(_config.isDebug == 'true') $('.debug-mode').show();
		//加载首页头部
		butone.portal.toolbar.init();
		
		// 文档事件
		 $(document).click(function(e){
	        $("#frame-tools-nav").find("ul").hide();
		    var rtSidebar = "#right-sidebar";
		    var $el = $(e.target);
		    var items = ["#right-sidebar",".bs-tab-float"];
		    for(var index=0;index<items.length;index++){
		        if(!$el.parents(items[index]).length) $(items[index]).hide();
		    }
		 });

		// 导航栏滚动条-样式
		$("#cv2").slimScroll({
		    height: '100%',
		    color: '#646060'
	   });
	   // 仅使用标题
	   if(_logoType == "lt_2"){
	      $(".header-logo .logo").hide();
	   }else if(_logoType == "lt_3"){// 仅使用图片
	      $(".header-logo .header-title-container").hide();
	   }else{
	      $(".header-logo .logo").show();
	      $(".header-logo .header-title-container").show();
	   }
	   if(!_title_en){
	      $(".title-en").hide();
	      $(".title-zh").addClass("no-en");
	   }
	   // 加载首页widget
	   //exports.home();
	   exports.loadHomPage();   
	};	
}(window));
window.afterInitXBL = window.init;
/**
*首页widget
////////////定义门户布局类型///////////
*/
(function(exports){
		function loadData(){
		    // 获取系统设置信息 系统名称以及导航配置
				var options = {};
				var param = new justep.Request.ActionParam();
				options.action = "getHomeInfoAction";
				options.dataType = "json";
				options.process = "/portal2/process/portal/portalProcess";
				options.activity = "index";
				options.callback = function(result){
					var roleData = result.response;	
					var roleDataList = [];
					for(var z=0;z<roleData.length;z++){
						var selectList = '<li  rid ="'+roleData[z].name+'" dtype="'+roleData[z].type+'"><a id="'+roleData[z].id+'" rid ="'+roleData[z].name+'" href="javascript:void(0);">'+roleData[z].name+'</a></li>';
						roleDataList.push(selectList);
					};	
					var maxSize = roleDataList.length;
					var roleDataList = roleDataList.join("");					
					$('#presentRole').append(roleDataList);
					
					$('#presentRole li a').click(function(){
						$(this).parent().addClass('widget-on').siblings().removeClass('widget-on');
						var this_rid = $(this).attr('rid');
						for(var x =0;x<roleData.length;x++){
							if(roleData[x].type == 'widget' && roleData[x].name==this_rid){
								dataFindWidget(roleData[x]);
								$('.grid-stack').show();
								$('#forWidget-Link').hide();
								$('#forWidget-Link').empty();
							}
							if(roleData[x].type == 'link' && roleData[x].name==this_rid){
								dataFindLink(roleData[x]);
								$('#forWidget-Link').show();
								$('.grid-stack').hide();
								$('.grid-stack').empty();
							}
						}
					});
					
				};
		
				justep.Request.sendBizRequest2(options);
		};

		function dataFindWidget(arg){	
		//父调子iframe页面方法
			var frame = $('#homeFrame').get(0).contentWindow;  
			if(frame.callChild) frame.callChild(arg);	
		};
		
		/*function dataFindLink(el){
			var frame = $('#homeFrame').get(0).contentWindow;  
			if(frame.callChild) frame.callChild2(el);
		};*/
	
    var homeFn = function(){
    	loadData();
		$(".roleChange").click(function(){
    		$("#presentRole").toggle();
    	});	 
    };
	exports.home = homeFn;
})(window);