<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="width:93px;height:auto;left:103px;top:90px;"> 
    <data auto-load="true" component="/UI/system/components/data.xbl.xml#bizData"
      concept="T_SYS_SPSXXX" data-type="json" id="dataMain" is-tree="true" limit="-1"
      offset="0" update-mode="whereVersion" onAfterNew="mainActivity.dataMainAfterNew"> 
      <reader action="/common/spsxgl/logic/action/queryT_SYS_SPSXXXAction" id="default1"/>  
      <writer action="/common/spsxgl/logic/action/saveT_SYS_SPSXXXAction" id="default2"/>  
      <creator action="/common/spsxgl/logic/action/createT_SYS_SPSXXXAction" id="default3"/>  
      <tree-option id="default4" parent-relation="fSJSX"/>  
      <rule id="dataBizRule1" relation="fFWSXBH" readonly="data('dataMain')/fSXLX = 'dir'"/>  
      <rule id="dataBizRule2" relation="fJCSXDXBH" readonly="data('dataMain')/fSXLX = 'dir'"/>  
      <rule id="dataBizRule3" relation="fJCSXZXBH" readonly="data('dataMain')/fSXLX = 'dir'"/>  
      <rule id="dataBizRule4" relation="fSFBSJC" readonly="data('dataMain')/fSXLX = 'dir'"/>  
      <rule id="dataBizRule5" relation="fSFBSSX" readonly="data('dataMain')/fSXLX = 'dir'"/>  
      <rule id="dataBizRule6" relation="fYXBS" readonly="data('dataMain')/fSXLX = 'dir'"/> 
    <rule id="dataBizRule7" relation="fZBCS" readonly="data('dataMain')/fSXLX = 'dir'"></rule>
  <rule id="dataBizRule8" relation="fHBCS" readonly="data('dataMain')/fSXLX = 'dir'"></rule>
  <rule id="dataBizRule9" relation="fGDBLSX" readonly="data('dataMain')/fSXLX = 'dir'"></rule>
  <rule id="dataBizRule10" relation="fBLSXLX" readonly="data('dataMain')/fSXLX = 'dir'"></rule>
  <rule id="dataBizRule11" relation="fGDSF" readonly="data('dataMain')/fSXLX = 'dir'"></rule></data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="dataSXCL" concept="T_SYS_SPSXCL" limit="-1"> 
      <reader id="default75" action="/common/spsxgl/logic/action/queryT_SYS_SPSXCLAction"/>  
      <writer id="default76" action="/common/spsxgl/logic/action/saveT_SYS_SPSXCLAction"/>  
      <creator id="default77" action="/common/spsxgl/logic/action/createT_SYS_SPSXCLAction"/>  
      <master id="master3" data="dataMain" relation="fSPSXBH"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="canAddSX" src="" auto-load="true" id="control" store-type="simple"> 
      <rule id="dataRule1" column="canAddSX" readonly="eval(&quot;justep.xbl('dataMain').getCount()&quot;)=0"/>  
      <rows xmlns="" id="default22">  
        <row id="default23"> 
          <cell id="default24"/> 
        </row> 
      </rows> 
    </data>  
    <xforms:action id="action2" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript2"><![CDATA[mainActivity.model1ModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="dataYW" concept="T_SYS_SPSX_YWLC" limit="-1"> 
      <reader id="default60" action="/common/spsxgl/logic/action/queryT_SYS_SPSX_YWLCAction"/>  
      <writer id="default61" action="/common/spsxgl/logic/action/saveT_SYS_SPSX_YWLCAction"/>  
      <creator id="default62" action="/common/spsxgl/logic/action/createT_SYS_SPSX_YWLCAction"/>  
      <master id="master1" data="dataMain" relation="fSPSXBH"/> 
    <calculate-relation relation="No" id="calculate-relation1"></calculate-relation></data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="dataCLDZ" concept="T_SYS_SXCL_YWCL" limit="-1"
      confirm-delete="false" direct-delete="true"> 
      <reader id="default71" action="/common/spsxgl/logic/action/queryT_SYS_SXCL_YWCLAction"/>  
      <writer id="default72" action="/common/spsxgl/logic/action/saveT_SYS_SXCL_YWCLAction"/>  
      <creator id="default73" action="/common/spsxgl/logic/action/createT_SYS_SXCL_YWCLAction"/>  
      <master id="master2" data="dataYW" relation="fSXLCID"/> 
    <calculate-relation relation="No" id="calculate-relation2"></calculate-relation></data> 
  <xforms:action id="action6" ev:event="onload"><xforms:script id="xformsScript6"><![CDATA[mainActivity.model1Load(event)]]></xforms:script></xforms:action></xforms:model>  
  <xui:view auto-load="true" id="rootView"> 
    <xhtml:div component="/UI/system/components/menuButton.xbl.xml#menuButton" id="menuButton1"
      label="新建目录"> 
      <menuitem id="newRoot" name="newRoot" label="新建根目录" onClick="mainActivity.newRootClick"/>  
      <menuitem id="newChild" name="newChild" onClick="mainActivity.newChildClick"
        label="新建子目录"/> 
    </xhtml:div>  
    <xforms:trigger appearance="image-minimal" component="/UI/system/components/trigger.xbl.xml#trigger"
      id="saveTrigger" operation="save" operation-owner="dataMain"> 
      <xforms:label id="saveTriggerLabel"/> 
    <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[mainActivity.saveTriggerClick(event)]]></xforms:script></xforms:action></xforms:trigger>  
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
        <place control-label="iptFSXMC" id="default5" style="position: absolute;left:54px;top:13px;"
          label="事项名称"/>  
        <place control="iptFSXMC" id="default6" style="position: absolute;top:11px;width:200px;left:121px;"/>  
        <place control-label="iptFFWSXBH" id="default7" style="position: absolute;left:347px;top:13px;"
          label="服务事项编号"/>  
        <place control="iptFFWSXBH" id="default8" style="position: absolute;width:200px;top:11px;left:436px;"/>  
        <place control-label="iptFJCSXDXBH" id="default9" style="position: absolute;left:30px;top:48px;"
          label="监察大项编号"/>  
        <place control="iptFJCSXDXBH" id="default10" style="position: absolute;width:200px;top:46px;left:121px;"/>  
        <place control-label="iptFJCSXZXBH" id="default11" style="position: absolute;left:347px;top:48px;"
          label="监察子项编号"/>  
        <place control="iptFJCSXZXBH" id="default12" style="position: absolute;width:200px;top:46px;left:436px;"/>  
        <place control-label="iptFSFBSJC" id="default13" style="position: absolute;left:54px;top:189px;"
          label="报送监察"/>  
        <place control-label="iptFSFBSSX" id="default15" style="position: absolute;height:14px;left:371px;top:189px;"
          label="报送省信"/>  
        <place control-label="iptFYXBS" id="default17" style="position: absolute;left:54px;top:156px;"
          label="有效标识"/>  
        <xui:place control="iptFSFBSJC" id="controlPlace8" style="position:absolute;width:90px;left:121px;top:188px;"/>  
        <xui:place control="iptFSFBSSX" id="controlPlace9" style="position:absolute;width:90px;left:436px;top:188px;"/>  
        <xui:place control="iptFYXBS" id="controlPlace12" style="position:absolute;width:200px;left:121px;top:155px;"/>  
        <xhtml:label id="label1" style="position:absolute;left:54px;top:81px;" class="xui-label"><![CDATA[主办处室]]></xhtml:label>  
        <xhtml:label id="label2" style="position:absolute;left:371px;top:81px;" class="xui-label"><![CDATA[会办处室]]></xhtml:label>  
        <xhtml:label id="label3" style="position:absolute;left:30px;top:118px;" class="xui-label"><![CDATA[规定办理时限]]></xhtml:label>  
        <xhtml:label id="label4" style="position:absolute;left:371px;top:118px;" class="xui-label"><![CDATA[时限类型]]></xhtml:label>  
        <xhtml:label id="label5" style="position:absolute;left:371px;top:156px;" class="xui-label"><![CDATA[规定收费]]></xhtml:label>  
        <xui:place control="input3" id="controlPlace10" style="position:absolute;width:200px;left:121px;top:118px;"/>  
        <xui:place control="input5" id="controlPlace13" style="position:absolute;width:200px;left:436px;top:155px;"/>  
        <xui:place control="gridSelect1" id="controlPlace36" style="position:absolute;width:200px;left:436px;top:118px;"/>
      <place control-label="radio1" id="controlLabel1" style="left:54px;position:absolute;top:231px;" label="内网报件"></place>
  <xui:place control="radio1" id="controlPlace18" style="width:90px;left:121px;position:absolute;top:231px;"></xui:place>
  <xui:place control="orgSelectExt1" id="controlPlace3" style="height:21px;position:absolute;left:121px;width:200px;top:81px;"></xui:place>
  <xui:place control="orgSelectExt2" id="controlPlace4" style="height:21px;position:absolute;left:436px;width:200px;top:81px;"></xui:place></layout>  
      <xforms:input id="iptFSXMC" ref="data('dataMain')/fSXMC"/>  
      <xforms:input id="iptFFWSXBH" ref="data('dataMain')/fFWSXBH"/>  
      <xforms:input id="iptFJCSXDXBH" ref="data('dataMain')/fJCSXDXBH"/>  
      <xforms:input id="iptFJCSXZXBH" ref="data('dataMain')/fJCSXZXBH"/>  
      <xforms:select1 ref="data('dataMain')/fSFBSJC" id="iptFSFBSJC"> 
        <xforms:item id="selectItem1" style="width:31px;"> 
          <xforms:label id="default25"><![CDATA[是]]></xforms:label>  
          <xforms:value id="default26"><![CDATA[Y]]></xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem2" style="width:33px;"> 
          <xforms:label id="default27"><![CDATA[否]]></xforms:label>  
          <xforms:value id="default28"><![CDATA[N]]></xforms:value> 
        </xforms:item> 
      </xforms:select1>  
      <xforms:select1 ref="data('dataMain')/fSFBSSX" id="iptFSFBSSX"> 
        <xforms:item id="selectItem3" style="width:38px;height:23px;"> 
          <xforms:label id="default29"><![CDATA[是]]></xforms:label>  
          <xforms:value id="default30"><![CDATA[Y]]></xforms:value> 
        </xforms:item>  
        <xforms:item id="selectItem4" style="height:5px;width:12px;"> 
          <xforms:label id="default31"><![CDATA[否]]></xforms:label>  
          <xforms:value id="default32"><![CDATA[N]]></xforms:value> 
        </xforms:item> 
      </xforms:select1>  
      <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
        dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
        ext-separator="," id="iptFYXBS" ref="data('dataMain')/fYXBS"> 
        <xforms:label ref="value" id="default37"/>  
        <xforms:value ref="key" id="default38"/>  
        <xforms:itemset id="default39"> 
          <xforms:column ref="key" visible="false" id="default42"/>  
          <xforms:column ref="value" id="default43"/>  
          <itemset-data xmlns="" id="default52">  
            <rows id="default53"> 
              <row id="default54"> 
                <cell id="default55">Y</cell>  
                <cell id="default56">有效</cell> 
              </row>  
              <row id="default57"> 
                <cell id="default58">N</cell>  
                <cell id="default59">无效</cell> 
              </row> 
            </rows> 
          </itemset-data> 
        </xforms:itemset> 
      </xhtml:div>  
      <xforms:input id="input3" ref="data('dataMain')/fGDBLSX"/>  
      <xforms:input id="input5" ref="data('dataMain')/fGDSF"/>  
      <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
        dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
        ext-separator="," id="gridSelect1" ref="data('dataMain')/fBLSXLX" label-ref="data('dataMain')/fBLSXLX"> 
        <xforms:label ref="col_0" id="default45"/>  
        <xforms:value ref="col_0" id="default46"/>  
        <xforms:itemset id="default47">
          <itemset-data xmlns="" id="default48">  
            <rows id="default49">  
              <row id="default50"> 
                <cell id="default51">工作日</cell>
              </row>  
              <row id="default63"> 
                <cell id="default64">自然日</cell>
              </row> 
            </rows> 
          </itemset-data>  
          <xforms:column ref="col_0" id="default65"/>
        </xforms:itemset>
      </xhtml:div>
    <xforms:select1 ref="data('dataMain')/fSFNWBJ" id="radio1">
   <xforms:item id="selectItem6" style="width:31px;">
    <xforms:label id="default33">是</xforms:label>
    <xforms:value id="default19">Y</xforms:value></xforms:item> 
   <xforms:item id="selectItem5" style="width:33px;">
    <xforms:label id="default41">否</xforms:label>
    <xforms:value id="default36">N</xforms:value></xforms:item> </xforms:select1>
    <xhtml:div ref="data('dataMain')/fZBCS" multi-select="false" org-kinds="dpt" show-type="list" extRef="data('dataMain')/fZBCS_DATA" dialogTitle="选择主办处室" component="/UI/system_X/components/orgSelectExt.xbl.xml#orgSelectExt" id="orgSelectExt1"><xhtml:table border="0" cellpadding="0" cellspacing="0" style="height:100%;width:100%;padding-right:0px;margin-right:0px;">
	<xhtml:tr>
		<xhtml:td>
			<xforms:input readonly="true" class="xui-input" style="height:100%;width:100%;"/>
		</xhtml:td>
		<xhtml:td style="width:60px">
			<xforms:trigger appearance="image-text" class="button-black" icon-class="icon-system-user-add" style="height:100%;width:100%">
				<xforms:label>选择</xforms:label>
			</xforms:trigger>
		</xhtml:td>
	</xhtml:tr>
</xhtml:table>
<xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="选择办理人" width="556px" height="364px" modal="true" url="/UI/system/components/orgSelectExt/dialog/orgDialog.w" reload-on-open="false" dialogUpdate="true"/> 
	<!-- 替换模板路径  原始url: /UI/system/service/process/dialogs/selectExecutorsDialog.w --></xhtml:div>
	<xhtml:div ref="data('dataMain')/fHBCS" multi-select="true" org-kinds="dpt" show-type="list" extRef="data('dataMain')/fHBCS_DATA" dialogTitle="选择会办处室" component="/UI/system_X/components/orgSelectExt.xbl.xml#orgSelectExt" id="orgSelectExt2"><xhtml:table border="0" cellpadding="0" cellspacing="0" style="height:100%;width:100%;padding-right:0px;margin-right:0px;">
	<xhtml:tr>
		<xhtml:td>
			<xforms:input readonly="true" class="xui-input" style="height:100%;width:100%;"/>
		</xhtml:td>
		<xhtml:td style="width:60px">
			<xforms:trigger appearance="image-text" class="button-black" icon-class="icon-system-user-add" style="height:100%;width:100%">
				<xforms:label>选择</xforms:label>
			</xforms:trigger>
		</xhtml:td>
	</xhtml:tr>
</xhtml:table>
<xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog" title="选择办理人" width="556px" height="364px" modal="true" url="/UI/system/components/orgSelectExt/dialog/orgDialog.w" reload-on-open="false" dialogUpdate="true"/> 
	<!-- 替换模板路径  原始url: /UI/system/service/process/dialogs/selectExecutorsDialog.w --></xhtml:div></xui:view>  
    <xhtml:div appearance="tree" component="/UI/system/components/grid.xbl.xml#grid"
      data="dataMain" id="grdMain" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      onShowNodeImg="mainActivity.grdMainShowNodeImg"> 
      <column id="gridColumn1" ref="fSXMC" type="tree" readonly="true"/> 
    </xhtml:div>  
    <xui:layout style="height:100%;width:100%"> 
      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
        id="borderLayout2" style="width:100%; height: 100%;;"> 
        <top id="borderLayout-top2" size="35px"> 
          <xhtml:div collapsed-label="隐藏过滤" component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
            expandable="false" expanded="true" expanded-label="展开过滤" expanded-position="6"
            expanded-width="75" id="buttonBar1" separator="false" separator-size="10"
            style="width:488px;height:34px;"> 
            <xui:place control="menuButton1" id="controlPlace7"/>  
            <xui:place control="btnAppendSX" id="controlPlace5" style="width:95px;"/>  
            <xui:place control="saveTrigger" id="saveTriggerPlace"/>  
            <xui:place control="deleteTrigger" id="controlPlace6"/>  
            <xui:place control="refreshTrigger" id="refreshTriggerPlace"/> 
          </xhtml:div> 
        </top>  
        <center id="borderLayout-center2"> 
          <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter"
            fix-size="240" has-arrow-button="true" has-drag-bar="true" id="HSplitter1"
            mode="horz" style="width:100%;height:100%;"> 
            <xhtml:div id="div1" region="left"> 
              <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                id="borderLayout1" style="width:100%; height: 100%;;"> 
                <top size="30px" id="borderLayout-top1"> 
                  <xui:place control="treeLocate1" id="controlPlace14" style="width:80%;"/> 
                </top>  
                <center id="borderLayout-center1"> 
                  <place control="grdMain" id="controlPlace1" style="width:100%;height:100%;"/> 
                </center> 
              </xhtml:div> 
            </xhtml:div>  
            <xhtml:div id="div3" region="right"> 
              <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1"
                class="xui-tabPanel" style="height:100%;width:100%;"> 
                <xui:tab id="tabPage1"> 
                  <xui:label id="xuiLabel1"><![CDATA[事项信息]]></xui:label>  
                  <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                    id="borderLayout6" style="width:100%; height: 100%;;"> 
                    <top size="260px" id="borderLayout-top6"> 
                      <place control="vDetail" id="controlPlace2" style="width:100%;height:100%;"/> 
                    </top>  
                    <center id="borderLayout-center6"> 
                      <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
                        id="borderLayout7" style="width:100%; height: 100%;;"> 
                        <top size="38px" id="borderLayout-top7"> 
                          <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                            id="buttonBar4" style="width:100%;padding-left:10px;height:80%;" separator-size="10"> 
                            <xui:place control="trigger3" id="controlPlace11"></xui:place><xui:place control="trigger13" id="controlPlace29"/> 
                          </xhtml:div> 
                        </top>  
                        <center id="borderLayout-center7" style="padding-left:10px;"> 
                          <xui:place control="grid3" id="controlPlace30" style="height:100%;width:100%;"/> 
                        </center> 
                      </xhtml:div> 
                    </center> 
                  </xhtml:div> 
                </xui:tab>  
                <xui:tab id="tabPage2"> 
                  <xui:label id="xuiLabel2"><![CDATA[业务对照]]></xui:label>  
                  <xui:place control="view1" id="controlPlace17" style="height:100%;width:100%;"/> 
                </xui:tab> 
              </xhtml:div> 
            </xhtml:div> 
          </xhtml:div> 
        </center> 
      </xhtml:div>  
      <xui:place control="windowDialog1" id="controlPlace16" style="position:absolute;left:214px;top:236px;"/> 
    </xui:layout>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnAppendSX"
      operation-owner="dataMain" appearance="image-minimal" icon-class="icon-system-plus"
      ref="data('control')/canAddSX"> 
      <xforms:label id="default21"><![CDATA[新建事项]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate"> 
        <xforms:script id="xformsScript1"><![CDATA[mainActivity.btnAppendSXClick(event)]]></xforms:script> 
      </xforms:action> 
    </xforms:trigger>  
    <xhtml:div class="ui-light" component="/UI/system/components/quickLocate.xbl.xml#treeLocate"
      id="treeLocate1" tree="grdMain" data="dataMain" relations="fSXMC" path-relation="fPath"/>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger3" appearance="image-text" class="button-blue" icon-class="icon-system-plus-circle">
   <xforms:label id="default18"><![CDATA[新建]]></xforms:label>
  <xforms:action id="action3" ev:event="DOMActivate"><xforms:script id="xformsScript3"><![CDATA[mainActivity.trigger3Click(event)]]></xforms:script></xforms:action></xforms:trigger><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger13"
      operation-owner="dataSXCL" appearance="image-minimal" operation="delete"> 
      <xforms:label id="default80"><![CDATA[]]></xforms:label> 
    </xforms:trigger>  
    <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
      header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
      smart-render="20" id="grid3" data="dataSXCL" edit-mode="true"> 
      <xui:column id="gridColumn6" ref="fSPCLBH" label="审批材料编号" type="ed" width="128px"/>  
      <xui:column id="gridColumn7" ref="fSPCLMC" label="审批材料名称" type="ed" width="187px"/>  
      <xui:column id="gridColumn8" ref="fSFXYSW" label="需要实物" type="ch" width="64px"
        align="left" checked-value="Y" unchecked-value="N"/>  
      <xui:column id="gridColumn9" ref="fCLFS" label="份数" type="ed" width="48px"/>  
      <xui:column id="gridColumn10" ref="fCLSM" label="材料说明" type="textarea" width="148px"/>  
      <xui:column id="gridColumn11" ref="fYXBS" label="标识" type="ch" width="65px"
        checked-value="Y" unchecked-value="N"/> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
      title="" width="500px" height="400px" modal="true" id="windowDialog1" url="/UI/common/commdialogs/funcActivityTree/selectMultiFunctions.w"
      onReceive="mainActivity.windowDialog1Receive"/>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout2"> 
        <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="40%"
          mode="horz" id="HSplitter2" style="position:absolute;height:100%;width:100%;left:0px;top:0px;"
          class="xui-splitter" has-drag-bar="true" has-arrow-button="false"> 
          <xhtml:div region="left" id="div2"> 
            <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
              id="borderLayout3" style="width:100%; height: 100%;;"> 
              <top size="38px" id="borderLayout-top3"> 
                <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                  id="buttonBar2" separator-size="10" style="width:261px;padding-left:10px;padding-top:3px;"> 
                  <xui:place control="addBiz" id="controlPlace19" style="width:83px;"/>  
                  <xui:place control="trigger2" id="controlPlace20"/> 
                </xhtml:div> 
              </top>  
              <center id="borderLayout-center3" style="padding-left:10px;"> 
                <xui:place control="grid1" id="controlPlace22" style="height:100%;width:100%;"/> 
              </center> 
            </xhtml:div> 
          </xhtml:div>  
          <xhtml:div region="right" id="div4"> 
            <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
              id="borderLayout4" style="width:100%; height: 100%;;"> 
              <top size="38px" id="borderLayout-top4"> 
                <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
                  id="buttonBar3" separator-size="10" style="padding-left:10px;padding-top:3px;"> 
                  <xui:place control="trigger7" id="controlPlace33" style="width:100px;"/>  
                  <xui:place control="trigger4" id="controlPlace21" style="width:100px;"></xui:place><xui:place control="trigger1" id="controlPlace15"/> 
                </xhtml:div> 
              </top>  
              <center id="borderLayout-center4" style="padding-left:10px;"> 
                <xui:place control="grid2" id="controlPlace31" style="height:100%;width:100%;"/> 
              </center> 
            </xhtml:div> 
          </xhtml:div> 
        </xhtml:div>  
        <xui:place control="windowDialog2" id="controlPlace25" style="position:absolute;left:0px;top:165px;"/>
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="addBiz"
        appearance="image-text" class="button-blue" icon-class="icon-system-plus-circle"> 
        <xforms:label id="default14"><![CDATA[添加业务]]></xforms:label>  
        <xforms:action id="action4" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript4"><![CDATA[mainActivity.addBizClick(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
        operation-owner="dataYW" operation="delete" appearance="image-text"> 
        <xforms:label id="default16"><![CDATA[删除]]></xforms:label> 
      </xforms:trigger>  
      <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
        header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
        smart-render="20" id="grid1" data="dataYW" space-column="true"> 
        <xui:column id="gridColumn2" ref="No" label="No." type="ed" width="30px" show-index="true"></xui:column><xui:column id="gridColumn15" ref="fProcessName" label="流程名称" type="ed" width="200px"/>  
        <xui:column id="gridColumn16" ref="fStartActivityName" label="启动环节名称" type="ed"
          width="130px"/> 
      <xui:column id="gridColumn4" ref="fBrowUrl" label="浏览地址" type="ed" width="100px"></xui:column></xhtml:div>  
      <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
        header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
        smart-render="20" id="grid2" data="dataCLDZ" edit-mode="true"> 
        <xui:column id="gridColumn3" ref="No" label="No." type="ed" width="30px" show-index="true"></xui:column><xui:column id="gridColumn17" ref="fSPCLBH" label="审批材料编号" type="ed" width="150px" /><xui:column id="gridColumn18" ref="fSPCLMC" label="审批材料名称" type="ed" width="230px" />  
          
        <xui:column id="gridColumn22" ref="fProcess" label="业务流程URL" type="ed" width="0px"/>
        <xui:column id="gridColumn19" ref="fYWCLBH" label="业务材料编号" type="inputbtn"
          width="130px" onButtonClick="mainActivity.grid2_fYWCLBHButtonClick"/>  
        <xui:column id="gridColumn23" ref="fSPSXBH" label="审批事项编号" type="ed" width="0px"/>  
        <xui:column id="gridColumn24" ref="fSXLCID" label="事项流程对照" type="ed" width="0px"/>
      <xui:column id="gridColumn5" ref="fYWCLMC" label="业务材料名称" type="ed" width="100px"></xui:column></xhtml:div>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger4" appearance="image-text" class="button-blue" icon-class="icon-system-edit-alt">
   <xforms:label id="default66"><![CDATA[变更重置]]></xforms:label>
  <xforms:action id="action8" ev:event="DOMActivate"><xforms:script id="xformsScript8"><![CDATA[mainActivity.trigger4Click(event)]]></xforms:script></xforms:action></xforms:trigger><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
        operation-owner="dataCLDZ" operation="refresh" appearance="image-text"> 
        <xforms:label id="default20"><![CDATA[刷新]]></xforms:label>
      </xforms:trigger>  
      <xhtml:div component="/UI/system/components/windowDialog.xbl.xml#windowDialog"
        title="" width="600px" height="400px" modal="true" id="windowDialog2" url="/UI/common/spsxgl/process/spsxgl/bizID.w"
        reload-on-open="true">
        
      <result concept="dataCLDZ" operation="modify" origin="main" id="default34">
   <mapping from="fMaterialId" to="fYWCLBH" id="default35"></mapping>
   <mapping from="fMaterialName" to="fYWCLMC" id="default44"></mapping></result></xhtml:div>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger7"
        appearance="image-text" class="button-blue" icon-class="icon-system-refresh"> 
        <xforms:label id="default40"><![CDATA[重置全部]]></xforms:label>  
        <xforms:action id="action7" ev:event="DOMActivate">
          <xforms:script id="xformsScript7"><![CDATA[mainActivity.trigger7Click(event)]]></xforms:script>
        </xforms:action>
      </xforms:trigger> 
    </xui:view> 
  </xui:view>  
  <xui:resource id="resource1">
  	<xhtml:script src="/UI/base/core/template/butoneExtend.js"/> 
    <xhtml:script id="htmlScript1" src="mainActivity.js"/> 
  </xui:resource> 
</xui:window>
