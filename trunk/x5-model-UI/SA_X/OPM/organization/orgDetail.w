<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model1" style="top:51px;height:auto;left:437px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      auto-load="false" id="dOrg" concept="SA_OPOrg" store-type="grid" confirm-refresh="false"> 
      <reader id="default1" action="/SA/OPM/logic/action/queryOPOrgAction"/>  
      <writer id="default2" action="/SA/OPM/logic/action/saveOPOrgAction"/>  
      <creator id="default3" action="/SA/OPM/logic/action/createOPOrgAction"/>  
      <calculate-relation relation="calcOrgKind" id="calculate-relation3"/>  
      <calculate-relation relation="calcValidState" id="calculate-relation1"/>  
      <rule id="dataBizRule6" relation="calcOrgKind" calculate="call('justep.Org.OrgKinds.getLabel',string(data('dOrg')/sOrgKindID))"
        readonly="true()"/>  
      <rule id="dataBizRule1" relation="calcValidState" calculate="call('justep.OpmUtils.getValidStateLabel', data('dOrg')/sValidState)"
        readonly="true()"/>  
      <rule id="dataBizRule3" concept="SA_OPOrg" readonly="call('orgDetail.getReadOnly')"/>
  <rule id="dataBizRule4" relation="sName" required="true()" alert="'名称不能为空！'"></rule>
  <rule id="dataBizRule5" relation="sCode" required="true()" alert="'编码不能为空！'"></rule> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      auto-load="false" id="dParent" concept="SA_OPOrg" store-type="simple"> 
      <reader id="default4" action="/SA/OPM/logic/action/queryOPOrgAction"/>  
      <rule id="dataBizRule2" relation="sFName" readonly="true()"/> 
    </data> 
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dOrgLevel" concept="SA_OrgLevel" limit="-1" store-type="simple"><reader id="default5" action="/SA/OPM/logic/action/queryOrgLevelAction"></reader>
  <writer id="default6"></writer>
  <creator id="default7"></creator></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="areaData" concept="B_Area" limit="-1" is-tree="true"><reader id="default11" action="/base/system/logic/action/queryB_AreaAction"></reader>
  <tree-option id="default12" parent-relation="fParentId"></tree-option></data>
  </xforms:model>  
  <xui:view id="rootView"> 
    <xforms:input id="inputParentFName" ref="data('dParent')/sFName" disabled="true"/>  
    <xforms:input id="inputName" ref="data('dOrg')/sName"/>  
    <xforms:input id="inputCode" ref="data('dOrg')/sCode"/>  
    <xforms:input id="inputLongName" ref="data('dOrg')/sLongName"/>  
    <xforms:input id="inputPhone" ref="data('dOrg')/sPhone"/>  
    <xforms:input id="inputFax" ref="data('dOrg')/sFax"/>  
    <xforms:input id="inputAddress" ref="data('dOrg')/sAddress"/>  
    <xforms:input id="inputZip" ref="data('dOrg')/sZip"/>  
    <xforms:input id="inputOrgKind" ref="data('dOrg')/calcOrgKind" disabled="true"/>  
    <xforms:textarea ref="data('dOrg')/sDescription" id="textareaDescription"/>
    <xforms:trigger id="btnOK" class="button-green" appearance="image-text"> 
      <xforms:label id="xuiLabel1">确定</xforms:label>  
      <xforms:action ev:event="DOMActivate" id="action1"> 
        <xforms:script id="xformsScript2">orgDetail.btnOKClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger id="btnCancel" appearance="minimal"> 
      <xforms:label id="xuiLabel2">取消</xforms:label>    
      <xforms:action ev:event="DOMActivate" id="action2"> 
        <xforms:script id="xformsScript1">orgDetail.btnCancelClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowDialogReceiver.xbl.xml#windowDialogReceiver"
      id="receiver" onReceive="orgDetail.receiverReceive"/>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      id="gridOrg" data="dOrg"/>  
    <xui:layout style="position:relative;height:100%;width:100%;" id="rootLayout"
      type="absolute"> 
      <xhtml:div id="div1" style="position:absolute;background-color:#F8F8F8;width:346px;top:8px;height:22px;left:49px;"
        class="xui-input"> 
        <xui:place control="inputParentFName" id="controlPlace1" style="border-style:none none none none;height:100%;width:100%;"/> 
      </xhtml:div>  
      <xui:place control="inputName" id="controlPlace3" style="position:absolute;top:39px;left:49px;width:147px;"/>  
      <xui:place control="inputCode" id="controlPlace4" style="position:absolute;width:147px;top:39px;left:250px;"/>  
      <xui:place control="inputLongName" id="controlPlace5" style="position:absolute;width:348px;top:69px;left:49px;"/>  
      <xui:place control="inputPhone" id="controlPlace11" style="position:absolute;width:147px;top:129px;left:49px;"/>  
      <xui:place control="inputFax" id="controlPlace12" style="position:absolute;width:147px;top:129px;left:250px;"/>  
      <xui:place control="inputAddress" id="controlPlace13" style="position:absolute;width:147px;top:159px;left:49px;"/>  
      <xui:place control="inputZip" id="controlPlace14" style="position:absolute;width:147px;left:248px;top:159px;"/>  
      <xui:place control="inputOrgKind" id="controlPlace15" style="position:absolute;width:147px;top:99px;left:49px;"/>  
      <xui:place control="receiver" id="controlPlace8" style="position:absolute;top:125px;left:491px;"/>  
      <xui:place control="gridOrg" id="controlPlace9" style="width:200px;height:100px;position:absolute;top:384px;left:94px;display:none;"/>  
      <xui:place control-label="inputParentFName" id="controlLabel2" style="position:absolute;top:12px;left:8px;"
        label="上级"/>  
      <xui:place control-label="inputName" id="controlLabel3" style="position:absolute;top:44px;left:8px;"/>  
      <xui:place control-label="inputLongName" id="controlLabel4" style="position:absolute;top:74px;left:7px;"/>  
      <xui:place control-label="inputPhone" id="controlLabel6" style="position:absolute;top:134px;left:8px;"/>  
      <xui:place control-label="inputAddress" id="controlLabel7" style="position:absolute;top:163px;height:1px;left:8px;"/>  
      <xui:place control-label="inputZip" id="controlLabel8" style="position:absolute;left:207px;top:164px;"/>  
      <xui:place control-label="inputCode" id="controlLabel9" style="position:absolute;top:44px;left:208px;"/>  
      <xui:place control-label="inputFax" id="controlLabel10" style="position:absolute;top:133px;left:208px;"/>  
      <xui:place control-label="inputOrgKind" id="controlLabel11" style="position:absolute;top:104px;left:7px;"
        label="类型"/>  
      <xui:place control="textareaDescription" id="controlPlace17" style="position:absolute;width:348px;height:70px;left:48px;top:223px;"/>  
      <xui:place control-label="textareaDescription" id="controlLabel13" style="position:absolute;left:7px;top:228px;"/> 
      <xui:place control="btnOK" id="controlPlace6" style="position:absolute;width:75px;left:240px;top:302px;"/>  
      <xui:place control="btnCancel" id="controlPlace7" style="position:absolute;width:75px;left:322px;top:302px;"/>  
    <xui:place control-label="simpleSelect1" id="controlLabel1" style="position:absolute;top:106px;left:208px;"></xui:place><xui:place control="simpleSelect1" id="controlPlace2" style="position:absolute;width:145px;top:99px;left:250px;"></xui:place>
  <xui:place control="treeSelect1" id="controlPlace16" style="position:absolute;top:192px;left:49px;width:346px;"></xui:place>
  <xhtml:label id="label1" style="position:absolute;left:7px;top:192px;" class="xui-label"><![CDATA[区域]]></xhtml:label>
  <xui:place control="btnClear" id="controlPlace10" style="position:absolute;top:192px;left:398px;"></xui:place></xui:layout> 
  <xhtml:div component="/UI/system/components/select.xbl.xml#simpleSelect" id="simpleSelect1" ref="data('dOrg')/sLevel" option-data="dOrgLevel" option-label="sName" option-value="sCode"></xhtml:div>
  <xhtml:div component="/UI/system/components/select.xbl.xml#treeSelect" delay="true" row-height="25" dropdown-class="xui-grid-hide-VLine xui-grid-hide-HLine" label-separator="," value-separator="," ext-separator="," id="treeSelect1" ref="data('dOrg')/sAreaId" label-ref="data('dOrg')/sAreaName" appearance="tree" onCloseup="orgDetail.treeSelect1Closeup" dropdown-height="170">
   <xforms:label id="default8" ref="fAreaName"></xforms:label>
   <xforms:value id="default9" ref="fAreaCode"></xforms:value>
   <xforms:itemset id="default10" data="areaData">
  <xforms:column ref="fAreaCode" id="default13"></xforms:column>
  <xforms:column ref="fAreaName" id="default14"></xforms:column></xforms:itemset></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnClear" appearance="image-text" class="button-green">
   <xforms:label id="default15"><![CDATA[清除]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[orgDetail.btnClearClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="orgDetail.js"/> 
  	<xhtml:script id="htmlScript2" src="/UI/system/service/org/orgUtils.js"></xhtml:script>
    <xhtml:script id="htmlScript3" src="/UI/SA/OPM/js/OpmUtils.js"></xhtml:script>
  </xui:resource> 
</xui:window>
