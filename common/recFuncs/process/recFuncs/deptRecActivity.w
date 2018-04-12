<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:421px;top:530px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="dsSum" concept="V_DeptRecSum" limit="-1"
      onIndexChanged="deptRecActivity.dsSumIndexChanged" onAfterRefresh="deptRecActivity.dsSumAfterRefresh"
      confirm-refresh="false"> 
      <reader id="default2" action="/common/recFuncs/logic/action/queryV_DeptRecSumAction"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="fDeptID,fDeptName" src="" auto-load="true" id="dsDept"/>  
    <xforms:action id="action2" ev:event="onload"> 
      <xforms:script id="xformsScript2"><![CDATA[deptRecActivity.model1Load(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="fDeptID,fDeptName,fCustomFilter,fKind,fBizName" src="" auto-load="true"
      id="dsParam" auto-new="false" store-type="simple" onValueChanged="deptRecActivity.dsParamValueChanged"/>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="dsRec" concept="B_BizRec" onRefreshCreateParam="deptRecActivity.dsRecRefreshCreateParam"
      limit="50"> 
      <reader id="default6" action="/common/recFuncs/logic/action/queryDeptRec"/>  
      <calculate-relation relation="calculate1" id="calculate-relation1"/>  
      <rule id="dataBizRule1" concept="B_BizRec" readonly="true()"/>  
      <calculate-relation relation="calculate0" id="calculate-relation2"/> 
    </data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="50%"
        mode="vert" id="VSplitter1" class="xui-splitter" style="height:100%;width:100%;"
        has-drag-bar="true" has-arrow-button="true" fix-type="top"> 
        <xhtml:div region="top" id="div1"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout1" style="width:100%; height: 100%;;"> 
            <top size="40px" id="borderLayout-top1"> 
              <xui:place control="view2" id="controlPlace3" style="width:100%;height:100%;"/> 
            </top>  
            <center id="borderLayout-center1"> 
              <xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"/> 
            </center> 
          </xhtml:div> 
        </xhtml:div>  
        <xhtml:div region="bottom" id="div2"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout2" style="width:100%; height: 100%;;"> 
            <top size="38px" id="borderLayout-top2"> 
              <xui:place control="view1" id="controlPlace7" style="height:100%;width:100%;"/> 
            </top>  
            <center id="borderLayout-center2"> 
              <xui:place control="grid2" id="controlPlace4" style="height:100%;width:100%;"/> 
            </center> 
          </xhtml:div> 
        </xhtml:div> 
      </xhtml:div>  
      <xui:place control="dlgChart" id="controlPlace14" style="top:427px;left:228px;"/> 
    </xui:layout>  
    <xui:view auto-load="true" id="view2" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout3"> 
        <xui:place control="view4" id="controlPlace12" style="position:absolute;height:100%;top:5px;left:5px;width:717px;"/>  
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="btnBarRight" separator-size="4" style="float:right;top:5px;right:10px;position:absolute;;position:absolute;"> 
          <xui:place control="input1" id="controlPlace8" style="height:25px;width:235px;"/>  
          <xui:place control="trgSearch" id="controlPlace10" style="width:60px;"/> 
        </xhtml:div> 
      </layout>  
      <xui:view auto-load="true" id="view4" class="xui-container"> 
        <layout type="absolute" style="position:relative;" id="layout4"> 
          <xhtml:label id="label1" style="position:absolute;left:3px;top:4px;" class="xui-label"><![CDATA[所属部门：]]></xhtml:label>  
          <xui:place control="gridSelect1" id="controlPlace2" style="position:absolute;left:78px;top:2px;"/>  
          <xui:place control="trigger4" id="controlPlace15" style="position:absolute;top:2px;left:238px;"/> 
        </layout>  
        <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
          dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
          ext-separator="," id="gridSelect1" ref="data('dsParam')/fDeptID" label-ref="data('dsParam')/fDeptName"> 
          <xforms:label ref="fDeptName" id="default3"/>  
          <xforms:value ref="fDeptID" id="default4"/>  
          <xforms:itemset id="default5" data="dsDept" auto-load-data="true" independence="false"> 
            <xforms:column ref="fDeptID" visible="false" id="default7"/>  
            <xforms:column ref="fDeptName" id="default8"/> 
          </xforms:itemset> 
        </xhtml:div>  
        
        <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4"
          appearance="image-minimal" icon-class="icon-system-refresh"> 
          <xforms:label id="default12"><![CDATA[刷  新]]></xforms:label>  
          
        <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[deptRecActivity.trigger4Click(event)]]></xforms:script></xforms:action></xforms:trigger> 
      </xui:view>  
      <xforms:input id="input1" ref="data('dsParam')/fCustomFilter"/>  
      <xforms:trigger id="trgSearch" appearance="image-minimal" icon-class="icon-system-search"> 
        <xforms:label id="xuiLabel10">查询</xforms:label> 
      </xforms:trigger> 
    </xui:view>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="dsSum"> 
      <xui:column id="gridColumn13" ref="fDeptID" label="序号" type="ed" width="100px"
        show-index="true" align="center"/>  
      <xui:column id="gridColumn1" ref="fBizName" label="业务名称" type="ed" width="172px"
        show-index="false" align="center"/>  
      <xui:column id="gridColumn2" ref="fCount" label="总数" type="html" width="100px"
        align="center" onRender="deptRecActivity.grid1_fCountRender"/>  
      <xui:column id="gridColumn3" ref="fInZcCount" label="部门待办|正常" type="html" width="100px"
        align="center" onRender="deptRecActivity.grid1_fInZcCountRender"/>  
      <xui:column id="gridColumn7" ref="fInYjCount" label="部门待办|预警" type="html" width="100px"
        align="center" onRender="deptRecActivity.grid1_fInYjCountRender"/>  
      <xui:column id="gridColumn8" ref="fInYellowCount" label="部门待办|黄牌" type="html"
        width="100px" align="center" onRender="deptRecActivity.grid1_fInYellowCountRender"/>  
      <xui:column id="gridColumn9" ref="fInRedCount" label="部门待办|红牌" type="html" width="100px"
        align="center" onRender="deptRecActivity.grid1_fInRedCountRender"/>  
      <xui:column id="gridColumn4" ref="fApprizeCount" label="部门挂起|补正告知" type="html"
        width="100px" align="center" onRender="deptRecActivity.grid1_fApprizeCountRender"/>  
      <xui:column id="gridColumn5" ref="fSpecialProcedureCount" label="部门挂起|特别程序"
        type="html" width="100px" align="center" onRender="deptRecActivity.grid1_fSpecialProcedureCountRender"/>  
      <xui:column id="gridColumn6" ref="fQtGqCount" label="部门挂起|其它" type="html" width="100px"
        align="center" onRender="deptRecActivity.grid1_fQtGqCountRender"/>  
      <xui:column id="gridColumn10" ref="fOutZcCount" label="部门经办（未办结）|正常" type="html"
        width="100px" align="center" onRender="deptRecActivity.grid1_fOutZcCountRender"/>  
      <xui:column id="gridColumn11" ref="fOutYjCount" label="部门经办（未办结）|预警" type="html"
        width="100px" align="center" onRender="deptRecActivity.grid1_fOutYjCountRender"/>  
      <xui:column id="gridColumn12" ref="fOutYellowCount" label="部门经办（未办结）|黄牌" type="html"
        width="100px" align="center" onRender="deptRecActivity.grid1_fOutYellowCountRender"/>  
      <xui:column id="gridColumn21" ref="fOutRedCount" label="部门经办（未办结）|红牌" type="html"
        width="100px" align="center" onRender="deptRecActivity.grid1_fOutRedCountRender"/> 
    </xhtml:div>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xhtml:label id="lblGroup" style="position:absolute;left:225px;top:14px;" class="xui-label"><![CDATA[请点击[数量]查询详细...]]></xhtml:label>  
        <xhtml:img src="/UI/SA/task/taskCenter/images/app16.png" alt="" id="image1"
          style="position:absolute;left:199px;top:16px;"/>  
        <xui:place control="pagination1" id="controlPlace6" style="float:right;right:10px;position:absolute;position:absolute;top:0px;"/>  
        <xui:place control="trigger1" id="controlPlace9" style="width:85px;position:absolute;top:8px;left:9px;"/>  
        <xui:place control="trgBlgc" id="controlPlace5" style="width:85px;position:absolute;left:99px;top:8px;"/> 
      </layout>  
      <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination"
        items="first last pre next" id="pagination1" data="dsRec"/>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
        class="button-blue" appearance="image-text" icon-class="icon-system-eye"> 
        <xforms:label id="default9">浏览案卷</xforms:label>  
        <xforms:action id="action4" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript4">deptRecActivity.trgExecuteClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgBlgc"
        appearance="image-text" icon-class="icon-system-flow-tree" class="button-blue"> 
        <xforms:label id="default1">办理过程</xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript1">deptRecActivity.trgBlgcClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger> 
    </xui:view>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid2" data="dsRec" onRowDblClick="deptRecActivity.trgExecuteClick"> 
      <xui:column id="gridColumn23" ref="calculate0" label="序号" type="ro" width="30px"
        align="center" show-index="true"/>  
      <xui:column id="gridColumn20" ref="calculate1" label="流程" type="html" width="52px"
        onRender="deptRecActivity.grid2_calculate1Render"/>  
      <xui:column id="gridColumn19" ref="FArchivesCode" label="办文号" type="ed" width="130px"
        sort-datatype="str"/>  
      <xui:column id="gridColumn16" ref="fSerialNo" label="来文文号" type="ed" width="140px"/>  
      <xui:column id="gridColumn14" ref="FInComeDocName" label="案卷标题" type="ed" width="280px"
        sort-datatype="str"/>  
      <xui:column id="gridColumn22" ref="FInComeDocOrg" label="来文单位" type="ed" width="160px"/>  
      <xui:column id="gridColumn15" ref="fStatusName" label="状态名称" type="ed" width="80px"
        sort-datatype="str" align="center"/>  
      <xui:column id="gridColumn24" ref="fReceiveTime" label="收件时间" type="ed" width="100px"
        sort-datatype="str" format="yyyy-MM-dd" align="center"/>  
      <xui:column id="gridColumn17" ref="fLimitDate" label="限办时间" type="ed" width="100px"
        sort-datatype="str" format="yyyy-MM-dd" align="center"/>  
      <xui:column id="gridColumn18" ref="fRemainingDays" label="剩余天数" type="ed" width="80px"
        align="center"/>  
      <xui:column id="gridColumn25" ref="fBlr" label="当前办理人" type="ed" width="200px"
        align="left"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="办理过程" width="396px" height="264px" modal="true" id="dlgChart" url="/UI/SA_X/task/taskCenter/banLiGuoCheng.w"
      resizable="true" status="maximize" left="0" top="0" dialogUpdate="true"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="deptRecActivity.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="/UI/SA_X/task/taskCenter/taskCenter.css"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"/> 
  </xui:resource> 
</xui:window>
