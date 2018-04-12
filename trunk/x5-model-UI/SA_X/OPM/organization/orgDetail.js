var orgDetail = {};

orgDetail._inputParams = {};
orgDetail._defaultInputParams = {
	openMode : null,
	id : null,
	parent : null,
	orgKindID : null 
};

orgDetail.getReadOnly = function() {
	return (!orgDetail._inputParams || orgDetail._inputParams.openMode == "view");
};

orgDetail.receiverReceive = function(event) {
	for (o in orgDetail._defaultInputParams)
		orgDetail._inputParams[o] = orgDetail._defaultInputParams[o];
	
	orgDetail._inputParams.openMode = event.data.openMode;
	if (event.data.id)
		orgDetail._inputParams.id = event.data.id;
	if (event.data.parent)
		orgDetail._inputParams.parent = event.data.parent;
	if (event.data.orgKindID)
		orgDetail._inputParams.orgKindID = event.data.orgKindID;
	
	var orgData = justep.xbl("dOrg");
	var parentData = justep.xbl("dParent");
	if (orgDetail._inputParams.openMode == "new") {
		orgData.setFilter("idFilter", "1=0");
		orgData.refreshData();

		orgData.newData();
		orgData.setValue("sParent", orgDetail._inputParams.parent);
		orgData.setValue("sOrgKindID", orgDetail._inputParams.orgKindID);
		orgData.setValue("sName", "新建" + justep.Org.OrgKinds.getLabel(orgDetail._inputParams.orgKindID));
	} else {
		orgData.setFilter("idFilter", "SA_OPOrg = '" + orgDetail._inputParams.id + "'");
		orgData.refreshData();
	}

	parentData.setFilter("idFilter", "SA_OPOrg = '" + orgData.getValue("sParent") + "'");
	parentData.refreshData();
};
orgDetail.btnCancelClick = function(event) {
	justep.windowDialogReceiver.windowCancel();
};
orgDetail.btnOKClick = function(event) {
	xforms.blur(true);
	var orgData = justep.xbl("dOrg");
	if (orgData.saveData()) {
		if (orgDetail._inputParams.openMode == "new")
			orgDetail._inputParams.id = orgData.getRowId();
		justep.windowDialogReceiver.windowEnsure(orgDetail._inputParams);
	}
};

orgDetail.btnClearClick = function(event){
	var orgData = justep.xbl("dOrg");
	orgData.setValue("sAreaId",null);
	orgData.setValue("sAreaName",null);
	orgData.setValue("sCode",null);
};

orgDetail.treeSelect1Closeup = function(event){
	var orgData = justep.xbl("dOrg");
	orgData.setValue("sCode",orgData.getValue("sAreaId")==null?"":orgData.getValue("sAreaId"));
};
