<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui"
  xmlns:justep="http://www.justep.com/x5#" xmlns:xbl="http://www.w3.org/ns/xbl" xmlns:xhtml="http://www.w3.org/1999/xhtml"
  xmlns:xs="http://www.w3.org/2001/XMLSchema" xmlns:xforms="http://www.justep.com/xforms"
  xmlns:ev="http://www.w3.org/2001/xml-events" component="/UI/system/components/window.xbl.xml#window">  
  <xforms:model id="pageSetupDialog" style="height:auto;top:142px;left:508px;"> 
    <data id="orientationData" columns="fid,code,orientation" id-property="fid"
      component="/UI/system/components/data.xbl.xml#data" auto-load="true" store-type="simple"> 
      <rows xmlns="" id="default233">  
        <row id="default234"> 
          <cell id="default235">1</cell>  
          <cell id="default236"/>  
          <cell id="default237">纵向</cell> 
        </row>  
        <row id="default238"> 
          <cell id="default239">2</cell>  
          <cell id="default240">Landscape</cell>  
          <cell id="default241">横向</cell> 
        </row> 
      </rows> 
    </data>  
    <data id="pageType" columns="paperType,displayName,pageWidth,pageHeight"
      id-property="paperType" component="/UI/system/components/data.xbl.xml#data"
      auto-load="true" store-type="grid"> 
      <rows xmlns="" id="default254">  
        <row id="default255"> 
          <cell id="default256">A3</cell>  
          <cell id="default257">A3</cell>  
          <cell id="default258">297mm</cell>  
          <cell id="default259">420mm</cell> 
        </row>  
        <row id="default260"> 
          <cell id="default261">A4</cell>  
          <cell id="default262">A4</cell>  
          <cell id="default263">210mm</cell>  
          <cell id="default264">297mm</cell> 
        </row>  
        <row id="default265"> 
          <cell id="default266">A5</cell>  
          <cell id="default267">A5</cell>  
          <cell id="default268">148mm</cell>  
          <cell id="default269">210mm</cell> 
        </row>  
        <row id="default270"> 
          <cell id="default271">B4</cell>  
          <cell id="default272">B4(JIS)</cell>  
          <cell id="default273">257mm</cell>  
          <cell id="default274">364mm</cell> 
        </row>  
        <row id="default275"> 
          <cell id="default276">B5</cell>  
          <cell id="default277">B5(JIS)</cell>  
          <cell id="default278">182mm</cell>  
          <cell id="default279">257mm</cell> 
        </row>  
        <row id="default280"> 
          <cell id="default281">4K</cell>  
          <cell id="default282">4开纸</cell>  
          <cell id="default283">368mm</cell>  
          <cell id="default284">520mm</cell> 
        </row>  
        <row id="default285"> 
          <cell id="default286">8K</cell>  
          <cell id="default287">8开纸</cell>  
          <cell id="default288">260mm</cell>  
          <cell id="default289">368mm</cell> 
        </row>  
        <row id="default290"> 
          <cell id="default291">16K</cell>  
          <cell id="default292">16开纸</cell>  
          <cell id="default293">184mm</cell>  
          <cell id="default294">260mm</cell> 
        </row>  
        <row id="default295"> 
          <cell id="default296">32K</cell>  
          <cell id="default297">32开纸</cell>  
          <cell id="default298">130mm</cell>  
          <cell id="default299">184mm</cell> 
        </row>  
        <row id="default300"> 
          <cell id="default301">B32K</cell>  
          <cell id="default302">大32开纸</cell>  
          <cell id="default303">140mm</cell>  
          <cell id="default304">203mm</cell> 
        </row>  
        <row id="default305"> 
          <cell id="default306">DL</cell>  
          <cell id="default307">DL信封</cell>  
          <cell id="default308">110mm</cell>  
          <cell id="default309">220mm</cell> 
        </row>  
        <row id="default310"> 
          <cell id="default311">C3</cell>  
          <cell id="default312">C3信封</cell>  
          <cell id="default313">324mm</cell>  
          <cell id="default314">458mm</cell> 
        </row>  
        <row id="default315"> 
          <cell id="default316">C4</cell>  
          <cell id="default317">C4信封</cell>  
          <cell id="default318">229mm</cell>  
          <cell id="default319">324mm</cell> 
        </row>  
        <row id="default320"> 
          <cell id="default321">C5</cell>  
          <cell id="default322">C5信封</cell>  
          <cell id="default323">162mm</cell>  
          <cell id="default324">229mm</cell> 
        </row>  
        <row id="default325"> 
          <cell id="default326">C6</cell>  
          <cell id="default327">C6信封</cell>  
          <cell id="default328">114mm</cell>  
          <cell id="default329">162mm</cell> 
        </row>  
        <row id="default330"> 
          <cell id="default331">B4L</cell>  
          <cell id="default332">B4信封</cell>  
          <cell id="default333">250mm</cell>  
          <cell id="default334">353mm</cell> 
        </row>  
        <row id="default335"> 
          <cell id="default336">B5L</cell>  
          <cell id="default337">B5信封</cell>  
          <cell id="default338">176mm</cell>  
          <cell id="default339">250mm</cell> 
        </row>  
        <row id="default340"> 
          <cell id="default341">B6L</cell>  
          <cell id="default342">B6信封</cell>  
          <cell id="default343">176mm</cell>  
          <cell id="default344">125mm</cell> 
        </row>  
        <row id="default345"> 
          <cell id="default346">custom</cell>  
          <cell id="default347">自定义</cell>  
          <cell id="default348">100mm</cell>  
          <cell id="default349">100mm</cell> 
        </row> 
      </rows> 
    </data>  
    <data id="pageInfo" columns="fid,displayName,paperType,pageWidth,pageHeight,orientation,marginTop,marginLeft,printer"
      component="/UI/system/components/data.xbl.xml#data" id-property="fid" auto-load="false"
      store-type="simple" auto-new="false" onValueChanged="pageSetup.pageInfoValueChanged"> 
      <rows xmlns="" id="default88">  
        <row id="default89"> 
          <cell id="default90"/>  
          <cell id="default91"/>  
          <cell id="default92"/>  
          <cell id="default93"/>  
          <cell id="default94"/>  
          <cell id="default95"/>  
          <cell id="default96"/>  
          <cell id="default97"/>  
          <cell id="default98"/>  
          <cell id="default99"/>  
          <cell id="default100"/>  
          <cell id="default101"/> 
        </row> 
      </rows> 
    </data> 
  <data component="/UI/system/components/data.xbl.xml#data" data-type="json" columns="name" src="" auto-load="true" id="printer" confirm-delete="false"><rows xmlns="" id="default18"></rows></data></xforms:model>  
  <view> 
    <xui:layout style="width:100%;height:100%;"> 
      <xhtml:style>.tr30{height:34px;} .td70{width:70px;text-align:right;} .td140{width:140px;}</xhtml:style>  
      <xhtml:table border="0" cellspacing="8" cellpadding="0" style="width:100%;height:100%;table-layout:fixed"
        component="/UI/system/components/tableLayout.xbl.xml#tableLayout"> 
        <xhtml:tr valign="top"> 
          <xhtml:td> 
            <xhtml:fieldset class="xui-textarea" style="width:100%;height:101px;"> 
              <xhtml:legend>纸张</xhtml:legend>  
              <xhtml:table> 
                <xhtml:tr class="tr30"> 
                  <xhtml:td class="td70">类型：</xhtml:td>  
                  <xhtml:td class="td140"> 
                    <xui:place control="selectpaperType" id="controlPlace1"/> 
                  </xhtml:td> 
                </xhtml:tr>  
                <xhtml:tr class="tr30"> 
                  <xhtml:td class="td70">高度：</xhtml:td>  
                  <xhtml:td class="td140"> 
                    <xforms:input id="iptheight" class="xui-input" data="pageInfo" ref="data('pageInfo')/pageHeight"/> 
                  </xhtml:td>  
                  <xhtml:td class="td70">宽度：</xhtml:td>  
                  <xhtml:td class="td140"> 
                    <xforms:input id="iptwidth" class="xui-input" data="pageInfo" ref="data('pageInfo')/pageWidth"/> 
                  </xhtml:td> 
                </xhtml:tr> 
              </xhtml:table> 
            </xhtml:fieldset>  
            <xhtml:div style="height:1px;"/>  
            <xhtml:fieldset class="xui-textarea" style="width:100%;height:81px;"> 
              <xhtml:legend>边距</xhtml:legend>  
              <xhtml:table> 
                <xhtml:tr class="tr30"> 
                  <xhtml:td class="td70">上页边距：</xhtml:td>  
                  <xhtml:td class="td140"> 
                    <xforms:input id="iptmarginTop" class="xui-input" data="pageInfo"
                      ref="data('pageInfo')/marginTop"/> 
                  </xhtml:td>  
                  <xhtml:td class="td70"><![CDATA[左边距：]]></xhtml:td>  
                  <xhtml:td class="td140"> 
                    <xforms:input id="iptmarginBottom" class="xui-input" data="pageInfo"
                      ref="data('pageInfo')/marginLeft"/> 
                  </xhtml:td> 
                </xhtml:tr>  
                </xhtml:table> 
            </xhtml:fieldset>  
            <xhtml:div style="height:1px;"/>  
            <xhtml:fieldset style="width:100%;height:79px;" class="xui-textarea"> 
              <xhtml:legend>方向</xhtml:legend>  
              <xforms:select1 ref="data('pageInfo')/orientation" id="selectOrientation"> 
                <xforms:item id="selectItem1"> 
                  <xforms:label id="xuiLabel2">横向</xforms:label>  
                  <xforms:value id="default3"><![CDATA[2]]></xforms:value> 
                </xforms:item>  
                <xforms:item id="selectItem2"> 
                  <xforms:label id="xuiLabel3">纵向</xforms:label>  
                  <xforms:value id="default4"><![CDATA[1]]></xforms:value> 
                </xforms:item> 
              </xforms:select1> 
            </xhtml:fieldset>  
            <xhtml:div style="height:1px;"/>  
            <xhtml:fieldset id="fieldset1" class="xui-textarea" style="width:100%;height:73px;">
   <xhtml:legend id="default13"><![CDATA[    打印机     ]]></xhtml:legend>
    <xhtml:table id="table1">
    <xhtml:tr class="tr30" id="tr1">
     <xhtml:td class="td70" id="td1">类型：</xhtml:td>
     <xhtml:td class="td140" id="td2">
      <xui:place control="gridSelect1" id="controlPlace5"></xui:place></xhtml:td> </xhtml:tr> 
    </xhtml:table></xhtml:fieldset></xhtml:td> 
        </xhtml:tr>  
        <xhtml:tr height="22px"> 
          <xhtml:td> 
            <xui:place control="trigger1" id="controlPlace2" style="float:right;"/>  
            <xui:place control="trigger2" id="controlPlace3" style="float:right;margin-right:16px;"/>
          </xhtml:td> 
        </xhtml:tr> 
      </xhtml:table> 
    <xui:place control="windowReceiver1" id="controlPlace4" style="position:absolute;top:76px;left:298px;"></xui:place></xui:layout>  
    <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" label-separator=","
      value-separator="," ext-separator="," id="selectpaperType" ref="data('pageInfo')/paperType"
      label-ref="data('pageInfo')/displayName"> 
      <xforms:label ref="displayName" id="xuiLabel1"/>  
      <xforms:value ref="paperType" id="default1"/>  
      <xforms:itemset id="default2" data="pageType" auto-load-data="false"> 
        <xforms:column ref="paperType" id="paperTypeC"/>  
        <xforms:column ref="displayName" id="displayNameC"/>  
        <xforms:column ref="pageWidth" id="pageHeightC"/>  
        <xforms:column ref="pageHeight" id="pageHeightC"/> 
      </xforms:itemset> 
    </xhtml:div>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger1"
      appearance="minimal"> 
      <xforms:label id="default5"><![CDATA[取消]]></xforms:label>  
      <xforms:action id="action2" ev:event="DOMActivate">
        <xforms:script id="xformsScript2"><![CDATA[justep.windowReceiver.windowCancel()]]></xforms:script>
      </xforms:action>
    </xforms:trigger>  
    <xforms:trigger component="/UI/system/components/trigger.xbl.xml#trigger" id="trigger2"
      class="button-green"> 
      <xforms:label id="default6"><![CDATA[确定]]></xforms:label>  
      <xforms:action id="action1" ev:event="DOMActivate">
        <xforms:script id="xformsScript1"><![CDATA[justep.windowReceiver.windowEnsure(getPageInfoData())]]></xforms:script>
      </xforms:action>
    </xforms:trigger>
  <xhtml:div component="/UI/system/components/windowReceiver.xbl.xml#windowReceiver" id="windowReceiver1" onReceive="pageSetup.windowReceiver1Receive"></xhtml:div>
  <xhtml:div component="/UI/system/components/select.xbl.xml#gridSelect" label-separator="," value-separator="," ext-separator="," id="gridSelect1" ref="data('pageInfo')/printer" label-ref="data('pageInfo')/printer">
   <xforms:label ref="name" id="default10"></xforms:label>
   <xforms:value ref="name" id="default8"></xforms:value>
   <xforms:itemset id="default9" data="printer" auto-load-data="false">
    
    
    
    <xforms:column ref="name" id="default14"></xforms:column></xforms:itemset> </xhtml:div></view>  
  <resource> 
    <xhtml:script src="/UI/system/components/windowReceiver/windowReceiver.js"/>  
    <xhtml:script src="/UI/system/service/report/dialog/pageSetup.js"/>  
    <xhtml:script> <![CDATA[
			]]> </xhtml:script> 
  </resource> 
<resource id="resource1"><xhtml:script id="htmlScript1" src="pageSetup.js"></xhtml:script></resource></xui:window>
