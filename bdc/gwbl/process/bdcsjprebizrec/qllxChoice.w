<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;width:259px;left:208px;top:383px;"><data component="/UI/system/components/data.xbl.xml#data" data-type="xml" columns="qllx,djdl,djdlbh,qllxbh,zmlbh,zmlmc" src="" auto-load="false" id="qllxData" auto-new="true" store-type="simple"><rows xmlns="" id="default5"></rows>
  </data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="qllxBizData" concept="B_V_YWLXJCB" limit="-1"><reader id="default1" action="/bdc/gwbl/logic/action/queryB_V_QLLXAction"></reader>
  <master id="master1"></master></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="djdlBizData" concept="B_V_YWLXJCB" relations="B_V_YWLXJCB,FGUID,YWJC,PX" order-by="PX asc"><reader id="default18" action="/bdc/gwbl/logic/action/queryB_V_DJDLAction"></reader></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="zmlxData" concept="B_V_YWLXJCB" relations="B_V_YWLXJCB,FGUID,DJLX,YWJC,PX,DJLXLB"><reader id="default6" action="/bdc/gwbl/logic/action/queryB_V_ZMLXAction"></reader></data></xforms:model>  
  <xui:view id="rootView" auto-load="true" class="xui-container">
   <xui:layout style="width:100%;height:100%" id="rootLayout"><xui:place control="view1" id="controlPlace3" style="width:100%;height:100%;text-align:left;"></xui:place></xui:layout>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xui:place control="trigger7" id="controlPlace9" style="position:absolute;width:104px;left:288px;top:162px;"></xui:place>
  <xhtml:label id="label1" style="position:absolute;font-size:large;top:109px;left:22px;" class="xui-label"><![CDATA[登记小类:]]></xhtml:label>
  <xhtml:label id="label2" class="xui-label" style="position:absolute;font-size:large;position:absolute;top:71px;left:22px;"><![CDATA[登记大类:]]></xhtml:label>
  <xui:place control="windowReceiver2" id="controlPlace36" style="position:absolute;left:126px;top:219px;"></xui:place>
  <xui:place control="gridSelect1" id="controlPlace2" style="position:absolute;font-size:large;height:30px;left:105px;top:66px;text-align:left;width:410px;"></xui:place>
  <xui:place control="gridSelect2" id="controlPlace28" style="position:absolute;top:105px;text-align:left;left:105px;height:28px;width:409px;"></xui:place>
  <xui:place control="trigger2" id="controlPlace29" style="width:104px;position:absolute;left:411px;top:162px;"></xui:place>
  <xui:place control="view2" id="controlPlace4" style="position:absolute;left:1px;top:23px;height:42px;width:98%;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger7" appearance="image-text" class="button-green">
   <xforms:label id="default7"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[qllxChoice.trigger7Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver2" onReceive="qllxChoice.windowReceiver2Receive"></xhtml:div>
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="30" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect1" ref="data('qllxData')/djdlbh" label-ref="data('qllxData')/djdl">
   <xforms:label ref="YWJC" id="default28"></xforms:label>
   <xforms:value ref="FGUID" id="default30"></xforms:value>
   <xforms:itemset id="default33" data="djdlBizData">
  <xforms:column ref="FGUID" visible="false" id="default43"></xforms:column>
  <xforms:column ref="YWJC" id="default44"></xforms:column></xforms:itemset></xhtml:div>
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="30" dropdown-class="xui-grid-hide-VLine xui-grid-hide-HLine" label-separator="," value-separator="," ext-separator="," id="gridSelect2" ref="data('qllxData')/qllxbh" label-ref="data('qllxData')/qllx" dropdown-height="300">
   <xforms:label ref="YWJC" id="default37"></xforms:label>
   <xforms:value ref="FGUID" id="default38"></xforms:value>
   <xforms:itemset id="default39" data="qllxBizData">
  <xforms:column ref="FGUID" visible="false" id="default45"></xforms:column>
  <xforms:column ref="YWJC" id="default46"></xforms:column></xforms:itemset></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" appearance="image-text" class="button-green">
   <xforms:label id="default42"><![CDATA[取消]]></xforms:label>
   <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[qllxChoice.trigger2Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout3"><xui:place control="gridSelect3" id="controlPlace1" style="position:absolute;text-align:left;left:104px;width:410px;top:7px;height:31px;"></xui:place>
  <xhtml:label id="label3" style="position:absolute;font-size:large;left:22px;top:12px;" class="xui-label"><![CDATA[证明类别:]]></xhtml:label></layout>
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect3" ref="data('qllxData')/zmlbh" label-ref="data('qllxData')/zmlmc">
   <xforms:label ref="YWJC" id="default2"></xforms:label>
   <xforms:value ref="FGUID" id="default3"></xforms:value>
   <xforms:itemset id="default4" data="zmlxData">
    <xforms:column ref="YWJC" id="default9"></xforms:column>
  <xforms:column ref="FGUID" visible="false" id="default10"></xforms:column></xforms:itemset> </xhtml:div></xui:view></xui:view></xui:view><xui:resource id="resource1"><xhtml:script id="htmlScript1" src="qllxChoice.js"></xhtml:script></xui:resource> 
<xui:view auto-load="true" id="rootView" class="xui-container">
   <layout type="absolute" style="width:100%;height:100%" id="layout1">
    <xui:place control="trigger1" id="controlPlace7" style="position:absolute;height:32px;width:77px;left:29px;top:27px;"></xui:place>
    <xui:place control="windowReceiver1" id="controlPlace8" style="position:absolute;left:315px;top:39px;"></xui:place>
    <xui:place control="trigger9" id="controlPlace14" style="position:absolute;left:73px;top:131px;width:173px;height:50px;"></xui:place>
    <xui:place control="trigger10" id="controlPlace15" style="position:absolute;left:73px;top:200px;height:54px;width:175px;"></xui:place>
    <xui:place control="trigger11" id="controlPlace16" style="position:absolute;top:130px;width:251px;height:48px;left:256px;"></xui:place></layout> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1">
    <xforms:label id="default16">确定</xforms:label>
    <xforms:action id="action1" ev:event="DOMActivate">
     <xforms:script id="xformsScript1">qllxChoice.trigger1Click(event)</xforms:script></xforms:action> </xforms:trigger> 
   <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="qllxChoice.windowReceiver1Receive"></xhtml:div>
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger9">
    <xforms:label id="default19">集体土地所有权登记</xforms:label></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger10">
    <xforms:label id="default20">国有建设用地使用权登记</xforms:label></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger11">
    <xforms:label id="default21">国有建设用地使用权及房屋所有权登记</xforms:label></xforms:trigger> </xui:view></xui:window>
