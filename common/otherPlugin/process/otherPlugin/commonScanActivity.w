<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1"></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xui:place control="view" id="controlPlace4" style="height:100%;width:100%;"></xui:place></center>
  <right size="126px" id="borderLayout-right1"><xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></right></xhtml:div>
  <xui:place control="windowReceiver1" id="controlPlace2" style="position:absolute;top:484px;left:138px;"></xui:place></xui:layout> 
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xui:place control="btnUpload" id="controlPlace6" style="top:30px;position:absolute;left:17px;width:96px;height:31px;"></xui:place>
  <xui:place control="btnCancel" id="controlPlace7" style="top:87px;position:absolute;left:17px;height:33px;width:95px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnUpload" class="button-blue">
   <xforms:label id="default4"><![CDATA[上传]]></xforms:label>
   <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[commonScanActivity.btnUploadClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancel" class="button-blue">
   <xforms:label id="default5"><![CDATA[关闭]]></xforms:label>
   <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[commonScanActivity.btnCancelClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="commonScanActivity.windowReceiver1Receive"></xhtml:div>
  <xui:view auto-load="true" id="view" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2">
    </layout> 
   </xui:view></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="commonScanActivity.js"></xhtml:script>
  <xhtml:script id="htmlScript2" src="/UI/base/lib/jquery-1.11.1/jquery-1.11.1.min.js"></xhtml:script>
  <xhtml:script id="htmlScript3" src="/UI/base/core/template/butoneExtend.js"></xhtml:script></xui:resource> 
</xui:window>
