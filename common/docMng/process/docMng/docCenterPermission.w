<?xml version="1.0" encoding="utf-8"?>

<window xmlns="http://www.justep.com/xui" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:f="http://orbeon.org/oxf/xml/formatting" xmlns:xs="http://www.w3.org/2001/XMLSchema"
  xmlns:xui="http://www.justep.com/xui" id="docCenterPermission" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="docCenterPermissionModel" style="top:225px;height:auto;left:181px;"> 
    <data id="newAuthMenuItems" auto-load="true" store-type="simple" columns="label,value"
      component="/UI/system/components/data.xbl.xml#data"> 
      <rows xmlns="" id="default8">  
        <row id="default9"> 
          <cell id="default10">部门</cell>  
          <cell id="default11">org</cell> 
        </row>  
        <row id="default12"> 
          <cell id="default13">人员</cell>  
          <cell id="default14">person</cell> 
        </row> 
      </rows> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="docAuth" concept="B_DocAuth">
      <creator id="default16" action="/common/docMng/logic/action/createB_DocAuthAction"/>  
      <reader id="default17" action="/common/docMng/logic/action/queryB_DocAuthAction"/>  
      <writer id="default18" action="/common/docMng/logic/action/saveB_DocAuthAction"/>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="fItem" src="" auto-load="true" id="limitKind" store-type="simple">
      <rows xmlns="" id="default29">  
        <row id="default30"> 
          <cell id="default31">编辑</cell>
        </row>  
        <row id="default32"> 
          <cell id="default33">浏览</cell>
        </row> 
      </rows>
    </data>
  </xforms:model>  
  <resource> 
    <xhtml:link rel="STYLESHEET" type="text/css" href="/form/dhtmlx/dhtmlxWindows/dhtmlxwindows.css"/>  
    <xhtml:link rel="STYLESHEET" type="text/css" href="/form/dhtmlx/dhtmlxWindows/skins/dhtmlxwindows_dhx_blue.css"/>  
    <xhtml:script language="JavaScript" type="text/javascript" src="/UI/system/components/dialog/dialog.js"/>  
    <xhtml:script language="JavaScript" type="text/javascript" src="/UI/system/components/windowDialog/windowDialog.js"/>  
    <xhtml:script language="JavaScript" type="text/javascript" src="/UI/system/components/windowDialog/windowDialogReceiver.js"/>  
    <xhtml:script language="JavaScript" type="text/javascript" src="docCenterPermission.js"/> 
  </resource>  
  <view> 
    <view id="dialogsView"></view>  
    <layout style="width:100%;height:100%;"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        style="width:100%; height: 100%" border-size="8px" id="border1"> 
        <top id="top__" size="38px"> 
          <xhtml:div menu-id="newAuthMenu" appearance="context" component="/UI/system/components/menu.xbl.xml#menu"> 
            <xui:menuitemset data="newAuthMenuItems"> 
              <xui:label ref="label"/>  
              <xui:value ref="value"/> 
            </xui:menuitemset>  
            <xforms:action ev:event="DOMActivate"> 
              <xforms:script>newDocAuth(event);</xforms:script> 
            </xforms:action> 
          </xhtml:div>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar1" style="width:100%;"> 
            <xui:place control="trigger1" id="controlPlace1" style="width:66px;"/>  
            <xui:place control="trigger2" id="controlPlace2"/>  
            <xui:place control="trigger3" id="controlPlace3"/>  
            <xui:place control="trigger4" id="controlPlace4"/> 
          </xhtml:div> 
        </top>  
        <center id="cent__"> 
          <xui:place control="grid1" id="controlPlace15" style="height:100%;width:100%;"/> 
        </center>  
        <bottom id="bot__" size="30px"> 
          <xui:place control="trigger5" id="controlPlace5" style="float:right;width:75px;margin-top:8px;"/> 
        </bottom> 
      </xhtml:div>  
      <place control="dialogsView"/>  
      <xui:place control="orgPermissionDialg" id="controlPlace6" style="position:absolute;top:178px;left:429px;"/>  
      <xui:place control="personPermissionDialg" id="controlPlace8" style="position:absolute;top:389px;left:331px;"/>  
      <xui:place control="windowReceiver1" id="controlPlace18" style="position:absolute;top:163px;left:156px;"/>
    </layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
      appearance="image-text" class="button-blue"> 
      <xforms:label id="default1"><![CDATA[新建]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[docCenterPermission.trigger1Click(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
      operation-owner="docAuth" appearance="minimal" operation="save"> 
      <xforms:label id="default2"><![CDATA[保存]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3"
      operation-owner="docAuth" appearance="minimal" operation="delete"> 
      <xforms:label id="default3"><![CDATA[删除]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4"
      appearance="minimal" operation-owner="docAuth" operation="refresh"> 
      <xforms:label id="default6"><![CDATA[刷新]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5"
      appearance="image-text" class="button-green"> 
      <xforms:label id="default7"><![CDATA[关闭]]></xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript2"><![CDATA[docCenterPermission.trigger5Click(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title=""
      width="600px" height="500px" modal="true" root-filter="SA_OPOrg.sParent is null"
      id="orgPermissionDialg" org-kinds="ogn,dpt,pos" onReceive="docCenterPermission.orgPermissionDialgReceive"> 
      <result concept="docAuthList" operation="modify" origin="dOrgList" id="default35"> 
        <mapping from="sFID" to="sAuthorizeeFID" id="default36"/>  
        <mapping from="sName" to="sAuthorizeeDeptName" id="default37"/> 
      </result> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title=""
      width="600px" height="500px" modal="true" root-filter="SA_OPOrg.sParent is null"
      id="personPermissionDialg" onReceive="docCenterPermission.personPermissionDialgReceive"> 
      <result concept="docAuthList" operation="modify" origin="dOrgList" id="default38"> 
        <mapping from="sFID" to="sAuthorizeeFID" id="default39"/>  
        <mapping from="sName" to="sAuthorizeeName" id="default40"/> 
      </result> 
    </xhtml:div>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="docAuth">
      <xui:column id="gridColumn2" ref="fOrgName" label="对象" type="ed" width="238px"/>
      <xui:column id="gridColumn3" ref="fOrgKind" label="对象类型" type="ed" width="128px"/>
      <xui:column id="gridColumn1" ref="fLimitKind" label="权限类型" type="select" width="100px"
        editor="gridSelect4">
        <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
          dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
          ext-separator="," id="gridSelect4" ref="data('docAuth')/fLimitKind" label-ref="data('docAuth')/fLimitKind"> 
          <xforms:label ref="fItem" id="default47"/>  
          <xforms:value ref="fItem" id="default48"/>  
          <xforms:itemset id="default49" data="limitKind" auto-load-data="true">
            <xforms:column ref="fItem" label="权限类型" id="default50"/>
          </xforms:itemset>
        </xhtml:div>
      </xui:column> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="docCenterPermission.windowReceiver1Receive"/>
  </view> 
</window>
