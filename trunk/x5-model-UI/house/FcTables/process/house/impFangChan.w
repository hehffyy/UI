<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;left:527px;top:37px;"><data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="xzq" src="" auto-load="true" id="dataParam" store-type="simple"><rows xmlns="" id="default1">
   <row id="default3">
    <cell id="default4">肇庆市</cell></row> </rows></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;position:relative;" id="rootLayout" type="absolute"><xui:place control="gridSelect1" id="controlPlace1" style="display:none;position:absolute;left:23px;top:5px;"></xui:place>
  <xui:place control="impHouseRegData" id="controlPlace7" style="position:absolute;width:133px;left:211px;top:76px;"></xui:place>
  <xui:place control="impHXT" id="controlPlace16" style="width:121px;position:absolute;left:374px;top:76px;"></xui:place></xui:layout> 
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect1" label-ref="data('dataParam')/xzq" ref="data('dataParam')/xzq">
   <xforms:label ref="xzq" id="default5"></xforms:label>
   <xforms:value ref="xzq" id="default6"></xforms:value>
   <xforms:itemset id="default7"><xforms:column ref="xzq" id="default8"></xforms:column>
  <itemset-data xmlns="" id="default14">
   <rows xmlns="" id="default15">
    <row id="default16">
     <cell id="default17">肇庆市</cell></row> 
    <row id="default18">
     <cell id="default19">德庆</cell></row> 
    <row id="default20">
     <cell id="default21">封开</cell></row> 
    <row id="default22">
     <cell id="default23">高要</cell></row> 
    <row id="default24">
     <cell id="default25">广宁</cell></row> 
    <row id="default26">
     <cell id="default27">怀集</cell></row> </rows> </itemset-data></xforms:itemset></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="impHouseRegData">
   <xforms:label id="default13"><![CDATA[导入房产数据(ALL)]]></xforms:label>
  <xforms:action id="action6" ev:event="DOMActivate"><xforms:script id="xformsScript6"><![CDATA[impFangChan.impHouseRegDataClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="impHXT" icon-class="icon-system-menu">
   <xforms:label id="default36"><![CDATA[导入户型图]]></xforms:label>
   <xforms:action id="action17" ev:event="DOMActivate"><xforms:script id="xformsScript17"><![CDATA[impFangChan.impHXTClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="impFangChan.js"></xhtml:script></xui:resource> 
</xui:window>
