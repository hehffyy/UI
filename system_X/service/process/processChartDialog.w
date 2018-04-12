<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model1" style="top:106px;height:auto;left:189px;">
    <xforms:action id="action1" ev:event="onload">
      <xforms:script id="xformsScript1">processChartDialog.model1Load(event)</xforms:script>
    </xforms:action>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
		<xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" style="width:100%;height:100%;overflow:auto;">
			<xui:tab selected="true">
				<xui:label>轨迹图</xui:label>
				<xhtml:div id="track" component="/UI/system/components/processChart.xbl.xml#processTrackChart" style="height:100%;"/>
			</xui:tab>
			<xui:tab xforms-select="processChartDialog.tabPage1Select">
				<xui:label>波特图</xui:label>
				<xhtml:div id="pert" component="/UI/system/components/processChart.xbl.xml#processPertChart" style="height:100%;"/>
			</xui:tab>
		</xhtml:div>					
    </xui:layout> 
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="processChartDialog.js"/>
  </xui:resource> 
</xui:window>
