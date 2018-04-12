
justep.design.sign = function(config){ 
	justep.design.sign.superclass.constructor.call(this,config);

};

justep.extend(justep.design.sign, justep.design.Component,{
	
	 paintContent:function(xmlNode){  
		 
		 this.createElement("<div style='width:155px;height:21px'><table cellSpacing=0 cellPadding=0 style='height:100%px;width:100%'><tr><td><input style='height:100%;width:100%' class='xui-input' readonly='true'/></td><td style='width:60px'><button class='xforms-trigger'>签名</button></td></tr></table><div>",xmlNode);
	 }
});
