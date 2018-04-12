<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;top:219px;left:200px;">
    <data auto-load="false" component="/UI/system/components/data.xbl.xml#bizData"
      concept="B_Material" data-type="json" direct-delete="true" id="dataMain" limit="-1"
      offset="0" update-mode="whereAll" is-tree="false" store-type="grid" confirm-delete="true"
      confirm-refresh="true" onRefreshCreateParam="materialManager.dataMainRefreshCreateParam"
      onDataChanged="materialManager.dataMainDataChanged" onAfterRefresh="materialManager.dataMainIndexChanged" order-by="fDispOrder"> 
      <reader action="/base/core/material/logic/action/getNeedMaterialsAction"
        id="default2"/>  
      <tree-option id="default4" parent-relation=" "/>  
      <creator id="default8"/>  
      <writer id="default9" action="base/core/material/logic/action/saveB_MaterialAllAction"/>  
      <rule id="dataBizRule3" relation="fMaterialName"/> 
    <rule id="dataBizRule5" relation="fMtNums" required="true()" calculate="if(data('dataMain')/fMtNums='',0,data('dataMain')/fMtNums)"></rule></data>  
    <xforms:action id="action1" ev:event="onload">
      <xforms:script id="xformsScript1"><![CDATA[materialManager.model1Load(event)]]></xforms:script>
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="suppleData" concept="B_Material" onAfterNew="materialManager.suppleDataAfterNew"
      onValueChanged="materialManager.suppleDataValueChanged" onIndexChanged="materialManager.suppleDataValueChanged"
      onAfterRefresh="materialManager.suppleDataValueChanged" onNewCreateParam="materialManager.suppleDataNewCreateParam" limit="-1">
      <reader id="default3" action="/base/core/material/logic/action/queryB_AddMaterialAction"/>  
      <writer id="default10" action="/base/core/material/logic/action/saveB_MaterialAction"/>  
      <creator id="default11" action="/base/core/material/logic/action/createB_MaterialAction"/>  
      <rule id="dataBizRule2" relation="fphysical" calculate="'否'"/>  
      <rule id="dataBizRule4" relation="fMaterialType" calculate="'补充材料'"/>  
      <rule id="dataBizRule1" relation="fOriginalRequired" default-value="'否'"/>
    </data>  
    <xforms:action id="action2" ev:event="onunload">
      <xforms:script id="xformsScript2"><![CDATA[materialManager.model1UnLoad(event)]]></xforms:script>
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="userProcessData" concept="B_UserProcess" order-by="fDispOrder asc" limit="-1" onRefreshCreateParam="materialManager.userProcessDataRefreshCreateParam">
   <reader id="default16" action="/base/core/material/logic/action/queryB_UserProcessAction"></reader>
   <writer id="default17" action="/base/core/material/logic/action/saveB_UserProcessAction"></writer>
   <creator id="default15" action="/base/core/material/logic/action/createB_UserProcessAction"></creator>
   <calculate-relation relation="calculate0" id="calculate-relation1"></calculate-relation></data>
  <data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="fid,fname" src="" id="commonData" auto-load="true" store-type="simple" onValueChanging="materialManager.commonDataValueChanging"><rows xmlns="" id="default48">
   <row id="default49">
    <cell id="default50"></cell></row> </rows></data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;" id="rootLayout">
      <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1"
        class="xui-tabPanel" style="width:100%;top:50px;height:100%;"> 
        <xui:tab id="tabPage1"> 
          <xui:label id="xuiLabel1"><![CDATA[必要材料]]></xui:label>  
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="50%" mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;"
            has-drag-bar="true" has-arrow-button="true"> 
            <xhtml:div region="left" id="div3"> 
                <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                id="buttonBar4" style="width:100%;" separator="true" class="xui-no-border" separator-size="10">
              <xui:place control="trigger2" id="controlPlace4" style="width:46px;"></xui:place>
  <xui:place control="trigger3" id="controlPlace5" style="width:86px;"></xui:place>
  <xui:place control="btnCamara" id="controlPlace6" style="width:60px;"></xui:place>
  <xui:place control="gridSelect2" id="controlPlace13"></xui:place>
  <xui:place control="userMaterialID" id="controlPlace8" style="width:50px;"></xui:place>
  </xhtml:div>
              
              <xui:place control="grid1" id="controlPlace11" style="width:100%;height:91%;"/>
            </xhtml:div>  
            <xhtml:div region="right" id="div4">
              <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
                fix-size="50%" mode="vert" id="VSplitter2" class="xui-splitter" style="height:100%;width:100%;"
                has-drag-bar="false"> 
                <xhtml:div region="top" id="div5">
                  <xui:place control="attachEditor_BYCL" id="controlPlace12" style="height:100%;width:100%;"/>
                </xhtml:div>  
                <xhtml:div region="bottom" id="div6"/>
              </xhtml:div>
            </xhtml:div>
          </xhtml:div> 
        </xui:tab>  
        <xui:tab id="tabPage2" xforms-select="materialManager.tabPage2Select"> 
          <xui:label id="xuiLabel2"><![CDATA[补充材料]]></xui:label>  
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="50%" mode="horz" id="HSplitter3" class="xui-splitter" style="height:100%;width:100%;"
            has-drag-bar="true" has-arrow-button="true"> 
            <xhtml:div region="left" id="div7"> 
              <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                id="buttonBar3">
                <xui:place control="trigger11" id="controlPlace18"/>  
                <xui:place control="trigger12" id="controlPlace19"/>  
                <xui:place control="trigger13" id="controlPlace20"/>  
                <xui:place control="trigger14" id="controlPlace21"/>
              <xui:place control="btnScan" id="controlPlace2" style="width:89px;"></xui:place></xhtml:div>
              <xui:place control="grid3" id="controlPlace17" style="height:90%;width:100%;"/>
            </xhtml:div>  
            <xhtml:div region="right" id="div8">
              <xui:place control="attachEditor_BCCL" id="controlPlace22" style="height:100%;width:100%;"/>
            </xhtml:div>
          </xhtml:div>
        </xui:tab> 
      </xhtml:div>  
      <xui:place control="windowReceiver1" id="controlPlace1" style="position:absolute;left:132px;top:165px;"/>
    <xui:place control="systemRunner" id="controlPlace3" style="position:absolute;left:176px;top:451px;"></xui:place>
  <xui:place control="userMaterialDialog" id="controlPlace9" style="position:absolute;left:371px;top:169px;"></xui:place></xui:layout>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="dataMain" multi-selection="true" class="grid-compact" onRowClick="materialManager.grid1RowClick">
      <xui:column id="gridColumn12" ref="choice" label="#master_checkbox" type="ch" width="52px" align="center" enter-selected="false"></xui:column><xui:column id="gridColumn10" ref="fMaterialId" label="材料ID" type="ed"
        width="66px" visible="false"/>
      <xui:column id="gridColumn3" ref="fDispOrder" label="顺序" type="ed" width="48px" visible="true" readonly="true" show-index="true"></xui:column><xui:column id="gridColumn1" ref="fMaterialName" label="材料名称" type="html" width="*" onRender="materialManager.grid1_fMaterialNameRender"/>  
      <xui:column id="gridColumn7" ref="fOriginalRequired" label="材料属性" type="ed" width="80px"
        readonly="false" align="center" checked-value="是" unchecked-value="否"></xui:column>  
      <xui:column id="gridColumn8" ref="fMtNums" label="份数" type="ed" width="51px"
        readonly="false" align="center" input-regex="^[0-9]*[1-9][0-9]*$"/> 
    <xui:column id="gridColumn11" ref="fIsDefSelect" label="默认" type="ed" width="37px" align="center" checked-value="1" unchecked-value="0" readonly="true"></xui:column>
  </xhtml:div>  
    <xhtml:div component="/UI/system/components/attachmentEditor2.xbl.xml#attachmentEditor2"
      display-buttons="edit:false;history:false;template:false;delete:false;download:true;upload:false;"
      limit="-1" runtime="html4" id="attachEditor_BYCL" class="xui-attachmentEditor2"
      ref="data('dataMain')/fDocIds" onLoadData="materialManager.attachEditor_BYCLLoadData"
      onUploadClick="materialManager.attachEditor_BYCLUploadClick" keyId="attachEditor_BYCL" onUploadCompleted="materialManager.attachEditor_BYCLUploadCompleted" auto-load="false"/>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid3" data="suppleData">
      <xui:column id="gridColumn5" ref="fMaterialName" label="材料名称" type="ed" width="500px"/>  
      <xui:column id="gridColumn2" ref="fOriginalRequired" label="材料属性" type="ed"
        width="80px" checked-value="是" unchecked-value="否" align="center">
        </xui:column>  
      <xui:column id="gridColumn9" ref="fMtNums" label="份数" type="ed" width="55px" input-regex="^[0-9]*[1-9][0-9]*$"/>
    </xhtml:div>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger11"
      operation-owner="suppleData" operation="new" appearance="image-minimal"> 
      <xforms:label id="default18"><![CDATA[]]></xforms:label>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger12"
      operation-owner="suppleData" operation="save" appearance="image-minimal"> 
      <xforms:label id="default19"><![CDATA[]]></xforms:label>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger13"
      operation-owner="suppleData" operation="delete" appearance="image-minimal"> 
      <xforms:label id="default20"><![CDATA[]]></xforms:label>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger14"
      operation-owner="suppleData" operation="refresh" appearance="image-minimal"> 
      <xforms:label id="default21"><![CDATA[]]></xforms:label>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/attachmentEditor2.xbl.xml#attachmentEditor2"
      display-buttons="upload:false;delete:false;download:true;template:false;history:true;edit:false;"
      limit="-1" runtime="html4" id="attachEditor_BCCL" class="xui-attachmentEditor2"
      ref="data('suppleData')/fDocIds" auto-load="false" onUploadClick="materialManager.attachEditor_BCCLUploadClick" onUploadCompleted="materialManager.attachEditor_BCCLUploadCompleted" autoCreateVersion="false"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1"/> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" class="button-blue">
   <xforms:label id="default34"><![CDATA[保存]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[materialManager.trigger2Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" class="button-blue" icon-class="icon-system-camera" appearance="image-text">
   <xforms:label id="default5">扫描上传</xforms:label>
   <xforms:action id="action5" ev:event="DOMActivate">
    <xforms:script id="xformsScript5">materialManager.btnScanClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnScan" class="button-blue" icon-class="icon-system-camera" appearance="image-text">
   <xforms:label id="default1">扫描上传</xforms:label>
   <xforms:action id="action4" ev:event="DOMActivate">
    <xforms:script id="xformsScript4">materialManager.btnScanClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner" id="systemRunner" url="/UI/base/system/scan/gpyForm.w" title="高拍仪" onSend="materialManager.systemRunnerSend" onReceive="materialManager.systemRunnerReceive"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCamara" class="button-blue" icon-class="icon-system-camera" appearance="image-text">
   <xforms:label id="default6"><![CDATA[拍照]]></xforms:label>
   <xforms:action id="action7" ev:event="DOMActivate"><xforms:script id="xformsScript7"><![CDATA[materialManager.btnCamaraClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="自定义材料" width="800px" height="600px" modal="true" id="userMaterialDialog" url="/UI/base/core/components/materialUser/userMaterial.w" onReceive="materialManager.userMaterialDialogReceive" status="maximize" onClose="materialManager.userMaterialDialogClose"></xhtml:div>
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect2" ref="data('commonData')/fid" onCloseup="materialManager.gridSelect2Closeup" label-ref="data('commonData')/fname">
   <xforms:label ref="fBusinessName" id="default38"></xforms:label>
   <xforms:value ref="fID" id="default39"></xforms:value>
   <xforms:itemset id="default40" data="userProcessData" auto-load-data="true">
  
  
  <xforms:column ref="fBusinessName" id="default51"></xforms:column>
  <xforms:column ref="fID" visible="false" id="default52"></xforms:column></xforms:itemset></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="userMaterialID" appearance="image-text" icon-class="icon-system-pencil" class="button-blue">
   <xforms:label id="default12">编辑</xforms:label>
   <xforms:action id="action6" ev:event="DOMActivate">
    <xforms:script id="xformsScript6">materialManager.userMaterialIDClick(event)</xforms:script></xforms:action> </xforms:trigger>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="materialManager.js"/>
  <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"></xhtml:script>
  <xhtml:script id="htmlScript3" src="/UI/base/lib/butoneExUtils.js"></xhtml:script>
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="materialManager.css"></xhtml:link></xui:resource> 
</xui:window>
