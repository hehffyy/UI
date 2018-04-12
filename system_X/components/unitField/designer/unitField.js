
justep.design.unitField = function(config){ 
	justep.design.unitField.superclass.constructor.call(this,config);
};

justep.extend(justep.design.unitField, justep.design.Component,{
	
	 paintContent:function(xmlNode){   
		 this.createElement("<div style='width:155px;height:21px'><table cellSpacing=0 cellPadding=0 style='height:100%;width:100%'><tr><td><input style='width:100%;height:100%' class='xui-input' readonly='true'/></td><td style='width:30px'><button class='xforms-trigger'>...</button></td></tr></table><div>",xmlNode);
	 }
});
