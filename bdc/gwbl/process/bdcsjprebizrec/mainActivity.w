<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1" style="height:auto;left:506px;top:286px;"><data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereAll" data-type="json" auto-load="true" id="slbData" concept="B_V_YWSLB" onAfterRefresh="mainActivity.preBizRecDataAfterRefresh" limit="8" order-by="SLSJ desc">
   <reader id="default1" action="/bdc/gwbl/logic/action/queryB_V_YWSLBSJAction"></reader>
   <writer id="default2" action="/bdc/gwbl/logic/action/saveB_V_YWSLB1Action"></writer>
   <creator id="default3"></creator>
   <calculate-relation relation="shoujianButton" id="calculate-relation3"></calculate-relation>
  <rule id="dataBizRule2" relation="shoujianButton"></rule>
  <rule id="dataBizRule3" concept="B_V_YWSLB" readonly="true()"></rule>
  <calculate-relation relation="calculate0" id="calculate-relation1"></calculate-relation></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="qllxBizData" concept="B_V_YWLXJCB" limit="-1">
   <reader id="default20" action="/bdc/gwbl/logic/action/queryB_V_QLLXAction"></reader>
   <master id="master1"></master></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="true" id="djdlBizData" concept="B_V_YWLXJCB" relations="B_V_YWLXJCB,FGUID,DJLX,YWJC,PX,DJLXLB">
   <reader id="default19" action="/bdc/gwbl/logic/action/queryB_V_DJDLAction"></reader></data>
  <data component="/UI/system/components/data.xbl.xml#data" data-type="xml" columns="qllx,djdl,djdlbh,qllxbh,qrcode,qjbh" src="" auto-load="false" id="qllxData" auto-new="true" store-type="simple" onValueChanged="mainActivity.qllxDataValueChanged">
   <rows xmlns="" id="default41"></rows></data>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="ybData" concept="B_V_YWSLB" limit="8" order-by="SLSJ desc" onAfterRefresh="mainActivity.ybDataAfterRefresh"><reader id="default16" action="/bdc/gwbl/logic/action/queryB_V_YWSLBSJAction"></reader>
  <writer id="default17" action="/bdc/gwbl/logic/action/saveB_V_YWSLB1Action"></writer>
  <rule id="dataBizRule4" concept="B_V_YWSLB" readonly="true()"></rule>
  <calculate-relation relation="calculate1" id="calculate-relation2"></calculate-relation></data>
  <xforms:action id="action6" ev:event="xforms-model-construct"><xforms:script id="xformsScript6"><![CDATA[mainActivity.model1ModelConstruct(event)]]></xforms:script></xforms:action>
  <xforms:action id="action8" ev:event="xbl-loaded"><xforms:script id="xformsScript8"><![CDATA[mainActivity.model1XBLLoaded(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;position:relative;" id="rootLayout" type="absolute"><xui:place control="view1" id="controlPlace1" style="position:absolute;height:100%;width:100%;"></xui:place></xui:layout> 
  <xui:view auto-load="true" id="view1" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout1"><xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="16%" mode="vert" id="VSplitter1" style="position:absolute;width:100%;left:0px;top:0px;height:100%;" class="xui-splitter" status="normal" fix-type="top">
   <xhtml:div region="top" id="div1" style="height:130px;">
  <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="100%" mode="horz" id="HSplitter1" class="xui-splitter" style="width:100%;height:100%;">
   <xhtml:div region="left" id="div3"><xui:place control="view2" id="controlPlace3" style="width:100%;height:40px;"></xui:place>
  <xui:place control="view5" id="controlPlace27" style="width:100%;height:40px;"></xui:place>
  <xui:place control="view6" id="controlPlace36" style="width:100%;height:40px;"></xui:place></xhtml:div>
   <xhtml:div region="right" id="div4"></xhtml:div></xhtml:div></xhtml:div>
   <xhtml:div region="bottom" id="div2" style="height:100%;width:100%;"><xui:place control="view3" id="controlPlace6" style="width:100%;height:100%;overflow:hidden"></xui:place></xhtml:div></xhtml:div></layout>
  <xui:view auto-load="true" id="view3" class="xui-container">
   <layout type="absolute" style="position:relative;height:100%;width:100%;" id="layout3"><xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1" class="xui-tabPanel" style="height:100%;width:100%;position:absolute;position:absolute;">
   <xui:tab id="tabPage1" xforms-select="mainActivity.tabPage1Select">
    <xui:label id="xuiLabel1"><![CDATA[待  办  件]]></xui:label>
    <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style=" height: 100%;width:100%;">
     <top size="40px" id="borderLayout-top1">
      <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" style="height:34px;width:74%;" separator="false" separator-size="12" expandable="false">
       <xui:place control="toolbars5" id="controlPlace15"></xui:place>
       
       <xui:place control="trigger9" id="controlPlace18" style="width:64px;"></xui:place>
  <xui:place control="trigger3" id="controlPlace5" style="width:65px;"></xui:place><xui:place control="trigger6" id="controlPlace10"></xui:place><xui:place control="trigger7" id="controlPlace9" style="height:25px;font-size:medium;width:82px;background-color:#0000FF;"></xui:place>
       <xui:place control="trigger4" id="controlPlace16" style="height:27px;"></xui:place><xui:place control="trigger8" id="controlPlace8" style="height:25px;font-size:medium;width:70px;"></xui:place>
       <xui:place control="trigger1" id="controlPlace2"></xui:place>
  
  
  <xui:place control="trigger5" id="controlPlace17"></xui:place>
  </xhtml:div> 
      <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar6" style="height:34px;width:34%;"><xui:place control="pagination5" id="controlPlace56" style="width:100%;height:34px;"></xui:place></xhtml:div></top> 
     <center id="borderLayout-center1">
      <xui:place control="grid1" id="controlPlace7" style="height:100%;width:100%;"></xui:place></center> </xhtml:div> </xui:tab> 
   <xui:tab id="tabPage2" xforms-select="mainActivity.tabPage2Select">
    <xui:label id="xuiLabel2"><![CDATA[已  办   件]]></xui:label>
  <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="width:100%; height: 100%;;">
   <top size="42px" id="borderLayout-top2"><xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar3" separator="false" separator-size="12" expandable="false" style="height:36px;width:65%;">
   <xui:place control="toolbars2" id="controlPlace47"></xui:place>
   <xui:place control="trigger18" id="controlPlace45" style="font-size:medium;background-color:#0000FF;height:29px;width:102px;"></xui:place>
   </xhtml:div>
  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar5" style="width:30%;"><xui:place control="pagination4" id="controlPlace55" style="width:100%;height:34px;"></xui:place></xhtml:div></top>
   <center id="borderLayout-center2"><xui:place control="grid2" id="controlPlace4" style="width:100%;height:100%;top:5px;"></xui:place></center></xhtml:div></xui:tab> </xhtml:div>
  <xui:place control="windowDialog1" id="controlPlace21" style="position:absolute;left:128px;top:143px;"></xui:place></layout>
  <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars5"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger7" appearance="image-text" icon-class="icon-system-archive">
   <xforms:label id="default10"><![CDATA[详情查看]]></xforms:label>
   <xforms:action id="action4" ev:event="DOMActivate">
    <xforms:script id="xformsScript4">mainActivity.trigger7Click(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" appearance="image-text" class="button-blue">
   <xforms:label id="default5"><![CDATA[证明新增]]></xforms:label>
  <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[mainActivity.trigger3Click(event)]]></xforms:script></xforms:action></xforms:trigger><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger8" appearance="image-text" icon-class="icon-system-cancel"  >
   <xforms:label id="default11">作废</xforms:label>
   <xforms:action id="action2" ev:event="DOMActivate">
    <xforms:script id="xformsScript2">mainActivity.trigger8Click(event)</xforms:script></xforms:action> </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1" operation-owner="slbData" operation="save" appearance="image-minimal">
   <xforms:label id="default4"></xforms:label></xforms:trigger>
  <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid1" data="slbData" onRowDblClick="mainActivity.grid1RowDblClick">
   <xui:column id="gridColumn19" ref="calculate0" label="序号" type="ed" width="66px" show-index="true"></xui:column><xui:column id="gridColumn21" ref="QJYWHGLBS" label="权籍编号" type="ed" width="43px" visible="false"></xui:column><xui:column id="gridColumn12" ref="QLRC" label="申请人" type="ed" width="168px" align="center"></xui:column><xui:column id="gridColumn25" ref="YWH" label="业务号" type="ed" width="179px"></xui:column><xui:column id="gridColumn3" ref="YWMC" label="业务名称" type="ed" width="360px"></xui:column><xui:column id="gridColumn9" ref="QXMC" label="区县名称" type="ed" width="85px" align="center"></xui:column><xui:column id="gridColumn5" ref="SLRY" label="受理人员" type="ed" width="80px" align="center"></xui:column>
  <xui:column id="gridColumn8" ref="SLSJ" label="受理时间" type="ed" width="154px" format="yyyy-MM-dd hh:mm" align="center"></xui:column><xui:column id="gridColumn23" ref="ZXZ" label="接收人" type="ed" width="85px" align="center"></xui:column>
  </xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger9" appearance="image-text" class="button-blue">
   <xforms:label id="default27"><![CDATA[登记新增]]></xforms:label>
  <xforms:action id="action1" ev:event="DOMActivate"><xforms:script id="xformsScript1"><![CDATA[mainActivity.trigger9Click(event)]]></xforms:script></xforms:action></xforms:trigger><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4" appearance="image-text" icon-class="icon-system-minus-circle">
   <xforms:label id="default23"><![CDATA[删除]]></xforms:label>
  <xforms:action id="action7" ev:event="DOMActivate"><xforms:script id="xformsScript7"><![CDATA[mainActivity.trigger4Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger5" operation-owner="slbData" operation="refresh" appearance="image-minimal">
   <xforms:label id="default24"><![CDATA[]]></xforms:label></xforms:trigger>
  <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="选择权利类型" width="600px" height="500px" modal="true" id="windowDialog1" url="/UI/bdc/gwbl/process/bdcsjprebizrec/qllxChoice.w" left="350px" onSend="mainActivity.windowDialog1Send" onReceive="mainActivity.windowDialog1Receive"></xhtml:div>
  <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" header-row-height="36" row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column" smart-render="20" id="grid2" data="ybData" onRowDblClick="mainActivity.grid2RowDblClick">
   <xui:column id="gridColumn20" ref="calculate1" label="序号" type="ed" width="42px" show-index="true"></xui:column><xui:column id="gridColumn22" ref="QJYWHGLBS" label="权籍编号" type="ed" width="97px" visible="false"></xui:column><xui:column id="gridColumn16" ref="QLRC" label="申请人" type="ed" width="168px" align="center"></xui:column><xui:column id="gridColumn6" ref="YWH" label="业务号" type="ed" width="179px"></xui:column>
   <xui:column id="gridColumn4" ref="YWMC" label="业务名称" type="ed" width="360px"></xui:column><xui:column id="gridColumn15" ref="QXMC" label="区县名称" type="ed" width="85px" align="center"></xui:column>
   
   <xui:column id="gridColumn13" ref="SLRY" label="受理人员" type="ed" width="80px" align="center"></xui:column>
   <xui:column id="gridColumn17" ref="SLSJ" label="受理时间" type="ed" width="154px" format="yyyy-MM-dd hh:mm" align="center"></xui:column>
   <xui:column id="gridColumn24" ref="ZXZ" label="接收人" type="ed" width="85px" align="center"></xui:column>
  <xui:column id="gridColumn2" ref="FSTATUS" label="状态" type="ed" width="84px" align="center"></xui:column>
  </xhtml:div>
  <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars2"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger18" appearance="image-text" class="button-blue" icon-class="icon-system-archive">
   <xforms:label id="default120">详情查看</xforms:label>
   <xforms:action id="action14" ev:event="DOMActivate"><xforms:script id="xformsScript14"><![CDATA[mainActivity.trigger18Click(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next" id="pagination4" data="ybData" align="right" page-count="5" class="xui-autofill"></xhtml:div>
  <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination" items="first last pre next" id="pagination5" data="slbData" align="right" page-count="5"></xhtml:div>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger6" class="button-blue">
   <xforms:label id="default9"><![CDATA[权籍新增]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[mainActivity.trigger6Click(event)]]></xforms:script></xforms:action></xforms:trigger></xui:view>
  <xui:view auto-load="true" id="view2" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout2">
    <xhtml:label id="label4" class="xui-label" style="font-size:medium;position:absolute;left:52px;top:21px;">状态</xhtml:label>
    <xui:place control="gridFilter2" id="controlPlace13" style="position:absolute;left:95px;width:135px;top:12px;height:27px;"></xui:place>
    <xhtml:label id="label5" class="xui-label" style="font-size:medium;position:absolute;left:267px;top:19px;">日期</xhtml:label>
    <xui:place control="dateFilter2" id="controlPlace14" style="position:absolute;left:305px;width:104px;height:24px;top:13px;"></xui:place>
    <xhtml:label id="label6" class="xui-label" style="font-size:medium;position:absolute;left:421px;top:19px;">模糊查询</xhtml:label>
    <xui:place control="smartFilter2" id="controlPlace12" style="width:244px;position:absolute;left:496px;top:12px;height:27px;"></xui:place>
    <xui:place control="trigger2" id="controlPlace20" style="position:absolute;top:15px;left:755px;height:25px;width:66px;"></xui:place></layout> 
   <xhtml:div component="/UI/system/components/filter.xbl.xml#gridFilter" all-selected-label="'全部'" id="gridFilter2" filter-data="slbData" filter-relation="FSTATUS" default-value="'未收件'" default-label="'未收件'">
    <xforms:label ref="value" id="default29"></xforms:label>
    <xforms:value ref="value" id="default30"></xforms:value>
    <xforms:itemset id="default31">
     <xforms:column ref="value" id="default37"></xforms:column>
      
  <itemset-data xmlns="" id="default6">
   <rows xmlns="" id="default7">
    <row id="default8">
     <cell id="default12">未收件</cell></row> </rows> </itemset-data></xforms:itemset> </xhtml:div> 
   <xhtml:div default-select="0" component="/UI/system/components/dateFilter.xbl.xml#dateFilter" onChanged="" filter-date-mode="single" id="dateFilter2" filter-data="slbData" filter-date-relation1="SLSJ" filter-date-relation2="SLSJ" auto-refresh="true"></xhtml:div>
   <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter2" filter-data="slbData" filter-relations="YWH,JZMC,CWHMC,YWMC,DJDLMC,DJXLMC,QLRC,BGYY" auto-refresh="true"></xhtml:div>
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" operation-owner="slbData" operation="refresh" appearance="image-text" class="button-blue">
    <xforms:label id="default34">刷新</xforms:label></xforms:trigger> </xui:view>
  <xui:view auto-load="true" id="view5" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout5">
    <xhtml:label id="label11" class="xui-label" style="font-size:medium;position:absolute;position:absolute;left:267px;top:19px;">日期</xhtml:label>
    <xui:place control="dateFilter3" id="controlPlace29" style="position:absolute;left:305px;width:104px;top:13px;height:24px;"></xui:place>
    <xhtml:label id="label10" class="xui-label" style="font-size:medium;position:absolute;position:absolute;left:421px;top:19px;">模糊查询</xhtml:label>
    <xui:place control="smartFilter3" id="controlPlace30" style="position:absolute;left:496px;top:12px;height:27px;width:244px;"></xui:place>
    <xui:place control="trigger11" id="controlPlace31" style="position:absolute;top:15px;left:755px;height:25px;width:66px;"></xui:place>
    <xhtml:label id="label14" class="xui-label" style="font-size:medium;position:absolute;left:52px;position:absolute;top:21px;">状态</xhtml:label>
    <xui:place control="gridFilter6" id="controlPlace35" style="position:absolute;left:95px;top:12px;height:27px;width:135px;"></xui:place></layout> 
   <xhtml:div default-select="3" component="/UI/system/components/dateFilter.xbl.xml#dateFilter" onChanged="" filter-date-mode="single" id="dateFilter3" filter-data="ybData" filter-date-relation1="SLSJ" filter-date-relation2="SLSJ" auto-refresh="true"></xhtml:div>
   <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter" id="smartFilter3" filter-data="ybData" filter-relations="YWH,QXMC,JZMC,CWHMC,YWMC,DJDLMC,DJXLMC,QLRC" auto-refresh="true"></xhtml:div>
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger11" operation-owner="ybData" appearance="image-text" class="button-blue" icon-class="icon-system-refresh">
    <xforms:label id="default65">刷新</xforms:label></xforms:trigger> 
   <xhtml:div component="/UI/system/components/filter.xbl.xml#gridFilter" all-selected-label="'全部'" id="gridFilter6" filter-data="ybData" filter-relation="FSTATUS" default-value="'已收件'" default-label="'已收件'">
    <xforms:label ref="value" id="default83"></xforms:label>
    <xforms:value ref="value" id="default77"></xforms:value>
    <xforms:itemset id="default78">
     <xforms:column ref="value" id="default86"></xforms:column>
     <itemset-data xmlns="" id="default89">
      <rows xmlns="" id="default90">
       <row id="default91">
        <cell id="default92">已收件</cell></row> 
       <row id="default93">
        <cell id="default94">作废</cell></row> </rows> </itemset-data> </xforms:itemset> </xhtml:div> </xui:view>
  <xui:view auto-load="true" id="view6" class="xui-container">
   <layout type="absolute" style="position:relative;" id="layout6">
    <xui:place control="gridSelect4" id="controlPlace38" style="position:absolute;left:96px;height:27px;width:135px;top:6px;"></xui:place>
    <xhtml:label id="label15" style="position:absolute;font-size:medium;top:13px;left:21px;" class="xui-label">登记大类</xhtml:label>
    <xui:place control="gridSelect5" id="controlPlace40" style="position:absolute;left:306px;top:6px;height:28px;width:435px;"></xui:place>
    <xhtml:label id="label16" style="position:absolute;font-size:medium;top:10px;left:236px;" class="xui-label">登记小类</xhtml:label>
    <xui:place control="trigger13" id="controlPlace41" style="position:absolute;top:6px;width:66px;left:755px;height:25px;"></xui:place>
  </layout> 
   <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect4" ref="data('qllxData')/djdlbh" label-ref="data('qllxData')/djdl" dropdown-height="400">
    <xforms:label ref="YWJC" id="default100"></xforms:label>
    <xforms:value ref="FGUID" id="default101"></xforms:value>
    <xforms:itemset id="default102" data="djdlBizData">
     <xforms:column ref="FGUID" visible="false" id="default103"></xforms:column>
     <xforms:column ref="YWJC" id="default104"></xforms:column></xforms:itemset> </xhtml:div> 
   <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gridSelect5" ref="data('qllxData')/qllxbh" label-ref="data('qllxData')/qllx" dropdown-height="400">
    <xforms:label ref="YWJC" id="default108"></xforms:label>
    <xforms:value ref="FGUID" id="default109"></xforms:value>
    <xforms:itemset id="default110" data="qllxBizData">
     <xforms:column ref="FGUID" visible="false" id="default111"></xforms:column>
     <xforms:column ref="YWJC" id="default112"></xforms:column></xforms:itemset> </xhtml:div> 
   <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger13" class="button-blue" icon-class="icon-system-left-dir" appearance="image-text">
    <xforms:label id="default113">重置</xforms:label>
    <xforms:action id="action9" ev:event="DOMActivate">
     <xforms:script id="xformsScript9">mainActivity.trigger13Click(event)</xforms:script></xforms:action> </xforms:trigger> 
  </xui:view>
  </xui:view></xui:view>  
  <xui:resource id="resource1">
  <xhtml:script id="htmlScript1" src="mainActivity.js"></xhtml:script>
  <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"></xhtml:script>
  <xhtml:script id="htmlScript4" src="/UI/system/components/windowRunner/windowRunner.js"></xhtml:script></xui:resource> 
</xui:window>
