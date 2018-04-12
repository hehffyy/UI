<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:456px;top:191px;width:171px;height:73px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="B_smsInfo" concept="B_smsInfo" limit="1" auto-new="false" store-type="simple" direct-delete="true" confirm-delete="false"> 
      <reader id="default12" action="/common/mySMS/logic/action/queryB_smsInfoAction" />  
      <writer id="default13" action="/common/mySMS/logic/action/saveB_smsInfoAction" />  
      <creator id="default14" action="/common/mySMS/logic/action/createB_smsInfoAction" /> 
    </data><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="B_smsReceivePerson" concept="B_smsReceivePerson"
      limit="-1" confirm-delete="false" direct-delete="true"> 
      <reader id="default1" action="/common/mySMS/logic/action/queryB_smsReceivePersonAction"/>  
      <writer id="default2" action="/common/mySMS/logic/action/saveB_smsReceivePersonAction"/>  
      <creator id="default3" action="/common/mySMS/logic/action/createB_smsReceivePersonAction"/>  
      <calculate-relation relation="calculate4" id="calculate-relation1"/>  
      <master id="master1" data="B_smsInfo" relation="fSMSID"/> 
    </data>  
     
  <xforms:action id="action7" ev:event="onunload"><xforms:script id="xformsScript7"><![CDATA[sendSMSActivity.model1UnLoad(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="height:100%;width:100%;"> 
        <center id="borderLayout-center1"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout3" style="width:100%; height: 100%;;"> 
            <center id="borderLayout-center3"> 
              <xui:place control="view3" id="controlPlace6" style="height:100%;width:100%;"/> 
            </center> 
          </xhtml:div> 
        </center>  
        <left size="330px" id="borderLayout-left1" style="border-left:2px solid #CCC;"> 
          <xui:place control="grid2" id="controlPlace5" style="height:100%;width:100%;"/> 
        </left>  
        <top size="40px" id="borderLayout-top3"> 
          <xui:place control="view5" id="controlPlace12" style="height:100%;width:100%;"/> 
        </top> 
      </xhtml:div> 
    <xui:place control="windowReceiver" id="controlPlace3" style="position:absolute;top:101px;left:354px;"></xui:place></xui:layout>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="30" row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="50" id="grid2" data="B_smsReceivePerson"> 
      <xui:column id="gridColumn6" ref="calculate4" label="序号" type="ro" width="50px"
        align="center" readonly="true" show-index="true"/>  
      <xui:column id="gridColumn4" ref="fPersonName" label="名称" type="ro" width="100px"
        align="center" readonly="true"/>  
      <xui:column id="gridColumn5" ref="fPhone" label="电话" type="ro" width="150px"
        align="center" readonly="true"/> 
    </xhtml:div>  
    <xui:view auto-load="true" id="view3" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout3"> 
        <xui:place control="textarea2" id="controlPlace7" style="position:absolute;left:15px;width:450px;height:400px;top:45px;"/>  
        <xhtml:label id="label3" style="position:absolute;font-weight:bold;top:15px;left:20px;"
          class="xui-label"><![CDATA[短信内容:]]></xhtml:label>  
        <xui:place control="personDialog" id="controlPlace17" style="position:absolute;top:22px;left:156px;"/>  
        <xui:place control="checkbox1" id="controlPlace9" style="top:9px;left:389px;position:absolute;"/>  
        <xui:place control="templateDialog" id="controlPlace1" style="position:absolute;top:25px;left:263px;"/>  
        <xui:place control="orgDialog" id="controlPlace2" style="position:absolute;top:24px;left:351px;"/> 
      <xui:place control="textarea1" id="controlPlace8" style="width:450px;height:400px;top:45px;position:absolute;left:475px;"></xui:place>
  <xhtml:label id="label1" class="xui-label" style="position:absolute;font-weight:bold;top:15px;position:absolute;left:485px;"><![CDATA[微信内容:]]></xhtml:label>
  <xhtml:label id="label2" class="xui-label" style="position:absolute;font-weight:bold;position:absolute;position:absolute;color:red;top:15px;left:600px;"><![CDATA[注:微信内容不为空时，同时发送微信提醒。]]></xhtml:label></layout>  
      <xforms:textarea ref="data('B_smsInfo')/fSMSContent" id="textarea2"/>  
      <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
        title="请输入人员名称和电话号码" width="450px" height="200px" modal="true" id="personDialog"
        url="/UI/common/mySMS/process/mySMS/personPhoneActivity.w" reload-on-open="true"
        status="minimize" resizable="false" minmaxable="false" onReceive="sendSMSActivity.personDialogReceive"/>  
      <xforms:select id="checkbox1" ref="data('B_smsInfo')/fIsReplay"> 
        <xforms:item id="selectItem1"> 
          <xforms:label id="default4">是否回复</xforms:label>  
          <xforms:value id="default5">1</xforms:value> 
        </xforms:item> 
      </xforms:select>  
      <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
        title="号码模版选择" width="450px" height="400px" modal="true" id="templateDialog"
        url="/UI/common/mySMS/process/mySMS/templateDialog.w" reload-on-open="true"
        status="minimize" resizable="false" minmaxable="false" onReceive="sendSMSActivity.templateDialogReceive"/>  
      <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title="人员选择"
        width="600px" height="500px" modal="true" org-kinds="psm" root-filter="SA_OPOrg.sParent is null and SA_OPOrg.sName&lt;&gt;'博通股份'"
        show-common-group="true" filter="SA_OPOrg.sOrgKindID &lt;&gt; 'pos' and instr(SA_OPOrg.sFID,'.pos/') = 0"
        id="orgDialog" reload-on-open="true" multi-select="true" onReceive="sendSMSActivity.orgDialogReceive"/> 
    <xforms:textarea ref="data('B_smsInfo')/fWXContent" id="textarea1"></xforms:textarea></xui:view>  
    <xui:view auto-load="true" id="view5" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout5"> 
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar1" style="position:absolute;left:5px;top:5px;" separator-size="5"> 
          <xui:place control="trigger1" id="controlPlace13" style="width:100px;"/>  
          <xui:place control="trigger2" id="controlPlace14" style="width:100px;"/>  
          <xui:place control="trigger3" id="controlPlace15" style="width:100px;"/>  
          <xui:place control="trigger4" id="controlPlace16"/>  
          <xui:place control="trigger5" id="controlPlace18" style="width:80px;"/> 
        <xui:place control="trigger6" id="controlPlace4" style="width:100px;"></xui:place></xhtml:div> 
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
        appearance="image-text" class="button-blue" icon-class="icon-system-users"> 
        <xforms:label id="default15"><![CDATA[电话号薄]]></xforms:label>  
        <xforms:action id="action4" ev:event="DOMActivate">
          <xforms:script id="xformsScript4"><![CDATA[sendSMSActivity.trigger1Click(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
        appearance="image-text" class="button-blue" icon-class="icon-system-users"> 
        <xforms:label id="default16"><![CDATA[从模版添加]]></xforms:label>  
        <xforms:action id="action3" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript3"><![CDATA[sendSMSActivity.trigger2Click(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3"
        appearance="image-text" class="button-blue" icon-class="icon-system-user-add"> 
        <xforms:label id="default17"><![CDATA[自定义添加]]></xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript1"><![CDATA[sendSMSActivity.trigger3Click(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4"
        appearance="image-text" class="button-orange" icon-class="icon-system-trash"> 
        <xforms:label id="default18"><![CDATA[删除]]></xforms:label> 
      <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[sendSMSActivity.trigger4Click(event)]]></xforms:script></xforms:action></xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5"
        appearance="image-text" class="button-green" icon-class="icon-system-play"> 
        <xforms:label id="default19"><![CDATA[发送]]></xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript2"><![CDATA[sendSMSActivity.trigger5Click(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger> 
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger6" appearance="image-text" class="button-yellow" icon-class="icon-system-cancel">
   <xforms:label id="default28"><![CDATA[取消发送]]></xforms:label>
  <xforms:action id="action6" ev:event="DOMActivate"><xforms:script id="xformsScript6"><![CDATA[sendSMSActivity.trigger6Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view> 
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver" onReceive="sendSMSActivity.windowReceiverReceive"></xhtml:div></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="sendSMSActivity.js"/> 
  </xui:resource> 
</xui:window>
