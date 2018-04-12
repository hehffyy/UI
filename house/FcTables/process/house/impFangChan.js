var impFangChan = {};

impFangChan.impHouseClick = function(event) {
	var xzq = justep.xbl("dataParam").getValue("xzq");
	xzq = justep.String.HTMLEncode(xzq);
	var url = justep.Request
			.convertURL("/house/FcTables/process/house/impData.j?action=importAllHouseAction&xzq="
					+ xzq);
	$.ajax({
		async : false,
		type : "POST",
		url : url,
		dataType : "json",
		success : function(msg) {
			new justep.System.showMessage().open({
				msg : msg.msg || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			throw justep.Error.create(XmlHttpRequest.responseText);
		}
	});
};

impFangChan.impTradeQSDetailClick = function(event) {
	var xzq = justep.xbl("dataParam").getValue("xzq");
	xzq = justep.String.HTMLEncode(xzq);
	var url = justep.Request
			.convertURL("/house/FcTables/process/house/impData.j?action=importTradeQSDataAction&xzq="
					+ xzq);
	$.ajax({
		async : false,
		type : "POST",
		url : url,
		dataType : "json",
		success : function(msg) {
			new justep.System.showMessage().open({
				msg : msg.msg || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			throw justep.Error.create(XmlHttpRequest.responseText);
		}
	});
};

impFangChan.impBuildClick = function(event) {
	var xzq = justep.xbl("dataParam").getValue("xzq");
	xzq = justep.String.HTMLEncode(xzq);
	var url = justep.Request
			.convertURL("/house/FcTables/process/house/impData.j?action=importBuildAction&xzq="
					+ xzq);
	$.ajax({
		async : false,
		type : "POST",
		url : url,
		dataType : "json",
		success : function(msg) {
			new justep.System.showMessage().open({
				msg : msg.msg || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {

			throw justep.Error.create(XmlHttpRequest.responseText);
		}
	});
};

impFangChan.repaireImportDataClick = function(event) {
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("xzq", justep.xbl("dataParam").getValue("xzq"));
	var options = {};
	options.action = "repairImportDataAction";
	options.parameters = actionParam;
	options.contentType = "application/json";
	options.dataType = "json";
	options.callback = function(data) {
		if (data.state) {
			new justep.System.showMessage().open({
				msg : data.response || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		} else {
			throw justep.Error.create(data.response.message);
		}
	};

	justep.Request.sendBizRequest2(options);
};

impFangChan.generateFangChanDataClick = function(event) {
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("xzq", justep.xbl("dataParam").getValue("xzq"));
	var options = {};
	options.action = "generateFangChanDataAction";
	options.parameters = actionParam;
	options.contentType = "application/json";
	options.dataType = "json";
	options.callback = function(data) {
		if (data.state) {
			new justep.System.showMessage().open({
				msg : data.response || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		} else {
			throw justep.Error.create(data.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

impFangChan.impHouseRegDataClick = function(event) {
	var xzq = justep.xbl("dataParam").getValue("xzq");
	xzq = justep.String.HTMLEncode(xzq);
	var url = justep.Request
			.convertURL("/house/FcTables/process/house/impData.j?action=importHouseRegDataAction&xzq="
					+ xzq);
	$.ajax({
		async : false,
		type : "POST",
		url : url,
		dataType : "json",
		success : function(msg) {
			new justep.System.showMessage().open({
				msg : msg.msg || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			throw justep.Error.create(XmlHttpRequest.responseText);
		}
	});
};

impFangChan.impSYQClick = function(event) {
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("xzq", justep.xbl("dataParam").getValue("xzq"));
	var options = {};
	options.action = "generateSYQDataAction";
	options.parameters = actionParam;
	options.contentType = "application/json";
	options.dataType = "json";
	options.callback = function(data) {
		if (data.state) {
			new justep.System.showMessage().open({
				msg : data.response || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		} else {
			throw justep.Error.create(data.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

impFangChan.impCFClick = function(event) {
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("xzq", justep.xbl("dataParam").getValue("xzq"));
	var options = {};
	options.action = "generateCFDataAction";
	options.parameters = actionParam;
	options.contentType = "application/json";
	options.dataType = "json";
	options.callback = function(data) {
		if (data.state) {
			new justep.System.showMessage().open({
				msg : data.response || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		} else {
			throw justep.Error.create(data.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

impFangChan.impDYDataClick = function(event) {
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("xzq", justep.xbl("dataParam").getValue("xzq"));
	var options = {};
	options.action = "generateDYDataAction";
	options.parameters = actionParam;
	options.contentType = "application/json";
	options.dataType = "json";
	options.callback = function(data) {
		if (data.state) {
			new justep.System.showMessage().open({
				msg : data.response || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		} else {
			throw justep.Error.create(data.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

impFangChan.impYGDataClick = function(event) {
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("xzq", justep.xbl("dataParam").getValue("xzq"));
	var options = {};
	options.action = "generateYGDataAction";
	options.parameters = actionParam;
	options.contentType = "application/json";
	options.dataType = "json";
	options.callback = function(data) {
		if (data.state) {
			new justep.System.showMessage().open({
				msg : data.response || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		} else {
			throw justep.Error.create(data.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

impFangChan.impYYDataClick = function(event) {
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("xzq", justep.xbl("dataParam").getValue("xzq"));
	var options = {};
	options.action = "generateYYDataAction";
	options.parameters = actionParam;
	options.contentType = "application/json";
	options.dataType = "json";
	options.callback = function(data) {
		if (data.state) {
			new justep.System.showMessage().open({
				msg : data.response || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		} else {
			throw justep.Error.create(data.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

impFangChan.buildRelationClick = function(event) {
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("xzq", justep.xbl("dataParam").getValue("xzq"));
	var options = {};
	options.action = "buildRelationAction";
	options.parameters = actionParam;
	options.contentType = "application/json";
	options.dataType = "json";
	options.callback = function(data) {
		if (data.state) {
			new justep.System.showMessage().open({
				msg : data.response,
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		} else {
			throw justep.Error.create(data.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

impFangChan.impKFSClick = function(event) {
	var options = {};
	options.action = "impKFSDataAction";
	options.contentType = "application/json";
	options.dataType = "json";
	options.callback = function(data) {
		if (data.state) {
			new justep.System.showMessage().open({
				msg : data.response,
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		} else {
			throw justep.Error.create(data.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

impFangChan.impYSDataClick = function(event) {
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("xzq", justep.xbl("dataParam").getValue("xzq"));
	var options = {};
	options.action = "impYSDataAction";
	options.parameters = actionParam;
	options.contentType = "application/json";
	options.dataType = "json";
	options.callback = function(data) {
		if (data.state) {
			new justep.System.showMessage().open({
				msg : data.response,
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		} else {
			throw justep.Error.create(data.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
};

impFangChan.impHXTClick = function(event) {
	var xzq = justep.xbl("dataParam").getValue("xzq");
	xzq = justep.String.HTMLEncode(xzq);
	var url = justep.Request
			.convertURL("/house/FcTables/process/house/impData.j?action=impHXTImageAction&xzq="
					+ xzq);
	$.ajax({
		async : false,
		type : "POST",
		url : url,
		dataType : "json",
		success : function(msg) {
			new justep.System.showMessage().open({
				msg : msg.msg || '完成',
				type : 0,
				img : 'right',
				title : '成功信息'
			});
		},
		error : function(XmlHttpRequest, textStatus, errorThrown) {
			throw justep.Error.create(XmlHttpRequest.responseText);
		}
	});
};
