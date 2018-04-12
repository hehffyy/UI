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
      <xhtml:div id="floatToolbars" style="position:fixed;display:none"> 
        <xhtml:ul class="bizOperationBar"> 
          <xhtml:li class="sys save"> 
            <xui:place control="btnSave" id="controlPlace2"/> 
          </xhtml:li>  
          <xhtml:li class="sys banLi"> 
            <xui:place control="btnBanLi" id="controlPlace5"/> 
          </xhtml:li>  
          <xhtml:li class="sys revokePreempt" style="display:none"> 
            <xui:place control="btnRevokePreempt" id="controlPlace7"/>
          </xhtml:li>  
          <xhtml:li class="sys showChart"> 
            <xui:place control="btnShowChart" id="controlPlace4"/> 
          </xhtml:li>
          <xhtml:li class="sys backReason"> 
            <xui:place control="btnBackReason" id="controlPlace3"/> 
          </xhtml:li>  
          <xhtml:li class="sys shouCang"> 
            <xui:place control="btnShouCang" id="controlPlace3"/> 
          </xhtml:li>
          <xhtml:li class="sys attention"> 
            <xui:place control="btnAttention" id="controlPlace3"/> 
          </xhtml:li> 
        </xhtml:ul> 
      </xhtml:div>  
      <xhtml:div id="btnSaveView"/>  
      <xhtml:div id="formView" class="xui-container" style="height:100%;width:100%;"/>  
    </xui:layout>  
    <xhtml:div component="/UI/system/components/process.xbl.xml#process" use-simple-dialog="true"
      data-type="json" dialog-window="/UI/base/core/flowOperation/batchProcessDialog.w"
      id="process" data="BizRec" auto-save="false" onBeforeOpenDialog="businessActivityTemplate.processBeforeOpenDialog"
      onBeforeAdvanceQuery="businessActivityTemplate.beforeBizOperationQuery" onBeforeBackQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeAbortQuery="businessActivityTemplate.beforeBizOperationQuery" onBeforeSuspendQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeTransferQuery="businessActivityTemplate.beforeBizOperationQuery" onBeforeStartCustomizedQuery="businessActivityTemplate.beforeBizOperationQuery"
      onBeforeStart="businessActivityTemplate.processBeforeStart" onStartError="businessActivityTemplate.processStartError"
      onStartCommit="businessActivityTemplate.processStartCommit" onAdvanceCommit="businessActivityTemplate.afterProcessOperationCommit"
      onBackCommit="businessActivityTemplate.afterProcessOperationCommit" onAbortCommit="businessActivityTemplate.afterProcessOperationCommit"
      onSuspendCommit="businessActivityTemplate.afterProcessOperationCommit" onTransferCommit="businessActivityTemplate.afterProcessOperationCommit"
      onBeforeExecute="businessActivityTemplate.processBeforeExecute" onBeforeCreateDialog="businessActivityTemplate.processBeforeCreateDialog"
      onAfterResume="businessActivityTemplate.processAfterResume" onAfterRevokePreempt="businessActivityTemplate.processAfterRevokePreempt"
      onAfterPreempt="businessActivityTemplate.processAfterPreempt"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSave"
      operation-owner="BizRec" operation="save" appearance="image-text" class="button-blue"> 
      <xforms:label id="default1"><![CDATA[保　　存]]></xforms:label> 
    </xforms:trigger>
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnAttention" appearance="image-text" icon-class="icon-system-star" class="button-darkcyan"> 
      <xforms:label id="default2"><![CDATA[关注案卷]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[businessActivityTemplate.btnAttentionClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnShouCang" appearance="image-text" icon-class="icon-system-star" class="button-green"> 
      <xforms:label id="default2"><![CDATA[收藏案卷]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[businessActivityTemplate.btnShouCangClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBackReason" class="button-darkcyan"> 
      <xforms:label id="default2"><![CDATA[上阶段意见]]></xforms:label>  
      <xforms:action id="action7" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[businessActivityTemplate.btnBackReasonClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnShowChart"
      appearance="image-text" icon-class="icon-system-flow-tree"> 
      <xforms:label id="default3"><![CDATA[办理过程]]></xforms:label> 
    <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[businessActivityTemplate.btnShowChartClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBanLi"
      class="button-green" appearance="image-text" icon-class="icon-system-play"> 
      <xforms:label id="default4"><![CDATA[办　　理]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate">
        <xforms:script id="xformsScript3"><![CDATA[businessActivityTemplate.btnBanLiClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnRevokePreempt"
      operation-owner="process" operation="revokePreempt" appearance="image-text" image-text-mode="LR" icon-class="icon-system-reply"> 
      <xforms:label id="default5"><![CDATA[取消办理]]></xforms:label>
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
    <xhtml:script src="/UI/base/core/template/simple2/flowtemplate/businessActivityTemplate.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="businessActivityTemplate.css"/>  
    <xhtml:script id="htmlScript1" src="businessActivityTemplate.js"/> 
  </xui:resource> 
</xui:window>
