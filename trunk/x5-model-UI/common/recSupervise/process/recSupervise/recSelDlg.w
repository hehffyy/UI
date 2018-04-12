<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dsRec" concept="B_BizRecAttr"><reader id="default1" action="/common/recSupervise/logic/action/queryBizRec"></reader>
  <rule id="dataBizRule1" concept="B_BizRecAttr" readonly="true()"></rule></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
   <top size="49px" id="borderLayout-top2"><xui:place control="view1" id="controlPlace4" style="height:100%;width:100%;"></xui:place></top>
   <center id="borderLayout-center2"><xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center>
  <bottom size="45px" id="borderLayout-bottom2"><xui:place control="pagination1" id="controlPlace3" style="height:100%;width:100%;"></xui:place></bottom></xhtml:div></center>
  <right size="123px" id="borderLayout-right1"><xui:place control="view2" id="controlPlace7" style="height:100%;width:100%;"></xui:place></right>
  </xhtml:div>
  <xui:place control="windowReceiver1" id="controlPlace2" style="position:absolute;top:189px;left:405px;"></xui:place></xui:layout> 
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dsRec">
   <xui:column id="gridColumn4" ref="fBizName" label="业务名称" type="ed" width="129px"></xui:column><xui:column id="gridColumn1" ref="FInComeDocName" label="来文名称" type="ed" width="257px"></xui:column>
   <xui:column id="gridColumn2" ref="FInComeDocOrg" label="来文单位" type="ed" width="201px"></xui:column>
   <xui:column id="gridColumn3" ref="FArchivesCode" label="办文号" type="ed" width="159px"></xui:column>
  <xui:column id="gridColumn5" ref="fReceiveTime" label="收件时间" type="ed" width="100px"></xui:column></xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:label id="label1" style="position:absolute;top:13px;left:17px;" class="xui-label"><![CDATA[快速检索：]]></xhtml:label>
  <xui:place control="smartFilter2" id="controlPlace5" style="position:absolute;top:14px;left:114px;width:265px;"></xui:place>
  <xui:place control="trigger1" id="controlPlace6" style="position:absolute;top:14px;left:401px;"></xui:place></layout>
  <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter2" filter-data="dsRec" filter-relations="FInComeDocName,FInComeDocOrg,FArchivesCode"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" operation-owner="dsRec" operation="refresh" class="button-blue" appearance="image-text" icon-class="icon-system-search">
   <xforms:label id="default2"><![CDATA[查询]]></xforms:label></xforms:trigger></xui:view>
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xui:place control="trgOK" id="controlPlace8" style="position:absolute;left:29px;width:86px;top:42px;"></xui:place>
  <xui:place control="trgCancel" id="controlPlace9" style="position:absolute;left:29px;top:98px;width:86px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgOK" appearance="image-text" class="button-blue">
   <xforms:label id="default3"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[recSelDlg.trgOKClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgCancel" class="button-blue">
   <xforms:label id="default4"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[recSelDlg.trgCancelClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1"></xhtml:div>
  <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next" id="pagination1" data="dsRec"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="recSelDlg.js"></xhtml:script></xui:resource> 
</xui:window>
