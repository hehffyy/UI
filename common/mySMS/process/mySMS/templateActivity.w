<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:377px;top:88px;height:60px;width:186px;">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="B_personPhoneTemplate" concept="B_personPhoneTemplate"
      limit="-1" direct-delete="true" confirm-delete="false">
      <reader id="default1" action="/common/mySMS/logic/action/queryB_personPhoneTemplateAction"/>  
      <writer id="default2" action="/common/mySMS/logic/action/saveB_personPhoneTemplateAction"/>  
      <creator id="default3" action="/common/mySMS/logic/action/createB_personPhoneTemplateAction"/>  
      <calculate-relation relation="calculate0" id="calculate-relation1"/>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="B_receivePersonTemplate" concept="B_receivePersonTemplate"
      limit="-1" confirm-delete="false" direct-delete="true">
      <reader id="default4" action="/common/mySMS/logic/action/queryB_receivePersonTemplateAction"/>  
      <writer id="default5" action="/common/mySMS/logic/action/saveB_receivePersonTemplateAction"/>  
      <creator id="default6" action="/common/mySMS/logic/action/createB_receivePersonTemplateAction"/>  
      <master id="master1" data="B_personPhoneTemplate" relation="fTemplateID"/>  
      <calculate-relation relation="calculate1" id="calculate-relation2"/>
    </data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="40px" id="borderLayout-top1">
          <xui:place control="view1" id="controlPlace2" style="height:100%;width:100%;"/>
        </top>  
        <center id="borderLayout-center1">
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="300px" mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;"> 
            <xhtml:div region="left" id="div1">
              <xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"/>
            </xhtml:div>  
            <xhtml:div region="right" id="div2">
              <xui:place control="grid2" id="controlPlace11" style="height:100%;width:100%;"/>
            </xhtml:div>
          </xhtml:div>
        </center>
      </xhtml:div>  
      <xui:place control="personDialog" id="controlPlace12" style="position:absolute;top:213px;left:518px;"/>  
      <xui:place control="orgDialog" id="controlPlace13" style="position:absolute;top:169px;left:423px;"/>
    </xui:layout>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="B_personPhoneTemplate" edit-mode="true">
      <xui:column id="gridColumn2" ref="calculate0" label="序号" type="ro" width="50px"
        align="center" show-index="true" readonly="true"/>
      <xui:column id="gridColumn1" ref="fTemplateName" label="模版名称" type="ed" width="240px"/> 
    </xhtml:div>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1">
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar1" style="position:absolute;left:5px;top:5px;" separator-size="5">
          <xui:place control="trigger1" id="controlPlace3" style="width:100px;"/>  
          <xui:place control="trigger2" id="controlPlace4" style="width:100px;"/>  
          <xui:place control="trigger3" id="controlPlace5" style="width:80px;"/>  
          <xui:place control="trigger4" id="controlPlace6" style="width:80px;"/>  
          <xui:place control="trigger5" id="controlPlace7" style="width:100px;"/>  
          <xui:place control="trigger6" id="controlPlace8" style="width:100px;"/>  
          <xui:place control="trigger7" id="controlPlace9" style="width:100px;"/>  
          <xui:place control="trigger8" id="controlPlace10" style="width:100px;"/>
        </xhtml:div>
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
        operation-owner="B_personPhoneTemplate" operation="new" appearance="image-text"
        class="button-blue"> 
        <xforms:label id="default7"><![CDATA[新增模版]]></xforms:label>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
        appearance="image-text" class="button-orange" icon-class="icon-system-trash"> 
        <xforms:label id="default8"><![CDATA[删除模版]]></xforms:label>  
        <xforms:action id="action3" ev:event="DOMActivate">
          <xforms:script id="xformsScript3"><![CDATA[templateActivity.trigger2Click(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3"
        operation-owner="B_personPhoneTemplate" operation="save" appearance="image-text"
        class="button-blue"> 
        <xforms:label id="default9"><![CDATA[保存]]></xforms:label>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4"
        operation-owner="B_personPhoneTemplate" operation="refresh" appearance="image-text"
        class="button-darkcyan"> 
        <xforms:label id="default10"><![CDATA[刷新]]></xforms:label>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5"
        appearance="image-text" class="button-blue" icon-class="icon-system-users"> 
        <xforms:label id="default11"><![CDATA[电话号薄]]></xforms:label>
      <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[templateActivity.trigger5Click(event)]]></xforms:script></xforms:action></xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger6"
        class="button-blue" icon-class="icon-system-users" appearance="image-text"> 
        <xforms:label id="default12"><![CDATA[自定义添加]]></xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate">
          <xforms:script id="xformsScript1"><![CDATA[templateActivity.trigger6Click(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger7"
        appearance="image-text" class="button-orange" icon-class="icon-system-trash"> 
        <xforms:label id="default13"><![CDATA[删除号码]]></xforms:label>  
        <xforms:action id="action4" ev:event="DOMActivate">
          <xforms:script id="xformsScript4"><![CDATA[templateActivity.trigger7Click(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger8"
        appearance="image-text" class="button-darkcyan" icon-class="icon-system-trash"> 
        <xforms:label id="default14"><![CDATA[清除号码]]></xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate">
          <xforms:script id="xformsScript2"><![CDATA[templateActivity.trigger8Click(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>
    </xui:view>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid2" data="B_receivePersonTemplate">
      <xui:column id="gridColumn5" ref="calculate1" label="序号" type="ro" width="50px"
        align="center" readonly="true" show-index="true"/>
      <xui:column id="gridColumn3" ref="fPersonName" label="名称" type="ed" width="120px"/>  
      <xui:column id="gridColumn4" ref="fPhone" label="电话" type="ro" width="200px"
        align="center"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="请输入人员名称和电话号码" width="450px" height="200px" modal="true" id="personDialog"
      url="/UI/common/mySMS/process/mySMS/personPhoneActivity.w" reload-on-open="true"
      status="minimize" resizable="false" minmaxable="false" onReceive="templateActivity.personDialogReceive"/>  
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title="人员选择"
        width="600px" height="500px" modal="true" org-kinds="psm" root-filter="SA_OPOrg.sParent is null and SA_OPOrg.sName&lt;&gt;'博通股份'"
        show-common-group="true" filter="SA_OPOrg.sOrgKindID &lt;&gt; 'pos' and instr(SA_OPOrg.sFID,'.pos/') = 0"
        id="orgDialog" reload-on-open="true" multi-select="true" onReceive="templateActivity.orgDialogReceive"/>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="templateActivity.js"/>
  </xui:resource> 
</xui:window>
