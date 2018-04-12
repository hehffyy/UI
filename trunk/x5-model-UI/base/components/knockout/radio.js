define(function(require) {

	var $ = require("jquery");
	var Bind = require("bind");
	var BindComponent = require("base/lib/bind/bindComponent");
	var ViewComponent = require("base/lib/bind/viewComponent");

	var url = "$model/UI/base/components/knockout/radio";
	var ComponentConfig = require("./radio.config");
	
	var INIT_INPUT_DATABIND_ATTR = ["checked","value","disable","enable"];
	var RadioButton = BindComponent
			.extend({
				// 构造函数
				_defaultClass : "x-radio",
				_type : 'radio',

				getConfig : function() {
					return ComponentConfig;
				},

				constructor : function(options) {
					this.callParent(options);
					this.label = null;
					this.name = null;
					this.checkedValue = undefined;
					this.uncheckedValue = undefined;
					this.value = null;
					this.checked = false;
					this.on(ViewComponent.DATA_CHANGED, function(event) {// 可以根据属性值变化事件更新value和label
						if ('ref' == event.name)
							return;
						var param = {};
						param[event.name] = event.value;
						this.set(param);
					}, this);
				},
				dispose : function() {
					this._getInput().off('change', this._clickHandle);
					this.callParent();
				},
				val : function() {
					if (arguments.length === 0)
						return this.value;
					this.value = arguments[0];
					this._getInput().prop(
							'checked',
							this.checkedValue === undefined ? !!this.value
									: (this.checkedValue == this.value)).val(
							this.value);// lzg 这里没有使用===原因是有可能数据是int等类型
				},
				_buildInput : function(config, dataBind) {
					var $ret = $("<input"
							+ (config['name'] ? (" name='" + config['name'] + "'")
									: "")
							+ (config['checked'] ? " checked" : "") + " type='"
							+ this._type + "'/>");
					if (undefined !== config['value'])
						$ret.attr("value", config['value']);
					if (dataBind) {
						var s = "";
						for ( var n in dataBind) {
							var v = dataBind[n];
							if (v) {
								s += ","
										+ n
										+ ":"
										+ ($.isPlainObject(v) ? JSON
												.stringify(v) : (v + ""));
							}
						}
						if (s.length > 0)
							$ret.attr("data-bind", s.substring(1));
					}

					return $ret;
				},
				_buildLabel : function(config) {
					var $ret = $("<label>" + "</label>");
					if (config['label'])
						$ret.text(config['label']);
					return $ret;
				},
				buildTemplate : function(config) {
					if (!config)
						config = {};
					this.set(config);
					if (!config['class'])
						config['class'] = this._defaultClass;
					var $ret = $("<span"
							+ (config['class'] ? (" class='" + config['class'] + "'")
									: "")
							+ (config.style ? (" style='" + config.style + "' ")
									: "")
							+ (config.xid ? (" xid='" + config.xid + "' ") : "")
							+ " component='" + url + "'>" + "</span>");
					$ret.append(this._buildInput(config));
					$ret.append(this._buildLabel(config));
					return $ret;
				},
				doInit : function(value, bindingContext) {
					var $label = this._getLabel(), $input = this._getInput();
					if ($input.length == 0) {
						var databind = {}, config = {};
						for(var n in INIT_INPUT_DATABIND_ATTR){
							var attr = INIT_INPUT_DATABIND_ATTR[n];
							if (this.$domNode.attr("bind-"+attr)) {
								databind[attr] = this.$domNode
										.attr("bind-"+attr);
								this.$domNode.removeAttr("bind-"+attr);
							}
						}
						
						if (this.$domNode.attr('name')) {
							config.name = this.$domNode.attr('name');
							this.$domNode.removeAttr('name');
						}
						$input = this._buildInput(config, databind);
						this.$domNode.append($input);
					}

					if ($label.length == 0) {
						$label = this._buildLabel({label:this.$domNode.attr("label")});
						this.$domNode.append($label);
						this.$domNode.removeAttr("label");
					}
					var inputID = $input.attr('id');
					if (!inputID)
						$input.attr('id', justep.Utils.randomString());
					$label.attr("for", $input.attr('id'));
					this._clickHandle = this._doClick.bind(this);
					$input.on('change', this._clickHandle);

					if (value && !value.hasOwnProperty('ref')) {
						var o = {};
						if (Bind.isObservable(value.value))
							o.value = value.value.get();
						if (Bind.isObservable(value.label))
							o.label = value.label.get();
						this.set(o);
					}
				},
				doUpdate : function(value, bindingContext) {
					if (value) {
						if (value.hasOwnProperty('ref')) {
							this.updateValue(value.ref);// 数据更新
							this.updateReadonly(value.ref);// 只读状态更新,当有ref时按ref感知，否则使用value
						} else
							this.updateReadonly(value.value);
					}
				},
				_doClick : function(evt) {
					var checked = this._getInput()[0].checked;
					this.value = this.checkedValue === undefined ? checked
							: (checked ? this.checkedValue
									: (this.uncheckedValue !== undefined ? this.uncheckedValue
											: null));
					this.fireEvent('onChange', {
						source : this,
						checked : checked,
						value : this.value
					});
					this.val2ref();
				},
				_getInput : function() {
					return this.$domNode.children('input');
				},
				_getLabel : function() {
					return this.$domNode.children('label');
				},
				get : function(attr) {
					if ('checked' === attr)
						return this._getInput().prop('checked');
					return this.callParent(attr);
				},
				disabledRender : function() {
					if (this.$domNode)
						this._getInput().attr('disabled', this.isDisabled());
				},
				propertyChangedHandler : function(key, oldVal, value) {
					switch (key) {
					case "label":
						if (oldVal != value && this.$domNode)
							this._getLabel().text(value);
						break;
					case "value":
						if (oldVal != value && this.$domNode)
							this.val(value);
						break;
					case "checked":
						if (oldVal != value && this.$domNode)
							this._getInput().prop('checked', value);
						break;
					default:
						this.callParent(key, oldVal, value);
					}
				}
			});

	butone.Component.register(url, RadioButton);
	return RadioButton;
});