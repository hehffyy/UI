var processChart = {};

processChart.isPertLoaded = false;
processChart.isMasterDetail = false;
processChart.loadIdeaFrame = false;
processChart.task = "";
processChart.model1Load = function(event) {
	processChart.task = justep.Request.URLParams["task"];
	justep.xbl('track').load();
};

processChart.tabPage1Select = function(event) {
	if (!processChart.isPertLoaded) {
		processChart.isPertLoaded = true;
		justep.xbl("pert").load();
	}
};
// 关联关系
processChart.processMasterDetailChartTabSelect = function(event) {
	if (!processChart.isMasterDetail) {
		processChart.isMasterDetail = true;
		var mdFrame = justep.xbl("mdFrame");
		mdFrame.open({},
				"/UI/system/service/process/processMasterDetail.w?taskID="
						+ processChart.task);
	}
};

processChart.tabBlyjSelect = function(event) {
	if (!processChart.loadIdeaFrame) {
		var mdFrame = justep.xbl("ideaFrame");
		if(justep.Request.URLParams["pi"]){
			mdFrame.open({}, "/UI/SA/task/taskCenter/banliIdea.w?pi="
					+ justep.Request.URLParams["pi"]);
			processChart.loadIdeaFrame = true;
		}else if(justep.Request.URLParams["bizRecID"]){
			mdFrame.open({}, "/UI/SA/task/taskCenter/banliIdea.w?bizRecID="
					+ justep.Request.URLParams["bizRecID"]);
			processChart.loadIdeaFrame = true;
		}
	}
};
