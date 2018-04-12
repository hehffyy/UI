var unitTransform = {};

getAfterPressText = function(e, text) {
	var src = e.srcElement || e.target;

	if (justep.Browser.IE && !justep.Browser.IE11) {
		var selRange = document.selection.createRange();
		var selTxt = selRange.text;// 选中的文本
		var srcRange = src.createTextRange();
		var srcText = srcRange.text;
		selRange.setEndPoint("StartToStart", srcRange);
		var beforeTxt = selRange.text;// 插入字符前的文本
	} else {
		var selTxt = window.getSelection().toString();// 选中的文本
		var srcRange = src.selectionEnd;
		var srcText = src.value;
		var beforeTxt = src.value.substring(0, srcRange);
	}

	var insertTxt = text || String.fromCharCode(e.keyCode);// 插入字符
	var afterTxt = srcText.substr(beforeTxt.length);// 插入字符后的文本
	var txt = beforeTxt.substr(0, beforeTxt.length - selTxt.length) + insertTxt
			+ afterTxt;
	return txt;
};

function testNumber(val) {
	return /(^-?$)|(^-?[0-9]*([.]?[0-9]*)?$)/.test(val);
}

unitTransform.recevierReceive = function(event) {
	this.unitFieldManager = event.data.unitFieldManager;
	this._createUnitTypeInputRow(event.data.unitType, event.data.value,
			event.data.unitName, event.data.readonly);
};

unitTransform._createUnitTypeInputRow = function(type, value, unitName,
		readonly) {
	var me = this, table = $("#tableInput").empty();
	var unitType = me.unitFieldManager.unitTypeDefines[type];
	me.defaultUnitName = unitName;
	for ( var n in unitType.names) {
		var to = unitType.names[n];
		var row = '<tr><td height="30px" style="width:100px;text-align:center;'
				+ (unitName == to ? "color:blue;" : "")
				+ '">'
				+ to
				+ '</td><td width="*"><input class="xui-input '
				+ (readonly ? "xforms-readonly" : "")
				+ '" style="width:100%;" unitName="'
				+ to
				+ '" type="text" value="'
				+ (value ? me.unitFieldManager.transform(type, value, unitName,
						to) : "") + '"></td><td style="width:10px"></td></tr>';
		table.append(row);
	}

	$("input", table)
			.attr("readonly", readonly)
			.keypress(function(e) {
				var keyCode = null;
				var cbd = window.clipboardData || e.clipboardData;
				if (e.type == "paste" && cbd)
					keyCode = cbd.getData('text');

				var txt = getAfterPressText(e, keyCode);
				e.returnValue = testNumber(txt);
				if (!justep.Browser.FF && !e.returnValue)
					e.keyCode = 0;
				return e.returnValue;
			})
			.keyup(
					function(event) {
						var input = $(this), currValue = parseFloat(input.val()), currUnitName = input
								.attr("unitName");
						var others = input.parents("tr").siblings();
						others.each(function(index, element) {
							var other = $("input", this);
							if (isNaN(currValue)) {
								other.val("");
							} else {
								var val = me.unitFieldManager.transform(type,
										currValue, currUnitName, other
												.attr("unitName"));
								other.val(val);
							}
						});
					});
};

unitTransform.trigger5Click = function(event) {
	var currValue = parseFloat($(
			"input[unitName='" + this.defaultUnitName + "']", "#tableInput")
			.val());
	if (isNaN(currValue)) {
		butone.Dialog.error("数据格式错误");
		return;
	}
	justep.xbl("recevier").windowEnsure({
		value : currValue
	});
};

unitTransform.trigger4Click = function(event) {
	justep.xbl("recevier").windowCancel();
};
