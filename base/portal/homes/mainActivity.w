<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1"><xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[mainActivity.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
    	<div id="thewidget-content">
			<!-- 拖拽阵列 -->  
	        <div class="grid-stack"/> 	    	
    	</div>
     </xui:layout>
  </xui:view>  
  <xui:resource id="resource1">	
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/base/portal/homes/css/gridstack.css"/>  
  <xhtml:script id="htmlScript6">var $111 = jQuery.noConflict(true);</xhtml:script>  
      <xhtml:script id="htmlScript6" src="/UI/base/portal/homes/js/jquery1.11.0.min.js"/>  
    <xhtml:script id="htmlScript7" src="/UI/base/portal/homes/js/jquery-ui-1.10.4.min.js"/>  
    <xhtml:script id="htmlScript7" src="/UI/base/portal/homes/js/bootstrap-3.2.0.min.js"/>  
    <xhtml:script id="htmlScript7" src="/UI/base/portal/homes/js/lodash.min.js"/>  
    <xhtml:script id="htmlScript7" src="/UI/base/portal/homes/js/gridstack.js"/>  
    <xhtml:script id="htmlScript6" src="/UI/base/portal/homes/js/TableLayout.js"/>  
    <!--[if IE]>
   	<xhtml:script id="htmlScript7" src="/UI/base/portal/homes/js/html5shiv-3.7.min.js"></xhtml:script>
	<![endif]--> 
  <xhtml:script id="htmlScript1" src="/UI/base/portal/homes/mainActivity.js"></xhtml:script>
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="mainActivity.css"></xhtml:link>
  </xui:resource> 
</xui:window>
