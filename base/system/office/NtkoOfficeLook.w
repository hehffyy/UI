<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="NtkoOfficeEditor" style="height:auto;left:122px;top:129px;"> 
    <xforms:action id="action2" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript2"><![CDATA[NtkoOfficeLook.NtkoOfficeViewModelConstruct(event)]]></xforms:script> 
    </xforms:action> 
  <xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[NtkoOfficeLook.NtkoOfficeEditorLoad(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view auto-load="true" id="rootView" class="xui-container"> 
    <layout type="flow" style="width:100%;height:100%;position:relative;" id="layout1"> 
      <xui:place control="windowReceiver1" id="controlPlace1" style="left:133px;top:95px;"/>  
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1">
          <xhtml:div id="div2" class="xui-container" style="position:absolute;width:100%;height:100%;left:5px;top:5px;"> 
            <xhtml:script src="ntkoofficecontrol.js" id="htmlScript4"/>
          </xhtml:div>
        </center>
      </xhtml:div>
    </layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="NtkoOfficeLook.windowReceiver1Receive"/> 
  </xui:view>  
  <xui:resource> 
    <xhtml:link rel="STYLESHEET" type="text/css" href="/form/dhtmlx/dhtmlxWindows/dhtmlxwindows.css"/>  
    <xhtml:link rel="STYLESHEET" type="text/css" href="/form/dhtmlx/dhtmlxWindows/skins/dhtmlxwindows_dhx_blue.css"/>  
    <xhtml:script id="htmlScript1" src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script id="htmlScript1" src="NtkoOfficeLook.js"/>  
    <xhtml:script id="htmlScript3" src="/UI/base/lib/jquery-ui-1.7.1/jquery-1.3.2.js"/> 
  <xhtml:script id="htmlScript6" src="/UI/base/lib/butoneExUtils.js"></xhtml:script></xui:resource> 
</xui:window>
