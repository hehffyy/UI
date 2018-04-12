
/** **组件运行时执行组件运行时JS文件的入口** */
justep.calendarRunTime = function(options) {
	this._create(options);
};

justep.calendarRunTime.prototype = {
		
	_create : function(options) {
		//debugger;
		
		this.currDateTD = null; //记录当前所选单元格的
		this.colorBeforeSelect = ""; // 记录单元格选中前的颜色

		this.todayInfo = getDateInfo(new Date()); //当前系统日期
		this.selectedDateInfo = null; //记录被选中的日期
		
		var component_id = options.domNode.id; //组件的当前id   #00EEEE
		//debugger;
		this.dateTitle = $("#"+component_id+"_dateTitle")[0];//$("#"+component_id+"_dateTitle")[0]==document.getElementById(component_id + "_dateTitle");
		
		this.cnDateInfo = $("#"+component_id+"_cnDateInfo")[0];//$("#"+component_id+"_cnDateInfo")[0]==document.getElementById(component_id + "_cnDateInfo");

		// 显示日期的42个格子的二维数组，用来存放每个格子的id
		this.tid_ary = new Array(); // 先声明一维
		
		// 日期单元格的id转换
		for ( var i = 0; i < 6; i++) {
			var rowAry = new Array();
			this.tid_ary[i] = rowAry; // 再声明二维
			for ( var j = 0; j < 7; j++) {
				var tdId = component_id + "_td" + i + j;
				rowAry.push(tdId);
				var tdNode = document.getElementById(tdId);
				tdNode.onclick = this.tdClick;
			}
		}
		this.defCalendar();
		

	},

	/** ***首次打开页面默认显示的当前系统时间**** */
	defCalendar : function() {
		// 加载今天日期数据 
		var defYear = this.todayInfo[0];
		var defMonth = this.todayInfo[1];
		var defDate = this.todayInfo[2];
		this.calendarStart(defYear, defMonth, defDate);
		this.showDate(defYear, defMonth - 1, defDate);// 显示农历
	},

	
	/** ************ 填充数据日历 ******************** */
	calendarStart : function(theYear, theMonth, theDate) {
		this.cleanCalendar();
		this.setValueToHead(theYear, theMonth, theDate);
		var firstDate = getFirstDay(theYear, theMonth);// 获取当前月的第一天是星期几,返回值是
		var monthLen = getMonthLen(theYear, theMonth); // 获取当前月的天数

		/* 给日历表格中填入日期 */
		var first = 1;
		var i = 0;
		var doBreak = false;
		for (; i < 6; i++) {
			if(doBreak) break;
			if (i == 0) {
				for ( var j = firstDate; j < 7; j++) {
					this.setDateTDValue($("#"+this.tid_ary[i][j]),theYear, theMonth,first);
					first++;
				}
			}
			if (i !== 0) {
				for ( var j = 0; j < 7; j++) {
					this.setDateTDValue($("#"+this.tid_ary[i][j]),theYear, theMonth,first);
					first++;
					if (first > monthLen){
						doBreak = true;
						break;
					}
				}
			}
		}
		for(;i < 6; i++){
			$("#"+this.tid_ary[i][0]).parent().addClass("hiddenTR");
		}
	},
	
	setDateTDValue : function(tdEle,theYear, theMonth, first){
		
		tdEle.html(first);
		if(this.selectedDateInfo && theYear == this.selectedDateInfo[0] && theMonth == this.selectedDateInfo[1] && first == this.selectedDateInfo[2]){
			//tdEle.addClass("selectedTD"); // 设置今天日期被选后变蓝色
		}else if (theYear == this.todayInfo[0] && theMonth == this.todayInfo[1] && first == this.todayInfo[2]) {
			tdEle.addClass("todayTD"); // 设置今天日期为红色
		}
	},

	
	/** ***** 点击上一年，上一月，下一年，下一月,今天按钮到今天时设置今天日期的背景颜色 **** */
	setTodayColor : function(theYear, theMonth, theDate) {
		var defYear = this.todayInfo[0];
		var defMonth = this.todayInfo[1];
		var defDate = this.todayInfo[2];

		if (this.tid !== "") {
			document.getElementById(this.tid).bgColor = this.tbgColor;// 还原被选单元格的背景色
		}
		;
		document.getElementById(this.curid).bgColor = this.curColor;

		if (defYear == theYear && defMonth == theMonth) {
			document.getElementById(this.curid).bgColor = "#FF4500";
		} else {
			return;
		}

		this.setValueToHead(defYear, defMonth, defDate);
	},

	/** ************ 得到当前显示的日期 ******************** */
	getCurShowDate : function() {
		var curDate_show = this.dateTitle.innerHTML;
		var curDateArray = curDate_show.split("-");

		curDateArray[0] = parseInt(curDateArray[0], 10);
		curDateArray[1] = parseInt(curDateArray[1], 10);
		curDateArray[2] = parseInt(curDateArray[2], 10);

		return curDateArray;
	},

	/** ************ 设置日历头的值******************** */
	setValueToHead : function(theYear, theMonth, theDate) {
		if (theMonth < 10 && theDate < 10) {
			this.dateTitle.innerHTML = theYear + "-0" + theMonth + "-0"
					+ theDate;
		} else if (theMonth < 10 && theDate >= 10) {
			this.dateTitle.innerHTML = theYear + "-0" + theMonth + "-"
					+ theDate;
		} else if (theMonth >= 10 && theDate < 10) {
			this.dateTitle.innerHTML = theYear + "-" + theMonth + "-0"
					+ theDate;
		} else {
			this.dateTitle.innerHTML = theYear + "-" + theMonth + "-" + theDate;
		}

		this.showDate(theYear, theMonth - 1, theDate);// 显示农历
	},

	/** ************ 清理日历中的值 ******************** */
	cleanCalendar : function() {
		for ( var i = 0; i < 6; i++) {
			var tdDate;
			for ( var j = 0; j < 7; j++) {
				tdDate = $("#"+this.tid_ary[i][j]);
				tdDate.html("");
				tdDate.removeClass("selectedTD").removeClass("todayTD");
				
			}
			tdDate.parent().removeClass("hiddenTR"); 
		}
	},
	
	/** ***单元格单击事件**** */
	tdClick : function(event) {
		//debugger;
		/*justep.XBLObject getXBLObject( element) 
		获取指定节点对应的Javascript对象, 如果当前节点没有绑定Javascript对象, 获取它的父节点的, 直到找到为止. 
		Parameters: element 从哪个节点开始找，默认从当前节点开始找 
		Returns: {justep.XBLObject} */

		var xblObj = justep.XBLObject.getXBLObject(event.target);
		
		    xblObj.selectDateTd(event.currentTarget);
	},

	/** ************ 点击单元格逻辑处理 ******************** */
	selectDateTd : function(currentTarget) {
		var curDateArray = this.getCurShowDate(); //dateTitle
		var curYear = curDateArray[0];
		var curMonth = curDateArray[1];
		
		var theDate = currentTarget.innerHTML;
		//alert(theDate);
		if (theDate == "")
			return;
		
		if (theDate !== "") {
			//debugger;
			if (this.currDateTD) {
				//还原为选中前颜色
				$("#" + this.currDateTD.id).removeClass("selectedTD");
			} 
			this.currDateTD = currentTarget; // 记录当前单元格
			$("#" + currentTarget.id).addClass("selectedTD");
			
			this.setValueToHead(curYear, curMonth, parseInt(theDate, 10));//dateTitle
			this.selectedDateInfo = [curYear,curMonth,parseInt(theDate, 10)];
		};
	},

	/** ************ 今天按钮 ******************** */
	todayButton : function() {
		var curDateArray = this.getCurShowDate();// 当前选中的时间
		var curYear = curDateArray[0];
		var curMonth = curDateArray[1];
		var curDate = curDateArray[2];

		var defYear = this.todayInfo[0];// 系统当前时间
		var defMonth = this.todayInfo[1];
		var defDate = this.todayInfo[2];

		if (curYear == defYear && curMonth == defMonth) {
			this.setValueToHead(defYear, defMonth, defDate);
		} else {
			this.defCalendar();
		}
		if(this.currDateTD){
			
			$("#" + this.currDateTD.id).removeClass("selectedTD");
			}
			
		
		//this.setTodayColor(defYear, defMonth, defDate);
	},

	

	/** ************ 上一年按钮 ******************** */
	prevYearButton : function() {

		var curDateArray = this.getCurShowDate();
		var prevYear = curDateArray[0] - 1;
		var curMonth = curDateArray[1];
		var curDate = 1;

		this.calendarStart(prevYear, curMonth, curDate);

		//this.setTodayColor(prevYear, curMonth, curDate);
	},

	/** ************ 上个月按钮 ******************** */
	prevMonthButton : function() {

		var curDateArray = this.getCurShowDate();

		var curYear = curDateArray[0];
		var prevMonth = curDateArray[1] - 1;
		var curDate = 1;
		if (prevMonth < 1) {
			--curYear;
			prevMonth = 12;
		}
		;

		this.calendarStart(curYear, prevMonth, curDate);
		//this.setTodayColor(curYear, prevMonth, curDate);
	},

	/** ************ 下个月按钮 ******************** */
	nextMonthButton : function() {
		var curDateArray = this.getCurShowDate();

		var curYear = curDateArray[0];
		var nextMonth = curDateArray[1] + 1;
		var curDate = 1;
		if (nextMonth > 12) {
			++curYear;
			nextMonth = 1;
		}
		;

		this.calendarStart(curYear, nextMonth, curDate);

		//this.setTodayColor(curYear, nextMonth, curDate);
	},

	/** ************ 下一年按钮 ******************** */
	nextYearButton : function() {

		var curDateArray = this.getCurShowDate();

		var nextYear = curDateArray[0] + 1;
		var curMonth = curDateArray[1];
		var curDate = 1;
		this.calendarStart(nextYear, curMonth, curDate);

		//this.setTodayColor(nextYear, curMonth, curDate);
	},

	/** ************ 计算农历时间 ******************** */
	showDate : function(theYear, theMonth, theDate) {
		var now = new Date(theYear, theMonth, theDate);
		/*var show = YYMMDD(now, theYear, theMonth, theDate);
		show = show + "   " + weekday(now);
		show = show + "   " + solarDay2(theYear, theMonth, theDate);*/
		this.cnDateInfo.innerHTML = "农历：" + solarDay2_1(theYear, theMonth, theDate);
	}
};


/** ************ 获取当前年，当前月，当前日的值 ******************** */
function getDateInfo(theDate) {
	var dateArray = new Array();
	
	var curYear = theDate.getFullYear();// 获取当前年
	var curMonth = theDate.getMonth() + 1;// 获取当前月
	var curDate = theDate.getDate(); // 获取当前日

	dateArray[0] = curYear;
	dateArray[1] = curMonth;
	dateArray[2] = curDate;

	return dateArray;
};

/** ************ 取得指定月份共有几天 ******************** */
function getMonthLen(theYear, theMonth) {
	theMonth--;
	var oneDay = 1000 * 60 * 60 * 24;
	var thisMonth = new Date(theYear, theMonth, 1);
	var nextMonth = new Date(theYear, theMonth + 1, 1);
	var len = Math.ceil((nextMonth.getTime() - thisMonth.getTime()) / oneDay);
	return len;
};

/** ************ 取得指定月份的第一天为星期几 ******************** */
function getFirstDay(theYear, theMonth) {
	var firstDate = new Date(theYear, theMonth - 1, 1);
	return firstDate.getDay();
};

var lunarInfo = new Array(0x04bd8, 0x04ae0, 0x0a570, 0x054d5, 0x0d260, 0x0d950,
		0x16554, 0x056a0, 0x09ad0, 0x055d2, 0x04ae0, 0x0a5b6, 0x0a4d0, 0x0d250,
		0x1d255, 0x0b540, 0x0d6a0, 0x0ada2, 0x095b0, 0x14977, 0x04970, 0x0a4b0,
		0x0b4b5, 0x06a50, 0x06d40, 0x1ab54, 0x02b60, 0x09570, 0x052f2, 0x04970,
		0x06566, 0x0d4a0, 0x0ea50, 0x06e95, 0x05ad0, 0x02b60, 0x186e3, 0x092e0,
		0x1c8d7, 0x0c950, 0x0d4a0, 0x1d8a6, 0x0b550, 0x056a0, 0x1a5b4, 0x025d0,
		0x092d0, 0x0d2b2, 0x0a950, 0x0b557, 0x06ca0, 0x0b550, 0x15355, 0x04da0,
		0x0a5d0, 0x14573, 0x052d0, 0x0a9a8, 0x0e950, 0x06aa0, 0x0aea6, 0x0ab50,
		0x04b60, 0x0aae4, 0x0a570, 0x05260, 0x0f263, 0x0d950, 0x05b57, 0x056a0,
		0x096d0, 0x04dd5, 0x04ad0, 0x0a4d0, 0x0d4d4, 0x0d250, 0x0d558, 0x0b540,
		0x0b5a0, 0x195a6, 0x095b0, 0x049b0, 0x0a974, 0x0a4b0, 0x0b27a, 0x06a50,
		0x06d40, 0x0af46, 0x0ab60, 0x09570, 0x04af5, 0x04970, 0x064b0, 0x074a3,
		0x0ea50, 0x06b58, 0x055c0, 0x0ab60, 0x096d5, 0x092e0, 0x0c960, 0x0d954,
		0x0d4a0, 0x0da50, 0x07552, 0x056a0, 0x0abb7, 0x025d0, 0x092d0, 0x0cab5,
		0x0a950, 0x0b4a0, 0x0baa4, 0x0ad50, 0x055d9, 0x04ba0, 0x0a5b0, 0x15176,
		0x052b0, 0x0a930, 0x07954, 0x06aa0, 0x0ad50, 0x05b52, 0x04b60, 0x0a6e6,
		0x0a4e0, 0x0d260, 0x0ea65, 0x0d530, 0x05aa0, 0x076a3, 0x096d0, 0x04bd7,
		0x04ad0, 0x0a4d0, 0x1d0b6, 0x0d250, 0x0d520, 0x0dd45, 0x0b5a0, 0x056d0,
		0x055b2, 0x049b0, 0x0a577, 0x0a4b0, 0x0aa50, 0x1b255, 0x06d20, 0x0ada0);

var Animals = new Array("鼠", "牛", "虎", "兔", "龙", "蛇", "马", "羊", "猴", "鸡", "狗",
		"猪");
var Gan = new Array("甲", "乙", "丙", "丁", "戊", "己", "庚", "辛", "壬", "癸");
var Zhi = new Array("子", "丑", "寅", "卯", "辰", "巳", "午", "未", "申", "酉", "戌", "亥");

/*
 * var now = new Date();
 * 
 * var SY = now.getYear(); var SM = now.getMonth(); //alert(SM); var SD =
 * now.getDate();
 */

// ==== 传入 offset 传回干支, 0=甲子
function cyclical(num) {
	return (Gan[num % 10] + Zhi[num % 12]);
};

// ==== 传回农历 y年的总天数
function lYearDays(y) {
	// debugger;
	var i, sum = 348;
	for (i = 0x8000; i > 0x8; i >>= 1) {
		sum += (lunarInfo[y - 1900] & i) ? 1 : 0;
	}
	return (sum + leapDays(y));
}

// ==== 传回农历 y年闰月的天数
function leapDays(y) {
	if (leapMonth(y)) {
		return ((lunarInfo[y - 1900] & 0x10000) ? 30 : 29);
	} else {
		return (0);
	}
	;

};

// ==== 传回农历 y年闰哪个月 1-12 , 没闰传回 0
function leapMonth(y) {
	return (lunarInfo[y - 1900] & 0xf);
}

// ========= 传回农历 y年m月的总天数
function monthDays(y, m) {
	return ((lunarInfo[y - 1900] & (0x10000 >> m)) ? 30 : 29);
}

// ==== 算出农历, 传入日期物件, 传回农历日期物件
// 该物件属性有 .year .month .day .isLeap .yearCyl .dayCyl .monCyl
function Lunar(objDate) {
	var i, leap = 0, temp = 0;
	var baseDate = new Date(1900, 0, 31);
	var offset = (objDate - baseDate) / 86400000;

	this.dayCyl = offset + 40;
	this.monCyl = 14;

	for (i = 1900; i < 2050 && offset > 0; i++) {
		temp = lYearDays(i);
		offset -= temp;
		this.monCyl += 12;
	}
	if (offset < 0) {
		offset += temp;
		i--;
		this.monCyl -= 12;
	}

	this.year = i;
	this.yearCyl = i - 1864;

	leap = leapMonth(i); // 闰哪个月
	this.isLeap = false;

	for (i = 1; i < 13 && offset > 0; i++) {
		// 闰月
		if (leap > 0 && i == (leap + 1) && this.isLeap == false) {
			--i;
			this.isLeap = true;
			temp = leapDays(this.year);
		} else {
			temp = monthDays(this.year, i);
		}

		// 解除闰月
		if (this.isLeap == true && i == (leap + 1))
			this.isLeap = false;

		offset -= temp;
		if (this.isLeap == false)
			this.monCyl++;
	}

	if (offset == 0 && leap > 0 && i == leap + 1)
		if (this.isLeap) {
			this.isLeap = false;
		} else {
			this.isLeap = true;
			--i;
			--this.monCyl;
		}

	if (offset < 0) {
		offset += temp;
		--i;
		--this.monCyl;
	}

	this.month = i;
	this.day = offset + 1;
}

function YYMMDD(now, SY, SM, SD) {
	var cl = '';
	if (now.getDay() == 0)
		cl = '';
	if (now.getDay() == 6)
		cl = '';
	return (cl + SY + '年' + (SM + 1) + '月' + SD + '日');
}

function weekday(now) {
	var day = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
	var cl = '';
	if (now.getDay() == 0)
		cl = '';
	if (now.getDay() == 6)
		cl = '';
	return (cl + day[now.getDay()] + '');
}

// ==== 中文日期
function cDay(m, d) {
	var nStr1 = new Array('日', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十');
	var nStr2 = new Array('初', '十', '廿', '卅', '　');
	var s;
	if (m > 10) {
		s = '十' + nStr1[m - 10];
	} else {
		s = nStr1[m];
	}
	s += '月  ';
	switch (d) {
	case 10:
		s += '初十';
		break;
	case 20:
		s += '二十';
		break;
	case 30:
		s += '三十';
		break;
	default:
		s += nStr2[Math.floor(d / 10)];
		s += nStr1[d % 10];
	}
	return (s);
}

// 返回如：“属相：蛇 壬戌月 辛未日 ” 的值
function solarDay1() {
	var sDObj = new Date(SY, SM, SD);
	var lDObj = new Lunar(sDObj);
	var cl = '';
	var tt = '属相：' + Animals[(SY - 4) % 12] + '&nbsp;' + cyclical(lDObj.monCyl)
			+ ' 月 ' + cyclical(lDObj.dayCyl++) + '日';
	return (cl + tt + '');
}

// 返回如：“癸巳年 九月廿八日 ” 的值
function solarDay2(SY, SM, SD) {
	var sDObj = new Date(SY, SM, SD);
	var lDObj = new Lunar(sDObj);
	var cl = '';
	// 农历BB'+(cld[d].isLeap?'闰 ':' ')+cld[d].lMonth+' 月 '+cld[d].lDay+' 日
	var tt = cyclical(SY - 1900 + 36) + '年 ' + cDay(lDObj.month, lDObj.day)
			+ ' 日 ';
	return (cl + tt + '');
}
//返回如：“ 九月廿八日 ” 的值
function solarDay2_1(SY, SM, SD) {
	var sDObj = new Date(SY, SM, SD);
	var lDObj = new Lunar(sDObj);
	var cl = '';
	// 农历BB'+(cld[d].isLeap?'闰 ':' ')+cld[d].lMonth+' 月 '+cld[d].lDay+' 日
	var tt =  cDay(lDObj.month, lDObj.day);
			//+ '日 ';
	return (cl + tt + '');
}
// 返回节气，国历节日的
/*
 * function solarDay3() { var sTermInfo = new Array(0, 21208, 42467, 63836,
 * 85337, 107014, 128867, 150921, 173149, 195551, 218072, 240693, 263343,
 * 285989, 308563, 331033, 353350, 375494, 397447, 419210, 440795, 462224,
 * 483532, 504758); var solarTerm = new Array("小寒", "大寒", "立春", "雨水", "惊蛰",
 * "春分", "清明", "谷雨", "立夏", "小满", "芒种", "夏至", "小暑", "大暑", "立秋", "处暑", "白露", "秋分",
 * "寒露", "霜降", "立冬", "小雪", "大雪", "冬至"); var lFtv = new Array("0101*春节", "0115
 * 元宵节", "0505 端午节", "0707 七夕情人节", "0715 中元节", "0815 中秋节", "0909 重阳节", "1208
 * 腊八节", "1224 小年", "0100*除夕"); var sFtv = new Array("0101*元旦", "0202 世界湿地日",
 * "0210 国际气象节", "0214 情人节", "0303 全国爱耳日", "0308 妇女节", "0312 植树节", "0314 国际警察日",
 * "0315 消费者权益日", "0401 愚人节", "0407 世界卫生日", "0422 世界地球日", "0501 国际劳动节", "0504
 * 青年节", "0508 世界红十字日", "0512 护士节", "0531 世界无烟日", "0601 国际儿童节", "0605 世界环境日",
 * "0701 建党节", "0711 世界人口日", "0801 建军节", "0808 父亲节", "0910 教师节", "0917 国际和平日",
 * "0928 孔子诞辰", "1001*国庆节", "1006 老人节", "1009 世界邮政日", "1024 联合国日", "1031 万圣节",
 * "1112 孙中山诞辰", "1128 感恩节", "1201 世界艾滋病日", "1220 澳门回归纪念", "1225 圣诞节", "1226
 * 毛泽东诞辰");
 * 
 * var sDObj = new Date(SY, SM, SD); var lDObj = new Lunar(sDObj); var lDPOS =
 * new Array(3); var festival = '', solarTerms = '', solarFestival = '',
 * lunarFestival = '', tmp1, tmp2; // 农历节日 for (i in lFtv) if
 * (lFtv[i].match(/^(\d{2})(.{2})([\s\*])(.+)$/)) { tmp1 = Number(RegExp.$1) -
 * lDObj.month; tmp2 = Number(RegExp.$2) - lDObj.day; if (tmp1 == 0 && tmp2 ==
 * 0) lunarFestival = RegExp.$4; } // 国历节日 for (i in sFtv) if
 * (sFtv[i].match(/^(\d{2})(\d{2})([\s\*])(.+)$/)) { tmp1 = Number(RegExp.$1) -
 * (SM + 1); tmp2 = Number(RegExp.$2) - SD; if (tmp1 == 0 && tmp2 == 0)
 * solarFestival = RegExp.$4; } // 节气 tmp1 = new Date( (31556925974.7 * (SY -
 * 1900) + sTermInfo[SM * 2 + 1] * 60000) + Date.UTC(1900, 0, 6, 2, 5)); tmp2 =
 * tmp1.getUTCDate(); if (tmp2 == SD) solarTerms = solarTerm[SM * 2 + 1]; tmp1 =
 * new Date((31556925974.7 * (SY - 1900) + sTermInfo[SM * 2] * 60000) +
 * Date.UTC(1900, 0, 6, 2, 5)); tmp2 = tmp1.getUTCDate(); if (tmp2 == SD)
 * solarTerms = solarTerm[SM * 2];
 * 
 * if (solarTerms == '' && solarFestival == '' && lunarFestival == '') festival =
 * ''; else festival = '' + '' + solarTerms + ' ' + solarFestival + ' ' +
 * lunarFestival + '' + '';
 * 
 * var cl = ''; return (cl + festival + ''); }
 */
/** *********计算农历时间结束*********** */

