<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:166px;height:auto;top:79px;"> 
    <xforms:action id="action1" ev:event="onload"> 
      <xforms:script id="xformsScript1"><![CDATA[banLiGuoCheng.model1Load(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1"
        class="xui-tabPanel" style="height:100%;width:100%;"> 
        <xui:tab id="tabPage2" xforms-select="banLiGuoCheng.tabPage2Select"> 
          <xui:label id="xuiLabel2"><![CDATA[流程图]]></xui:label>  
          <xui:place control="processTrackChart1" id="controlPlace2" style="height:100%;width:100%;"/> 
        </xui:tab>  
        <xui:tab id="tabPage1" xforms-select="banLiGuoCheng.tabPage1Select"> 
          <xui:label id="xuiLabel1"><![CDATA[办理过程]]></xui:label>  
          <xhtml:div id="div1" style="width:100%;" class="divPertChart">
            <xui:place control="processPertChart1" id="controlPlace1" style="width:100%;"/>
          </xhtml:div>
        </xui:tab>  
        <xui:tab id="tabPage3" xforms-select="banLiGuoCheng.tabPage3Select" visable="true"> 
          <xui:label id="xuiLabel3"><![CDATA[办理进度]]></xui:label>  
          <xui:place control="loadRecRelationFrame" id="controlPlace3" style="height:100%;width:100%;"/> 
        </xui:tab> 
      <xui:tab id="tabIdea" xforms-select="banLiGuoCheng.tabIdeaSelect">
   <xui:label id="xuiLabel4"><![CDATA[办理意见]]></xui:label>
  <xui:place control="ideaFrame" id="controlPlace4" style="height:100%;width:100%;"></xui:place></xui:tab></xhtml:div> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/processChart.xbl.xml#processTrackChart"
      id="processTrackChart1"/>  
    <xhtml:div component="/UI/system/components/windowFrame.xbl.xml#windowFrame"
      id="loadRecRelationFrame" url="/UI/system_X/service/process/processMasterDetail.w"/>  
    <xhtml:div component="/UI/system/components/processChart.xbl.xml#processPertChart"
      id="processPertChart1"/>
  <xhtml:div component="/UI/system/components/windowFrame.xbl.xml#windowFrame" id="ideaFrame" process="/SA/task/taskCenter/taskCenterProcess" activity="mainActivity"></xhtml:div></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="banLiGuoCheng.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="banLiGuoCheng.css"/>
  </xui:resource> 
</xui:window>
