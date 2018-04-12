<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="top:245px;left:31px;height:auto;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="personSignImg" concept="B_PersonSignImage"
      onRefreshCreateParam="personSignImage.personSignImgRefreshCreateParam" onAfterNew="personSignImage.personSignImgAfterNew" onAfterDelete="personSignImage.personSignImgAfterDelete" onNewCreateParam="personSignImage.personSignImgNewCreateParam"> 
      <creator id="default1" action="/base/personInfo/logic/action/createB_PersonSignImageAction"/>  
      <reader id="default2" action="/base/personInfo/logic/action/queryB_PersonSignImageAction"/>  
      <writer id="default3" action="/base/personInfo/logic/action/saveB_PersonSignImageAction"/>  
      <filter name="filter0" id="filter1"><![CDATA[B_PersonSignImage.fPersonID=:pid]]></filter> 
    </data>  
    </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:99%;" id="rootLayout"> 
      <xui:place control="windowReceiver" id="controlPlace2" style="position:absolute;top:178px;left:362px;"/>  
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="220px"
        mode="horz" id="HSplitter1" class="xui-splitter" style="width:100%;height:100%;"> 
        <xhtml:div region="left" id="div1"> 
          <xui:place control="grid3" id="controlPlace4" style="height:100%;width:100%;"/> 
        </xhtml:div>  
        <xhtml:div region="right" id="div2"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout1" style="width:100%; height: 100%;;"> 
            <top size="38px" id="borderLayout-top1"> 
              <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                id="buttonBar1" style=";margin-top:5px;margin-left:5px;" separator-size="4"> 
                <xui:place control="trigger1" id="controlPlace6"/>  
                <xui:place control="trigger4" id="controlPlace9"/> 
              <xui:place control="trigger3" id="controlPlace11"></xui:place></xhtml:div> 
            </top>  
            <center id="borderLayout-center1"> 
              <xui:place control="view1" id="controlPlace5"/> 
            </center> 
          <bottom size="40px" id="borderLayout-bottom1" style="padding-top:5px"><xui:place control="btnCancel" id="controlPlace7" style="width:75px;float:right"></xui:place>
  <xui:place control="btnApply" id="controlPlace1" style="width:75px;float:right"></xui:place></bottom></xhtml:div> 
        </xhtml:div> 
      </xhtml:div> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="personSignImage.windowReceiverReceive"/>  
    <xhtml:div class="grid-compact xui-no-border" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid3" data="personSignImg"> 
      <xui:column id="gridColumn1" ref="fName" label="标题" type="ed" width="*"></xui:column></xhtml:div>  
    <xui:view auto-load="true" id="view1" class="xui-autofill xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xui:place control="radio1" id="controlPlace10" style="position:absolute;top:9px;width:95px;left:351px;"/>  
        <xhtml:label id="label2" style="position:absolute;top:206px;left:190px;" class="xui-label"><![CDATA[最后修改时间:]]></xhtml:label>  
        <xui:place control="output1" id="controlPlace12" style="position:absolute;width:150px;top:206px;left:298px;"/>  
        <xui:place control="blobImage" id="controlPlace13" style="position:absolute;height:148px;top:46px;left:21px;width:425px;"/>  
        <xui:place control="input2" id="controlPlace3" style="position:absolute;top:9px;left:83px;height:5px;width:253px;"></xui:place>
  <xhtml:label id="label3" style="position:absolute;top:9px;left:21px;" class="xui-label"><![CDATA[标题:]]></xhtml:label>
  <xhtml:label id="label4" style="position:absolute;top:206px;left:21px;" class="xui-label"><![CDATA[图片尺寸:]]></xhtml:label>
  <xui:place control="output2" id="controlPlace8" style="position:absolute;top:206px;left:99px;height:5px;width:84px;"></xui:place></layout>  
      <xforms:select1 ref="data('personSignImg')/fValid" id="radio1"> 
        <xforms:item id="selectItem1"> 
          <xforms:label id="default8"><![CDATA[启用]]></xforms:label>  
          <xforms:value id="default9"><![CDATA[Y]]></xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem2"> 
          <xforms:label id="default10"><![CDATA[禁用]]></xforms:label>  
          <xforms:value id="default11"><![CDATA[N]]></xforms:value> 
        </xforms:item> 
      </xforms:select1>  
      <xforms:output id="output1" ref="data('personSignImg')/fLastUpdateTime"/>  
      <xhtml:div component="/UI/system/components/blob.xbl.xml#image" id="blobImage"
        data="personSignImg" concept="B_PersonSignImage" relation="fImage" stretch="false" onSubmit="personSignImage.blobImageSubmit" onRefresh="personSignImage.blobImageRefresh"/>  
      <xforms:input id="input2" ref="data('personSignImg')/fName"></xforms:input>
  <xforms:output id="output2" ref="data('personSignImg')/fImgSize"></xforms:output></xui:view>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
      appearance="image-text" class="button-blue" operation-owner="personSignImg"
      operation="new"> 
      <xforms:label id="default4"><![CDATA[新增]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4"
      appearance="image-minimal" operation-owner="personSignImg" operation="delete"> 
      <xforms:label id="default7"><![CDATA[删除]]></xforms:label> 
    </xforms:trigger> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" operation-owner="personSignImg" operation="save" appearance="image-minimal">
   <xforms:label id="default6"><![CDATA[]]></xforms:label></xforms:trigger>
  <xforms:trigger id="btnCancel" appearance="minimal">
   <xforms:label id="xuiLabel2">取消</xforms:label>
   <xforms:action id="action3" ev:event="DOMActivate">
    <xforms:script id="xformsScript3">personSignImage.btnCancelClick(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnApply" class="button-green" appearance="image-text">
   <xforms:label id="default5">确定</xforms:label>
   <xforms:action id="action4" ev:event="DOMActivate">
    <xforms:script id="xformsScript4">personSignImage.btnApplyClick(event)</xforms:script></xforms:action> </xforms:trigger></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="personSignImage.js"/> 
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="personSignImage.css"></xhtml:link></xui:resource> 
</xui:window>
