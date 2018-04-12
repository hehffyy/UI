<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" sys-param="false">
  <xui:inhead>
  	<xhtml:title>${title_zh}</xhtml:title>
  	<xhtml:style type="text/css">
			html,body{
      			margin:0;
      			padding:0;
      			height:100%;
      			border:none
   			}
			.lable {font-size: 12px}
			.caption {font-size: 12px;font-weight: bold;}
			
			.remember_div{}
			.remember_div input{display:block; float:left; margin-right:4px;}
			.remember_div span{display:block; float:left; margin-right:8px; height:20px; line-height:20px; *line-height:22px;}

		</xhtml:style>
  </xui:inhead>
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
    <div id="mainBody">
      <div id="cloud1" class="cloud1"></div>
      <div id="cloud2" class="cloud2"></div>
    </div>
	  <div style="height:80px"/> 
      <div id="main"> 
        <div class="head"></div>  
        <div id="login-form" class="login">
        </div>
          
        <div id="setting"> 
        <div style="padding:10px 10px 10px 100px"> 
        <span style="color: #6f7278;">
              <input style="margin-top:2px;margin-right: 10px;" id="remember_checkbox" type="checkbox" name="remember"/>记住用户名
            </span> 
        <span class = "message"><span id="hint_lable" class="lable"></span></span>
         </div> 
          <div class="inner"> 
           <span> <a id="login_button" name="login_button" class="loginBtn" href="javascript:void(0)">登&#160;&#160;&#160;&#160;录</a> </span> 
            </div>
        </div> 
        </div>  
    </xui:layout> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" href="butone/css/login.css"/>  
    <xhtml:script type="text/javascript" src="lib/md5.js"/>  
    <!--在window组件中已经有了base.js 
    <xhtml:script type="text/javascript" src="/base/base.js"/>
     -->  
    <xhtml:script type="text/javascript" src="lib/jquery.cookie.js"/>  
    <xhtml:script type="text/javascript" src="lib/eventable.js"/>  
    <xhtml:script type="text/javascript" src="butone/js/login-c.js"/>  
    <xhtml:script type="text/javascript" src="butone/js/login.js"/>
    <xhtml:script type="text/javascript" src="butone/js/cloud.js"/>
    <xhtml:script type="text/javascript"><![CDATA[
    	var _config = {
    		license: ${license},
    		appName : ${appName}
    	};
    ]]></xhtml:script> 
  </xui:resource> 
</xui:window>
