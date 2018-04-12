<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xhtml="http://www.w3.org/1999/xhtml">  
  <xforms:model id="model1"/>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xui:place control="view3" id="controlPlace4" style="height:500px;width:700px;"></xui:place></xui:layout> 
  <xui:view auto-load="true" id="view3" class="xui-container">
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn" appearance="image-text" class="button-blue">
    <xforms:label id="default2">取消</xforms:label>
    <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[sencodeBzDialog.cancelBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn" appearance="image-text" class="button-blue">
    <xforms:label id="default1">确定</xforms:label>
    <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[sencodeBzDialog.sureBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
   <layout type="absolute" style="position:relative;" id="layout3">
    <xhtml:label id="label1" class="xui-label" style="position:absolute;position:absolute;left:74px;top:36px;"><![CDATA[二次补正原因：]]></xhtml:label>
    <xui:place control="cancelBtn" id="controlPlace3" style="float:right;position:absolute;height:33px;width:88px;top:355px;left:538px;"></xui:place>
    <xui:place control="sureBtn" id="controlPlace2" style="float:right;margin-right:10px;position:absolute;height:33px;width:88px;left:433px;top:355px;"></xui:place>
    <xui:place control="receiver1" id="controlPlace5" style="position:absolute;top:413px;left:207px;"></xui:place>
  <xhtml:textarea cols="5" rows="5" id="textarea1" style="position:absolute;top:65px;height:280px;width:549px;left:74px;" class="xui-textarea"></xhtml:textarea></layout> 
   <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="receiver1"></xhtml:div></xui:view></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="sencodeBzDialog.js"></xhtml:script></xui:resource> 
</xui:window>
