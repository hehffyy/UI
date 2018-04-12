<?xml version="1.0" encoding="utf-8"?>

<window xmlns="http://www.justep.com/xui" xmlns:xu="http://www.xmldb.org/xupdate"
  xmlns:xui="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <div id="model" xui:update-mode="delete"/>  
  <div id="rootView" xui:update-mode="delete"/>  
  <div id="resource" xui:update-mode="delete"/>  
  <div id="model" xui:update-mode="insert" xui:parent=""/>  
  <div id="rootView" xui:update-mode="insert" xui:parent=""/>  
  <div id="resource" xui:update-mode="insert" xui:parent=""/>  
  <div id="model" xui:update-mode="insert" xui:parent=""/>  
  <div id="rootView" xui:update-mode="insert" xui:parent=""/>  
  <div id="resource" xui:update-mode="insert" xui:parent=""/>  
  <div id="model" xui:update-mode="insert" xui:parent=""/>  
  <div id="rootView" xui:update-mode="insert" xui:parent=""/>  
  <div id="resource" xui:update-mode="insert" xui:parent=""/>  
  <div id="model" xui:update-mode="insert" xui:parent=""/>  
  <div id="rootView" xui:update-mode="insert" xui:parent=""/>  
  <div id="resource" xui:update-mode="insert" xui:parent=""/>  
  <div id="model" xui:update-mode="insert" xui:parent=""/>  
  <div id="rootView" xui:update-mode="insert" xui:parent=""/>  
  <div id="resource" xui:update-mode="insert" xui:parent=""/>  
  <div id="model" xui:update-mode="insert" xui:parent=""/>  
  <div id="rootView" xui:update-mode="insert" xui:parent=""/>  
  <div id="resource" xui:update-mode="insert" xui:parent=""/>  
  <xforms:model id="model1" xui:update-mode="insert" xui:parent="">
    <xforms:action id="action1" ev:event="onload">
      <xforms:script id="xformsScript1"><![CDATA[mainDLActivity.model1Load(event)]]></xforms:script>
    </xforms:action>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true" xui:update-mode="insert" xui:parent=""> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1"> 
          <xui:place control="view2" id="controlPlace2" style="height:100%;width:100%;"/>
        </center>  
        <bottom size="220px" id="borderLayout-bottom1"> 
          <xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;"/> 
        </bottom> 
      </xhtml:div> 
    </xui:layout>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
          id="borderLayout2" style="width:100%; height: 100%;position:absolute;top:0;left:0;"> 
          <top size="30px" id="borderLayout-top2"> 
            <xhtml:div class="xui-container" id="selectBar" style="height:100%;;"> 
              <xhtml:div class="xui-container" id="div1" onselectstart="return false;"
                style="float:left;margin-top:6px;height:27px;padding-left:10px;">选中列表(共<span class="w-count">0</span>项):</xhtml:div> 
            </xhtml:div> 
          </top>  
          <center id="borderLayout-center2"> 
            <xhtml:div id="div4" class="xui-container" style="height:100%;width:100%;border: 1px dashed #ccc;">
              <xhtml:ul id="selectedWidget"/>
            </xhtml:div> 
          </center> 
        <bottom size="50px" id="borderLayout-bottom2"><xui:place control="view3" id="controlPlace4" style="height:100%;width:100%;"></xui:place></bottom></xhtml:div> 
      </layout> 
    <xui:view auto-load="true" id="view3" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout3"><xui:place control="d_save" id="controlPlace5" style="position:absolute;right:90px;top:10px;"></xui:place>
  <xui:place control="d_close" id="controlPlace6" style="position:absolute;right:20px;top:10px;"></xui:place></layout>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="d_save" class="button-blue">
   <xforms:label id="default1"><![CDATA[保存设置]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[mainDLActivity.d_saveClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="d_close">
   <xforms:label id="default2"><![CDATA[关闭]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[mainDLActivity.d_closeClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view></xui:view>  
    <xui:view auto-load="true" id="view2" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout2">
        <xhtml:ul id="widgetContainer" class="wd-content"/>  
        <xui:place control="windowReceiver1" id="controlPlace3" style="position:absolute;left:909px;top:210px;"/>
      </layout>  
      <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
        id="windowReceiver1" onReceive="mainDLActivity.windowReceiver1Receive"/>
    </xui:view>
  </xui:view>  
  <xui:resource id="resource1" xui:update-mode="insert" xui:parent="">
    <xhtml:script id="htmlScript1" src="mainDLActivity.js"/>
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/base/portal/widget/mainDLActivity.css"></xhtml:link></xui:resource> 
</window>
