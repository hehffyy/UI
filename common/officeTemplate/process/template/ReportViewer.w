<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="NtkoOfficeView" style="height:auto;left:122px;top:129px;"> 
    </xforms:model>  
  <xui:view auto-load="true" id="rootView" class="xui-container"> 
    <layout type="flow" style="width:100%;height:100%;position:relative;" id="layout1"> 
      <xui:place control="windowReceiver1" id="controlPlace1"/>  
      <xhtml:div id="div1" style="position:absolute;width:100%;height:100%;left:5px;top:5px;"
        class="xui-container"> 
        <xhtml:script src="/UI/base/system/office/ntkoofficecontrol.js"/> 
      </xhtml:div> 
    </layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="ReportViewer.windowReceiver1Receive"/> 
  </xui:view>  
  <xui:resource> 
    <xhtml:link rel="STYLESHEET" type="text/css" href="/form/dhtmlx/dhtmlxWindows/dhtmlxwindows.css"/>  
    <xhtml:link rel="STYLESHEET" type="text/css" href="/form/dhtmlx/dhtmlxWindows/skins/dhtmlxwindows_dhx_blue.css"/>  
    <xhtml:script id="htmlScript1" src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script id="htmlScript1" src="ReportViewer.js"/>  
    <xhtml:script id="htmlScript3" src="/UI/base/lib/jquery-ui-1.7.1/jquery-1.3.2.js"/>  
    </xui:resource> 
</xui:window>
