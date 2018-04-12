<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1"/>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;position:relative;" id="rootLayout" type="absolute"><xhtml:label id="label1" style="position:absolute;top:40px;left:110.5px;" class="xui-label"><![CDATA[确认重新从模板加载数据吗？]]></xhtml:label>
  <xui:place control="btnOK" id="controlPlace1" style="position:absolute;width:84px;top:97px;left:111px;"></xui:place>
  <xui:place control="btnCancle" id="controlPlace2" style="position:absolute;width:76px;top:97px;left:219px;"></xui:place>
  <xui:place control="windowReceiver1" id="controlPlace3" style="position:absolute;top:374px;left:193px;"></xui:place>
  <xhtml:img src="/UI/system/images/confirm/ask.gif" alt="" id="image1" style="position:absolute;top:25px;left:25px;"></xhtml:img></xui:layout> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnOK" class="button-blue">
   <xforms:label id="default1"><![CDATA[确认]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[confirmDlg.btnOKClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancle">
   <xforms:label id="default2"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[confirmDlg.btnCancleClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="confirmDlg.js"></xhtml:script></xui:resource> 
</xui:window>
