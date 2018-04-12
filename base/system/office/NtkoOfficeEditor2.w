<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="NtkoOfficeEditor" style="height:auto;left:122px;top:129px;"> 
    <xforms:action id="action2" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript2"><![CDATA[NtkoOfficeEditor.NtkoOfficeViewModelConstruct(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view auto-load="true" id="rootView" class="xui-container"> 
    <layout type="flow" style="width:100%;height:100%;position:relative;" id="layout1"> 
      <xui:place control="windowReceiver1" id="controlPlace1" style="left:133px;top:95px;"/>  
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1">
          <xhtml:div id="div2" class="xui-container" style="position:absolute;width:100%;height:100%;left:0px;top:2px;"> 
            <xhtml:script src="ntkoofficecontrol.js" id="htmlScript4"/>
          </xhtml:div>
        </center>
      <top size="34px" id="borderLayout-top1"><xui:place control="view4" id="controlPlace12" style="width:100%;height:100%;  border-left: 12px solid #4F9CEE;"></xui:place></top></xhtml:div>
    <xui:place control="dlgHistory" id="controlPlace5" style="position:absolute;top:290px;left:170px;"></xui:place>
  <xui:place control="windowRunner1" id="controlPlace4" style="position:absolute;left:573px;top:416px;"></xui:place></layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="NtkoOfficeEditor.windowReceiver1Receive"/> 
  <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="版本记录" width="700px" height="400px" modal="true" id="dlgHistory" url="/UI/common/officeTemplate/process/template/officeHistory.w" process="/common/officeTemplate/process/template/templateProcess" activity="mainActivity" onSend="NtkoOfficeEditor.dlgHistorySend"></xhtml:div>
  <xui:view auto-load="true" id="view4" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout5">
    <xhtml:label id="label1" style="position:absolute;font-family:微软雅黑;font-size:18px;font-weight:bold;top:6px;left:16px;" class="xui-label"><![CDATA[文稿信息]]></xhtml:label>
  <xui:place control="view1" id="controlPlace2" style="position:absolute;right:0px;height:38px;top:0;width:436px;"></xui:place></layout> 
   <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xui:place control="btnCheckOut" id="controlPlace10" style="width:97px;position:absolute;left:44px;top:5px;"></xui:place>
  <xui:place control="btnSave" id="controlPlace9" style="width:95px;position:absolute;top:5px;left:146px;"></xui:place>
  <xui:place control="btnHistory" id="controlPlace11" style="width:96px;position:absolute;top:5px;left:245px;"></xui:place>
  <xui:place control="btnMax" id="controlPlace3" style="width:97px;top:5px;position:absolute;left:346px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCheckOut" appearance="image-text" class="button-blue" icon-class="icon-system-up">
   <xforms:label id="default5">启动编辑</xforms:label>
   <xforms:action id="action6" ev:event="DOMActivate">
    <xforms:script id="xformsScript6">NtkoOfficeEditor.btnCheckOutClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSave" appearance="image-text" class="button-blue" icon-class="icon-system-down">
   <xforms:label id="default4">签  入</xforms:label>
   <xforms:action id="action7" ev:event="DOMActivate">
    <xforms:script id="xformsScript3">NtkoOfficeEditor.btnSaveClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnHistory" appearance="image-text" class="button-blue" icon-class="icon-system-down">
   <xforms:label id="default6">历史版本</xforms:label>
   <xforms:action id="action3" ev:event="DOMActivate">
    <xforms:script id="xformsScript7">NtkoOfficeEditor.btnHistoryClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnMax" appearance="image-text" class="button-blue" icon-class="icon-system-windows">
   <xforms:label id="default1"><![CDATA[全屏]]></xforms:label>
   <xforms:action id="action1" ev:event="DOMActivate">
    <xforms:script id="xformsScript1"><![CDATA[NtkoOfficeEditor.btnMaxClick(event)]]></xforms:script></xforms:action> </xforms:trigger></xui:view></xui:view>
  <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner" id="windowRunner1"></xhtml:div></xui:view>  
  <xui:resource> 
    <xhtml:link rel="STYLESHEET" type="text/css" href="/form/dhtmlx/dhtmlxWindows/dhtmlxwindows.css"/>  
    <xhtml:link rel="STYLESHEET" type="text/css" href="/form/dhtmlx/dhtmlxWindows/skins/dhtmlxwindows_dhx_blue.css"/>  
    <xhtml:script id="htmlScript1" src="NtkoOfficeEditor.js"/>  
    <xhtml:script id="htmlScript3" src="/UI/base/lib/jquery-ui-1.7.1/jquery-1.3.2.js"/> 
  <xhtml:script id="htmlScript2" src="/UI/base/lib/butoneExUtils.js"></xhtml:script></xui:resource> 
<resource id="resource1"><xhtml:script id="htmlScript5" src="NtkoOfficeEditor2.js"></xhtml:script></resource></xui:window>
