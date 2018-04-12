<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xforms="http://www.justep.com/xforms"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;top:139px;left:217px;"> 
    <data auto-load="true" component="/UI/system/components/data.xbl.xml#bizData"
      concept="B_ActivityMapping" data-type="json" direct-delete="true" id="listData"
      limit="-1" offset="1" xui:update-mode="whereVersion" update-mode="whereAll"
      order-by="fdjxlbh desc,fdjdlbh desc"> 
      <reader action="/bdc/gwbl/logic/action/queryB_ActivityMappingAction" id="default3"/>  
      <writer action="/bdc/gwbl/logic/action/saveB_ActivityMappingAction" id="default4"/>  
      <creator action="/bdc/gwbl/logic/action/createB_ActivityMappingAction" id="default5"/>  
      <calculate-relation relation="calculate0" id="calculate-relation1"/>
    </data> 
  </xforms:model>  
  <xui:view auto-load="true" id="rootView"> 
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      dialogUpdate="true" height="500px" id="detailDialog" modal="true" onReceive="mainActivity.detailDialogReceive"
      title="详细信息" url="/bdc/gwbl/process/activitymapping/mainActivityDetail.w" width="600px"
      status="maximize"/>  
    <xhtml:div component="/UI/system/components/bizDataFilterMenu.xbl.xml#bizDataFilterMenu"
      data="listData" id="bizDataFilterMenu1"/>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      data="listData" header-row-height="30" id="listGrid" onRowDblClick="mainActivity.listGridRowDblClick"
      row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      edit-mode="true"> 
      <xui:column id="gridColumn5" ref="calculate0" type="ed" width="52px" show-index="true"
        label="序号"/>
      <xui:column id="gridColumn8" ref="fzmlmc" label="证明类名称" type="ed" width="119px"
        filter-editor="#text_filter"/>
      <xui:column id="gridColumn2" ref="fdjdlmc" label="登记大类名称" type="ed" width="109px"
        filter-editor="#text_filter" readonly="true"/>
      <xui:column id="gridColumn4" ref="fdjxlmc" label="登记小类名称" type="ed" width="259px"
        filter-editor="#text_filter" readonly="true"/>
      <column id="default7" label="流程process" ref="fBrowseProcess" type="ed" width="500px"
        filter-editor="#text_filter" enter-selected="false"/>  
      <column id="default8" label="启动环节" ref="fBrowseActivity" type="ed" width="73px"
        align="center"/>  
      <xui:column id="gridColumn6" ref="fStatus" label="状态" type="ed" width="53px"
        align="center" readonly="true"/>  
      <xui:column id="gridColumn9" ref="fywdm" label="业务代码" type="ed" width="85px"/>  
      <xui:column id="gridColumn10" ref="fxbts" label="限办天数" type="ed" width="70px"/>
    </xhtml:div>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
      appearance="image-text" class="button-blue"> 
      <xforms:label id="default11"><![CDATA[生成]]></xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate">
        <xforms:script id="xformsScript3"><![CDATA[mainActivity.trigger2Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>
    <xforms:trigger appearance="image-text" class="button-blue" component="/UI/system/components/trigger.xbl.xml#trigger"
      icon-class="icon-system-plus" id="newTrigger"> 
      <xforms:label id="newTriggerLabel"> <![CDATA[新建]]> </xforms:label>  
      <xforms:action ev:event="DOMActivate" id="action2"> 
        <xforms:script id="xformsScript2"> <![CDATA[mainActivity.insertItemClick(event)]]> </xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      icon-class="icon-system-edit-alt" id="editTrigger"> 
      <xforms:label id="default1"> <![CDATA[编辑]]> </xforms:label>  
      <xforms:action ev:event="DOMActivate" id="action1"> 
        <xforms:script id="xformsScript1"> <![CDATA[mainActivity.editItemClick(event)]]> </xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      icon-class="icon-system-trash" id="deleteTrigger" operation="delete" operation-owner="listData"> 
      <xforms:label id="deleteTriggerLabel"/> 
    </xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      id="refreshTrigger" operation="refresh" operation-owner="listData"> 
      <xforms:label id="refreshTriggerLabel"/> 
    </xforms:trigger>  
    <xui:layout style="height:100%;width:100%;position:relative;" type="absolute"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%; height: 100%;position:absolute;"> 
        <top id="borderLayout-top1" size="40px"> 
          <xhtml:div collapsed-label="隐藏过滤" component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            expandable="false" expanded="true" expanded-label="展开过滤" expanded-position="6"
            expanded-width="75" id="navigatorBar" separator="false" separator-size="2"
            style="height:36px;width:1028px;"> 
            <xui:place control="trigger2" id="controlPlace9" style="width:85px;"/>
            <xui:place control="newTrigger" id="controlPlace2"/>  
            <xui:place control="trigger1" id="controlPlace5"/>
            <xui:place control="editTrigger" id="controlPlace6"/>  
            <xui:place control="deleteTrigger" id="controlPlace3"/>  
            <xui:place control="trigger5" id="controlPlace13" style="width:70px;"/>
            <xui:place control="trigger6" id="controlPlace14"/>
            <xui:place control="refreshTrigger" id="controlPlace4"/>  
            <xui:place control="gridFilter2" id="controlPlace11" style="width:94px;"/>
            <xhtml:div class="xui-input" component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
              filter-data="listData" filter-relations="fBizNo,fBrowseProcess,fBrowseActivity,fBizProcess,fExecutorexpr"
              id="smartFilter1" style="width:130px;" auto-refresh="true"/>  
            <xforms:trigger appearance="image" class="button-yellow" component="/UI/system/components/trigger.xbl.xml#trigger"
              icon-class="icon-system-search" id="searchTrigger" operation="refresh"
              operation-owner="listData" style="width:30px;"> 
              <xforms:label id="searchTriggerLabel"/> 
            </xforms:trigger> 
          </xhtml:div> 
        </top>  
        <center id="borderLayout-center1"> 
          <xui:place control="bizDataFilterMenu1" id="controlPlace7" style="top:5px;left:531px;"/>  
          <place control="listGrid" style="width:100%;height:100%;"/>
        </center> 
      </xhtml:div>  
      <xui:place control="detailDialog" id="controlPlace1" style="top:293px;left:263px;position:absolute;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/filter.xbl.xml#gridFilter" all-selected-label="'全部'"
      id="gridFilter2" filter-data="listData" filter-relation="fFlowType" default-value="'市局流程'"
      default-label="'市局流程'" multi-select="true"> 
      <xforms:label ref="value" id="default15"/>  
      <xforms:value ref="value" id="default16"/>  
      <xforms:itemset id="default17"> 
        <xforms:column ref="value" id="default24"/>  
        <itemset-data xmlns="" id="default25">  
          <rows id="default26">  
            <row id="default27"> 
              <cell id="default28">市局流程</cell>
            </row>  
            <row id="default29"> 
              <cell id="default30">区县流程1</cell>
            </row> 
           	<row id="default31"> 
              <cell id="default32">区县流程2</cell>
            </row>
          </rows> 
        </itemset-data>
      </xforms:itemset>
    </xhtml:div>
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5"> 
      <xforms:label id="default13"><![CDATA[启用]]></xforms:label>  
      <xforms:action id="action4" ev:event="DOMActivate">
        <xforms:script id="xformsScript4"><![CDATA[mainActivity.trigger5Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger6"> 
      <xforms:label id="default14"><![CDATA[停用]]></xforms:label>  
      <xforms:action id="action5" ev:event="DOMActivate">
        <xforms:script id="xformsScript5"><![CDATA[mainActivity.trigger6Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
      operation-owner="listData" operation="save" appearance="image-minimal"> 
      <xforms:label id="default2"><![CDATA[]]></xforms:label>
    </xforms:trigger>
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="mainActivity.js"/> 
  </xui:resource> 
</xui:window>
