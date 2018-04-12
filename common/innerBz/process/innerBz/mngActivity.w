<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;width:130px;top:274px;left:40px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dataBz" concept="B_BzInfo" onIndexChanged="mngActivity.dataBzIndexChanged" onAfterRefresh="mngActivity.dataBzAfterRefresh"><reader id="default2" action="/common/innerBz/logic/action/queryB_BzInfoExAction"></reader>
  <writer id="default3"></writer>
  <creator id="default4"></creator></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dataSQ" concept="B_BzSq" store-type="simple"><reader id="default5" action="/common/innerBz/logic/action/queryB_BzSqAction"></reader>
  <writer id="default9" action="/common/innerBz/logic/action/saveB_BzSqAction"></writer>
  <creator id="default10" action="/common/innerBz/logic/action/createB_BzSqAction"></creator>
  <master id="master1" data="dataBz" relation="fBzId"></master></data>
  <xforms:action id="action6" ev:event="onload"><xforms:script id="xformsScript6"><![CDATA[mngActivity.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout id="layout1" style="height:100%;width:100%;"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <top size="38px" id="borderLayout-top1"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="width:100%;height:100%;" separator-size="10">
  
  <xhtml:label id="lbl1" class="xui-label" style="float:left;"><![CDATA[状态：]]></xhtml:label><xui:place control="gridFilter1" id="controlPlace5" style="width:107px;"></xui:place><xui:place control="searchTrigger" id="controlPlace8" style="width:25px;"></xui:place><xui:place control="btnBjgz" id="controlPlace2" style="width:91px;"></xui:place>
  <xui:place control="btnBjsl" id="controlPlace10" style="width:91px;"></xui:place><xui:place control="btnHs" id="controlPlace13" style="width:91px;"></xui:place><xui:place control="btnSecondBz" id="controlPlace12" style="width:91px;"></xui:place>
  <xui:place control="trigger1" id="controlPlace14" style="width:91px;"></xui:place></xhtml:div>
  </top>
   <center id="borderLayout-center1"><xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1" class="xui-tabPanel" style="height:100%;width:100%;">
   <xui:tab id="tabPage1">
    <xui:label id="xuiLabel1"><![CDATA[补正项目]]></xui:label>
  <xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></xui:tab> 
   <xui:tab id="tabPage2">
    <xui:label id="xuiLabel2"><![CDATA[回复信息]]></xui:label>
  
  
  <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="290px" mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;" has-drag-bar="true" has-arrow-button="true">
   <xhtml:div region="left" id="div1"><xhtml:label id="label1" class="xui-label" style="height:5%;"><![CDATA[回复附件列表：]]></xhtml:label>
  <xui:place control="attachmentEditor21" id="controlPlace4" style="width:283px;height:95%;"></xui:place></xhtml:div>
   <xhtml:div region="right" id="div2"><xui:place control="view1" id="controlPlace6" style="height:100%;width:100%;"></xui:place></xhtml:div></xhtml:div></xui:tab> 
  <xui:tab id="tabPage3">
   <xui:label id="xuiLabel3"><![CDATA[申请信息]]></xui:label>
  <xui:place control="grid2" id="controlPlace3" style="width:100%;border-style:solid solid solid solid;border-width:thin thin thin thin;height:100%;"></xui:place></xui:tab></xhtml:div></center></xhtml:div></xui:layout>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dataBz" edit-mode="true" onRowDblClick="mngActivity.grid1RowDblClick"><xui:column id="gridColumn1" ref="XMMC" label="项目名称" type="ed" width="400px" readonly="true"></xui:column><xui:column id="gridColumn2" ref="YDDW" label="用地单位" type="ed" width="300px" readonly="true"></xui:column><xui:column id="gridColumn6" ref="XMLX" label="项目类型" type="ed" width="100px" readonly="true"></xui:column><xui:column id="gridColumn7" ref="SBWH" label="上报文号" type="ed" width="200px" readonly="true"></xui:column><xui:column id="gridColumn4" ref="fKind" label="补正类型" type="ed" width="100px" readonly="true"></xui:column><xui:column id="gridColumn5" ref="fDoState" label="过程状态" type="ed" width="100px" readonly="true"></xui:column><xui:column id="gridColumn3" ref="fState" label="状态" type="ed" width="100px" readonly="true"></xui:column>
  
  
  
  
  
  </xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBjgz" class="button-blue" icon-class="icon-system-popup" appearance="image-text">
   <xforms:label id="default1"><![CDATA[补交告知]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[mngActivity.btnBjgzClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/filter.xbl.xml#gridFilter" id="gridFilter1" filter-data="dataBz" filter-relation="fState" default-value="'未完成'" default-label="'未完成'" all-selected-label="'全部'" onGetCondition="mngActivity.gridFilter1GetCondition">
   <xforms:label ref="FSTATE" id="default6"></xforms:label>
   <xforms:value ref="FSTATE" id="default7"></xforms:value>
   <xforms:itemset id="default8">
  <xforms:column ref="FSTATE" id="default21"></xforms:column>
  <itemset-data xmlns="" id="default30">
   <rows xmlns="" id="default31">
    <row id="default32">
     <cell id="default33">未完成</cell></row> 
    <row id="default34">
     <cell id="default35">已完成</cell></row> </rows> </itemset-data></xforms:itemset></xhtml:div>
  <xforms:trigger appearance="image" class="button-yellow" component="/UI/system/components/trigger.xbl.xml#trigger" id="searchTrigger" operation-owner="dataBz" operation="refresh">
   <xforms:label id="searchTriggerLabel"></xforms:label></xforms:trigger>
  <xhtml:div component="/UI/system/components/attachmentEditor2.xbl.xml#attachmentEditor2" display-buttons="download:true;history:false;delete:false;edit:false;template:false;upload:false;" limit="-1" runtime="html4" id="attachmentEditor21" class="xui-attachmentEditor2" ref="data('dataBz')/fReplyDocIds"></xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xhtml:label id="label3" style="position:absolute;top:31px;left:24px;" class="xui-label"><![CDATA[回复人：]]></xhtml:label>
  <xhtml:label id="label5" class="xui-label" style="position:absolute;position:absolute;left:24px;top:69px;"><![CDATA[回复时间：]]></xhtml:label>
  <xhtml:label id="label7" class="xui-label" style="position:absolute;position:absolute;position:absolute;top:114px;left:24px;"><![CDATA[回复内容：]]></xhtml:label>
  <xui:place control="textarea2" id="controlPlace7" style="position:absolute;left:111px;top:114px;height:181px;width:370px;"></xui:place>
  <xui:place control="input4" id="controlPlace9" style="position:absolute;left:111px;top:31px;width:348px;"></xui:place>
  <xui:place control="input6" id="controlPlace11" style="position:absolute;top:69px;width:346px;left:111px;"></xui:place></layout>
  <xforms:textarea ref="data('dataBz')/fReply" id="textarea2" readonly="true"></xforms:textarea>
  <xforms:input id="input4" ref="data('dataBz')/fReplyPerson" readonly="true"></xforms:input>
  <xforms:input id="input6" ref="data('dataBz')/fReplyTime" readonly="true" disabled="true"></xforms:input></xui:view>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid2" data="dataSQ">
   <xui:column id="gridColumn8" ref="fDeptName" label="申请部门" type="ed" width="157px" readonly="true"></xui:column>
   <xui:column id="gridColumn9" ref="fPersonName" label="申请人" type="ed" width="145px" readonly="true"></xui:column>
   <xui:column id="gridColumn10" ref="fTime" label="申请时间" type="ed" width="154px" readonly="true"></xui:column>
   <xui:column id="gridColumn11" ref="fReason" label="申请原因" type="textarea" width="300px" readonly="true"></xui:column></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSecondBz" class="button-blue" icon-class="icon-system-popup" appearance="image-text">
   <xforms:label id="default12"><![CDATA[二次补正]]></xforms:label>
   <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[mngActivity.btnSecondBzClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBjsl" class="button-blue" icon-class="icon-system-popup" appearance="image-text">
   <xforms:label id="default11"><![CDATA[补正受理]]></xforms:label>
   <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[mngActivity.btnBjslClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnHs" class="button-blue" icon-class="icon-system-popup" appearance="image-text">
   <xforms:label id="default13"><![CDATA[发起会审]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[mngActivity.btnHsClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" class="button-blue" icon-class="icon-system-popup" appearance="image-text">
   <xforms:label id="default14">二次补正</xforms:label>
   <xforms:action id="action7" ev:event="DOMActivate"><xforms:script id="xformsScript7"><![CDATA[mngActivity.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="/UI/base/lib/butoneExUtils.js"></xhtml:script>
  <xhtml:script id="htmlScript2" src="mngActivity.js"></xhtml:script>
  <xhtml:script id="htmlScript3" src="/UI/base/core/template/butoneExtend.js"></xhtml:script>
  <xhtml:script id="htmlScript4" src="/UI/base/lib/init.js"></xhtml:script>
  </xui:resource> 
</xui:window>
