<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;width:91px;left:260px;top:86px;"> 
    <xforms:action id="action2" ev:event="xforms-ready"> 
      <xforms:script id="xformsScript2"><![CDATA[mainActivity.model1Ready(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:table border="1" id="table1" align="center" style="height:100%;width:100%;"> 
        <xhtml:tr id="tr1"> 
          <xhtml:td style="width:60px;" align="center"><![CDATA[今天]]></xhtml:td>  
          <xhtml:td id="sche1">
            <xhtml:ul id="ul_sche1" style="height:100%;width:100%;"/>
          </xhtml:td> 
        </xhtml:tr>  
        <xhtml:tr id="tr2"> 
          <xhtml:td style="width:60px;border-top: 1px solid #E7E7E7;" align="center"><![CDATA[明天]]></xhtml:td>  
          <xhtml:td id="sche2">
            <xhtml:ul id="ul_sche2" style="height:100%;width:100%;"/>
          </xhtml:td> 
        </xhtml:tr>  
        <xhtml:tr id="tr4"> 
          <xhtml:td style="width:60px;border-top: 1px solid #E7E7E7;" align="center"><![CDATA[后天]]></xhtml:td>  
          <xhtml:td id="sche3">
            <xhtml:ul id="ul_sche3" style="height:100%;width:100%;"/>
          </xhtml:td> 
        </xhtml:tr> 
      </xhtml:table> 
    </xui:layout> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="mainActivity.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="mainActivity.css"/> 
  </xui:resource> 
</xui:window>
