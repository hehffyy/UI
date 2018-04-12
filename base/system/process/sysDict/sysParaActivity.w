<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml">  
  <xforms:model id="model1" style="height:auto;top:178px;left:191px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" concept="B_sysPara" data-type="json" auto-load="true" id="mainData" limit="-1"><creator id="default1" action="/base/system/logic/action/createB_sysParaAction"></creator>
  <reader id="default2" action="/base/system/logic/action/queryB_sysParaAction"></reader>
  <writer id="default3" action="/base/system/logic/action/saveB_sysParaAction"></writer>
  <calculate-relation relation="calculate0" id="calculate-relation1"></calculate-relation></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <top size="30px" id="borderLayout-top1"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1"><xui:place control="trigger1" id="controlPlace2"></xui:place>
  <xui:place control="trigger2" id="controlPlace3"></xui:place>
  <xui:place control="trigger3" id="controlPlace4"></xui:place>
  <xui:place control="trigger4" id="controlPlace5"></xui:place></xhtml:div></top>
   <center id="borderLayout-center1"><xui:place control="grid1" id="controlPlace6" style="height:100%;width:100%;"></xui:place></center></xhtml:div></xui:layout> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" operation-owner="mainData" operation="new" appearance="image-minimal">
   <xforms:label id="default4"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" operation-owner="mainData" operation="save" appearance="image-minimal">
   <xforms:label id="default5"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" operation-owner="mainData" operation="delete" appearance="image-minimal">
   <xforms:label id="default6"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4" operation-owner="mainData" operation="refresh" appearance="image-minimal">
   <xforms:label id="default7"><![CDATA[]]></xforms:label></xforms:trigger>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="mainData"><xui:column id="gridColumn4" ref="calculate0" label="序号" type="ro" width="61px" show-index="true"></xui:column><xui:column id="gridColumn1" ref="sysName" label="参数名" type="ed" width="254px" filter-editor="#text_filter"></xui:column>
  <xui:column id="gridColumn2" ref="sysValue" label="参数值" type="ed" width="196px"></xui:column>
  <xui:column id="gridColumn3" ref="fRemark" label="备注" type="ed" width="*"></xui:column>
  </xhtml:div></xui:view>  
  <xui:resource id="resource1"/> 
</xui:window>
