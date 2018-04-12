<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model" style="top:282px;height:auto;left:148px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      auto-load="false" id="dOrgTree" concept="SA_OPOrg" limit="-1" relations="sName,sFID,sFName,sOrgKindID,sParent"
      is-tree="true" data-type="json" onRefreshCreateParam="selectExecutorsDialog.dOrgTreeRefreshCreateParam"> 
      <reader id="default2" action="/system/logic/action/queryOrgAction"/>  
      <tree-option id="default3" parent-relation="sParent" root-filter="1=0"/>  
      <calculate-relation relation="virtual" id="calculate-relation1" type="xsd:boolean"></calculate-relation>
  </data>  
    <data component="/UI/system/components/data.xbl.xml#data" columns="sName,sFID,sFName,sOrgKindID,sParent,calcIndex,responsible"
      src="" auto-load="false" id="dSelected" data-type="json"> 
      <rows xmlns="" id="default48"> </rows> 
    </data>  
    <xforms:action id="action1" ev:event="xforms-model-construct-done"> 
      <xforms:script id="xformsScript1">selectExecutorsDialog.modelModelConstructDone(event)</xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      auto-load="false" id="dOrgList" concept="SA_OPOrg" limit="20" relations="sName,sFID,sFName,sOrgKindID,sParent"
      is-tree="false" data-type="json"> 
      <reader id="default1" action="/system/logic/action/queryOrgAction"/>  
      <calculate-relation relation="virtual" id="calculate-relation2" type="xsd:boolean"></calculate-relation></data>  
    <xforms:action id="action2" ev:event="xbl-loaded">
      <xforms:script id="xformsScript2">selectExecutorsDialog.modelXBLLoaded(event)</xforms:script>
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="dOrgBackground" concept="SA_OPOrg" limit="-1"
      store-type="simple" relations="sName,sFID,sFName,sOrgKindID,sParent">
      <reader id="default4" action="/system/logic/action/queryOrgAction"/>
    </data>
  </xforms:model>  
  <xui:view id="rootView"> 
    <xui:layout id="rootLayout" style="height:100%;width:100%;"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout1" style="width:100%;height:100%;" border-size="8px"> 
        <top size="32px" id="borderLayout-top1"> 
          <xhtml:div id="div16" class="xui-container" style="width:100%;height:100%;"> 
            <xhtml:input type="text" value="" id="inputSearch" class="xui-input" style="float:left;width:80px;"
              onkeydown="selectExecutorsDialog.inputSearchKeydown(event)"/>
            <xui:place control="btnSearch" id="controlPlace8" style="float:left;width:24px;height:24px;margin-left:2px;"/>  
            <xui:place control="btnMoveLast" id="controlPlace13" style="float:right;width:61px;"/>  
            <xui:place control="btnMoveDown" id="controlPlace14" style="float:right;width:62px;"/>  
            <xui:place control="btnMoveUp" id="controlPlace15" style="float:right;width:62px;"/>  
            <xui:place control="btnMoveFirst" id="controlPlace16" style="float:right;width:62px;"/>
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="divToolbar" style="margin:0px 0px 0px 0px;" separator-size="0"><xui:place control="btnNextPage" id="controlPlace17"></xui:place>
  <xui:place control="btnAllPage" id="controlPlace18"></xui:place></xhtml:div></xhtml:div> 
        </top>  
        <center id="borderLayout-center1"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout2" style="width:100%; height: 100%;;"> 
            <center id="borderLayout-center2"> 
              <xui:place control="gridSelected" id="controlPlace6" style="width:100%;height:100%;border-style:solid solid solid solid;border-width:1px 1px 1px 1px;border-color:#C0C0C0 #C0C0C0 #C0C0C0 #C0C0C0;"/> 
            </center>  
            <left size="65px" id="borderLayout-left2"> 
              <xhtml:div id="divMiddle" class="xui-container" style="height:100%;width:100%;"> 
                <xui:place control="btnSelectAll" id="controlPlace9" style="position:relative;top:40px;width:55px;left:5px;"/>  
                <xui:place control="btnSelect" id="controlPlace10" style="position:relative;top:60px;left:5px;width:55px;"/>  
                <xui:place control="btnUnSelect" id="controlPlace11" style="position:relative;top:80px;width:55px;left:5px;"/>  
                <xui:place control="btnClear" id="controlPlace12" style="position:relative;top:100px;left:5px;width:55px;"/>
              </xhtml:div> 
            </left> 
          </xhtml:div> 
        </center>  
        <left size="200px" id="borderLayout-left1"> 
          <xhtml:div id="divOrgTree" class="xui-container" style="overflow:hidden;width:100%;float:left;height:100%;"> 
            <xui:place control="gridOrgTree" id="controlPlace5" style="height:100%;width:100%;"/> 
          </xhtml:div>  
          <xhtml:div id="divOrgList" class="xui-container" style="overflow:hidden;width:100%;float:left;height:100%;"> 
            <xui:place control="gridOrgList" id="controlPlace2" style="height:100%;width:100%;border-style:solid solid solid solid;border-width:1px 1px 1px 1px;border-color:#C0C0C0 #C0C0C0 #C0C0C0 #C0C0C0;"/> 
          </xhtml:div> 
        </left>  
        <bottom size="38px" id="borderLayout-bottom1"> 
          <xhtml:div id="divButtons" class="xui-container" style="width:100%;padding-top:8px;height:100%;"> 
            <xhtml:div id="divCascade" class="xui-container" style="width:160px;height:100%;float:left;"> 
              <xhtml:input type="checkbox" value="" name="" id="cbCascade" style="float:left;"/>  
              <xhtml:label id="labelCascade" class="xui-label" for="cbCascade" style="float:left;margin-top:5px;">级联选择</xhtml:label> 
            </xhtml:div>  
            <xui:place control="btnCancel" id="controlPlace4" style="width:80px;float:right;"/>  
            <xui:place control="btnOk" id="controlPlace7" style="float:right;width:80px;margin-right:8px;"/>
          </xhtml:div> 
        </bottom> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace1" style="top:89px;left:121px;"/> 
    </xui:layout>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" id="gridSelected"
      data="dSelected" onRowDblClick="selectExecutorsDialog.gridSelectedRowDblClick"
      multi-selection="false" smart-render="20" onCellHint="selectExecutorsDialog.gridCellHint" row-height="25" header-row-height="25" class="grid-compact" space-column="false" edit-mode="false"> 
      <xui:column id="gridColumn0" ref="calcIndex" label="序号" type="ro" align="center" show-index="true" width="30" readonly="true"/>
      <xui:column id="gridColumn1" ref="sName" label="名称" type="ro" width="125px"/>
      <xui:column id="gridColumn6" ref="sOrgKindID" label="类型" type="html" width="50px"
        align="center" onRender="selectExecutorsDialog.grid_sOrgKindIDRender"/>
      <xui:column id="gridColumn2" ref="responsible" label="responsible" type="ed" width="0px" visible="false"></xui:column></xhtml:div>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="selectExecutorsDialog.windowReceiverReceive"/>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" id="gridOrgTree"
      data="dOrgTree" delay="true" appearance="tree" onShowNodeImg="selectExecutorsDialog.gridOrgTreeShowNodeImg"
      multi-selection="true" cascade="false" onRowChecked="selectExecutorsDialog.gridOrgTreeRowChecked"
      onRowDblClick="selectExecutorsDialog.gridOrgTreeRowDblClick" smart-render="20" onRowHasChildren="selectExecutorsDialog.gridOrgTreeRowHasChildren" onRowValueChanged="selectExecutorsDialog.gridRowValueChanged" onCellHint="selectExecutorsDialog.gridCellHint" class="ui-light"> 
      <xui:column id="gridColumn3" ref="sName" label="sName" type="tree" readonly="true"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" id="gridOrgList"
      data="dOrgList" multi-selection="false" onRowDblClick="selectExecutorsDialog.gridOrgListRowDblClick"
      onRowChecked="selectExecutorsDialog.gridOrgListRowChecked" smart-render="20" onCellHint="selectExecutorsDialog.gridCellHint" onRowValueChanged="selectExecutorsDialog.gridRowValueChanged" class="grid-compact" row-height="25" header-row-height="25" space-column="false"> 
      <xui:column id="gridColumn4" ref="sName" label="名称" type="checkbox" width="*"/>  
      <xui:column id="gridColumn5" ref="sOrgKindID" label="类型" type="html" width="40"
        onRender="selectExecutorsDialog.grid_sOrgKindIDRender" align="center"/> 
    </xhtml:div>  
    <xforms:trigger id="btnCancel" appearance="image-minimal"> 
      <xforms:label id="xuiLabel1">取消</xforms:label>  
      <xforms:action id="action3" ev:event="DOMActivate">
        <xforms:script id="xformsScript3">selectExecutorsDialog.btnCancelClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnOk" class="button-green" appearance="image-text"> 
      <xforms:label id="xuiLabel2">确定</xforms:label>  
      <xforms:action id="action4" ev:event="DOMActivate">
        <xforms:script id="xformsScript4">selectExecutorsDialog.btnOkClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnSelectAll" appearance="image-minimal" icon-class="icon-system-angle-double-right"> 
      <xforms:label id="xuiLabel4"><![CDATA[全选]]></xforms:label>  
      <xforms:action id="action8" ev:event="DOMActivate">
        <xforms:script id="xformsScript8">selectExecutorsDialog.btnSelectAllClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnSelect" appearance="image-minimal" icon-class="icon-system-angle-right"> 
      <xforms:label id="xuiLabel5"><![CDATA[选择]]></xforms:label>  
      <xforms:action id="action7" ev:event="DOMActivate">
        <xforms:script id="xformsScript7">selectExecutorsDialog.btnSelectClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnUnSelect" appearance="image-minimal" icon-class="icon-system-angle-left"> 
      <xforms:label id="xuiLabel6"><![CDATA[移除]]></xforms:label>  
      <xforms:action id="action6" ev:event="DOMActivate">
        <xforms:script id="xformsScript6">selectExecutorsDialog.btnUnSelectClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnClear" appearance="image-minimal" icon-class="icon-system-angle-double-left"> 
      <xforms:label id="xuiLabel7"><![CDATA[清空]]></xforms:label>  
      <xforms:action id="action5" ev:event="DOMActivate">
        <xforms:script id="xformsScript5">selectExecutorsDialog.btnClearClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnSearch" appearance="image" icon-class="icon-system-search" class="button-yellow"> 
      <xforms:label id="xuiLabel3"><![CDATA[搜索]]></xforms:label>  
      <xforms:action id="action9" ev:event="DOMActivate">
        <xforms:script id="xformsScript9">selectExecutorsDialog.btnSearchClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnMoveLast" icon-class="icon-system-angle-double-down" appearance="image-minimal"> 
      <xforms:label id="xuiLabel8"><![CDATA[置底]]></xforms:label>  
      <xforms:action id="action14" ev:event="DOMActivate">
        <xforms:script id="xformsScript14">selectExecutorsDialog.btnMoveLastClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnMoveDown" icon-class="icon-system-angle-down" appearance="image-minimal"> 
      <xforms:label id="xuiLabel9"><![CDATA[下移]]></xforms:label>  
      <xforms:action id="action15" ev:event="DOMActivate">
        <xforms:script id="xformsScript15">selectExecutorsDialog.btnMoveDownClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnMoveUp" appearance="image-minimal" icon-class="icon-system-angle-up"> 
      <xforms:label id="xuiLabel10"><![CDATA[上移]]></xforms:label>  
      <xforms:action id="action16" ev:event="DOMActivate">
        <xforms:script id="xformsScript16">selectExecutorsDialog.btnMoveUpClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnMoveFirst" appearance="image-minimal" class="button-yellow" icon-class="icon-system-angle-double-up"> 
      <xforms:label id="xuiLabel11"><![CDATA[置顶]]></xforms:label>  
      <xforms:action id="action17" ev:event="DOMActivate">
        <xforms:script id="xformsScript17">selectExecutorsDialog.btnMoveFirstClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnNextPage" operation-owner="dOrgList" operation="loadNextPage" icon-class="icon-system-angle-right" appearance="image-minimal">
   <xforms:label id="default5"><![CDATA[下页]]></xforms:label></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnAllPage" operation-owner="dOrgList" operation="loadAllPage" icon-class="icon-system-angle-double-right" appearance="image-minimal">
   <xforms:label id="default6"><![CDATA[全部]]></xforms:label></xforms:trigger></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="selectExecutorsDialog.js"/>  
    <xhtml:script id="htmlScript2" src="/UI/system/service/process/dialogs/processDialogUtils.js"/> 
  <xhtml:script id="htmlScript3" src="/UI/system/service/org/orgUtils.js"></xhtml:script></xui:resource> 
</xui:window>
