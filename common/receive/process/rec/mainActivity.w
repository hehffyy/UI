<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="width:93px;height:auto;top:259px;left:363px;"> 
    <data auto-load="true" component="/UI/system/components/data.xbl.xml#bizData"
      concept="B_Catalog" data-type="json" id="dataMain" is-tree="true" limit="-1"
      offset="0" update-mode="whereVersion" onAfterRefresh="mainActivity.dataMainAfterRefresh"> 
      <creator action="/common/receive/logic/action/createB_CatalogAction" id="default1"/>  
      <reader action="/common/receive/logic/action/queryB_CatalogAction" id="default2"/>  
      <writer action="/common/receive/logic/action/saveB_CatalogAction" id="default3"/>  
      <tree-option id="default4" parent-relation="fParent" virtual-root="业务目录" node-level-relation="fLevel"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="listData" concept="B_Receive">
      <creator id="default16" action="/common/receive/logic/action/createB_ReceiveAction"/>  
      <reader id="default17" action="/common/receive/logic/action/queryB_ReceiveAction"/>  
      <writer id="default18" action="/common/receive/logic/action/saveB_ReceiveAction"/>  
      <master id="master1" data="dataMain" relation="fWJID"/>
    </data> 
  <xforms:action id="action3" ev:event="onload"><xforms:script id="xformsScript3"><![CDATA[mainActivity.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view auto-load="true" id="rootView"> 
    <xhtml:div component="/UI/system/components/menuButton.xbl.xml#menuButton" id="menuButton1"
      label="新建"> 
      <menuitem id="menuitem1" name="newChild" operation="newChild" operation-owner="dataMain"/>  
      <menuitem id="newBrother" name="newBrother" operation="newBrother" operation-owner="dataMain"/>  
      <menuitem id="newRoot" label="新建根节点" name="newRoot" operation="new" operation-owner="dataMain"/> 
    </xhtml:div>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      id="saveTrigger" operation="save" operation-owner="dataMain"> 
      <xforms:label id="saveTriggerLabel"/> 
    </xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      id="deleteTrigger" operation="delete" operation-owner="dataMain"> 
      <xforms:label id="deleteTriggerLabel"/> 
    </xforms:trigger>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      id="refreshTrigger" operation="refresh" operation-owner="dataMain"> 
      <xforms:label id="refreshTriggerLabel"/> 
    </xforms:trigger>  
    <xui:view auto-load="true" class="xui-container" id="vDetail"> 
      <layout id="layout1" style="height:100%;;position:relative;" type="absolute"> 
        <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
          id="borderLayout1" style="width:100%; height: 100%;position:absolute;left:0px;top:0px;"> 
          <top size="38px" id="borderLayout-top1">
            <xui:place control="view1" id="controlPlace3" style="width:100%;height:70%;"/>
          </top>  
          <center id="borderLayout-center1">
            <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
              id="borderLayout3" style="width:100%; height: 100%;;"> 
              <top size="35px" id="borderLayout-top3">
                <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                  id="buttonBar2" style="padding-left:10px;">
                  <xui:place control="trigger1" id="controlPlace4"/>  
                  <xui:place control="trigger2" id="controlPlace5"/>  
                  <xui:place control="trigger3" id="controlPlace8"/>
                </xhtml:div>
              </top>  
              <center id="borderLayout-center3" style="padding-left:10px;">
                <xui:place control="view2" id="controlPlace9" style="height:100%;width:100%;"/>
              </center>
            </xhtml:div>
          </center>
        </xhtml:div>
      </layout>  
      <xui:view auto-load="true" id="view1" class="xui-container"> 
        <layout type="absolute" style="position:relative;" id="layout2">
          <place control-label="iptFCatalogName" id="default7" style="position:absolute;top:10px;left:261px;"/>  
          <place control="iptFCatalogName" id="default8" style="height:30px;position:absolute;width:190px;top:2px;left:330px;"/>  
          <place control-label="iptFKZY" id="default9" style="position:absolute;left:11px;top:10px;"/>  
          <place control="iptFKZY" id="default10" style="height:30px;position:absolute;width:190px;top:2px;left:50px;"/>  
          </layout>  
        <xforms:input id="iptFCatalogName" ref="data('dataMain')/fCatalogName"/>  
        <xforms:input id="iptFKZY" ref="data('dataMain')/fKZY"/>  
        </xui:view>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
        appearance="image-text" icon-class="icon-system-plus"> 
        <xforms:label id="default13"><![CDATA[新建]]></xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate">
          <xforms:script id="xformsScript2"><![CDATA[mainActivity.trigger1Click(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
        operation-owner="listData" operation="delete" appearance="image-text"> 
        <xforms:label id="default14"><![CDATA[删除]]></xforms:label>
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3"
        operation-owner="listData" operation="refresh" appearance="image-text"> 
        <xforms:label id="default15"><![CDATA[刷新]]></xforms:label>
      </xforms:trigger>  
      <xui:view auto-load="true" id="view2" class="xui-container"> 
        <layout type="absolute" style="position:relative;" id="layout3"> 
          <xui:place control="attachmentDialog21" id="controlPlace11" style="position:absolute;top:115px;left:370px;"/>
          <xui:place control="grid1" id="controlPlace10" style="position:absolute;left:0px;top:-1px;height:98%;width:99%;"/>
        </layout>  
        <xhtml:div component="/UI/system/components/attachmentDialog2.xbl.xml#attachmentDialog2"
          display-buttons="upload:true;template:true;download:true;edit:true;delete:true;history:true;"
          runtime="html4" id="attachmentDialog21" ref="data('listData')/fPicture"
          extension-filter="图片文件(*.bmp;*.JPG;*.JPEG;*.JPE;*.JFIF;*.GIF;*.PNG;*.TIF;*.TIFF)|*.bmp;*.JPG;*.JPEG;*.JPE;*.JFIF;*.GIF;*.PNG;*.TIF;*.TIFF"/>
        <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
          header-row-height="38" row-height="32" show-header-menu="hide-column,save-layout,group-column,adjust-column"
          smart-render="20" id="grid1" data="listData" edit-mode="true">
          <xui:column id="gridColumn2" ref="fProcess" label="功能名称" type="ed" width="320px"/>  
          <xui:column id="gridColumn3" ref="fActivity" label="环节名称" type="ed" width="91px"/>  
          <xui:column id="gridColumn4" ref="fName" label="页面名称" type="ed" width="137px" align="center"/>  
          <xui:column id="gridColumn5" ref="fUrl" label="页面路径" type="ed" width="320px"/>  
          <xui:column id="gridColumn7" ref="fPicture" label="图片" type="attachmentEditor2"
            width="100px" editor="attachmentDialog21"/>
        </xhtml:div>
      </xui:view>
    </xui:view>  
    <xhtml:div appearance="tree" component="/UI/system/components/grid.xbl.xml#grid"
      data="dataMain" id="grdMain" show-header-menu="hide-column,save-layout,group-column,adjust-column" onRowClick="mainActivity.grdMainRowClick"> 
      <column id="gridColumn1" ref="fCatalogName" type="tree"/> 
    </xhtml:div>  
    <xui:layout style="height:100%;width:100%"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout2" style="width:100%; height: 100%;;"> 
        <top id="borderLayout-top2" size="38px"> 
          <xhtml:div collapsed-label="隐藏过滤" component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            expandable="false" expanded="true" expanded-label="展开过滤" expanded-position="6"
            expanded-width="75" id="buttonBar1" separator="false" separator-size="10"
            style="width:509px;height:31px;"> 
            <xui:place control="menuButton1" id="controlPlace7"/>  
            <xui:place control="saveTrigger" id="saveTriggerPlace"/>  
            <xui:place control="deleteTrigger" id="controlPlace6"/>  
            <xui:place control="refreshTrigger" id="refreshTriggerPlace"/>  
            <xui:place control="trigger4" id="controlPlace12" style="width:76px;"/>
          </xhtml:div> 
        </top>  
        <center id="borderLayout-center2"> 
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="200" has-arrow-button="true" has-drag-bar="true" id="HSplitter1"
            mode="horz" style="width:100%;height:100%;"> 
            <xhtml:div id="div1" region="left"> 
              <place control="grdMain" id="controlPlace1" style="width:100%;height:100%;"/> 
            </xhtml:div>  
            <xhtml:div id="div3" region="right"> 
              <place control="vDetail" id="controlPlace2" style="height:100%;width:100%;"/> 
            </xhtml:div> 
          </xhtml:div> 
        </center> 
      </xhtml:div>  
      <xui:place control="windowDialog1" id="controlPlace13" style="position:absolute;top:223px;left:49px;"/>  
      <xui:place control="windowDialog2" id="controlPlace14" style="position:absolute;top:169px;left:211px;"/>
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4"
      appearance="image-minimal"> 
      <xforms:label id="default19"><![CDATA[添加功能]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate">
        <xforms:script id="xformsScript1"><![CDATA[mainActivity.trigger4Click(event)]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="" width="800px" height="580px" modal="true" id="windowDialog1" url="/UI/common/commdialogs/funcTree/selectMultiFunctions.w?"
      onReceive="mainActivity.windowDialog1Receive" reload-on-open="true"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="" width="800px" height="540px" modal="true" id="windowDialog2" url="/UI/common/commdialogs/funcTree/selectMultiFunctions.w?"
      reload-on-open="true" onReceive="mainActivity.windowDialog2Receive"/>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="mainActivity.js"/>
  </xui:resource> 
</xui:window>
