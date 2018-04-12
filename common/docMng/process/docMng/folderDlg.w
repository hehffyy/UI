<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="top:90px;left:261px;height:auto;"/>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;position:relative;" id="rootLayout" type="absolute"><xhtml:input type="text" value="" id="folderInput" style="position:absolute;top:24px;left:32px;" class="xui-input"></xhtml:input>
  <xui:place control="btnCancel" id="controlPlace2" style="position:absolute;top:70px;left:32px;"></xui:place>
  <xui:place control="btnOK" id="controlPlace3" style="top:70px;position:absolute;left:117px;"></xui:place>
  <xui:place control="windowReceiver1" id="controlPlace4" style="position:absolute;top:148px;left:72px;"></xui:place></xui:layout> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancel" appearance="image-text" icon-class="icon-system-reply">
   <xforms:label id="default1"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[folderDlg.btnCancelClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnOK" icon-class="icon-system-ok" class="button-blue" appearance="image-text">
   <xforms:label id="default2"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[folderDlg.btnOKClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="folderDlg.windowReceiver1Receive"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="folderDlg.js"></xhtml:script></xui:resource> 
</xui:window>
