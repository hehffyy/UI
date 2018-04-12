<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="left:367px;height:auto;top:70px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="idiomsData" concept="B_Idioms" limit="-1" direct-delete="true" onAfterNew="mainActivity.idiomsDataAfterNew" order-by="fSort asc"><reader id="default1" action="/base/system/logic/action/queryB_IdiomsAction"></reader>
  <writer id="default2" action="/base/system/logic/action/saveB_IdiomsAction"></writer>
  <creator id="default3" action="/base/system/logic/action/createB_IdiomsAction"></creator>
  <calculate-relation relation="xh" id="calculate-relation1"></calculate-relation>
  <rule id="dataBizRule1" relation="fContent" required="true()"></rule></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="35px" mode="vert" id="VSplitter1" class="xui-splitter" status="normal" has-drag-bar="false" resizable="false" style="width:100%;height:100%;;" has-arrow-button="false">
   <xhtml:div region="top" id="div1"><xui:place control="view1" id="controlPlace2" style="height:100%;width:100%;"></xui:place></xhtml:div>
   <xhtml:div region="bottom" id="div2"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center>
  </xhtml:div></xhtml:div></xhtml:div>
  </xui:layout> 
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="-1" id="grid1" data="idiomsData"><xui:column id="gridColumn2" ref="xh" label="序号" type="ro" width="40px" align="center" show-index="true"></xui:column><xui:column id="gridColumn1" ref="fContent" label="内容" type="textarea"></xui:column>
  </xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="position:absolute;left:5px;"><xui:place control="trg_new" id="controlPlace3"></xui:place>
  <xui:place control="trg_save" id="controlPlace4"></xui:place>
  <xui:place control="trg_del" id="controlPlace5"></xui:place>
  <xui:place control="up" id="controlPlace6"></xui:place>
  <xui:place control="down" id="controlPlace7"></xui:place></xhtml:div>
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar3" style="float:right;padding-right:10px;"><xui:place control="smartFilter1" id="controlPlace9" style="width:150px;"></xui:place>
  <xui:place control="trigger1" id="controlPlace10"></xui:place></xhtml:div></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_new" operation-owner="idiomsData" operation="new" appearance="image-text" class="button-blue">
   <xforms:label id="default4"><![CDATA[新增]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_save" operation-owner="idiomsData" operation="save" appearance="image-text" class="button-blue">
   <xforms:label id="default5"><![CDATA[保存]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_del" operation-owner="idiomsData" operation="delete" appearance="image-text" class="button-orange">
   <xforms:label id="default6"><![CDATA[删除]]></xforms:label></xforms:trigger>
  <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter1" filter-data="idiomsData" filter-relations="fContent" auto-refresh="true"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" operation-owner="idiomsData" operation="refresh" appearance="image-text" icon-class="icon-system-search" class="button-green">
   <xforms:label id="default8"><![CDATA[查询]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="up" appearance="image-text" class="button-green" icon-class="icon-system-up">
   <xforms:label id="default7"><![CDATA[上移]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[mainActivity.upClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="down" appearance="image-text" class="button-green" icon-class="icon-system-down">
   <xforms:label id="default9"><![CDATA[下移]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[mainActivity.downClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  </xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="mainActivity.js"></xhtml:script></xui:resource> 
</xui:window>
