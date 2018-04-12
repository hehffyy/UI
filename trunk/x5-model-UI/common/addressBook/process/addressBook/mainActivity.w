<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:421px;height:auto;top:56px;">
    <xforms:action id="action1" ev:event="onload">
      <xforms:script id="xformsScript1"><![CDATA[mainActivity.model1Load(event)]]></xforms:script>
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="dOrgTree" concept="SA_OPOrg" limit="-1"
      confirm-refresh="false" is-tree="true">
      <reader id="default3" action="/SA/OPM/logic/action/queryOPOrgAction"/>  
      <tree-option id="default4" parent-relation="sParent" root-filter="SA_OPOrg.sParent is null and SA_OPOrg.sValidState&lt;&gt;-1 and SA_OPOrg.sName &lt;&gt; '起步软件' "/>  
      <filter name="filter0" id="filter1"><![CDATA[SA_OPOrg.sOrgKindID <> 'pos' and SA_OPOrg.sOrgKindID <> 'psm']]></filter>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData" concept="SA_OPPerson" limit="-1"
      store-type="simple">
      <reader id="default1" action="/common/addressBook/logic/action/queryPersonInfoAction"/>
    </data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;position:relative;" id="rootLayout"
      type="absolute">
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="340px"
        mode="horz" id="HSplitter1" style="position:absolute;height:100%;width:100%;"
        class="xui-splitter" resizable="false" has-drag-bar="true"> 
        <xhtml:div region="left" id="div1">
          <xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;"/>
        </xhtml:div>  
        <xhtml:div region="right" id="div2">
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout1" style="width:100%; height: 100%;;"> 
            <top size="50px" id="borderLayout-top1" style="border-bottom:2px solid #ccc;">
              <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                id="buttonBar1" style="position:absolute;top:5px;right:20px;;"> 
                <xhtml:input type="text" value="" id="input_searchPerson" class="xui-input"
                  size="50" style="height:30px;width:300px;border-radius: 5px 0px 0px 5px;" placeholder="请输入部门、姓名或者电话..." onkeydown="mainActivity.input_searchPersonKeydown(event)" onchange="mainActivity.input_searchPersonChange(event)"/>  
                <xui:place control="searchPerson" id="controlPlace6" style="height:30px;"/>
              </xhtml:div>
            </top>  
            <center id="borderLayout-center1" style="overflow:auto;">
              <xui:place control="view2" id="controlPlace2" style="height:auto;padding-left:5px;width:99%;"/>
            </center>
          </xhtml:div>
        </xhtml:div>
      </xhtml:div>
    </xui:layout>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1">
        <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
          id="borderLayout2" style="width:100%; height: 100%;position:absolute;"> 
          <top size="50px" id="borderLayout-top2" style="border-bottom:2px solid #ccc;"> 
            <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
              id="buttonBar2" style="position:absolute;top:5px;left:5px;width:100%;height:40px;"> 
              <xhtml:input type="text" value="" id="input_searchOrg" class="xui-input"
                size="50" style="width:250px;height:30px;border-radius: 5px 0px 0px 5px;" placeholder="请输入部门名称..." onkeydown="mainActivity.input_searchOrgKeydown(event)" onchange="mainActivity.input_searchOrgChange(event)"/>
              <xui:place control="searchOrg" id="controlPlace3" style="height:30px;"/>
            </xhtml:div>
          </top>  
          <center id="borderLayout-center2">
            <xui:place control="gridOrgTree" id="controlPlace4" style="border-style:solid solid solid solid;border-width:1px 1px 1px 1px;border-color:#C0C0C0 #C0C0C0 #C0C0C0 #C0C0C0;width:100%;height:100%;border:none;padding:5px;"/>
          </center>
        </xhtml:div>
      </layout>  
      <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" show-header-menu="hide-column,save-layout,group-column,adjust-column"
        id="gridOrgTree" data="dOrgTree" appearance="tree" space-column="false" class="ui-light"
        onRowClick="mainActivity.gridOrgTreeRowClick" onAfterIndexChanged="mainActivity.gridOrgTreeAfterIndexChanged" onRowDblClick="mainActivity.gridOrgTreeRowDblClick"> 
        <xui:column id="gridColumn1" ref="sName" label="名称" type="tree" readonly="true"
          width="#"/>
      </xhtml:div>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="searchOrg"
        appearance="image-text" class="button-blue" icon-class="icon-system-search"> 
        <xforms:label id="default2">搜索</xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript2">mainActivity.searchOrgClick(event)</xforms:script>
        </xforms:action> 
      </xforms:trigger>
    </xui:view>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="searchPerson"
      appearance="image-text" class="button-blue" icon-class="icon-system-search"> 
      <xforms:label id="default5">查询</xforms:label>
    <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[mainActivity.searchPersonClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
    <xui:view auto-load="true" id="view2" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout2"/>
    </xui:view>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="mainActivity.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="mainActivity.css"/>
  </xui:resource> 
</xui:window>
