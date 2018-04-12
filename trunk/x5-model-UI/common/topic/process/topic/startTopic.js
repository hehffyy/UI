var startTopic = {};

startTopic.btnSubmitClick = function(event) {
	if (justep.xbl("dataTopic").saveData()) {
		if (justep.Portal.getWindowId())
			justep.Portal.closeWindow();
		else
			closeWebPage()
			// 是否打开讨论区？
	}
};

startTopic.btnAddRangeClick = function(event) {
	justep.xbl("orgDialog1").open();
};

startTopic.btnCancelClick = function(event) {
	if (justep.Portal.getWindowId())
		justep.Portal.closeWindow();
	else
		closeWebPage();
};

startTopic.parseRanges = function() {
	var $rangeList = $("#rangeList");
	$rangeList.empty();
	var data = justep.xbl("dataRange");
	var n = justep.xbl("dataRange").getCount();
	var html = "";
	for ( var i = 0; i < n; i++) {
		var rowID = data.getID(i);
		if (!rowID)
			continue;
		var name = data.getValue('fParticipatorName', rowID);
		html += "<li class='range' id='"
				+ rowID
				+ "'><div><span>"
				+ name
				+ "</span><img alt='删除' src='"
				+ justep.Request.BASE_URL
				+ "/UI/system/images/templete/delete.gif?language=zh_CN'></div></li>";
	}
	$rangeList.html(html);
	$("li", $rangeList).live("click", startTopic.removeRange);
};

startTopic.removeRange = function(event) {
	debugger;
	var data = justep.xbl("dataRange");
	var $li = $(event.currentTarget);
	var rowID = $li.attr("id");
	data.deleteData([ rowID ]);
	$li.remove();
};

startTopic.orgDialog1Receive = function(event) {
	debugger;
	var rows = event.data;
	var data = justep.xbl("dataRange");
	data.deleteAllRow();
	var options = {
		defaultValues : []
	};
	for ( var i = 0; i < rows.length; i++) {
		var row = rows[i];
		options.defaultValues.push({
			"fParticipator" : row.sFID,
			"fParticipatorName" : row.sName
		});
	}
	data.newData(options);
	startTopic.parseRanges();
};

startTopic.model1ModelConstruct = function(event) {
	startTopic.limitID = justep.Request.URLParams["topic"];
	if (startTopic.limitID) {
		var data = justep.xbl("dataTopic");
		data.autoNew = false;
		data.autoLoad = true;
		justep.xbl("dataTopic").setFilter("topic",
				"B_SYS_Topic = '" + startTopic.limitID + "'");
	}
};

startTopic.windowReceiveer1Receive = function(event) {
	var data = justep.xbl("dataTopic");
	var options = event.data;
	startTopic.limitID = options.topic;
	if (startTopic.limitID) {
		data.setFilter("topic", "B_SYS_Topic = '" + startTopic.limitID + "'");
		data.refreshData();
	}
	startTopic.initData(options);
};

startTopic.model1ModelConstructDone = function(event) {
	startTopic.initData(justep.Request.URLParams);
};

/**
 * 初始化数据
 */
startTopic.initData = function(options) {
	var data = justep.xbl("dataTopic");
	if (data.getCount() == 0) {
		data.newData();
		if (startTopic.limitID) {
			data.setID(data.getCurrentID(), startTopic.limitID);
		}
	}
	if (options.hasOwnProperty("title"))
		data.setValue("fTitle", decodeURI(options.title));
	if (options.hasOwnProperty("content"))
		data.setValue("fContent", decodeURI(options.content));
	if (options.hasOwnProperty("sourceID"))
		data.setValue("fSourceId", decodeURI(options.sourceID));
	if (options.hasOwnProperty("sourceKind"))
		data.setValue("fSourceKind", justep.String
				.HTMLDecode(options.sourceKind));
};

startTopic.dataRangeAfterRefresh = function(event) {
	startTopic.parseRanges();
};

startTopic.dataTopicBeforeSave = function(event) {
	event.source.setValue("fLastModifyTime", justep.System.datetime());
};

startTopic.dataTopicSaveCommit = function(event) {
	// 已经回复过的进行提醒
};
function closeWebPage() {
	if (window.opener != this) {
		window.open('', '_self');
		window.close();
	}
}
