<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="top:190px;left:317px;height:auto;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="dsStage" concept="B_SuperviseStage" store-type="simple"><creator id="default1" action="/common/recSupervise/logic/action/createB_SuperviseStageAction"></creator>
  <reader id="default2" action="/common/recSupervise/logic/action/queryB_SuperviseStageAction"></reader>
  <writer id="default3" action="/common/recSupervise/logic/action/saveB_SuperviseStageAction"></writer></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
   <top size="80px" id="borderLayout-top2"><xui:place control="view2" id="controlPlace3" style="height:100%;width:100%;"></xui:place></top>
   <center id="borderLayout-center2"><xui:place control="textarea1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center></xhtml:div></center>
  <right size="113px" id="borderLayout-right1"><xui:place control="view1" id="controlPlace2" style="height:100%;width:100%;"></xui:place></right></xhtml:div>
  <xui:place control="windowReceiver1" id="controlPlace6" style="position:absolute;left:316px;top:304px;"></xui:place></xui:layout> 
  <xforms:textarea ref="data('dsStage')/fBz" id="textarea1"></xforms:textarea>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xui:place control="trgCancel" id="controlPlace9" style="width:86px;position:absolute;left:19px;top:69px;"></xui:place>
  <xui:place control="trgOK" id="controlPlace8" style="width:86px;position:absolute;left:19px;top:20px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgCancel" class="button-blue">
   <xforms:label id="default4">取消</xforms:label>
   <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[editStageDlg.trgCancelClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgOK" appearance="image-text" class="button-blue">
   <xforms:label id="default4">确定</xforms:label>
   <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[editStageDlg.trgOKClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xhtml:label id="label1" style="position:absolute;top:22px;left:12px;" class="xui-label"><![CDATA[阶段名称：]]></xhtml:label>
  <xhtml:label id="label2" style="position:absolute;top:22px;left:319px;" class="xui-label"><![CDATA[阶段状态：]]></xhtml:label>
  <xui:place control="input1" id="controlPlace4" style="position:absolute;left:106px;top:22px;width:186px;height:18px;"></xui:place>
  <xhtml:label id="label3" class="xui-label" style="position:absolute;left:12px;position:absolute;top:55px;"><![CDATA[阶段成果：]]></xhtml:label>
  <xui:place control="radio1" id="controlPlace5" style="position:absolute;top:22px;left:405px;"></xui:place></layout>
  <xforms:input id="input1" ref="data('dsStage')/fStage"></xforms:input>
  <xforms:select1 ref="data('dsStage')/fStageStatus" id="radio1">
   <xforms:item id="selectItem1">
    <xforms:label id="default5"><![CDATA[待处理]]></xforms:label>
    <xforms:value id="default6"><![CDATA[待处理]]></xforms:value></xforms:item> 
   <xforms:item id="selectItem2">
    <xforms:label id="default7"><![CDATA[已完成]]></xforms:label>
    <xforms:value id="default8"><![CDATA[已完成]]></xforms:value></xforms:item> </xforms:select1></xui:view>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="editStageDlg.windowReceiver1Receive"></xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="editStageDlg.js"></xhtml:script></xui:resource> 
</xui:window>
