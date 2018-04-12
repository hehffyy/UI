<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="model1" style="top:112px;left:461px;"> 
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      auto-load="false" id="dPerson" concept="SA_OPPerson" store-type="simple" confirm-refresh="false"> 
      <creator id="default1" action="/SA/OPM/logic/action/createOPPersonAction"/>  
      <reader id="default2" action="/SA/OPM/logic/action/queryOPPersonAction"/>  
      <writer id="default3" action="/SA/OPM/logic/action/saveOPPersonAction"/>  
      <rule id="dataBizRule2" relation="sName" required="true()" alert="'名称不能为空！'"/>  
      <rule id="dataBizRule3" relation="sCode" required="true()" alert="'编码不能为空！'"/>
  <rule id="dataBizRule4" relation="sPasswordModifyTime" readonly="true()"></rule>
    </data>  
    <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion"
      auto-load="false" id="dMainOrg" concept="SA_OPOrg" store-type="simple"
      confirm-refresh="false"> 
      <reader id="default4" action="/SA/OPM/logic/action/queryOPOrgAction"/>  
      <rule id="dataBizRule1" relation="sFName" readonly="true()"/> 
    </data> 
  <xforms:action id="action3" ev:event="xforms-model-construct"><xforms:script id="xformsScript3"><![CDATA[personDetail.model1ModelConstruct(event)]]></xforms:script></xforms:action>
  <data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="name,code" src="" auto-load="false" id="personLevel" store-type="simple"></data></xforms:model>  
  <xui:view id="rootView"> 
    <xforms:input id="inputMainOrgFName" ref="data('dMainOrg')/sFName"/>  
    <xforms:input id="inputName" ref="data('dPerson')/sName"/>  
    <xforms:input id="inputCode" ref="data('dPerson')/sCode"/>  
    <xforms:input id="inputLoginName" ref="data('dPerson')/sLoginName"/>  
    <xforms:input id="inputCardKind" ref="data('dPerson')/sCardKind"/>  
    <xforms:input id="inputCardNO" ref="data('dPerson')/sCardNO"/>  
    <xforms:input id="inputDegree" ref="data('dPerson')/sDegree"/>  
    <xforms:trigger id="btnOK" class="button-green" appearance="image-text"> 
      <xforms:label id="xuiLabel1">确定</xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate">
        <xforms:script id="xformsScript2">personDetail.btnOKClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger id="btnCancel" appearance="minimal"> 
      <xforms:label id="xuiLabel2">取消</xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate">
        <xforms:script id="xformsScript1">personDetail.btnCancelClick(event)</xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xhtml:div component="/UI/system/components/blob.xbl.xml#image" id="blobImage"
      data="dPerson" concept="SA_OPPerson" relation="sPhoto" class="xui-input"/>  
    <xforms:input id="inputEnglishName" ref="data('dPerson')/sEnglishName"/>  
    <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" id="gridSelectSex"
      ref="data('dPerson')/sSex"> 
      <xforms:label ref="col_0" id="xuiLabel3"/>  
      <xforms:value ref="col_0" id="default5"/>  
      <xforms:itemset id="default6"> 
        <itemset-data xmlns="" id="default7">  
          <rows id="default8"> 
            <row id="default9"> 
              <cell id="default10"/> 
            </row>  
            <row id="default11"> 
              <cell id="default12">男</cell> 
            </row>  
            <row id="default13"> 
              <cell id="default14">女</cell> 
            </row> 
          </rows> 
        </itemset-data>  
        <xforms:column ref="col_0" id="default16"/> 
      </xforms:itemset> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" id="gridSelectMarriage"
      ref="data('dPerson')/sMarriage"> 
      <xforms:label ref="col_0" id="xuiLabel4"/>  
      <xforms:value ref="col_0" id="default23"/>  
      <xforms:itemset id="default21"> 
        <xforms:column ref="col_0" id="default19"/>  
        <itemset-data xmlns="" id="default40">  
          <rows id="default41"> 
            <row id="default42"> 
              <cell id="default43"/> 
            </row>  
            <row id="default44"> 
              <cell id="default45">未婚</cell> 
            </row>  
            <row id="default46"> 
              <cell id="default47">已婚</cell> 
            </row>  
            <row id="default48"> 
              <cell id="default49">离异</cell> 
            </row>  
            <row id="default50"> 
              <cell id="default51">丧偶</cell> 
            </row> 
          </rows> 
        </itemset-data> 
      </xforms:itemset> 
    </xhtml:div>  
    <xhtml:div component="/UI/system/components/windowDialogReceiver.xbl.xml#windowDialogReceiver"
      id="receiver" onReceive="personDetail.receiverReceive"/>  
    <xforms:input id="inputBirthday" ref="data('dPerson')/sBirthday" format="yyyy-MM-dd"/>  
    <xforms:input id="inputIDCard" ref="data('dPerson')/sIDCard"/>  
    <xforms:input id="inputJoinDate" ref="data('dPerson')/sJoinDate" format="yyyy-MM-dd"/>  
    <xforms:input id="inputGraduateSchool" ref="data('dPerson')/sGraduateSchool"/>  
    <xforms:input id="inputSpeciality" ref="data('dPerson')/sSpeciality"/>  
    <xforms:input id="inputSchoolLength" ref="data('dPerson')/sSchoolLength"/>  
    <xforms:input id="inputMail" ref="data('dPerson')/sMail"/>  
    <xforms:input id="inputQQ" ref="data('dPerson')/sQQ"/>  
    <xforms:input id="inputMsn" ref="data('dPerson')/sMsn"/>  
    <xforms:input id="inputOfficePhone" ref="data('dPerson')/sOfficePhone"/>  
    <xforms:input id="inputMobilePhone" ref="data('dPerson')/sMobilePhone"/>  
    <xforms:input id="inputZip" ref="data('dPerson')/sZip"/>  
    <xforms:input id="inputFamilyAddress" ref="data('dPerson')/sFamilyAddress"/>
  <xforms:input id="inputPasswordTimeLimit" ref="data('dPerson')/sPasswordTimeLimit"></xforms:input>
  <xforms:input id="input2" ref="data('dPerson')/sPasswordModifyTime" format="yyyy-MM-dd hh:mm"></xforms:input>  
    <xforms:textarea ref="data('dPerson')/sDescription" id="textareaDescription"/>  
    <xui:layout style="height:100%;width:100%;position:relative;" id="rootLayout"
      type="absolute"> 
      <xhtml:div id="div1" class="xui-input" style="position:absolute;position:absolute;background-color:#F8F8F8;top:10px;height:22px;left:88px;width:348px;"> 
        <xui:place control="inputMainOrgFName" id="controlPlace1" style="width:100%;height:100%;border-style:none none none none;"/> 
      </xhtml:div>  
      <xui:place control="inputName" id="controlPlace3" style="position:absolute;width:140px;top:40px;left:88px;"/>  
      <xui:place control="inputCode" id="controlPlace4" style="position:absolute;width:140px;top:40px;left:298px;"/>  
      <xui:place control="inputLoginName" id="controlPlace5" style="position:absolute;width:140px;top:70px;left:88px;"/>  
      <xui:place control="inputCardKind" id="controlPlace11" style="position:absolute;width:140px;top:160px;left:88px;"/>  
      <xui:place control="inputCardNO" id="controlPlace12" style="position:absolute;width:140px;top:160px;left:298px;"/>  
      <xui:place control="inputDegree" id="controlPlace14" style="position:absolute;width:140px;left:88px;top:190px;"/>  
      <xui:place control="blobImage" id="controlPlace8" style="position:absolute;border-style:solid solid solid solid;border-width:thin thin thin thin;top:10px;height:262px;left:448px;width:204px;"/>  
      <xui:place control="inputEnglishName" id="controlPlace9" style="position:absolute;width:140px;top:70px;left:298px;"/>  
      <xui:place control="gridSelectSex" id="controlPlace10" style="position:absolute;width:140px;top:100px;left:88px;"/>  
      <xui:place control="gridSelectMarriage" id="controlPlace17" style="position:absolute;width:140px;top:190px;left:298px;"/>  
      <xui:place control="inputBirthday" id="controlPlace18" style="position:absolute;width:140px;top:130px;left:298px;"/>  
      <xui:place control="inputIDCard" id="controlPlace19" style="position:absolute;width:140px;top:130px;left:88px;"/>  
      <xui:place control="inputJoinDate" id="controlPlace20" style="position:absolute;width:141px;top:340px;left:88px;"/>  
      <xui:place control="inputGraduateSchool" id="controlPlace21" style="position:absolute;width:140px;top:220px;left:298px;"/>  
      <xui:place control="inputSpeciality" id="controlPlace22" style="position:absolute;width:140px;left:88px;top:220px;"/>  
      <xui:place control="inputSchoolLength" id="controlPlace23" style="position:absolute;width:140px;top:250px;left:298px;"/>  
      <xui:place control="inputMail" id="controlPlace24" style="position:absolute;width:140px;left:88px;top:250px;"/>  
      <xui:place control="inputQQ" id="controlPlace25" style="position:absolute;width:140px;top:280px;left:298px;"/>  
      <xui:place control="inputMsn" id="controlPlace26" style="position:absolute;width:146px;top:280px;left:508px;"/>  
      <xui:place control="inputOfficePhone" id="controlPlace28" style="position:absolute;width:140px;left:88px;top:280px;"/>  
      <xui:place control="inputMobilePhone" id="controlPlace29" style="position:absolute;width:140px;top:310px;left:298px;"/>  
      <xui:place control="inputZip" id="controlPlace31" style="position:absolute;width:140px;left:88px;top:310px;"/>  
      <xui:place control="inputFamilyAddress" id="controlPlace32" style="position:absolute;width:356px;top:340px;left:298px;"/>  
      <xui:place control="textareaDescription" id="controlPlace33" style="position:absolute;width:566px;top:370px;height:65px;left:88px;"/>  
      <xui:place control-label="inputMainOrgFName" id="controlLabel1" style="position:absolute;left:8px;top:16px;"
        label="主要岗位"/>  
      <xui:place control-label="inputName" id="controlLabel2" style="position:absolute;top:46px;left:8px;"/>  
      <xui:place control-label="inputCode" id="controlLabel3" style="position:absolute;top:46px;left:238px;"/>  
      <xui:place control-label="inputLoginName" id="controlLabel4" style="position:absolute;top:76px;left:8px;"/>  
      <xui:place control-label="inputEnglishName" id="controlLabel5" style="position:absolute;top:76px;left:238px;"/>  
      <xui:place control-label="gridSelectSex" id="controlLabel6" style="position:absolute;top:106px;left:8px;"/>  
      <xui:place control-label="gridSelectMarriage" id="controlLabel7" style="position:absolute;top:196px;left:238px;"/>  
      <xui:place control-label="inputIDCard" id="controlLabel8" style="position:absolute;top:136px;left:8px;"/>  
      <xui:place control-label="inputBirthday" id="controlLabel9" style="position:absolute;top:136px;left:238px;"/>  
      <xui:place control-label="inputCardKind" id="controlLabel10" style="position:absolute;top:166px;left:8px;"/>  
      <xui:place control-label="inputCardNO" id="controlLabel11" style="position:absolute;top:166px;left:238px;"/>  
      <xui:place control-label="inputJoinDate" id="controlLabel13" style="position:absolute;top:346px;left:8px;"/>  
      <xui:place control-label="gsLevelCode" id="controlLabel14" style="position:absolute;left:238px;top:106px;" label="行政级别"/>  
      <xui:place control-label="inputDegree" id="controlLabel15" style="position:absolute;left:8px;top:196px;"/>  
      <xui:place control-label="inputGraduateSchool" id="controlLabel16" style="position:absolute;top:226px;left:238px;"/>  
      <xui:place control-label="inputSpeciality" id="controlLabel17" style="position:absolute;left:8px;top:226px;"/>  
      <xui:place control-label="inputSchoolLength" id="controlLabel18" style="position:absolute;top:256px;left:238px;"/>  
      <xui:place control-label="inputMail" id="controlLabel19" style="position:absolute;left:8px;top:256px;"/>  
      <xui:place control-label="inputQQ" id="controlLabel20" style="position:absolute;top:286px;left:238px;"/>  
      <xui:place control-label="inputOfficePhone" id="controlLabel22" style="position:absolute;left:8px;top:286px;"/>  
      <xui:place control-label="inputMobilePhone" id="controlLabel23" style="position:absolute;top:316px;left:238px;"/>  
      <xui:place control-label="inputZip" id="controlLabel25" style="position:absolute;left:8px;top:316px;"/>  
      <xui:place control-label="inputFamilyAddress" id="controlLabel26" style="position:absolute;top:346px;left:238px;"/>  
      <xui:place control-label="textareaDescription" id="controlLabel27" style="position:absolute;top:376px;left:8px;"/>  
      <xui:place control="btnOK" id="controlPlace6" style="position:absolute;width:75px;top:445px;left:497px;"/>  
      <xui:place control="btnCancel" id="controlPlace7" style="position:absolute;width:75px;left:579px;top:445px;"/>  
      <xui:place control="receiver" id="controlPlace2" style="position:absolute;top:192px;left:524px;"/>
  <xui:place control="inputPasswordTimeLimit" id="controlPlace15" style="position:absolute;width:45px;left:88px;top:444px;"></xui:place>
  <xui:place control="input2" id="controlPlace27" style="position:absolute;width:140px;left:298px;top:444px;"></xui:place>
  <xhtml:label id="label1" style="position:absolute;width:70px;top:448px;height:14px;left:8px;" class="xui-label">密码时限</xhtml:label>
  <xhtml:label id="label2" class="xui-label" style="position:absolute;position:absolute;width:50px;top:448px;height:13px;left:133px;">（天）</xhtml:label>
  <xhtml:label id="label3" style="position:absolute;width:110px;top:448px;height:18px;left:183px;" class="xui-label">密码最后修改时间</xhtml:label>
  <xhtml:label id="label4" style="position:absolute;left:452px;top:283px;" class="xui-label"><![CDATA[CA设备ID]]></xhtml:label>
  <xui:place control="btnReadCA" id="controlPlace16" style="position:absolute;left:452px;top:310px;width:74px;"></xui:place>
  <xui:place control="btnClearCA" id="controlPlace30" style="position:absolute;top:311px;left:537px;width:80px;"></xui:place>
  <xui:place control="gsLevelCode" id="controlPlace13" style="width:140px;position:absolute;top:100px;left:298px;"></xui:place></xui:layout> 
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnReadCA">
   <xforms:label id="default15"><![CDATA[绑定CA设备]]></xforms:label>
  <xforms:action id="action4" ev:event="DOMActivate"><xforms:script id="xformsScript4"><![CDATA[personDetail.btnReadCAClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="btnClearCA">
   <xforms:label id="default17"><![CDATA[移除CA设备]]></xforms:label>
  <xforms:action id="action5" ev:event="DOMActivate"><xforms:script id="xformsScript5"><![CDATA[personDetail.btnClearCAClick(event)]]></xforms:script></xforms:action></xforms:trigger>
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" id="gsLevelCode" ref="data('dPerson')/sLevelCode" label-ref="data('dPerson')/sTitle" column-header-height="0">
   <xforms:label id="default26" ref="name"></xforms:label>
   <xforms:value id="default31" ref="code"></xforms:value>
   <xforms:itemset id="default34" data="personLevel">
    
     
  <itemset-data xmlns="" id="default53">
   <rows xmlns="" id="default54"></rows></itemset-data>
  
  
  
  
  <xforms:column ref="name" id="default22"></xforms:column>
  <xforms:column ref="code" visible="false" id="default24"></xforms:column></xforms:itemset> </xhtml:div></xui:view>  
  <xui:resource id="resource1">
    <xhtml:script id="opmUtils" src="/UI/SA/OPM/js/OpmUtils.js"/>  
    <xhtml:script id="htmlScript1" src="personDetail.js"/>
    <xhtml:script src="/UI/base/gdca/GDCASecure.js"/>
  </xui:resource> 
</xui:window>
