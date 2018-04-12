<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model" style="top:251px;height:auto;left:38px;"><xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[ntkoEditorDialog.modelLoad(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout style="height:100%;width:100%;font-size:0;-webkit-text-size-adjust:none;"
      id="rootLayout"> 
      <xhtml:div id="ovParent" class="xui-container" style="height:100%;width:100%;padding-bottom:55px;box-sizing:border-box;-moz-box-sizing:border-box;position:relative;"> 
        <xhtml:form id="uploadForm" action="" method="POST" enctype="multipart/form-data"
          style="display:none"/>  
        <xhtml:script src="/UI/base/system/office/ntko.js"/>  
        <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars1"
          style="margin-top:20px;width:100%;position:absolute;height:35px;bottom:0px;"> 
          <xhtml:span style="float:left;font-size:14px;">文件名称:</xhtml:span>  
          <xhtml:input type="text" id="fileName" style="float:left;width:300px;"/>  
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="toogleSeal"
            class="button-darkcyan" style="float:right;display:none;" icon-class="icon-system-left-open"
            appearance="image-text"> 
            <xforms:label id="default8"><![CDATA[签章]]></xforms:label>  
            <xforms:action id="action8" ev:event="DOMActivate"> 
              <xforms:script id="xformsScript8"><![CDATA[ntkoEditorDialog.sealClick(event)]]></xforms:script> 
            </xforms:action> 
          </xforms:trigger>  
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="docCreateVersion"
            class="button-green" style="margin-left:20px;float:right;margin-right:20px;display:none" > 
            <xforms:label id="default2"><![CDATA[成文]]></xforms:label>  
            <xforms:action id="action3" ev:event="DOMActivate"> 
              <xforms:script id="xformsScript3"><![CDATA[ntkoEditorDialog.docCreateVersionClick(event)]]></xforms:script> 
            </xforms:action> 
          </xforms:trigger>  
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="docSave"
            class="button-blue" style="float:right;"> 
            <xforms:label id="default1"><![CDATA[保存]]></xforms:label>  
            <xforms:action id="action2" ev:event="DOMActivate"> 
              <xforms:script id="xformsScript2"><![CDATA[ntkoEditorDialog.docSaveClick(event)]]></xforms:script> 
            </xforms:action> 
          </xforms:trigger> 
        </xhtml:div> 
      </xhtml:div>  
      <xhtml:div id="slider"> 
        <xhtml:div id="sealsDiv" style="display:none;"> 
          <xhtml:span>插入签章</xhtml:span> 
        </xhtml:div> 
      </xhtml:div>  
      <xhtml:div class="saveTip" id="saveTip"> 
        <xhtml:span>保存成功!</xhtml:span> 
      </xhtml:div>  
      <xui:place control="attachmentEditor2Receiver" id="controlPlace1" style="position:absolute;top:132px;left:259px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="attachmentEditor2Receiver" onReceive="ntkoEditorDialog.attachmentEditor2ReceiverReceive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="ntkoEditorDialog.css"/>  
    <xhtml:script src="/UI/system/service/doc/docUtil2.js"/>  
    <xhtml:script src="/UI/system/components/dialog/dialog.js"/>  
    <xhtml:script src="/UI/system/components/windowDialog/windowDialog.js"/>  
    <xhtml:script src="/UI/base/lib/ajaxfileupload.js"/>  
    <xhtml:script src="ntkoEditorDialog.js"/> 
  </xui:resource> 
</xui:window>
