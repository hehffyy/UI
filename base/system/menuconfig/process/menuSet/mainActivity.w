<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:51px;top:142px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizSA_Menu" concept="B_Menu" is-tree="true"
      limit="-1" order-by="fOrder asc" onAfterRefresh="mainActivity.bizSA_MenuAfterRefresh"> 
      <creator id="default1" action="/base/system/menuconfig/logic/action/createB_MenuAction"/>  
      <reader id="default2" action="/base/system/menuconfig/logic/action/queryB_MenuAction"/>  
      <writer id="default3" action="/base/system/menuconfig/logic/action/saveB_MenuAction"/>  
      <tree-option id="default9" parent-relation="fParentID" root-filter="B_Menu.fParentID is null"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="bizSA_Menu_1" concept="B_Menu" order-by="fOrder asc"
      onAfterRefresh="mainActivity.bizSA_Menu_1AfterRefresh" limit="-1" onAfterNew="mainActivity.bizSA_Menu_1AfterNew">
      <reader id="default18" action="/base/system/menuconfig/logic/action/queryB_MenuAction"/>  
      <writer id="default19" action="/base/system/menuconfig/logic/action/saveB_MenuAction"/>  
      <creator id="default20" action="/base/system/menuconfig/logic/action/createB_MenuAction"/>  
      <calculate-relation relation="calculate0" id="calculate-relation1"/>
    </data>  
    <xforms:action id="action15" ev:event="onload">
      <xforms:script id="xformsScript15"><![CDATA[mainActivity.model1Load(event)]]></xforms:script>
    </xforms:action>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="250px"
        mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;"
        has-drag-bar="true" has-arrow-button="true"> 
        <xhtml:div region="left" id="div1"> 
          <xui:place control="grid2" id="controlPlace4" style="width:100%;height:100%;"/> 
        </xhtml:div>  
        <xhtml:div region="right" id="div2"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout1" style="width:100%; height: 100%;;"> 
            <top size="40px" id="borderLayout-top1"> 
              <xui:place control="view1" id="controlPlace1" style="width:100%;height:100%;"/> 
            </top>  
            <center id="borderLayout-center1"> 
              <xui:place control="grid1" id="controlPlace3" style="height:100%;width:100%;"/> 
            </center> 
          </xhtml:div> 
        </xhtml:div> 
      </xhtml:div>  
      <xui:place control="windowDialog2" id="controlPlace14" style="top:246px;left:336px;"/>  
      <xui:place control="windowDialog1" id="controlPlace2" style="position:absolute;top:208px;left:543px;"/>  
      <xui:place control="appNameDialog" id="controlPlace5" style="position:absolute;top:145px;left:367px;"/>
    </xui:layout>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar1" style="position:absolute;height:100%;width:100%;top:0px;left:0px;"
          separator-size="5" expandable="true">
          <xui:place control="trg_root" id="controlPlace6" style="height:24px;width:110px;"/>  
          <xui:place control="trg_addChild" id="controlPlace7" style="height:24px;width:60px;"/>  
          <xui:place control="trg_menuSelect" id="controlPlace8" style="height:24px;width:80px;"/>  
          <xui:place control="trg_addURL" id="controlPlace16" style="width:90px;height:24px;"/>
          <xui:place control="trg_del" id="controlPlace9" style="height:24px;width:60px;"/>  
          <xui:place control="trg_save" id="controlPlace10" style="width:60px;height:24px;"/>  
          <xui:place control="trg_up" id="controlPlace11" style="height:24px;width:60px;"/>  
          <xui:place control="trg_down" id="controlPlace12" style="height:24px;width:60px;"/>  
          <xui:place control="parseXML" id="controlPlace13" style="height:24px;width:60px;"/>  
          <xui:place control="generateXML" id="controlPlace18" style="width:60px;height:24px;"/>  
          <xui:place control="trg_menuInit" id="controlPlace17" style="width:80px;height:24px;"/> 
        </xhtml:div>
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_root"
        appearance="image-text" icon-class="icon-system-th-list"> 
        <xforms:label id="default15"><![CDATA[appName管理]]></xforms:label>  
        <xforms:action id="action7" ev:event="DOMActivate">
          <xforms:script id="xformsScript7"><![CDATA[mainActivity.trg_rootClick(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_addChild"
        appearance="image-text" icon-class="icon-system-plus"> 
        <xforms:label id="default5"><![CDATA[子目录]]></xforms:label>  
        <xforms:action id="action3" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript3"><![CDATA[mainActivity.trg_addChildClick(event)]]></xforms:script>
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_menuSelect"
        appearance="image-text" icon-class="icon-system-plus"> 
        <xforms:label id="default17"><![CDATA[功能菜单]]></xforms:label>  
        <xforms:action id="action8" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript8"><![CDATA[mainActivity.trg_menuSelectClick(event)]]></xforms:script>
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_del"
        appearance="image-text" icon-class="icon-system-trash" class="button-hotpink"> 
        <xforms:label id="default14">删除</xforms:label>  
        <xforms:action id="action6" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript6"><![CDATA[mainActivity.trg_delClick(event)]]></xforms:script>
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_save"
        appearance="image-text" class="button-green" operation-owner="bizSA_Menu_1"
        operation="save"> 
        <xforms:label id="default11">保存</xforms:label>  
        <xforms:action id="action4" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript4"><![CDATA[mainActivity.trg_saveClick(event)]]></xforms:script>
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_up"
        appearance="image-text" icon-class="icon-system-up" class="button-blue"> 
        <xforms:label id="default6">上移</xforms:label>  
        <xforms:action id="action11" ev:event="DOMActivate">
          <xforms:script id="xformsScript11"><![CDATA[mainActivity.trg_upClick(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_down"
        appearance="image-text" icon-class="icon-system-down" class="button-blue"> 
        <xforms:label id="default7">下移</xforms:label>  
        <xforms:action id="action12" ev:event="DOMActivate">
          <xforms:script id="xformsScript12"><![CDATA[mainActivity.trg_downClick(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="parseXML"
        appearance="image-text"> 
        <xforms:label id="default4"><![CDATA[解析xml]]></xforms:label>  
        <xforms:action id="action5" ev:event="DOMActivate">
          <xforms:script id="xformsScript5"><![CDATA[mainActivity.parseXMLClick(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_addURL"
        appearance="image-text"> 
        <xforms:label id="default8"><![CDATA[添加URL参数]]></xforms:label>  
        <xforms:action id="action14" ev:event="DOMActivate">
          <xforms:script id="xformsScript14"><![CDATA[mainActivity.trg_addURLClick(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_menuInit"
        appearance="image-text" class="button-purple"> 
        <xforms:label id="default16"><![CDATA[初始化菜单]]></xforms:label>  
        <xforms:action id="action16" ev:event="DOMActivate">
          <xforms:script id="xformsScript16"><![CDATA[mainActivity.trg_menuInitClick(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="generateXML"
        appearance="image-text" class="button-green"> 
        <xforms:label id="default21"><![CDATA[生成xml]]></xforms:label>  
        <xforms:action id="action13" ev:event="DOMActivate">
          <xforms:script id="xformsScript13"><![CDATA[mainActivity.generateXMLClick(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" header-row-height="35"
      row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="bizSA_Menu_1" class="grid-compact" space-column="true"
      move-column="true" edit-mode="false"> 
      <xui:column id="gridColumn3" ref="fOrder" label="序号" type="ed" width="30px"
        show-index="true"/>
      <xui:column id="gridColumn1" ref="fName" label="菜单项名称(*)" type="ed" width="182px"
        align="left"/>  
      <xui:column id="gridColumn6" ref="fDisplay" label="展示类型" type="select" width="75px"
        align="center" editor="gridSelect1"> 
        <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
          dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
          ext-separator="," id="gridSelect1" ref="data('bizSA_Menu_1')/fDisplay" label-ref="data('bizSA_Menu_1')/fDisplay"> 
          <xforms:label ref="0" id="default10"/>  
          <xforms:value ref="0" id="default12"/>  
          <xforms:itemset id="default13"> 
            <xforms:column ref="0" id="default30"/>  
            <itemset-data xmlns="" id="default31">  
              <rows id="default32"> 
                <row id="default33"> 
                  <cell id="default34"/>
                </row>  
                <row id="default35"> 
                  <cell id="default36">hide</cell>
                </row>  
                <row id="default37"> 
                  <cell id="default38">solid</cell>
                </row> 
              </rows> 
            </itemset-data> 
          </xforms:itemset> 
        </xhtml:div>
      </xui:column>  
      <xui:column id="gridColumn8" ref="fProcess" label="流程路径" type="ro" width="300px"
        align="left"/>
      <xui:column id="gridColumn7" ref="fActivity" label="流程环节" type="ro" width="122px"
        align="left"/>  
      <xui:column id="gridColumn9" ref="fActivityUrl" label="环节路径" type="ro" width="*"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36"
      row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid2" data="bizSA_Menu" appearance="tree" onRowClick="mainActivity.grid2RowClick"
      space-column="false" class="ui-light xui-no-border xui-autofill" edit-mode="true"
      dragable="true"> 
      <xui:column id="gridColumn2" ref="fName" label="名称" type="tree" width="150px"
        readonly="true"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="" width="800px" height="485px" modal="true" id="windowDialog2" url="/UI/base/system/menuconfig/process/menuSet/selectMultiFunctions.w"
      reload-on-open="true" onReceive="mainActivity.windowDialog2Receive"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="添加URL参数" width="700px" height="450px" modal="true" id="windowDialog1"
      url="/UI/base/system/menuconfig/process/menuSet/processParmAdd.w" onReceive="mainActivity.windowDialog1Receive"
      status="minimize"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="appName管理" width="500px" height="400px" modal="true" id="appNameDialog"
      url="/UI/base/system/menuconfig/process/menuSet/appNameMng.w" onClose="mainActivity.appNameDialogClose"
      reload-on-open="true"/>
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="mainActivity.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="mainActivity.css"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"/>
  </xui:resource> 
</xui:window>
