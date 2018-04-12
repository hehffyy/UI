<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:14px;height:auto;top:434px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="bizData1" concept="B_PrepBizRec" store-type="simple"><reader id="default3" action="/base/core/flow/logic/action/queryPrepBizRecAction"></reader>
  <writer id="default4" action="/base/core/flow/logic/action/savePrepBizRecAction"></writer>
  <creator id="default5" action="/base/core/flow/logic/action/createPrepBizRecAction"></creator>
  <rule id="dataBizRule1" relation="fBYSLYJ" required="true()"></rule></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xui:place control="view1" id="controlPlace1" style="height:73%;width:560px;"/>
    </xui:layout>  
    <xui:view id="view1" auto-load="true" class="xui-container"> 
      <xui:layout style="margin:0 auto;height:100%;width:650px;" id="layout1" type="flow"> 
        <xui:place control="view3" id="controlPlace4" style="height:442px;width:100%;"/>  
        <xui:place control="view4" id="controlPlace5" style="position:relative;height:29px;width:527px;"/>  
        <xui:place control="receiver1" id="controlPlace6" style="left:5px;top:195px;"/>
      </xui:layout>  
      <xui:view auto-load="true" id="view3" class="xui-container"> 
        <layout type="absolute" style="position:relative;" id="layout3"> 
          <xhtml:label id="label1" class="xui-label" style="position:absolute;position:absolute;font-size:x-large;left:258px;top:8px;"><![CDATA[退回告知单]]></xhtml:label>  
          <xui:place control="textarea1" id="controlPlace14" style="height:145px;position:absolute;left:124px;top:245px;text-align:left;width:404px;"/>
        <xhtml:label id="label2" style="position:absolute;left:33px;top:61px;" class="xui-label"><![CDATA[申请事项]]></xhtml:label>
  <xhtml:label id="label3" class="xui-label" style="position:absolute;left:33px;position:absolute;top:103px;"><![CDATA[申请人]]></xhtml:label>
  <xhtml:label id="label4" class="xui-label" style="position:absolute;left:33px;position:absolute;position:absolute;top:148px;"><![CDATA[申请单位]]></xhtml:label>
  <xhtml:label id="label5" class="xui-label" style="position:absolute;left:33px;position:absolute;position:absolute;top:200px;"><![CDATA[申请时间]]></xhtml:label>
  <xui:place control="input1" id="controlPlace7" style="position:absolute;left:127px;top:61px;text-align:left;width:400px;"></xui:place>
  <xui:place control="input2" id="controlPlace8" style="position:absolute;top:103px;text-align:left;left:128px;width:399px;"></xui:place>
  <xui:place control="input3" id="controlPlace9" style="left:127px;position:absolute;top:148px;text-align:left;width:401px;"></xui:place>
  <xui:place control="input4" id="controlPlace10" style="left:127px;position:absolute;height:5px;width:141px;top:200px;text-align:left;"></xui:place>
  <xhtml:label id="label6" class="xui-label" style="position:absolute;position:absolute;position:absolute;position:absolute;top:200px;left:309px;"><![CDATA[联系电话]]></xhtml:label>
  <xui:place control="input5" id="controlPlace11" style="height:5px;width:141px;position:absolute;top:200px;left:387px;"></xui:place>
  <xhtml:label id="label7" class="xui-label" style="position:absolute;left:33px;position:absolute;position:absolute;position:absolute;top:294px;"><![CDATA[退回原因]]></xhtml:label></layout>  
        <xforms:textarea ref="data('bizData1')/fBYSLYJ" id="textarea1"/>
      <xforms:input id="input1" ref="data('bizData1')/fYWLX" readonly="true"></xforms:input>
  <xforms:input id="input2" ref="data('bizData1')/fSQRXM" readonly="true"></xforms:input>
  <xforms:input id="input3" ref="data('bizData1')/fSQDW" readonly="true"></xforms:input>
  <xforms:input id="input4" ref="data('bizData1')/fLWRQ" readonly="true"></xforms:input>
  <xforms:input id="input5" ref="data('bizData1')/fLXDH" readonly="true"></xforms:input></xui:view>  
      <xui:view auto-load="true" id="view4" class="xui-container"> 
        <layout type="flow" style="position:relative;" id="layout4"> 
          <xui:place control="cancelBtn" id="controlPlace3" style="float:right;"/>  
          <xui:place control="sureBtn" id="controlPlace2" style="float:right;margin-right:10px"/>
        </layout>  
        <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn"
          appearance="image-text" class="button-blue"> 
          <xforms:label id="default2">取消</xforms:label>  
          <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[byslDialog.cancelBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
        <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn"
          appearance="image-text" class="button-blue"> 
          <xforms:label id="default1">确定</xforms:label>  
          <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[byslDialog.sureBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
      </xui:view>  
      <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
        id="receiver1" onReceive="byslDialog.receiver1Receive"/>
    </xui:view>
  </xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="byslDialog.js"></xhtml:script></xui:resource> 
</xui:window>
