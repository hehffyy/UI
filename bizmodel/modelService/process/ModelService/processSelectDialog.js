var processSelectDialog = {};

processSelectDialog.trigger1Click = function(event) {
	var grid = justep.xbl("grid1").grid;
	var rowids = grid.getCheckedRows(grid.columnIds.indexOf("checked")), bizData1 = justep
			.xbl("bizData1");
	var ret = [];
	if (rowids) {
		rowids = rowids.split(",");
		for ( var n in rowids) {
			var rowid = rowids[n];
			ret.push({
				fProcess : bizData1.getValue("fProcess", rowid),
				fFuncName : bizData1.getValue("fFlowName", rowid),
				fFuncLongName : bizData1.getValue("fPathName", rowid) + "/"
						+ bizData1.getValue("fBizName", rowid) + "/"
						+ bizData1.getValue("fFlowName", rowid)
			});
		}
	}
	justep.xbl("windowReceiver1").windowEnsure(ret);
};
