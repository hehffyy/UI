<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:17px;height:auto;top:118px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizUnitType" concept="B_UnitType" onAfterNew="mainActivity.bizUnitTypeAfterNew"> 
      <reader id="default1" action="/base/system/logic/action/queryB_UnitTypeAction"/>  
      <writer id="default2" action="/base/system/logic/action/saveB_UnitTypeAction"/>  
      <creator id="default3" action="/base/system/logic/action/createB_UnitTypeAction"/>  
      <calculate-relation relation="indexNum" id="calculate-relation1" type="xsd:integer"/>  
      </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="FID,FNAME" src="" auto-load="true" id="data1" store-type="simple"/>  
    <xforms:action id="action1" ev:event="onload"> 
      <xforms:script id="xformsScript1"><![CDATA[mainActivity.model1Load(event)]]></xforms:script> 
    </xforms:action>  
    </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="37px" id="borderLayout-top1"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar1" style="height:34px;width:867px;" separator-size="10"> 
            <xui:place control="trigger1" id="controlPlace1"/>  
            <xui:place control="trigger2" id="controlPlace2"/>  
            <xui:place control="trigger3" id="controlPlace3"/>  
            <xui:place control="trigger4" id="controlPlace4"/>  
            <li class="space " style="margin: 0 4px;">|</li>
            <xui:place control-label="gridSelect3" id="controlLabel1" label="单位类型" style="font-size:14px;"/>  
            <xui:place control="gridSelect3" id="controlPlace12" style="height:24px;"/>  
            </xhtml:div> 
        </top>  
        <center id="borderLayout-center1"> 
          <xui:place control="grid1" id="controlPlace7" style="width:100%;height:98%;"/> 
        </center>  
        <bottom size="40px" id="borderLayout-bottom1"> 
          <xui:place control="pagination1" id="controlPlace8" style="height:36px;"/> 
        </bottom> 
      </xhtml:div> 
    </xui:layout>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="38" row-height="32" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="bizUnitType"> 
      <xui:column id="gridColumn5" ref="indexNum" label="序号" type="ro" width="30px"
        align="center" show-index="true"/>  
      <xui:column id="gridColumn1" ref="fUnitType" label="单位类型" type="ro" width="167px"/>  
      <xui:column id="gridColumn2" ref="fUnitCode" label="单位编码" type="ed" width="214px"/>  
      <xui:column id="gridColumn3" ref="fUnitName" label="单位名称" type="ed" width="218px"/>  
      <xui:column id="gridColumn4" ref="fRate" label="换算关系" type="ed" width="334px"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next"
      id="pagination1" align="right" data="bizUnitType"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
      operation-owner="bizUnitType" operation="new" appearance="image-minimal"> 
      <xforms:label id="default4"><![CDATA[]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
      operation-owner="bizUnitType" operation="save" appearance="image-minimal"> 
      <xforms:label id="default5"><![CDATA[]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3"
      operation-owner="bizUnitType" operation="delete" appearance="image-minimal"> 
      <xforms:label id="default6"><![CDATA[]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4"
      operation-owner="bizUnitType" operation="refresh" appearance="image-minimal"> 
      <xforms:label id="default7"><![CDATA[]]></xforms:label> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
      dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
      ext-separator="," id="gridSelect3" ref="data('data1')/FNAME" label-ref="data('data1')/FNAME"> 
      <xforms:label ref="FNAME" id="default16"/>  
      <xforms:value ref="FNAME" id="default17"/>  
      <xforms:itemset id="default18" data="data1" auto-load-data="true" independence="true"> 
        <xforms:column ref="FNAME" id="default20"/> 
      </xforms:itemset> 
    </xhtml:div>  
    </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="mainActivity.js"/> 
  </xui:resource> 
</xui:window>
