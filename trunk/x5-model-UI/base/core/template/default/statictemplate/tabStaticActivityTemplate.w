<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="height:auto;left:31px;top:72px;"> 
    <xforms:action id="action5" ev:event="onunload"> 
      <xforms:script id="xformsScript5"><![CDATA[staticActivityTemplate.modelUnLoad(event)]]></xforms:script> 
    </xforms:action> 
  <xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[tabStaticActivityTemplate.modelLoad(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout style="height:100%;width:100%;" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1"> 
          <xhtml:div id="formNav" class="xui-container" style="overflow:hidden;height:100%;width:100%;;"></xhtml:div></center> 
      <top size="0px" id="borderLayout-top1" style="display:none;"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="btnBarData1" separator-size="8" class="mainData" style="display:none;;">
   <xui:place control="btnAppend" id="controlPlace1"></xui:place>
   <xui:place control="btnDelete" id="controlPlace2"></xui:place></xhtml:div>
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="uiPluginBar" separator-size="8" style="width:auto;;"></xhtml:div>
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="formUIPluginBar" separator-size="8"></xhtml:div>
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="btnBarRight" separator-size="8" style="float:right;">
   <xui:place control="btnBack" id="controlPlace10"></xui:place></xhtml:div>
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="btnBarData2" separator-size="8" class="mainData" style="float:right;display:none;">
   <xui:place control="dataSmartFilter" id="controlPlace5"></xui:place>
   <xui:place control="btnSearch" id="controlPlace6" style="min-width:80px;"></xui:place>
   <xui:place control="btnRefresh" id="controlPlace4"></xui:place>
   <xui:place control="btnSave" id="controlPlace3"></xui:place></xhtml:div></top></xhtml:div>  
      <xui:place control="filterMenu" id="controlPlace7" style="position:absolute;left:387px;top:101px;"/>  
      <xui:place control="funcReceiver" id="controlPlace9" style="position:absolute;left:413px;top:202px;"/>
      <div id="floatView" style="position:fixed"/> 
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnPrint"
      appearance="image-text" icon-class="icon-system-print"> 
      <xforms:label id="default1"><![CDATA[打印]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript3"><![CDATA[staticActivityTemplate.btnPrintClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/bizDataFilterMenu.xbl.xml#bizDataFilterMenu"
      id="filterMenu"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver" onReceive="staticActivityTemplate.funcReceiverReceive"/> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnAppend" icon-class="icon-system-plus" appearance="image-text" class="mainData">
   <xforms:label id="default2">新增</xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnDelete" icon-class="icon-system-minus" appearance="image-text" class="mainData">
   <xforms:label id="default3">删除</xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBack" appearance="image-text" class="button-blue" icon-class="icon-system-left">
   <xforms:label id="default7">返回</xforms:label>
   <xforms:action id="action6" ev:event="DOMActivate">
    <xforms:script id="xformsScript6">staticActivityTemplate.btnBackClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="dataSmartFilter"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSearch" appearance="image-text" icon-class="icon-system-search" operation-owner="filterMenu" operation="show">
   <xforms:label id="default5">高级查询</xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnRefresh" icon-class="icon-system-refresh" appearance="image-text">
   <xforms:label id="default4">刷新</xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSave" appearance="image-text" class="button-blue" icon-class="icon-system-floppy">
   <xforms:label id="default8">保存</xforms:label></xforms:trigger></xui:view>  
  <xui:resource id="resource"> 
    <xhtml:style>#floatFormNav&gt;div&gt;ul&gt;li{float:left;background: url("../../../../../UI/portal2_X/process/portal/index/images/navBg.png") no-repeat right center;padding-top: 4px;height: 21px;}#floatFormNav&gt;div&gt;ul&gt;li:hover{background-color: #6ABCF4;}#floatFormNav&gt;div&gt;ul&gt;li&gt;span{padding:2px 3px;font-size : 13px;}</xhtml:style>  
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/core/template/default/css/formNav.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/lib/jquery-ui-1.7.1/themes/base/jquery-ui.css"/>
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/lib/jquery-ui-1.7.1-custom/themes/base/ui.panel.css"/>  
    <xhtml:script src="/UI/base/lib/init.js"/>  
    <xhtml:script src="/UI/base/lib/jquery-ui-1.7.1/ui/jquery-ui.js"/>
    <xhtml:script src="/UI/base/lib/jquery-ui-1.7.1-custom/ui/ui.panel.js"/>  
    <xhtml:script src="/UI/system/components/dialog/dialog.js"/>  
    <xhtml:script src="/UI/system/components/windowFrame/windowFrame.js"/>  
    <xhtml:script src="/UI/system/components/windowRunner/windowRunner.js"/>  
    <xhtml:script src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script src="/UI/base/lib/butoneExUtils.js"/>
    <xhtml:script src="/UI/base/core/template/default/statictemplate/staticActivityTemplate.js"/> 
  <xhtml:script id="htmlScript1" src="tabStaticActivityTemplate.js"></xhtml:script></xui:resource> 
</xui:window>
