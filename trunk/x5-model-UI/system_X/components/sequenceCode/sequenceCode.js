(function(global) {
	function getPosition(g, c) {
		if (!c) {
			var c = document.body;
		}
		var b = g;
		var f = 0;
		var e = 0;
		while ((b) && (b != c)) {
			f += b.offsetLeft - b.scrollLeft;
			e += b.offsetTop - b.scrollTop;
			b = b.offsetParent;
		}
		return new Array(f, e);
	}

	var sequenceCode = function(xbl) {
		var $C = $(xbl.domNode);
		this._menuId = $C.attr("id") + "_menu";
		this._triggerId = $C.attr("id") + "_trigger";
		var ref = $C.attr("ref"), info = ref
				.match(/(instance|data)\([\"\'](.*)[\"\']\)\/(.*)/i);
		this.data = justep.xbl(info[2]);
		this.field = info[3];
		this.dialogId = $C.attr("id") + "_dlg";
	};

	sequenceCode.prototype = {
		_genClick : function() {
			var menu = justep.xbl(this._menuId), domNode = justep
					.xbl(this._triggerId).element;
			var h = getPosition(domNode);
			var data = this.data;
			window.setTimeout(function() {
				menu.showContextMenu(h[0], h[1] + domNode.offsetHeight);
			}, 100);
		},

		/**
		 * 验证/清除
		 * 
		 * @param evt
		 */
		_menuClick : function(evt) {
			//之前的代码var itemId = evt.getData().itemId, fn = this[itemId];
			
			//存在多个手动编码时，从第二个（从上往下）开始，itemId会发生改变，暂时处理办法可用label值来判断  
			var itemId  = this._getItemIdByLabel(evt.getData().menuitem.label);
			
			var fn = this[itemId];
			if (fn && typeof fn == "function") {
				fn.apply(this);
			}
		},
		_getItemIdByLabel: function(label){
			if(label === '自动'){
				return'autoCode';
			}else if(label === '手选'){
				return 'manualCode';
			}else{
				return 'clearCode';
			}
		},

		autoCode : function() {
			var codeManager = butone.SequenceCodeManager
					.getCodeManager(this.data.id);
			if (!codeManager) {
				butone.Dialog.error("编码管理器不存在");
				return;
			}
			codeManager.manualCode(this.data, this.field, window);
		},

		manualCode : function() {
			var data = this.data, codeManager = butone.SequenceCodeManager
					.getCodeManager(data.id);
			if (!codeManager) {
				butone.Dialog.error("编码管理器不存在");
				return;
			}
			var codeValues = codeManager.getUnusedCodeValues(data, this.field, window);
			this._groupValue = codeValues.groupValue;
			butone.Window
					.dialog(
							this.dialogId,
							"/UI/system_X/components/sequenceCode/selectUnusedCodeValue.w",
							"选择编码", codeValues.list, true, null, 400, 300,
							false, null, $.proxy(this._onCodeValueSelected,
									this));

		},

		clearCode : function() {
			var data = this.data, codeManager = butone.SequenceCodeManager
					.getCodeManager(data.id);
			if (!codeManager) {
				butone.Dialog.error("编码管理器不存在");
				return;
			}
			codeManager.releaseUsedCodeValue(data, this.field);
		},

		_onCodeValueSelected : function(event) {
			var data = this.data, codeManager = butone.SequenceCodeManager
					.getCodeManager(data.id);
			if (!codeManager) {
				butone.Dialog.error("编码管理器不存在");
				return;
			}
			if (!event.data)
				return;

			var oldValue = data.getValue(this.field);
			try {
				codeManager.lockUnusedCodeValue(data, this.field,
						this._groupValue, event.data);
			} catch (e) {
				data.setValue(this.field, oldValue);
				butone.Dialog.error(e);
			}

		}
	};

	var com = global.com = global.com || {};
	com.butone = com.butone || {};
	com.butone.SequenceCode = sequenceCode;
	return sequenceCode;
})(window);
