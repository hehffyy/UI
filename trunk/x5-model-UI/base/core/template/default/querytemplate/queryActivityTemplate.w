<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="left:17px;height:auto;top:107px;"> 
    <xforms:action id="action2" ev:event="onload"> 
      <xforms:script id="xformsScript2"><![CDATA[queryActivityTemplate.modelLoad(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action3" ev:event="onunload"> 
      <xforms:script id="xformsScript3"><![CDATA[queryActivityTemplate.modelUnLoad(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;" id="rootLayout"> 
      <xui:place control="funcReceiver" id="controlPlace2" style="position:absolute;left:225px;top:61px;"/>  
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout" style="width:100%; height: 100%;;"> 
        <top size="38px" id="borderLayout-top2"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="uiPluginBar" style="width:auto;" separator-size="8"/>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="formUIPluginBar" separator-size="8"/>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="btnBarRight" separator-size="8" style="float:right"> 
            <xui:place control="btnBack" id="controlPlace10"/> 
          </xhtml:div>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="btnBarData2" separator-size="8" style="float:right;display:none" class="mainData"> 
            <xui:place control="dataSmartFilter" id="controlPlace5"/>  
            <xui:place control="btnSearch" id="controlPlace6" style="min-width:80px;"/>  
            <xui:place control="btnRefresh" id="controlPlace1"/> 
          </xhtml:div> 
        </top>  
        <center id="borderLayout-center2"> 
          <xhtml:div id="formView" class="xui-container" style="width:100%;height:100%;"/> 
        </center> 
      </xhtml:div>  
      <xui:place control="filterMenu" id="controlPlace7" style="left:304px;top:62px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver" onReceive="queryActivityTemplate.funcReceiverReceive"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnPrint"
      appearance="image-text" icon-class="icon-system-print"> 
      <xforms:label id="default1">打印</xforms:label>  
      <xforms:action id="action5" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript5"><![CDATA[queryActivityTemplate.btnPrintClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/bizDataFilterMenu.xbl.xml#bizDataFilterMenu"
      id="filterMenu"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBack"
      appearance="image-text" class="button-blue" icon-class="icon-system-left"> 
      <xforms:label id="default7">返回</xforms:label>  
      <xforms:action id="action6" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript6"><![CDATA[queryActivityTemplate.btnBackClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
      id="dataSmartFilter"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSearch"
      appearance="image-text" icon-class="icon-system-search" operation-owner="filterMenu"
      operation="show"> 
      <xforms:label id="default5">高级查询</xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnRefresh"
      icon-class="icon-system-refresh" appearance="image-text"> 
      <xforms:label id="default2">刷新</xforms:label> 
    </xforms:trigger> 
  </xui:view>  
  <xui:resource id="resource"> 
    <xhtml:script src="/UI/base/lib/init.js"/>  
    <xhtml:script src="/UI/system/components/windowFrame/windowFrame.js"/>  
    <xhtml:script src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script src="/UI/base/lib/butoneExUtils.js"/>
    <xhtml:script src="queryActivityTemplate.js"/> 
  </xui:resource> 
</xui:window>
