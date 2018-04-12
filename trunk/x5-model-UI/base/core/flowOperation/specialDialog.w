<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:522px;top:194px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_AJGQJL" concept="B_AJGQJLB" store-type="simple"
      auto-new="false" limit="1" onRefreshCreateParam="specialDialog.bizData_AJGQJLRefreshCreateParam"> 
      <creator id="default4" action="/base/core/flowOperation/logic/action/createB_AJGQJLBAction"/>  
      <reader id="default8" action="/base/core/flowOperation/logic/action/queryBizRecSuspendingGQJLAction"/>  
      <writer id="default9"/>  
      <rule id="dataBizRule3" relation="fGQYY" required="true()" alert="'请录入启动理由'"/> 
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="bizData_TBCX" concept="B_TBCX" store-type="simple"
      auto-new="false" limit="1"> 
      <creator id="default5" action="/base/core/flowOperation/logic/action/createB_TBCXAction"/>  
      <reader id="default6" action="/base/core/flowOperation/logic/action/queryB_TBCXAction"/>  
      <writer id="default7"/>  
      <rule id="dataBizRule1" relation="fTBCXZL" required="true()" alert="'请录入特别程序种类'"/>  
      <rule id="dataBizRule2" relation="fTBCXPZR" required="true()" alert="'请录入批准人'"/>  
      <rule id="dataBizRule5" relation="fTBCXSX" required="true()" alert="'请录入申请天数'"/>  
      <master id="master1" data="bizData_AJGQJL" relation="fAJGQJL"/>  
      <rule id="dataBizRule4" relation="fSQNR" required="true()" alert="'请录入申请内容'"/>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="dictTBCXZL" concept="B_DICT_TBCXZL" relations="fTBCXZL,fTBCXMC,fFLGDSX,fFLGDSXDW"
      limit="-1"> 
      <reader id="default3" action="/base/core/flowOperation/logic/action/queryB_DICT_TBCXZLAction"/>  
      <writer id="default10"/>  
      <creator id="default14"/> 
    </data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="margin:0 auto;height:100%;width:650px;" id="rootLayout"> 
      <xui:place control="view2" id="controlPlace5" style="width:100%;height:389px;"/>  
      <xui:place control="view1" id="controlPlace1" style="position:relative;height:31px;width:597px;"/>  
      <xui:place control="receiver1" id="controlPlace4" style="position:absolute;left:45px;top:295px;"/> 
    </xui:layout>  
    <xui:view auto-load="true" id="view2" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout2"> 
        <xhtml:label id="label1" class="xui-label" style="position:absolute;position:absolute;left:29px;top:84px;">批准人姓名</xhtml:label>  
        <xhtml:label id="label4" class="xui-label" style="position:absolute;position:absolute;position:absolute;left:29px;top:265px;">启动理由</xhtml:label>  
        <xui:place control="iptPZR" id="controlPlace6" style="position:absolute;left:113px;width:445px;top:82px;"/>  
        <xui:place control="textarea2" id="controlPlace10" style="position:absolute;left:113px;width:475px;top:265px;height:102px;"/>  
        <xhtml:label id="label2" class="xui-label" style="position:absolute;position:absolute;position:absolute;left:29px;top:30px;"><![CDATA[特别程序名称]]></xhtml:label>  
        <xui:place control="gridSelect1" id="controlPlace7" style="position:absolute;width:193px;left:113px;top:28px;"/>  
        <xhtml:label id="label6" class="xui-label" style="position:absolute;position:absolute;position:absolute;top:30px;left:340px;">申请天数</xhtml:label>  
        <xui:place control="input3" id="controlPlace14" style="position:absolute;top:28px;left:400px;width:193px;"/>  
        <xhtml:label id="label7" style="position:absolute;left:29px;top:137px;" class="xui-label">申请内容</xhtml:label>  
        <xui:place control="textarea1" id="controlPlace15" style="position:absolute;left:114px;top:137px;width:473px;height:100px;"/>  
        <xhtml:button class="xui-button" type="button" style="position:absolute;left:564px;top:84px;height:24px;width:24px;"
          id="btnSelectPSN" onclick="specialDialog.btnSelectPSNClick(event)"> 
          <xhtml:i class="icon icon-system-search"/> 
        </xhtml:button>  
        <xui:place control="orgDialog1" id="controlPlace11" style="position:absolute;left:599px;top:71px;"/>
      </layout>  
      <xforms:input id="iptPZR" ref="data('bizData_TBCX')/fTBCXPZR"/>  
      <xforms:textarea ref="data('bizData_AJGQJL')/fGQYY" id="textarea2"/>  
      <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" row-height="36"
        dropdown-class="xui-grid-hide-VLine" label-separator="," value-separator=","
        ext-separator="," id="gridSelect1" ref="data('bizData_TBCX')/fTBCXZL" label-ref="data('bizData_TBCX')/fTBCXMC"
        ext-ref="data('bizData_TBCX')/fTBCXSX"> 
        <xforms:label ref="fTBCXMC" id="default11"/>  
        <xforms:value ref="fTBCXZL" id="default12"/>  
        <xforms:itemset id="default13" data="dictTBCXZL" auto-load-data="true"> 
          <itemset-data xmlns="" id="default46">  
            <rows id="default47"/> 
          </itemset-data>  
          <xforms:column ref="fTBCXZL" id="default55"/>  
          <xforms:column ref="fTBCXMC" id="default56"/>  
          <xforms:column ref="fFLGDSX" visible="false" id="default57"/>  
          <xforms:column ref="fFLGDSXDW" visible="false" id="default58"/> 
        </xforms:itemset>  
        <xforms:ext-value id="default59" ref="fFLGDSX"/> 
      </xhtml:div>  
      <xforms:input id="input3" ref="data('bizData_TBCX')/fTBCXSX" input-regex="^[0-9]*[1-9][0-9]*$"/>  
      <xforms:textarea ref="data('bizData_TBCX')/fSQNR" id="textarea1"/>  
      <xhtml:div component="/UI/system/components/orgDialog.xbl.xml#orgDialog" title=""
        width="400px" height="300px" modal="true" root-filter="SA_OPOrg.sParent is null"
        id="orgDialog1" org-kinds="psm"/>
    </xui:view>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="flow" style="position:relative;" id="layout1"> 
        <xui:place control="cancelBtn" id="controlPlace3" style="float:right"/>  
        <xui:place control="sureBtn" id="controlPlace2" style="float:right;margin-right:10px"/> 
      </layout>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="sureBtn"
        appearance="image-text" class="button-blue"> 
        <xforms:label id="default1">确定</xforms:label>  
        <xforms:action id="action1" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript1">specialDialog.sureBtnClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger>  
      <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="cancelBtn"
        appearance="image-text"> 
        <xforms:label id="default2">取消</xforms:label>  
        <xforms:action id="action2" ev:event="DOMActivate"> 
          <xforms:script id="xformsScript2">specialDialog.cancelBtnClick(event)</xforms:script> 
        </xforms:action> 
      </xforms:trigger> 
    </xui:view>  
    <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver"
      id="receiver1" onReceive="specialDialog.receiver1Receive"/> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="/UI/system/components/process/process.js"/>  
    <xhtml:script id="htmlScript2" src="specialDialog.js"/> 
  </xui:resource> 
</xui:window>
