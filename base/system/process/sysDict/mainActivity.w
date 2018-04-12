<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="width:93px;height:auto;left:346px;top:217px;"> 
    <data auto-load="true" component="/UI/system/components/data.xbl.xml#bizData"
      concept="SysDictType" data-type="json" id="dataMain" is-tree="false" limit="-1"
      offset="0" update-mode="whereVersion" onAfterRefresh="mainActivity.dataMainAfterRefresh"
      onValueChanged="mainActivity.dataMainValueChanged" onBeforeSave="mainActivity.dataMainBeforeSave"> 
      <reader action="/base/system/logic/action/querySysDictTypeAction" id="default1"/>  
      <writer action="/base/system/logic/action/saveSysDictTypeAction" id="default2"/>  
      <creator action="/base/system/logic/action/createSysDictTypeAction" id="default3"/>  
      <rule id="default5" relation="FNAME" required="true()"/>  
      <rule id="dataBizRule4" relation="FTYPE" required="true()"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="listData" concept="SysDictItem" order-by="FDISPORDER asc"
      limit="-1" confirm-delete="false" onNewCreateParam="mainActivity.listDataNewCreateParam"> 
      <reader id="default8" action="/base/system/logic/action/querySysDictItemAction"/>  
      <writer id="default9" action="/base/system/logic/action/saveSysDictItemAction"/>  
      <creator id="default10" action="/base/system/logic/action/createSysDictItemAction"/>  
      <master id="master1" data="dataMain" relation="FBILLID"/>  
      <rule id="dataBizRule1" relation="FDISPORDER" required="true()" alert="'请填写显示顺序！'"/>  
      <rule id="dataBizRule2" relation="FCODE" required="true()" alert="'请填写编码！'"/>  
      <rule id="dataBizRule3" relation="FNAME" required="true()" alert="'请填写名称！'"/> 
    </data> 
  </xforms:model>  
  <xui:view auto-load="true" id="rootView"> 
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      id="saveTrigger" operation="save" operation-owner="dataMain"> 
      <xforms:label id="saveTriggerLabel"/> 
    </xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      id="deleteTrigger" operation="delete" operation-owner="dataMain"> 
      <xforms:label id="deleteTriggerLabel"/> 
    </xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      id="refreshTrigger" operation="refresh" operation-owner="dataMain"> 
      <xforms:label id="refreshTriggerLabel"/> 
    </xforms:trigger>  
    <xui:layout style="height:100%;width:100%"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout2" style="width:100%; height: 100%;;"> 
        <top id="borderLayout-top2" size="40px"> 
          <xhtml:div collapsed-label="隐藏过滤" component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            expandable="false" expanded="true" expanded-label="展开过滤" expanded-position="6"
            expanded-width="75" id="buttonBar1" separator="false" separator-size="8"
            style="height:38px;"> 
            <xui:place control="trigger8" id="controlPlace14" style="width:90px;"/>  
            <xui:place control="saveTrigger" id="saveTriggerPlace"/>  
            <xui:place control="deleteTrigger" id="controlPlace6"/>  
            <xui:place control="refreshTrigger" id="refreshTriggerPlace"/>  
            <li class="space " style="margin: 0 4px;">|</li>
            <xhtml:label id="filterinput" class="xui-label" style="font-size: 14px;"><![CDATA[过滤]]></xhtml:label><xui:place control="smartFilter1" id="controlPlace10"/> 
          </xhtml:div> 
        </top>  
        <center id="borderLayout-center2"> 
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="190" has-arrow-button="true" has-drag-bar="true" id="HSplitter1"
            mode="horz" style="width:100%;height:100%;" resizable="false"> 
            <xhtml:div id="div1" region="left"> 
              <xui:place control="grid2" id="controlPlace4" style="height:100%;width:100%;"/> 
            </xhtml:div>  
            <xhtml:div id="div3" region="right"> 
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                id="borderLayout1" style="width:100%;height:100%;"> 
                <top size="138px" id="borderLayout-top1" style="padding-left:10px;"> 
                  <xui:place control="view1" id="controlPlace1" style="width:100%;height:100px;"/>  
                  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                    id="buttonBar2"> 
                    <xui:place control="trigger1" id="controlPlace5" style="width:75px;"/>  
                    <xui:place control="trigger2" id="controlPlace7"/> 
                  </xhtml:div> 
                </top>  
                <center id="borderLayout-center1" style="overflow:hidden;"> 
                  <xui:place control="view3" id="controlPlace12" style="height:100%;padding-left:10px;width:100%;"></xui:place></center> 
              </xhtml:div> 
            </xhtml:div> 
          </xhtml:div> 
        </center> 
      </xhtml:div> 
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger8"
      operation-owner="dataMain" appearance="image-minimal" operation="new"> 
      <xforms:label id="default18"><![CDATA[新建字典]]></xforms:label> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid2" data="dataMain" class="grid-choice"> 
      <xui:column id="gridColumn1" ref="FNAME" label="名称" type="ed" width="*" align="left" visible="true"/> 
    </xhtml:div>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
      operation-owner="listData" operation="new" appearance="image-minimal"> 
      <xforms:label id="default4"><![CDATA[添加项目]]></xforms:label> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
      operation-owner="listData" operation="delete" appearance="image-minimal"> 
      <xforms:label id="default6"><![CDATA[]]></xforms:label> 
    </xforms:trigger>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xui:place control-label="input1" id="controlLabel2" style="position:absolute;left:1px;top:0px;"/>  
        <xui:place control="input1" id="controlPlace2" style="position:absolute;top:0px;left:41px;width:187px;"/>  
        <xui:place control-label="input2" id="controlLabel1" style="position:absolute;top:0px;left:256px;"/>  
        <xui:place control="input2" id="controlPlace3" style="position:absolute;top:0px;width:187px;left:300px;"/>  
        <xui:place control-label="textarea1" id="controlLabel3" style="position:absolute;left:1px;top:36px;"/>  
        <xui:place control="textarea1" id="controlPlace9" style="position:absolute;height:40px;width:448px;top:36px;left:41px;"/> 
      </layout>  
      <xforms:input id="input1" ref="data('dataMain')/FNAME"/>  
      <xforms:input id="input2" ref="data('dataMain')/FTYPE"/>  
      <xforms:textarea ref="data('dataMain')/fREMARK" id="textarea1"/> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
      id="smartFilter1" filter-data="dataMain" filter-relations="FNAME,FTYPE" auto-refresh="true"/> 
  <xui:view auto-load="true" id="view3" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout3"><xui:place control="grid3" id="controlPlace8" style="height:100%;position:absolute;width:100%;"></xui:place></layout>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid3" data="listData">
   <xui:column id="gridColumn4" ref="FDISPORDER" label="显示顺序" type="ed" width="71px"></xui:column>
   <xui:column id="gridColumn2" ref="FCODE" label="编码" type="ed" width="174px"></xui:column>
   <xui:column id="gridColumn3" ref="FNAME" label="名称" type="ed" width="208px" align="center"></xui:column>
   <xui:column id="gridColumn5" ref="fREMARK" label="备注" type="ed" width="*"></xui:column></xhtml:div></xui:view></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="mainActivity.js"/> 
  <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="mainActivity.css"></xhtml:link></xui:resource> 
</xui:window>
