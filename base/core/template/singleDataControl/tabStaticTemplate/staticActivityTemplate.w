<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="top:119px;height:auto;left:211px;"> 
    <xforms:action id="action2" ev:event="onload"> 
      <xforms:script id="xformsScript2"><![CDATA[staticActivityTemplate.modelLoad(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action5" ev:event="onunload"> 
      <xforms:script id="xformsScript5"><![CDATA[staticActivityTemplate.modelUnLoad(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="" src="" auto-load="false" id="controlData" store-type="simple" auto-new="true"/> 
  </xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout style="overflow:hidden;margin:0 auto;height:100%;width:99%;" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1"> 
          <xui:place control="formNav" id="controlPlace1" style="width:100%;"></xui:place></center> 
      </xhtml:div>  
      <xui:place control="funcReceiver" id="controlPlace6" style="position:absolute;top:184px;left:455px;"/>  
      <div id="panel_material" style="display:none;width:200px;position:absolute;left: 500px;top:100px;"/> 
       <div id="floatView" style="position:fixed"/> 
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnPrint"
      appearance="image-text" icon-class="icon-system-print"> 
      <xforms:label id="default1"><![CDATA[打印]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript3"><![CDATA[staticActivityTemplate.btnPrintClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver" onReceive="staticActivityTemplate.funcReceiverReceive"/> 
  <xui:view auto-load="true" id="formNav" class="xui-autofill xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"></layout></xui:view></xui:view>  
  <xui:resource id="resource"> 
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/core/template/singleDataControl/css/formNav.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/lib/jquery-ui-1.7.1/themes/base/jquery-ui.css"/>  
    <xhtml:script src="/UI/base/lib/init.js"/>  
    <xhtml:script src="/UI/system/components/dialog/dialog.js"/>  
    <xhtml:script src="/UI/system/components/windowFrame/windowFrame.js"/>  
    <xhtml:script src="/UI/system/components/windowRunner/windowRunner.js"/>  
    <xhtml:script src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script src="/UI/base/lib/butoneExUtils.js"/>
    <xhtml:script src="staticActivityTemplate.js"/> 
  <xhtml:script id="htmlScript3" src="/UI/base/lib/jquery-ui-1.7.1/ui/jquery-ui.src.js"></xhtml:script></xui:resource> 
</xui:window>
