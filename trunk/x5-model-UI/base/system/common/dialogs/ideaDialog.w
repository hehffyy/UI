<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="top:255px;left:150px;height:auto;"><data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="idea" src="" auto-load="false" id="data1" store-type="simple"></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xui:place control="textarea2" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center>
  <right size="105px" id="borderLayout-right1"><xui:place control="view1" id="controlPlace2" style="height:100%;width:100%;"></xui:place></right></xhtml:div>
  <xui:place control="windowReceiver1" id="controlPlace5" style="position:absolute;top:356px;left:204px;"></xui:place></xui:layout> 
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xui:place control="trgOK" id="controlPlace3" style="position:absolute;top:27px;width:90px;left:7px;"></xui:place>
  <xui:place control="trgCancel" id="controlPlace4" style="position:absolute;width:89px;top:73px;left:7px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgOK" icon-class="icon-system-ok" appearance="image-text" class="button-blue">
   <xforms:label id="default1"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[ideaDialog.trgOKClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgCancel" icon-class="icon-system-cancel" class="button-blue" appearance="image-text">
   <xforms:label id="default2"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[ideaDialog.trgCancelClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="ideaDialog.windowReceiver1Receive"></xhtml:div>
  <xforms:textarea ref="data('data1')/idea" id="textarea2"></xforms:textarea></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="ideaDialog.js"></xhtml:script></xui:resource> 
</xui:window>
