<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model" style="height:auto;top:262px;left:424px;"> 
    <xforms:action id="action3" ev:event="onload"> 
      <xforms:script id="xformsScript3">taskCenter.model1Load(event)</xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#data" src="" auto-load="true"
      store-type="simple" id="custom_filter" onValueChanged="taskCenter.custom_filterValueChanged"
      columns="taskGroup,taskGroupName,smartValue,searchFieldAlias,searchFieldLabel,filterType"
      auto-new="false"> 
      <rows xmlns="" id="default58">  
        <row id="default59"> 
          <cell id="default60"/>  
          <cell id="default61"/>  
          <cell id="default62"/>  
          <cell id="default63"/>  
          <cell id="default64"/>  
          <cell id="default65">当前分组</cell> 
        </row> 
      </rows> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="" src="" auto-load="true" id="main" store-type="simple"/>  
    <xforms:action id="action4" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript4"><![CDATA[taskCenter.modelModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="alias,label" src="" auto-load="false" id="dataFields" confirm-delete="false"
      confirm-refresh="false" store-type="grid"/>  
    </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xui:place control="dlgChart" id="controlPlace4" style="left:68px;top:167px;"/>  
      <xui:place control="sysRunner" id="controlPlace2" style="left:68px;top:213px;"/>  
      <xui:place control="process" id="controlPlace13" style="width:24px;left:308px;top:252px;"/>  
      <xui:place control="config" id="controlPlace17" style="left:306px;top:198px;"/>  
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="200px"
        mode="horz" id="HSplitter1" class="xui-splitter" has-drag-bar="true" has-arrow-button="true"
        status="normal" fix-type="left" resizable="true" style="height:100%;width:100%;;"> 
        <xhtml:div region="left" id="div3" style="left:0px;top:0px;width:100%;height:100%;"
          class="xui-no-border xui-autofill"> 
          <xhtml:div id="divTaskGroupNav" style="width:100%"> 
            <xhtml:div onclick="taskCenter.toggleGroupNavClick(event)" id="div1"
              style="width:100%;height:40px;position:relative;background-color:#F0F4F7;"> 
              <xhtml:label id="labelTaskGroup" class="xui-label" style="padding-left: 20px;line-height: 40px;font-size: 16px;font-weight: bold;">案卷分组</xhtml:label>  
              <xhtml:div style="right:10px;position:absolute;top:10px;" id="div2"> 
                <xhtml:i class="icon-system-angle-double-up" id="default23"/> 
              </xhtml:div> 
            </xhtml:div>  
            <xhtml:ul id="taskGroup" class="lanmu-list" onclick="taskCenter.divTaskGroupNavClick(event)"> 
              <xhtml:li name="SIGNIN" id="li1"> 
                <xhtml:a href="#" id="default24">签收件</xhtml:a>  
                <xhtml:i id="default25"/> 
              </xhtml:li>  
              <xhtml:li class="current" name="WAITTING" id="li2"> 
                <xhtml:a href="#" id="default26">待办件</xhtml:a>  
                <xhtml:i id="default27"/> 
              </xhtml:li>  
              <xhtml:li name="PERSONALATTENTION" id="li3"> 
                <xhtml:a href="#" id="default28">关注件</xhtml:a>  
                <xhtml:i id="default29"/> 
              </xhtml:li>  
              <xhtml:li name="SUBMITED" id="li4"> 
                <xhtml:a href="#" id="default30">移交件</xhtml:a>  
                <xhtml:i id="default31"/> 
              </xhtml:li>  
              <xhtml:li name="HAVEDONE" id="li5"> 
                <xhtml:a href="#" id="default32">已办件</xhtml:a>  
                <xhtml:i id="default33"/> 
              </xhtml:li>  
              <xhtml:li name="SUSPEND" id="li6"> 
                <xhtml:a href="#" id="default34">挂起件</xhtml:a>  
                <xhtml:i id="default35"/> 
              </xhtml:li>  
              <xhtml:li name="NOTHANDLE" id="li7"> 
                <xhtml:a href="#" id="default36">经办(在办)</xhtml:a>  
                <xhtml:i id="default37"/> 
              </xhtml:li>  
              <xhtml:li name="HANDLED" id="li8"> 
                <xhtml:a href="#" id="default38">经办(办结)</xhtml:a>  
                <xhtml:i id="default39"/> 
              </xhtml:li> 
            </xhtml:ul> 
          </xhtml:div>  
          <xhtml:div id="divBizGroupNav" style="width:100%;"> 
            <xhtml:div onclick="taskCenter.toggleGroupNavClick(event)" id="div5"
              style="width:100%;height:40px;position:relative;background-color:#F0F4F7;"> 
              <xhtml:label id="labelBizGroup" class="xui-label" style="padding-left: 20px;line-height: 40px;font-size: 16px;font-weight: bold">业务分组</xhtml:label>  
              <xhtml:div style="right:10px;position:absolute;top:10px;" id="div6"> 
                <xhtml:i class="icon-system-angle-double-up" id="default40"/> 
              </xhtml:div> 
            </xhtml:div> 
          </xhtml:div> 
        </xhtml:div>  
        <xhtml:div region="right" id="div4"> 
          <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1"
            class="xui-tabPanel" style="height:100%;width:100%;"> 
            <xui:tab id="tabRec"> 
              <xui:label id="xuiLabel1">案卷列表</xui:label>  
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                id="borderLayout2" style="width:100%; height: 100%;;;"> 
                <top size="40px" id="borderLayout-top2"> 
                  <xui:place control="view2" id="controlPlace3" style="width:100%;height:100%;"/> 
                </top>  
                <center id="borderLayout-center2"> 
                  <xui:place control="viewTaskGrid" id="controlPlace12" style="width:100%;height:99%;"/> 
                </center> 
              </xhtml:div> 
            </xui:tab>  
            <xui:tab id="tabDept" xforms-select="taskCenter.tabDeptSelect"> 
              <xui:label id="xuiLabel2">部门案卷</xui:label>  
              <xui:place control="wfDeptRec" id="controlPlace15" style="height:100%;width:100%;"/> 
            </xui:tab> 
          </xhtml:div> 
        </xhtml:div> 
      </xhtml:div> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="办理过程" width="396px" height="264px" modal="true" id="dlgChart" url="/UI/SA/task/taskCenter/banLiGuoCheng.w"
      resizable="true" status="maximize" left="0" top="0" dialogUpdate="true"/>  
    <!-- appearance="image" -->  
    <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner"
      id="sysRunner" onReceive="taskCenter.sysRunnerReceive"/>  
    <xhtml:div component="/UI/system/components/process.xbl.xml#process" use-simple-dialog="true"
      data-type="json" dialog-window="/UI/base/core/flowOperation/batchProcessDialog.w"
      dialog-height="480" dialog-width="600" id="process" auto-start="false" auto-save="false"
      auto-filter="false" auto-close="false"/>  
    <xhtml:div component="/UI/system/components/config.xbl.xml#config" id="config"> 
      <item label="预警灯风格" value="doCalcWarning" id="configItem0" name="alterRender"/>  
      <item label="" name="multiSelect" id="configItem1" value="SIGNIN"/>  
      <item label="案卷分组" value="WAITTING,PERSONALATTENTION,SUBMITED,SUSPEND"
        name="taskCenterGroups" id="configItem3"/>  
      <item label="显示案卷分组数量" value="false" name="showGroupCount" id="configItem4"/> 
    </xhtml:div>  
    <xui:view auto-load="true" id="view2" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout3"> 
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar1" expandable="false" expanded-position="6" expanded-label="展开过滤"
          collapsed-label="隐藏过滤" expanded-width="80" separator-size="4" style="position:absolute;left:10px;top:5px;height:74%;"> 
          <xui:place control="trgExecute" id="controlPlace11" style="width:85px;"/>  
          <xui:place control="trgAdvance" id="controlPlace9" style="width:60px;"/>  
          <xui:place control="recycleItem" id="controlPlace8" style="width:60px;"/>  
          <xui:place control="trgSign" id="controlPlace20" style="width:60px;"/>  
          <xui:place control="trgBanLiGuoCheng" id="controlPlace5" style="width:85px;"/>  
          <xui:place control="trgBatchInfo" id="controlPlace14" style="width:85px;"/>  
          <xui:place control="btnExpand" id="controlPlace19" style="width:85px;"/>  
          <xui:place control="trgRefresh" id="controlPlace18" style="width:85px;"/> 
        </xhtml:div>  
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="btnBarRight" style="float:right;top:5px;right:10px;position:absolute;"
          separator-size="4"> 
          <xui:place control="filterTypeSelect" id="controlPlace7" style="display:none;height:25px;width:100px;"/>
          <xui:place control="bizFieldSelect" id="controlPlace1" style="width:120px;height:25px;"/>  
          <xui:place control="inputSearchValue" id="controlPlace6" style="height:25px;width:235px;"/>  
          <xui:place control="trgSearch" id="controlPlace10" style="width:60px;"/>  
          <xui:place control="trgClear" id="controlPlace16"/> 
        </xhtml:div> 
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgExecute"
        class="button-blue" appearance="image-text" icon-class="icon-system-ok"> 
        <xforms:label id="default19">进入案卷</xforms:label>  
        <xforms:action id="action6" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript6">taskCenter.trgExecuteClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgBanLiGuoCheng"
        appearance="image-minimal" icon-class="icon-system-flow-tree"> 
        <xforms:label id="default1">办理过程</xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript2">taskCenter.trgBanLiGuoChengClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:input id="inputSearchValue" ref="data('custom_filter')/smartValue"/>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="recycleItem"
        appearance="image-text" icon-class="icon-system-back" class="button-green"> 
        <xforms:label id="default8">收回</xforms:label>  
        <xforms:action id="action7" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript7">taskCenter.trgRecycleClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgAdvance"
        appearance="image-minimal" icon-class="icon-system-play"> 
        <xforms:label id="default9">发送</xforms:label>  
        <xforms:action id="action5" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript5">taskCenter.trgAdvanceClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger id="trgSearch" appearance="image-minimal" icon-class="icon-system-search"> 
        <xforms:label id="xuiLabel10">查询</xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript1">taskCenter.trgSearchClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgBatchInfo"
        appearance="image-minimal" icon-class="icon-system-flow-tree"> 
        <xforms:label id="default17">批量任务</xforms:label>  
        <xforms:action id="action9" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript9">taskCenter.trgBatchInfoClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnExpand"
        appearance="image-minimal" icon-class="icon-system-minus"> 
        <xforms:label id="default3">收起分组</xforms:label>  
        <xforms:action id="action11" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript11">taskCenter.btnExpandClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgClear"
        appearance="image-minimal" icon-class="icon-system-cancel"> 
        <xforms:label id="default2">清除</xforms:label>  
        <xforms:action id="action8" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript8">taskCenter.trgClearClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgRefresh"
        appearance="image-minimal" icon-class="icon-system-refresh"> 
        <xforms:label id="default10">刷 新</xforms:label>  
        <xforms:action id="action13" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript13">taskCenter.trgSearchClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgSign"
        appearance="image-text" icon-class="icon-system-download" class="button-green"> 
        <xforms:label id="default6">签收</xforms:label>  
        <xforms:action id="action10" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript10">taskCenter.trgSignClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
        dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
        ext-separator="," id="bizFieldSelect" ref="data('custom_filter')/searchFieldAlias"
        label-ref="data('custom_filter')/searchFieldLabel" dropdown-width="200px"> 
        <xforms:label ref="label" id="default45"/>  
        <xforms:value ref="alias" id="default44"/>  
        <xforms:itemset id="default43" auto-load-data="true" data="dataFields"> 
          <itemset-data xmlns="" id="default53">  
            <rows id="default54"/> 
          </itemset-data>  
          <xforms:column ref="label" id="default56"/>  
          <xforms:column ref="alias" visible="false" id="default57"/> 
        </xforms:itemset> 
      </xhtml:div>  
      <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
        dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
        ext-separator="," id="filterTypeSelect" ref="data('custom_filter')/filterType"
        label-ref="data('custom_filter')/filterType"> 
        <xforms:label ref="type" id="default70"/>  
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
    </xui:view>  
    <xui:view auto-load="true" id="viewTaskGrid"> 
      <layout type="flow" style="position:relative;" id="layout2"/> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/windowFrame.xbl.xml#windowFrame"
      id="wfDeptRec" url="/UI/common/recFuncs/process/recFuncs/deptRecActivity.w"
      process="/common/recFuncs/process/recFuncs/recFuncsProcess" activity="deptRecActivity"
      auto-load="false"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink2" href="/UI/base/lib/jquery-ui-1.7.1/themes/base/ui.all.css"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/base/lib/jquery.jqGrid-4.4.3/css/ui.jqgrid.css"/>  
    <xhtml:script id="htmlScript1" src="/UI/base/lib/jquery.jqGrid-4.4.3/js/i18n/grid.locale-cn.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/lib/jquery.jqGrid-4.4.3/js/jquery.jqGrid.min.js"/>  
    <xhtml:script id="htmlScript3" src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:script id="htmlScript4" src="taskCenter.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink3" href="taskCenter.css"/> 
  </xui:resource> 
</xui:window>
