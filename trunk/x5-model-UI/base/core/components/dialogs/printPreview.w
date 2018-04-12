<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:91px;top:94px;"> 
    <xforms:action id="action4" ev:event="onunload"> 
      <xforms:script id="xformsScript4"><![CDATA[printPreview.model1UnLoad(event)]]></xforms:script> 
    </xforms:action> 
  <xforms:action id="action7" ev:event="xforms-model-construct"><xforms:script id="xformsScript7"><![CDATA[printPreview.model1ModelConstruct(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="40px" id="borderLayout-top1"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar1" style="width:100%;height:80%;"> 
            <xui:place control="btnPageSetup" id="controlPlace6"></xui:place><xui:place control="btnPreview" id="controlPlace1"/>  
            <xui:place control="btnPrint" id="controlPlace2"/>  
            <xui:place control="btnClose" id="controlPlace3"/> 
          </xhtml:div> 
        </top>  
        <center id="borderLayout-center1"> 
          <xui:place control="docFrame" id="controlPlace4" style="height:100%;width:100%;"/> 
        </center> 
      </xhtml:div>  
      <xui:place control="windowReceiver1" id="controlPlace5" style="position:absolute;left:327px;top:18px;"/> 
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnPreview"
      appearance="image-minimal" src="/UI/system/components/reportBar/designer/images/print_preview.gif"
      disabled="true"> 
      <xforms:label id="default1"><![CDATA[预览]]></xforms:label>  
      <xforms:action id="action5" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript5"><![CDATA[printPreview.btnPreviewClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnPageSetup" appearance="image-minimal" icon-class="icon-system-config">
   <xforms:label id="default4"><![CDATA[设置]]></xforms:label>
  <xforms:action id="action6" ev:event="DOMActivate"><xforms:script id="xformsScript6"><![CDATA[printPreview.btnPageSetupClick(event)]]></xforms:script></xforms:action></xforms:trigger><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnPrint"
      appearance="image-text" src="/UI/system/components/reportBar/designer/images/print_print.gif"
      class="button-green" disabled="true"> 
      <xforms:label id="default2"><![CDATA[打印]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[printPreview.btnPrintClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnClose"
      appearance="image-minimal" icon-class="icon-system-back"> 
      <xforms:label id="default3"><![CDATA[关闭]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript3"><![CDATA[printPreview.btnCloseClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowFrame.xbl.xml#windowFrame"
      id="docFrame" auto-load="false" onReceive="printPreview.docFrameReceive"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="printPreview.windowReceiver1Receive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="printPreview.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"/>  
  </xui:resource> 
</xui:window>
