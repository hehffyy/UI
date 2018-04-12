function generateFilterText(filter) {
	var filters = [];
	var doc = justep.XML.fromString(filter);
	if (doc != null) {
		var patterns = justep.XML.eval(doc, "/root/pattern");
		for ( var i = 0, len = patterns.length; i < len; i++) {
			var pattern = patterns[i];
			var operatorNode = justep.XML.eval(pattern, "operator", "single");
			var operator = justep.XML.getNodeText(operatorNode);
			var variableNode = justep.XML.eval(pattern, "variable", "single");
			var relation = justep.XML.getNodeText(variableNode);
			var typeNode = justep.XML.eval(pattern, "constant/@type", "single");
			var type = justep.XML.getNodeText(typeNode);
			var data1Node = justep.XML.eval(pattern, "constant/@data1",
					"single");
			var code1 = justep.XML.getNodeText(data1Node);
			var constantNode = justep.XML.eval(pattern, "constant", "single");
			var value1 = justep.XML.getNodeText(constantNode);
			var data2Node = justep.XML.eval(pattern, "constant/@data2",
					"single");
			var code2 = justep.XML.getNodeText(data2Node);
			var valueNode = justep.XML.eval(pattern, "constant/@value",
					"single");
			var value2 = justep.XML.getNodeText(valueNode);
			var linkNode = justep.XML.eval(pattern, "link", "single");
			var link = justep.XML.getNodeText(linkNode);

			var filterExpr = {
				relation : relation,
				relationType : type,
				operator : operator,
				value1 : value1,
				code1 : code1,
				value2 : value2,
				code2 : code2,
				link : link
			};
			filters.push(filterExpr);
		}
	}
	return filters;
}

function queryFilterPatternData(data) {
	if (typeof (data) == "string") {
		data = justep.xbl(data);
	}
	var process = data.getProcess();
	var activity = data.getActivity();
	var dataId = data.id;

	var filter = "((SA_FilterPattern.sProcess='" + process
			+ "') AND (SA_FilterPattern.sActivity='" + activity
			+ "') AND (SA_FilterPattern.sInstance='" + dataId
			+ "') AND (SA_FilterPattern.sPerson=:currentPersonID()))";

	var param = new justep.Request.ActionParam();
	param.setInteger("offset", 0);
	param.setInteger("limit", 9999);
	param
			.setString(
					"columns",
					"version,sName,sPerson,sProcess,sActivity,sInstance,sContent,sOrderNum,SA_FilterPattern");
	param.setString("orderBy", "SA_FilterPattern.sOrderNum ASC");
	param.setString("filter", filter);
	param.setBoolean("distinct", false);
	var translateParam = new justep.Request.TranslateParam();
	translateParam.rowOption.concept = "SA_FilterPattern";
	translateParam.rowOption.sequence = "sName,sContent";
	return justep.Request.sendBizRequest(
			"/SA/filterPattern/filterPatternProcess", "mainActivity",
			"queryFilterPatternAction", param, translateParam, null, true);
}

function showFilterPatternMenu(data, menuId, controlId, dialogId) {
	var menu = justep(menuId).xformsObject;
	menu.menu.filterData = data;
	menu.menu.filterDlgId = dialogId;

	if (typeof (menu.menu.$needLoad) == "undefined") {
		menu.menu.$needLoad = true;
	}

	if (menu.menu.$needLoad) {
		var menuData = queryFilterPatternData(data);

		menu.menu.forEachItem(function(item) {
			menu.menu.removeItem(item);
		});

		var ii = 0;
		if (dialogId) {
			var manageItem = new xforms.XFMenuItem("zdycx", null,
					(new justep.Message(justep.Message.JUSTEP231035))
							.getMessage());
			manageItem.pos = ii++;
			menu.addItem(manageItem);
		}

		var menuItems = justep.XML.eval(menuData.responseXML, "//rows/row");
		var count = menuItems.length + ii;
		for ( var i = ii; i < count; i++) {
			var menuItem = menuItems[i - ii];
			var menuId = justep.XML.getNodeText(justep.XML.eval(menuItem,
					"@id", "single"));
			var menuName = justep.XML.getNodeText(justep.XML.eval(menuItem,
					"cell[1]", "single"));
			var menuExpr = justep.XML.getNodeText(justep.XML.eval(menuItem,
					"cell[2]", "single"));

			var newItem = new xforms.XFMenuItem(menuId, null, "[" + menuName
					+ "]");
			newItem.filterExpr = menuExpr;
			newItem.pos = i;
			menu.addItem(newItem);
			$(newItem.element).css("color", "#1963AA");
		}

		var manageItem = new xforms.XFMenuItem("qkdqgl", null,
				(new justep.Message(justep.Message.JUSTEP231036)).getMessage());
		manageItem.pos = count;
		menu.addItem(manageItem);
		menu.menu.addNewSeparator("qkdqgl");

		var manageItem = new xforms.XFMenuItem("glglms", null,
				(new justep.Message(justep.Message.JUSTEP231037)).getMessage());
		manageItem.pos = count + 2;
		menu.addItem(manageItem);

		menu.menu.$needLoad = false;
	}

	menu.show(controlId);
}