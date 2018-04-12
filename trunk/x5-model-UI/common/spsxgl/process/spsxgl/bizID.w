<window 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xs="http://www.w3.org/2001/XMLSchema" 
  xmlns:xforms="http://www.justep.com/xforms" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml" 
  xmlns:ev="http://www.w3.org/2001/xml-events" 
  xmlns="http://www.justep.com/xui" 
  component="/UI/system/components/window.xbl.xml#window" 
  extends="/UI/system/dialog/base2/singleList.w" >

  <div id="smartFilter" xui:update-mode="delete"/>
  <div id="filterImg" xui:update-mode="delete"/>
  <div id="pagination1" xui:update-mode="delete"/>
  <div id="controlPlace4" xui:update-mode="delete"/>
  <div id="controlPlace5" xui:update-mode="delete"/>
  <div id="controlPlace24" xui:update-mode="delete"/>
   <data id="main" concept="B_Material" data-type="json" onRefreshCreateParam="bizID.mainRefreshCreateParam" auto-load="false" limit="20"  xui:update-mode="merge"/>
    <reader action="/base/core/material/logic/action/getBusinessMaterialsAction" id="default1_5" xui:parent="main" xui:update-mode="insert" />
    <writer action="/base/core/material/logic/action/saveB_MaterialAllAction" id="default2_5" xui:parent="main" xui:update-mode="insert" />
    <creator action="/base/core/material/logic/action/createB_MaterialAction" id="default3_5" xui:parent="main" xui:update-mode="insert" />
   <xhtml:div id="windowReceiver" onReceive="bizID.windowReceiverReceive"  xui:update-mode="merge"/>
    <column id="default4_5" label="材料ID" ref="fMaterialId" type="ro" width="144px" xui:parent="grid" xui:update-mode="insert" />
    <column id="default5_5" label="材料名称" ref="fMaterialName" type="ro" width="220px" xui:parent="grid" xui:update-mode="insert" />
   <xui:place id="windowReceiverPlace" style="left:302px;top:112px;"  xui:update-mode="merge"/>
    <xhtml:script xmlns:xhtml="http://www.w3.org/1999/xhtml" id="htmlScript2_1" src="bizID.js" xui:parent="resource" xui:update-mode="insert" />

</window>