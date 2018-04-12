<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:32px;height:auto;top:138px;"> 
    <xforms:action id="action1" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript1"><![CDATA[gpyFrame.model1XBLLoaded(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action2" ev:event="onload"> 
      <xforms:script id="xformsScript2"><![CDATA[gpyFrame.model1Load(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action3" ev:event="onunload"> 
      <xforms:script id="xformsScript3"><![CDATA[gpyFrame.model1UnLoad(event)]]></xforms:script> 
    </xforms:action> 
  <xforms:action id="action12" ev:event="xforms-model-construct"><xforms:script id="xformsScript12"><![CDATA[gpyFrame.model1ModelConstruct(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout2" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center2"> 
          <xui:place control="viewTitle" id="controlPlace2" style="width:100%;height:6%;"/>  
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="80%" mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;border-style:solid solid solid solid;border-width:3px 3px 3px 3px;border-color:#B0C1FB #B0C1FB #B0C1FB #B0C1FB;"> 
            <xhtml:div region="left" id="div3">
              <xhtml:div id="divCamara" class="xui-container" style="width:100%;height:99%;"/>
            </xhtml:div>  
            <xhtml:div region="right" id="div4">
              <xhtml:div id="divThumb" class="xui-container" style="width:100%;height:98%;"/>
            </xhtml:div>
          </xhtml:div>
        </center>  
        <right size="0px" id="borderLayout-right1" style="visibility:hidden;"> 
          <xui:place control="viewOpr" id="controlPlace3" style="height:100%;width:100%;"/> 
        </right> 
      </xhtml:div>  
      <xui:place control="sysReceiver" id="controlPlace12" style="position:absolute;top:139px;left:104px;"/> 
    <xui:place control="messageDialog" id="controlPlace1" style="position:absolute;left:97px;top:386px;"></xui:place></xui:layout>  
    <xui:view auto-load="true" id="viewOpr" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout3"> 
        <xhtml:img src="/UI/base/icons/img/setting.png" alt="" id="image2" style="position:absolute;left:11px;height:20px;width:24px;top:10px;"/>  
        <xhtml:label id="label3" class="xui-label" style="position:absolute;font-size:15px;position:absolute;font-family:微软雅黑;top:10px;left:40px;"><![CDATA[操作区域：]]></xhtml:label>  
        <xhtml:label id="label4" class="xui-label" style="position:absolute;font-size:15px;position:absolute;font-family:微软雅黑;position:absolute;left:16px;top:108px;"><![CDATA[分辨率：]]></xhtml:label>  
        <xhtml:select id="selRes1" style="position:absolute;width:163px;left:97px;top:102px;"
          class="xui-select"/>  
        <xhtml:input type="checkbox" name="" id="EnableDate" style="position:absolute;left:92px;top:144px;"
          title="日期" onclick="gpyFrame.EnableDateClick(event)"/>  
        <xhtml:input type="checkbox" value="" name="" id="AddText" style="position:absolute;left:206px;top:145px;" onclick="gpyFrame.AddTextClick(event)"/>  
        <xhtml:label id="label5" class="xui-label" style="position:absolute;font-size:15px;position:absolute;font-family:微软雅黑;position:absolute;position:absolute;left:120px;top:143px;"><![CDATA[日期]]></xhtml:label>  
        <xhtml:label id="label6" class="xui-label" style="position:absolute;font-size:15px;position:absolute;font-family:微软雅黑;position:absolute;position:absolute;position:absolute;left:227px;top:143px;"><![CDATA[文字]]></xhtml:label>  
        <xhtml:input type="checkbox" name="" id="Deskew" title="日期" style="position:absolute;position:absolute;left:91px;top:186px;" onclick="gpyFrame.DeskewClick(event)"/>  
        <xhtml:label id="label7" class="xui-label" style="position:absolute;font-size:15px;position:absolute;font-family:微软雅黑;position:absolute;position:absolute;position:absolute;left:119px;top:184px;"><![CDATA[纠偏]]></xhtml:label>  
        <xhtml:input type="checkbox" value="" name="" id="SetState" style="position:absolute;left:206px;top:187px;" onclick="gpyFrame.SetStateClick(event)"/>  
        <xhtml:label id="label8" class="xui-label" style="position:absolute;font-size:15px;position:absolute;font-family:微软雅黑;position:absolute;position:absolute;position:absolute;position:absolute;left:228px;top:185px;"><![CDATA[框选]]></xhtml:label>  
        <xhtml:label id="label9" class="xui-label" style="position:absolute;font-size:15px;position:absolute;font-family:微软雅黑;position:absolute;position:absolute;left:16px;top:162px;"><![CDATA[选项：]]></xhtml:label>  
        <xui:place control="trigger5" id="controlPlace8" style="width:52px;position:absolute;left:211px;top:233px;"/>  
        <xhtml:label id="label11" class="xui-label" style="position:absolute;font-size:15px;position:absolute;font-family:微软雅黑;position:absolute;position:absolute;position:absolute;left:16px;top:280px;"><![CDATA[上传选项：]]></xhtml:label>  
        <xhtml:label id="label1" class="xui-label" style="position:absolute;font-size:15px;position:absolute;font-family:微软雅黑;position:absolute;left:16px;position:absolute;top:51px;"><![CDATA[视频：]]></xhtml:label>
      <xhtml:input type="text" id="inputScanTempFolder" class="xui-input" value="D:\扫描临时文件夹" style="position:absolute;width:132px;position:absolute;left:97px;top:338px;"></xhtml:input>
  <xui:place control="trigger6" id="controlPlace13" style="width:47px;position:absolute;left:266px;top:334px;"></xui:place>
  <xhtml:label id="label2" class="xui-label" style="position:absolute;font-size:15px;font-family:微软雅黑;position:absolute;left:16px;top:338px;">存储路径：</xhtml:label></layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5"
        appearance="image-text" icon-class="icon-system-play" class="button-blue"> 
        <xforms:label id="default6"><![CDATA[属性]]></xforms:label> 
      <xforms:action id="action9" ev:event="DOMActivate"><xforms:script id="xformsScript9"><![CDATA[gpyFrame.trigger5Click(event)]]></xforms:script></xforms:action></xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger6" appearance="image-text" class="button-blue">
   <xforms:label id="default7">确认</xforms:label>
   <xforms:action id="action11" ev:event="DOMActivate">
    <xforms:script id="xformsScript11">gpyFrame.trigger6Click(event)</xforms:script></xforms:action> </xforms:trigger></xui:view>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="sysReceiver"/>  
    <xui:view auto-load="true" id="viewTitle" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout2"> 
        <xhtml:img src="/UI/base/icons/img/camera.png" alt="" id="image1" align="left"
          style="position:absolute;width:41px;height:26px;left:5px;top:4px;"/>  
        <xui:place control="trigger7" id="controlPlace10" style="position:absolute;width:70px;left:69px;top:5px;"></xui:place>
  <xui:place control="trigger8" id="controlPlace11" style="position:absolute;top:4px;width:62px;left:145px;"></xui:place>
  <xui:place control="trigger3" id="controlPlace6" style="width:52px;position:absolute;top:4px;left:214px;"></xui:place>
  <xui:place control="trigger4" id="controlPlace7" style="width:52px;position:absolute;top:4px;left:273px;"></xui:place>
  <xhtml:input type="checkbox" value="" name="" id="ckPdf" checked="true" style="position:absolute;position:absolute;top:10px;left:423px;"></xhtml:input>
  <xhtml:label id="label10" class="xui-label" style="position:absolute;font-size:15px;position:absolute;font-family:微软雅黑;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;top:10px;left:443px;">打包PDF</xhtml:label>
  <xui:place control="trgRefresh" id="controlPlace4" style="position:absolute;left:331px;top:5px;width:87px;"></xui:place></layout> 
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger7" appearance="image-text" icon-class="icon-system-play" class="button-blue">
   <xforms:label id="default8">拍照</xforms:label>
   <xforms:action id="action6" ev:event="DOMActivate">
    <xforms:script id="xformsScript6">gpyFrame.trigger7Click(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger8" appearance="image-text" icon-class="icon-system-play" class="button-blue">
   <xforms:label id="default9">上传</xforms:label>
   <xforms:action id="action10" ev:event="DOMActivate">
    <xforms:script id="xformsScript10">gpyFrame.trigger8Click(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" appearance="image-text" icon-class="icon-system-play" class="button-blue">
   <xforms:label id="default4">左转</xforms:label>
   <xforms:action id="action7" ev:event="DOMActivate">
    <xforms:script id="xformsScript7">gpyFrame.trigger3Click(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4" appearance="image-text" icon-class="icon-system-play" class="button-blue">
   <xforms:label id="default5">右转</xforms:label>
   <xforms:action id="action8" ev:event="DOMActivate">
    <xforms:script id="xformsScript8">gpyFrame.trigger4Click(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgRefresh" appearance="image-text" icon-class="icon-system-play" class="button-blue">
   <xforms:label id="default1"><![CDATA[刷新页面]]></xforms:label>
   <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[gpyFrame.trgRefreshClick(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view> 
  <xhtml:div component="/UI/system/components/messageDialog.xbl.xml#messageDialog" id="messageDialog" title="222" message="121" details="1" img="info"></xhtml:div></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="gpyFrame.js"/>  
    <xhtml:script id="htmlScript3" src="/UI/base/system/scan/gpy.js"/>
  <xhtml:script id="htmlScript5" src="/UI/base/lib/jquery-ui-1.7.1/external/cookie/jquery.cookie.min.js"></xhtml:script></xui:resource> 
</xui:window>
