<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml">  
  <xforms:model id="model1"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="dsTask" concept="SA_Task" store-type="simple"><reader id="default1" action="/system/logic/action/queryTaskCenterAction1"></reader></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="margin:0 auto;height:100%;width:100%;" id="rootLayout"><xui:place control="view3" id="controlPlace4" style="width:100%;height:100%;"></xui:place>
  <xui:place control="sysReceiver" id="controlPlace1" style="position:absolute;top:324px;left:317px;"></xui:place></xui:layout> 
  <xui:view auto-load="true" id="view3" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout3">
    <xhtml:label id="lblIdea" class="xui-label" style="position:absolute;position:absolute;left:34px;top:137px;"><![CDATA[上阶段意见：]]></xhtml:label>
    <xui:place control="textarea1" id="controlPlace14" style="position:absolute;height:193px;left:130px;width:400px;top:65px;"></xui:place>
  <xhtml:label id="label1" class="xui-label" style="position:absolute;position:absolute;left:34px;position:absolute;top:28px;"><![CDATA[发送人：]]></xhtml:label>
  <xhtml:label id="label2" class="xui-label" style="position:absolute;position:absolute;position:absolute;top:28px;left:302px;"><![CDATA[发送时间：]]></xhtml:label>
  <xui:place control="input2" id="controlPlace3" style="position:absolute;width:150px;left:130px;top:28px;"></xui:place>
  <xui:place control="input3" id="controlPlace5" style="width:150px;position:absolute;top:28px;left:383px;"></xui:place></layout> 
   <xforms:textarea ref="data('dsTask')/sContent" id="textarea1" readonly="true"></xforms:textarea>
  <xforms:input id="input2" ref="data('dsTask')/sExecutorPersonName" readonly="true"></xforms:input>
  <xforms:input id="input3" ref="data('dsTask')/sActualFinishTime" readonly="true" disabled="true"></xforms:input></xui:view>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="sysReceiver" onReceive="preIdeaDialog.sysReceiverReceive"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="preIdeaDialog.js"></xhtml:script></xui:resource> 
</xui:window>
