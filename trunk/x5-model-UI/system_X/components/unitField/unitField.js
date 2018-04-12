(function(global) {

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
		var txt = beforeTxt.substr(0, beforeTxt.length - selTxt.length)
				+ insertTxt + afterTxt;
		return txt;
	};

	function testNumber(val) {
		return /(^-?$)|(^-?[0-9]*([.]?[0-9]*)?$)/.test(val);
	}

	// 初始化构造函数
	var unitField = function(xblObject) {
		var me = this, $C = $(xblObject.domNode), id = $C.attr("id");

		me.$display = $("#" + id + "_text");
		me.$trigger = $("#" + id + "_trigger");
		me._refOutput = justep.xbl(id + "_ref");

		me.$display.blur(function() {
			me._setDisplayText($(this).val());
		});
		me.$display.keydown(function(event) {
			if (event.keyCode == 13) {
				me._setDisplayText($(this).val());
			}
		});

		me.$display.bind("paste", function(e) {
			var keyCode = null;
			var cbd = window.clipboardData || e.clipboardData;
			if (e.type == "paste" && cbd)
				keyCode = cbd.getData('text');
			var txt = getAfterPressText(e, keyCode);
			e.returnValue = testNumber(txt);
			if (!justep.Browser.FF && !e.returnValue)
				e.keyCode = 0;
			return e.returnValue;
		});

		me.$display.keypress(function(e) {
			var keyCode = null;
			var cbd = window.clipboardData || e.clipboardData;
			if (e.type == "paste" && cbd)
				keyCode = cbd.getData('text');

			var txt = getAfterPressText(e, keyCode);
			e.returnValue = testNumber(txt);
			if (!justep.Browser.FF && !e.returnValue)
				e.keyCode = 0;
			return e.returnValue;
		});

		me.data = justep.xbl(xblObject.dataId);

		me.unitType = $C.attr('unitType');
		me.dispUnit = $C.attr('dispUnit'); // 默认显示单位
		me.storeUnit = $C.attr('storeUnit'); // 存储单位
		if ($C.attr('useDialog') == "false") {
			$("td", $C)[1].style.display = "none";
		}

		var $attrNode = $(xblObject.getElementByXblID('attribute'));
		me.unitNames = $attrNode.attr('unitNames'); // 单位名称集合[获取select选择项的下标,用于单位转换]
		$attrNode.remove();
		me.concept = xblObject.data.instanceId; // Concept
		me.relation = xblObject.relation; // relation
		butone.UnitFieldManager.addUnitField(me);

		var refControl = me._refOutput.element;
		refControl.refreshCallback = function(refC) {
			var readonly = !!refC.readonly;// refC.element.className.indexOf('xforms-readonly')
			// != -1;
			me.$display.attr("readonly", readonly);
			if (readonly)
				me.$display.addClass("xforms-readonly");
			else
				me.$display.removeClass("xforms-readonly");
			if (refC.changed) {
				me.refresh();
			}
		};
		refControl.refreshCallback(refControl.xformsObject);

	};

	/**
	 * 添加原型方法
	 */
	unitField.prototype = {
		/**
		 * 【】 刷新本字段显示值，将存储值转换为显示单位值。数据集改变时触发(新增、修改、删除、刷新)。
		 * 
		 * @param grid
		 *            是否刷新关联的grid
		 */
		refresh : function() {
			var me = this;
			var dispText = me.getDispText();
			me.$display.val(isNaN(dispText) ? "" : dispText);
		},

		setDispUnit : function(value) {
			if (!value)
				return;
			var me = this, b = me.dispUnit != value;
			me.dispUnit = value;
			if (b) {
				me.refresh();
			}
		},

		/** 获得显示值 */
		getDispText : function() {
			var storeValue = this.data.getValue(this.relation);
			// 显示单位
			var dispUnit = this.dispUnit;
			// 存储单位
			var stroeUnit = this.storeUnit;
			return butone.UnitFieldManager.transform(this.unitType,
					parseFloat(storeValue), stroeUnit, dispUnit);
		},

		/**
		 * 普通单位字段入口
		 * 
		 * @param unitInfo
		 */
		_openUnit : function() {
			var me = this;
			butone.UnitFieldManager.showUnitDialog(this.unitType,
					parseFloat(this.data.getValue(this.relation)),
					this.storeUnit, me._refOutput.readonly, function(event) {
						me.data.setValue(me.relation, event.data.value);
					});
		},

		/**
		 * 
		 * @param event
		 */
		_setDisplayText : function(text) {
			if (text == "") {
				this.data.setValue(this.relation, "");
			} else {
				var me = this, dispUnit = me.dispUnit, dispValue = parseFloat(text);
				var storeValue = butone.UnitFieldManager.transform(me.unitType,
						dispValue, dispUnit, me.storeUnit);
				if (isNaN(storeValue)) {
					butone.Dialog.error("数据格式错误:" + text);
					me.refresh();
					return;
				} else {
					me.data.setValue(me.relation, storeValue);
				}
			}

		}

	// /** 设置弹出框可拖拽 */
	// setDrag : function() {
	// // 模态层 TODO oLayID/oH2ID/oCloseID
	// // var oLay = document.getElementById("overlay");
	// // 弹出层
	// var oWin = document.getElementById(this.divid);
	// // 拖拽层
	// var oH2 = document.getElementById(this.H2ID);
	// // 关闭
	// var oClose = document.getElementById(this.spanID);
	//
	// var bDrag = false;
	// var disX = disY = 0;
	// /*
	// * oBtn.onclick = function () { oLay.style.display = "block"; TODO : 模态
	// * oWin.style.display = "block"; };
	// */
	// oClose.onclick = function() {
	// // oLay.style.display = "none";
	// oWin.style.display = "none";
	// };
	// oClose.onmousedown = function(event) {
	// (event || window.event).cancelBubble = true;
	// };
	// oH2.onmousedown = function(event) {
	// var event = event || window.event;
	// bDrag = true;
	// disX = event.clientX - oWin.offsetLeft;
	// disY = event.clientY - oWin.offsetTop;
	// this.setCapture && this.setCapture();
	// return false;
	// };
	// document.onmousemove = function(event) {
	// if (!bDrag)
	// return;
	// var event = event || window.event;
	// var iL = event.clientX - disX;
	// var iT = event.clientY - disY;
	// var maxL = document.documentElement.clientWidth - oWin.offsetWidth;
	// var maxT = document.documentElement.clientHeight
	// - oWin.offsetHeight;
	// iL = iL < 0 ? 0 : iL;
	// iL = iL > maxL ? maxL : iL;
	// iT = iT < 0 ? 0 : iT;
	// iT = iT > maxT ? maxT : iT;
	//
	// oWin.style.marginTop = oWin.style.marginLeft = 0;
	// oWin.style.left = iL + "px";
	// oWin.style.top = iT + "px";
	// return false;
	// };
	// document.onmouseup = window.onblur = oH2.onlosecapture = function() {
	// bDrag = false;
	// oH2.releaseCapture && oH2.releaseCapture();
	// };
	// }
	};

	var com = global.com = global.com || {};
	com.butone = com.butone || {};
	com.butone.UnitField = unitField;
})(window);
