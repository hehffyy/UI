<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xhtml="http://www.w3.org/1999/xhtml">  
  <xforms:model id="model1"><xforms:action id="action3" ev:event="xforms-model-construct-done"><xforms:script id="xformsScript3"><![CDATA[mainActivity.model1ModelConstructDone(event)]]></xforms:script></xforms:action>
  <data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="codeValue" src="" auto-load="false" id="data1" store-type="simple" auto-new="true"></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;position:relative;" id="rootLayout" type="absolute"><xui:place control="trigger1" id="controlPlace2" style="position:absolute;top:87px;left:276px;"></xui:place>
  <xui:place control="trigger2" id="controlPlace3" style="position:absolute;top:128px;left:281px;"></xui:place>
  <xui:place control="input1" id="controlPlace1" style="position:absolute;top:88px;left:96px;"></xui:place></xui:layout> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1">
   <xforms:label id="default1"><![CDATA[预览]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[mainActivity.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2">
   <xforms:label id="default2"><![CDATA[生成]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[mainActivity.trigger2Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:input id="input1" ref="data('data1')/codeValue"></xforms:input></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="mainActivity.js"></xhtml:script></xui:resource> 
</xui:window>
