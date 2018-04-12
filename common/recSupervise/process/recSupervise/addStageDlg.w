<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;top:139px;left:377px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="dsStage" concept="B_SuperviseStage" confirm-delete="false"><creator id="default1" action="/common/recSupervise/logic/action/createB_SuperviseStageAction"></creator>
  <reader id="default2" action="/common/recSupervise/logic/action/queryB_SuperviseStageAction"></reader>
  <writer id="default3" action="/common/recSupervise/logic/action/saveB_SuperviseStageAction"></writer></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
   <center id="borderLayout-center2"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout3" style="width:100%; height: 100%;;">
   <top size="41px" id="borderLayout-top3"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="width:236px;"><xui:place control="trgAdd" id="controlPlace5"></xui:place>
  <xui:place control="trgDel" id="controlPlace7"></xui:place></xhtml:div>
  </top>
   <center id="borderLayout-center3"><xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center></xhtml:div></center>
  <right size="97px" id="borderLayout-right1"><xui:place control="view2" id="controlPlace3" style="height:100%;width:100%;"></xui:place></right></xhtml:div>
  <xui:place control="windowReceiver1" id="controlPlace2" style="position:absolute;left:381px;top:282px;"></xui:place></xui:layout> 
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xui:place control="trgOK" id="controlPlace8" style="width:86px;position:absolute;left:10px;top:52px;"></xui:place>
  <xui:place control="trgCancel" id="controlPlace9" style="width:86px;position:absolute;top:97px;left:10px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgOK" appearance="image-text" class="button-green">
   <xforms:label id="default5">确定</xforms:label>
   <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[addStageDlg.trgOKClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgCancel">
   <xforms:label id="default7">取消</xforms:label>
   <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[addStageDlg.trgCancelClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgAdd" appearance="image-text" class="button-blue">
   <xforms:label id="default4"><![CDATA[新增]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[addStageDlg.trgAddClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgDel" appearance="image-text" class="button-orange">
   <xforms:label id="default6"><![CDATA[删除]]></xforms:label>
  <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[addStageDlg.trgDelClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="addStageDlg.windowReceiver1Receive"></xhtml:div>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dsStage" edit-mode="true">
   <xui:column id="gridColumn1" ref="fStage" label="阶段名称" type="ed" width="249px"></xui:column>
   <xui:column id="gridColumn2" ref="fEndDate" label="截至日期" type="ed" width="132px"></xui:column></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="addStageDlg.js"></xhtml:script></xui:resource> 
</xui:window>
