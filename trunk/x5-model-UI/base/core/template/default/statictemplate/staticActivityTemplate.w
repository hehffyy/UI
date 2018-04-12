<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="height:auto;left:31px;top:72px;"> 
    <xforms:action id="action2" ev:event="onload"> 
      <xforms:script id="xformsScript2"><![CDATA[staticActivityTemplate.modelLoad(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action5" ev:event="onunload"> 
      <xforms:script id="xformsScript5"><![CDATA[staticActivityTemplate.modelUnLoad(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout style="height:100%;width:100%;" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="38px" id="borderLayout-top1" style="border-bottom: 1px dotted #e2e2e2;"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="btnBarData1" separator-size="8" style="display:none;" class="mainData"> 
            <xui:place control="btnAppend" id="controlPlace1"/>  
            <xui:place control="btnDelete" id="controlPlace2"/> 
          </xhtml:div>  
          <!--       注释掉打印按钮      <xui:place control="btnPrint" id="controlPlace8" style="width:60px;"/>  -->  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="uiPluginBar" style="width:auto;" separator-size="8"/>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="formUIPluginBar" separator-size="8"/>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="btnBarRight" style="float:right" separator-size="8"> 
            <xui:place control="btnBack" id="controlPlace10"/> 
          </xhtml:div>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="btnBarData2" style="float:right;display:none" separator-size="8" class="mainData"> 
            <xui:place control="dataSmartFilter" id="controlPlace5"/>  
            <xui:place control="btnSearch" id="controlPlace6" style="min-width:80px;"/>  
            <xui:place control="btnRefresh" id="controlPlace4"/>  
            <xui:place control="btnSave" id="controlPlace3"/> 
          </xhtml:div> 
        </top>  
        <center id="borderLayout-center1"> 
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="180px" mode="horz" has-arrow-button="true" id="mainHSplitter"
            class="xui-splitter" style="height:100%;width:100%;" has-drag-bar="true"> 
            <xhtml:div region="left" id="div1"> 
              <xhtml:div id="formNav" class="xui-autofill" style="overflow:hidden"/> 
            </xhtml:div>  
            <xhtml:div region="right" id="div2"> 
              <xhtml:div id="formView" class="xui-autofill" style="height:100%;width:100%;"/> 
            </xhtml:div> 
          </xhtml:div> 
        </center> 
      </xhtml:div>  
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
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnAppend"
      icon-class="icon-system-plus" appearance="image-text" class="mainData"> 
      <xforms:label id="default2"><![CDATA[新增]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnDelete"
      icon-class="icon-system-minus" appearance="image-text" class="mainData"> 
      <xforms:label id="default3"><![CDATA[删除]]></xforms:label> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/bizDataFilterMenu.xbl.xml#bizDataFilterMenu"
      id="filterMenu"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBack"
      appearance="image-text" class="button-blue" icon-class="icon-system-left"> 
      <xforms:label id="default7">返回</xforms:label>  
      <xforms:action id="action6" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript6"><![CDATA[staticActivityTemplate.btnBackClick(event)]]></xforms:script> 
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
      <xforms:label id="default4">刷新</xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSave"
      appearance="image-text" class="button-blue" icon-class="icon-system-floppy"> 
      <xforms:label id="default8">保存</xforms:label> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver" onReceive="staticActivityTemplate.funcReceiverReceive"/> 
  </xui:view>  
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
  </xui:resource> 
</xui:window>
