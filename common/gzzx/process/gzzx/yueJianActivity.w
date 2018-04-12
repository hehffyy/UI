<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:296px;width:386px;left:165px;top:235px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="yueChuJian" concept="B_GongZuoHuoDong"
      store-type="grid" limit="30" confirm-refresh="false" order-by="fStartTime desc"> 
      <reader id="default11" action="/common/gzzx/logic/action/queryYcjAction"/>  
      <writer id="default12"/>  
      <creator id="default15"/>  
      <calculate-relation relation="calculate0" id="calculate-relation1"/>  
      <calculate-relation relation="calculate1" id="calculate-relation2"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="chuLi" concept="B_HuoDongChuLi" store-type="simple"
      limit="10"> 
      <master id="master1" data="yueChuJian" relation="fHuoDong"/>  
      <reader id="default2" action="/common/gzzx/logic/action/queryHuoDongChuLiAction"/>  
      <writer id="default3" action="/common/gzzx/logic/action/saveHuoDongChuLiAction"/>  
      <creator id="default4" action="/common/gzzx/logic/action/createHuoDongChuLiAction"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="ycjStatus,yzStatus,wsyqStatus,qtyStatus,currentTabPage" src="" auto-load="false" id="data"
      store-type="simple" auto-new="true" onValueChanged="yueJianActivity.dataValueChanged"> 
      <rows xmlns="" id="default69"></rows> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="puTongYueJian" concept="B_GongZuoHuoDong"
      store-type="grid" limit="30" confirm-refresh="false" order-by="fStartTime desc"> 
      <reader id="default35" action="/common/gzzx/logic/action/queryYzjAction"/>  
      <writer id="default34"/>  
      <creator id="default36"/>  
      <calculate-relation relation="calculate0" id="calculate-relation3"/>  
      <calculate-relation relation="calculate1" id="calculate-relation4"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="wangShangYuQing" concept="B_GongZuoHuoDong"
      store-type="grid" limit="30" confirm-refresh="false" order-by="fStartTime desc"> 
      <reader id="default44" action="/common/gzzx/logic/action/queryWsyqAction"/>  
      <writer id="default45"/>  
      <creator id="default43"/>  
      <calculate-relation relation="calculate0" id="calculate-relation6"/>  
      <calculate-relation relation="calculate1" id="calculate-relation5"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="gongGaoXinXI" concept="B_GongZuoHuoDong"
      store-type="grid" limit="30" confirm-refresh="false" order-by="fStartTime desc"> 
      <reader id="default47" action="/common/gzzx/logic/action/queryQtyAction"/>  
      <writer id="default48"/>  
      <creator id="default46"/>  
      <calculate-relation relation="calculate0" id="calculate-relation8"/>  
      <calculate-relation relation="calculate1" id="calculate-relation7"/> 
    </data>  
    <xforms:action id="action1" ev:event="onload"> 
      <xforms:script id="xformsScript1"><![CDATA[yueJianActivity.model1Load(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1"
        class="xui-tabPanel" style="height:100%;width:100%;"> 
        <xui:tab id="tabPage1" visable="false" xforms-select="yueJianActivity.tabPage1Select"> 
          <xui:label id="xuiLabel1"><![CDATA[阅处件]]></xui:label>  
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout1" style="width:100%; height: 100%;;"> 
            <top size="40px" id="borderLayout-top1"> 
              <xui:place control="view3" id="controlPlace11" style="height:100%;width:100%;position:relative;padding-left:15px;"/> 
            </top>  
            <center id="borderLayout-center1"> 
              <xui:place control="grid1" id="controlPlace1" style="height:100%;width:100%;"/> 
            </center>  
            <bottom size="50px" id="borderLayout-bottom1"> 
              <xui:place control="view1" id="controlPlace4" style="height:100%;width:100%;"/> 
            </bottom> 
          </xhtml:div> 
        </xui:tab>  
        <xui:tab id="tabPage2" visable="false" xforms-select="yueJianActivity.tabPage2Select"> 
          <xui:label id="xuiLabel2"><![CDATA[普通阅件]]></xui:label>  
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout2" style="width:100%; height: 100%;;"> 
            <top size="40px" id="borderLayout-top2"> 
              <xui:place control="view23" id="controlPlace91" style="height:100%;width:100%;padding-left:15px;"/> 
            </top>  
            <center id="borderLayout-center2"> 
              <xui:place control="grid2" id="controlPlace17" style="height:100%;width:100%;"/> 
            </center>  
            <bottom size="50px" id="borderLayout-bottom2"> 
              <xui:place control="view5" id="controlPlace19" style="height:100%;width:100%;"/> 
            </bottom> 
          </xhtml:div> 
        </xui:tab>  
        <xui:tab id="tabPage3" xforms-select="yueJianActivity.tabPage3Select"> 
          <xui:label id="xuiLabel3"><![CDATA[网上舆情]]></xui:label>  
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout3" style="width:100%; height: 100%;;"> 
            <top size="40px" id="borderLayout-top3"> 
              <xui:place control="view24" id="controlPlace97" style="height:100%;width:100%;padding-left:15px;"/> 
            </top>  
            <center id="borderLayout-center3"> 
              <xui:place control="grid7" id="controlPlace62" style="height:100%;width:100%;"/> 
            </center>  
            <bottom size="50px" id="borderLayout-bottom7"> 
              <xui:place control="view18" id="controlPlace64" style="height:100%;width:100%;"/> 
            </bottom> 
          </xhtml:div> 
        </xui:tab>  
        <xui:tab id="tabPage4" xforms-select="yueJianActivity.tabPage4Select"> 
          <xui:label id="xuiLabel4"><![CDATA[公告信息（全厅阅件）]]></xui:label>  
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout4" style="width:100%; height: 100%;;"> 
            <top size="40px" id="borderLayout-top4"> 
              <xui:place control="view25" id="controlPlace103" style="height:100%;width:100%;padding-left:15px;"/> 
            </top>  
            <center id="borderLayout-center4"> 
              <xui:place control="grid8" id="controlPlace63" style="height:100%;width:100%;"/> 
            </center>  
            <bottom size="50px" id="borderLayout-bottom8"> 
              <xui:place control="view19" id="controlPlace66" style="height:100%;width:100%;"/> 
            </bottom> 
          </xhtml:div> 
        </xui:tab> 
      </xhtml:div>  
      <xui:place control="oneYueJianRunner" id="controlPlace105" style="position:absolute;left:172px;top:155px;"/>  
      <xui:place control="wenDianPiYueBiaoRunner" id="controlPlace106" style="position:absolute;left:236px;top:156px;"/> 
    </xui:layout>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid1" data="yueChuJian" onRowDblClick="yueJianActivity.grid1RowDblClick"> 
      <xui:column id="gridColumn5" ref="calculate0" label="序号" type="ro" width="50px"
        align="center" show-index="true"/>  
      <xui:column id="gridColumn4" ref="checkbox" label="#master_checkbox" type="ch"
        width="40px" align="center"/>
      <xui:column id="gridColumn3" ref="fStartTime" label="发布日期" type="ro" width="100px"
        align="center" format="yyyy-MM-dd"/>  
      <xui:column id="gridColumn2" ref="fHostOrg" label="来文单位" type="ro" width="200px"/>  
      <xui:column id="gridColumn1" ref="fActivityTitle" label="来文名称" type="ro" width="*"/> 
    </xhtml:div>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xui:place control="pagination1" id="controlPlace3" style="height:100%;width:100%;"/> 
      </layout>  
      <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination"
        items="first last pre next" id="pagination1" data="yueChuJian" align="centered"
        page-count="5"/> 
    </xui:view>  
    <xui:view auto-load="true" id="view3" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout3"> 
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar1" style="margin-left:15px;padding-top:5px;"> 
          <xui:place control="trigger1" id="controlPlace2" style="width:100px;"/>
          <xui:place control="radio1" id="controlPlace68" style="height:30px;"/>  
        </xhtml:div>  
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar2" style="float:right;padding-right:30px;padding-top:5px;"> 
          <xui:place control="smartFilter1" id="controlPlace9" style="width:250px;height:30px;"/>  
          <xui:place control="trigger4" id="controlPlace10" style="width:70px;"/> 
        </xhtml:div> 
      </layout>  
      <xforms:select1 ref="data('data')/ycjStatus" id="radio1"> 
        <xforms:item id="selectItem1"> 
          <xforms:label id="default49"><![CDATA[全部]]></xforms:label>  
          <xforms:value id="default50"><![CDATA[全部]]></xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem2"> 
          <xforms:label id="default51"><![CDATA[未阅]]></xforms:label>  
          <xforms:value id="default52"><![CDATA[未阅]]></xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem3"> 
          <xforms:label id="default67"><![CDATA[已阅]]></xforms:label>  
          <xforms:value id="default68"><![CDATA[已阅]]></xforms:value> 
        </xforms:item> 
      </xforms:select1>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
        appearance="image-text" icon-class="icon-system-ok" class="button-green"> 
        <xforms:label id="default1">批量已阅</xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate"><xforms:script id="xformsScript2"><![CDATA[yueJianActivity.trigger1Click(event)]]></xforms:script></xforms:action></xforms:trigger>
      <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
        id="smartFilter1" filter-data="yueChuJian" filter-relations="fActivityTitle,fHostOrg,fStartTime"
        auto-refresh="true"/>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4"
        appearance="image-text" operation-owner="yueChuJian" operation="refresh" icon-class="icon-system-search"
        class="button-blue"> 
        <xforms:label id="default18">查询</xforms:label> 
      </xforms:trigger>  
    </xui:view>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid2" data="puTongYueJian" onRowDblClick="yueJianActivity.grid2RowDblClick"> 
      <xui:column id="gridColumn11" ref="calculate0" label="序号" type="ro" width="50px"
        align="center" show-index="true"/>  
      <xui:column id="gridColumn10" ref="checkbox" label="#master_checkbox" type="ch"
        width="40px" align="center"/>  
      <xui:column id="gridColumn7" ref="fStartTime" label="发布日期" type="ro" width="100px"
        align="center" format="yyyy-MM-dd"/>  
      <xui:column id="gridColumn8" ref="fHostOrg" label="来文单位" type="ro" width="200px"/>  
      <xui:column id="gridColumn9" ref="fActivityTitle" label="来文名称" type="ro" width="*"/> 
    </xhtml:div>  
    <xui:view auto-load="true" id="view5" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout5"> 
        <xui:place control="pagination2" id="controlPlace18" style="height:100%;width:100%;"/> 
      </layout>  
      <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination"
        items="first last pre next" id="pagination2" data="puTongYueJian" align="centered"
        page-count="5"/> 
    </xui:view>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid7" data="wangShangYuQing" onRowDblClick="yueJianActivity.grid7RowDblClick"> 
      <xui:column id="gridColumn39" ref="calculate0" label="序号" type="ro" width="50px"
        align="center" show-index="true"/>  
      <xui:column id="gridColumn37" ref="checkbox" label="#master_checkbox" type="ch"
        width="40px" align="center"/>  
      <xui:column id="gridColumn40" ref="fStartTime" label="发布日期" type="ro" width="100px"
        align="center" format="yyyy-MM-dd"/>  
      <xui:column id="gridColumn42" ref="fHostOrg" label="来文单位" type="ro" width="200px"/>  
      <xui:column id="gridColumn41" ref="fActivityTitle" label="来文名称" type="ro" width="*"/> 
    </xhtml:div>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid8" data="gongGaoXinXI" onRowDblClick="yueJianActivity.grid8RowDblClick"> 
      <xui:column id="gridColumn45" ref="calculate0" label="序号" type="ro" width="50px"
        align="center" show-index="true"/>  
      <xui:column id="gridColumn43" ref="checkbox" label="#master_checkbox" type="ch"
        width="40px" align="center"/>  
      <xui:column id="gridColumn46" ref="fStartTime" label="发布日期" type="ro" width="100px"
        align="center" format="yyyy-MM-dd"/>  
      <xui:column id="gridColumn48" ref="fHostOrg" label="来文单位" type="ro" width="200px"/>  
      <xui:column id="gridColumn47" ref="fActivityTitle" label="来文名称" type="ro" width="*"/> 
    </xhtml:div>  
    <xui:view auto-load="true" id="view18" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout18"> 
        <xui:place control="pagination7" id="controlPlace65" style="height:100%;width:100%;"/> 
      </layout>  
      <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination"
        items="first last pre next" id="pagination7" data="wangShangYuQing" align="centered"
        page-count="5"/> 
    </xui:view>  
    <xui:view auto-load="true" id="view19" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout19"> 
        <xui:place control="pagination8" id="controlPlace67" style="height:100%;width:100%;"/> 
      </layout>  
      <xhtml:div component="/UI/system/components/pagination.xbl.xml#pagination"
        items="first last pre next" id="pagination8" data="gongGaoXinXI" align="centered"
        page-count="5"/> 
    </xui:view>  
    <xui:view auto-load="true" id="view23" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout23"> 
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar24" style="margin-left:15px;padding-top:5px;"> 
          <xui:place control="trigger36" id="controlPlace88" style="width:100px;"/>  
          <xui:place control="radio5" id="controlPlace87" style="height:30px;"/> 
        </xhtml:div>  
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar23" style="float:right;padding-right:30px;padding-top:5px;"> 
          <xui:place control="smartFilter12" id="controlPlace90" style="width:250px;height:30px;"/>  
          <xui:place control="trigger35" id="controlPlace92" style="width:70px;"/> 
        </xhtml:div> 
      </layout>  
      <xforms:select1 ref="data('data')/yzStatus" id="radio5"> 
        <xforms:item id="selectItem14"> 
          <xforms:label id="default103">全部</xforms:label>  
          <xforms:value id="default101">全部</xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem13"> 
          <xforms:label id="default100">未阅</xforms:label>  
          <xforms:value id="default102">未阅</xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem15"> 
          <xforms:label id="default104">已阅</xforms:label>  
          <xforms:value id="default105">已阅</xforms:value> 
        </xforms:item> 
      </xforms:select1>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger36"
        appearance="image-text" icon-class="icon-system-ok" class="button-green"> 
        <xforms:label id="default99"><![CDATA[批量已阅]]></xforms:label>  
        <xforms:action id="action5" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript5"><![CDATA[yueJianActivity.trigger36Click(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
        id="smartFilter12" filter-data="puTongYueJian" filter-relations="fActivityTitle,fHostOrg,fStartTime"
        auto-refresh="true"/>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger35"
        appearance="image-text" operation-owner="puTongYueJian" operation="refresh"
        icon-class="icon-system-search" class="button-blue"> 
        <xforms:label id="default97">查询</xforms:label> 
      </xforms:trigger> 
    </xui:view>  
    <xui:view auto-load="true" id="view24" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout24"> 
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar26" style="margin-left:15px;padding-top:5px;"> 
          <xui:place control="trigger39" id="controlPlace94" style="width:100px;"/>  
          <xui:place control="radio6" id="controlPlace93" style="height:30px;"/> 
        </xhtml:div>  
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar25" style="float:right;padding-right:30px;padding-top:5px;"> 
          <xui:place control="smartFilter13" id="controlPlace96" style="width:250px;height:30px;"/>  
          <xui:place control="trigger38" id="controlPlace98"/> 
        </xhtml:div> 
      </layout>  
      <xforms:select1 ref="data('data')/wsyqStatus" id="radio6"> 
        <xforms:item id="selectItem17"> 
          <xforms:label id="default112">全部</xforms:label>  
          <xforms:value id="default110">全部</xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem16"> 
          <xforms:label id="default109">未阅</xforms:label>  
          <xforms:value id="default111">未阅</xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem18"> 
          <xforms:label id="default113">已阅</xforms:label>  
          <xforms:value id="default114">已阅</xforms:value> 
        </xforms:item> 
      </xforms:select1>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger39"
        appearance="image-text" icon-class="icon-system-ok" class="button-green"> 
        <xforms:label id="default108"><![CDATA[批量已阅]]></xforms:label>  
        <xforms:action id="action4" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript4"><![CDATA[yueJianActivity.trigger39Click(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
        id="smartFilter13" filter-data="wangShangYuQing" filter-relations="fActivityTitle,fHostOrg,fStartTime"/>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger38"
        appearance="image-text" operation-owner="wangShangYuQing" operation="refresh"
        class="button-blue" icon-class="icon-system-search"> 
        <xforms:label id="default106">查询</xforms:label> 
      </xforms:trigger> 
    </xui:view>  
    <xui:view auto-load="true" id="view25" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout25"> 
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar28" style="margin-left:15px;padding-top:5px;"> 
          <xui:place control="trigger42" id="controlPlace100" style="width:100px;"/>  
          <xui:place control="radio7" id="controlPlace99" style="height:30px;"/> 
        </xhtml:div>  
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar27" style="float:right;padding-right:30px;padding-top:5px;"> 
          <xui:place control="smartFilter14" id="controlPlace102" style="width:250px;height:30px;"/>  
          <xui:place control="trigger41" id="controlPlace104"/> 
        </xhtml:div> 
      </layout>  
      <xforms:select1 ref="data('data')/qtyStatus" id="radio7"> 
        <xforms:item id="selectItem20"> 
          <xforms:label id="default121">全部</xforms:label>  
          <xforms:value id="default119">全部</xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem19"> 
          <xforms:label id="default118">未阅</xforms:label>  
          <xforms:value id="default120">未阅</xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem21"> 
          <xforms:label id="default122">已阅</xforms:label>  
          <xforms:value id="default123">已阅</xforms:value> 
        </xforms:item> 
      </xforms:select1>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger42"
        appearance="image-text" icon-class="icon-system-ok" class="button-green"> 
        <xforms:label id="default117"><![CDATA[批量已阅]]></xforms:label>  
        <xforms:action id="action6" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript6"><![CDATA[yueJianActivity.trigger42Click(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
        id="smartFilter14" filter-data="gongGaoXinXI" filter-relations="fActivityTitle,fHostOrg,fStartTime"
        auto-refresh="true"/>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger41"
        appearance="image-text" operation-owner="gongGaoXinXI" operation="refresh"
        class="button-blue" icon-class="icon-system-search"> 
        <xforms:label id="default115">查询</xforms:label> 
      </xforms:trigger> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner"
      id="oneYueJianRunner" url="/UI/common/gzzx/process/gzzx/oneYueJian.w"
      title="阅件信息浏览" onReceive="yueJianActivity.wangShangYuQingRunnerReceive"/>  
    <xhtml:div component="/UI/system/components/windowRunner.xbl.xml#windowRunner"
      id="wenDianPiYueBiaoRunner" url="/UI/EGovSys/gzzx/wenDianPiYueBiaoActivity.w"
      title="阅件信息浏览" process="/EGovSys/gzzx/gzzxProcess" activity="yueJianActivity"
      onReceive="yueJianActivity.wenDianPiYueBiaoRunnerReceive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="yueJianActivity.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/base/core/template/butoneExtend.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="yueJianActivity.css"/>
  </xui:resource> 
</xui:window>
