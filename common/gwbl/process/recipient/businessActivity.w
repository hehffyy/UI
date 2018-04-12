<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1" style="height:auto;left:343px;top:17px;">
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      data-type="json" auto-load="true" id="dataMain" concept="B_Recipient" limit="10">
      <reader id="default1" action="/common/gwbl/logic/action/queryB_RecipientNetAction"/>  
      <writer id="default2" action="/common/gwbl/logic/action/saveB_RecipientAction"/>  
      <creator id="default3" action="/common/gwbl/logic/action/createB_RecipientAction"/>  
      <rule id="dataBizRule1" concept="B_Recipient" readonly="true()"></rule></data>  
    </xforms:model><xui:view id="rootView" auto-load="true"> 
    <xui:layout style="width:100%;height:99%;" id="rootLayout">
      <xui:place control="view1" id="controlPlace1" style="height:99%;width:99%;"/>
    </xui:layout>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xui:place control="toolbars1" id="controlPlace2" style="position:absolute;top:5px;width:100%;left:3px;height:40px;"/>  
        <xhtml:div component="/UI/system/components/tabs.xbl.xml#tabs" id="tabPanel1"
          class="xui-tabPanel" style="position:absolute;top:54px;height:90%;width:100%;left:3px;"> 
          <xui:tab id="tabPage5"> 
            <xui:label id="xuiLabel5"><![CDATA[网办受理]]></xui:label>  
            <xhtml:div component="/UI/system/components/borderLayout.xbl.xml#borderLayout"
              id="borderLayout3" style="width:100%; height: 100%;;"> 
              <top size="30px" id="borderLayout-top3">
                <xui:place control="toolbars3" id="controlPlace40"/>
              </top>  
              <center id="borderLayout-center3">
                <xui:place control="grid2" id="controlPlace39" style="height:100%;width:100%;"/>
              </center>
            </xhtml:div>
          </xui:tab> 
          <xui:tab id="tabDetail"> 
            <xui:label id="xuiLabel4">内容详细</xui:label>  
            <xhtml:div class="cell-layout" component="/UI/system/components/cellLayout.xbl.xml#cellLayout"
              id="cellLayout1" style="height:98%;width:98%;"> 
              <layout-content id="default4"><![CDATA[
  <table cellspacing="0" cellpadding="0" rowHeight="19" columnWidth="80" style="border-collapse:collapse;table-layout:fixed;width:1px;">
     <tr><td ></td><td  style="width: 9px;"></td><td  style="width: 69px;"></td><td  style="width: 69px;"></td><td  style="width: 41px;"></td><td  style="width: 69px;"></td><td  style="width: 69px;"></td><td  style="width: 69px;"></td><td  style="width: 126px;"></td><td  style="width: 69px;"></td><td  style="width: 49px;"></td><td  style="width: 69px;"></td><td  style="width: 69px;"></td><td  style="width: 69px;"></td><td  style="width: 55px;"></td><td  style="width: 69px;"></td><td  style="width: 66px;"></td><td  style="width: 9px;"></td></tr>
     <tr><td  style="height: 49px;"></td><td  style="height: 49px;"></td><td  colSpan="15" style="height: 49px;" componentId="toolbars4"></td><td  style="height: 49px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="15" rowSpan="2" style="text-align: center; font-family: 微软雅黑; font-size: 27px; font-weight: bold; height: 66px;">受理表信息</td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="3" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 2px 1px 1px 2px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;">收件编号</td><td  colSpan="4" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input1"></td><td  colSpan="2" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;">查询密码</td><td  colSpan="6" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 2px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input2"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="3" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 1px 1px 2px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;">业务名称</td><td  colSpan="12" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input3"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="3" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 1px 1px 2px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;">业务类型</td><td  colSpan="4" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input4"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">业务子类型</td><td  colSpan="6" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input5"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="3" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 1px 1px 2px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;">行 政 区</td><td  colSpan="4" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input6"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">镇  街</td><td  colSpan="6" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input7"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="3" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 1px 1px 2px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;">土地坐落</td><td  colSpan="12" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input8"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  rowSpan="4" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 1px 1px 2px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 132px;">申请
单位</td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">权 利 人</td><td  colSpan="8" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input9"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">单位性质</td><td  colSpan="2" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input15"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">证件种类</td><td  colSpan="4" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input10"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">证件编号</td><td  colSpan="6" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input11"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">法人代表</td><td  colSpan="4" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input12"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">联系人</td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input13"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">电话或邮件</td><td  colSpan="2" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input16"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">通讯地址</td><td  colSpan="8" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input14"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">邮    编</td><td  colSpan="2" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input17"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  rowSpan="2" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 1px 1px 2px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 66px;">代理
人</td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">姓    名</td><td  colSpan="4" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input22"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">证件种类</td><td  colSpan="6" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input18"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">联系电话</td><td  colSpan="4" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input23"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">证件编号</td><td  colSpan="6" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input19"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="3" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 1px 1px 2px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;">收件人签名</td><td  colSpan="4" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="sign1"></td><td  colSpan="2" style="text-align: center; border: 1px solid rgb(0, 0, 0); font-family: 微软雅黑; font-size: 15px; height: 33px;">受理时间</td><td  colSpan="6" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 33px;" componentId="input20"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  colSpan="3" rowSpan="3" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 1px 1px 2px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 99px;">备注</td><td  colSpan="12" rowSpan="3" style="text-align: center; border-color: rgb(0, 0, 0); border-width: 1px 2px 1px 1px; border-style: solid; font-family: 微软雅黑; font-size: 15px; height: 99px;" componentId="textarea1"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 33px;"></td><td  style="height: 33px;"></td><td  style="height: 33px;"></td></tr>
     <tr><td  style="height: 1px;"></td><td ></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td  style="border-bottom-color: rgb(0, 0, 0); border-bottom-width: 2px; border-bottom-style: solid; font-size: 17px;"></td><td ></td></tr>
  </table>
]]></layout-content>  
              <xui:place control="input1" id="controlPlace9"/>  
              <xui:place control="input2" id="controlPlace10"/>  
              <xui:place control="input3" id="controlPlace12"/>  
              <xui:place control="input4" id="controlPlace13"/>  
              <xui:place control="input5" id="controlPlace14"/>  
              <xui:place control="input6" id="controlPlace15"/>  
              <xui:place control="input7" id="controlPlace16"/>  
              <xui:place control="input8" id="controlPlace17"/>  
              <xui:place control="input9" id="controlPlace18"/>  
              <xui:place control="input10" id="controlPlace19"/>  
              <xui:place control="input11" id="controlPlace20"/>  
              <xui:place control="input12" id="controlPlace23"/>  
              <xui:place control="input13" id="controlPlace24"/>  
              <xui:place control="input14" id="controlPlace25"/>  
              <xui:place control="input15" id="controlPlace26"/>  
              <xui:place control="input16" id="controlPlace27"/>  
              <xui:place control="input17" id="controlPlace28"/>  
              <xui:place control="input18" id="controlPlace29"/>  
              <xui:place control="input19" id="controlPlace31"/>  
              <xui:place control="input20" id="controlPlace32"/>  
              <xui:place control="sign1" id="controlPlace33" style="height:100%;width:100%;"/>  
              <xui:place control="input22" id="controlPlace34"/>  
              <xui:place control="input23" id="controlPlace35"/>  
              <xui:place control="textarea1" id="controlPlace36"/>
            <xui:place control="toolbars4" id="controlPlace42"></xui:place>
  <xui:place control="toolbars5" id="controlPlace43"></xui:place>
  <xui:place control="toolbars4" id="controlPlace4"></xui:place></xhtml:div> 
          </xui:tab>   
          </xhtml:div>
      </layout>  
      <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars1">
        <xui:bar component="/UI/system/components/bar.xbl.xml#navigatorBar" mode="IMG_TXT_LR"
          id="navigatorBar1" data="dataMain"> 
          <item name="separator" id="customBarItem2"/>  
          <item id="customBarItem4">
            <xhtml:div component="/UI/system/components/smartFilter.xbl.xml#smartFilter"
              id="smartFilter2" filter-data="dataMain" filter-relations="fBillNo,fBusinessName,fBusinessType,fBusinessSubType,fLandLocated"
              auto-refresh="true"/>
          </item>
          <item name="separator" id="customBarItem3"/>  
          <item id="customBarItem12">
            </item>
          <item name="filter-pro-item" id="customBarItem10"/>  
          <item id="customBarItem17">
            </item>  
          <item id="customBarItem18">
            </item>
        </xui:bar>
      </xhtml:div>  
      <xforms:input id="input1" class="xui-autofill" ref="data('dataMain')/fBillNo"/>  
      <xforms:input id="input2" class="xui-autofill" ref="data('dataMain')/fPassword"/>  
      <xforms:input id="input3" class="xui-autofill" ref="data('dataMain')/fBusinessName"/>  
      <xforms:input id="input4" class="xui-autofill" ref="data('dataMain')/fBusinessType"/>  
      <xforms:input id="input5" class="xui-autofill" ref="data('dataMain')/fBusinessSubType"/>  
      <xforms:input id="input6" class="xui-autofill" ref="data('dataMain')/fRegion"/>  
      <xforms:input id="input7" class="xui-autofill" ref="data('dataMain')/fTown"/>  
      <xforms:input id="input8" class="xui-autofill" ref="data('dataMain')/fLandLocated"/>  
      <xforms:input id="input9" class="xui-autofill" ref="data('dataMain')/fAppObligee"/>  
      <xforms:input id="input10" class="xui-autofill" ref="data('dataMain')/fAppCertificateType"/>  
      <xforms:input id="input11" class="xui-autofill" ref="data('dataMain')/fAppCertificateNo"/>  
      <xforms:input id="input12" class="xui-autofill" ref="data('dataMain')/fAppLegal"/>  
      <xforms:input id="input13" class="xui-autofill" ref="data('dataMain')/fAppLinkman"/>  
      <xforms:input id="input14" class="xui-autofill" ref="data('dataMain')/fAppCommunication"/>  
      <xforms:input id="input15" class="xui-autofill" ref="data('dataMain')/fAppNature"/>  
      <xforms:input id="input16" class="xui-autofill" ref="data('dataMain')/fAppTel"/>  
      <xforms:input id="input17" class="xui-autofill" ref="data('dataMain')/fAppZipCode"/>  
      <xforms:input id="input18" class="xui-autofill" ref="data('dataMain')/fAgentCertificateType"/>  
      <xforms:input id="input19" class="xui-autofill" ref="data('dataMain')/fAgentCertificateNo"/>  
      <xforms:input id="input20" class="xui-autofill" ref="data('dataMain')/fSignDate"/>  
      <xhtml:div component="/UI/system_X/components/sign.xbl.xml#sign" id="sign1"
        pro-data="dataMain" ref="data('dataMain')/fSigner"> 
        <xhtml:table border="0" cellpadding="0" cellspacing="0" style="height:100%;width:100%;"
          id="table1"> 
          <xhtml:tr id="tr1"> 
            <xhtml:td id="td1"> 
              <xforms:input readonly="true" class="xui-input" style="height:100%;width:100%;"
                id="input21"/>
            </xhtml:td>  
            <xhtml:td style="width:60px;" id="td2"> 
              <xforms:trigger appearance="image-text" class="button-blue" icon-class="icon-system-pencil"
                style="height:100%;width:100%" id="trigger1"> 
                <xforms:label id="default5">签名</xforms:label>
              </xforms:trigger> 
            </xhtml:td> 
          </xhtml:tr> 
        </xhtml:table>  
        <xhtml:div component="/UI/system/components/menu.xbl.xml#menu" menu-id="signMenu"
          appearance="context" open-mode="win" class="xui-container" style="width:0px;height:0px"
          id="div1"> 
          <xui:menuitem id="toVerify" label="验证" img="/UI/common/OPM/images/funRole.gif"
            dis-img="/UI/common/OPM/images/un_funRole.gif" disabled="false"/>  
          <xui:menuitem id="toClear" label="清除" img="/UI/common/OPM/images/dataRole.gif"
            dis-img="/UI/common/OPM/images/un_dataRole.gif" disabled="false"/>
        </xhtml:div> 
      </xhtml:div>  
      <xforms:input id="input22" class="xui-autofill" ref="data('dataMain')/fAgentName"/>  
      <xforms:input id="input23" class="xui-autofill" ref="data('dataMain')/fAgentTel"/>  
      <xforms:textarea ref="data('dataMain')/fRemark" id="textarea1" class="xui-autofill"/>  
      <xhtml:div class="grid-compact" component="/UI/system/components/grid.xbl.xml#grid"
        header-row-height="36" row-height="36" show-header-menu="hide-column,save-layout,group-column,adjust-column"
        smart-render="20" id="grid2" data="dataMain" multi-selection="false" onRowDblClick="businessActivity.grid2RowDblClick">
        <xui:column id="gridColumn16" ref="fBillNo" label="收件编号" type="ed" width="100px"/>  
        <xui:column id="gridColumn17" ref="fBusinessType" label="业务类型" type="ed" width="100px"/>  
        <xui:column id="gridColumn18" ref="fBusinessSubType" label="业务子类型" type="ed"
          width="100px"/>  
        <xui:column id="gridColumn19" ref="fLandLocated" label="土地坐落" type="ed" width="100px"/>  
        <xui:column id="gridColumn20" ref="fSigner" label="收件人签名" type="ed" width="100px"/>  
        <xui:column id="gridColumn21" ref="fSignDate" label="受理时间" type="ed" width="100px"/>  
        <xui:column id="gridColumn22" ref="fSourceType" label="收件来源类型" type="ed" width="100px"/>  
        <xui:column id="gridColumn23" ref="fRecstatus" label="状态" type="ed" width="100px"/>
      </xhtml:div>  
      <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars3"> 
        <xui:bar component="/UI/system/components/bar.xbl.xml#navigatorBar" mode="IMG_TXT_LR"
          id="navigatorBar3" data="dataMain"> 
          <item id="customBarItem24"> 
            </item>  
          <item name="save-item" id="barItem17"/>  
          <item name="separator" id="customBarItem23"/>  
          <item name="refresh-item" id="barItem19"/>  
          <item id="customBarItem19"> 
            </item>  
          <item id="customBarItem21"> 
            <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger"
              id="trigger7" appearance="image-minimal" icon-class="icon-system-forward"
              style="width:89px;"> 
              <xforms:label id="default33"><![CDATA[收件]]></xforms:label>
            </xforms:trigger> 
          </item>  
          <item id="customBarItem11"><xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2" icon-class="icon-system-reply-all" appearance="image-minimal" style="width:88px;">
   <xforms:label id="default6"><![CDATA[不予受理]]></xforms:label></xforms:trigger></item><item name="separator" id="customBarItem22"/>  
          <item id="customBarItem20"> 
            </item> 
        </xui:bar> 
      </xhtml:div>
  <xhtml:div component="/UI/system/components/toolbars.xbl.xml#toolbars" id="toolbars4"><xui:bar component="/UI/system/components/bar.xbl.xml#navigatorBar" mode="IMG_TXT_LR" id="navigatorBar4" data="dataMain">
   <item name="save-item" id="barItem10"></item>
   <item name="refresh-item" id="barItem12"></item>
   <item name="separator" id="customBarItem8"></item>
   <item name="first-item" id="barItem13"></item>
   <item name="pre-item" id="barItem14"></item>
   <item name="next-item" id="barItem15"></item>
   <item name="last-item" id="barItem16"></item>
   <item name="separator" id="customBarItem9"></item>
   </xui:bar></xhtml:div></xui:view>
  </xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="htmlScript1" src="businessActivity.js"/>
  </xui:resource> 
</xui:window>
