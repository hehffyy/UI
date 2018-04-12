justep.design.PrintForm = function(config){ 
	justep.design.PrintHtml.superclass.constructor.call(this,config);	
};

justep.extend(justep.design.PrintForm, justep.design.Trigger,{
	 getDefaultImg:function(){
		   var basePath =  ComponentConfig[this.componentName].basePath;
			return basePath+"/images/print.gif"; 
		 },
		 getDefaultLabel:function(){
			return "打印"; 
		 }
});

 