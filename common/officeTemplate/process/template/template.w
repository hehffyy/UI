<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="top:326px;left:4px;height:auto;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dsTemplate" concept="B_OfficeTemplate" limit="-1"><creator id="default1" action="/common/officeTemplate/logic/action/createB_OfficeTemplateAction"></creator>
  <reader id="default2" action="/common/officeTemplate/logic/action/queryB_OfficeTemplateAction"></reader>
  <writer id="default3" action="/common/officeTemplate/logic/action/saveB_OfficeTemplateAction"></writer>
  <filter name="filter0" id="filter1"><![CDATA[fKind='套红']]></filter></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xui:place control="sysReceiver" id="controlPlace1" style="position:absolute;top:493px;left:53px;"></xui:place>
  <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <top size="50px" id="borderLayout-top1"><xui:place control="view1" id="controlPlace3" style="height:100%;width:100%;"></xui:place></top>
   <center id="borderLayout-center1"><xui:place control="grid1" id="controlPlace2" style="height:100%;width:100%;"></xui:place></center>
  <bottom size="50px" id="borderLayout-bottom1"><xui:place control="view2" id="controlPlace6" style="height:100%;width:100%;"></xui:place></bottom></xhtml:div></xui:layout> 
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="sysReceiver"></xhtml:div>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dsTemplate" onRowDblClick="template.grid1RowDblClick"><xui:column id="gridColumn1" ref="fTemplateName" label="模板名称" type="ed" width="441px" readonly="true"></xui:column></xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:label id="label1" style="position:absolute;left:29px;top:15px;" class="xui-label"><![CDATA[模板过滤：]]></xhtml:label>
  <xui:place control="smartFilter1" id="controlPlace5" style="position:absolute;left:111px;width:195px;height:30px;top:10px;"></xui:place>
  <xui:place control="btnQuery" id="controlPlace9" style="position:absolute;width:100px;left:338px;top:15px;"></xui:place></layout>
  <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter1" filter-data="dsTemplate" filter-relations="fTemplateName"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnQuery" appearance="image-text" class="button-blue" operation-owner="dsTemplate" operation="refresh" icon-class="icon-system-search">
   <xforms:label id="default6"><![CDATA[快速过滤]]></xforms:label>
  </xforms:trigger></xui:view>
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2">
    <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="float:right;padding-right:10px;padding-top:5px;"><xui:place control="btnOK" id="controlPlace4" style="height:30px;"></xui:place>
  <xui:place control="btnCancle" id="controlPlace7" style="height:30px;"></xui:place></xhtml:div></layout> 
   
   
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnOK" appearance="image-text" class="button-green" icon-class="icon-system-ok">
   <xforms:label id="default4"><![CDATA[确认]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[template.btnOKClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancle" icon-class="icon-system-cancel" appearance="image-text">
   <xforms:label id="default5"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[template.btnCancleClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="template.js"></xhtml:script></xui:resource> 
</xui:window>
