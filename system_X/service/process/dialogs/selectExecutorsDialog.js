var selectExecutorsDialog = {};

// 左边部分自动拉伸
selectExecutorsDialog.refreshLayout = function() {
	justep.xbl("borderLayout1").onWindowResize();
	justep.xbl("borderLayout1").leftEl.attr("size", Math.round($(window)
			.width() / 2) - 50);
};
$(window).resize(selectExecutorsDialog.refreshLayout);
selectExecutorsDialog.modelXBLLoaded = function(event) {
	selectExecutorsDialog.refreshLayout();
};

// 当前选择模式: tree|list
selectExecutorsDialog.currentMode = null;

/*******************************************************************************
 * 对话框入口 入参格式 { range: 执行者范围（OrgUnit数组），range为["/"]表明所有的组织 selected:
 * 已选中执行者（OrgUnit数组） orgKinds: 执行者类型（组织结构节点类型） cascade: 级联选择的初始值 }
 ******************************************************************************/
selectExecutorsDialog.inputData = null;
selectExecutorsDialog.visibleOrgKinds = null;
selectExecutorsDialog.windowReceiverReceive = function(event) {
	var dOrgTree = justep.xbl("dOrgTree");
	var dOrgList = justep.xbl("dOrgList");
	var dBackGround = justep.xbl("dOrgBackground");
	var gridOrgTree = justep.xbl("gridOrgTree");

	selectExecutorsDialog.inputData = event.data;
	if (!selectExecutorsDialog.inputData.orgKinds) {
		selectExecutorsDialog.inputData.orgKinds = justep.Org.OrgKinds
				.getRealIDs().join(",");
	}
	selectExecutorsDialog.visibleOrgKinds = selectExecutorsDialog
			.getVisibleOrgKinds();

	if (selectExecutorsDialog.inputData.hasOwnProperty("multiSelection")) {
		selectExecutorsDialog.multiSelect = selectExecutorsDialog.inputData.multiSelection;
	} else {
		selectExecutorsDialog.multiSelect = true;
	}

	$("#inputSearch").val("");
	if (selectExecutorsDialog.multiSelect) {
		$("#cbCascade").show().attr("checked",
				selectExecutorsDialog.inputData.cascade == true);
		$("#labelCascade").show();
		$("#btnSelectAll").show();
		$("#btnClear").show();
	} else {
		$("#cbCascade").hide().attr("checked", false);
		$("#labelCascade").hide();
		$("#btnSelectAll").hide();
		$("#btnClear").hide();
	}

	selectExecutorsDialog.setCurrentMode("tree");

	// 必须首先初始化选中的数据
	selectExecutorsDialog.initSelected();
	selectExecutorsDialog.initOrgTree();
	selectExecutorsDialog.initOrgListFilter(dOrgList);
	selectExecutorsDialog.initOrgListFilter(dBackGround);

	// 常用组：加载
	selectExecutorsDialog.loadOrgCommonGroup();
};

// 初始化事件
selectExecutorsDialog.modelModelConstructDone = function(event) {
	var dgTree = justep.xbl("gridOrgTree").getDhtmlxGrid();
	dgTree.hasChildrenCallback = selectExecutorsDialog.orgTreeHasChildrenCallback;
};

// 按照节点类型判断是否为树的叶子节点
selectExecutorsDialog.orgTreeHasChildrenCallback = function(event) {
	var orgKind = event.cell.getValueByColId("sOrgKindID");
	return orgKind != justep.Org.OrgKinds.ORGKIND_PERSONMEMBER;
};

// 按照入参range，初始化组织机构树
selectExecutorsDialog.initOrgTree = function() {
	var dOrgTree = justep.xbl("dOrgTree");

	var orgKindsFilter = [ "1=0" ];
	var orgKindsArray = selectExecutorsDialog.visibleOrgKinds.split(",");
	for ( var i = 0; i < orgKindsArray.length; i++) {
		orgKindsFilter.push("(SA_OPOrg.sOrgKindID = '" + orgKindsArray[i]
				+ "')");
	}

	dOrgTree.setFilter("validStateFilter", "SA_OPOrg.sValidState = 1");
	dOrgTree.setFilter("orgKindsFilter", orgKindsFilter.join(" or "));

	// 以range为根，并逆向构造树
	var range = selectExecutorsDialog.inputData.range;
	// 当range指向根，显示全部
	if (range.length == 1 && range[0].fid == "/") {
		dOrgTree.setTreeRootFilter("SA_OPOrg.sParent is null");
		dOrgTree.refreshData();
	} else {
		var orgUnits = [];
		for ( var i = 0; i < range.length; i++) {
			var orgKind = justep.Org.OrgUtils.getOrgKindID(range[i].fid);
			if (("," + selectExecutorsDialog.visibleOrgKinds + ",").indexOf(","
					+ orgKind + ",") != -1) {
				orgUnits.push({
					fid : range[i].fid,
					fname : range[i].fname
				});
			}
		}
		var orgUnitsTree = justep.ProcessDialog.Utils
				.orgUnitsListToTree(orgUnits);
		dOrgTree.loadJson(justep.ProcessDialog.Utils
				.orgUnitsToRows(orgUnitsTree));
	}
	dOrgTree.setIndex(0);
};

// 是否为可选择的组织节点
selectExecutorsDialog.canSelect = function(grid, id) {
	if (grid.isRowRendered && !grid.isRowRendered(id)) {
		var rowIndex = grid.getRowIndex(id);
		var orgKind = grid.rowsBuffer[rowIndex].data.sOrgKindID.value;
		var virtual = grid.rowsBuffer[rowIndex].data.virtual.value;
	} else {
		var orgKind = grid.getValueById(id, "sOrgKindID");
		var virtual = grid.getValueById(id, "virtual");
	}

	return !virtual
			&& (("," + selectExecutorsDialog.inputData.orgKinds + ",")
					.indexOf("," + orgKind + ",") != -1);
};

selectExecutorsDialog.getVisibleOrgKinds = function() {
	function concatArray(array1, array2) {
		for ( var i = 0; i < array2.length; i++) {
			var repeated = false;
			for ( var j = 0; j < array1.length; j++) {
				if (array1[j] == array2[i]) {
					repeated = true;
					break;
				}
			}
			if (!repeated)
				array1.push(array2[i]);
		}
		return array1;
	}
	;
	var s = selectExecutorsDialog.inputData.orgKinds.split(",");
	for ( var i = 0; i < s.length; i++) {
		s = concatArray(s, justep.Org.OrgKinds.getParents(s[i]));
	}
	return s.join(",");
};

// 按照入参selected, 初始化已选中列表
selectExecutorsDialog.initSelected = function() {
	var selected = selectExecutorsDialog.inputData.selected;
	var dSelected = justep.xbl("dSelected");
	dSelected.loadJson(selectExecutorsDialog.orgUnitsToSelectedRows(selected));
	dSelected.setIndex(0);
};

// 按照入参range和orgKinds, 初始化组织选择列表的过滤条件
selectExecutorsDialog.initOrgListFilter = function(data) {
	var orgKinds = selectExecutorsDialog.inputData.orgKinds;
	var range = selectExecutorsDialog.inputData.range;

	var orgKindsFilter = [ "1=0" ];
	var orgKindsArray = orgKinds.split(",");
	for ( var i = 0; i < orgKindsArray.length; i++) {
		orgKindsFilter.push("(SA_OPOrg.sOrgKindID = '" + orgKindsArray[i]
				+ "')");
	}

	var rangeFilter = [ "1=0" ];
	for ( var i = 0; i < range.length; i++) {
		var orgKind = justep.Org.OrgUtils.getOrgKindID(range[i].fid);
		if (orgKind == justep.Org.OrgKinds.ORGKIND_PERSONMEMBER) {
			rangeFilter.push("(SA_OPOrg.sFID = '" + range[i].fid + "')");
		} else {
			rangeFilter.push("(SA_OPOrg.sFID like '" + range[i].fid + "%')");
		}
	}
	;

	data.setFilter("validStateFilter", "SA_OPOrg.sValidState = 1");
	data.setFilter("orgKindsFilter", orgKindsFilter.join(" or "));
	data.setFilter("rangeFilter", rangeFilter.join(" or "));
};

// 设置当前选择模式, mode=tree|list
selectExecutorsDialog.setCurrentMode = function(mode) {
	selectExecutorsDialog.currentMode = mode;
	if (mode == "tree") {
		$("#divOrgTree").show();
		$("#divCascade").show();
		$("#divOrgList").hide();
		$("#divToolbar").hide();
		justep.xbl("gridOrgTree").onWindowResize();
	} else {
		$("#divOrgTree").hide();
		$("#divCascade").hide();
		$("#divOrgList").show();
		$("#divToolbar").show();
		justep.xbl("gridOrgList").onWindowResize();
	}
};

// 构造搜索过滤条件
selectExecutorsDialog.createSearchFilter = function(searchText, relations) {
	var filter = [];
	for ( var i = 0; i < relations.length; i++) {
		filter
				.push("(upper(" + relations[i] + ") like '%" + searchText
						+ "%')");
	}
	;
	return filter.join(" or ");
};

// 搜索组织机构: 如果搜索字符串为空, 恢复树形选择
selectExecutorsDialog.searchOrgList = function() {
	var searchText = $("#inputSearch").val().replace(/'/g, "''").toUpperCase();

	if (searchText != "") {
		selectExecutorsDialog.setCurrentMode("list");
		var searchFilter = selectExecutorsDialog.createSearchFilter(searchText,
				[ "SA_OPOrg.sName", "SA_OPOrg.sCode" ]);

		var dOrgList = justep.xbl("dOrgList");
		dOrgList.setFilter("searchFilter", searchFilter);
		dOrgList.refreshData();
	} else {
		selectExecutorsDialog.setCurrentMode("tree");
		selectExecutorsDialog.refreshGridChecked();
	}
};

// 搜索按钮click事件, 执行搜索
selectExecutorsDialog.btnSearchClick = function(event) {
	selectExecutorsDialog.searchOrgList();
};

// 搜索输入框keyDown事件, 回车时执行搜索
selectExecutorsDialog.inputSearchKeydown = function(event) {
	if (event.keyCode == 13) {
		selectExecutorsDialog.searchOrgList();
	}
	;
};

// 组织机构树图标回调事件
selectExecutorsDialog.gridOrgTreeShowNodeImg = function(event) {
	var orgKind = event.grid.getValueById(event.rowId, "sOrgKindID");
	var canSelect = selectExecutorsDialog.canSelect(event.grid, event.rowId);

	return justep.Org.OrgKinds.getImageURL(orgKind, false, !canSelect);
};

// 按照当前选择模式, 获取选择grid
selectExecutorsDialog.getCurrentGrid = function() {
	return (selectExecutorsDialog.currentMode == "tree") ? justep
			.xbl("gridOrgTree") : justep.xbl("gridOrgList");
};

// 按照当前选择模式, 获取选择data
selectExecutorsDialog.getCurrentData = function() {
	return (selectExecutorsDialog.currentMode == "tree") ? justep
			.xbl("dOrgTree") : justep.xbl("dOrgList");
};

// 选中的数据特殊处理，rowID = sFID
selectExecutorsDialog.orgUnitsToSelectedRows = function(orgUnits) {
	var rowsData = justep.ProcessDialog.Utils.orgUnitsToRows(orgUnits);
	for ( var i = 0; i < rowsData.rows.length; i++) {
		rowsData.rows[i].userdata.id.value = rowsData.rows[i].sFID.value;
	}
	return rowsData;
};

// 得到选中的OrgUnits
selectExecutorsDialog.getSelectedOrgUnits = function(fullIDs) {
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	if (!fullIDs) {
		var fullIDs = gridSelected.getAllRowIds(",").split(",");
	}

	var orgUnits = [];
	for ( var i = 0; i < fullIDs.length; i++) {
		var fullID = fullIDs[i];
		if (fullID == "") {
			continue;
		}
		if (gridSelected.isRowRendered(fullID)) {
			var fullName = gridSelected.getValueById(fullID, "sFName");
			var responsible = gridSelected.getValueById(fullID, "responsible");
		} else {
			var rowIndex = gridSelected.getRowIndex(fullID);
			var fullName = gridSelected.rowsBuffer[rowIndex].data.sFName.value;
			var responsible = gridSelected.rowsBuffer[rowIndex].data.responsible.value;
		}
		orgUnits.push({
			"fid" : fullID,
			"fname" : fullName,
			"responsible" : responsible
		});
	}
	return orgUnits;
};

// 按照fullID判断是否为选中数据
selectExecutorsDialog.isSelected = function(selectedFullIDs, id) {
	for ( var i = 0; i < selectedFullIDs.length; i++) {
		var fullID = selectedFullIDs[i];
		if (justep.Org.OrgUtils.getOrgID(fullID) == id) {
			return 1;
		} else if (selectExecutorsDialog.currentMode == "tree"
				&& fullID.indexOf("/" + id + ".") != -1) {
			return 0.5;
		}
	}
	return 0;
};

// 刷新选择grid的checked
selectExecutorsDialog.refreshGridChecked = function(ids) {
	var grid = selectExecutorsDialog.getCurrentGrid().getDhtmlxGrid();

	if (!ids) {
		if (grid.isTreeGrid()) {
			ids = grid.getAllSubItems().split(",");
		} else {
			ids = grid.getAllRowIds(",").split(",");
		}
	}

	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	var selectedFullIDs = gridSelected.getAllRowIds(",").split(",");
	for ( var o in ids) {
		var id = ids[o];
		// 这里判断数据是否已经渲染
		if (grid.isRowRendered(id)) {
			// 常用组: 刷新选中
			var realOrgID = justep.Org.OrgCommonGroup.getOrgIDOfGroupOrgID(id);
			var selected = selectExecutorsDialog.isSelected(selectedFullIDs,
					realOrgID) > 0;
			grid.setItemChecked(id, selected, false);
			// 选中常用组虚拟节点
			if (selected && justep.Org.OrgCommonGroup.isGroupOrgID(id)) {
				grid.setItemChecked(justep.Org.OrgCommonGroup.GROUP_ROOT_ID,
						true, false);
				grid.setItemChecked(justep.Org.OrgCommonGroup
						.getGroupIDOfGroupOrgID(id), true, false);
			}
		}
	}
};

// 添加选中组织
selectExecutorsDialog.addSelectedItems = function(grid, ids) {
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	var grid = grid.getDhtmlxGrid ? grid.getDhtmlxGrid() : grid;
	var lastID = null;

	var orgUnits = [];
	for ( var i = 0; i < ids.length; i++) {
		var id = ids[i];
		if (id == "") {
			continue;
		}

		if (grid.isRowRendered && !grid.isRowRendered(id)) {
			var rowIndex = grid.getRowIndex(id);
			var fullID = grid.rowsBuffer[rowIndex].data.sFID.value;
			var fullName = grid.rowsBuffer[rowIndex].data.sFName.value;
		} else {
			var fullID = grid.getValueById(id, "sFID");
			var fullName = grid.getValueById(id, "sFName");
		}
		if (selectExecutorsDialog.canSelect(grid, id)) {
			lastID = fullID;
			if (gridSelected.getRowIndex(fullID) == -1) {
				var orgUnit = {
					fid : fullID,
					fname : fullName
				};
				orgUnits.push(orgUnit);
			}
		}
	}

	if (orgUnits.length > 0) {
		gridSelected.loadData(null, selectExecutorsDialog.orgUnitsToSelectedRows(orgUnits), null, true, false, "json");
	}
	if (lastID != null) {
		gridSelected.setIndex(gridSelected.getRowIndex(lastID));
	}
};

selectExecutorsDialog._limitOfDirectDeleteRows = 50;
// 删除选中组织
selectExecutorsDialog.deleteSelectedItems = function(ids) {
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	var oldIndex = gridSelected.getIndex();

	var fullIDs = gridSelected.getAllRowIds(",").split(",");
	for ( var j = fullIDs.length - 1; j >= 0; j--) {
		var fullID = fullIDs[j];
		var id = justep.Org.OrgUtils.getOrgID(fullID);
		if (justep.Array.indexOf(ids, fullID) != -1
				|| justep.Array.indexOf(ids, id) != -1) {
			if (ids.length < selectExecutorsDialog._limitOfDirectDeleteRows) {
				gridSelected.deleteRow(fullID);
			} else {
				fullIDs.splice(j, 1);
			}
		}
	}

	if (ids.length >= selectExecutorsDialog._limitOfDirectDeleteRows) {
		var orgUnits = selectExecutorsDialog.getSelectedOrgUnits(fullIDs);
		gridSelected.loadData(null, selectExecutorsDialog
				.orgUnitsToSelectedRows(orgUnits), null, false, false, "json");
	}

	gridSelected.setIndex(oldIndex);
};

// 清除选择
selectExecutorsDialog.clearSelectedItems = function() {
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	gridSelected.loadData(null, {
		rows : []
	}, null, false, false, "json");
};

// 从显示列表选择全部
selectExecutorsDialog.selectAllByOrgList = function() {
	var grid = selectExecutorsDialog.getCurrentGrid().getDhtmlxGrid();
	var ids = grid.getAllRowIds(",").split(",");
	selectExecutorsDialog.addSelectedItems(grid, ids);
};

// 查询后台数据
selectExecutorsDialog.queryByOrgBackground = function(filter) {
	var data = justep.xbl("dOrgBackground");
	var oldFilter = data.getFilter("searchFilter");
	if (oldFilter != filter || !data.loaded) {
		data.setFilter("searchFilter", filter);
		data.refreshData();
	}
	var ids = [];
	for ( var i = 0; i < data.getCount(); i++) {
		ids.push(data.getID(i));
	}
	return ids;
};

// 从后台数据选择
selectExecutorsDialog.selectByOrgBackground = function(filter) {
	var data = justep.xbl("dOrgBackground");
	var ids = selectExecutorsDialog.queryByOrgBackground(filter);
	var grid = data.getStore();
	selectExecutorsDialog.addSelectedItems(grid, ids);
};

// 选择
selectExecutorsDialog.selectByCurrentGrid = function(id) {
	if (typeof (id) == "undefined") {
		return;
	}
	if (!selectExecutorsDialog.multiSelect)
		selectExecutorsDialog.btnUnSelectClick();

	var grid = selectExecutorsDialog.getCurrentGrid().getDhtmlxGrid();
	var cascade = $("#cbCascade").attr("checked");
	if (selectExecutorsDialog.currentMode == "list" || !cascade) {
		// 列表模式或树形非级联模式
		selectExecutorsDialog.addSelectedItems(grid, [ id ]);
	} else {
		// 常用组： 选择
		var ids = [ id ];
		if (grid.getValueById(id, "sOrgKindID") == justep.Org.OrgCommonGroup.GROUP_ORGKIND) {
			ids = selectExecutorsDialog.getSubOrgIDsByGroupID(grid, id);
		}
		if (ids.length != 0) {
			var filter = "";
			for ( var i = 0; i < ids.length; i++) {
				var fullID = grid.getValueById(ids[i], "sFID");
				filter = justep.ProcessDialog.Utils.joinFilter("OR", filter,
						"sFID like '" + fullID + "%'");
			}
			selectExecutorsDialog.selectByOrgBackground(filter);
		}
	}
};

// 取消选择
selectExecutorsDialog.unSelectByCurrentGrid = function(id) {
	if (typeof (id) == "undefined") {
		return;
	}
	var deleteIDs = [ id ];
	var grid = selectExecutorsDialog.getCurrentGrid().getDhtmlxGrid();
	var cascade = $("#cbCascade").attr("checked");
	if (selectExecutorsDialog.currentMode == "tree" && cascade) {
		// 常用组：取消选择
		var ids = [ id ];
		if (grid.getValueById(id, "sOrgKindID") == justep.Org.OrgCommonGroup.GROUP_ORGKIND) {
			ids = selectExecutorsDialog.getSubOrgIDsByGroupID(grid, id);
		}
		var filter = "";
		for ( var i = 0; i < ids.length; i++) {
			var fullID = grid.getValueById(ids[i], "sFID");
			filter = justep.ProcessDialog.Utils.joinFilter("OR", filter,
					"sFID like '" + fullID + "%'");
		}
		selectExecutorsDialog.queryByOrgBackground(filter);

		var data = justep.xbl("dOrgBackground");
		for ( var i = 0; i < data.getCount(); i++) {
			deleteIDs.push(data.getID(i));
		}
	}

	selectExecutorsDialog.deleteSelectedItems(deleteIDs);
};

// 全选按钮
selectExecutorsDialog.btnSelectAllClick = function(event) {
	if (selectExecutorsDialog.currentMode == "list") {
		selectExecutorsDialog.selectAllByOrgList();
	} else {
		selectExecutorsDialog.selectByOrgBackground();
	}
	selectExecutorsDialog.refreshGridChecked();
};

// 选择按钮
selectExecutorsDialog.btnSelectClick = function(event) {
	var grid = selectExecutorsDialog.getCurrentGrid().getDhtmlxGrid();
	var idx = grid.getIndex();
	var id = grid.getRowId(idx);
	selectExecutorsDialog.selectByCurrentGrid(id);
	selectExecutorsDialog.refreshGridChecked();
};

// 取消按钮
selectExecutorsDialog.btnUnSelectClick = function(event) {
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	var idx = gridSelected.getIndex();
	var id = gridSelected.getRowId(idx);
	if (typeof (id) == "undefined") {
		return;
	}
	var ids = [ id ];
	selectExecutorsDialog.deleteSelectedItems(ids);
	selectExecutorsDialog.refreshGridChecked();
};

// 清空按钮
selectExecutorsDialog.btnClearClick = function(event) {
	selectExecutorsDialog.clearSelectedItems();
	selectExecutorsDialog.refreshGridChecked();
};

// 树勾选
selectExecutorsDialog.gridOrgTreeRowChecked = function(event) {
	var id = event.rowID;
	var checked = event.checked;
	if (checked) {
		selectExecutorsDialog.selectByCurrentGrid(id);
	} else {
		selectExecutorsDialog.unSelectByCurrentGrid(id);
	}
	selectExecutorsDialog.refreshGridChecked();
};

// 树双击
selectExecutorsDialog.gridOrgTreeRowDblClick = function(event) {
	if (!event.rowID || event.rowID == "__filler__")
		return;

	var checked = !(event.grid.isCheckedRow_treegrid(event.rowID));
	event.checked = checked;
	selectExecutorsDialog.gridOrgTreeRowChecked(event);
};

// 列表勾选
selectExecutorsDialog.gridOrgListRowChecked = function(event) {
	var id = event.rowID;
	var checked = event.checked;
	if (checked) {
		selectExecutorsDialog.selectByCurrentGrid(id);
	} else {
		selectExecutorsDialog.unSelectByCurrentGrid(id);
	}
	selectExecutorsDialog.refreshGridChecked();
};

// 列表双击
selectExecutorsDialog.gridOrgListRowDblClick = function(event) {
	var checked = !event.grid.isCheckedRow(event.rowID);
	event.checked = checked;
	selectExecutorsDialog.gridOrgListRowChecked(event);
};

// 双击取消
selectExecutorsDialog.gridSelectedRowDblClick = function(event) {
	setTimeout(function() {
		selectExecutorsDialog.btnUnSelectClick();
	}, 1);
};

// 对话框取消
selectExecutorsDialog.btnCancelClick = function(event) {
	justep.xbl("windowReceiver").windowCancel();
};

// 对话框确定，返回选中的组织
selectExecutorsDialog.btnOkClick = function(event) {
	debugger;
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	selectExecutorsDialog.inputData.selected = selectExecutorsDialog
			.getSelectedOrgUnits();
	justep.xbl("windowReceiver").windowEnsure(selectExecutorsDialog.inputData);
};

selectExecutorsDialog.moveSelectedRow = function(fromIndex, toIndex) {
	if (fromIndex < 0) {
		return;
	}
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	var orgUnits = selectExecutorsDialog.getSelectedOrgUnits();
	var orgUnit = orgUnits[fromIndex];
	orgUnits.splice(fromIndex, 1);
	orgUnits.splice(toIndex, 0, orgUnit);
	gridSelected.loadData(null, selectExecutorsDialog
			.orgUnitsToSelectedRows(orgUnits), null, false, false, "json");
};

selectExecutorsDialog.btnMoveFirstClick = function(event) {
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	var fromIndex = gridSelected.getIndex();
	selectExecutorsDialog.moveSelectedRow(fromIndex, 0);
};

selectExecutorsDialog.btnMoveUpClick = function(event) {
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	var fromIndex = gridSelected.getIndex();
	if (fromIndex > 0) {
		selectExecutorsDialog.moveSelectedRow(fromIndex, fromIndex - 1);
	}
};

selectExecutorsDialog.btnMoveDownClick = function(event) {
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	var fromIndex = gridSelected.getIndex();
	if (fromIndex < gridSelected.getRowsNum() - 1) {
		selectExecutorsDialog.moveSelectedRow(fromIndex, fromIndex + 1);
	}
};

selectExecutorsDialog.btnMoveLastClick = function(event) {
	var gridSelected = justep.xbl("gridSelected").getDhtmlxGrid();
	var fromIndex = gridSelected.getIndex();
	selectExecutorsDialog.moveSelectedRow(fromIndex, gridSelected.getRowsNum());
};

// 组织节点类型显示中文
selectExecutorsDialog.grid_sOrgKindIDRender = function(event) {
	return justep.Org.OrgKinds.getLabel(event.value);
};

// grid行渲染后初始化checked
selectExecutorsDialog.gridRowValueChanged = function(event) {
	selectExecutorsDialog.refreshGridChecked([ event.rowID ]);
};

selectExecutorsDialog.gridCellHint = function(event) {
	var rowIndex = event.grid.getRowIndex(event.rowId);
	return event.grid.getValueByName("sFName", rowIndex);
};

selectExecutorsDialog.dOrgTreeRefreshCreateParam = function(event) {
	// 常用组：切换queryAction
	if (justep.Org.OrgCommonGroup
			.isGroupOrgID(event.source.defTreeOption.loadTreeParent)) {
		event.source.queryAction = justep.Org.OrgCommonGroup.GROUP_QUERY_ACTION;
		;
		event.param.setString("parentID",
				event.source.defTreeOption.loadTreeParent);
	} else {
		event.source.queryAction = justep.Org.ORG_QUERY_ACTION;
		event.param.deleteParam("parentID");
	}
};

selectExecutorsDialog.loadOrgCommonGroup = function() {
	var dOrgTree = justep.xbl("dOrgTree");

	var orgKinds = selectExecutorsDialog.visibleOrgKinds;
	var orgKindsFilter = [ "1=0" ];
	var orgKindsArray = orgKinds.split(",");
	for ( var i = 0; i < orgKindsArray.length; i++) {
		orgKindsFilter.push("(SA_OPOrg.sOrgKindID = '" + orgKindsArray[i]
				+ "')");
	}

	var range = selectExecutorsDialog.inputData.range;
	var rangeFilter = [ "1=0" ];
	for ( var i = 0; i < range.length; i++) {
		var orgKind = justep.Org.OrgUtils.getOrgKindID(range[i].fid);
		if (orgKind == justep.Org.OrgKinds.ORGKIND_PERSONMEMBER) {
			rangeFilter.push("(SA_OPOrg.sFID = '" + range[i].fid + "')");
		} else {
			rangeFilter.push("(SA_OPOrg.sFID like '" + range[i].fid + "%')");
		}
	}
	;

	var validFilter = "SA_OPOrg.sValidState = 1";

	var filter = justep.ProcessDialog.Utils.joinFilter("and", orgKindsFilter
			.join("or"), rangeFilter.join("or"));
	filter = justep.ProcessDialog.Utils.joinFilter("and", filter, validFilter);

	var groupData = justep.Org.OrgCommonGroup.loadGroupRoot(dOrgTree
			.getColumns(), filter);
	dOrgTree.loadJson(groupData, null, true);
	if (dOrgTree.getIndex(justep.Org.OrgCommonGroup.GROUP_ROOT_ID) != -1) {
		dOrgTree.getStore().expand(justep.Org.OrgCommonGroup.GROUP_ROOT_ID);
	}
};

selectExecutorsDialog.getSubOrgIDsByGroupID = function(grid, id) {
	var subIDs = grid.getSubItems(id).split(",");
	var orgIDs = [];
	if (id == justep.Org.OrgCommonGroup.GROUP_ROOT_ID) {
		for ( var i = 0; i < subIDs.length; i++) {
			orgIDs = orgIDs.concat(grid.getSubItems(subIDs[i]).split(","));
		}
	} else {
		orgIDs = subIDs;
	}
	for ( var i = orgIDs.length - 1; i >= 0; i--) {
		if (orgIDs[i] == "") {
			orgIDs.splice(i, 1);
		}
	}
	return orgIDs;
};
