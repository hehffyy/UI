<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="height:auto;left:160px;top:65px;"></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="0px" id="borderLayout-top1"></top>  
        <center id="borderLayout-center1"> 
          <xhtml:iframe id="oneMap" src="about:blank" style="width:100%;height:100%"
            frameBorder="0" scrolling="auto" onload="$.proxy(mapBrowser.initOneMap,mapBrowser)();"/> 
        </center> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace2" style="position:absolute;top:88px;left:213px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="mapBrowser.windowReceiverReceive"/> 
  </xui:view>  
  <xui:resource id="resource"> 
    <xhtml:script src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script src="mapBrowser.js"/>  
    <xhtml:script src="/UI/base/mapBrowser/gisUtils.js"/>  
    <xhtml:script src="/UI/system/components/windowOpener/windowOpener.js"/>  
    <xhtml:script src="/UI/system/components/windowRunner/windowRunner.js"/>  
    <xhtml:script src="/UI/system/components/dialog/dialog.js"/>  
    <xhtml:script src="/UI/system/components/windowDialog/windowDialog.js"/> 
  </xui:resource> 
</xui:window>
