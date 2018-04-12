var oneTopic = {};

/**
 * 重新绘制回复信息
 */
oneTopic.dataReplyAfterRefresh = function(event) {
	var $replyList = $("#replyList");
	$replyList.empty();
	var data = event.source;
	var n = data.getCount();
	for ( var i = 0; i < n; i++) {
		var rowID = data.getID(i);
		oneTopic.appendOneTopic(rowID, data.getValue("fContent", rowID), false,
				data.getValue("fReplyId", rowID), n);
	}
};

oneTopic.loadData = function(options) {
	debugger;
	if (options.topic) {
		oneTopic.topic = options.topic;
		var data = justep.xbl("dataTopic");
		data.setFilter("topic", "B_SYS_Topic = '" + options.topic + "'");
		// if (data.loaded)
		data.refreshData();
		// else
		// data.loadData();
		var reply = justep.xbl("dataReply");
		reply.setFilter("topic", "fTopicID = '" + options.topic + "'");
		if (options.auth) {
			reply.setFilter("auth", "fReplyId = '" + options.auth + "'");
		}
		// if (reply.loaded)
		reply.refreshData();
		// else
		// reply.loadData();
		oneTopic.appendOneTopic(oneTopic.topic, data.getValue("fContent",
				options.topic), true, justep.Context.getCurrentPersonID(), 0);
	}

};

oneTopic.windowReceiver1Receive = function(event) {
	oneTopic.loadData(event.data);
};

oneTopic.getTopicLink = function(event) {
	var $topic = $(event.currentTarget).parents("div.cl");
	var href = location.protocol + "//" + location.host
			+ "/UI/common/topic/process/topic/oneTopic.w?&topic="
			+ oneTopic.topic;
	if (false == $topic.attr("topic")) {
		href += "&reply=" + $topic.attr("id");
	}
};

oneTopic.setClipboardData = function(type, text) {
	clipboardData.clearData();
	clipboardData.setData(type, text);
};

/**
 * 只看作者
 */
oneTopic.seeAuth = function(event) {
	alert("只看作者");
	var $topic = $(event.currentTarget).parents("div.cl");
	var id = $topic.attr("id");
	if (false == $topic.attr("topic")) {

	} else {

	}
};

/**
 * 拷贝连接
 */
oneTopic.copyTopicLink = function(event) {
	oneTopic.setClipboardData("text", oneTopic.getTopicLink(event));
	alert("地址复制成功");
};

/**
 * 回复
 */
oneTopic.replyReply = function(event) {
	alert("replyReply");
};

/**
 * 回复
 */
oneTopic.replyTopic = function(event) {
	alert("replyReply");
};

/**
 * 编辑
 */
oneTopic.editTopic = function(event) {
	alert("editTopic");
};

/**
 * 改变排序
 */
oneTopic.turnOrder = function(event) {
	alert("turnOrder");
};

/**
 * 添加一条
 */
oneTopic.appendOneTopic = function(id, content, isTopic, auth, cnt) {
	var canEdit = justep.Context.getCurrentPersonID() == auth;
	var top = "<div class='pi'>"
			+ (isTopic ? "" : "<strong><a class='copylink'><em>" + cnt
					+ "</em>楼</a></strong>")
			+ "<div class='pti'><div class='pdbt'></div><div class='authi'>"
			+ "<a class='authicn'>&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp</a><em>发表于 <span title='2015-3-15 19:41:31'>今天</span></em>"
			+ "<span class='pipe'>|</span><a class='seeAuth'>只看该作者</a>"
			+ "<span class='pipe'>|</span><a class='turnOrder'>倒序浏览</a>"
			+ "</div></div></div>";
	var content = "<div class='pct'><div class='pcb'><div class='t_fsz'>" +
	// 引用
	"<div class='quote'></div>" +
	// content
	"<div>" + content + "</div>" +
	//
	"</div></div></div>";

	var tr1 = "<tr><td class='plc'>" + top + content + "</td></tr>";
	var tr2 = "<tr><td class='plc'><div class='po'><div class='pob cl'>"
			+ "<em>"
			+ (canEdit ? "<a class='editp'>编辑</a>" : "<a class='fastre'>回复</a>")
			+ "</em>" + "</div></div></td></tr>";
	var tr3 = "<tr><td></td></tr>";
	var tr4 = "<tr class='ad'><td class='plc'></td><td class='plc'></td></tr>";
	var html = "<div class='pls cl' id='" + id + "' " + "topic='" + isTopic
			+ "'"
			+ "><table class='block' cellspacing='0' cellpadding='0'><tbody>"
			+ tr1 + tr2 + tr3 + tr4 + "</tbody></table></div>";
	debugger;
	if (isTopic) {
		var $topic = $("#topic");
		$topic.empty();
		$topic.append(html);
	} else {
		$("#replyList").append(html);
	}
	var $the = $("#" + id);
	$("a.turnOrder", $the).live("click", oneTopic.turnOrder);
	$("a.copylink", $the).live("click", oneTopic.copyTopicLink);
	$("a.fastre", $the).live("click", oneTopic.replyReply);
	$("a.editp", $the).live("click", oneTopic.editTopic);
	$("a.seeAuth", $the).live("click", oneTopic.seeAuth);

};

oneTopic.model1XBLLoaded = function(event) {
	oneTopic.loadData(justep.Request.URLParams);
};

oneTopic.model1ModelConstruct = function(event) {
	$("#psnIMG").css("background-color", "transparent");
};

oneTopic.dataTopicAfterRefresh = function(event) {
	var data = event.source;
	if (data.getCount() > 0) {
		var dP = justep.xbl("dataPerson");
		dP.setFilter("sID", "SA_OPPerson='" + data.getValue("fOriginatorId")
				+ "'");
		dP.refreshData();
		$("#title").html(data.getValue("fTitle"));
	}
};
