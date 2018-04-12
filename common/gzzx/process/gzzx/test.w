<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:778px;top:203px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="myZhuXian" concept="B_GongZuoZhuXian"
      store-type="grid" limit="15" confirm-refresh="false" confirm-delete="false"
      onBeforeRefresh="mainActivity.myZhuXianBeforeRefresh"> 
      <reader id="default8" action="/common/gzzx/logic/action/queryMyAllZhuXianAction"/>  
      <writer id="default9" action="/common/gzzx/logic/action/saveGongZuoZhuXianAction"/>  
      <creator id="default10" action="/common/gzzx/logic/action/createGongZuoZhuXianAction"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="huoDongOfZX" concept="B_GongZuoHuoDong"
      onBeforeRefresh="mainActivity.huoDongOfZXBeforeRefresh" store-type="simple"
      relations="fActivityTitle,fHostOrg,FAssistedOrg,fActivityTarget,fExpectedFinishDate,fActualFinishDate,fItemType"> 
      <reader id="default11" action="/common/gzzx/logic/action/queryGongZuoHuoDongAction"/>  
      <writer id="default12" action="/common/gzzx/logic/action/saveGongZuoHuoDongAction"/>  
      <creator id="default15" action="/common/gzzx/logic/action/createGongZuoHuoDongAction"/>  
      <master id="master1" data="myZhuXian" relation="fZhuXian"/> 
    </data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:table border="1" id="table1" style="height:116px;width:732px;"> 
        <xhtml:tr id="tr1"> 
          <xhtml:td id="td1" rowspan="2" style="width:80px;"/>  
          <xhtml:td id="td2" height="30px"/> 
        </xhtml:tr>  
        <xhtml:tr id="tr2"> 
          <xhtml:td id="td4"/> 
        </xhtml:tr> 
      </xhtml:table>  
      </xui:layout>  
    </xui:view>  
  <xui:resource id="resource1"/> 
</xui:window>
