<window 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xforms="http://www.justep.com/xforms" 
  xmlns:xs="http://www.w3.org/2001/XMLSchema" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml" 
  xmlns:ev="http://www.w3.org/2001/xml-events" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.justep.com/xui" 
  component="/UI/system/components/window.xbl.xml#window" 
  extends="/UI/system/dialog/base2/singleList.w" >

  <div id="smartFilter" xui:update-mode="delete"/>
  <div id="filterImg" xui:update-mode="delete"/>
  <div id="pagination1" xui:update-mode="delete"/>
  <div id="btn-refresh" xui:update-mode="delete"/>
  <div id="controlPlace4" xui:update-mode="delete"/>
  <div id="controlPlace5" xui:update-mode="delete"/>
  <div id="controlPlace24" xui:update-mode="delete"/>
  <div id="controlPlace6" xui:update-mode="delete"/>
  <div id="action2" xui:update-mode="delete"/>
   <data id="main" concept="B_Material" data-type="json" onRefreshCreateParam="materialSelect.mainRefreshCreateParam" auto-load="false" limit="20"  xui:update-mode="merge"/>
    <reader action="/base/core/material/logic/action/getNeedMaterialsAction" id="default1_5" xui:parent="main" xui:update-mode="insert" />
    <writer action="/base/core/material/logic/action/saveB_MaterialAllAction" id="default2_5" xui:parent="main" xui:update-mode="insert" />
    <creator action="/base/core/material/logic/action/createB_MaterialAction" id="default3_5" xui:parent="main" xui:update-mode="insert" />
    <calculate-relation id="calculate-relation1_2" relation="sel" type="xsd:integer" xui:parent="main" xui:update-mode="insert" />
   <xhtml:div id="windowReceiver" onReceive="materialSelect.windowReceiverReceive"  xui:update-mode="merge"/>
    <xui:column xmlns:xui="http://www.justep.com/xui" id="gridColumn1_2" label="[选择]" ref="sel" type="ch" width="46px" xui:parent="grid" xui:update-mode="insert" />
    <xui:column xmlns:xui="http://www.justep.com/xui" id="gridColumn2_1" label="顺序" ref="fDispOrder" type="ed" width="48px" xui:parent="grid" xui:update-mode="insert" />
    <column filter-editor="#text_filter" id="default5_5" label="材料名称" ref="fMaterialName" type="ro" xui:parent="grid" xui:update-mode="insert" />
    <xui:column xmlns:xui="http://www.justep.com/xui" id="gridColumn1_1" label="是否需要实物" ref="fphysical" type="ed" width="100px" xui:parent="grid" xui:update-mode="insert" />
   <top id="bl2-t" size="9px"  xui:update-mode="merge"/>
    <xforms:action xmlns:xforms="http://www.justep.com/xforms" ev:event="DOMActivate" id="action1_2" xui:parent="ensure-btn" xui:update-mode="insert" >
<xforms:script xmlns:xforms="http://www.justep.com/xforms" id="xformsScript1_2" >
<![CDATA[materialSelect.ensure_btnClick(event)]]>
</xforms:script>
</xforms:action>
   <xui:place id="windowReceiverPlace" style="left:302px;top:112px;"  xui:update-mode="merge"/>
    <xhtml:script xmlns:xhtml="http://www.w3.org/1999/xhtml" id="htmlScript2_1" src="materialSelect.js" xui:parent="resource" xui:update-mode="insert" />
<xu:modifications>
  <xu:remove select="//*[@id='grid']/@onRowDblClick"/>
</xu:modifications>

</window>