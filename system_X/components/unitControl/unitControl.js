(function(global) {

	var unitControl = function(xblObject) {
		debugger;
		xblObject._impl = this;
		var me = this, el = $(xblObject.domNode);
		me.xblObjectID = el.attr("id");
		me._select = justep.xbl(me.xblObjectID + "_ref");
		me.dispUnit = el.attr('dispUnit'); // 默认显示单位
		me.unitType = el.attr('unitType');
		me.controlFields = el.attr('controlField').split(","); // array
		var ref = el.attr("ref");
		var xpathr = /(instance|data)\([\"\'](.*)[\"\']\)\/(.*)/i;
		var info = ref.match(xpathr);
		var relation = info[3];
		butone.UnitFieldManager.addControlField(me);

		var refControl = me._select.element;
		refControl.refreshCallback = function(refC) {
			if (refC.changed) {
				if (me.unitFields) {
					$.each(me.unitFields, function() {
						this.setDispUnit(refC.currentValue);
					});
				}
				debugger;
				if (xblObject._relGrids) {
					me.refreshGrids(xblObject._relGrids);
				}
			}
		};
		refControl.refreshCallback(refControl.xformsObject);

	};

	unitControl.prototype = {
		/**
		 *  获取控制单位当前选择的单位
		 */
		getDispUnit : function() {
			var dispUnit = this._select.getValue();
			if (!dispUnit) {
				return this.dispUnit;
			} else {
				return dispUnit;
			}
		},

		/**
		 * 设置关联的grid
		 * @param ids
		 */
		setRelGrids : function(ids){
			this._relGrids = ids;
		},
		
		/**
		 * 编辑Grid的单位字段
		 * @param event
		 */
		editGridUnitField : function(event) {
			var cell = event.target || event.srcElement, grid = $(cell)
					.parents("div.grid:eq(0)").get(0).grid, relation = grid
					.getColumnId(cell._cellIndex), data = grid.instance, rowid = cell.parentNode.idd;
			var value = data.getValue(relation, rowid);
			var editable = grid.callEvent("onEditCell", [ 0, rowid,
					cell._cellIndex ]);
			butone.UnitFieldManager.showUnitDialog(this.unitType, value,
					$(cell).attr("unit"), !editable, function(event) {
						data.setValue(relation, event.data.value, rowid);
					});
		},

		/**
		 * grid单位字段的onRender回调
		 * @param event
		 * @param storeUnit
		 * @returns
		 */
		gridRenderCallback : function(event, storeUnit) {
			var $cell = $(event.cell.cell);
			if (!$cell.hasClass("gridUnitField")) {
				$cell.addClass("gridUnitField");
				$cell.bind("dblclick", this.editGridUnitField.bind(this)).attr(
						"unit", storeUnit);
			}
			var dispUnit = this.getDispUnit(), dispValue = butone.UnitFieldManager
					.transform(this.unitType, event.value, storeUnit, dispUnit);
			if (dispValue == undefined || dispValue == null)
				dispValue = "";
			return dispValue;
		},

		/**
		 * 刷新Grids
		 * @param grids
		 */
		refreshGrids : function(grids) {
			var ar = grids.split(",");
			for ( var n in ar) {
				var grid = justep.xbl(ar[n]), data = grid.grid.instance, unitType = this.unitType, dispUnit = this
						.getDispUnit();
				$("td.gridUnitField", "#" + ar[n]).each(
						function() {
							var $this = $(this), value = data.getValue(
									grid.grid.getColumnId(this._cellIndex),
									this.parentNode.idd);
							var dispValue = butone.UnitFieldManager.transform(
									unitType, value, $this.attr("unit"),
									dispUnit);
							$this.html(dispValue);
						});
			}
		}
	};
	var com = global.com = global.com || {};
	com.butone = com.butone || {};
	com.butone.UnitControl = unitControl;
	return unitControl;
})(window);
