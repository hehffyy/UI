<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model1" style="height:auto;top:262px;left:424px;"> 
    <xforms:action id="action3" ev:event="onload"> 
      <xforms:script id="xformsScript3">archiveQuery.model1Load(event)</xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#data" columns="status,statusName,smartValue,filterType,B_BizRec.fReceiveTime,showCldBiz,searchFieldAlias,searchFieldLabel"
      src="" auto-load="true" store-type="simple" id="custom_filter" onValueChanged="archiveQuery.custom_filterValueChanged"
      confirm-refresh="false" confirm-delete="false" onBeforeRefresh="archiveQuery.custom_filterBeforeRefresh"> 
      <rows xmlns="" id="default34">  
        <row id="default35"> 
          <cell id="default36"/>  
          <cell id="default37">全部</cell>  
          <cell id="default38"/>  
          <cell id="default39"/> 
        </row> 
      </rows> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="" src="" auto-load="true" id="main" store-type="simple"/>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="alias,label" src="" auto-load="false" id="dataFields" confirm-delete="false"
      confirm-refresh="false" store-type="simple"/>  
    <xforms:action id="action6" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript6"><![CDATA[archiveQuery.model1XBLLoaded(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xui:place control="dlgChart" id="controlPlace4" style="top:183px;left:13px;"/>  
      <xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;position:relative;"/> 
    <xui:place control="config" id="controlPlace9" style="left:77px;top:128px;"></xui:place></xui:layout>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="办理过程" width="396px" height="264px" modal="true" id="dlgChart" url="/UI/SA/task/taskCenter/dialogs/processChart.w"
      resizable="true" status="maximize" left="0" top="0" dialogUpdate="true"/>  
    <!-- appearance="image" -->  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout1"> 
        <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="200px"
          mode="horz" id="HSplitter1" class="xui-splitter" has-drag-bar="true" has-arrow-button="true"
          status="normal" fix-type="left" style="width:100%;height:100%;"> 
          <xhtml:div region="left" id="div3"> 
            <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
              id="borderLayout1" style="width:100%; height: 100%;;"> 
              <top size="40px" id="borderLayout-top1"> 
                <xui:place control="view3" id="controlPlace7" style="height:100%;width:100%;border-bottom: 2px solid #5CA3CF;background-color:#F0F4F7;position:relative;"/> 
              </top>  
              <center id="borderLayout-center1"> 
                <xhtml:div id="divBizGroupNav" class="xui-container" style="position:absolute;top:0px;left:0px;height:100%;width:100%;;"/> 
              </center> 
            </xhtml:div> 
          </xhtml:div>  
          <xhtml:div region="right" id="div4"> 
            <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
              id="borderLayoutMain" style="width:100%; height: 100%;;"> 
              <top size="40px" id="borderLayout-top2"> 
                <xui:place control="view2" id="controlPlace2" style="height:100%;width:100%;"/> 
              </top>  
              <center id="borderLayout-center2"> 
                <xhtml:div id="divMoreFilter" class="xui-container" style="padding-top:4px;width:100%;height:25px;background-color:#F0F4F7;border-top: 1px solid #ccc;border-bottom: 1px solid #ccc;"
                  onclick="archiveQuery.divMoreFilterClick(event)"> 
                  <xhtml:div class="xui-container" style="width:100px;height:100%;margin:0 auto"> 
                    <xhtml:i class="icon-system-angle-double-down"/>  
                    <xhtml:span class="xui-container"><![CDATA[高级查询]]></xhtml:span> 
                  </xhtml:div> 
                </xhtml:div>  
                <xui:place control="viewSearch" id="controlPlace8" style="width:100%;height:75px;"/>  
                <xui:place control="viewBizGrid" id="controlPlace20" style="width:100%;"/> 
              </center> 
            </xhtml:div> 
          </xhtml:div> 
        </xhtml:div>  
        <xui:place control="sysRunner" id="controlPlace3" style="position:absolute;top:360px;left:63px;"/> 
      </layout>  
      <xui:view auto-load="true" id="view2" class="xui-container"> 
        <layout type="absolute" style="position:relative;" id="layout2"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar1" expandable="false" expanded-position="6" expanded-label="展开过滤"
            collapsed-label="隐藏过滤" expanded-width="80" separator-size="4" style="height:100%;position:absolute;top:5px;left:11px;"> 
            <xui:place control="trgBrowse" id="controlPlace13"/>  
            <xui:place control="flowItem" id="controlPlace14"/>  
            <xui:place control="btnExpand" id="controlPlace19" style="width:85px;"/>  
            <xui:place control="btnShowMore" id="controlPlace16" style="display:none"/>  
            <xhtml:label id="label3" class="xui-label">收件日期</xhtml:label>  
            <xui:place control="dateFilter1" id="controlPlace11" style="width:80px;"/>  
            <xhtml:label id="label11" class="xui-label"><![CDATA[状态]]></xhtml:label>  
            <xui:place control="gridSelect3" id="controlPlace22" style="width:80px;height:25px;"/> 
          </xhtml:div>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="btnBarRight" separator-size="4" style="float:right;top:5px;right:10px;position:absolute;"> 
            <xui:place control="filterTypeSelect" id="controlPlace18" style="height:25px;width:120px;"/>  
            <xui:place control="searchFieldSelect" id="controlPlace6" style="width:120px;height:25px;"/>  
            <xui:place control="inputSearchValue" id="controlPlace5" style="height:25px;width:200px;"/>  
            <xui:place control="trgSearch" id="controlPlace10" style="width:61px;"/>  
            <xui:place control="trgClear" id="controlPlace21" style="width:61px;"/> 
          </xhtml:div>  
          <xui:place control="radio2" id="controlPlace12" style="position:absolute;left:572px;top:11.5px;"/> 
        </layout>  
        <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgBrowse"
          appearance="image-text" icon-class="icon-system-eye" class="button-blue"> 
          <xforms:label id="default21">浏览案卷</xforms:label>  
          <xforms:action id="action8" ev:event="DOMActivate"> 
            <xforms:script id="xformsScript8">archiveQuery.enterBizRec(event)</xforms:script> 
          </xforms:action> 
        </xforms:trigger>  
        <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="flowItem"
          appearance="image-minimal" icon-class="icon-system-flow-tree"> 
          <xforms:label id="default1">办理过程</xforms:label>  
          <xforms:action id="action2" ev:event="DOMActivate"> 
            <xforms:script id="xformsScript2">archiveQuery.trgChartClick(event)</xforms:script> 
          </xforms:action> 
        </xforms:trigger>  
        <xforms:input id="inputSearchValue" ref="data('custom_filter')/smartValue"/>  
        <xforms:trigger id="trgSearch" appearance="image-text" icon-class="icon-system-search"
          class="button-blue"> 
          <xforms:label id="xuiLabel10"><![CDATA[查询]]></xforms:label>  
          <xforms:action id="action1" ev:event="DOMActivate"> 
            <xforms:script id="xformsScript1">archiveQuery.trgSearchClick(event)</xforms:script> 
          </xforms:action> 
        </xforms:trigger>  
        <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnShowMore"
          appearance="image-text" icon-class="icon-system-angle-double-down"> 
          <xforms:label id="default47"><![CDATA[更多条件]]></xforms:label>  
          <xforms:action id="action5" ev:event="DOMActivate"> 
            <xforms:script id="xformsScript5"><![CDATA[archiveQuery.btnShowMoreClick(event)]]></xforms:script> 
          </xforms:action> 
        </xforms:trigger>  
        <xforms:trigger id="trgClear" appearance="image-minimal" icon-class="icon-system-cancel"> 
          <xforms:label id="default63"><![CDATA[清除]]></xforms:label>  
          <xforms:action id="action12" ev:event="DOMActivate"> 
            <xforms:script id="xformsScript12"><![CDATA[archiveQuery.trgClearClick(event)]]></xforms:script> 
          </xforms:action> 
        </xforms:trigger>  
        <xforms:select1 ref="data('custom_filter')/showCldBiz" id="radio2"/>  
        <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
          dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
          ext-separator="," id="filterTypeSelect" ref="data('custom_filter')/filterType"
          label-ref="data('custom_filter')/filterType"> 
          <xforms:label ref="type" id="default69"/>  
          <xforms:value ref="type" id="default70"/>  
          <xforms:itemset id="default71"> 
            <itemset-data xmlns="" id="default74">  
              <rows id="default75"> 
                <row id="default76"> 
                  <cell id="default77">全局查询</cell> 
                </row>  
                <row id="default78"> 
                  <cell id="default79">组内查询</cell> 
                </row> 
              </rows> 
            </itemset-data>  
            <xforms:column ref="type" id="default80"/> 
          </xforms:itemset> 
        </xhtml:div>  
        <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnExpand"
          appearance="image-minimal" icon-class="icon-system-minus"> 
          <xforms:label id="default5">收起分组</xforms:label>  
          <xforms:action id="action11" ev:event="DOMActivate"> 
            <xforms:script id="xformsScript11">archiveQuery.btnExpandClick(event)</xforms:script> 
          </xforms:action> 
        </xforms:trigger>  
        <xhtml:div default-select="9" component="/UI/system/components/dateFilter.xbl.xml#dateFilter"
          onChanged="archiveQuery.dateFilter1Changed" filter-date-mode="single" id="dateFilter1"
          filter-data="custom_filter" filter-date-relation1="B_BizRec.fReceiveTime"
          dropdown-height="250px"/>  
        <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
          dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
          ext-separator="," id="gridSelect3" ref="data('custom_filter')/statusName"
          multi-select="true" label-ref="data('custom_filter')/statusName" ext-ref="data('custom_filter')/status"
          default-label-ref="'全部'" all-selected-label-ref="'全部'"> 
          <xforms:label id="default85" ref="n"/>  
          <xforms:value ref="n" id="default86"/>  
          <xforms:itemset id="default87" auto-load-data="true"> 
            <xforms:column ref="c" visible="false" id="default95"/>  
            <xforms:column ref="n" id="default96"/>  
            <itemset-data xmlns="" id="default105">  
              <rows id="default106"> 
                <row id="default107"> 
                  <cell id="default108">'bsProcessing'</cell>  
                  <cell id="default109">办理中</cell> 
                </row>  
                <row id="default110"> 
                  <cell id="default111">'bsSuspended'</cell>  
                  <cell id="default112">已挂起</cell> 
                </row>  
                <row id="default113"> 
                  <cell id="default114">'bsFinished'</cell>  
                  <cell id="default115">已办结</cell> 
                </row>  
                <row id="default116"> 
                  <cell id="default117">'bsAborted'</cell>  
                  <cell id="default118">已作废</cell> 
                </row> 
              </rows> 
            </itemset-data> 
          </xforms:itemset>  
          <xforms:ext-value id="default81" ref="c"/> 
        </xhtml:div>  
        <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="25"
          dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
          ext-separator="," id="searchFieldSelect" ref="data('custom_filter')/searchFieldAlias"
          label-ref="data('custom_filter')/searchFieldLabel"> 
          <xforms:label ref="label" id="default2"/>  
          <xforms:value ref="alias" id="default3"/>  
          <xforms:itemset id="default4" data="dataFields"> 
            <xforms:column ref="alias" visible="false" id="default6"/>  
            <xforms:column ref="label" id="default7"/> 
          </xforms:itemset> 
        </xhtml:div> 
      </xui:view>  
      <xui:view auto-load="true" id="view3" class="xui-container"> 
        <layout type="flow" style="position:relative;" id="layout4"> 
          <xhtml:label id="label2" style="padding-left:20px;line-height:40px;font-size: 16px;font-weight:bold"
            class="xui-label">案卷分组</xhtml:label> 
        </layout> 
      </xui:view>  
      <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner"
        id="sysRunner"/>  
      <xui:view auto-load="true" id="viewSearch" class="xui-container"> 
        <layout type="absolute" style="position:relative;" id="layout5"/> 
      </xui:view>  
      <xui:view auto-load="true" id="viewBizGrid" class="xui-container"> 
        <layout type="flow" style="position:relative;" id="layout3"></layout> 
      </xui:view> 
    </xui:view> 
  <xhtml:div component="/UI/system/components/config.xbl.xml#config" id="config"><item label="" value="true" name="advanceSearch" id="configItem1"></item>
  <item label="" value="doCalcWarning" name="alterRender" id="configItem2"></item></xhtml:div></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink2" href="/UI/base/lib/jquery-ui-1.7.1/themes/base/ui.all.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/base/lib/jquery.jqGrid-4.4.3/css/ui.jqgrid.css"/>  
    <xhtml:script id="htmlScript1" src="/UI/base/lib/jquery.jqGrid-4.4.3/js/i18n/grid.locale-cn.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/lib/jquery.jqGrid-4.4.3/js/jquery.jqGrid.min.js"/>  
    <xhtml:script id="htmlScript3" src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script id="htmlScript1" src="archiveQuery.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="archiveQuery.css"/> 
  </xui:resource> 
</xui:window>
