justep.design.MultiSign = function(config) {
	justep.design.MultiSign.superclass.constructor.call(this, config);

};

justep.extend(justep.design.MultiSign, justep.design.Component, {
	paintContent : function(xmlNode) {
		this.createElement("<div id='" + this.id + "'></div>", xmlNode);
		var childNodes = $(xmlNode).children();
		var l = childNodes.length;
		for ( var i = 0; i < l; i++) {
			var child = childNodes[i];
			if (child.nodeType == 1) {
				this.canvas.parseXml(child, this.element);
			}
		}
	}
});
