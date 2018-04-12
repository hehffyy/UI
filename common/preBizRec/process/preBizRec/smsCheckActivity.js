var smsCheckActivity = {};

smsCheckActivity.getCheckedIds = function() {
	var result = "";
	var ds = justep.xbl("daRec");
	for ( var i = 0; i < ds.getCount(); i++) {
		var id = ds.getID(i);
		var fcheck = ds.getValue("fCheck", id);
		if (fcheck == 1)
			result = result == "" ? "'" + id + "'" : result + ",'" + id + "'";
	}
	return result;
};

smsCheckActivity.btnQueryClick = function(event) {
	var ds = justep.xbl("daRec");
	ds.refreshData();
};

smsCheckActivity.model1Load = function(event) {
	this.cbWshChange(null);
};

smsCheckActivity.btnCheckClick = function(event) {
	var me = this;
	var ds = justep.xbl("daRec");
	var ids = me.getCheckedIds();
	if (ids == "")
		return;
	butone.Dialog.question("确认审核通过吗？", "", function(evt) {
		if (evt.status == "yes") {
			butoneEx.Common.callAction({
				ids : ids,
				state : '已审核'
			}, 'checSmsAction');
			ds.refreshData();
		}
	});
};

smsCheckActivity.btnUnCheckClick = function(event) {
		var me = this;
	var ds = justep.xbl("daRec");
	var ids = me.getCheckedIds();
	if (ids == "")
		return;
	butone.Dialog.question("确认审核不通过吗？", "", function(evt) {
		if (evt.status == "yes") {
			butoneEx.Common.callAction({
				ids : ids,
				state : '不发送'
			}, 'checSmsAction');
			ds.refreshData();
		}
	});
};

smsCheckActivity.cbWshChange = function(event) {
	var ds = justep.xbl("daRec");
	var bWsh = document.getElementById("cbWsh").checked;
	if (bWsh) {
		ds.setFilter("filter_wsh",
				"B_PrepBizRec.SMSShzt is null or B_PrepBizRec.SMSShzt='未审核'");
		justep.xbl("btnCheck").setDisabled(false);
		justep.xbl("btnUnCheck").setDisabled(false);
	} else {
		ds.setFilter("filter_wsh", "1=1");
		justep.xbl("btnCheck").setDisabled(true);
		justep.xbl("btnUnCheck").setDisabled(true)
	}
	ds.refreshData();
};
