<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="top:384px;left:396px;height:136px;width:250px;">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="funcData" concept="B_BusinessProcess" onIndexChanged="mainActivity.funcDataIndexChanged" onRefreshCreateParam="mainActivity.funcDataRefreshCreateParam" onAfterRefresh="mainActivity.funcDataAfterRefresh" limit="4">
      <creator id="default7" action="/base/core/material/logic/action/createB_BusinessProcessAction" />  
      <reader id="default8" action="/base/core/material/logic/action/queryB_BusinessProcessAction" />  
      <writer id="default9" action="/base/core/material/logic/action/saveB_BusinessProcessAction" />  
      <calculate-relation relation="calculate0" id="calculate-relation1" />
    </data><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="mainData" concept="B_UserProcess" onAfterRefresh="mainActivity.mainDataAfterRefresh"
      onNewCreateParam="mainActivity.mainDataNewCreateParam" limit="-1" order-by="fDispOrder asc">
      <creator id="default1" action="/base/core/material/logic/action/createB_UserProcessAction"/>  
      <reader id="default2" action="/base/core/material/logic/action/queryB_UserProcessTwoAction"/>  
      <writer id="default3" action="/base/core/material/logic/action/saveB_UserProcessAction"/>  
      <calculate-relation relation="calculate2" id="calculate-relation3"/>  
      <rule id="dataBizRule1" relation="fUserID"/>  
      <master id="master3"/>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="detailData" concept="B_UserBusinessMaterial"
      limit="-1">
      <creator id="default4" action="/base/core/material/logic/action/createB_UserBusinessMaterialAction"/>  
      <reader id="default5" action="/base/core/material/logic/action/queryB_UserBusinessMaterialAction"/>  
      <writer id="default6" action="/base/core/material/logic/action/saveB_UserBusinessMaterialAction"/>  
      <master id="master2" data="mainData" relation="fUserProcessID"/>
    <rule id="dataBizRule6" relation="fMaterialAttribute" required="true()"></rule>
  <rule id="dataBizRule7" relation="fDispOrder" required="true()"></rule>
  <rule id="dataBizRule8" relation="fMtNums" required="true()"></rule>
  <rule id="dataBizRule9" relation="fMaterialName" required="true()"></rule></data>  
      
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="UserBusinessMaterialData" concept="B_UserBusinessMaterial"
      limit="10" order-by="fDispOrder asc"> 
      <reader id="default21" action="/base/core/material/logic/action/queryB_UserBusinessMaterialAction"/>  
      <writer id="default19" action="/base/core/material/logic/action/saveB_UserBusinessMaterialAction"/>  
      <creator id="default18" action="/base/core/material/logic/action/createB_UserBusinessMaterialAction"/>  
      <master id="master1" data="userProcessData" relation="fUserProcessID"/>  
      <rule id="dataBizRule2" relation="fMaterialName" required="true()"/>  
      <rule id="dataBizRule3" relation="fMtNums" required="true()"/>  
      <rule id="dataBizRule4" relation="fMaterialAttribute" required="true()"/>  
      <rule id="dataBizRule5" relation="fDispOrder" required="true()"/>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="materialData" concept="SysDictItem" onRefreshCreateParam="mainActivity.materialDataRefreshCreateParam"> 
      <reader id="default27" action="/base/system/logic/action/querySysDictItemByTypeAction"/>
    </data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="40%"
        mode="vert" id="VSplitter1" class="xui-splitter" style="height:100%;width:100%;"
        fix-type="top" has-drag-bar="true"> 
        <xhtml:div region="top" id="div3">
          <xui:place control="view7" id="controlPlace9" style="height:100%;width:100%;"/>
        </xhtml:div>  
        <xhtml:div region="bottom" id="div4">
          <xui:place control="view8" id="controlPlace28" style="height:100%;width:100%;"/>
        </xhtml:div>
      </xhtml:div>
    </xui:layout>  
    <xui:view auto-load="true" id="view7" class="xui-container"> 
      <layout type="absolute" style="position:relative;height:100%;width:100%;"
        id="layout7">
        <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
          id="borderLayout2" style="width:100%; height: 100%;;;position:absolute;"> 
          <top size="35px" id="borderLayout-top2"> 
            <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar4"><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgSelectProcess" class="button-blue">
   <xforms:label id="default10">快捷添加业务</xforms:label>
   <xforms:action id="action1" ev:event="DOMActivate">
    <xforms:script id="xformsScript1">mainActivity.trgSelectProcessClick (event)</xforms:script></xforms:action> </xforms:trigger><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" class="button-blue">
   <xforms:label id="default20">添加业务</xforms:label>
   <xforms:action id="action4" ev:event="DOMActivate">
    <xforms:script id="xformsScript4">mainActivity.trigger2Click(event)</xforms:script></xforms:action> </xforms:trigger><xui:place control="trigger10" id="controlPlace23" style="width:50px;"></xui:place>
  <xui:place control="trigger11" id="controlPlace24" style="width:50px;"></xui:place>
  <xui:place control="trigger12" id="controlPlace25" style="width:50px;"></xui:place>
  <xui:place control="trigger13" id="controlPlace29" style="width:50px;height:25px;"></xui:place>
  <xui:place control="trigger14" id="controlPlace30" style="width:50px;"></xui:place>
  <xui:place control="trigger15" id="controlPlace31" style="width:50px;"></xui:place>
  <xhtml:label id="label1" class="xui-label"><![CDATA[智能过滤：]]></xhtml:label><xui:place control="smartFilter1" id="controlPlace32" style="width:200px;"></xui:place></xhtml:div><xui:place control="toolbars2" id="controlPlace7"/> 
          
  <xui:place control="grid1" id="controlPlace1" style="width:100%;height:100%;"></xui:place></top>  
          <center id="borderLayout-center2"> 
            
          <xui:place control="grid3" id="controlPlace10" style="width:100%;height:100%;"></xui:place></center> 
        </xhtml:div>  
        <xui:place control="dlgSelectProcess2" id="controlPlace14" style="position:absolute;top:183px;left:581px;"/>  
        <xui:place control="dlgSelectProcess" id="controlPlace13" style="position:absolute;top:135px;left:473px;"/>
      </layout>  
      <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars2"> 
        </xhtml:div>  
      <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
        title="" width="800px" height="600px" modal="true" id="dlgSelectProcess2"
        url="/UI/common/commdialogs/funcTree/selectMultiFunctions.w?" onReceive="mainActivity.dlgSelectProcessReceive2"
        status="maximize"/>  
      <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
        title="" width="800px" height="600px" modal="true" id="dlgSelectProcess" url="/bizmodel/modelService/process/ModelService/processSelectDialog.w"
        onReceive="mainActivity.dlgSelectProcessReceive" onInit="mainActivity.dlgSelectProcessInit"
        status="maximize"/>  
  
      <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid3" data="funcData" onRowClick="mainActivity.grid3RowClick">
   <xui:column id="gridColumn8" ref="calculate0" label="序号" type="ed" width="60px" show-index="true" readonly="true"></xui:column>
   <xui:column id="gridColumn5" ref="fFuncName" label="名称" type="ed" width="200px" readonly="true"></xui:column>
   <xui:column id="gridColumn6" ref="fFuncLongName" label="流程全名" type="ed" width="500px" readonly="true"></xui:column>
   <xui:column id="gridColumn7" ref="fProcess" label="流程" type="ed" width="*" readonly="true"></xui:column></xhtml:div>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="funcData">
   <xui:column id="gridColumn9" ref="calculate0" label="序号" type="ed" width="60px" show-index="true" readonly="true"></xui:column>
   <xui:column id="gridColumn4" ref="fFuncName" label="名称" type="ed" width="200px" readonly="true"></xui:column>
   <xui:column id="gridColumn3" ref="fFuncLongName" label="流程全名" type="ed" width="500px" readonly="true"></xui:column>
   <xui:column id="gridColumn2" ref="fProcess" label="流程" type="ed" width="*" readonly="true"></xui:column></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger10" operation-owner="funcData" appearance="image-minimal" operation="save">
   <xforms:label id="default28"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger11" operation-owner="funcData" operation="delete" appearance="image-minimal">
   <xforms:label id="default29"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger12" operation-owner="funcData" operation="refresh" appearance="image-minimal">
   <xforms:label id="default30"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger13" operation-owner="funcData" operation="prevPage" appearance="image-minimal">
   <xforms:label id="default31"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger14" operation-owner="funcData" operation="nextPage" appearance="image-minimal">
   <xforms:label id="default32"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger15" operation-owner="funcData" operation="loadAllPage" appearance="image-minimal">
   <xforms:label id="default33"><![CDATA[]]></xforms:label></xforms:trigger>
  <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter1" filter-data="funcData" filter-relations="fFuncName,fFuncLongName,fProcess" auto-refresh="true"></xhtml:div></xui:view>  
    <xui:view auto-load="true" id="view8" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout8">
        <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="40%"
          mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;;position:absolute;"
          has-drag-bar="true"> 
          <xhtml:div region="left" id="div1"> 
            <xui:place control="view5" id="controlPlace26" style="height:100%;width:100%;"/>
          </xhtml:div>  
          <xhtml:div region="right" id="div2"> 
            <xui:place control="view6" id="controlPlace27" style="height:100%;width:100%;"/>
          </xhtml:div> 
        </xhtml:div>
      </layout>  
      <xui:view auto-load="true" id="view5" class="xui-container"> 
        <layout type="absolute" style="position:relative;" id="layout5"> 
          <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1" style="position:absolute;height:100%;width:100%;" class="xui-tabPanel">
   <xui:tab id="tabPage1">
    <xui:label id="xuiLabel1"><![CDATA[要件分组]]></xui:label>
  <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;;position:absolute;;">
   <top size="30px" id="borderLayout-top1">
    <xui:place control="view1" id="controlPlace2" style="height:100%;width:100%;"></xui:place></top> 
   <center id="borderLayout-center1">
    <xui:place control="view4" id="controlPlace21" style="height:100%;width:100%;"></xui:place></center> </xhtml:div></xui:tab> 
   </xhtml:div></layout>  
        <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1">
    <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="position:absolute;height:100%;width:100%;">
     <xui:place control="trigger1" id="controlPlace3"></xui:place>
     <xui:place control="trigger3" id="controlPlace4"></xui:place>
     <xui:place control="trigger4" id="controlPlace5"></xui:place>
     <xui:place control="trigger5" id="controlPlace6"></xui:place></xhtml:div> </layout> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" operation-owner="mainData" operation="new" appearance="image-minimal">
    <xforms:label id="default11"></xforms:label>
    <xforms:action id="action2" ev:event="DOMActivate">
     <xforms:script id="xformsScript2">mainActivity.trigger1Click(event)</xforms:script></xforms:action> </xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" operation-owner="mainData" operation="save" appearance="image-minimal">
    <xforms:label id="default12"></xforms:label></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4" operation-owner="mainData" operation="delete" appearance="image-minimal">
    <xforms:label id="default13"></xforms:label></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5" operation-owner="mainData" operation="refresh" appearance="image-minimal">
    <xforms:label id="default14"></xforms:label></xforms:trigger> </xui:view>
  <xui:view auto-load="true" id="view4" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout4">
    <xui:place control="grid6" id="controlPlace22" style="position:absolute;height:100%;width:100%;"></xui:place></layout> 
   <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid6" data="mainData" onRowClick="mainActivity.grid6RowClick">
    <xui:column id="gridColumn1" ref="fDispOrder" label="顺序" type="ed" width="60px"></xui:column>
    <xui:column id="gridColumn16" ref="fBusinessName" label="业务分类" type="ed" width="*" align="center"></xui:column></xhtml:div> </xui:view></xui:view>  
      <xui:view auto-load="true" id="view6" class="xui-container"> 
        <layout type="absolute" style="position:relative;" id="layout6"> 
          <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel2" style="position:absolute;height:100%;width:100%;" class="xui-tabPanel">
   <xui:tab id="tabPage3">
    <xui:label id="xuiLabel3"><![CDATA[分组材料]]></xui:label>
  <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout3" style="width:100%; height: 100%;;;position:absolute;;">
   <top size="30px" id="borderLayout-top3">
    <xui:place control="view3" id="controlPlace11" style="height:100%;width:100%;"></xui:place></top> 
   <center id="borderLayout-center3">
    <xui:place control="view2" id="controlPlace8" style="height:100%;width:100%;"></xui:place></center> </xhtml:div></xui:tab> 
   </xhtml:div></layout>  
        <xui:view auto-load="true" id="view3" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout3">
    <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar2" style="position:absolute;width:100%;height:100%;">
     <xui:place control="trigger6" id="controlPlace15"></xui:place>
     <xui:place control="trigger7" id="controlPlace17"></xui:place>
     <xui:place control="trigger8" id="controlPlace18"></xui:place>
     <xui:place control="trigger9" id="controlPlace19"></xui:place></xhtml:div> </layout> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger7" operation-owner="detailData" operation="save" appearance="image-minimal">
    <xforms:label id="default24"></xforms:label></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger8" operation-owner="detailData" operation="delete" appearance="image-minimal">
    <xforms:label id="default25"></xforms:label></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger9" operation-owner="detailData" operation="refresh" appearance="image-minimal">
    <xforms:label id="default26"></xforms:label></xforms:trigger> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger6" operation-owner="detailData" operation="new" appearance="image-minimal">
    <xforms:label id="default22"></xforms:label>
    <xforms:action id="action3" ev:event="DOMActivate">
     <xforms:script id="xformsScript3">mainActivity.trigger6Click(event)</xforms:script></xforms:action> </xforms:trigger> </xui:view>
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2">
    <xui:place control="grid5" id="controlPlace16" style="width:100%;position:absolute;height:100%;left:0;top:0;"></xui:place></layout> 
   <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid5" data="detailData">
    <xui:column id="gridColumn14" ref="fDispOrder" label="顺序" type="ed" width="60px" align="center" show-index="true"></xui:column>
    <xui:column id="gridColumn11" ref="fMaterialName" label="材料名称" type="ed" width="*"></xui:column>
    <xui:column id="gridColumn12" ref="fMaterialAttribute" label="材料属性" type="select" width="200px" editor="gridSelect1">
     <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect1" ref="data('detailData')/fMaterialAttribute">
      <xforms:label ref="FNAME" id="default15"></xforms:label>
      <xforms:value ref="FNAME" id="default16"></xforms:value>
      <xforms:itemset id="default17" data="materialData">
       <xforms:column ref="FNAME" id="default23"></xforms:column></xforms:itemset> </xhtml:div> </xui:column> 
    <xui:column id="gridColumn13" ref="fMtNums" label="材料份数" type="ed" width="100px" align="center"></xui:column></xhtml:div> </xui:view></xui:view>
    </xui:view>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="mainActivity.js"/>
  </xui:resource> 
</xui:window>
