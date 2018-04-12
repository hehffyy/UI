<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:356px;height:auto;top:188px;"> 
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="fCuiBanInfo,fCuiBanType" src="" auto-load="false" id="cuiBanData" store-type="simple"
      auto-new="true"/> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1"> 
          <xui:place control="view1" id="controlPlace2" style="height:100%;width:100%;"/> 
        </center>  
        <bottom size="50px" id="borderLayout-bottom1">
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar1" style="float:right;margin:10px 0;padding-right:20px;"> 
            <xui:place control="trigger1" id="controlPlace5"/>  
            <xui:place control="trigger2" id="controlPlace6"/>
          </xhtml:div>
        </bottom> 
      </xhtml:div> 
    </xui:layout>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xhtml:label id="label2" style="position:absolute;top:19px;left:24px;font-weight:bold;" class="xui-label"><![CDATA[催办类型:]]></xhtml:label>  
        <xhtml:label id="label4" class="xui-label" style="position:absolute;left:24px;position:absolute;top:57px;font-weight:bold;"><![CDATA[催办信息:]]></xhtml:label>  
        <xui:place control="textarea1" id="controlPlace4" style="position:absolute;top:55px;width:400px;left:100px;height:270px;"/>
      <xui:place control="checkbox1" id="controlPlace7" style="position:absolute;left:100px;top:20px;"></xui:place>
  <xui:place control="windowReceiver" id="controlPlace8" style="position:absolute;left:362px;top:33px;"></xui:place></layout>  
      <xforms:textarea ref="data('cuiBanData')/fCuiBanInfo" id="textarea1"/>
    <xforms:select id="checkbox1" ref="data('cuiBanData')/fCuiBanType">
   <xforms:item id="selectItem4">
    <xforms:label id="default10"><![CDATA[消息]]></xforms:label>
    <xforms:value id="default11"><![CDATA[消息]]></xforms:value></xforms:item>
   <xforms:item id="selectItem5">
    <xforms:label id="default12"><![CDATA[微信]]></xforms:label>
    <xforms:value id="default13"><![CDATA[微信]]></xforms:value></xforms:item> 
  <xforms:item id="selectItem6">
   <xforms:label id="default14"><![CDATA[短信]]></xforms:label>
   <xforms:value id="default15"><![CDATA[短信]]></xforms:value></xforms:item></xforms:select>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver"></xhtml:div></xui:view>  
    <xforms:trigger appearance="image-text" class="button-green" component="/UI/system/components/trigger.xbl.xml#trigger"
      id="trigger1"> 
      <xforms:label id="default1">确定</xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate">
        <xforms:script id="xformsScript2"><![CDATA[cuiBanDlg.trigger1Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      id="trigger2"> 
      <xforms:label id="default2">取消</xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate">
        <xforms:script id="xformsScript1"><![CDATA[cuiBanDlg.trigger2Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="cuiBanDlg.js"/> 
  </xui:resource> 
</xui:window>
