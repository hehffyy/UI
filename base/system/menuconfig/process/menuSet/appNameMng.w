<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:374px;height:auto;top:175px;">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="B_Menu" concept="B_Menu" order-by="fOrder asc"
      limit="-1"> 
      <reader id="default18" action="/base/system/menuconfig/logic/action/queryB_MenuAction"/>  
      <writer id="default19" action="/base/system/menuconfig/logic/action/saveB_MenuAction"/>  
      <creator id="default20" action="/base/system/menuconfig/logic/action/createB_MenuAction"/>  
      <calculate-relation relation="calculate0" id="calculate-relation1"/>  
      <filter name="filter0" id="filter1"><![CDATA[B_Menu.fParentID is null]]></filter>
    </data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;;"> 
        <center id="borderLayout-center1"> 
          <xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"/>
        </center>  
        <top size="40px" id="borderLayout-top2"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar1" separator-size="10">
            <xui:place control="trg_new" id="controlPlace2"/>  
            <xui:place control="trg_save" id="controlPlace3"/>  
            <xui:place control="trg_del" id="controlPlace4"/>
          </xhtml:div>
        </top> 
      </xhtml:div>
    </xui:layout>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="B_Menu">
      <xui:column id="gridColumn2" ref="calculate0" label="序号" type="ro" width="40px"
        align="center" show-index="true"/>
      <xui:column id="gridColumn1" ref="fName" label="名称" type="ed"/>  
      <xui:column id="gridColumn3" ref="fOrder" label="排序" type="ed" width="100px"
        align="center"/>
    </xhtml:div>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_new"
      operation-owner="B_Menu" operation="new" appearance="image-text" class="button-blue"> 
      <xforms:label id="default1"><![CDATA[新增]]></xforms:label>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_save"
      operation-owner="B_Menu" operation="save" appearance="image-text" class="button-green"> 
      <xforms:label id="default2"><![CDATA[保存]]></xforms:label>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_del"
      appearance="image-text" icon-class="icon-system-trash" class="button-hotpink"> 
      <xforms:label id="default3"><![CDATA[删除]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate">
        <xforms:script id="xformsScript1"><![CDATA[appNameMng.trg_delClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="appNameMng.js"/>
    <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"/>
  </xui:resource> 
</xui:window>
