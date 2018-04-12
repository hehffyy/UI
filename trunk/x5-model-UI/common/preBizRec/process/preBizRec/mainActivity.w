<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;top:8px;left:591px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dsRec" concept="V_PreBizRec" confirm-refresh="false" limit="15"><reader id="default5" action="/common/preBizRec/logic/action/queryV_PreBizRecAction"></reader>
  <writer id="default6"></writer>
  <creator id="default7"></creator></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dsFiles" concept="Net_Files"><reader id="default8" action="/common/preBizRec/logic/action/queryV_FilesAction"></reader>
  <writer id="default9"></writer>
  <creator id="default12"></creator>
  <master id="master1" data="dsRec" relation="fBizRecId"></master>
  <rule id="dataBizRule1" concept="f" readonly="true()"></rule></data>
  <xforms:action id="action2" ev:event="onload"><xforms:script id="xformsScript2"><![CDATA[mainActivity.model1Load(event)]]></xforms:script></xforms:action>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="dsBiz" concept="V_BizMapping">
   <reader id="default16" action="/common/preBizRec/logic/action/queryV_BizMappingAction"></reader></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <top size="37px" id="borderLayout-top1">
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="height:33px;width:650px;"><xui:place control="btnYs" id="controlPlace2" style="width:85px;"></xui:place>
  <xui:place control="btnSl" id="controlPlace4"></xui:place>
  <xui:place control="btnBysl" id="controlPlace5" style="width:80px;"></xui:place>
  <xui:place control="btnLook" id="controlPlace17" style="width:111px;"></xui:place><xui:place control="trigger8" id="controlPlace11"></xui:place>
  </xhtml:div>
  </top>
   <center id="borderLayout-center1"><xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1" class="xui-tabPanel" style="height:100%;width:100%;">
   <xui:tab id="tabPage1">
    <xui:label id="xuiLabel1">列表</xui:label>
  <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
   <top size="40px" id="borderLayout-top2"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar2" separator-size="5" style="top:5px;position:absolute;">
  <xhtml:label id="label6" class="xui-label"><![CDATA[智能查询：]]></xhtml:label>
  <xui:place control="trigger1" id="controlPlace18"></xui:place><xui:place control="smartFilter1" id="controlPlace15" style="width:250px;height:25px;"></xui:place></xhtml:div>
  </top>
   <center id="borderLayout-center2"><xui:place control="gridMain" id="controlPlace6" style="height:100%;width:100%;"></xui:place></center>
  <bottom size="42px" id="borderLayout-bottom1"><xui:place control="pagination1" id="controlPlace7" style="width:100%;height:100%;"></xui:place></bottom></xhtml:div></xui:tab> 
   <xui:tab id="tabPage2">
    <xui:label id="xuiLabel2"><![CDATA[详细信息]]></xui:label>
  <xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></xui:tab> 
  <xui:tab id="tabPage3">
   <xui:label id="xuiLabel3"><![CDATA[附件信息]]></xui:label>
  <xui:place control="grid1" id="controlPlace20" style="height:100%;width:100%;"></xui:place>
  </xui:tab></xhtml:div></center></xhtml:div>
  <xui:place control="byslDlg" id="controlPlace23" style="position:absolute;top:297px;left:814px;"></xui:place>
  <xui:place control="browRunner" id="controlPlace21" style="position:absolute;top:414px;left:702px;"></xui:place></xui:layout> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnYs" icon-class="icon-system-login" appearance="image-minimal">
   <xforms:label id="default1"><![CDATA[网上预审]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[mainActivity.btnYsClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSl" appearance="image-minimal" icon-class="icon-system-down">
   <xforms:label id="default3"><![CDATA[收件]]></xforms:label>
  <xforms:action id="action7" ev:event="DOMActivate"><xforms:script id="xformsScript7"><![CDATA[mainActivity.btnSlClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBysl" appearance="image-minimal" icon-class="icon-system-up">
   <xforms:label id="default4"><![CDATA[不予受理]]></xforms:label>
  <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[mainActivity.btnByslClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="gridMain" data="dsRec" onRowDblClick="mainActivity.gridMainRowDblClick"><xui:column id="gridColumn7" ref="fBizRecId" label=" 序号 " type="ro" width="72px" show-index="true" readonly="true" align="center"></xui:column><xui:column id="gridColumn2" ref="fYWLX" label="业务类型" type="ro" width="234px" readonly="true" align="center"></xui:column><xui:column id="gridColumn1" ref="fSerialNo" label="网上受理号" type="ro" width="134px" readonly="false"></xui:column>
  
  <xui:column id="gridColumn3" ref="fXMMC" label="项目名称" type="ro" width="229px" readonly="true"></xui:column>
  <xui:column id="gridColumn4" ref="fLWRQ" label="来文日期" type="ro" width="121px" readonly="true"></xui:column><xui:column id="gridColumn10" ref="fRemainDays" type="ro" width="100px" label="剩余天数"></xui:column>
  <xui:column id="gridColumn5" ref="fSQDW" label="申请单位" type="ro" width="174px" readonly="true"></xui:column>
  <xui:column id="gridColumn8" ref="fSFXYSW" label="是否需要实物" type="ro" width="100px"></xui:column>
  <xui:column id="gridColumn6" ref="fStatus" label="案卷状态" type="ro" width="100px"></xui:column>
  </xhtml:div>
  <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next" id="pagination1" data="dsRec"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger8" operation-owner="dsRec" operation="refresh" appearance="image-minimal">
   <xforms:label id="default11"><![CDATA[]]></xforms:label></xforms:trigger>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:label id="label1" style="position:absolute;left:25px;font-weight:bold;top:20px;" class="xui-label"><![CDATA[事项名称：]]></xhtml:label>
  <xui:place control="input1" id="controlPlace3" style="position:absolute;top:16px;left:107px;height:30px;width:497px;"></xui:place>
  <xhtml:label id="label2" class="xui-label" style="position:absolute;left:25px;position:absolute;font-weight:bold;top:108px;"><![CDATA[项目名称：]]></xhtml:label>
  <xui:place control="input2" id="controlPlace8" style="position:absolute;width:497px;height:30px;top:104px;left:107px;"></xui:place>
  <xhtml:label id="label3" class="xui-label" style="position:absolute;left:25px;position:absolute;position:absolute;font-weight:bold;top:152px;"><![CDATA[申请单位：]]></xhtml:label>
  <xui:place control="input3" id="controlPlace9" style="position:absolute;top:148px;height:30px;width:497px;left:107px;"></xui:place>
  <xhtml:label id="label4" class="xui-label" style="position:absolute;position:absolute;position:absolute;position:absolute;left:25px;font-weight:bold;top:196px;"><![CDATA[申请人：]]></xhtml:label>
  <xui:place control="input4" id="controlPlace10" style="position:absolute;top:192px;height:30px;width:182px;left:107px;"></xui:place>
  <xhtml:label id="label5" class="xui-label" style="position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;left:325px;font-weight:bold;top:196px;"><![CDATA[申请人手机：]]></xhtml:label>
  <xui:place control="input6" id="controlPlace13" style="position:absolute;left:422px;top:192px;height:30px;width:182px;"></xui:place>
  <xhtml:label id="label8" class="xui-label" style="position:absolute;left:25px;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;text-align:center;top:240px;font-weight:bold;"><![CDATA[来文日期：]]></xhtml:label>
  <xui:place control="input7" id="controlPlace14" style="position:absolute;height:30px;top:236px;left:107px;width:182px;"></xui:place><xhtml:label id="label9" class="xui-label" style="position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;left:25px;top:390px;font-weight:bold;"><![CDATA[办理条件：]]></xhtml:label>
  <xui:place control="textarea1" id="controlPlace12" style="position:absolute;top:280px;left:107px;width:497px;height:268px;"></xui:place>
  <xhtml:label id="label7" class="xui-label" style="position:absolute;position:absolute;left:25px;font-weight:bold;top:64px;"><![CDATA[业务类型：]]></xhtml:label>
  <xhtml:label id="label10" class="xui-label" style="position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;left:325px;text-align:center;top:240px;font-weight:bold;"><![CDATA[接收日期：]]></xhtml:label>
  <xui:place control="input8" id="controlPlace16" style="position:absolute;left:422px;height:30px;top:236px;width:182px;"></xui:place>
  <xui:place control="gridSelect1" id="controlPlace22" style="position:absolute;left:107px;top:60px;height:30px;width:497px;"></xui:place></layout>
  <xforms:input id="input1" ref="data('dsRec')/fYWLX" readonly="true"></xforms:input>
  <xforms:input id="input2" ref="data('dsRec')/fXMMC" readonly="true"></xforms:input>
  <xforms:input id="input3" ref="data('dsRec')/fSQDW" readonly="true"></xforms:input>
  <xforms:input id="input4" ref="data('dsRec')/fSQRXM" readonly="true"></xforms:input>
  <xforms:input id="input6" ref="data('dsRec')/fSQRSJ" readonly="true"></xforms:input>
  <xforms:textarea ref="data('dsRec')/fBLTJ" id="textarea1" readonly="true"></xforms:textarea>
  <xforms:input id="input7" ref="data('dsRec')/fLWRQ" readonly="true" disabled="true"></xforms:input>
  <xforms:input id="input8" ref="data('dsRec')/fJSSJ" readonly="true" disabled="true"></xforms:input>
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect1" ref="data('dsRec')/fProcessName" onDropdown="mainActivity.gridSelect1Dropdown" onCloseup="mainActivity.gridSelect1Closeup" label-ref="data('dsRec')/fProcessName">
   <xforms:label ref="fProcessName" id="default13"></xforms:label>
   <xforms:value ref="fProcessName" id="default14"></xforms:value>
   <xforms:itemset id="default15" data="dsBiz"><xforms:column ref="fProcessName" id="default19"></xforms:column></xforms:itemset></xhtml:div></xui:view>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnLook" appearance="image-minimal" icon-class="icon-system-up">
   <xforms:label id="default10"><![CDATA[查看上报信息]]></xforms:label>
  <xforms:action id="action6" ev:event="DOMActivate"><xforms:script id="xformsScript6"><![CDATA[mainActivity.btnLookClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dsFiles"><xui:column id="gridColumn16" type="ch" width="100px" align="center" ref="fFlag" label=" "></xui:column><xui:column id="gridColumn12" ref="fMName" label="文件类型" type="ed" width="236px"></xui:column><xui:column id="gridColumn11" ref="fFileName" label="文件名" type="ro" width="204px" onButtonClick="mainActivity.grid1_fFileNameButtonClick"></xui:column>
  
  <xui:column id="gridColumn13" ref="fYHXZ" label="用户选择" type="ed" width="100px"></xui:column>
  <xui:column id="gridColumn14" ref="fWJYQ" label="文件要求" type="ed" width="100px"></xui:column>
  <xui:column id="gridColumn15" ref="fDocIds" label="操作" type="html" width="151px" onRender="mainActivity.grid1_fDocIdsRender"></xui:column>
  </xhtml:div>
  <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="不予受理原因" width="600px" height="500px" modal="true" id="byslDlg" url="/UI/common/preBizRec/process/preBizRec/byslDialog.w" onSend="mainActivity.byslDlgSend" reload-on-open="true" onReceive="mainActivity.byslDlgReceive"></xhtml:div>
  <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner" id="browRunner"></xhtml:div>
  <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter1" filter-data="dsRec" filter-relations="fSerialNo,fYWLX,fXMMC,fSQDW" auto-refresh="true"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" operation-owner="dsRec" operation="refresh" class="button-blue" icon-class="icon-system-search" appearance="image-text">
   <xforms:label id="default2"><![CDATA[查询]]></xforms:label></xforms:trigger></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="mainActivity.js"></xhtml:script>
  <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"></xhtml:script>
  <xhtml:script id="htmlScript3" src="/UI/base/lib/butoneExUtils.js"></xhtml:script>
  <xhtml:script id="htmlScript4" src="/UI/system/service/doc/docUtil2.js"></xhtml:script></xui:resource> 
</xui:window>
