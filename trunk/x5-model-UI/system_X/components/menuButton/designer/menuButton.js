justep.design.MenuButton = function(config){ 
	justep.design.MenuButton.superclass.constructor.call(this,config);
};

justep.extend(justep.design.MenuButton, justep.design.Component,{
	 paintContent:function(xmlNode){
	 	this.createElement("<div class='menuButton' id='"+this.id+"'><a class='head' href='#'><span class='label'></span><span class='arr'></span></a></div>", xmlNode);
	 	
	 	this.label = xmlNode.getAttribute("label");
	 	
	 	$('.head .label', this.element).html(this.label);
	 	this.paintChild(xmlNode);
/*	 	
	 	var nodes = $(xmlNode).children();
	    for(var i = 0,l=nodes.length;i<l;i++){
//	    	if(nodes[i].nodeType == 1 && nodes[i].tagName == 'label'){
//	    		this.label = nodes[i].text;
//	    	}
	    }
	    this.label = this.label||xmlNode.getAttribute("label")||this.getDefaultLabel(); 
	    var imgSrc = xmlNode.getAttribute("src");
	    if(imgSrc != null) this.imageICON = this.transToAbsolutePath(imgSrc);
	    else this.imageICON = this.getDefaultImg();
	    
	    var css;
	    if(LayoutUtils.isCellLayout(this.getParentComponent())){
	    	var css = "xui-autofill";
	    	this.setProperty('class',css,false,true);
	    }
	    this.mode = xmlNode.getAttribute("image-text-mode");
	    this.setProperty("appearance",xmlNode.getAttribute("appearance"));
	    //alert($(this.element).html());
*/	    
	 },
	 setProperty:function(p,v,s,u){
		 if(p == 'label'){
			 this.label = v;
			 $('.head .label', this.element).html(v); 
		 }
/*		 
		justep.design.Trigger.superclass.setProperty.call(this, p,v,s,u);
		if(p=="src"){
			if(v)this.imageICON = this.transToAbsolutePath(v);
			else this.imageICON = this.getDefaultImg();
			this.setProperty("appearance", this.appearance);
		}else if(p=="appearance"){
	 		this.appearance = v;
	 		if(v=="minimal"){
	 			$(this.element).addClass("xui-button");
	 			this.element.innerHTML = "<a href='javascript:void(0)' class='xui-button-label'><span>"+this.label+"</span></a>";
	 		}else if(v=="image"){
	 			$(this.element).addClass("xui-button");
	 			this.element.innerHTML="<button class='xui-button-image'></button>";
	 			$("button", this.element).append(("<span alt='"+this.label+"'></span>"));
	 			if(this.imageICON){
	 				$("button span", this.element).css({
	 					"background-image": "url(" + this.imageICON + ")"
	 				});
	 			}
	 		}else if(v=="image-text"){
	 			this.setProperty("image-text-mode", this.mode);
	 		}else{
	 			$(this.element).addClass("xui-button");
	 			this.element.innerHTML="<button class='xui-button-label'><span>"+this.label+"</span></button>";
	 		}
	 	}else if(p == 'label'){
	 		this.label = v;
			if(this.appearance=="image"){
				$("span", this.element).alt = v;
			}else{
				$(this.element).find(".xui-button-label span").text(v);
			}
	 	}else if(p == 'image-text-mode'){
	 		this.mode = v;
	 		if(this.appearance=="image-text"){
	 			$(this.element).addClass("xui-button");
	 			if(!this.mode || this.mode == "LR"){
	 				this.element.innerHTML="<button class='xui-button-label xui-button-image-label'><span>"+this.label+"</span></button>";
	 			}else{
	 				this.element.innerHTML="<button class='xui-button-label xui-button-image-label xui-button-image-top'><span>"+this.label+"</span></button>";
	 			}
	 		}
	 	}
*/	 		 	
	 }	 
});

justep.design.MenuItem = function(config){ 
	justep.design.MenuItem.superclass.constructor.call(this,config);
};

justep.extend(justep.design.MenuItem, justep.design.Component,{
	 paintContent:function(xmlNode){
		 
	 }	 
});