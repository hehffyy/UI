<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="NtkoOfficeEditor" style="height:auto;left:122px;top:129px;"> 
    <xforms:action id="action2" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript2"><![CDATA[NtkoOfficeEditor.NtkoOfficeViewModelConstruct(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view auto-load="true" id="rootView" class="xui-container"> 
    <layout type="flow" style="width:100%;height:100%;position:relative;font-family:微软雅黑;" id="layout1"> 
      <xui:place control="windowReceiver1" id="controlPlace1" style="left:133px;top:95px;"/>  
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="height:100%;width:100%;background-color:#99CCA5;" border-size="10px"> 
        <center id="borderLayout-center1"> 
          <xhtml:div id="div2" class="xui-container" style="position:absolute;width:100%;height:100%;left:0px;top:0px;background-color:#eff7ff;"> 
            <xhtml:script src="ntkoofficecontrol.js" id="htmlScript4"/> 
          </xhtml:div> 
        </center>  
        <right size="130px" id="borderLayout-right1" style="border-style:solid solid solid solid;border-width:thin thin thin thin;border-color:#EBEBEB #EBEBEB #EBEBEB #EBEBEB;"> 
          <xui:place control="view1" id="controlPlace6" style="width:100%;height:100%;top:5px;"/> 
        </right> 
      </xhtml:div>  
      <xui:place control="dlgHistory" id="controlPlace5" style="position:absolute;left:172px;top:288px;"/>  
      <xui:place control="dlgTemplate" id="controlPlace12" style="position:absolute;top:362px;left:176px;"/>  
      <xui:place control="confirmDlg" id="controlPlace13" style="position:absolute;top:476px;left:79px;"/> 
    </layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="NtkoOfficeEditor.windowReceiver1Receive"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="版本记录" width="700px" height="400px" modal="true" id="dlgHistory" url="/UI/common/officeTemplate/process/template/officeHistory.w"
      process="/common/officeTemplate/process/template/templateProcess" activity="mainActivity"
      onSend="NtkoOfficeEditor.dlgHistorySend"/>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout2"> 
        <xui:place control="view2" id="controlPlace7" style="position:absolute;width:100%;background-color:#4DCCE8;left:2px;height:28px;top:-7px;"></xui:place><xhtml:label id="lblError" style="position:absolute;top:227px;left:2px;" class="xui-label"><![CDATA[]]></xhtml:label>  
        <xhtml:label id="label2" style="position:absolute;left:26px;top:216px;color:#FF0000;"
          class="xui-label"><![CDATA[[痕迹控制]]]></xhtml:label>  
<!--        <xui:place id="controlPlace10" style="left:15px;width:100px;position:absolute;top:247px;"/>  -->
<!--        <xui:place id="controlPlace11" style="left:15px;width:100px;position:absolute;top:279px;"/>  -->
<!--        <xui:place id="controlPlace14" style="left:15px;width:100px;position:absolute;top:310px;"/>  -->
<!--        <xhtml:input type="button" value="显示痕迹" id="btnShowTrack" style="position:absolute;left:14px;top:256px;"-->
<!--          class="op" onclick="NtkoOfficeEditor.btnShowTrackClick(event)"/>  -->
<!--        <xhtml:input type="button" value="显示痕迹" id="batHideTrack" class="op" style="position:absolute;position:absolute;width:100px;left:14px;top:289px;"-->
<!--          onclick="NtkoOfficeEditor.batHideTrackClick(event)"/>  -->
<!--        <xhtml:input type="button" value="接受修订" id="btnAcceptTrack" class="op" style="position:absolute;position:absolute;width:99px;left:14px;top:325px;"-->
<!--          onclick="NtkoOfficeEditor.btnAcceptTrackClick(event)"/>-->
      <xhtml:input type="button" value="[显示痕迹]" id="btnShowTrack" style="position:absolute;top:247px;left:14px;" class="op" onclick="NtkoOfficeEditor.btnShowTrackClick(event)"></xhtml:input>
  <xhtml:input type="button" value="[隐藏痕迹]" id="btnHideTrack" class="op" style="position:absolute;position:absolute;left:14px;top:282px;" onclick="NtkoOfficeEditor.btnHideTrackClick(event)"></xhtml:input>
  <xhtml:input type="button" value="[接受修订]" id="btnAcceptTrack" class="op" style="position:absolute;position:absolute;top:316px;left:14px;" onclick="NtkoOfficeEditor.btnAcceptTrackClick(event)"></xhtml:input>
  <xhtml:input type="button" value="[编辑文档]" id="btnCheckOut" class="op" style="position:absolute;position:absolute;left:14px;top:40px;" onclick="NtkoOfficeEditor.btnCheckOutClick(event)"></xhtml:input>
  <xhtml:input type="button" value="[保存文档]" id="btnSave" class="op" style="position:absolute;position:absolute;position:absolute;left:14px;top:70px;" onclick="NtkoOfficeEditor.btnSaveClick(event)"></xhtml:input>
  <xhtml:input type="button" value="[历史版本]" id="btnHistory" class="op" style="position:absolute;position:absolute;position:absolute;position:absolute;left:14px;top:101px;" onclick="NtkoOfficeEditor.btnHistoryClick(event)"></xhtml:input>
  <xhtml:input type="button" value="[加载模板]" id="btnInit" class="op" style="position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;left:15px;top:165px;" onclick="NtkoOfficeEditor.btnInitClick(event)"></xhtml:input>
  <xhtml:input type="button" value="[模板套红]" id="btnTh" class="op" style="position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;position:absolute;left:15px;top:132px;" onclick="NtkoOfficeEditor.btnThClick(event)"></xhtml:input>
  <xhtml:input type="button" value="[不保存退出]" id="btnExit" class="op" style="position:absolute;position:absolute;position:absolute;left:15px;top:394px;" onclick="NtkoOfficeEditor.btnExitClick(event)"></xhtml:input>
  </layout>  
      <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout3">
    <xhtml:img src="/UI/base/system/office/image/office.png" alt="" id="image1" style="position:absolute;position:absolute;left:5px;top:5px;height:21px;width:27px;"></xhtml:img>
    <xhtml:label id="label1" style="position:absolute;font-family:微软雅黑;color:#FFFFFF;font-weight:bold;font-size:15px;left:36px;top:5px;" class="xui-label">文档操作</xhtml:label></layout> </xui:view>
  </xui:view>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="套红模板" width="600px" height="300px" modal="true" id="dlgTemplate" url="/UI/common/officeTemplate/process/template/template.w"
      process="/common/officeTemplate/process/template/templateProcess" activity="mainActivity"
      onReceive="NtkoOfficeEditor.dlgTemplateReceive" resizable="false"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="Office操作" width="400px" height="150px" modal="true" id="confirmDlg" url="/UI/common/officeTemplate/process/template/confirmDlg.w"
      resizable="false" minmaxable="false" onReceive="NtkoOfficeEditor.confirmDlgReceive"/> 
  </xui:view>  
  <xui:resource> 
    <xhtml:link rel="STYLESHEET" type="text/css" href="/form/dhtmlx/dhtmlxWindows/dhtmlxwindows.css"/>  
    <xhtml:link rel="STYLESHEET" type="text/css" href="/form/dhtmlx/dhtmlxWindows/skins/dhtmlxwindows_dhx_blue.css"/>  
    <xhtml:script id="htmlScript1" src="NtkoOfficeEditor.js"/>  
    <xhtml:script id="htmlScript3" src="/UI/base/lib/jquery-ui-1.7.1/jquery-1.3.2.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/lib/butoneExUtils.js"/> 
  </xui:resource>  
  <resource id="resource1">
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="NtkoOfficeEditor.css"/>
  </resource>
</xui:window>
