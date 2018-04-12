<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="top:150px;left:233px;height:auto;">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="t_ldjbsxxxb" concept="t_ldjbsxxxb" limit="1" auto-new="true" store-type="simple"><creator id="default1" action="/EGovSys/OaSys/OaFuncs/ldjbsx/logic/action/createT_ldjbsxxxbAction"></creator>
  <reader id="default2" action="/EGovSys/OaSys/OaFuncs/ldjbsx/logic/action/queryT_ldjbsxxxbAction"></reader>
  <writer id="default3" action="/EGovSys/OaSys/OaFuncs/ldjbsx/logic/action/saveT_ldjbsxxxbAction"></writer></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1">
          <xui:place control="view3" id="controlPlace6" style="height:100%;width:100%;"/>
        </center>  
        <bottom size="50px" id="borderLayout-bottom1"> 
          <xui:place control="btnCancel" id="controlPlace1" style="float:right;margin:5px 20px 0 0;"/>
          <xui:place control="btnEnsure" id="controlPlace2" style="float:right;margin:5px 20px 0 0;"/>
        </bottom>
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace3" style="position:absolute;top:53px;left:482px;"/>
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnEnsure"
      class="button-green"> 
      <xforms:label id="default5">确定</xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate">
        <xforms:script id="xformsScript2"><![CDATA[changeToOther.btnEnsureClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancel"> 
      <xforms:label id="default4">取消</xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate">
        <xforms:script id="xformsScript1"><![CDATA[changeToOther.btnCancelClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="changeToOther.windowReceiverReceive"/>  
    <xui:view auto-load="true" id="view3" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout3">
        <xhtml:label id="label3" style="position:absolute;top:15px;left:20px;width:50px;text-align:right;"
          class="xui-label"><![CDATA[标题]]></xhtml:label>  
        <xui:place control="title" id="controlPlace8" style="position:absolute;height:30px;top:10px;left:80px;width:550px;"/>  
        <xui:place control="view4" id="controlPlace9" style="position:absolute;top:50px;border:1px solid #ccc;left:80px;width:548px;height:80px;"/>  
        <xhtml:label id="label1" style="position:absolute;top:50px;left:20px;width:50px;text-align:right;"
          class="xui-label"><![CDATA[附件]]></xhtml:label>  
        <xhtml:label id="label2" style="position:absolute;left:20px;top:140px;width:50px;text-align:right;"
          class="xui-label"><![CDATA[承办人]]></xhtml:label>  
        <xhtml:label id="label4" style="position:absolute;left:20px;top:185px;width:50px;text-align:right;"
          class="xui-label"><![CDATA[交办内容]]></xhtml:label>  
        <xui:place control="textarea1" id="controlPlace5" style="position:absolute;left:80px;width:550px;top:180px;height:200px;"/>  
        <xui:place control="orgSelect2" id="controlPlace7" style="height:30px;position:absolute;left:80px;top:140px;width:548px;"/>
      </layout>  
      <xforms:input id="title" ref="data('t_ldjbsxxxb')/bt"/>  
      <xui:view auto-load="true" id="view4" class="xui-container"> 
        <layout type="absolute" style="position:relative;" id="layout4">
          <xui:place control="attachmentEditor21" id="controlPlace4" style="position:absolute;height:100%;width:100%;"/>
        </layout>  
        <xhtml:div component="/UI/system/components/attachmentEditor2.xbl.xml#attachmentEditor2"
          display-buttons="upload:true;download:true;delete:true;template:false;edit:false;history:false;"
          limit="-1" runtime="html4" id="attachmentEditor21" class="xui-attachmentEditor2"
          ref="data('t_ldjbsxxxb')/fj"/>
      </xui:view>  
      <xforms:textarea ref="data('t_ldjbsxxxb')/jbyj" id="textarea1"/>  
      <xhtml:div component="/UI/system/components/orgSelect.xbl.xml#orgSelect" id="orgSelect2"
        show-org-types="psm" selectable-org-types="psm"> 
        <xforms:model id="model3"> 
          <xui:data component="/UI/system/components/data.xbl.xml#bizData" id="bizData2"> 
            <tree-option id="default26" root-filter="SA_OPOrg.sParent = :currentDeptID()"/>
          </xui:data> 
        </xforms:model>  
        <xhtml:div class="xui-autofill" component="/UI/system/components/select.xbl.xml#treeSelect"
          id="treeSelect2" data-ref="bizData2" ref="data('t_ldjbsxxxb')/blr_DATA"
          label-ref="data('t_ldjbsxxxb')/blr" dropdown-height="200"> 
          <xforms:itemset id="default21"/>  
          <xforms:value id="default22" ref="sPersonID"/>  
          <xforms:label id="default23" ref="sName"/>
        </xhtml:div> 
      </xhtml:div>
    </xui:view>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="changeToOther.js"/>
  </xui:resource> 
</xui:window>
