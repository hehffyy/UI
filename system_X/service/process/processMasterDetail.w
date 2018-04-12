<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:78px;top:197px;"> 
    <data component="/UI/system/components/data.xbl.xml#data" columns="FBIZRECID,FBIZNAME,FRECTITLE,FFLOWID,FSTATUSNAME,FMAINDEPT,FMAINDEPT,BLXX"
      auto-load="false" id="mTask"/>  
    <xforms:action id="action2" ev:event="onload"> 
      <xforms:script id="xformsScript2"><![CDATA[processMasterDetail.model1Load(event)]]></xforms:script> 
    </xforms:action>  
    </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1" style="border-style:solid;border-width:thin;border-color:#F2F2F2"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout3" style="width:100%; height: 100%;;"> 
            <top size="40px" id="borderLayout-top2"><xhtml:div id="div2" class="xui-container" style="width:100%;line-height:30px;height:100%;"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="height:100%;padding-left:10px;"><xui:place control="trigger1" id="controlPlace1" style="width:90px;"></xui:place><xhtml:label id="label1" class="xui-label" style="font-size:large;"><![CDATA[查看更多办理信息请进入案卷]]></xhtml:label></xhtml:div>
  </xhtml:div></top><center id="borderLayout-center3"> 
              <xui:place control="grid1" id="controlPlace2" style="height:100%;width:100%;"/> 
            </center> 
          </xhtml:div> 
        </center> 
      </xhtml:div>  
      <xui:place control="windowReceiver1" id="controlPlace3"/>  
      <xui:place control="windowDialog1" id="controlPlace5" style="position:absolute;top:163px;left:322px;"/> 
    </xui:layout>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="mTask" onRowDblClick="processMasterDetail.grid1RowDblClick"
      onAfterIndexChanged="processMasterDetail.grid1AfterIndexChanged"> 
      <xui:column id="indexColumn" ref="index" label="序号" type="ro" width="50px"
        show-index="true" align="center"/>  
      <xui:column id="gridColumn2" ref="FRECTITLE" label="案卷标题" type="ro" width="400px"></xui:column><xui:column id="gridColumn1" ref="FBIZNAME" label="业务名称" type="ro" width="150px"
        align="center"/>  
      <xui:column id="gridColumn5" ref="FSTATUSNAME" label="案卷状态" type="ro" width="100px"
        align="center"/>  
    <xui:column id="gridColumn3" ref="BLXX" label="当前办理信息" type="ro" width="250px"></xui:column></xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="" width="396px" height="264px" resizable="true" status="maximize" left="0"
      top="0" dialogUpdate="true" modal="true" id="windowDialog1" url="/UI/system_X/service/process/processChartDialog.w"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1"/> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" appearance="image-text" class="button-blue" icon-class="icon-system-eye">
   <xforms:label id="default1"><![CDATA[进入案卷]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[processMasterDetail.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="processMasterDetail.js"/> 
  <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"></xhtml:script></xui:resource> 
</xui:window>
