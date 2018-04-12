<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml">  
  <xforms:model id="model1" style="left:309px;height:auto;top:119px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="B_HuoDongChuLi" concept="B_HuoDongChuLi" limit="-1"><reader id="default1" action="/common/gzzx/logic/action/queryHuoDongChuLiAction"></reader>
  <writer id="default2" action="/common/gzzx/logic/action/saveHuoDongChuLiAction"></writer>
  <creator id="default3" action="/common/gzzx/logic/action/createHuoDongChuLiAction"></creator>
  <calculate-relation relation="calculate2" id="calculate-relation1"></calculate-relation></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style="width:100%; height: 100%;;">
   <center id="borderLayout-center1"><xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
   <center id="borderLayout-center2"><xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"></xui:place></center>
  <bottom size="140px" id="borderLayout-bottom2"></bottom>
  </xhtml:div></center>
  <bottom size="50px" id="borderLayout-bottom1"></bottom></xhtml:div></xui:layout> 
  <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="B_HuoDongChuLi"><xui:column id="gridColumn4" ref="calculate2" label="序号" type="ro" width="50px" align="center"></xui:column><xui:column id="gridColumn2" ref="fOrgUnitName" label="人员" type="ed" width="100px"></xui:column>
  <xui:column id="gridColumn3" ref="fContent" label="处理意见" type="ed" width="400px"></xui:column>
  </xhtml:div></xui:view>  
  <xui:resource id="resource1"/> 
</xui:window>
