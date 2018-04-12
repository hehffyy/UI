/**
 * globalSearch:全局查询，未false时关闭全局查询并关闭高级查询。
 * 
 */
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

var archiveQuery = {};

archiveQuery.custom_filterValueChanged = function(event) {
	if (event.column == "status" || event.column == "showCldBiz") {
		archiveQuery.trgSearchClick();
	} else if (event.column == "searchFieldAlias"
			&& archiveQuery.currentBizGroup) {
		if (event.value) {
			for ( var n in archiveQuery.currentBizGroup.setting.colModel) {
				var col = archiveQuery.currentBizGroup.setting.colModel[n];
				if (col.name == event.value) {
					$("#inputSearchValue input").attr(
							"placeHolder",
							col.searchType == "smart" ? "支持多个关键词空格或|分割"
									: "精确查询");
					break;
				}
			}
		} else {
			$("#inputSearchValue input").attr("placeHolder", "支持多个关键词空格或|分割");
		}
	} else if (event.column == "filterType") {
		if (event.value == "全局查询") {
			$("#searchFieldSelect").hide();
			$("#viewSearch").hide();
			$("#divMoreFilter").hide();
		} else {
			$("#searchFieldSelect").show();
			if (!archiveQuery.disableGlobalSearch) {
				$("#viewSearch").show();
				$("#divMoreFilter").show();
			}
		}
	}
};

archiveQuery.dateFilter1Changed = function(event) {
	archiveQuery.trgSearchClick();
};

/**
 * onLoad 【初始化左边菜单】
 */
archiveQuery.model1Load = function(event) {
	if (archiveQuery.disableGlobalSearch) {
		$("#filterTypeSelect").hide();
		$("#divMoreFilter").hide();
		$("#viewSearch").hide();
		justep.xbl("custom_filter").setValue("filterType", "组内查询");
	} else {
		justep.xbl("custom_filter").setValue("filterType", "全局查询");
		$("#searchFieldSelect").hide();
	}

	// 靠右显示
	$("#btnBarRight").parent("li").css({
		"padding-right" : "20px",
		"margin-left" : "3px"
	});

	// 初始化分组菜单
	if (justep.Request.URLParams.bizGroup)
		justep.xbl("custom_filter").setValue("status",
				justep.Request.URLParams.status);
	else {
		justep.xbl("custom_filter").setValue("status", 'bsProcessing');
		justep.xbl("custom_filter").setValue("statusName", '办理中');
	}

	// 屏蔽高级查询
	$("#viewSearch").hide();
	$("#divMoreFilter").hide();
	$("#inputSearchValue input").attr("placeHolder", "支持多个关键词空格或|分割");
	//注释掉以下这行代码，因为在dateFilter.js文件中默认会过滤数据一次
	//justep.xbl("dateFilter1").setFilter();
	this.loadBizGroup();

	$("#viewBizGrid").resize(function() {
		var $c = $(this);
		var grid = $("#bizGrid").jqGrid();
		grid.setGridHeight($c.height() - 100);
		grid.setGridWidth($c.width() - 15, true);
	});
	justep.xbl("inputSearchValue").input.focus();
	$("input", "#inputSearchValue").keydown(function(event) {
		if (event.keyCode == 13) {
			archiveQuery.trgSearchClick();
		}
	});

};

archiveQuery.loadBizGroup = function(statistics) {
	var self = this, filterData = justep.xbl("custom_filter");

	/** 查询业务分组列表 * */
	var filterMap = new justep.Request.MapParam();
	filterMap.put("status", filterData.getValue("status"));
	filterMap.put("smartValue", filterData.getValue("smartValue"));
	var customFilter = filterData.filters.toString();
	if (customFilter)
		filterMap.put("customFilter", customFilter);

	var params = new justep.Request.ActionParam();
	params.setMap("filterMap", filterMap);

	var variables = new justep.Request.MapParam();
	params.setMap("variables", variables);
	statistics && variables.put("statistics", "true");

	justep.Request.sendBizRequest2({
		action : "queryBizGroupAction",
		dataType : "json",
		parameters : params,
		callback : function(result) {
			if (result.state) {
				var list = result.response;
				self.doCreateBizGroupNav(list);
			} else {
				throw justep.Error.create("查询失败！" + result.response.message);
			}
		}
	});

};

/** 创建业务分组导航 */
archiveQuery.doCreateBizGroupNav = function(list) {
	var self = this, $html = $('<ul class="lanmu-list"></ul>'), toNavIdx = -1;

	for ( var idx = 0; idx < list.length; idx++) {
		var bizGroup = list[idx];
		bizGroup.setting.colModel = this.WarningColModels
				.concat(bizGroup.setting.colModel);
		var $li = $("<li><a href='#'>"
				+ bizGroup.groupName
				+ (bizGroup.hasOwnProperty("count") ? " (" + bizGroup.count
						+ ")" : "") + "</a><i/></li>");
		$li.attr("id", bizGroup.groupId);
		$li.data("bizGroup", bizGroup);
		$html.append($li);
		if (bizGroup.count > 0 && toNavIdx == -1)
			toNavIdx = idx;
	}

	$('#divBizGroupNav').empty();
	$('#divBizGroupNav').append($html).find('li').bind('click',
			function(event) {
				var $li = $(this);
				if ($li.hasClass("current"))
					return;
				if (!$li.data("bizGroup"))
					return;
				$li.siblings().removeClass("current");
				$li.addClass("current");
				justep.xbl('custom_filter').setValue("filterType", "组内查询");
				self.doCreateBizGrid($li);
				$("#viewBizGrid").resize();

			});

	var $bizGrid = $("#bizGrid");
	if ($bizGrid.length > 0) {
		$("#bizNav").remove();
		var $bizGrid = $("#bizGrid");
		if ($bizGrid.length > 0)
			$bizGrid.GridUnload();
		self.refreshBtnStatus();
	}
	// TODO IE11 兼容性？
	if (toNavIdx == -1)
		toNavIdx = 0;
	setTimeout(function() {
		$($("li", "#divBizGroupNav")[toNavIdx]).click();
	}, 0);

};

archiveQuery.doCalcWarning = function(cellval, col, rowData, action) {
	var days = parseFloat(cellval), alterClass = "circle";
	if (isNaN(days)) {
		alterClass += " nolimit";
	} else if (days > 5) {
		// 绿牌
		alterClass += " green";
	} else if (days <= 5 && days >= 2) {
		// 预警
		alterClass += " warning";
		days = "";
	} else if (days < 2 && days >= 0) {
		// 黄牌
		alterClass += " yellow";
	} else if (days < 0) {
		// 红牌
		alterClass += " red";
	}
	if (justep.xbl("main").getValue("fFinishKind", col.rowId)) {
		alterClass += " bj";
		days = "";
	}
	isNaN(days) && (days = "");
	var warn = '<div class="' + alterClass + '"></div>';
	return warn;
};

archiveQuery.doCalcWarning2 = function(cellval, col, rowData, action) {
	var days = parseFloat(cellval), alterClass = "circle2";
	if (isNaN(days)) {
		alterClass += " nolimit";
	} else if (days > 5) {
		// 绿牌
		alterClass += " green";
	} else if (days <= 5 && days >= 2) {
		// 预警
		alterClass += " warning";
	} else if (days < 2 && days >= 0) {
		// 黄牌
		alterClass += " yellow";
	} else if (days < 0) {
		// 红牌
		alterClass += " red";
	}
	isNaN(days) && (days = "");
	var warn = '<div class="' + alterClass + '">' + days + '</div>';
	return warn;
};

archiveQuery.WarningColModels = [ {
	name : "FlowAlter",
	label : "流程",
	width : 36,
	align : "center",
	fixed : true,
	formatter : archiveQuery.doCalcWarning
} ];

/** 创建案卷网格 * */
archiveQuery.doCreateBizGrid = function($li) {
	var self = this, taskData = justep.xbl("main"), $viewBizGrid = $("#viewBizGrid");
	var rowNum = 100;// parseInt(($viewBizGrid.height() - 100) / 36) - 1;
	var bizGroup = archiveQuery.currentBizGroup = $li.data("bizGroup"), groupId = bizGroup.groupId;
	var options = {
		caption : bizGroup.groupName,
		hidegrid : false,
		shrinkToFit : true,
		height : $viewBizGrid.height() - 100,
		width : $viewBizGrid.width() - 15,
		pager : "#bizNav",
		rowNum : rowNum,
		grouping : true,
		viewrecords : true,
		rowList : [ rowNum, rowNum * 2, rowNum * 3 ]
	};
	var setting = $.extend(true, bizGroup.setting, options);
	setting.datatype = function(postdata) {
		self.loadBizData(bizGroup, postdata);
	};

	setting.ondblClickRow = function(rowid) {
		self.enterBizRec();
	};

	$("#bizNav").remove();
	var $bizGrid = $("#bizGrid");
	if ($bizGrid.length > 0)
		$bizGrid.GridUnload();

	$viewBizGrid.append("<div id='bizNav' style='height:30px'></div>");
	$viewBizGrid.append("<table id='bizGrid'></table>");
	$bizGrid = $("#bizGrid");

	$bizGrid.jqGrid(setting);
	$bizGrid.jqGrid('navGrid', '#bizNav', {
		add : false,
		edit : false,
		del : false,
		search : false,
		refresh : false
	});

	$("#gbox_bizGrid").css("margin", "0 auto").removeClass("ui-corner-all");

	// 快速查询
	var dataFields = justep.xbl("dataFields"), defaultValues = [ {
		alias : "",
		label : ""
	} ];
	dataFields.clear();

	// 构建高级查询
	$("#viewSearch").empty();
	var $viewSearch = $("#viewSearch").append("<ul></ul>");
	for ( var n in setting.colModel) {
		var col = setting.colModel[n];
		if (col.searchType) {
			if (col.searchType == "between") {

			} else {
				if (col.searchType == "smart" && col.dataType == "String")
					$(
							'<li class="search"><div class="label" title="'
									+ col.label
									+ '">'
									+ col.label
									+ '</div><input class="xui-input" type="text" id="'
									+ col.field
									+ '"/ placeholder="'
									+ (col.searchType == "smart" ? "智能查询"
											: "精确查询") + '"></li>').data("col",
							col).appendTo($("#viewSearch ul"));
				defaultValues.push({
					alias : col.name,
					label : col.label
				});
			}
		}
	}
	$("li.search>input").keydown(function(event) {
		if (event.keyCode == 13) {
			archiveQuery.trgSearchClick();
		}
	});
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
};

/** 查询刷新 */
archiveQuery.trgSearchClick = function(event) {
	if (justep.xbl("custom_filter").getValue("filterType") == "全局查询")
		archiveQuery.loadBizGroup(true);
	else
		// 查询：设置为第一页，会计算总记录数
		$("#bizGrid").setGridParam({
			page : 1
		}).trigger("reloadGrid");
};

archiveQuery.enterBizRec = function() {
	var id = this.getBizGuid();
	if (!id)
		return;
	var mainData = justep.xbl("main");
	var process = mainData.getValue("fProcess", id);
	var runner = justep.xbl('sysRunner');
	if (process == '/MOA/notice/process/noticeInfo/noticeInfoProcess') {
		runner
				.open(
						null,
						'/UI/MOA/notice/process/noticeInfo/browseActivity.w?activity-pattern=detail&fID='
								+ id, '通知信息', process, 'receiveActivity');

	} else if (process == '/common/gzzx/process/gzzx/gzzxProcess') {
		runner
				.open(
						{
							fHuoDong : id,
							fBizRecId : ''
						},
						'/UI/common/gzzx/process/gzzx/wenDianPiYueBiaoActivity.w?activity-pattern=detail',
						'阅件信息', process, 'yueJianActivity');
	} else
		butone.BizRec.openBizRec(id);
};

archiveQuery.getBizGuid = function() {
	var $bizGrid = $("#bizGrid");
	if ($bizGrid.length == 0)
		return;
	return $bizGrid.getGridParam("selrow");
};

archiveQuery.loadBizData = function(bizGroup, postdata) {
	var self = this, jsonData = {
		page : postdata.page
	};
	var variables = new justep.Request.MapParam();
	var filterMap = this.getConditionFilter(bizGroup, variables);
	var params = new justep.Request.ActionParam();
	params.setInteger("offset", postdata.rows * (postdata.page - 1));
	params.setInteger("limit", postdata.rows);
	params.setMap("filterMap", filterMap);
	params.setMap("variables", variables);
	if (postdata.sidx) {
		var reg = new RegExp(", $"), orderBy;
		if (reg.test(postdata.sidx))
			orderBy = postdata.sidx.substring(0, postdata.sidx.length - 2);
		else
			orderBy = postdata.sidx + " " + postdata.sord;
		params.setString("orderBy", orderBy);
	}

	var $statusPanel = $("#statusPanel");
	$statusPanel.show();
	justep.Request
			.sendBizRequest2({
				action : "queryArchives",
				dataType : "json",
				async : true,
				parameters : params,
				callback : function(result) {
					$statusPanel.hide();
					if (result.state) {
						var taskData = justep.xbl("main");
						butone.Data.loadJSON(taskData, result.response);
						var $groupli = $("#" + bizGroup.groupId), $bizGrid = $("#bizGrid");
						var total = parseInt(result.response.userdata["sys.count"]);
						if (!!bizGroup && !isNaN(total) && !!$bizGrid) {
							// 首次含总数查询
							taskData.total = total;
							taskData.totalPage = Math.ceil(taskData.total
									/ postdata.rows);
							var caption = bizGroup.groupName + " ("
									+ taskData.total + ")";
							$groupli.find("a").html(caption);
							$bizGrid.setCaption(caption);
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
						$bizGrid[0].addJSONData(jsonData);
						if (taskData.getCount() > 0) {
							$bizGrid.setSelection(taskData.getID());
						}
						cssSolution.changeTableColor("bizGrid");
						self.refreshBtnStatus();
					} else {
						throw justep.Error.create("调用失败！|"
								+ result.response.message);
					}
				}
			});

};

/** 过滤条件 */
archiveQuery.getConditionFilter = function(bizGroup, variables) {
	var filterMap = new justep.Request.MapParam();
	var filterData = justep.xbl("custom_filter");
	filterMap.put("status", filterData.getValue("status"));
	var smartValue = filterData.getValue("smartValue"), filterType = filterData
			.getValue("filterType"), customFilter = "";
	if (filterData.getValue("searchFieldAlias") && !!smartValue
			&& filterType == "组内查询") {
		for ( var n in bizGroup.setting.colModel) {
			var col = bizGroup.setting.colModel[n];
			if (col.name == filterData.getValue("searchFieldAlias")) {
				if (col.searchType = "smart") {
					if (col.dataType == "String") {
						var split = smartValue.indexOf("|") >= 0 ? "|" : " ";
						var symbol = split == "|" ? " or  " : " and ";
						var args = smartValue.split(split);
						for ( var n in args) {
							var s = args[n].trim();
							if (s.length > 0) {
								var pName = "smartValue" + n;
								customFilter += symbol + "instr(" + col.field
										+ ",:" + pName + ")>0";
								variables
										.put(
												pName,
												new justep.Request.SimpleParam(
														s,
														"http://www.w3.org/2001/XMLSchema#String"));
							}
						}
						if (customFilter.length > 5)
							customFilter = customFilter.substring(4);
					} else {
						customFilter = (col.dataType == 'Date'
								|| col.dataType == 'DateTime'
								|| col.dataType == 'Time' ? "to_char("
								+ col.field + ",'yyyy-MM-dd')" : col.field)
								+ " like '%'||:" + col.name + "||'%'";
						variables.put(col.name, new justep.Request.SimpleParam(
								smartValue,
								"http://www.w3.org/2001/XMLSchema#String"));
					}
				} else {
					customFilter = col.field + "=:" + col.name;
					variables.put(col.name, new justep.Request.SimpleParam(
							smartValue, "http://www.w3.org/2001/XMLSchema#"
									+ col.dataType));
				}
				break;
			}
		}
	} else {
		filterMap.put("smartValue", filterData.getValue("smartValue"));
	}
	customFilter = justep.Components.FilterUtils.joinFilter(customFilter,
			archiveQuery.getCustomFilter(), "and");

	if (!archiveQuery.disableGlobalSearch) {
		// 高级查询
		var $search = $("li.search input", "#viewSearch");
		$search.each(function() {
			var filters = "", col = $(this).parent().data("col"), value = $(
					this).val().trim();
			if (!value)
				return;
			var split = value.indexOf("|") > 0 ? "|" : " ";
			var symbol = split == "|" ? " or  " : " and ";
			var args = value.split(split);
			for ( var n in args) {
				var s = args[n].trim();
				if (s.length > 0) {
					var pName = "input" + col.name + n;
					filters += symbol + "instr(" + col.field + ",:" + pName
							+ ")>0";
					variables.put(pName, new justep.Request.SimpleParam(s,
							"http://www.w3.org/2001/XMLSchema#String"));
				}
			}
			if (filters.length > 5)
				customFilter = justep.Components.FilterUtils.joinFilter(filters
						.substring(4), customFilter, "and");
		});
	}
	if (customFilter)
		filterMap.put("customFilter", customFilter);

	filterMap.put("groupId", bizGroup.groupId);
	filterMap.put("showCldBiz", filterData.getValue("showCldBiz"));
	return filterMap;
};

archiveQuery.getCustomFilter = function() {
	var data = justep.xbl("custom_filter");
	return data.filters.toString();
};

/** ******************************************************************************************** */

/** 设置 流程轨迹、流程记录 是否显示/禁用 */
archiveQuery.refreshBtnStatus = function() {
	justep.xbl("trgBrowse").setDisabled(!archiveQuery.canBrowse());
};

/** 是否可浏览 */
archiveQuery.canBrowse = function() {
	return archiveQuery.hasData();
};

/** 是否可显示流程轨迹图 */
archiveQuery.canShowChart = function() {
	return archiveQuery.hasData() && archiveQuery.isFlow();
};
/** 是否可打开流程处理意见列表 */
archiveQuery.canOpenExecuteList = function() {
	return archiveQuery.hasData() && archiveQuery.isFlow();
};
// 是否存在数据
archiveQuery.hasData = function() {
	return (justep.xbl("main").getCount() > 0);
};

archiveQuery.isFlow = function() {
	return (!!justep.xbl("main").getValue("fFlowId"));

};

/** 流程轨迹 */
archiveQuery.trgChartClick = function(event) {
	var mainData = justep.xbl("main");
	var id = this.getBizGuid();
	var pi = mainData.getValue("fFlowId", id);
	var fBizRecId = mainData.getValue("fBizRecId", id);
	if (pi) {
		justep.xbl("dlgChart").open(
				null,
				"办理过程",
				"/UI/SA_X/task/taskCenter/banLiGuoCheng.w?pi=" + pi
						+ "&bizRecID=" + id);
	} else {
		alert("案卷无流程编号?");
	}
};

/** 流程记录{处理意见列表} */
archiveQuery.trgExecuteListClick = function(event) {
	var mainData = justep.xbl("main");
	var id = this.getBizGuid();
	if (id != null && id != "") {
		justep.xbl("process").openExecuteListDialog(id);
	}
};

// css兼容性处理
cssSolution = {
	// table tr 隔行变色
	changeTableColor : function(objId) {
		$("#" + objId + " tr:even").css("background", "#f8f8f8");
		$("#" + objId + " tr:odd").css("background", "#fefefe");
	}
};

archiveQuery.createBizGroupFilterView = function() {
	return 0;
};

archiveQuery.btnShowMoreClick = function(event) {
	archiveQuery._showMore = !archiveQuery._showMore;
	var size = 40;
	if (archiveQuery._showMore) {
		$("#btnShowMore").find("i")
				.removeClass("icon-system-angle-double-down").addClass(
						"icon-system-angle-double-up");
	} else {
		$("#btnShowMore").find("i").removeClass("icon-system-angle-double-up")
				.addClass("icon-system-angle-double-down");
		size += archiveQuery.createBizGroupFilterView();
	}
	var layout = justep.xbl("borderLayout2");
	layout.topEl.attr("size", size + "px");
	layout.onWindowResize();
};

archiveQuery.trgClearClick = function(event) {
	var data = justep.xbl('custom_filter');
	data.setValue('smartValue', '');
	data.setValue("showCldBiz", "");
	$("li.search input").val("");
	this.trgSearchClick(null);
};

archiveQuery.btnExpandClick = function(event) {
	var btn = justep.xbl("btnExpand");
	if (btn.getLabel() == "展开分组") {
		$("#bizGrid .tree-wrap-ltr.ui-icon-circlesmall-plus").trigger("click");
		btn.setLabel("收起分组");
		btn.$el.find("i").removeClass("icon-system-plus").addClass(
				"icon-system-minus");
	} else {
		$("#bizGrid .tree-wrap-ltr.ui-icon-circlesmall-minus").trigger("click");
		btn.setLabel("展开分组");
		btn.$el.find("i").removeClass("icon-system-minus").addClass(
				"icon-system-plus");
	}
};

archiveQuery.model1XBLLoaded = function(event) {
	var me = this, config = justep.xbl('config'), fnName = config
			.getValue("alterRender");
	archiveQuery.disableGlobalSearch = config.getValue("globalSearch") != "true";

	if (fnName && typeof me[fnName] == "function") {
		for ( var n in me.WarningColModels) {
			me.WarningColModels[n].formatter = me[fnName];
		}
	}

	$(".xui-borderlayout-center", "#borderLayoutMain").resize(
			function() {
				if (archiveQuery.disableGlobalSearch) {
					$("#viewBizGrid").height($(this).height() - 30);
				} else {
					var view = $("#viewSearch");
					$("#viewBizGrid").height(
							$(this).height() - 50
									- (view.is(":visible") ? 75 : 0));
				}
			}).trigger("resize");
};

archiveQuery.custom_filterBeforeRefresh = function(event) {
	event.cancel = true;
	archiveQuery.trgSearchClick();
};

archiveQuery.divMoreFilterClick = function(event) {
	$("#viewSearch").toggle();
	$(".xui-borderlayout-center", "#borderLayoutMain").trigger("resize");
};
