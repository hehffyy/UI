justep.JSTabbar=function(id){
	var $C = $("#"+id);
	this.dom = $C[0];
	this.dom.tabbar = this;
	this.tabs = $C.find(".tabItems:first")[0];
	this.tab = {};
	this.contents = $C.find(".contents:first")[0];
	this.activeId = $C.find("div[class=content selected]").attr("id");
	if(justep.Browser.hasTouch) $C.children(".jstabbar").addClass("is-touch");
	
	
	//----通过<xforms:output/>与ref绑定
	var refControl = document.getElementById(this.dom.id+"_ref"); 
	if(refControl){
		refControl.refreshCallback=function(refC){
			justep(id).style.display=refC.element.className.indexOf('xforms-disabled')!=-1?"none":"";
		};
		refControl.refreshCallback(refControl.xformsObject);
	}

	for (var i = 0; i < this.contents.children.length; i++) {
		var tabid = this.contents.children[i].id;
		this.tab[tabid] = this.contents.children[i];
		this.tab[tabid].eventObj = {};
		dhtmlxEventable(this.tab[tabid].eventObj);
		var onSelect = this.contents.children[i].getAttribute("xforms-select");
		if(onSelect && onSelect != ""){
			this.tab[tabid].eventObj.attachEvent("onSelect", eval(onSelect), this.tab[tabid]);
		}
		var onDeSelect = this.contents.children[i].getAttribute("xforms-deselect");
		if(onDeSelect && onDeSelect != ""){
			this.tab[tabid].eventObj.attachEvent("onDeSelect", eval(onDeSelect), this.tab[tabid]);
		}
		
		var refControl = document.getElementById(tabid+"_ref");
		if (refControl) {
			refControl.refreshCallback = function(refC) {			
				var me = justep(id).tabbar;
				var show = refC.element.className.indexOf('xforms-disabled') == -1;
				me.setVisable(refC.element.id.replace("_ref",""),show);
			};
			refControl.refreshCallback(refControl.xformsObject);
		}
	}

	this.onWindowResize();
};

justep.JSTabbar.prototype.onWindowResize = function() {
	$(this.tabs).height(jQuery('li:last-child', this.tabs).position().top + (justep.Browser.hasTouch?36:36));
	/*
	 * 在ie7 部分ie8, 会出现高100%不能计算出撑开高度, 只能得到内容高度.
	 * 这个是ie的缺陷,当显示出来后,再刷新获切换就可以正常了.
	 * 这就需要向上去主动计算一次高度
	 * */
	function getheight(dom){
		if(dom.style["height"]=="100%"){
			if (dom.parentNode == document || dom.nodeName == 'HTML'){
				return (justep.Browser.IE ? document.documentElement.clientHeight : window.innerHeight);
			}else{
				return getheight($(dom).parent().get(0));
			}
		}else{
			return $(dom).height();
		}
	}
	
	var h = getheight(this.dom), 
		hh = $(this.tabs).outerHeight();
	var selected = jQuery("> .selected", this.contents)[0];
	
	this.contents.style.height = Math.max(h - hh, 0) + "px";
	selected.style.height = Math.max(h - hh - 1, 0) + "px";

	$('.selected', this.tabs).css({"padding-bottom": "1px"});
	if($('>li:last-child', this.tabs).position().top > $('>.selected', this.tabs).position().top){
		$('>.selected', this.tabs).css({"padding-bottom": "0"});
	}	
};

justep.JSTabbar.prototype.getActiveID = function(){
	return this.activeId;
};

justep.JSTabbar.prototype.setTabActive = function(id){
	var tabbar = this;
	if(tabbar.tabbar){
		tabbar = tabbar.tabbar;
	}
	if(!id || tabbar.activeId==id)return;
	
	if(document.getElementById(id+'_tab').style.display=="none"){
		var msg = new justep.Message(justep.Message.JUSTEP231066, id);
		throw justep.Error.create(msg);
	}
	
	for (var i = 0,c = tabbar.contents.children.length; i < c; i++) {
		if(tabbar.contents.children[i].id==id){
			tabbar.tabs.children[i].className="selected";
			tabbar.tabs.children[i].firstChild.className="selected";
			tabbar.contents.children[i].className ="content selected";
			if($(tabbar.tabs.children[i]).position().top + 24 == $(tabbar.tabs).height()){
				$(tabbar.tabs.children[i]).css({"padding-bottom": "1px"});
			}
		}else{
			tabbar.tabs.children[i].className="";
			tabbar.tabs.children[i].firstChild.className="";
			tabbar.contents.children[i].className ="content"; 
			$(tabbar.tabs.children[i]).css({"padding-bottom": 0});
		}
	} 
	tabbar.activeId = id;
	this.onWindowResize();
	justep.XBLObject.resize(this.dom.id);
	
	if (tabbar.tab[id] && tabbar.tab[id].eventObj.checkEvent("onSelect")) {
		tabbar.tab[id].eventObj.callEvent("onSelect", [{source : tabbar.tab[id]}]);
	} 
	if (tabbar.tab[tabbar.activeId] && tabbar.tab[tabbar.activeId].eventObj.checkEvent("onDeSelect")) {
		tabbar.tab[tabbar.activeId].eventObj.callEvent("onDeSelect", [{source : tabbar.tab[tabbar.activeId]}]);
	} 
	xforms.XMLEvents.dispatch(justep(tabbar.activeId), "xforms-deselect", null, null, null, null, {target:tabbar.activeId});
	xforms.XMLEvents.dispatch(justep(id), "xforms-select", null, null, null, null, {target:id});
};

/**
 * 设置页签显示
 * @param id 页签的标识
 * @param show 隐藏or显示
 * @param activityId 如果隐藏页签为当前显示页签则切换到的页签，默认切换到下一个页签
 */
justep.JSTabbar.prototype.setVisable = function(id,show,activeId){
	var tabbar = this;
	if(tabbar.tabbar){
		tabbar = tabbar.tabbar;
	}
	
	if(show==false && tabbar.activeId == id){
		if(id == this.contents.children[0].id){
			if(activeId){
				this.setTabActive(activeId);				
			}else{
				for (var i = 1,c = this.contents.children.length; i < c; i++) {
					if(this.tabs.children[i].style.display=="none") continue;				
					this.setTabActive(this.contents.children[i].id);
					break;
				}
			}
		}else{
			this.setTabActive(activeId?activeId:tabbar.contents.children[0].id);			
		}
	}
	
	for (var i = 0,c = this.contents.children.length; i < c; i++) {
		if (this.contents.children[i].id == id) {
			this.tabs.children[i].style.display = show?"block":"none";
			this.contents.children[i].className = tabbar.activeId == id?"content selected":"content";
			return;
		}
	}
};

justep.JSTabbar.prototype.setTabIndex = function(id,value){
	return $("#"+id+"_tab button").attr("tabindex",value);
};

justep.JSTabbar.prototype.getTabIndex = function(id){
	return $("#"+id+"_tab button").attr("tabindex");
};

justep.JSTabbar.prototype.setAccessKey = function(id,value){
	return $("#"+id+"_tab button").attr("accesskey",value);
};

justep.JSTabbar.prototype.getAccessKey = function(id){
	return $("#"+id+"_tab button").attr("accesskey");
};

justep.JSTabbar.prototype.setDisabled = function(id,value){
	if(value=="false"){
		return $("#"+id+"_tab button").removeAttr("disabled");
	}else{
		return $("#"+id+"_tab button").attr("disabled",value);
	}
};

justep.JSTabbar.prototype.getDisabled = function(id){
	return $("#"+id+"_tab button").attr("disabled");
};

justep.JSTabbar.prototype.getLabel = function(id){
	return $("#"+id+"_tab button").text();
};

justep.JSTabbar.prototype.setLabel = function(id,label){
	return $("#"+id+"_tab button").text(label);
};

justep.JSTabbar.prototype.dispose = function(){
	var refControl = document.getElementById(this.dom.id+"_ref");
	if (refControl) refControl.refreshCallback = null;
	if(this.contents){
		for (var i = 0; i < this.contents.children.length; i++) {
			var tabid = this.contents.children[i].id;
			refControl = document.getElementById(tabid+"_ref");
			if (refControl) refControl.refreshCallback = null;
		}	
	}
	this.dom.tabbar = null;
	if (this.tab){
		for(var i in this.tab){
			this.tab[i].eventObj = null;
		}
	}	
	justep.XBLObject.prototype.dispose.call(this);
	
};