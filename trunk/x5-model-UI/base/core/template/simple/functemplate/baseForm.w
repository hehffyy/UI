<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:f="http://orbeon.org/oxf/xml/formatting" xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
  xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xforms="http://www.justep.com/xforms"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:data="http://www.justep.com/x5/xui/data#"
  xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:justep="http://www.justep.com/x5#"
  xmlns:xs="http://www.w3.org/2001/XMLSchema" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model"> 
    <xforms:action ev:event="xforms-model-construct"> 
      <xforms:script><![CDATA[baseForm.model_onModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action ev:event="onunload"> 
      <xforms:script><![CDATA[baseForm.model_onUnLoad(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <view auto-load="true" id="rootView"> 
    <layout type="absolute" style="position:relative;height:100%;width:100%;left:0px;top:0px;"> 
      <xhtml:div onReceive="baseForm.activieFormOpenParamsReceiver_onReceive" style="position:absolute;left:100px;top:10px;"
        component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="activieFormOpenParamsReceiver"/>  
      <xui:place control="mainView" id="controlPlace1" style="position:absolute;height:100%;width:100%;left:0px;top:0px;"/> 
    </layout>  
    <xui:view auto-load="true" id="mainView" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"/> 
    </xui:view> 
  </view>  
  <resource id="resource"> 
    <xhtml:script id="htmlScript2" src="/UI/base/lib/init.js"/>  
    <xhtml:script id="htmlScript1" src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script src="/UI/base/core/template/simple/functemplate/baseForm.js"/> 
  </resource> 
</xui:window>
