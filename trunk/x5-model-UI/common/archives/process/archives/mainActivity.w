<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model"><xforms:action id="action1" ev:event="xbl-loaded"><xforms:script id="xformsScript1"><![CDATA[mainActivity.modelXBLLoaded(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xui:place control="windowFrame" id="controlPlace1" style="height:100%;width:100%;"></xui:place></xui:layout> 
  <xhtml:div component="/UI/system/components/windowFrame.xbl.xml#windowFrame" id="windowFrame" process="/common/archives/process/archives/archivesProcess" activity="mainActivity"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="mainActivity.js"></xhtml:script></xui:resource> 
</xui:window>
