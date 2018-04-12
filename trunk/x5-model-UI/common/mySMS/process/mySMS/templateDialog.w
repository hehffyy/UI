<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="top:118px;left:348px;height:73px;width:207px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="B_personPhoneTemplate" concept="B_personPhoneTemplate" limit="-1"><reader id="default3" action="/common/mySMS/logic/action/queryB_personPhoneTemplateAction"></reader>
  <calculate-relation relation="calculate1" id="calculate-relation1"></calculate-relation></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xui:place control="windowReceiver" id="controlPlace1" style="position:absolute;top:121px;left:219px;"></xui:place>
  <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xui:place control="grid1" id="controlPlace5" style="height:100%;width:100%;"></xui:place></center>
  <bottom size="50px" id="borderLayout-bottom1"><xui:place control="view1" id="controlPlace2" style="height:100%;width:100%;"></xui:place></bottom></xhtml:div></xui:layout> 
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver"></xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="float:right;padding-right:15px;padding-top:5px;"><xui:place control="trigger1" id="controlPlace3"></xui:place>
  <xui:place control="trigger2" id="controlPlace4"></xui:place></xhtml:div></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" appearance="image-text" class="button-green" icon-class="icon-system-ok">
   <xforms:label id="default1"><![CDATA[确认]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[templateDialog.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" appearance="image-text" icon-class="icon-system-cancel">
   <xforms:label id="default2"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[templateDialog.trigger2Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="B_personPhoneTemplate" onRowDblClick="templateDialog.grid1RowDblClick"><xui:column id="gridColumn2" ref="calculate1" label="序号" type="ro" width="50px" align="center" readonly="true" show-index="true"></xui:column><xui:column id="gridColumn1" ref="fTemplateName" label="模版名称" type="ed" width="300px" readonly="true"></xui:column>
  </xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="templateDialog.js"></xhtml:script></xui:resource> 
</xui:window>
