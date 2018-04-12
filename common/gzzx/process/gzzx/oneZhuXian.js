var oneZhuXian = {};

oneZhuXian.btnApplyClick = function(event) {
	justep.XData.refreshControls();
	justep.xbl("myZhuXian").saveData();
	justep.xbl("funcReceiver").windowEnsure();
};

oneZhuXian.btnCancelClick = function(event) {
	justep.xbl("funcReceiver").windowCancel();
};

oneZhuXian.funcReceiverReceive = function(event) {
	if (event.data && event.data.rowid) {
		var data = justep.xbl("myZhuXian"), filters = data.filters;
		debugger;
		filters.setFilter("_idFilter", "B=:id");
		filters.setStringVar("id", event.data.rowid);
		data.refreshData();
	} else {
		justep.xbl("myZhuXian").newData();
	}
};

oneZhuXian.model1ModelConstruct = function(event) {
	var promise = butone.Context.getBindModelPromise();
	promise && promise.then(oneZhuXian._initBindModel);
};

oneZhuXian._initBindModel = function() {
	var Composition = butone.Composition, $2 = require("jquery");
	var model = butone.Context.getBindModel();
	model.registeData("myZhuXian");
	var modelExtend = {};
	butone.Util.apply(model, modelExtend);
	Composition.bindAndShow($2("#rootView").get(0), model);
};
