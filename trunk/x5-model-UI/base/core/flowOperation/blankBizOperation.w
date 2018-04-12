<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model"> 
    <xforms:action id="action1" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript1"><![CDATA[blankBizOperation.modelModelConstruct(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div class="x-panel x-full" xid="panel"> 
        <xhtml:div class="x-panel-content" style="top: 40px;"> 
          <xhtml:div class="tab-content xui-autofill"/> 
        </xhtml:div>  
        <xhtml:div class="x-panel-bottom"> 
          <xhtml:a class="btn btn-link btn-only-label x-dialog-button" xid="cancelBtn"
            data-bind="event:{click:$model.cancelBtnClick}"> 
            <i/>  
            <span>取消</span> 
          </xhtml:a>  
          <xhtml:a class="btn btn-primary btn-only-label x-dialog-button" xid="okBtn"
            data-bind="event:{click:$model.okBtnClick}"> 
            <i/>  
            <span>确定</span> 
          </xhtml:a> 
        </xhtml:div> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace1" style="position:absolute;top:219px;left:497px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="blankBizOperation.windowReceiverReceive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script loadKO="true" src="/UI/base/lib/init.js"/>  
    <xhtml:script id="htmlScript1" src="blankBizOperation.js"/> 
  </xui:resource> 
</xui:window>
