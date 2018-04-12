<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1">
    <xforms:action id="action1" ev:event="onload">
      <xforms:script id="xformsScript1"><![CDATA[camaraForm.model1Load(event)]]></xforms:script>
    </xforms:action>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1">
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="50%" mode="horz" id="HSplitter3" class="xui-splitter" style="height:100%;width:100%;">
   <xhtml:div region="left" id="div8">
  <xhtml:label id="label3" class="xui-label"><![CDATA[摄像头区域：]]></xhtml:label><xhtml:div id="webcam" class="xui-container" style="width:98%;"></xhtml:div></xhtml:div>
   <xhtml:div region="right" id="div9">
  <xhtml:label id="label4" class="xui-label"><![CDATA[拍摄图片：]]></xhtml:label>
  <xhtml:div id="div11" class="xui-container" style="height:0px;"></xhtml:div><xhtml:img src="/UI/base/icons/img/noimage.jpg" alt="" id="img"></xhtml:img></xhtml:div></xhtml:div></center>  
        <right size="137px" id="borderLayout-right1">
          <xui:place control="view2" id="controlPlace5" style="height:100%;width:100%;"></xui:place></right>
      <left size="15px" id="borderLayout-left1"></left></xhtml:div>
    <xui:place control="windowReceiver" id="controlPlace2" style="position:absolute;top:253px;left:260px;"></xui:place></xui:layout>  
    <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xui:place control="btnCamara" id="controlPlace6" style="position:absolute;top:30px;width:85px;left:30px;"></xui:place>
  <xui:place control="btnOk" id="controlPlace7" style="position:absolute;top:87px;width:83px;left:30px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCamara" class="button-blue">
   <xforms:label id="default4"><![CDATA[拍照]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[camaraForm.btnCamaraClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnOk" class="button-blue">
   <xforms:label id="default5"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[camaraForm.btnOkClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver" onReceive="camaraForm.windowReceiverReceive"></xhtml:div></xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="/UI/base/lib/jquery-ui-1.7.1/jquery-1.3.2.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/system/scan/js/jquery.webcam.min.js"/>  
    <xhtml:script id="htmlScript3" src="camaraForm.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="camaraForm.css"/>
  <xhtml:script id="htmlScript4" src="/UI/base/lib/butoneExUtils.js"></xhtml:script></xui:resource> 
</xui:window>
