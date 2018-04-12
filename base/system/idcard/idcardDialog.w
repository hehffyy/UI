<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="left:58px;height:auto;top:456px;">
    <xforms:action id="action3" ev:event="onload">
      <xforms:script id="xformsScript3"><![CDATA[idcardDialog.modelLoad(event)]]></xforms:script>
    </xforms:action>
  <xforms:action id="action4" ev:event="xbl-loaded"><xforms:script id="xformsScript4"><![CDATA[idcardDialog.modelXBLLoaded(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="margin:0 auto;height:100%;width:660px;" id="rootLayout">
      <xui:place control="view1" id="controlPlace1" style="width:98%;border-style:double double double double;border-width:5px 5px 5px 5px;border-color:#A9CEF3 #A9CEF3 #A9CEF3 #A9CEF3;height:274px;top:10px;"/>  
      <xui:place control="view4" id="controlPlace5" style="height:53px;position:relative;width:100%;"/>  
      <xui:place control="sysReceiver" id="controlPlace4" style="position:absolute;top:402px;left:310px;"/> 
    </xui:layout>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1">
        <xhtml:label id="label1" class="cardLable" style="position:absolute;top:36px;left:23px;"><![CDATA[姓  名]]></xhtml:label>  
        <xhtml:label id="lblName" class="cardValue" style="position:absolute;left:76px;top:32px;"><![CDATA[未识别]]></xhtml:label>  
        <xhtml:label id="label2" class="cardLable" style="position:absolute;position:absolute;left:23px;top:75px;"><![CDATA[性  别]]></xhtml:label>  
        <xhtml:label id="lblSex" class="cardValue" style="position:absolute;position:absolute;left:76px;top:73px;"><![CDATA[]]></xhtml:label>  
        <xhtml:label id="label4" class="cardLable" style="position:absolute;position:absolute;position:absolute;left:141px;top:75px;"><![CDATA[民  族]]></xhtml:label>  
        <xhtml:label id="lblMz" class="cardValue" style="position:absolute;position:absolute;position:absolute;left:188px;top:73px;"><![CDATA[]]></xhtml:label>  
        <xhtml:label id="label6" class="cardLable" style="position:absolute;position:absolute;position:absolute;left:23px;top:117px;"><![CDATA[出  生]]></xhtml:label>  
        <xhtml:label id="label7" class="cardLable" style="position:absolute;position:absolute;position:absolute;left:23px;top:158px;"><![CDATA[住  址]]></xhtml:label>  
        <xhtml:label id="lblBorn" class="cardValue" style="position:absolute;position:absolute;left:76px;top:117px;"><![CDATA[]]></xhtml:label>  
        <xhtml:label id="lblAddr" class="cardValue" style="position:absolute;position:absolute;left:76px;top:154px;"><![CDATA[]]></xhtml:label>  
        <xhtml:img src="/UI/base/icons/img/person.png" alt="" id="PhotoDisplay" style="position:absolute;border-style:dashed dashed dashed dashed;border-width:2px 2px 2px 2px;border-color:#E6EBFF #E6EBFF #E6EBFF #E6EBFF;height:117px;width:104px;left:438px;top:69.5px;"/>  
        <xhtml:label id="label10" class="cardLable" style="position:absolute;position:absolute;position:absolute;left:23px;position:absolute;top:234px;"><![CDATA[公民身份证号码]]></xhtml:label>  
        <xhtml:label id="lblCardNo" class="cardNumValue" style="position:absolute;position:absolute;position:absolute;left:157px;top:230px;"><![CDATA[]]></xhtml:label>  
        <xui:place control="btnRead" id="controlPlace6" style="position:absolute;width:88px;left:448px;top:4px;"/>
      <xhtml:label id="label3" class="cardLable" style="position:absolute;position:absolute;position:absolute;position:absolute;left:23px;top:198.5px;"><![CDATA[有效期]]></xhtml:label>
  <xhtml:label id="lblDate" class="cardNumValue" style="position:absolute;position:absolute;position:absolute;left:157px;top:196px;"></xhtml:label>
  <xhtml:div id="divPhoto" style="position:absolute;border-style:dashed dashed dashed dashed;border-width:2px 2px 2px 2px;border-color:#E6EBFF #E6EBFF #E6EBFF #E6EBFF;height:117px;width:104px;left:438px;top:69.5px;" class="xui-container"></xhtml:div>
  <xhtml:input type="radio" value="" name="ckPersonKind" id="ckBr" style="position:absolute;left:74px;top:4px;" checked="true"></xhtml:input>
  <xhtml:input type="radio" value="" name="ckPersonKind" id="ckFr" style="position:absolute;left:155px;top:5px;"></xhtml:input>
  <xhtml:input type="radio" value="" name="ckPersonKind" id="ckDlr" style="position:absolute;left:233px;top:5px;"></xhtml:input>
  <xhtml:label id="label5" style="position:absolute;font-family:微软雅黑;font-size:15px;left:105px;top:4px;" class="xui-label"><![CDATA[本人]]></xhtml:label>
  <xhtml:label id="label8" class="xui-label" style="position:absolute;position:absolute;font-family:微软雅黑;font-size:15px;left:183px;top:4px;"><![CDATA[法人]]></xhtml:label>
  <xhtml:label id="label9" class="xui-label" style="position:absolute;position:absolute;font-family:微软雅黑;font-size:15px;left:257px;top:5px;"><![CDATA[代理人]]></xhtml:label>
  <xhtml:label id="label11" class="cardLable" style="position:absolute;position:absolute;top:2px;left:22px;"><![CDATA[类  型]]></xhtml:label></layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnRead"
        appearance="image-text" icon-class="icon-system-user" class="button-green"> 
        <xforms:label id="default3"><![CDATA[读取信息]]></xforms:label>  
        <xforms:action id="action5" ev:event="DOMActivate">
          <xforms:script id="xformsScript5"><![CDATA[idcardDialog.btnReadClick(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>
    </xui:view>  
    <xui:view auto-load="true" id="view4" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout4"> 
        <xui:place control="sureBtn" id="controlPlace2" style="float:right;margin-right:10px;position:absolute;width:86px;left:412px;top:13px;"/>
        <xui:place control="cancelBtn" id="controlPlace3" style="float:right;position:absolute;width:86px;top:12px;left:508px;"/>  
        <xhtml:label id="lblError" style="position:absolute;top:15px;left:24px;font-family:微软雅黑;color:#FF0000;font-size:medium;"
          class="xui-label"><![CDATA[]]></xhtml:label>
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn"
        appearance="image-text" class="button-blue"> 
        <xforms:label id="default2">取消</xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[idcardDialog.cancelBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn"
        appearance="image-text" class="button-blue"> 
        <xforms:label id="default1">确定</xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[idcardDialog.sureBtnClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="sysReceiver"/> 
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="idcardDialog.css"/>  
    <xhtml:script id="htmlScript1" src="idcardDialog.js"/>
  <xhtml:script id="htmlScript2" src="/UI/base/lib/jquery-ui-1.7.1/jquery-1.3.2.js"></xhtml:script></xui:resource> 
</xui:window>
