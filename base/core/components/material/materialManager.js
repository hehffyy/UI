var materialManager = {};
var materialManager = {
	// 增加高拍仪支持
	loadGpy : false,
	_uploadAll : false
// 这个参数貌似没有用
};

materialManager.model1Load = function(event) {
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

materialManager.grid1_fMaterialNameRender = function(event) {
	// tkj 高亮显示（兼容 增加材料检查定位 add by fpc）
	if (materialManager.highlightMaterials
			&& justep.Array.contain(materialManager.highlightMaterials,
					event.value)) {
		$(event.cell.cell).css("background-color", "rgba(3, 98, 244, 0.5)");
	}
	return event.value;
};

/**
 * 环节材料的操作权限
 */
materialManager.matActionAuthority = function(fBizRecId, fMaterialId,
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

materialManager.dataMainRefreshCreateParam = function(event) {
	var mapParam = new justep.Request.MapParam();
	mapParam.put("fBizRecId", justep.Context.getRequestParameter("fBizRecId"));
	mapParam.put("materialTemplate", "default");
	event.param.setMap("variables", mapParam);
};

materialManager.dataMainDataChanged = function(event) {
	// TODO do nothing
};

materialManager.attachEditor_BYCLLoadData = function(event) {
	var dataMain = justep.xbl("dataMain");
	var rowID = dataMain.getCurrentID();
	// TODO 明确环节按钮权限的控制方式后，修改该方法
	materialManager.matActionAuthority(dataMain.getValue("fBizRecId", rowID),
			dataMain.getValue("fMaterialId", rowID), '必要材料', dataMain.getValue(
					"fOperatorId", rowID));
};

materialManager.suppleDataAfterNew = function(event) {
	var suppleData = justep.xbl("suppleData");
	suppleData.setValue("fBizRecId", justep.Context
			.getRequestParameter("fBizRecId"), suppleData.getCurrentID());
	suppleData.setValue("fMaterialId", justep.Utils.randomString());
};

materialManager.tabPage2Select = function(event) {
	var tabMaterial = justep.xbl("tabMaterial");
	tabMaterial.setVisable("tabBC", true, "tabBC");
	tabMaterial.setVisable("tabBY", false);
	tabMaterial.setVisable("tabGpy", false);

	var suppleData = justep.xbl("suppleData");
	var rowID = suppleData.getCurrentID();
	// TODO 明确环节按钮权限的控制方式后，修改该方法
	materialManager.matActionAuthority(suppleData.getValue("fBizRecId", rowID),
			suppleData.getValue("fMaterialId", rowID), '补充材料', suppleData
					.getValue("fOperatorId", rowID));
};

materialManager.attachEditor_BCCLUploadClick = function(event) {

	var attachmentEditor = event.source;
	attachmentEditor.subPath = justep.Context.getRequestParameter("subPath");
	if (!attachmentEditor.subPath)
		attachmentEditor.subPath = justep.Context.getCurrentProcessLabel()
				+ "/" + justep.Context.getRequestParameter("fBizRecId") + "/"
				+ justep.xbl("suppleData").getValue("fMaterialName");

};

materialManager.attachEditor_BYCLUploadClick = function(event) {

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
materialManager.suppleDataValueChanged = function(event) {
	if (event.column == "fMaterialName" || event.column == undefined) {
		justep.xbl("attachEditor_BCCL").docPath = undefined;
	}
};

materialManager.dataMainIndexChanged = function(event) {
	materialManager.doRefreshScanFiles();
};

/**
 * 刷新高拍仪页面
 */
materialManager.doRefreshScanFiles = function() {
	if (!treeMaterialManager.loadGpy)
		return;
	var win = justep.xbl("wfGpy").getContentWindow();
	if (win.showScanFiles)
		win.showScanFiles(dataMain.getID(), dataMain.getValue("fMaterialName"));
};

materialManager.suppleDataNewCreateParam = function(event) {
	event.defaultValues.push({
		"fIsDefSelect" : '是',
		"fRequired" : '否',
		"fMaterialNav" : '补充材料'
	});
};

materialManager.model1UnLoad = function(event) {
	justep.xbl("windowReceiver1").sendData(event.data);
};

/**
 * 保存必要材料
 */
materialManager.trigger2Click = function(event) {
	var dataMain = justep.xbl("dataMain");
	dataMain.saveData();
};

materialManager._saveBCDataAfterUpload = function() {
	justep.xbl("suppleData").saveData();
};

materialManager._saveBYDataAfterUpload = function() {
	justep.xbl("dataMain").saveData();
};

materialManager.attachEditor_BCCLUploadCompleted = function(event) {
	setTimeout(materialManager._saveBCDataAfterUpload, 0);
};

materialManager.attachEditor_BYCLUploadCompleted = function(event) {
	setTimeout(materialManager._saveBYDataAfterUpload, 0);
};

materialManager.getCurrentDs = function() {
	var ds = null;
	if (justep.xbl("tabPanel1").getActiveID() == "tabPage1") {
		ds = justep.xbl("dataMain");
	} else {
		ds = justep.xbl("suppleData");
	}
	return ds;
};
materialManager.btnScanClick = function(event) {
	var ds = this.getCurrentDs();
	if (ds.getCount() == 0)
		return;
	justep.xbl("systemRunner").open();
};

materialManager.systemRunnerSend = function(event) {
	var materialName = "";
	var subPath = justep.Context.getRequestParameter("subPath");
	var ds = materialManager.getCurrentDs();
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

materialManager.systemRunnerReceive = function(event) {
	var data = event.data;
	if (data.kind != "upload")
		return;
	var ds = materialManager.getCurrentDs();
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
	ds.setValue("choice", 1, rowID);
	ds.setValue("fDocIds", docIds, rowID);
	ds.saveData();
};

materialManager.tabPage4Select = function(event) {
	if (!materialManager.loadGpy) {
		justep.xbl("wfGpy").open2();
		materialManager.loadGpy = true;
	}
};

materialManager.tabPage1Select = function(event) {
	var tabMaterial = justep.xbl("tabMaterial");
	tabMaterial.setVisable("tabBY", true, "tabBY");
	tabMaterial.setVisable("tabBC", false);
	tabMaterial.setVisable("tabGpy", true);
};

function reScan(rowID) {
	if (!treeMaterialManager.loadGpy)
		return;
	var win = justep.xbl("wfGpy").getContentWindow();
	if (win.showScanFiles)
		win.showScanFiles(rowID, dataMain.getValue("fMaterialName", rowID),
				true);
};

materialManager.btnUploadAllClick = function(event) {
	if (!materialManager.loadGpy)
		return;
	var win = justep.xbl("wfGpy").getContentWindow();
	materialManager._uploadAll = true;
	try {
		if (win.uploadAll) {
			var ds = materialManager.getCurrentDs();
			win.uploadAll(ds);
			ds.saveData();
		}
	} finally {
		materialManager._uploadAll = false;
	}
};

materialManager.btnCapClick = function(event) {
	butone.Window.dialog("_camaraDlg", "/UI/base/system/scan/simpleCapForm.w",
			"摄像头", {}, true, null, "1090px", "500px", true, function(event) {
				return materialManager.systemRunnerSend(event);
			}, function(event) {
				materialManager.systemRunnerReceive(event);
			}, null);
};

materialManager.dataMainAfterRefresh = function(event) {
	// 默认材料 默认选中
	var dataMain = justep.xbl("dataMain");
	for ( var i = 0; i < dataMain.getCount(); i++) {
		var rowID = dataMain.getID(i);
		if (dataMain.getValue("choice", rowID) != 1
				&& dataMain.getValue("fIsDefSelect", rowID) == "是") {
			dataMain.setValue("choice", 1, rowID);
		}
	}
};

materialManager.wfGpyReceive = function(event) {
	materialManager.systemRunnerReceive(event);
};

materialManager.wfGpySend = function(event) {
	return materialManager.systemRunnerSend(event);
};

materialManager.grid1_fDispOrderRender = function(event) {
	var fDocIds = event.cell.getValueByColId("fDocIds");
	$(event.cell.cell).css("backgroundColor",
			fDocIds.length > 2 ? "rgb(132, 253, 147)" : "white");

};

materialManager.dataMainSaveCommit = function(event) {
	event.data.refreshData();
};

materialManager.grid1_smjgRender = function(event) {
	return "<a class='link' onclick=reScan('" + event.rowID + "')>重新扫描</a>"
			+ "(" + (event.value == "" ? 0 : event.value) + ")";
};
