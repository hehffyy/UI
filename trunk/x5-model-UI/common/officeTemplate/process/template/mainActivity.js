var mainActivity = {};

mainActivity.modelLoad = function(event) {
	justep.xbl("grdMain").grid.groupBy(2);
};

mainActivity.edit = function(rowID) {
	justep.xbl("dataMain").setIndex(justep.xbl("dataMain").getIndex(rowID));
	butoneEx.Office.editTemplate(justep.xbl("dataMain").getCurrentID(), justep
			.xbl("dataMain").getValue("fKind"), function(evt) {
		if (evt.data.kind == "saveFinish") {
			var dsDetail = justep.xbl("dsDetail");
			var bookMarks = evt.data.bookMarks;
			dsDetail.deleteAllRow();
			for ( var i = 0; i < bookMarks.length; i++) {
				dsDetail.newData();
				dsDetail.setValue("fBookMarkName", bookMarks[i].name);
				dsDetail.setValue("fDisplayName", bookMarks[i].value);
			}
			dsDetail.saveData();
		}
	});
};
mainActivity.grdMain_fTempRender = function(event) {
	debugger;
	return "<a onclick=\"mainActivity.edit('" + event.rowID
			+ "');\" class='editA'>编辑..</a>";
};

mainActivity.trigger1Click = function(event) {

	butoneEx.Office.editWord("lmm", "-1", '-1', 'test', false, {
		variants : []
	});
};

mainActivity.trigger2Click = function(event) {
	butoneEx.Window.run2(
			'/UI/common/officeTemplate/process/template/ReportViewer.w', "123",
			null, null, {
				templateKey : 'qsdlReport',
				fileKind : 'excel',
				sqlParam : {
					pID : 'C6F747A8BE900001F34AC4D017B04A20'
				}
			});
	// butoneEx.report.getPdfReportUrl("qsdlReport", {});
};

mainActivity.deleteTriggerClick = function(event) {
	var result = butoneEx.Common.callAction({
		bizKey : justep.xbl("dataMain").getCurrentID()
	}, "deleteVersion",
			"/common/officeTemplate/process/template/templateProcess",
			"mainActivity");
	justep.xbl("dataMain").refreshData();

};


mainActivity.dataMainAfterNew = function(event){
  	justep.xbl("dataMain").setValue("fKind", justep.xbl("gridFilter1")._value);
};


mainActivity.dataMainAfterNew = function(event) {
	justep.xbl("dataMain").setValue("fKind", justep.xbl("gridFilter1")._value);
};

mainActivity.trigger3Click = function(event){
//butoneEx.Window.run2(
//			'/UI/common/otherPlugin/process/otherPlugin/cadViewActivity.w', "123",
//			null, null, {subPath:'test33333',materialName:'我擦了额擦'});
//			return;			
  butoneEx.Window.run2(
			'/UI/common/otherPlugin/process/otherPlugin/commonScanActivity.w', "123",
			null, null, {subPath:'test33333',materialName:'我擦了额擦'});
};
