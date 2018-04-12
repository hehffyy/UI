<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml">  
  <xforms:model id="model1" style="top:296px;left:53px;height:auto;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="dataTask" concept="SA_Task" onBeforeRefresh="banliIdea.dataTaskBeforeRefresh" limit="-1"><reader id="default1" action="/system/logic/action/queryTaskAction"></reader>
  <filter name="filter0" id="filter1"><![CDATA[sContent is not null]]></filter>
  <rule id="dataBizRule1" concept="SA_Task" readonly="true()"></rule></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></xui:layout> 
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="60" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="dataTask"><xui:column id="gridColumn1" ref="sName" label="名称" type="ed" width="224px"></xui:column>
  <xui:column id="gridColumn3" ref="sExecutorPersonName" label="执行人" type="ed" width="100px" align="center"></xui:column><xui:column id="gridColumn2" ref="sContent" label="内容" type="textarea" width="272px" readonly="true"></xui:column>
  <xui:column id="gridColumn9" ref="sStatusName" label="任务状态" type="ed" width="100px"></xui:column><xui:column id="gridColumn5" ref="sActualStartTime" label="开始时间" type="ed" width="168px"></xui:column>
  <xui:column id="gridColumn6" ref="sActualFinishTime" label="结束时间" type="ed" width="168px"></xui:column>
  </xhtml:div></xui:view>  
  <xui:resource id="resource1"><xhtml:script id="htmlScript1" src="banliIdea.js"></xhtml:script></xui:resource> 
</xui:window>
