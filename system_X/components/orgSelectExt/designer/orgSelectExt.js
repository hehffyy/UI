
justep.design.orgSelectExt = function(config){ 
	justep.design.orgSelectExt.superclass.constructor.call(this,config);
};

justep.extend(justep.design.orgSelectExt, justep.design.Component,{
	
	 paintContent:function(xmlNode)
	 {   
		 this.createElement("<div style='width:155px;height:21px'><table cellSpacing=0 cellPadding=0 style='height:100%;width:100%'><tr><td><input style='width:100%' class='xui-input' readonly='true'/></td><td style='width:48px'><button class='xforms-trigger'>选择</button></td></tr></table><div>",xmlNode);
	 }
});
