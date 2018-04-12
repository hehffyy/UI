var printTemplate = {};
var printTemplate = {
	"bizDatas" : [],
	"createUnitFieldManager" : false,
	"id" : "zdInfoReport",
	"lookupFilters" : [],
	"mainData" : {},
	"readOnlys" : [],
	"refreshAfterNew" : []
};

printTemplate.sysReceiverReceive = function(event) {
	var me = this, callInit = function() {
		delete me._fromCreatePromise;
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
						if (variables == "")
							variables = vars[i];
						else
							variables = variables + "," + vars[i];
					}
					data.setStringVar("variables", vars);
				}
			}
		}
		justep.xbl("report").refresh();
		if (me.initForm)
			me.initForm(event.data);
		me.form.init(event.data);
		justep.xbl('sysReceiver').sendData({
			source : me.form,
			kind : "initFinish"
		});
	};
	require([ "jquery" ], function(a) {
		!me._fromCreatePromise && (me._fromCreatePromise = a.Deferred());
		me._fromCreatePromise.then(callInit);
	});

};

printTemplate.model1ModelConstruct = function(event) {
	var me = this;
	require(
			[ "jquery", "base/core/template/default/statictemplate/staticForm" ],
			function(a, b) {
				me.form = new b(me, window);
				me._fromCreatePromise || (me._fromCreatePromise = a.Deferred());
				me._fromCreatePromise.resolve()
			});
};

printTemplate.model1UnLoad = function(event) {
	this.form.destroy();
};

printTemplate.model1XBLLoaded = function(event) {

	var ReportPrint = function(domNode) {
		this.pageIndex = -1;
		this.pageCount = 0;
		this.overridePrint = false;
		this.reportId = $(domNode).attr("id");
		var me = this;
		me.$pageInfo = $("#pageInfo");
		me.$reportTable = $("#" + this.reportId + "_report_content>table:eq(0)");
		debugger;
		if (me.$reportTable.length == 0) {
			$("#" + this.reportId + "_report_content").bind('DOMNodeInserted',
					function(e) {
						if ($(this).children("table").length > 0)
							me.init();
					});
		} else {
			me.init();
		}

	};

	ReportPrint.prototype = {

		init : function() {
			debugger;
			var me = this;
			me.pageCount = 1;
			me.$reportTable = $("#" + me.reportId
					+ "_report_content>table:eq(0)");
			$("#" + me.reportId).css({
				width : (me.$reportTable.outerWidth() + 2) + "px",
				margin : "0 auto"
			});

			me.$reportTable.attr("id", me.reportId + "_report_content_table");

			me.pageHeights = [];
			var breaks = $("tr[break-after='page']", me.$reportTable).each(
					function() {
						var c = me.reportId + "_page" + (me.pageCount - 1);
						var h = 0;
						var $b = $(this).addClass(c).prevUntil(
								"[break-after='page']").each(function() {
							var $tr = $(this);
							$tr.addClass(c);
							h += $tr.outerHeight();
						});
						h += $b.outerHeight();
						me.pageHeights.push(h);
						me.pageCount++;
					});
			var c = me.reportId + "_page" + (me.pageCount - 1);
			var h = 0;

			$(breaks[breaks.length - 1]).nextAll().each(function() {
				var $tr = $(this);
				h += $tr.outerHeight();
				$tr.addClass(c);
			});
			me.pageHeights.push(h);
			me.to(0);
		},

		prev : function() {
			if (this.pageIndex > 0) {
				this.to(this.pageIndex - 1);
			}
		},
		next : function() {
			if (this.pageIndex < this.pageCount - 1) {
				this.to(this.pageIndex + 1);
			}
		},
		to : function(index) {
			if (index >= 0 && index < this.pageCount && index != this.pageIndex) {
				this.$pageInfo.html((index + 1) + "/" + this.pageCount);
				this.pageIndex = index;
				for ( var n = 0; n < this.pageCount; n++) {
					var page = $("tr." + this.reportId + "_page" + n,
							this.$reportTable);
					if (n == index) {
						page.show();
					} else {
						page.hide();
					}
				}
				this.$reportTable.css("height",
						this.pageHeights[this.pageIndex]);
			}
		},

		setPageSetup : function(pageSetup) {
			butone.HtmlPrint.setPageSetup({
				header : "",
				footer : "",
				margin_bottom : pageSetup.marginBottom,
				margin_left : pageSetup.marginLeft,
				margin_right : pageSetup.marginRight,
				margin_top : pageSetup.marginTop,
				Shrink_To_Fit : "no",
				Print_Background : "no"
			});
		},

		print : function() {
			this.setPageSetup(justep.xbl(this.reportId)._config.page);
			butone.HtmlPrint.printForm([ this.reportId ], function() {
			}, true);
		},

		preview : function() {
			this.setPageSetup(justep.xbl(this.reportId)._config.page);
			butone.HtmlPrint.printPreview([ this.reportId ], function() {
			}, false);
		}

	};

	this.reportPrint = new ReportPrint(justep.xbl("report").domNode);
};

printTemplate.pagePrevClick = function(event) {
	this.reportPrint.prev();
};

printTemplate.pageNextClick = function(event) {
	this.reportPrint.next();
};

printTemplate.pagePrintClick = function(event) {
	this.reportPrint.print();
};
