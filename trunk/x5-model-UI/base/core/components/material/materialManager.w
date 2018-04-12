<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:198px;top:220px;"> 
    <data auto-load="true" component="/UI/system/components/data.xbl.xml#bizData"
      concept="B_Material" data-type="json" direct-delete="true" id="dataMain" limit="-1"
      offset="0" update-mode="whereAll" is-tree="false" store-type="grid" confirm-delete="true"
      confirm-refresh="true" onRefreshCreateParam="materialManager.dataMainRefreshCreateParam"
      onDataChanged="materialManager.dataMainDataChanged" order-by="fDispOrder" onIndexChanged="materialManager.dataMainIndexChanged" onAfterRefresh="materialManager.dataMainAfterRefresh" onSaveCommit="materialManager.dataMainSaveCommit"> 
      <reader action="/base/core/material/logic/action/getNeedMaterialsAction"
        id="default2"/>  
      <creator id="default8"/>  
      <writer id="default9" action="base/core/material/logic/action/saveB_MaterialAllAction"/>  
      <rule id="dataBizRule3" relation="fMaterialName"/>  
      <rule id="dataBizRule5" relation="fMtNums" required="true()" calculate="if(data('dataMain')/fMtNums='',0,data('dataMain')/fMtNums)"/>  
      <calculate-relation relation="smjg" id="calculate-relation1"></calculate-relation></data>  
    <xforms:action id="action1" ev:event="onload"> 
      <xforms:script id="xformsScript1"><![CDATA[materialManager.model1Load(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="suppleData" concept="B_Material" onAfterNew="materialManager.suppleDataAfterNew"
      onValueChanged="materialManager.suppleDataValueChanged" onIndexChanged="materialManager.suppleDataValueChanged"
      onAfterRefresh="materialManager.suppleDataValueChanged" onNewCreateParam="materialManager.suppleDataNewCreateParam"
      limit="-1"> 
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
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;" id="rootLayout"> 
      <xui:place control="windowReceiver1" id="controlPlace1" style="position:absolute;top:164px;left:126px;"/>  
      <xui:place control="systemRunner" id="controlPlace3" style="position:absolute;top:449px;left:173px;"/>  
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout2" style="width:100%; height: 100%;;"> 
            <top size="30px" id="borderLayout-top2"/>  
            <center id="borderLayout-center2"> 
              <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabMaterial"
                class="xui-tabPanel" style="height:100%;width:100%;;"> 
                <xui:tab id="tabBY"> 
                  <xui:label id="xuiLabel3"><![CDATA[上传文件[必要材料]]]></xui:label>  
                  <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
                    fix-size="100%" mode="vert" id="VSplitter2" class="xui-splitter"
                    has-drag-bar="false" style="height:100%;width:100%;;"> 
                    <xhtml:div region="top" id="div5"> 
                      <xui:place control="attachEditor_BYCL" id="controlPlace12"
                        style="height:100%;width:100%;"/> 
                    </xhtml:div>  
                    <xhtml:div region="bottom" id="div6"/> 
                  </xhtml:div> 
                </xui:tab>  
                <xui:tab id="tabBC" visable="false"> 
                  <xui:label id="xuiLabel6"><![CDATA[上传文件[补充材料]]]></xui:label>  
                  <xui:place control="attachEditor_BCCL" id="controlPlace22" style="height:100%;width:100%;"/> 
                </xui:tab>  
                <xui:tab id="tabGpy" xforms-select="materialManager.tabPage4Select"> 
                  <xui:label id="xuiLabel4">高拍仪</xui:label>  
                  <xui:place control="wfGpy" id="controlPlace6" style="height:100%;width:100%;"/> 
                </xui:tab> 
              </xhtml:div> 
            </center> 
          </xhtml:div> 
        </center>  
        <left size="600px" id="borderLayout-left1"> 
          <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1"
            class="xui-tabPanel" style="width:100%;top:50px;height:100%;;;"> 
            <xui:tab id="tabPage1" xforms-select="materialManager.tabPage1Select"> 
              <xui:label id="xuiLabel1">必要材料</xui:label>  
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout3" style="width:100%; height: 100%;;">
   <top size="40px" id="borderLayout-top1"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar4" separator="true" class="xui-no-border" style="width:100%;;;">
   <xui:place control="trigger2" id="controlPlace4" style="width:73px;"></xui:place>
   <xui:place control="btnUploadAll" id="controlPlace2" style="width:86px;"></xui:place>
   <xui:place control="btnCap" id="controlPlace5" style="width:73px;"></xui:place></xhtml:div></top>
   <center id="borderLayout-center3"><xui:place control="grid1" id="controlPlace11" style="width:100%;height:100%;"></xui:place></center></xhtml:div></xui:tab>  
            <xui:tab id="tabPage2" xforms-select="materialManager.tabPage2Select"> 
              <xui:label id="xuiLabel2">补充材料</xui:label>  
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout4" style="width:100%; height: 100%;;">
   <top size="40px" id="borderLayout-top3"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar3">
   <xui:place control="trigger11" id="controlPlace18"></xui:place>
   <xui:place control="trigger12" id="controlPlace19"></xui:place>
   <xui:place control="trigger13" id="controlPlace20"></xui:place>
   <xui:place control="trigger14" id="controlPlace21"></xui:place>
   <xui:place control="trigger1" id="controlPlace7" style="width:73px;"></xui:place></xhtml:div></top>
   <center id="borderLayout-center4"><xui:place control="grid3" id="controlPlace17" style="width:100%;height:100%;"></xui:place></center></xhtml:div></xui:tab> 
          </xhtml:div> 
        </left> 
      </xhtml:div> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1"/>  
    <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner"
      id="systemRunner" url="/UI/base/system/scan/gpyForm.w" title="高拍仪" onSend="materialManager.systemRunnerSend"
      onReceive="materialManager.systemRunnerReceive"/>  
    <xhtml:div component="/UI/system/components/attachmentEditor2.xbl.xml#attachmentEditor2"
      display-buttons="edit:false;history:false;template:false;delete:false;download:true;upload:false;"
      limit="-1" runtime="html4" id="attachEditor_BYCL" class="xui-attachmentEditor2"
      ref="data('dataMain')/fDocIds" onLoadData="materialManager.attachEditor_BYCLLoadData"
      onUploadClick="materialManager.attachEditor_BYCLUploadClick" keyId="attachEditor_BYCL"
      onUploadCompleted="materialManager.attachEditor_BYCLUploadCompleted"/>  
    <xhtml:div component="/UI/system/components/windowFrame.xbl.xml#windowFrame"
      id="wfGpy" url="/UI/base/system/scan/gpyFrame.w" auto-load="false" onReceive="materialManager.wfGpyReceive" onSend="materialManager.wfGpySend"/>  
    <xhtml:div component="/UI/system/components/attachmentEditor2.xbl.xml#attachmentEditor2"
      display-buttons="upload:false;delete:false;download:true;template:false;history:true;edit:false;"
      limit="-1" runtime="html4" id="attachEditor_BCCL" class="xui-attachmentEditor2"
      ref="data('suppleData')/fDocIds" auto-load="false" onUploadClick="materialManager.attachEditor_BCCLUploadClick"
      onUploadCompleted="materialManager.attachEditor_BCCLUploadCompleted" autoCreateVersion="false"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" class="button-blue" icon-class="icon-system-ok" appearance="image-text">
   <xforms:label id="default34">保存</xforms:label>
   <xforms:action id="action3" ev:event="DOMActivate">
    <xforms:script id="xformsScript3">materialManager.trigger2Click(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnUploadAll" appearance="image-text" class="button-blue" icon-class="icon-system-angle-double-down">
   <xforms:label id="default1">一键上传</xforms:label>
   <xforms:action id="action4" ev:event="DOMActivate">
    <xforms:script id="xformsScript4">materialManager.btnUploadAllClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCap" class="button-blue" icon-class="icon-system-camera" appearance="image-text">
   <xforms:label id="default5">拍照</xforms:label>
   <xforms:action id="action6" ev:event="DOMActivate">
    <xforms:script id="xformsScript6">materialManager.btnCapClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dataMain" multi-selection="true" class="grid-compact">
   <xui:column id="gridColumn12" ref="choice" label="#master_checkbox" type="ch" width="52px" align="center" enter-selected="false"></xui:column>
   <xui:column id="gridColumn10" ref="fMaterialId" label="材料ID" type="ed" width="66px" visible="false"></xui:column>
   <xui:column id="gridColumn3" ref="fDispOrder" label="顺序" type="html" width="48px" visible="true" readonly="true" show-index="true" onRender="materialManager.grid1_fDispOrderRender"></xui:column>
   <xui:column id="gridColumn1" ref="fMaterialName" label="材料名称" type="html" width="*" onRender="materialManager.grid1_fMaterialNameRender"></xui:column>
   <xui:column id="gridColumn7" ref="fOriginalRequired" label="原件" type="ch" width="40px" readonly="false" align="center" checked-value="是" unchecked-value="否"></xui:column>
   <xui:column id="gridColumn8" ref="fMtNums" label="份数" type="ed" width="51px" readonly="false" align="center" input-regex="^[0-9]*[1-9][0-9]*$"></xui:column>
   <xui:column id="gridColumn11" ref="fIsDefSelect" label="默认" type="ed" width="37px" align="center" checked-value="1" unchecked-value="0" readonly="true"></xui:column>
   <xui:column id="gridColumn4" ref="smjg" label="扫描结果" type="html" width="100px" onRender="materialManager.grid1_smjgRender"></xui:column></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger11" operation-owner="suppleData" operation="new" appearance="image-minimal">
   <xforms:label id="default18"></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger12" operation-owner="suppleData" operation="save" appearance="image-minimal">
   <xforms:label id="default19"></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger13" operation-owner="suppleData" operation="delete" appearance="image-minimal">
   <xforms:label id="default20"></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger14" operation-owner="suppleData" operation="refresh" appearance="image-minimal">
   <xforms:label id="default21"></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" class="button-blue" icon-class="icon-system-camera" appearance="image-text">
   <xforms:label id="default6">拍照</xforms:label>
   <xforms:action id="action5" ev:event="DOMActivate">
    <xforms:script id="xformsScript5">materialManager.btnCapClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid3" data="suppleData">
   <xui:column id="gridColumn5" ref="fMaterialName" label="材料名称" type="ed" width="*"></xui:column>
   <xui:column id="gridColumn2" ref="fOriginalRequired" label="原件" type="ch" width="52px" checked-value="是" unchecked-value="否" align="center"></xui:column>
   <xui:column id="gridColumn9" ref="fMtNums" label="份数" type="ed" width="55px" input-regex="^[0-9]*[1-9][0-9]*$"></xui:column></xhtml:div></xui:view>  
  <xui:resource id="resource1"> 
  	<xhtml:style><![CDATA[.link {color: blue;text-decoration: underline;cursor: pointer}]]></xhtml:style>
    <xhtml:script id="htmlScript1" src="materialManager.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"/>
  </xui:resource> 
</xui:window>
