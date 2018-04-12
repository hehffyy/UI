<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml">  
  <xforms:model id="model1" style="left:18px;height:auto;top:503px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dataTask" concept="B_BatchOperationTask"><reader id="default1" action="/base/core/flowOperation/logic/action/queryB_BatchInfoAction"></reader></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <top size="46px" id="borderLayout-top1"><xui:place control="view2" id="controlPlace2" style="height:100%;width:100%;"></xui:place></top>
   <center id="borderLayout-center1"><xui:place control="grid1" id="controlPlace3" style="height:100%;width:100%;"></xui:place></center>
  <bottom size="50px" id="borderLayout-bottom1"><xui:place control="pagination1" id="controlPlace4" style="height:100%;width:100%;"></xui:place></bottom></xhtml:div></xui:layout> 
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2"><xui:place control="smartFilter1" id="controlPlace5" style="position:absolute;left:107px;top:13px;"></xui:place>
  <xhtml:label id="label3" style="position:absolute;left:40px;top:16px;" class="xui-label"><![CDATA[业务名称]]></xhtml:label>
  <xhtml:label id="label5" class="xui-label" style="position:absolute;position:absolute;top:15px;left:283px;"><![CDATA[创建时间]]></xhtml:label>
  <xui:place control="dateFilter3" id="controlPlace8" style="position:absolute;left:352px;top:13px;"></xui:place>
  <xui:place control="trgRefresh" id="controlPlace1" style="position:absolute;top:11px;left:530px;"></xui:place></layout>
  <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter1" filter-data="dataTask" filter-relations="sTypeName"></xhtml:div>
  <xhtml:div default-select="1" component="/UI/system/components/dateFilter.xbl.xml#dateFilter" onChanged="" filter-date-mode="single" id="dateFilter3" filter-data="dataTask" filter-date-relation1="fCreateTime"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trgRefresh" operation-owner="dataTask" operation="refresh" appearance="image-text" class="button-blue">
   <xforms:label id="default2"><![CDATA[查询]]></xforms:label></xforms:trigger></xui:view>
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dataTask"><xui:column id="gridColumn7" ref="sTypeName" label="业务名称" type="ed" width="234px"></xui:column><xui:column id="gridColumn6" ref="sName" label="任务标题" type="ed" width="160px"></xui:column><xui:column id="gridColumn4" ref="fOperationName" label="操作名称" type="ed" width="100px"></xui:column><xui:column id="gridColumn2" ref="fStatus" label="状态" type="ed" width="100px"></xui:column><xui:column id="gridColumn5" ref="fCreateTime" label="创建时间" type="ed" width="154px"></xui:column><xui:column id="gridColumn1" ref="fExecuteTime" label="执行时间" type="ed" width="147px"></xui:column><xui:column id="gridColumn8" ref="sExecutorDeptName" label="执行者部门" type="ed" width="100px"></xui:column><xui:column id="gridColumn11" ref="sExecutorPosName" label="执行者岗位" type="ed" width="100px"></xui:column><xui:column id="gridColumn10" ref="sExecutorPersonName" label="执行人" type="ed" width="100px"></xui:column>
  
  <xui:column id="gridColumn3" ref="fCause" label="失败原因" type="ed" width="230px"></xui:column>
  
  
  
  
  
  </xhtml:div>
  <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next" id="pagination1" data="dataTask"></xhtml:div></xui:view>  
  <xui:resource id="resource1"/> 
</xui:window>
