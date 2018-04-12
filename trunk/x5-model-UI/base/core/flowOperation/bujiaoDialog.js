var bujiaoDialog = {};

bujiaoDialog.cancelBtnClick = function(event) {
	justep.xbl("receiver1").windowCancel();
};

bujiaoDialog.sureBtnClick = function(event) {
	var B_AJGQJLB = justep.xbl("bizData_AJGQJL");
	var invalidInfo = B_AJGQJLB.getInvalidInfo();
	if (invalidInfo) {
		new justep.System.showMessage().open({
			msg : invalidInfo,
			img : 'info',
			title : '数据检查',
			type : 0
		});
		return;
	}

	var result = {
		"options" : this.inputData.options,
		"action" : this.inputData.action,
		"task" : this.inputData.task,
		"data" : this.inputData.processControl.getData(),
		"exts" : {
			"suspendInfo" : {
				"suspendKind" : this.suspendKind,
				"apprizeAgain" : this.apprizeAgain,
				"tables" : {
					"B_AJGQJLB" : B_AJGQJLB.getJson(),
					"B_BZGZ" : justep.xbl("bizData_BJGZ").getJson(),
					"B_BZCLQD" : justep.xbl("bizData_CLLB").getJson()
				}
			}
		}
	};
	justep.xbl("receiver1").windowEnsure(result);
};

bujiaoDialog.receiver1Receive = function(event) {
	this.inputData = event.data;
	this.inputData.processControl = new justep.ProcessControl();
	this.inputData.processControl.loadFromJson(this.inputData.data);
	this.bizRecId = this.inputData.bizRecId;
	this.suspendKind = this.inputData.options.suspendKind;
	this.info = event.data.info ? event.data.info : "";
	var apprizeAgain = this.apprizeAgain = this.inputData.options.apprizeAgain;

	var grid = justep.xbl("gridCLLB").grid;
	var idx = grid.getColIndexById("fCLQR");
	grid.setColumnHidden(idx, !apprizeAgain);

	var gqjl = justep.xbl("bizData_AJGQJL");
	gqjl.refreshData();
	
	if (gqjl.getCount() > 0) {
		if (apprizeAgain) {
			var clqd = justep.xbl("bizData_CLLB");
			for ( var i = 0; i < clqd.getCount(); i++) {
				var rowid = clqd.getID(i);
				clqd.setValue("oldCL", true, rowid);
			}
		} else {
			new justep.System.showMessage().open({
				msg : '案卷正处于' + gqjl.getValue("fGQLX") + "中，不允许补正告知",
				img : 'info',
				title : '提示信息',
				type : 0,
				callback : function() {
					justep.xbl("receiver1").windowCancel();
				}
			});
		}
	} else {
		var newData = {
			defaultValues : [ {
				fBizRecId : this.bizRecId,
				fGQYY : this.info
			} ]
		};
		gqjl.newData(newData);
		justep.xbl("bizData_BJGZ").newData(newData);
	}
	// 接收材料确认的IDs
	if(this.inputData.options.hasOwnProperty("paramExt") && this.inputData.options.paramExt.hasOwnProperty("CLQRIDs")){
		var CLQRIDs = this.inputData.options.paramExt.CLQRIDs;
		var BLYCLIDs = this.inputData.options.paramExt.BLYCLIDs;
		var CLLB = justep.xbl("bizData_CLLB");
		for(var i = 0; i < CLLB.getCount(); i++){
			var rowID = CLLB.getID(i);
			if(CLQRIDs.indexOf(rowID) != -1)
				CLLB.setValue("fCLQR", "已确认",rowID);
			if(BLYCLIDs.indexOf(rowID) != -1)
				CLLB.setValue("fBLYCL", "保留",rowID);
		}
	}
	if(apprizeAgain){
		var gridCLLB = justep.xbl("gridCLLB");
		gridCLLB.grid.setColumnHidden(3,false);
		gridCLLB.grid.setColumnHidden(4,false);
	}
};

bujiaoDialog.btnBCCLClick = function(event) {
	var info = prompt("请材料名称:");
	if (info) {
		justep.xbl("bizData_CLLB").newData({
			defaultValues : [ {
				fCLMC : info,
				fCLBH : '补充材料',
				fSWCL : '否'
			} ]
		});
	}
};

bujiaoDialog.bizData_AJGQJLRefreshCreateParam = function(event) {
	var variables = event.param.getParam("variables");
	variables.put("bizRecId", bujiaoDialog.bizRecId ? bujiaoDialog.bizRecId
			: "");
};

bujiaoDialog.btnRemoveCLClick = function(event) {
	var grid = justep.xbl("gridCLLB").grid;
	var rowIDs = grid.getCheckedRows(grid.getColIndexById("checkNo"));
	if (rowIDs) {
		var arr = rowIDs.split(","), clqd = justep.xbl("bizData_CLLB");
		for ( var i = arr.length - 1; i >= 0; i--) {
			var rowid = arr[i];
			if (clqd.getValue("oldCL", rowid)) {
				arr.splice(i, 1);
				clqd.setValue("checkNo", 0, rowid);
			}
		}
		if (arr.length > 0)
			clqd.deleteData(arr);
	}

};

bujiaoDialog.showMaterialsDialog = function() {
	if (!self.materials) {
		var param = new justep.Request.ActionParam(), materials;
		param.setString("bizRecId", self.bizRecId);
		justep.Request
				.sendBizRequest2({
					dataType : "json",
					parameters : param,
					action : 'getBizRecMaterialListAction',
					callback : function(result) {
						if (true) {
							self.materials = eval(result.response.materials);
							// self.materials = [ {
							// fMaterialId : "1",
							// fMaterialName : "省份证明"
							// }, {
							// fMaterialId : "1",
							// fMaterialName : "省份证明省份证明省份证明"
							// }, {
							// fMaterialId : "1",
							// fMaterialName : "省份证明省份证明省份证明"
							// } ];
							var hmtl = "<ul>";
							for ( var i = 0; i < self.materials.length; i++) {
								var material = self.materials[i];
								hmtl += '<li><input type="checkbox" class="x-checkbox" id="'
										+ material.fMaterialId
										+ '"/><label>'
										+ material.fMaterialName
										+ '</label></li>';

							}
							hmtl += "</ui>";
							self.materials = hmtl;
						}
					}
				});
	}

	this._msgDialog.show({
		type : "OKCancel",
		title : "补正材料列表",
		message : self.materials
	});

	// if (materials) {
	// var defaultValues = [];
	// justep.xbl("bizData_CLLB").newData({
	// defaultValues : [ {
	// fCLMC : info,
	// fCLBH : '补充材料',
	// fSWCL : '否'
	// } ]
	// });
	// }

};

bujiaoDialog.btnAddCLClick = function(event) {
	var data = justep.xbl("bizData_CLLB");
	var selectedMaterialIDs = [];
	for(var i = 0; i<data.getCount(); i++){
		var rowID = data.getID(i);
		var fCLBH = data.getValue("fCLBH",rowID);
		selectedMaterialIDs.push(fCLBH);
	}
	var options = {
		"data" : {bizRecId : this.bizRecId, selectedMaterialIDs : selectedMaterialIDs}
	};
	justep.xbl("materialDlg").open2(options);
	// var self = this;
	// require(
	// [ "jquery", "bind", "base/components/knockout/messageDialog",
	// "base/lib/bind/composition", "base/lib/bind/model" ],
	// function($, Bind, MessageDialog, Composition) {
	// if (!self._msgDialog) {
	// var model = butone.Context.getBindModel(), rootView = $("#rootView")[0];
	// butone.Composition.bindAndShow(rootView, model);
	// self._msgDialog = new MessageDialog({
	// parentNode : rootView
	// });
	// self._msgDialog.on("onOK", function() {
	// debugger;
	// var abc = materials;
	// var materialName = "";
	// var data = justep.xbl('bizData_CLLB');
	// var controls = document.getElementsByTagName('li');
	// for ( var i = 0; i < controls.length; i++) {
	// var checked = controls[i].firstChild.checked;
	// if (checked == true) {
	// materialName = controls[i].innerText;
	// data.newData({
	// defaultValues : [ {
	// fCLMC : materialName,
	// fCLBH : materialName,
	// fSWCL : '否'
	// } ]
	// });
	// }
	// }
	// });
	// Composition.bindAndShow();
	// }
	// self.showMaterialsDialog();
	// });
};


bujiaoDialog.materialDlgReceive = function(event){
	var ds = justep.xbl("bizData_CLLB");
	var data = event.data;
	for(var i=0;i<data.length;i++){
	    var fCLBH = data[i].fMaterialId;
	    var fCLMC = data[i].fMaterialName;
	    justep.xbl("bizData_CLLB").newData({
			defaultValues : [ {
				fCLMC : fCLMC,
				fCLBH : fCLBH,
				fSWCL : '否'
			} ]
		});
	}
};
