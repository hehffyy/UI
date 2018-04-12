justep.design.sequenceCode = function(config) {
	justep.design.sequenceCode.superclass.constructor.call(this, config);
};

justep
		.extend(
				justep.design.sequenceCode,
				justep.design.Component,
				{
					paintContent : function(xmlNode) {
						var html = "<table title='"
								+ this.componentName
								+ "' cellSpacing=0 cellPadding=0 id='"
								+ this.id
								+ "' isViewPartContent='false' class=xui-select xui-orgSelect-div'><tr><td  isViewPartContent='false'>"
								+ "<table border='0' cellpadding='0' cellspacing='0' style='height:100%;width:100%;padding-right:0px;margin-right:0px;'>"
								+ "<tr><td class='sequenceInput'></td>"
								+ "<td class='sequenceTrigger' style='width:60px;'></td></tr></table>"
								+ "</td></tr></table>";

						this.createElement(html, xmlNode);
						var td1 = $(".sequenceInput", this.element)[0], td2 = $(
								".sequenceTrigger", this.element)[0];
						var input = $(xmlNode).find("input")[0];
						this.canvas.parseXml(input, td1).ownerComponent = this;

						var trigger = $(xmlNode).find('trigger')[0];
						this.canvas.parseXml(trigger, td2).ownerComponent = this;

						this.setChildUIEditable("false");

						if (LayoutUtils.isCellLayout(this.getParentComponent())) {
							this.setProperty('class', "xui-autofill", false,
									true);
						}

					}
				});