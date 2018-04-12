<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="top:119px;height:auto;left:211px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="BizRec" concept="B_BizRec" store-type="simple"
      auto-new="false" limit="1"> 
      <creator action="/base/core/flow/logic/action/createBizRecAction"/>  
      <reader action="/base/core/flow/logic/action/queryBizRecAction"/>  
      <writer action="/base/core/flow/logic/action/saveBizRecAction"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      src="" auto-load="false" id="controlData" store-type="simple" auto-new="true"/>  
    <xforms:action id="action2" ev:event="onload"> 
      <xforms:script id="xformsScript2"><![CDATA[businessActivityTemplate.modelLoad(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action5" ev:event="onunload"> 
      <xforms:script id="xformsScript5"><![CDATA[businessActivityTemplate.modelUnLoad(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout style="overflow:hidden;margin:0 auto;height:100%;width:99%;" id="rootLayout"> 
      <xui:place control="process" id="controlPlace1" style="position:absolute;width:24px;left:122px;top:99px;"/>  
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="38px" id="borderLayout-top1" style="border-bottom: 1px dotted #e2e2e2;"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="bizOperationBar" separator-size="8"/>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar" separator-size="8" style="width:atuo;"> 
            <xui:place control="showChart" id="controlPlace2" style="width:84px;"/>  
            <xui:place control="btnBackReason" id="controlPlace7"/> 
          </xhtml:div>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="uiPluginBar" style="width:auto;" separator-size="8"/>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="formUIPluginBar" separator-size="8"/>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="btnBarRight" style="width:auto;float:right" separator-size="8"> 
            <xui:place control="btnAttention" id="controlPlace9" style="width:95px;"/>  
            <!--            <xui:place control="btnFavorite" id="controlPlace8" style="width:95px;"/>-->  
            <xui:place control="btnRefresh" id="controlPlace5"/>  
            <xui:place control="btnSave" id="controlPlace3"/>  
            <xui:place control="btnBack" id="controlPlace4"/> 
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
      <div id="floatView" style="position:fixed"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/process.xbl.xml#process" use-simple-dialog="true"
      data-type="json" dialog-window="/UI/base/core/flowOperation/batchProcessDialog.w"
      dialog-height="500" dialog-width="600" id="process" data="BizRec" auto-save="false"
      onBeforeOpenDialog="businessActivityTemplate.processBeforeOpenDialog" onBeforeAdvanceQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeBackQuery="businessActivityTemplate.beforeBizOperationQuery" onBeforeAbortQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeSuspendQuery="businessActivityTemplate.beforeBizOperationQuery" onBeforeTransferQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeStartCustomizedQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeStart="businessActivityTemplate.processBeforeStart" onStartError="businessActivityTemplate.processStartError"
      onStartCommit="businessActivityTemplate.processStartCommit" onAdvanceCommit="businessActivityTemplate.afterProcessOperationCommit"
      onBackCommit="businessActivityTemplate.afterProcessOperationCommit" onAbortCommit="businessActivityTemplate.afterProcessOperationCommit"
      onSuspendCommit="businessActivityTemplate.afterProcessOperationCommit" onTransferCommit="businessActivityTemplate.afterProcessOperationCommit"
      onBeforeExecute="businessActivityTemplate.processBeforeExecute" onBeforeCreateDialog="businessActivityTemplate.processBeforeCreateDialog"
      onAfterResume="businessActivityTemplate.processAfterResume" onAfterRevokePreempt="businessActivityTemplate.processAfterRevokePreempt"
      onAfterPreempt="businessActivityTemplate.processAfterPreempt"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="showChart"
      operation-owner="process" operation="showChart" appearance="image-text" icon-class="icon-system-flow-tree"> 
      <xforms:label><![CDATA[办理过程]]></xforms:label> 
    </xforms:trigger>  
    <!--    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnPrint"-->  
    <!--      appearance="image-text" icon-class="icon-system-print"> -->  
    <!--      <xforms:label id="default1"><![CDATA[打印]]></xforms:label>  -->  
    <!--      <xforms:action id="action3" ev:event="DOMActivate"> -->  
    <!--        <xforms:script id="xformsScript3"><![CDATA[businessActivityTemplate.btnPrintClick(event)]]></xforms:script> -->  
    <!--      </xforms:action> -->  
    <!--    </xforms:trigger>  -->  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBack"
      appearance="image-text" class="button-blue" icon-class="icon-system-left"> 
      <xforms:label id="default2">返回</xforms:label>  
      <xforms:action id="action6" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript6">businessActivityTemplate.btnBackClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <!--    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnFavorite"-->  
    <!--      appearance="image-text" icon-class="icon-system-star" class="button-green"> -->  
    <!--      <xforms:label id="default5"><![CDATA[案卷收藏]]></xforms:label>  -->  
    <!--      <xforms:action id="action3" ev:event="DOMActivate">-->  
    <!--        <xforms:script id="xformsScript3"><![CDATA[businessActivityTemplate.btnFavoriteClick(event)]]></xforms:script>-->  
    <!--      </xforms:action>-->  
    <!--    </xforms:trigger>-->  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnRefresh"
      appearance="image-text" icon-class="icon-system-refresh"> 
      <xforms:label id="default3">刷新</xforms:label>  
      <xforms:action id="action4" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript4">businessActivityTemplate.btnRefreshClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSave"
      appearance="image-text" class="button-blue" operation-owner="BizRec" operation="save"> 
      <xforms:label id="default4">保存</xforms:label> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBackReason"> 
      <xforms:label id="default1"><![CDATA[上阶段意见]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[businessActivityTemplate.btnBackReasonClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnAttention"
      appearance="image-text" icon-class="icon-system-star" class="button-darkcyan"> 
      <xforms:label id="default6"><![CDATA[关注案卷]]></xforms:label>  
      <xforms:action id="action8" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript8"><![CDATA[businessActivityTemplate.btnAttentionClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger> 
  </xui:view>  
  <xui:resource id="resource"> 
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
    <xhtml:script src="/UI/base/core/flowOperation/bizOperation.js"/>  
    <xhtml:script src="/UI/base/lib/butoneExUtils.js"/>  
    <xhtml:script src="/UI/base/core/template/default/flowtemplate/businessActivityTemplate.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="businessActivityTemplate.css"/> 
  </xui:resource> 
</xui:window>
