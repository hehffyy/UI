<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:756px;top:22px;"> 
    <xforms:action id="action1" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript1"><![CDATA[printTemplate.model1ModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action2" ev:event="onunload"> 
      <xforms:script id="xformsScript2"><![CDATA[printTemplate.model1UnLoad(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action3" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript3"><![CDATA[printTemplate.model1XBLLoaded(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="30px" id="borderLayout-top1"> 
          <xui:place control="toolbars" id="controlPlace1"/> 
        </top>  
        <center id="borderLayout-center1"> 
          <xui:place control="report" id="controlPlace2" style="height:100%;width:100%;"/> 
        </center> 
      </xhtml:div>  
      <xui:place control="sysReceiver" id="controlPlace3" style="position:absolute;top:164px;left:594px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars"> 
      <xui:bar component="/UI/system/components/reportBar.xbl.xml#printBar" id="printBar1"
        mode="IMG_TXT_LR" report="report"> 
        <item name="report-page-setup-item" id="barItem1"/>  
        <item name="report-preview-item" id="barItem2"/> 
      </xui:bar>  
      <xui:bar component="/UI/system/components/reportBar.xbl.xml#exportBar" id="exportBar1"
        mode="IMG_TXT_LR" report="report"> 
        <item name="report-export-pdf-item" id="barItem4"/>  
        <item name="report-export-word-item" id="barItem5"/>  
        <item name="report-export-excel-item" id="barItem6"/> 
      </xui:bar>  
      <xui:bar component="/UI/system/components/customBar.xbl.xml#customBar" id="customBar1"
        style="width:143px;"> 
        <item id="customBarItem1"> 
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="pagePrev"
            appearance="image-text" icon-class="icon-system-left-open" class="xui-no-border"> 
            <xforms:label id="default3"><![CDATA[上一页]]></xforms:label>  
            <xforms:action id="action4" ev:event="DOMActivate"> 
              <xforms:script id="xformsScript4"><![CDATA[printTemplate.pagePrevClick(event)]]></xforms:script> 
            </xforms:action> 
          </xforms:trigger> 
        </item>  
        <item id="customBarItem4"> 
          <xhtml:label id="pageInfo" class="xui-label" style="width:60px;display:block"><![CDATA[]]></xhtml:label> 
        </item>  
          
        <item id="customBarItem2"> 
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="pageNext"
            appearance="image-text" icon-class="icon-system-right-open" class="xui-no-border"> 
            <xforms:label id="default4"><![CDATA[下一页]]></xforms:label>  
            <xforms:action id="action5" ev:event="DOMActivate"> 
              <xforms:script id="xformsScript5"><![CDATA[printTemplate.pageNextClick(event)]]></xforms:script> 
            </xforms:action> 
          </xforms:trigger> 
        </item> 
      <item id="customBarItem5"> 
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="pagePrint" icon-class="icon-system-print" appearance="image-text"> 
            <xforms:label id="default1"><![CDATA[打印]]></xforms:label>  
            <xforms:action id="action6" ev:event="DOMActivate"> 
              <xforms:script id="xformsScript6"><![CDATA[printTemplate.pagePrintClick(event)]]></xforms:script> 
            </xforms:action> 
          </xforms:trigger> 
        </item></xui:bar> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/report.xbl.xml#report" src="" report-name="report"
      auto-load="false" data-list="" id="report"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="sysReceiver" onReceive="printTemplate.sysReceiverReceive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:style><![CDATA[.xui-button {background-color: transparent !important;}
  	]]></xhtml:style>  
  	<xhtml:script src="/UI/system/components/printHtml/formPrint.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/lib/init.js"/>  
    <xhtml:script id="htmlScript1" src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script id="htmlScript1" src="printTemplate.js"/> 
  </xui:resource> 
</xui:window>
