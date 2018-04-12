<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="left:367px;height:auto;top:70px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="idiomsData" concept="B_Idioms" limit="-1"
      direct-delete="true" onAfterNew="signDialog.idiomsDataAfterNew" confirm-refresh="false"> 
      <reader id="default1" action="/base/system/logic/action/queryB_IdiomsAction"/>  
      <writer id="default2" action="/base/system/logic/action/saveB_IdiomsAction"/>  
      <creator id="default3" action="/base/system/logic/action/createB_IdiomsAction"/>  
      <calculate-relation relation="xh" id="calculate-relation1"/>  
      <rule id="dataBizRule1" relation="fContent" required="true()"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="info,attachment,isIdiom,isAttachment" src="" auto-load="true" id="data"
      store-type="simple" auto-new="false" onValueChanged="signDialog.dataValueChanged"> 
      <rows xmlns="" id="default21">  
        <row id="default22"> 
          <cell id="default23"/>  
          <cell id="default24"/>  
          <cell id="default25"/>  
          <cell id="default26"/> 
        </row> 
      </rows> 
    </data>  
    <xforms:action id="action8" ev:event="onload"> 
      <xforms:script id="xformsScript8"><![CDATA[signDialog.model1Load(event)]]></xforms:script> 
    </xforms:action> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:400px;width:650px;" id="rootLayout"> 
      <xhtml:div component="/UI/system/components/splitter.xbl.xml#splitter" fix-size="35px"
        mode="vert" id="VSplitter1" class="xui-splitter" status="normal" has-drag-bar="false"
        resizable="false" style="width:100%;height:100%;;" has-arrow-button="false"
        fix-type="top"> 
        <xhtml:div region="top" id="div1"> 
          <xui:place control="topTool" id="controlPlace2" style="height:100%;width:100%;"/> 
        </xhtml:div>  
        <xhtml:div region="bottom" id="div2"> 
          <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
            id="borderLayout1" style="width:100%; height: 100%;;"> 
            <center id="borderLayout-center1"> 
              <xui:place control="idioms" id="controlPlace1" style="width:100%;position:relative;display:none;height:130px;"/>  
              <xui:place control="signInfo" id="controlPlace12" style="width:100%;position:relative;"/>  
              <xui:place control="attachment" id="controlPlace13" style="width:100%;height:auto;position:relative;"/> 
            </center>  
            <bottom size="45px" id="borderLayout-bottom1"> 
              <xui:place control="bottomTool" id="controlPlace6" style="height:100%;width:100%;position:relative;"/> 
            </bottom> 
          </xhtml:div> 
        </xhtml:div> 
      </xhtml:div>  
      <xui:place control="windowReceiver" id="controlPlace11" style="position:absolute;top:146px;left:257px;"/> 
    </xui:layout>  
    <xui:view auto-load="true" id="topTool" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar1" style="position:absolute;left:5px;"> 
          <xui:place control="trg_new" id="controlPlace3"/>  
          <xui:place control="trg_save" id="controlPlace4"/>  
          <xui:place control="trg_del" id="controlPlace5"/> 
        </xhtml:div>  
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar3" style="float:right;padding-right:10px;"> 
          <xui:place control="smartFilter1" id="controlPlace9" style="width:150px;"/>  
          <xui:place control="trigger1" id="controlPlace10"/> 
        </xhtml:div> 
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_new"
        operation-owner="idiomsData" operation="new" appearance="image-text" class="button-blue"> 
        <xforms:label id="default4"><![CDATA[新增]]></xforms:label> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_save"
        operation-owner="idiomsData" operation="save" appearance="image-text" class="button-blue"> 
        <xforms:label id="default5"><![CDATA[保存]]></xforms:label> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_del"
        operation-owner="idiomsData" operation="delete" appearance="image-text" class="button-orange"> 
        <xforms:label id="default6"><![CDATA[删除]]></xforms:label> 
      </xforms:trigger>  
      <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
        id="smartFilter1" filter-data="idiomsData" filter-relations="fTitle,fContent"
        auto-refresh="true"/>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
        operation-owner="idiomsData" operation="refresh" appearance="image-text" icon-class="icon-system-search"
        class="button-green"> 
        <xforms:label id="default8"><![CDATA[查询]]></xforms:label> 
      </xforms:trigger> 
    </xui:view>  
    <xui:view auto-load="true" id="bottomTool" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout2"> 
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar2" style="float:right;padding-right:10px;padding-top:5px;"> 
          <xui:place control="trg_ensure" id="controlPlace7"/>  
          <xui:place control="trg_cancel" id="controlPlace8"/> 
        </xhtml:div>  
        <xhtml:div component="/UI/system/components/buttonBar.xbl.xml#buttonBar"
          id="buttonBar4" style="padding-left:10px;padding-top:5px;"> 
          <xui:place control="trg_clear" id="controlPlace14"/>  
          <xui:place control="isIdiom" id="controlPlace19" style="display:none"/> 
        </xhtml:div> 
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_ensure"
        appearance="image-text" class="button-blue"> 
        <xforms:label id="default9"><![CDATA[确定]]></xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript1"><![CDATA[signDialog.trg_ensureClick(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_cancel"
        appearance="image-text" class="button-blue"> 
        <xforms:label id="default7"><![CDATA[取消]]></xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript2"><![CDATA[signDialog.trg_cancelClick(event)]]></xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trg_clear"
        class="button-green"> 
        <xforms:label id="default10">清空</xforms:label>  
        <xforms:action id="action3" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript3">signDialog.trg_clearClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:select id="isIdiom" ref="data('data')/isIdiom"> 
        <xforms:item id="selectItem3"> 
          <xforms:label id="default15"><![CDATA[惯用语]]></xforms:label>  
          <xforms:value id="default16"><![CDATA[1]]></xforms:value> 
        </xforms:item> 
      </xforms:select> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="windowReceiver" onReceive="signDialog.windowReceiverReceive"/>  
    <xui:view auto-load="true" id="idioms" class="xui-container"> 
      <layout style="position:relative;" id="layout3"> 
        <xui:place control="grid1" id="controlPlace15" style="height:100%;width:100%;position:absolute;"/> 
      </layout>  
      <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
        header-row-height="30" row-height="30" show-header-menu="hide-column,save-layout,group-column,adjust-column"
        smart-render="-1" id="grid1" data="idiomsData" onRowDblClick="signDialog.grid1RowDblClick"
        edit-mode="true"> 
        <xui:column id="gridColumn2" ref="xh" label="选择" type="html" width="40px"
          align="center" show-index="false" onRender="signDialog.grid1_xhRender"/>  
        <xui:column id="gridColumn1" ref="fContent" label="常用语" type="textarea"/> 
      </xhtml:div> 
    </xui:view>  
    <xui:view auto-load="true" id="signInfo" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout4"> 
        <xui:place control="textarea2" id="controlPlace17" style="height:100%;width:100%;padding:10px;"/> 
      </layout>  
      <xforms:textarea ref="data('data')/info" id="textarea2"/> 
    </xui:view>  
    <xui:view auto-load="true" id="attachment" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout5"> 
        <xui:place control="attachmentEditor" id="controlPlace18" style="width:100%;height:auto;"/> 
      </layout>  
      <xhtml:div component="/UI/system/components/attachmentEditor2.xbl.xml#attachmentEditor2"
        display-buttons="upload:true;download:true;delete:true;template:false;history:false;edit:false;"
        limit="-1" runtime="html4" id="attachmentEditor" class="xui-attachmentEditor2" useNTKO="true"
        ref="data('data')/attachment" autoCreateVersion="true" access="duud" onUploadClick="signDialog.attachmentEditorUploadClick"/> 
    </xui:view> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="signDialog.js"/> 
  </xui:resource> 
</xui:window>
