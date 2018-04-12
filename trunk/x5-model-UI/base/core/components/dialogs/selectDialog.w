<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1"> 
    <xforms:action id="action2" ev:event="onunload"> 
      <xforms:script id="xformsScript2"><![CDATA[selectDialog.model1UnLoad(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="bl1" style="width:100%;height:100%;"> 
        <center id="lb1_c"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="bl2" style="width:100%; height: 100%;;"> 
            <center id="bl2_c"> 
              <xui:place control="windowFrame" id="controlPlace4" style="width:100%;height:100%;"/> 
            </center>  
            <bottom size="100px" id="bl2_b"> 
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                id="bl3" style="width:100%; height: 100%;;"> 
                <top size="28px" id="bl3_t"> 
                  <xhtml:div id="selectBar" class="multi-select-bar" style="height:100%;"> 
                    <xhtml:div id="d1" style="float:left;margin-top:6px;color:#444;">选中列表</xhtml:div>  
                    <xhtml:div id="d2" class="multi-select-count" style="float:left;margin-top:6px;">(共0项):</xhtml:div>  
                    <xui:place control="d3" id="controlPlace5" style="float:right;visibility:hidden;width:80px;"/> 
                  </xhtml:div> 
                </top>  
                <center id="bl3_b" style="border:1px solid #D3D3D3;"> 
                  <xhtml:div id="selectHome" style="overflow-y:auto;height:100%;"/> 
                </center> 
              </xhtml:div> 
            </bottom> 
          </xhtml:div> 
        </center>  
        <bottom size="42px" id="lb1_b"> 
          <xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;position:relative;"/> 
        </bottom> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace7" style="position:absolute;left:517px;top:34px;"/> 
    </xui:layout>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout1"> 
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar2" style="float:right;width:194px;"> 
          <xui:place control="btn_apply" id="controlPlace2"/>  
          <xui:place control="btn_cancel" id="controlPlace3"/> 
        </xhtml:div> 
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btn_apply"
        class="button-green"> 
        <xforms:label id="default1"><![CDATA[确定]]></xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript1"><![CDATA[selectDialog.btn_applyClick(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btn_cancel"
        class="button-blue" appearance="minimal"> 
        <xforms:label id="default2"><![CDATA[取消]]></xforms:label> 
      <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[selectDialog.btn_cancelClick(event)]]></xforms:script></xforms:action></xforms:trigger> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/windowFrame.xbl.xml#windowFrame"
      id="windowFrame" onInitFrame="selectDialog.windowFrameInitFrame" onSend="selectDialog.windowFrameSend" onReceive="selectDialog.windowFrameReceive"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="selectDialog.windowReceiverReceive"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="d3"
      class="multi-delete-img" icon-class="icon-system-trash" appearance="image-minimal"> 
      <xforms:label id="default3"><![CDATA[全部删除]]></xforms:label> 
    <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[selectDialog.d3Click(event)]]></xforms:script></xforms:action></xforms:trigger> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="selectDialog.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/system/dialog/base2/dialog.css"/>  
    <xhtml:style>.multi-select-bar { white-space:nowrap; height:20px; } .multi-select-bar div{ vertical-align : middle; text-align:center; } .multi-select-bar img { vertical-align : middle; line-height:24px; } .multi-select-item{ color: #444; cursor: pointer; white-space:nowrap; vertical-align:middle; height:20px; line-height:20px; 
      } .multi-delete-img{ cursor:pointer; margin-top:2px }
    </xhtml:style>  
    </xui:resource> 
</xui:window>
