justep.design.FileExport = function(config) {
	justep.design.FileExport.superclass.constructor.call(this, config);
	this.resizable = false;
};

justep.extend(justep.design.FileExport, justep.design.Component, {

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
