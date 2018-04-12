/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	// 格式化数字型
	var DecimalFormat = function(pattern) {
		this.applyPattern(pattern);
	};
	
	DecimalFormat.SPECIAL_CHARS = [ "0", ".", "-", ",", "E", "%", "\u00A4", "\u2030" ];
	
	DecimalFormat.prototype.applyPattern = function(pattern) {
		if (pattern === undefined) {
			pattern = "";
		}
		function contains(arr, ch) {
			for ( var i = 0; i < arr.length; i++) {
				if (arr[i] == ch) {
					return true;
				}
			}
			return false;
		}
		for ( var i = 0; i < pattern.length; i++) {
			if (!contains(DecimalFormat.SPECIAL_CHARS, pattern.charAt(i))) {
				return;
			}
		}
		this.pattern = pattern;
	};

	DecimalFormat.prototype.format = function(number) {
		if (isNaN(number)) {
			return number;
		}
		var pattern = this.pattern;
		if (!pattern) {
			return number;
		}
		var strNum = "" + number;
		var numNum = parseFloat(number);
		var isNegative = false;
		if (numNum < 0) {
			isNegative = true;
		}
		if (isNegative) {
			strNum = strNum.substring(1, strNum.length);
			numNum = -numNum;
		}
		var pPos = pattern.indexOf("%");
		var cPos = pattern.indexOf(",");
		if (pPos != -1 || (cPos != -1 && pPos != -1)) {
			return number;
		}
		var dPos,dPosOfNum,adStrLength,snbFixed;
		if (pPos != -1) {
			if (pPos != pattern.length - 1) {
				return number;
			}
			pattern = pattern.substring(0, pattern.length - 1);
			numNum = parseFloat(number) * 100;
			strNum = '' + numNum;
			if (isNegative) {
				strNum = strNum.substring(1, strNum.length);
				numNum = -numNum;
			}
		}
		dPos = pattern.indexOf(".");
		dPosOfNum = strNum.indexOf(".");
		var result = "";
		if (dPos != -1) {
			if (dPosOfNum == -1) {
				dPosOfNum = strNum.length - 1;
			}
			adStrLength = pattern.length - dPos;
			snbFixed = parseFloat(strNum).toFixed(adStrLength - 1);
			if (isNegative) {
				result = "-" + snbFixed;
			} else {
				result = snbFixed;
			}
		} else {
			if (dPosOfNum == -1) {
				dPosOfNum = strNum.length - 1;
			}
			snbFixed = parseFloat(strNum).toFixed();
			if (isNegative) {
				result = "-" + snbFixed;
			} else {
				result = snbFixed;
			}
		}
		if (pPos != -1) {
			result += "%";
		}

		// 123456.12==>123,456.12
		var tmp = "";
		var count3 = 0;
		if (cPos != -1 && result.length) {
			dPos = result.indexOf(".");
			for ( var i = result.length - 1; i >= 0; i--) {
				var c = result.charAt(i);
				if (dPos != -1 && i >= dPos) {
					tmp = c + tmp;
				} else {
					if (count3 == 3 && c != "-") {
						count3 = 1;
						tmp = "," + tmp;
					} else {
						count3++;
					}
					tmp = c + tmp;

				}
			}
			result = tmp;
		}

		return result;
	};
	
	return DecimalFormat;
});