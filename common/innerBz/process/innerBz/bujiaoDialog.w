<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;top:204px;left:265px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_AJGQJL" concept="B_AJGQJLB" store-type="simple"
      auto-new="false" limit="1" onRefreshCreateParam="bujiaoDialog.bizData_AJGQJLRefreshCreateParam"> 
      <creator id="default4" action="/base/core/flowOperation/logic/action/createB_AJGQJLBAction"/>  
      <reader id="default8" action="/base/core/flowOperation/logic/action/queryBizRecSuspendingGQJLAction"/>  
      <writer id="default9"/>  
      <rule id="dataBizRule4" relation="fGQYY" required="true()"></rule></data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_BJGZ" concept="B_BZGZ" store-type="simple"
      auto-new="false" limit="1"> 
      <creator id="default5" action="/base/core/flowOperation/logic/action/createB_BZGZAction"/>  
      <reader id="default6" action="/base/core/flowOperation/logic/action/queryB_BZGZAction"/>  
      <writer id="default7"/>  
      <master id="master1" data="bizData_AJGQJL" relation="fAJGQJL"/> 
    <rule id="dataBizRule3" relation="FGUID"></rule>
  </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_CLLB" concept="B_BZCLQD" limit="-1" confirm-delete="false" store-type="simple"> 
      <reader id="default11" action="/base/core/flowOperation/logic/action/queryB_BZCLQDAction"/>  
      <writer id="default12"/>  
      <creator id="default13" action="/base/core/flowOperation/logic/action/createB_BZCLQDAction"/>  
      <master id="master2" data="bizData_BJGZ" relation="fBZGZ"/>  
      <calculate-relation relation="checkNo" id="calculate-relation1" type="xsd:string"/>
    <rule id="dataBizRule2" relation="fCLMC" readonly="data('bizData_CLLB')/fCLBH != '补充材料'"></rule>
  </data> 
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="dataTask" concept="SA_Task" store-type="simple"><reader id="default3" action="/system/logic/action/queryTaskAction"></reader>
  <writer id="default10" action="/system/logic/action/saveTaskAction"></writer>
  <creator id="default14" action="/system/logic/action/createTaskAction"></creator></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="bzSQ" concept="B_BzSq" store-type="simple"><reader id="default18" action="/common/innerBz/logic/action/queryB_BzSqAction"></reader>
  <writer id="default19" action="/common/innerBz/logic/action/saveB_BzSqAction"></writer>
  <creator id="default20" action="/common/innerBz/logic/action/createB_BzSqAction"></creator></data></xforms:model>  
  <xui:view id="rootView" auto-load="true" class="xui-container">
   <xui:layout style="width:100%;height:100%" id="rootLayout" type="flow">
    <xui:place control="view3" id="controlPlace4" style="position:relative;height:500px;width:700px;"></xui:place>
    <xui:place control="receiver1" id="controlPlace6" style="left:5px;position:absolute;top:197px;"></xui:place></xui:layout> 
   <xui:view auto-load="true" id="view3" class="xui-container">
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn" appearance="image-text" class="button-blue">
     <xforms:label id="default2">取消</xforms:label>
     <xforms:action id="action1" ev:event="DOMActivate">
      <xforms:script id="xformsScript1">bujiaoDialog.cancelBtnClick(event)</xforms:script></xforms:action> </xforms:trigger> 
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn" appearance="image-text" class="button-blue">
     <xforms:label id="default1">确定</xforms:label>
     <xforms:action id="action2" ev:event="DOMActivate">
      <xforms:script id="xformsScript2">bujiaoDialog.sureBtnClick(event)</xforms:script></xforms:action> </xforms:trigger> 
    <layout type="absolute" style="position:relative;" id="layout3">
     <xhtml:label id="label1" class="xui-label" style="position:absolute;position:absolute;left:74px;top:36px;"><![CDATA[补正原因：]]></xhtml:label>
     <xui:place control="cancelBtn" id="controlPlace3" style="float:right;position:absolute;height:33px;width:88px;top:355px;left:538px;"></xui:place>
     <xui:place control="sureBtn" id="controlPlace2" style="float:right;margin-right:10px;position:absolute;height:33px;width:88px;left:433px;top:355px;"></xui:place>
  <xui:place control="textarea1" id="controlPlace1" style="position:absolute;height:269px;left:74px;top:64px;width:546px;"></xui:place></layout> 
    <xforms:textarea ref="data('bizData_AJGQJL')/fGQYY" id="textarea1"></xforms:textarea></xui:view> 
   <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="receiver1" onReceive="bujiaoDialog.receiver1Receive"></xhtml:div></xui:view><xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="bujiaoDialog.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="bujiaoDialog.css"/> 
  </xui:resource> 
</xui:window>
