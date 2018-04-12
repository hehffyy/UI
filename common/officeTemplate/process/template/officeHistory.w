<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:100px;height:auto;top:193px;">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="dataVersion" concept="B_OfficeVersion" limit="-1" onRefreshCreateParam="officeHistory.dataVersionRefreshCreateParam">
      <reader id="default1" action="/common/officeTemplate/logic/action/queryB_OfficeVersionAction"/>  
      <rule id="dataBizRule1" concept="B_OfficeVersion" readonly="true()"/>
    <calculate-relation relation="opertaion" id="calculate-relation1"></calculate-relation></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xui:place control="gridMain" id="controlPlace1" style="height:100%;width:100%;"/>  
      <xui:place control="windowReceiver1" id="controlPlace2" style="position:absolute;top:254px;left:507px;"/>
    <xui:place control="windowRunner" id="controlPlace4" style="position:absolute;left:221px;top:112px;"></xui:place>
  <xui:place control="windowOpener1" id="controlPlace5" style="position:absolute;left:242px;top:406px;"></xui:place></xui:layout>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="gridMain" data="dataVersion" onRowDblClick="officeHistory.gridMainRowDblClick">
      <xui:column id="gridColumn7" ref="version" label="序号" type="ro" width="100px"
        align="center" show-index="true"/>
      <xui:column id="gridColumn1" ref="fCreator" label="创建人" type="ed" width="100px"/>  
      <xui:column id="gridColumn2" ref="fCreateTime" label="创建时间" type="ed" width="100px"/>  
      <xui:column id="gridColumn3" ref="fVersionName" label="版本号" type="ed" width="100px"/>  
      <xui:column id="gridColumn4" ref="fVersionState" label="版本状态" type="ed" width="100px"/>  
      <xui:column id="gridColumn5" ref="fCheckPerson" label="提交人" type="ed" width="100px"/>  
      <xui:column id="gridColumn6" ref="fCheckTime" label="提交时间" type="ed" width="100px"/> 
    <xui:column id="gridColumn8" ref="opertaion" label="操作" type="html" width="*" onRender="officeHistory.gridMain_opertaionRender"></xui:column></xhtml:div>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="officeHistory.windowReceiver1Receive"/>
  <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner" id="windowRunner" url="/UI/base/system/office/NtkoOfficeLook.w" title="历史版本" process="/common/officeTemplate/process/template/templateProcess" activity="mainActivity" onSend="officeHistory.windowRunnerSend"></xhtml:div>
  <xhtml:div component="/UI/system/components/windowOpener.xbl.xml#windowOpener" width="400px" height="300px" modal="false" id="windowOpener1" url="/UI/base/system/office/NtkoOfficeLook.w" onSend="officeHistory.windowRunnerSend"></xhtml:div></xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="officeHistory.js"/>
  </xui:resource> 
</xui:window>
