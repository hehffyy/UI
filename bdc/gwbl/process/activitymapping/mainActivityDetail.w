<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:423px;height:74px;top:421px;width:311px;"> 
    <data auto-load="false" component="/UI/system/components/data.xbl.xml#bizData" concept="B_ActivityMapping" confirm-refresh="false" data-type="json" direct-delete="true" id="detailData" limit="1" store-type="simple" update-mode="whereAll" filter-relations="B_ActivityMapping,version,fBizNo,fBrowseProcess,fBrowseActivity,fBizProcess,fExecutorexpr" onValueChanged="mainActivityDetail.detailDataValueChanged"> 
      <reader action="/bdc/gwbl/logic/action/queryB_ActivityMappingAction"/>  
      <writer action="/bdc/gwbl/logic/action/saveB_ActivityMappingAction"/>  
      <creator action="/bdc/gwbl/logic/action/createB_ActivityMappingAction"/> 
    </data> 
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="djdlBizData" concept="B_V_DJQLLX_BASE" order-by="PX asc">
   <reader id="default18" action="/bdc/gwbl/logic/action/queryB_V_DJQLLX_DJDLAction"></reader></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="qllxBizData" concept="B_V_DJQLLX_BASE" limit="-1" order-by="PX asc">
   <reader id="default11" action="/bdc/gwbl/logic/action/queryB_V_DJQLLX_DJXLAction"></reader>
   <master id="master1"></master></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="zmlBizData" concept="B_V_DJQLLX_BASE" order-by="PX asc"><reader id="default8" action="/bdc/gwbl/logic/action/queryB_V_DJQLLX_ZMLAction"></reader></data>
  <data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="sfxyrt" src="" auto-load="true" id="txData" store-type="simple"><rows xmlns="" id="default16">
   <row id="default17">
    <cell id="default23">是</cell></row> 
   <row id="default24">
    <cell id="default25">否</cell></row> 
   <row id="default26">
    <cell id="default27">不确定</cell></row> </rows></data>
  <data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="gisType" src="" auto-load="true" id="gisData" store-type="simple"><rows xmlns="" id="default60">
   <row id="default61">
    <cell id="default62">使用权</cell></row> 
   <row id="default63">
    <cell id="default64">所有权</cell></row> 
   <row id="default65">
    <cell id="default66">自然幢</cell></row> 
   <row id="default67">
    <cell id="default68">宗海使用权</cell></row> </rows></data></xforms:model>  
  <xui:view auto-load="true" id="rootView"> 
    <xui:view class="xui-container" id="detailView"> 
      <xui:layout id="layout1" style="height:100%;width:100%;position:relative;;position:relative;" type="absolute"> 
        <place control-label="iptFBrowseProcess" id="default3" style="position:absolute;font-size:large;left:45px;top:174px;text-align:left;" label="业务流程"/>  
        <place control="iptFBrowseProcess" id="default4" style="position: absolute;height:31px;top:166px;left:129px;width:792px;"/>  
        <place control-label="iptFBrowseActivity" id="default5" style="position:absolute;font-size:large;height:14px;top:219px;left:43px;width:81px;text-align:left;" label="业务环节"/>  
        <place control="iptFBrowseActivity" id="default6" style="position: absolute;width:200px;height:31px;left:129px;top:211px;"/>  
        <place control-label="iptFExecutorexpr" id="default9" style="position:absolute;font-size:large;left:337px;top:219px;text-align:right;"/>  
        <place control="iptFExecutorexpr" id="default10" style="position: absolute;width:461px;height:31px;left:460px;top:211px;"/> 
      <xhtml:label id="label2" class="xui-label" style="position:absolute;font-size:large;position:absolute;position:absolute;left:45px;top:129px;text-align:left;"><![CDATA[登记大类]]></xhtml:label>
  <xui:place control="gridSelect1" id="controlPlace4" style="font-size:large;position:absolute;height:31px;left:129px;top:125px;width:199px;"></xui:place>
  <xhtml:label id="label1" class="xui-label" style="position:absolute;font-size:large;position:absolute;left:374px;top:129px;text-align:right;"><![CDATA[登记小类]]></xhtml:label>
  <xui:place control="gridSelect2" id="controlPlace28" style="position:absolute;width:461px;height:31px;left:461px;top:126px;"></xui:place>
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="position:absolute;width:700px;height:38px;left:14px;top:5px;"><xui:place control="trigger1" id="controlPlace5"></xui:place>
  <xui:place control="trigger2" id="controlPlace6"></xui:place>
  <xui:place control="trigger3" id="controlPlace7"></xui:place>
  <xui:place control="trigger4" id="controlPlace8"></xui:place></xhtml:div>
  <xui:place control="gridSelect3" id="controlPlace9" style="position:absolute;height:31px;width:459px;left:461px;top:85px;"></xui:place>
  <xhtml:label id="label3" style="position:absolute;font-size:large;left:374px;top:88px;text-align:right;" class="xui-label"><![CDATA[证明类型]]></xhtml:label>
  <xui:place control="radio1" id="controlPlace10" style="position:absolute;width:195px;font-size:large;left:133px;top:85px;"></xui:place>
  <xhtml:label id="label4" style="position:absolute;font-size:large;left:45px;top:88px;text-align:left;" class="xui-label"><![CDATA[业务类型]]></xhtml:label>
  <xui:place control-label="input1" id="controlLabel1" style="position:absolute;font-size:large;height:27px;top:254px;left:43px;width:78px;text-align:left;" label="限办天数"></xui:place><xui:place control="input1" id="controlPlace11" style="position:absolute;height:31px;left:129px;top:253px;width:199px;"></xui:place>
  <xui:place control-label="input2" id="controlLabel2" style="position:absolute;font-size:large;left:370px;top:255px;height:26px;text-align:right;"></xui:place><xui:place control="input2" id="controlPlace12" style="position:absolute;top:252px;height:31px;left:461px;width:462px;"></xui:place>
  <xui:place control-label="input3" id="controlLabel3" style="position:absolute;font-size:large;top:298px;left:44px;height:25px;width:77px;" label="代码名称"></xui:place><xui:place control="input3" id="controlPlace13" style="position:absolute;top:293px;left:129px;width:792px;height:31px;"></xui:place>
  <xui:place control-label="input4" id="controlLabel4" style="position:absolute;top:338px;font-size:large;left:45px;"></xui:place><xui:place control="input4" id="controlPlace14" style="position:absolute;left:129px;width:792px;top:333px;height:31px;"></xui:place>
  <xui:place control-label="simpleSelect1" id="controlLabel6" style="position:absolute;top:383px;font-size:large;text-align:right;left:332px;width:115px;"></xui:place><xui:place control="simpleSelect1" id="controlPlace17" style="position:absolute;left:461px;height:31px;top:375px;"></xui:place>
  <xui:place control-label="simpleSelect2" id="controlLabel5" style="position:absolute;top:384px;font-size:large;left:45px;width:142px;"></xui:place><xui:place control="simpleSelect2" id="controlPlace15" style="position:absolute;left:131px;width:197px;top:376px;height:32px;"></xui:place></xui:layout>  
      <xforms:input id="iptFBrowseProcess" ref="data('detailData')/fBrowseProcess"></xforms:input>  
      <xforms:input id="iptFBrowseActivity" ref="data('detailData')/fBrowseActivity"></xforms:input>  
      <xforms:input id="iptFExecutorexpr" ref="data('detailData')/fExecutorexpr"></xforms:input> 
    <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="30" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect1" ref="data('detailData')/fdjdlbh" label-ref="data('detailData')/fdjdlmc">
   <xforms:label ref="MC" id="default28"></xforms:label>
   <xforms:value ref="CODE" id="default30"></xforms:value>
   <xforms:itemset id="default33" data="djdlBizData">
    
    
  <xforms:column ref="CODE" visible="false" id="default34"></xforms:column>
  <xforms:column ref="MC" id="default35"></xforms:column></xforms:itemset> </xhtml:div>
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="30" dropdown-class="xui-grid-hide-VLine xui-grid-hide-HLine" label-separator="," value-separator="," ext-separator="," id="gridSelect2" ref="data('detailData')/fdjxlbh" label-ref="data('detailData')/fdjxlmc" dropdown-height="400">
   <xforms:label ref="MC" id="default37"></xforms:label>
   <xforms:value ref="CODE" id="default38"></xforms:value>
   <xforms:itemset id="default39" data="qllxBizData">
    
    
  <xforms:column ref="CODE" visible="false" id="default36"></xforms:column>
  <xforms:column ref="MC" id="default40"></xforms:column></xforms:itemset> </xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" operation-owner="detailData" operation="new" appearance="image-minimal">
   <xforms:label id="default12"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" operation-owner="detailData" operation="save" appearance="image-minimal">
   <xforms:label id="default13"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" operation-owner="detailData" operation="delete" appearance="image-minimal">
   <xforms:label id="default14"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4" operation-owner="detailData" operation="refresh" appearance="image-minimal">
   <xforms:label id="default15"><![CDATA[]]></xforms:label></xforms:trigger>
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect3" ref="data('detailData')/fzmlbh" label-ref="data('detailData')/fzmlmc">
   <xforms:label ref="MC" id="default1"></xforms:label>
   <xforms:value ref="CODE" id="default2"></xforms:value>
   <xforms:itemset id="default7" data="zmlBizData">
  
  <xforms:column ref="CODE" visible="false" id="default31"></xforms:column>
  <xforms:column ref="MC" id="default32"></xforms:column></xforms:itemset></xhtml:div>
  <xforms:select1 ref="data('detailData')/fDjType" id="radio1">
   <xforms:item id="selectItem1">
    <xforms:label id="default19"><![CDATA[登记类]]></xforms:label>
    <xforms:value id="default20"><![CDATA[登记类]]></xforms:value></xforms:item> 
   <xforms:item id="selectItem2">
    <xforms:label id="default21"><![CDATA[证明类]]></xforms:label>
    <xforms:value id="default22"><![CDATA[证明类]]></xforms:value></xforms:item> </xforms:select1>
  <xforms:input id="input1" ref="data('detailData')/fxbts"></xforms:input>
  <xforms:input id="input2" ref="data('detailData')/fywdm" readonly="true"></xforms:input>
  <xforms:input id="input3" ref="data('detailData')/fywdmmc"></xforms:input>
  <xforms:input id="input4" ref="data('detailData')/fywjc"></xforms:input>
  <xhtml:div component="/UI/system/components/select.xbl.xml#simpleSelect" id="simpleSelect1" ref="data('detailData')/fSfxyrt" option-data="txData" option-label="sfxyrt" option-value="sfxyrt"></xhtml:div>
  <xhtml:div component="/UI/system/components/select.xbl.xml#simpleSelect" id="simpleSelect2" ref="data('detailData')/fGisType" option-data="gisData" option-label="gisType" option-value="gisType"></xhtml:div></xui:view>  
    <xui:layout style="width:100%;height:100%;"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%;height:100%;"> 
        <center id="borderLayout-center1"> 
          <place control="detailView" style="position:relative;"/> 
        </center>  
        <bottom id="borderLayout-bottom1" size="40px"> 
          <xui:place control="triggerCancel" id="controlPlace3" style="float:right;margin-left:8px;margin-right:20px;width:92px;"/>  
          <xui:place control="triggerOK" id="controlPlace2" style="float:right;width:86px;"/> 
        </bottom> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace1" style="top:492px;left:108px;"/> 
    </xui:layout>  
    <xforms:trigger appearance="image-text" class="button-green" icon-class=" " id="triggerOK"> 
      <xforms:label id="xuiLabel1">确定</xforms:label>  
      <xforms:action ev:event="DOMActivate" id="action1"> 
        <xforms:script id="xformsScript1">mainActivityDetail.triggerOKClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger appearance="image-text" icon-class=" " id="triggerCancel" class="button-green"> 
      <xforms:label id="xuiLabel2">取消</xforms:label>  
      <xforms:action ev:event="DOMActivate" id="action2"> 
        <xforms:script id="xformsScript2">mainActivityDetail.triggerCancelClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver" onReceive="mainActivityDetail.windowReceiverReceive"/> 
  </xui:view>  
  <resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="mainActivityDetail.js"/> 
  </resource> 
</xui:window>
