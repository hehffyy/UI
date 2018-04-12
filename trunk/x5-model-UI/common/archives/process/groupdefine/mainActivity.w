<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:81px;top:132px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="groupData" concept="B_BusinessGroup" limit="-1"
      onRefreshCreateParam="mainActivity.groupDataRefreshCreateParam" onNewCreateParam="mainActivity.groupDataNewCreateParam"> 
      <reader id="default1" action="/common/archives/logic/action/queryB_BusinessGroupAction"/>  
      <writer id="default2" action="/common/archives/logic/action/saveB_BusinessGroupAction"/>  
      <creator id="default3" action="/common/archives/logic/action/createB_BusinessGroupAction"/>  
      <calculate-relation relation="operation" id="calculate-relation1"/>  
      <filter name="filter_GroupType" id="filter1"><![CDATA[fGroupType=:groupType]]></filter> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="funcData" concept="B_GroupFunc" limit="-1"> 
      <reader id="default4" action="/common/archives/logic/action/queryB_GroupFuncAction"/>  
      <writer id="default5" action="/common/archives/logic/action/saveB_GroupFuncAction"/>  
      <creator id="default6" action="/common/archives/logic/action/createB_GroupFuncAction"/>  
      <master id="master1" data="groupData" relation="fBusinessGroupId"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="fieldData" concept="B_GroupField" limit="-1"
      order-by="fFieldOrder asc"> 
      <reader id="default7" action="/common/archives/logic/action/queryB_GroupFieldAction"/>  
      <writer id="default8" action="/common/archives/logic/action/saveB_GroupFieldAction"/>  
      <creator id="default9" action="/common/archives/logic/action/createB_GroupFieldAction"/>  
      <master id="master2" data="groupData" relation="fBusinessGroupId"/> 
    </data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="320px"
        mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;"
        has-drag-bar="true"> 
        <xhtml:div region="left" id="divLeft"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout1" style="width:100%; height: 100%;;"> 
            <top size="30px" id="borderLayout-top4"> 
              <xui:place control="toolbars1" id="controlPlace5"/> 
            </top>  
            <center id="borderLayout-center4"> 
              <xui:place control="gridGroup" id="controlPlace2" style="height:100%;width:99%;"/> 
            </center> 
          </xhtml:div> 
        </xhtml:div>  
        <xhtml:div region="right" id="divRight"> 
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="50%" mode="vert" id="VSplitter2" class="xui-splitter" style="height:100%;width:100%;"> 
            <xhtml:div region="top" id="divRightTop"> 
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                id="borderLayout2" style="width:100%; height: 100%;;"> 
                <top size="30px" id="borderLayout-top2"> 
                  <xui:place control="toolbars2" id="controlPlace7"/> 
                </top>  
                <center id="borderLayout-center2"> 
                  <xui:place control="grid2" id="controlPlace3" style="height:100%;width:100%;"/> 
                </center> 
              </xhtml:div> 
            </xhtml:div>  
            <xhtml:div region="bottom" id="divRightBottom"> 
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                id="borderLayout3" style="width:100%; height: 100%;;"> 
                <top size="30px" id="borderLayout-top3"> 
                  <xui:place control="toolbars3" id="controlPlace8" style="width:395px;"/> 
                </top>  
                <center id="borderLayout-center3"> 
                  <xui:place control="grid3" id="controlPlace4" style="height:100%;width:100%;"/> 
                </center> 
              </xhtml:div> 
            </xhtml:div> 
          </xhtml:div> 
        </xhtml:div> 
      </xhtml:div>  
      <xui:place control="dlgSelectProcess" id="controlPlace9" style="position:absolute;left:472px;top:137px;"/>  
      <xui:place control="dlgSelectField" id="controlPlace1" style="position:absolute;left:423px;top:362px;"/>  
      <xui:place control="wdDataPermission" id="controlPlace6" style="position:absolute;left:180px;top:230px;"/>
      <xui:place control="dlgSelectProcess2" id="controlPlace10" style="top:177px;left:579px;"/>
    </xui:layout>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="gridGroup" data="groupData" onRowClick="mainActivity.gridGroupRowClick"
      space-column="false"> 
      <xui:column id="gridColumn2" ref="fGroupOrder" label="显示顺序" type="ed" width="62px"
        align="center"/>  
      <xui:column id="gridColumn1" ref="fGroupName" label="分组名称" type="ed" width="*"/>  
      <xui:column id="gridColumn13" ref="operation" label="重新加载" type="html" width="73px"
        onRender="mainActivity.grid1_operationRender"/>  
      <xui:column id="gridColumn15" ref="fValid" label="有效" type="ch" width="60px" align="center"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars1"> 
      <xui:bar component="/UI/system/components/bar.xbl.xml#navigatorBar" mode="IMG_TXT_LR"
        id="navigatorBar1" data="groupData"> 
        <item name="insert-item" id="barItem1"/>  
        <item name="save-item" id="barItem2"/>  
        <item name="delete-item" id="barItem3"/>  
        <item name="refresh-item" id="barItem4"/>  
        <item id="customBarItem4"> 
          <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
            id="smartFilter2" style="width:90px;" filter-data="groupData" filter-relations="fGroupName"
            auto-refresh="true"/> 
        </item> 
      </xui:bar> 
    </xhtml:div>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid2" data="funcData"> 
      <xui:column id="gridColumn17" ref="fProcessOrder" label="显示顺序" type="ed" width="64px" align="center"/>
      <xui:column id="gridColumn3" ref="fFuncName" label="业务名称" type="ro" width="200px"
        filter-editor="#text_filter"/>  
      <xui:column id="gridColumn7" ref="fFuncLongName" label="流程全名" type="ro" width="400px"
        filter-editor="#text_filter"/>
      <xui:column id="gridColumn9" ref="fProcess" label="流程" type="ro" width="*"/> 
    </xhtml:div>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid3" data="fieldData" space-column="false" edit-mode="true"> 
      <xui:column id="gridColumn6" ref="fFieldOrder" label="显示顺序" type="ed" width="70px"
        align="center"/>  
      <xui:column id="gridColumn14" ref="fGroupIndex" label="分组序号" type="ed" width="70px"/>  
      <xui:column id="gridColumn8" ref="fTableName" label="概念名" type="ed" width="200"
        readonly="true"/>  
      <xui:column id="gridColumn4" ref="fFieldName" label="字段名称" type="ed" width="147px"
        readonly="false" align="center"/>  
      <xui:column id="gridColumn5" ref="fField" label="字段标识" type="ed" width="105px"
        readonly="true" align="center"/>  
      <xui:column id="gridColumn10" ref="fFieldAlias" label="字段别名" type="ed" width="100px"
        align="center"/>  
      <xui:column id="gridColumn11" ref="fDataType" label="字段类型" type="ed" width="70px"
        readonly="true" align="center"/>  
      <xui:column id="gridColumn16" ref="fSearchType" label="搜索类型" type="select" width="100px"
        editor="gridSelect1"> 
        <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
          dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
          ext-separator="," id="gridSelect1" ref="data('fieldData')/fSearchType" label-ref="data('fieldData')/fSearchType"> 
          <xforms:label ref="type" id="default32"/>  
          <xforms:value ref="type" id="default33"/>  
          <xforms:itemset id="default34"> 
            <xforms:column ref="type" id="default35"/>  
            <itemset-data xmlns="" id="default62">  
              <rows id="default63"> 
                <row id="default64"> 
                  <cell id="default65"/> 
                </row>  
                <row id="default66"> 
                  <cell id="default67">smart</cell> 
                </row>  
                <row id="default68"> 
                  <cell id="default69">exect</cell> 
                </row><!--  
                <row id="default70"> 
                  <cell id="default71">between</cell> 
                </row> 
              --></rows> 
            </itemset-data> 
          </xforms:itemset> 
        </xhtml:div> 
      </xui:column>  
      <xui:column id="gridColumn12" ref="fShowLength" label="显示长度" type="ed" width="100px"
        align="center"/>  
      <xui:column id="gridColumn18" ref="fTaskGroups" label="显示权限"
        type="select" width="180px" editor="gridSelect2">
        <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
          dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
          ext-separator="," id="gridSelect2" ref="data('fieldData')/fTaskGroups" label-ref="data('fieldData')/fTaskGroups"
          multi-select="true"> 
          <xforms:label ref="name" id="default20"/>  
          <xforms:value ref="type" id="default21"/>  
          <xforms:itemset id="default22">
            <xforms:column ref="type" visible="false" id="default23"/>  
            <xforms:column ref="name" id="default24"/>  
            <itemset-data xmlns="" id="default76">  
              <rows id="default77">  
                <row id="default105"> 
                  <cell id="default106"/>  
                  <cell id="default107"/>
                </row> 
                <row id="default81"> 
                  <cell id="default82">WAITTING</cell>  
                  <cell id="default83">待办件</cell>
                </row>  
                <row id="default93"> 
                  <cell id="default94">SIGNIN</cell>  
                  <cell id="default95">签收件</cell>
                </row>  
                <row id="default84"> 
                  <cell id="default85">SUSPEND</cell>  
                  <cell id="default86">挂起件</cell>
                </row>  
                <row id="default78"> 
                  <cell id="default79">SUBMITED</cell>  
                  <cell id="default80">移交件</cell>
                </row>  
                <row id="default102"> 
                  <cell id="default103">HAVEDONE</cell>  
                  <cell id="default104">已办件</cell>
                </row>  
                <row id="default87"> 
                  <cell id="default88">NOTHANDLE</cell>  
                  <cell id="default89">经办件(未办结)</cell>
                </row>  
                <row id="default90"> 
                  <cell id="default91">HANDLED</cell>  
                  <cell id="default92">经办件(已办结)</cell>
                </row>  
                <row id="default96"> 
                  <cell id="default97">PERSONALATTENTION</cell>  
                  <cell id="default98">个人关注件</cell>
                </row>  
                <row id="default99"> 
                  <cell id="default100">PUSHATTENTION</cell>  
                  <cell id="default101">推送关注件</cell>
                </row>  
              </rows> 
            </itemset-data>
          </xforms:itemset>
        </xhtml:div>
      </xui:column>
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars2"> 
      <xui:bar component="/UI/system/components/bar.xbl.xml#navigatorBar" mode="IMG_TXT_LR"
        id="navigatorBar2" data="funcData" style="width:344px;height:33px;"> 
        <item id="customBarItem11"> 
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgSelectProcess"> 
            <xforms:label id="default10"><![CDATA[快捷添加业务]]></xforms:label>  
            <xforms:action id="action1" ev:event="DOMActivate"> 
              <xforms:script id="xformsScript1"><![CDATA[mainActivity.trgSelectProcessClick (event)]]></xforms:script> 
            </xforms:action> 
          </xforms:trigger> 
        </item>
        <item id="customBarItem3">
        	<xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"  > 
            <xforms:label id="default20"><![CDATA[添加业务]]></xforms:label>  
            <xforms:action id="action4" ev:event="DOMActivate">
              <xforms:script id="xformsScript4"><![CDATA[mainActivity.trigger2Click(event)]]></xforms:script>
            </xforms:action>
          </xforms:trigger>
        </item>   
        <item name="save-item" id="barItem10"/>  
        <item name="delete-item" id="barItem11"/>  
        <item name="refresh-item" id="barItem12"/> 
      </xui:bar> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars3"> 
      <xui:bar component="/UI/system/components/bar.xbl.xml#navigatorBar" mode="IMG_TXT_LR"
        id="navigatorBar3" data="fieldData"> 
        <item id="customBarItem2"> 
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgInitSys"
            style="width:106px;"> 
            <xforms:label id="default19"><![CDATA[初始化系统字段]]></xforms:label>  
            <xforms:action id="action3" ev:event="DOMActivate"> 
              <xforms:script id="xformsScript3"><![CDATA[mainActivity.trgInitSysClick(event)]]></xforms:script> 
            </xforms:action> 
          </xforms:trigger> 
        </item>  
        <item id="customBarItem1"> 
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgSelectField" style="width:96px;"> 
            <xforms:label id="default11"><![CDATA[合并字段定义]]></xforms:label>  
            <xforms:action id="action2" ev:event="DOMActivate"> 
              <xforms:script id="xformsScript2"><![CDATA[mainActivity.trgSelectFieldClick(event)]]></xforms:script> 
            </xforms:action> 
          </xforms:trigger> 
        </item>  
         <item id="customBarItemV2"> 
          <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgSelectFieldV2" style="width:91px;"> 
            <xforms:label id="default11V2"><![CDATA[交集字段定义]]></xforms:label>  
            <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[mainActivity.trgSelectFieldV2Click(event)]]></xforms:script></xforms:action></xforms:trigger> 
        </item>  
        <item name="save-item" id="barItem18"/>  
        <item name="delete-item" id="barItem19"/>  
        <item name="refresh-item" id="barItem20"/> 
      <item id="customBarItem3"><xhtml:label id="label1" class="xui-label" style="padding-left:20px;color:red;"><![CDATA[说明：（显示权限:为空时表示该字段所有分组都显示）]]></xhtml:label></item></xui:bar> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="" width="800px" height="600px" modal="true" id="dlgSelectProcess" url="/bizmodel/modelService/process/ModelService/processSelectDialog.w"
      onReceive="mainActivity.dlgSelectProcessReceive" onInit="mainActivity.dlgSelectProcessInit" status="maximize"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="" width="600px" height="400px" modal="true" id="dlgSelectField" url="/UI/common/archives/process/groupdefine/fieldDialogActivity.w"
      reload-on-open="true" onInit="mainActivity.dlgSelectFieldInit" status="maximize"> 
       
    <result concept="fieldData" operation="edit" origin="main" id="default25">
   <mapping from="fBusinessGroupId" to="fBusinessGroupId" locator="true" id="default26"></mapping>
   <mapping from="fFieldName" to="fFieldName" id="default27"></mapping>
   <mapping from="fField" to="fField" locator="true" id="default28"></mapping>
   <mapping from="fTableName" to="fTableName" locator="true" id="default29"></mapping>
   <mapping from="fDataType" to="fDataType" id="default30"></mapping>
   <mapping from="fFieldAlias" to="fFieldAlias" id="default31"></mapping></result></xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="分组数据策略" width="800px" height="400px" modal="false" id="wdDataPermission"
      url="/UI/common/archives/process/groupdefine/groupDataPermission.w" left="266px"/>
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="业务添加" width="800px" height="600px" modal="true" id="dlgSelectProcess2" url="/UI/common/commdialogs/funcTree/selectMultiFunctions.w?"
      onReceive="mainActivity.dlgSelectProcessReceive2" status="maximize"/>
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="mainActivity.js"/> 
  </xui:resource> 
</xui:window>
