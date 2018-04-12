<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" sys-param="false">  
  <xui:inhead> 
    <xhtml:title>广州省国土资源厅电子政务系统</xhtml:title>  
    <xhtml:style type="text/css">html,body{ margin:0; padding:0; height:100%; border:none } .lable {font-size: 12px} .caption {font-size: 12px;font-weight: bold;} .remember_div{} .remember_div input{display:block; float:left; margin-right:4px;} .remember_div span{display:block; float:left; margin-right:8px; height:20px; line-height:20px; *line-height:22px;}</xhtml:style> 
  </xui:inhead>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <div id="mainBody"> 
        <div id="cloud1" class="cloud1"/>  
        <div id="cloud2" class="cloud2"/> 
      </div>  
      <div style="height:80px"/>  
      <div id="main"> 
        <div class="head"/>  
        <div id="login-form" class="login"/>  
        <div id="setting"> 
          <div style="padding:10px 100px 10px 0px"> 
            <span style="float: right;color: #6f7278;"> 
              <input style="margin-top:2px;" id="remember_checkbox" type="checkbox"
                name="remember"/>记住用户名
            </span>  
            <div class="message"> 
              <span id="hint_lable" class="lable"/> 
            </div> 
          </div>  
          <div class="inner"> 
            <span> 
              <a id="login_button" name="login_button" class="loginBtn" href="javascript:void(0)">登    录</a> 
            </span> 
          </div> 
        </div> 
      </div> 
    </xui:layout> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" href="butone/css/login.css"/>  
    <xhtml:script type="text/javascript" src="lib/md5.js"/>  
    <xhtml:script type="text/javascript" src="lib/jquery.cookie.js"/>  
    <xhtml:script type="text/javascript" src="lib/eventable.js"/>  
    <xhtml:script type="text/javascript"><![CDATA[
    	var _config = {
    		license: ${license},
    		config: ${config}
    	};
    ]]></xhtml:script>  
    <xhtml:script type="text/javascript" src="butone/js/login-c.js"/>  
    <xhtml:script type="text/javascript" src="butone/js/login.js"/>  
    <xhtml:script type="text/javascript" src="butone/js/cloud.js"/> 
  </xui:resource> 
</xui:window>
