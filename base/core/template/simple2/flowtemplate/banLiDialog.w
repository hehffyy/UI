<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1"><xforms:action id="action4" ev:event="onload"><xforms:script id="xformsScript4"><![CDATA[banLiDialog.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1"> 
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="150px" mode="horz" id="HSplitter1" class="xui-splitter" resizable="false"
            has-drag-bar="false" style="height:100%;width:100%;"> 
            <xhtml:div region="left" id="div1"> 
              <xhtml:div id="div3"> 
                <xhtml:ul id="formNav" class="formNav"/> 
              </xhtml:div> 
            </xhtml:div>  
            <xhtml:div region="right" id="div2"> 
              <xhtml:div id="formView" class="xui-container xui-autofill"/> 
            </xhtml:div> 
          </xhtml:div> 
        </center>  
        <bottom size="40px" id="borderLayout-bottom1"> 
          <xhtml:div id="div4" class="xui-autofill" style="padding-top:5px"> 
            <xui:place control="btnClose" id="controlPlace5" style="float:right;margin-right:10px"/>  
            <xui:place control="btnNext" id="controlPlace4" style="display:none;float:right;margin-right:10px"/> 
          </xhtml:div> 
        </bottom> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace6" style="position:absolute;top:176px;left:467px;"/> 
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnNext" appearance="image-text" icon-class="icon-system-play" class="button-green"> 
      <xforms:label id="default4"><![CDATA[发送]]></xforms:label> 
    <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[banLiDialog.btnNextClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnClose" appearance="image-text" icon-class="icon-system-cancel"> 
      <xforms:label id="default5"><![CDATA[关闭]]></xforms:label> 
    <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[banLiDialog.btnCloseClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="banLiDialog.windowReceiverReceive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script src="/UI/base/lib/init.js"/>  
    <xhtml:script src="/UI/system/components/windowFrame/windowFrame.js"/>
    <xhtml:link rel="stylesheet" type="text/css" href="banLiDialog.css"/>    
    <xhtml:script src="banLiDialog.js"/> 
  </xui:resource> 
</xui:window>
