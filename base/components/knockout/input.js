define(function(require) {
	var $ = require("jquery");
	var BindComponent = require("base/lib/bind/bindComponent");
	var ComponentConfig = require("./input.config");
	var DecimalFormat = require("base/lib/decimalFormat");
	var url = "$model/UI/base/components/knockout/input";

	var TypeRegExp = {
		Integer : /(^-?$)|(^-?[0-9]*$)/,
		Long : /(^-?$)|(^-?[0-9]*$)/,
		Decimal : /(^-?$)|(^-?[0-9]*([.]?[0-9]*)?$)/,
		Float : /(^-?$)|(^-?[0-9]*([.]?[0-9]*)?$)/,
		Double : /(^-?$)|(^-?[0-9]*([.]?[0-9]*)?$)/
	};

	var getAfterPressText = function(input, text) {
		var src = input, srcText, selTxt, srcRange, beforeTxt;

		if (justep.Browser.IE && !justep.Browser.IE11) {
			var selRange = document.selection.createRange();
			selTxt = selRange.text;// 选中的文本
			srcRange = src.createTextRange();
			srcText = srcRange.text;
			selRange.setEndPoint("StartToStart", srcRange);
			beforeTxt = selRange.text;// 插入字符前的文本
		} else {
			selTxt = window.getSelection().toString();// 选中的文本
			if ('number' != $(src).attr('type'))
				srcRange = src.selectionEnd;
			else
				srcRange = src.value.length;
			srcText = src.value;
			beforeTxt = src.value.substring(0, srcRange);
		}

		var insertTxt = text;// 插入字符 String.fromCharCode(e.keyCode)
		var afterTxt = srcText.substr(beforeTxt.length);// 插入字符后的文本
		var txt = beforeTxt.substr(0, beforeTxt.length - selTxt.length)
				+ insertTxt + afterTxt;
		return txt;
	};

	var Input = BindComponent
			.extend({
				getConfig : function() {
					return ComponentConfig;
				},
				// 构造函数
				constructor : function(options) {
					this.callParent(options);
					this.readonly = false;
					this.placeHolder = "";
					this.value = "";
					this.format = "";
					this.pattern = "";
					this.autoFocus = false;
					this.autoComplete = false;
					this.min = null;
					this.max = null;
					this.minLength = 1;
					this.maxLength = null;
					this.dataType = "String";
				},

				dispose : function() {
					this.$domNode.off('change focus blur keypress paste');
					this.callParent();
				},

				// 动态创建组件
				buildTemplate : function(config) {
					if (!config)
						config = {};
					this.set(config);
					if (!config['class'])
						config['class'] = 'form-control';
					return "<input class='"
							+ config['class']
							+ "' "
							+ (config.style ? (" style='" + config.style + "' ")
									: "")
							+ (config.xid ? (" xid='" + config.xid + "' ") : "")
							+ " component='" + url + "' " + " ></input>";
				},

				_doDataTypeChange : function() {
					if (butone.Bind.isObservable(this.ref)
							&& this.ref['define']) {
						var def = this.ref['define'].defCol;
						var t = def.type;
						var size = def.size;
						var value = {};
						var needSet = false;
						if (t !== this.dataType) {
							value.dataType = t;
							needSet = true;
						}
						if (size) {
							value.maxLength = size;
							needSet = true;
						}
						if (needSet)
							this.set(value);
					}
				},
				_bindDataType : function() {
					if (this.dataType == 'DateTime' || this.dataType == 'Date'
							|| this.dataType == 'Time') {
						if (!this.format) {
							if ('DateTime' == this.dataType)
								this.format = "yyyy-MM-dd hh:mm:ss";
							else if ('Date' == this.dataType)
								this.format = "yyyy-MM-dd";
							else if ('Time' == this.dataType)
								this.format = "hh:mm:ss";
						}
						var that = this;
						var type = this.dataType.toLowerCase(), format = justep.Date.STANDART_FORMAT;
						if (type == 'date')
							format = justep.Date.STANDART_FORMAT_SHOT;
						else if (type == 'time')
							format = "hh:mm:ss";
						this.$domNode.addClass(type).attr('readonly', true);
						// 日期录入
					} else if (this.dataType) {
						this.$domNode.addClass(this.dataType.toLowerCase());
					}
				},
				_updateType : function() {
//					var inputType = this.$domNode.attr('type');
//					if(inputType!='email' && inputType!='url' && inputType!='password' && inputType!='range' && inputType!='search' && inputType!='color'){
//						if(this.dataType == 'Integer' || this.dataType == 'Long' || this.dataType == 'Decimal' || this.dataType == 'Float' || this.dataType == 'Double'){
//							this.$domNode.attr('type',justep.Browser.isMobile?'number':'tel');
//						}else this.$domNode.attr('type','text');
//					}
				},
				_restoreType : function() {// 解决手机上number不能显示非数字的val
					var inputType = this.$domNode.attr('type');
					if (inputType == 'number' || inputType == 'tel')
						this.$domNode.attr('type', 'text');
				},
				_unbindDataType : function(dataType) {
					if (this.$domNode) {
						this.$domNode
								.removeClass(('' + dataType).toLowerCase());
						// 销毁jquery UI 日期组件
					}
				},
				_doCalcDateExpr : function(expr) {
					var v = this._doCalcExpr(expr);
					if (butone.Bind.isObservable(v))
						v = v.get();
					if (v instanceof Date)
						return v;
					else if ('string' == typeof (v))
						return justep.Date.fromString(v,
								justep.Date.STANDART_FORMAT_SHOT);
					else {
						var msg = new justep.Message2(
								justep.Message2.JUSTEP231090);
						throw justep.Error.create(msg);
					}
				},
				_doCalcExpr : function(expr) {
					this._expr = this._expr || {};
					if (!this._expr[expr])
						this._expr[expr] = new justep.Express(expr);
					var ctx = butone.Bind.contextFor(this.domNode);
					return justep.Express.eval(this._expr[expr], ctx.$object,
							ctx);
				},
				// 初始化
				doInit : function(value, bindingContext) {
					var self = this;
					this.$domNode.on('change', $.proxy(this.doChange, this))
							.on(
									'focus',
									function() {
										self._focusin = true;
										self._updateType();
										if (!self.$domNode.prop('readonly')
												&& self.value != self.$domNode
														.val())
											self.$domNode.val(self.value);
										if (!self._refocus
												&& justep.Browser.isIOS
												&& !justep.Browser.isX5App)
											window.setTimeout(function() {
												self._refocus = true;
												self.$domNode.blur().focus();
											}, 1);
										self._refocus = false;
									}).on('blur', function() {
								self._focusin = false;
								if (!self._refocus)
									self._restoreType();
								self.render();
							}).on('keypress paste', function(evt) {
								return self._doKeypress(evt);
							});
					this._bindDataType();
				},
				isDisabled : function() {
					return this.readonly || this.callParent();
				},
				_doKeypress : function(evt) {
					if (13 === evt.keyCode) {
						if (justep.Browser.IE >= 9)// 增加ie11处理，原因回车后不触发change事件
							this.doChange(evt);
						return;
					}
					var regExp = TypeRegExp[this.dataType], ok, keyCode, afterPressText;

					if (justep.Browser.FF
							&& (evt.key !== 'MozPrintableKey' || (evt.key === 'MozPrintableKey' && evt.ctrlKey)))
						return;
					// 获取剪切板----处理粘贴后文字的正则校验
					var cbd = window.clipboardData || evt.clipboardData
							|| evt.originalEvent.clipboardData;
					if (evt.type === "paste" && cbd)
						keyCode = cbd.getData('text');
					else
						keyCode = String
								.fromCharCode(!justep.Browser.FF ? evt.keyCode
										: evt.which);

					if (regExp || this.pattern)
						afterPressText = getAfterPressText(this.domNode,
								keyCode);

					if (regExp) {
						ok = regExp.test(afterPressText);
					}
					if ((ok || ok === undefined) && this.pattern) {
						// 用户自定义正则
						try {
							regExp = eval('/' + this.pattern + '/');
							if (regExp)
								ok = regExp.test(afterPressText);
						} catch (e) {
						}
					}
					evt.returnValue = ok;
					if (!justep.Browser.FF && !evt.returnValue)
						evt.keyCode = 0;
					return evt.returnValue;
				},
				doUpdate : function(value, bindingContext, allBindings) {
					this._doDataTypeChange();
					this.callParent(value, bindingContext, allBindings);
				},
				propertyChangedHandler : function(key, oldVal, value) {
					switch (key) {
					case "format":
						if (!this.format) {
							if ('DateTime' == this.dataType)
								this.format = "yyyy-MM-dd hh:mm:ss";
							else if ('Date' == this.dataType)
								this.format = "yyyy-MM-dd";
							else if ('Time' == this.dataType)
								this.format = "hh:mm:ss";
						}
						if (oldVal != value)
							this.needRender = this._inited;
						break;
					case "value":
						if (oldVal != value) {
							if (this._inited) {
								this.fireEvent('onChange', {
									source : this,
									originalValue : oldVal,
									value : value
								});
								this.val2ref();
							}
						}
						this.needRender = this._inited && !this._focusin;// 焦点在当前组件不刺激渲染
						break;
					case "dataType":
						if (oldVal != value) {
							this.needRender = this._inited;
							this._dataTypeChanged = true;
							this._unbindDataType(oldVal);
						}
						break;
					default:
						this.callParent(key, oldVal, value);
					}
				},
				render : function() {
					this.callParent();
					if (this._dataTypeChanged) {
						this._bindDataType();
						this._dataTypeChanged = false;
					}
					var val = this.value;
					var d;
					if (val) {
						if ('DateTime' == this.dataType) {
							d = val instanceof Date ? val : justep.Date
									.fromString(val,
											justep.Date.STANDART_FORMAT);
							val = justep.Date.toString(d, this.format);
						} else if ('Date' == this.dataType) {
							d = val instanceof Date ? val : justep.Date
									.fromString(val,
											justep.Date.STANDART_FORMAT_SHOT);
							val = justep.Date.toString(d, this.format);
						} else if ('Time' == this.dataType) {
							d = val instanceof Date ? val : justep.Date
									.fromString(val, "hh:mm:ss");
							val = justep.Date.toString(d, this.format);
						} else if (this.format
								&& ('Integer' == this.dataType
										|| 'Long' == this.dataType
										|| 'Float' == this.dataType
										|| 'Double' == this.dataType || 'Decimal' == this.dataType)) {
							val = (new DecimalFormat(this.format)).format(val);
						}
					}
					if (val === undefined || val === null)
						val = '';
					var eData = {
						source : this,
						value : this.value,
						text : val
					};
					this.fireEvent('onRender', eData);
					this.$domNode.val(eData.text);
				},
				val : function(v) {
					if (arguments.length === 0)
						return this.value;
					this.set({
						value : v
					});
				},
				doChange : function(evt) {
					//console.log('changed:' + this.$domNode.val());
					this.set({
						value : this.$domNode.val()
					});
				},

				clear : function() {
					this.set({
						value : null
					});
				}
			});

	butone.Component
			.register(url, Input);
});