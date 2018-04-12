<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="left:315px;height:auto;top:119px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereAll" data-type="json" auto-load="false" id="fieldChoiceData" concept="B_GroupField" onRefreshCreateParam="fieldActivity.fieldChoiceDataRefreshCreateParam"><reader id="default1" action="/common/archives/logic/action/query_BusinessTablesAction"></reader>
  <writer id="default2" action="/common/archives/logic/action/saveB_GroupFieldAction"></writer>
  <creator id="default3" action="/common/archives/logic/action/createB_GroupFieldAction"></creator></data>
  <xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[fieldActivity.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <top size="30px" id="borderLayout-top1"><xui:place control="toolbars1" id="controlPlace2"></xui:place></top>
   <center id="borderLayout-center1"><xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center></xhtml:div>
  <xui:place control="windowReceiver1" id="controlPlace3" style="position:absolute;top:158px;left:147px;"></xui:place></xui:layout> 
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="fieldChoiceData"><xui:column id="gridColumn6" ref="calcCheckBox" label="#master_checkbox" type="ch" width="56px" show-index="false"></xui:column><xui:column id="gridColumn1" ref="fTableName" label="概念名" type="ed" width="300px" filter-editor="#select_filter"></xui:column>
  <xui:column id="gridColumn2" ref="fFieldName" label="字段名称" type="ed" width="200px" filter-editor="#text_filter" align="center"></xui:column>
  <xui:column id="gridColumn3" ref="fField" label="字段标识" type="ed" width="200px" filter-editor="#text_filter" align="right"></xui:column>
  <xui:column id="gridColumn4" ref="fFieldAlias" label="字段别名" type="ed" width="142px" filter-editor="#text_filter" align="right"></xui:column>
  </xhtml:div>
  <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars1"><xui:bar component="/UI/system/components/bar.xbl.xml#navigatorBar" mode="IMG_TXT_LR" id="navigatorBar1" data="fieldChoiceData">
   <item name="save-item" id="barItem2"></item>
   <item name="filter-pro-item" id="customBarItem1"></item>
   <item name="separator" id="customBarItem2"></item>
   <item id="customBarItem4"></item><item name="separator" id="customBarItem3"></item>
   </xui:bar></xhtml:div>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="fieldActivity.windowReceiver1Receive"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="fieldActivity.js"></xhtml:script></xui:resource> 
</xui:window>
