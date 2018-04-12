<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model1" style="top:198px;left:28px;height:auto;"> 
    <xforms:action id="action11" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript11"><![CDATA[lodopTemplate.model1XBLLoaded(event)]]></xforms:script> 
    </xforms:action> 
  <xforms:action id="action14" ev:event="onload"><xforms:script id="xformsScript14"><![CDATA[lodopTemplate.model1Load(event)]]></xforms:script></xforms:action>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="dsPrintSet" concept="B_RtCfg" store-type="simple" auto-new="false">
   <reader id="default6" action="/base/system/logic/action/queryB_RtCfgAction"></reader>
   <writer id="default6" action="/base/system/logic/action/saveB_RtCfgAction"></writer>
   <creator id="default13" action="/base/system/logic/action/createB_RtCfgAction"></creator></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <top size="40px" id="borderLayout-top1"> 
          <xui:place control="view1" id="controlPlace3" style="width:100%;height:40px;background-color:#F2F2EE;"/> 
        </top>  
        <center id="borderLayout-center1"> 
          <xui:place control="viewPrint" id="controlPlace1" style="height:100%;width:100%;"/> 
        </center> 
      </xhtml:div> 
    </xui:layout>  
    <xui:view auto-load="true" id="viewPrint" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xhtml:object id="LODOP1" classid="clsid:2105C259-1E0C-4534-8141-A753534CB4CA"
          width="100%" height="100%"> 
          <xhtml:embed id="LODOP_EM1" type="application/x-print-lodop" width="100%"
            height="100%">
           </xhtml:embed> 
        </xhtml:object>  
        <xui:place control="sysReceiver" id="controlPlace2" style="position:absolute;top:136px;left:218px;"/>  
        <xui:place control="setDialog" id="controlPlace4" style="position:absolute;top:271px;left:179px;"/> 
      </layout>  
      <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
        id="sysReceiver" onReceive="lodopTemplate.sysReceive"/>  
      <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
        title="" width="450px" height="500px" modal="true" id="setDialog" url="/UI/base/core/template/default/printtemplate/lodop/pageSetup.w"
        onReceive="lodopTemplate.setDialogReceive"/> 
    </xui:view>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout2"> 
        <xui:place control="toolbars1" id="controlPlace5" style="position:absolute;height:25px;top:7px;width:462px;left:6px;"/> 
      </layout>  
      <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars1"> 
        <xui:bar component="/UI/system/components/customBar.xbl.xml#customBar"
          id="customBar1"> 
          <item id="customBarItem1"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnAutoWidth" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/autoWidth.png"> 
              <xforms:label id="default1">适宽</xforms:label>  
              <xforms:action id="action1" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript1">lodopTemplate.btnAutoWidthClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          <item id="customBarItem2"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnAuto" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/autoCommon.png"> 
              <xforms:label id="default2">正常</xforms:label>  
              <xforms:action id="action2" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript2">lodopTemplate.btnAutoClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          <item id="customBarItem3"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnAutoHeight" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/autoHeight.png"> 
              <xforms:label id="default3">适高</xforms:label>  
              <xforms:action id="action3" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript3">lodopTemplate.btnAutoHeightClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          <item id="customBarItem4"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnZoomOut" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/zoomOut.png"> 
              <xforms:label id="default4">放大</xforms:label>  
              <xforms:action id="action12" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript12">lodopTemplate.btnZoomOutClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          <item id="customBarItem5"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnZoomIn" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/zoomIn.png"> 
              <xforms:label id="default5">缩小</xforms:label>  
              <xforms:action id="action13" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript13">lodopTemplate.btnZoomInClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          <item name="separator" id="separatorItem1"/>  
          <item id="customBarItem8"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnFirst" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/firstPage.png"> 
              <xforms:label id="default9">首页</xforms:label>  
              <xforms:action id="action7" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript7">lodopTemplate.btnFirstClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          <item id="customBarItem9"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnPre" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/prePage.png"> 
              <xforms:label id="default10">上页</xforms:label>  
              <xforms:action id="action8" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript8">lodopTemplate.btnPreClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          <item id="customBarItem10"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnNext" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/nextPage.png"> 
              <xforms:label id="default11">下页</xforms:label>  
              <xforms:action id="action9" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript9">lodopTemplate.btnNextClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          <item id="customBarItem11"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnLast" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/lastPage.png"> 
              <xforms:label id="default12">尾页</xforms:label>  
              <xforms:action id="action10" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript10">lodopTemplate.btnLastClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item><item id="customBarItem16"><xhtml:label id="lblPageIndex" class="xui-label" style="height:100%;text-align:center;width:100px;"><![CDATA[[第1/1页]]]></xhtml:label></item><item id="customBarItem15"></item>  
          <item name="separator" id="separatorItem2"/>  
          <item id="customBarItem6"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnPrintSet" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/printSet.png"
              style="width:89px;"> 
              <xforms:label id="default7">打印设置</xforms:label>  
              <xforms:action id="action4" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript4">lodopTemplate.btnPrintSetClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          <item id="customBarItem7"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnPrint" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/print.png"> 
              <xforms:label id="default8">打印</xforms:label>  
              <xforms:action id="action5" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript5">lodopTemplate.btnPrintClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          <item id="customBarItem12"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="btnDesign" appearance="image-text" src="/UI/base/core/template/default/printtemplate/lodop/images/printSet.png"> 
              <xforms:label id="default14">设计</xforms:label>  
              <xforms:action id="action6" ev:event="DOMActivate"> 
                <xforms:script id="xformsScript6">lodopTemplate.btnDesignClick(event)</xforms:script> 
              </xforms:action> 
            </xforms:trigger> 
          </item>  
          </xui:bar> 
      </xhtml:div> 
    </xui:view> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="lodopTemplate.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/lib/butoneExUtils.js"/>  
    <xhtml:script id="htmlScript3" src="/UI/base/core/template/butoneExtend.js"/> 
  <xhtml:script id="htmlScript4" src="/UI/base/core/template/default/printtemplate/lodop/htmlTemplate.js"></xhtml:script></xui:resource> 
</xui:window>
