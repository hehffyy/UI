justep.design.XFormSelect = function(config){ 
	this.regAttributes(["disabled","readonly"]);
	justep.design.XFormSelect.superclass.constructor.call(this,config);
}

justep.extend(justep.design.XFormSelect, justep.design.Component,{
	 paintContent:function(xmlNode){ 
	    if(!this.element){
	    	var className = xmlNode.getAttribute("class");
	    	className = className == null?"":className;
	        this.createElement("<span id='"+this.id+"' class='"+className+"'/>",xmlNode);
	    }else{
	    	this.element.innerHTML = "";
	    }
	    var children = $(xmlNode).children();
	    for(var i=0;i<children.length;i++){
			if (children[i].nodeType == 1) {
				hasChild = true;
				this.canvas.parseXml(children[i], this.element);
			}
		}
	},
	
	setProperty:function(prop,v,s,u){
		justep.design.Td.superclass.setProperty.call(this, prop,v,s,u);
		if(prop=='class'){
			this.element.className = v;
		}
	}
});

justep.design.SelectItem = function(config){
	justep.design.SelectItem.superclass.constructor.call(this,config);
	this.allowDraging = false;
	this.allowMoveToOtherParent = false;	
	this.allowAddChild = false;	
}

justep.extend(justep.design.SelectItem, justep.design.Component,{
	 paintContent:function(xmlNode){ 
	 	this.imagePath = ComponentConfig[this.componentName].basePath + "/images/";
	 	var label = $(xmlNode.getElementsByTagName("label")[0]).text();
	 	var type = xmlNode.parentNode.tagName=="select"?"checkbox":"radio";
	    this.createElement("<div class='select-item' ><input uiEditable='false' readonly='true' type='"+type+"' style='border:none'/><span uiEditable='false'>"+label+"</span></div>",xmlNode);
		this.labelSpan = $(this.element).lastElement();
		this.element.uiEditable= false;
	},
	
	setProperty:function(prop,v,s,u){
		justep.design.Td.superclass.setProperty.call(this, prop,v,s,u);
		if(prop=='label'){
			this.labelSpan.innerHTML = v;
		}
	}
});





