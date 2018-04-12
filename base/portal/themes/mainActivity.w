<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model1" style="top:113px;height:auto;left:166px;"> 
    <xforms:action id="action1" ev:event="onload">
      <xforms:script id="xformsScript1"><![CDATA[mainActivity.modelLoad(event)]]></xforms:script>
    </xforms:action>
  </xforms:model>  
  <xui:view id="rootView"> 
  <div id="page-sidebar">   
        <div class="tabs">
             <ul class="effect">
               <li class="on"><a href="###" data-href="#tab-1">主题选择</a></li>
               <li><a href="###" data-href="#tab-2">系统设置</a></li>
               <li><a href="###" data-href="#tab-3">数据配置</a></li>
             </ul>
        </div>
  </div>
     <!--内容开始-->
    <div class="tab-content">
              <div id="tab-1" class="tabs-item active">
                 <div id="reset_theme">        	  				    
					 主题列表:
					 <ul  class="theme-list clearfix"></ul>
					 <div class="start-list"><button id="startTheme">初始化主题列表</button></div>
			     </div>		
	          </div>	   
	          <div id="tab-2" class="tabs-item">
                 <div id="title-seting">    
                    <ul>
                        <li><span>平台名称（中文）</span><input name="chinese" placeholder="请输入中文" autocomplete="off"/></li>
                        <li><span>平台名称（英文）</span><input name="english" placeholder="请输入英文" autocomplete="off"/>（可选）</li>
                    </ul>    	  				    
			     </div>	
			     <div id="sys_seting">        	  				    
						<h2>Logo样式:</h2>
						<div id="logo-title">
						   <div class="tabs clearfix">
							   <ul>
								   <li><a href="javascrpt:;"><input id="tw" name="logoStyle" checked="checked" type="radio" value="lt_1"/><label for="tw">图标+文字</label></a></li>
								   <li><a href="javascrpt:;"><input id="bt" name="logoStyle" type="radio" value="lt_2"/><label for="bt">仅使用标题</label></a></li>
								   <li><a href="javascrpt:;"><input id="tp" name="logoStyle" type="radio"  value="lt_3"/><label for="tp">仅使用图片</label></a></li>
							   </ul>
						   </div>
						   <div class="logo-content clearfix">
							    <div class="header-logo"> 
					              <div class="logo"><img src="/x5/UI/base/portal/themes/images/logo01.png"></img></div>  
					              <div class="title-container"> 
					                <div class="title-zh">后台管理系统(测试版)V-1.0</div>  
					                <div class="title-en">Zhongshan city land planning management system (beta) V-1.0</div> 
					              </div> 
					            </div>
						   </div>
						</div>    	
				  </div>
			     <div id="func-setting">    
			       <h2>菜单图标（ICON）: </h2>
				   <div class="sys-menu-box">
						<div id="menu-list"><ul class="leftlist"></ul></div>	  
						<div id="icon-list"><ul class="rightlist"></ul></div>	 
					    <button id="saveData">保存</button>	
					</div>	
			     </div>	
	          </div>
	          <div id="tab-3" class="tabs-item">
			     
						<div id="setSys">
							<ul class="tb-sysset">
								<li class="other-set"><span class="other-change"></span></li>
								<li><span class="l">消息通知</span><a data-id="schedule" data-name="待办提醒" href="###"><span class="r off bs-nav-ts"></span></a></li>
								<!--<li><span class="l">收藏</span><a data-id="collect" data-name="收藏" href="###"><span class="r off bs-nav-ts"></span></a></li>-->
								<li><span class="l">帮助</span><a data-id="help" data-name="帮助" href="###"><span class="r off bs-nav-ts"></span></a></li>
								<li><span class="l">全屏</span><a data-id="full" data-name="全屏" href="###"><span class="r off bs-nav-ts"></span></a></li>
								<!--<li><span class="l">部门信息</span><a data-id="bmxx" data-name="部门信息" href="###"><span class="r off bs-nav-ts"></span></a></li>-->
								<li><span class="l">代理</span><a data-id="agentlist" data-name="代理" href="###"><span class="r off bs-nav-ts"></span></a></li>
							</ul>
							<button id="saveIconData">保存</button>	
						</div>
						<div class="loading">
							<span></span>
						</div>
						
					 			
	          </div>	
	          <div class="d-message"></div>
	</div>
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript2" src="mainActivity.js"/>
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="mainActivity.css"></xhtml:link>
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink2" href="/UI/system/icons/system.page.css"></xhtml:link></xui:resource> 
</xui:window>
