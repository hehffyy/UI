<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:48px;height:auto;top:157px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="dataTopic" concept="B_SYS_Topic" confirm-refresh="false"
      limit="1" store-type="simple" onAfterRefresh="oneTopic.dataTopicAfterRefresh"> 
      <reader id="default1" action="/common/topic/logic/action/queryB_SYS_TopicAction"/>  
      <writer id="default2" action="/common/topic/logic/action/saveB_SYS_TopicAction"/>  
      <creator id="default3" action="/common/topic/logic/action/createB_SYS_TopicAction"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="dataReply" concept="B_SYS_TopicReply"
      limit="10" onAfterRefresh="oneTopic.dataReplyAfterRefresh" confirm-refresh="false"
      store-type="simple"> 
      <reader id="default4" action="/common/topic/logic/action/queryB_SYS_TopicReplyAction"/>  
      <writer id="default5" action="/common/topic/logic/action/saveB_SYS_TopicReplyAction"/>  
      <creator id="default6" action="/common/topic/logic/action/createB_SYS_TopicReplyAction"/>  
      <master id="master1"/> 
    </data>  
    <xforms:action id="action1" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript1"><![CDATA[oneTopic.model1XBLLoaded(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action2" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript2"><![CDATA[oneTopic.model1ModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="dataPerson" concept="SA_OPPerson" store-type="simple"
      limit="1" relations="SA_OPPerson,sPhoto,sTitle"> 
      <reader id="default8" action="/SA/OPM/logic/action/queryOPPersonAction"/>  
      <master id="master2"/> 
    </data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout id="rootLayout"> 
      <xui:place control="windowReceiver1" id="controlPlace1" style="position:absolute;left:29px;top:73px;"/>  
      <xhtml:div class="mbm"> 
        <xhtml:a id="post_reply" title="回复" onclick="oneTopic.replyTopic(event);"> 
          <xhtml:img src="/UI/common/topic/process/topic/image/pn_reply.png" alt="回复"/> 
        </xhtml:a>  
        <xui:place control="pageNavigator1" style="float:right;margin-top: 6px;"/> 
      </xhtml:div>  
      <xhtml:div class="cl"> 
        <xhtml:table class="block"> 
          <xhtml:tr> 
            <xhtml:td style="width:120px"> 
              <xhtml:div> 
                <xui:place control="psnIMG" id="controlPlace3" style="height:24px;width:24px;float:left"/>  
                <xhtml:a>aaa</xhtml:a> 
              </xhtml:div> 
            </xhtml:td>  
            <xhtml:td> 
              <xhtml:h1 id="title" class="ts"/> 
            </xhtml:td> 
          </xhtml:tr> 
        </xhtml:table> 
      </xhtml:div>  
      <xhtml:div id="topic"/>  
      <xhtml:div id="replyList"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver1" onReceive="oneTopic.windowReceiver1Receive"/>  
    <xhtml:div data="dataReply" component="/UI/system/components/pageNavigator.xbl.xml#pageNavigator"
      id="pageNavigator1"/>  
    <xhtml:div component="/UI/system/components/blob.xbl.xml#image" id="psnIMG" data="dataPerson"
      concept="SA_OPPerson" relation="sPhoto"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" href="topicDetial.css"/>  
    <xhtml:script id="htmlScript1" src="topicDetial.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" href="view.css"/> 
  </xui:resource> 
</xui:window>
