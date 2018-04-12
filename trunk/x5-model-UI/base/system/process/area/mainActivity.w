<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;left:55px;top:133px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="main" concept="B_Area" limit="-1" is-tree="true" auto-new="false" order-by="fDisOrder asc"><reader id="default1" action="/base/system/logic/action/queryB_AreaAction"></reader>
  <writer id="default2" action="/base/system/logic/action/saveB_AreaAction"></writer>
  <creator id="default3" action="/base/system/logic/action/createB_AreaAction"></creator>
  <tree-option id="default4" parent-relation="fParentId" virtual-root="区域信息" node-level-relation="fLevel"></tree-option></data>
  <xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[mainActivity.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xui:place control="toolbars2" id="controlPlace15"></xui:place>
  <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="25%" mode="horz" id="HSplitter2" class="xui-splitter" style="width:100%;height:90%;">
   <xhtml:div region="left" id="div3"><xui:place control="tree1" id="controlPlace16" style="height:100%;width:100%;"></xui:place></xhtml:div>
   <xhtml:div region="right" id="div4"><xui:place control="view1" id="controlPlace18" style="height:100%;width:100%;"></xui:place></xhtml:div></xhtml:div></xui:layout> 
  <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars2"><xui:bar component="/UI/system/components/bar.xbl.xml#navigatorBar" mode="IMG_TXT_LR" id="navigatorBar2" data="main">
   <xhtml:div component="/UI/system/components/menuButton.xbl.xml#menuButton" id="menuButton1" label="新建">
    <menuitem id="menuitem1" name="newChild" operation-owner="main"></menuitem>
    <menuitem id="newBrother" name="newBrother" operation-owner="main"></menuitem>
    <menuitem id="newRoot" name="newRoot" operation-owner="main"></menuitem></xhtml:div> 
   <item id="customBarItem7"></item><item name="create-new-root-item" id="barItem19"></item>
   <item name="create-new-child-item" id="barItem17"></item>
   <item name="create-new-brother-item" id="barItem18"></item>
   <item name="save-item" id="barItem10"></item>
   <item name="delete-item" id="barItem11"></item>
   <item name="refresh-item" id="barItem12"></item>
  <item name="expand-this-item" id="barItem22"></item>
  <item name="expand-all-item" id="barItem23"></item>
  <item name="collapse-this-item" id="barItem24"></item>
  <item name="collapse-all-item" id="barItem25"></item>
   <item name="separator" id="customBarItem5"></item></xui:bar></xhtml:div>
  <xhtml:div class="ui-light" component="/UI/system/components/grid.xbl.xml#grid" appearance="tree" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="tree1" data="main"><xui:column id="gridColumn2" ref="fAreaName" label="区域名称" type="tree" width="150px"></xui:column></xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1">
  <xui:place control-label="input2" id="controlLabel1" style="position:absolute;top:25px;left:21px;"></xui:place><xui:place control="input2" id="controlPlace19" style="position:absolute;width:389px;top:21px;left:101px;"></xui:place>
  <xui:place control-label="input3" id="controlLabel2" style="position:absolute;width:76px;top:54px;left:21px;"></xui:place><xui:place control="input3" id="controlPlace20" style="position:absolute;width:389px;top:50px;left:101px;"></xui:place>
  <xui:place control-label="input4" id="controlLabel3" style="position:absolute;top:83px;left:21px;"></xui:place><xui:place control="input4" id="controlPlace21" style="position:absolute;width:390px;top:79px;left:101px;"></xui:place>
  <xui:place control-label="textarea1" id="controlLabel4" style="position:absolute;left:21px;top:149px;"></xui:place><xui:place control="textarea1" id="controlPlace22" style="position:absolute;left:101px;height:62px;width:391px;top:149px;"></xui:place>
  <xui:place control-label="input1" id="controlLabel5" style="left:21px;position:absolute;top:114px;"></xui:place>
  <xui:place control="input1" id="controlPlace1" style="width:390px;left:101px;position:absolute;top:114px;"></xui:place></layout>
  <xforms:input id="input2" ref="data('main')/fDisOrder"></xforms:input>
  <xforms:input id="input3" ref="data('main')/fAreaName"></xforms:input>
  <xforms:input id="input4" ref="data('main')/fAreaCode"></xforms:input>
  <xforms:textarea ref="data('main')/fRemark" id="textarea1"></xforms:textarea>
  <xforms:input id="input1" ref="data('main')/fAreaCode1"></xforms:input></xui:view></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="mainActivity.js"></xhtml:script></xui:resource> 
</xui:window>
