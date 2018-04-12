<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="width:143px;height:auto;left:339px;top:298px;"> 
    <data auto-load="true" component="/UI/system/components/data.xbl.xml#bizData" concept="B_OfficeTemplate" data-type="json" direct-delete="true" id="dataMain" limit="20" offset="0" update-mode="whereVersion" onAfterNew="mainActivity.dataMainAfterNew"> 
      <reader action="/common/officeTemplate/logic/action/queryB_OfficeTemplateAction" id="default2"/>  
      <writer action="/common/officeTemplate/logic/action/saveB_OfficeTemplateAction" id="default3"/>  
      <creator action="/common/officeTemplate/logic/action/createB_OfficeTemplateAction" id="default4"/> 
    <calculate-relation relation="fTemp" id="calculate-relation1"></calculate-relation>
  <rule id="dataBizRule1" relation="fGroupName" default-value="'默认分组'"></rule></data> 
  <xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[mainActivity.modelLoad(event)]]></xforms:script></xforms:action>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dsDetail" concept="B_BookMark" confirm-delete="false"><reader id="default9" action="/common/officeTemplate/logic/action/queryB_BookMarkAction"></reader>
  <writer id="default10" action="/common/officeTemplate/logic/action/saveB_BookMarkAction"></writer>
  <creator id="default11" action="/common/officeTemplate/logic/action/createB_BookMarkAction"></creator>
  <master id="master1" data="dataMain" relation="fTemplateId"></master></data></xforms:model>  
  <xui:view auto-load="true" id="rootView"> 
    <xforms:trigger appearance="image-text" class="button-blue" component="/UI/system/components/trigger.xbl.xml#trigger" id="newTrigger" operation="new" operation-owner="dataMain"> 
      <xforms:label id="newTriggerLabel"/> 
    </xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger" id="saveTrigger" operation="save" operation-owner="dataMain"> 
      <xforms:label id="saveTriggerLabel"/> 
    </xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger" id="deleteTrigger" operation-owner="dataMain" icon-class="icon-system-cancel"> 
      <xforms:label id="deleteTriggerLabel"><![CDATA[删除]]></xforms:label> 
    <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[mainActivity.deleteTriggerClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger" id="refreshTrigger" operation="refresh" operation-owner="dataMain"> 
      <xforms:label id="refreshTriggerLabel"/> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/bizDataFilterMenu.xbl.xml#bizDataFilterMenu" data="dataMain" id="bizDataFilterMenu1"/>  
    <xhtml:div align="right" component="/UI/system/components/pagination.xbl.xml#pagination" data="dataMain" first-label="首页" id="pagination1" items="first last pre next" last-label="尾页" next-label="下页" page-count="15" pre-label="上页"/>  
    <xui:layout style="overflow:auto;height:100%;width:100%"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top id="borderLayout-top1" size="40px"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" expandable="false" expanded="false" id="ngtbMain" separator="false" separator-size="1"> 
            <xui:place control="newTrigger" id="newTriggerPlace"/>  
            <xui:place control="saveTrigger" id="saveTriggerPlace"/>  
            <xui:place control="deleteTrigger" id="controlPlace2"/>  
            <xui:place control="refreshTrigger" id="refreshTriggerPlace"/>  
            <xui:place control="queryTrigger" id="controlPlace4"/>  
            <xhtml:div class="xui-input" component="/UI/system/components/smartFilter.xbl.xml#smartFilter" filter-data="dataMain" filter-relations="fTemplateName,fGroupName" id="smartFilter1" style="width:120px;"></xhtml:div>  
            <xui:place control="gridFilter1" id="controlPlace11"></xui:place><xforms:trigger appearance="image" class="button-yellow" component="/UI/system/components/trigger.xbl.xml#trigger" icon-class="icon-system-search" id="searchTrigger" operation="refresh" operation-owner="dataMain" style="width:30px;">  
              <xforms:label id="searchTriggerLabel"></xforms:label> 
            </xforms:trigger> 
          </xhtml:div> 
        <xui:place control="trigger3" id="controlPlace12"></xui:place></top>  
        <center id="borderLayout-center1"> 
          <xui:place control="bizDataFilterMenu1" id="controlPlace3" style="top:196px;left:566px;"/>  
          <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1" class="xui-tabPanel" style="height:100%;width:100%;">
   <xui:tab id="tabPage1">
    <xui:label id="xuiLabel1">列表</xui:label>
  <place control="grdMain" id="controlPlace1" style="width:100%;height:100%;"></place></xui:tab> 
   <xui:tab id="tabPage2">
    <xui:label id="xuiLabel2">详细</xui:label>
  <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
   <top size="193px" id="borderLayout-top2"><xhtml:label id="label1" class="xui-label" style="left:30px;"><![CDATA[      Sql语句 :    ]]></xhtml:label><xui:place control="textarea1" id="controlPlace7" style="width:100%;height:77%;"></xui:place>
  <xhtml:label id="label2" class="xui-label" style="left:30px;;"><![CDATA[书签列表 :]]></xhtml:label></top>
   <center id="borderLayout-center2"><xui:place control="grid1" id="controlPlace6" style="height:100%;width:100%;"></xui:place></center></xhtml:div></xui:tab> 
  <xui:tab id="tabPage3">
   <xui:label id="xuiLabel3"><![CDATA[测试页面]]></xui:label>
  <xui:place control="view1" id="controlPlace8" style="height:538px;width:929px;"></xui:place></xui:tab></xhtml:div></center>  
        <bottom id="borderLayout-bottom1" size="45px"> 
          <place control="pagination1" id="controlPlace5"/> 
        </bottom> 
      </xhtml:div> 
    </xui:layout>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger" id="queryTrigger" operation="show" operation-owner="bizDataFilterMenu1"> 
      <xforms:label id="default1"/> 
    </xforms:trigger> 
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" data="dataMain" header-row-height="30" id="grdMain" row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column" edit-mode="true">
   <column id="default5" label="模板名称" ref="fTemplateName" type="ed" width="205px"></column><xui:column id="gridColumn3" ref="fTemplateKey" label="模板标识" type="ed" width="117px"></xui:column>
   <column id="default6" label="分组名称" ref="fGroupName" type="ed" width="156px"></column>
   <column id="default7" label="类型" ref="fKind" type="ed" width="100px" readonly="true"></column>
   <column id="default8" label="操作" ref="fTemp" type="html" width="138px" onRender="mainActivity.grdMain_fTempRender" align="center"></column>
  </xhtml:div>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dsDetail">
   <xui:column id="gridColumn2" ref="fDisplayName" label="显示名称" type="ed" width="252px"></xui:column>
   <xui:column id="gridColumn1" ref="fBookMarkName" label="标签名" type="ed" width="228px"></xui:column>
   </xhtml:div>
  <xforms:textarea ref="data('dataMain')/fSql" id="textarea1"></xforms:textarea>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xui:place control="trigger1" id="controlPlace9" style="position:absolute;top:177px;left:120px;"></xui:place>
  <xui:place control="trigger2" id="controlPlace10" style="position:absolute;top:266px;left:133px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1">
   <xforms:label id="default12"><![CDATA[来自模板]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[mainActivity.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2">
   <xforms:label id="default13">trigger</xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[mainActivity.trigger2Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xhtml:div component="/UI/system/components/filter.xbl.xml#gridFilter" all-selected-label="'全部'" id="gridFilter1" filter-data="dataMain" filter-relation="fKind" default-value="'WORD'" default-label="'WORD'">
   <xforms:label ref="FKIND" id="default14"></xforms:label>
   <xforms:value ref="FKIND" id="default15"></xforms:value>
   <xforms:itemset id="default16">
  <xforms:column ref="FKIND" id="default23"></xforms:column>
  <itemset-data xmlns="" id="default17">
   <rows xmlns="" id="default18">
    <row id="default19">
     <cell id="default20">WORD</cell></row> 
    <row id="default21">
     <cell id="default22">EXCEL</cell></row> 
    <row id="default25">
     <cell id="default26">套红</cell></row> </rows> </itemset-data></xforms:itemset></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3">
   <xforms:label id="default24">trigger</xforms:label>
  <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[mainActivity.trigger3Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>  
  <xui:resource id="resource"><xhtml:script id="htmlScript1" src="mainActivity.js"></xhtml:script>
  <xhtml:script id="htmlScript2" src="/UI/base/lib/butoneExUtils.js"></xhtml:script>
  <xhtml:script id="htmlScript3" src="/UI/base/lib/init.js"></xhtml:script>
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="mainActivity.css"></xhtml:link>
  </xui:resource> 
</xui:window>
