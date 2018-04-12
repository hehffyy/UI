var selectMultiFunctions = {};
selectMultiFunctions.model1ModelConstructDone = function(event) {
	selectMultiFunctions.loadTreeData();
};
selectMultiFunctions._treeDataLoaded = false;
selectMultiFunctions.loadTreeData = function() {
	if (!selectMultiFunctions._treeDataLoaded) {
		var r =	justep.Request.sendHttpRequest("/common/commdialogs/funcTree/getFunctionTree.j?type=tree");
		if (justep.Request.isSuccess(r)) {
			justep.xbl("dFunTree").loadXML(r.responseXML);
			selectMultiFunctions._treeDataLoaded = true;
		} else {
			throw new Error("读取功能菜单失败！");
		}
	}
};
 
selectMultiFunctions._listDataLoaded = false;
selectMultiFunctions.loadListData =	function() {
	if (!selectMultiFunctions._listDataLoaded) {
		var r = justep.Request.sendHttpRequest("/common/commdialogs/funcTree/getFunctionTree.j?type=list");
		if (justep.Request.isSuccess(r)) {
			justep.xbl("dFunList").loadXML(r.responseXML);
			selectMultiFunctions._listDataLoaded = true;
		} else {
			throw new Error("读取功能菜单失败！");
		}
	}
};

selectMultiFunctions.btnOKClick = function(event) {
	var listDisplay = (document.getElementById("gridList").style.display == "");
	var selectedData;
	var selectedRowIDs;
	if (listDisplay) {
		selectedData = justep.xbl("dFunList");
		var gridList = justep.xbl("gridList").grid;
		var checkColIndex = gridList.getColIndexById("checkBox");
		var checkedRows = gridList.getCheckedRows(checkColIndex);
		if (checkedRows)
			selectedRowIDs = checkedRows.split(",");
	} else {
		selectedData = justep.xbl("dFunTree");
		selectedRowIDs = justep.xbl("gridTree").grid.getCheckedRowIds();
	}
	if (!selectedRowIDs || selectedRowIDs.length == 0) {
		justep.OpmUtils.showWarning("请勾选功能！");
		return;
	}
	var r = new SimpleStore(null, selectedData.getColumnIds());
	for ( var i = 0; i < selectedRowIDs.length; i++) {
		if (selectedRowIDs[i] && selectedData.getValue("isFolder", selectedRowIDs[i]) != "1") {
			r.insert(selectedRowIDs[i], 0, 0, justep.OpmUtils.getRowDataExt(selectedData.getStore(), selectedRowIDs[i]));
		}
	}
	justep.xbl("receiver").windowEnsure(r);
};
selectMultiFunctions.btnCancelClick = function(event) {
	justep.xbl("receiver").windowCancel();
};
selectMultiFunctions.gridTreeShowNodeImg = function(event) {
	var isFolder = event.grid.getValueById(event.rowId, "isFolder");
	if (isFolder == "1") {
		return "/UI/SA/OPM/images/folder.gif";
	} else {
		return "/UI/SA/OPM/images/funPermission.gif";
	}
};
selectMultiFunctions.clearTreeChecked = function() {
	var treeGrid = justep.xbl("gridTree").grid;
	var selectedRowIDs = treeGrid.getCheckedRowIds();
	for ( var i = 0; i < selectedRowIDs.length; i++)
		treeGrid.setItemChecked(selectedRowIDs[i], false);
};
selectMultiFunctions.clearListChecked = function() {
	var listGrid = justep.xbl("gridList").grid;
	listGrid.checkAll(0);
};
selectMultiFunctions.receiverReceive = function(event) {
	$("#inputSearch").focus();
	selectMultiFunctions.clearTreeChecked();
	selectMultiFunctions.clearListChecked();
};
selectMultiFunctions.refreshData = function() {
	var searchText = $("#inputSearch").val();
	if (searchText) {
		document.getElementById("gridTree").style.display = "none";
		document.getElementById("gridList").style.display = "";
		selectMultiFunctions.loadListData();
		var listGrid = justep.xbl("gridList").grid;
		listGrid.filterBy(listGrid.getColIndexById("activityFName"), searchText);
	} else {
		document.getElementById("gridList").style.display = "none";
		document.getElementById("gridTree").style.display = "";
	}
};
selectMultiFunctions.inputSearchKeydown = function(event){
	if (event.keyCode == 13)
		selectMultiFunctions.refreshData();
};
selectMultiFunctions.imageSearchClick = function(event){
	selectMultiFunctions.refreshData();
};
