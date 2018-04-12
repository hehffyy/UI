<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:658px;top:118px;">
   <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="bizData_AJGQJL" concept="B_AJGQJLB" store-type="simple" auto-new="false" limit="1" onRefreshCreateParam="bujiaoDialog.bizData_AJGQJLRefreshCreateParam" confirm-refresh="false">
    <creator id="default4" action="/base/core/flowOperation/logic/action/createB_AJGQJLBAction"></creator>
    <reader id="default8" action="/base/core/flowOperation/logic/action/queryBizRecSuspendingGQJLAction"></reader>
    <writer id="default9"></writer>
    <rule id="dataBizRule4" relation="fGQYY" required="true()" alert="'请录入补正原因!'"></rule></data> 
   <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="bizData_BJGZ" concept="B_BZGZ" store-type="simple" auto-new="false" limit="1">
    <creator id="default5" action="/base/core/flowOperation/logic/action/createB_BZGZAction"></creator>
    <reader id="default6" action="/base/core/flowOperation/logic/action/queryB_BZGZAction"></reader>
    <writer id="default7"></writer>
    <master id="master1" data="bizData_AJGQJL" relation="fAJGQJL"></master>
    <rule id="dataBizRule3" relation="FGUID" alert="'请选择或者添加需要补正的材料'" constraint="boolean(eval('justep.xbl(&quot;bizData_CLLB&quot;).getCount()&gt;0'))"></rule></data> 
   <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="bizData_CLLB" concept="B_BZCLQD" limit="-1" confirm-delete="false">
    <reader id="default11" action="/base/core/flowOperation/logic/action/queryB_BZCLQDAction"></reader>
    <writer id="default12"></writer>
    <creator id="default13" action="/base/core/flowOperation/logic/action/createB_BZCLQDAction"></creator>
    <master id="master2" data="bizData_BJGZ" relation="fBZGZ"></master>
    <calculate-relation relation="checkNo" id="calculate-relation1" type="xsd:string"></calculate-relation>
    <rule id="dataBizRule2" relation="fCLMC" readonly="data('bizData_CLLB')/fCLBH != '补充材料'"></rule>
    <calculate-relation relation="oldCL" id="calculate-relation2" type="xsd:boolean"></calculate-relation>
    <filter name="filter0" id="filter1"><![CDATA[B_BZCLQD.fCLQR<>'已确认']]></filter>
    </data> 
  </xforms:model><xui:view id="rootView" auto-load="true"> 
    <xui:layout style="margin:0 auto;height:100%;width:850px;" id="rootLayout" type="flow"> 
      <xui:place control="view2" id="controlPlace1" style="width:100%;height:216px;position:relative;"/>  
      <xui:place control="view3" id="controlPlace4" style="height:197px;width:100%;position:relative;"/>  
      <xui:place control="view4" id="controlPlace5" style="position:relative;width:100%;height:30px;"/>  
      <xui:place control="receiver1" id="controlPlace6" style="left:5px;top:194px;"/> 
    </xui:layout>  
    <xui:view auto-load="true" id="view2" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout2"> 
        <xhtml:div id="div1" style="margin:0 auto;height:40px;padding-top:8px;width:100%;"> 
          <xui:place control="btnAddCL" id="controlPlace9" style="width:80px;"/>  
          <xui:place control="btnBCCL" id="controlPlace13" style="width:80px;"/>  
          <xui:place control="btnRemoveCL" id="controlPlace10" style="width:80px;"/> 
        </xhtml:div>  
        <xhtml:div id="div2" style="margin:0 auto;height:150px;width:100%;"> 
          <xui:place control="gridCLLB" id="controlPlace11" style="margin:0 auto;height:100%;width:100%;"/> 
        </xhtml:div> 
      <xui:place control="materialDlg" id="controlPlace7" style="position:absolute;left:86px;top:82px;"></xui:place></layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnAddCL"
        appearance="image-minimal" icon-class="icon-system-plus"> 
        <xforms:label id="default16">添加材料</xforms:label>  
        <xforms:action id="action5" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript5">bujiaoDialog.btnAddCLClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBCCL"
        appearance="image-minimal" icon-class="icon-system-vcard"> 
        <xforms:label id="default18">补充材料</xforms:label>  
        <xforms:action id="action3" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript3">bujiaoDialog.btnBCCLClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnRemoveCL"
        icon-class="icon-system-minus" appearance="image-minimal"> 
        <xforms:label id="default17">移除材料</xforms:label>  
        <xforms:action id="action4" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript4">bujiaoDialog.btnRemoveCLClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
        header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
        smart-render="20" id="gridCLLB" data="bizData_CLLB" multi-selection="false"
        edit-mode="true" space-column="false"> 
        <xui:column id="gridColumn1" ref="checkNo" type="ch" width="28px" label="#master_checkbox"/>  
        <xui:column id="gridColumn3" ref="fCLMC" label="材料名称" type="ed" width="570px"/>  
        <xui:column id="gridColumn4" ref="fSWCL" label="实物材料" type="ch" width="72px"
          checked-value="是" unchecked-value="否" align="center"/>  
        <xui:column id="gridColumn2" ref="fCLQR" label="材料确认" type="ch" width="72px"
          visible="false" checked-value="已确认" unchecked-value="待确认" align="center"/> 
      <xui:column id="gridColumn5" ref="fBLYCL" label="保留原材料" type="ch" width="85px" align="center" checked-value="保留" unchecked-value="不保留" visible="false"></xui:column></xhtml:div> 
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="材料选择" width="400px" height="300px" modal="true" id="materialDlg" url="/UI/base/core/components/material/materialSelect.w" status="maximize" onReceive="bujiaoDialog.materialDlgReceive" reload-on-open="true"></xhtml:div></xui:view>  
    <xui:view auto-load="true" id="view3" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout3"> 
        <xhtml:div id="div3" style="margin:0 auto;width:100%;"> 
          <xhtml:label id="label1" class="xui-label">补正原因</xhtml:label> 
        </xhtml:div>  
        <xhtml:div id="div4" class="xui-container" style="height:150px;width:100%;"> 
          <xui:place control="textarea1" id="controlPlace14" style="margin:0 auto;height:100%;width:100%;"/> 
        </xhtml:div> 
      </layout>  
      <xforms:textarea ref="data('bizData_AJGQJL')/fGQYY" id="textarea1"/> 
    </xui:view>  
    <xui:view auto-load="true" id="view4" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout4"> 
        <xui:place control="cancelBtn" id="controlPlace3" style="float:right;"/>  
        <xui:place control="sureBtn" id="controlPlace2" style="float:right;margin-right:10px"/> 
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn"
        appearance="image-text" class="button-blue"> 
        <xforms:label id="default2">取消</xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript1">bujiaoDialog.cancelBtnClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn"
        appearance="image-text" class="button-blue"> 
        <xforms:label id="default1">确定</xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript2">bujiaoDialog.sureBtnClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="receiver1" onReceive="bujiaoDialog.receiver1Receive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" loadKO="true" src="/UI/base/lib/init.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/system/components/process/process.js"/>  
    <xhtml:script id="htmlScript3" src="bujiaoDialog.js"/>  
    </xui:resource> 
</xui:window>
