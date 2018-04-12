window.afterInitXBL = function(){
	var Modules = new Module();
	Modules.init(function(){
		var defaults = {
				title_zh : window._config.title_zh,
				title_en : window._config.title_en
		};
		
		Modules.run(defaults);
		
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
		
		//定义门户布局类型
		var layouts = {
				l0: {columns: [{index: 0}]},
				l1: {
					columns: [
					    {index: 0, width: 50},
					    {index: 1}]
	            },
				l2: {
					columns: [
					    {index: 0, width: 30},
					    {index: 1}]
	            },
				l3: {
					columns: [
					    {index: 0},
					    {index: 1, width: 40},
					    {index: 2}]
	            },
				l4: {
					columns: [
					    {index: 0, width: 30},
					    {rows: [
					        {index: 1}, 
					        {columns: [
								{index: 2},
								{index: 3}]}]}]
	            },
				l5: {
					rows: [
					    {index: 0}, 
					    {columns: [
					        {index: 1}, 
					        {index: 2, width: 50}, 
					        {index: 3}]}]
				},
				l6: {
					rows: [
					    {columns: [
						    {index: 0}, 
						    {index: 1, width: 50}, 
						    {index: 2}]},
						{index: 3}]
				}
			};
		
		var portalMng = new PortalManager({
			bsessionid: _config.bsessionid,
			customizer: customizer,
			funcMng: funcMng,
			widgetDefs: _config.widgets,
			layouts: layouts,
			layout: 'l1',
			//设置默认的门户widget, 这里使用了md5 id , 当widget配置修改的时候, 这里也需要修改
			widgets: [
				{dock:0, widgetId: "5349D8E7C09F24D511DAA51A88F04A7D", position: 0, color: '14'},
				{dock:1, widgetId: "6E0C2A372230044D1FA79A03D4AAEB2A", position: 0}
			]
		});
		
		justep.Portal.controllers.portalManager = portalMng;

		var menu = new FuncTreeMenu({id:'cv2', funcMng: funcMng,resize:function(){
			funFrameResize();
		}});
//		var view = new FuncTreeView({id:'cv1', funcMng: funcMng});

		if(customizer.other["func-map-opened"] === false){
			$('.fun-map').hide();
			$('#fun-map-show-btn').show();
			$('#fun-map-close-btn').hide();
		}
		
		var openedList = new ScrollBar({id: 'b3',funcMng: funcMng, items: [{id: 'firstPage', label: '首页', fixed: true, click: function(){
			$('#funcFrame').hide();
			$('.content').show();
		}}], onadd: function(btn){
				$('li', this.el).removeClass('on');
				btn.el.addClass('on');
				this.el.show();
				if(btn.icon16 || btn.icon){
					var serverName = window.location.pathname.split('/')[1],
						icon = btn.icon16 || btn.icon;
				}	
			}, ondelete: function(option){
				funcMng.closeFunc(option);
			}, onclick: function(option){
				$('li', this.el).removeClass('on');
				option.el.addClass('on');
				if(option.click){
					option.click();
				}else{
					$('.content').hide();
					$('#funcFrame').show();
					funcFrame.open(option);
				}
			},
			// TODO TKJ 关闭前增加 关闭判断
			onbeforeclose : function(option,callback){
				funcFrame.beforeClose(option,callback);
			}
		});
		
		funcMng.attachEvent('run-func', function(option){
			openedList.add(option);
		});

		funcMng.attachEvent('refresh-func', function(option){
			openedList.refresh(option);
		});
		
		funcMng.attachEvent('close-func', function(option){
			openedList.remove(option);
		});

		var funcFrame = new FuncFrame2({id: 'funcFrame', bsessionid: _config.bsessionid, onclose: function(option){
			// 如果有opener则激活，否则回首页
			funcMng.closeFunc(option);
			if(option.opener){
				funcMng.runFunc(option.opener);
			}else{
				$('#funcFrame').hide();
				// 显示首页
				$('.content').show();
				portalMng.refresh();
			}
		}});
		
		funcMng.attachEvent('refresh-func', function(option){
			funcFrame.refresh(option);
		});
		
		var funFrameResize = function(isTarget){
			var headHeight = $('.head').outerHeight();
			var bodyHeight = $('body').height();
			var h = bodyHeight - headHeight;
			
			// 计算 导航区域宽度 && 内容区域宽度
			var iLeftMenuWidth = $('#funcMenu').outerWidth();
			var funHeight = h - 45;
			var navHeight = h;
			// 火狐浏览器第一次进入，计算高度问题 bug
			if(!$.browser.msie && isTarget === "true"){
				funHeight = h - 30;
				navHeight = h+17 ;//+ 17;
			}
			
			$('#funcFrame').height(funHeight);
			$(".left-nav",'#funcMenu').height(navHeight-5);
			var $funContent =  $("#funContent");
			
			var $funContent =  $("#funContent");
			$funContent.width($funContent.parent().width()-iLeftMenuWidth -3).css({marginLeft: iLeftMenuWidth-2});
		};
		
		funFrameResize("true");
		$(window).resize(funFrameResize);
		
		justep.Portal.controllers.funcFrame = funcFrame;

		funcMng.attachEvent('close-func', function(option){
			funcFrame.close(option);
		});
		
		// TODO TKJ 关闭前判断
		funcMng.attachEvent('before-close-func', function(option,callback){
			funcFrame.beforeClose(option,callback);
		});
		
		
		funcMng.attachEvent('run-func', function(option){
			$('.content').hide();
			$('#funcFrame').show();
			// layer loding状态加载器
			var _layer = layer.load('正在加载', 3);
			funcFrame.open(option,_layer);
		});
		
		funcMng.attachEvent('active-func', function(option){
			// 激活后选中当前项
			$("li", "#b3").removeClass('on');
			$("li[funcid="+option.id+"]'", "#b3").addClass('on');
			
			$('.content').hide();
			$('#funcFrame').show();
			funcFrame.open(option);
		});

		if(!justep.Portal.agentInfo){
			$('.head >.inner >.main >.bar >div');//.css({'margin-right': '70px'});
			var sp = new SliddingPanel({id: 'topPanel', title: '设置'});
			$("#setting-btn").click(function(){
				sp.show();
				 $.layer({
	                 type: 1,
	                 title: [
	                         '设置', 
	                         'background:#F8F8F8; height:40px; border-bottom: 1px solid #CCC;border-top-right-radius: 3px;border-top-left-radius: 3px;text-shadow: 0px 1px #FFF;border-top: 1px solid #FFF;' //自定义标题样式
	                     ], 
	                 area: ['760px', '90%'],
	                 closeBtn: [1, true],
	                 border: [0],
	                 page: {dom : '#topPanel'},
	                 close: function(index){
	                	 sp.hide();
	                     layer.close(index);
	                 }
	             });
			});
			var tab = new Tab({id: 'setting', pages: [{title: '基本设置', id:"page1"}, {title: '模块设置', id:"page2"}, {title: '主题设置', id:"page3"}], onIndexChange: function(page, i){
				if(!page.inited){
					page.inited = true;
					switch(i){
						case 0:
							new SetPwd({id: 'reset_pwd', description: "6到12个字符，区分大小写。", 
								validate: function(newpwd){
									if(!(/[a-z|A-Z|0-9]{6,12}/.test(newpwd) && newpwd && newpwd.length <= 12))
										return "密码不符合规则";
									if(!/[a-z,A-Z]/.test(newpwd))
										return "密码必须包含英文";
									if(!/[0-9]/.test(newpwd))
										return "密码必须包含数字";
								}
							});
							new AdvancedSet({id: 'advanced_set', onSuccess: function(){
								$("#logout").click();
							}});
						break;
						case 1:
							new PortalSet({id: 'portal_set',mng: portalMng});
						break;
						case 2:
							Modules.createSkin({id: 'skin_set',skin:['default','darkBlue','green','red','black']},function(){
								new FuncTreeMenu({id:'cv2', funcMng: funcMng,resize:function(){
									funFrameResize();
								}});
							});
						break;
					}
					
				}
			}});
			// 追加惯用语维护按钮
			$("#idiom-btn").click(function(){
				var item = {id:"idiomPortal4",label:"惯用语",url:"/UI/base/system/process/idioms/mainActivity.w",process:"/base/system/process/idioms/idiomsProcess",activity:"mainActivity"};
				justep.Portal.controllers.funcManager.runFunc(item);
			});
		} else {
			$("#setting-btn").parent().hide();
			$("#agents").parent().hide();
			$("#idiom-btn").parent().hide();
		}
		
		var portal = new PortalView({
	        id: 'portal',
			mng: portalMng
	    });
		
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
		}
		
		justep.System.onunloads.push(function(){
			funcMng.closeAllAgentPage();
		});
		
		window.onbeforeunload = function(){
			if(!justep.Portal.agentInfo)
				logout();
		};
		if(!justep.Portal.agentInfo){
			$("#logout").click(function(){
				layer.confirm('请您注意，是否打开的功能已保存，关闭系统将导致未保存的数据丢失！\r\r您确定要退出吗？',function(index){
					logout();
					var href = window.location.href.replace(/index.*\.w.*/,'login.w');
					if(justep.Context.getClient()){
						href += '?client=' + justep.Context.getClient();
					}
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
				layer.confirm("请您注意，是否打开的功能已保存，关闭代理将导致未保存的数据丢失！\r\r您确定要关闭吗？",function(index){
					try{//沉默跨域的url
						if(parent.top.justepApp){
							justep.getJustepApp().portal.refresh();
						}else{
							window.close();
						}
					}catch(e){};				
				});		
			}).html("关闭");	
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
					window.location.href = href;
				}
			}
		};
		var showName = justep.Context.getOperatorName();
		if(justep.Portal.agentInfo){
			showName = justep.Portal.agentInfo.currentPersonName + '(' + showName + ')';
		}
		$('.head .user .name').html(showName);
		$('.head .user .loginTime').html(util.time());
		
		if(_config.isDebug == 'true')
			$('.debug-mode').show();
			
		new AgentList({id: 'agents', mng: funcMng});
		//var reminder = new Reminder({id: "reminder"});
	});
	
};
