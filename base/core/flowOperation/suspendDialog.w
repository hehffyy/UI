<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:8px;height:auto;top:49px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="bizData_AJGQJL" concept="B_AJGQJLB" store-type="simple"
      auto-new="false" limit="1" onRefreshCreateParam="suspendDialog.bizData_AJGQJLRefreshCreateParam"> 
      <creator id="default4" action="/base/core/flowOperation/logic/action/createB_AJGQJLBAction"/>  
      <reader id="default8" action="/base/core/flowOperation/logic/action/queryBizRecSuspendingGQJLAction"/>  
      <writer id="default9"/>  
      <rule id="dataBizRule4" relation="fGQYY" required="true()" alert="'请录入原因'"/> 
    </data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="margin:0 auto;height:100%;width:650px;" id="rootLayout"> 
      <xui:place control="view3" id="controlPlace4" style="width:100%;height:268px;"/>  
      <xui:place control="view4" id="controlPlace5" style="height:29px;width:601px;"/>  
      <xui:place control="receiver1" id="controlPlace1" style="position:absolute;left:72px;top:292px;"/> 
    </xui:layout>  
    <xui:view auto-load="true" id="view3" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout3"> 
        <xhtml:label id="labelGQYY" class="xui-label" style="position:absolute;left:44px;position:absolute;top:5px;"><![CDATA[挂起原因]]></xhtml:label>  
        <xui:place control="textarea1" id="controlPlace14" style="position:absolute;width:555px;left:44px;height:193px;top:40px;"/> 
      </layout>  
      <xforms:textarea ref="data('bizData_AJGQJL')/fGQYY" id="textarea1"/> 
    </xui:view>  
    <xui:view auto-load="true" id="view4" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout4"> 
        <xui:place control="cancelBtn" id="controlPlace3" style="float:right;"/>  
        <xui:place control="sureBtn" id="controlPlace2" style="float:right;margin-right:10px"/> 
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn"
        appearance="image-text" class="button-blue"> 
        <xforms:label id="default2">取消</xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript1"><![CDATA[suspendDialog.cancelBtnClick(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn"
        appearance="image-text" class="button-blue"> 
        <xforms:label id="default1">确定</xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript2"><![CDATA[suspendDialog.sureBtnClick(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="receiver1" onReceive="suspendDialog.receiver1Receive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="/UI/system/components/process/process.js"/>  
    <xhtml:script id="htmlScript2" src="suspendDialog.js"/> 
  </xui:resource> 
</xui:window>
