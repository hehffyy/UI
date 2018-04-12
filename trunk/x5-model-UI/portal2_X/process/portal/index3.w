<?xml version="1.0" encoding="utf-8"?>

<xui:window xmlns:xui="http://www.justep.com/xui" xmlns="http://www.w3.org/1999/xhtml"
  xmlns:xhtml="http://www.w3.org/1999/xhtml" xmlns:xforms="http://www.justep.com/xforms" component="/UI/system/components/window.xbl.xml#window" xmlns:ev="http://www.w3.org/2001/xml-events" timeout-window="/UI/portal2/process/portal/login.w">  
  <xui:inhead>
  	<xhtml:title>广州省国土资源厅电子政务系统</xhtml:title>
	<xhtml:meta id="viewport" name="viewport" content="initial-scale=1.0,user-scalable=yes,width=1024"/>
  </xui:inhead>
  <xui:view id="rootView" auto-load="true"> 
    <xui:layout style="height:100%;width:100%;min-width:1080px;" id="rootLayout" > 
    <div id="main">
    <div id="topPanel">
			<div id="setting">
				<div id="page1" style="height:100%;">
					<div style="width: 40%; height:100%;float:right;border-left: 1px solid #999;">
						<div id="reset_pwd"></div>
					</div>
					<div style="width: 30%; height:100%;float:right;border-left: 1px solid #999;">
						<div id="advanced_set"></div>
						
					</div>
				</div>
				<div id="page2" style="height:100%;">
					<div style="height:100%;">
						<div id="portal_set"></div>
					</div>
				</div>
				<div id="page3">
					<span style="font-size: 64px;color: white;"></span>
				</div>
			</div>
		</div>
		<div class="head">
			<div class="brand">
				<div class="logo"/>
				<div class="bar">
					<div>
						<ul>
						<li class="rightNav">
							<span class="search">
								<input type="text" placeholder="全文搜索..."></input>
								<button class="myIcon-search js-myIcon-search"></button>
							</span>
						</li>	
						<li class="user rightNav">
							<span class="myIcon-ring name"></span>
						</li>
						<li class="rightNav">
							<span class="myIcon-note name">
								<span class="badge">3</span>
							</span>
							<ul class="js-short cons">
								<li><i class="myIcon-upArrow"></i></li>
								<li><span>21</span>办件</li>
								<li><span>1</span>收件</li>
								<li><span>3</span>阅件</li>
							</ul>
						</li>
						<li class="rightNav">
							<button id="setting-btn" class="myIcon-setting"></button>
						</li>
						<li class="rightNav">
							<button id="logout" class="myIcon-close"></button>
						</li>
						<li class="rightNav">
							<button class="myIcon-downArrow"></button>
							<ul class="js-other cons">
								<li><i class="myIcon-upArrow"></i></li>
								<li>收藏<span>21</span></li>
								<li>主题<span>2</span></li>
								<li><span></span>帮助</li>
							</ul>
						</li>
					</ul>
					</div>
				</div>
			</div>
			<!-- ie7 x-index bug -->
			<!-- 
			<div class="fun-map clearfix" id="cv2" style="position:relative;z-index: 4;"></div>
			 -->
			<div id="b3" style="z-index: 3"></div>
		</div>
		<div class="content" style="position:relative">
		<div id="b1"></div>
			<!--<div id="b2" style="z-index: 2"></div>-->
			<div class="fun-map" id="cv1" style="z-index: 1"></div>
			<div id='portal1'>
			<iframe frameborder="0" width="100%" height="500px" src="/UI/GZMOI/homepage/process/homeWidgets/index.html"></iframe>
			</div>
		</div>
		</div>
		
		<div id="funcFrame">
			<div class="left js-menu"></div>
			<div class="func">
				<iframe frameborder="0"></iframe>
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
  	<xhtml:link rel="stylesheet" type="text/css" href="components/flagbar/flagbar.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/functreeview/funcTreeView.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/functreemenu/funcTreeMenu.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="/form/justep/showMessage.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/sortablebar/sortablebar.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/scrollbar/scrollbar.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/quicklist/quicklist.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/portalview/portalView.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/portalview/widgetlayout.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/accordion/accordion.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/funcframe3/funcFrame3.css"/>
  	<!-- 
  	<xhtml:link rel="stylesheet" type="text/css" href="components/funcportal/FuncPortal.css"/>
  	 -->
  	<xhtml:link rel="stylesheet" type="text/css" href="components/accordionmenutree/accordionMenuTree.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/agentlist/agentlist.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/dialog/dialog.css"/>
  	<xhtml:link rel="stylesheet" type="text/css" href="components/reminder/reminder.css"/>
	<xhtml:link rel="stylesheet" type="text/css" href="index3.css"/> 

	<xhtml:link rel="stylesheet" type="text/css" href="lib/jscrollpane/jquery.jscrollpane.css"/>
	<xhtml:link rel="stylesheet" type="text/css" href="lib/superfish/css/superfish.css"/>
	<xhtml:link rel="stylesheet" type="text/css" href="components/functreemenu/functreemenu.css"/>
	
	<xhtml:script type="text/javascript" src="lib/md5.js"/>
	<!-- 
	<xhtml:script type="text/javascript" src="/base/base.js"/>
	 -->
	<xhtml:script type="text/javascript" src="/form/justep/showMessage.js"/>
	
	
	<xhtml:script type="text/javascript" src="lib/api.js"/>
	<xhtml:script type="text/javascript" src="lib/jquery-ui-1.8.18.custom.min.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/jquery.iframe.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/jscrollpane/jquery.mousewheel.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/jscrollpane/jquery.jscrollpane.js"></xhtml:script>

	<xhtml:script type="text/javascript" src="lib/jquery.carouFredSel-6.2.1.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/carouFredSelHelper/jquery.touchSwipe.min.js"></xhtml:script>
	<!-- 
	<xhtml:script type="text/javascript" src="lib/carouFredSelHelper/jquery.transit.js"></xhtml:script>
	   -->
	<xhtml:script type="text/javascript" src="lib/carouFredSelHelper/jquery.ba-throttle-debounce.min.js"></xhtml:script>

	 
	<xhtml:script type="text/javascript" src="lib/util.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="lib/eventable.js"></xhtml:script>
	<xhtml:script type="text/javascript" src="components/all3.js"/>
	<xhtml:script type="text/javascript" src="lib/jquery.isloading.js"></xhtml:script>
	  
	<xhtml:script type="text/javascript" src="index3.js"/>
	<xhtml:script type="text/javascript"><![CDATA[
		var _config = ${config};
	]]></xhtml:script>
  </xui:resource>
</xui:window>
