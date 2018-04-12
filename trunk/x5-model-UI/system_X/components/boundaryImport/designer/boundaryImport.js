justep.design.boundaryImport = function(config) {
	justep.design.boundaryImport.superclass.constructor.call(this, config);
	this.resizable=false; 
};

justep.extend(justep.design.boundaryImport, justep.design.Component, {

	paintContent : function(xmlNode) {
		var image = ComponentConfig[this.componentName].basePath
				+ "/images/import.gif";
		this.createElement(
				"<div class='bar-item' isViewPartContent='false' id='"
						+ this.id + "'><img width='30' height='30'  src='"
						+ image + "'/></div>", xmlNode);
		this.element.style.position = "absolute";
		this.element.style.zIndex = "1000";
	}
});
