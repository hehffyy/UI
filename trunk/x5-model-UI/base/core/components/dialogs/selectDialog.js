var selectDialog = {};

/**
 * 接收查询回填参数
 */
selectDialog.windowReceiverReceive = function(event) {
	var data = event.data;
	if(data && data.OKTitle){
		justep.xbl('btn_apply').setLabel(data.OKTitle);
	}
	var source = event.source;
	var fw = justep.xbl("windowFrame");
	if (fw && (!fw.$iframe || source.reloadOnOpen)) {
		this.returnDataId = source.returnDataId;
		if (!this.returnDataId) {
			throw justep.Error.create(new justep.Message(
					"查询回填组件未设置returnDataId属性[源数据ID]"));
		}
		this.displayColumn = source.displayColumn;
		this.checkColumn = source.checkColumn;
		this.multiSelect = source.multiSelect;
		this.multiGridId = source.multiGridId;
		this.selectData = event.data.openParams
				&& event.data.openParams.selectData || event.data.selectData;

		if (this.multiSelect) {
			if (!this.multiGridId) {
				throw justep.Error.create(new justep.Message(
						"查询回填组件未设置multiGridId属性[多选Grid组件的id]"));
			}
			if (!this.checkColumn) {
				throw justep.Error.create(new justep.Message(
						"查询回填组件未设置checkColumn属性[源数据用于记录选中状态的字段]"));
			}
		}

		var borderLayout = justep.xbl("bl2");
		borderLayout.bottomEl.attr("size", this.multiSelect ? "100px" : "0px");
		borderLayout.onWindowResize();
		justep.xbl("bl3").onWindowResize();
		fw.open2({
			url : source.targetUrl,
			activity : source.activity,
			process : source.process,
			data : $.extend(event.data.data, {
				openParams : event.data.openParams
			})
		});
	}
};

/**
 * frame初始化时记录frame的Window对象
 */
selectDialog.windowFrameInitFrame = function(event) {
	selectDialog.frameWindow = event.frame.contentWindow;
};

/**
 * 获得Frame内部的xbl对象
 */
selectDialog.frameXbl = function(id) {
	return this.frameWindow.justep.xbl(id);
};

/**
 * 
 */
selectDialog.createSelectedData = function(mainData, idArr, relationArr) {
	if (!mainData) {
		throw justep.Error.create("未设置查询主数据");
	}

	var rArr = relationArr;
	var concept = mainData.getConceptAliasName();
	if (!rArr || rArr == "") {
		if (mainData.getResultRelations) {
			rArr = mainData.getResultRelations().split(",");
		} else {
			rArr = mainData.getRelationAlias();
			rArr.push("rowid");
		}
	}

	var result = [];
	for ( var i in idArr) {
		var id = idArr[i], row = {};
		if (mainData.isExist && !mainData.isExist(id))
			continue;
		for ( var j in rArr) {
			var relation = rArr[j], value = "";
			if (relation && relation != "") {
				try {
					if (relation == "rowid" || relation == concept ) {
						relation = "rowid";
						value = id;
					} 
					else if ( relation==mainData.idColumn.name){
						value = id;
					}
					else if (relation == "version") {
						if (mainData.getVersionColumnValue) {
							value = mainData.getVersionColumnValue();
						} else {
							value = mainData.getValue(relation, id);
						}
					} else {
						value = mainData.getValue(relation, id);
					}
				} catch (e) {
					var msg = new justep.Message(justep.Message.JUSTEP231068,
							id, relation);
					throw justep.Error.create(msg);
				}
				row[relation] = value;
			}
		}
		result.push(row);
	}
	return result;
};

selectDialog.btn_applyClick = function(event) {
	var me = selectDialog;
	var selectedData = me.getSelectData();
	if (selectedData.length == 0) {
		(new justep.System.showMessage()).open({
			msg : "请先选择数据。",
			title : "提示",
			type : 0
		});
		return false;
	}
	// var windowReceiver = justep.xbl('windowReceiver'), data = {
	// kind : "beforeApply",
	// cancel : false,
	// selectedData : selectedData
	// };
	// windowReceiver.sendData(data);
	// if (data.cancel)
	// return;
	justep.xbl('windowReceiver').windowEnsure(selectedData);
};

selectDialog.btn_cancelClick = function(event) {
	justep.xbl('windowReceiver').windowCancel();
};

/**
 * Frame.onLoad后，在grid上增加事件监听
 */
selectDialog.windowFrameSend = function(event) {
	var me = selectDialog;
	if (me.multiSelect) {
		var mainData = me.frameXbl(me.returnDataId);
		var grid = me.frameXbl(me.multiGridId);
		me._multiListInstance = new selectDialog.MultiList(mainData, grid,
				me.checkColumn, me.displayColumn, me.selectData);
		me._gridEventHandler = [];
		me._gridEventHandler.push(grid.attachEvent("onRowChecked",
				me._multiListInstance._doCheckRow));
		me._gridEventHandler.push(grid.attachEvent("onRowCheckedAll",
				me._multiListInstance._doCheckAll));
		me._dataEventHandler = [];
		me._dataEventHandler.push(mainData.attachEvent("onValueChanged",
				me._multiListInstance._doCheckedChanged));
		me._dataEventHandler.push(mainData.attachEvent("onAfterRefreshPage",
				me._multiListInstance._doPageChange));
		me._dataEventHandler.push(mainData.attachEvent("onAfterRefresh",
				me._multiListInstance._doPageChange));

	}
	return event.data;
};

selectDialog.d3Click = function(event) {
	selectDialog._multiListInstance.removeAllRow();
};

selectDialog.model1UnLoad = function(event) {
	var me = this;
	delete me._multiListInstance;
	if (me._gridEventHandler) {
		var grid = me.frameXbl(me.multiGridId);
		for ( var n in me._gridEventHandler) {
			grid.detachEvent(me._gridEventHandler[n]);
		}
		me._gridEventHandler = [];
	}
	if (me._dataEventHandler) {
		var mainData = me.frameXbl(me.returnDataId);
		for ( var n in me._dataEventHandler) {
			mainData.detachEvent(me._dataEventHandler[n]);
		}
	}
};

selectDialog.getSelectData = function() {
	var me = this;
	if (me._multiListInstance) {
		return me._multiListInstance.getSelectData();
	} else {
		var mainData = me.frameXbl(me.returnDataId);
		var idArr = [];
		idArr.push(mainData.getStore().getSelectedRowId());
		var selectedData = me.createSelectedData(mainData, idArr);
		return selectedData;
	}
};

(function() {

})();
selectDialog.MultiList = function(mainData, grid, checkColumn, displayColumn,
		defaultSelectData) {
	var returnData = [], selectIds = [], selectData = [], deleteImg = justep.Request
			.convertURL("/UI/system/images/templete/delete.gif", true), $selectHome = $("#selectHome");

	/**
	 * 计算选择区域数据量
	 */
	checkCount = function() {
		var count = $selectHome.children(".multi-select-item").length;
		$("#selectBar").children(".multi-select-count").html(
				"(共" + count + "项):");

		if (count > 0) {
			$("#selectBar").children(".multi-delete-img").css({
				visibility : "visible"
			});
		} else {
			$("#selectBar").children(".multi-delete-img").css({
				visibility : "hidden"
			});
		}
	};
	checkHelp = function(rowIds, checked) {
		var rowIdArray = [];
		if (Object.prototype.toString.apply(rowIds) === '[object Array]') {
			rowIdArray = rowIds;
		} else {
			rowIdArray.push(rowIds);
		}
		if (checked) {
			var html = "";
			for ( var i = 0; i < rowIdArray.length; i++) {
				var rowid = rowIdArray[i];
				var label = rowid;
				if (displayColumn) {
					try {
						label = mainData.getValue(justep.String
								.trim(displayColumn), rowid);
					} catch (e) {
						var msg = new justep.Message(
								justep.Message.JUSTEP230059, displayColumn);
						throw justep.Error.create(msg);
					}

				}
				var isNotExist = $selectHome
						.children(".multi-select-item[rowid='" + rowid + "']").length == 0;
				if (isNotExist) {
					$(
							"<a class='multi-select-item' rowid='"
									+ rowid
									+ "'><i class='icon icon-system-cancel'></i>"
									+ label + "</a>").appendTo($selectHome)
							.click(function() {
								removeRow(this);
							});

				}
			}

		} else {
			for ( var i = 0; i < rowIdArray.length; i++) {
				var rowid = rowIdArray[i];
				$selectHome.children(
						".multi-select-item[rowid='" + rowid + "']").remove();
			}
		}

	};
	synchrSelectIds = function() {
		selectIds = [];
		$selectHome.children(".multi-select-item").each(function() {
			var rowid = $(this).attr("rowid");
			selectIds.push(rowid);
		});

		var data = selectDialog.createSelectedData(mainData, selectIds);
		for ( var i in data) {
			var rowid = data[i].rowid, isExist = false;

			for ( var j in selectData) {
				if (selectData[j] && selectData[j].rowid === rowid) {
					isExist = true;
					break;
				}
			}

			if (!isExist)
				selectData.push(data[i]);
		}
	};

	deleteSelectData = function(idArr) {
		var rowIdArray = [];
		if (Object.prototype.toString.apply(idArr) === '[object Array]') {
			rowIdArray = idArr;
		} else {
			rowIdArray.push(idArr);
		}

		for ( var i in rowIdArray) {
			var idx = "";
			rowid = rowIdArray[i];
			for ( var j in selectData) {
				if (selectData[j] && selectData[j].rowid === rowid) {
					idx = j;
					break;
				}
			}
			selectData.splice(idx, 1);
		}
	};

	synchrGridChecked = function() {
		for ( var i in selectData) {
			var rowid = selectData[i].rowid;
			var store = mainData.getStore();
			store.setValueById(rowid, checkColumn, "1");
		}
	};

	checkRow = function(rowIdArr, checked) {
		checkHelp(rowIdArr, checked);
		checkCount();
		synchrSelectIds();
		if (!checked)
			deleteSelectData(rowIdArr);
	};

	removeRow = function(ele) {
		var rowid = $(ele).attr("rowid");
		if (!rowid)
			return;
		var store = mainData.getStore();
		store.setValueById(rowid, checkColumn, "0");
		if ("tree" == store.type)
			grid.grid.setItemChecked(rowid, false);
		$(ele).remove();
		checkCount();
		synchrSelectIds();
		deleteSelectData(rowid);
	};

	function getCheckedRowIds() {
		var checkColIndex = grid.grid.getColIndexById(checkColumn);
		return grid.grid.getCheckedRows(checkColIndex).split(",");
	}

	if (defaultSelectData) {
		selectData = defaultSelectData.concat();
		for ( var n in selectData) {
			var rowid = selectData[n].rowid, label = rowid;
			if (displayColumn)
				label = selectData[n][displayColumn];
			selectIds.push(rowid);
			$(
					"<a class='multi-select-item' rowid='" + rowid
							+ "'><i class='icon icon-system-cancel'></i>"
							+ label + "</a>").appendTo($selectHome).click(
					function() {
						removeRow(this);
					});
		}

		setTimeout(function() {
			if(grid.grid.getHeaderMasterCheckbox()){
				grid.grid.getHeaderMasterCheckbox().checked = false;
				synchrGridChecked();
			}
		});

	}

	return {
		_doCheckedChanged : function(event) {
			var checked = parseInt(event.value) == 1;
			checkRow(event.rowID, checked);
		},

		_doPageChange : function() {
			debugger;
			var headerCk=grid.grid.getHeaderMasterCheckbox();
			if (headerCk)
				grid.grid.setHeaderMasterCheckboxState(false);
			synchrGridChecked();
		},
		/**
		 * 单选(grid)
		 */
		_doCheckRow : function(e) {
			checkRow(e.rowId, e.checked);
		},

		checkRow : function(rowIdArr, checked) {
			checkRow(rowIdArr, checked);
		},
		/**
		 * 全选(grid)
		 */
		_doCheckAll : function(e) {
			var idArr = e.checked ? getCheckedRowIds() : e.grid.getAllRowIds()
					.split(",");
			checkRow(idArr, e.checked);
		},
		checkAll : function(checked) {
			var idArr = grid.grid.getAllRowIds().split(",");
			checkRow(idArr, checked);
		},

		getSelectData : function() {
			return selectData;
		},
		/**
		 * 删除所有行
		 */
		removeAllRow : function() {
			var store = mainData.getStore();
			$selectHome.children(".multi-select-item").each(function() {
				var rowid = $(this).attr("rowid");
				if (rowid) {
					store.setValueById(rowid, checkColumn, "0");
					if ("tree" == store.type)
						grid.grid.setItemChecked(rowid, false);
				}
			});
			var ckb = grid.grid.getHeaderMasterCheckbox();
			if (ckb)
				ckb.checked = false;
			$selectHome.children(".multi-select-item").remove();
			checkCount();
			synchrSelectIds();
			selectData = [];
		}
	};
};

selectDialog.windowFrameReceive = function(event) {
	if (event.data.kind == "initFinish") {
		if(selectDialog._multiListInstance){
			selectDialog._multiListInstance._doPageChange();
			checkCount();
		}
		selectDialog.onReceiveInitFinishEvent && selectDialog.onReceiveInitFinishEvent.apply(selectDialog, [ event ]);
	}
};
