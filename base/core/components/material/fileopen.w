<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1"><xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[fileopen.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xui:place control="view1" id="controlPlace1" style="width:799px;height:570px;"></xui:place></xui:layout> 
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1" style="position:absolute;height:100%;width:100%;top:10px;left:10px;" class="xui-tabPanel">
   <xui:tab id="tabPage1">
    <xui:label id="xuiLabel1"><![CDATA[文件内容]]></xui:label>
         <xhtml:iframe id="_detail-data-frame_" name="_detail-data-frame_" src="about:blank" frameborder="no" style="width: 100%; height: 100%"/> 
    </xui:tab> 
   </xhtml:div>
  <xui:place control="windowReceiver1" id="controlPlace2" style="position:absolute;top:104px;left:180px;"></xui:place></layout>

  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="fileopen.windowReceiver1Receive"></xhtml:div></xui:view></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="fileopen.js"></xhtml:script>
  <xhtml:script id="htmlScript2" src="/UI/system/service/doc/docUtil.js"></xhtml:script>
  <xhtml:script id="htmlScript5"></xhtml:script>
  <xhtml:script id="htmlScript6" src="/UI/system/service/doc/docUtil2.js"></xhtml:script></xui:resource> 
</xui:window>
