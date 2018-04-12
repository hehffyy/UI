var banLiGuoCheng = {};

banLiGuoCheng.processPertChart = false;
banLiGuoCheng.loadRecRelationFrame = false;
banLiGuoCheng.pi = "";
banLiGuoCheng.taskID = "";
banLiGuoCheng.bizRecID = "";
banLiGuoCheng.model1Load = function(event) {
	banLiGuoCheng.pi = justep.Request.URLParams["pi"];
	banLiGuoCheng.taskID = justep.Request.URLParams["taskID"];
	banLiGuoCheng.bizRecID = justep.Request.URLParams["bizRecID"];
	banLiGuoCheng.tabPage2Select();
};

banLiGuoCheng.tabPage1Select = function(event) {
	if (!banLiGuoCheng.pi)
		return;
	if (!banLiGuoCheng.processPertChart) {
		banLiGuoCheng.processPertChart = true;
		justep.xbl('processPertChart1').loadByPI(banLiGuoCheng.pi);
		banLiGuoCheng.loadRelationBizRecPertChart();
	}
};

banLiGuoCheng.loadRelationBizRecPertChart = function() {
	var actionParam = new justep.Request.ActionParam();
	if (banLiGuoCheng.bizRecID)
		actionParam.setString("bizRecId", banLiGuoCheng.bizRecID);
	if (banLiGuoCheng.pi)
		actionParam.setString("flowId", banLiGuoCheng.pi);

	var options = {};
	options.process = justep.Context.getCurrentProcess();
	options.activity = justep.Context.getCurrentActivity();
	options.action = "queryAllRelationBizRecAction";
	options.parameters = actionParam;
	options.dataType = "application/json";
	var response = justep.Request.sendBizRequest2(options);
	if (justep.Request.isBizSuccess(response, options.dataType)) {
		var result = justep.Request.responseParseJSON(response), rows = result.data.value.rows;
		var $tabPage1 = $("#tabPage1"), ids = [];
		for ( var n in rows) {
			var row = rows[n], flowid = row.FFLOWID.value;
			$tabPage1
					.append('<div class="divPertChart" style="width:100%"><div class="processPertChart" component="/UI/system/components/processChart.xbl.xml#processPertChart" id="pert_'
							+ flowid
							+ '" style="position: relative;" flowid="'
							+ flowid
							+ '">'
							+ '<div>'
							+ row.FTITLE.value
							+ '</div>'
							+ '<div style="display:none">'
							+ '<div chartControlID="bot_GLOBAL_ID_'
							+ flowid
							+ '" xblid="interface"/>'
							+ '</div>'
							+ '<div id="bot_GLOBAL_ID_'
							+ flowid
							+ '" style="width:100%;height:100%;overflow:auto;"/>'
							+ '</div></div>');
			ids
					.push({
						id : 'pert_' + flowid,
						name : '/UI/system/components/processChart.xbl.xml#processPertChart'
					});
		}
		if (ids.length > 0) {
			$currPert = $(justep.xbl('processPertChart1').domNode);
			$currPert.prepend("<div>当前案卷</div>")
					.height($currPert.height() + 30);
			justep.XBLObject.initXBL(ids);
			for ( var n in ids) {
				var pert = justep.xbl(ids[n].id);
				var $domNode = $(pert.domNode);
				try {
					pert.loadByPI($domNode.attr("flowid"));
					$domNode.height($domNode.children(":last")
							.children("div:first").height() + 30);
				} catch (e) {
					$domNode.parent().remove();
				}
			}
		}

	}
};

banLiGuoCheng.tabPage3Select = function(event) {
	if (!banLiGuoCheng.loadRecRelationFrame) {
		banLiGuoCheng.loadRecRelationFrame = true;
		var mdFrame = justep.xbl("loadRecRelationFrame");
		mdFrame.open({},
				"/UI/system_X/service/process/processMasterDetail.w?taskID="
						+ banLiGuoCheng.taskID + "&bizRecID="
						+ banLiGuoCheng.bizRecID);
	}
};

banLiGuoCheng.tabPage2Select = function(event) {
	if (!banLiGuoCheng.pi)
		return;
	justep.xbl('processTrackChart1').loadByPI(banLiGuoCheng.pi);
};

banLiGuoCheng.tabIdeaSelect = function(event){
debugger;
	if (!banLiGuoCheng.loadIdeaFrame) {
		banLiGuoCheng.loadIdeaFrame = true;
		var mdFrame = justep.xbl("ideaFrame");
		mdFrame.open({},
				"/UI/SA_X/task/taskCenter/banliIdea.w?bizRecID="
						+ banLiGuoCheng.bizRecID);
	}
};
