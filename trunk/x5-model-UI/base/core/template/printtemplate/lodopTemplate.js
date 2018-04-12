var lodopTemplate = {};
var LODOP;

lodopTemplate.sysReceive = function(event) {
	// 初始化配置
	this._initConfig();
	debugger;
	if (this.initTemplate)
		this.initTemplate();
	LODOP = butoneEx.Print.getLodop();
	// 初始化数据
	this.reportData = {};
	if (event.data.reportData)
		this.reportData = event.data.reportData;
	else if (event.data.openParams)
		this.initData(event.data.openParams);
	else if (event.data.reportDef)
		this.initReportDef(event.data.reportDef);
	this.init();
};

// 初始化配置
lodopTemplate._initConfig = function() {
	// 页面设置
	if (this.pageInfo == null && this.initConfig) {
		var dsSet = justep.xbl("dsPrintSet");
		dsSet.setFilter("_filter", "fConfigStr='" + this.getSrc()
				+ "' and fPersonID='" + justep.Context.getCurrentPersonID()
				+ "'");
		dsSet.refreshData();
		if (dsSet.getCount() > 0) {
			var page = dsSet.getValue("fConfig");
			page = JSON.parse(page);
			this.pageInfo = page;
		} else {
			this.initConfig();
		}
	} else if (this.pageInfo == null && this.initConfig == null) {
		// 设计配置
		this.pageInfo = {
			marginTop : 0,
			marginLeft : 0,
			pageWidth : "210mm",
			pageHeight : "297mm",
			orientation : 0,// 横向打印
			taskName : '设计',
			paperType : 'custom'
		};
	}
};

// 初始化报表数据
lodopTemplate.initReportDef = function(reportDef) {
	debugger;
	var action = reportDef.action;
	var variables = reportDef.variables;
	var map = new justep.Request.MapParam();
	for ( var attr in variables) {
		map.put(attr, variables[attr]);
	}
	var result = butoneEx.Common.callAction({
		variables : map
	}, action);
	this.reportData = result;
};

// 初始化数据
lodopTemplate.initData = function(openParams) {
	for ( var n in openParams) {
		var param = openParams[n];
		// action id
		var id = param.id;
		var filter = param.filter;
		var vars = param.vars;
		if (filter != null)
			data.setFilter(id + "_pfilter", filter);
		else if (vars != null) {
			if (vars[0].name) {
				for ( var i in vars) {
					data.setStringVar(vars[i].name, vars[i].value);
				}
			} else {
				var variables = "";
				for ( var i in vars) {
					var temp = "";
					if (typeof (vars[i]) == "object")
						temp = JSON.stringify(vars[i]);
					else
						temp = vars[i];
					if (variables == "")
						variables = temp;
					else {
						variables = variables + "|" + temp;
					}
				}
				var result = butoneEx.Common.callAction({
					variables : variables
				}, id);
				var rows = result.rows;
				this.reportData[id] = [];
				for ( var i = 0; i < rows.length; i++) {
					var row = rows[i];
					var rowData = {};
					for ( var column in row) {
						rowData[column] = row[column].value;
					}
					this.reportData[id].push(rowData);
				}
			}
		}
	}
	// 如果只有一个数据集 一条数据
	if (openParams.length == 1) {
		var length = this.reportData[openParams[0].id].length;
		if (length == 1) {
			this.reportData = this.reportData[openParams[0].id][0];
		} else if (length == 0)
			this.reportData = null;
	}
};

lodopTemplate.getSrc = function() {
	return window.location.pathname;
};

// 初始化
lodopTemplate.init = function() {
	if (LODOP) {
		this.LODOP = LODOP;
		// 设置授权
		LODOP.SET_LICENSES("西安博通资讯股份有限公司", "896C5C89FAE17DE99D78DBE47E83CAE9",
				"", "");
		// 设置页面配置
		if (this.pageInfo) {
			LODOP.PRINT_INITA(this.pageInfo.marginTop,
					this.pageInfo.marginLeft, this.pageInfo.pageWidth,
					this.pageInfo.pageHeight, this.pageInfo.taskName);// 初始化Top,Left边距
			// 纸张大小
			if (this.pageInfo.paperType == "A4")
				LODOP.SET_PRINT_PAGESIZE(this.pageInfo.orientation, 0, 0,
						this.pageInfo.paperType);
			else
				LODOP.SET_PRINT_PAGESIZE(this.pageInfo.orientation,
						this.pageInfo.pageWidth, this.pageInfo.pageHeight,
						this.pageInfo.paperType);
			if (this.pageInfo.printer) {
				LODOP.SET_PRINTER_INDEXA(this.pageInfo.printer);
			}
		}
		// 模板配置
		debugger;
		if (this.templateInfo) {
			var htmlTml = new HtmlTemplate(this.reportData,
					this.templateInfo.templatePath);
			this.html = htmlTml.createHtml();
		}
		// 创建页面
		if (this.createPage)
			this.createPage();

		// 默认控制 预览
		LODOP.SET_SHOW_MODE("HIDE_PAPER_BOARD", true);// 隐藏走纸板
		LODOP.SET_PREVIEW_WINDOW(0, 3, 0, 0, 0, ""); // 隐藏工具条，设置适高显示
		LODOP.SET_SHOW_MODE("PREVIEW_IN_BROWSE", 1);
		LODOP.SET_SHOW_MODE("NP_NO_RESULT", true);
		// LODOP.SET_SHOW_MODE("SKIN_TYPE", 16);
		LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", true);
		LODOP.SET_PRINT_MODE("RESELECT_PRINTER", true);
		LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE", true);
		LODOP.SET_PRINT_MODE("RESELECT_ORIENT", true);
		LODOP.SET_PRINT_MODE("RESELECT_COPIES", true);
		LODOP.SET_PRINT_MODE("POS_BASEON_PAPER", true);
		debugger;
		LODOP.SET_PRINT_MODE("FULL_HEIGHT_FOR_OVERFLOW", true);
		LODOP.SET_PRINT_MODE("FULL_WIDTH_FOR_OVERFLOW", true);
		this.LODOP.PREVIEW();
		LODOP.DO_ACTION("PREVIEW_ZOOM_WIDTH", 0);
		this.setPageIndex();
	}
};

lodopTemplate.setPageIndex = function() {
	var pageCount = LODOP.GET_VALUE("PREVIEW_PAGE_COUNT", 0);// 获得页数
	var pageIndex = LODOP.GET_VALUE("PREVIEW_PAGE_NUMBER", 0);// 当前页号
	$("#lblPageIndex").text('[第' + pageIndex + "/" + pageCount + "页]");
};
// 转换URL
lodopTemplate.convertUrl = function(url) {
	url = justep.Request.convertURL(url, false);
	url = location.protocol + "//" + location.host + url;
	return url;
};

lodopTemplate.getConfig = function() {
	var pageInfo = {};
	pageInfo.paperType = LODOP.GET_VALUE('PRINTSETUP_PAGESIZE_NAME', '');
	pageInfo.pageWidth = LODOP.GET_VALUE('PrintInitWidth', '');
	pageInfo.pageHeight = LODOP.GET_VALUE('PrintInitHeight', '');
	pageInfo.orientation = LODOP.GET_VALUE('PRINTSETUP_ORIENT', '');
	pageInfo.marginTop = LODOP.GET_VALUE('PrintInitTop', '');
	pageInfo.marginLeft = LODOP.GET_VALUE('PrintInitLeft', '');
	return pageInfo;
};

lodopTemplate.trigger26Click = function(event) {
	LODOP.DO_ACTION("PREVIEW_SETUP", 0);
	// LODOP.DO_ACTION("PREVIEW_ROTATE", 0);
};

lodopTemplate.model1XBLLoaded = function(event) {
	debugger;
};

lodopTemplate.setDialogReceive = function(event) {
	var pageInfo = event.data;
	lodopTemplate.pageInfo = pageInfo;
	// 保存配置
	var dsSet = justep.xbl("dsPrintSet");
	if (dsSet.getCount() == 0)
		dsSet.newData();
	dsSet.setValue("fKind", "打印设置");
	dsSet.setValue("fConfig", JSON.stringify(pageInfo));
	dsSet.setValue("fConfigStr", lodopTemplate.getSrc());
	dsSet.saveData();
	// 初始化
	lodopTemplate.init();
};

lodopTemplate.btnDesignClick = function(event) {
	LODOP.PRINT_DESIGN();
};

lodopTemplate.btnAutoWidthClick = function(event) {
	LODOP.DO_ACTION("PREVIEW_ZOOM_WIDTH", 0);
};

lodopTemplate.btnAutoClick = function(event) {
	LODOP.DO_ACTION("PREVIEW_ZOOM_NORMAL", 0);
};

lodopTemplate.btnAutoHeightClick = function(event) {
	LODOP.DO_ACTION("PREVIEW_ZOOM_HIGHT", 0);
};

lodopTemplate.btnPrintSetClick = function(event) {
	// 获取打印机
	this.pageInfo.printers = [];
	var iCount = LODOP.GET_PRINTER_COUNT();
	for ( var i = 0; i < iCount; i++) {
		var name = LODOP.GET_PRINTER_NAME(i);
		this.pageInfo.printers.push(name);
	}
	if (this.pageInfo.printer == null)
		this.pageInfo.printer = LODOP.GET_PRINTER_NAME(-1);
	justep.xbl("setDialog").open2({
		data : this.pageInfo
	});
};

lodopTemplate.btnPrintClick = function(event) {
	var iPageCount = LODOP.GET_VALUE("PREVIEW_PAGE_COUNT", 0);// 获得页数
	LODOP.SET_PRINT_MODE("PRINT_START_PAGE", 1);
	LODOP.SET_PRINT_MODE("PRINT_END_PAGE", iPageCount);
	LODOP.DO_ACTION("PREVIEW_PRINT", 0);
};

lodopTemplate.btnFirstClick = function(event) {
	LODOP.DO_ACTION("PREVIEW_GOFIRST", 0);
	this.setPageIndex();
};

lodopTemplate.btnPreClick = function(event) {
	LODOP.DO_ACTION("PREVIEW_GOPRIOR", 0);
	this.setPageIndex();
};

lodopTemplate.btnNextClick = function(event) {
	LODOP.DO_ACTION("PREVIEW_GONEXT", 0);
	this.setPageIndex();
};

lodopTemplate.btnLastClick = function(event) {
	LODOP.DO_ACTION("PREVIEW_GOLAST", 0);
	this.setPageIndex();
};

lodopTemplate.trigger1Click = function(event) {
	LODOP.DO_ACTION("PREVIEW_SETUP", 0);
};

lodopTemplate.btnZoomOutClick = function(event) {
	LODOP.DO_ACTION("PREVIEW_ZOOM_IN", 0);
};

lodopTemplate.btnZoomInClick = function(event) {
	LODOP.DO_ACTION("PREVIEW_ZOOM_Out", 0);
};

lodopTemplate.model1Load = function(event) {
	debugger;
};

lodopTemplate.addHtmlText = function(top,left,width,height,text) {
	var html = "<!DOCTYPE><script>window.alert = null;window.confirm = null;window.open = null;window.showModalDialog = null;</script>\n";
	html += "<table style='background-color:transparent;width:"+width+"px;height:"+height+"px'>";
	html += "<tr>";
	html += "<td>"+text+"</td>";
	html += "</tr>";
	html += "</table>";
	LODOP.ADD_PRINT_HTM(top,left,width,height,html);
};
