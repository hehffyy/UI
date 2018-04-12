/*! 
* WeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
* Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
*/ 
/**
 *  properties type: String, number, Boolean, array, object
 *  binds: key是DOM上的属性名称, value是收集到component中的名称
 */
define(function(require){
	return {
		properties: {
			"hScroll" : "Boolean",              
			"vScroll":"Boolean",              
			"hScrollbar":"Boolean",           
			"vScrollbar":"Boolean",           
			"fadeScrollbar":"Boolean",        
			"hideScrollbar":"Boolean",        
			"bounce":"Boolean",
			"lockDirection":"Boolean",
			"checkDOMChanges":"Boolean",
			"snap":"String",                 
			"scrollbarClass":"String",
			"pullDownLabel":"String",        
			"pullDownMoveLabel":"String",    
			"pullDownLoadingLabel":"String", 
			"pullUpLabel":"String",          
			"pullUpMoveLabel":"String",      
			"pullUpLoadingLabel":"String",
			"noMoreCanLoadLabel":"String",
			"autoPullUp":"Boolean"
		},
		events:["onScrollMove", "onScrollEnd","onPullDown","onPullUp"]
	};
});