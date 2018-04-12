//公共js函数库
// 当前时间
var date = justep.Date.toString(justep.System.datetime(), "yyyy-MM-dd");
var dates = date.split("-");
var button = {};

// 获取当前年份，及当前年份前10年，返回数组
function getYears() {
	var year = dates[0];
	var list = new Array();
	var i = 0;
	while (i > -10) {
		var y = justep.String.toInt(year) + i;
		list.push(y);
		i--;
	}
	return list;
}
// 获取当前年份
function getYear() {
	var year = dates[0];
	return year;
}
// 获取当前季度
function getCurrentQuarter() {
	var month = parseInt(dates[1], 10);
	var quarter = Math.round((month + 1) / 3);
	return quarter;
}
// 获取当前月份
function getCurrentMonth() {
	var month = parseInt(dates[1], 10);
	return month;
}

function roundToThird(pos, val) {
	val = val * 1;
	return val.toFixed(pos * 1);
}

// 获取年份
function getmyYear(datetime) {
	var mydate = justep.Date.toString(justep.Date.fromString(datetime,
			"yyyy-MM-dd"), "yyyy-MM-dd");
	var mydates = mydate.split("-");
	var year = mydates[0];
	return year;
}
// 获取月份
function getmyMonth(datetime) {
	var mydate = justep.Date.toString(justep.Date.fromString(datetime,
			"yyyy-MM-dd"), "yyyy-MM-dd");
	var mydates = mydate.split("-");
	var month = parseInt(mydates[1], 10);
	return month;
}
// 获取日
function getmyDate(datetime) {
	var mydate = justep.Date.toString(justep.Date.fromString(datetime,
			"yyyy-MM-dd"), "yyyy-MM-dd");
	var mydates = mydate.split("-");
	var date = parseInt(mydates[2], 10);
	return date;
}
// 获当前询
function gettenday() {
	var date = parseInt(dates[2], 10);
	var tenday;
	if (date <= 10) {
		tenday = "上旬";
	} else if (date > 10 & date <= 20) {
		tenday = "中旬";
	} else {
		tenday = "下旬";
	}
	return tenday;
}

function messageDialog(msg, title, details, width) {

	var numargs = arguments.length;
	var data;
	if (numargs == 0)
		data = {
			"width" : 600,
			"msg" : "",
			"title" : "提示"
		};
	if (numargs == 1)
		data = {
			"width" : 600,
			"msg" : msg,
			"title" : "提示"
		};
	if (numargs == 2) {
		if (title == "" || title == null)
			title = "提示";
		data = {
			"width" : 600,
			"msg" : msg,
			"title" : title
		};
	}
	if (numargs == 3)
		data = {
			"width" : 600,
			"msg" : msg,
			"details" : details,
			"title" : title
		};
	if (numargs == 4) {
		if (isNaN(parseInt(width)))
			width = 600;
		if (title == "" || title == null)
			title = "提示";
		data = {
			"width" : width,
			"msg" : msg,
			"details" : details,
			"title" : title
		};
	}
	new justep.System.showMessage().open(data);
}

/**
 * 将数值四舍五入(保留2位小数)后格式化成金额形式
 * 
 * @param num
 *            数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.45'
 * @type String
 */
function formatCurrency(num) {
	num = num.toString().replace(/\$|\,/g, '');
	if (isNaN(num))
		num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 100 + 0.50000000001);
	cents = num % 100;
	num = Math.floor(num / 100).toString();
	if (cents < 10)
		cents = "0" + cents;
	for ( var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
		num = num.substring(0, num.length - (4 * i + 3)) + ','
				+ num.substring(num.length - (4 * i + 3));
	return (((sign) ? '' : '-') + num + '.' + cents);
}

/**
 * 将数值四舍五入(保留1位小数)后格式化成金额形式
 * 
 * @param num
 *            数值(Number或者String)
 * @return 金额格式的字符串,如'1,234,567.4'
 * @type String
 */
function formatCurrencyTenThou(num) {
	num = num.toString().replace(/\$|\,/g, '');
	if (isNaN(num))
		num = "0";
	sign = (num == (num = Math.abs(num)));
	num = Math.floor(num * 10 + 0.50000000001);
	cents = num % 10;
	num = Math.floor(num / 10).toString();
	for ( var i = 0; i < Math.floor((num.length - (1 + i)) / 3); i++)
		num = num.substring(0, num.length - (4 * i + 3)) + ','
				+ num.substring(num.length - (4 * i + 3));
	return (((sign) ? '' : '-') + num + '.' + cents);
}
// RAQ调用路径
function getReportURL(param) {
	// var URL = window.location.protocol + "//" + window.location.host
	// + "/RAQ/reportJsp/";
	var URL = "http://10.13.1.236:7001/WZRAQ/reportJsp/";

	// var URL = "http://localhost:6001/demo/reportJsp/";
	URL = URL + param["jsp"] + "?raq=" + param["raq"];
	for ( var x in param) {
		if (x == "jsp" || x == "raq") {
		} else {
			URL = URL + "&" + x + "=" + param[x];
		}
	}
	var width = parent.document.getElementById("functree_owner").clientWidth
			+ document.documentElement.clientWidth - 8;
	var height = document.documentElement.clientHeight - 5;
	URL = URL + "&width=" + width + "&height=" + height;
	return URL;
}
// 获取二级机构的帐套ID
function getAccountID() {
	var sAccountId = "";
	var params = new justep.Request.ActionParam();
	justep.Request.sendBizRequest2({
		action : "ognAccountID",
		dataType : "json",
		parameters : params,
		callback : function(data) {
			if (data.state) {
				sAccountId = data.response;
			}
		}
	});
	return sAccountId;
}
// 获取二级机构的帐套名称
function getAccountName() {
	var accountName = "";
	var params = new justep.Request.ActionParam();
	justep.Request.sendBizRequest2({
		action : "ognAccountName",
		dataType : "json",
		parameters : params,
		callback : function(data) {
			if (data.state) {
				accountName = data.response;
			}
		}
	});
	return accountName;
}
// 获取二级机构的机构权限
function getPermission() {
	var sPermission = "";
	var params = new justep.Request.ActionParam();
	justep.Request.sendBizRequest2({
		action : "ognPermission",
		dataType : "json",
		parameters : params,
		callback : function(data) {
			if (data.state) {
				sPermission = data.response;
			}
		}
	});
	return sPermission;
}
// 获取当前人分管组织机构ID
function getOgnsID() {
	var orgsid = "";
	var params = new justep.Request.ActionParam();
	justep.Request.sendBizRequest2({
		action : "getOgnsID",
		dataType : "json",
		parameters : params,
		callback : function(data) {
			if (data.state) {
				orgsid = data.response;
			}
		}
	});
	return orgsid;
}
// 获取当前人分管部门机构ID
function getDptsID() {
	var dptsid = "";
	var params = new justep.Request.ActionParam();
	justep.Request.sendBizRequest2({
		action : "getDptsID",
		dataType : "json",
		parameters : params,
		callback : function(data) {
			if (data.state) {
				dptsid = data.response;
			}
		}
	});
	return dptsid;
}
// 确认提示
function showConfirm(str, fn) {
	var options = {
		"title" : '提示',
		"img" : "question",
		"type" : 1,
		callback : function(event) {
			if (event.status === "ok") {
				typeof fn == "function" && fn();
			}
		}
	};
	new justep.System.showMessage(options).open({
		msg : str
	});
}
// 提示
function showAlert(str, num) {
	var options = {
		"title" : '提示',
		"img" : num == 0 ? "info" : "right",
		"type" : 0
	};
	new justep.System.showMessage(options).open({
		msg : str
	});
}
// 是否提示，是否都调用函数
function showConfirmForCancel(str, fnYes, fnNo) {

	var options = {
		"title" : '提示',
		"img" : "question",
		"type" : 2,
		callback : function(event) {
			if (event.status === "yes") {
				typeof fnYes == "function" && fnYes();
			} else if (event.status === "no") {
				typeof fnNo == "function" && fnNo();
			}
		}
	};
	new justep.System.showMessage(options).open({
		msg : str
	});
}
// 复杂隐藏
function isDisplay(str, data) {
	var strs = new Array(); // 定义一数组
	strs = str.split(","); // 字符分割
	var res = "";
	res = "var " + data + " = justep.xbl('" + data + "');";
	res = res + "var count = " + data + ".getCount();";
	res = res + "if (count > 0) {";

	for (i = 0; i < strs.length; i++) {
		res = res + "$('#" + strs[i] + "').css('display', '');";
	}
	res = res + "} else {";
	for (i = 0; i < strs.length; i++) {
		res = res + "$('#" + strs[i] + "').css('display', 'none');";
	}
	res = res + "}";
	return res;
}
// 复杂隐藏--count数等于0，显示
function isDisplayEqualToZero(str, data) {
	var strs = new Array(); // 定义一数组
	strs = str.split(","); // 字符分割
	var res = "";
	res = "var " + data + " = justep.xbl('" + data + "');";
	res = res + "var count = " + data + ".getCount();";
	res = res + "if (count == 0) {";

	for (i = 0; i < strs.length; i++) {
		res = res + "$('#" + strs[i] + "').css('display', '');";
	}
	res = res + "} else {";
	for (i = 0; i < strs.length; i++) {
		res = res + "$('#" + strs[i] + "').css('display', 'none');";
	}
	res = res + "}";
	return res;
}
// 简洁隐藏
function isDisplaySimple(str, type) {
	var strs = new Array(); // 定义一数组
	strs = str.split(","); // 字符分割
	var res = "";
	for (i = 0; i < strs.length; i++) {
		res = res + "$('#" + strs[i] + "').css('display', '" + type + "');";
	}
	return res;
}
// 复杂禁灰
function isDisabled(str, data) {
	var strs = new Array(); // 定义一数组
	strs = str.split(","); // 字符分割
	var res = "";
	res = "var " + data + " = justep.xbl('" + data + "');";
	res = res + "var count = " + data + ".getCount();";
	res = res + "if (count > 0) {";

	for (i = 0; i < strs.length; i++) {
		res = res + "justep.xbl('" + strs[i] + "').setDisabled(false);";
	}
	res = res + "} else {";
	for (i = 0; i < strs.length; i++) {
		res = res + "justep.xbl('" + strs[i] + "').setDisabled(true);";
	}
	res = res + "}";
	return res;
}
// 简洁禁灰
function isDisabledSimple(str, type) {
	var strs = new Array(); // 定义一数组
	strs = str.split(","); // 字符分割
	var res = "";
	for (i = 0; i < strs.length; i++) {
		res = res + "justep.xbl('" + strs[i] + "').setDisabled(" + type + ");";
	}
	return res;
}
// 页面边距
function pageMargin() {
	$("body").height($("body").height() - 10).width($("body").width() - 20)
			.css({
				paddingTop : "10px",
				marginRight : "auto",
				marginLeft : "auto"
			});
}
// 无主表不能浏览明细
function pageLook() {
	var event = window.event || arguments.callee.caller.arguments[0];// IE中可以直接使用event对象，而FF中则不可以，解决方法之一如下：
	var dataMaster = justep.xbl("dataMaster");
	var count = dataMaster.getCount();
	if (count == 0) {
		showAlert("没有主数据，不能浏览详细信息！", 0);
		justep.xbl("tabpanel1").setTabActive("tabList");
	}
	event.cancel = true;
}
// 删除任务和流程表数据
function delSa_TaskAndProcessTableAction() {
	var dataMaster = justep.xbl("dataMaster");
	var count = dataMaster.getCount();
	if (count > 0) {
		var id = dataMaster.getCurrentID();
		var table = dataMaster.getConceptAliasName();
		showConfirm("是否删除数据？", function() {
			var parameters = new justep.Request.ActionParam();
			parameters.setString("id", id);
			parameters.setString("table", table);
			justep.Request.sendBizRequest2({
				action : "delSa_TaskAndProcessTableAction",
				dataType : "json",
				parameters : parameters,
				callback : function(data) {
					if (data.state) {
						dataMaster.refreshData();
					}
				}
			});
		});
	} else {
		showAlert("当前列表无数据，不可删除！", 0);
	}
}
// 无主数据跳转
function pageJump() {
	var dataMaster = justep.xbl("dataMaster");
	var count = dataMaster.getCount();
	if (count == 0) {
		justep.xbl("tabpanel1").setTabActive("tabList");
	}
}

function RefreshDictionary(Relation) {
	var dataDictionaryDetail = justep.xbl("dataDictionaryDetail");
	dataDictionaryDetail
			.setFilter(
					"filter1",
					" fMasterID in (select T_Dictionary from T_Dictionary T_Dictionary where T_Dictionary.fName ='"
							+ Relation + "' and T_Dictionary.fUseStatus ='是')");
	dataDictionaryDetail.refreshData();
};

justep.button = function() {
	return {
		ContractionOpen : function() {
			$("#vDetail").slideToggle("slow");
			var str = $("#COTrigger").find("span").text();
			if (str.indexOf("收缩") != -1) {
				$("#COTrigger").find("span").text("展开");
			} else {
				$("#COTrigger").find("span").text("收缩");
			}
		},
		delSa_TaskAndProcessTableAction : function() {
			var dataMaster = justep.xbl("dataMaster");
			var count = dataMaster.getCount();
			if (count > 0) {
				var id = dataMaster.getCurrentID();
				var table = dataMaster.getConceptAliasName();
				showConfirm("是否删除数据？", function() {
					var parameters = new justep.Request.ActionParam();
					parameters.setString("id", id);
					parameters.setString("table", table);
					justep.Request.sendBizRequest2({
						action : "delSa_TaskAndProcessTableAction",
						dataType : "json",
						parameters : parameters,
						callback : function(data) {
							if (data.state) {
								dataMaster.refreshData();
							}
						}
					});
				});
			} else {
				showAlert("当前列表无数据，不可删除！", 0);
			}
		}
	};
}();

function input_text_valid() {
	for ( var i = 0; i < arguments.length; i++) {
		var $p = $("#" + arguments[i]).parent("div");
		if ($("#" + arguments[i]).val()) {
			$p.removeClass("xforms-invalid");
		} else {
			$p.addClass("xforms-invalid");
		}
	}
}

function input_text_func() {
	for ( var i = 0; i < arguments.length; i++) {
		$("#" + arguments[i]).change(function(event) {
			var value = $(this).val();
			var $p = $(this).parent("div");
			if (!value) {
				$p.addClass("xforms-invalid");
			} else {
				$p.removeClass("xforms-invalid");
			}
		});
	}
}

// SA_TASK表过滤
function sa_task_filter() {
	var dataTask1 = justep.xbl("dataTask1");
	var count = dataTask1.getCount();
	var str = "('";
	if (count > 0) {
		for ( var i = 0; i < count; i++) {
			str = str + dataTask1.getValue("sData1", dataTask1.getID(i))
					+ "','";
		}
	}
	str = str + "')";
	return str;
}
function savetriggerstate(data, trigger) {
	var strs = new Array();
	strs = data.split(",");
	var res = "";
	for (i = 0; i < strs.length; i++) {
		res = res + "var " + strs[i] + " = justep.xbl('" + strs[i] + "');";
		res = res + "var id = " + strs[i] + ".getCurrentID();";
		res = res + "var state = " + strs[i] + ".getState(id);";
		var datai = justep.xbl(strs[i]);
		var id = datai.getCurrentID();
		var state = datai.getState(id);
		if (state != 'none') {
			res = res + "justep.xbl('" + trigger + "').setDisabled(false);";
			i = strs.length;
		} else {
			res = res + "justep.xbl('" + trigger + "').setDisabled(true);";
		}
	}
	return res;
}