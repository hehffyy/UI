<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;width:105px;left:15px;top:118px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="dataTopic" concept="B_SYS_Topic" auto-new="true"
      limit="1" store-type="simple" confirm-refresh="false" onBeforeSave="startTopic.dataTopicBeforeSave" onSaveCommit="startTopic.dataTopicSaveCommit"> 
      <reader id="default1" action="/common/topic/logic/action/queryB_SYS_TopicAction"/>  
      <writer id="default2" action="/common/topic/logic/action/saveB_SYS_TopicAction"/>  
      <creator id="default3" action="/common/topic/logic/action/createB_SYS_TopicAction"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="dataRange" concept="B_SYS_TopicRange"
      limit="-1" store-type="simple" confirm-delete="false" confirm-refresh="false" onAfterRefresh="startTopic.dataRangeAfterRefresh"> 
      <master id="master1" data="dataTopic" relation="fTopicID"/>  
      <reader id="default4" action="/common/topic/logic/action/queryB_SYS_TopicRangeAction"/>  
      <writer id="default5" action="/common/topic/logic/action/saveB_SYS_TopicRangeAction"/>  
      <creator id="default6" action="/common/topic/logic/action/createB_SYS_TopicRangeAction"/> 
    </data>  
    <xforms:action id="action4" ev:event="xforms-model-construct">
      <xforms:script id="xformsScript4"><![CDATA[startTopic.model1ModelConstruct(event)]]></xforms:script>
    </xforms:action>  
    <xforms:action id="action5" ev:event="xforms-model-construct-done">
      <xforms:script id="xformsScript5"><![CDATA[startTopic.model1ModelConstructDone(event)]]></xforms:script>
    </xforms:action>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="margin:0 auto;overflow: hidden;width:80%;position:relative;height:auto;"
      id="rootLayout" type="flow"> 
      <xhtml:table border="0" id="table1" style="width:100%;table-layout:fixed;" cellpadding="0"
        cellspacing="0"> 
        <xhtml:tr style="height:35px"> 
          <xhtml:td valign="middle" style="width:80px;" class="title"> 
            <xhtml:label class="xui-label"><![CDATA[标题]]></xhtml:label> 
          </xhtml:td>  
          <xhtml:td class="input"> 
            <xui:place control="iptTitle" id="controlPlace1" style="width:100%;"/> 
          </xhtml:td> 
        </xhtml:tr>  
        <xhtml:tr style="height:35px"> 
          <xhtml:td class="title"> 
            <xui:place control="btnAddRange" id="controlPlace4" style="width:100%;"/> 
          </xhtml:td>  
          <xhtml:td> 
            <xhtml:ul id="rangeList"> 
              <!--              <xhtml:li id="zs" class="range"> -->  
              <!--                <xhtml:div> -->  
              <!--                  <xhtml:span>张三</xhtml:span>  -->  
              <!--                  <xhtml:img alt="删除" src="/UI/system/images/templete/delete.gif"/> -->  
              <!--                </xhtml:div> -->  
              <!--              </xhtml:li>  -->  
              <!--              <xhtml:li id="zs" class="range"> -->  
              <!--                <xhtml:div> -->  
              <!--                  <xhtml:span>张三</xhtml:span>  -->  
              <!--                  <xhtml:img alt="删除" src="/UI/system/images/templete/delete.gif"/> -->  
              <!--                </xhtml:div> -->  
              <!--              </xhtml:li> --> 
            </xhtml:ul> 
          </xhtml:td> 
        </xhtml:tr>  
        <xhtml:tr> 
          <xhtml:td colSpan="2" class="input" style="padding-top:10px"> 
            <xui:place control="iptContent" id="controlPlace6" style="width:100%;height:366px;"/> 
          </xhtml:td> 
        </xhtml:tr>  
        <xhtml:tr style="height:35px"> 
          <xhtml:td colSpan="2"> 
            <xui:place control="btnSubmit"/>  
            <xui:place control="btnCancel"/> 
          </xhtml:td> 
        </xhtml:tr> 
      </xhtml:table>  
      <xui:place control="windowReceiveer1" id="controlPlace7" style="position:absolute;left:354px;top:35px;"/>  
      <xui:place control="orgDialog1" id="controlPlace9" style="position:absolute;left:368px;top:139px;"/>
    </xui:layout>  
    <xforms:input id="iptTitle" ref="data('dataTopic')/fTitle"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnAddRange"
      appearance="image-minimal" icon-class="icon-system-plus"> 
      <xforms:label><![CDATA[参与人]]></xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript2"><![CDATA[startTopic.btnAddRangeClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSubmit"
      appearance="image-text" icon-class="icon-system-floppy" class="button-green"> 
      <xforms:label><![CDATA[提交]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[startTopic.btnSubmitClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnCancel"
      appearance="image-minimal" icon-class="icon-system-back"> 
      <xforms:label><![CDATA[放弃]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate">
        <xforms:script id="xformsScript3"><![CDATA[startTopic.btnCancelClick(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:textarea ref="data('dataTopic')/fContent" id="iptContent" mediatype="text/html"/>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiveer1" onReceive="startTopic.windowReceiveer1Receive"/>  
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title=""
      width="600px" height="500px" modal="true" root-filter="SA_OPOrg.sParent is null"
      id="orgDialog1" onReceive="startTopic.orgDialog1Receive" multi-select="true"/>
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink2" href="startTopic.css"/>  
    <xhtml:script id="htmlScript1" src="startTopic.js"/> 
  </xui:resource> 
</xui:window>
