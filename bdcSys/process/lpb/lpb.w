<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:xforms="http://www.justep.com/xforms" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window" id="window">  
  <xforms:model id="model1"> 
    <xforms:action id="action1" ev:event="xforms-model-construct"> 
      <xforms:script id="xformsScript1"><![CDATA[lpb.model1ModelConstruct(event)]]></xforms:script> 
    </xforms:action>  
    <xforms:action id="action2" ev:event="xbl-loaded"> 
      <xforms:script id="xformsScript2"><![CDATA[lpb.model1XBLLoaded(event)]]></xforms:script> 
    </xforms:action>  
    <data component="/UI/system/components/data.xbl.xml#data" data-type="json"
      columns="id,name" src="" auto-load="true" id="dataZRZ" store-type="simple" onIndexChanged="lpb.dataZRZIndexChanged"> 
      <rows xmlns="" id="default1">  
        <row id="default2"> 
          <cell id="default3">01D142AC77CF4A40A622845495FFBEAD</cell>  
          <cell id="default4">佛山市禅城区魁奇二路139号二十二座</cell> 
        </row> 
      </rows> 
    </data> 
  </xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout id="rootLayout"> 
      <xui:place control="view1" id="controlPlace2" style="height:105px;width:100%;"/>  
      <xui:place control="buildingView1" id="controlPlace1"/> 
    </xui:layout>  
    <xui:view auto-load="true" id="view1" class="xui-container"> 
      <layout type="absolute" style="position:relative;" id="layout1"> 
        <xhtml:input type="text" value="01D142AC77CF4A40A622845495FFBEAD" id="input1"
          style="position:absolute;top:31px;width:243px;left:8px;" class="xui-input"/>  
        <xhtml:input type="button" value="加载楼盘户" id="input2" style="position:absolute;left:26px;top:62px;"
          class="xui-button" onclick="lpb.input2Click(event)"/>  
        <xhtml:input type="button" value="显示幢标题" id="input3" style="position:absolute;left:108px;top:62px;"
          class="xui-button" onclick="lpb.input3Click(event)"/>  
        <xhtml:input type="button" value="隐藏幢标题" id="input4" class="xui-button" style="position:absolute;top:62px;position:absolute;left:186px;"
          onclick="lpb.input4Click(event)"/>  
        <xhtml:input type="text" id="input5" class="xui-input" style="position:absolute;top:31px;width:243px;position:absolute;left:301px;"/>  
        <xhtml:input type="button" value="定位" id="input6" style="position:absolute;top:65px;left:309px;"
          class="xui-button" onclick="lpb.input6Click(event)"/>  
        <xhtml:input type="button" value="随机状态" id="input7" style="position:absolute;top:66px;left:404px;"
          class="xui-button" onclick="lpb.input7Click(event)"/>  
        <xhtml:div id="div1" style="position:absolute;right:10px;height:31px;top:30px;"
          class="xui-container"> 
          <span class="zt zt-fz">发证</span>  
          <span class="zt zt-cf">查封</span>  
          <span class="zt zt-dj">冻结</span>  
          <span class="zt zt-dy">抵押</span>  
          <span class="zt zt-yg">预告</span>  
          <span class="zt zt-yy">异议</span> 
        </xhtml:div>  
        <xhtml:label style="position:absolute;right:330px;top:5px;" class="xui-label"><![CDATA[图例:]]></xhtml:label> 
      </layout> 
    </xui:view>  
    <xhtml:div component="/UI/bdcSys/components/buildingView.xbl.xml#buildingView"
      data-bind="" id="buildingView1" onInited="lpb.buildingView1Inited" onCreateQueryActionParam="lpb.buildingView1CreateQueryActionParam"
      onHIDClick="lpb.buildingView1HIDClick" onShowRecInfo="lpb.buildingView1ShowRecInfo"
      onHZTClick="lpb.buildingView1HZTClick" onAfterRender="lpb.buildingView1AfterRender"
      onChangeCH="lpb.buildingView1ChangeCH" showZRZName="true"> 
      <h3 style="text-align:center;" data-bind="text:$model.zrzName,visible:$model.showZRZName"/>  
      <div class="container_cengs" data-bind="foreach:$model.cengs" style="display:none"> 
        <div class="x-row row_ceng" data-bind="event:{dragenter:$model.bindModelFn($model.dodragEnter),dragover:$model.bindModelFn($model.dodragOver),dragend:$model.bindModelFn($model.dodragEnd)}"> 
          <div class="x-col x-col-10 pri"> 
            <div> 
              <span data-bind="text:CH"/> 
            </div> 
          </div>  
          <div class="x-col"> 
            <div class="x-row" data-bind="foreach:{data:$object.items,afterRender:$model.bindModelFn($model.afterRenderColH)}"> 
              <div class="x-col colH" draggable="true" data-bind="if:$object.HID,attr:{title:$object.ZL},event:{dragstart:$model.bindModelFn($model.dodragStart),drop:$model.bindModelFn($model.dodrop)}"> 
                <div class="x-row row_h"> 
                  <span class="hh" data-bind="text:$object.HH,attr:{title:$object.ZL}"/>  
                  <i class="rec" data-bind="visible:!!$object.RECID,event:{click:$model.bindModelFn($model.showRecInfo)}"/> 
                </div>  
                <div class="x-row hid"> 
                  <a href="javascript:void(0)" data-bind="text:$object.HID,event:{click:$model.bindModelFn($model.hidClick)}"/> 
                </div>  
                <div class="x-row allzt" data-bind="event:{click:$model.bindModelFn($model.hztClick)}"> 
                  <span class="zt zt-fz" name="fz" data-bind="text:$model.getHZTLabel('fz',$object.FZZT),visible:$model.isShowHZT('fz',$object.FZZT)"/>  
                  <span class="zt zt-cf" name="cf" data-bind="text:$model.getHZTLabel('cf',$object.CFZT),visible:$model.isShowHZT('cf',$object.CFZT)"/>  
                  <span class="zt zt-dj" name="dj" data-bind="text:$model.getHZTLabel('dj',$object.DJZT),visible:$model.isShowHZT('dj',$object.DJZT)"/>  
                  <span class="zt zt-dy" name="dy" data-bind="text:$model.getHZTLabel('dy',$object.DYZT),visible:$model.isShowHZT('dy',$object.DYZT)"/>  
                  <span class="zt zt-yg" name="yg" data-bind="text:$model.getHZTLabel('yg',$object.YGZT),visible:$model.isShowHZT('yg',$object.YGZT)"/>  
                  <span class="zt zt-yy" name="yy" data-bind="text:$model.getHZTLabel('yy',$object.YYZT),visible:$model.isShowHZT('yy',$object.YYZT)"/> 
                </div> 
              </div> 
            </div> 
          </div> 
        </div> 
      </div> 
    </xhtml:div> 
  </xui:view>  
  <xui:resource id="resource1"> 
    <xhtml:script id="htmlScript1" src="/UI/base/lib/init.js" loadKO="true"/>  
    <xhtml:script id="htmlScript2" src="lpb.js"/>  
    <xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="lpb.css"/> 
  </xui:resource> 
</xui:window>
