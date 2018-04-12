<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="mode" style="top:23px;left:154px;height:auto;"> 
    <xforms:action id="action1" ev:event="onload"> 
      <xforms:script id="xformsScript1"><![CDATA[cadViewActivity.modeLoad(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action3" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript3"><![CDATA[cadViewActivity.modeXBLLoaded(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xui:place control="windowReceiver1" id="controlPlace2" style="position:absolute;top:220px;left:182px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="cadViewActivity.windowReceiver1Receive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="/UI/base/lib/jquery-1.11.1/jquery-1.11.1.min.js"/>  
    <xhtml:script id="htmlScript2" src="cadViewActivity.js"/>  
    <xhtml:script id="htmlScript3" src="/UI/system/service/doc/docUtil2.js"/> 
  </xui:resource> 
</xui:window>
