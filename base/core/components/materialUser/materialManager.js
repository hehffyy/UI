var materialManager = {};
var oldValue;
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

	var options = {};
	var param = new justep.Request.ActionParam();
	param.setString("fBizRecId", fBizRecId);
	options.contentType = 'application/json';
	options.dataType = "json";
	options.action = "choiceMaterialGroupAction";
	options.parameters = param;
	options.callback = function(data) {
		if (data.state) {
			 	var commonData=justep.xbl("commonData");
			 	commonData.setValue("fid",data.response.fBusinessId);
				commonData.setValue("fname",data.response.fBusinessName);
				justep.xbl('dataMain').refreshData();
		}
	};
	var result = justep.Request.sendBizRequest2(options);
	
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

	var commonData = justep.xbl("commonData");
	var mapParam = new justep.Request.MapParam();
	mapParam.put("fBizRecId", justep.Context.getRequestParameter("fBizRecId"));
	mapParam.put("materialTemplate", "userCustom");
	mapParam.put("userProcessId_choiced", commonData.getValue("fid"));
    mapParam.put("userProcessName_choiced", commonData.getValue("fname"));
	event.param.setMap("variables", mapParam);

};

materialManager.dataMainDataChanged = function(event) {
	var data = justep.xbl("dataMain");
	var rowID = data.getCurrentID();

	// 上传附件的要件必须打勾
	if (event.type == 'valueChanged' && event.column == 'choice') {
		var fDocIds = data.getValue("fDocIds", rowID);
		if (fDocIds.length > 2 && data.getValue("choice", rowID) == '0') {

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
		var fID = data.getValue("fParentId", rowID);// TODO
		var fDispOrder = data.getValue("fDispOrder", rowID);
		var fIsDefSelect = data.getValue("fIsDefSelect", rowID);
		var fRequired = data.getValue("fRequired", rowID);
		var fMtNums = data.getValue("fMtNums", rowID);
		var fMedium = data.getValue("fMedium", rowID);
		var fOriginalRequired = data.getValue("fOriginalRequired", rowID);
		var fMaterialNav = data.getValue("fMaterialNav", rowID);
		var fBusinessId = data.getValue("fBusinessId", rowID);
		var fBusinessName = data.getValue("fBusinessName", rowID);

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
		map.put("fBusinessId", fBusinessId);
		map.put("fBusinessName", fBusinessName);
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
					materialManager.setbackColor();

				}
			}
		});

	}

};

materialManager.trigger11Click = function(event) {
	var suppleData = justep.xbl("suppleData");
	suppleData.setValue("fBizRecId", justep.Context
			.getRequestParameter("fBizRecId"));
	suppleData.setValue("fActivity", justep.Context.getCurrentProcess()
			.toString()
			+ "/" + justep.Context.getCurrentActivity());
};

materialManager.attachEditor_BYCLLoadData = function(event) {
	var dataMain = justep.xbl("dataMain");
	var rowID = dataMain.getCurrentID();
	// TODO 明确环节按钮权限的控制方式后，修改该方法
	materialManager.matActionAuthority(dataMain.getValue("fBizRecId", rowID),
			dataMain.getValue("fMaterialId", rowID), '必要材料', dataMain.getValue(
					"fOperatorId", rowID));
};

/**
 * name:bizData#onAfterNew description: <b>[回调型事件]</b>业务数据新增后
 * 
 * @param {object}
 *            event <br/><b>结构如下：</b> <xmp> { "source" : 组件的js对象, "ids" :
 *            新增的行Id数组 } </xmp>
 */
materialManager.suppleDataAfterNew = function(event) {
	var suppleData = justep.xbl("suppleData");
	suppleData.setValue("fBizRecId", justep.Context
			.getRequestParameter("fBizRecId"), suppleData.getCurrentID());
	suppleData.setValue("fMaterialId", justep.Utils.randomString());
};

materialManager.tabPage2Select = function(event) {
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
	// TODO 以下处理目前还有问题
	var suppleData = justep.xbl("suppleData");
	var rowID = suppleData.getCurrentID();

};

/**
 * 重置附件组件的docPath
 */
materialManager.dataMainIndexChanged = function(event) {

	justep.xbl('attachEditor_BYCL').refresh();
	// justep.xbl("attachEditor_BYCL").docPath = "";
	var dataMain = justep.xbl("dataMain");
	for ( var i = 0; i < dataMain.getCount(); i++) {
		var rowID = dataMain.getID(i);
		if (dataMain.getValue("fIsDefSelect", rowID) == '是') {
			justep.xbl("dataMain").setValue("choice", 1, rowID);
		} else {
			justep.xbl("dataMain").setValue("choice", 0, rowID);
		}
	}
	materialManager.setbackColor();

};

// 设置有附件的要件背景色
materialManager.setbackColor = function() {
	var dataMain = justep.xbl("dataMain");
	var total = dataMain.getTotal();
	var grid = justep.xbl('grid1');
	for ( var i = 0; i < total; i++) {
		var rowid = dataMain.getID(i);
		var fDocIds = dataMain.getValue("fDocIds", rowid);
		if (fDocIds.length > 2) {
			grid.grid.setCellTextStyle(rowid, 2, "background-color: yellow");
		} else {
			grid.grid.setCellTextStyle(rowid, 2, "background-color: white");
		}
	}
};

materialManager.suppleDataNewCreateParam = function(event) {
	event.defaultValues.push({
		"fIsDefSelect" : '是',
		"fRequired" : '否',
		"fOriginalRequired" : '',
		"fMaterialNav" : '补充材料'
	});
};

materialManager.model1UnLoad = function(event) {
	justep.xbl("windowReceiver1").sendData(event.data);
};

materialManager.trigger2Click = function(event) {
	var grid = justep.xbl("grid1").grid;
	var dataMain = justep.xbl("dataMain");

	var indexs = "";
	for ( var i = 0; i < dataMain.getCount(); i++) {
		var rowID = dataMain.getID(i);
		if (dataMain.getValue("choice", rowID) == 1) {
			indexs = indexs + "," + rowID;
		}
		;
	}

	var myArray = new Array();
	var k = 0;

	if (indexs.length > 0) {
		var array = indexs.substring(1, indexs.length).split(",");
		for ( var j = 0; j < array.length; j++) {
			var rowID = array[j];
			var fMaterialIds = {};
			fMaterialIds.fMaterialId = dataMain.getValue("fMaterialId", rowID);
			fMaterialIds.fMaterialName = dataMain.getValue("fMaterialName",rowID);
			fMaterialIds.fDispOrder = dataMain.getValue("fDispOrder", rowID);
			fMaterialIds.fOriginalRequired = dataMain.getValue("fOriginalRequired", rowID);
			fMaterialIds.fRequired = dataMain.getValue("fRequired", rowID);
			fMaterialIds.fMtNums = dataMain.getValue("fMtNums", rowID);
			fMaterialIds.fMedium = dataMain.getValue("fMedium", rowID);
			fMaterialIds.fMaterialNav = dataMain.getValue("fMaterialNav", rowID);
			fMaterialIds.fBusinessId = dataMain.getValue("fBusinessId", rowID);
			fMaterialIds.fBusinessName = dataMain.getValue("fBusinessName", rowID);
			myArray[k++] = fMaterialIds;
		}
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

/**
 * --------------- 扫描
 */
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
	if (justep.xbl("tabPanel1").getActiveID() == "tabPage1") {
		materialName = justep.xbl("dataMain").getValue("fMaterialName");
		if (!subPath)
			subPath = justep.Context.getCurrentProcessLabel() + "/"
					+ justep.Context.getRequestParameter("fBizRecId") + "/"
					+ justep.xbl("dataMain").getValue("fMaterialName");
	} else {
		materialName = justep.xbl("suppleData").getValue("fMaterialName");
		if (!subPath)
			subPath = justep.Context.getCurrentProcessLabel() + "/"
					+ justep.Context.getRequestParameter("fBizRecId") + "/"
					+ justep.xbl("suppleData").getValue("fMaterialName");
	}
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
	var ds = null;
	if (justep.xbl("tabPanel1").getActiveID() == "tabPage1") {
		ds = justep.xbl("dataMain");
	} else {
		ds = justep.xbl("suppleData");
	}
	var docIds = ds.getValue("fDocIds");
	if (docIds == null || docIds == "")
		docIds = [];
	else
		docIds = JSON.parse(docIds);
	for ( var i = 0; i < data.attachs.length; i++) {
		docIds.push(data.attachs[i]);
	}
	docIds = JSON.stringify(docIds);
	ds.setValue("fDocIds", docIds);
	ds.saveData();
};

materialManager.btnCamaraClick = function(event) {
	butone.Window.dialog("_camaraDlg", "/UI/base/system/scan/camaraForm.w",
			"摄像头", null, true, null, "800px", "300px", true, function(event) {
				return materialManager.systemRunnerSend(event);
			}, function(event) {
				materialManager.systemRunnerReceive(event);
			}, null);
};

// 选择
materialManager.userMaterialIDClick = function(event) {

	justep.xbl('dataMain').saveData();
	var param = new justep.Request.ActionParam();
	param.setString("fBizRecId", justep.Context
			.getRequestParameter("fBizRecId"));
	justep.Request
			.sendBizRequest2({
				dataType : "json",
				parameters : param,
				action : 'isHasChoiceMaterialAction',
				callback : function(result) {
					if (result.state) {

						if (result.response.isHasMaterial) {

							butone.Dialog
									.question(
											"<font color='red'>已经上传附件，重新选择会删除已选择的材料，确定要重新选择吗？</font>",
											null,
											function(evt) {
												if (evt.status == "yes") {
													justep.xbl('userMaterialDialog').open();
												}
											});

						} else {
							justep.xbl('userMaterialDialog').open();
						}
					}
				}
			});

};

/**
 * name:windowDialog#onReceive}
 * 
 * @param {function}
 *            onInit 初始化事件，参见{@link UI.windowDialog#onInit}
 * @param {function}
 *            onOpen 对话框打开事件，参见{@link UI.windowDialog#onOpen}
 * @param {function}
 *            onClose 对话框关闭事件，参见{@link UI.windowDialog#onClose} description:
 *            构造函数
 * @example //动态创建 var dialog = new justep.WindowDialog(id, url, title);
 */
materialManager.userMaterialDialogReceive = function(event) {

	 var commonData = justep.xbl("commonData");
	 commonData.setValue("fname", event.data.fBusinessName);
	 commonData.setValue("fid", event.data.fUserProcessId); 
	 justep.xbl('dataMain').refreshData();	
};

materialManager.gridSelect2Closeup = function(event) {
	justep.xbl('dataMain').saveData();
	var commonData=justep.xbl("commonData");
	
	var param = new justep.Request.ActionParam();
	param.setString("fBizRecId", justep.Context.getRequestParameter("fBizRecId"));
	justep.Request.sendBizRequest2({
				dataType : "json",
				parameters : param,
				action : 'isHasChoiceMaterialAction',
				callback : function(result) {
					if (result.state) {
						if (result.response.isHasMaterial) {
							butone.Dialog.question("<font color='red'>已经上传附件，重新选择会删除已选择的材料，确定要重新选择吗？</font>",null,function(evt) {
								if (evt.status == "yes") {
									justep.xbl('dataMain').refreshData();										
								}else{
									commonData.setValue("fname",oldValue);	
								} 
							});
						}else{
							justep.xbl('dataMain').refreshData();
						}  
					}
				}
			});
	

};


materialManager.userMaterialDialogClose = function(event) {
	justep.xbl("userProcessData").saveData();
	justep.xbl("userProcessData").refreshData();

};

materialManager.commonDataValueChanging = function(event) {
	oldValue = justep.xbl("commonData").getValue('fname');
};
 
 
 

/**
	name:grid#onRowClick
	description: 行单击事件
	@param {object} event <br/>
	<b>参数结构：</b>
	<xmp>
	{
		"source" : XFGrid对象, 
		"instance" : instance,
		"grid" : dhtmlxGrid对象,
		"rowID" : 行ID
	}
	</xmp>
*/
materialManager.grid1RowClick = function(event){
	//justep.xbl('attachEditor_BYCL').refresh();
};
