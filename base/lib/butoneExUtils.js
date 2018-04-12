//******************************************************
// *  初始化butoneEx全局对象，依赖jQuery
// *
// *
// *****************************************************
(function($, global) {

	global.butoneEx = {};
	var butoneEx = global.butoneEx || {};
	/**
	 * Sql操作库
	 */
	butoneEx.Sql = {
		// Sql查询返回字段值
		selectOneFld : function(table, filter, returnFld) {
			// 查询内部操作
			var result;
			var options = {};
			var param = new justep.Request.ActionParam();
			param.setString('table', table);
			param.setString('filter', filter);
			param.setString('returnFld', returnFld);
			options.contentType = 'application/json';
			options.dataType = "json";
			options.parameters = param;
			options.action = "selectOneFld";
			options.directExecute = true;
			options.callback = function(callbackData) {
				callbackData.ignoreError = false;
				if (callbackData.state) {
					result = callbackData.response;
				} else {
					butone.Dialog
							.info("查询SQL失败", callbackData.response.message);
				}
			};
			justep.Request.sendBizRequest2(options);
			return result;
		},
		// Sql查询可返回多个字段的查询结果集
		selectFieldValue : function(virtualTable, filter, fields) {
			// 查询内部操作
			var result;
			var options = {};
			var param = new justep.Request.ActionParam();
			param.setString('virtualTable', virtualTable);
			param.setString('filter', filter);
			param.setString('fields', fields);
			options.contentType = 'application/json';
			options.dataType = "json";
			options.parameters = param;
			options.action = "selectFieldValue";
			options.directExecute = true;
			options.callback = function(callbackData) {
				callbackData.ignoreError = false;
				if (callbackData.state) {
					result = callbackData.response;
				} else {
					butone.Dialog
							.info("查询SQL失败", callbackData.response.message);
				}
			};
			justep.Request.sendBizRequest2(options);
			return result;
		}
	};

	/**
	 * 编码操作库
	 */
	butoneEx.Code = {
		// 产生简易编码
		genSimpleCode : function(key, format) {
			// 查询内部操作
			var result;
			var options = {};
			var param = new justep.Request.ActionParam();
			param.setString('key', key);
			param.setString('format', format);
			options.contentType = 'application/json';
			options.dataType = "json";
			options.parameters = param;
			options.action = "genSimpleCode";
			options.directExecute = true;
			options.callback = function(callbackData) {
				callbackData.ignoreError = false;
				if (callbackData.state) {
					result = callbackData.response;
				} else {
					(new justep.System.showMessage()).open({
						msg : "产生编码异常！",
						title : "提示",
						type : 0
					});

					// butoneEx.Utils.dialogUtils.showError("产生编码异常",
					// callbackData.response.message);
				}
			};
			justep.Request.sendBizRequest2(options);
			return result;
		}
	};

	/**
	 * 日期
	 */
	butoneEx.Date = {
		// 转化中文日期
		formatCn : function(dsId, fldId) {
			var ds = justep.xbl(dsId);
			if (!ds)
				return;
			var value = ds.getValue(fldId);
			if (!value)
				return;
			if (typeof value == "string") {
				return justep.Date.toString(justep.Date.fromString(value,
						justep.Date.STANDART_FORMAT_SHOT), "yyyy年MM月dd日");
			} else {
				return justep.Date.toString(value, "yyyy年MM月dd日");
			}
		}
	};

	/**
	 * 校验函数库
	 */
	butoneEx.Check = {
		checkReg : function(reg, val) {
			if (val == null)
				return false;
			return reg.test(val);
		},
		isTel : function(dsId, fieldId) {
			var telReg = /^0\d{2,3}-?\d{7,8}$/;
			return butoneEx.Check.checkReg(telReg, justep.xbl(dsId).getValue(
					fieldId));
		},
		isMobile : function(dsId, fieldId) {
			var telReg = /^1\d{10}$/;
			return butoneEx.Check.checkReg(telReg, justep.xbl(dsId).getValue(
					fieldId));
		},
		isEmail : function(dsId, fieldId) {
			return butoneEx.Check.checkReg(/^(\w-*\.*)+@(\w-?)+(\.\w{2,})+$/,
					justep.xbl(dsId).getValue(fieldId));
		}
	};

	/**
	 * 公共Action
	 */
	butoneEx.Common = {
		callAction : function(objectParam, methodName, process, activity) {
			var result;
			var options = {};
			var param = new justep.Request.ActionParam();
			for (key in objectParam) {
				var value = objectParam[key];
				if (value == null || value == undefined)
					param.setNULL(key);
				else if (value instanceof justep.Request.ListParam)
					param.setList(key, value);
				else if (value instanceof justep.Request.MapParam)
					param.setMap(key, value);
				else if(justep.Array.isArray(value)){
					var list = new justep.Request.ListParam();
					for(var n in value){
						list.add(value[n]);
					}
					param.setList(key, list);
				}else if (typeof objectParam[key] == "boolean"){
					param.setBoolean(key, value);
				}else if (typeof objectParam[key] == "string"){
					param.setString(key, value);
				}else{
					param.setObject(key, value);
				}
			}
			options.contentType = 'application/json';
			options.dataType = "json";
			options.parameters = param;
			options.action = methodName;
			options.directExecute = true;
			if (process) {
				options.process = process;
				options.activity = activity;
			}
			options.callback = function(callbackData) {
				callbackData.ignoreError = false;
				result = callbackData.response;
			};
			justep.Request.sendBizRequest2(options);
			return result;
		},
		callAction2 : function(objectParam, methodName, process, activity) {
			var result;
			var options = {};
			var param = new justep.Request.ActionParam();
			for (key in objectParam) {
				var value = objectParam[key];
				if (value.add)
					param.setList(key, objectParam[key]);
				else if (value.map)
					param.setObject(key, objectParam[key]);
				else
					param.setString(key, objectParam[key]);
			}
			options.contentType = 'application/json';
			// options.dataType = "json";
			options.parameters = param;
			options.action = methodName;
			options.directExecute = true;
			if (process) {
				options.process = process;
				options.activity = activity;
			}
			options.callback = function(callbackData) {
				callbackData.ignoreError = false;
				result = callbackData.response;
			};
			justep.Request.sendBizRequest2(options);
			return result;
		},
		getSystemConst:function(param){
			var val= this.callAction({param:param}, "getSystemConst");
			return val;
		}
	};
	butoneEx.Window = {
		run : function(options) {
			function doRunner() {
				var runner = new justep.WindowRunner();
				if (options.onReceive)
					runner.attachEvent("onReceive", options.onReceive);
				runner.open2(options);
			}
			if (justep.WindowRunner) {
				doRunner();
			} else {
				butone.Loader.requireJS(
						[ "system/components/windowRunner/windowRunner" ])
						.done(doRunner);
			}

		},
		run2 : function(url, title, process, activity, data, onReceive) {
			var options = {
				url : url,
				title : title,
				process : process,
				activity : activity,
				data : data,
				onReceive : onReceive
			};
			butoneEx.Window.run(options);
		},
		dialog : function(id, url, title, data, modal, status, width, height,
				reloadOnOpen, onSend, onReceive, onClose) {
			var me = this;
			function showDialog(dlg) {
				if (data) {
					var opt = {};
					opt.process = data.process, delete data.process;
					opt.activity = data.activity, delete data.activity;
					opt.data = data;
					dlg.open2(opt);
				} else
					dlg.open();
			}
			function createDialog() {
				var dlg = new justep.WindowDialog(id, url, title, modal,
						status, width, height, null, null, reloadOnOpen,
						onSend, onReceive, null, null, onClose);
				if (id) {
					me._dialogs = me._dialogs || {};
					me._dialogs[id] = dlg;
				}
				return dlg;
			}
			var dialog;
			if (id && me._dialogs) {
				dialog = me._dialogs[id];
			}
			if (dialog) {
				showDialog(dialog);
			} else {
				if (justep.WindowDialog) {
					showDialog(createDialog());
				} else {
					butone.Loader
							.requireJS(
									[ "system/components/dialog/dialog",
											"system/components/windowDialog/windowDialog" ])
							.done(function() {
								showDialog(createDialog());
							});
				}
			}
		},
		openPage : function(options, onSend, onReceive, onClose) {
			var me = this;
			options.id = "_sysOpener";
			function showOpener(opener) {
				opener.open();
			}
			function createOpener() {
				opener = new justep.WindowOpener(options);
				me.sendEvent = opener.attachEvent("onSend", onSend, opener);
				me.receiveEvent = opener.attachEvent("onReceive", onReceive,
						opener);
				if (options.id) {
					me._openers = me._openers || {};
					me._openers[options.id] = opener;
				}
				return opener;
			}
			var opener;
			if (me._openers)
				opener = me._openers[options.id];
			if (opener) {
				opener.url = options.url;
				opener.process = options.process;
				opener.activity = options.activity;
				opener.detachEvent(me.sendEvent);
				opener.detachEvent(me.receiveEvent);
				me.sendEvent = opener.attachEvent("onSend", onSend, opener);
				me.receiveEvent = opener.attachEvent("onReceive", onReceive,
						opener);
				showOpener(opener);
			} else {
				if (justep.WindowOpener) {
					showOpener(createOpener());
				} else {
					butone.Loader.requireJS(
							[ "system/components/windowOpener/windowOpener" ])
							.done(function() {
								showOpener(createOpener());
							});
				}
			}

		}
	};
	/**
	 * Param代码 [["dsId","filter","autoNew"],[]]
	 * 
	 */
	butoneEx.Param = {
		openParams : function(event, dataControls, extendParams) {
			var param = event.data || {};
			var openParams = param.openParams || {};
			openParams.dataControl = [];
			for ( var i = 0; i < dataControls.length; i++) {
				var dataControl = {};
				dataControl.id = dataControls[i][0];
				dataControl.filter = dataControls[i][1];
				if (dataControls[i][2] == null)
					dataControl.auoNew = false;
				else
					dataControl.autoNew = dataControls[i][2];
				openParams.dataControl.push(dataControl);
			}
			if (extendParams) {
				for ( var attr in extendParams) {
					openParams[attr] = extendParams[attr];
				}
			}
			param.openParams = openParams;
			return param;
		},
		openParams2 : function(dataControls, extendParams) {
			var param = {
				openParams : {}
			};
			var openParams = param.openParams || {};
			openParams.dataControl = [];
			for ( var i = 0; i < dataControls.length; i++) {
				var dataControl = {};
				dataControl.id = dataControls[i][0];
				dataControl.filter = dataControls[i][1];
				if (dataControls[i][2] == null)
					dataControl.auoNew = false;
				else
					dataControl.autoNew = dataControls[i][2];
				openParams.dataControl.push(dataControl);
			}
			if (extendParams) {
				for ( var attr in extendParams) {
					openParams[attr] = extendParams[attr];
				}
			}
			return param;
		},
		applyNewCreatParam : function(event, mapParams) {
			var param = event.param;
			var openParams = butone.Context.frameForm.openParams;
			for ( var i = 0; i < mapParams.length; i++) {
				event.defaultValues.push(mapParams[i]);
			}
		},
		createRefreshParam : function(event, mapParams) {
			var param = event.data || {};
			for ( var attr in mapParams) {
				param[attr] = mapParams[attr];
			}
			return param;
		},
		applyRefreshParam : function(event, mapParams) {
			var param = event.param;
			var variables = param.getParam("variables") || {};
			for ( var attr in mapParams) {
				variables.put(attr, openParams[attr]);
			}
		}
	};

	/**
	 * Data操作
	 */
	butoneEx.Data = {
		copy : function(trgDs, trgFields, srcObj, srcPrps) {
			for ( var i = 0; i < trgFields.length; i++) {
				trgDs.setValue(trgFields[i], srcObj[srcPrps[i]]);
			}
		}
	};

	/**
	 * Office操作
	 */
	butoneEx.Office = {
		browWord : function(bizKey,templateKey) {
			butoneEx.Window
					.dialog(
							"sysDialog",
							"/UI/common/officeTemplate/process/template/officeHistory.w",
							"WORD版本信息",
							{
								process : "/common/officeTemplate/process/template/templateProcess",
								activity : "mainActivity"
							}, true, null, "700px", "400px", true,
							function(evt) {
								return {
									bizKey : bizKey,
									templateKey : templateKey
								};
							}, null, null);
		},
		getWordParam : function(bizKey, version, parentVersion, templateKey,
				track, options) {
			return this.getWordParam2(bizKey, "-1", version, parentVersion,
					templateKey, track, options);
		},
		getWordParam2 : function(bizKey, kind, version, parentVersion,
				templateKey, track, options) {
			if (version == "" || version == null)
				version = "-1";
			if (parentVersion == "" || parentVersion == null)
				parentVersion = "-1";
			if (templateKey == "" || templateKey == null)
				templateKey = "-1";
			if (options == null)
				options = {};
			var variants = new justep.Request.ListParam();
			if (options.variants) {
				for ( var i = 0; i < options.variants.length; i++) {
					variants.add(options.variants[i]);
				}
			}
			var data = {
				bizKey : bizKey,
				kind : kind,
				version : version,
				parentVersion : parentVersion,
				template : templateKey,
				variants : variants
			};
			// 初始化
			var result = butoneEx.Common.callAction({
				bizKey : bizKey,
				kind : kind,
				parentVersion : parentVersion,
				version : version,
				template : templateKey,
				variants : variants
			}, "initTemplate",
					"/common/officeTemplate/process/template/templateProcess",
					"mainActivity");
			data.versionState = result.versionState;
			data.checkPerson = result.checkPerson;
			data.checkTime = result.checkTime;
			data.bookMarks = result.bookMarks;
			if (data.bookMarks) {
				var temp = data.bookMarks;
				data.bookMarks = JSON.parse(temp);
				for (attr in data.bookMarks) {
					temp = data.bookMarks[attr];
					if (temp == null)
						continue;
					data.bookMarks[attr] = justep.Base64.decode(temp);
				}
			}
			data.newFile = result.newFile;
			if (result.versionId)
				data.versionId = result.versionId;
			data.oprKind = "common";
			data.docKind = "WORD";
			data.options = options;
			data.track = track;
			return data;
		},
		editTemplate : function(bizKey, docKind, onReceive) {
			var data = {
				bizKey : bizKey,
				kind : "-1",
				version : "-1",
				parentVersion : "-1",
				template : "-1"
			};
			// 初始化
			var result = butoneEx.Common.callAction({
				bizKey : bizKey,
				kind : "-1",
				parentVersion : "-1",
				version : "-1",
				template : "-1"
			}, "initTemplate",
					"/common/officeTemplate/process/template/templateProcess",
					"mainActivity");
			data.newFile = result.newFile;
			data.versionState = result.versionState;
			data.checkPerson = result.checkPerson;
			data.checkTime = result.checkTime;
			data.newFile = result.newFile;
			if (result.versionId)
				data.versionId = result.versionId;
			data.oprKind = "template";
			data.docKind = docKind;
			data.track = false;
			butoneEx.Window.run2("/UI/base/system/office/NtkoOfficeEditor.w",
					"WORD模板编辑", null, null, data, onReceive);
		},
		editWord : function(bizKey, version, parentVersion, templateKey, track,
				options) {
			this.editWord2(bizKey, '-1', version, parentVersion, templateKey,
					track, options);
		},
		/**
		 * 编辑Word bizKey:业务主键 version:版本 parentVersion:父版本 templateKey:模板主键
		 * track:是否留痕 options:{variants:{key:value}}
		 */
		editWord2 : function(bizKey, kind, version, parentVersion, templateKey,
				track, options) {
			if (version == "" || version == null)
				version = "-1";
			if (parentVersion == "" || parentVersion == null)
				parentVersion = "-1";
			if (templateKey == "" || templateKey == null)
				templateKey = "-1";
			if (options == null)
				options = {};
			var variants = new justep.Request.ListParam();
			if (options.variants) {
				for ( var i = 0; i < options.variants.length; i++) {
					variants.add(options.variants[i]);
				}
			}
			var data = {
				bizKey : bizKey,
				kind : kind,
				version : version,
				parentVersion : parentVersion,
				template : templateKey,
				variants : variants
			};
			if (options.saveDefaultVer)
				data.saveDefaultVer = true;
			// 初始化
			var result = butoneEx.Common.callAction({
				bizKey : bizKey,
				kind : kind,
				parentVersion : parentVersion,
				version : version,
				template : templateKey,
				variants : variants
			}, "initTemplate",
					"/common/officeTemplate/process/template/templateProcess",
					"mainActivity");
			if (typeof (result) == "string") {
				var win = butone.Context.frameForm.getRootForm().contentWindow;
				win.butone.Window.hint(result);
				return;
			}
			data.versionState = result.versionState;
			data.checkPerson = result.checkPerson;
			data.checkTime = result.checkTime;
			data.bookMarks = result.bookMarks;
			if (data.bookMarks) {
				var temp = data.bookMarks;
				data.bookMarks = JSON.parse(temp);
				for (attr in data.bookMarks) {
					temp = data.bookMarks[attr];
					if (temp == null)
						continue;
					data.bookMarks[attr] = justep.Base64.decode(temp);
				}
			}
			data.newFile = result.newFile;
			if (result.versionId)
				data.versionId = result.versionId;
			data.oprKind = "common";
			data.docKind = "WORD";
			data.options = options;
			data.track = track;
			butoneEx.Window.run2("/UI/base/system/office/NtkoOfficeEditor.w",
					"WORD编辑", null, null, data, null);
		}
	};

	butoneEx.Data = {
		/**
		 * 数据集字段改变后，多字段求和计算，默认保留4位小数
		 */
		sum : function(event, ds, fldAry, trgFld, scales) {
			var column = event.column;
			isNaN(parseInt(scales)) && (scales = 4);
			if (justep.Array.contain(fldAry, column)
					|| justep.Array.contain(fldAry, "-" + column)) {
				var value = 0;
				for ( var i = 0; i < fldAry.length; i++) {
					var fld = fldAry[i];
					var cal = 1;
					if (fld.indexOf('-') == 0) {
						cal = -1;
						fld = fld.substring(1);
					}
					var curVal = ds.getValue(fld);
					if (curVal == undefined || curVal == null || curVal == "")
						curVal = 0;
					curVal = parseFloat(curVal) * cal;
					value = value + curVal;
				}
				(scales >= 0)
						&& (value = Math.round(value * Math.pow(10, scales))
								/ Math.pow(10, scales));
				ds.setValue(trgFld, value);
			}
		},
		/**
		 * 获得字段值，空值返回 0
		 */
		getValue : function(ds, fld) {
			var curVal = ds.getValue(fld);
			if (curVal == undefined || curVal == null || curVal == "")
				curVal = 0;
			return curVal;
		},

		/**
		 * 数据字段改变后，对valAry数组求和，默认保留4位小数
		 */
		sum1 : function(event, ds, fldAry, trgFld, valAry, scales) {
			var column = event.column;
			isNaN(parseInt(scales)) && (scales = 4);
			if (justep.Array.contain(fldAry, column)) {
				var value = 0;
				for ( var i = 0; i < valAry.length; i++) {
					var curVal = valAry[i];
					if (curVal == null || curVal == "")
						curVal = 0;
					curVal = parseFloat(curVal);
					value = value + curVal;
				}
				(scales >= 0)
						&& (value = Math.round(value * Math.pow(10, scales))
								/ Math.pow(10, scales));
				ds.setValue(trgFld, value);
			}
		},

		/**
		 * 数据集当前行字段求和，默认保留4位小数
		 */
		sumFlds : function(ds, fldAry, trgFld, scales) {
			var value = 0;
			isNaN(parseInt(scales)) && (scales = 4);
			for ( var i = 0; i < fldAry.length; i++) {
				var fld = fldAry[i];
				var cal = 1;
				if (fld.indexOf('-') == 0) {
					cal = -1;
					fld = fld.substring(1);
				}
				var curVal = ds.getValue(fld);
				if (curVal == undefined || curVal == null || curVal == "")
					curVal = 0;
				curVal = parseFloat(curVal) * cal;
				value = value + curVal;
			}
			(scales >= 0)
					&& (value = Math.round(value * Math.pow(10, scales))
							/ Math.pow(10, scales));
			ds.setValue(trgFld, value);
		}
	};

	/**
	 * 三方设备接口
	 */

	butoneEx.Device = {
		readIdCard : function(cardKind, callback) {
			var url = "/UI/base/system/idcard/idcardDialog.w";
			butoneEx.Window.dialog(justep.Utils.randomString(), url, '身份证读取信息', null, true,
					null, "690px", "350px", true, null, function(evt) {
						callback(evt);
					});
		},
		// fldArray[name,zjlx,zjlxmc,card,address]
		readIdCardFill : function(bizData, fldArray1, fldArray2, fldArray3,
				cardKind) {
			this.readIdCard(cardKind, function(evt) {
				if (evt.data.psnKind == 0)
					fldArray = fldArray1;
				else if (evt.data.psnKind == 1)
					fldArray = fldArray2;
				else
					fldArray = fldArray3;
				var rowid = "";
				var ary = bizData.find([ fldArray[3] ], [ evt.data.cardNo ],
						true, true, true);
				if (ary == null || ary.length == 0 && evt.data.psnKind == 0) {
					bizData.newData();
					rowid = bizData.getCurrentId();
				} else
					rowid = ary[0];
				bizData.setValue(fldArray[0], evt.data.name, rowid);
				if (fldArray[1])
					bizData.setValue(fldArray[1], '1', rowid);
				if (fldArray[2])
					bizData.setValue(fldArray[2], '身份证', rowid);
				bizData.setValue(fldArray[3], evt.data.cardNo, rowid);
				if (fldArray[4])
					bizData.setValue(fldArray[4], evt.data.address, rowid);
			});
		}
	};

	butoneEx.Print = {
		printHtml : function(taskName, action, variables, process, activity,
				templatePath, top, left, width, height, options) {
			var LODOP = butoneEx.Print.getLodop();
			if (LODOP == null) {
				alert("未安装打印组建");
				return;
			}

			// 获取数据
			var map = new justep.Request.MapParam();
			for ( var attr in variables) {
				map.put(attr, variables[attr]);
			}
			var reportData = butoneEx.Common.callAction({
				variables : map
			}, action, process, activity);

			var fn_savePrintPhoto = function() {
				// 构造html
				var tmp = new HtmlTemplate(reportData, templatePath, options);
				var html = tmp.createHtml();
				LODOP.PRINT_INIT(taskName);
				LODOP.ADD_PRINT_TABLE(top, left, width, height, html);
				LODOP.SET_SAVE_MODE("FILE_PROMPT", false);
				LODOP.SET_SAVE_MODE("SAVEAS_IMGFILE_EXENAME", ".jpg");
				// TODO IE11无法save
				var ret = LODOP.SAVE_TO_FILE("export.jpg");
				if (ret) {
					var imageBuffer = LODOP.FORMAT("FILE:EncodeBase64",
							"export.jpg");
					if (imageBuffer) {
						map.put("imageBuffer", imageBuffer);
						butoneEx.Common.callAction({
							variables : map
						}, "savePrintPhoto", process, activity);
						return true;
					} else {
						alert("读取本地打印文档失败");
					}
				} else {
					alert("无法生成打印PDF文件");
				}
				return false;
			};

			var fn_PREVIEW = function() {
				// 构造html
				var tmp = new HtmlTemplate(reportData, templatePath, options);
				var html = tmp.createHtml();
				LODOP.PRINT_INIT(taskName);
				LODOP.ADD_PRINT_HTM(top, left, width, height, html);
				LODOP
						.ADD_PRINT_HTM("281mm", 350, 300, 100,
								"<span tdata='pageNO'>第##页</span>，<span tdata='pageCount'>共##页</span>");
				LODOP.SET_PRINT_STYLEA(0, "ItemType", 1);
				LODOP.PREVIEW();
				if (options) {
					if (options.savePrintRes && options.savePrintRes)
						if (!fn_savePrintPhoto())
							return;
					(typeof options.callback == "function")
							&& options.callback();
				}
			};
			butone.Loader
					.requireJS(
							[ "base/core/template/default/printtemplate/lodop/htmlTemplate" ],
							function() {
								fn_PREVIEW();
							});
		},
		printReport : function() {
			var LODOP = this.getLodop();
			LODOP.PRINT_INITA(0, 0, 500, 500, "报表");
			LODOP.ADD_PRINT_HTM(0, 0, "100%", "100%", document
					.getElementById("report1").innerHTML);
			LODOP.SET_PRINTER_INDEXA('Doro PDF Writer');
			LODOP.PREVIEW();
		},
		printQCod : function(code, printer, width, height) {
			var LODOP = this.getLodop();
			if (printer == null)
				printer = "Doro PDF Writer";
			if (LODOP == null)
				return;
			if (width == null) {
				width = 200;
				height = 200;
			}
			LODOP.PRINT_INITA(0, 0, 500, 500, "二维码");
			LODOP.SET_PRINT_PAGESIZE(1, 800, 1000, "");
			LODOP.ADD_PRINT_BARCODE(100, 60, width, height, "QRCode", code);
			LODOP.SET_PRINT_STYLEA(0, "QRCodeVersion", 7);
			LODOP.SET_PRINTER_INDEXA(printer);
			LODOP.SET_PREVIEW_WINDOW(0, 1, 1, 800, 600, "");// 打印前弹出选择打印机的对话框
			LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW", 1);// 打印后自动关闭预览窗口
			LODOP.PREVIEW();
		},
		getLodop : function() {
			var oOBJECT = document.getElementById('LODOP1');
			var oEMBED = document.getElementById('LODOP_EM1');
			/*******************************************************************
			 * 本函数根据浏览器类型决定采用哪个页面元素作为Lodop对象： IE系列、IE内核系列的浏览器采用oOBJECT，
			 * 其它浏览器(Firefox系列、Chrome系列、Opera系列、Safari系列等)采用oEMBED,
			 * 如果页面没有相关对象元素，则新建一个或使用上次那个,避免重复生成。
			 * 64位浏览器指向64位的安装程序install_lodop64.exe。
			 ******************************************************************/
			var strHtmInstall = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='"
					+ justep.Request.convertURL(
							"/UI/base/plugins/install_lodop32.exe", true)
					+ "' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
			var strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='"
					+ justep.Request.convertURL(
							"/UI/base/plugins/install_lodop32.exe", true)
					+ "' target='_self'>执行升级</a>,升级后请重新进入。</font>";
			var strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='"
					+ justep.Request.convertURL(
							"/UI/base/plugins/install_lodop64.exe", true)
					+ "' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
			var strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.exe' target='_self'>执行升级</a>,升级后请重新进入。</font>";
			var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
			var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
			var LODOP;
			try {
				// =====判断浏览器类型:===============
				var isIE = (navigator.userAgent.indexOf('MSIE') >= 0)
						|| (navigator.userAgent.indexOf('Trident') >= 0);
				var is64IE = isIE && (navigator.userAgent.indexOf('x64') >= 0);
				// =====如果页面有Lodop就直接使用，没有则新建:==========
				if (oOBJECT != undefined || oEMBED != undefined) {
					if (isIE)
						LODOP = oOBJECT;
					else
						LODOP = oEMBED;
				} else {
					LODOP = document.createElement("object");
					LODOP.setAttribute("width", 0);
					LODOP.setAttribute("height", 0);
					LODOP
							.setAttribute("style",
									"position:absolute;left:0px;top:-100px;width:0px;height:0px;");
					if (isIE)
						LODOP.setAttribute("classid",
								"clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
					else
						LODOP.setAttribute("type", "application/x-print-lodop");
					document.documentElement.appendChild(LODOP);
				}
				;
				// =====判断Lodop插件是否安装过，没有安装或版本过低就提示下载安装:==========
				if ((LODOP == null) || (LODOP.VERSION == null)
						|| (typeof (LODOP.VERSION) == "undefined")) {
					var self = this;
					this.checkOcxDialog = new justep.Dialog(
							"butoneCheckOcxDialog", "安装提示", true, null, 400,
							150, null, null, function() {
								var str = "";
								if (is64IE)
									str = strHtm64_Install;
								else
									str = strHtmInstall;
								self.checkOcxDialog.setContentHTML(str);
							});
					this.checkOcxDialog.setMinmaxable(false);
					this.checkOcxDialog.setResizable(false);
					this.checkOcxDialog.open();
					return null;
				} else if (LODOP.VERSION < "6.2.0.8") {
					var self = this;
					this.checkOcxDialog = new justep.Dialog(
							"butoneCheckOcxDialog", "安装提示", true, null, 400,
							150, null, null, function() {
								var str = "";
								if (is64IE)
									str = strHtm64_Install;
								else
									str = strHtmUpdate;
								self.checkOcxDialog.setContentHTML(str);
							});
					this.checkOcxDialog.setMinmaxable(false);
					this.checkOcxDialog.setResizable(false);
					this.checkOcxDialog.open();
					return null;
				}
				;
				// =====如下空白位置适合调用统一功能(如注册码、语言选择等):====
				LODOP.SET_LICENSES("西安博通资讯股份有限公司",
						"896C5C89FAE17DE99D78DBE47E83CAE9", "", "");
				// ============================================================
				return LODOP;
			} catch (err) {
				var self = this;
				this.checkOcxDialog = new justep.Dialog("butoneCheckOcxDialog",
						"安装提示", true, null, 400, 150, null, null, function() {
							var str = "";
							if (is64IE)
								str = strHtm64_Install;
							else
								str = strHtmInstall;
							self.checkOcxDialog.setContentHTML(str);
						});
				this.checkOcxDialog.setMinmaxable(false);
				this.checkOcxDialog.setResizable(false);
				this.checkOcxDialog.open();
				return null;
			}
			;
		}
	};
	/**
	 * 文档操作
	 */
	butoneEx.Doc = {
		viewDoc : function(docIds, callback) {
			if (docIds == null || docIds == "") {
				if (callback)
					callback("/UI/base/system/upload/noImage.w");
				return null;
			}
			docIds = JSON.parse(docIds);
			var docPath = docIds.docPath;
			var fielId = docIds.fileID;
			butone.Loader.requireJS([ "system/service/doc/docUtil2" ],
					function(evt) {
						var docUrl = justep.doc.InnerUtils.getdocServerAction(
								docPath, "/repository/file/view/" + fielId
										+ "/last/content");
						docUrl = window.location.protocol + "//"
								+ window.location.host + docUrl;
						if (callback)
							callback(docUrl);
					});
		},
		viewDocForFrame : function(docIds, frame) {
			butoneEx.Doc.viewDoc(docIds, function(docUrl) {
				frame.url = docUrl;
				frame.refresh();
			});
		},
		upload : function(bizData, fieldId, subPath, frame) {
			var uploadURL = justep.Request
					.convertURL("/UI/base/system/upload/UploadEx.j");
			var process = "/base/system/process/bizSystem/bizSystemProcess";
			var activity = "mainActivity";
			var data = {
				uploadURL : uploadURL,
				inputFile : "input",
				parameters : {
					process : process,
					activity : activity,
					action : "uploadDocEx",
					subPath : subPath
				}
			};
			butone.Window
					.dialog(
							"sys",
							"/UI/base/core/components/dialogs/uploadFile.w",
							"上传",
							data,
							true,
							null,
							350,
							100,
							true,
							null,
							function(evt) {
								var response = evt.data;
								var flag = justep.Request.getFlag(response);
								if (flag) {
									var isok = 'false' != flag;
									if (isok) {
										var data = justep.Browser.IE >= 9 ? justep.XML
												.eval0(response,
														"/root/data/*",
														"single")
												: justep.Request
														.getData(response);
										if (data) {
											var ret = justep.Request
													.transformSimple(data);
											ret = JSON.parse(ret);
											if (!ret.sucess) {
												butone.Dialog
														.error(justep.Request
																.getMessage(ret.error));
												return;
											}
											var docIds = JSON
													.stringify(ret.result);
											if (bizData) {
												bizData.setValue(fieldId,
														docIds);
												bizData.saveData();
											}
											butoneEx.Doc.viewDocForFrame(
													docIds, frame);
										}
									} else {
										butone.Dialog.error(justep.Request
												.getMessage(response));
									}
								}
							});
		}
	};

	// Excel报表
	butoneEx.report = {
		getPdfReportUrl : function(templateKey, sqlParam) {
			sqlParam = JSON.stringify(sqlParam);
			var fileName = butoneEx.Common.callAction({
				templateKey : templateKey,
				sqlParam : sqlParam
			}, 'pdfReport');
			fileName = location.protocol + "//" + location.host
					+ "/x5/UI/system/service/report/printGetFile.j?filename="
					+ fileName + "&reportName=report.pdf&outputType=preview";
			return fileName;
		},
		setFramePdfUrl : function(frame, templateKey, sqlParam) {
			frame.src = this.getPdfReportUrl(templateKey, sqlParam);
			frame.refresh();
		}
	};

	// 案卷收藏
	butoneEx.BizRec = {
		/**
		 * data格式：{fBizRecId : 案卷编号, fTaskID : 任务ID, fTitle : 标题, fProcess :
		 * process路径, fActivity : 环节名称, fFunctionName : 功能名称}
		 */
		openFavoriteDialog : function(recevicedata) {
			var data = {};
			recevicedata.fProcess = justep.Context.getCurrentProcess();
			recevicedata.fActivity = justep.Context.getCurrentActivity();
			recevicedata.fFunctionName = justep.Context
					.getCurrentActivityLabel()
					+ ":" + justep.Context.getCurrentProcessLabel();
			data.data = recevicedata;
			data.process = "/MOA/cloudNotes/process/bizrecFavorites/bizrecFavoritesProcess";
			data.activity = "mainActivity";
			var result = butoneEx.Common
					.callAction(
							{
								fBizRecId : recevicedata.fBizRecId
							},
							"checkBizRecUniqueAction",
							"/MOA/cloudNotes/process/bizrecFavorites/bizrecFavoritesProcess",
							"mainActivity");
			if (result)
				butone.Window
						.dialog(
								"openFavoriteDialog",
								"/UI/MOA/cloudNotes/process/bizrecFavorites/favoritesDialog.w",
								"案卷收藏", data, true, "minimize", 600, 450, true,
								null, function(event) {
									if (event.data)
										butone.Window.hint("收藏成功，请在云笔记功能查看。",
												1000);
								}, null);
			else
				butone.Window.hint("此案卷您已收藏，不需要重复收藏！", 1000);
		}
	};

	// 惯用语
	butoneEx.Idiom = {
		/**
		 * data格式：{id:"textarea组件ID",tableId:"数据集ID",colName:"字段"}
		 */
		selectIdiom : function(data) {
			if (data.id) {
				var z = justep.xbl(data.id);
				if (!z) {
					return;
				}
				var $textArea = $(z.element);
				if (!$textArea.parent().attr("idiomWarp")) {

					var pos = $textArea.position();
					var $warp = $("<div idiomWarp='" + data.id + "'></div>")
							.appendTo($textArea.parent());
					$warp.css({
						position : "relative",
						width : $textArea.width(),
						height : $textArea.height()
					});
					if ($textArea.css("position") == "absolute") {
						$warp.css({
							position : "absolute",
							left : pos.left,
							top : pos.top
						});
					}
					$textArea.appendTo($warp).css({
						left : 0,
						top : 0,
						width : "100%",
						height : "100%",
						position : "static"
					});
					var $buttton = $(
							"<div style='display:none' class='butone_idiom' id='button_"
									+ data.id + "'>惯用语</div>").appendTo($warp)
							.css({
								position : "absolute",
								bottom : "0px",
								right : "0px"
							}).click(function() {
								butoneEx.Idiom.openIdiom(data);
							});
					var oldCB = z.element.refreshCallback;
					z.element.refreshCallback = function(refC) {
						oldCB && oldCb(refC);
						if (z.readonly || z.getReadonly() || z.getDisabled() || $(z.element).hasClass("xforms-disabled") || $(z.element).hasClass("xforms-readonly")) {
							$buttton.hide();
						} else {
							$buttton.show();
						}
					};
					z.element.refreshCallback(z);
				}
			} else {
				butoneEx.Idiom.openIdiom(data);
			}
		},
		openIdiom : function(data) {
			var doIt = function() {
				data.info = justep.xbl(data.tableId).getValue(data.colName);
				butone.Window.dialog("idiom",
						"/UI/base/system/process/idioms/idiomsDialog.w", "惯用语",
						data, true, "minimize", 500, 400, true, null, function(
								event) {
							if (event.data) {
								var _data = justep.xbl(event.data.tableId);
								_data.setValue(event.data.colName,
										event.data.info);
							}
						}, null);
			};

			if(butone.Context && butone.Context.frameForm && butone.Context.frameForm.promiseRefreshControls){
				butone.Context.frameForm.promiseRefreshControls().done(doIt);
			} else {
				doIt();
			}
		}

	};
	// 流程函数
	butoneEx.Flow = {
		open : function(options) {
			function doOpen() {
				var windowDialog = new justep.WindowDialog();
				windowDialog.reloadOnOpen = true;
				windowDialog.dialog.width = 650;
				windowDialog.dialog.height = 400;
				windowDialog.dialog.minmaxable = false;
				windowDialog.dialog.resizable = false;
				windowDialog.dialog.status = "minimize";
				windowDialog.attachEvent("onReceive", function(event) {
					if (event.data) {
						butone.Dialog.success("启动成功！");
					}
				}, windowDialog);
				windowDialog.open2(options);
			}
			if (justep.WindowDialog) {
				doOpen();
			} else {
				butone.Loader.requireJS(
						[ "system/components/windowDialog/windowDialog" ])
						.done(doOpen);
			}

		},
		open2 : function(data, url, title, width, height, process, activity) {
			var options = {
				url : url,
				title : title,
				process : process,
				activity : activity
			};
			butoneEx.Flow.open(options);
		},
		startHB : function(data) {
			var title = "会办信息";
			if (data.fKind == "办文-会稿")
				title = "会稿信息";
			options = {
				url : "/UI/EGovSys/commonDialog/huiBan/huibanDialog.w",
				title : title,
				data : data
			};
			butoneEx.Flow.open(options);
		}
	};

	butoneEx.Notice = {
		editNotice : function(data) {
			butoneEx.Window
					.run2(
							"/UI/MOA/notice/process/noticeInfo/editActivity.w?kind=new",
							"拟发通知",
							"/MOA/notice/process/noticeInfo/noticeInfoProcess",
							"mainActivity", data, null);
		}
	};

	butoneEx.Nav = {
		createNav : function(rows) {
			require([ "base/lib/cateNav/cateNav" ], function(CateNav) {
				CateNav.createNav("rootView", rows);
			});

		}
	};
}(jQuery, window));
