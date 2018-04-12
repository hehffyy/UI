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
        <top size="38px" id="borderLayout-top1" style="border-bottom: 1px dotted #e2e2e2;"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="uiPluginBar" separator-size="8" style="width:auto;"/>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="formUIPluginBar" separator-size="8"/>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="btnBarRight" style="float: right;" separator-size="8"> 
            <xui:place control="btnRefresh" id="controlPlace5"/>  
            <xui:place control="btnSave" id="controlPlace3"/>  
            <xui:place control="btnBack" id="controlPlace4"/> 
          </xhtml:div> 
        </top>  
        <center id="borderLayout-center1"> 
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="180px" mode="horz" has-arrow-button="true" id="mainHSplitter" class="xui-splitter"
            style="height:100%;width:100%;" has-drag-bar="true"> 
            <xhtml:div region="left" id="div1"> 
              <xhtml:div id="formNav" class="xui-autofill" style="overflow:hidden;height:100%;"/> 
            </xhtml:div>  
            <xhtml:div region="right" id="div2"> 
              <xhtml:div id="formView" class="xui-autofill" style="height:99%;width:100%;"/> 
            </xhtml:div> 
          </xhtml:div> 
        </center> 
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
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBack"
      appearance="image-text" class="button-blue" icon-class="icon-system-left"> 
      <xforms:label id="default2">返回</xforms:label>  
      <xforms:action id="action6" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript6">staticActivityTemplate.btnBackClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnRefresh"
      appearance="image-text" icon-class="icon-system-refresh"> 
      <xforms:label id="default3">刷新</xforms:label>  
      <xforms:action id="action4" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript4">staticActivityTemplate.btnRefreshClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSave"
      appearance="image-text" class="button-blue"> 
      <xforms:label id="default4">保存</xforms:label> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver" onReceive="staticActivityTemplate.funcReceiverReceive"/> 
  </xui:view>  
  <xui:resource id="resource"> 
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/core/template/singleDataControl/css/formNav.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/lib/jquery-ui-1.7.1/themes/base/jquery-ui.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/lib/jquery-ui-1.7.1-custom/themes/base/ui.panel.css"/>  
    <xhtml:script src="/UI/base/lib/jquery-ui-1.7.1/ui/jquery-ui.js"/>  
    <xhtml:script src="/UI/base/lib/jquery-ui-1.7.1-custom/ui/ui.panel.js"/>  
    <xhtml:script src="/UI/base/lib/init.js"/>  
    <xhtml:script src="/UI/system/components/dialog/dialog.js"/>  
    <xhtml:script src="/UI/system/components/windowFrame/windowFrame.js"/>  
    <xhtml:script src="/UI/system/components/windowRunner/windowRunner.js"/>  
    <xhtml:script src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script src="/UI/base/lib/butoneExUtils.js"/>
    <xhtml:script src="/UI/base/core/template/singleDataControl/statictemplate/staticActivityTemplate.js"/> 
  </xui:resource> 
</xui:window>
