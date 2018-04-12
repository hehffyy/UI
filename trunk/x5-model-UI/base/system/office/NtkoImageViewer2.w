<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="NtkoOfficeView" style="height:auto;left:122px;top:129px;"> 
    </xforms:model>  
  <xui:view auto-load="true" id="rootView" class="xui-container"> 
    <layout type="flow" style="width:100%;position:relative;" id="layout1"> 
      <xui:place control="windowReceiver1" id="controlPlace1"/>  
      <xhtml:div id="div1" style="position:absolute;width:100%;left:0;height:100%;top:0;"
        class="xui-container"> 
        <xhtml:img src="about:blank" alt="" id="image1" style="width:100%;" hspace="100%" class="xui-no-border xui-autofill"></xhtml:img></xhtml:div> 
    </layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="NtkoImageViewer2.windowReceiver1Receive"/> 
  </xui:view>  
  <xui:resource> 
    </xui:resource>  
  <resource id="resource1">
    <xhtml:script id="htmlScript1" src="NtkoImageViewer2.js"></xhtml:script></resource>
</xui:window>
