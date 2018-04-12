var lpb = {};

lpb.model1ModelConstruct = function(event) {

};

lpb._initBindModel = function() {
	// var Composition = butone.Composition, $2 = require("jquery");
	// var model = butone.Context.getBindModel();
	// var modelExtend = {};
	// butone.Util.apply(model, modelExtend);
	// Composition.bindAndShow($2("#rootView").get(0), model);
};

lpb.model1XBLLoaded = function(event) {
	var view = justep.xbl("buildingView1");

	// 状态值与标签转义，如果状态值是整数，建议使用数组，否则使用对象
	// view.setZTLabel({
	// fz : [ "无", "确权", "发证" ],
	// dj : [ "无", "冻结" ],
	// dy : [ "无", "在建", "抵押" ],
	// cf : [ "无", "预查", "查封" ],
	// yy : [ "无", "异议" ],
	// yg : [ "无", "预告" ]
	// });
	// view.setZTLabel({
	// fz : [ "", "", "" ],
	// dj : [ "", "" ],
	// dy : [ "", "", "" ],
	// cf : [ "", "", "" ],
	// yy : [ "", "" ],
	// yg : [ "", "" ]
	// });
	// 否则使用对象
	// view.setZTLabel({
	// fz : {
	// "0" : "无",
	// "1" : "确权",
	// "2" : "发证"
	// },
	// dj : {
	// "0" : "无",
	// "1" : "冻结"
	// },
	// dy : {
	// "0" : "无",
	// "1" : "在建",
	// "2" : "抵押"
	// },
	// cf : {
	// "0" : "无",
	// "1" : "预查",
	// "2" : "查封"
	// },
	// yy : {
	// "0" : "无",
	// "1" : "异议"
	// },
	// yg : {
	// "0" : "无",
	// "1" : "预告"
	// }
	// });
	// 申明哪些状态值不显示图标
	// view.setZTHidden({
	// fz : [ 0 ],
	// dj : [ 0 ],
	// dy : [ 0 ],
	// cf : [ 0 ],
	// yy : [ 0 ],
	// yg : [ 0 ]
	// });

};

lpb.buildingView1Inited = function(event) {
	// 组件初始化完成之后才能调用刷新
	var view = justep.xbl("buildingView1");
	var dataZRZ = justep.xbl("dataZRZ");
	view.setZRZName(dataZRZ.getValue("name"));
	view.setZRZID(dataZRZ.getValue("id"));
	view.refresh();
	lpb._buildingView1Inited = true;
};

lpb.dataZRZIndexChanged = function(event) {
	if (lpb._buildingView1Inited) {
		var dataZRZ = event.source;
		view.setZRZName(dataZRZ.getValue("name"));
		view.setZRZID(dataZRZ.getValue("id"));
		view.refresh();
	}
};

lpb.input2Click = function(event) {
	var view = justep.xbl("buildingView1");
	view.setZRZName("abcdefg");
	view.setZRZID("01D142AC77CF4A40A622845495FFBEAD");
	view.refresh();
	// justep.xbl("buildingView2").refresh($("#input1").val());
};

lpb.input3Click = function(event) {
	justep.xbl("buildingView1").setShowZRZName(true);
};

lpb.input4Click = function(event) {
	justep.xbl("buildingView1").setShowZRZName(false);
};

lpb.buildingView1CreateQueryActionParam = function(event) {
	var params = new justep.Request.ActionParam();
	params.setString("zrzid", $("#input1").val());
	return params;
};

lpb.buildingView1HIDClick = function(event) {
	alert("户ID:" + event.hid);
};

lpb.buildingView1ShowRecInfo = function(event) {
	alert("RECID:" + event.recid);
};

lpb.buildingView1HZTClick = function(event) {
	alert("状态名:" + event.ztName + ",状态值:" + event.ztValue);
};

lpb.buildingView2HIDClick = function(event) {
	alert("户ID:" + event.hid);
};

lpb.input6Click = function(event) {
	var view = justep.xbl("buildingView1");
	$(".colH", "#buildingView1").css("background-color", "#fff");
	var rows = view.find($("#input5").val(), false);// true 返回第一个，false返回所有
	if (rows.length > 0) {
		for ( var n in rows) {
			$(rows[n].element).css("background-color", "#fff0f0");
		}
		view.scrollTo(rows[0].element);
	}

};

lpb.buildingView1AfterRender = function(event) {
	if (event.row.HID == "abc")
		$(event.element).css("background-color", "red");
};

lpb.buildingView1ChangeCH = function(event) {
	alert("move " + event.hid + " to " + event.ch)
};

lpb.input7Click = function(event) {
	justep.xbl("buildingView1").test();
};
