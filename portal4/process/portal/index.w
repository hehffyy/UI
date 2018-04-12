<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xforms="http://www.justep.com/xforms"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" timeout-window="/UI/portal4/process/portal/login.w">  
  <xui:inhead> 
    <xhtml:title>${title_zh}</xhtml:title>  
    <xhtml:meta id="viewport" name="viewport" content="initial-scale=1.0,user-scalable=yes,width=1024"/> 
  </xui:inhead>  
  <xui:view id="rootView" auto-load="true"  class="index-page"> 
    <xui:layout style="height:100%;width:100%;" id="rootLayout"> 
    <!-- 上方区域==系统logo和工具栏 -->
      <div class="header"> 
        <div class="header-box"> 
          <!-- logo -->
          <div class="header-logo"> 
            <div class="logo"/>  
            <div class="header-title-container">
		         <div class="title-zh">${title_zh}</div>
		         <div class="title-en">${title_en}</div>
		    </div>
          </div>  
            <!-- 工具栏 -->
          <ul id="frame-tools-nav">
          <!-- 消息中心
            <li>
				<a id="schedule" href="###">
					<i class="bs-nav-ts tb-schedule"></i>
					<span>0</span>			
				</a>
				<ul class="daiban-child">
					
				</ul>																				
			</li>-->
			<!-- 用户信息 [部门/用户名]-->
            <li class="show no-hover">
				<a id="userName" href="###">
					<i class="bs-nav-ts tb-user-name l"></i>
					<span class="txt">未注册</span>			
				</a>																				
			</li>
	        <!-- 代理人 -->
			<li class="no-hover">
				 <a id="agentlist" href="###">
					<i class="bs-nav-ts tb-agent r"></i>
					<span class="txt">代理</span>
				</a>
				<span id="agentmen" style="display:block;">			
				</span>
			</li>
			<!-- 收藏
			<li>
	             <a id="collect" href="###">
					<i class="bs-nav-ts tb-collect"></i>
				 </a>
	        </li> -->
	        <!-- 设置-->
	        <li class="show">
	             <a id="setting-btn" href="###">
					<i class="bs-nav-ts tb-setting"></i>
				 </a>
	        </li> 
            <!-- 帮助 -->
            <li>
	            <a id="help" href="help.w" target="_blank">
					<i class="bs-nav-ts tb-help"></i>
			    </a>
            </li>
            <li>
            	<a id="full" class="fullScreen"  title="全屏">
            		<i class="bs-nav-ts tb-full"></i>
            	</a>
            </li>
            <!-- 登出 -->
	        <li class="show">
	           <a id="logout" href="###">
				<i class="bs-nav-ts tb-logout"></i>
			   </a>
            </li>
        </ul> 
          <!--角色切换
          <div class="roleChange" style="height: 100%;display:inline-block;">
          	<a href="#">角色切换</a>
          	<ul id="presentRole"></ul> 
          </div>-->
        </div> 
      </div>  
      
      <!--下区域=左侧导航+功能内容区-->
      <div class="content"> 
        <!--左侧导航 -->
        <div id="bs-frame-menu" class="func-menu-show"> 
          <div class="left-nav"> 
            <div id="funHide" class="sider-title-up"> 
              <span class="ui-nav-exp"/> 
            </div>  
            <!-- ie7 x-index bug -->  
            <div id="scorllHide"> 
              <div id="cv2" class="bs-func-nav"/> 
              <p class="sider-title-draw" ></p>
            </div> 
          </div> 
        </div>  
        <!--右侧区域=功能页签和功能内容区[widget+功能] -->  
        <div id="bs-frame-content"> 
          <div class="bs-tab-float">
              <div class="bs-tab-menu-wrapper fui-bcb lower" style="top: 30px; z-index: 8002;">
              <div class="bs-tab-menu-options">
                  <div class="bs-tab-menu-item nav-btn" data-type="closeAll"><span>关闭全部</span></div>
                  <div class="bs-tab-menu-item nav-btn" data-type="closeOther"><span>关闭其他标签</span></div>
              </div>
              <div class="bs-tab-menu-items"><!--下拉隐藏页签区域-->  </div>
              </div>
          </div>
          <div  class="bs-tab">
              <div class="bs-tab-btns">
              	  <div id="showFuncMenu" title="功能导航" style="position: relative;float: left;width: 40px;height: 30px;line-height: 30px;text-align: center;font-size: 24px;cursor: pointer;">
              	  <i class="bs-nav-ts bs-nav-more"></i></div>	
                  <div class="bs-tab-homepage select"><img src="butone/images/home.png" style="width:20px;height:20px;"/></div>
                  <ul class="bs-tab-names" style="width:300px"></ul>
                  <div class="bs-tab-more">
                      <i class="bs-nav-ts bs-nav-more"></i>
                  </div>
              </div>
          </div>
          <div id="bs-content-homepage">
	          <iframe id="homeFrame" name="homeFrame1" width="100%" height="100%"></iframe>
	          <!--widget区
               	<div id="thewidget-content">
					<div id="WidgetContent">
					<a id="forWidget-btn" href="#"></a>
					<ul id="presentRole"></ul>
					
					<div id="forWidget-container">
						<div id="forWidget-Link"></div>
						<table id="columns" cellspacing="0">
							<tbody>
								<tr>
									<td></td>
									<td></td>
									<td></td>
								</tr>
							</tbody>
						</table>
					</div>    
					</div>		    	
		    	</div>
			    -->  
          </div>  
          <!--功能内容区 --> 
          <div id="funcFrame" class="bs-tab-content"></div> 
        </div> 
      </div> 
      
      <!--下方区域-右侧边栏开始-->
      <div id="right-sidebar">                                   
         <div class="tabs">
             <ul class="effect">
               <li class="on"><a href="#tab-1">个人设置</a></li>
               <li class="page-set"><a href="#tab-3"></a></li>
             </ul>
        </div>
        <div style="clear:both"></div>	
        <!--右侧边栏-内容开始-->
        <div class="tab-content">
              <div id="tab-1" class="tabs-item active">
                 <div id="reset_pwd">        	  				    
					    <ul class="effect3">
					      <li class="row"><span>旧密码</span><input class="oldpwd" type="text"  autocomplete="off" /></li>
					      <li class="row"><span>新密码</span><input class="pwd" type="password"  autocomplete="new-password" /><span class="newPwd"></span></li>
					      <li class="row"><span>确认密码</span><input class="pwd2" type="password" autocomplete="new-password"   /><span class="newPwd effect2"></span></li>
					      <li class="row btnBar">								
					        <a href="javascript:;" class="saveBtn" style="background:#59adeb;color:#fff;" >确  认</a>
					        <a href="javascript:;" class="cancelBtn" style="background: #fff;color:#333;border: 1px solid #ccc;">取  消</a>
					        <a class="message"></a>
					      </li>
					      <li class="right"></li>
					    </ul>
			     </div>		
	          </div>	         
	         <!--右侧边栏-其他设置
	         <div id="tab-3" class="tabs-item">
	        	<div id="setSys">
	        		<ul class="tb-sysset">
	        			<li class="other-set"><span class="l">其他设置</span><span class="other-change"></span></li>
	        			<li><span class="l">待办提醒</span><a data-id="schedule" data-name="待办提醒" href="###"><span class="r off bs-nav-ts"></span></a></li>
	        			<li><span class="l">收藏</span><a data-id="collect" data-name="收藏" href="###"><span class="r off bs-nav-ts"></span></a></li>
	        			<li><span class="l">帮助</span><a data-id="help" data-name="帮助" href="###"><span class="r off bs-nav-ts"></span></a></li>
	        			<li><span class="l">全屏</span><a data-id="full" data-name="全屏" href="###"><span class="r off bs-nav-ts"></span></a></li>
	        			<li><span class="l">部门信息</span><a data-id="bmxx" data-name="部门信息" href="###"><span class="r off bs-nav-ts"></span></a></li>
	        			<li><span class="l">代理</span><a data-id="agentlist" data-name="代理" href="###"><span class="r off bs-nav-ts"></span></a></li>
	        		</ul>
	        	</div>
	        	<div class="loading">
	        		<img src="butone/images/index/ajax-loader.gif"/>
	        	</div>
	         </div>-->
        </div>
      </div>

    </xui:layout> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" href="index.css"/> 
    <xhtml:link rel="stylesheet" type="text/css" href="butone/css/widget.css"/>   
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/system_X/icons/system.page.css"></xhtml:link>
    <xhtml:script type="text/javascript" src="lib/md5.js"/>  
    <xhtml:script type="text/javascript" src="lib/jquery.cookie.js"/>  
    <xhtml:script type="text/javascript" src="/form/justep/showMessage.js"/>  
    <xhtml:script type="text/javascript" src="lib/api.js"/>  
    <xhtml:script type="text/javascript" src="lib/jquery-ui-1.8.18.custom.min.js"/>  
    <xhtml:script type="text/javascript" src="lib/jquery.autocomplete.js"/>  
    <xhtml:script type="text/javascript" src="lib/jquery.iframe.js"/>  
    <xhtml:script type="text/javascript" src="lib/jscrollpane/jquery.jscrollpane.js"/>  
    <xhtml:script type="text/javascript" src="lib/layer/layer.js"/>
    <xhtml:script type="text/javascript" src="lib/util.js"/>  
    <xhtml:script type="text/javascript" src="lib/eventable.js"/>  
    <xhtml:script type="text/javascript" src="lib/jquery.isloading.js"/>  
    <xhtml:script type="text/javascript" src="lib/multiMenu/js/accordion.js"/>  
    <xhtml:script type="text/javascript" src="butone/js/all.js"/>  
    <xhtml:script type="text/javascript" src="lib/slimscroll/jquery.slimscroll.js"/>
    <xhtml:script type="text/javascript" src="lib/TableLayout.js"/> 
	<!--  开启GDCA签名字段获取证书-->
<!--    <xhtml:script type="text/javascript" src="/UI/base/gdca/GDCASecure.js"/>-->
    <xhtml:script type="text/javascript"><![CDATA[
        
		var _config = ${config};
		_config.isSearch = '';
		var _title_en = '${title_en}';
		var _logoType = '${0}';
	]]></xhtml:script> 
	<xhtml:script type="text/javascript" src="index.js"/>  
  </xui:resource> 
</xui:window>
