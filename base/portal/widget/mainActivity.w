<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:545px;height:auto;top:97px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="dWidget" concept="B_WIDGET_GL" onIndexChanged="mainActivity.dWidgetIndexChanged" confirm-delete="false" direct-delete="true"> 
      <reader id="default1" action="/base/portal/logic/action/queryB_WIDGET_GLAction"/>  
      <writer id="default2" action="/base/portal/logic/action/saveB_WIDGET_GLAction"/>  
      <creator id="default3" action="/base/portal/logic/action/createB_WIDGET_GLAction"/>  
      <calculate-relation relation="option" id="calculate-relation1" type="xsd:string"/> 
    </data>  
    <xforms:action id="action3" ev:event="onload"> 
      <xforms:script id="xformsScript3"><![CDATA[mainActivity.model1Load(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="reaOrg" concept="B_WIDGET_GLRY" limit="-1"> 
      <reader id="default7" action="/base/portal/logic/action/queryB_WIDGET_GLRYAction"/>  
      <writer id="default9" action="/base/portal/logic/action/saveB_WIDGET_GLRYAction"/>  
      <creator id="default10" action="/base/portal/logic/action/createB_WIDGET_GLRYAction"/> 
    <master id="master1" data="dWidget" relation="fMBID"></master>
  <calculate-relation relation="calCheck" id="calculate-relation2"></calculate-relation>
  <calculate-relation relation="calcIndex" id="calculate-relation3" type="xsd:string"></calculate-relation></data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xui:place control="tPanel" id="controlPlace21" style="height:100%;width:100%;"></xui:place>
  <xui:place control="layPanel" id="controlPlace14" style="height:100%;width:100%;display:none;"></xui:place></xui:layout>  
    <xui:view auto-load="true" id="tPanel" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout10"><xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="40%" mode="horz" id="splitter_sp" class="xui-splitter" has-drag-bar="true" has-arrow-button="true" fix-type="right" style="height:100%;width:100%;;position:absolute;" status="normal">
   <xhtml:div region="left" id="div3">
    <xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></xhtml:div> 
   <xhtml:div region="right" id="div4">
    <xui:place control="view4" id="controlPlace8" style="height:100%;width:100%;"></xui:place></xhtml:div> </xhtml:div></layout>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1">
    <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;position:absolute;top:0;left:0;;">
     <top size="40px" id="borderLayout-top1">
      <xui:place control="view2" id="controlPlace2" style="height:100%;width:100%;"></xui:place></top> 
     <center id="borderLayout-center1">
      <xui:place control="view3" id="controlPlace3" style="height:100%;width:99%;"></xui:place></center> </xhtml:div> </layout> 
   <xui:view auto-load="true" id="view2" class="xui-container">
    <layout type="absolute" style="position:relative;" id="layout2">
     <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" separator-size="10" style="position:absolute;top:6px;">
      <xui:place control="trigger1" id="controlPlace5"></xui:place>
      <xui:place control="deleteLay" id="controlPlace6"></xui:place>
      <xui:place control="trigger5" id="controlPlace10"></xui:place>
  </xhtml:div> 
  <xui:place control="authorityInspectBtn" id="controlPlace22" style="position:absolute;right:20px;top:6px;"></xui:place>
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar2" style="position:absolute;width:203px;left:215px;top:6px;"><xui:place control="retNRBtn" id="controlPlace24"></xui:place>
  <xui:place control="retLayoutBtn" id="controlPlace26"></xui:place></xhtml:div></layout> 
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" operation-owner="dWidget" appearance="image-minimal" operation="new">
     <xforms:label id="default4"></xforms:label></xforms:trigger> 
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="deleteLay" operation-owner="dWidget" appearance="image-minimal" icon-class="icon-system-trash">
     <xforms:label id="default5"><![CDATA[删除]]></xforms:label>
  <xforms:action id="action7" ev:event="DOMActivate"><xforms:script id="xformsScript7"><![CDATA[mainActivity.deleteLayClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5" operation-owner="dWidget" operation="save" appearance="image-minimal">
     <xforms:label id="default8"></xforms:label></xforms:trigger> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="authorityInspectBtn" class="button-yellow">
   <xforms:label id="default12"><![CDATA[权限校验]]></xforms:label>
  <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[mainActivity.authorityInspectBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="retNRBtn" appearance="image-minimal">
   <xforms:label id="default14"><![CDATA[清空内容]]></xforms:label>
   <xforms:action id="action10" ev:event="DOMActivate"><xforms:script id="xformsScript10"><![CDATA[mainActivity.retNRBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="retLayoutBtn" appearance="image-minimal">
   <xforms:label id="default16"><![CDATA[清空布局]]></xforms:label>
   <xforms:action id="action8" ev:event="DOMActivate">
    <xforms:script id="xformsScript8">mainActivity.retLayoutBtnClick(event)</xforms:script></xforms:action> </xforms:trigger></xui:view> 
   <xui:view auto-load="true" id="view3" class="xui-container">
    <layout type="absolute" style="position:relative;" id="layout3">
     <xui:place control="grid1" id="controlPlace4" style="position:absolute;left:0px;top:0px;width:100%;height:240px;"></xui:place>
     <xui:place control="wdSelectOrgs" id="controlPlace13" style="position:absolute;top:255px;left:125px;"></xui:place>
     <xui:place control="wdSelectInfo" id="controlPlace9" style="position:absolute;top:290px;left:309px;"></xui:place>
  <xui:place control="view6" id="controlPlace18" style="position:absolute;height:319px;width:862px;left:2px;top:250px;"></xui:place></layout> 
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dWidget" cascade="true">
     <xui:column id="gridColumn15" ref="fMBMC" label="模板名称" type="ed" width="120px"></xui:column>
     <xui:column id="gridColumn17" ref="fBJLX" label="类型" type="ro" width="80px" align="center"></xui:column>
     <xui:column id="gridColumn18" ref="fMBNR" label="内容" type="html" width="200px" onRender="mainActivity.grid1_fMBNRRender"></xui:column>
     <xui:column id="gridColumn1" ref="fMBBJXX" label="布局（已发布）" type="ed" width="150px"></xui:column>
     <xui:column id="gridColumn2" ref="option" label="操作栏" type="html" width="200px" onRender="mainActivity.grid1_optionRender" align="center"></xui:column></xhtml:div> 
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title="选择人员" width="600px" height="500px" modal="true" root-filter="SA_OPOrg.sParent is null" id="wdSelectOrgs" multi-select="true" onReceive="mainActivity.wdSelectOrgsReceive" cascade="false"></xhtml:div>
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="选择widget" width="600px" height="400px" modal="true" id="wdSelectInfo" url="/UI/base/portal/widget/mainDLActivity.w" onSend="mainActivity.wdSelectInfoSend" onReceive="mainActivity.wdSelectInfoReceive"></xhtml:div>
  <xui:view auto-load="true" id="view6" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout11">
   <xhtml:div id="inspectView" class="xui-container" style="height:100%;width:100%;">
     <div class="inspectHead"><label>校验区域：</label><span class="inspectTitle"></span></div>
     <div class="inspectContent"></div>
   </xhtml:div>
   </layout></xui:view></xui:view> </xui:view>
  <xui:view auto-load="true" id="view4" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout4">
    <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout4" style="width:100%; height: 100%;">
     <top size="40px" id="borderLayout-top4">
      <xui:place control="view7" id="controlPlace15" style="height:100%;width:100%;"></xui:place></top> 
     <center id="borderLayout-center4">
      <xui:place control="view5" id="controlPlace11" style="height:100%;left:5px;width:98%;"></xui:place></center> </xhtml:div> </layout> 
   <xui:view auto-load="true" id="view7" class="xui-container">
    <layout type="absolute" style="position:relative;" id="layout7">
     <xui:place control="selectOrgBtn" id="controlPlace16" style="position:absolute;top:8px;width:100px;left:10px;"></xui:place>
     <xui:place control="btnDelete" id="controlPlace7" style="position:absolute;top:8px;left:116px;"></xui:place></layout> 
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="selectOrgBtn" class="button-blue" icon-class="icon-system-plus" appearance="image-text">
     <xforms:label id="default11">选择人员</xforms:label>
     <xforms:action id="action2" ev:event="DOMActivate">
      <xforms:script id="xformsScript2">mainActivity.selectOrgBtnClick(event)</xforms:script></xforms:action> </xforms:trigger> 
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnDelete" appearance="image-text" icon-class="icon-system-trash">
     <xforms:label id="default6"><![CDATA[删除]]></xforms:label>
     <xforms:action id="action1" ev:event="DOMActivate">
      <xforms:script id="xformsScript1">mainActivity.btnDeleteClick(event)</xforms:script></xforms:action> </xforms:trigger> </xui:view> 
   <xui:view auto-load="true" id="view5" class="xui-container">
    <layout type="absolute" style="position:relative;" id="layout5">
     <xui:place control="orgGrid" style="width:100%;height:100%;position:absolute;left:5px;top:5px;" id="controlPlace12"></xui:place>
  <xui:place control="message" id="controlPlace23" style="position:absolute;top:503px;left:216px;"></xui:place></layout> 
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" id="orgGrid" data="reaOrg" class="grid-compact" multi-selection="false" smart-render="-1">
     <xui:column id="gridColumn6" ref="calCheck" label="#master_checkbox" type="ch" width="30px" align="center"></xui:column><xui:column id="gridColumn7" ref="calcIndex" label="序号" type="ro" width="30px" show-index="true"></xui:column><xui:column id="gridColumn4" ref="sName" label="组织" type="ro" width="100px"></xui:column><xui:column id="gridColumn5" ref="sFName" label="路径" type="ro" width="150px"></xui:column><xui:column id="gridColumn3" ref="fLevel" label="类型" type="ro" width="80px" align="center"></xui:column>
  
  </xhtml:div> 
  <xhtml:div component="/UI/system/components/messageDialog.xbl.xml#messageDialog" id="message" title="信息提示"></xhtml:div></xui:view> </xui:view></xui:view>
  <xui:view auto-load="true" id="layPanel" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout6">
    <xui:place control="view9" id="controlPlace20" style="width:100%;position:absolute;left:0;top:40px;height:90%;"></xui:place>
    <xui:place control="view8" id="controlPlace17" style="width:100%;border-bottom: 1px dotted #ccc;box-shadow: 6px 3px 5px #f4f4f4;position:absolute;height:36px;"></xui:place></layout> 
   <xui:view auto-load="true" id="view9" class="xui-container">
    <layout type="absolute" style="position:relative;" id="layout9">
     <div id="layoutPage" class="grid-stack"></div></layout> </xui:view> 
   <xui:view auto-load="true" id="view8" class="xui-container">
    <layout type="absolute" style="position:relative;" id="layout8">
     <xhtml:span style="position:absolute;left:50%;margin-left:-100px;top:5px;height:35px;font-size:18px" class="xui-container"><span id="lay_tempName">模版名称</span><span style="color:#999;">(编辑模式)</span></xhtml:span>
     <xhtml:label id="msg_warning" style="position:absolute;left:10px;top:8px;" class="xui-label warn"></xhtml:label>
     <xui:place control="saveLayout" id="controlPlace19" style="position:absolute;right:100px;top:4px;"></xui:place>
     <xhtml:a id="closeLayout" style="position:absolute;right:10px;" onclick="mainActivity.closeLayoutClick(event)">X</xhtml:a></layout> 
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="saveLayout" class="button-blue" appearance="image-text" icon-class="icon-system-check">
     <xforms:label id="default13"><![CDATA[发布]]></xforms:label>
  <xforms:action id="action6" ev:event="DOMActivate"><xforms:script id="xformsScript6"><![CDATA[mainActivity.saveLayoutClick(event)]]></xforms:script></xforms:action></xforms:trigger> </xui:view> </xui:view></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink3" href="/UI/base/portal/widget/lib/css/bootstrap.min.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/base/portal/widget/lib/css/gridstack.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="mainActivity.css"/>  
    <xhtml:script id="htmlScript2">var $111 = jQuery.noConflict(true);</xhtml:script>  
    <xhtml:script id="htmlScript3" src="/UI/base/portal/widget/lib/js/jquery1.11.0.min.js"/>  
    <xhtml:script id="htmlScript4" src="/UI/base/portal/widget/lib/js/jquery-ui-1.10.4.min.js"/>  
    <xhtml:script id="htmlScript5" src="/UI/base/portal/widget/lib/js/bootstrap-3.2.0.min.js"/>  
    <xhtml:script id="htmlScript8" src="/UI/base/portal/widget/lib/js/layer.js"/>  
    <xhtml:script id="htmlScript6" src="/UI/base/portal/widget/lib/js/lodash.min.js"/>  
    <xhtml:script id="htmlScript7" src="/UI/base/portal/widget/lib/js/gridstack.js"/>  
    <xhtml:script id="htmlScript8" src="/UI/base/portal/widget/lib/js/TableLayout.js"/>  
    <!--[if IE]>
   	<xhtml:script id="htmlScript7" src="/UI/SA/theme/widgetMG/js/html5shiv-3.7.min.js"></xhtml:script>
	<![endif]-->  
    <xhtml:script id="htmlScript9" src="mainActivity.js"/> 
  </xui:resource> 
</xui:window>
