<window 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xforms="http://www.justep.com/xforms" 
  xmlns:xs="http://www.w3.org/2001/XMLSchema" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml" 
  xmlns:ev="http://www.w3.org/2001/xml-events" 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns="http://www.justep.com/xui" 
  component="/UI/system/components/window.xbl.xml#window" 
  extends="/UI/system/dialog/base2/multiList.w" >

   <data id="main" concept="B_GroupField" onAfterRefresh="fieldDialogActivity.mainAfterRefresh" onRefreshCreateParam="fieldDialogActivity.mainRefreshCreateParam" auto-load="false" limit="-1"  xui:update-mode="merge"/>
    <reader action="/common/archives/logic/action/query_BusinessTablesAction" id="default1_1" xui:parent="main" xui:update-mode="insert" />
    <writer id="default2_1" xui:parent="main" xui:update-mode="insert" />
    <creator id="default3_1" xui:parent="main" xui:update-mode="insert" />
   <xhtml:div id="windowReceiver" onReceive="fieldDialogActivity.windowReceiverReceive"  xui:update-mode="merge"/>
   <item id="displayColumnId" value="fFieldName"  xui:update-mode="merge"/>
    <column filter-editor="#select_filter" id="default4_1" label="概念名" ref="fTableName" type="ro" width="300px" xui:parent="grid" xui:update-mode="insert" />
    <column filter-editor="#text_filter" id="default5_1" label="字段名称" ref="fFieldName" type="ro" width="200px" xui:parent="grid" xui:update-mode="insert" />
    <column filter-editor="#text_filter" id="default6_1" label="字段标识" ref="fField" type="ro" width="200px" xui:parent="grid" xui:update-mode="insert" />
   <xhtml:div id="smartFilter" filter-relations="fTableName,fFieldName,fField"  xui:update-mode="merge"/>
   <xui:place id="controlPlace3" style="top:110px;left:207px;"  xui:update-mode="merge"/>
    <xhtml:script xmlns:xhtml="http://www.w3.org/1999/xhtml" id="htmlScript1_2" src="fieldDialogActivity.js" xui:parent="resource" xui:update-mode="insert" />

</window>