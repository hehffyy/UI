<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1"><xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[mainActivity.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;"/>
    </xui:layout>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1">
      <div class="pro-item"></div>
      </layout>
    </xui:view>
  </xui:view>  
  <xui:resource id="resource1">
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/base/core/widgets/css/css.css"></xhtml:link>
  <xhtml:script id="htmlScript1" src="mainActivity.js"></xhtml:script>
  <xhtml:script id="htmlScript2" src="/UI/base/core/widgets/js/jquery.tmpl.js"></xhtml:script>
  </xui:resource> 
</xui:window>
