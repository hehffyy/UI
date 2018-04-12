<?xml version="1.0" encoding="UTF-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.justep.com/xui" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" id="window" xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:ev="http://www.w3.org/2001/xml-events">  
  <xforms:model id="model1"><xforms:action id="action1" ev:event="onload"><xforms:script id="xformsScript1"><![CDATA[mainActivity.model1Load(event)]]></xforms:script></xforms:action>
  <data component="/UI/system/components/data.xbl.xml#bizData" update-mode="whereVersion" data-type="json" auto-load="false" id="B_CommonlyUsed" concept="B_CommonlyUsed" limit="-1" store-type="simple" onSaveError="mainActivity.B_CommonlyUsedSaveError"><reader id="default1" action="/common/gwbl/logic/action/queryB_CommonlyUsedAction"></reader>
  <writer id="default2" action="/common/gwbl/logic/action/saveB_CommonlyUsedAction"></writer>
  <creator id="default3" action="/common/gwbl/logic/action/createB_CommonlyUsedAction"></creator></data></xforms:model>  
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%" id="rootLayout"> 
	<div class="container">
	<!-- 
		<div class="pageTop">
			<div>
				<span>搜索</span>
				<span class="mySearch">
					<input type="text"/>
					<i></i>
				</span>
			</div>
			<div class="clear"></div>
		</div>
		 -->
		<div id="boxAdress" class="myBox">
			<div class="bt1">常用收件地址</div>
			<div class="boxBody">
			</div>
		</div>
		<div id="receiveTypeBox" class="myBox">
			<div class="bt1">收件分类</div>
			<div class="boxBody">
			</div>
		</div>
	</div>
    </xui:layout>
  </xui:view>  
  <xui:resource id="resource1"><xhtml:link rel="stylesheet" type="text/css" id="htmlLink1" href="mainActivity.css"></xhtml:link>
  <xhtml:script id="htmlScript1" src="mainActivity.js"></xhtml:script>
  <xhtml:script id="htmlScript2" src="jquery.tmpl.js"></xhtml:script>
  </xui:resource> 
</xui:window>
