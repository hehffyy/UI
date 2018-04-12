<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1"> 
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="value,attachment" src="" auto-load="true" id="data" store-type="simple"> 
      <rule id="dataRule1" column="value"/>  
      <rule id="dataRule2" column="attachment"/>  
      <rows xmlns="" id="default29">  
        <row id="default30"> 
          <cell id="default31"/>  
          <cell id="default32"/> 
        </row> 
      </rows> 
    </data>  
    <xforms:action id="action2" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript2"><![CDATA[htmlEditorDialog.model1ModelConstruct(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1"> 
          <xhtml:table border="0" id="table1" style="height:100%;width:100%;"> 
            <xhtml:tr id="trHtml"> 
              <xhtml:td> 
                <xui:place control="textareaHtml" id="controlPlace4" style="width:100%;height:100%;"/> 
              </xhtml:td> 
            </xhtml:tr>  
            <xhtml:tr id="trText" style="display:none"> 
              <xhtml:td> 
                <xui:place control="textareaText" id="controlPlace5" style="width:100%;height:100%;"/> 
              </xhtml:td> 
            </xhtml:tr>  
            <xhtml:tr id="tr_attachment" style="height:60px;display:none"> 
              <xhtml:td> 
                <xui:place control="attachment1" id="controlPlace6" style="height:100%;width:100%;"/> 
              </xhtml:td> 
            </xhtml:tr> 
          </xhtml:table> 
        </center>  
        <bottom size="43px" id="borderLayout-bottom1"> 
          <xui:place control="btnCancel" id="controlPlace1" style="float:right;margin:5px 20px 0 0"/>  
          <xui:place control="btnApply" id="controlPlace2" style="float:right;margin:5px 20px 0 0"/> 
        </bottom> 
      </xhtml:div>  
      <xui:place control="funcReceiver" id="controlPlace3" style="position:absolute;top:134px;left:255px;"/> 
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancel"> 
      <xforms:label id="default4"><![CDATA[取消]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[htmlEditorDialog.btnCancelClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnApply"
      class="button-green"> 
      <xforms:label id="default5"><![CDATA[确定]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript3"><![CDATA[htmlEditorDialog.btnApplyClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="funcReceiver" onReceive="htmlEditorDialog.funcReceiverReceive"/>  
    <xforms:textarea ref="data('data')/value" id="textareaHtml" mediatype="text/html"/>  
    <xforms:textarea ref="data('data')/value" id="textareaText"/>  
    <xhtml:div component="/UI/base/components/attachment.xbl.xml#attachment" access="du"
      data-bind="" id="attachment1" ref="data('data')/attachment" showName="true"> 
      <div class="x-attachment" id="default6"> 
        <div class="x-attachment-content x-card-border" style="border-top:0px" id="default7"> 
          <div class="x-doc-process" id="default8"> 
            <div class="progress-bar x-doc-process-bar" role="progressbar"
              style="width:0%;" id="default9"/> 
          </div>  
          <div data-bind="foreach:$attachmentItems" id="default10"> 
            <div class="x-attachment-cell" id="default11"> 
              <div id="default12"> 
                <div class="x-attachment-item x-item-other" data-bind="attr:{title:$object.docName},click:$model.previewOrRemoveItem.bind($model),style:{opacity: $model.$access.get() % 4 &gt;= 2 || $model.$state.get() == 'remove' ? '1.0' : '0.5',backgroundImage:($model.previewPicture.bind($model,$object))()}"
                  id="default13"> 
                  <a data-bind="visible:$model.$state.get() == 'remove'"
                    class="x-remove-barget" id="default14"/> 
                </div>  
                <span data-bind="text:$object.docName,visible:$model.showName"
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
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript2" src="/UI/base/lib/init.js" loadKO="true"/>  
    <xhtml:script id="htmlScript1" src="htmlEditorDialog.js"/> 
  </xui:resource> 
</xui:window>
