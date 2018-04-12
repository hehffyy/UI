<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:488px;height:auto;top:295px;"> 
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="personID,personName,idea" src="" auto-load="false" id="data1" store-type="simple"
      auto-new="true"/> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%;height:100%;"> 
        <center id="borderLayout-center1"> 
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="40px" mode="vert" id="VSplitter1" class="xui-splitter" style="height:100%;width:100%;"
            resizable="false" has-drag-bar="false"> 
            <xhtml:div region="top" id="div1">
              <xui:place control="view1" id="controlPlace2" style="padding-top:5px;width:100%;position:relative;height:auto;"/>
            </xhtml:div>  
            <xhtml:div region="bottom" id="div2">
              <xui:place control="textarea1" id="controlPlace1" style="margin:0 auto;height:100%;width:95%;"/>
            </xhtml:div>
          </xhtml:div>
        </center>  
        <bottom size="50px" id="borderLayout-bottom1">
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar1" style="float:right;padding-right:20px;padding-top:10px;">
            <xui:place control="trigger1" id="controlPlace3"/>  
            <xui:place control="trigger2" id="controlPlace4"/>
          </xhtml:div>
        </bottom> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace5" style="position:absolute;top:165px;left:262px;"/>
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
      appearance="image-text" class="button-green" icon-class="icon-system-ok"> 
      <xforms:label id="default1"><![CDATA[确认]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate">
        <xforms:script id="xformsScript1"><![CDATA[chuanYueActivity.trigger1Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
      appearance="image-text" icon-class="icon-system-cancel"> 
      <xforms:label id="default3"><![CDATA[取消]]></xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate">
        <xforms:script id="xformsScript2"><![CDATA[chuanYueActivity.trigger2Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="chuanYueActivity.windowReceiverReceive"/>  
    <xforms:textarea ref="data('data1')/idea" id="textarea1"/>  
    <xui:view auto-load="true" id="view1"> 
      <layout type="flow" style="position:relative;" id="layout1"> 
        <xui:place control="orgSelect1" id="controlPlace41" style="margin:0 auto;width:95%;"/>
      </layout>  
      <xhtml:div component="/UI/system/components/orgSelect.xbl.xml#orgSelect" show-org-types="psm"
        selectable-org-types="psm" id="orgSelect1"> 
        <xforms:model id="model2"> 
          <xui:data component="/UI/system/components/data.xbl.xml#bizData" id="bizData1"> 
            <tree-option id="default12" root-filter="SA_OPOrg.sParent = :currentDeptID()"/>
          <filter name="filter0" id="filter1"><![CDATA[SA_OPOrg.sPersonID <> :currentPersonID()]]></filter></xui:data> 
        </xforms:model>  
        <xhtml:div class="xui-autofill" component="/UI/system/components/select.xbl.xml#treeSelect"
          id="treeSelect1" data-ref="bizData1" ref="data('data1')/personID" label-ref="data('data1')/personName"
          multi-select="true" default-label-ref="'请选择传阅人'"> 
          <xforms:itemset id="default18"/>  
          <xforms:value id="default2" ref="rowID"/>  
          <xforms:label id="default11" ref="sName"/>
        </xhtml:div> 
      </xhtml:div> 
    </xui:view>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="chuanYueActivity.js"/>
    <xhtml:script id="htmlScript5" src="/UI/system/service/org/orgUtils.js"/>
  </xui:resource> 
</xui:window>
