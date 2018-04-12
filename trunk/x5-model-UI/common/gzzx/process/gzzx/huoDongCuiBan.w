<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1"> 
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="value" src="" auto-load="true" id="data" store-type="simple"> 
      <rows xmlns="" id="default1">  
        <row id="default2"> 
          <cell id="default3"/> 
        </row> 
      </rows> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="bizData" concept="B_HuoDongCuiBan" store-type="simple"
      limit="10" onRefreshCreateParam="huoDongCuiBan.bizDataRefreshCreateParam"> 
      <reader id="default6" action="/common/gzzx/logic/action/queryHuoDongCuiBanAction"/>  
      <writer id="default7" action="/common/gzzx/logic/action/saveHuoDongCuiBanAction"/>  
      <creator id="default8"/>  
      <filter name="filter0" id="filter1"><![CDATA[fHuoDong=:hd]]></filter> 
    </data>  
    <xforms:action id="action4" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript4"><![CDATA[huoDongCuiBan.model1ModelConstruct(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout2" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center2"> 
          <xhtml:table border="0" id="table1" style="height:100%;width:100%;table-layout:fixed"> 
            <xhtml:tr> 
              <xhtml:td id="tdMemo" style="width:auto;"> 
                <xui:place control="textarea1" id="controlPlace5" style="height:100%;width:100%;font-size:14px"/> 
              </xhtml:td>  
              <xhtml:td id="tdHistory" style="width:50%;display:none"> 
                <xhtml:div style="height:100%;overflow:auto"> 
                  <xui:place control="bindTemplate1" id="controlPlace6"/> 
                </xhtml:div> 
              </xhtml:td> 
            </xhtml:tr> 
          </xhtml:table> 
        </center>  
        <bottom size="50px" id="borderLayout-bottom1"> 
          <xui:place control="btnCancel" id="controlPlace1" style="float:right;margin:5px 20px 0 0;"/>  
          <xui:place control="btnApply" id="controlPlace2" style="float:right;margin:5px 20px 0 0;"/>  
          <xui:place control="btnShowHistory" id="controlPlace4" style="margin:5px 0 0 20px;"/>  
          <xui:place control="view1" id="controlPlace8" style="height:100%;display:inline-block;position:relative;padding: 8px 0 0 10px;"/> 
        </bottom> 
      </xhtml:div>  
      <xui:place control="funcReceiver" id="controlPlace3" style="left:437px;top:160px;"/> 
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnApply"
      class="button-green"> 
      <xforms:label id="default5">确定</xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[huoDongCuiBan.btnApplyClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancel"> 
      <xforms:label id="default4">取消</xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript2"><![CDATA[huoDongCuiBan.btnCancelClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver" onReceive="huoDongCuiBan.funcReceiverReceive"/>  
    <xforms:textarea ref="data('data')/value" id="textarea1"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnShowHistory"> 
      <xforms:label id="default9"><![CDATA[催办记录]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript3"><![CDATA[huoDongCuiBan.btnShowHistoryClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/base/components/bindTemplate.xbl.xml#bindTemplate"
      class="" data-bind="" type="flow" id="bindTemplate1" data="bizData" list="true"> 
      <xhtml:div class="pd10 cbBlock" onselectstart="return false;" data-bind="event:{dblclick:$model.copyContent}"> 
        <xhtml:div class="me-margin-right20"> 
          <span class="muted">催办时间:</span>  
          <span data-bind="text:butone.Util.transformDatetime($object.val('fCreateTime'))"/> 
        </xhtml:div>  
        <xhtml:div class="me-margin-right20"> 
          <span class="muted">状态：</span>  
          <span data-bind="text:$object.ref('fStatus')"/> 
        </xhtml:div>  
        <xhtml:div class="ckeditorContent bottom-dashed" style="min-height:20px;padding-bottom:5px"
          data-bind="html:$object.ref('fContent')"/>  
        <div class="clearfix"/> 
      </xhtml:div> 
    </xhtml:div>  
    <xui:view auto-load="true" id="view1"> 
      <layout type="flow" style="position:relative;" id="layout1"> 
        <xhtml:label>消息通知</xhtml:label>  
        <xhtml:input type="checkbox" name="chkSendMsg" id="chkSendMsg" checked="true"
          style="width:auto;margin:0"/> 
      </layout> 
    </xui:view> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" href="/UI/common/gzzx/process/gzzx/mainActivity.css"/>  
    <xhtml:style> <![CDATA[.cbBlock{display:block;margin:5px;border:1px solid #ddd;cursor: pointer;}.cbBlock:hover{background-color:#EEFFEF}]]> </xhtml:style>  
    <xhtml:script id="htmlScript2" loadKO="true" src="/UI/base/lib/init.js"/>  
    <xhtml:script id="htmlScript1" src="huoDongCuiBan.js"/> 
  </xui:resource> 
</xui:window>
