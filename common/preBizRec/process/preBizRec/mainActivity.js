var mainActivity = {};

mainActivity.btnYsClick = function(event) {
	var me = this;
	var bizRecId = me.dsRec.getCurrentId();
	if (!bizRecId || (!!bizRecId && this.dsRec.getValue('fStatus') == "预审通过"))
		return;
	butone.Dialog.question("确认预审通过吗 ？", "", function(event) {
		if (event.status == "no")
			return;
		butoneEx.Common.callAction({
			bizRecId : bizRecId
		}, "ystgAction", null, null);
		var offset = me.dsRec.offset - me.dsRec.limit;
		if (offset < 0)
			offset = 0;
		me.dsRec.refreshPageData(offset, me.dsRec.limit, false);
		var index = me.dsRec.getIndex(bizRecId);
		me.dsRec.setIndex(index);
	});
};

mainActivity.model1Load = function(event) {
	this.dsRec = justep.xbl("dsRec");
};

mainActivity.btnByslClick = function(event) {
	if (this.dsRec.getCurrentId())
		justep.xbl("byslDlg").open();
};

mainActivity.byslDlgSend = function(event) {
	event.data = {
		bizRecId : justep.xbl("dsRec").getCurrentID()
	};
	return event.data;
};

mainActivity.byslDlgReceive = function(event) {
	var reason = event.data;
	var ds = justep.xbl("dsRec");
	var bizRecId = ds.getCurrentID();
	butoneEx.Common.callAction({
		bizRecId : bizRecId,
		reason : reason
	}, "byslAction", null, null);
	ds.refreshData();
};

mainActivity.btnLookClick = function(event) {
debugger;
	var url = "";
	var bizRecId = justep.xbl("dsRec").getCurrentId();
	if (!bizRecId)
		return;

	if (url == "") {
		/*
		 * butone.Window.hint("未配置案卷查看地址！",1000); return;
		 */
		var fBizMappingId = justep.xbl("dsRec").getValue("fBizMappingId");
		var ds = justep.xbl("dsBiz");
		ds.setFilter("sys_Filter", "T_SYS_SPSX_YWLC.fID='" + fBizMappingId + "'");
		ds.refreshData();
		url = ds.getValue("fBrowUrl");
		if(url==""){
		   justep.xbl("tabPanel1").setTabActive("tabPage2");
		   return;
		}
	}
	var process = url.substring(0, url.lastIndexOf('/'));
	var activity = url.substring(process.length + 1, url.length - 2);
	var processName = process.substring(process.lastIndexOf('/') + 1);
	process = process.replace("/UI", "");
	process = process + "/" + processName + "Process";
	url = url + "?activity-pattern=detail&bizRecId=" + bizRecId;
	var runner = justep.xbl("browRunner");
	runner.setTitle("上报数据审查");
	runner.setURL(url);
	runner.setProcess(process);
	runner.setActivity(activity);
	runner.open2();
};

mainActivity.btnSlClick = function(event) {
	var me = this;
	var bizRecId = me.dsRec.getCurrentID();
	if (!bizRecId)
		return;
	var status = me.dsRec.getValue("fStatus");
	if (status != "预审通过") {
		butone.Dialog.error("请先执行[网上预审]操作");
		return;
	}
	if (me.dsRec.getValue("fProcessName") == null
			|| me.dsRec.getValue("fProcessName") == "") {
		butone.Dialog.error("请在详细信息选择业务类型！");
		return;
	}

	butone.Dialog.question("确认收件吗 ？", "", function(event) {
		if (event.status == "no")
			return;
		butoneEx.Common.callAction({
			bizRecId : bizRecId
		}, "slAction", null, null);
		me.dsRec.refreshData();
		var index = me.dsRec.getIndex(bizRecId);
		me.dsRec.setIndex(index);
		butone.BizRec.openBizRec(bizRecId, true);
	});
};

mainActivity.browAttach = function(rowID, bDown) {
	var ds = justep.xbl("dsFiles");
	var doc = ds.getValue("fDocIds", rowID);
	if (doc == "")
		return;
	doc = JSON.parse(doc);
	if (doc.length == 0)
		return;
	doc = doc[0];
	if (!bDown)
		justep.doc.InnerUtils.browseDocByFileID(doc.docPath, doc.docName,
				doc.fileID);
	else
		justep.doc.InnerUtils.downloadDocByFileID(doc.docPath, doc.fileID);
};

mainActivity.grid1_fDocIdsRender = function(event) {
	return "<u><a href='#'  onclick=\"mainActivity.browAttach('"
			+ event.rowID
			+ "',false);\" >查看附件</a></u>&nbsp&nbsp|&nbsp&nbsp<u><a href='#'  onclick=\"mainActivity.browAttach('"
			+ event.rowID + "',true);\" >下载附件</a></u>";
	// return "<u><a href='#' data-toggle='tooltip' >查看</a></u>";
};

mainActivity.gridSelect1Dropdown = function(event) {
	var sxbh = justep.xbl("dsRec").getValue("fItemCode");
	var ds = justep.xbl("dsBiz");
	ds.setFilter("sys_Filter", "fFWSXBH='" + sxbh + "'");
	ds.refreshData();
};

mainActivity.gridSelect1Closeup = function(event) {
	var mapId = justep.xbl("dsBiz").getCurrentID();
	var ds = justep.xbl("dsRec");
	if (mapId) {
		var bizRecId = ds.getCurrentId();
		butoneEx.Common.callAction({
			bizRecId : bizRecId,
			bizMappingId : mapId
		}, "setBizMapAction", null, null);
	}
};

mainActivity.gridMainRowDblClick = function(event) {
	justep.xbl("tabPanel1").setTabActive("tabPage2");
};
