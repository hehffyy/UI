<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:43px;top:80px;">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="xml" auto-load="true" id="materialData" concept="V_MaterialFile"
      is-tree="true" limit="-1" onRefreshCreateParam="materialBrowse.materialDataRefreshCreateParam"
      store-type="grid">
      <reader id="default1" action="/base/core/material/logic/action/getBizMaterialBrowseAction"/>  
      <tree-option id="default2" parent-relation="fParentId"/>
    </data>  
    <xforms:action id="action1" ev:event="onload">
      <xforms:script id="xformsScript1"><![CDATA[materialBrowse.model1Load(event)]]></xforms:script>
    </xforms:action>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout">
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="30%"
        mode="horz" id="HSplitter1" class="xui-splitter" style="height:100%;width:100%;"
        resizable="true" has-drag-bar="true" has-arrow-button="true"> 
        <xhtml:div region="left" id="div1">
          <xui:place control="view1" id="controlPlace1" style="height:100%;width:100%;"/>
        </xhtml:div>  
        <xhtml:div region="right" id="div2">
          <xui:place control="view2" id="controlPlace3" style="width:100%;height:100%;"/>
        </xhtml:div>
      </xhtml:div>
    </xui:layout>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1">
        <xui:place control="tree1" id="controlPlace2" style="position:absolute;left:0px;top:0px;height:100%;width:100%;"/>
      </layout>  
      <xhtml:div class="ui-light" component="/UI/system/components/grid.xbl.xml#grid"
        appearance="tree" show-header-menu="hide-column,save-layout,group-column,adjust-column"
        smart-render="20" id="tree1" data="materialData" onRowDblClick="materialBrowse.tree1RowDblClick">
        <xui:column id="gridColumn1" ref="fMaterialName" label="材料名称" type="tree"
          width="*" align="left" readonly="true"/> 
      </xhtml:div>
    </xui:view>  
    <xui:view auto-load="true" id="view2" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout2">
        <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
          id="borderLayout1" style="width:100%; height: 100%;position:absolute;"> 
          <top size="40px" id="borderLayout-top1" style="border-bottom:1px solid #ccc;">
            <xui:place control="view3" id="controlPlace5" style="height:100%;width:100%;"/>
          </top>  
          <center id="borderLayout-center1">
            <xhtml:iframe id="_detail-data-frame_" name="_detail-data-frame_" src="about:blank"
              frameborder="no" style="width: 100%; height: 100%"/>
          </center>
        </xhtml:div>
      </layout>  
      <xui:view auto-load="true" id="view3" class="xui-container"> 
        <layout type="flow" style="position:relative;" id="layout3"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar1" style="float:right;padding-right:10px;"> 
            <xui:place control="fileDownload" id="controlPlace4"/>
          </xhtml:div>  
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            id="buttonBar2" style="height:100%;"> 
            <xhtml:span id="span2" class="xui-container" style="height:100%;width:100%;font-size:large;font-weight:bold;"><![CDATA[文件内容:]]></xhtml:span>
          </xhtml:div> 
        </layout>  
        <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="fileDownload"
          class="button-green" icon-class="icon-system-down" appearance="image-text"> 
          <xforms:label id="default3"><![CDATA[附件下载]]></xforms:label>  
          <xforms:action id="action2" ev:event="DOMActivate">
            <xforms:script id="xformsScript2"><![CDATA[materialBrowse.fileDownloadClick(event)]]></xforms:script>
          </xforms:action>
        </xforms:trigger> 
      </xui:view>
    </xui:view>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="materialBrowse.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/system/service/doc/docUtil.js"/>  
    <xhtml:script id="htmlScript3" src="/UI/system/service/doc/docUtil2.js"/>
  </xui:resource> 
</xui:window>
