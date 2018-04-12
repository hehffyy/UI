<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="left:18px;height:auto;top:264px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="dsBiz" concept="V_BizMapping"><reader id="default1" action="/common/preBizRec/logic/action/queryV_BizMappingAction"></reader></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center>
  <right size="127px" id="borderLayout-right1"><xui:place control="view1" id="controlPlace3" style="height:100%;width:100%;"></xui:place></right></xhtml:div>
  <xui:place control="windowReceiver1" id="controlPlace2" style="position:absolute;top:328px;left:304px;"></xui:place></xui:layout> 
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dsBiz" onRowDblClick="bizSelDialog.grid1RowDblClick"><xui:column id="gridColumn1" ref="fProcessName" label="业务名称" type="ed" width="237px" readonly="true"></xui:column></xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xui:place control="btnOK" id="controlPlace4" style="position:absolute;width:93px;left:18px;top:16px;"></xui:place>
  <xui:place control="btnCancle" id="controlPlace5" style="width:93px;left:18px;position:absolute;top:69px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnOK" appearance="image-text" icon-class="icon-system-ok" class="button-blue">
   <xforms:label id="default3"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[bizSelDialog.btnOKClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancle" appearance="image-text" icon-class="icon-system-cancel">
   <xforms:label id="default4"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[bizSelDialog.btnCancleClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="bizSelDialog.windowReceiver1Receive"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="bizSelDialog.js"></xhtml:script></xui:resource> 
</xui:window>
