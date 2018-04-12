<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" xmlns:ev="http://www.w3.org/2001/xml-events" xmlns:xhtml="http://www.w3.org/1999/xhtml" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model1" style="width:201px;top:153px;height:68px;left:346px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" auto-load="false" id="dOrgTree" concept="SA_OPOrg" is-tree="true" limit="-1" onIndexChanged="mainActivity.dOrgTreeIndexChanged" onAfterRefresh="mainActivity.dOrgTreeAfterRefresh" confirm-refresh="false"> 
      <reader id="default1" action="/SA/OPM/logic/action/queryOPOrgAction"/>  
      <creator id="default2"/>  
      <writer id="default3"/>  
      <tree-option id="treeOption1" parent-relation="sParent" root-filter="SA_OPOrg.sParent is null" virtual-root="组织机构"/>  
      <filter name="filterOrgKind" id="filter1">SA_OPOrg.sOrgKindID &lt;&gt; 'psm'</filter> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" auto-load="false" id="dOrgList" concept="SA_OPOrg" onAfterRefresh="mainActivity.dOrgListAfterRefresh" onIndexChanged="mainActivity.dOrgListIndexChanged" onAfterRefreshPage="mainActivity.dOrgListAfterRefreshPage" limit="20" confirm-refresh="false" onRefreshCreateParam="mainActivity.dOrgListRefreshCreateParam"> 
      <reader id="default4" action="/SA/OPM/logic/action/queryOPOrgAction"/>  
      <calculate-relation relation="calcIndex" id="calculate-relation1"/> 
    </data>  
    <xforms:action id="action21" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript21"><![CDATA[mainActivity.model1ModelConstructDone(event)]]></xforms:script> 
    </xforms:action> 
  	<data component="/UI/system/components/data.xbl.xml#data" data-type="xml" columns="id,label" src="" auto-load="false" id="dOrgKinds">
  	</data>
  	<data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="listOrgKinds,listOrgKindLabels" src="" auto-load="true" id="dTemp" store-type="simple" onValueChanged="mainActivity.dTempValueChanged">
      <rows xmlns="" id="default17">
        <row id="default18">
          <cell id="default19"></cell>
          <cell id="default20"></cell>
        </row> 
      </rows>
    </data>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" width="500px" height="400px" modal="true" id="wdOrgDetail" url="/SA/OPM/organization/orgDetail.w" resizable="false" minmaxable="false" reload-on-open="false" title="组织" onReceive="mainActivity.wdOrgDetailReceive" dialogUpdate="true"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="人员" width="663px" height="476px" modal="true" id="wdPersonDetail" url="/SA/OPM/organization/personDetail.w" onReceive="mainActivity.wdPersonDetailReceive" resizable="false" minmaxable="false" dialogUpdate="true"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="组织排序" width="396px" height="444px" modal="true" id="wdSortOrgs" url="/SA/OPM/organization/sortOrgs.w" onReceive="mainActivity.wdSortOrgsReceive" dialogUpdate="true"/>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="组织搜索" width="596px" height="214px" modal="false" id="wdSearchOrg" url="/SA/OPM/dialogs/searchOrg/searchOrg.w" neighbor="imageSearchOrg" onReceive="mainActivity.wdSearchOrgReceive" dialogUpdate="true"/>  
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
      <xui:place control="wdOrgDetail" id="controlPlace3" style="top:293px;left:148px;"/>  
      <xui:place control="wdPersonDetail" id="controlPlace8" style="top:293px;left:189px;"/>  
      <xui:place control="wdSortOrgs" id="controlPlace11" style="top:295px;left:270px;"/>  
      <xui:place control="wdSearchOrg" id="controlPlace6" style="top:99px;left:56px;"/>  
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout1" style=" height: 100%;width:100%;"> 
        <center id="borderLayout-center1"> 
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="16%" mode="horz" id="HSplitter2" class="xui-splitter" has-drag-bar="true" has-arrow-button="true" style="height:100%;width:100%;"> 
            <xhtml:div region="left" id="div3"> 
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout2" style="height:100%;margin-right:2px;width:auto;"> 
                <top size="40px" id="borderLayout-top2" style="margin-top:5px;margin-left:5px;"> 
                  <xhtml:input type="text" value="" id="inputSearchOrg" class="xui-input" onkeydown="mainActivity.inputSearchOrgKeydown(event)" style="width:100px;;"/>  
                  <xui:place control="imageSearchOrg" id="controlPlace24" style="height:25px;width:25px;"/> 
                </top>  
                <center id="borderLayout-center2"> 
                  <xui:place control="gridOrgTree" id="controlPlace2" style="border-style:solid solid solid solid;border-width:1px 1px 1px 1px;border-color:#C0C0C0 #C0C0C0 #C0C0C0 #C0C0C0;width:100%;height:100%;border:none;"/> 
                </center>  
                <left size="8px" id="borderLayout-left1"/> 
              </xhtml:div> 
            </xhtml:div>  
            <xhtml:div region="right" id="div4"> 
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout" id="borderLayout3" style="height:100%;margin-left:2px;width:auto;"> 
                <top size="40px" id="borderLayout-top3"> 
                  <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" separator="false" separator-size="4" id="buttonBar2" style="float:left;margin-top:5px;margin-left:5px;"> 
                    <xui:place control="btnInsertMore" id="controlPlace9" style="height:30px;width:75px;"/>  
                    <xui:place control="btnEdit" id="controlPlace10"/>  
                    <xui:place control="btnNextPage" id="controlPlace1"/>  
                    <xui:place control="btnAllPage" id="controlPlace5"/>  
                    <xui:place control="btnSort" id="controlPlace15"/>  
                    <xui:place control="btnMove" id="controlPlace7"/>  
                    <xui:place control="menuButton1" id="controlPlace22"/> 
                  </xhtml:div>  
                  <xhtml:div id="div1" class="xui-container" style="height:auto;width:auto;float:right;margin-top:10px;margin-right:10px;"> 
                    <xhtml:input type="text" value="" id="inputSearchList" class="xui-input" onkeydown="mainActivity.inputSearchListKeydown(event)" style="width:100px;"/>  
                    <xui:place control="imageSearchList" id="controlPlace23" style="height:25px;width:25px;"/> 
                  </xhtml:div>  
                  <xhtml:div component="/UI/system/components/menu.xbl.xml#menu" appearance="context" open-mode="win" menu-id="newItemsMenu" style="display: none;" class="xui-container" id="div5">
                    <xui:menuitem id="split" label="---------------" disabled="false"/>  
                    <xui:menuitem id="assignPerson" label="分配人员" img="/UI/SA/OPM/images/newPerson.gif" dis-img="/UI/SA/OPM/images/un_newPerson.gif" disabled="false"/>  
                    <xforms:action ev:event="DOMActivate" id="action11"> 
                      <xforms:script id="xformsScript11">mainActivity.newItemsMenuClick(event)</xforms:script> 
                    </xforms:action> 
                  </xhtml:div> 
                </top>  
                <center id="borderLayout-center3"> 
                  <xui:place control="gridOrgList" id="controlPlace4" style="height:100%;width:100%;"/> 
                </center> 
              </xhtml:div> 
            </xhtml:div> 
          </xhtml:div> 
        </center>  
        <bottom size="30px" id="borderLayout-bottom1"> 
          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar" id="buttonBar1" separator-size="2" separator="false">
            <xhtml:label id="label1" class="xui-label" for="cbShowDisabled">显示已禁用的组织</xhtml:label><xhtml:input type="checkbox" value="" name="" id="cbShowDisabled" onclick="mainActivity.cbShowDisabledClick(event)"/>  
              
            <xhtml:label id="label2" class="xui-label" for="cbShowAllChildren" style="margin-left:30px;">显示所有下级组织</xhtml:label><xhtml:input type="checkbox" value="" name="" id="cbShowAllChildren" onclick="mainActivity.cbShowAllChildrenClick(event)"/>  
              
            <xhtml:label id="label3" class="xui-label" for="cbOnlyShowMasterPsm" style="margin-left:30px;">只显示人员主岗</xhtml:label><xhtml:input type="checkbox" value="" name="" id="cbOnlyShowMasterPsm" onclick="mainActivity.cbOnlyShowMasterPsmClick(event)"/>  
              
            <xhtml:label id="label8" class="xui-label" style="margin-left:30px;"><![CDATA[显示的组织类型]]></xhtml:label><xui:place control="gsListOrgKinds" id="controlPlace18" style="width:200px;"></xui:place></xhtml:div>
        </bottom> 
      </xhtml:div>  
      <xui:place control="wdAssignPerson" id="controlPlace13" style="position:absolute;top:296px;left:310px;"/>  
      <xui:place control="wdChangeMainOrg" id="controlPlace12" style="position:absolute;top:296px;left:351px;"/>  
      <xui:place control="wdSelectMoveToOrg" id="controlPlace14" style="position:absolute;top:293px;left:229px;"/> 
      <xui:place control="wdAssignRoles" id="controlPlace16" style="position:absolute;top:296px;left:391px;"></xui:place>
    <xui:place control="wdPersonSignImg" id="controlPlace17" style="position:absolute;top:296px;left:438px;"></xui:place></xui:layout>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" show-header-menu="hide-column,save-layout,group-column,adjust-column" id="gridOrgTree" data="dOrgTree" appearance="tree" onShowNodeImg="mainActivity.gridOrgTreeShowNodeImg" onCellHint="mainActivity.gridOrgTreeCellHint" space-column="false" onRowHasChildren="mainActivity.gridOrgTreeRowHasChildren" class="ui-light"> 
      <xui:column id="gridColumn1" ref="sName" label="名称" type="tree" readonly="true" width="#"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/grid.xbl.xml#grid" show-header-menu="hide-column,save-layout,group-column,adjust-column" id="gridOrgList" data="dOrgList" onRowDblClick="mainActivity.gridOrgListRowDblClick" class="grid-compact" header-row-height="30" smart-render="20" row-height="30" move-column="true" space-column="false"> 
      <xui:column id="gridColumn6" ref="calcIndex" label="序号" type="ro" width="30px" show-index="true"/>  
      <xui:column id="gridColumn5" ref="sOrgKindID" type="html" width="30px" readonly="true" onRender="mainActivity.gridOrgListSOrgKindIDRender" label="类型" align="center"/>  
      <xui:column id="gridColumn2" ref="sName" label="名称" type="ro" width="200px"/>  
      <xui:column id="gridColumn3" ref="sCode" label="编码" type="ro" width="100px" align="left"/>  
      <xui:column id="gridColumn5" ref="personSex" label="性别" type="ro" width="30px" align="center"/>  
      <xui:column id="gridColumn5" ref="personIDCard" label="身份证号" type="ro" width="135px"/>  
      <xui:column id="gridColumn4" ref="sFName" label="路径" type="ro" width="300px"/>  
      <xui:column id="gridColumn4" ref="ognName" label="机构" type="ro" width="100px" align="left"/>  
      <xui:column id="gridColumn4" ref="dptName" label="部门" type="ro" width="100px"/>  
      <xui:column id="gridColumn4" ref="posName" label="岗位" type="ro" width="100px"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title="分配人员" width="600px" height="500px" modal="true" root-filter="SA_OPOrg.sParent is null" id="wdAssignPerson" multi-select="true" org-kinds="psm" onReceive="mainActivity.wdAssignPersonReceive" list-mode="false"/>  
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title="选择主岗" width="600px" height="500px" modal="true" root-filter="SA_OPOrg.sParent is null" id="wdChangeMainOrg" org-kinds="psm" onReceive="mainActivity.wdChangeMainOrgReceive" show-virtual-root="false"/>  
    <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title="移动到" width="600px" height="500px" modal="true" root-filter="SA_OPOrg.sParent is null" id="wdSelectMoveToOrg" org-kinds="" onReceive="mainActivity.wdSelectMoveToOrgReceive"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnInsertMore" class="button-blue" icon-class="icon-system-user-add" appearance="image-text"> 
      <xforms:label id="default5"><![CDATA[新建]]></xforms:label>  
      <xforms:action id="action9" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript12"><![CDATA[mainActivity.btnInsertMoreClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnEdit" appearance="image-minimal" icon-class="icon-system-edit-alt"> 
      <xforms:label id="default6"><![CDATA[编辑]]></xforms:label>  
      <xforms:action id="action15" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript15"><![CDATA[mainActivity.btnEditClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnAllPage" operation-owner="dOrgList" operation="loadAllPage" icon-class="icon-system-angle-double-right" appearance="image-minimal"> 
      <xforms:label id="default8"><![CDATA[全部]]></xforms:label> 
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/menuButton.xbl.xml#menuButton" id="menuButton1" label="更多操作" mode="down left"> 
      <menuitem id="itemAuthorize" label="权限" name="itemAuthorize" icon-class="icon-system-star" separator="true" onClick="mainActivity.itemAuthorizeClick"/>
      <menuitem name="itemEnable" label="启用" icon-class="icon-system-lock-open" onClick="mainActivity.btnEnableClick" id="itemEnable"/>  
      <menuitem name="itemDisable" label="禁用" onClick="mainActivity.btnDisableClick" separator="true" id="itemDisable" icon-class="icon-system-lock"/>  
      <menuitem name="itemLogicDelete" label="删除" icon-class="icon-system-trash" onClick="mainActivity.btnLogicDeleteClick" separator="true" id="itemLogicDelete"/>  
      <menuitem name="itemResetPassword" label="重置密码" icon-class="icon-system-key" onClick="mainActivity.btnResetPasswordClick" id="itemResetPassword"/>  
      <menuitem id="itemPersonSignImg" label="设置签名" name="itemPersonSignImg" onClick="mainActivity.itemPersonSignImgClick" icon-class="icon-system-vcard"></menuitem><menuitem id="itemChangeMainOrg" label="设置主岗" name="itemChangeMainOrg" icon-class="icon-system-users" onClick="mainActivity.btnChangeMainOrgClick"/> 
    </xhtml:div>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="imageSearchList" appearance="image" image-text-mode="LR" icon-class="icon-system-search" class="button-yellow"> 
      <xforms:label id="xuiLabel12">搜索</xforms:label>  
      <xforms:action id="action14" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript14">mainActivity.imageSearchListClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="imageSearchOrg" appearance="image" image-text-mode="LR" class="button-yellow" icon-class="icon-system-search"> 
      <xforms:label id="xuiLabel11">搜索</xforms:label>  
      <xforms:action id="action13" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript13">mainActivity.imageSearchOrgClick(event)</xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnMove" appearance="image-minimal" icon-class="icon-system-forward"> 
      <xforms:label id="default9"><![CDATA[移动]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[mainActivity.btnMoveClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnSort" icon-class="icon-system-sort" appearance="image-minimal"> 
      <xforms:label id="default11"><![CDATA[排序]]></xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript2"><![CDATA[mainActivity.btnSortClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnNextPage" operation-owner="dOrgList" operation="loadNextPage" icon-class="icon-system-angle-right" appearance="image-minimal"> 
      <xforms:label id="default7"><![CDATA[下页]]></xforms:label> 
    </xforms:trigger> 
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="权限" width="800px" height="500px" modal="true" id="wdAssignRoles" url="/UI/SA/OPM/organization/assignRoles.w"></xhtml:div>
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36" dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator="," ext-separator="," id="gsListOrgKinds" ref="data('dTemp')/listOrgKinds" label-ref="data('dTemp')/listOrgKindLabels" multi-select="true" default-label-ref="'全部'" all-selected-label-ref="'全部'">
   <xforms:label ref="label" id="default14"></xforms:label>
   <xforms:value ref="id" id="default15"></xforms:value>
   <xforms:itemset id="default16" data="dOrgKinds" auto-load-data="true"><xforms:column ref="id" visible="false" id="default21"></xforms:column>
  <xforms:column ref="label" id="default22"></xforms:column></xforms:itemset></xhtml:div>
  <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="签名图片" width="750px" height="350px" modal="true" id="wdPersonSignImg" url="/UI/SA_X/OPM/organization/personSignImage.w" reload-on-open="true"></xhtml:div></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="mainActivity.js"/>  
    <xhtml:script id="opmUtils" src="/UI/SA/OPM/js/OpmUtils.js"/> 
  <xhtml:script id="htmlScript2" src="/UI/system/service/org/orgUtils.js"></xhtml:script></xui:resource> 
</xui:window>
