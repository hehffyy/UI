<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;left:292px;top:137px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="bizData_AJGQJL" concept="B_AJGQJLB" store-type="simple" auto-new="false" limit="1" onRefreshCreateParam="specialResultDialog.bizData_AJGQJLRefreshCreateParam" confirm-delete="false" confirm-refresh="false">
   <creator id="default4" action="/base/core/flowOperation/logic/action/createB_AJGQJLBAction"></creator>
   <reader id="default8" action="/base/core/flowOperation/logic/action/queryBizRecSuspendingGQJLAction"></reader>
   <writer id="default9"></writer>
   </data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="bizData_TBCX" concept="B_TBCX" store-type="simple" auto-new="false" direct-delete="false" confirm-delete="false" confirm-refresh="false">
   <creator id="default5" action="/base/core/flowOperation/logic/action/createB_TBCXAction"></creator>
   <reader id="default6" action="/base/core/flowOperation/logic/action/queryB_TBCXAction"></reader>
   <writer id="default7"></writer>
   <master id="master1" data="bizData_AJGQJL" relation="fAJGQJL"></master>
  <rule id="dataBizRule1" relation="fJGCSRQ" required="true()" alert="'请输入特别程序结果产生日期'"></rule>
  <rule id="dataBizRule2" relation="fTBCXJG" required="true()" alert="'请输入特别程序结果'"></rule>
  <rule id="dataBizRule3" relation="fTBCXSFJE" required="true()" alert="'特别程序收费金额不能为空，无金额请输入0'"></rule></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="margin:0 auto;height:100%;width:650px;" id="rootLayout"><xui:place control="receiver1" id="controlPlace4" style="left:60px;top:177px;"></xui:place>
  <xui:place control="view2" id="controlPlace5" style="width:100%;height:335px;"></xui:place>
  <xui:place control="view1" id="controlPlace1" style="height:31px;width:597px;"></xui:place></xui:layout> 
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="receiver1" onReceive="specialResultDialog.receiver1Receive"></xhtml:div>
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2">
    <xhtml:label id="label2" class="xui-label" style="position:absolute;position:absolute;position:absolute;left:29px;top:32px;"><![CDATA[特别程序结果产生日期]]></xhtml:label>
    <xui:place control="input3" id="controlPlace14" style="position:absolute;top:30px;left:184px;width:171px;"></xui:place>
    <xhtml:label id="label7" style="position:absolute;left:29px;top:65px;" class="xui-label"><![CDATA[特别程序结果]]></xhtml:label>
    <xui:place control="textarea1" id="controlPlace15" style="position:absolute;top:92px;left:31px;width:578px;height:221px;"></xui:place>
    
    <xhtml:label id="label1" style="position:absolute;left:374px;top:32px;" class="xui-label"><![CDATA[特别程序收费金额]]></xhtml:label>
  <xui:place control="input1" id="controlPlace6" style="position:absolute;top:30px;left:503px;width:100px;"></xui:place></layout> 
   
   <xforms:input id="input3" ref="data('bizData_TBCX')/fJGCSRQ"></xforms:input>
   <xforms:textarea ref="data('bizData_TBCX')/fTBCXJG" id="textarea1"></xforms:textarea>
   <xforms:input id="input1" ref="data('bizData_TBCX')/fTBCXSFJE" format="0.00"></xforms:input></xui:view>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="flow" style="position:relative;" id="layout1">
    <xui:place control="cancelBtn" id="controlPlace3" style="float:right"></xui:place>
    <xui:place control="sureBtn" id="controlPlace2" style="float:right;margin-right:10px"></xui:place></layout> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn" appearance="image-text" class="button-blue">
    <xforms:label id="default1">确定</xforms:label>
    <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[specialResultDialog.sureBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn" appearance="image-text">
    <xforms:label id="default2">取消</xforms:label>
    <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[specialResultDialog.cancelBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger> </xui:view></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="specialResultDialog.js"></xhtml:script></xui:resource> 
</xui:window>
