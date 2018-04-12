var treeMaterialManager = {};
var treeMaterialManager = {
	// 增加高拍仪支持
	loadGpy : false,
	_uploadAll : false
// 这个参数貌似没有用
};

treeMaterialManager.model1Load = function(event) {
	var fBizRecId = justep.Context.getRequestParameter("fBizRecId");

	var suppleData = justep.xbl("suppleData");
	suppleData.setFilter("filter1", "fBizRecId='" + fBizRecId + "'");
	suppleData.refreshData();
	// tkj 高亮显示(兼容 增加材料检查定位 add by fpc)
	this.highlightMaterials = justep.Context
			.getRequestParameter("highlightMaterials")
			|| justep.Context.getRequestParameter("fMaterialName");
	if (this.highlightMaterials)
		this.highlightMaterials = this.highlightMaterials.split("$");

	// 设置附件组件水印判断回调 add by lzh
	var waterMarkAuths = justep.Context.getRequestParameter("waterMarkAuths");
	justep.xbl("attachEditor_BYCL").useWaterMarkCallBack = function() {
		var id = justep.xbl("dataMain").getValue("fMaterialId");
		if (waterMarkAuths == null || waterMarkAuths == ''
				|| waterMarkAuths == undefined)
			return false;
		if (waterMarkAuths == "ALL")
			return true;
		if (waterMarkAuths.indexOf(id) > -1)
			return true;
		else
			return false;
	};
	justep.xbl("attachEditor_BCCL").useWaterMarkCallBack = function() {
		var id = justep.xbl("suppleData").getValue("fMaterialId");
		if (waterMarkAuths == null || waterMarkAuths == ''
				|| waterMarkAuths == undefined)
			return false;
		if (waterMarkAuths == "ALL")
			return true;
		if (waterMarkAuths.indexOf(id) > -1)
			return true;
		else
			return false;
	};
};

/**
 * 环节材料的操作权限
 */
treeMaterialManager.matActionAuthority = function(fBizRecId, fMaterialId,
		fMaterialType, fOperatorId) {
	// 权限读取环节动作分配表

	var materialAuths = justep.Context.getRequestParameter("materialAuths");

	if ('必要材料' == fMaterialType) {
		if (materialAuths.search(/up/) != -1) {
			justep.xbl('attachEditor_BYCL').buttons.upload = true;
		}

		if (materialAuths.search(/del/) != -1
				|| justep.Context.getCurrentPersonID() == fOperatorId) {
			justep.xbl('attachEditor_BYCL').buttons['delete'] = true;
		}
	} else {
		if (materialAuths.search(/up/) != -1) {
			justep.xbl('attachEditor_BCCL').buttons.upload = true;
		}

		if (materialAuths.search(/del/) != -1
				|| justep.Context.getCurrentPersonID() == fOperatorId) {
			justep.xbl('attachEditor_BCCL').buttons['delete'] = true;
		}
		justep.xbl('attachEditor_BCCL').refresh();
	}

};

treeMaterialManager.dataMainRefreshCreateParam = function(event) {
	var mapParam = new justep.Request.MapParam();
	// 顶级项目id
	mapParam.put("fBizRecId", justep.Context.getRequestParameter("fBizRecId"));
	// 关联项目列表
	mapParam.put("relBizRecIds", justep.Context
			.getRequestParameter("relBizRecIds"));
	// 材料模板
	mapParam.put("materialTemplate", "default");
	event.param.setMap("variables", mapParam);
};

treeMaterialManager.dataMainDataChanged = function(event) {
	var data = justep.xbl("dataMain");
	var rowID = event.rowID;

	// 上传附件的要件必须打勾
	if (event.type == 'valueChanged' && event.column == 'choice') {
		var fDocIds = data.getValue("fDocIds", rowID);
		if (fDocIds.length > 2 && data.getValue("choice", rowID) != 1) {
			data.setValue("choice", 1, rowID);
		}
	}

	// || event.column == 'fOriginalRequired' || event.column == 'fMtNums'
	if (event.type == 'valueChanged' && event.originalValue != event.value
			&& event.value != '' && event.column == 'fDocIds') {

		var fDocIds = data.getValue("fDocIds", rowID);
		var fMaterialId = data.getValue("fMaterialId", rowID);
		var fMaterialName = data.getValue("fMaterialName", rowID);
		var fPhysical = data.getValue("fphysical", rowID);
		var fID = data.getValue("fParentId", rowID);
		var fDispOrder = data.getValue("fDispOrder", rowID);
		var fIsDefSelect = data.getValue("fIsDefSelect", rowID);
		var fRequired = data.getValue("fRequired", rowID);
		var fMtNums = data.getValue("fMtNums", rowID);
		var fMedium = data.getValue("fMedium", rowID);
		var fOriginalRequired = data.getValue("fOriginalRequired", rowID);
		var fMaterialNav = data.getValue("fMaterialNav", rowID);

		// 借用fParentId判别是新增数据,还是修改数据

		var map = new justep.Request.MapParam();
		map.put("fMaterialId", fMaterialId);
		map.put("fMaterialName", fMaterialName);
		map.put("fID", fID);
		map.put("fDocIds", fDocIds);
		map.put("fPhysical", fPhysical);
		map.put("fMaterialType", "必要材料");
		map.put("fDispOrder", fDispOrder);
		map.put("fIsDefSelect", fIsDefSelect);
		map.put("fRequired", fRequired);
		map.put("fMtNums", fMtNums);
		map.put("fMedium", fMedium);
		map.put("fOriginalRequired", fOriginalRequired);
		map.put("fMaterialNav", fMaterialNav);
		map.put("updateType", "file");

		if (event.column == 'fOriginalRequired' || event.column == 'fMtNums'
				|| event.column == 'fMaterialName') {
			map.put("updateType", "noFile");
		}

		// 访问Action，通过action维护附件管理
		var param = new justep.Request.ActionParam();
		param.setString("fBizRecId", justep.Context
				.getRequestParameter("fBizRecId"));
		param.setMap("map", map);

		justep.Request.sendBizRequest2({
			dataType : "json",
			parameters : param,
			action : 'upLoadNeedMaterialsAction',
			callback : function(result) {
				if (result.state) {
					// 返回Map对象
					var map = result.response;
					data.setValue("fIsDefSelect", "是", rowID);
					data.setValue("choice", 1, rowID);
					data.saveData();
					// TODO 设置tree选中
				}
			}
		});

	}

};

treeMaterialManager.trigger11Click = function(event) {
	var suppleData = justep.xbl("suppleData");
	suppleData.setValue("fBizRecId", justep.Context
			.getRequestParameter("fBizRecId"));
	suppleData.setValue("fActivity", justep.Context.getCurrentProcess()
			.toString()
			+ "/" + justep.Context.getCurrentActivity());
};

treeMaterialManager.attachEditor_BYCLLoadData = function(event) {
	var dataMain = justep.xbl("dataMain");
	var rowID = dataMain.getCurrentID();
	// TODO 明确环节按钮权限的控制方式后，修改该方法
	treeMaterialManager.matActionAuthority(dataMain
			.getValue("fBizRecId", rowID), dataMain.getValue("fMaterialId",
			rowID), '必要材料', dataMain.getValue("fOperatorId", rowID));
};

treeMaterialManager.suppleDataAfterNew = function(event) {
	var suppleData = justep.xbl("suppleData");
	suppleData.setValue("fBizRecId", justep.Context
			.getRequestParameter("fBizRecId"), suppleData.getCurrentID());
	suppleData.setValue("fMaterialId", justep.Utils.randomString());
};

treeMaterialManager.tabPage2Select = function(event) {
	var tabMaterial = justep.xbl("tabMaterial");
	tabMaterial.setVisable("tabBC", true, "tabBC");
	tabMaterial.setVisable("tabBY", false);
	tabMaterial.setVisable("tabGpy", false);

	var suppleData = justep.xbl("suppleData");
	var rowID = suppleData.getCurrentID();
	// TODO 明确环节按钮权限的控制方式后，修改该方法
	treeMaterialManager.matActionAuthority(suppleData.getValue("fBizRecId",
			rowID), suppleData.getValue("fMaterialId", rowID), '补充材料',
			suppleData.getValue("fOperatorId", rowID));
	
};

treeMaterialManager.attachEditor_BCCLUploadClick = function(event) {

	var attachmentEditor = event.source;
	attachmentEditor.subPath = justep.Context.getRequestParameter("subPath");
	if (!attachmentEditor.subPath)
		attachmentEditor.subPath = justep.Context.getCurrentProcessLabel()
				+ "/" + justep.Context.getRequestParameter("fBizRecId") + "/"
				+ justep.xbl("suppleData").getValue("fMaterialName");

};

treeMaterialManager.attachEditor_BYCLUploadClick = function(event) {

	var attachmentEditor = event.source;
	attachmentEditor.subPath = justep.Context.getRequestParameter("subPath");
	if (!attachmentEditor.subPath)
		attachmentEditor.subPath = justep.Context.getCurrentProcessLabel()
				+ "/" + justep.Context.getRequestParameter("fBizRecId") + "/"
				+ justep.xbl("dataMain").getValue("fMaterialName");

};

/**
 * 重置附件组件的docPath
 */
treeMaterialManager.suppleDataValueChanged = function(event) {
	if (event.column == "fMaterialName" || event.column == undefined) {
		justep.xbl("attachEditor_BCCL").docPath = undefined;
	}
};

treeMaterialManager.suppleDataNewCreateParam = function(event) {
	event.defaultValues.push({
		"fIsDefSelect" : '是',
		"fRequired" : '否',
		"fMaterialNav" : '补充材料'
	});
};

treeMaterialManager.model1UnLoad = function(event) {
	justep.xbl("windowReceiver1").sendData(event.data);
};

treeMaterialManager.triDataMainSaveClick = function(event) {
	var dataMain = justep.xbl("dataMain");
	var myArray = new Array();
	for ( var i = 0; i < dataMain.getCount(); i++) {
		var rowID = dataMain.getID(i);
		var material = {};
		material.fID = rowID;
		material.fBizRecId = dataMain.getValue("fBizRecId", rowID);
		material.fMaterialId = dataMain.getValue("fMaterialId", rowID);
		material.fMaterialName = dataMain.getValue("fMaterialName", rowID);
		material.fDispOrder = dataMain.getValue("fDispOrder", rowID);
		material.fOriginalRequired = dataMain.getValue("fOriginalRequired",rowID);
		material.fRequired = dataMain.getValue("fRequired", rowID);
		material.fMtNums = dataMain.getValue("fMtNums", rowID);
		material.fMedium = dataMain.getValue("fMedium", rowID);
		material.fMaterialNav = dataMain.getValue("fMaterialNav", rowID);
		material.isDel = dataMain.getValue("choice", rowID) != 1 || dataMain.getState(rowID) == justep.XData.STATE.DELETE;
		material.fParentId = dataMain.getValue("fParentId", rowID);
		myArray.push(material);
	}
	// 访问Action，通过action添加必要要件
	var param = new justep.Request.ActionParam();
	param.setString("fBizRecId", justep.Context
			.getRequestParameter("fBizRecId"));
	param.setString("fMaterialIds", JSON.stringify(myArray));

	justep.Request.sendBizRequest2({
		dataType : "json",
		parameters : param,
		action : 'targMaterialsAction',
		callback : function(result) {
			if (result.state) {
				// 返回Map对象
				var map = result.response;
				butone.Dialog.success('材料确认完成!');
				dataMain.saveData();
				dataMain.refreshData();
			}
		}
	});
};

treeMaterialManager._saveBCDataAfterUpload = function() {
	justep.xbl("suppleData").saveData();
};

treeMaterialManager._saveBYDataAfterUpload = function() {
	justep.xbl("dataMain").saveData();
};

treeMaterialManager.attachEditor_BCCLUploadCompleted = function(event) {
	setTimeout(treeMaterialManager._saveBCDataAfterUpload, 0);
};

treeMaterialManager.attachEditor_BYCLUploadCompleted = function(event) {
	setTimeout(treeMaterialManager._saveBYDataAfterUpload, 0);
};

/**
 * --------------- 扫描
 */
treeMaterialManager.getCurrentDs = function() {
	var ds = null;
	if (justep.xbl("tabPanel1").getActiveID() == "tabPage1") {
		ds = justep.xbl("dataMain");
	} else {
		ds = justep.xbl("suppleData");
	}
	return ds;
};
treeMaterialManager.btnScanClick = function(event) {
	var ds = this.getCurrentDs();
	if (ds.getCount() == 0)
		return;
	justep.xbl("systemRunner").open();
};

treeMaterialManager.systemRunnerSend = function(event) {
	var materialName = "";
	var subPath = justep.Context.getRequestParameter("subPath");
	var ds = treeMaterialManager.getCurrentDs();
	var materialName = ds.getValue("fMaterialName");
	if (!subPath)
		subPath = justep.Context.getCurrentProcessLabel() + "/"
				+ justep.Context.getRequestParameter("fBizRecId") + "/"
				+ ds.getValue("fMaterialName");
	if (materialName)
		materialName = materialName.replace(/^\s+|\s+$/gm, '');
	event.data = {
		materialName : materialName,
		subPath : subPath
	};
	return event.data;
};

treeMaterialManager.systemRunnerReceive = function(event) {
	var data = event.data;
	if (data.kind != "upload")
		return;
	var ds = treeMaterialManager.getCurrentDs();
	var rowID = ds.getCurrentID();
	if (data.rowID)
		rowID = data.rowID;
	var docIds = ds.getValue("fDocIds", rowID);
	if (docIds == null || docIds == "")
		docIds = [];
	else
		docIds = JSON.parse(docIds);
	for ( var i = 0; i < data.attachs.length; i++) {
		docIds.push(data.attachs[i]);
	}
	docIds = JSON.stringify(docIds);
	ds.setValue("fDocIds", docIds, rowID);
	ds.saveData();
};

treeMaterialManager.tabPage4Select = function(event) {
	if (!treeMaterialManager.loadGpy) {
		justep.xbl("wfGpy").open2();
		treeMaterialManager.loadGpy = true;
	}
};

treeMaterialManager.tabPage1Select = function(event) {
	var tabMaterial = justep.xbl("tabMaterial");
	tabMaterial.setVisable("tabBY", true, "tabBY");
	tabMaterial.setVisable("tabBC", false);
	tabMaterial.setVisable("tabGpy", true);
};

function reScan(rowID) {
	var ds = treeMaterialManager.getCurrentDs();
	ds.setValue("scanCount", "", rowID);
	ds.setValue("files", "", rowID);
	ds.setValue("pdf", "", rowID);
	if (justep.xbl("tabPanel1").getActiveID() == "tabPage1")
		treeMaterialManager.dataMainIndexChanged();
};

treeMaterialManager.btnUploadAllClick = function(event) {
	if (!treeMaterialManager.loadGpy)
		return;
	var win = justep.xbl("wfGpy").getContentWindow();
	treeMaterialManager._uploadAll = true;
	try {
		if (win.uploadAll) {
			var ds = treeMaterialManager.getCurrentDs();
			win.uploadAll(ds);
			ds.saveData();
		}
	} finally {
		treeMaterialManager._uploadAll = false;
	}
};

treeMaterialManager.btnCapClick = function(event) {
	butone.Window.dialog("_camaraDlg", "/UI/base/system/scan/simpleCapForm.w",
			"摄像头", {}, true, null, "1090px", "500px", true, function(event) {
				return treeMaterialManager.systemRunnerSend(event);
			}, function(event) {
				treeMaterialManager.systemRunnerReceive(event);
			}, null);
};

/** 创建任务网格 * */
treeMaterialManager.doCreateMaterialTree = function() {
	var setting = {
		hidegrid : false,
		shrinkToFit : true,
		treeGrid : true,
		treeGridModel : 'adjacency',
		colNames : [ 'fID', '序号', '材料名称', '原件', '份数', '默认', '扫描结果' ],
		colModel : [ {
			name : 'fID',
			hidden : true
		}, {
			name : 'fDispOrder',
			width : 50,
			sortable : false
		}, {
			name : 'fMaterialName',
			width : "*",
			sortable : false
		}, {
			name : 'fOriginalRequired',
			width : 40,
			sortable : false
		}, {
			name : 'fMtNums',
			width : 50,
			sortable : false
		}, {
			name : 'fIsDefSelect',
			width : 40,
			sortable : false
		}, {
			name : 'scanCount',
			width : 100,
			sortable : false,
			formatter : treeMaterialManager.onScanCountRender
		}, ],
		jsonReader : {
			root : "dataRows",
			repeatitems : false
		},
		treeReader : {
			level_field : "level",
			parent_id_field : "parent",
			leaf_field : "isLeaf",
			expanded_field : "expanded"
		},
		sortorder : "desc",
		height : '100%',
		witdh : '100%'
	};

	setting.datatype = function() {
		justep.xbl("dataMain").refreshData();
	};

	setting.onSelectRow = function($t, id, stat, e) {
		var dataMain = justep.xbl("dataMain");
		for ( var i = 0; i < dataMain.getCount(); i++) {
			var rowID = dataMain.getID(i);
			if (dataMain.getValue("fIsDefSelect", rowID) == '是') {
				dataMain.setValue("choice", 1, rowID);
			} else {
				dataMain.setValue("choice", 0, rowID);
			}
		}
	};

	setting.onSelectAll = function(rowid, status) {
		// taskCenter.onCheckAll && taskCenter.onCheckAll(rowid, status);
	};

	setting.gridComplete = function(rowid) {
		var mainData = justep.xbl("dataMain");
		var ids = $("#materialTree").getDataIDs();
		for ( var i = 0; i < ids.length; i++) {
			var docs = mainData.getValue("fDocIds", ids[i]);
			if (!!docs && docs.length > 2) {
				$('#' + ids[i]).find("td").css("backgroundColor",
						"rgb(132, 253, 147)");
			} else {
				$('#' + ids[i]).find("td").css("backgroundColor", "white");
			}
			// tkj 高亮显示（兼容 增加材料检查定位 add by fpc）
			if (treeMaterialManager.highlightMaterials
					&& justep.Array.contain(
							treeMaterialManager.highlightMaterials, mainData
									.getValue("fMaterialName", ids[i]))) {
				$(event.cell.cell).css("background-color",
						"rgba(3, 98, 244, 0.5)");
			}
		}
	};

	var $viewMateriaTree = $("#viewMateriaTree");
	$viewMateriaTree.append("<table id='materialTree'></table>");
	$materialTree = $("#materialTree");
	$materialTree.jqGrid(setting);

	// $("#gbox_materialTree").css("margin", "0
	// auto").removeClass("ui-corner-all");
};

treeMaterialManager.model1ModelConstructDone = function(event) {
	treeMaterialManager.doCreateMaterialTree();
};

treeMaterialManager.dataMainAfterRefresh = function(event) {
	treeMaterialManager.doRefreshScanFiles();
};

treeMaterialManager.dataMainIndexChanged = function(event) {
	treeMaterialManager.doRefreshScanFiles();
};

/**
 * 刷新高拍仪页面
 */
treeMaterialManager.doRefreshScanFiles = function() {
	if (!treeMaterialManager.loadGpy)
		return;
	var win = justep.xbl("wfGpy").getContentWindow();
	if (win.showScanFiles)
		win.showScanFiles(dataMain);
};

treeMaterialManager.onScanCountRender = function(cellval, col, rowData, action) {
	return "<a class='link' onclick=reScan('" + rowData.fID + "')>重新扫描</a>"
			+ "(" + (cellval == "" ? 0 : cellval) + ")";
};
