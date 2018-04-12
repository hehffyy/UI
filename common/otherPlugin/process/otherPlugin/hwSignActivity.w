<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1"><xforms:action id="action1" ev:event="xbl-loaded"><xforms:script id="xformsScript1"><![CDATA[hwSignActivity.model1XBLLoaded(event)]]></xforms:script></xforms:action>
  <xforms:action id="action2" ev:event="onunload"><xforms:script id="xformsScript2"><![CDATA[hwSignActivity.model1UnLoad(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xui:place control="viewSign" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center>
  <right size="157px" id="borderLayout-right1"><xui:place control="view2" id="controlPlace3" style="height:100%;width:100%;"></xui:place></right></xhtml:div></xui:layout> 
  <xui:view auto-load="true" id="viewSign" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xui:place control="windowReceiver1" id="controlPlace2" style="position:absolute;top:249px;left:214px;"></xui:place></layout>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="hwSignActivity.windowReceiver1Receive"></xhtml:div></xui:view>
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xui:place control="btnClear" id="controlPlace4" style="position:absolute;top:27px;left:41px;width:91px;"></xui:place>
  <xui:place control="btnSave" id="controlPlace8" style="position:absolute;top:105px;left:41px;width:90px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnClear" appearance="image-text" icon-class="icon-system-cancel">
   <xforms:label id="default2"><![CDATA[清除签名]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[hwSignActivity.btnClearClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSave" appearance="image-text" icon-class="icon-system-check">
   <xforms:label id="default6"><![CDATA[保存签名]]></xforms:label>
  <xforms:action id="action7" ev:event="DOMActivate"><xforms:script id="xformsScript7"><![CDATA[hwSignActivity.btnSaveClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="hwSignActivity.js"></xhtml:script></xui:resource> 
</xui:window>
