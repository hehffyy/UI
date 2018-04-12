<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="height:auto;top:41px;left:136px;"> 
    
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="150px"
        mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;"
        resizable="false" has-drag-bar="false"> 
        <xhtml:div region="left" id="div30"> 
          <xhtml:div> 
            <xhtml:ul id="bizOperationNav" class="bizOperationNav"/> 
          </xhtml:div> 
        </xhtml:div>  
        <xhtml:div region="right" id="div31"> 
          <xhtml:div id="bizOperationContainer" style="height:100%;width:100%;">
          </xhtml:div> 
        </xhtml:div> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace1" style="position:absolute;top:262px;left:319px;"/>  
      </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="bizOperationDialog.windowReceiverReceive"/>  
    </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script src="/UI/base/lib/init.js"/>  
    <xhtml:script id="htmlScript0" src="/UI/base/core/flowOperation/bizOperation.js"/>  
    <xhtml:script id="htmlScript1" src="/UI/system/components/process/process.js"/>
    <xhtml:script id="htmlScript2" src="/UI/system/components/windowFrame/windowFrame.js"/>    
    <xhtml:script id="htmlScript3" src="bizOperationDialog.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="bizOperationDialog.css"/> 
  </xui:resource> 
</xui:window>
