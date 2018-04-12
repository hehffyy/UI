<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model1"/>  
  <xui:view id="rootView"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
    	<xhtml:h1>Portal API Test</xhtml:h1>
    	<xhtml:input type="button" value="门户退出" onclick="justep.Portal.logout();"></xhtml:input>
    </xui:layout> 
  </xui:view>  
  <xui:resource id="resource1"/> 
</xui:window>
