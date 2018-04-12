<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="height:auto;left:31px;top:72px;"> 
    <xforms:action id="action1" ev:event="xforms-ready"> 
      <xforms:script id="xformsScript1"><![CDATA[staticActivityTemplate.modelReady(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action2" ev:event="onload"> 
      <xforms:script id="xformsScript2"><![CDATA[staticActivityTemplate.modelLoad(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action5" ev:event="onunload"> 
      <xforms:script id="xformsScript5"><![CDATA[staticActivityTemplate.modelUnLoad(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action4" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript4"><![CDATA[staticActivityTemplate.modelXBLLoaded(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout style="height:100%;width:100%;" id="rootLayout"> 
      <xui:place control="filterMenu" id="controlPlace7" style="position:absolute;left:387px;top:101px;"/>  
      <xui:place control="funcReceiver" id="controlPlace9" style="position:absolute;left:413px;top:202px;"/> 
    <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="180px" mode="horz" has-arrow-button="true" id="mainHSplitter" class="xui-splitter" has-drag-bar="true" style="height:100%;width:100%;;">
   <xhtml:div region="left" id="div1">
    <xhtml:div id="formNav" class="xui-container" style="overflow:hidden;height:100%;width:100%;"></xhtml:div></xhtml:div> 
   <xhtml:div region="right" id="div2">
    <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%;height:100%;">
   <top size="38px" id="borderLayout-top1" style="border-bottom: 1px dotted #e2e2e2;">
    <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar" style="width:100%;height:100%;" separator-size="8" separator="false">
     <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="btnBarData1" separator-size="8" style="display:none;" class="mainData">
      </xhtml:div> 
     <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="uiPluginBar" style="width:auto;" separator-size="8"></xhtml:div>
     <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="formUIPluginBar" separator-size="8"></xhtml:div>
     <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="btnBarRight" separator-size="8">
      <xui:place control="btnBack" id="controlPlace10"></xui:place></xhtml:div> 
     <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="btnBarData2" separator-size="8" class="mainData">
      </xhtml:div> </xhtml:div> </top> 
   <center id="borderLayout-center1"><xhtml:div id="formView" class="xui-container" style="width:100%;height:100%;"></xhtml:div></center></xhtml:div></xhtml:div> </xhtml:div></xui:layout>  
    <xhtml:div component="/UI/system/components/bizDataFilterMenu.xbl.xml#bizDataFilterMenu"
      id="filterMenu"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver" onReceive="staticActivityTemplate.funcReceiverReceive"/> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBack" appearance="image-text" class="button-blue" icon-class="icon-system-left">
   <xforms:label id="default7">返回</xforms:label>
   <xforms:action id="action6" ev:event="DOMActivate">
    <xforms:script id="xformsScript6">staticActivityTemplate.btnBackClick(event)</xforms:script></xforms:action> </xforms:trigger>
  </xui:view>  
  <xui:resource id="resource"> 
    <xhtml:style>#floatFormNav&gt;div&gt;ul&gt;li{float:left;background: url("../../../../../UI/portal2_X/process/portal/index/images/navBg.png") no-repeat right center;padding-top: 4px;height: 21px;}#floatFormNav&gt;div&gt;ul&gt;li:hover{background-color: #6ABCF4;}#floatFormNav&gt;div&gt;ul&gt;li&gt;span{padding:2px 3px;font-size : 13px;}</xhtml:style>  
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/core/template/default/css/formNav.css"/>  
    <xhtml:script src="/UI/base/lib/init.js"/>  
    <xhtml:script src="/UI/system/components/dialog/dialog.js"/>  
    <xhtml:script src="/UI/system/components/windowFrame/windowFrame.js"/>  
    <xhtml:script src="/UI/system/components/windowRunner/windowRunner.js"/>  
    <xhtml:script src="/UI/base/core/template/butoneExtend.js"/>    
    <xhtml:script src="/UI/base/core/template/default/functemplate/staticActivityTemplate.js"/> 
  </xui:resource> 
</xui:window>
