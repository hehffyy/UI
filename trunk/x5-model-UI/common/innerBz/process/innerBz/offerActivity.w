<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="left:17px;height:auto;top:154px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="dataBz" concept="B_BzInfo" limit="-1" store-type="simple"><reader id="default6" action="/common/innerBz/logic/action/queryB_BzInfoAction"></reader>
  <writer id="default7" action="/common/innerBz/logic/action/saveB_BzInfoAction"></writer>
  <creator id="default8" action="/common/innerBz/logic/action/createB_BzInfoAction"></creator></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="dataBzsq" concept="B_BzSq" limit="-1"><reader id="default3" action="/common/innerBz/logic/action/queryB_BzSqAction"></reader>
  <writer id="default4" action="/common/innerBz/logic/action/saveB_BzSqAction"></writer>
  <creator id="default5" action="/common/innerBz/logic/action/createB_BzSqAction"></creator></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%;height:100%;">
   <center id="borderLayout-center1"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
   <top size="23px" id="borderLayout-top2"><xhtml:label id="label3" class="xui-label" style="font-size:large;"><![CDATA[     申请原因：]]></xhtml:label></top>
   <center id="borderLayout-center2"><xui:place control="textarea1" id="controlPlace6" style="height:100%;width:100%;"></xui:place></center></xhtml:div></center>
  <left size="290px" id="borderLayout-left1">
  <xui:place control="gridOffer" id="controlPlace7" style="width:100%;height:100%;"></xui:place></left>
  <bottom size="50px" id="borderLayout-bottom1"><xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;position:relative;"></xui:place></bottom></xhtml:div>
  <xui:place control="sysReceiver" id="controlPlace4" style="position:absolute;top:216px;left:198px;"></xui:place></xui:layout> 
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xui:place control="trigger1" id="controlPlace2" style="position:absolute;top:14px;width:94px;right:140px"></xui:place>
  <xui:place control="btnCancel" id="controlPlace3" style="position:absolute;top:14px;width:87px;right:20px"></xui:place>
  </layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" appearance="image-text" class="button-blue">
   <xforms:label id="default1"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[offerActivity.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancel" appearance="image-text" class="button-blue">
   <xforms:label id="default2"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[offerActivity.btnCancelClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  </xui:view>
  
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="gridOffer" data="dataBzsq">
   <xui:column id="gridColumn1" ref="fDeptName" label="申请部门" type="ed" width="100px"></xui:column>
  <xui:column id="gridColumn2" ref="fPersonName" label="申请人" type="ed" width="100px"></xui:column></xhtml:div>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="sysReceiver" onReceive="offerActivity.sysReceiverReceive"></xhtml:div>
  <xforms:textarea ref="data('dataBzsq')/fReason" id="textarea1"></xforms:textarea></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="offerActivity.js"></xhtml:script></xui:resource> 
</xui:window>
