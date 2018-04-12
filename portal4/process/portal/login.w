<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" sys-param="false">
  <xui:inhead>
  	<xhtml:title>${title_zh}</xhtml:title>
  </xui:inhead>
  <xui:view id="rootView" auto-load="true"  class="login-page"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
          <div class="main" >
	    <div class="main-bg">
			<div class="bg-child">
				<div class="bg-blue">
					<div class="bg-blue-2"></div>
				</div>
			</div>	
	    </div>
        <div class="container">
                <div class="header">
		            <div class="header-logo"></div>
		            <div class="header-title-container">
		                <div class="title-zh"><h1>${title_zh}</h1></div>
		                <div class="title-en"><h3></h3></div>
		            </div>
                    <ul class="header-nav ">
                          <li class="r">						
                          </li>
                          <li class="r">
                            <a href="http://www.baidu.com" class="nav-info"></a>
                         </li><!--
                         <li class="r">							
                            <a href="../../../helpFiles/help.html" class="nav-recommend">帮助</a>
                         </li>
                    --></ul>
		        </div>
            <div class="content">
                <div class="msg-wrap"><div class="msg-error"><p><i></i></p><span class="txt"></span></div></div>
                <div id="login-form" class="login-form container-login page-form">
                    <ul>
                        <li class="user">
                            <input name="username" type="text" placeholder="用户名"/>
							<span class="clear-btn"></span>
						</li>
                        <li class="pwd">
                            <input name="password" type="password" placeholder="密码" autocomplete="off"/>
                        </li>
                        <li class="vcode">
                            <input name="vcode" type="text" autocomplete="off"/>
                            <img id="captcha_img" alt="点击更换" title="点击更换" src="/UI/portal4/process/portal/ValidateCode.j" 
                            style="display: inline-block; vertical-align: middle;" onclick="javascript:reloadVerifyCode();" class="m"/>  
                        </li>
						<li class="remember">
                        	<input id="pity" name="remember" type="checkbox"/>
                            <label for="pity">记住用户名</label>
                         </li>
                        <li class="login-btn">
                            <a id="login-btn" href="javascript:void(0);">登&#160;&#160;录</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="footer">
               <span class="copyright">Copyright© 2017</span>
            </div>
        </div>
    </div>
    </xui:layout> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" href="butone/css/login.css"/>  
  	<xhtml:script type="text/javascript" src="butone/js/jquery-1.8.3.min.js"/>
    <xhtml:script type="text/javascript" src="lib/md5.js"/>  
    <xhtml:script type="text/javascript" src="lib/jquery.cookie.js"/>  
    <xhtml:script type="text/javascript" src="lib/eventable.js"/>  
	<!--  开启GDCA必须在login.js前-->
<!--	<xhtml:script type="text/javascript" src="/UI/base/gdca/GDCASecure.js"/>-->
	
    <xhtml:script type="text/javascript" src="butone/js/login.js"/>
    <xhtml:script type="text/javascript"><![CDATA[
    	var _config = {
    		license: ${license},
    		appName : ${appName}
    	};
    	function reloadVerifyCode(){  
            var timenow = new Date().getTime();                          
            document.getElementById("captcha_img").src=justep.Request.convertURL("/UI/portal4/process/portal/ValidateCode.j?d="+timenow,true);  
        }  
    ]]></xhtml:script> 
  </xui:resource> 
</xui:window>
