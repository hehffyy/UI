<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="left:367px;height:auto;top:70px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="idiomsData" concept="B_Idioms" limit="-1" direct-delete="true" confirm-refresh="false" store-type="simple"><reader id="default1" action="/base/system/logic/action/queryB_IdiomsAction"></reader>
  <writer id="default2" action="/base/system/logic/action/saveB_IdiomsAction"></writer>
  <creator id="default3" action="/base/system/logic/action/createB_IdiomsAction"></creator>
  </data>
  <xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[idiomsDialog.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xui:place control="windowReceiver" id="controlPlace11" style="position:absolute;top:146px;left:257px;"></xui:place>
  <xhtml:ul id="idiomList"></xhtml:ul></xui:layout> 
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver" onReceive="idiomsDialog.windowReceiverReceive"></xhtml:div>
  </xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="idiomsDialog.js"></xhtml:script>
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="idiomsDialog.css"></xhtml:link></xui:resource> 
</xui:window>
