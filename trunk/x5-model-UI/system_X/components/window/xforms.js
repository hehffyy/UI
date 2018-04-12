(function(xforms) {
	if (!xforms)
		return;
	// 增加自定义格式检查
	if (xforms.XFInstance2) {
		xforms.XFInstance2.prototype.validate_ = function(node, all, readonly,
				relevant, isVirtualRoot) {

			var bind = node.getBind();
			var value = xforms.xmlValue(node);

			// TODO lzg 增加虚根的计算处理
			if (isVirtualRoot) {
				this.setProperty2_(node, "readonly", true);
				return;
			}

			// edit by wjh
			// all 丿False，只需要重新计算只读?
			var ctx = new xforms.ExprContext();
			var createCtx = function(node, bind, name) {
				var nodes = bind[name].nodes
				var i = 0;
				for (; i < nodes.length; i++) {
					if (nodes[i] == node) {
						break;
					}
				}
				return new xforms.ExprContext(node, i, nodes);
			}
			if (all == false) {
				if (bind)
					this.setProperty2_(node, "readonly", readonly
							|| (bind.has("readonly") ? xforms
									.booleanValue(bind.readonly.xpath
											.evaluate(createCtx(node, bind,
													"readonly"))) : false));
				else
					this.setProperty2_(node, "readonly", readonly);
			} else {
				if (bind) {

					var ctx = null;

					if (bind.has("required")) {
						ctx = createCtx(node, bind, "required");
						this.setProperty_(node, "required",
								xforms.booleanValue(bind.required.xpath
										.evaluate(ctx)));
					}
					this.setProperty_(node, "relevant", relevant
							&& (bind.has("relevant") ? xforms
									.booleanValue(bind.relevant.xpath
											.evaluate(createCtx(node, bind,
													"relevant"))) : true));
					this.setProperty_(node, "readonly", readonly
							|| (bind.has("readonly") ? xforms
									.booleanValue(bind.readonly.xpath
											.evaluate(createCtx(node, bind,
													"readonly"))) : false));

					// lzg 去除对relevant不计算（所有数据都计算），修改约束，必填，数据类型合法(为空不校验)的处理
					var valid = (!bind.has("required") || !(xforms
							.booleanValue(bind.required.xpath
									.evaluate(createCtx(node, bind, "required"))) && (typeof value == 'undefined'
							|| value === '' || value == null)))
							&& (typeof value == 'undefined' || value === ''
									|| value == null || node.type
									.validate(value))
							&& (!bind.has("constraint") || xforms
									.booleanValue(bind.constraint.xpath
											.evaluate(createCtx(node, bind,
													"constraint"))));
					/*
					 * 原代码保留 var valid = !node.relevant || (!node.required &&
					 * (!value || value == "")) || (value &&
					 * node.type.validate(value) && (!bind.has("constraint") ||
					 * xforms.booleanValue(bind.constraint.xpath.evaluate(createCtx(node,
					 * bind, "constraint")))));
					 */
					var formatValid = true;
					if (this.element.xblObject) {
						var define = this.element.xblObject.defRelations[node.fieldName];
						var formatRegex = define ? define.customFormat : null;
						formatValid = !formatRegex || formatRegex.check(value);

						this.setProperty_(node, "valid", valid && formatValid);
					} else {
						this.setProperty_(node, "valid", valid);
					}

					// 增加约束计算信息
					if (!valid) {
						var validinfo = bind.constraint ? bind.constraint.validInfo
								: bind.required ? bind.required.validInfo
										: null;
						this.setProperty2_(node, "validInfo",
								validinfo ? xforms.stringValue(validinfo
										.evaluate(new xforms.ExprContext()))
										: (!formatValid ? formatRegex.tip
												: node.getDisplayName())
												+ ":"
												+ (!formatValid ? "格式" : "数据")
												+ "无效!");
					} else {
						if (!formatValid)
							this.setProperty2_(node, "validInfo",
									formatRegex.tip);
						else
							this.setProperty2_(node, "validInfo", "");
					}
				} else {
					this.setProperty_(node, "relevant", relevant);
					this.setProperty_(node, "readonly", readonly);
					this.setProperty_(node, "valid", !value
							|| node.type.validate(value));
				}
			}
			;

		};
	}

	if (justep.SimpleField) {
		justep.SimpleField.prototype.getDisplayName = function() {
			return this.store.instance.element.xblObject.getRelationInfo
					&& this.store.instance.element.xblObject
							.getRelationInfo(this.fieldName).label
					|| this.fieldName;
		};
	}

	// 数据为空时，XFSelect组件的表现特性
	if (xforms.XFSelect) {
		xforms.XFSelect.prototype.refresh = function() {
			var element = this.element;
			var node = element.node;
			if (node) {
				var value;
				var value = xforms.getValue(node, true, this.rowIndex);
				xforms.openAction();
				try {
					var changed = true;

					if (this.relevant) {
						xforms.Core.setClass(element, "xforms-disabled", false);
					}

					this.changeProp(node, "required", "xforms-required",
							"xforms-optional", changed);
					this.changeProp(node, "relevant", "xforms-enabled",
							"xforms-disabled", changed);
					this.changeProp(node, "readonly", "xforms-readonly",
							"xforms-readwrite", changed);

					if (!(this instanceof xforms.XFTrigger)) {
						this.changeProp(node, "valid", "xforms-valid",
								"xforms-invalid", changed);
					} else {
						this.changeProp(node, "valid", "xforms-valid",
								"xforms-valid", changed);
					}

					if (changed) {
						this.currentValue = value;
						this.setValue(value);

						if (!this.nodeChanged && !this.isTrigger) {
							xforms.XMLEvents.dispatch(element,
									"xforms-value-changed");
						}
					}

				} finally {
					xforms.closeAction();
				}
			} else if (this.outputValue != null) {
				this.setValue(this.outputValue);
			} else {
				if (this.full) {
					var list = this.element.getElementsByTagName("input");
					for ( var i = 0; i < list.length; i++) {
						list[i].disabled = true;
						list[i].readOnly = true;
						list[i].checked = false;
					}
					list = this.element.getElementsByTagName("span");
					for ( var i = 0; i < list.length; i++) {
						list[i].disabled = true;
						list[i].readOnly = true;
						list[i].checked = false;
					}
				} else {
					this.select.disabled = true;
					this.select.readOnly = true;
					this.select.selected = false;
				}
				xforms.Core
						.setClass(element, "xforms-disabled", !this.hasValue);
			}

			this.nodeChanged = false;
		};
	}

	// 数据为空时，XFSelect组件的表现特性
	if (xforms.XFControl) {
		xforms.XFControl.prototype.refresh = function() {
			var element = this.element;
			var node = element.node;
			if (node) {
				var value = xforms.getValue(node, true, this.rowIndex);
				xforms.openAction();
				try {
					var changed = value !== this.currentValue;

					if (this.relevant) {
						xforms.Core.setClass(element, "xforms-disabled", false);
					}

					this.changeProp(node, "required", "xforms-required",
							"xforms-optional", changed);
					this.changeProp(node, "relevant", "xforms-enabled",
							"xforms-disabled", changed);
					this.changeProp(node, "readonly", "xforms-readonly",
							"xforms-readwrite", changed);

					if (!(this instanceof xforms.XFTrigger)) {
						this.changeProp(node, "valid", "xforms-valid",
								"xforms-invalid", changed);
					} else {
						this.changeProp(node, "valid", "xforms-valid",
								"xforms-valid", changed);
					}

					if (changed) {
						this.currentValue = value;
						this.setValue(value);

						if (!this.nodeChanged && !this.isTrigger) {
							xforms.XMLEvents.dispatch(element,
									"xforms-value-changed");
						}
					}
					// xyh 提供给 xbl 控件绑定ref，通过 xforms:input/output 等控件模拟的时候使用
					if (this.element.refreshCallback) {
						this.element.refreshCallback(this);
					}

				} finally {
					xforms.closeAction();
				}
			} else if (this.outputValue != null) {
				this.setValue(this.outputValue);
			} else {
				if (this instanceof xforms.XFExtSelect) {
					// 隐藏Select下拉按钮
					this.img.disabled = true;
					this.img.style.display = "none";
				}
				if (this.input) {
					this.input.readOnly = true;
					this.input.disabled = true;
					this.input.value = "";
				} else if (this.focusControl) {
					this.focusControl.readOnly = true;
					this.focusControl.disabled = true;
					this.focusControl.value = "";
				} else if (this.valueElement) {
					// 处理textArea？
					var element = this.valueElement;
					if (element.nodeName.toLowerCase() == "span") {
						if (this.mediatype == "text/html") {
							element.innerHTML = "";
						} else {
							xforms.setValue(element, "");
						}
					} else {
						element.src = "";
					}
				}
				// md: 20100326为了当节点不存在的时候也触发事件
				if (this.currentValue != null) {
					this.currentValue = null;
					xforms.XMLEvents.dispatch(element, "xforms-value-changed");
				}
				// emd
				xforms.Core
						.setClass(element, "xforms-disabled", !this.hasValue);
			}

			this.nodeChanged = false;
		};

	}
	if (xforms.XFExtSelect)
		xforms.XFExtSelect.prototype.__refresh = xforms.XFControl.prototype.refresh;

})(xforms);