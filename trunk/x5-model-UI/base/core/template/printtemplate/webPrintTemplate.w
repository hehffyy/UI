<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:756px;top:22px;"> 
    <xforms:action id="action1" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript1"><![CDATA[webPrintTemplate.model1ModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="dsPrintSet" concept="B_RtCfg" store-type="simple" auto-new="false"><reader id="default6" action="/base/system/logic/action/queryB_RtCfgAction"></reader>
  <writer id="default7" action="/base/system/logic/action/saveB_RtCfgAction"></writer>
  <creator id="default8" action="/base/system/logic/action/createB_RtCfgAction"></creator></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="30px" id="borderLayout-top1"> 
          <xui:place control="toolbars" id="controlPlace1"/> 
        </top>  
        <center id="borderLayout-center1"> 
          <xui:place control="report" id="controlPlace2" style="width:100%;height:100%;"/> 
        </center> 
      </xhtml:div>  
      <xui:place control="sysReceiver" id="controlPlace3" style="position:absolute;top:164px;left:594px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars"> 
      <xui:bar component="/UI/system/components/customBar.xbl.xml#customBar" id="customBar1" style="width:143px;"> 
        <item id="customBarItem5"> 
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="pagePrint" icon-class="icon-system-print" appearance="image-text"> 
            <xforms:label id="default1"><![CDATA[打印]]></xforms:label>  
            <xforms:action id="action6" ev:event="DOMActivate"> 
              <xforms:script id="xformsScript6"><![CDATA[webPrintTemplate.pagePrintClick(event)]]></xforms:script> 
            </xforms:action> 
          </xforms:trigger> 
        </item><item id="customBarItem2"> 
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnPreview" appearance="image-text" icon-class="icon-system-windows" class="xui-no-border" style="width:88px;"> 
            <xforms:label id="default4"><![CDATA[打印预览]]></xforms:label>  
            <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[webPrintTemplate.btnPreviewClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
        </item> 
      </xui:bar> 
    <xui:bar component="/UI/system/components/reportBar.xbl.xml#printBar" id="printBar2" report="report" mode="IMG_TXT_LR">
   <item id="customBarItem1"><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSelPrinter" appearance="image-text" icon-class="icon-system-android">
   <xforms:label id="default2"><![CDATA[打印机]]></xforms:label>
  <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[webPrintTemplate.btnSelPrinterClick(event)]]></xforms:script></xforms:action></xforms:trigger></item>
  <item id="customBarItem3"></item><item name="report-page-setup-item" id="barItem1"></item>
   <item id="customBarItem4"><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSaveSet" appearance="image-text" icon-class="icon-system-check" style="width:83px;">
   <xforms:label id="default5"><![CDATA[保存设置]]></xforms:label>
  <xforms:action id="action7" ev:event="DOMActivate"><xforms:script id="xformsScript7"><![CDATA[webPrintTemplate.btnSaveSetClick(event)]]></xforms:script></xforms:action></xforms:trigger></item></xui:bar>
  <xui:bar component="/UI/system/components/reportBar.xbl.xml#exportBar" id="exportBar1" mode="IMG_TXT_LR" report="report">
   <item name="report-export-pdf-item" id="barItem4"></item>
   <item name="report-export-word-item" id="barItem5"></item>
   <item name="report-export-excel-item" id="barItem6"></item></xui:bar></xhtml:div>  
    <xhtml:div component="/UI/system/components/report.xbl.xml#report" src="" report-name="report"
      auto-load="false" data-list="" id="report"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="sysReceiver" onReceive="webPrintTemplate.sysReceiverReceive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:style><![CDATA[.xui-button {background-color: transparent !important;}
  	]]></xhtml:style>  
  	<xhtml:script src="/UI/system/components/printHtml/formPrint.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/lib/init.js"/>  
    <xhtml:script id="htmlScript1" src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script id="htmlScript1" src="webPrintTemplate.js"/> 
  <xhtml:script id="htmlScript3" src="/UI/base/lib/butoneExUtils.js"></xhtml:script></xui:resource> 
</xui:window>
