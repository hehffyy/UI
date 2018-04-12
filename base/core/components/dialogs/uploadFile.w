<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1"/>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:table border="0" style="height:100%;width:100%;"> 
        <xhtml:tr> 
          <xhtml:td> 
            <xhtml:form enctype="multipart/form-data" id="uploadForm" style="margin:0;"/> 
            <xhtml:h3 style="text-align: center;display:none" id="waitHint"><![CDATA[文件上传处理中，请等待...]]></xhtml:h3>
          </xhtml:td> 
        </xhtml:tr> 
      </xhtml:table>  
      <xui:place control="receiver" id="controlPlace5" style="position:absolute;left:309px;top:92px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="receiver" onReceive="uploadFile.receiverReceive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="/UI/base/lib/ajaxfileupload.js"/>  
    <xhtml:script id="htmlScript2" src="uploadFile.js"/> 
  </xui:resource> 
</xui:window>
