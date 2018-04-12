<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;width:235px;top:173px;left:380px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="userProcessData" concept="B_UserProcess" order-by="fDispOrder asc" limit="-1" onAfterRefresh="userMaterial.userProcessDataAfterRefresh" onIndexChanged="userMaterial.userProcessDataIndexChanged"> 
      <reader id="default1" action="/base/core/material/logic/action/queryB_UserProcessAction"/>  
      <writer id="default2" action="/base/core/material/logic/action/saveB_UserProcessAction"/>  
      <creator id="default4" action="/base/core/material/logic/action/createB_UserProcessAction"/> 
    <calculate-relation relation="calculate0" id="calculate-relation1"></calculate-relation>
  </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="UserBusinessMaterialData" concept="B_UserBusinessMaterial" limit="10" order-by="fDispOrder asc" onDataChanged="userMaterial.UserBusinessMaterialDataDataChanged" onAfterNew="userMaterial.UserBusinessMaterialDataAfterNew">
      <reader id="default9" action="/base/core/material/logic/action/queryB_UserBusinessMaterialAction"/>  
      <writer id="default10" action="/base/core/material/logic/action/saveB_UserBusinessMaterialAction"/>  
      <creator id="default11" action="/base/core/material/logic/action/createB_UserBusinessMaterialAction"/>
    <master id="master1"></master>
  <rule id="dataBizRule2" relation="fMaterialName" required="true()"></rule>
  <rule id="dataBizRule3" relation="fMtNums" required="true()"></rule>
  <rule id="dataBizRule4" relation="fMaterialAttribute" required="true()"></rule>
  <rule id="dataBizRule5" relation="fDispOrder" required="true()"></rule></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="materialData" concept="SysDictItem" onRefreshCreateParam="userMaterial.materialDataRefreshCreateParam"><reader id="default13" action="/base/system/logic/action/querySysDictItemByTypeAction"></reader></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="newUserData" concept="B_UserProcess" order-by="fDispOrder asc" limit="-1" onIndexChanged="userMaterial.newUserDataIndexChanged">
   <reader id="default8" action="/base/core/material/logic/action/queryB_UserProcessAction"></reader>
   <writer id="default12" action="/base/core/material/logic/action/saveB_UserProcessAction"></writer>
   <creator id="default3" action="/base/core/material/logic/action/createB_UserProcessAction"></creator>
   <calculate-relation relation="calculate0" id="calculate-relation2"></calculate-relation></data>
  <xforms:action id="action3" ev:event="xbl-loaded"><xforms:script id="xformsScript3"><![CDATA[userMaterial.model1XBLLoaded(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;position:relative;width:100%;" id="rootLayout" type="flow"> 
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="40%"
        mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;" has-drag-bar="true" has-arrow-button="true"> 
        <xhtml:div region="left" id="div1">
          <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1" class="xui-tabPanel" style="height:100%;width:100%;">
   <xui:tab id="tabPage1" selected="true" xforms-select="userMaterial.tabPage1Select">
    <xui:label id="xuiLabel1"><![CDATA[自定义]]></xui:label>
  <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;left:5px;;">
   <top size="40px" id="borderLayout-top2">
    <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar2" style="height:34px;width:443px;" expandable="false">
     <xui:place control="trigger1" id="controlPlace1" style="width:47px;"></xui:place>
     <xui:place control="trigger2" id="controlPlace2"></xui:place>
     <xui:place control="trigger3" id="controlPlace3"></xui:place>
     <xui:place control="copyNew" id="controlPlace9" style="width:63px;"></xui:place>
     <xui:place control="setDefault" id="controlPlace8" style="width:37px;"></xui:place></xhtml:div> </top> 
   <center id="borderLayout-center2">
    <xui:place control="grid2" id="controlPlace6" style="height:100%;width:100%;left:0;top:0;"></xui:place></center> </xhtml:div></xui:tab> 
   <xui:tab id="tabPage2" xforms-select="userMaterial.tabPage2Select">
    <xui:label id="xuiLabel2"><![CDATA[系統默认]]></xui:label>
  <xui:place control="view4" id="controlPlace18" style="height:100%;width:100%;"></xui:place></xui:tab> </xhtml:div></xhtml:div>  
        <xhtml:div region="right" id="div2">
          <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel2" class="xui-tabPanel" style="width:100%;height:100%;">
   <xui:tab id="tabPage3">
    <xui:label id="xuiLabel3"><![CDATA[请维护自定义材料内容]]></xui:label>
  <xui:place control="view2" id="controlPlace11" style="height:100%;width:100%;"></xui:place></xui:tab> 
   </xhtml:div></xhtml:div> 
      </xhtml:div> 
    <xui:place control="windowReceiver1" id="controlPlace20" style="position:absolute;top:345px;left:526px;"></xui:place></xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1"></xhtml:div>
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;position:absolute;left:0px;top:0px;">
   <top size="40px" id="borderLayout-top1"><xui:place control="view3" id="controlPlace12" style="height:100%;width:100%;"></xui:place></top>
   <center id="borderLayout-center1"><xui:place control="grid5" id="controlPlace16" style="width:100%;height:101%;"></xui:place></center></xhtml:div></layout>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid5" data="UserBusinessMaterialData">
   <xui:column id="gridColumn14" ref="fDispOrder" label="顺序" type="ed" width="60px" align="center" show-index="false"></xui:column>
   <xui:column id="gridColumn11" ref="fMaterialName" label="材料名称" type="ed" width="*"></xui:column>
   <xui:column id="gridColumn12" ref="fMaterialAttribute" label="材料属性" type="select" width="130px" editor="gridSelect1">
    <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect1" ref="data('UserBusinessMaterialData')/fMaterialAttribute">
     <xforms:label ref="FNAME" id="default15"></xforms:label>
     <xforms:value ref="FNAME" id="default16"></xforms:value>
     <xforms:itemset id="default17" data="materialData">
      <xforms:column ref="FNAME" id="default23"></xforms:column></xforms:itemset> </xhtml:div> </xui:column> 
   <xui:column id="gridColumn13" ref="fMtNums" label="材料份数" type="ed" width="70px" align="center"></xui:column></xhtml:div>
  <xui:view auto-load="true" id="view3" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout3"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="position:absolute;top:0px;left:0px;height:100%;width:100%;"><xui:place control="trigger4" id="controlPlace13"></xui:place>
  <xui:place control="trigger5" id="controlPlace14"></xui:place>
  <xui:place control="trigger6" id="controlPlace15"></xui:place>
  <xui:place control="trigger7" id="controlPlace17"></xui:place></xhtml:div></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4" operation-owner="UserBusinessMaterialData" operation="new" appearance="image-minimal">
   <xforms:label id="default18"><![CDATA[]]></xforms:label>
  <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[userMaterial.trigger4Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5" operation-owner="UserBusinessMaterialData" operation="save" appearance="image-minimal">
   <xforms:label id="default19"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger6" operation-owner="UserBusinessMaterialData" operation="delete" appearance="image-minimal">
   <xforms:label id="default20"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger7" operation-owner="UserBusinessMaterialData" operation="refresh" appearance="image-minimal">
   <xforms:label id="default21"><![CDATA[]]></xforms:label></xforms:trigger></xui:view></xui:view>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" operation-owner="newUserData" appearance="image-text" class="button-blue" operation="new">
   <xforms:label id="default5"><![CDATA[新增]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" operation-owner="newUserData" appearance="image-text" class="button-blue" operation="save">
   <xforms:label id="default6"></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" operation-owner="newUserData" appearance="image-minimal" class="button-blue" operation="delete">
   <xforms:label id="default7"></xforms:label>
  <xforms:action id="action6" ev:event="DOMActivate"><xforms:script id="xformsScript6"><![CDATA[userMaterial.trigger3Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="copyNew" class="button-blue">
   <xforms:label id="default14">复制新增</xforms:label>
   <xforms:action id="action2" ev:event="DOMActivate">
    <xforms:script id="xformsScript2">userMaterial.copyNewClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="setDefault" class="button-blue">
   <xforms:label id="default24">默认</xforms:label>
   <xforms:action id="action1" ev:event="DOMActivate">
    <xforms:script id="xformsScript1">userMaterial.setDefaultClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid2" data="newUserData">
   <xui:column id="gridColumn2" ref="fDispOrder" label="顺序" type="ed" width="48px" show-index="true" enter-selected="false"></xui:column>
   <xui:column id="gridColumn1" ref="fBusinessName" label="业务分类" type="ed" width="*"></xui:column>
   <xui:column id="gridColumn3" ref="fIsDefault" label="默认" type="ed" width="60px" align="center" readonly="true"></xui:column>
   <xui:column id="gridColumn15" ref="calculate0" label="操作" type="html" width="70px" onRender="userMaterial.grid2_calculate0Render" align="center"></xui:column></xhtml:div>
  <xui:view auto-load="true" id="view4" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout4"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout3" style="width:100%; height: 100%;position:absolute;left:0px;top:0px;">
   <top size="40px" id="borderLayout-top3"><xui:place control="view1" id="controlPlace4" style="height:100%;width:100%;"></xui:place></top>
   <center id="borderLayout-center3"><xui:place control="grid1" id="controlPlace19" style="height:100%;width:100%;"></xui:place></center></xhtml:div></layout>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="userProcessData">
   <xui:column id="gridColumn6" ref="fDispOrder" label="顺序" type="ed" width="48px" show-index="true" enter-selected="false"></xui:column>
   <xui:column id="gridColumn7" ref="fBusinessName" label="业务分类" type="ed" width="*" readonly="true"></xui:column>
   <xui:column id="gridColumn4" ref="calculate0" label="操作" type="html" width="70px" align="center" onRender="userMaterial.grid1_calculate0Render"></xui:column></xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar3" style="position:absolute;top:0px;left:0px;height:100%;width:100%;"><xui:place control="trigger9" id="controlPlace7" style="width:112px;"></xui:place></xhtml:div></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger9" class="button-blue">
   <xforms:label id="default25"><![CDATA[复制到个人分组]]></xforms:label>
   <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[userMaterial.trigger9Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view></xui:view></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="userMaterial.js"></xhtml:script>
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="userMaterial.css"></xhtml:link></xui:resource> 
</xui:window>
