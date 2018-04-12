var selectUnusedCodeValue = {};

selectUnusedCodeValue.grid2_checkedRender = function(event) {
	return "<input name='checked' type='radio' value='" + event.rowID
			+ "' style='width:100%'/>";
};

selectUnusedCodeValue.windowReceiver1Receive = function(event) {
	var data = justep.xbl("dataCodeList"), list = event.data;
	data.clear();

	var defaultValues = [], options = {
		defaultValues : defaultValues
	};
	for ( var n in list) {
		defaultValues.push({
			"codeValue" : list[n],
			"checked" : ""
		});
	}
	data.newData(options);
};

selectUnusedCodeValue.gridCodeValueRowClick = function(event) {
	$("input[value='" + event.rowID + "']").attr("checked", true);
};

selectUnusedCodeValue.gridCodeValueRowDblClick = function(event) {
	selectUnusedCodeValue.btnSureClick();
};

selectUnusedCodeValue.btnSureClick = function(event) {
	var codeValue = justep.xbl("dataCodeList").getValue("codeValue",
			$("input[name='checked']:checked").val());
	justep.xbl("windowReceiver1").windowEnsure(codeValue);
};

selectUnusedCodeValue.btnCancelClick = function(event){
	justep.xbl("windowReceiver1").windowCancel();
};
