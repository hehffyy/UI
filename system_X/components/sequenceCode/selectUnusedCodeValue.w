<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;top:185px;left:479px;"><data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="codeValue,checked" src="" auto-load="true" id="dataCodeList" onIndexChanged="selectUnusedCodeValue.dataCodeListIndexChanged"></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xui:place control="gridCodeValue" id="controlPlace2" style="height:100%;width:100%;"></xui:place></center>
  <bottom size="50px" id="borderLayout-bottom1"><xui:place control="btnCancel" id="controlPlace4" style="float:right;margin:5px 5px"></xui:place>
  <xui:place control="btnSure" id="controlPlace5" style="float:right;margin:5px 5px"></xui:place></bottom></xhtml:div>
  <xui:place control="windowReceiver1" id="controlPlace3" style="position:absolute;top:165px;left:271px;"></xui:place></xui:layout> 
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="gridCodeValue" data="dataCodeList" space-column="false" onRowClick="selectUnusedCodeValue.gridCodeValueRowClick" onRowDblClick="selectUnusedCodeValue.gridCodeValueRowDblClick"><xui:column id="gridColumn3" ref="checked" type="html" width="80px" onRender="selectUnusedCodeValue.grid2_checkedRender" label="选择"></xui:column><xui:column id="gridColumn2" ref="codeValue" label="编码值" type="ro" width="300px" filter-editor="#text_filter"></xui:column>
  </xhtml:div>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="selectUnusedCodeValue.windowReceiver1Receive"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancel">
   <xforms:label id="default1"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[selectUnusedCodeValue.btnCancelClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSure" icon-class="icon-system-check" appearance="image-text" class="button-blue">
   <xforms:label id="default2"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[selectUnusedCodeValue.btnSureClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="selectUnusedCodeValue.js"></xhtml:script></xui:resource> 
</xui:window>
