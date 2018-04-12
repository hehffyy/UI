<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model" style="height:auto;left:122px;top:129px;"> 
    <xforms:action id="action3" ev:event="xforms-model-construct-done"><xforms:script id="xformsScript3"><![CDATA[CadViewer.modelModelConstructDone(event)]]></xforms:script></xforms:action>
  <xforms:action id="action5" ev:event="onload"><xforms:script id="xformsScript5"><![CDATA[CadViewer.modelLoad(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view auto-load="true" id="rootView" class="xui-container"> 
    <layout type="flow" style="width:100%;height:100%;position:relative;" id="layout1"> 
      <xui:place control="windowReceiver1" id="controlPlace1"/>  
      </layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1"/> 
  </xui:view>  
  <xui:resource> 
    <xhtml:script src="/UI/system/service/doc/docUtil2.js"/>  
    <xhtml:script src="/UI/base/lib/ajaxfileupload.js"/>  
    <xhtml:script id="htmlScript1" src="CadViewer.js"/>  
    </xui:resource> 
</xui:window>