var webPrintTemplate = {};

webPrintTemplate.sysReceiverReceive = function(event) {
	debugger;
	var openParams = event.data.openParams;
	for ( var n in openParams) {
		var param = openParams[n];
		var id = param.id;
		var filter = param.filter;
		var vars = param.vars;
		var data = justep.xbl(id);
		if (data == null)
			continue;
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
					var temp="";
					if(typeof( vars[i]) == "object")
						temp = JSON.stringify(vars[i]);
					else
						temp = vars[i];
					if (variables == "")
						variables = temp;
					else{
						variables = variables + "|" + temp;
					}
				}
				data.setStringVar("variables", variables);
			}
		}
	}

	justep.xbl("report").refresh();
	this.lodop = butoneEx.Print.getLodop();
	var dsSet = justep.xbl("dsPrintSet");
	if (dsSet == null)
		return;
	dsSet.setFilter("_filter", "fConfigStr='" + this.getSrc()
			+ "' and fPersonID='" + justep.Context.getCurrentPersonID() + "'");
	dsSet.refreshData();
	if (dsSet.getCount() > 0) {
		var page = dsSet.getValue("fConfig");
		page = JSON.parse(page);
		justep.xbl("report")._config.page = page;
	}
};

// 拆分页面
webPrintTemplate.initPage = function() {
	debugger;
	var config = justep.xbl("report")._config;
	var printHtmls = [];
	var breakTrs = $("tr[break-after='page']");
	var trs = $("#report_report_content").children("table").children("tbody")
			.children("tr");
	var trIndexs = [];
	if (breakTrs.length == 0) {
		printHtmls.push($("#report_report_content").html());
		webPrintTemplate.printHtmls = printHtmls;
		return;
	}
	for ( var i = 0; i < breakTrs.length; i++) {
		var height = 0;
		var index = trs.index(breakTrs[i]);
		trIndexs.push(index);
		var mainClone = $("#report_report_content").clone();
		var trsClone = mainClone.children("table").children("tbody").children(
				"tr");
		for ( var j = 0; j < trs.length; j++) {
			if (i == 0) {
				if (j > index)
					$(trsClone[j]).remove();
				else
					height = height + parseFloat($(trs[j]).attr("height"));
			} else if (i <= breakTrs.length - 1) {
				if (j > index || j <= trIndexs[i - 1])
					$(trsClone[j]).remove();
				else
					height = height + parseFloat($(trs[j]).attr("height"));
			}
		}

		trsClone = mainClone.children("table").children("tbody").children("tr");
		var lastCloneTr = $(trsClone[trsClone.length - 1]);
		var nextTR = $(trs[index + 1]);
		lastCloneTr.children("td").each(function() {

			var $this = $(this);
			var nextTD = $("td:eq(" + this.cellIndex + ")", nextTR);
			$this.css("border-bottom-style", nextTD.css("border-top-style"));
			$this.css("border-bottom-width", nextTD.css("border-top-width"));
			$this.css("border-bottom-color", nextTD.css("border-top-color"));
		});

		// 设置页尾---
		debugger;
		if (this.config && this.config.pageBottom) {
			var trCld = $("#report_report_content").children("table").children(
					"tbody").children("tr");
			// var wb = trCld[trCld.length - 2];
			// $(wb).clone().appendTo(mainClone.children("table").children("tbody"));
			for ( var j = this.config.pageBottom.end; j >= this.config.pageBottom.start; j--) {
				var wb = trCld[trCld.length - j - 1];
				$(wb).clone().appendTo(
						mainClone.children("table").children("tbody"));
			}
			// --------
		}
		debugger;
		if(i>0){
			// 设置页头---
			if (this.config && this.config.pageHead) {
				var trCld = $("#report_report_content").children("table").children(
						"tbody").children("tr");
				for ( var j = this.config.pageHead.end; j >= this.config.pageHead.start; j--) {
					var wb = trCld[j];
					$(wb).clone().prependTo(
							mainClone.children("table").children("tbody"));
				}
				// --------
			}
		}
		mainClone.children("table").css("height", height + "px");
		printHtmls.push(mainClone.html());
	};
	var mainClone = $("#report_report_content").clone();
	var trsClone = mainClone.children("table").children("tbody").children("tr");
	var height = 0;
	for ( var j = 0; j < trs.length; j++) {
		if (j <= trIndexs[breakTrs.length - 1])
			$(trsClone[j]).remove();
		else
			height = height + parseFloat($(trs[j]).attr("height"));
	}
	// 设置页头---
	if (this.config && this.config.pageHead) {
		var trCld = $("#report_report_content").children("table").children(
				"tbody").children("tr");
		for ( var i = this.config.pageHead.end; i >= this.config.pageHead.start; i--) {
			var wb = trCld[i];
			$(wb).clone().prependTo(
					mainClone.children("table").children("tbody"));
		}
		// --------
	}
	mainClone.children("table").css("height", height + "px");
	printHtmls.push(mainClone.html());
	webPrintTemplate.printHtmls = printHtmls;
};
webPrintTemplate.beforePrint = function() {
	var config = justep.xbl("report")._config;
	config.forceBreak = true;
	if (!webPrintTemplate.__setPage) {
		webPrintTemplate.__setPage = true;
		// 补齐
		var pageTrs = $("tr[break-after='page']")
				.each(
						function() {
							if (config.forceBreak)
								return;
							var tr = $(this), clone = tr.clone(), nextTR = tr
									.next()[0];
							clone.insertAfter(tr).attr("break-after", "").attr(
									"height", 0).height(0);
							clone.children("td").each(function() {
								$(this).height(0).html("");
							});
							tr
									.children("td")
									.each(
											function() {
												var $this = $(this), nextTD = $(
														"td:eq("
																+ this.cellIndex
																+ ")", nextTR);
												$this
														.css(
																"border-bottom-style",
																nextTD
																		.css("border-top-style"));
												$this
														.css(
																"border-bottom-width",
																nextTD
																		.css("border-top-width"));
												$this
														.css(
																"border-bottom-color",
																nextTD
																		.css("border-top-color"));
											});
						});//
		if (config.forceBreak)
			this.initPage();
		else
			pageTrs.css("page-break-after", "always");
	}
	;
	// 设置打印
	var LODOP = this.lodop;
	LODOP.SET_LICENSES("西安博通资讯股份有限公司", "896C5C89FAE17DE99D78DBE47E83CAE9", "",
			"");
	// LODOP.PRINT_INITA(0, 0, 500, 500, "报表");
	LODOP.PRINT_INIT("报表");
	var right = "RightMargin:" + config.page.marginRight;
	var bottom = "BottomMargin:" + config.page.marginBottom;
	var orientation = 1;
	if (config.page.orientation == "Landscape")
		orientation = 2;
	if (orientation == 1)
		LODOP.SET_PRINT_PAGESIZE(orientation, config.page.pageWidth,
				config.page.pageHeight, "");
	else
		LODOP.SET_PRINT_PAGESIZE(orientation, config.page.pageHeight,
				config.page.pageWidth, "");
	if (config.forceBreak) {
		for ( var i = 0; i < this.printHtmls.length; i++) {
			var html = this.printHtmls[i];
			var curPage= i+1;
			var  ym = "第"+curPage+"页　　共"+this.printHtmls.length+"页";
			html=html.replace("页码",ym);
			LODOP.ADD_PRINT_HTM(config.page.marginTop, config.page.marginLeft,
					right, bottom, html);
			LODOP.NEWPAGEA();
		}
	} else
		LODOP.ADD_PRINT_HTM(config.page.marginTop, config.page.marginLeft,
				right, bottom, $("#report_report_content").html());
	LODOP.SET_SHOW_MODE("NP_NO_RESULT", true);
	LODOP.SET_SHOW_MODE("LANDSCAPE_DEFROTATED", true);
	LODOP.SET_PRINT_MODE("AUTO_CLOSE_PREWINDOW", true);
	LODOP.SET_PRINT_MODE("RESELECT_PRINTER", true);
	LODOP.SET_PRINT_MODE("RESELECT_PAGESIZE", true);
	LODOP.SET_PRINT_MODE("RESELECT_ORIENT", true);
	LODOP.SET_PRINT_MODE("RESELECT_COPIES", true);

	//LODOP.SET_PRINT_STYLE("ItemType", 2);
	//LODOP.SET_PRINT_STYLE("FontSize", 13);
	// LODOP.SET_PRINT_STYLE("Bold", 1);
	//LODOP.ADD_PRINT_TEXT(685, 800, 200, 22, "第#页/共&页");
	if (config.page.printer)
		LODOP.SET_PRINTER_INDEXA(config.page.printer);

};
webPrintTemplate.pagePrintClick = function(event) {
	this.beforePrint();
	this.lodop.PRINT();
};

webPrintTemplate.btnPreviewClick = function(event) {
	this.beforePrint();
	this.lodop.PREVIEW();
};

webPrintTemplate.btnSelPrinterClick = function(event) {
	justep.xbl("report")._config.page.printer = this.lodop.SELECT_PRINTER();
};

webPrintTemplate.getSrc = function() {
	var url = justep.xbl("report")._config.cacheFile;
	url = url.replace(new RegExp("%2F", "gm"), "/");
	return url;
};

webPrintTemplate.btnSaveSetClick = function(event) {
	var dsSet = justep.xbl("dsPrintSet");
	if (dsSet.getCount() == 0)
		dsSet.newData();
	dsSet.setValue("fKind", "打印设置");
	var page = justep.xbl("report")._config.page;
	var LODOP = this.lodop;
	var printer = justep.xbl("report")._config.page.printer;
	if (printer == null)
		printer = -1;
	page.printer = printer;
	page = JSON.stringify(page);
	dsSet.setValue("fConfig", page);
	var url = this.getSrc();
	dsSet.setValue("fConfigStr", url);
	dsSet.saveData();
	butone.Dialog.info("保存设置成功！");
};

webPrintTemplate.model1ModelConstruct = function(event) {
	// 页头页尾
	this.config = null;
};
