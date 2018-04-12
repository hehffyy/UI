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
    <xui:layout style="overflow:hidden;margin:0 auto;height:100%;width:100%;" id="rootLayout"> 
      <xui:place control="process" id="controlPlace1" style="position:absolute;width:24px;top:100px;left:122px;"/>  
      <xui:place control="funcReceiver" id="controlPlace6" style="position:absolute;top:184px;left:455px;"/>  
<!--      <xhtml:div id="floatView" style="position:fixed"/>  -->
      <xhtml:div id="floatToolbars" style="position:fixed"> 
        <ul class="bizOperationBar"/> 
      </xhtml:div>  
      <xhtml:div id="btnSaveView" style="display:none;">
        <xui:place control="btnSave" id="controlPlace2"/>
      </xhtml:div>  
      <xhtml:div id="formView" class="xui-container" style="height:100%;width:100%;"/>  
      <xhtml:div id="formNavs" style="z-index:100;position:absolute;width:100%;height:40px;bottom:0px;left:0px;text-align: center;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/process.xbl.xml#process" use-simple-dialog="true"
      data-type="json" dialog-window="/UI/base/core/flowOperation/batchProcessDialog.w"
      id="process" data="BizRec" auto-save="false"
      onBeforeOpenDialog="businessActivityTemplate.processBeforeOpenDialog" onBeforeAdvanceQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeBackQuery="businessActivityTemplate.beforeBizOperationQuery" onBeforeAbortQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeSuspendQuery="businessActivityTemplate.beforeBizOperationQuery" onBeforeTransferQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeStartCustomizedQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeStart="businessActivityTemplate.processBeforeStart" onStartError="businessActivityTemplate.processStartError"
      onStartCommit="businessActivityTemplate.processStartCommit" onAdvanceCommit="businessActivityTemplate.afterProcessOperationCommit"
      onBackCommit="businessActivityTemplate.afterProcessOperationCommit" onAbortCommit="businessActivityTemplate.afterProcessOperationCommit"
      onSuspendCommit="businessActivityTemplate.afterProcessOperationCommit" onTransferCommit="businessActivityTemplate.afterProcessOperationCommit"
      onBeforeExecute="businessActivityTemplate.processBeforeExecute"
      onBeforeCreateDialog="businessActivityTemplate.processBeforeCreateDialog"
      onAfterResume="businessActivityTemplate.processAfterResume" onAfterRevokePreempt="businessActivityTemplate.processAfterRevokePreempt"
      onAfterPreempt="businessActivityTemplate.processAfterPreempt"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSave"
      operation-owner="BizRec" operation="save" appearance="image-text" class="button-blue"> 
      <xforms:label id="default1"><![CDATA[保　　存]]></xforms:label>
    </xforms:trigger>
  </xui:view>  
  <xui:resource id="resource"> 
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
    <xhtml:script src="/UI/base/core/template/simple/flowtemplate/businessActivityTemplate.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="businessActivityTemplate.css"/> 
  </xui:resource> 
</xui:window>
