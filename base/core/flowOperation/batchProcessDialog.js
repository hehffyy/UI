var batchProcessDialog = {};

batchProcessDialog._initBindModel = function(model, receiveData) {
	model.registeData("controlData");
	model.registeData("activityData");
	model.registeData("flowToData");
	model.registeData("executorData");
	model.registeData("dTask");
	model.registeData("ruleData");
	var comp = butone.Bind.bindingHandlers.component["$model/UI/base/components/knockout/bindTemplate"];
	var $roorView = $("#rootView");
	$roorView.show();
	batchProcessDialog._extendBindModel(model);
	butone.Composition.bindAndShow($roorView[0], model);
	model.reload(receiveData);
};

batchProcessDialog.windowReceiverReceive = function(event) {
	var me = this;
	require([ "jquery" ], function($) {
		!me.receiveDataDTD && (me.receiveDataDTD = $.Deferred());
		me.receiveDataDTD.resolve(event.data);
	});
};

batchProcessDialog.model1ModelConstruct = function(event) {
	var me = this;
	require([ "jquery" ], function($) {
		var promise = butone.Context.getBindModelPromise();
		!me.receiveDataDTD && (me.receiveDataDTD = $.Deferred());
		$.when(promise, me.receiveDataDTD).done(
				batchProcessDialog._initBindModel.bind(batchProcessDialog));
	});
};

batchProcessDialog._extendBindModel = function(model) {
	var defaultGridOptions = {
		// autowidth : true,// 自动宽
		// altRows:true,//设置为交替行表格,默认为false
		hidegrid : false,
		shrinkToFit : true,
		pager : "#taskNav",
		grouping : false,
		multiselect : true,
		viewrecords : true
	};

	var Org = require("base/lib/bind/org");
	var MessageDialog = require("base/components/knockout/messageDialog");
	var $2 = require("jquery");
	var WindowDialog = require("base/components/knockout/windowDialog");
	var TASK_RELATIONS = [ "sName", "sExecuteMode", "sPreemptMode",
			"sExecuteMode2" ];
	var allExecutors = {};
	var modelExtend = {
		task : null,
		action : null,
		flowToExecutorReadonly : false,
		control : null,
		options : {},
		stop : butone.Bind.observable(false),
		isBatch : butone.Bind.observable(false),
		stepCount : butone.Bind.observable(1),
		dataFormUrl : butone.Bind.observable(),
		oldExecutorDialog : false,

		reload : function(receiveData) {
			this._selectExecutorsDlg && this._selectExecutorsDlg.close();
			var controlData = justep.xbl("controlData");
			controlData.setValue("message", "");
			justep.xbl("activityData").clear();
			justep.xbl("flowToData").clear();
			justep.xbl("noticeData").clear();
			justep.xbl("executorData").clear();
			justep.xbl("dTask").clear();
			justep.xbl("taskList").clear();
			justep.xbl("ruleData").clear();
			this.isBatch
					.set(receiveData.options && receiveData.options.isBatch);
			this.task = receiveData.task;
			this.action = receiveData.action;
			this.flowToExecutorReadonly = (receiveData.action === "backQuery");
			this.options = receiveData.options;
			var control = this.control = new justep.ProcessControl();
			control.loadFromJson(receiveData.data);
			this.control.reset();

			// 初始化任务数据
			var dTask = justep.xbl("dTask");
			dTask.setFilter("idFilter", "SA_Task = '" + receiveData.task + "'");
			dTask.refreshData();

			// 初始化监管消息
			var dSuperviseMsg = justep.xbl("dSuperviseMsg");
			dSuperviseMsg.setFilter("_recFilter", "fBizRecId='"
					+ dTask.getValue("sData1") + "' and fTaskId='"
					+ dTask.getID() + "' and fCreatePerson='"
					+ justep.Context.getCurrentPersonID() + "'");
			dSuperviseMsg.refreshData();
			this.initControlData(control);
			this.initActivityData(control);
			this.initFlowToData(control);
			this.initNoticeData(control);

			var data = justep.xbl("executorData");
			var allCnt = {};
			for ( var i = data.getCount() - 1; i >= 0; i--) {
				var rowid = data.getID(i), actID = data
						.getValue("owner", rowid);
				allCnt[actID] = allCnt.hasOwnProperty(actID) ? allCnt[actID] + 1
						: 1;
			}

			data = justep.xbl("activityData");
			for ( var i = data.getCount() - 1; i >= 0; i--) {
				var rowid = data.getID(i), actID = data.getValue("id", rowid);
				data
						.setValue("executorCount",
								allCnt.hasOwnProperty(actID) ? allCnt[actID]
										: 0, rowid);
			}

			// 初始化操作
			this.initOperationOption();
		},

		/**
		 * 初始化操作选项
		 */
		initOperationOption : function() {
			// 清除TaskGrid
			var $taskGrid = $("#taskGrid");
			if ($taskGrid.length > 0)
				$taskGrid.GridUnload();
			$("#taskNav").remove();
			// 清除操作表单
			$("#contentOperationForm").empty();
			// 查询业务操作选项
			var params = new justep.Request.ActionParam(), operationOption;
			params.setString("process", justep.Context.getCurrentProcess());
			params.setString("activity", justep.Context.getCurrentActivity());
			var operation = this.action.indexOf("Query") == -1 ? this.action
					: this.action.substring(0, this.action.length - 5);
			params.setString("operation", operation);
			params.setBoolean("isBatch", this.isBatch.get());
			justep.Request.sendBizRequest2({
				action : "queryBizOperationOptionAction",
				dataType : "json",
				parameters : params,
				callback : function(result) {
					if (result.state) {
						operationOption = result.response;
					} else {
						throw new Error("调用失败！|" + result.response.message);
					}
				}
			});
			var stepCnt = 1, step = 2;
			// 初始化批量TaskGrid
			if (this.isBatch.get()) {
				this.isBatch.set(!!operationOption.bizGroup);
				if (this.isBatch.get()) {
					this.initTaskGrid(operationOption.bizGroup);
					stepCnt++;
					step = 0;
				}
			}
			// 初始化操作表单
			if (operationOption.formName) {
				var p = justep.Context.getCurrentProcess().substring(0,
						justep.Context.getCurrentProcess().lastIndexOf("/"));
				var dataFormUrl = "/UI" + p + "/"
						+ justep.Context.getCurrentActivity() + "_"
						+ operationOption.formName + ".w";
				this.initOperationForm(dataFormUrl);
				stepCnt++;
				step == 2 && (step = 1);
			}
			this.stepCount.set(stepCnt);
			// 激活页签
			if (step != 2)
				$2(".nav-tabs li a:eq(" + step + ")").tab("show");

		},

		initTaskGrid : function(bizGroup) {
			var colModel = bizGroup.setting.colModel;
			for ( var n = colModel.length - 1; n >= 0; n--) {
				var col = colModel[n];
				if (col.name
						.match("fBizName|sActivityName|fFinishKind|fCurActs|fHbState"))
					col.hidden = true;
			}

			var self = this, taskData = justep.xbl("taskList"), $viewTaskGrid = $("#viewTaskGrid");
			var rowNum = Number($.cookie("batchProcess.taskCount")), groupId = bizGroup.groupId;
			(isNaN(rowNum) || rowNum <= 0) && (rowNum = 10);

			var setting = $.extend(true, bizGroup.setting, {
				height : $viewTaskGrid.height() - 70,
				width : $viewTaskGrid.width() - 2,
				rowNum : rowNum,
				rowList : [ 10, 20, 50, 100 ]
			}, defaultGridOptions);
			setting.datatype = function(postdata) {
				self.loadTaskData(bizGroup, postdata);
			};
			setting.afterCompleteFunction = function() {
				$("#" + self.task, $taskGrid).css("color", "pink");
				$taskGrid.setSelection(self.task);
			};

			setting.gridComplete = function() {
				$("#" + self.task, $taskGrid).css("color", "blue");
				$taskGrid.setSelection(self.task);
			};
			setting.onSelectRow = function(rowid, status) {
				if (rowid == self.task && !status)
					$taskGrid.setSelection(self.task);
			};

			$viewTaskGrid
					.append("<div id='taskNav' style='height:30px'></div>");
			$viewTaskGrid.append("<table id='taskGrid'></table>");
			var $taskGrid = $("#taskGrid");
			$taskGrid.jqGrid(setting);
			$("#gbox_taskGrid").css("margin", "0 auto").removeClass(
					"ui-corner-all");
			$viewTaskGrid.resize(function() {
				var $c = $(this);
				var grid = $("#taskGrid").jqGrid();
				grid.setGridHeight($c.height() - 70);
				grid.setGridWidth($c.width() - 2, true);
				// $taskGrid.jqGrid('setGridWidth', $viewTaskGrid.width() - 20)
				// .jqGrid('setGridHeight', $viewTaskGrid.height() - 70);
			});
		},

		/**
		 * 初始化操作表单
		 */
		initOperationForm : function(dataFormUrl) {
			var me = this, frameForm = me.options && me.options.context ? me.options.context.frameForm
					: null;
			me.dataFormUrl.set(dataFormUrl);
			//
			var call = function(event) {
				return {
					form : frameForm,
					prevFixed : me.action
				};
			};
			$("#contentOperationForm").append(
					"<div id='divOperationForm' class='xui-autofill'/>");
			new justep.WindowFrame("divOperationForm", dataFormUrl, "true",
					call, null, null, null, null);
		},

		initControlData : function(control) {
			var controlData = justep.xbl("controlData");
			controlData.setValue("message", control.getMessage());
			var ruleData = justep.xbl("ruleData");
			var dSuperviseMsg = justep.xbl("dSuperviseMsg");
			ruleData.clear();
			var exts = control.getExts();
			var stop = false;
			var msg = "";
			if (exts && exts.rules) {
				var defaultValues = [];
				for ( var i = 0; i < exts.rules.length; i++) {
					var extRule = exts.rules[i];
					var rowData = {
						guid : extRule.guid,
						content : extRule.message,
						name : extRule.name,
						supervise : extRule.supervise,
						stop : extRule.stop ? 1 : 0
					};
					defaultValues.push(rowData);
					if (extRule.supervise) {
						var ids = dSuperviseMsg.find([ "fRuleId" ],
								[ extRule.guid ], true);
						if (ids.length > 0) {
							dSuperviseMsg.setValue("fRuleName", extRule.name,
									ids[0]);
							dSuperviseMsg.setValue("fRuleContent",
									extRule.message, ids[0]);
							if (dSuperviseMsg.getValue("fExplainContent",
									ids[0])
									|| eval(dSuperviseMsg.getValue(
											"fExplainFiles", ids[0])
											|| "[]").length > 0)
								rowData.apply = 1;
						} else {
							var dTask = justep.xbl("dTask");
							dSuperviseMsg.newData({
								defaultValues : [ {
									fRuleId : extRule.guid,
									fRuleName : extRule.name || "",
									fRuleContent : extRule.message,
									fTaskId : dTask.getID(),
									fBizRecId : dTask.getValue("sData1")
								} ]
							});
						}
					}
					if (!stop)
						stop = extRule.stop;
					// msg += extRule.message + "\n";
				}
				ruleData.newData({
					defaultValues : defaultValues
				});
			}
			// controlData.setValue("ruleMessage", msg);
			this.stop.set(stop);
			this.oldExecutorDialog = exts.oldExecutorDialog;
		},

		initActivityData : function(control) {
			var activityContent = {
				defaultValues : []
			};
			var executorContent = {
				defaultValues : []
			};
			var activities = control.getActivities() || [];
			for ( var i = 0; i < activities.length; i++) {
				this.addActivity(activityContent.defaultValues,
						executorContent.defaultValues, activities[i], control);
			}
			var activityData = justep.xbl("activityData");
			activityData.clear();
			activityContent.defaultValues.length > 0
					&& activityData.newData(activityContent);

			var executorData = justep.xbl("executorData");
			executorData.clear();
			executorContent.defaultValues.length > 0
					&& executorData.newData(executorContent);
		},

		initFlowToData : function(control) {
			var data = {
				rows : []
			};
			var items = control.getToItems() || [];
			for ( var i = 0; i < items.length; i++) {
				this.addFlowTo(data.rows, items[i], control);
			}
			var flowToData = justep.xbl("flowToData");
			flowToData.clear();
			data.rows.length > 0 && flowToData.newData({
				defaultValues : data.rows
			});
		},

		addFlowTo : function(rows, item, control) {

			var row = {};
			row.activityID = item.getActivityID();
			if (!item.isEnd()) {
				for ( var i = 0; i < TASK_RELATIONS.length; i++) {
					row[TASK_RELATIONS[i]] = item
							.getTaskRelationValue(TASK_RELATIONS[i])
							|| "";
				}
			}
			rows.push(row);
		},

		initNoticeData : function(control) {

		},

		getConditionFilter : function(groupId) {
			var filterMap = new justep.Request.MapParam();
			var filterData = justep.xbl("controlData");
			filterMap.put("taskGroup", "WAITTING");
			filterMap.put("smartValue", filterData.getValue("smartValue"));
			filterMap.put("groupId", groupId);
			return filterMap;
		},
		loadTaskData : function(bizGroup, postdata) {
			$.cookie("batchProcess.taskCount", postdata.rows);

			var self = this, jsonData = {
				page : postdata.page
			};
			var filterMap = this.getConditionFilter(bizGroup.groupId);
			var params = new justep.Request.ActionParam();
			params.setString("process", justep.Context.getCurrentProcess());
			params.setString("activity", justep.Context.getCurrentActivity());
			params.setMap("filterMap", filterMap);
			params.setInteger("offset", postdata.rows * (postdata.page - 1));
			params.setInteger("limit", postdata.rows);
			if (postdata.sidx) {
				var reg = new RegExp(", $");
				if (reg.test(postdata.sidx))
					postdata.sidx = postdata.sidx.substring(0,
							postdata.sidx.length - 2);
				else
					postdata.sidx = postdata.sidx + " " + postdata.sord;
				params.setString("orderBy", postdata.sidx);
			}
			params.setMap("variables", null);
			var $statusPanel = $("#statusPanel");
			$statusPanel.show();
			justep.Request
					.sendBizRequest2({
						action : "queryBatchTaskAction",
						dataType : "json",
						parameters : params,
						async : true,
						callback : function(result) {
							$statusPanel.hide();
							if (result.state) {
								var taskData = justep.xbl("taskList");
								butone.Data.loadJSON(taskData, result.response);
								var total = parseInt(result.response.userdata["sys.count"]);
								if (!isNaN(total)) {
									// 首次含总数查询
									taskData.total = total;
									taskData.totalPage = Math
											.ceil(taskData.total
													/ postdata.rows);
								}
								jsonData.records = taskData.total;
								jsonData.total = taskData.totalPage;

								var colModel = bizGroup.setting.colModel;
								var rows = [];
								for ( var i = 0; i < taskData.getCount(); i++) {
									var rowId = taskData.getID(i), cell = [], sID = taskData
											.getValue("sID", rowId);
									// if (sID == self.task)
									// continue;
									for ( var n in colModel) {
										col = colModel[n];
										cell.push(taskData.getValue(col.name,
												rowId));
									}
									rows.push({
										id : sID,
										cell : cell
									});
								}
								jsonData.rows = rows;
								var $taskGrid = $("#taskGrid");
								$taskGrid[0].addJSONData(jsonData);
								// TODO 初始化table tr各行变色，使用Jquery
								// 兼容IE低版本。什么版本？？？？
								// cssSolution.changeTableColor("taskGrid");
							} else {
								throw new Error("调用失败[加载业务数据失败]！|"
										+ result.response.message);
							}

						}
					});

		},

		getOrgImageUrl : function(ele, fid) {
			var OrgUtils = justep.Org.OrgUtils, orgKind = OrgUtils
					.getOrgKindID(fid), orgID = justep.Org.OrgUtils
					.getIDByFID(fid);
			if (orgKind == justep.Org.OrgKinds.ORGKIND_PERSONMEMBER) {
				var pid = orgID.substring(0, orgID.lastIndexOf("@"));
				Org.Util.queryPersonImageURL(pid).done(function(url) {
					$(ele).attr("src", url);
				});
			}
			return require.toUrl("base/lib/bind/img/org.png");
		},

		addActivity : function(activityRows, executorRows, activity, control) {
			if (activity.isSelectable()) {
				var toItem = control.getToItemByID(activity.getID());
				var isEnd = toItem.isEnd();
				var selected = toItem.isSelected() || activity.isSelected();
				activityRows.push({
					id : activity.getID(),
					selected : selected,
					isEnd : isEnd,
					label : activity.getLabel(),
					executorCount : 0
				});
				this.addExecutors(executorRows, toItem);
			}
			var children = activity.getChildren();
			if (children && children.length > 0) {
				for ( var i = 0; i < children.length; i++) {
					this.addActivity(activityRows, executorRows, children[i],
							control);
				}
			}
			if (activityRows.length == 1) {
				activityRows[0].selected = true;
			}
		},

		addExecutors : function(executorRows, controlItem) {
			var executors = controlItem.getExecutors() || [];
			for ( var i = 0; i < executors.length; i++) {
				var executor = executors[i];
				allExecutors[executor.fid] = executor;
				executorRows.push({
					owner : controlItem.getActivityID(),
					sFName : executor.fname,
					sFID : executor.fid,
					responsible : (executor.responsible == "true" ? 1 : 0),
					sName : justep.Org.OrgUtils.getNameByFName(executor.fid,
							executor.fname)
				});
			}
		},

		setExecutors : function(owner, executors) {
			var newRows = [];
			var data = justep.xbl("executorData");
			var allCnt = {};
			for ( var i = data.getCount() - 1; i >= 0; i--) {
				var rowid = data.getID(i), actID = data
						.getValue("owner", rowid);
				if (actID == owner) {
					data.deleteData(rowid);
				} else {
					allCnt[actID] = allCnt.hasOwnProperty(actID) ? allCnt[actID] + 1
							: 1;
				}
			}
			for ( var i = 0; i < executors.length; i++) {
				var executor = executors[i];
				newRows.push({
					owner : owner,
					sFName : executor.fname,
					sFID : executor.fid,
					responsible : (executor.responsible == "true" ? 1 : 0),
					sName : justep.Org.OrgUtils.getNameByFName(executor.fid,
							executor.fname)
				});
				allCnt[owner] = allCnt.hasOwnProperty(owner) ? allCnt[owner] + 1
						: 1;
			}
			newRows.length > 0 && data.newData({
				defaultValues : newRows
			});

			data = justep.xbl("activityData");
			for ( var i = data.getCount() - 1; i >= 0; i--) {
				var rowid = data.getID(i), actID = data.getValue("id", rowid);
				data
						.setValue("executorCount",
								allCnt.hasOwnProperty(actID) ? allCnt[actID]
										: 0, rowid);
			}
		},

		checkbox2Change : function(event) {
			var $object = butone.Bind.contextFor(event.source.domNode).$object;
			this.control.updateActivityStatus($object.val("id"), event.checked);
			var self = this;
			$object.data.each(function(options) {
				var row = options.row;
				var id = row.val("id");
				var activity = self.control.getActivityByID(id);
				row.ref("selected").set(activity.isSelected());
			});
		},

		imgListClick : function(event) {
			var row = butone.Bind.contextFor(event.currentTarget).$object;
			row.val("btnStatus", "");
		},
		imgListRemoveItemClick : function(event) {
			event.stopPropagation(); // 阻止list接收到click事件
			var list = this.comp($(event.currentTarget)
					.parents(".bindTemplate")[0]);
			var context = butone.Bind.contextFor(event.currentTarget);
			var data = context.$object.data;
			data.__data.deleteData(context.$object.getID());

			data = justep.xbl("activityData");
			var ids = data.find([ "id" ], [ context.$object.val("owner") ],
					true);
			if (ids.length > 0) {
				var newCnt = data.getValue("executorCount", ids[0]) - 1;
				data.setValue("executorCount", newCnt, ids[0]);
				if (newCnt === 0) {
					context.$parent.val("btnStatus", "");
				}
			}
		},

		imgListRemoveClick : function($object, event) {
			event.stopPropagation(); // 阻止list接收到click事件
			$object.val("btnStatus", "removeAll");
		},

		imgListRemoveAllClick : function(event) {
			var context = butone.Bind.contextFor(event.currentElement
					|| event.srcElement);
			event.stopPropagation(); // 阻止list接收到click事件
			var self = this;
			self.parentElement = event.currentTarget.parentElement;
			if (!this._msgDialog) {
				this._msgDialog = new MessageDialog({
					parentNode : self.getElementByXid("rootView")
				});
			}
			this._msgDialog.off("onOK");
			this._msgDialog.on("onOK", function() {
				var data = justep.xbl("executorData");
				for ( var i = data.getCount() - 1; i >= 0; i--) {
					var rowid = data.getID(i);
					if (data.getValue("owner", rowid) == context.$object
							.val("id"))
						data.deleteData(rowid);
				}
				data = context.$object.data.__data;
				data.setValue("executorCount", 0, context.$object.getID());
				context.$object.val("btnStatus", "");
			}, this);
			this._msgDialog.eventObj = event;
			this._msgDialog.show({
				type : "OKCancel",
				title : "提示",
				message : "确认清空所有吗？"
			});
		},

		flowToAddClick : function(event) {
			var $object = butone.Bind.contextFor(event.currentTarget).$object;
			this.showExecutorDialog(this.control.getToItemByID($object
					.val("id")));
		},

		showExecutorDialog : function(item) {
			if (!this._selectExecutorsDlg) {
				this._selectExecutorsDlg = new WindowDialog({
					id : "wdSelectExecutors",
					parentNode : $("#rootView")[0],
					showTitle : false,
					reloadOnOpen : true
				});
				this._selectExecutorsDlg.init();
			}
			this._selectExecutorsDlg.off("onReceive");
			this._selectExecutorsDlg.on("onReceive", function(event) {
				this.setExecutors(event.source._toItem.getID(),
						this.oldExecutorDialog ? event.data.selected
								: event.data);
			}, this);
			this._selectExecutorsDlg._toItem = item;
			var param = this.createExecutorDialogParam(item);
			var url = this.oldExecutorDialog ? "/UI/system/service/process/dialogs/selectExecutorsDialog.w"
					: "/UI/system/components/orgSelectExt/dialog/orgDialog.w";
			this._selectExecutorsDlg.open(param, null, url);
		},

		stringToArray : function(str, seperator) {
			var result = [];
			seperator = seperator || ",";
			if (str && (typeof (str) === "string")) {
				var items = str.split(seperator);
				for ( var i = 0; i < items.length; i++) {
					if (items[i]) {
						result.push(justep.String.trim(items[i]));
					}
				}
			}
			return result;
		},

		getVisibleKinds : function(kinds) {
			var result = [];
			kinds = kinds || [];
			for ( var i = 0; i < kinds.length; i++) {
				var parents = justep.Org.OrgKinds.getParents(kinds[i]);
				if (parents) {
					parents.push(kinds[i]);
					for ( var j = 0; j < parents.length; j++) {
						if (result.indexOf(parents[j]) === -1)
							result.push(parents[j]);
					}
				}
			}

			return result;
		},

		createExecutorDialogParam : function(item) {
			var filter = "", range = item.getExecutorRange() || [];
			if (range.length > 0) {
				for ( var i = 0; i < range.length; i++) {
					if (range[i] && range[i].fid) {
						allExecutors[range[i].fid] = range[i];
						if (filter)
							filter += " || ";
						filter += " ($row.val('sFID').indexOf('" + range[i].fid
								+ "')===0) ";
					}
				}
				var kindFilter = "";
				var kinds = this.stringToArray(item.getExecutorKinds(), " ");
				kinds = this.getVisibleKinds(kinds);
				for ( var i = 0; i < kinds.length; i++) {
					if (kinds[i]) {
						if (kindFilter)
							kindFilter += " || ";
						kindFilter += " ($row.val('sOrgKindID')==='" + kinds[i]
								+ "') ";
					}
				}

				if (kindFilter) {
					if (filter) {
						filter = "(" + filter + ") && (" + kindFilter + ")";
					} else {
						filter = kindFilter;
					}
				}
			} else {
				filter = "1<0";
			}

			if (filter)
				filter = "js:" + filter;
			var selected = [], data = justep.xbl("executorData");
			for ( var i = 0; i < data.getCount(); i++) {
				var rowid = data.getID(i);
				if (item.getID() == data.getValue("owner", rowid)
						&& justep.XData.STATE.DELETE != data.getState(rowid)) {
					selected.push(allExecutors[data.getValue("sFID", rowid)]);
				}
			}
			return {
				multiSelection : item.getTaskRelationValue("sEIField41") !== "1",// 临时借用使用任务的sEIField41属性来描述执行者是否单选
				selected : selected,
				orgs : range.length > 0 ? item.getExecutorRange() : item
						.getExecutors(),
				range : range,
				orgKinds : kinds ? kinds.toString() : "",
				globalSequence : true,
				showFilter : filter,
				cascade : true
			};
		},

		updateControl : function() {
			var self = this;
			this.comp("activityData").each(function(options) {
				var row = options.row;
				var id = row.val("id");
				var selected = row.val("selected");
				self.control.getToItemByID(id).setSelected(selected);
			});

			this.comp("flowToData").each(
					function(options) {
						var row = options.row;
						var id = row.val("activityID");
						var item = self.control.getToItemByID(id);
						if (!item.isEnd()) {
							for ( var i = 0; i < TASK_RELATIONS.length; i++) {
								item.setTaskRelationValue(TASK_RELATIONS[i],
										row.val(TASK_RELATIONS[i]) || "");
							}
						}
					});

			// this.comp("noticeData").each(function(options) {
			// var row = options.row;
			// var rowid = row.val("rowid");
			// var item = self.control.getNoticeItemByID(rowid);
			// item.setSelected(row.val("selected"));
			// item.setTaskRelationValue("sName", row.val("sName") || "");
			// });

			var toItems = this.control.getToItems() || [];
			for ( var i = 0; i < toItems.length; i++) {
				toItems[i].clearExecutors();
			}

			var noticeItems = this.control.getNoticeItems() || [];
			for ( var i = 0; i < noticeItems.length; i++) {
				noticeItems[i].clearExecutors();
			}

			this.comp("executorData").each(
					function(options) {
						var row = options.row;
						var owner = row.val("owner");
						var item = self.control.getToItemByID(owner)
								|| self.control.getNoticeItemByID(owner);
						if (!item.isEnd()) {
							var fid = row.val("sFID") || "";
							var fname = row.val("sFName") || "";
							var responsible = (row.val("responsible") === 1);
							item.addExecutor(fid, fname, responsible);
						}
					});
		},

		checkControl : function() {
			var hasSelected = false;
			var toItems = this.control.getToItems() || [];
			if (toItems.length > 0) {
				for ( var i = 0; i < toItems.length; i++) {
					if (toItems[i].isSelected()) {
						hasSelected = true;
						if (!toItems[i].isEnd()) {
							var executors = toItems[i].getExecutors() || [];
							if (executors.length == 0) {
								var label = this.control.getActivityByID(
										toItems[i].getActivityID()).getLabel();
								var title = new justep.Message2(
										justep.Message2.JUSTEP230086)
										.getMessage();
								var message = new justep.Message2(
										justep.Message2.JUSTEP230087, label)
										.getMessage();
								this.showError(title, message);
								return false;
							}
						}
					}
				}

				if (!hasSelected) {
					var title = new justep.Message2(
							justep.Message2.JUSTEP230086).getMessage();
					var message = new justep.Message2(
							justep.Message2.JUSTEP230085).getMessage();
					this.showError(title, message);
					return false;
				}
			}

			var noticeItems = this.control.getNoticeItems() || [];
			for ( var i = 0; i < noticeItems.length; i++) {
				if (noticeItems[i].isSelected()) {
					var executors = noticeItems[i].getExecutors() || [];
					if (executors.length == 0) {
						var label = noticeItems[i]
								.getTaskRelationValue("sName");
						var title = new justep.Message2(
								justep.Message2.JUSTEP230086).getMessage();
						var message = new justep.Message2(
								justep.Message2.JUSTEP230087, label)
								.getMessage();
						this.showError(title, message);
						return false;
					}
				}
			}

			return true;
		},
		showError : function(title, message) {
			var dialog = this._getMessageDialog();
			dialog.show({
				type : "OK",
				title : title,
				message : message
			});
		},
		_getMessageDialog : function() {
			if (!this.msgDialog)
				this.msgDialog = new MessageDialog({
					parentNode : this.getElementByXid("rootView")
				});
			return this.msgDialog;
		},

		okBtnClick : function(event) {
			xforms.blur(true);
			if (!justep.xbl("dTask").saveData()
					|| !justep.xbl("dSuperviseMsg").saveData()) {
				return;
			}

			var ruleData = justep.xbl("ruleData"), invalidInfo = "";
			for ( var n = 0; n < ruleData.getCount(); n++) {
				var rowID = ruleData.getID(n);
				if (ruleData.getValue("supervise", rowID) == 1
						&& ruleData.getValue("apply", rowID) != 1) {
					invalidInfo += "监管规则[" + ruleData.getValue("name", rowID)
							+ "]未答复\n";
				}
			}
			if (invalidInfo) {
				new justep.System.showMessage().open({
					msg : invalidInfo,
					img : 'info',
					title : '监管规则',
					type : 0
				});
				return;
			}

			var model = butone.Context.getBindModel();
			model.updateControl();
			if (model.checkControl()) {
				var receiver = justep.xbl("windowReceiver");
				var data = {
					tasks : $("#taskGrid").jqGrid("getGridParam", "selarrrow"),
					task : model.task,
					action : model.action,
					data : model.control.getData(),
					options : model.options
				};
				if (this.isBatch.get()) {
					data.exts = {
						batchData : {
							tasks : $("#taskGrid").jqGrid("getGridParam",
									"selarrrow")
						}
					};
				}
				receiver.windowEnsure(data);
			}
		},

		cancelBtnClick : function(event) {
			justep.xbl("windowReceiver").windowCancel();
		},

		showSuperviseRule : function(event) {
			var row = event.bindingContext.$object;
			var dSuperviseMsg = justep.xbl("dSuperviseMsg");
			var msgID = dSuperviseMsg.find([ "fRuleId" ], [ row.val("guid") ],
					true)[0];
			if (!this._superviseMsgDlg) {
				this._superviseMsgDlg = new WindowDialog({
					id : "wdsuperviseMsg",
					parentNode : $("#rootView")[0],
					showTitle : true,
					reloadOnOpen : true
				});
				this._superviseMsgDlg.init();
			}
			this._superviseMsgDlg.off("onReceive");
			this._superviseMsgDlg.on("onReceive", function(event) {
				dSuperviseMsg.setValue("fExplainContent", event.data.value,
						msgID);
				dSuperviseMsg.setValue("fExplainFiles", event.data.attachment,
						msgID);
				dSuperviseMsg.saveData();
				if (event.data.value
						|| eval(event.data.attachment || "[]").length > 0)
					row.val("apply", 1);
				else
					row.val("apply", 0);
			}, this);
			this._superviseMsgDlg.open({
				style : "text",
				value : dSuperviseMsg.getValue("fExplainContent", msgID) || "",
				attachment : dSuperviseMsg.getValue("fExplainFiles", msgID)
						|| "[]"
			}, "监管依据答复", "/UI/base/common/dialog/htmlEditorDialog.w");
		}
	};

	butone.Util.apply(model, modelExtend);
};

// TODO 禁止监管答复后允许批转
// batchProcessDialog.ruleDataDataChanged = function(event) {
// if (butone.Context.getBindModelPromise().state() == "pending")
// return;
// var model = butone.Context.getBindModel();
// var ruleData = model.comp("ruleData");
// if (ruleData.getCount() == 0) {
// model.stop.set(false);
// } else {
// var stop = false;
// ruleData.eachAll(function() {
// if (this.val("stop") == 1
// && (this.val("supervise") == 1
// && this.val("apply") != 1 || this
// .val("supervise") != 1)) {
// // 监管但未答复 或者 非监管
// stop = true;
// }
// });
// model.stop.set(stop);
// }
// };
