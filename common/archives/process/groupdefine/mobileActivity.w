<window 
  xmlns:xu="http://www.xmldb.org/xupdate" 
  xmlns:xui="http://www.justep.com/xui" 
  xmlns:xs="http://www.w3.org/2001/XMLSchema" 
  xmlns:xforms="http://www.justep.com/xforms" 
  xmlns:xhtml="http://www.w3.org/1999/xhtml" 
  xmlns:ev="http://www.w3.org/2001/xml-events" 
  xmlns="http://www.justep.com/xui" 
  component="/UI/system/components/window.xbl.xml#window" 
  id="window" 
  extends="/UI/common/archives/process/groupdefine/mainActivity.w" >

  <div id="default76" xui:update-mode="delete"/>
   <xui:column id="gridColumn18" visible="false"  xui:update-mode="merge"/>
    <itemset-data id="default1_1" xmlns="" xui:parent="default22" xui:update-mode="insert" >
<rows id="default2_1" xmlns="" >
<row id="default3_1" >
<cell id="default4_1" />
<cell id="default5_1" />
</row>
<row id="default6_1" >
<cell id="default7_1" >
WAITTING</cell>
<cell id="default8_1" >
待办件</cell>
</row>
<row id="default9_1" >
<cell id="default10_1" >
HAVEDONE</cell>
<cell id="default11_1" >
已办件</cell>
</row>
<row id="default12_1" >
<cell id="default13_1" >
NOTHANDLE</cell>
<cell id="default14_1" >
经办件(未办结)</cell>
</row>
<row id="default15_1" >
<cell id="default16_1" >
HANDLED</cell>
<cell id="default17_1" >
经办件(已办结)</cell>
</row>
</rows>
</itemset-data>
   <xhtml:label id="label1" style="padding-left:20px;color:red;display:none;"  xui:update-mode="merge"/>
    <xhtml:script xmlns:xhtml="http://www.w3.org/1999/xhtml" id="htmlScript1_1" src="/UI/common/archives/process/groupdefine/mobileActivity.js" xui:parent="resource1" xui:update-mode="insert" />

</window>