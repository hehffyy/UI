<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="left:513px;height:auto;top:121px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dOrgTree" concept="SA_OPOrg" limit="-1" confirm-refresh="false" is-tree="true">
   <reader id="default3" action="/SA/OPM/logic/action/queryOPOrgAction"></reader>
   <tree-option id="default4" parent-relation="sParent" root-filter="SA_OPOrg.sParent is null and SA_OPOrg.sValidState&lt;&gt;-1 and not SA_OPOrg.sName in ('起步软件','博通股份','博通公司')"></tree-option>
   <filter name="filter0" id="filter1"><![CDATA[SA_OPOrg.sOrgKindID <> 'pos' and SA_OPOrg.sOrgKindID <> 'psm'
and SA_OPOrg.sValidState = '1']]></filter></data>
  <xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[deptProcessOrder.model1Load(event)]]></xforms:script></xforms:action>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="B_ProcessOrder" concept="B_ProcessOrder" limit="-1"><reader id="default1" action="/common/recFuncs/logic/action/queryB_ProcessOrderAction"></reader>
  <writer id="default2" action="/common/recFuncs/logic/action/saveB_ProcessOrderAction"></writer>
  <creator id="default5" action="/common/recFuncs/logic/action/createB_ProcessOrderAction"></creator>
  </data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="340px" mode="horz" id="HSplitter" class="xui-splitter" style="height:100%;width:100%;">
   <xhtml:div region="left" id="div1"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xui:place control="gridOrgTree" id="controlPlace4" style="border-style:solid solid solid solid;border-width:1px 1px 1px 1px;border-color:#C0C0C0 #C0C0C0 #C0C0C0 #C0C0C0;height:100%;border:none;padding:5px;width:100%;"></xui:place></center></xhtml:div></xhtml:div>
   <xhtml:div region="right" id="div2"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
   <top size="40px" id="borderLayout-top2"><xui:place control="view3" id="controlPlace6" style="height:100%;width:100%;"></xui:place></top>
   <center id="borderLayout-center2"><xui:place control="grid1" id="controlPlace2" style="height:100%;width:100%;"></xui:place></center></xhtml:div></xhtml:div></xhtml:div>
  <xui:place control="dlgSelectProcess" id="controlPlace14" style="left:573px;top:224px;"></xui:place></xui:layout> 
  <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" show-header-menu="hide-column,save-layout,group-column,adjust-column" id="gridOrgTree" data="dOrgTree" appearance="tree" space-column="false" class="ui-light" onRowDblClick="deptProcessOrder.gridOrgTreeRowDblClick" onRowClick="deptProcessOrder.gridOrgTreeRowClick">
   <xui:column id="gridColumn1" ref="sName" label="名称" type="tree" readonly="true" width="#"></xui:column></xhtml:div>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="B_ProcessOrder" edit-mode="true"><xui:column id="gridColumn5" ref="fProcessOrder" label="显示顺序" type="ed" width="80px" align="center"></xui:column><xui:column id="gridColumn2" ref="fFuncName" label="业务名称" type="ed" width="200px" readonly="true"></xui:column>
  <xui:column id="gridColumn4" ref="fFuncLongName" label="功能全名" type="ed" width="400px" readonly="true"></xui:column><xui:column id="gridColumn3" ref="fProcess" label="fProcess" type="ed" width="*" readonly="true"></xui:column>
  
  </xhtml:div>
  <xui:view auto-load="true" id="view3" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout3">
  <xui:place control="selectProcess" id="controlPlace8" style="position:absolute;top:7px;left:7px;"></xui:place>
  <xui:place control="trigger2" id="controlPlace9" style="position:absolute;top:7px;left:78px;"></xui:place>
  <xui:place control="trigger3" id="controlPlace10" style="position:absolute;top:7px;left:150px;"></xui:place>
  <xui:place control="trigger4" id="controlPlace11" style="position:absolute;top:7px;left:222px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="selectProcess" appearance="image-text" icon-class="icon-system-plus-circle">
   <xforms:label id="default6"><![CDATA[添加业务]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[deptProcessOrder.selectProcessClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" operation-owner="B_ProcessOrder" operation="save" appearance="image-text">
   <xforms:label id="default7"><![CDATA[保存]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" operation-owner="B_ProcessOrder" operation="delete" appearance="image-text">
   <xforms:label id="default8"><![CDATA[删除]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4" operation-owner="B_ProcessOrder" operation="refresh" appearance="image-text">
   <xforms:label id="default9"><![CDATA[刷新]]></xforms:label></xforms:trigger></xui:view>
  <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="" width="800px" height="600px" modal="true" id="dlgSelectProcess" url="/bizmodel/modelService/process/ModelService/processSelectDialog.w" onReceive="deptProcessOrder.dlgSelectProcessReceive" onInit="deptProcessOrder.dlgSelectProcessInit"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="deptProcessOrder.js"></xhtml:script></xui:resource> 
</xui:window>
