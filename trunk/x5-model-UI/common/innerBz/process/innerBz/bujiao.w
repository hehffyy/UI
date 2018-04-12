<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;left:158px;top:222px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="bzInfo" concept="B_BzInfo" store-type="simple"><reader id="default1" action="/common/innerBz/logic/action/queryB_BzInfoAction"></reader>
  <writer id="default2" action="/common/innerBz/logic/action/saveB_BzInfoAction"></writer>
  <creator id="default3" action="/common/innerBz/logic/action/createB_BzInfoAction"></creator></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:500px;width:900px;position:relative;" id="rootLayout" type="absolute"><xui:place control="receiver1" id="controlPlace2" style="position:absolute;left:99px;top:172px;"></xui:place>
  <xhtml:label id="label2" style="position:absolute;left:377px;top:38px;" class="xui-label"><![CDATA[补正原因：]]></xhtml:label>
  <xui:place control="attachmentEditor21" id="controlPlace3" style="border-style:outset outset outset outset;border-width:thin thin thin thin;border-color:#000000 #000000 #000000 #000000;width:351px;position:absolute;height:498px;left:5px;top:3px;"></xui:place>
  <xui:place control="textarea2" id="controlPlace5" style="position:absolute;width:472px;left:377px;height:164px;top:67px;"></xui:place>
  <xhtml:label id="label3" class="xui-label" style="position:absolute;position:absolute;left:377px;top:250px;"><![CDATA[回复内容：]]></xhtml:label>
  <xui:place control="textarea3" id="controlPlace6" style="width:472px;position:absolute;left:377px;top:275px;height:169px;"></xui:place>
  <xui:place control="trigger1" id="controlPlace7" style="position:absolute;height:33px;width:77px;top:470px;left:662px;"></xui:place>
  <xui:place control="trigger2" id="controlPlace8" style="height:33px;width:77px;position:absolute;left:767px;top:470px;"></xui:place>
  <xhtml:label id="label4" class="xui-label" style="position:absolute;left:377px;position:absolute;top:8px;"><![CDATA[发起时间：]]></xhtml:label>
  <xui:place control="input2" id="controlPlace10" style="position:absolute;left:446px;height:23px;width:278px;top:7px;"></xui:place></xui:layout> 
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="receiver1" onReceive="bujiao.windowReceiver1Receive"></xhtml:div>
  <xhtml:div component="/UI/system/components/attachmentEditor2.xbl.xml#attachmentEditor2" display-buttons="upload:true;download:true;edit:true;delete:true;history:false;template:false;" limit="-1" runtime="html4" id="attachmentEditor21" class="xui-attachmentEditor2" ref="data('bzInfo')/fReplyDocIds"></xhtml:div>
  <xforms:textarea ref="data('bzInfo')/fReason" id="textarea2" readonly="true"></xforms:textarea>
  <xforms:textarea ref="data('bzInfo')/fReply" id="textarea3"></xforms:textarea>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" appearance="image-text" class="button-blue">
   <xforms:label id="default4"><![CDATA[确定]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[bujiao.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" appearance="image-text" class="button-blue">
   <xforms:label id="default5"><![CDATA[取消]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[bujiao.trigger2Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:input id="input2" ref="data('bzInfo')/fStartTime"></xforms:input></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="bujiao.js"></xhtml:script></xui:resource> 
</xui:window>
