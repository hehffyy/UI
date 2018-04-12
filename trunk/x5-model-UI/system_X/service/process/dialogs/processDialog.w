<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model" style="width:175px;top:44px;height:auto;left:274px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      auto-load="false" id="dTask" concept="SA_Task" relations="sContent,version,sESField01"
      store-type="simple" data-type="json" confirm-refresh="false"> 
      <reader id="default3" action="/system/logic/action/queryTaskAction"/>  
      <writer id="default1" action="/system/logic/action/saveTaskAction"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" columns="name,label,isSelectable,isOptional,executorNames,check,advancedOption"
      src="" auto-load="true" id="dActivities" store-type="grid" confirm-refresh="true"
      data-type="json"/>  
    <xforms:action id="action1" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript1">processDialog.modelXBLLoaded(event)</xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="activity,name,executorNames,check,advancedOption" src="" auto-load="false"
      id="dNotices" onValueChanged="processDialog.dNoticesValueChanged"/> 
  </xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout id="rootLayout" type="flow" style="overflow:hidden;height:100%;width:100%;"> 
      <xhtml:div id="divMessage" class="xui-container" style="width:100%;height:20px;margin-top:8px;display:none;"
        align="center"> 
        <xhtml:label id="labelMsg" class="xui-label" style="font-weight:bold;"><![CDATA[]]></xhtml:label> 
      </xhtml:div>  
      <xhtml:div id="divActivities" class="xui-container" style="width:100%;margin-top:8px;height:225px;"> 
        <xui:place control="gridActivities" id="controlPlace12" style="margin-right:8px;margin-left:8px;width:auto;height:100%;border-color:#7f9db9;border-width:1px;border-style:solid;"/> 
      </xhtml:div>  
      <xhtml:div id="divNotices" class="xui-container" style="width:100%;height:80px;margin-top:8px;"> 
        <xui:place control="gridNotices" id="controlPlace3" style="height:100%;margin-right:8px;margin-left:8px;width:auto;border-color:#7f9db9;border-width:1px;border-style:solid;"/> 
      </xhtml:div>  
        
      <xhtml:div id="divContent" class="xui-container" style="height:130px;width:100%;"> 
        <xhtml:div id="divContentTop" class="xui-container" style="width:100%;margin-top:8px;height:20px;"> 
        <xhtml:label id="label4" class="xui-label" style="float:left;margin-left:8px;margin-top:2px;font-weight:bold;"><![CDATA[规则信息]]></xhtml:label> 
      </xhtml:div>
  <xhtml:div id="textareaContent" class="xui-container" style="border-style:solid solid solid solid;border-width:1px 1px 1px 1px;border-color:#0080FF #0080FF #0080FF #0080FF;width:572px;margin-left:10px;"><xui:place control="textarea1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></xhtml:div></xhtml:div>  
      <xhtml:div id="divBottom" class="xui-container" style="margin:4px 4px 4px 4px;width:auto;height:25px;"> 
        <xui:place control="btnExit" id="controlPlace7" style="width:80px;float:right;"/>  
        <xui:place control="btnExecute" id="controlPlace8" style="width:80px;float:right;margin-right:8px;"/> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace6" style="top:122px;left:95px;"/>  
      <xui:place control="wdSelectExecutors" id="controlPlace5" style="top:212px;left:96px;"/>  
      <xui:place control="wdAdvancedOptionOfTo" id="controlPlace9" style="top:212px;left:157px;"/>  
      <xui:place control="wdAdvancedOptionOfNotice" id="controlPlace4" style="top:211px;left:220px;"/> 
    </xui:layout>  
    <xforms:trigger id="btnExit" appearance="image-minimal"> 
      <xforms:label id="xuiLabel2"><![CDATA[取消]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript3">processDialog.btnExitClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger id="btnExecute" class="button-green" appearance="image-text"> 
      <xforms:label id="xuiLabel3"><![CDATA[确定]]></xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript2">processDialog.btnExecuteClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="processDialog.windowReceiverReceive"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="选择办理人" width="556px" height="364px" modal="true" id="wdSelectExecutors"
      url="/UI/system/service/process/dialogs/selectExecutorsDialog.w" reload-on-open="false"
      onReceive="processDialog.wdSelectExecutorsReceive" dialogUpdate="true"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="高级选项" width="375px" height="155px" modal="true" id="wdAdvancedOptionOfTo"
      url="/UI/system/service/process/dialogs/advancedOptionOfTo.w" dialogUpdate="true"/>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      id="gridActivities" data="dActivities" edit-mode="true" onShowNodeImg="processDialog.gridActivitiesShowNodeImg"
      multi-selection="true" onRowChecked="processDialog.gridActivitiesRowChecked"
      header-row-height="25" row-height="25" class="grid-compact"> 
      <xui:column id="gridColumn1" ref="label" label="环节" type="tree" width="175"
        readonly="true"/>  
      <xui:column id="gridColumn3" ref="executorNames" label="办理人" type="html" onRender="processDialog.gridActivities_executorNamesRender"
        width="325"/>  
      <xui:column id="gridColumn4" ref="advancedOption" type="html" width="60" onRender="processDialog.gridActivities_advancedOptionRender"
        label=" " align="center"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      id="gridNotices" data="dNotices" multi-selection="true" edit-mode="true" header-row-height="25"
      row-height="25" class="grid-compact"> 
      <xui:column id="gridColumn7" ref="activity" label="activity" type="ro" visible="false"/>  
      <xui:column id="gridColumn8" ref="check" label=" " type="ch" width="25" align="center"/>  
      <xui:column id="gridColumn2" ref="name" label="通知" type="ro" width="150"/>  
      <xui:column id="gridColumn5" ref="executorNames" label="接收人" type="html" onRender="processDialog.gridNotices_executorNamesRender"
        width="325"/>  
      <xui:column id="gridColumn6" ref="advancedOption" label=" " type="html" width="60"
        align="center" onRender="processDialog.gridNotices_advancedOptionRender"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="通知选项" width="381px" height="154px" modal="true" id="wdAdvancedOptionOfNotice"
      url="/UI/system/service/process/dialogs/advancedOptionOfNotice.w" dialogUpdate="true"/> 
  <xforms:textarea ref="data('dTask')/sContent" id="textarea1"></xforms:textarea></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/system/service/process/dialogs/processDialog.css"/>  
    <xhtml:script id="htmlScript3" src="/UI/system/service/org/orgUtils.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/system/components/process/process.js"/>  
    <xhtml:script id="htmlScript4" src="/UI/system/service/process/dialogs/processDialogUtils.js"/>  
    <xhtml:script id="htmlScript1" src="processDialog.js"/> 
  </xui:resource> 
</xui:window>
