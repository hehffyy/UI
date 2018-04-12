justep.design.mapBrowser = function(config) {
	justep.design.mapBrowser.superclass.constructor.call(this, config);
	this.resizable = false;
}

justep.extend(justep.design.mapBrowser, justep.design.Component, {
	paintContent : function(xmlNode) {
		this._currentRunKind = xmlNode.getAttribute("runKind");
		if ("frame" == this._currentRunKind) {
			this.createElement("<table id='" + this.id
					+ "' class='xui-windowFrame' ><tr>"
					+ "<td bgcolor='gray' align='center'>"
					+ "<font color='white' size='6'>"
					+ (xmlNode.getAttribute("url") || "")
					+ "</font></td></tr></table>", xmlNode);

			if (LayoutUtils.isCellLayout(this.getParentComponent())) {
				this.setProperty('class', "xui-autofill", false, true);
			}
		} else {
			var image = ComponentConfig[this.componentName].basePath
					+ "/images/dialog_icon.jpg";
			this.createElement(
					"<div class='bar-item' isViewPartContent='false'   id='"
							+ this.id + "'><img width='28' height='28'  src='"
							+ image + "'/></div>", xmlNode);
			this.element.style.position = "absolute";
			this.element.style.zIndex = "1000";
		}
		this.__$xmlNode = xmlNode;
	},
	setProperty : function(p, v, s, u) {
		justep.design.mapBrowser.superclass.setProperty.call(this, p, v, s, u);
//		if (p == "runKind") {
//			var newIsFrame = v == "frame";
//			var oldIsFrame = this._currentRunKind == "frame";
//			if(newIsFrame ^ oldIsFrame){
//				var xmlNode = this.__$xmlNode;
//				$(xmlNode).empty();
//				this.paintContent(xmlNode);
//				console.log("1231231");
//			}
//			this._currentRunKind = v;
//		}
	}
});