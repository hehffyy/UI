var mainActivity = {};

mainActivity.model1Ready = function(event) {
	justep.Request.sendBizRequest2({
		contentType : 'application/json',
		dataType : "json",
		action : "queryScheduleInfoAction",
		callback : function(result) {
			if (result.state)
				mainActivity.initSchedule(result.response);
		}
	});
};

mainActivity.initSchedule = function(data) {
	var html1 = "<ul>", html2 = "<ul>", html3 = "<ul>";
	for (i in data) {
		var id = data[i].id == null ? "" : data[i].id;
		var title = data[i].title == null ? "" : data[i].title;
		var kind = data[i].kind == null ? "" : data[i].kind;
		if (kind == 0) {
			html1 += "<li id="+id+"><span class='title'>"+title+"</span></li>";
		} else if (kind == 1) {
			html2 += "<li id="+id+"><span class='title'>"+title+"</span></li>";
		} else {
			html3 += "<li id="+id+"><span class='title'>"+title+"</span></li>";
		}
	}
	html1 += "</ul>";
	html2 += "</ul>";
	html3 += "</ul>";
	$("#ul_sche1").html(html1);
	$("#ul_sche2").html(html2);
	$("#ul_sche3").html(html3);
};
