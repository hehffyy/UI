<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="top:199px;left:187px;height:auto;">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="dsRec" concept="B_SuperviseRec" order-by="fStatus asc,fRemainingDays asc,fCreateDate desc">
      <reader id="default6" action="/common/recSupervise/logic/action/querySuperViseRec"/>  
      <rule id="dataBizRule2" concept="B_SuperviseRec" readonly="true()"/>
    <writer id="default12" action="/common/recSupervise/logic/action/saveB_SuperviseRecAction"></writer>
  </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="dsStage" concept="B_SuperviseStage">
      <creator id="default3" action="/common/recSupervise/logic/action/createB_SuperviseStageAction"/>  
      <reader id="default4" action="/common/recSupervise/logic/action/queryB_SuperviseStageAction"/>  
      <writer id="default5" action="/common/recSupervise/logic/action/saveB_SuperviseStageAction"/>  
      <master id="master1" data="dsRec" relation="fDbID"/>  
      <rule id="dataBizRule1" concept="B_SuperviseStage" readonly="true()"/>
    </data>  
    <xforms:action id="action3" ev:event="onload">
      <xforms:script id="xformsScript3"><![CDATA[mngActivity.model1Load(event)]]></xforms:script>
    </xforms:action>
  </xforms:model>  
  <xui:view id="view11" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="41px" id="borderLayout-top1">
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar2" style="height:100%;width:100%;" separator-size="5">
            <xui:place control="trgSel" id="controlPlace2" style="width:120px;"/>  
            <xui:place control="cuiban" id="controlPlace17" style="width:70px;"></xui:place><xui:place control="trgLook" id="controlPlace7" style="width:91px;"/>  
            <xui:place control="trgBlgc" id="controlPlace8" style="width:91px;"/>  
            <xui:place control="trgAddStatge" id="controlPlace11" style="width:91px;"/>  
            <xui:place control="trgCg" id="controlPlace14" style="width:91px;"/>  
            <xui:place control="trgFinish" id="controlPlace9" style="width:91px;"/>
          </xhtml:div>
        </top>  
        <center id="borderLayout-center1">
          <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1"
            class="xui-tabPanel" style="height:100%;width:100%;"> 
            <xui:tab id="tabPage1"> 
              <xui:label id="xuiLabel1"><![CDATA[督办列表]]></xui:label>  
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                id="borderLayout2" style="width:100%; height: 100%;;"> 
                <center id="borderLayout-center2">
                  <xui:place control="grid2" id="controlPlace1" style="height:100%;width:100%;"/>
                </center>  
                <bottom size="45px" id="borderLayout-bottom1">
                  <xui:place control="pagination1" id="controlPlace5" style="height:100%;width:100%;"/>
                </bottom>
              <top size="40px" id="borderLayout-top2"><xui:place control="toolView" id="controlPlace19" style="height:100%;width:100%;"></xui:place></top></xhtml:div>
            </xui:tab>  
            <xui:tab id="tabPage2"> 
              <xui:label id="xuiLabel2"><![CDATA[督办阶段]]></xui:label>  
              <xui:place control="grid1" id="controlPlace4" style="height:100%;width:100%;"/>
            </xui:tab> 
          </xhtml:div>
        </center>
      </xhtml:div>  
      <xui:place control="recDlg" id="controlPlace6" style="position:absolute;left:146px;top:302px;"/>  
      <xui:place control="dlgChart" id="controlPlace10" style="position:absolute;top:362px;left:243px;"/>  
      <xui:place control="addStageDlg" id="controlPlace13" style="position:absolute;left:252px;top:448px;"/>  
      <xui:place control="cgDlg" id="controlPlace15" style="position:absolute;top:514px;left:227px;"/>  
      <xui:place control="orgDialog" id="controlPlace12" style="position:absolute;top:195px;left:60px;"/>
    <xui:place control="cuiBanDialog" id="controlPlace18" style="position:absolute;top:291px;left:361px;"></xui:place>
  <xui:place control="editRecDlg" id="controlPlace23" style="position:absolute;top:210px;left:405px;"></xui:place></xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgSel"
      icon-class="icon-system-plus" appearance="image-text" class="button-blue"> 
      <xforms:label id="default1"><![CDATA[选择督办案卷]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate">
        <xforms:script id="xformsScript1"><![CDATA[mngActivity.trgSelClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="100" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="dsStage">
      <xui:column id="gridColumn1" ref="fStage" label="阶段名称" type="ed" width="300px"/>  
      <xui:column id="gridColumn2" ref="fEndDate" label="截至日期" type="ed" width="150px"
        align="center"/>  
      <xui:column id="gridColumn10" ref="fStageStatus" type="ed" width="100px" label="阶段状态"
        align="center"/>
      <xui:column id="gridColumn3" ref="fBz" label="成果" type="txt"/> 
    </xhtml:div>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid2" data="dsRec" onRowDblClick="mngActivity.grid2RowDblClick">
      <xui:column id="gridColumn6" ref="FArchivesCode" label="办文号" type="ed" width="140px"/>
      <xui:column id="gridColumn4" ref="FInComeDocName" label="来文名称" type="ed" width="240px"/>  
      <xui:column id="gridColumn5" ref="FInComeDocOrg" label="来文单位" type="ed" width="240px"/>  
      <xui:column id="gridColumn12" ref="FMainDept" label="主办部门" type="ed" width="180px"/>
      <xui:column id="gridColumn7" ref="fDbr" label="督办人" type="ed" width="100px"
        align="center"/>
      <xui:column id="gridColumn11" ref="fStatusName" label="案卷状态" type="ed" width="100px"
        align="center"/>
      <xui:column id="gridColumn9" ref="fRemainingDays" label="剩余天数" type="ed" width="80px" sort-datatype="int"></xui:column><xui:column id="gridColumn13" ref="fLevel" label="优先级" type="ed" width="60px" sort-datatype="str"></xui:column><xui:column id="gridColumn8" ref="fStatus" label="督办状态" type="ed" width="100px"
        align="center" sort-datatype="str"/> 
    <xui:column id="gridColumn14" ref="duBanJinDou" type="ed" width="100px" label="督办阶段情况" align="center"></xui:column></xhtml:div>  
    <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next"
      id="pagination1" data="dsRec" align="centered"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="案卷选择" width="1000px" height="500px" modal="true" id="recDlg" url="/UI/common/recSupervise/process/recSupervise/recSelDlg.w"
      onReceive="mngActivity.recDlgReceive"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgLook"
      icon-class="icon-system-eye" appearance="image-text" class="button-blue"> 
      <xforms:label id="default7"><![CDATA[查看案卷]]></xforms:label>  
      <xforms:action id="action6" ev:event="DOMActivate">
        <xforms:script id="xformsScript6"><![CDATA[mngActivity.trgLookClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgBlgc"
      icon-class="icon-system-flow-tree" appearance="image-text" class="button-blue"> 
      <xforms:label id="default8"><![CDATA[办理过程]]></xforms:label>  
      <xforms:action id="action7" ev:event="DOMActivate">
        <xforms:script id="xformsScript7"><![CDATA[mngActivity.trgBlgcClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="办理过程" width="396px" height="264px" modal="true" id="dlgChart" url="/UI/SA_X/task/taskCenter/banLiGuoCheng.w"
      status="maximize"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgAddStatge"
      icon-class="icon-system-edit-alt" appearance="image-text" class="button-blue"> 
      <xforms:label id="default9"><![CDATA[编辑阶段]]></xforms:label>  
      <xforms:action id="action4" ev:event="DOMActivate">
        <xforms:script id="xformsScript4"><![CDATA[mngActivity.trgAddStatgeClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="督办阶段" width="600px" height="400px" modal="true" id="addStageDlg" url="/UI/common/recSupervise/process/recSupervise/addStageDlg.w"
      onReceive="mngActivity.addStageDlgReceive" reload-on-open="true" status="minimize"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgCg"
      icon-class="icon-system-pencil" appearance="image-text" class="button-blue"> 
      <xforms:label id="default11"><![CDATA[阶段成果]]></xforms:label>  
      <xforms:action id="action8" ev:event="DOMActivate">
        <xforms:script id="xformsScript8"><![CDATA[mngActivity.trgCgClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="阶段成果" width="800px" height="500px" modal="true" id="cgDlg" url="/UI/common/recSupervise/process/recSupervise/editStageDlg.w"
      onReceive="mngActivity.cgDlgReceive" reload-on-open="true" status="minimize"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgFinish"
      icon-class="icon-system-ok" appearance="image-text" class="button-green"> 
      <xforms:label id="default10"><![CDATA[督办完成]]></xforms:label>  
      <xforms:action id="action9" ev:event="DOMActivate">
        <xforms:script id="xformsScript9"><![CDATA[mngActivity.trgFinishClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title="人员选择"
        width="500px" height="450px" modal="true" id="orgDialog" multi-select="false"
        org-kinds="psm" root-filter="SA_OPOrg.sParent = :currentDeptID()"
        show-common-group="false" filter="SA_OPOrg.sOrgKindID &lt;&gt; 'pos' and instr(SA_OPOrg.sFID,'.pos/') = 0"
        onReceive="mngActivity.orgDialogReceive" status="minimize" onSend="" minmaxable="false" resizable="false"/>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cuiban" icon-class="icon-system-play" appearance="image-text" class="button-blue">
   <xforms:label id="default14"><![CDATA[催办]]></xforms:label>
   <xforms:action id="action11" ev:event="DOMActivate"><xforms:script id="xformsScript11"><![CDATA[mngActivity.cuibanClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="案卷催办" width="530px" height="400px" modal="true" id="cuiBanDialog" url="/UI/common/recSupervise/process/recSupervise/cuiBanDlg.w" onReceive="mngActivity.cuiBanDialogReceive" reload-on-open="true" status="minimize"></xhtml:div>
  <xui:view auto-load="true" id="toolView" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xui:place control="smartFilter1" id="controlPlace20" style="position:absolute;height:30px;top:5px;width:250px;left:540px;"></xui:place>
  <xui:place control="gridFilter1" id="controlPlace21" style="position:absolute;top:5px;height:30px;width:80px;left:340px;"></xui:place>
  <xui:place control="select_trg" id="controlPlace22" style="position:absolute;top:7px;left:800px;"></xui:place>
  <xui:place control="updateDBR" id="controlPlace16" style="position:absolute;width:90px;left:5px;top:7px;"></xui:place>
  <xui:place control="edit_trg" id="controlPlace24" style="position:absolute;top:7px;left:103px;width:70px;"></xui:place><xui:place control="trgDel" id="controlPlace3" style="position:absolute;width:90px;top:7px;left:180px;"></xui:place>
  <xui:place control="gridFilter2" id="controlPlace25" style="top:5px;height:30px;position:absolute;left:430px;width:100px;"></xui:place></layout>
  <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter1" filter-data="dsRec" filter-relations="FInComeDocName,FInComeDocOrg,FArchivesCode,FMainDept" auto-refresh="true"></xhtml:div>
  <xhtml:div component="/UI/system/components/filter.xbl.xml#gridFilter" all-selected-label="'全部'" id="gridFilter1" filter-data="dsRec" filter-relation="fLevel" multi-select="true" default-label="'优先级'">
   <xforms:label ref="name" id="default15"></xforms:label>
   <xforms:value ref="name" id="default16"></xforms:value>
   <xforms:itemset id="default17"><itemset-data xmlns="" id="default18">
   <rows xmlns="" id="default19">
    <row id="default20">
     <cell id="default21">一级</cell></row> 
    <row id="default22">
     <cell id="default23">二级</cell></row> 
    <row id="default24">
     <cell id="default25">三级</cell></row> </rows> </itemset-data>
  <xforms:column ref="name" id="default26"></xforms:column></xforms:itemset></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="select_trg" operation-owner="dsRec" operation="refresh" appearance="image-text" class="button-green" icon-class="icon-system-search">
   <xforms:label id="default27"><![CDATA[查询]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="updateDBR" icon-class="icon-system-users" appearance="image-text" class="button-green">
   <xforms:label id="default13">修改督办人</xforms:label>
   <xforms:action id="action10" ev:event="DOMActivate">
    <xforms:script id="xformsScript10">mngActivity.updateDBRClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="edit_trg" appearance="image-text" class="button-blue" icon-class="icon-system-edit-alt">
   <xforms:label id="default29"><![CDATA[编辑]]></xforms:label>
  <xforms:action id="action12" ev:event="DOMActivate"><xforms:script id="xformsScript12"><![CDATA[mngActivity.edit_trgClick(event)]]></xforms:script></xforms:action></xforms:trigger><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgDel" icon-class="icon-system-trash" appearance="image-text" class="button-orange">
   <xforms:label id="default2">删除督办</xforms:label>
   <xforms:action id="action2" ev:event="DOMActivate">
    <xforms:script id="xformsScript2">mngActivity.trgDelClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xhtml:div component="/UI/system/components/filter.xbl.xml#gridFilter" all-selected-label="'全部'" id="gridFilter2" filter-data="dsRec" filter-relation="fStatus" multi-select="false" default-label="'处理中'" default-value="'处理中'">
   <xforms:label ref="name" id="default39"></xforms:label>
   <xforms:value ref="name" id="default37"></xforms:value>
   <xforms:itemset id="default35">
     
    <xforms:column ref="name" id="default33"></xforms:column>
  <itemset-data xmlns="" id="default42">
   <rows xmlns="" id="default43">
    <row id="default44">
     <cell id="default45">处理中</cell></row> 
    <row id="default46">
     <cell id="default47">已完成</cell></row> </rows> </itemset-data></xforms:itemset> </xhtml:div></xui:view>
  <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="编辑督办信息" width="500px" height="250px" modal="true" id="editRecDlg" url="/UI/common/recSupervise/process/recSupervise/editRecDlg.w" reload-on-open="true" status="minimize" resizable="false" minmaxable="false" onReceive="mngActivity.editRecDlgReceive"></xhtml:div></xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="mngActivity.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"/>
  </xui:resource> 
</xui:window>
