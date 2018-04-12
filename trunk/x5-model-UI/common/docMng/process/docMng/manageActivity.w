<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:363px;top:258px;">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="docFolder" concept="B_DocFolder" limit="-1"
      is-tree="true" onIndexChanged="manageActivity.docFolderIndexChanged" onAfterRefresh="manageActivity.docFolderAfterRefresh">
      <creator id="default3" action="/common/docMng/logic/action/createB_DocFolderAction"/>  
      <reader id="default4" action="/common/docMng/logic/action/queryB_DocFolderByLimitAction"/>  
      <writer id="default5" action="/common/docMng/logic/action/saveB_DocFolderAction"/>  
      <tree-option id="default6" parent-relation="fParentID"/>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="docFile" concept="B_DocFile">
      <creator id="default1" action="/common/docMng/logic/action/createB_DocFileAction"/>  
      <reader id="default2" action="/common/docMng/logic/action/queryB_DocFileAction"/>  
      <writer id="default7" action="/common/docMng/logic/action/saveB_DocFileAction"/>  
      <master id="master1" data="docFolder" relation="fFolderID"/>  
      <rule id="dataBizRule1" concept="B_DocFile" readonly="data('authControl')/fileAuth=0"/>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="docAuth" concept="B_DocAuth" limit="-1"
      store-type="simple">
      <creator id="default11" action="/common/docMng/logic/action/createB_DocAuthAction"/>  
      <reader id="default12" action="/common/docMng/logic/action/queryB_DocAuthAction"/>  
      <writer id="default13" action="/common/docMng/logic/action/saveB_DocAuthAction"/>
    </data>  
    <data id="newAuthMenuItems" auto-load="true" store-type="simple" columns="label,value"
      component="/UI/system/components/data.xbl.xml#data"> 
      <rows xmlns="" id="default15">  
        <row id="default16"> 
          <cell id="default17">部门</cell>  
          <cell id="default18">org</cell>
        </row>  
        <row id="default19"> 
          <cell id="default20">人员</cell>  
          <cell id="default21">person</cell>
        </row> 
      </rows> 
    </data>
  <data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="fileAuth,dirAuth,cldDirAuth" src="" auto-load="false" id="authControl" store-type="simple"><rule id="dataRule1" column="fileAuth" type="xsd:integer" readonly="data('authControl')/fileAuth=0"></rule>
  <rule id="dataRule2" column="dirAuth" type="xsd:integer" readonly="data('authControl')/dirAuth=0"></rule>
  <rule id="dataRule3" column="cldDirAuth" type="xsd:integer" readonly="data('authControl')/cldDirAuth=0"></rule></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="280"
        mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;"
        has-drag-bar="true" has-arrow-button="true"> 
        <xhtml:div region="left" id="div1">
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout1" style="width:100%; height: 100%;;"> 
            <top size="38px" id="borderLayout-top1">
              <xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></top>  
            <center id="borderLayout-center1">
              <xui:place control="docNodeTreeGrid" id="controlPlace5" style="width:100%; height:100%;border:0px;"/>
            </center>
          </xhtml:div>
        </xhtml:div>  
        <xhtml:div region="right" id="div2">
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout2" style="width:100%; height: 100%;;"> 
            <top size="38px" id="borderLayout-top2">
              <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                id="buttonBar2" style="width:604px;height:33px;"> 
                <xui:place control="btnNewFile" id="controlPlace4" style="width:87px;"/>  
                <xui:place control="btnDelFile" id="controlPlace10" style="width:87px;"/>
              <xui:place control="trigger1" id="controlPlace13" style="width:87px;"></xui:place></xhtml:div>
            </top>  
            <center id="borderLayout-center2">
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout3" style="width:100%; height: 100%;;">
   <center id="borderLayout-center3"><xui:place control="grid1" id="controlPlace2" style="height:100%;width:100%;"></xui:place></center>
  <bottom size="40px" id="borderLayout-bottom2"><xui:place control="pagination1" id="controlPlace8"></xui:place></bottom></xhtml:div></center>  
            <bottom size="120px" id="borderLayout-bottom1">
              <xui:place control="attachmentEditor21" id="controlPlace12" style="height:100%;width:100%;"></xui:place></bottom>
          </xhtml:div>
        </xhtml:div>
      </xhtml:div>  
      <xui:place control="folderDlg" id="controlPlace7" style="position:absolute;top:205px;left:92px;"/>  
      <xui:place control="uploadDlg" id="controlPlace3" style="position:absolute;left:304px;top:97px;"/>  
      <xui:place control="authDlg" id="controlPlace11" style="position:absolute;top:436px;left:133px;"/>
    </xui:layout>  
    <xhtml:div data="docFolder" id="docNodeTreeGrid" appearance="tree" component="/UI/system/components/grid.xbl.xml#grid"
      class="ui-light" space-column="false" edit-mode="true"> 
      <column label="名称" ref="fFolderName" type="tree" readonly="true" sort-datatype="str"
        width="*" id="gridColumn1"/>
    </xhtml:div>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnNewFile"
      appearance="image-text" class="button-blue" operation-owner="docFile" operation="new" ref="data('authControl')/fileAuth"> 
      <xforms:label id="default8"><![CDATA[新建文件]]></xforms:label>  
      </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="文件夹" width="400px" height="300px" modal="true" id="folderDlg" url="/UI/common/docMng/process/docMng/folderDlg.w"
      onReceive="manageActivity.folderDlgReceive" reload-on-open="true" resizable="false"
      minmaxable="false"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnDelFile"
      appearance="image-text" class="button-blue" ref="data('authControl')/fileAuth"> 
      <xforms:label id="default10"><![CDATA[删除文件]]></xforms:label>
    <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[manageActivity.btnDelFileClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="文件上传" width="400px" height="300px" modal="true" id="uploadDlg" url="/UI/common/docMng/process/docMng/uploadFile.w"
      reload-on-open="true" resizable="false" minmaxable="false"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="权限设置" width="400px" height="300px" modal="true" id="authDlg" status="maximize"
      reload-on-open="true" url="/UI/common/docMng/process/docMng/docCenterPermission.w"/>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" appearance="image-text" class="button-blue" operation-owner="docFile" operation="save" ref="data('authControl')/fileAuth">
   <xforms:label id="default22"><![CDATA[保存]]></xforms:label></xforms:trigger>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:img src="/UI/common/docMng/process/docMng/folder.png" alt="" id="image1" style="position:absolute;width:25px;height:27px;left:4px;top:2px;"></xhtml:img>
  <xhtml:label id="label1" class="xui-label" style="font-size:15px;font-weight:bold;position:absolute;left:36px;top:9px;">文档目录</xhtml:label>
  <xui:place control="folderMenu" id="controlPlace6" style="width:83px;right:0px;position:absolute;left:195px;top:6px;"></xui:place></layout>
  <xhtml:div label="操作" component="/UI/system/components/menuButton.xbl.xml#menuButton" id="folderMenu" icon-class="icon-system-plus">
   <menuitem id="newDirMI" name="newDirMI" onClick="manageActivity.newDirMIClick" label="文件夹"></menuitem>
   <menuitem id="newCldDirMI" name="newCldDirMI" onClick="manageActivity.newCldDirMIClick" label="子文件夹"></menuitem>
  <menuitem id="delDirMI" label="删除" name="delDirMI" onClick="manageActivity.delDirMIClick"></menuitem>
  <menuitem id="authMI" label="权限设置" name="authMI" onClick="manageActivity.authMIClick"></menuitem></xhtml:div></xui:view>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="docFile">
   <xui:column id="gridColumn2" ref="fFileName" label="文件名" type="ed" width="*"></xui:column>
   <xui:column id="gridColumn5" ref="fCreateDept" label="创建人部门" type="ed" width="100px"></xui:column>
   <xui:column id="gridColumn6" ref="fCreatPerson" label="创建人" type="ed" width="100px"></xui:column>
   <xui:column id="gridColumn7" ref="fCreateTime" label="创建时间" type="ed" width="100px"></xui:column></xhtml:div>
  <xhtml:div component="/UI/system/components/attachmentEditor2.xbl.xml#attachmentEditor2" display-buttons="upload:true;download:true;edit:true;delete:true;template:false;history:false;" limit="-1" runtime="html4" id="attachmentEditor21" class="xui-attachmentEditor2" ref="data('docFile')/fDocIds" sub-path="/文件共享"></xhtml:div>
  <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next" id="pagination1" data="docFile" align="right" page-count="5"></xhtml:div></xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="manageActivity.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/lib/jquery-1.11.1/jquery-1.11.1.min.js"/>
  <xhtml:script id="htmlScript3" src="/UI/system/service/doc/docUtil2.js"></xhtml:script>
  <xhtml:script id="htmlScript4" src="/UI/base/lib/butoneExUtils.js"></xhtml:script>
  <xhtml:script id="htmlScript5" src="/UI/base/core/template/butoneExtend.js"></xhtml:script></xui:resource> 
</xui:window>
