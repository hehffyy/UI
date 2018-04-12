<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="top:136px;left:315px;height:auto;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="daRec" concept="B_PrepBizRec" limit="50"><creator id="default1"></creator>
  <reader id="default2" action="/common/preBizRec/logic/action/queryFinishRecAction"></reader>
  <writer id="default3"></writer>
  <calculate-relation relation="fCheck" id="calculate-relation1" type="xsd:integer"></calculate-relation></data>
  <xforms:action id="action2" ev:event="onload"><xforms:script id="xformsScript2"><![CDATA[smsCheckActivity.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <top size="48px" id="borderLayout-top1"><xui:place control="view1" id="controlPlace3" style="height:100%;width:100%;"></xui:place></top>
   <center id="borderLayout-center1"><xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center>
  <bottom size="50px" id="borderLayout-bottom1"><xui:place control="pagination1" id="controlPlace2"></xui:place></bottom></xhtml:div></xui:layout> 
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="daRec"><xui:column id="gridColumn16" ref="fCheck" label="#master_checkbox" type="ch" width="44px" align="center"></xui:column><xui:column id="gridColumn1" ref="fSerialNo" label="网上受理号" type="ed" width="100px"></xui:column>
  <xui:column id="gridColumn2" ref="fYWLX" label="业务类型" type="ed" width="206px"></xui:column>
  <xui:column id="gridColumn3" ref="fSQDW" label="申请单位" type="ed" width="216px"></xui:column>
  <xui:column id="gridColumn8" ref="fXMMC" label="项目名称" type="ed" width="208px"></xui:column><xui:column id="gridColumn5" ref="fSQRXM" label="申请人姓名" type="ed" width="100px"></xui:column>
  <xui:column id="gridColumn6" ref="fSQRSJ" label="申请人手机" type="ed" width="100px"></xui:column><xui:column id="gridColumn10" ref="fBJJGMC" label="办结结果" type="ed" width="100px"></xui:column><xui:column id="gridColumn12" ref="fZFHTHYY" label="作废或退回原因" type="ed" width="100px"></xui:column><xui:column id="gridColumn7" ref="fLWRQ" label="来文日期" type="ed" width="100px"></xui:column><xui:column id="gridColumn13" ref="fBJSJ" label="办结时间" type="ed" width="100px"></xui:column>
  
  <xui:column id="gridColumn4" ref="SMSShzt" label="短信审核状态" type="ed" width="100px"></xui:column>
  <xui:column id="gridColumn9" ref="SMSShr" label="短信审核人" type="ed" width="100px"></xui:column>
  <xui:column id="gridColumn15" ref="SMSShsj" label="短信审核时间" type="ed" width="100px"></xui:column>
  
  
  </xhtml:div>
  <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next" id="pagination1" data="daRec"></xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xui:place control="smartFilter1" id="controlPlace4" style="position:absolute;width:195px;top:8px;left:105px;"></xui:place>
  <xhtml:label id="label1" style="position:absolute;top:10px;left:13px;" class="xui-label"><![CDATA[智能过滤：]]></xhtml:label>
  <xhtml:input type="checkbox" name="" id="cbWsh" style="position:absolute;left:330px;top:13px;" checked="true" onchange="smsCheckActivity.cbWshChange(event)"></xhtml:input>
  <xhtml:label id="label2" style="position:absolute;top:10px;left:350px;" class="xui-label"><![CDATA[未审核 ]]></xhtml:label>
  <xui:place control="btnQuery" id="controlPlace6" style="position:absolute;top:8px;left:417px;width:77px;"></xui:place>
  <xui:place control="btnCheck" id="controlPlace7" style="top:8px;position:absolute;left:511px;width:93px;"></xui:place>
  <xui:place control="btnUnCheck" id="controlPlace8" style="top:8px;width:93px;position:absolute;left:620px;"></xui:place></layout>
  <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter1" filter-data="daRec" filter-relations="fSerialNo,fSQDW,fSQRXM,fXMMC"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnQuery" appearance="image-text" class="button-blue" icon-class="icon-system-search">
   <xforms:label id="default4"><![CDATA[查询]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[smsCheckActivity.btnQueryClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCheck" appearance="image-text" class="button-blue" icon-class="icon-system-check">
   <xforms:label id="default5"><![CDATA[确认发送]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[smsCheckActivity.btnCheckClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnUnCheck" appearance="image-text" class="button-blue" icon-class="icon-system-back">
   <xforms:label id="default6"><![CDATA[不发送]]></xforms:label>
  <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[smsCheckActivity.btnUnCheckClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="smsCheckActivity.js"></xhtml:script>
  <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"></xhtml:script>
  <xhtml:script id="htmlScript3" src="/UI/base/lib/butoneExUtils.js"></xhtml:script></xui:resource> 
</xui:window>
