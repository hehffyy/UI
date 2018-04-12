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
				"./userdata[@name='relation-alias']");
		columns = columns ? columns.split(",") : [];
		var rows = justep.XML.eval(xml, "./row", justep.XML.ResultType.array);
		var idName = justep.XML.getNodeText(xml,
				"./userdata[@name='id-column-name']")
				|| justep.XML.getNodeText(xml, "./userdata[@name='sys.rowid']");
		for ( var i = 0; i < rows.length; i++) {
			var data = new Object(), row = rows[i];
			if (idName) {
				data[idName] = justep.XML.getNodeText(row, "@id");
				data.rowid = data[idName];
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
		} else if (data instanceof SimpleStore) {
			dataOri = data;
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
				if (from == "rowid" || from == "_innerId")
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

	var fileImport = function(xblObj) {
		if (typeof (dhtmlxEventable) != 'undefined')
			dhtmlxEventable(this);
		else if (typeof (justep.Utils.eventable) != 'undefined')
			justep.Utils.eventable(this);

		var el = $(xblObj.domNode);
		var config = $("div[role='result']", el).remove().html();
		if (config) {
			try {
				this.resultConfig = eval(config);
			} catch (e) {
			}
		}
		this.id = justep.Utils.randomString();
		this.url = el.attr('url');
		this.virtualFile = el.attr("virtualFile") == "true";
		var onReceive = justep.Function.get(el.attr("onReceive"));
		if (onReceive) {
			this.attachEvent("onReceive", onReceive, this);
		}
		var onBeforeExecute = justep.Function.get(el.attr("onBeforeExecute"));
		if (onBeforeExecute) {
			this.attachEvent("onBeforeExecute", onBeforeExecute, this);
		}
	};

	var uploadURL = justep.Request
			.convertURL("/UI/system/components/excel/import/upload.j");
	var process = "/base/system/process/bizSystem/bizSystemProcess";
	var activity = "mainActivity";

	fileImport.prototype = {

		/***/
		open : function() {
			this.execute();
		},

		upload : function(options) {
			var id = this.id + "_dialog", options = options || {};
			var evt = {
				source : this,
				bizRecId : options.bizRecId || justep.Context.getProcessData1(),
				variants : options.variants || new justep.Request.MapParam(),
				filters : options.filters || new justep.Request.MapParam()
			};
			if (this.checkEvent("onBeforeExecute")) {
				this.callEvent("onBeforeExecute", [ evt ]);
			}
			var data = {
				needFileNameParam: true,
				uploadURL : uploadURL,
				inputFile : "input",
				parameters : {
					bizRecId : evt.bizRecId,
					variants : justep.Base64.encode(evt.variants.toString()),
					filters : justep.Base64.encode(evt.filters.toString()),
					process : process,
					activity : activity,
					targetProcess : options.process
							|| justep.Context.getCurrentProcess(),
					targetActivity : options.activity
							|| justep.Context.getCurrentActivity(),
					action : "externalFileImportAction",
					url : justep.String.HTMLEncode(this.url),
					returnData : this.resultConfig
							&& this.resultConfig.length > 0
							|| this.checkEvent("onReceive")
				}
			};
			butone.Window.dialog(id,
					"/UI/base/core/components/dialogs/uploadFile.w", "上传",
					data, true, null, 350, 100, true, null, $.proxy(
							this._afterUploadFile, this));
		},

		execute : function(options) {
			if (this.virtualFile) {
				this._executeAction(options);
			} else {
				this.upload(options);
			}
		},

		_executeAction : function(opt) {
			var me = this, opt = opt || {}, evt = {
				bizRecId : opt.bizRecId || justep.Context.getProcessData1(),
				variants : opt.variants || new justep.Request.MapParam(),
				filters : opt.filters || new justep.Request.MapParam()
			};

			if (this.checkEvent("onBeforeExecute")) {
				this.callEvent("onBeforeExecute", [ evt ]);
			}

			var param = new justep.Request.ActionParam();
			param.setString('url', justep.String.HTMLEncode(this.url));
			param.setString('bizRecId', evt.bizRecId);
			param.setMap('variants', evt.variants);
			param.setMap('filters', evt.filters);
			param.setString('targetProcess', opt.process
					|| justep.Context.getCurrentProcess());
			param.setString('targetActivity', opt.activity
					|| justep.Context.getCurrentActivity());
			param
					.setBoolean('returnData', me.resultConfig
							&& me.resultConfig.length > 0
							|| me.checkEvent("onReceive"));
			var options = {};
			options.contentType = 'application/json';
			options.dataType = "json";
			options.parameters = param;
			options.process = process;
			options.activity = activity;
			options.action = "virtualFileImportAction";
			options.callback = function(data) {
				if (data.state) {
					var loadData;
					if (justep.Request.isJson(this.dataType)) {
						loadData = me._parseJSONResult(data.response);
					} else {
						loadData = me._parseXmlResult2(data.response);
					}
					me._processResult(loadData);
				} else {
					if (justep.Request.isJson(this.dataType))
						butone.Dialog.error(data.response.message);
					else
						butone.Dialog.error(justep.Request
								.getMessage(data.response));
				}
			};
			var result = justep.Request.sendBizRequest2(options);
		},

		/**
		 * 解析json返回结果
		 * 
		 * @param response
		 */
		_parseJSONResult : function(response) {
			var ret = {};
			for ( var n in response) {
				var store = new SimpleStore(null,
						response[n].userdata.relationAlias);
				store.loadData(null, response[n], null, true, true, "json");
				ret[n] = store;
			}
			return ret;
		},
		/**
		 * 解析为rows
		 * 
		 * @param response
		 * @returns
		 */
		_parseXmlResult : function(response) {
			var flag = justep.Request.getFlag(response);
			if (flag) {
				var isok = 'false' != flag;
				if (isok) {
					var data = justep.Browser.IE >= 9 ? justep.XML.eval0(
							response, "/root/data/*", "single")
							: justep.Request.getData(response);
					if (data) {
						var ret = justep.Request.transformMap(data);
						for ( var n in ret) {
							var store = transformTable(ret[n]);
							ret[n] = store;
						}
						return ret;
					}
				} else {
					butone.Dialog.error(justep.Request.getMessage(response));
				}
			}
		},

		/**
		 * 解析为SimpleStore
		 * 
		 * @param response
		 * @returns {Array}
		 */
		_parseXmlResult2 : function(response) {
			var flag = justep.Request.getFlag(response);
			if (flag) {
				var isok = 'false' != flag;
				if (isok) {
					var data = justep.Browser.IE >= 9 ? justep.XML.eval0(
							response, "/root/data/*", "single")
							: justep.Request.getData(response);
					if (data) {
						var tables = justep.XML.eval(data, "./item/*",
								justep.XML.ResultType.array), ret = {};
						$(tables)
								.each(
										function() {
											var columnIds = justep.XML
													.getNodeText(this,
															"./rows/userdata[@name='relation-alias']");
											var store = new SimpleStore(null,
													columnIds);
											store.loadData(null, this, null,
													true, true, "xml");
											ret[this.parentNode
													.getAttribute("key")] = store;
										});
						return ret;
					}
				} else {
					butone.Dialog.error(justep.Request.getMessage(response));
				}
			}
		},

		_processResult : function(loadData) {
			var evt = {
				source : this,
				data : loadData,
				cancel : false
			};

			if (this.checkEvent("onReceive")) {
				this.callEvent("onReceive", [ evt ]);
			}
			if (evt.cancel)
				return;

			$.each(this.resultConfig, function() {
				// this is result
				for ( var n in loadData) {
					if (this.origin == n) {
						doMapping(this, loadData[n]);
					}
				}
			});
		},

		/** 上传之后 解析返回到iframe的数据 */
		_afterUploadFile : function(event) {
			var loadData = this._parseXmlResult(event.data);
			this._processResult(loadData);
		}
	};

	var com = global.com = global.com || {};
	com.butone = com.butone || {};
	com.butone.FileImport = fileImport;
})(window);
