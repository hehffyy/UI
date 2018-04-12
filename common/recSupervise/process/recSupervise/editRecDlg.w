<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="left:335px;height:auto;top:193px;"><data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="fStatus,fLevel" src="" auto-load="false" id="data" store-type="simple" auto-new="true"></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xui:place control="windowReceiver" id="controlPlace1" style="position:absolute;top:258px;left:122px;"></xui:place>
  <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;;">
   <center id="borderLayout-center1">
    <xui:place control="view1" id="controlPlace2" style="height:100%;width:100%;"></xui:place></center> 
   <bottom size="50px" id="borderLayout-bottom1">
    <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="float:right;margin:10px 0;padding-right:20px;">
     <xui:place control="trigger1" id="controlPlace5"></xui:place>
     <xui:place control="trigger2" id="controlPlace6"></xui:place></xhtml:div> </bottom> </xhtml:div></xui:layout> 
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver" onReceive="editRecDlg.windowReceiverReceive"></xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1">
    <xhtml:label id="label2" style="position:absolute;top:19px;left:24px;font-weight:bold;" class="xui-label"><![CDATA[优先级:]]></xhtml:label>
    <xhtml:label id="label4" class="xui-label" style="position:absolute;left:24px;position:absolute;top:57px;font-weight:bold;"><![CDATA[督办状态:]]></xhtml:label>
    <xui:place control="radio1" id="controlPlace3" style="position:absolute;left:100px;top:20px;"></xui:place>
  <xui:place control="radio2" id="controlPlace4" style="left:100px;position:absolute;top:56px;"></xui:place></layout> 
   
   <xforms:select1 ref="data('data')/fLevel" id="radio1">
   <xforms:item id="selectItem1">
    <xforms:label id="default3"><![CDATA[一级]]></xforms:label>
    <xforms:value id="default4"><![CDATA[一级]]></xforms:value></xforms:item> 
   <xforms:item id="selectItem2">
    <xforms:label id="default5"><![CDATA[二级]]></xforms:label>
    <xforms:value id="default6"><![CDATA[二级]]></xforms:value></xforms:item> 
  <xforms:item id="selectItem3">
   <xforms:label id="default7"><![CDATA[三级]]></xforms:label>
   <xforms:value id="default8"><![CDATA[三级]]></xforms:value></xforms:item></xforms:select1>
  <xforms:select1 ref="data('data')/fStatus" id="radio2">
   <xforms:item id="selectItem5">
    <xforms:label id="default13"><![CDATA[处理中]]></xforms:label>
    <xforms:value id="default14"><![CDATA[处理中]]></xforms:value></xforms:item> 
   <xforms:item id="selectItem4">
    <xforms:label id="default9"><![CDATA[已完成]]></xforms:label>
    <xforms:value id="default10"><![CDATA[已完成]]></xforms:value></xforms:item> 
   </xforms:select1></xui:view>
  <xforms:trigger appearance="image-text" class="button-green" component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1">
   <xforms:label id="default1">确定</xforms:label>
   <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[editRecDlg.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2">
   <xforms:label id="default2">取消</xforms:label>
   <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[editRecDlg.trigger2Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="editRecDlg.js"></xhtml:script></xui:resource> 
</xui:window>
