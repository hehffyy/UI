<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="top:119px;height:auto;left:211px;"> 
    <data concept="B_BizRec" limit="1" auto-load="false" data-type="json" store-type="simple"
      component="/UI/system/components/data.xbl.xml#bizData" id="BizRec"> 
      <reader action="/base/core/flow/logic/action/queryBizRecAction"/>  
      <writer/>  
      <creator/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      src="" auto-load="false" id="controlData" store-type="simple" auto-new="true"/>  
    <xforms:action id="action2" ev:event="onload"> 
      <xforms:script id="xformsScript2"><![CDATA[queryActivityTemplate.modelLoad(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action5" ev:event="onunload"> 
      <xforms:script id="xformsScript5"><![CDATA[queryActivityTemplate.modelUnLoad(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout style="overflow:hidden;margin:0 auto;height:100%;width:99%;" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="38px" id="borderLayout-top1" style="border-bottom: 1px dotted #e2e2e2;"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar" style="width:100%;height:100%;" separator-size="8"> 
            <!--        注释掉打印按钮      <xui:place control="btnPrint" id="controlPlace8" style="width:60px;"/>  -->  
            <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
              id="uiPluginBar" style="width:auto;" separator-size="8"/>  
            <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
              id="buttonBar5" separator-size="8" style="width:auto;">
              <xui:place control="showChart" id="controlPlace1" style="width:89px;"/>
            </xhtml:div>
            <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
              id="formUIPluginBar" separator-size="8"/>  
            <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
              id="btnBarRight" style="width:auto;" separator-size="8"> 
              <xui:place control="btnAttention" id="controlPlace9" style="width:95px;"/>
              <xui:place control="btnRefresh" id="controlPlace5"/>  
              <xui:place control="btnBack" id="controlPlace4"/> 
            </xhtml:div>  
          </xhtml:div> 
        </top>  
        <center id="borderLayout-center1"> 
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="180px" mode="horz" has-arrow-button="true" id="HSplitter1" class="xui-splitter"
            style="height:100%;width:100%;" has-drag-bar="true"> 
            <xhtml:div region="left" id="div1"> 
              <xhtml:div id="formNav" class="xui-autofill" style="height:96%;"/> 
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
      <xui:place control="dlgChart" id="controlPlace7" style="position:absolute;top:257px;left:113px;"/>
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnPrint"
      appearance="image-text" icon-class="icon-system-print"> 
      <xforms:label id="default1"><![CDATA[打印]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript3"><![CDATA[queryActivityTemplate.btnPrintClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBack"
      appearance="image-text" class="button-blue" icon-class="icon-system-left"> 
      <xforms:label id="default2">返回</xforms:label>  
      <xforms:action id="action6" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript6">queryActivityTemplate.btnBackClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnRefresh"
      appearance="image-text" icon-class="icon-system-refresh"> 
      <xforms:label id="default3">刷新</xforms:label>  
      <xforms:action id="action4" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript4">queryActivityTemplate.btnRefreshClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver" onReceive="queryActivityTemplate.funcReceiverReceive"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="办理过程" width="396px" height="264px" modal="true" id="dlgChart" url="/UI/SA/task/taskCenter/dialogs/processChart.w"
      left="0" top="0" status="maximize"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnAttention"
      appearance="image-text" icon-class="icon-system-star" class="button-darkcyan"> 
      <xforms:label id="default6">关注案卷</xforms:label>  
      <xforms:action id="action10" ev:event="DOMActivate"><xforms:script id="xformsScript10"><![CDATA[queryActivityTemplate.btnAttentionClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="showChart"
      appearance="image-text" icon-class="icon-system-flow-tree"> 
      <xforms:label id="default4">办理过程</xforms:label>  
      <xforms:action id="action7" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript7">queryActivityTemplate.showChartClick(event)</xforms:script>
      </xforms:action> 
    </xforms:trigger>
  </xui:view>  
  <xui:resource id="resource"> 
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/base/core/template/prepBizRec/css/formNav.css"/>  
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
    <xhtml:script src="/UI/base/core/template/bizRecView/querytemplate/queryActivityTemplate.js"/> 
  </xui:resource> 
</xui:window>
