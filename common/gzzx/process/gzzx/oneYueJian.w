<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="selfChuLi" concept="B_HuoDongChuLi" order-by="fGlobalOrder asc"
      onAfterNew="oneYueJian.selfChuLiAfterNew" onRefreshCreateParam="oneYueJian.selfChuLiRefreshCreateParam"> 
      <reader id="default3" action="/common/gzzx/logic/action/queryHuoDongChuLiAction"/>  
      <calculate-relation relation="calculate3" id="calculate-relation1"/>  
      <writer id="default7" action="/common/gzzx/logic/action/saveHuoDongChuLiAction"/>  
      <creator id="default8" action="/common/gzzx/logic/action/createHuoDongChuLiAction"/>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="otherChuli" concept="B_HuoDongChuLi"
      limit="-1" order-by="fGlobalOrder asc" onRefreshCreateParam="oneYueJian.otherChuliRefreshCreateParam"> 
      <reader id="default4" action="/common/gzzx/logic/action/queryHuoDongChuLiAction"/>  
      <writer id="default5" action="/common/gzzx/logic/action/saveHuoDongChuLiAction"/>  
      <creator id="default6" action="/common/gzzx/logic/action/createHuoDongChuLiAction"/>  
      <rule id="dataBizRule4" concept="B_HuoDongChuLi" readonly="true()"/>  
      <calculate-relation relation="calculate0" id="calculate-relation2"/>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="name" src="" auto-load="false" id="data" store-type="simple" auto-new="true"
      onValueChanged="oneYueJian.dataValueChanged"/>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="B_GongZuoHuoDong" concept="B_GongZuoHuoDong"
      store-type="simple" limit="-1" confirm-refresh="false"> 
      <reader id="default11" action="/common/gzzx/logic/action/queryGongZuoHuoDongAction"/>  
      <writer id="default12"/>  
      <creator id="default15"/>
    </data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;;"> 
        <center id="borderLayout-center1">
          <xui:place control="windowFrame" id="controlPlace1" style="width:100%;height:100%;"/>
        </center>  
        <right size="250px" id="borderLayout-right1">
          <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1"
            class="xui-tabPanel" style="height:100%;width:100%;;;"> 
            <xui:tab id="tabPage2"> 
              <xui:label id="xuiLabel2">个人意见</xui:label>  
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                id="borderLayout3" style="width:100%; height: 100%;;"> 
                <center id="borderLayout-center3"> 
                  <xui:place control="grid2" id="controlPlace32" style="width:100%;height:100%;"/>
                </center>  
                <bottom size="250px" id="borderLayout-bottom2"> 
                  <xui:place control="textarea2" id="controlPlace33" style="width:100%;height:100%;"/>
                </bottom>  
                <top size="40px" id="borderLayout-top1"> 
                  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                    id="buttonBar1" style="height:40px;padding-left:15px;width:100%;;"
                    separator-size="10"> 
                    <xui:place control="checkbox1" id="controlPlace36" style="height:30px;"/>  
                    <xui:place control="trigger1" id="controlPlace35" style="width:50px;"/>  
                    <xui:place control="trigger2" id="controlPlace34" style="width:50px;"/>
                  </xhtml:div> 
                </top> 
              </xhtml:div> 
            </xui:tab>  
            <xui:tab id="tabPage1" xforms-select="oneYueJian.tabPage1Select"> 
              <xui:label id="xuiLabel1">他人意见</xui:label>  
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                id="borderLayout2" style="width:100%; height: 100%;;"> 
                <center id="borderLayout-center2"> 
                  <xui:place control="grid1" id="controlPlace27" style="height:100%;width:100%;"/>
                </center> 
              <bottom size="250px" id="borderLayout-bottom1"><xui:place control="textarea1" id="controlPlace2" style="height:100%;width:100%;"></xui:place></bottom></xhtml:div> 
            </xui:tab> 
          </xhtml:div>
        </right>
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace31" style="left:290px;top:128px;"/>  
      <xui:place control="windowDialog" id="controlPlace28" style="left:351px;top:127px;"/>
    </xui:layout>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid2" data="selfChuLi"> 
      <xui:column id="gridColumn5" ref="calculate3" type="ro" width="30px"
        align="center" show-index="true" label="序号 "/>  
      <xui:column id="gridColumn8" ref="fDeptName" label="部门" type="ro" width="100px"/>
      <xui:column id="gridColumn4" ref="fFinishTime" label="日期" type="ro" width="100px"
        format="yyyy-MM-dd" align="center"/> 
    </xhtml:div>  
    <xforms:textarea ref="data('selfChuLi')/fContent" id="textarea2"> 
      <xforms:action id="action1" ev:event="xforms-value-changed">
        <xforms:script id="xformsScript1"><![CDATA[oneYueJian.textarea2Change(event)]]></xforms:script>
      </xforms:action>
    </xforms:textarea>  
    <xforms:select id="checkbox1" ref="data('data')/name"> 
      <xforms:item id="selectItem10"> 
        <xforms:label id="default9">保持未阅</xforms:label>  
        <xforms:value id="default10">保持未阅</xforms:value>
      </xforms:item> 
    </xforms:select>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
      class="button-blue"> 
      <xforms:label id="default13">阅办</xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate">
        <xforms:script id="xformsScript2"><![CDATA[oneYueJian.trigger1Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
      class="button-blue" icon-class="icon-system-floppy"> 
      <xforms:label id="default14">传阅</xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate">
        <xforms:script id="xformsScript3"><![CDATA[oneYueJian.trigger2Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="otherChuli"> 
      <xui:column id="gridColumn7" ref="calculate0" label="序号" type="ed" width="40px"
        align="center" show-index="true"/>  
      <xui:column id="gridColumn1" ref="fOrgUnitName" label="人员" type="ed" width="80px"/>  
      <xui:column id="gridColumn6" ref="fFinishTime" label="日期" type="ed" width="100px"
        format="yyyy-MM-dd" align="center"/>
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="oneYueJian.windowReceiverReceive"/>  
    <xhtml:div component="/UI/system/components/windowFrame.xbl.xml#windowFrame"
      id="windowFrame"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="选择传阅接收人" width="550px" height="400px" modal="true" id="windowDialog"
      url="/UI/common/gzzx/process/gzzx/chuanYueActivity.w" status="minimize" reload-on-open="true"
      onReceive="oneYueJian.windowDialogReceive"/>
  <xforms:textarea ref="data('otherChuli')/fContent" id="textarea1"></xforms:textarea></xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="oneYueJian.js"/>
  </xui:resource> 
</xui:window>
