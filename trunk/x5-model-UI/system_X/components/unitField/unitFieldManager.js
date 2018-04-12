(function(global) {
	var unitFieldManager = {
		unitFields : {},
		controlFields : [],
		/**
		 * 单位字段创建时注入到管理器
		 */
		addUnitField : function(unitField) {
			var fields = this.unitFields[unitField.concept];
			if (fields == null) {
				fields = {};
				this.unitFields[unitField.concept] = fields;
			}
			var arr = fields[unitField.relation] = fields[unitField.relation]
					|| [];
			arr.push(unitField);
		},

		/**
		 * 单位控制字段创建时注入到管理器
		 * 
		 * @param controlField
		 */
		addControlField : function(controlField) {
			this.controlFields.push(controlField);
		},

		/**
		 * model的XBL组件loaded后，将控制字段注入到单位字段中;控制字段维护受控字段列表
		 */
		buildControlRelation : function() {
			for ( var n in this.controlFields) {
				var control = this.controlFields[n];
				var dispUnit = control.getDispUnit();
				control.unitFields = [];
				var targets = control.controlFields;
				for ( var m in targets) {
					var fieldInfo = targets[m].split(".");
					var unitFlds = this.findUnitFields(fieldInfo[0],
							fieldInfo[1]);
					if (unitFlds)
						$.each(unitFlds, function() {
							this.control = control;
							control.unitFields.push(this);
							this.setDispUnit(dispUnit);
						});
				}
			}
		},

		/**
		 * 查找内部管理的单位字段
		 * 
		 * @param concept
		 * @param relation
		 * @returns
		 */
		findUnitFields : function(concept, relation) {
			var conceptFields = this.unitFields[concept];
			if (conceptFields)
				return conceptFields[relation];
			return null;
		}
	};

	var fn = {
		unitTypeDefines : {},
		/**
		 * 单位录入对话框ID
		 * 
		 * @param unitField
		 */
		_dialogId : justep.Utils.randomString(),

		/**
		 * 添加单位定义信息
		 */
		addUnitTypeDefines : function(type, names, rates) {
			var unitType = this.unitTypeDefines[type];
			if (!unitType) {
				for ( var i in rates) {
					var args = rates[i].split(",");
					var rate = {};
					for ( var j in args) {
						var value = args[j].split("=");
						rate[value[0]] = value[1];
					}
					rates[i] = rate;
				}
				this.unitTypeDefines[type] = {
					type : type,
					names : names,
					rates : rates
				};
			}
		},

		round : function(num, scale) {
			var p = Math.pow(10, scale);
			return Math.round(num * p) / p;
		},

		/**
		 * 单位换算
		 */
		transform : function(type, value, form, to) {
			if (typeof value == "string")
				value = parseFloat(value);
			if (value == undefined || value == null || isNaN(value))
				return "";
			var unitType = this.unitTypeDefines[type];
			var f = justep.Array.indexOf(unitType.names, form), t = justep.Array
					.indexOf(unitType.names, to);
			var ret = value;
			ret = justep.Number.accMul(ret,
					parseFloat(unitType.rates[t].rate));
			ret = justep.Number.accDiv(ret,
					parseFloat(unitType.rates[f].rate));
			return parseFloat(ret).toFixed(unitType.rates[t].scale);
		},

		/**
		 * 显示单位录入对话框
		 * 
		 * @param type
		 * @param value
		 * @param unitName
		 * @param callback
		 */
		showUnitDialog : function(type, value, unitName, readonly, callback) {
			var unitType = this.unitTypeDefines[type];
			var data = {
				unitFieldManager : this,
				unitType : type,
				value : value,
				unitName : unitName,
				readonly : readonly
			};
			// 多个字段共享一个弹出框，回调函数不同，需要先记录下来。
			this._callback = callback;
			butone.Window.dialog(this._dialogId,
					"/UI/system_X/components/unitField/unitTransform.w",
					"数据录入", data, true, null, 320,
					100 + unitType.names.length * 30, false, null, $.proxy(
							this._unitDialogCallback, this), null);
		},

		_unitDialogCallback : function(event) {
			if (this._callback)
				this._callback.apply(null, [ event ]);
		}

	};
	unitFieldManager = $.extend(unitFieldManager, fn);

	var butone = global.butone = global.butone || {};
	butone.UnitFieldManager = unitFieldManager;
	return unitFieldManager;
})(window);
