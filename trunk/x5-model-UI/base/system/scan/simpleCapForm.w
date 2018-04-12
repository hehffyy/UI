<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:527px;height:auto;top:202px;">
    <xforms:action id="action3" ev:event="xbl-loaded"><xforms:script id="xformsScript3"><![CDATA[simpleCapForm.model1XBLLoaded(event)]]></xforms:script></xforms:action>
  <xforms:action id="action4" ev:event="onload"><xforms:script id="xformsScript4"><![CDATA[simpleCapForm.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1">
          <xui:place control="capView" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center>  
        <right size="113px" id="borderLayout-right1">
          <xui:place control="view2" id="controlPlace5" style="height:100%;width:100%;"></xui:place></right>
      <top size="43px" id="borderLayout-top1"><xui:place control="view1" id="controlPlace3" style="height:100%;width:100%;"></xui:place></top></xhtml:div>
    <xui:place control="windowReceiver" id="controlPlace2" style="position:absolute;top:253px;left:260px;"></xui:place></xui:layout>  
    <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xui:place control="btnCancel" id="controlPlace6" style="position:absolute;width:85px;top:77px;left:16px;"></xui:place>
  <xui:place control="btnOk" id="controlPlace7" style="position:absolute;width:83px;top:24px;left:16px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancel" class="button-blue">
   <xforms:label id="default4"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[simpleCapForm.btnCancelClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnOk" class="button-blue">
   <xforms:label id="default5"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[simpleCapForm.btnOkClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver" onReceive="simpleCapForm.windowReceiverReceive"></xhtml:div>
  <xui:view auto-load="true" id="capView" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"></layout></xui:view>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout3"><xhtml:label id="label1" style="position:absolute;top:9px;left:13px;" class="xui-label"><![CDATA[文件名称：]]></xhtml:label>
  <xhtml:input type="text" value="" id="inputFile" style="position:absolute;top:9px;left:103px;width:265px;" class="xui-input"></xhtml:input></layout></xui:view></xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="/UI/base/lib/jquery-ui-1.7.1/jquery-1.3.2.js"/>  
    <xhtml:script id="htmlScript4" src="/UI/base/lib/butoneExUtils.js"></xhtml:script>
  <xhtml:script id="htmlScript5" src="simpleCapForm.js"></xhtml:script>
  <xhtml:script id="htmlScript6" src="/UI/base/lib/jquery-ui-1.7.1/external/cookie/jquery.cookie.min.js"></xhtml:script></xui:resource> 
</xui:window>
