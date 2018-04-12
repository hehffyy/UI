var mainActivity = {};
mainActivity.diff = function(field) {

	if (field[0] || field.length != 0) {
		var data = justep.xbl('slbData');
		var fieldValue = data.getValue(field[0].fieldName);
		var date = new Date(fieldValue);
		var now = new Date();
		return 5 - justep.Date.diff(date, now, 'd');
	}

};

mainActivity.trigger8Click = function(event) {

	butone.Dialog
			.question(
					"确认要作废吗？",
					null,
					function(e) {
						if (e.status == "yes" || e.status == "ok") {
							var data = justep.xbl('slbData');
							var rowID = data.getCurrentID();
							var sql_update = "update b_prepbizrec set fstatus ='作废'  where fBizRecId='"
									+ data.getValue("FBIZRECID", rowID) + "'";
							butone.Request.executeJavaExpr(
									'updateBizData(:sql_update,:dataModel)',
									'sql_update', sql_update, 'dataModel', '');
							data.refreshData();
						}
					});

};

 
 

mainActivity.trigger7Click = function(event) {
	mainActivity.openPreBizRec('browse', 'do', event);
};

mainActivity.preBizRecDataAfterRefresh = function(event) {
	//var grid = justep.xbl("grid1").grid;
	// grid.groupBy(0, [ "#title", "", "", "", "", "", "", "", "", "", "", ""
	// ]);
	
	var slbData = justep.xbl("slbData");
	if(slbData.getCount()==0){
 
		justep.xbl("trigger7").setDisabled(true);
		justep.xbl("trigger4").setDisabled(true);
		justep.xbl("trigger8").setDisabled(true);
	}else{
 
		justep.xbl("trigger7").setDisabled(false);
		justep.xbl("trigger4").setDisabled(false);
		justep.xbl("trigger8").setDisabled(false);
	}
	
};

mainActivity.trigger9Click = function(event) {
	justep.xbl("windowDialog1").open({djtype:'登记类'});
};

/**
 * name:windowDialog#onSend}
 * 
 * @param {function}
 *            onReceive 接收运行页面回传数据，参见{@link UI.windowDialog#onReceive}
 * @param {function}
 *            onInit 初始化事件，参见{@link UI.windowDialog#onInit}
 * @param {function}
 *            onOpen 对话框打开事件，参见{@link UI.windowDialog#onOpen}
 * @param {function}
 *            onClose 对话框关闭事件，参见{@link UI.windowDialog#onClose} description:
 *            构造函数
 * @example //动态创建 var dialog = new justep.WindowDialog(id, url, title);
 */
mainActivity.windowDialog1Send = function(event) {
	var data = event.data || {};
	data.actionType = 'insert';
	return data;
};

/**
 * name:windowDialog#onReceive}
 * 
 * @param {function}
 *            onInit 初始化事件，参见{@link UI.windowDialog#onInit}
 * @param {function}
 *            onOpen 对话框打开事件，参见{@link UI.windowDialog#onOpen}
 * @param {function}
 *            onClose 对话框关闭事件，参见{@link UI.windowDialog#onClose} description:
 *            构造函数
 * @example //动态创建 var dialog = new justep.WindowDialog(id, url, title);
 */
mainActivity.windowDialog1Receive = function(event) {
	if (event.data.actionType == 'insert')
		mainActivity.openPreBizRec('insert', 'do', event);
	justep.xbl("windowDialog1").close();
};

mainActivity.openPreBizRec = function(action, type, event) {

	var main = justep.xbl("slbData");
	if(window.document.getElementById("view2").hidden){
		main = justep.xbl("ybData");
	}
	
	var rowID = main.getCurrentID();
	var bizRecId = justep.Utils.randomString();

	var djdl, djxl, zmlb;
	if (action == 'browse') {
		bizRecId = main.getValue("FBIZRECID", rowID);
		djdl = main.getValue("DJDL", rowID);
		djxl = main.getValue("DJXL", rowID);
		zmlb = main.getValue("DJLX", rowID);
		
		
	} else {
		djdl = event.data.djdl;
		djxl = event.data.djxl;
		zmlb = event.data.zmlb;
	}

	var mapping = this.getMapping(djdl, djxl,zmlb);
	if (mapping.error) {
		return;
	}
 
	var openParams = event.data || {};
	openParams.fywdm = mapping.fywdm;
	openParams.fywmc = mapping.fywmc;
	openParams.fxbts = mapping.fxbts;
	openParams.xbrq = mapping.xbrq;
	openParams.executorName = mapping.executorName;
	openParams.executorId = mapping.executorId;
	openParams.ftype = mapping.ftype;
	openParams.sfxyrt = mapping.sfxyrt;
	openParams.kzsfxyrt = mapping.kzsfxyrt;
	
	var realUrl = mapping.ftysjURL + "?bizRecId=" + bizRecId + "&openParams="
			+ window.encodeURI("'"+JSON.stringify(openParams)+"'");
 

	if (type == 'detail')
		realUrl += "&activity-pattern=detail";
	var options = {};
	options.data = {
		openParams : openParams
	};
	options.url = realUrl;
	options.process = mapping.fBrowseProcess;
	options.activity = mapping.ftysjActivity;
	options.title = "统一收件受理表";

	var runner = new justep.WindowRunner();
	runner.attachEvent("onReceive", function(event) {
		main.refreshData();
		// main.refreshData(); 这个刷不了，不知道为啥
		// window.location.reload();//这个可以刷新

	}, runner);
	runner.open2(options);

	justep.xbl("windowDialog1").close();

};

/**
 * name:data#onValueChanged description: <b>[回调型事件]</b>数据变化
 * 
 * @param {object}
 *            event <br/><b>结构如下：</b> <xmp> { "source" : 组件的js对象, "column" :
 *            列, "rowIndex" : 行索引, "value" : 新值, "originalValue" : 旧值 } </xmp>
 */
mainActivity.qllxDataValueChanged = function(event) {
	if (event.column == 'djdlbh' || event.column == 'qllxbh') {
		var qllxData = justep.xbl("qllxData");
		var qllxBizData = justep.xbl("qllxBizData");
		var slbData = justep.xbl("slbData");
		var ybData = justep.xbl("ybData");
		var djdlbh = qllxData.getValue("djdlbh");
		var djxlbh = qllxData.getValue("qllxbh");

		var filter = "1=1";
	 
		if (djdlbh != '') {
			filter += " and DJDL='" + djdlbh + "'";
		}
		
		if (djxlbh != '') {
			filter += " and DJXL='" + djxlbh + "'";
		}
		if (window.document.getElementById("view2").hidden) {
			ybData.setFilter("filter1", filter);
			ybData.refreshData();
		} else {
			slbData.setFilter("filter1", filter);
			slbData.refreshData();
		}

	}
};

mainActivity.tabPage2Select = function(event) {
 
 
	window.document.getElementById("view2").hidden = true;
	window.document.getElementById("view5").hidden = false;

	var ybData = justep.xbl("ybData");
	var slbData = justep.xbl("slbData");

	ybData.setFilter("filter1", slbData.getFilter("filter1"));
	ybData.refreshData();

};

mainActivity.tabPage1Select = function(event) {

 
	window.document.getElementById("view2").hidden = false;
	window.document.getElementById("view5").hidden = true;

	var ybData = justep.xbl("ybData");
	var slbData = justep.xbl("slbData");

	slbData.setFilter("filter1", ybData.getFilter("filter1"));
	slbData.refreshData();

};

mainActivity.model1ModelConstruct = function(event) {
	window.document.getElementById("view2").hidden = false;
	window.document.getElementById("view5").hidden = true;
};

mainActivity.trigger13Click = function(event) {
	var qllxData = justep.xbl("qllxData");
	qllxData.setValue("qllxbh", '');
	qllxData.setValue("qllx", '');
	qllxData.setValue("djdlbh", '');
	qllxData.setValue("djdl", '');

	var slbData = justep.xbl("slbData");
	var ybData = justep.xbl("ybData");

	if (window.document.getElementById("view2").hidden) {
		ybData.setFilter("filter1", "");
		ybData.refreshData();
	} else {
		slbData.setFilter("filter1", "");
		slbData.refreshData();
	}

};

mainActivity.trigger18Click = function(event) {
	mainActivity.openPreBizRec('browse', 'detail', event);
};

mainActivity.grid1RowDblClick = function(event) {
	mainActivity.openPreBizRec('browse', 'do', event);
};
 

mainActivity.trigger4Click = function(event) {

	butone.Dialog
			.question(
					"确认要删除吗，请务必删除原权利引档信息后进行此删除操作？",
					null,
					function(e) {
						if (e.status == "yes" || e.status == "ok") {
							var data = justep.xbl('slbData');
							var rowID = data.getCurrentID();
							var sql_update = "delete  from b_prepbizrec  where  fstatus ='未收件'  and  fBizRecId='"
									+ data.getValue("FBIZRECID", rowID) + "'";
							var sql_update_two = "delete  from t_ywslb  where  status ='草拟'  and  fBizRecId='"
									+ data.getValue("FBIZRECID", rowID) + "'";

							butone.Request
									.executeJavaExpr(
											'updateBizData(:sql_update_two,:dataModel)',
											'sql_update_two', sql_update_two,
											'dataModel', '');
							butone.Request.executeJavaExpr(
									'updateBizData(:sql_update,:dataModel)',
									'sql_update', sql_update, 'dataModel', '');

							data.refreshData();
						}
					});

};

// 返回登记类型对应的流程环节信息
mainActivity.getMapping = function(djdl, djxl,zmlb) {

	var result;
	var options = {};
	var param = new justep.Request.ActionParam();
	param.setString("fdjdlbh", djdl);
	param.setString("fdjxlbh", djxl);
	param.setString("fzmlmc", zmlb);
	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "getActivityMappingAction";
	options.callback = function(callbackData) {
		callbackData.ignoreError = false;
		if (callbackData.state) {
			result = callbackData.response;
			if (result.error) {
				butone.Dialog.info(result.error, null);
			}

		} else {
			butone.Dialog.info("执行后台函数失败!", callbackData.response.message);
		 
		}
	};
	justep.Request.sendBizRequest2(options);
	return result;
};

mainActivity.grid2RowDblClick = function(event) {
	mainActivity.openPreBizRec('browse', 'detail', event);
};

mainActivity.model1XBLLoaded = function(event) { 

};

 
 

/**
	name:bizData#onAfterRefresh
	description: <b>[回调型事件]</b>业务数据刷新后
	@param {object} event 
	<br/><b>结构如下：</b>
	<xmp> 
	{
		"source" : 组件的js对象
		"limit" : 页大小, 
		"offset" : 偏移,
		"success" : 是否成功刷新
	}
	</xmp>	
*/
mainActivity.ybDataAfterRefresh = function(event){
var ybData = justep.xbl("ybData");
	if(ybData.getCount()==0){
		justep.xbl("trigger18").setDisabled(true);
	}else{
		justep.xbl("trigger18").setDisabled(false);
 
	}	
};

mainActivity.trigger3Click = function(event){
	justep.xbl("windowDialog1").open({djtype:'证明类'});
};

mainActivity.trigger6Click = function(event){
	justep.xbl("windowDialog1").open({djtype:'权籍类'});
};
