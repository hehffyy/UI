//resize of div 
(function($, h, c) {
	var a = $([]), e = $.resize = $.extend($.resize, {}), i, k = "setTimeout", j = "resize", d = j
			+ "-special-event", b = "delay", f = "throttleWindow";
	e[b] = 10;
	e[f] = true;
	$.event.special[j] = {
		setup : function() {
			if (!e[f] && this[k]) {
				return false;
			}
			var l = $(this);
			a = a.add(l);
			$.data(this, d, {
				w : l.width(),
				h : l.height()
			});
			if (a.length === 1) {
				g();
			}
		},
		teardown : function() {
			if (!e[f] && this[k]) {
				return false;
			}
			var l = $(this);
			a = a.not(l);
			l.removeData(d);
			if (!a.length) {
				clearTimeout(i);
			}
		},
		add : function(l) {
			if (!e[f] && this[k]) {
				return false;
			}
			var n;
			function m(s, o, p) {
				var q = $(this), r = $.data(this, d);
				r.w = o !== c ? o : q.width();
				r.h = p !== c ? p : q.height();
				n.apply(this, arguments);
			}
			if ($.isFunction(l)) {
				n = l;
				return m;
			} else {
				n = l.handler;
				l.handler = m;
			}
		}
	};
	function g() {
		i = h[k](function() {
			a.each(function() {
				var n = $(this), m = n.width(), l = n.height(), o = $.data(
						this, d);
				if (m !== o.w || l !== o.h) {
					n.trigger(j, [ o.w = m, o.h = l ]);
				}
			});
			g();
		}, e[b]);
	}
})(jQuery, this);

var taskCenter = {};

taskCenter.doCalcWarning = function(cellval, col, rowData, action) {
	debugger;
	var days = parseFloat(cellval), alterClass = "circle",title="未限制";
	if (isNaN(days)) {
		alterClass += " nolimit";
	} else if (days > 5) {
		// 绿牌
		alterClass += " green";
		title = "绿牌>5";
	} else if (days <= 5 && days >= 2) {
		// 预警
		alterClass += " warning";
		title = "2<=预警<=5)";
	} else if (days < 2 && days >= 0) {
		// 黄牌
		alterClass += " yellow";
		title = "0<=黄牌<2)";
	} else if (days < 0) {
		// 红牌
		alterClass += " red";
		title = "红牌<0";
	}
	isNaN(days) && (days = "");
	var warn = '<div  title="'+title+'" class="' + alterClass + '"></div>';
	return warn;
};

taskCenter.doCalcWarning2 = function(cellval, col, rowData, action) {
	debugger;
	
	var days = parseFloat(cellval), alterClass = "circle2" ,title="未限制";
	if (isNaN(days)) {
		alterClass += " nolimit";
	} else if (days > 5) {
		// 绿牌
		alterClass += " green";
		title = "绿牌>5";
	} else if (days <= 5 && days >= 2) {
		// 预警
		alterClass += " warning";
		title = "2<=预警<=5)";
	} else if (days < 2 && days >= 0) {
		// 黄牌
		alterClass += " yellow";
		title = "0<=黄牌<2)";
	} else if (days < 0) {
		// 红牌
		alterClass += " red";
		title = "红牌<0";
	}
	isNaN(days) && (days = "");
	var warn = '<div   title="'+title+'"  class="' + alterClass + '">' + days + '</div>';
	return warn;
};

taskCenter.WarningColModels = [ {
	name : "FlowAlter",
	label : "流程",
	// sortable : false,
	width : 36,
	align : "center",
	fixed : true,
	formatter : taskCenter.doCalcWarning2
}, {
	name : "GroupAlter",
	label : "阶段",
	width : 36,
	align : "center",
	fixed : true,
	formatter : taskCenter.doCalcWarning2
}, {
	name : "ActAlter",
	label : "环节",
	// sortable : false,
	width : 36,
	align : "center",
	fixed : true,
	formatter : taskCenter.doCalcWarning2
} ];

taskCenter.defaultGridOptions = {
	// autowidth:true,//自动宽
	// altRows:true,//设置为交替行表格,默认为false
	hidegrid : false,
	shrinkToFit : true,
	pager : "#taskNav",
	grouping : true,
	viewrecords : true,
	multiboxonly : false
};

taskCenter.taskGroups = {
	"SIGNIN" : "签收件",
	"SUBMITED" : "移交件",
	"WAITTING" : "待办件",
	"HAVEDONE" : "已办件",
	"SUSPEND" : "挂起件",
	"PERSONALATTENTION" : "个人关注件",
	"PUSHATTENTION" : "推送关注件",
	"NOTHANDLE" : "经办件(未办结)",
	"HANDLED" : "经办件(已办结)"
};

taskCenter.getSignMode = function() {
	return !!justep.Context.getRequestParameter("signMode");
};

taskCenter.taskGroupArray = new Array();

/**
 * onLoad 【初始化左边菜单】
 */
taskCenter.model1Load = function(event) {
	var me = this, config = justep.xbl('config'), fnName = config
			.getValue("alterRender");
	var taskCenterGroups = config.getValue("taskCenterGroups");
	if (taskCenter.getSignMode())
		taskCenterGroups = taskCenterGroups + ",SIGNIN";
	$("ul#taskGroup li").each(function() {
		var groupName = $(this).attr("name");
		if (taskCenterGroups.indexOf(groupName) == -1)
			$(this).remove();
		else
			taskCenter.taskGroupArray.push(groupName);
	});
	$("ul#taskGroup").show();

	if (fnName && typeof me[fnName] == "function") {
		for ( var n in me.WarningColModels) {
			me.WarningColModels[n].formatter = me[fnName];
		}
	}

	// 靠右显示
	$("#btnBarRight").parent("li").css({
		// "float" : "right",
		"padding-right" : "20px",
		"margin-left" : "3px"
	});

	// 屏蔽发送、批量按钮
	$("#trgBatchInfo").hide().parent().next().hide();
	$("#trgAdvance").hide().parent().next().hide();

	// 初始化分组菜单
	if (justep.Context.getRequestParameter("taskGroup"))
		justep.xbl("custom_filter").setValue("taskGroup",
				justep.Context.getRequestParameter("taskGroup"));
	else
		justep.xbl("custom_filter").setValue("taskGroup", "WAITTING");

	$("#inputSearchValue input").attr("placeHolder", "支持多个关键词加空格");

	$("#viewTaskGrid").resize(function() {
		var $c = $(this);
		var grid = $("#taskGrid").jqGrid();
		grid.setGridHeight($c.height() - 120);
		grid.setGridWidth($c.width() - 10);
	});
	justep.xbl("inputSearchValue").input.focus();
	$("input", "#inputSearchValue").keydown(function(event) {
		if (event.keyCode == 13) {
			taskCenter.trgSearchClick();
		}
	});

	window._active = function() {
		$("#taskGrid").trigger("reloadGrid");
	};
};

taskCenter.loadBizGroup = function() {
	var self = this, smartValue = justep.xbl("custom_filter").getValue(
			"smartValue");
	var taskGroup = justep.xbl("custom_filter").getValue("taskGroup");
	if (taskGroup == null || taskGroup == "")
		taskGroup = "WAITTING";
	/** 查询业务分组列表：queryBizGroupAction * */
	var variables = new justep.Request.MapParam();
	variables.put("groupType", "案卷中心");
	var params = new justep.Request.ActionParam();
	params.setString("org", justep.Context.getCurrentPersonID());
	params.setString("taskGroup", taskGroup);
	params.setString("taskFilter", smartValue);
	params.setMap("variables", variables);
	
	justep.Request.sendBizRequest2({
		action : "queryBizGroupAction",
		dataType : "json",
		parameters : params,
		callback : function(result) {
			if (result.state) {
				var list = result.response;
				self.doCreateBizGroupNav(list);
			} else {
				throw new Error("调用失败！|" + result.response.message);
			}
		}
	});
	if (justep.xbl("config").getValue("showGroupCount") == "true")
		this.loadGroupCount();
};

taskCenter.loadGroupCount = function() {
	var self = this, smartValue = justep.xbl("custom_filter").getValue(
			"smartValue");
	var params = new justep.Request.ActionParam();
	if (taskCenter.taskGroupArray.length == 0)
		return;
	params.setParam("taskGroup", taskCenter.taskGroupArray);
	params.setString("taskFilter", smartValue);
	justep.Request
			.sendBizRequest2({
				async : true,
				action : "queryGroupTaskCountAction",
				dataType : "json",
				parameters : params,
				callback : function(result) {
					if (result.state) {
						var list = result.response;
						$("div#divTaskGroupNav.navGroup").find(
								"ul.lanmu-list li")
								.each(
										function() {
											var count = list[$(this).attr(
													"name")] ? list[$(this)
													.attr("name")] : "0";
											$(this).find("i").text(
													"(" + count + ")");
										});
					}
				}
			});

};

/** 创建业务分组导航 */
taskCenter.doCreateBizGroupNav = function(list) {
//	if (list.length > 1) {
//		$("#filterTypeSelect").show();
//	} else {
//		justep.xbl("custom_filter").setValue("filterType", "当前分组");
//		$("#filterTypeSelect").hide();
//	}
	var self = this, $html = $('<ul class="lanmu-list"></ul>');
	for ( var int = 0; int < list.length; int++) {
		var bizGroup = list[int], bGroupAlter = false, bActAlter = false;
		if (bizGroup.count == 0)
			continue;
		for ( var idx = bizGroup.setting.colModel.length - 1; idx >= 0; idx--) {
			var col = bizGroup.setting.colModel[idx];
			if (col.name == "FlowAlter") {
				// bizGroup.setting.colModel.splice(idx, 1);
			} else if (col.name == "GroupAlter") {
				// bizGroup.setting.colModel.splice(idx, 1);
				bGroupAlter = true;
			} else if (col.name == "ActAlter") {
				// bizGroup.setting.colModel.splice(idx, 1);
				bActAlter = true;
			}
		}
		// 环节预警
		bActAlter
				&& (bizGroup.setting.colModel = [ this.WarningColModels[2] ]
						.concat(bizGroup.setting.colModel));
		// 分组预警
		bGroupAlter
				&& (bizGroup.setting.colModel = [ this.WarningColModels[1] ]
						.concat(bizGroup.setting.colModel));
		// 流程预警
		bizGroup.setting.colModel = [ this.WarningColModels[0] ]
				.concat(bizGroup.setting.colModel);

		var $li = $("<li><a href='#'>" + bizGroup.groupName + " ("
				+ bizGroup.count + ")</a><i/></li>");
		$li.attr("id", bizGroup.groupId);
		$li.data("bizGroup", bizGroup);
		$html.append($li);
	}
	$('#divBizGroupNav>ul').remove();
	$('#divBizGroupNav').append($html).find('li').bind(
			'click',
			function(event) {
				var $taskGrid = $("#taskGrid");
				if (taskCenter._taskloading || $taskGrid.length > 0
						&& $taskGrid.get(0).grid
						&& $taskGrid.get(0).grid.hDiv.loading) {
					return;
				}
				var $li = $(this);
				if ($li.hasClass("current"))
					return;
				if (!$li.data("bizGroup"))
					return;
				$li.siblings().removeClass("current");
				$li.addClass("current");
				self.doCreateTaskGrid($li);
				$("#viewTaskGrid").resize();
			});
	// 清除任务
	var $taskGrid = $("#taskGrid");
	if ($taskGrid.length > 0) {
		$("#taskNav").remove();
		var $taskGrid = $("#taskGrid");
		if ($taskGrid.length > 0)
			$taskGrid.GridUnload();
		self.refreshBtnStatus();
	}

	// TODO IE11 兼容性？
	setTimeout(function() {
		$("li:eq(0)", "#divBizGroupNav").click();
	}, 0);
	if (list.length <= 1) {
		$("#divBizGroupNav").hide();
		if (list.length == 0)
			taskCenter.doCreateEmtyGrid();
	} else {
		$("#divBizGroupNav").show();
	}
};

taskCenter.doCreateEmtyGrid = function($li) {
	var self = this, $viewTaskGrid = $("#viewTaskGrid");
	var rowNum = 100;// parseInt(($viewBizGrid.height() - 120) / 36) - 1;
	var options = {
		caption : "无数据",
		hidegrid : false,
		shrinkToFit : true,
		height : $viewTaskGrid.height() - 120,
		width : $viewTaskGrid.width() - 10,
		pager : "#taskNav",
		rowNum : rowNum,
		grouping : true,
		viewrecords : true,
		rowList : [ rowNum, rowNum * 2, rowNum * 3 ]
	};
	var setting = $.extend(true, {}, options);
	$("#taskNav").remove();
	var $taskGrid = $("#taskGrid");
	if ($taskGrid.length > 0)
		$taskGrid.GridUnload();

	$viewTaskGrid.append("<div id='taskNav' style='height:50px'></div>");
	$viewTaskGrid.append("<table id='taskGrid'></table>");
	$taskGrid = $("#taskGrid");
	$taskGrid.jqGrid(setting);
	$taskGrid.jqGrid('navGrid', '#taskNav', {
		add : false,
		edit : false,
		del : false,
		search : false,
		refresh : false
	});
	$("#gbox_taskGrid").css("margin", "0 auto").removeClass("ui-corner-all");
};

/** 创建任务网格 * */
taskCenter.doCreateTaskGrid = function($li) {
	var self = this, taskData = justep.xbl("main"), $viewTaskGrid = $("#viewTaskGrid");
	var rowNum = 100;// parseInt(($viewTaskGrid.height() - 120) / 36) - 1,
	var bizGroup = taskCenter.currentBizGroup = $li.data("bizGroup"), groupId = bizGroup.groupId;
	var setting = $.extend(true, {}, bizGroup.setting, this.defaultGridOptions,
			{
				caption : bizGroup.groupName + " (" + bizGroup.count + ")",
				height : $viewTaskGrid.height() - 120,
				width : $viewTaskGrid.width() - 10,
				rowNum : rowNum,
				rowList : [ rowNum, rowNum * 2, rowNum * 3 ],
				multiselect : (","
						+ justep.xbl("config").getValue("multiSelect") + ",")
						.indexOf(","
								+ justep.xbl("custom_filter").getValue(
										"taskGroup") + ",") >= 0
			});
	setting.datatype = function(postdata) {
		self.loadTaskData(bizGroup, postdata);
	};

	// setting.onPaging = function(pgButton) {
	//		
	// };
	// setting.onSelectRow = function(rowId) {
	//
	// };
	//	
	// setting.onSortCol = function(index, colindex, sortorder) {
	//		
	// };

	setting.ondblClickRow = function(rowid) {
		$(this).setGridParam({
			'selrow' : rowid
		});
		self.enterBizRec();
	};

	setting.beforeSelectRow = function(rowid, e) {
		// 移除其他高亮行
		var $tr = $(justep.Event.getTarget(e)).parents("tr:eq(0)");
		$tr.siblings().removeClass("ui-state-highlight");
		if (setting.multiselect) {
			var t = justep.Event.getTarget(e);
			if (!$(t).hasClass("cbox") && !$(t).children().hasClass("cbox")) {
				// 高亮显示
				$tr.addClass("ui-state-highlight");
				return false;
			} else {
				taskCenter.onCheckOne
						&& taskCenter.onCheckOne(rowid, t.checked);
			}
		}
		return true;
	};

	setting.onSelectAll = function(rowid, status) {
		taskCenter.onCheckAll && taskCenter.onCheckAll(rowid, status);
	};

	setting.gridComplete = function(rowid) {
		var mainData = justep.xbl("main");
		var ids = $("#taskGrid").getDataIDs();
		for ( var i = 0; i < ids.length; i++) {
			var sStatusID = mainData.getValue("sStatusID", ids[i]);
			if (sStatusID == "tesReady") {
				$('#' + ids[i]).find("td").css("font-weight", "bolder");
			}
		}
	};
	$("#taskNav").remove();
	var $taskGrid = $("#taskGrid");
	if ($taskGrid.length > 0)
		$taskGrid.GridUnload();

	$viewTaskGrid.append("<div id='taskNav' style='height:50px'></div>");
	$viewTaskGrid.append("<table id='taskGrid'></table>");

	$taskGrid = $("#taskGrid");
	$taskGrid.jqGrid(setting);
	/*
	 * $( '<span style="float:right" class="ui-icon ui-icon-check"
	 * title="保存配置"></span>')
	 * .appendTo($viewTaskGrid.find(".ui-jqgrid-titlebar")).click( function() {
	 * alert("个人设置暂未支持"); });
	 */
	$("#gbox_taskGrid").css("margin", "0 auto").removeClass("ui-corner-all");
	var dataFields = justep.xbl("dataFields"), defaultValues = [ {
		alias : "",
		label : ""
	} ];
	dataFields.clear();
	for ( var n in setting.colModel) {
		var col = setting.colModel[n];
		if (col.searchType) {
			if (col.searchType == "between") {

			} else {
				defaultValues.push({
					alias : col.name,
					label : col.label
				});
			}
		}
	}
	dataFields.newData({
		defaultValues : defaultValues
	});

	var custom_filter = justep.xbl("custom_filter");
	if (dataFields.getCount() > 1) {
		$("#inputSearchValue input").removeAttr("readonly");
	} else {
		$("#inputSearchValue input").attr("readonly", "readonly");
	}

	custom_filter.setValue("searchFieldAlias", "");
	custom_filter.setValue("searchFieldLabel", "");

	var btn = justep.xbl("btnExpand");
	btn.setLabel("收起分组");
	btn.$el.find("i").removeClass("icon-system-plus").addClass(
			"icon-system-minus");

};

// css兼容性处理
var cssSolution = {
	// table tr 隔行变色
	changeTableColor : function(objId) {
		$("#" + objId + " tr:even").css("background", "#f8f8f8");
		$("#" + objId + " tr:odd").css("background", "#fefefe");
	}
};
/**
 * 构造Grid
 * 
 * @param postdata
 *            {_search: false, filters: "", nd: 1431021026355, page: 1, rows:
 *            12, sidx: "", sord: "asc"}
 */
taskCenter.loadTaskData = function(bizGroup, postdata) {
	if (taskCenter._taskloading) {
		alter("数据加载中，请稍候刷新");
		return;
	}
	taskCenter._taskloading = true;
	var $statusPanel = $("#statusPanel");
	$statusPanel.show();

	var self = this, jsonData = {
		page : postdata.page
	};
	var variables = new justep.Request.MapParam();
	var filterMap = this.getConditionFilter(bizGroup, variables);
	var params = new justep.Request.ActionParam();
	params.setMap("filterMap", filterMap);
	params.setInteger("offset", postdata.rows * (postdata.page - 1));
	params.setInteger("limit", postdata.rows);
	if (postdata.sidx) {
		var reg = new RegExp(", $"), orderBy;
		if (reg.test(postdata.sidx))
			orderBy = postdata.sidx.substring(0, postdata.sidx.length - 2);
		else
			orderBy = postdata.sidx + " " + postdata.sord;
		params.setString("orderBy", orderBy);
	}
	params.setMap("variables", variables);
	justep.Request
			.sendBizRequest2({
				action : "queryBizGroupTaskAction",
				dataType : "json",
				parameters : params,
				callback : function(result) {
					$statusPanel.hide();
					if (result.state) {
						var taskData = justep.xbl("main");
						butone.Data.loadJSON(taskData, result.response);
						var $groupli = $("#" + bizGroup.groupId), $taskGrid = $("#taskGrid");
						var total = parseInt(result.response.userdata["sys.count"]);
						if (!!bizGroup && !isNaN(total) && !!$taskGrid) {
							// 首次含总数查询
							taskData.total = total;
							taskData.totalPage = Math.ceil(taskData.total
									/ postdata.rows);
							var caption = bizGroup.groupName + " ("
									+ taskData.total + ")";
							$groupli.find("a").html(caption);
							$taskGrid.setCaption(caption);
						}
						jsonData.records = taskData.total;
						jsonData.total = taskData.totalPage;

						var colModel = bizGroup.setting.colModel;
						var rows = [];
						for ( var i = 0; i < taskData.getCount(); i++) {
							var rowId = taskData.getID(i);
							var cell = [];
							for ( var n in colModel) {
								col = colModel[n];
								cell.push(taskData.getValue(col.name, rowId));
							}
							rows.push({
								id : rowId,
								cell : cell
							});
						}
						jsonData.rows = rows;
						$taskGrid[0].addJSONData(jsonData);
						if (taskData.getCount() > 0) {
							if ($taskGrid.getGridParam("multiselect")) {
								$taskGrid.find("#" + taskData.getID())
										.addClass("ui-state-highlight");
							} else {
								$taskGrid.setSelection(taskData.getID());
							}
						}
						self.refreshBtnStatus();
						// TODO 初始化table tr各行变色，使用Jquery 兼容IE低版本。什么版本？？？？
						cssSolution.changeTableColor("taskGrid");
						taskCenter._taskloading = false;
					} else {
						taskCenter._taskloading = false;
						throw new Error("调用失败[加载业务数据失败]！|"
								+ result.response.message);
					}

				}
			});

};

/** 过滤条件 */
taskCenter.getConditionFilter = function(bizGroup, variables) {
	var filterMap = new justep.Request.MapParam(), filterData = justep
			.xbl("custom_filter");
	filterMap.put("taskGroup", filterData.getValue("taskGroup"));
	var smartValue = filterData.getValue("smartValue");
	if (filterData.getValue("searchFieldAlias") && !!smartValue) {
		for ( var n in bizGroup.setting.colModel) {
			var col = bizGroup.setting.colModel[n];
			if (col.name == filterData.getValue("searchFieldAlias")) {
				if (col.searchType = "smart") {
					if (col.dataType == "String"
							&& smartValue.indexOf(" ") >= 0) {
						var args = smartValue.split(" "), customFilter = "";
						for ( var n in args) {
							var s = args[n].trim();
							if (s.length > 0) {
								var pName = "smartValue" + n;
								customFilter += " and instr(" + col.field
										+ ",:" + pName + ")>0";
								variables
										.put(
												pName,
												new justep.Request.SimpleParam(
														s,
														justep.XML.Namespaces.XMLSCHEMA_STRING));
							}
						}
						if (customFilter.length > 5)
							customFilter = customFilter.substring(4);
						filterMap.put("customFilter", customFilter);
					} else {
						filterMap.put("customFilter", (col.dataType == 'Date'
								|| col.dataType == 'DateTime'
								|| col.dataType == 'Time' ? "to_char("
								+ col.field + ",'yyyy-MM-dd')" : col.field)
								+ " like '%'||:" + col.name + "||'%'");
						variables.put(col.name, new justep.Request.SimpleParam(
								smartValue,
								justep.XML.Namespaces.XMLSCHEMA_STRING));
					}
				} else {
					filterMap.put("customFilter", col.field + "=:" + col.name);
					variables.put(col.name, new justep.Request.SimpleParam(
							smartValue, justep.XML.Namespaces.JUSTEPSCHEMA
									+ col.dataType));
				}
				break;
			}
		}
	} else {
		filterMap.put("smartValue", filterData.getValue("smartValue"));
	}
	filterMap.put("groupId", bizGroup.groupId);
	if (taskCenter.onGetCondition)
		taskCenter.onGetCondition(filterMap);
	return filterMap;
};

/** ******************************************************************************************** */

taskCenter.getTaskRowid = function() {
	var $taskGrid = $("#taskGrid");
	if ($taskGrid.length == 0)
		return;
	var rowid = $taskGrid.getGridParam("selrow");
	if (!rowid && $(".ui-state-highlight")[0])
		rowid = $(".ui-state-highlight")[0].id;
	return rowid;
};

taskCenter.refreshBtnStatus = function() {
	justep.xbl("trgExecute").setDisabled(!taskCenter.hasData());
	justep.xbl("trgBanLiGuoCheng").setDisabled(!taskCenter.hasData());
};

taskCenter.hasData = function() {
	return (justep.xbl("main").getCount() > 0);
};

taskCenter.isWaitingStatus = function() {
	var status = justep.xbl("main").getValue("sStatusID");
	return (status == "tesReady" || status == "tesExecuting");
};

taskCenter.isCreator = function() {
	var creatorFID = justep.xbl("main").getValue("sCreatorFID");
	var personID = justep.Context.getCurrentPersonID();
	return (creatorFID.indexOf("/" + personID + "@") != -1);
};

taskCenter.canRecycle = function() {
	return taskCenter.hasData() && taskCenter.isWaitingStatus()
			&& taskCenter.isCreator();
};

taskCenter.enterBizRec = function() {
	var rowid = this.getTaskRowid();
	if (!rowid)
		return;
	var mainData = justep.xbl("main");
	var url = mainData.getValue("sEURL", rowid); // 执行页面
	var name = mainData.getValue("sName", rowid);
	var flowID = mainData.getValue("sFlowID", rowid);

	var executorFID = mainData.getValue("sExecutorFID", rowid);
	var process = mainData.getValue("sProcess", rowid);
	var activity = mainData.getValue("sActivity", rowid);

	var param = new justep.Request.ActionParam(), taskid = mainData.getValue(
			"sID", rowid);
	if (justep.xbl("custom_filter").getValue("taskGroup").match(
			'NOTHANDLE|HANDLED|HAVEDONE|PERSONALATTENTION')) {
		butone.BizRec.openBizRec(mainData.getValue("fBizRecID", rowid));
	} else {
		if (url.indexOf(".a") !== -1) {
			// 强制使用UI的w文件，否则windowRunner会出问题
			url = url.substring(0, url.length - 2) + ".w";
		}
		param.setString("task", taskid);
		param.setString("executor", executorFID);
		var loader = justep.Request.sendBizRequest(process, activity,
				"checkExecuteTaskAction", param, null, null, true);
		if (justep.Request.isSuccess(loader)) {
			var data = justep.Request.getData(loader);
			data = justep.Request.transformMap(data);
			var pattern = data["activity-pattern"];
			if (justep.xbl("custom_filter").getValue("taskGroup").match(
					'SUBMITED|SUSPEND|SIGNIN')) {
				pattern = "detail";
			}
			var realUrl = url + (url.indexOf("?") == -1 ? "?" : "&") + 'task='
					+ taskid + '&activity-pattern=' + pattern + '&process='
					+ process + '&activity=' + activity;
			// justep.Portal.openWindow(name, realUrl, false, null,
			// data.executor);
			justep.xbl("sysRunner").open(null, realUrl, name, process,
					activity, data.executor);
		}
	}
};

taskCenter.trgExecuteClick = function(event) {
	taskCenter.enterBizRec();
};

taskCenter.trgBanLiGuoChengClick = function(event) {
	var rowid = this.getTaskRowid();
	if (!rowid)
		return;
	var mainData = justep.xbl("main");
	var pi = mainData.getValue("sFlowID", rowid);
	var taskID = mainData.getValue("sID", rowid);
	var dlgChart = justep.xbl("dlgChart");
	justep.xbl("dlgChart").open(
			null,
			"办理过程",
			$(dlgChart.domNode).attr("url") + "?pi=" + pi + "&taskID=" + taskID
					+ "&task=" + taskID);
};

taskCenter.trgSearchClick = function(event) {
	// if (justep.xbl("custom_filter").getValue("filterType") == "全局分组")
	// taskCenter.loadBizGroup();
	// else {
	// 查询：设置为第一页，会计算总记录数
	$("#taskGrid").setGridParam({
		page : 1
	}).trigger("reloadGrid");
	// }
};

taskCenter.custom_filterValueChanged = function(event) {
	if (event.column == "taskGroup") {
		var taskGroupName = taskCenter.taskGroups[event.value];
		event.source.setValue("taskGroupName", taskGroupName, event.source
				.getID(event.rowIndex));
		if (event.value == 'SUBMITED') {
			$("#recycleItem").show().parent().next().show();
		} else {
			$("#recycleItem").hide().parent().next().hide();
		}
		$("li[name='" + event.value + "']", "#divTaskGroupNav").addClass(
				"current").siblings().removeClass("current");
		event.value == 'SIGNIN' ? $("#trgSign").show().parent().next().show()
				: $("#trgSign").hide().parent().next().hide();
		taskCenter.loadBizGroup();
	} else if (event.column == "searchFieldAlias" && taskCenter.currentBizGroup) {
		if (event.value) {
			for ( var n in taskCenter.currentBizGroup.setting.colModel) {
				var col = taskCenter.currentBizGroup.setting.colModel[n];
				if (col.name == event.value) {
					$("#inputSearchValue input").attr("placeHolder",
							col.searchType == "smart" ? "支持多个关键词加空格" : "精确查询");
					break;
				}
			}
		} else {
			$("#inputSearchValue input").attr("placeHolder", "支持多个关键词加空格");
		}
	} else if (event.column == "filterType" && taskCenter.currentBizGroup) {
		if (event.value == "全部分组") {
			$("#bizFieldSelect").hide();
		} else {
			$("#bizFieldSelect").show();
		}
	}
	taskCenter.onFilterValueChanged && taskCenter.onFilterValueChanged(event);
};

/**
 * 任务发生变化时，通知任务中心
 */
taskCenter.callBackCenter = function(data) {
	var kind = data.kind;
	if (kind == "refreshTaskCenter") {
		// 不换页
		$("#taskGrid").trigger("reloadGrid");
	}
};

taskCenter.sysRunnerReceive = function(event) {
	taskCenter.callBackCenter(event.data);
};

taskCenter.trgRecycleClick = function(event) {
	taskCenter.recycleTask();
};

taskCenter.recycleTask = function() {
	var mainData = justep.xbl("main");
	var rowid = this.getTaskRowid();
	if (!rowid)
		return;
	if (mainData.getValue("sStatusID", rowid) == 'tesReady') {
		new justep.System.showMessage().open({
			"msg" : "确实要回收当前选中的任务吗？",
			"type" : 2,
			"title" : "确认",
			"img" : "question",
			"callback" : function(event) {
				if ("yes" == event.status) {
					var creatorFID = mainData.getValue("sCreatorFID", rowid);
					var process = mainData.getValue("sProcess", rowid);
					var activity = mainData.getValue("sActivity", rowid);
					// var activity = url.substring(url.lastIndexOf("/") + 1,
					// url
					// .lastIndexOf("."));
					var param = new justep.Request.ActionParam();
					param.setString("task", mainData.getValue("sID", rowid));
					var ret = justep.Request.sendBizRequest(process, activity,
							"externalWithdrawTaskAction", param, null, null,
							true, creatorFID);
					if (justep.Request.isSuccess(ret)) {
						taskCenter.loadBizGroup();
					}
				}
			}
		});
	} else {
		new justep.System.showMessage()
				.open({
					"msg" : mainData.getValue("sExecutorNames", rowid)
							+ "已经办理此案卷，无法收回",
					"type" : 0,
					"title" : "提示信息",
					"img" : "info"
				});
	}
};

taskCenter.trgExecuteListClick = function(event) {

};

taskCenter.selectItem3Select = function(event) {

};

taskCenter.divTaskGroupNavClick = function(event) {
	var $taskGrid = $("#taskGrid");
	if (taskCenter._taskloading || $taskGrid.length > 0
			&& $taskGrid.get(0).grid && $taskGrid.get(0).grid.hDiv.loading) {
		return;
	}
	var target = event.target || event.srcElement;
	var taskGroup = target.nodeName == "LI" ? $(target).attr("name")
			: $(target).parent().attr("name");
	justep.xbl("custom_filter").setValue("taskGroup", taskGroup);
};

taskCenter.toggleGroupNavClick = function(event) {
	var $this = $(event.currentTarget), $i = $this.find("i");
	if ($i.hasClass("icon-system-angle-double-down")) {
		$this.parent().find("ul").show();
		$i.removeClass("icon-system-angle-double-down").addClass(
				"icon-system-angle-double-up");
	} else {
		$this.parent().find("ul").hide();
		$i.removeClass("icon-system-angle-double-up").addClass(
				"icon-system-angle-double-down");
	}
};

taskCenter.modelModelConstruct = function(event) {
	$("#statusPanel").remove();
	$(".xui-splitter-handler-h").css("cursor", "col-resize");
	$("#divTaskGroupNav").show();
};

taskCenter.checkBizOperationInfo = function(task, operation) {
	var options = {};
	var param = new justep.Request.ActionParam();
	param.setString('id', task);

	options.contentType = 'application/json';
	options.dataType = "json";
	options.parameters = param;
	options.action = "queryTaskBizOperationAction";
	options.callback = function(callbackData) {
		callbackData.ignoreError = false;
		if (callbackData.state) {
			info = callbackData.response, bizOperations = info.allowOperation;
		} else {
			butone.Dialog.error("查询案卷操作失败", callbackData.response.message);
		}
	};
	justep.Request.sendBizRequest2(options);
	return info;
};

taskCenter.trgAdvanceClick = function(event) {
	var process = justep.xbl("process"), mainData = justep.xbl("main"), rowid = this
			.getTaskRowid();
	var info = this.checkBizOperationInfo(mainData.getValue("sID", rowid));
	if (info) {
		bizOperations = info.allowOperation;
		if (justep.Array.contain(bizOperations, "preempt")) {
			butone.Dialog.info("你需要先办理此案卷");
		} else if (justep.Array.contain(bizOperations, "advance")
				|| justep.Array.contain(bizOperations, "finish")) {
			process.advanceQueryExt(mainData.getValue("sID", rowid), {
				process : mainData.getValue("sProcess", rowid),
				activity : mainData.getValue("sActivity", rowid)
			});
		} else {
			butone.Dialog.info("当前案卷不能发送，请刷新数据");
		}
	}

};

taskCenter.trgBatchInfoClick = function(event) {
	butone.Window.run("/UI/base/core/flowOperation/batchTaskInfo.w", "批量操作信息");
};

taskCenter.btnExpandClick = function(event) {
	var btn = justep.xbl("btnExpand");
	if (btn.getLabel() == "展开分组") {
		$("#taskGrid .tree-wrap-ltr.ui-icon-circlesmall-plus").trigger("click");
		btn.setLabel("收起分组");
		btn.$el.find("i").removeClass("icon-system-plus").addClass(
				"icon-system-minus");
	} else {
		$("#taskGrid .tree-wrap-ltr.ui-icon-circlesmall-minus")
				.trigger("click");
		btn.setLabel("展开分组");
		btn.$el.find("i").removeClass("icon-system-minus").addClass(
				"icon-system-plus");
	}

};

taskCenter.trgClearClick = function(event) {
	justep.xbl('custom_filter').setValue("smartValue", "");
	this.trgSearchClick(null);
};

taskCenter.trgSignClick = function(event) {
	var ids = $("#taskGrid").jqGrid('getGridParam', 'selarrrow');
	if (ids.length > 0) {
		// 批量签收操作
		var tasks = new justep.Request.ListParam();
		for ( var n in ids) {
			tasks.add(ids[n]);
		}
		var param = new justep.Request.ActionParam();
		param.setList("tasks", tasks);
		param.setString("executor", justep.Context.getExecutor());
		var options = {};
		options.contentType = 'application/json';
		options.dataType = "json";
		options.parameters = param;
		options.action = "signTasksAction";
		options.callback = function(callbackData) {
			callbackData.ignoreError = false;
			if (callbackData.state) {
				taskCenter.trgSearchClick();
			} else {
				butone.Dialog
						.error("批量签收案卷操作失败", callbackData.response.message);
			}
		};
		justep.Request.sendBizRequest2(options);
	}
};

taskCenter.tabDeptSelect = function(event) {
	if (!this.wfDeptRec) {
		this.wfDeptRec = true;
		justep.xbl("wfDeptRec").refresh();
	}
};
