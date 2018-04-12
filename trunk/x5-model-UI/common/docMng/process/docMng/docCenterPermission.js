var docCenterPermission = {};
var folderID;

justep.windowDialogReceiver.acceptParentParamsFun = function(event) {
	var data = event.data;
	folderID = data.folderID;
	var docAuthList = justep.xbl("docAuth");
	docAuthList.filters.setFilter("docPathFilter", "fFolderID='" + folderID
			+ "'");
	docAuthList.refreshData();
}

function newDocAuth(event) {
	if (event) {
		var item = event.getData().menuitem;
		if ("org" == item.value) {
			justep.xbl("orgPermissionDialg").open();
			// justep.xbl("orgSelectDialog").open();
		} else if ("person" == item.value) {
			justep.xbl("personPermissionDialg").open();
			// justep.xbl("personSelectDialog").open();
		}
	}
}

function docAuthListGridInit(event) {
	event.source.grid.initXFCalculate = true;
}

docCenterPermission.trigger1Click = function(event) {
	var targetEle = event.srcElement || event.target;
	xforms("newAuthMenu").show(targetEle.id);
};

docCenterPermission.trigger5Click = function(event) {
	justep.windowDialogReceiver.windowCancel()
};

docCenterPermission.orgPermissionDialgReceive = function(event) {
	if (!event.data[0])
		return;
	var orgName = event.data[0].sName;
	var orgCode = event.data[0].sFID;
	if (orgName && orgCode) {
		var docAuthList = justep.xbl("docAuth");
		docAuthList.newData();
		var rowId = docAuthList.getCurrentRowId();
		docAuthList.setValue("fOrgName", orgName, rowId);
		docAuthList.setValue("fOrgFID", orgCode, rowId);
		docAuthList.setValue("fOrgKind", "部门", rowId);
		docAuthList.setValue("fFolderID", folderID, rowId);
	}
};

docCenterPermission.personPermissionDialgReceive = function(event) {
	if (!event.data[0])
		return;
	var personName = event.data[0].sName;
	var personCode = event.data[0].sFID;
	if (personName && personCode) {
		var docAuthList = justep.xbl("docAuth");
		docAuthList.newData();
		var rowId = docAuthList.getCurrentRowId();
		docAuthList.setValue("fOrgName", personName, rowId);
		docAuthList.setValue("fOrgFID", personCode, rowId);
		docAuthList.setValue("fOrgKind", "人员", rowId);
		docAuthList.setValue("fFolderID", folderID, rowId);
	}
};
