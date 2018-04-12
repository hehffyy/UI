<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:240px;top:282px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="false" id="bizData_BJJL" concept="B_BJJLB" store-type="simple"
      auto-new="false" confirm-refresh="false" confirm-delete="false" onValueChanged="finishDialog.bizData_BJJLValueChanged"
      onRefreshCreateParam="finishDialog.bizData_BJJLRefreshCreateParam"> 
      <creator id="default5" action="/base/core/flowOperation/logic/action/createB_BJJLBAction"/>  
      <reader id="default6" action="/base/core/flowOperation/logic/action/queryBizRecBJJLAction"/>  
      <writer id="default7"/>  
      <rule id="dataBizRule1" relation="fZFHTHYY" required="boolean(eval('finishDialog.isAbort'))"
        alert="'请录入作废或退回原因'"/>  
      <calculate-relation relation="xtbjlx" id="calculate-relation2"/>  
      <rule id="dataBizRule2" relation="fBJJGMS" required="true()" alert="'请录入办结结果'"/>  
      <rule id="dataBizRule3" relation="fBJJGDM" required="true()" alert="'请选择办结类型'"/> 
    </data>  
    <xforms:action id="action4" ev:event="onload"> 
      <xforms:script id="xformsScript4"><![CDATA[finishDialog.model1Load(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="code,name,finishKind,desc,isAbort" src="" auto-load="false" id="dataFinishResult"
      store-type="simple" confirm-delete="false" confirm-refresh="false" onCustomRefresh="finishDialog.dataFinishResultCustomRefresh"/>
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="margin:0 auto;height:100%;position:relative;width:650px;" id="rootLayout"
      type="flow"> 
      <xui:place control="receiver1" id="controlPlace4" style="left:322px;top:231px;position:absolute;"/>  
      <xui:place control="rowBJLX" id="controlPlace6" style="height:40px;width:100%;display:none;"/>  
      <xui:place control="rowFZXX" id="controlPlace17" style="width:100%;height:108px;display:none;"/>  
      <xui:place control="rowBJJG" id="controlPlace10" style="width:100%;height:167px;"/>  
      <xui:place control="rowAbort" id="controlPlace14" style="width:100%;height:133px;"/>
      <xui:place control="rules" id="controlPlace5" style="width:637px;position:relative;height:60px;"/>  
      <xui:place control="view1" id="controlPlace1" style="padding-top:5px;width:637px;height:31px;"/></xui:layout>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="receiver1" onReceive="finishDialog.receiver1Receive"/>  
    <xui:view auto-load="true" id="rowBJLX" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout3"> 
        <xui:place control-label="gridSelect1" id="controlLabel1" style="position:absolute;top:13px;left:47px;"
          label="办结类型"/>  
        <xui:place control="gridSelect1" id="controlPlace8" style="position:absolute;top:9px;left:116px;width:215px;"/> 
      </layout>  
      <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
        dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
        ext-separator="," id="gridSelect1" ref="data('bizData_BJJL')/fBJJGDM" label-ref="data('bizData_BJJL')/fBJJGMC"
        ext-ref="data('bizData_BJJL')/xtbjlx"> 
        <xforms:label ref="name" id="default11"/>  
        <xforms:value ref="code" id="default12"/>  
        <xforms:itemset id="default13" data="dataFinishResult" independence="false"> 
          <xforms:column ref="code" visible="false" id="default3"/>  
          <xforms:column ref="name" id="default10"/>  
          <xforms:column ref="finishKind" visible="false" id="default14"/>
        </xforms:itemset>  
        <xforms:ext-value id="default24" ref="finishKind"/> 
      </xhtml:div> 
    </xui:view>  
    <xui:view auto-load="true" id="rowFZXX" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout7"> 
        <xui:place control-label="input2" id="controlLabel4" style="position:absolute;top:17px;left:336px;"
          label="证件/盖章名称"/>  
        <xui:place control="input2" id="controlPlace18" style="position:absolute;left:415px;top:13px;width:215px;"/>  
        <xui:place control-label="input3" id="controlLabel5" style="position:absolute;left:47px;top:17px;"
          label="证件编号"/>  
        <xui:place control="input3" id="controlPlace19" style="position:absolute;top:13px;left:116px;width:215px;"/>  
        <xui:place control-label="input4" id="controlLabel6" style="position:absolute;top:49px;left:345px;"
          label="证件有效期"/>  
        <xui:place control="input4" id="controlPlace20" style="position:absolute;left:415px;width:215px;top:45px;"/>  
        <xui:place control-label="input5" id="controlLabel7" style="position:absolute;top:49px;left:47px;"
          label="发证单位"/>  
        <xui:place control="input5" id="controlPlace21" style="position:absolute;left:116px;width:215px;top:45px;"/>  
        <xui:place control-label="input6" id="controlLabel8" style="position:absolute;top:81px;left:47px;"
          label="收费金额"/>  
        <xui:place control="input6" id="controlPlace22" style="position:absolute;left:116px;top:77px;width:215px;"/>  
        <xui:place control-label="input7" id="controlLabel9" style="position:absolute;top:81px;left:345px;"
          label="金额单位"/>  
        <xui:place control="input7" id="controlPlace23" style="position:absolute;left:415px;top:77px;width:215px;"/> 
      </layout>  
      <xforms:input id="input2" ref="data('bizData_BJJL')/fZJHGZMC"/>  
      <xforms:input id="input3" ref="data('bizData_BJJL')/fZJBH"/>  
      <xforms:input id="input4" format="yyyy-MM-dd" ref="data('bizData_BJJL')/fZJYXQX"/>  
      <xforms:input id="input5" ref="data('bizData_BJJL')/fFZHGZDW"/>  
      <xforms:input id="input6" ref="data('bizData_BJJL')/fSFJE" format="0.00"/>  
      <xforms:input id="input7" ref="data('bizData_BJJL')/fJEDWDM" readonly="true"/> 
    </xui:view>  
    <xui:view auto-load="true" id="rowBJJG" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout4"> 
        <xui:place control-label="textarea1" id="controlLabel2" style="position:absolute;top:29px;left:46px;"
          label="办结结果"/>  
        <xui:place control="textarea1" id="controlPlace13" style="position:absolute;top:17px;height:140px;left:116px;width:515px;"/> 
      </layout>  
      <xforms:textarea ref="data('bizData_BJJL')/fBJJGMS" id="textarea1"/> 
    </xui:view>  
    <xui:view auto-load="true" id="rowAbort" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout5"> 
        <xui:place control-label="textarea2" id="controlLabel3" style="position:absolute;top:17px;left:49px;height:43px;width:58px;"
          label="作废或退回原因"/>  
        <xui:place control="textarea2" id="controlPlace15" style="position:absolute;top:17px;height:105px;left:116px;width:515px;"/> 
      </layout>  
      <xforms:textarea ref="data('bizData_BJJL')/fZFHTHYY" id="textarea2"/> 
    </xui:view>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout1"> 
        <xui:place control="cancelBtn" id="controlPlace3" style="float:right"/>  
        <xui:place control="sureBtn" id="controlPlace2" style="float:right;margin-right: 10px;"/> 
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn"
        appearance="image-text" class="button-blue"> 
        <xforms:label id="default1">确定</xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript1">finishDialog.sureBtnClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn"
        appearance="image-text"> 
        <xforms:label id="default2">取消</xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript2">finishDialog.cancelBtnClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger> 
    </xui:view> 
  <xui:view auto-load="true" id="rules" class="xui-container">
   <layout type="flow" style="position:relative;" id="layout2"></layout></xui:view></xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script src="finishDialog.js"/>  
    <xhtml:script src="/UI/system/components/process/process.js"/>  
    <xhtml:script src="/UI/base/core/template/butoneExtend.js"/> 
  </xui:resource> 
</xui:window>
