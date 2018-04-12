<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:349px;height:auto;top:99px;"/>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="300px" mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;" resizable="false" has-drag-bar="true" has-arrow-button="false">
   <xhtml:div region="left" id="div1"><xui:place control="fileView" id="controlPlace1" style="height:100%;width:100%;overflow-y:auto;"></xui:place></xhtml:div>
   <xhtml:div region="right" id="div2"><xui:place control="fileOnlineView" id="controlPlace2" style="height:100%;width:100%;"></xui:place></xhtml:div></xhtml:div></xui:layout>  
    <xui:view auto-load="true" id="fileView" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1">
    <xui:place control="windowReceiver" id="controlPlace3" style="position:absolute;top:113px;left:231px;"></xui:place>
  <xui:place control="trigger1" id="controlPlace4" style="position:absolute;left:44px;top:40px;height:25px;"></xui:place></layout> 
   <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver" onReceive="filesBrowse.windowReceiverReceive"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1">
   <xforms:label id="default1">trigger</xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[filesBrowse.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xui:view auto-load="true" id="fileOnlineView" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2">
    <xui:place control="windowFrame" id="controlPlace6" style="height:100%;width:100%;position:absolute;"></xui:place></layout> 
   <xhtml:div component="/UI/system/components/windowFrame.xbl.xml#windowFrame" id="windowFrame"></xhtml:div></xui:view></xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="filesBrowse.js"/>
    <xhtml:script id="htmlScript3" src="/UI/system/service/doc/docUtil.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/system/service/doc/docUtil2.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="filesBrowse.css"/>
  <xhtml:script id="htmlScript4" src="/UI/base/core/components/materialUser/jquery.rotate.min.js"></xhtml:script>
  <xhtml:script id="htmlScript5"></xhtml:script></xui:resource> 
</xui:window>
