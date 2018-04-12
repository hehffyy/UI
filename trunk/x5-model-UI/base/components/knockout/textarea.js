/*! 
 * WeX5 v3 (http://www.justep.com) 
 * Copyright 2015 Justep, Inc.
 * Licensed under Apache License, Version 2.0 (http://www.apache.org/licenses/LICENSE-2.0) 
 */
define(function(require) {
	var $ = require("jquery");
	var ComponentConfig = require("./textarea.config");
	var BindComponent = require("base/lib/bind/bindComponent");

	var Textarea = BindComponent.extend({
		getConfig : function() {
			return ComponentConfig;
		},
		// 构造函数
		constructor : function(options) {
			this.callParent(options);
			this.placeHolder = '';
		},

		dispose : function() {
			this.removeHandlers();
			this.callParent();
		},

		// 动态创建组件
		buildTemplate : function(config) {
			if (!config)
				config = {};
			this.set(config);
			if (!config['class'])
				config['class'] = 'form-control';
			return "<textarea class='" + config['class'] + "' "
					+ (config.style ? (" style='" + config.style + "'") : "")
					+ (config.xid ? (" xid='" + config.xid + "'") : "")
					+ " component='" + url + "'" + " ></textarea>";
		},

		// 初始化
		doInit : function(value, bindingContext) {
			this.addHandlers();
		},
		set : function(value) {
			this.callParent(value);
			if (value && value.hasOwnProperty("value"))
				this.val(value['value']);
		},
		get : function(name) {
			if ('value' == name)
				return this.val();
			else
				return this.callParent(name);
		},
		val : function(val) {
			var originalValue = this.$domNode.val();
			if (arguments.length === 0)
				return originalValue;
			var v = val;
			if (v === undefined || v === null)
				v = '';
			if (v != originalValue) {
				var o = this.$domNode;
				if (this._inited)
					this.fireEvent('onChange', {
						'source' : this,
						'value' : val
					});
				o.val(v);
				this.val2ref();
			}
		},
		addHandlers : function() {
			this.$domNode.on('change', $.proxy(this.doChange, this));
		},

		removeHandlers : function() {
			this.$domNode.off('change', $.proxy(this.doChange, this));
		},

		doChange : function(e) {
			this.fireEvent('onChange', {
				'source' : this,
				'value' : this.$domNode.val()
			});
			this.val2ref();
		},

		clear : function() {
			this.val(null);
		}
	});

	butone.Component.register("$model/UI/base/components/knockout/textarea",
			Textarea);
	return Textarea;
});