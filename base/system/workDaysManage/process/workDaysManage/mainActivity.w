<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;top:312px;left:278px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="bizB_WorkDaysMang" concept="B_WorkDaysMang"
      confirm-delete="false" limit="-1" onSaveCommit="mainActivity.bizB_WorkDaysMangSaveCommit"> 
      <creator id="default1" action="/base/system/workDaysManage/logic/action/createB_WorkDaysMangAction"/>  
      <reader id="default2" action="/base/system/workDaysManage/logic/action/queryB_WorkDaysMangAction"/>  
      <writer id="default3" action="/base/system/workDaysManage/logic/action/saveB_WorkDaysMangAction"/>  
      <rule id="dataBizRule1" relation="fIsWorkDay" required="true()" alert="'是否工作日必须填写！'"></rule></data> 
  <data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="year,month" src="" auto-load="false" id="data1" store-type="simple" auto-new="true" onValueChanged="mainActivity.data1ValueChanged"></data>
  <xforms:action id="action5" ev:event="onload"><xforms:script id="xformsScript5"><![CDATA[mainActivity.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout style="height:100%;padding-left:5px;width:99%;" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <top size="36px" id="borderLayout-top1">
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="width:830px;height:81%;" separator-size="10"><xhtml:label id="label1" class="xui-label"><![CDATA[年份]]></xhtml:label><xui:place control="nsYear" id="controlPlace9" style="width:83px;"></xui:place><xhtml:label id="label2" class="xui-label"><![CDATA[月份]]></xhtml:label>
  <xui:place control="numberSelect3" id="controlPlace11" style="width:81px;"></xui:place>
  <div class="space " style="margin: 0 4px;">|</div>
  <xui:place control="trgInit" id="controlPlace2"></xui:place>
  <xui:place control="trgChange" id="controlPlace6" style="width:79px;"></xui:place>
  
  
  <xui:place control="trigger4" id="controlPlace13"></xui:place>
  <xui:place control="trigger5" id="controlPlace14"></xui:place></xhtml:div></top>
   <center id="borderLayout-center1"><xui:place control="view2" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center></xhtml:div></xui:layout>  
    <!--<xhtml:div component="/UI/myApp/components/myCalendar.xbl.xml#myCalendar" id="myCalendar1"> 
      <xhtml:div style="width:100%;height:12%;" id="div3"> 
        <xhtml:table border="0" style="width:100%;height:100%;background-color:#5BFAFA;font-size:14px;"
          cellspacing="0" cellpadding="0" id="table1"> 
          <xhtml:tr class="options" id="tr1"> 
            <xhtml:td style="width:8%;" title="上一年" id="td1"> 
              <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
                style="width:80%;" id="trigger1"> 
                <xforms:label id="default4"/> 
              </xforms:trigger> 
            </xhtml:td>  
            <xhtml:td style="width:8%;" title="上一月" id="td2"> 
              <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
                style="width:80%;" id="trigger2"> 
                <xforms:label id="default5"/> 
              </xforms:trigger> 
            </xhtml:td>  
            <xhtml:td bgcolor="#B4EEB4" extKind="dateTitle" id="td3"/>  
            <xhtml:td style="width:8%;" title="下一月" id="td4"> 
              <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
                style="width:80%;" id="trigger3"> 
                <xforms:label id="default6"/> 
              </xforms:trigger> 
            </xhtml:td>  
            <xhtml:td style="width:8%;" title="下一年" id="td5"> 
              <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
                style="width:80%;" id="trigger4"> 
                <xforms:label id="default7"/> 
              </xforms:trigger> 
            </xhtml:td>  
            <xhtml:td style="width:10%;" id="td6"> 
              <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
                style="width:80%;" id="trigger5"> 
                <xforms:label id="default8"/> 
              </xforms:trigger> 
            </xhtml:td>  
            <xhtml:td cnDate="cnDateTitle" id="td7"/> 
          </xhtml:tr> 
        </xhtml:table> 
      </xhtml:div>  
      <xhtml:div style="width:100%;height:10%;" id="div4"> 
        <xhtml:table border="0" style="width:100%;height:100%;font-size:16px" cellspacing="0"
          class="options" align="center" id="table2"> 
          <xhtml:tr class="weekdayColor" id="tr2"> 
            <xhtml:td id="td8">日</xhtml:td>  
            <xhtml:td id="td9">一</xhtml:td>  
            <xhtml:td id="td10">二</xhtml:td>  
            <xhtml:td id="td11">三</xhtml:td>  
            <xhtml:td id="td12">四</xhtml:td>  
            <xhtml:td id="td13">五</xhtml:td>  
            <xhtml:td id="td14">六</xhtml:td> 
          </xhtml:tr> 
        </xhtml:table> 
      </xhtml:div>  
      <xhtml:div style="width:100%;height:78%;" id="div5"> 
        <xhtml:table border="0" style="width:100%;height:100%;font-size:14px" align="center"
          cellspacing="0" class="dateTable" id="table3"> 
          <xhtml:tr class="options" id="tr3"> 
            <xhtml:td class="restDayTD" id="td15" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td16" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td17" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td18" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td19" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td20" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td class="restDayTD" id="td21" ondblclick="mainActivity.tdDblclick(event)"/> 
          </xhtml:tr>  
          <xhtml:tr class="options" id="tr4"> 
            <xhtml:td class="restDayTD" id="td22" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td23" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td24" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td25" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td26" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td27" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td class="restDayTD" id="td28" ondblclick="mainActivity.tdDblclick(event)"/> 
          </xhtml:tr>  
          <xhtml:tr class="options" id="tr5"> 
            <xhtml:td class="restDayTD" id="td29" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td30" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td31" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td32" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td33" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td34" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td class="restDayTD" id="td35" ondblclick="mainActivity.tdDblclick(event)"/> 
          </xhtml:tr>  
          <xhtml:tr class="options" id="tr6"> 
            <xhtml:td class="restDayTD" id="td36" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td37" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td38" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td39" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td40" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td41" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td class="restDayTD" id="td42" ondblclick="mainActivity.tdDblclick(event)"/> 
          </xhtml:tr>  
          <xhtml:tr class="options" id="tr7"> 
            <xhtml:td class="restDayTD" id="td43" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td44" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td45" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td46" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td47" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td48" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td class="restDayTD" id="td49" ondblclick="mainActivity.tdDblclick(event)"/> 
          </xhtml:tr>  
          <xhtml:tr class="options" id="tr8"> 
            <xhtml:td class="restDayTD" id="td50" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td51" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td52" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td53" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td54" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td id="td55" ondblclick="mainActivity.tdDblclick(event)"/>  
            <xhtml:td class="restDayTD" id="td56" ondblclick="mainActivity.tdDblclick(event)"/> 
          </xhtml:tr> 
        </xhtml:table> 
      </xhtml:div> 
    </xhtml:div>  
    -->  
    <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xui:place control="grid3" id="controlPlace7" style="position:absolute;height:100%;width:100%;"></xui:place></layout>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="38" row-height="32" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid3" data="bizB_WorkDaysMang" edit-mode="true" onRowDblClick="mainActivity.grid3RowDblClick">
   <xui:column id="gridColumn8" ref="fDate" label="日期" type="html" width="120px" sort-datatype="str" align="center" onRender="mainActivity.grid3_fDateRender"></xui:column>
   <xui:column id="gridColumn1" ref="fWeek" label="星期" type="html" width="79px" onRender="mainActivity.grid3_fWeekRender" align="center"></xui:column>
   <xui:column id="gridColumn11" ref="fIsWorkDay" label="是否工作日" type="ro" width="80px" readonly="false" align="center">
    </xui:column> 
   <xui:column id="gridColumn10" ref="fKind" label="转换方式" type="html" width="129px" readonly="false" onRender="mainActivity.grid3_fKindRender" align="left"></xui:column>
   <xui:column id="gridColumn9" ref="fDesc" label="描述" type="ed" width="101px"></xui:column>
   <xui:column id="gridColumn12" ref="fYear" label="年" type="ro" width="72px"></xui:column>
   <xui:column id="gridColumn13" ref="fMonth" label="月" type="ro" width="77px"></xui:column>
   <xui:column id="gridColumn14" ref="fDay" label="日" type="ro" width="83px"></xui:column></xhtml:div></xui:view>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgInit">
   <xforms:label id="default10"><![CDATA[初始化]]></xforms:label>
  <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[mainActivity.trgInitClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgChange">
   <xforms:label id="default16"><![CDATA[工作日调整]]></xforms:label>
  <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[mainActivity.trgChangeClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/numberSelect.xbl.xml#numberSelect" id="nsYear" ref="data('data1')/year" size="10" min="2014" max="9999"></xhtml:div>
  <xhtml:div component="/UI/system/components/numberSelect.xbl.xml#numberSelect" id="numberSelect3" min="1" max="12" ref="data('data1')/month" size="12"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4" operation-owner="bizB_WorkDaysMang" operation="save">
   <xforms:label id="default17"><![CDATA[保存修改]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5">
   <xforms:label id="default18"><![CDATA[刷新缓存]]></xforms:label>
  <xforms:action id="action6" ev:event="DOMActivate"><xforms:script id="xformsScript6"><![CDATA[mainActivity.trigger5Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="mainActivity.js"/> 
  </xui:resource> 
</xui:window>
