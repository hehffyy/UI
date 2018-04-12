<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;left:303px;top:113px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_AJGQJL" concept="B_AJGQJLB" store-type="simple"
      auto-new="false" limit="1" onRefreshCreateParam="bujiaoShouliDialog.bizData_AJGQJLRefreshCreateParam" confirm-refresh="false"> 
      <creator id="default4" action="/base/core/flowOperation/logic/action/createB_AJGQJLBAction"/>  
      <reader id="default8" action="/base/core/flowOperation/logic/action/queryBizRecSuspendingGQJLAction"/>  
      <writer id="default9"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_BJGZ" concept="B_BZGZ" store-type="simple"
      auto-new="false" limit="1" confirm-refresh="false"> 
      <creator id="default5" action="/base/core/flowOperation/logic/action/createB_BZGZAction"/>  
      <reader id="default6" action="/base/core/flowOperation/logic/action/queryB_BZGZAction"/>  
      <writer id="default7"/>  
      <master id="master1" data="bizData_AJGQJL" relation="fAJGQJL"/> 
    <rule id="dataBizRule1" relation="fBZSLDD" required="true()" alert="'请录入补正受理地点'"></rule></data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_CLLB" concept="B_BZCLQD" limit="-1"
      confirm-delete="false" confirm-refresh="false"> 
      <reader id="default11" action="/base/core/flowOperation/logic/action/queryB_BZCLQDAction"/>  
      <writer id="default12"/>  
      <creator id="default13" action="/base/core/flowOperation/logic/action/createB_BZCLQDAction"/>  
      <master id="master2" data="bizData_BJGZ" relation="fBZGZ"/> 
    <rule id="dataBizRule2" relation="fCLQR" constraint="data('bizData_CLLB')/fCLQR = '已确认'"></rule>
  <calculate-relation relation="fOldFJQD" id="calculate-relation1"></calculate-relation>
  <calculate-relation relation="_bzcl" id="calculate-relation2"></calculate-relation>
  <calculate-relation relation="_yscl" id="calculate-relation3"></calculate-relation>
  <filter name="filter0" id="filter1"><![CDATA[B_BZCLQD.fCLQR<>'已确认']]></filter></data> 
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="bizData_BZYY" concept="B_BZGZYY" limit="-1"><reader id="default10" action="/base/core/flowOperation/logic/action/queryB_BZGZYYAction"></reader>
  <master id="master3" data="bizData_BJGZ" relation="fBZGZ"></master>
  <rule id="dataBizRule3" concept="B_BZGZYY" readonly="true()"></rule></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="margin:0 auto;height:100%;position:relative;width:850px;" id="rootLayout"
      type="flow"> 
      <xui:place control="receiver1" id="controlPlace6" style="top:29px;left:649px;"/>  
        
      
  <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1" class="xui-tabPanel" style="width:100%;height:93%;">
   <xui:tab id="tabPage1">
    <xui:label id="xuiLabel1"><![CDATA[补正信息]]></xui:label>
  <xui:place control="view1" id="controlPlace2" style="width:798px;height:100%;"></xui:place></xui:tab> 
   <xui:tab id="tabPage2">
    <xui:label id="xuiLabel2"><![CDATA[补正记录]]></xui:label>
  <xui:place control="grid1" id="controlPlace12" style="height:100%;width:100%;"></xui:place></xui:tab> </xhtml:div><xui:place control="view2" id="controlPlace5" style="width:840px;height:30px;"></xui:place></xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="receiver1" onReceive="bujiaoShouliDialog.receiver1Receive"/>  
    <xui:view auto-load="true" id="view2" class="xui-container">
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBujaioAgain" appearance="image-text" class="button-blue">
   <xforms:label id="default3"><![CDATA[再次补正]]></xforms:label>
   <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[bujiaoShouliDialog.btnBujaioAgainClick(event)]]></xforms:script></xforms:action></xforms:trigger><layout type="flow" style="position:relative;" id="layout4">
    <xui:place control="cancelBtn" id="controlPlace3" style="float:right;margin-right:15px;;margin-top:5px;"></xui:place>
    <xui:place control="sureBtn" id="controlPlace1" style="float:right;margin-right:10px;margin-top:5px;"></xui:place>
  <xui:place control="btnBujaioAgain" id="controlPlace4" style="float:right;margin-right:10px;margin-top:5px;"></xui:place></layout> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn" appearance="image-text">
    <xforms:label id="default2">取消</xforms:label>
    <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[bujiaoShouliDialog.cancelBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn" appearance="image-text" class="button-blue">
    <xforms:label id="default1"><![CDATA[补正受理]]></xforms:label>
    <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[bujiaoShouliDialog.sureBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
  </xui:view>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2">
    <xui:place control="gridCLLB" id="controlPlace11" style="position:absolute;left:19px;top:227px;width:101%;height:295px;"></xui:place>
    <xui:place control="ysclDialog" id="controlPlace13" style="position:absolute;left:490px;top:276px;"></xui:place>
    <xui:place control="bzclDialog" id="controlPlace10" style="position:absolute;top:227px;left:403px;"></xui:place>
    <xhtml:label id="label1" style="position:absolute;top:18px;left:19px;" class="xui-label">材料补正时间</xhtml:label>
    <xui:place control="output1" id="controlPlace7" style="position:absolute;top:16px;width:423px;left:155px;"></xui:place>
    <xhtml:label id="label2" style="position:absolute;top:50px;left:19px;" class="xui-label">补交受理具体地点*</xhtml:label>
    <xhtml:label id="label3" style="position:absolute;left:19px;top:192px;" class="xui-label">补正材料清单*</xhtml:label>
    <xui:place control="input1" id="controlPlace9" style="position:absolute;width:425px;top:50px;left:155px;"></xui:place>
    <xhtml:label id="label4" class="xui-label" style="position:absolute;position:absolute;left:20px;top:121px;"><![CDATA[补正原因]]></xhtml:label>
    <xui:place control="textarea1" id="controlPlace8" style="position:absolute;left:155px;height:106px;top:78px;width:670px;"></xui:place></layout> 
   <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="gridCLLB" data="bizData_CLLB" multi-selection="false" edit-mode="true" space-column="false">
    <xui:column id="gridColumn3" ref="fCLMC" label="材料名称" type="ro" width="415px"></xui:column>
    <xui:column id="gridColumn4" ref="fSWCL" label="实物材料" type="ch" width="72px" checked-value="是" unchecked-value="否" readonly="true" align="center"></xui:column>
    <xui:column id="gridColumn2" ref="fFJQD" label="补正材料" type="attachmentEditor" width="72px" editor="bzclDialog" align="center"></xui:column>
    <xui:column id="gridColumn6" ref="fOldFJQD" label="原始材料" type="attachmentEditor" width="72px" editor="ysclDialog" align="center"></xui:column>
    <xui:column id="gridColumn1" ref="fCLQR" label="材料确认" type="ch" width="72px" checked-value="已确认" unchecked-value="待确认" align="center"></xui:column>
  <xui:column id="gridColumn8" ref="fBLYCL" label="保留原材料" type="ch" width="85px" checked-value="保留" unchecked-value="不保留" align="center" enter-selected="false"></xui:column></xhtml:div> 
   <xforms:output id="output1" value="eval('justep.Date.toString(justep.System.datetime(),&quot;yyyy-MM-dd&quot;)')"></xforms:output>
   <xforms:input id="input1" ref="data('bizData_BJGZ')/fBZSLDD"></xforms:input>
   <xhtml:div component="/UI/system/components/attachmentDialog2.xbl.xml#attachmentDialog2" display-buttons="download:true;upload:false;template:false;edit:false;delete:false;history:false;" runtime="html4" id="ysclDialog" ref="data('bizData_CLLB')/fOldFJQD" access="7"></xhtml:div>
   <xhtml:div component="/UI/system/components/attachmentDialog2.xbl.xml#attachmentDialog2" display-buttons="download:true;template:false;edit:false;delete:false;history:false;upload:true;" runtime="html4" id="bzclDialog" ref="data('bizData_CLLB')/fFJQD" access="263"></xhtml:div>
   <xforms:textarea ref="data('bizData_AJGQJL')/fGQYY" id="textarea1" readonly="true"></xforms:textarea></xui:view>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="140" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="bizData_BZYY"><xui:column id="gridColumn5" ref="fFQSJ" label="发起时间" type="ed" width="216px"></xui:column>
  <xui:column id="gridColumn7" ref="fBZGZYY" label="补正告知原因" type="textarea" width="564px"></xui:column></xhtml:div></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="bujiaoShouliDialog.js"/> 
  </xui:resource> 
</xui:window>
