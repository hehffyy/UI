<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:161px;height:auto;top:68px;"/>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;margin-right:20px" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="height:100%;width:100%;"> 
        <center id="borderLayout-center1"> 
          <xhtml:table id="tableInput" style="height:100%;width:100%;" border="1"></xhtml:table> 
        </center>  
        <bottom size="50px" id="borderLayout-bottom1"> 
          <xui:place control="trigger4" id="controlPlace6" style="float:right;margin:10px 10px 0 0"/>  
          <xui:place control="trigger5" id="controlPlace7" style="float:right;margin:10px 10px 0 0"/> 
        </bottom> 
      </xhtml:div>  
      <xui:place control="recevier" id="controlPlace1" style="position:absolute;left:218px;top:193px;"/> 
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4"> 
      <xforms:label id="default4"><![CDATA[取消]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript3"><![CDATA[unitTransform.trigger4Click(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5"> 
      <xforms:label id="default5"><![CDATA[确定]]></xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript2"><![CDATA[unitTransform.trigger5Click(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="recevier" onReceive="unitTransform.recevierReceive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="unitTransform.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/system_X/components/unitField/unitFieldManager.js"/> 
  <xhtml:script id="htmlScript3" src="/UI/base/core/template/butoneExtend.js"></xhtml:script></xui:resource> 
</xui:window>
