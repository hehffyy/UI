<?xml version="1.0" encoding="utf-8"?>

<window xmlns="http://www.justep.com/xui" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:f="http://orbeon.org/oxf/xml/formatting" xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xui="http://www.justep.com/xui" id="docCenterPermission" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="docCenterPermissionModel" style="top:225px;height:auto;left:181px;"> 
    <data id="docAuthList" component="/UI/system/components/data.xbl.xml#bizData" concept="SA_DocAuth" offset="1" limit="-1" load-data-when-init="false"> 
      <reader action="/SA/doc/logic/action/queryAuthAction"/>  
      <writer action="/SA/doc/logic/action/saveAuthAction"/>  
      <creator action="/SA/doc/logic/action/createAuthAction"/>  
      <calculate-relation relation="sAccessName" type="xs:string" calculate="call('getAccessLabel')"/> 
    </data>  
    <data id="newAuthMenuItems" auto-load="true" store-type="simple" columns="label,value" component="/UI/system/components/data.xbl.xml#data"> 
      <rows xmlns="">  
        <row> 
          <cell>部门</cell>  
          <cell>org</cell> 
        </row>  
        <row> 
          <cell>人员</cell>  
          <cell>person</cell> 
        </row> 
      </rows> 
    </data>  
    <data id="permissionType" auto-load="true" store-type="grid" columns="col1,col2,col3" component="/UI/system/components/data.xbl.xml#data" confirm-delete="false"> 
      <rows xmlns="">  
        <row id="per0"> 
          <cell>不可见</cell>  
          <cell>0</cell>  
          <cell>true</cell> 
        </row>  
        <row id="per1"> 
          <cell>列表</cell>  
          <cell>1</cell>  
          <cell>true</cell> 
        </row>  
        <row id="per3"> 
          <cell>读取</cell>  
          <cell>3</cell>  
          <cell>true</cell> 
        </row>  
        <row id="per7"> 
          <cell>下载</cell>  
          <cell>7</cell>  
          <cell>true</cell> 
        </row>  
        <row id="per519"> 
          <cell>下载 修改</cell>  
          <cell>519</cell>  
          <cell>true</cell> 
        </row>  
        <row id="per1543"> 
          <cell>下载 修改 删除</cell>  
          <cell>1543</cell>  
          <cell>true</cell> 
        </row>  
        <row id="per257"> 
          <cell>上传</cell>  
          <cell>257</cell>  
          <cell>true</cell> 
        </row>  
        <row id="per263"> 
          <cell>下载 上传</cell>  
          <cell>263</cell>  
          <cell>false</cell> 
        </row>  
        <row id="per775"> 
          <cell>下载 上传 修改</cell>  
          <cell>775</cell>  
          <cell>false</cell> 
        </row>  
        <row id="per1799"> 
          <cell>下载 上传 修改 删除</cell>  
          <cell>1799</cell>  
          <cell>false</cell> 
        </row>  
        <row id="per16384"> 
          <cell>管理</cell>  
          <cell>16384</cell>  
          <cell>true</cell> 
        </row>  
        <row id="per32767"> 
          <cell>完全控制</cell>  
          <cell>32767</cell>  
          <cell>true</cell> 
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
    <xhtml:script language="JavaScript" type="text/javascript" src="/UI/SA/doc/docCenter/docCenterPermission.js"/> 
  </resource>  
  <view> 
    <view id="dialogsView"> 
      <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" id="orgSelectDialog" url="/UI/system/dialog/org/orgSingleTree.w" title="选择部门" modal="true" status="maximize" show-title="false" width="396px" height="264px" reload-on-open="true" minmaxable="true" resizable="true" autosize="true" onReceive="afterOrgSelected" onSend="beforeOrgSelected" dialogUpdate="true"/>  
      <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" id="personSelectDialog" url="/UI/system/dialog/org/orgSingleTreeList.w" title="选择人员" modal="true" status="maximize" show-title="false" width="396px" height="264px" reload-on-open="true" minmaxable="true" resizable="true" autosize="true" onReceive="afterPersonSelected" onSend="beforePersonSelected" dialogUpdate="true"/>  
      <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" ref="data('docAuthList')/sAccess" label-ref="data('docAuthList')/sAccessName" id="authSelect" auto-size="true"> 
        <xforms:label ref="col1"/>  
        <xforms:value ref="col2"/>  
        <xforms:itemset data="permissionType" independence="false" auto-load-data="true"> 
          <xforms:column ref="col1" id="default4"/>  
          <xforms:column ref="col2" visible="false" id="default5"/> 
        </xforms:itemset> 
      </xhtml:div> 
    </view>  
    <layout style="width:100%;height:100%;"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" style="width:100%; height: 100%" border-size="8px" id="border1"> 
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
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="width:100%;"> 
            <xui:place control="trigger1" id="controlPlace1" style="width:66px;"/>  
            <xui:place control="trigger2" id="controlPlace2"/>  
            <xui:place control="trigger3" id="controlPlace3"/>  
            <xui:place control="trigger4" id="controlPlace4"/> 
          </xhtml:div> 
        </top>  
        <center id="cent__"> 
          <xhtml:div data="docAuthList" id="docAuthListGrid" component="/UI/system/components/grid.xbl.xml#grid" style="height:100%; width:100%" onInit="docAuthListGridInit" edit-mode="true" class="grid-compact" row-height="35"> 
            <column label="部门" ref="sAuthorizeeDeptName" width="*"/>  
            <column label="人员" ref="sAuthorizeeName" width="100px"/>  
            <column label="时间" ref="sGrantTime" type="ro" width="120px"/>  
            <column label="权限" editor="authSelect" type="select" ref="sAccessName" width="175px"/> 
          </xhtml:div> 
        </center>  
        <bottom id="bot__" size="30px"> 
          <xui:place control="trigger5" id="controlPlace5" style="float:right;width:75px;margin-top:8px;"/>
        </bottom> 
      </xhtml:div>  
      <place control="dialogsView"/>  
      <xui:place control="orgPermissionDialg" id="controlPlace6" style="position:absolute;top:179px;left:430px;"/>  
      <xui:place control="personPermissionDialg" id="controlPlace8" style="position:absolute;top:283px;left:663px;"/>
    <xui:place control="windowReceiver1" id="controlPlace7" style="position:absolute;top:140px;left:555px;"></xui:place></layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" appearance="image-text" class="button-blue"> 
      <xforms:label id="default1"><![CDATA[新建]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate">
        <xforms:script id="xformsScript1"><![CDATA[docCenterPermission.trigger1Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" operation-owner="docAuthList" operation="save" appearance="minimal"> 
      <xforms:label id="default2"><![CDATA[保存]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" operation-owner="docAuthList" operation="delete" appearance="minimal" icon-class="icon-system-cancel"> 
      <xforms:label id="default3"><![CDATA[删除]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4" icon-class="icon-system-refresh" appearance="minimal" operation-owner="docAuthList" operation="refresh"> 
      <xforms:label id="default6"><![CDATA[刷新]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5" appearance="image-text" class="button-green"> 
      <xforms:label id="default7"><![CDATA[关闭]]></xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate">
        <xforms:script id="xformsScript2"><![CDATA[docCenterPermission.trigger5Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title="" width="600px" height="500px" modal="true" root-filter="SA_OPOrg.sParent is null" id="orgPermissionDialg" org-kinds="ogn,dpt,pos" onReceive="docCenterPermission.orgPermissionDialgReceive">
      <result concept="docAuthList" operation="modify" origin="dOrgList" id="default35"> 
        <mapping from="sFID" to="sAuthorizeeFID" id="default36"/>  
        <mapping from="sName" to="sAuthorizeeDeptName" id="default37"/>
      </result>
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title="" width="600px" height="500px" modal="true" root-filter="SA_OPOrg.sParent is null" id="personPermissionDialg" onReceive="docCenterPermission.personPermissionDialgReceive">
      <result concept="docAuthList" operation="modify" origin="dOrgList" id="default38"> 
        <mapping from="sFID" to="sAuthorizeeFID" id="default39"/>  
        <mapping from="sName" to="sAuthorizeeName" id="default40"/>
      </result>
    </xhtml:div>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1"></xhtml:div></view> 
</window>
