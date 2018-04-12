<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xhtml="http://www.w3.org/1999/xhtml">  
  <xforms:model id="model1" style="left:72px;height:auto;top:209px;"/>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;;">
   <top size="37px" id="borderLayout-top1">
    <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="height:33px;width:650px;">
     <xui:place control="btnYs" id="controlPlace2" style="width:85px;"></xui:place>
     <xui:place control="trigger1" id="controlPlace4" style="width:85px;"></xui:place></xhtml:div> </top> 
   <center id="borderLayout-center1">
    <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1" class="xui-tabPanel" style="height:100%;width:100%;">
     <xui:tab id="tabPage1">
      <xui:label id="xuiLabel1">列表</xui:label>
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
       <top size="0px" id="borderLayout-top2"></top>
       <center id="borderLayout-center2">
        <xui:place control="gridMain" id="controlPlace6" style="height:100%;width:100%;"></xui:place></center> 
       <bottom size="42px" id="borderLayout-bottom1">
        <xui:place control="pagination1" id="controlPlace7" style="width:100%;height:100%;"></xui:place></bottom> </xhtml:div> </xui:tab> 
     <xui:tab id="tabPage2">
      <xui:label id="xuiLabel2">详细信息</xui:label>
      <xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></xui:tab> 
     </xhtml:div> </center> </xhtml:div></xui:layout> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnYs" icon-class="icon-system-login" appearance="image-minimal">
   <xforms:label id="default1"><![CDATA[缴费通通知]]></xforms:label>
   </xforms:trigger>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="gridMain" data="dsRec">
   <xui:column id="gridColumn7" ref="fBizRecId" label=" 序号 " type="ro" width="72px" show-index="true" readonly="true" align="center"></xui:column>
   <xui:column id="gridColumn2" ref="fYWLX" label="业务类型" type="ed" width="234px" readonly="true" align="center"></xui:column>
   <xui:column id="gridColumn1" ref="fSerialNo" label="网上受理号" type="ed" width="134px" readonly="false"></xui:column>
   <xui:column id="gridColumn3" ref="fXMMC" label="项目名称" type="ed" width="229px" readonly="true"></xui:column>
   <xui:column id="gridColumn4" ref="fLWRQ" label="来文日期" type="ed" width="121px" readonly="true"></xui:column>
   <xui:column id="gridColumn10" ref="fRemainDays" type="ed" width="100px" label="剩余天数"></xui:column>
   <xui:column id="gridColumn5" ref="fSQDW" label="申请单位" type="ed" width="174px" readonly="true"></xui:column>
   <xui:column id="gridColumn8" ref="fSFXYSW" label="是否需要实物" type="ed" width="100px"></xui:column>
   <xui:column id="gridColumn6" ref="fStatus" label="案卷状态" type="ed" width="100px"></xui:column></xhtml:div>
  <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next" id="pagination1" data="dsRec"></xhtml:div>
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1">
    <xhtml:label id="label1" style="position:absolute;left:25px;top:38px;" class="xui-label">事项名称：</xhtml:label>
    <xui:place control="input1" id="controlPlace3" style="position:absolute;top:38px;width:179px;left:108px;"></xui:place>
    <xhtml:label id="label2" class="xui-label" style="position:absolute;left:25px;position:absolute;top:93px;">项目名称：</xhtml:label>
    <xui:place control="input2" id="controlPlace8" style="position:absolute;top:93px;left:108px;width:497px;"></xui:place>
    <xhtml:label id="label3" class="xui-label" style="position:absolute;left:25px;position:absolute;position:absolute;top:153px;">申请单位：</xhtml:label>
    <xui:place control="input3" id="controlPlace9" style="position:absolute;height:6px;top:153px;left:108px;width:498px;"></xui:place>
    <xhtml:label id="label4" class="xui-label" style="position:absolute;left:25px;position:absolute;position:absolute;position:absolute;top:216px;">申请人：</xhtml:label>
    <xui:place control="input4" id="controlPlace10" style="position:absolute;top:216px;width:180px;left:108px;"></xui:place>
    <xhtml:label id="label5" class="xui-label" style="position:absolute;position:absolute;position:absolute;position:absolute;top:216px;position:absolute;left:325px;">申请人手机：</xhtml:label>
    <xui:place control="input6" id="controlPlace13" style="top:216px;position:absolute;height:17px;width:183px;left:422px;"></xui:place>
    <xhtml:label id="label6" class="xui-label" style="position:absolute;left:25px;position:absolute;position:absolute;position:absolute;top:216px;;position:absolute;">申请人：</xhtml:label>
    <xhtml:label id="label8" class="xui-label" style="position:absolute;left:25px;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;top:275px;">来文日期：</xhtml:label>
    <xui:place control="input7" id="controlPlace14" style="height:6px;position:absolute;top:275px;width:182px;left:106.5px;"></xui:place>
    <xhtml:label id="label9" class="xui-label" style="position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;left:25px;top:402px;">办理条件：</xhtml:label>
    <xui:place control="textarea1" id="controlPlace12" style="position:absolute;width:495px;left:111px;top:343px;"></xui:place>
    <xhtml:label id="label7" class="xui-label" style="position:absolute;top:38px;position:absolute;left:325px;">业务类型：</xhtml:label>
    <xhtml:label id="label10" class="xui-label" style="position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;top:275px;position:absolute;left:325px;">接收日期：</xhtml:label>
    <xui:place control="input8" id="controlPlace16" style="height:6px;top:275px;width:182px;position:absolute;left:422px;"></xui:place>
    <xui:place control="input5" id="controlPlace15" style="top:38px;width:179px;position:absolute;left:426px;"></xui:place>
    <xui:place control="btnBizType" id="controlPlace18" style="position:absolute;left:613px;top:36.5px;"></xui:place></layout> 
   <xforms:input id="input1" ref="data('dsRec')/fYWLX" readonly="true"></xforms:input>
   <xforms:input id="input2" ref="data('dsRec')/fXMMC" readonly="true"></xforms:input>
   <xforms:input id="input3" ref="data('dsRec')/fSQDW" readonly="true"></xforms:input>
   <xforms:input id="input4" ref="data('dsRec')/fSQRXM" readonly="true"></xforms:input>
   <xforms:input id="input6" ref="data('dsRec')/fSQRSJ" readonly="true"></xforms:input>
   <xforms:textarea ref="data('dsRec')/fBLTJ" id="textarea1" readonly="true"></xforms:textarea>
   <xforms:input id="input7" ref="data('dsRec')/fLWRQ" readonly="true"></xforms:input>
   <xforms:input id="input8" ref="data('dsRec')/fJSSJ" readonly="true"></xforms:input>
   <xforms:input id="input5" ref="data('dsRec')/fProcessName" readonly="true"></xforms:input>
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnBizType">
    <xforms:label id="default2">选择</xforms:label>
    <xforms:action id="action1" ev:event="DOMActivate">
     <xforms:script id="xformsScript1">mainActivity.btnBizTypeClick(event)</xforms:script></xforms:action> </xforms:trigger> </xui:view>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" icon-class="icon-system-login" appearance="image-minimal">
   <xforms:label id="default3"><![CDATA[邮寄通知]]></xforms:label></xforms:trigger></xui:view>  
  <xui:resource id="resource1"/> 
</xui:window>
