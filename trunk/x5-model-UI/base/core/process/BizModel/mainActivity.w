<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:686px;top:157px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="bizDataLog" concept="SA_Log"> 
      <reader id="default3" action="/system/logic/action/queryLogAction"/> 
    </data> 
  <data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="name" src="" auto-load="false" id="data1" store-type="simple" auto-new="true"><rows xmlns="" id="default9"></rows></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;position:relative;" id="rootLayout"
      type="absolute"> 
      <xui:place control="trg_reload" id="controlPlace1" style="position:absolute;width:80px;left:559px;top:12px;"/>  
      <xhtml:input type="text" value="" id="inputProcessUrl" style="position:absolute;top:12px;height:25px;left:89px;width:464px;"
        class="xui-input"/>  
      <xhtml:label id="label1" style="position:absolute;left:9px;top:15px;width:60px;" class="xui-label"><![CDATA[流程URL]]></xhtml:label>  
      <xhtml:label id="label2" style="position:absolute;width:80px;left:6px;top:80px;" class="xui-label"><![CDATA[java表达式]]></xhtml:label>  
      <xhtml:textarea cols="5" rows="5" id="inputJsFn" style="position:absolute;height:118px;left:88px;width:464px;top:80px;"
        class="xui-textarea"/> 
    <xui:place control="trg_calc" id="controlPlace3" style="position:absolute;left:560px;width:80px;top:80px;"></xui:place>
  <xhtml:textarea cols="5" rows="5" id="textarea1" class="xui-textarea" style="position:absolute;position:absolute;height:328px;top:216px;left:88px;width:551px;"></xhtml:textarea>
  <xui:place control="trg_tablelist" id="controlPlace4" style="position:absolute;width:80px;top:45px;left:90px;"></xui:place>
  <xui:place control="trg_unCreateTableList" id="controlPlace2" style="position:absolute;left:180px;top:45px;width:160px;"></xui:place>
  <xhtml:label id="label3" class="xui-label" style="position:absolute;width:80px;position:absolute;left:10px;top:216px;"><![CDATA[执行结果]]></xhtml:label>
  <xui:place control="trg_clear" id="controlPlace5" style="width:80px;position:absolute;left:559px;top:45px;"></xui:place></xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_reload"> 
      <xforms:label id="default1"><![CDATA[重新加载]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[mainActivity.trg_reloadClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_calc">
   <xforms:label id="default2"><![CDATA[计算]]></xforms:label>
  <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[mainActivity.trg_calcClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_tablelist">
   <xforms:label id="default4"><![CDATA[工作表列表]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[mainActivity.trg_tablelistClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_unCreateTableList">
   <xforms:label id="default5"><![CDATA[未创建到数据库的工作表]]></xforms:label>
   <xforms:action id="action6" ev:event="DOMActivate"><xforms:script id="xformsScript6"><![CDATA[mainActivity.trg_unCreateTableListClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_clear">
   <xforms:label id="default6"><![CDATA[清空]]></xforms:label>
   <xforms:action id="action8" ev:event="DOMActivate"><xforms:script id="xformsScript8"><![CDATA[mainActivity.trg_clearClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="mainActivity.js"/> 
  <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"></xhtml:script></xui:resource> 
</xui:window>
