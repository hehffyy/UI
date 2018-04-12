<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:364px;height:auto;top:104px;">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData1" concept="M_FLOW" confirm-delete="false" confirm-refresh="false" limit="-1">
      <reader id="default1" action="/bizmodel/modelService/logic/action/queryBizProcessAction"/>  
      <calculate-relation relation="checked" id="calculate-relation1" type="xsd:boolean"></calculate-relation></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="48px" id="borderLayout-top1">
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar1">
            <xui:place control="smartFilter1" id="controlPlace2" style="width:377px;margin-left:15px;height:30px;margin-top:5px;"/>
          </xhtml:div>
        </top>  
        <center id="borderLayout-center1">
          <xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"/>
        </center>  
        <bottom size="40px" id="borderLayout-bottom1">
          <xui:place control="trigger1" id="controlPlace4" style="float:right;margin:5px"/>
        </bottom>
      </xhtml:div>  
      <xui:place control="windowReceiver1" id="controlPlace5" style="position:absolute;top:185px;left:654px;"/>
    </xui:layout>  
    <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
      id="smartFilter1" filter-data="bizData1" filter-relations="fName,fFlowName,fBizName,fPath,fPathName"
      auto-refresh="true"/>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="bizData1" multi-selection="true"> 
      <xui:column id="gridColumn7" ref="fName" label="序号" type="ro" width="40px" show-index="true"></xui:column><xui:column id="gridColumn6" ref="checked" label="选择" type="ch" width="42px"></xui:column><xui:column id="gridColumn2" ref="fBizName" label="业务名称" type="ro" width="268px" /><xui:column id="gridColumn3" ref="fFlowName" label="流程名称" type="ed" width="323px"></xui:column>  
      <xui:column id="gridColumn5" ref="fPathName" label="业务路径" type="ro" width="300px"/>  
      <xui:column id="gridColumn1" ref="fProcess" type="ro" width="400px" label="流程全路径"/>
    </xhtml:div>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
      appearance="image-text" icon-class="icon-system-ok" class="button-blue"> 
      <xforms:label id="default2"><![CDATA[确定]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate">
        <xforms:script id="xformsScript1"><![CDATA[processSelectDialog.trigger1Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1"/>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="processSelectDialog.js"/>
  </xui:resource> 
</xui:window>
