var mainActivity = {};

mainActivity.gridOrgTreeShowNodeImg = function(event) {
	var orgKind = event.grid.getValueById(event.rowID, "sOrgKindID");
	var validState = event.grid.getValueById(event.rowID, "sValidState");
	if (justep.OpmUtils.isTreeRoot(event.rowID)) {
		orgKind = "root";
		validState = 1;
	}
	return justep.Org.OrgKinds.getImageURL(orgKind, validState == 0);
};

mainActivity.refreshNewItemsMenu = function() {
	var newMenu = xforms("newItemsMenu").menu;
	var dOrgTree = justep.xbl("dOrgTree");
	var parentOrgKindID = justep.OpmUtils.isTreeRoot(dOrgTree.getID()) ? "root"
			: dOrgTree.getValue("sOrgKindID");

	var orgKindIDs = justep.Org.OrgKinds.getIDs();
	for ( var i = 0; i < orgKindIDs.length; i++) {
		var orgKindID = orgKindIDs[i];
		if (parentOrgKindID == "root" && justep.Org.OrgKinds.isRoot(orgKindID)) {
			newMenu.setItemEnabled(orgKindID);
		} else if (justep.Array.indexOf(justep.Org.OrgKinds
				.getParents(orgKindID), parentOrgKindID) != -1) {
			newMenu.setItemEnabled(orgKindID);
		} else {
			newMenu.setItemDisabled(orgKindID);
		}
	}

	if (justep.Array.indexOf(justep.Org.OrgKinds
			.getParents(justep.Org.OrgKinds.ORGKIND_PERSONMEMBER),
			parentOrgKindID) != -1) {
		newMenu.setItemEnabled("assignPerson");
	} else {
		newMenu.setItemDisabled("assignPerson");
	}
};

mainActivity.btnInsertMoreClick = function(event) {
	mainActivity.refreshNewItemsMenu();
	xforms("newItemsMenu").show(event.srcElement || event.target);
};

mainActivity.dOrgTreeAfterRefresh = function(event) {
	xforms("newItemsMenu").hide();
	mainActivity.refreshListData();
};

mainActivity.dOrgTreeIndexChanged = function(event) {
	xforms("newItemsMenu").hide();
	mainActivity.refreshListData();
};

mainActivity.dOrgListAfterRefresh = function(event) {
	mainActivity.setComponentsStatus();
};

mainActivity.dOrgListAfterRefreshPage = function(event) {
	mainActivity.setComponentsStatus();
};

mainActivity.dOrgListIndexChanged = function(event) {
	mainActivity.setComponentsStatus();
};

mainActivity.gridOrgListSOrgKindIDRender = function(event) {
	var orgKind = event.value;
	var disable = (event.cell.getValueByColId("sValidState") != 1);
	var isMasterPsm = (event.cell.getValueByColId("sParent") == event.cell
			.getValueByColId("personMainOrgID"));
	return "<img src='"
			+ justep.Request.convertURL(justep.OpmUtils.getOrgImgURL(orgKind,
					disable, isMasterPsm)) + "' alt='"
			+ justep.Org.OrgKinds.getLabel(orgKind) + "'/>";
};

mainActivity.gridOrgTreeCellHint = function(event) {
	var rowIndex = event.grid.getRowIndex(event.rowId);
	return event.grid.getValueByName("sFName", rowIndex);
};

mainActivity.btnEditClick = function(event) {
	var dOrgList = justep.xbl("dOrgList");
	if (dOrgList.getID() == "")
		return;
	var orgKind = dOrgList.getValue("sOrgKindID");
	if (orgKind != "psm")
		justep.xbl("wdOrgDetail").open({
			"openMode" : "edit",
			"id" : dOrgList.getID()
		});
	else
		justep.xbl("wdPersonDetail").open({
			"openMode" : "edit",
			"personID" : dOrgList.getValue("sPersonID"),
			"orgID" : dOrgList.getValue("sParent")
		});
};

mainActivity.newItemsMenuClick = function(event) {
	var dOrgTree = justep.xbl("dOrgTree");
	var menuItemID = event.getData().itemId;
	var parentID = (justep.OpmUtils.isTreeRoot(dOrgTree.getID()) ? ""
			: dOrgTree.getID());

	if (menuItemID == "assignPerson") {
		justep.xbl("wdAssignPerson").open();
	} else if (justep.Org.OrgKinds.isPersonMember(menuItemID)) {
		justep.xbl("wdPersonDetail").open({
			"openMode" : "new",
			"orgID" : parentID
		});
	} else if (justep.Array.indexOf(justep.Org.OrgKinds.getIDs(), menuItemID) != -1) {
		justep.xbl("wdOrgDetail").open({
			"openMode" : "new",
			"orgKindID" : menuItemID,
			"parent" : parentID
		});
	}
};

mainActivity.wdAssignPersonReceive = function(event) {
	var dOrgTree = justep.xbl("dOrgTree");
	var orgID = justep.OpmUtils.isTreeRoot(dOrgTree.getID()) ? null : dOrgTree
			.getID();
	var personIDs = new justep.Request.ListParam();

	for ( var i = 0; i < event.data.length; i++) {
		var personID = event.data[i]["sPersonID"];
		personIDs.add(new justep.Request.SimpleParam(personID,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
	}

	var params = new justep.Request.ActionParam();
	params.setList("personIDs", personIDs);
	if (orgID)
		params.setString("orgID", orgID);
	params.setInteger("psmValidState", 1);
	params.setBoolean("autoEnableOldPsm", false);
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "assignPersonAction",
		parameters : params,
		callback : function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				mainActivity.refreshListData();
				justep.OpmUtils.showSuccess("分配人员成功。");
			}
		}
	});
};

mainActivity.wdOrgDetailReceive = function(event) {
	mainActivity.resetTreeNode();
	mainActivity.refreshListData(event.data.id);
};

mainActivity.wdPersonDetailReceive = function(event) {
	if (event.data.openMode == "new") {
		justep.OpmUtils
				.showSuccess("新建人员成功。<br/><br/>“"
						+ event.data.name
						+ "”的初始密码为：<span style='color:#FF0000;font-size:16px;font-weight:bold;'>"
						+ event.data.passwordClearText
						+ "</span>。<br/><br/>请通知“" + event.data.name
						+ "”尽快修改密码！");
	}
	mainActivity.resetTreeNode();
	mainActivity.refreshListData(justep.OpmUtils.formatPsmID(
			event.data.personID, event.data.orgID));
};

mainActivity.resetTreeNode = function(rowID) {
	var dOrgTree = justep.xbl("dOrgTree");
	justep.OpmUtils.resetTreeNode(dOrgTree, rowID);
};

mainActivity._isTreeRefreshing = false;
mainActivity.refreshTreeData = function() {
	var dOrgTree = justep.xbl("dOrgTree");
	var isShowDisabled = document.getElementById("cbShowDisabled").checked;
	if (isShowDisabled)
		dOrgTree.setFilter("disableFilter", "SA_OPOrg.sValidState in (0, 1)");
	else
		dOrgTree.setFilter("disableFilter", "SA_OPOrg.sValidState = 1");

	var gridOrgTree = justep.xbl("gridOrgTree").grid;
	var oldIDPath = justep.OpmUtils.getTreeGridIdPath(gridOrgTree);
	var oldIndex = dOrgTree.getIndex(dOrgTree.getID());

	mainActivity._isTreeRefreshing = true;
	try {
		dOrgTree.refreshData();
		if (oldIndex <= 0 && !!dOrgTree.getID())
			dOrgTree.expandRow(dOrgTree.getID());
		else
			dOrgTree.expandTreeByIdPath(oldIDPath);
	} finally {
		mainActivity._isTreeRefreshing = false;
		mainActivity.refreshListData();
	}
};

mainActivity.refreshListData = function(id) {
	var dOrgList = justep.xbl("dOrgList");
	var dOrgTree = justep.xbl("dOrgTree");

	if (mainActivity._isTreeRefreshing)
		return;

	var isShowAllChildren = document.getElementById("cbShowAllChildren").checked;
	if (justep.OpmUtils.isTreeRoot(dOrgTree.getID())) {
		if (isShowAllChildren)
			dOrgList.setFilter("parentFilter", "");
		else
			dOrgList.setFilter("parentFilter", "SA_OPOrg.sParent is null");
	} else if (!dOrgTree.getID()) {
		dOrgList.setFilter("parentFilter", "1=0");
	} else {
		if (isShowAllChildren)
			dOrgList.setFilter("parentFilter", "SA_OPOrg.sFID like '"
					+ dOrgTree.getValue("sFID") + "/%'");
		else
			dOrgList.setFilter("parentFilter", "SA_OPOrg.sParent = '"
					+ dOrgTree.getID() + "'");
	}

	var isOnlyShowMasterPsm = document.getElementById("cbOnlyShowMasterPsm").checked;
	if (isOnlyShowMasterPsm)
		dOrgList
				.setFilter("masterPsmFilter",
						"SA_OPOrg.sOrgKindID <> 'psm' or SA_OPOrg.sParent = SA_OPPerson.sMainOrgID");
	else
		dOrgList.setFilter("masterPsmFilter", "");

	var isShowDisabled = document.getElementById("cbShowDisabled").checked;
	if (isShowDisabled)
		dOrgList.setFilter("disableFilter", "SA_OPOrg.sValidState in (0, 1)");
	else
		dOrgList.setFilter("disableFilter", "SA_OPOrg.sValidState = 1");

	var displayOrgKinds = justep.xbl("dTemp").getValue("listOrgKinds");
	if (displayOrgKinds) {
		dOrgList.setFilter("orgKindsFilter", "SA_OPOrg.sOrgKindID in ('"
				+ displayOrgKinds.split(",").join("','") + "')");
	} else
		dOrgList.setFilter("orgKindsFilter", "");

	var searchText = $("#inputSearchList").val();
	if (!justep.OpmUtils.checkSearchText(searchText, true)) {
		$("#inputSearchList").val("");
		searchText = "";
	}

	if (!!searchText)
		dOrgList
				.setFilter(
						"searchFilter",
						justep.OpmUtils
								.getMultiLikeFilter(
										"SA_OPOrg.sName,SA_OPOrg.sCode,SA_OPPerson.sSex,SA_OPPerson.sIDCard",
										searchText));
	else
		dOrgList.setFilter("searchFilter", "");

	dOrgList.refreshData();
	if (id && dOrgList.getID() != id) {
		dOrgList.setIndex(dOrgList.getIndex(id));
	}
};

mainActivity.model1ModelConstructDone = function(event) {
	mainActivity.initOrgKindsData();
	mainActivity.initNewOrgMenu();
	mainActivity.refreshTreeData();
};

mainActivity.initOrgKindsData = function() {
	var dOrgKinds = justep.xbl("dOrgKinds");
	var orgKindIDs = justep.Org.OrgKinds.getIDs();
	for ( var i = 0; i < orgKindIDs.length; i++) {
		var orgKindID = orgKindIDs[i];
		dOrgKinds.newData({
			"index" : i,
			"defaultValues" : [ {
				"id" : orgKindID,
				"label" : justep.Org.OrgKinds.getLabel(orgKindID)
			} ]
		});
	}
};

mainActivity.initNewOrgMenu = function() {
	var orgKindIDs = justep.Org.OrgKinds.getIDs();
	for ( var i = 0; i < orgKindIDs.length; i++) {
		var orgKindID = orgKindIDs[i];
		var label = justep.Org.OrgKinds.getLabel(orgKindID);
		var menuItem = new xforms.XFMenuItem(orgKindID, null, "新建" + label,
				false, null, i, null, justep.Org.OrgKinds
						.getImageURL(orgKindID), justep.Org.OrgKinds
						.getImageURL(orgKindID, false, true));
		justep.xbl("newItemsMenu").addItem(menuItem);
	}
};

mainActivity.setComponentsStatus = function() {
	var dOrgTree = justep.xbl("dOrgTree");
	var dOrgList = justep.xbl("dOrgList");

	var treeValidState = dOrgTree.getValue("sValidState");
	var listRowID = dOrgList.getID();
	var listValidState = dOrgList.getValue("sValidState");
	var listOrgKind = dOrgList.getValue("sOrgKindID");

	justep.xbl("btnInsertMore").setDisabled(
			!justep.OpmUtils.isTreeRoot(dOrgTree.getID())
					&& (treeValidState == 0));
	justep.xbl("btnEdit").setDisabled(!listRowID);

	justep.xbl("btnSort").setDisabled(!listRowID);
	justep.xbl("btnMove").setDisabled(!listRowID);

	justep.xbl("menuButton1").setDisabled('itemAuthorize', !listRowID);
	justep.xbl("menuButton1").setDisabled('itemEnable',
			!listRowID || listValidState == 1);
	justep.xbl("menuButton1").setDisabled('itemDisable',
			!listRowID || listValidState == 0);
	justep.xbl("menuButton1").setDisabled('itemLogicDelete', !listRowID);
	justep.xbl("menuButton1").setDisabled('itemResetPassword',
			!listRowID || listOrgKind != "psm");
	justep.xbl("menuButton1").setDisabled('itemChangeMainOrg',
			!listRowID || listOrgKind != "psm");
	justep.xbl("menuButton1").setDisabled('itemPersonSignImg',
			!listRowID || listOrgKind != "psm");

};

mainActivity.btnEnableClick = function(event) {
	var dOrgList = justep.xbl("dOrgList");
	var id = dOrgList.getID();
	var name = dOrgList.getValue("sName");
	var version = dOrgList.getValue("version");
	var orgKind = dOrgList.getValue("sOrgKindID");
	var isMasterPsm = (dOrgList.getValue("sParent") == dOrgList
			.getValue("personMainOrgID"));
	var personValidState = dOrgList.getValue("personValidState");
	var personID = dOrgList.getValue("personID");

	if (orgKind != "psm" || isMasterPsm || personValidState == 1) {
		justep.OpmUtils
				.showConfirm(
						"确实要启用“"
								+ name
								+ "”吗？"
								+ (orgKind != "psm" ? "<br/><br/>“启用”操作会同时启用选中组织的所有下级组织。"
										: ""), function(e) {
							var params = new justep.Request.ActionParam();
							params.setString("id", id);
							params.setInteger("version", version);
							params.setBoolean("enableSlavePsm", false);
							justep.Request.sendBizRequest2({
								dataType : "json",
								action : "enableOrgAction",
								parameters : params,
								callback : function(callbackData) {
									callbackData.ignoreError = false;
									if (callbackData.state) {
										if (orgKind != "psm")
											mainActivity.resetTreeNode();
										mainActivity.refreshListData();
										justep.OpmUtils.showSuccess("启用“"
												+ name + "”成功。");
									}
								}
							});
						});
	} else {
		justep.OpmUtils.showConfirm("“" + name + "”"
				+ "的主岗位已被禁用，在启动当前岗位时会同时启用主岗位。" + "<br/><br/>确实要启用“" + name
				+ "”的主岗位和当前岗位吗？", function(e) {
			var params = new justep.Request.ActionParam();
			params.setString("psmID", id);
			params.setInteger("psmVersion", version);
			params.setString("personID", personID);
			justep.Request.sendBizRequest2({
				dataType : "json",
				action : "enableSlavePsmAction",
				parameters : params,
				callback : function(callbackData) {
					callbackData.ignoreError = false;
					if (callbackData.state) {
						mainActivity.refreshListData();
						justep.OpmUtils.showSuccess("启用“" + name + "”成功。");
					}
				}
			});
		});
	}
};

mainActivity.btnDisableClick = function(event) {
	var dOrgList = justep.xbl("dOrgList");
	var id = dOrgList.getID();
	if (mainActivity.checkCurrentPerson(dOrgList.getValue("sFID"))) {
		justep.OpmUtils.showWarning("你不能禁用自己和自己的上级组织！");
		return;
	}

	var name = dOrgList.getValue("sName");
	var version = dOrgList.getValue("version");
	var orgKind = dOrgList.getValue("sOrgKindID");
	var isMasterPsm = (dOrgList.getValue("sParent") == dOrgList
			.getValue("personMainOrgID"));

	justep.OpmUtils
			.showConfirm(
					"确实要禁用“"
							+ name
							+ "”吗？"
							+ (orgKind != "psm" ? "<br/><br/>“禁用”操作会禁用选中组织及其所有下级组织。"
									: "")
							+ ((orgKind == "psm" && isMasterPsm) ? "<br/><br/>禁用人员的主岗位会同时禁用人员的所有其他岗位。"
									: ""), function(e) {
						var params = new justep.Request.ActionParam();
						params.setString("id", id);
						params.setInteger("version", version);
						justep.Request.sendBizRequest2({
							dataType : "json",
							action : "disableOrgAction",
							parameters : params,
							callback : function(callbackData) {
								callbackData.ignoreError = false;
								if (callbackData.state) {
									if (orgKind != "psm")
										mainActivity.resetTreeNode();
									mainActivity.refreshListData();
									justep.OpmUtils.showSuccess("禁用“" + name
											+ "”成功。");
								}
							}
						});
					});
};

mainActivity.btnLogicDeleteClick = function(event) {
	var dOrgList = justep.xbl("dOrgList");
	var id = dOrgList.getID();

	var fullID = dOrgList.getValue("sFID");
	if (mainActivity.checkCurrentPerson(dOrgList.getValue("sFID"))) {
		justep.OpmUtils.showWarning("你不能删除自己和自己的上级组织！");
		return;
	}

	var name = dOrgList.getValue("sName");
	var version = dOrgList.getValue("version");
	var orgKind = dOrgList.getValue("sOrgKindID");
	var isMasterPsm = (dOrgList.getValue("sParent") == dOrgList
			.getValue("personMainOrgID"));

	justep.OpmUtils
			.showConfirm(
					"确实要删除“"
							+ name
							+ "”吗？"
							+ (orgKind != "psm" ? "<br/><br/>“删除”操作会删除选中组织及其所有下级组织。"
									: "")
							+ ((orgKind == "psm" && isMasterPsm) ? "<br/><br/>删除人员的主岗位会同时删除人员的所有其他岗位。"
									: "") + "<br/><br/>删除后可以在回收站中进行“还原”和“清除”。",
					function(e) {
						var params = new justep.Request.ActionParam();
						params.setString("id", id);
						params.setInteger("version", version);
						justep.Request.sendBizRequest2({
							dataType : "json",
							action : "logicDeleteOrgAction",
							parameters : params,
							callback : function(callbackData) {
								callbackData.ignoreError = false;
								if (callbackData.state) {
									if (orgKind != "psm")
										mainActivity.resetTreeNode();
									mainActivity.refreshListData();
									justep.OpmUtils.showSuccess("删除“" + name
											+ "”成功。");
								}
							}
						});
					});
};

mainActivity.btnSortClick = function(event) {
	var dOrgTree = justep.xbl("dOrgTree");
	justep.xbl("wdSortOrgs")
			.open(
					{
						"parentID" : justep.OpmUtils.isTreeRoot(dOrgTree
								.getID()) ? null : dOrgTree.getID()
					});
};

mainActivity.wdSortOrgsReceive = function(event) {
	var dOrgTree = justep.xbl("dOrgTree");
	var parentID = justep.OpmUtils.isTreeRoot(dOrgTree.getID()) ? null
			: dOrgTree.getID();
	var ids = new justep.Request.ListParam();
	var versions = new justep.Request.ListParam();

	for ( var i = 0; i < event.data.getRowsNum(); i++) {
		var id = event.data.getRowId(i);
		var version = event.data.getValueByName("version", i);
		ids.add(new justep.Request.SimpleParam(id,
				justep.XML.Namespaces.XMLSCHEMA_STRING));
		versions.add(new justep.Request.SimpleParam(version,
				justep.XML.Namespaces.XMLSCHEMA_INTEGER));
	}

	var params = new justep.Request.ActionParam();
	params.setList("ids", ids);
	params.setList("versions", versions);
	if (parentID)
		params.setString("parentID", parentID);

	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "sortOrgsAction",
		parameters : params,
		callback : function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				mainActivity.resetTreeNode();
				mainActivity.refreshListData();
				justep.OpmUtils.showSuccess("排序成功。");
			}
		}
	});
};

mainActivity.btnMoveClick = function(event) {
	var dOrgList = justep.xbl("dOrgList");

	var fullID = dOrgList.getValue("sFID");
	if (mainActivity.checkCurrentPerson(dOrgList.getValue("sFID"))) {
		justep.OpmUtils.showWarning("你不能移动自己和自己的上级组织！");
		return;
	}

	var name = dOrgList.getValue("sName");
	var orgKindID = dOrgList.getValue("sOrgKindID");
	var parentOrgKindIDs = justep.Org.OrgKinds.getParents(orgKindID);
	if (justep.Org.OrgKinds.isRoot(orgKindID)) {
		parentOrgKindIDs.push("root");
	}
	justep.OpmUtils.showConfirm("确实要移动“" + name + "”吗？", function(e) {
		justep.xbl("wdSelectMoveToOrg").open(
				{
					"filter" : "not (SA_OPOrg.sFID like '"
							+ dOrgList.getValue("sFID") + "%')",
					"rootFilter" : "",
					"manageCodes" : "",
					"orgKinds" : parentOrgKindIDs.join(","),
					"includeDisabledOrg" : false,
					"showVirtualRoot" : true
				});
	});
};

mainActivity.wdSelectMoveToOrgReceive = function(event) {
	var dOrgList = justep.xbl("dOrgList");
	var dOrgTree = justep.xbl("dOrgTree");

	var id = dOrgList.getID();
	var name = dOrgList.getValue("sName");
	var version = dOrgList.getValue("version");
	var oldParentID = dOrgList.getValue("sParent");
	if (!oldParentID)
		oldParentID = "";
	var newParentID = event.data[0]["rowid"];

	if (newParentID == oldParentID) {
		justep.OpmUtils.showWarning("不能移动到当前所在的组织！");
		return;
	}

	var newParentName = event.data[0]["sName"];
	var orgKind = dOrgList.getValue("sOrgKindID");
	justep.OpmUtils.showConfirm("确实要移动“" + name + "”到“" + newParentName
			+ "”下吗？", function(e) {
		var params = new justep.Request.ActionParam();
		params.setString("id", id);
		params.setInteger("version", version);
		params.setString("newParentID",
				justep.OpmUtils.isTreeRoot(newParentID) ? "" : newParentID);
		justep.Request.sendBizRequest2({
			dataType : "json",
			action : "moveOrgAction",
			parameters : params,
			callback : function(callbackData) {
				callbackData.ignoreError = false;
				if (callbackData.state) {
					if (orgKind != "psm") {
						var currentTreeFID = dOrgTree.getValue("sFID");
						if (currentTreeFID.indexOf("/" + newParentID) > -1) {
							mainActivity.resetTreeNode(newParentID);
						} else {
							mainActivity.resetTreeNode();
							mainActivity.resetTreeNode(newParentID);
						}
					}
					dOrgTree.setIndex(dOrgTree.getIndex(newParentID));
					justep.OpmUtils.showSuccess("移动“" + name + "”成功。");
				}
			}
		});
	});
};

mainActivity.btnChangeMainOrgClick = function(event) {
	var dOrgList = justep.xbl("dOrgList");
	var name = dOrgList.getValue("sName");
	justep.xbl("wdChangeMainOrg").open({
		filter : "sPersonID = '" + dOrgList.getValue("sPersonID") + "'",
		listMode : true
	});
};

mainActivity.wdChangeMainOrgReceive = function(event) {
	var dOrgList = justep.xbl("dOrgList");
	var name = dOrgList.getValue("sName");
	var personID = dOrgList.getValue("personID");
	var personVersion = dOrgList.getValue("personVersion");

	var newMainOrgID = event.data[0]["sParent"];
	var newMainOrgFName = event.data[0]["sFName"];
	var params = new justep.Request.ActionParam();
	params.setString("id", personID);
	params.setInteger("version", personVersion);
	params.setString("newMainOrgID", newMainOrgID);
	params.setBoolean("disableOldMasterPsm", false);
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "changePersonMainOrgAction",
		parameters : params,
		callback : function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				mainActivity.refreshListData();
				justep.OpmUtils.showSuccess("设置“" + name + "”的主岗“"
						+ newMainOrgFName + "”成功。");
			}
		}
	});
};

mainActivity.btnResetPasswordClick = function(event) {
	var dOrgList = justep.xbl("dOrgList");
	var name = dOrgList.getValue("sName");
	var personID = dOrgList.getValue("personID");
	var personVersion = dOrgList.getValue("personVersion");

	justep.OpmUtils
			.showConfirm(
					"确实要重置“" + name + "”的密码吗？ ",
					function(e) {
						var params = new justep.Request.ActionParam();
						params.setString("id", personID);
						params.setInteger("version", personVersion);
						justep.Request
								.sendBizRequest2({
									dataType : "json",
									action : "resetPasswordAction",
									parameters : params,
									callback : function(callbackData) {
										callbackData.ignoreError = false;
										if (callbackData.state) {
											mainActivity.refreshListData();
											justep.OpmUtils
													.showSuccess("重置“"
															+ name
															+ "”的密码成功。<br/><br/>新密码是：<span style='color:#FF0000;font-size:16px;font-weight:bold;'>"
															+ callbackData.response
															+ "</span>。<br/><br/>请通知“"
															+ name + "”尽快修改密码！");
										}
									}
								});
					});
};

mainActivity.gridOrgListRowDblClick = function(event) {
	mainActivity.btnEditClick(event);
};

mainActivity.btnSyncClick = function(event) {
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "synchronizeMessengerOrgAction",
		callback : function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				justep.OpmUtils.showSuccess("同步即时通讯组织数据成功。");
			}
		}
	});
};

mainActivity.dTempValueChanged = function(event) {
	if (event.column == "listOrgKinds") {
		mainActivity.refreshListData();
	}
};

mainActivity.cbShowAllChildrenClick = function(event) {
	mainActivity.refreshListData();
};

mainActivity.cbOnlyShowMasterPsmClick = function(event) {
	mainActivity.refreshListData();
};

mainActivity.inputSearchListKeydown = function(event) {
	if (event.keyCode == 13)
		mainActivity.refreshListData();
};

mainActivity.imageSearchListClick = function(event) {
	mainActivity.refreshListData();
};

mainActivity.cbShowDisabledClick = function(event) {
	mainActivity.refreshTreeData();
};

mainActivity.dOrgListRefreshCreateParam = function(event) {
	event.param.setBoolean("splitFullIDCodeName", true);
};

mainActivity.imageSearchOrgClick = function(event) {
	mainActivity.openSearchOrg();
};

mainActivity.inputSearchOrgKeydown = function(event) {
	if (event.keyCode == 13)
		mainActivity.openSearchOrg();
};

mainActivity.openSearchOrg = function() {
	var searchText = $("#inputSearchOrg").val();
	if (!justep.OpmUtils.checkSearchText(searchText, true)) {
		$("#inputSearchOrg").val("");
		searchText = "";
	}
	var orgKinds = justep.Org.OrgKinds.getIDs();
	for ( var i = 0; i < orgKinds.length; i++) {
		if (orgKinds[i] == justep.Org.OrgKinds.ORGKIND_PERSONMEMBER) {
			orgKinds.splice(i, 1);
		}
	}
	justep.xbl("wdSearchOrg").open({
		orgKinds : orgKinds.join(","),
		searchText : searchText
	});
};

mainActivity.wdSearchOrgReceive = function(event) {
	var dOrgTree = justep.xbl("dOrgTree");
	var gridOrgTree = justep.xbl("gridOrgTree").grid;
	var sFID = event.data.getValueByName("sFID", 0);
	var idPath = justep.OpmUtils.getTreeGridIDPathByFullID(gridOrgTree, sFID);
	if (!!idPath)
		dOrgTree.expandTreeByIdPath(idPath);
};

mainActivity.getCurrentPsmFID = function() {
	return justep.Context.getCurrentOrgFID() + "/"
			+ justep.Context.getCurrentPersonID() + "@"
			+ justep.Context.getCurrentOrgID() + ".psm";
};

mainActivity._currentMainPsmFID = null;
mainActivity.getCurrentMainPsmFID = function() {
	if (mainActivity._currentMainPsmFID == null) {
		justep.Request.sendBizRequest2({
			dataType : "json",
			action : "getCurrentPersonMainFID",
			parameters : null,
			callback : function(callbackData) {
				callbackData.ignoreError = false;
				if (callbackData.state) {
					mainActivity._currentMainPsmFID = callbackData.response;
				}
			}
		});
	}
	return mainActivity._currentMainPsmFID;
};

mainActivity.checkCurrentPerson = function(fullID) {
	return (mainActivity.getCurrentPsmFID().indexOf(fullID) == 0)
			|| (mainActivity.getCurrentMainPsmFID().indexOf(fullID) == 0);
};

mainActivity.gridOrgTreeRowHasChildren = function(event) {
	return (event.cell.getValueByColId("sOrgKindID") != "pos");
};

mainActivity.itemAuthorizeClick = function(event) {
	var dOrgList = justep.xbl("dOrgList");
	var title = "权限 - " + dOrgList.getValue("sName") + "（"
			+ dOrgList.getValue("sFName") + "）";
	justep.xbl("wdAssignRoles").open({
		"orgID" : dOrgList.getID(),
		"orgFullID" : dOrgList.getValue("sFID"),
		"managed" : false
	}, title);
};

mainActivity.itemPersonSignImgClick = function(event) {
	var dOrgList = justep.xbl("dOrgList");
	justep.xbl("wdPersonSignImg").open({
		"fPersonID" : dOrgList.getValue("sPersonID"),
		"fPersonCode" : dOrgList.getValue("sCode")
	});
};
