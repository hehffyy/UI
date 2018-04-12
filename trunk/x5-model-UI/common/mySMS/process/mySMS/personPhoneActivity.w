<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;left:621px;top:101px;"><data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="name,phone" src="" auto-load="false" id="data" store-type="simple" auto-new="true"></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xui:place control="view1" id="controlPlace1" style="width:450px;height:200px;"></xui:place></xui:layout> 
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xui:place control="input1" id="controlPlace2" style="position:absolute;height:30px;width:300px;text-align:left;left:120px;top:15px;"></xui:place>
  <xui:place control="input2" id="controlPlace3" style="height:30px;width:300px;position:absolute;text-align:left;left:120px;top:60px;"></xui:place>
  <xhtml:label id="label1" style="position:absolute;left:46px;top:18.5px;font-weight:bold;" class="xui-label"><![CDATA[人员名称]]></xhtml:label>
  <xhtml:label id="label2" style="position:absolute;left:46px;top:63.5px;font-weight:bold;" class="xui-label"><![CDATA[电话号码]]></xhtml:label>
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="position:absolute;left:274px;top:149px;">
  <xui:place control="trigger2" id="controlPlace5"></xui:place><xui:place control="trigger1" id="controlPlace4"></xui:place></xhtml:div>
  <xui:place control="windowReceiver" id="controlPlace6" style="position:absolute;top:109px;left:169px;"></xui:place></layout>
  <xforms:input id="input1" ref="data('data')/name"></xforms:input>
  <xforms:input id="input2" ref="data('data')/phone"></xforms:input>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" appearance="image-text" class="button-green" icon-class="icon-system-ok">
   <xforms:label id="default2"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[personPhoneActivity.trigger2Click(event)]]></xforms:script></xforms:action></xforms:trigger><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" appearance="image-text" icon-class="icon-system-cancel">
   <xforms:label id="default1"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[personPhoneActivity.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver"></xhtml:div></xui:view></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="personPhoneActivity.js"></xhtml:script></xui:resource> 
</xui:window>
