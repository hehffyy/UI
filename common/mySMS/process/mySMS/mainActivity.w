<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;top:133px;left:367px;width:180px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="VIEW_SMSINFO" concept="VIEW_SMSINFO" limit="30"><reader id="default1" action="/common/mySMS/logic/action/queryVIEW_SMSINFOAction"></reader>
  <writer id="default2"></writer>
  <creator id="default3"></creator>
  <calculate-relation relation="calculate2" id="calculate-relation1"></calculate-relation></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="VIEW_SMSRECEIVEINFO" concept="VIEW_SMSRECEIVEINFO" limit="-1"><reader id="default4" action="/common/mySMS/logic/action/queryVIEW_SMSRECEIVEINFOAction"></reader>
  <writer id="default5"></writer>
  <creator id="default6"></creator>
  <calculate-relation relation="calculate3" id="calculate-relation2"></calculate-relation>
  <master id="master1" data="VIEW_SMSINFO" relation="FSMSID"></master></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <top size="40px" id="borderLayout-top1"><xui:place control="view1" id="controlPlace3" style="height:100%;width:100%;"></xui:place></top>
   <center id="borderLayout-center1"><xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="60%" mode="vert" id="VSplitter1" class="xui-splitter" style="height:100%;width:100%;" has-drag-bar="true">
   <xhtml:div region="top" id="div1"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
   <center id="borderLayout-center2"><xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center>
  <right size="250px" id="borderLayout-right1"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout4" style="width:100%; height: 100%;;">
   <top size="40px" id="borderLayout-top4"><xhtml:label id="label1" class="xui-label" style="font-size:large;margin-top:10px;margin-left:20px;"><![CDATA[短信内容：]]></xhtml:label></top>
   <center id="borderLayout-center4"><xui:place control="textarea1" id="controlPlace10" style="height:100%;width:100%;"></xui:place></center></xhtml:div></right></xhtml:div></xhtml:div>
   <xhtml:div region="bottom" id="div2"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout3" style="width:100%; height: 100%;;">
   <center id="borderLayout-center3"><xui:place control="grid2" id="controlPlace2" style="height:100%;width:100%;"></xui:place></center>
  <right size="250px" id="borderLayout-right2"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout5" style="width:100%; height: 100%;;;">
   <top size="40px" id="borderLayout-top5">
    <xhtml:label id="label2" class="xui-label" style="font-size:large;margin-top:10px;margin-left:20px;"><![CDATA[回复内容：]]></xhtml:label></top> 
   <center id="borderLayout-center5">
    <xui:place control="textarea2" id="controlPlace11" style="height:100%;width:100%;"></xui:place></center> </xhtml:div></right></xhtml:div></xhtml:div></xhtml:div></center>
  </xhtml:div>
  <xui:place control="templateRunner" id="controlPlace13" style="position:absolute;top:164px;left:245px;"></xui:place>
  <xui:place control="sendRunner" id="controlPlace15" style="position:absolute;top:168px;left:110px;"></xui:place></xui:layout> 
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="30" row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="50" id="grid1" data="VIEW_SMSINFO" onRowDblClick="mainActivity.grid1RowDblClick"><xui:column id="gridColumn9" ref="calculate2" label="序号" type="ro" width="50px" align="center" readonly="true" show-index="true"></xui:column>
  <xui:column id="gridColumn11" ref="FSENDERNAME" label="发送人" type="ro" width="120px" align="center" readonly="true"></xui:column>
  <xui:column id="gridColumn12" ref="FSENDTIME" label="发送时间" type="ro" width="150px" align="center" readonly="true"></xui:column>
  <xui:column id="gridColumn13" ref="FSTATE" label="发送状态" type="ro" width="100px" align="center" readonly="true"></xui:column>
  <xui:column id="gridColumn15" ref="FNEEDBACK" label="需要回复" type="ro" width="100px" align="center" readonly="true"></xui:column>
  <xui:column id="gridColumn16" ref="FSMSTYPE" label="短信类型" type="ro" width="100px" align="center" readonly="true"></xui:column>
  </xhtml:div>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="30" row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="50" id="grid2" data="VIEW_SMSRECEIVEINFO"><xui:column id="gridColumn10" ref="calculate3" label="序号" type="ro" width="50px" align="center" readonly="true" show-index="true"></xui:column>
  <xui:column id="gridColumn17" ref="FPERSONNAME" label="人员名称" type="ro" width="120px" align="center" readonly="true"></xui:column>
  <xui:column id="gridColumn18" ref="FPHONE" label="电话" type="ro" width="150px" align="center" readonly="true"></xui:column>
  <xui:column id="gridColumn19" ref="FSENDSTATE" label="状态" type="ro" width="120px" align="center" readonly="true"></xui:column>
  <xui:column id="gridColumn20" ref="FBACKSTATE" label="回复状态" type="ro" width="100px" align="center" readonly="true"></xui:column>
  <xui:column id="gridColumn1" ref="FLASTBACKTIME" label="回复时间" type="ro" width="150px" align="center" readonly="true"></xui:column><xui:column id="gridColumn21" ref="FFAILEDCOUNT" label="失败次数" type="ro" width="100px" align="center" readonly="true"></xui:column>
  </xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar2" style="position:absolute;left:5px;top:5px;">
  <xui:place control="trigger2" id="controlPlace7" style="width:100px;"></xui:place>
  <xui:place control="trigger1" id="controlPlace6" style="width:100px;"></xui:place><xui:place control="smartFilter1" id="controlPlace8" style="width:200px;"></xui:place>
  <xui:place control="trigger3" id="controlPlace9" style="width:80px;"></xui:place></xhtml:div>
  <xui:place control="pagination2" id="controlPlace12" style="position:absolute;left:550px;top:0px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" appearance="image-text" class="button-blue" icon-class="icon-system-mail">
   <xforms:label id="default8"><![CDATA[发送短信]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[mainActivity.trigger2Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter1" filter-data="VIEW_SMSINFO" filter-relations="FSMSCONTENT" auto-refresh="true"></xhtml:div><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" appearance="image-text" class="button-darkcyan" icon-class="icon-system-vcard">
   <xforms:label id="default7"><![CDATA[号码模版]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[mainActivity.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" appearance="image-text" class="button-green" operation-owner="VIEW_SMSINFO" operation="refresh" icon-class="icon-system-search">
   <xforms:label id="default9"><![CDATA[查询]]></xforms:label></xforms:trigger>
  <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next" id="pagination2" data="VIEW_SMSINFO"></xhtml:div></xui:view>
  <xforms:textarea ref="data('VIEW_SMSINFO')/FSMSCONTENT" id="textarea1" readonly="true" disabled="true"></xforms:textarea>
  <xforms:textarea ref="data('VIEW_SMSRECEIVEINFO')/FBACKCONTENT" id="textarea2" readonly="true" disabled="true"></xforms:textarea>
  <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner" id="templateRunner" url="/UI/common/mySMS/process/mySMS/templateActivity.w" title="号码模版"></xhtml:div>
  <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner" id="sendRunner" url="/UI/common/mySMS/process/mySMS/sendSMSActivity.w" title="发送短信" onReceive="mainActivity.sendRunnerReceive"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="mainActivity.js"></xhtml:script></xui:resource> 
</xui:window>
