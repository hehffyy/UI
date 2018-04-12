justep.Report = function() {
};
justep.Report.prototype = {
	initComponent : function() {
		this.init();
	},
	init : function() {
		justep.supportOperation(this);
		justep.supportCustomOperation(this);
		this._buildOperations(this);
		this.waittingDialog = null;
		this.pageSetupDialog = null;
		this._id = this.domNode.getAttribute("id");
		if (!this._id) {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232184).getMessage())
		}
		this.reportDefineID = "report_" + this._id + "_define";
		this.reportContentID = "report_" + this._id + "_content";
		this.reportExportFrameID = "report_" + this._id + "_frame";
		var c = this.getElementByXblID("attribute");
		this._config = {};
		this._config.context = {};
		this._config.page = {
			width : "",
			height : "",
			paperType : c.getAttribute("paperType"),
			pageWidth : c.getAttribute("pageWidth"),
			pageHeight : c.getAttribute("pageHeight"),
			orientation : c.getAttribute("orientation"),
			marginTop : c.getAttribute("marginTop"),
			marginBottom : c.getAttribute("marginBottom"),
			marginLeft : c.getAttribute("marginLeft"),
			marginRight : c.getAttribute("marginRight"),
			marginHeader : c.getAttribute("marginHeader"),
			marginFootter : c.getAttribute("marginFootter")
		};
		var b = c.getAttribute("dataList");
		var a = c.getAttribute("objectList");
		this._config.dataList = b ? b.split(",") : [];
		this._config.objectList = a ? a.split(",") : [];
		this._config.cacheFile = c.getAttribute("cacheFile");
		this._config.cacheData = null
	},
	initContent : function() {
		this.autoLoad = this.domNode.getAttribute("auto-load");
		if (this.autoLoad && "true" == this.autoLoad) {
			this.refresh()
		}
	},
	_hideWaittingDialog : function() {
		$("#" + this._id + "-waiting").remove()
	},
	_getWaittingDialogTips : function(a) {
		if (a == "print") {
			return "正在准备打印文档，请稍候..."
		} else {
			if (a == "pdf") {
				return "正在生成PDF文档，请稍候..."
			} else {
				if (a == "doc") {
					return "正在生成Word文档，请稍候..."
				} else {
					if (a == "xls") {
						return "正在生成Excel工作表，请稍候..."
					} else {
						return "类型不支持"
					}
				}
			}
		}
	},
	_buildOperations : function() {
		var a = this;
		this.defineOperation("pageSetup", {
			label : new justep.Message(justep.Message.JUSTEP232511)
					.getMessage(),
			src : "",
			disSrc : "",
			method : function() {
				a.pageSetup()
			}
		});
		this.defineOperation("print", {
			label : new justep.Message(justep.Message.JUSTEP232512)
					.getMessage(),
			src : "",
			disSrc : "",
			method : function() {
				a.print()
			}
		});
		this.defineOperation("preview", {
			label : new justep.Message(justep.Message.JUSTEP232513)
					.getMessage(),
			src : "",
			disSrc : "",
			method : function() {
				a.preview()
			}
		});
		this.defineOperation("pdf", {
			label : new justep.Message(justep.Message.JUSTEP232514)
					.getMessage(),
			src : "",
			disSrc : "",
			method : function() {
				a.exportPDF()
			}
		});
		this.defineOperation("word", {
			label : new justep.Message(justep.Message.JUSTEP232515)
					.getMessage(),
			src : "",
			disSrc : "",
			method : function() {
				a.exportWord()
			}
		});
		this.defineOperation("excel", {
			label : new justep.Message(justep.Message.JUSTEP232516)
					.getMessage(),
			src : "",
			disSrc : "",
			method : function() {
				a.exportExcel()
			}
		});
		this.customOperation(this.getOperations())
	},
	_getReportID : function() {
		return this._id
	},
	_getReportDefineID : function() {
		return this.reportDefineID
	},
	_getReportContentID : function() {
		return this.reportContentID
	},
	_getReportExportFrameID : function() {
		return this.reportExportFrameID
	},
	getReportName : function() {
		return justep(this._getReportContentID()).getAttribute("report-name")
	},
	setReportName : function(a) {
		justep(this._getReportContentID()).getAttributeNode("report-name").nodeValue = a
	},
	_procReoprtCommonData : function(g) {
		var e = "<dataset>";
		var b = g.getStore();
		var d = b.getRowsNum();
		var f = b.columnIds;
		for ( var a = 0; a < d; a++) {
			e += "<record>";
			for ( var k = 0; k < f.length; k++) {
				var j = f[k];
				var h = b.getValueByName(j, a);
				e += "<" + j + ">";
				e += "<![CDATA[" + h + "]]>";
				e += "</" + j + ">"
			}
			e += "</record>"
		}
		e += "</dataset> ";
		var i = {
			id : g.id,
			type : "commData",
			data : "" + e + ""
		};
		return i
	},
	_getReportRequest : function(e, q) {
		if ((typeof q != "undefined") && (q != null)) {
		} else {
			q = "report"
		}
		var g = {
			view : "",
			model : [],
			child : []
		};
		this._config.id = this._getReportID();
		this._config.isChart = false;
		this._config.reportName = encodeURI(q);
		this._config.outputType = e;
		this._config.context.process = justep.Context.getCurrentProcess();
		this._config.context.activity = justep.Context.getCurrentActivity();
		this._config.context.executor = justep.Context.getExecutor();
		this._config.context.executeContext = justep.Context
				.getExecuteContext();
		if (this.reportDefine) {
			this._config.cacheData = justep.XML.toString(this.reportDefine)
		}
		g.view = this._config;
		for ( var p in this._config.dataList) {
			var o = this._config.dataList[p];
			var b = justep.xbl(o);
			if (!b) {
				throw justep.Error.create(new justep.Message(
						justep.Message.JUSTEP232173, o).getMessage())
			}
			if (justep.XData && b instanceof justep.XData) {
				g.model[p] = this._procReoprtCommonData(b)
			} else {
				var e = b.type;
				if (b.ksql != "") {
					e = "ksql"
				}
				var d = {};
				var s = b.actionParam;
				var f = b.action;
				if (e == "ksqlaction" || e == "ksqlAction" || f == "ksqlAction"
						|| (!f && b.ksql)) {
					d.action = f == "" ? "ksqlQueryAction" : f;
					var r = new justep.Request.ActionParam();
					r.setParam("variables", s.toJson());
					s = r;
					if (b.ksql) {
						s.setParam("ksql", b.ksql)
					}
				} else {
					if (e == "sqlAction" || f == "sqlAction" || (!f && b.sql)) {
						d.action = f == "" ? "sqlQueryAction" : f;
						var k = b.getSQL();
						var t = b.getSQL("ORACLE");
						var j = b.getSQL("MSSQL");
						var n = b.getSQL("DB2");
						var a = b.getSQL("SYBASE");
						s.setParam("sql", {
							ORACLE : t ? t : k,
							MSSQL : j ? j : k,
							DB2 : n ? n : k,
							SYBASE : a ? a : k,
							DEFAULT : k
						})
					} else {
						if (e == "action") {
							d.action = f
						}
					}
				}
				if (b.dataModel) {
					s.setParam("dataModel", b.dataModel)
				}
				if (b.fnModel) {
					s.setParam("fnModel", b.fnModel)
				}
				var m = justep.Context.getCurrentProcess();
				var c = justep.Context.getCurrentActivity();
				d.directExecute = true;
				d.process = m;
				d.activity = c;
				d.parameters = s;
				g.model[p] = {
					id : b.id,
					type : e,
					params : b.sql,
					ksql : b.ksql,
					dataModel : b.dataModel,
					fnModel : b.fnModel,
					action : f,
					actionParam : justep.Request.createBizParam2(d)
				}
			}
		}
		for ( var p in this._config.objectList) {
			var h = this._config.objectList[p];
			var b = justep.xbl(h);
			if (!b) {
				throw justep.Error.create(new justep.Message(
						justep.Message.JUSTEP232185, h).getMessage())
			}
			var l = b._getChartRequest(e, q);
			g.child[p] = l
		}
		return g
	},
	getReportDefine : function() {
		var b = "UI"
				+ decodeURIComponent(this._config.cacheFile).split("UI")[1];
		var a = justep.Request.sendHttpRequest(b);
		if (a.status == 200) {
			this.reportDefine = justep.XML.fromString(a.responseText);
			return this.reportDefine
		} else {
			throw justep.Error.create(new justep.Message(
					justep.Message.JUSTEP232187).getMessage())
		}
	},
	pageSetup : function() {
		if (this.pageSetupDialog == null) {
			this.pageSetupDialog = new justep.WindowDialog(this
					._getReportDefineID()
					+ "PageSetupDialog",
					"/system/service/report/dialog/pageSetup.w", "页面设置", true,
					null, 505, 395, 0, 0, true);
			this.pageSetupDialog.setResizable(false);
			this.pageSetupDialog.setMinmaxable(false);
			this.pageSetupDialog.attachEvent("onSend", function(a) {
				return this._config.page
			}, this);
			this.pageSetupDialog.attachEvent("onReceive", function(b) {
				var a = b.data;
				this._config.page = a;
				this._config.page.width = a.pageWidth;
				this._config.page.height = a.pageHeight
			}, this)
		}
		this.pageSetupDialog.open()
	},
	refresh : function() {
		var b = justep.Report;
		var a = justep(this._getReportContentID());
		a.innerHTML = "<div>"
				+ new justep.Message(justep.Message.JUSTEP232520).getMessage()
				+ "</div>";
		if (!justep.Client.MOBILE) {
			a.style.overflow = "auto"
		}
		justep.Request
				.sendHttpRequest(
						justep.Request
								.addBsessionid("/UI/system/service/report/reportBrowse.j"),
						JSON.stringify(this._getReportRequest("xhtml")),
						"json",
						null,
						null,
						null,
						("undefined" != typeof (__executeContext__)) ? __executeContext__
								: null, true, function(c, d) {
							a.innerHTML = c.responseText;
							if (justep.Browser.IE10) {
								$(a).find("table").css("border-collapse",
										"separate")
							}
						})
	},
	preview : function() {
		var b = justep.Report;
		var d = justep.Request
				.sendHttpRequest(
						justep.Request
								.addBsessionid("/UI/system/service/report/reportBrowse.j"),
						JSON.stringify(this._getReportRequest("preview", this
								.getReportName())),
						"json",
						null,
						null,
						null,
						("undefined" != typeof (__executeContext__)) ? __executeContext__
								: null);
		if (d.status == 200) {
			var e = d.responseText;
			if (justep.Browser.isInApp) {
				var f = justep.getJustepApp();
				var c = function() {
					return e
				};
				var a = function() {
					return new justep.Message(justep.Message.JUSTEP232518)
							.getMessage()
				};
				f.attachment.browserAttachment(c, a)
			} else {
				justep.Request.callURL2(e, "_null")
			}
		}
	},
	_export : function(f) {
		var b = justep.Report;
		var h = this._getReportExportFrameID();
		if (justep.Browser.hasTouch) {
			h = "_null"
		}
		if (f == "print") {
			if (justep.Browser.isInApp) {
				alert(new justep.Message(justep.Message.JUSTEP232169)
						.getMessage());
				return
			} else {
				if (!justep.Browser.IE) {
					alert(new justep.Message(justep.Message.JUSTEP232170)
							.getMessage());
					return
				} else {
					justep.Request
							.callURL2(
									justep.Request
											.addBsessionid("/UI/system/service/report/reportBrowse.j"),
									h, JSON.stringify(this._getReportRequest(f,
											this.getReportName())))
				}
			}
		} else {
			var d = justep.Request
					.sendHttpRequest(
							justep.Request
									.addBsessionid("/UI/system/service/report/reportBrowse.j"),
							JSON.stringify(this._getReportRequest(f, this
									.getReportName())),
							"json",
							null,
							null,
							null,
							("undefined" != typeof (__executeContext__)) ? __executeContext__
									: null);
			if (d.status == 200) {
				var e = d.responseText;
				if (justep.Browser.isInApp) {
					if (f == "doc") {
						alert(new justep.Message(justep.Message.JUSTEP232171)
								.getMessage());
						return
					}
					var g = justep.getJustepApp();
					var c = function() {
						return e
					};
					var a = function() {
						return new justep.Message(justep.Message.JUSTEP232521)
								.getMessage()
					};
					g.attachment.browserAttachment(c, a)
				} else {
					justep.Request.callURL2(e, h)
				}
			}
		}
	},
	print : function() {
		this._export("print")
	},
	exportPDF : function() {
		this._export("pdf")
	},
	exportWord : function() {
		this._export("doc")
	},
	exportExcel : function() {
		this._export("xls")
	}
};