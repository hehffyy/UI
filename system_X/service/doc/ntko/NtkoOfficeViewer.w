<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model" style="height:auto;left:122px;top:129px;"> 
    <xforms:action id="action2" ev:event="onload">
      <xforms:script id="xformsScript2"><![CDATA[NtkoOfficeViewer.modelLoad(event)]]></xforms:script>
    </xforms:action>
  </xforms:model>  
  <xui:view auto-load="true" id="rootView" class="xui-container"> 
    <layout type="flow" style="width:100%;height:100%;position:relative;" id="layout1"> 
      <xui:place control="windowReceiver1" id="controlPlace1"/>  
      <xhtml:div id="div1" style="position:absolute;width:100%;left:0;height:100%;top:0;"
        class="xui-container"> 
        <xhtml:script src="/UI/base/system/office/ntko.js"/> 
      </xhtml:div> 
    </layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="NtkoOfficeViewer.windowReceiver1Receive"/> 
  </xui:view>  
  <xui:resource> 
    <xhtml:script src="/UI/system/service/doc/docUtil2.js"/>  
    <xhtml:script src="/UI/base/lib/ajaxfileupload.js"/>  
    <xhtml:script id="htmlScript1" src="NtkoOfficeViewer.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="NtkoOfficeViewer.css"/> 
  </xui:resource> 
</xui:window>
