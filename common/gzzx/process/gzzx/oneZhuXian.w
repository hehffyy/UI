<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:99px;top:32px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="myZhuXian" concept="B_GongZuoZhuXian"
      store-type="simple" limit="1" confirm-refresh="false" confirm-delete="false"
      onValueChanged="mainActivity.myZhuXianValueChanged" auto-new="true"> 
      <reader id="default8" action="/common/gzzx/logic/action/queryMyAllZhuXianAction"/>  
      <writer id="default9" action="/common/gzzx/logic/action/saveGongZuoZhuXianAction"/>  
      <creator id="default10" action="/common/gzzx/logic/action/createGongZuoZhuXianAction"/>  
      <filter name="filter0" id="filter1"/> 
    </data>  
    <xforms:action id="action3" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript3"><![CDATA[oneZhuXian.model1ModelConstruct(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;margin:0 auto;position:relative;width:100%;" id="rootLayout"
      type="flow"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1"> 
          <xui:place control="view1" id="controlPlace3" style="height:100%;width:100%;padding-left:3%"/> 
        </center>  
        <bottom size="50px" id="borderLayout-bottom1"> 
          <xui:place control="btnCancel" id="controlPlace1" style="float:right;margin:5px 20px 0 0;"/>  
          <xui:place control="btnApply" id="controlPlace2" style="float:right;margin:5px 20px 0 0;"/> 
        </bottom> 
      </xhtml:div>  
      <xui:place control="funcReceiver" id="controlPlace7" style="left:427px;top:107px;"/> 
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnApply"
      class="button-green"> 
      <xforms:label id="default5">确定</xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[oneZhuXian.btnApplyClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancel"> 
      <xforms:label id="default4">取消</xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript2"><![CDATA[oneZhuXian.btnCancelClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xhtml:label id="label1" style="position:absolute;top:20px;" class="xui-label"><![CDATA[标题]]></xhtml:label>  
        <xui:place control="input1" id="controlPlace4" style="position:absolute;top:45px;width:90%"/>  
        <xhtml:label id="label2" style="position:absolute;top:70px" class="xui-label"><![CDATA[内容]]></xhtml:label>  
        <xui:place control="textarea1" id="controlPlace6" style="position:absolute;width:90%;height:200px;top:90px"/>  
        <xhtml:label id="label3" class="xui-label" style="top:300px;position:absolute;"><![CDATA[附件]]></xhtml:label>  
        <xui:place control="attachment1" id="controlPlace5" style="position:absolute;top:320px;width:90%"/> 
      </layout>  
      <xforms:input id="input1" ref="data('myZhuXian')/fTitle"/>  
      <xforms:textarea ref="data('myZhuXian')/fContent" id="textarea1" mediatype="text/html"/>  
      <xhtml:div component="/UI/base/components/attachment.xbl.xml#attachment" access="du"
        data-bind="" id="attachment1" ref="data('myZhuXian')/fAttachment" showName="true"> 
        <div class="x-attachment" id="default1"> 
          <div class="x-attachment-content x-card-border" id="default2"> 
            <div class="x-doc-process" id="default3"> 
              <div class="progress-bar x-doc-process-bar" role="progressbar"
                style="width:0%;" id="default6"/> 
            </div>  
            <div data-bind="foreach:$attachmentItems" id="default7"> 
              <div class="x-attachment-cell" id="default11"> 
                <div id="default12"> 
                  <div class="x-attachment-item x-item-other" data-bind="attr:{title:$object.docName},click:$model.previewOrRemoveItem.bind($model),style:{opacity: $model.$access.get() % 4 &gt;= 2 || $model.$state.get() == 'remove' ? '1.0' : '0.5',backgroundImage:($model.previewPicture.bind($model,$object))()}"
                    id="default13"> 
                    <a data-bind="visible:$model.$state.get() == 'remove'"
                      class="x-remove-barget" id="default14"/> 
                  </div>  
                  <label data-bind="text:$object.docName,visible:$model.showName"
                    style="display:block;margin-left:10px" id="xuiLabel1"/> 
                </div> 
              </div> 
            </div>  
            <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; ($limit.get() == '-1' || $limit.get() &gt; $attachmentItems.get().length)"
              id="default15"> 
              <div class="x-attachment-item x-item-upload" data-bind="visible:$state.get() == 'upload' &amp;&amp; $access.get() % 512 &gt;= 256"
                id="default16"/> 
            </div>  
            <div class="x-attachment-cell" data-bind="visible:$state.get() == 'upload' &amp;&amp; $attachmentItems.get().length &gt; 0"
              id="default17"> 
              <div class="x-attachment-item x-item-remove" data-bind="click:changeState.bind($object,'remove'),visible:$access.get() % 2048 &gt;= 1024"
                id="default18"/> 
            </div>  
            <div style="clear:both;" id="default19"/> 
          </div> 
        </div> 
      </xhtml:div> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver" onReceive="oneZhuXian.funcReceiverReceive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="/UI/base/lib/init.js" loadKO="true"/>  
    <xhtml:script id="htmlScript2" src="oneZhuXian.js"/> 
  </xui:resource> 
</xui:window>
