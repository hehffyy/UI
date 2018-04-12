<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;left:223px;top:153px;"><data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="param" src="" auto-load="false" id="data1" auto-new="true" store-type="simple"><rows xmlns="" id="default1">
   <row id="default2">
    <cell id="default3"></cell>
    <cell id="default4"></cell></row> </rows></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xui:place control="textarea1" id="controlPlace3" style="height:100%;width:100%;"></xui:place></center>
  <bottom size="50px" id="borderLayout-bottom1"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="float:right;padding-right:15px;"><xui:place control="trg_ensure" id="controlPlace1"></xui:place>
  <xui:place control="trg_cancel" id="controlPlace2"></xui:place></xhtml:div></bottom>
  <top size="50px" id="borderLayout-top2"><xui:place control="topView" id="controlPlace4" style="height:100%;width:100%;"></xui:place></top>
  <left size="15px" id="borderLayout-left1"></left>
  <right size="15px" id="borderLayout-right1"></right></xhtml:div>
  <xui:place control="windowReceiver1" id="controlPlace5" style="position:absolute;top:87px;left:240px;"></xui:place></xui:layout> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_ensure" appearance="image-text" class="button-green" icon-class="icon-system-ok">
   <xforms:label id="default5"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[processParmAdd.trg_ensureClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_cancel" appearance="image-text" icon-class="icon-system-cancel">
   <xforms:label id="default6"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[processParmAdd.trg_cancelClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:textarea ref="data('data1')/param" id="textarea1"></xforms:textarea>
  <xui:view auto-load="true" id="topView" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:label id="label2" style="position:absolute;color:red;left:20px;font-size:24px;top:10px;" class="xui-label"><![CDATA[案例：a=1&b=2]]></xhtml:label></layout></xui:view>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="processParmAdd.windowReceiver1Receive"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="processParmAdd.js"></xhtml:script></xui:resource> 
</xui:window>
