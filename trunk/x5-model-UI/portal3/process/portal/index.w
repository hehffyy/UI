<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" xmlns:ev="http://www.w3.org/2001/xml-events" timeout-window="/UI/portal3/process/portal/login.w">  
  <xui:inhead>
  	<xhtml:title>${title_zh}</xhtml:title>
	<xhtml:meta id="viewport" name="viewport" content="initial-scale=1.0,user-scalable=yes,width=1024"/>
  </xui:inhead>
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;" id="rootLayout" > 
		<div id="topPanel">
			<div id="setting">
				<div id="page1" style="width: 600px;height:100%;background-color: #fff;padding-left: 5px;">
				    <div style="height:100%;float:right;">
						<div id="advanced_set"></div>
					</div>
					<div style="height:100%;width: 600px;float:right;padding-left: 5px;">
						<div id="reset_pwd"></div>
					</div>
				</div>
				<div id="page2" style="width: 600px;height:100%;background-color: #fff;width: 98%;padding-left: 5px;">
					<div style="height:100%;">
						<div id="portal_set"></div>
					</div>
				</div>
				<div id="page3" style="width: 600px;height:100%;background-color: #ffff;width: 98%;padding-left: 5px;">
					<div style="height:100%;">
					<div id="skin_set">
					</div></div>
				</div>
			</div>
		</div>
		<div class="head">
		
			<div class="brand">
			
				<div class="logo"></div>
				<div class="bar">
				</div>
			</div>
		</div>
		<div style="width:100%;">
		<div id="funcMenu" class="func-menu-show">
		<div class="left-nav left-nav-show">
		<!-- ie7 x-index bug -->
		<div class="fun-map fun-map-border  clearfix" id="cv2" style="position:relative;z-index: 104;height: 99%;"></div>
		</div>
		</div>
		<div id="funContent" style="position:relative; min-width: 1229px; display: block;z-index: 100;">
		    <div style="margin: 0px 5px;width: 100%;">
		    <div id="b3" style="z-index: 3"></div>
		    </div>
			<div class="content" style="position:relative; width: 100%; display: block;">
				<!-- 
				<div id="b1" style="z-index: 3"></div>
				 -->
				
				<!-- 
				<div class="fun-map" id="cv1" style="z-index: 1"></div>
				 -->
				<div id='portal'>
				</div>
			</div>
						
			<div id="funcFrame">
			
			</div>
		</div>
		</div>
	</xui:layout> 
  </xui:view>  
  <xui:resource id="resource1">
  	<xhtml:link rel="stylesheet" type="text/css" href="components/sliddingpanel/sliddingpanel.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/tab/tab.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/setpwd/setpwd.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/advancedset/advancedset.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/portalset/portalset.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/functreemenu/funcTreeMenu.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="/form/justep/showMessage.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/sortablebar/sortablebar.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/portalview/widgetlayout.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/accordion/accordion.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/funcframe2/funcFrame2.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/agentlist/agentlist.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/dialog/dialog.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/reminder/reminder.css"/>
	<xhtml:link rel="stylesheet" type="text/css" href="lib/jscrollpane/jquery.jscrollpane.css"/>
	<xhtml:link rel="stylesheet" type="text/css" href="components/functreemenu/functreemenu.css"/>
	<xhtml:link rel="stylesheet" type="text/css" href="lib/multiMenu/css/accMenu.css"/>
	<xhtml:script type="text/javascript" src="lib/md5.js"/>
	<xhtml:script type="text/javascript" src="lib/jquery.cookie.js"/>  
	<!-- 
	<xhtml:script type="text/javascript" src="/base/base.js"/>
	-->
	<xhtml:script type="text/javascript" src="/form/justep/showMessage.js"/>
	
	
	<xhtml:script type="text/javascript" src="lib/api.js"/>
	<xhtml:script type="text/javascript" src="lib/jquery-ui-1.8.18.custom.min.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/jquery.autocomplete.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/jquery.iframe.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/jscrollpane/jquery.mousewheel.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/jscrollpane/jquery.jscrollpane.js"></xhtml:script>

	<xhtml:script type="text/javascript" src="lib/jquery.carouFredSel-6.2.1.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/jquery.SuperSlide.2.1.1.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/carouFredSelHelper/jquery.touchSwipe.min.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/layer/layer.js"/>
	<!-- 
	<xhtml:script type="text/javascript" src="lib/carouFredSelHelper/jquery.transit.js"></xhtml:script>
	   -->
	<xhtml:script type="text/javascript" src="lib/carouFredSelHelper/jquery.ba-throttle-debounce.min.js"></xhtml:script>

	<xhtml:script type="text/javascript" src="lib/util.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/eventable.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/jquery.isloading.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/multiMenu/js/accordion.js"/>
	<xhtml:script type="text/javascript" src="butone/js/all.js"/>
	<xhtml:script type="text/javascript" src="index.js"/>
	
	<xhtml:script type="text/javascript"><![CDATA[
		var _config = ${config};
		_config.title_zh = "${title_zh}";
		_config.title_en = "${title_en}";
		_config.isSearch = ${isSearch};
	]]></xhtml:script>
  </xui:resource>
</xui:window>
