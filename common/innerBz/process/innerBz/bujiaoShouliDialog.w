<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;left:1px;top:132px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_AJGQJL" concept="B_AJGQJLB" store-type="simple"
      auto-new="false" limit="1" onRefreshCreateParam="bujiaoShouliDialog.bizData_AJGQJLRefreshCreateParam"> 
      <creator id="default4" action="/base/core/flowOperation/logic/action/createB_AJGQJLBAction"/>  
      <reader id="default8" action="/base/core/flowOperation/logic/action/queryBizRecSuspendingGQJLAction"/>  
      <writer id="default9"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_BJGZ" concept="B_BZGZ" store-type="simple"
      auto-new="false" limit="1"> 
      <creator id="default5" action="/base/core/flowOperation/logic/action/createB_BZGZAction"/>  
      <reader id="default6" action="/base/core/flowOperation/logic/action/queryB_BZGZAction"/>  
      <writer id="default7"/>  
      <master id="master1" data="bizData_AJGQJL" relation="fAJGQJL"/> 
    <rule id="dataBizRule1" relation="fBZSLDD" required="true()" alert="'请录入补正受理地点'"></rule></data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_CLLB" concept="B_BZCLQD" limit="-1"
      confirm-delete="false"> 
      <reader id="default11" action="/base/core/flowOperation/logic/action/queryB_BZCLQDAction"/>  
      <writer id="default12"/>  
      <creator id="default13" action="/base/core/flowOperation/logic/action/createB_BZCLQDAction"/>  
      <master id="master2" data="bizData_BJGZ" relation="fBZGZ"/> 
    <rule id="dataBizRule2" relation="fCLQR" constraint="data('bizData_CLLB')/fCLQR = '已确认'" alert="'材料未确认'"></rule></data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="margin:0 auto;position:relative;height:500px;width:700px;" id="rootLayout"
      type="flow"> 
      <xui:place control="receiver1" id="controlPlace6"/>  
        
      <xui:place control="view1" id="controlPlace2" style="width:100%;height:385px;" />
  <xui:place control="view2" id="controlPlace5" style="height:29px;width:601px;"></xui:place></xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="receiver1" onReceive="bujiaoShouliDialog.receiver1Receive"/>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout2"> 
        <xui:place control="gridCLLB" id="controlPlace11" style="width:560px;position:absolute;left:47px;height:262px;top:110px;"/> 
      <xhtml:label id="label1" style="position:absolute;left:47px;top:18px;" class="xui-label"><![CDATA[材料补正时间]]></xhtml:label>
  <xui:place control="output1" id="controlPlace7" style="position:absolute;left:183px;top:16px;width:423px;"></xui:place>
  <xhtml:label id="label2" style="position:absolute;left:47px;top:50px;" class="xui-label"><![CDATA[补交受理具体地点*]]></xhtml:label>
  <xhtml:label id="label3" style="position:absolute;left:47px;top:85px;" class="xui-label"><![CDATA[补正材料清单*]]></xhtml:label>
  <xui:place control="input1" id="controlPlace9" style="position:absolute;top:48px;left:183px;width:425px;"></xui:place></layout>  
      <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
        header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
        smart-render="20" id="gridCLLB" data="bizData_CLLB" multi-selection="false"
        edit-mode="true"> 
        <xui:column id="gridColumn3" ref="fCLMC" label="材料名称" type="ro" width="403px"/>  
        <xui:column id="gridColumn4" ref="fSWCL" label="实物材料" type="ch" width="73px"
          checked-value="是" unchecked-value="否" readonly="true"/>  
        <xui:column id="gridColumn1" ref="fCLQR" label="材料确认" type="ch" width="72px" checked-value="已确认" unchecked-value="待确认"/> 
      </xhtml:div> 
    <xforms:output id="output1" value="eval('justep.Date.toString(justep.System.datetime(),&quot;yyyy-MM-dd&quot;)')"></xforms:output>
  <xforms:input id="input1" ref="data('bizData_BJGZ')/fBZSLDD"></xforms:input></xui:view> 
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="flow" style="position:relative;" id="layout4">
    <xui:place control="cancelBtn" id="controlPlace3" style="float:right;"></xui:place>
    <xui:place control="sureBtn" id="controlPlace1" style="float:right;margin-right:10px"></xui:place>
  <xui:place control="btnBujaioAgain" id="controlPlace4" style="float:right;margin-right:10px;"></xui:place></layout> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn" appearance="image-text">
    <xforms:label id="default2">取消</xforms:label>
    <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[bujiaoShouliDialog.cancelBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn" appearance="image-text" class="button-blue">
    <xforms:label id="default1"><![CDATA[补正受理]]></xforms:label>
    <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[bujiaoShouliDialog.sureBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBujaioAgain" appearance="image-text" class="button-blue">
   <xforms:label id="default3"><![CDATA[再次补正]]></xforms:label>
   <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[bujiaoShouliDialog.btnBujaioAgainClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="bujiaoShouliDialog.js"/> 
  </xui:resource> 
</xui:window>
