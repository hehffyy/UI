(function(global) {

	/**
	 * 转换table
	 * 
	 * @param xml
	 * @returns
	 */
	function transformTable(xml) {
		var ret = new Array();
		var columns = justep.XML.getNodeText(xml,
				"./userdata[@name='relation-alias']").split(",");
		var rows = justep.XML.eval(xml, "./row", justep.XML.ResultType.array);
		var idName = justep.XML.getNodeText(xml,
				"./userdata[@name='id-column-name']")
				|| justep.XML.getNodeText(xml, "./userdata[@name='sys.rowid']");
		for ( var i = 0; i < rows.length; i++) {
			var data = new Object(), row = rows[i];
			if (idName) {
				data[idName] = justep.XML.getNodeText(row, "@id");
			}
			var cells = justep.XML.eval(row, "./cell",
					justep.XML.ResultType.array);
			for ( var j = 0; j < columns.length; j++) {
				data[columns[j]] = justep.XML.getNodeText(cells[j], "./text()");
			}
			ret.push(data);
		}
		return ret;
	}

	/**
	 * 执行映射
	 */
	function doMapping(config, data) {
		if (!config)
			return;
		var mapping = config.mappings, dataId = config.concept, operation = config.operation, locfrom = [], locto = [], isArr = false;
		$.each(config.mappings, function() {
			// this is mapping
			if (this.locator) {
				locfrom.push(this.from);
				locto.push(this.to);
			}
		});

		if (!dataId || dataId == "" || !operation || operation == "") {
			return;
		}
		var dataTar = justep.xbl(dataId);
		if (!dataTar)
			return;
		var dataOri = null;
		if (Object.prototype.toString.apply(data) === '[object Array]') {
			dataOri = data;
			isArr = true;
		} else {
			try {
				dataOri = data.getSimpleStore();
			} catch (e) {
				var msg = new justep.Message(justep.Message.JUSTEP231067,
						"WindowDialog");
				throw justep.Error.create(msg);
			}
		}
		if (!dataOri)
			return;
		var c = isArr ? dataOri.length : dataOri.rowsBuffer.length;
		if (operation == "edit") {
			var newData = [];
			for ( var i = 0; i < c; i++) {
				var query = dataTar.locate(createLocfrom(locfrom, i), locto,
						false, false, false);

				if (query && query.length > 0) {
					for ( var k = 0; k < query.length; k++) {
						for ( var j = 0; j < mapping.length; j++) {
							setValue(null, mapping[j], i, query[k]);
						}
					}
				} else {
					var o = {};
					for ( var j = 0; j < mapping.length; j++) {
						setValue(o, mapping[j], i);
					}
					newData.push(o);
				}
			}
			if (newData.length > 0)
				dataTar.newData(null, null, newData);
		} else if (operation == "clear" || operation == "new") {
			if (operation == "clear")
				removeAll(dataTar);
			justep.XData.disableControls();
			try {
				var newData = [], key;
				for ( var i = 0; i < c; i++) {
					var o = {};
					for ( var j = 0; j < mapping.length; j++) {
						var m = mapping[j];
						if (!key && m.key)
							key = m;
						setValue(o, m, i);
					}
					newData.push(o);
				}
				if (newData.length > 0) {
					var opt = {
						defaultValues : newData
					};
					if (key) {
						opt.onSuccess = function(event) {
							for ( var n in event.ids) {
								var rowID = event.ids[n];
								dataTar.setID(rowID, event.source.getValue(
										key.to, rowID));
							}
						};
					}
					dataTar.newData(opt);
					if (dataTar.masterData && dataTar.masterData.id)
						dataTar.loadDataByMaster();
				}

			} finally {
				justep.XData.enableControls();
			}

		} else if (operation == "modify") {
			for ( var i = 0; i < c; i++) {
				for ( var j = 0; j < mapping.length; j++) {
					setValue(null, mapping[j], i, dataTar.getCurrentRowId());
				}
			}
		} else {
			return;
		}

		function removeAll(data) {
			var c = data.getCount();
			data.deleteConfirm = false;
			for (i = 0; i < c; i++) {
				data.deleteData(data.getRowId(i));
			}
			data.deleteConfirm = true;
		}

		function setValue(data, mapping, rownum, rowid) {
			var from = mapping.from;
			var to = mapping.to;
			if (!from || from == "" || !to || to == "")
				return;
			var val = "";
			if (isArr) {
				val = (dataOri[rownum])[from];
			} else {
				if (from == "rowid")
					val = dataOri.getRowId(rownum);
				else
					val = dataOri.getValueByName(from, rownum);
			}
			if (data)
				data[to] = val || "";
			else
				dataTar.setValue(to, val || "", rowid);
		}

		function createLocfrom(locfrom, rownum) {
			var re = [];
			for ( var i = 0, c = locfrom.length; i < c; i++) {
				if (isArr) {
					re.push((dataOri[rownum])[locfrom[i]]);
				} else {
					re.push(dataOri.getValueByName(locfrom[i], rownum));
				}
			}
			return re;
		}
	}

	var uploadURL = justep.Request
			.convertURL("/UI/system/components/excel/import/upload.j");

	var boundaryImport = function(xblObj) {
		if (typeof (dhtmlxEventable) != 'undefined')
			dhtmlxEventable(this);
		else if (typeof (justep.Utils.eventable) != 'undefined')
			justep.Utils.eventable(this);
	};

	boundaryImport.prototype = {

		/***/
		open : function(event) {
			var id = this.id + "_dialog";
			var data = {
				uploadURL : uploadURL,
				inputFile : "uploadFile",
				parameters : {
					process : "/base/system/process/bizSystem/bizSystemProcess",
					activity : "mainActivity",
					action : "boundaryFileImportAction",
					fileType : this.fileType,
					returnData : this.resultConfig
							&& this.resultConfig.length > 0
				}
			};
			butone.Window.dialog(id,
					"/UI/base/core/components/dialogs/uploadFile.w", "上传 - "
							+ this.fileType, data, true, null, 350, 100, true,
					null, $.proxy(this.afterUploadFile, this));
		},

		/** 上传之后 解析返回到iframe的数据 */
		afterUploadFile : function(event) {
			var doc = event.data, me = this;
			if (doc) {
				var data = justep.Request.getData(doc);
				var flag = justep.Request.getFlag(doc);
			}
			if (data && flag) {
				var loadData = justep.Request.transform(data);
				for ( var n in loadData) {
					var store = transformTable(loadData[n]);
					loadData[n] = store;
				}

				var evt = {
					source : this,
					data : loadData,
					cancel : false
				};

				if (this.checkEvent("onAfterUpload")) {
					this.callEvent("onAfterUpload", [ evt ]);
				}

				if (evt.cancel)
					return;

				$.each(me.resultConfig, function() {
					// this is result
					for ( var n in loadData) {
						if (this.origin == n) {
							doMapping(this, loadData[n]);
						}
					}
				});
			} else {
				var msg = justep.Request.getMessage(doc);
				throw new Error("调用导入动作失败！" + msg);
			}
		}
	};
	var com = global.com = global.com || {};
	com.butone = com.butone || {};
	com.butone.BoundaryImport = boundaryImport;
})(window);
