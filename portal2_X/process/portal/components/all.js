/*
 * file from "UI\portal2\process\portal\components\tab\tab.js"
 */

(function(global) {
	function Tab(options) {
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	}

	Tab.prototype = {
		init : function() {
			var me = this;
			var content = this.el.children();
			$(content).hide();
			this.el.empty();
			this.el.addClass('tab');
			this.contentEl = $('<div class="tab-content"></div>');
			this.contentEl.append(content);
			this.listEl = $('<ul></ul>');
			this.el.append(this.listEl);
			this.el.append(this.contentEl);
			$.each(this.pages, function(i, page) {
				page.el = $('<li><span/><a href="#">' + page.title
						+ '</a></li>');
				page.el.click(function() {
					$('li', me.listEl).removeClass('on');
					$(this).addClass('on');
					$(content).hide();
					$('#' + page.id).show();
					if (me.onIndexChange)
						me.onIndexChange(page, i);
				});
				me.listEl.append(page.el);
			});
			this.pages[0].el.click();
		}
	};

	global.Tab = Tab;
})(window);

/*
 * file from
 * "UI\portal2\process\portal\components\sliddingpanel\sliddingpanel.js"
 */

(function(global) {

	var SliddingPanel = function(options) {
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};

	SliddingPanel.prototype = {
		init : function() {
			var content = this.el.children();
			this.el.empty();
			this.el.addClass('sliddingpanel');
			this.contentEl = $('<div><div class="c">'
					+ '<div class="inner"><a href="#close" class="close" title="点击隐藏"><i class="iconfont">&#xe600;</i></a></div>'
					+ '</div>'
					+ '<div class="b"><div class="bar"><a class="btn" href="#">'
					+ this.title + '</a></div></div></div>');

			this.cEl = $('.c', this.contentEl);
			this.btnEl = $('.btn', this.contentEl);
			$('.inner', this.contentEl).append(content);
			this.el.append(this.contentEl);
			var me = this;
			this.btnEl.click(function() {
				me.close();
				return false;
			});

			$('.inner>.close', this.contentEl).click(function() {
				me.close();
				return false;
			});
		},
		close : function() {
			var me = this;
			this.cEl.slideToggle(800, function() {
				me.btnEl.toggleClass('close');
			});
		}
	};

	global.SliddingPanel = SliddingPanel;
})(window);

/*
 * file from "UI\portal2\process\portal\components\setpwd\setpwd.js"
 */

(function(global) {

	var SetPwd = function(options) {
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};

	SetPwd.prototype = {
		init : function() {
			var me = this;
			this.el.addClass('setpwd');
			this.contentEl = $(''
					+ '<h1 class="title" style="color: #515151;">修改密码</h1>'
					+ '<div class="left">'
					+ '<div class="row">'
					+ '<label>旧密码</label><br/>'
					+ '<input type="password" class="field oldpwd"></input></div>'
					+ '<div class="row">'
					+ '<label>新密码</label><br/>'
					+ '<input type="password" class="field pwd"></input></div>'
					+ '<div class="row">'
					+ '<label>请确认新密码</label><br/>'
					+ '<input type="password" class="field pwd2"></input></div>'
					+ '<div class="row btnBar">'
					+ '<a class="saveBtn" href="#">确定</a>'
					+ '<a class="cancelBtn" href="#">取消</a></div>' + '</div>'
					+ '<div class="right">' + this.description + '</div>'
					+ '<div class="message">some text</div>');
			this.el.append(this.contentEl);
			this.msgEl = $('.message', this.el);
			$('.saveBtn', this.el).click(function() {
				me.change();
			});
			$('.cancelBtn', this.el).click(function() {
				me.reset();
			});
		},
		message : function(msg, error) {
			var me = this;
			if (error) {
				this.msgEl.addClass('error');
			}
			;
			this.msgEl.html(msg);
			this.msgEl.fadeIn(200, function() {
				setTimeout(function() {
					me.msgEl.fadeOut(500, function() {
						me.msgEl.html('');
						me.msgEl.removeClass('error');
					});
				}, 5000);
			});
		},
		change : function() {
			var me = this, msg = '';
			if (msg = this.check()) {
				this.message(msg, true);
			} else {
				var oldpwd = $('.oldpwd', this.el).val(), pwd = $('.pwd',
						this.el).val();
				username = justep.Context.getCurrentPersonMemberCode();

				var url = this.getChangeURL();
				url += '?username=' + username + '&password=' + hex_md5(oldpwd)
						+ '&new_password=' + hex_md5(pwd);
				// todo:
				// + '&language=' + this.getLocale();

				var result = justep.Request.sendHttpRequest(url);
				result = justep.Request.responseParseJSON(result);
				if (result.flag) {
					this.message('密码修改成功');
					this.reset();
				} else {
					this.message(result.message, true);
				}
			}
		},
		getChangeURL : function() {
			return window.location.href.replace(/index.*\.w.*/,
					'ChangePassword.j');
		},
		reset : function() {
			$('input', this.el).val('');
		},
		check : function() {
			var oldpwd = $('.oldpwd', this.el).val(), pwd = $('.pwd', this.el)
					.val(), pwd2 = $('.pwd2', this.el).val();
			if (!oldpwd)
				return '旧密码不能为空';
			if (!pwd)
				return '新密码不能为空';
			if (pwd != pwd2)
				return '新密码录入不一致,请再确认';
			return this.validate && this.validate(pwd);
		}
	};

	global.SetPwd = SetPwd;
})(window);

/*
 * file from "UI\portal2\process\portal\components\advancedset\advancedset.js"
 */

(function(global) {

	var AdvancedSet = function(options) {
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};

	AdvancedSet.prototype = {
		init : function() {
			this.el.addClass('advancedset');
			this.contentEl = $(''
					+ '<h1 class="title" style="color: #515151;">高级设置</h1>'
					+ '<div class="row">'
					+ '<span>您可以恢复为系统的初始布局, 系统初始布局是由系统管理员为您分配和负责管理的. 恢复为默认布局后您现有的布局将无法恢复.</span><br/>'
					+ '<a class="saveBtn" href="#">恢复为系统初始布局</a>'
					+ '<span class="success">操作已经成功, 需要重新登陆后生效.</span><br/>'
					+ '</div>');
			this.el.append(this.contentEl);
			var me = this;
			$('.saveBtn', this.el).click(
					function() {
						var params = new justep.Request.ActionParam();
						params.setString('personID', justep.Context
								.getCurrentPersonID());
						response = justep.Request.sendBizRequest(
								"/portal2/process/portal/portalProcess",
								"index", "clearPortalAction", params, null,
								null, false);
						if (!justep.Request.isBizSuccess(response)) {
							var msg = new justep.Message(
									justep.Message.JUSTEP233002);
							throw justep.Error.create(msg);
						} else {
							$('.saveBtn', me.el).hide();
							$('.success', me.el).show();
						}
						return false;
					});
		}
	};

	global.AdvancedSet = AdvancedSet;
})(window);

/*
 * file from "UI\portal2\process\portal\components\portalset\portalset.js"
 */

(function(global) {

	var PortalSet = function(options) {
		$.extend(this, options);
		eventable(this);
		this.el = $('#' + this.id);
		this.init();
	};

	PortalSet.prototype = {
		init : function() {
			this.el.addClass('portalset');

			var me = this;

			this.el.append($('<div class="pageset"  style="width: ' + ('100%')
					+ '">' + '<div class="section" style="width:' + '60%'
					+ '"><div class="section-inner">' + '<h1>调整布局</h1>'
					+ '<div class="select-layout">'
					+ '<div style="height: 200px;"></div>' + '</div>'
					+ '</div></div>' + '<div class="section" style="width:'
					+ '40%' + '"><div class="section-inner">' + '<h1>选择模块</h1>'
					+ '<div class="select-widget">' + '<ul></ul>' + '</div>'
					+ '</div></div>' + '</div>'));

			(function() {
				var ul = $(".select-widget>ul", me.el);
				me.mng.eachWidgetDef(function(widget, category) {
					var title = (category ? (category + ':') : '')
							+ widget.title, li = $("<li><a href='#' widgetid='"
							+ widget.id + "'>" + title + "</a></li>");
					ul.append(li);
					$('a', li).click(function() {
						if ($(this).hasClass('checked')) {
							me.mng.removeWidget(widget.id);
						} else {
							me.mng.addWidget(widget.id);
						}
						$(this).toggleClass('checked');
					});
				});
			})();
			(function() {
				var layoutsEl = $('.select-layout>div', me.el);
				me.mng
						.eachLayout(function(layout, name) {
							function print(layout, container) {
								if (layout.columns) {
									var widths = util.cut(util.map(
											layout.columns, function(column) {
												return column.width;
											}));
									$.each(layout.columns, function(i, column) {
										column.el = util.domHelp.div()
												.addClass('column');
										if (column.background)
											column.el.css({
												background : column.background
											});
										column.el.width((widths[i] + '%'));
										print(column, column.el);
										container.append(column.el);
										if (column.index != undefined) {
											column.el.addClass('color-layout-'
													+ column.index);
										}
									});
								} else if (layout.rows) {
									var heights = util.cut(util.map(
											layout.rows, function(row) {
												return;
											}));
									$
											.each(
													layout.rows,
													function(i, row) {
														row.el = util.domHelp
																.div()
																.addClass('row')
																.height(
																		heights[i]
																				+ '%');
														if (row.background)
															row.el
																	.css({
																		background : row.background
																	});
														print(row, row.el);
														container
																.append(row.el);
														if (row.index != undefined) {
															row.el
																	.addClass('color-layout-'
																			+ row.index);
														}
													});
								}
							}
							var conttainer = $('<div class="select-layout-item"><div class="thumbnail thumbnail-select" value="'
									+ name
									+ '"></div><input type="radio" name="layout"  value="'
									+ name + '"></input></div>');
							layoutsEl.append(conttainer);
							print(layout, $('.thumbnail', conttainer));
						});
				$('input[name=layout]', layoutsEl).click(
						function() {
							var value = $(this).attr('value');
							me.mng.setLayout(value);
							$('.thumbnail', layoutsEl).removeClass(
									'thumbnail-select');
							$(
									'.select-layout-item .thumbnail[value='
											+ value + ']', layoutsEl).addClass(
									'thumbnail-select');
						});
				$('.select-layout-item .thumbnail', layoutsEl).click(
						function() {
							var value = $(this).attr('value');
							me.mng.setLayout(value);
							$('.thumbnail', layoutsEl).removeClass(
									'thumbnail-select');
							$(
									'.select-layout-item .thumbnail[value='
											+ value + ']', layoutsEl).addClass(
									'thumbnail-select');
							$('input[name=layout][value=' + value + ']',
									layoutsEl).get(0).checked = true;
						});

				$('input[name=layout][value=' + me.mng.layout + ']', layoutsEl)
						.get(0).checked = true;
				$('.thumbnail', layoutsEl).removeClass('thumbnail-select');
				$(
						'.select-layout-item .thumbnail[value=' + me.mng.layout
								+ ']', layoutsEl).addClass('thumbnail-select');

				$('.select-widget >ul >li>a', me.el).removeClass('checked');
				for ( var i = 0; i < me.mng.widgets.length; i++) {
					var id = me.mng.widgets[i].widgetId;
					if (id) {
						$('.select-widget ul >li>a[widgetid=' + id + ']', me.el)
								.addClass('checked');
					}
				}

			})();
			$('.select-widget', me.el).jScrollPane();
		}
	};

	global.PortalSet = PortalSet;
})(window);

/*
 * file from "UI\portal2\process\portal\components\customizer.js"
 */

(function(global) {

	var Customizer = function(config) {
		$.extend(this, config);
		this.enableSave = !justep.Portal.agentInfo;
	};

	Customizer.prototype = {
		doSave : function(key, data) {
			if (!this.enableSave)
				return;
			var params = new justep.Request.ActionParam();
			params.setString(key, JSON.stringify(data));
			params.setString('personID', justep.Context.getCurrentPersonID());
			var action = key === 'functree' ? "saveFunctreeAction"
					: "savePortalAction";
			response = justep.Request.sendBizRequest(
					"/portal2/process/portal/portalProcess", "index", action,
					params, null, null, false);
			if (!justep.Request.isBizSuccess(response)) {
				var msg = new justep.Message(justep.Message.JUSTEP233000, key);
				throw justep.Error.create(msg);
			}
		},
		saveFunctree : function(data) {
			this.doSave("functree", data);
		},
		savePortal : function(data) {
			this.doSave("portal", data);
		},
		save : function(key, data) {
			if (!this.enableSave)
				return;
			this.other[key] = data;
			var params = new justep.Request.ActionParam();
			params.setString("other", JSON.stringify(this.other));
			params.setString('personID', justep.Context.getCurrentPersonID());
			response = justep.Request.sendBizRequest(
					"/portal2/process/portal/portalProcess", "index",
					"saveOtherAction", params, null, null, false);
			if (!justep.Request.isBizSuccess(response)) {
				var msg = new justep.Message(justep.Message.JUSTEP233000, key);
				throw justep.Error.create(msg);
			}
		},
		get : function(key) {
			return this.other[key];
		}

	};

	global.Customizer = Customizer;
	justep.Portal.Customizer = Customizer;
})(window);
/*
 * file from "UI\portal2\process\portal\components\portalManager.js"
 */

(function(global) {

	function PortalManager(config) {
		$.extend(this, config);
		this.widgets = this.widgets || [];
		if (this.customizer.portal.widgets) {
			$.extend(this, this.customizer.portal);
		}
		eventable(this);
		this.data = {};
		this.init();
	}
	;

	// this.callEvent('remove-shortcut', [this.clone(item)]);

	PortalManager.prototype = {
		init : function() {
			this.indexTable = {};
			for ( var c in this.widgetDefs) {
				if (this.widgetDefs.hasOwnProperty(c)) {
					var some = this.widgetDefs[c].widgets, category = this.widgetDefs[c].category;
					for ( var i in some) {
						var one = some[i];
						// 生成唯一id
						one.id = this.funcMng.genId(one);
						if (!this.indexTable[one.id]) {
							this.indexTable[one.id] = one;
						}
					}
				}
			}
		},
		setLayout : function(id) {
			if (this.layout != id) {
				this.layout = id;
				this.callEvent('layout-change', [ id ]);
				this.save();
			}
		},
		addWidget : function(id) {
			// 默认加到dock 0
			var me = this, dock = 0, widget = {
				dock : dock,
				widgetId : id,
				position : (function() {
					var max = 0;
					for ( var i in me.widgets) {
						if (me.widgets[i].dock === dock)
							max = max > me.widgets[i].position ? max
									: (me.widgets[i].position + 1);
					}
					return max;
				})()
			};

			this.widgets.push(widget);
			this.callEvent('add-widget', [ widget ]);
			this.save();
		},
		removeWidget : function(id) {
			var widgets = this.widgets;
			this.widgets = [];
			for ( var i = 0; i < widgets.length; i++) {
				var widget = widgets[i];
				if (widget.widgetId === id)
					continue;
				this.widgets.push(widget);
			}
			this.callEvent('remove-widget', [ id ]);
			this.save();
		},
		setWidgetDock : function(id, dockIndex, position) {
			var widgets = this.widgets;
			for ( var i = 0; i < widgets.length; i++) {
				var widget = widgets[i];
				if (position[widget.widgetId] != undefined) {
					widget.position = position[widget.widgetId];
				}
				if (widget.widgetId === id) {
					if (widget.dock != dockIndex) {
						widget.dock = dockIndex;
						this.callEvent('dock-changed', [ id, dockIndex ]);
					}
				}
			}
			this.save();
		},
		setWidgetAttr : function(id, name, value) {
			var widgets = this.widgets;
			for ( var i = 0; i < widgets.length; i++) {
				var widget = widgets[i];
				if (widget.widgetId === id) {
					if (widget[name] != value) {
						widget[name] = value;
						this.save();
					}
					return;
				}
			}
		},
		eachLayout : function(cb) {
			var me = this;
			$.each(util.getKeys(this.layouts), function(i, name) {
				cb(me.layouts[name], name);
			});
		},
		getWidgetDefById : function(id) {
			return this.indexTable[id];
		},
		eachWidgetDef : function(cb) {
			for ( var c in this.widgetDefs) {
				if (this.widgetDefs.hasOwnProperty(c)) {
					var some = this.widgetDefs[c].widgets, category = this.widgetDefs[c].category;
					for ( var i in some) {
						var one = some[i];
						if ((this.indexTable[one.id] == one) && one.url)
							cb(one, category);
					}
				}
			}
			return null;
		},
		save : function() {
			this.customizer.savePortal({
				widgets : this.widgets,
				layout : this.layout
			});
		},
		runFunc : function(item) {
			this.funcMng.runFunc(item);
		},
		refresh : function(all) {
			this.callEvent('refresh-widget', [ all ]);
		}
	};

	global.PortalManager = PortalManager;
	justep.Portal.PortalManager = PortalManager;
})(window);

/*
 * file from "UI\portal2\process\portal\components\collection.js"
 */

(function(global) {

	function Collection() {
		this.keys = [];
		this.items = [];
		this.map = {};
		this.length = 0;
	}

	Collection.prototype = {
		add : function(key, obj) {
			var me = this, myObj = obj, myKey = key, old;

			if (arguments.length == 1) {
				myObj = myKey;
				myKey = me.getKey(myObj);
			}
			if (typeof myKey != 'undefined' && myKey !== null) {
				old = me.map[myKey];
				if (typeof old != 'undefined') {
					return false;
				}
				me.map[myKey] = myObj;
			}
			me.length++;
			me.items.push(myObj);
			me.keys.push(myKey);
			return myObj;
		},

		addAll : function(objs) {
			var me = this, i = 0, args, len, key;

			if (arguments.length > 1 || util.Array.isArray(objs)) {
				args = arguments.length > 1 ? arguments : objs;
				for (len = args.length; i < len; i++) {
					me.add(args[i]);
				}
			} else {
				for (key in objs) {
					if (objs.hasOwnProperty(key)) {
						if (typeof objs[key] != 'function') {
							me.add(key, objs[key]);
						}
					}
				}
			}
		},
		get : function(id) {
			var index = this.indexOfKey(id);
			return this.items[index];
		},

		each : function(fn, scope) {
			var items = [].concat(this.items), // each safe for removal
			i = 0, len = items.length, item;

			for (; i < len; i++) {
				item = items[i];
				if (fn.call(scope || item, item, i, len) === false) {
					break;
				}
			}
		},
		removeAt : function(index) {
			var me = this, o, key;

			if (index < me.length && index >= 0) {
				me.length--;
				o = me.items[index];
				util.Array.erase(me.items, index, 1);
				key = me.keys[index];
				if (typeof key != 'undefined') {
					delete me.map[key];
				}
				util.Array.erase(me.keys, index, 1);
				return o;
			}
			return false;
		},

		insert : function(index, key, obj) {
			var me = this, myKey = key, myObj = obj;

			if (arguments.length == 2) {
				myObj = myKey;
				myKey = me.getKey(myObj);
			}
			if (me.containsKey(myKey)) {
				me.removeAtKey(myKey);
			}
			if (index >= me.length) {
				return me.add(myKey, myObj);
			}
			me.length++;
			util.Array.splice(me.items, index, 0, myObj);
			if (typeof myKey != 'undefined' && myKey !== null) {
				me.map[myKey] = myObj;
			}
			util.Array.splice(me.keys, index, 0, myKey);
			return myObj;
		},

		removeAtKey : function(key) {
			return this.removeAt(this.indexOfKey(key));
		},

		indexOfKey : function(key) {
			return util.Array.indexOf(this.keys, key);
		},

		containsKey : function(key) {
			return typeof this.map[key] != 'undefined';
		},

		moveTo : function(index, key) {
			return this.insert(index, key, this.map[key]);
		}
	};

	global.Collection = Collection;
})(window);
/*
 * file from "UI\portal2\process\portal\components\funcManager.js"
 */

(function(global) {

	/*
	 * event: run-func close-func
	 */

	function FuncManager(config) {
		eventable(this);
		// 正在运行的功能
		this.runing = {};
		$.extend(this, config);

		// 和待办相关
		this.openers = [];
		this.agents = this.agents || [];

		//
		this.init();

		// 常用功能 可排序
		this.shortcut = new Collection();
		this.shortcut.getKey = function(obj) {
			return obj;
		};
		var enabled = [], shortcut = this.customizer.functree.shortcut;
		for ( var i in shortcut) {
			if (this.getItem(shortcut[i])) {
				enabled.push(shortcut[i]);
			}
		}
		this.shortcut.addAll(enabled);

	}
	;

	// 遍历功能树, 深度优先
	FuncManager.prototype.each = function(cb) {
		function walk(data, parent) {
			for ( var i = 0; i < data.length; i++) {
				var item = data[i];
				if (!cb(item, parent, i) && item.childNodes)
					walk(item.childNodes, item);
			}
		}
		walk(this.data);
	}

	FuncManager.prototype.init = function() {
		var me = this;
		this.indexTable = {};
		this.each(function(item, parent, index) {
			item.parent = parent;
			item.index = parent ? (parent.index + ' ' + index) : index;
			item.fullName = parent ? (parent.fullName + '\\' + item.title)
					: item.title;
			if (item.url) {
				item.executor = me.genExecutor();
				item.id = me.genId(item);
				if (!me.indexTable[item.id])
					me.indexTable[item.id] = item;
			}
		});
	};

	FuncManager.prototype.genExecutor = function() {
		return justep.Portal.agentInfo ? justep.Portal.agentInfo.currentPersonID
				: justep.Context.getCurrentPersonID();
	};

	FuncManager.prototype.genId = function(item) {
		// *基于url activity process params 生成id(md5)
		var s = ((item.url || "") + (item.activity || "")
				+ (item.process || "") + (item.params || "")).toLowerCase();
		return hex_md5(s);
	};

	FuncManager.prototype.getItem = function(id) {
		return this.indexTable[id];
	};

	FuncManager.prototype.getFuncTree = function() {
		return this.data;
	};

	// private
	FuncManager.prototype.clone = function(item, executor) {
		return {
			id : item.id,
			label : item.label,
			fullName : item.fullName,
			url : item.url,
			params : item.params,
			process : item.process,
			activity : item.activity,
			onload : item.onload,
			executor : executor || item.executor,
			opener : item.opener,
			icon : item.icon,
			icon16 : item.icon16,
			icon32 : item.icon32,
			icon64 : item.icon64
		};
	}

	// name, url, parm
	FuncManager.prototype.runFunc = function(id, executor) {
		var item = id;
		if (typeof item == "string")
			item = this.getItem(item);

		if (item) {
			if (!item.id)
				item.id = this.genId(item);

			if (!this.isRuned(item.id)) {
				this.runing[item.id] = item;
				this.callEvent('run-func', [ this.clone(item, executor) ]);
			} else {
				this.callEvent('active-func', [ this.clone(item, executor) ]);
			}
			return item.id;
		}
	};

	FuncManager.prototype.refreshFunc = function(item) {
		if (!item.oldId || !this.isRuned(item.oldId)) {
			this.runFunc(item);
			return;
		}
		if (!item.id)
			item.id = this.genId(item);

		if (!this.isRuned(item.id)) {
			delete this.runing[item.oldId];
			this.runing[item.id] = item;
			var temp = this.clone(item);
			temp.oldId = item.oldId;
			this.callEvent('refresh-func', [ temp ]);
		} else {
			this.callEvent('active-func', [ this.clone(item) ]);
		}
		return item.id;
	};

	FuncManager.prototype.closeFunc = function(id) {
		id = id || justep.Portal.getWindowId();
		if (typeof id == 'object')
			id = id.id;
		var item = this.runing[id];
		if (item) {
			delete this.runing[id];
			this.callEvent('close-func', [ this.clone(item) ]);
		}
	};

	FuncManager.prototype.isShortcut = function(id) {
		return this.shortcut.indexOfKey(id) != -1;
	};

	FuncManager.prototype.isRuned = function(id) {
		return !!this.runing[id];
	};

	FuncManager.prototype.addShortcut = function(id) {
		var item = id;
		if (typeof item == 'string')
			item = this.getItem(item);

		if (item && this.shortcut.indexOfKey(item.id) == -1) {
			this.shortcut.add(item.id);
			this.callEvent('add-shortcut', [ this.clone(item) ]);
			this.save();
		}
	};

	FuncManager.prototype.removeShortcut = function(id) {
		var item = id;
		if (typeof item == 'string')
			item = this.getItem(item);

		id = this.shortcut.removeAtKey(item.id);
		if (id) {
			this.callEvent('remove-shortcut', [ this.clone(item) ]);
			this.save();
		}
	};

	FuncManager.prototype.moveShortcut = function(index, id) {
		this.shortcut.moveTo(index, id);
		this.save();
	};

	FuncManager.prototype.eachShortcut = function(cb) {
		var me = this;
		this.shortcut.each(function(id) {
			var item = me.getItem(id);
			cb(me.clone(item));
		});
	};

	FuncManager.prototype.getRunedCount = function() {
		var count = 0;
		for ( var k in this.runing) {
			if (this.runing.hasOwnProperty(k)) {
				++count;
			}
		}
		return count;
	};

	FuncManager.prototype.save = function() {
		var shortcut = [];
		this.customizer.saveFunctree({
			shortcut : this.shortcut.items
		});
	};

	FuncManager.prototype.getAgentCount = function(cb) {
		return this.agents.length;
	};

	FuncManager.prototype.eachAgent = function(cb) {
		for ( var i in this.agents) {
			cb(this.agents[i]);
		}
	}

	FuncManager.prototype.openAgentPage = function(agentId) {
		var opener = window.open("index.w?agent=" + agentId + '&bsessionid='
				+ this.bsessionid, agentId);
		this.openers.push(opener);
		return opener;
	};

	FuncManager.prototype.closeAllAgentPage = function() {
		for ( var i in this.openers) {
			this.openers[i].close();
		}
	};

	global.FuncManager = FuncManager;
	justep.Portal.FuncManager = FuncManager;
})(window);
/*
 * file from
 * "UI\portal2\process\portal\components\accordion\AccordionMenuTree.js"
 */

(function(global) {
	function AccordionMenuTree(options) {
		$.extend(this, options);
		this.el = this.el || $('#' + this.id);
		this.init();
	}

	AccordionMenuTree.prototype = {
		init : function() {
			this.el.addClass('accordionMenuTree').addClass("leftTreeOverFlow");
		},
		// 目前二级导航以后手风琴方式显示
		create : function(data) {
			var me = this;
			this.el.empty();

			this.sidebarEL = $("<div></div>");
			this.sidebarEL.addClass("sidebar");
			this.sidebarEL.attr("id", "sidebar");

			// step 1:构建一级 标题栏
			var $shortcuts = $('<div class="sidebar-shortcuts" id="sidebar-shortcuts"><div>');
			$shortcuts.attr("title", data.label).text(data.label);

			// step 2:构建二级 横向伸缩栏

			var html = [];
			// /////////////////////////////////////
			function draw(items, path, le) {
				path = path || [];
				if (!items)
					return;
				if (items.length !== 0) {
					html.push('<ul class="'
							+ (le == 0 ? "nav nav-list" : "submenu") + '">');
					$
							.each(
									items,
									function(i, item) {
										path.push(i);
										var isDir = item.childNodes
												&& (item.childNodes.length > 0);

										html.push('<li class="close" title="'
												+ item.label + '" data-level="'
												+ item.level + '" > ');

										if (item.level === 1) {
											html
													.push('<a class="dropdown-toggle" data-path="'
															+ path.join(' ')
															+ '" >');
											if (!item.icon16) {
												var _icon = "acc-icon-"
														+ item.icon16;
												html
														.push('<i class="iconfont iconfont-menu">&#xe008;</i>');
											}
											html
													.push('<span class="menu-text">'
															+ global.utils
																	.truncate(
																			item.label,
																			12)
															+ '</span>');
										} else {
											html.push('<a data-path="'
													+ path.join(' ') + '" >');
											if (!item.icon16) {
												html
														.push('<i class="iconfont iconfont-menu">&#xe008;</i>');
											}
											html.push(global.utils.truncate(
													item.label, 9));
										}
										if (isDir) {
											html
													.push('<i class="iconfont iconfont-black arrow" style="float:right;padding-top:8px;padding-left:10px;font-size: 16px;">&#xea50;</i>');
										}
										html.push('</a>');

										draw(item.childNodes, path, 1);

										html.push('</li>');
										path.pop();
									});
					html.push('</ul>');
				}
				;
			}
			draw(data.childNodes, null, 0);

			// 伸缩按钮
			var $toggleBtn = $('<div class="sidebar-bottom"><span><i class="iconfont arrow-bottom" >&#xe02b;</i></span><div>');
			$toggleBtn
					.click(function() {
						$(".sidebar > ul > li").unbind("mouseover").unbind(
								"mouseleave");

						if (me.sidebarEL.hasClass('menu-min')) {
							// 伸展效果
							// 树导航处理
							me.sidebarEL.removeClass("menu-min");
							$shortcuts.empty().text(data.label);
							$(this).children("i").html("&#xe02b;");
							me.el.removeClass("leftTreeOverFlow-def").addClass(
									"leftTreeOverFlow");
							;
							// 改变内容区域大小
							$("#func").removeClass("min-func").addClass(
									"max-func");
						} else {
							// 收缩效果
							me.sidebarEL.addClass("menu-min");
							$shortcuts
									.empty()
									.html(
											'<i class="iconfont iconfont-white iconfont-size16" >&#xe063;</i>');
							$(this).children("i").html("&#xe02c;");

							$(".menu-min > ul > li > ul").addClass("subNone");
							$(".menu-min > ul > li").mouseover(
									function() {
										$(this).children("a").children("span")
												.addClass("showImportant");

										$(this).children("ul").removeClass(
												"subNone").addClass(
												"showImportant");
									}).mouseleave(
									function() {
										$(this).children("a").children("span")
												.removeClass("showImportant");

										$(this).children("ul").addClass(
												"subNone").removeClass(
												"showImportant");
									});
							me.el.removeClass("leftTreeOverFlow").addClass(
									"leftTreeOverFlow-def");
							// 改变内容区域大小

							$("#func").removeClass("max-func").addClass(
									"min-func");
						}
						;
					});

			this.sidebarEL.append($shortcuts);// 标题
			this.sidebarEL.append(html.join(""));

			this.sidebarEL.append($toggleBtn);// 伸缩按钮
			this.el.append(this.sidebarEL);
			this.open(data);
			return null;
		},
		_FTemplate : function(template, json) {
			// 格式化指定键值的模板
			return template.replace(/\#\{(.*?)\}/g, function(all, key) {
				return json && (key in json) ? json[key] : "";
			});
		},
		open : function(options) {
			var me = this;
			$('a', this.el)
					.click(
							function() {
								var _self = this;
								var path = $(_self).attr('data-path')
										.split(' ');
								var data = options;
								$.each(path, function(a, i) {
									if (data && data.childNodes
											&& data.childNodes[i]) {
										data = data.childNodes[i];
									}
								});
								if (data && data.role == 'func') {
									$("li", me.sidebarEL).removeClass("active");
									$(_self).parent().removeClass("close")
											.addClass("active");
									$("#default-iframe", this.el).hide();
									me.funcMng.runFunc(data);
								}
								if (data && data.role == 'dir') {
									// 全部隐藏
									var $allLi = $("li.open", $(".nav ")), $allUl = $allLi
											.children("ul.submenu");
									// 隐藏显示
									var $ul = $(_self).siblings("ul.submenu");

									if (!$(_self).parents("li")
											.hasClass("open")) {
										$allLi.removeClass("open").addClass(
												"close");
										;
										$allUl.hide();
									}
									;

									if ($ul.is(':hidden')) {
										$ul.parent().removeClass("close");
										$ul.parent().addClass("open");
										$ul.show();
									} else {
										$ul.parent().removeClass("open");
										$ul.parent().addClass("close");
										$ul.hide();
									}
								}
							});

		},
		toggleCollapse : function(index) {
			$('label', this.el).click(function() {
				funLableTriggerHandler(this);
			});
		},
		togglePage : function(index) {
			$('>dl >dt:eq(' + index + ')', this.el).toggle();
			$('>dl >dd:eq(' + index + ')', this.el).toggle();
		},
		setPageTitle : function(index, name) {
			$('>dl >dt:eq(' + index + ') .title', this.el).html(name);
		},
		slidePage : function(index) {
			var page = this.pages[index];
			page.ddEl.slideToggle(1000, function() {
				page.titleEl.toggleClass('on');
				page.barEl.toggle();
			});
		},
		extendPage : function(index) {
			var page = this.pages[index];
			if (page.ddEl.is(":hidden"))
				page.ddEl.slideDown(1000, function() {
					page.titleEl.toggleClass('on');
					page.barEl.toggle();
				});
		},
		unextendPage : function(index) {
			var page = this.pages[index];
			if (page.ddEl.is(":visible"))
				page.ddEl.slideUp(1000, function() {
					page.titleEl.toggleClass('on');
					page.barEl.toggle();
				});
		},
		extendAll : function() {
			var me = this;
			$.each(this.pages, function(i, page) {
				me.extendPage(i);
			});
		},
		unextendAll : function() {
			var me = this;
			$.each(this.pages, function(i, page) {
				me.unextendPage(i);
			});
		},
		enable : function(index, value) {
			var page = this.pages[index];
			if (page)
				if (value) {

					page.el.show();
					page.ddEl.show();
				} else {
					page.el.hide();
					page.ddEl.hide();
				}

		}
	};

	global.AccordionMenuTree = AccordionMenuTree;
})(window);
/*
 * file from "UI\portal2\process\portal\components\functreeview\funcTreeView.js"
 */

(function(globel) {
	var FuncTreeView = function(options) {
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.accordionMenu = new AccordionMenuTree({
			el : $('.left', $("#funcFrame")),
			funcMng : this.funcMng,
			onclick : function(data) {
				// me.open(data);
			}
		});
		this.init();
	};

	// private
	FuncTreeView.prototype.init = function() {
		this.data = this.funcMng.getFuncTree();
		function walkData(data, level, path, cb) {
			for ( var i = 0; i < data.length; i++) {
				var item = data[i];
				cb(item, level, path);
				item.childNodes
						&& walkData(item.childNodes, level + 1, path + '/'
								+ item.label, cb);
			}
		}
		walkData(this.data, 0, '', function(item, level, path) {
			item.level = level;
			item.extended = false;
			item.column = null;
			item.el = null;
			item.scrolled = false;
			item.role = (item.url == undefined) ? 'dir' : (function() {
				item.fullName = path + '/' + item.label;
				return 'func';
			})();

		});
		// this.el.addClass('functreeview');
		this.el.addClass('scrollbar');
		// create root column
		this.el.empty();
		// this.el.append($("<a class='close' href='#close' title='点击隐藏'><i
		// class='iconfont iconfont-def'>&#xe600;</i></a>").click(function(){
		// $('.fun-map').hide();
		// }));

		this.el
				.append('<a class="prev icon icon-system-left-open" href="#"></a>');
		this.el
				.append('<a class="next icon icon-system-right-open" href="#"></a>');
		this.el
				.append('<div class="wrap"><ul class="fixed"><li style="display: inline-block;" funcid="firstPage"><a class="acc-icon-homePage">首页</a></li></ul><div class="other"><ul></ul></div></div>');
		this.fixedULEl = $('.fixed', this.el);

		// 点击首页效果
		$('a.acc-icon-homePage', this.el).click(function() {
			$('#funcFrame').hide();
			$(".left", '#funcFrame').hide();
			$('.content').show();
			$("#default-iframe").hide();
			$("#func").removeClass("max-func").removeClass("min-func");
		});

		$('.wrap .other', this.el).css({
			marginLeft : this.fixedULEl.width()
		});

		this.ulEl = $('.wrap .other ul', this.el);
		this.ulEl.disableSelection();

		this.rootColumn = this.createColumn(this.data);

		var cfd = ul.carouFredSel({
			circular : false,
			auto : false,
			width : '100%',
			align : 'left',
			height : 40,
			padding : [ 0, 5, 0, 0 ],
			prev : $('.prev', this.el),
			next : $('.next', this.el),
			mousewheel : true,
			swipe : {
				onMouse : true,
				onTouch : true
			}
		});
		// this.el.append(this.rootColumn);

		/*
		 * if(!this.scolling){ $(this.rootColumn).jScrollPane(); this.scolling =
		 * true; }
		 */
	};

	// private
	FuncTreeView.prototype.createColumn = function(data, level) {
		var me = this;
		ul = this.ulEl;
		for ( var i = 0; i < data.length; i++) {
			var item = data[i], serverName = window.location.pathname
					.split('/')[1], style = ((item.role == 'func') && (item.icon16 || item.icon)) ? ('style="background-image: url(/'
					+ serverName + (item.icon16 || item.icon) + ')"')
					: undefined;
			var _icon = (item.icon16 || item.icon);
			var li = $('<li role="'
					+ item.role
					+ '" style="display: inline-block;"><a href=\'#\' class="acc-icon-'
					+ _icon + '">' + item.label + '</a></li>');
			item.el = li;
			if (item.role !== 'func')
				li
						.click((function(item) {
							return function() {
								if (item.extended)
									return false;
								// console.dir(item);
								$('.content').hide();
								$(".left", '#funcFrame').show();
								// 判断funcTree里面的当前，无prcess,默认打开第一个
								$("iframe", '#funcFrame').hide();
								$('#funcFrame').show();

								me.accordionMenu.create(item);
								// 改变内容区域大小
								$("#func").removeClass("min-func").addClass(
										"max-func");

								var $firstLi = $('.nav').children("li").first();
								$firstLi.removeClass("close").addClass("open");
								$firstLi.children("ul.submenu").show();

								if ($firstLi.children("ul.submenu").length === 0) {
									// 打开当前下的a节点
									$firstLi.children("a").triggerHandler(
											"click");
								} else {
									var $cLi = $firstLi.find("li").first()
											.children("a");
									if ($cLi.size()) {
										$cLi.triggerHandler("click");
									} else {
										$firstLi.children("a").triggerHandler(
												"click");
									}
									;
								}

								return false;
							}
						})(item));

			if (item.role == 'func')
				li.click((function(item) {
					return function() {
						$('.content').hide();
						$('#funcFrame').show();
						$("iframe", '#funcFrame').hide();
						// 判断funcTree里面的当前，有url并且有子节点，打开url
						if (item.childNodes.length > 0) {

							me.accordionMenu.create(item);
							// 改变内容区域大小
							$("#func").removeClass("min-func").addClass(
									"max-func");

							$("#default-iframe").show();
							// 需要转换 并且设置iframe的大小
							me.open(item, $("#default-iframe"));
						} else {
							$("#default-iframe").hide();
							// 改变内容区域大小
							$("#func").removeClass("min-func").removeClass(
									"max-func");
							me.funcMng.runFunc(item);
						}

					};
				})(item));
			ul.append(li);
		}

		var left = level == undefined ? 0 : level * this.rootColumn.width();
		ul.css({
			left : left
		});
		return ul;
	};
	// option需要
	FuncTreeView.prototype.open = function(option, target) {
		var uiserverName = window.location.pathname.split('/')[1];
		var url = option.url;

		if (/^http.*/.test(url)) {
			if (option.params) {
				if (url.indexOf('?') != -1)
					url += '&';
				else
					url += '?';
				url += option.params;
			}

		} else {
			if (url.indexOf('?') != -1)
				url += '&$log=1';
			else
				url += '?$log=1';

			url = '/' + uiserverName + url + '&bsessionid='
					+ justep.Portal.controllers.funcManager.bsessionid;
			if (option.process)
				url += '&process=' + option.process;
			if (option.activity)
				url += '&activity=' + option.activity;
			if (option.executor)
				url += '&executor=' + option.executor;

			url += '&language=' + justep.Portal.language;

			if (option.params)
				url += option.params;
		}
		target.height($(window).height() - $("#main").height() - 5);// ie8
		// 下如果不多减一些会出滚动条
		if (target.height()) {
			$(".left").height(target.height());
		}
		target.src(url, function(iframe, duration) {
			if (option.onload)
				option.onload.apply(this);
		});
	};
	// private
	FuncTreeView.prototype.getExtendedInColumn = function(data) {
		for ( var i = 0; data && i < data.length; i++) {
			if (data[i].extended) {
				return data[i];
			}
		}
		return null;
	}
	// private
	FuncTreeView.prototype.getColumnAt = function(level) {
		var childNodes = this.data;
		while (--level >= 0) {
			var item = this.getExtendedInColumn(childNodes);
			if (!item)
				break;
			childNodes = item.childNodes;
		}
		return childNodes;
	}

	// private
	FuncTreeView.prototype.getActiveAt = function(level) {
		var column = this.getColumnAt(level);
		return this.getExtendedInColumn(column);
	}

	// private
	FuncTreeView.prototype.shrink = function(item) {
		if (typeof item == 'number') {
			item = this.getActiveAt(item);
		}
		if (item && item.extended) {
			var subExtended = this.getExtendedInColumn(item.childNodes);
			this.shrink(subExtended);
			item.column.hide();
			item.el.attr('extended', 'off');
			item.extended = false;
		}
	}

	// private
	FuncTreeView.prototype.find = function(path) {
		if (typeof path == 'string')
			path = path.split(' ');
		var item, data = this.data;
		while (path.length) {
			var index = parseInt(path.shift());
			item = data[index];
			data = item.childNodes;
		}
		return item;
	}

	// private
	FuncTreeView.prototype.getEmptyColumn = function() {
		if (!this.emptyColumn) {
			this.emptyColumn = $('<div class="column"><span class="empty">&lt;空&gt;</span></div>');
		}
		return this.emptyColumn;
	}

	FuncTreeView.prototype.createDetail = function(item) {
		var me = this, div = $('<div class="detail">'
				+ '<div style="width:100%;">' + '<div class="bar">' + '<ul>'
				+ '<li>' + '<a class="fun-run-btn" href="#">运行</a>' + '</li>'
				+ '<li class="set-quick-func-btn">' + '<a href="#">设置为常用功能</a>'
				+ '</li>' + '</ul>' + '</div>' + '<div class="info">'
				+ '<span>' + item.label + '</span>'
				+ '<a class="more-info-btn"  href="#">详细</a>'
				+ '<div class="more">' + '<span>' + item.fullName
				+ '</span><br/>' + '<span>' + item.url + '</span><br/>'
				+ '<a class="more-info-close-btn" href="#">隐藏</a>' + '</div>'
				+ '</div>' + '<div class="pos">' + '<span>岗位选择</span>'
				+ '<a class="more-info-btn"  href="#">详细</a>'
				+ '<div class="more">' + '</div>' + '</div>' + '</div>'
				+ '</div>');

		if (parseInt(item.psmCount) > 1) {
			$('.pos', div).css({
				display : "block"
			});
			var params = new justep.Request.ActionParam();
			params.setString('process', item.process);
			params.setString('activity', item.activity);
			params.setString('type', "json");
			response = justep.Request.sendBizRequest2({
				'process' : "/SA/OPM/system/systemProcess",
				'activity' : "mainActivity",
				'action' : 'getPersonMembersAction',
				'parameters' : params,
				'dataType' : 'json'
			// 'executor' : executor
			});
			if (!justep.Request.isBizSuccess(response, 'json')) {
				var msg = new justep.Message(justep.Message.JUSTEP233001);
				throw justep.Error.create(msg);
			}
			var psm = justep.Request.responseParseJSON(response).data.value;
			var more = $('.pos .more', div);
			for ( var key in psm) {
				if (psm.hasOwnProperty(key)) {
					var posRun = $(
							'<span><a href="#">' + psm[key]
									+ '</a></span><br/>').click((function(key) {
						return function() {
							me.funcMng.runFunc(item, key);
						};
					})(key));
					more.append(posRun);
				}
			}
			more.append('<a class="more-info-close-btn" href="#">隐藏</a>');
		}

		var w = this.rootColumn.width() * (item.level + 1);
		div.css({
			'margin-left' : w
		});
		$('.fun-run-btn', div).click(function() {
			me.funcMng.runFunc(item);
			if (me.onrun) {
				me.onrun.call(this, {
					label : item.label
				});
			}
			return false;
		});
		if (this.funcMng.isShortcut(item.id)) {
			$('.set-quick-func-btn', div).hide();
		}
		$('.set-quick-func-btn', div).click(function() {
			me.funcMng.addShortcut(item);
			$(this).fadeOut(500);
			return false;
		});

		$('.info .more-info-btn', div).click(function() {
			$('.info .more', div).show();
			$(this).hide();
			return false;
		});

		$('.info .more-info-close-btn', div).click(function() {
			$('.info .more', div).hide();
			$('.info .more-info-btn', div).show();
			return false;
		});

		$('.pos .more-info-btn', div).click(function() {
			$('.pos .more', div).show();
			$(this).hide();
			return false;
		});

		$('.pos .more-info-close-btn', div).click(function() {
			$('.pos .more', div).hide();
			$('.pos .more-info-btn', div).show();
			return false;
		});

		return div;
	};

	FuncTreeView.prototype.setShortcutable = function(id) {
		var id = (typeof id == 'string') ? id : id.id, item = this.funcMng
				.getItem(id);
		if (item && (item.role == 'func') && item.column) {
			$('.set-quick-func-btn', item.column).fadeIn(500);
		}
	};

	FuncTreeView.prototype.extend = function(item) {
		var me = this;
		if (this.extending)
			return;
		this.extending = true;
		if (typeof item == 'string') {
			item = this.find(item);
		}
		this.shrink(item.level);

		item.extended = true;
		item.el.attr('extended', 'on');
		if (!item.column) {
			if (item.role == 'dir') {
				if (item.childNodes && item.childNodes.length > 0)
					item.column = this.createColumn(item.childNodes,
							item.level + 1);
				else
					item.column = this.getEmptyColumn();
			}
			if (item.role == 'func') {
				item.column = this.createDetail(item);
			}
			item.column.hide();
			this.el.append(item.column);
		}

		if (item.column) {
			item.column.css({
				'overflow' : 'hidden'
			});
			if (item.role == 'dir')
				item.column.effect('slide', 400, function() {
					if ((item.role == 'dir') && !item.scrolled) {
						$(item.column).jScrollPane();
						item.scrolled = true;
					}
					me.extending = false;
				});
			else {
				item.column.show();
				this.extending = false;
			}
		} else {
			this.extending = false;
		}
	};

	globel.FuncTreeView = FuncTreeView;
	justep.Portal.FuncTreeView = FuncTreeView;
})(window);

/*
 * file from "UI\portal2\process\portal\components\flagbar\flagbar.js"
 */

(function(global) {

	var FlagBar = function(options) {
		$.extend(this, options);
		this.li = $('#' + this.id).children("li");
		this.index = this.index || li.size();
		this.el = this.li.eq(this.index);
		this.buttons = this.buttons || [];
		this.init();
		if (this.onCreated) {
			this.onCreated.call(this);
		}
	};

	FlagBar.prototype = {
		init : function() {
			var me = this;
			// this.el.addClass('flagbar');
			// this.el.empty();

			for ( var i in this.buttons) {
				var btn = this.buttons[i];
				var html = '<li class="rightNav mo-short"><a title="'
						+ btn.title
						+ '" class="myIcon" href="javascript:void(0);"></a></li>';
				var li = $(html);
				var $i = '<i class="iconfont iconfont-title">' + btn.fontValue
						+ '</i>';

				btn.name = i;
				btn.el = li;
				li.attr('show', 'on');
				li.attr('id', btn.id);
				li.children("a").append($i);

				if (btn.click) {
					li.click((function(btn) {
						return function() {
							btn.click.call(me, btn.name);
							return false;
						};
					})(btn));
				}

				if (btn.flag) {
					var span = $('<span class="badge"></span>');
					li.children("a").append(span);
					btn.flag.el = span;
					this.flag(btn.name, btn.flag.defaultValue);
				}
				this.el.before(li);
			}
			this._innerProcess();
		},
		// private
		_innerProcess : function() {
			$('li[show=on]', this.el).removeAttr('first').first().attr('first',
					'');
			$('li[show=on]', this.el).removeAttr('last').last()
					.attr('last', '');

		},
		show : function(id, effect) {
			if (effect == undefined)
				effect = true;
			var btn = this.buttons[id];
			if (btn) {
				btn.el.fadeIn(effect ? 600 : 0);
				btn.el.attr('show', 'on');
				this._innerProcess();
			}
		},
		hide : function(id, effect) {
			if (effect == undefined)
				effect = true;
			var btn = this.buttons[id];
			if (btn) {
				btn.el.fadeOut(effect ? 600 : 0);
				btn.el.attr('show', 'off');
				this._innerProcess();
			}
		},
		click : function(id) {
			var btn = this.buttons[id];
			if (btn) {
				btn.click.call(this, btn.name);
			}
		},
		flag : function(name, value) {
			var btn = this.buttons[name];
			if (btn && btn.flag) {
				if (value == undefined) {
					return btn.flag.value;
				}
				btn.flag.value = value;
				btn.flag.el.html(value);
				if (value == 0 || value == "0")
					btn.flag.el.hide();
				else
					btn.flag.el.show();
				// if(value===0 || value===null || value===''){
				// this.hide(name);
				// }else{
				// this.show(name);
				// }
				return btn.flag.value;
			}
		}
	};

	global.FlagBar = FlagBar;
})(window);

/*
 * file from "UI\portal2\process\portal\components\sortablebar\sortablebar.js"
 */

(function(global) {

	var SortableBar = function(options) {
		$.extend(this, options);
		this.emptyText = this.emptyText || '&lt;空&gt;';
		this.el = $('#' + this.id);
		this.init();
		if (this.oncreate)
			this.oncreate.call(this);
	};

	SortableBar.prototype = {
		init : function() {
			var me = this, items = this.buttons || [];
			this.buttons = new Collection();
			this.buttons.getKey = function(obj) {
				return obj.id;
			};
			this.buttons.addAll(items);
			// this.el.addClass('sortablebar');
			if (this.baseClass) {
				// this.el.addClass(this.baseClass);
			}

			// this.el.empty();
			// this.emptyEl = $('<span class="empty">' + this.emptyText +
			// '</span>');
			this.ulEl = $('<ul class="js-short cons"></ul>');
			this.buttons.each(function(item) {
				me.doAdd(item);
			});

			// this.el.append(this.emptyEl);
			this.el.append(this.ulEl);
			var $conf = $('<li class="dropdown-header"></li>');

			if (!this.canNotConfig) {
				this.configEl = $('<a href="#config" class="config-btn" title="config"><i class="iconfont iconfont-def">&#xe017;</i></a>');
				this.configEl.click(function() {
					me.toggleConfig();
				});
				$conf.append(this.configEl);
			}

			if (!this.canNotClose) {
				this.closeEl = $('<a href="#close" class="close-btn" title="Close"><i class="iconfont iconfont-def">&#xe600;</i></a>');
				this.closeEl.click(function() {
					me.close();
				});
				$conf.append(this.closeEl);
			}

			this.ulEl.prepend($conf);
		},
		toggleConfig : function() {
			if (this.configEl.attr('set') === 'on') {
				$('ul li>span', this.el).hide();
				this.configEl.attr('set', 'off');
			} else {
				$('ul li>span', this.el).show();
				this.configEl.attr('set', 'on');
			}
		},
		close : function() {
			$(this.ulEl).slideUp(600);
			if (this.onclose) {
				this.onclose.call(this);
			}
		},
		open : function() {
			$(this.ulEl).slideDown(600);
		},
		toggle : function() {
			this.ulEl.is(':visible') ? this.close() : this.open();
		},
		refresh : function(option) {
			if (option) {
				var old = this.buttons.get(option.oldId);
				this.buttons.removeAtKey(option.oldId);
				this.buttons.add(option);
				this.doRefresh(option, old);
			}
		},
		doRefresh : function(btn, old) {
			if (old) {
				old.el.remove();
				old.el = null;
			}
			this.add(btn);
		},
		add : function(option) {
			if (option) {
				this.buttons.add(option);
				this.doAdd(option);
			}
		},
		// private
		doAdd : function(btn) {
			// this.emptyEl.hide();
			var me = this;
			btn.el = $('<li funcId="'
					+ btn.id
					+ '"><a title="'
					+ btn.label
					+ '">'
					+ global.utils.truncate(btn.label, 9)
					+ '</a><span class="def-config"><a class="delete" title="移除"><i class="iconfont iconfont-def">&#xe024;</i></a></span></li>');

			btn.deleteEl = $('.delete', btn.el).click(function(event) {
				event.stopPropagation();
				me.remove(btn);
				if (me.ondelete) {
					me.ondelete.call(me, btn);
				}
			});
			$(btn.el).click(function(event) {
				event.stopPropagation();
				if (me.onclick)
					me.onclick(btn);
			});
			btn.el.hide();
			this.ulEl.append(btn.el);
			btn.el.fadeIn(600);
			if (this.onadd) {
				this.onadd(btn);
			}
		},
		// private
		getCount : function() {
			return this.buttons.length;
		},
		remove : function(btn) {
			var me = this;
			btn = this.buttons.removeAtKey(btn.id);
			if (btn) {
				btn.el.fadeOut(600, function() {
					btn.el.remove();
					btn.el = null;
					if (me.getCount() == 0) {
						// me.emptyEl.show();
					}
				});
			}
		}
	};

	global.SortableBar = SortableBar;
	justep.Portal.SortableBar = SortableBar;
})(window);

/*
 * file from "UI\portal2\process\portal\components\quicklist\quicklist.js"
 */

(function(global) {

	var QuickList = function(config) {
		config = config || {};
		config.baseClass = 'quicklist';
		SortableBar.apply(this, [ config ]);
		this.mng = config.mng;
		var me = this;
		this.mng.attachEvent('add-shortcut', function(option) {
			me.add(option);
		});
		this.mng.eachShortcut(function(item) {
			me.add(item);
		})
	};

	util.extend(QuickList, SortableBar);

	QuickList.prototype.ondelete = function(option) {
		this.mng.removeShortcut(option);
	};

	QuickList.prototype.onclick = function(option) {
		this.mng.runFunc(option);
	};

	QuickList.prototype.onsort = function(index, id) {
		this.mng.moveShortcut(index, id);
	};

	QuickList.prototype.doAdd = function(btn) {
		SortableBar.prototype.doAdd.call(this, btn);
		var serverName = window.location.pathname.split('/')[1];
		if (btn.icon32)
			$('>a', btn.el).css({
				'background-image' : 'url(/' + serverName + btn.icon32 + ')'
			});
	};

	global.QuickList = QuickList;
})(window);
/*
 * file from "UI\portal2\process\portal\components\portalview\portalView.js"
 */

(function(globel) {

	function PortalView(config) {
		$.extend(this, config);
		this.el = $('#' + this.id);
		this.init();
	}

	PortalView.prototype.init = function() {
		var me = this;

		this.el.addClass('portalpageview');
		this.initWidgets();
		this.initLayout(this.mng.layout);
		this.makeSortable();

		this.mng.attachEvent('add-widget', function(widget) {
			me.addWidget(util.clone(widget));
			me.makeSortable();
		});
		this.mng.attachEvent('remove-widget', function(id) {
			me.removeWidget(id);
		});
		this.mng.attachEvent('layout-change', function(id) {
			me.reLayout(id);
		});
		this.mng.attachEvent('dock-changed', function(id, dockIndex) {
			me.setWidgetDock(id, dockIndex);
		});
		this.mng.attachEvent('refresh-widget', function(all) {
			me.refreshWidget(all);
		});
		// 统一执行一次刷新
		this.mng.refresh(true);
	};

	PortalView.prototype.initLayout = function(layoutId) {
		var id = util.getId(this.id, 'layout');
		this.layout = {
			el : util.domHelp.div(id)
		};
		this.layout.obj = new WidgetLayout({
			el : this.layout.el,
			layout : this.mng.layouts[layoutId]

		});
		this.el.append(this.layout.el);
		var sorted = [];
		for ( var i in this.widgets) {
			if (this.widgets.hasOwnProperty(i)) {
				var widget = this.widgets[i];
				var p = parseInt(widget.position), d = parseInt(widget.dock) || 0;
				if (!isNaN(p)) {
					sorted[d * 100 + p] = widget;
				}
			}
		}
		for ( var i = 0; i < sorted.length; i++) {
			var widget = sorted[i];
			if (widget)
				this.layout.obj.add(widget.dock, widget.el);
		}
	};

	PortalView.prototype.reLayout = function(layoutId) {
		this.layout.el.remove();
		this.initWidgets();
		this.initLayout(layoutId);
		this.makeSortable();
		this.mng.refresh(true);
	}

	PortalView.prototype.setWidgetDock = function(widgetId, dock) {
		var widget;
		for ( var i in this.widgets) {
			if (this.widgets.hasOwnProperty(i))
				if (this.widgets[i].widgetId == widgetId) {
					widget = this.widgets[i];
					break;
				}
		}
		if (widget && (widget.dock != dock)) {
			widget.dock = dock;
			this.layout.obj.add(dock, widget.el);
		}
	};

	PortalView.prototype.initWidgets = function() {
		var me = this;
		this.widgets = {};
		$.each(this.mng.widgets, function(i, widget) {
			me.createWidget(util.clone(widget));
		});
	};

	PortalView.prototype.refreshWidget = function(all) {
		for ( var i in this.widgets) {
			var widget = this.widgets[i];
			if (all || widget.refresh === 'true')
				$('.refresh', widget.el).click();
		}
	};

	PortalView.prototype.createWidget = function(widget) {
		var portal = this, def = this.mng.getWidgetDefById(widget.widgetId);
		var id = widget.id = widget.id || util.getId();
		$.extend(widget, def);
		if (!widget.url)
			return;
		widget.dock = widget.dock === undefined ? 0 : widget.dock;
		widget.id = id;
		portal.widgets[widget.id] = widget;
		widget.el = $('<div id="'
				+ widget.id
				+ '" class="widget" widget="'
				+ widget.widgetId
				+ '">'
				+ '<div class="widget-head">'
				+ '<a class="collapse" href="#" title="点击隐藏" ><i class="iconfont">&#xe6de;</i></a>'
				+ '<h5>'
				+ widget.title
				+ '</h5>'
				+ '<span class="right">'
				+ '<a class="edit" href="#" title="点击编辑"><i class="iconfont">&#xe018;</i></a>'
				+ '<a class="refresh" href="#" title="点击刷新"><i class="iconfont">&#xe601;</i></a>'
				+ (widget.more ? '<a class="more" href="#" title="查看更多"><i class="iconfont">&#xe602;</i></a>'
						: '') + '</span>' + '</div>' + '<div class="edit-box">'
				+ '<ul>' + '<li class="item" style="display: none;">'
				+ '<label>修改标题</label>' + '<input value="' + widget.title
				+ '"></input>' + '</li>' + '<li class="item">'
				+ '<label>位置设置</label>' + '<select class="docks">'
				+ '<option value="0">第1区</option>'
				+ '<option value="1">第2区</option>'
				+ '<option value="2">第3区</option>'
				+ '<option value="3">第4区</option>' + '</select>' + '</li>'
				+ '<li class="item">'
				+ '<a class="want-delete" href="#">要删除这块内容吗?</a>'
				+ '<span class="delete-box">'
				+ '<span style="padding-left: 10px;">确定删除吗?</span>'
				+ '<input class="delete" type="button" value="确定"></input>'
				+ '<a class="cancel-delete" href="#">取消</a>' + '</span>'
				+ '</li>' + '</ul>' + '</div>' + '<div class="widget-content">'
				+ '<iframe frameborder=0></iframe>' + '</div>' + '</div>');
		widget.headEl = $('.widget-head', widget.el);
		widget.titleEl = $('h5', widget.headEl);
		widget.contentEl = $('.widget-content', widget.el);
		if (parseFloat(widget.height))
			widget.contentEl.css({
				height : parseFloat(widget.height)
			});
		widget.color = widget.color ? widget.color : 'green';
		widget.el.addClass('portal-widget-title-color');
		widget.collapseEl = $('.collapse', widget.el).click((function(widget) {
			return function() {
				var $i = widget.collapseEl.children("i");
				if (widget.contentEl.is(':hidden')) {
					widget.collapseEl.attr("title", "点击显示");
					$i.html("&#xe6de;");
				} else {
					$i.html("&#xe661;");
					widget.collapseEl.attr("title", "点击隐藏");
				}
				widget.contentEl.toggle();
				return false;
			}
		})(widget));
		widget.editBoxEl = $('.edit-box', widget.el);
		widget.editEl = $('.edit', widget.el).click((function(widget) {
			return function() {
				widget.editEl.toggleClass('open');
				widget.editBoxEl.toggle();
				return false;
			};
		})(widget));
		widget.titleInputEl = $('input', widget.editBoxEl).keyup(
				(function(widget) {
					return function() {
						portal.setWidgetTitle(widget.id, $(this).val());
					};
				})(widget));
		$('.docks', widget.el).val(widget.dock).change(
				(function(widget) {
					return function() {
						var dock = $(this).val();
						dock = parseInt(dock);
						portal.mng.setWidgetDock(portal.index, widget.widgetId,
								dock, getPosition(widget.el.parent()));
					};
				})(widget));
		/*
		 * $('.colors li', widget.el).click((function(widget){ return
		 * function(){ var me = $(this); portal.setWidgetColor(widget.id,
		 * me.attr('color-value')); }; })(widget));
		 */
		widget.deleteBoxEl = $('.delete-box', widget.el);
		widget.wantDeleteEl = $('.want-delete', widget.el).click(
				(function(widget) {
					return function() {
						$(this).hide();
						widget.deleteBoxEl.show();
						return false;
					};
				})(widget));
		$('.delete', widget.el).click((function(widget) {
			return function() {
				portal.deleteWidget(widget.id);
				return false;
			};
		})(widget));
		$('.cancel-delete', widget.el).click((function(widget) {
			return function() {
				widget.deleteBoxEl.hide();
				widget.wantDeleteEl.show();
				return false;
			};
		})(widget));

		if (widget.more)
			$('.more', widget.el)
					.click(
							(function(widget) {
								return function() {
									var item = util.clone(widget.more);
									item.label = item.title;
									if (justep.Portal.agentInfo)
										item.executor = justep.Portal.agentInfo.currentPersonID;
									portal.mng.runFunc(item);
									return false;
								};
							})(widget));

		var getURL = function(bsessionid, option) {
			if (!option.url)
				return "about:blank";

			switch (option.type) {
			case "link":
				var url = option.url;
				if (option.params) {
					if (url.indexOf('?') != -1)
						url += '&';
					else
						url += '?';
					url += option.params;
				}
				return url;
			case "func":
				var uiserverName = window.location.pathname.split('/')[1];
				var a = '?';
				if (option.url.indexOf('?') != -1) {
					a = '&';
				}
				var url = '/' + uiserverName + option.url + a + 'bsessionid='
						+ bsessionid;
				if (option.process)
					url += '&process=' + option.process;
				if (option.activity)
					url += '&activity=' + option.activity;
				if (option.params)
					url += '&' + option.params;
				if (justep.Portal.agentInfo || option.executor)
					url += '&executor='
							+ (justep.Portal.agentInfo.currentPersonID || option.executor);

				url += '&language=' + justep.Portal.language;
				return url;
			default:
				return "about:blank";
			}
		};

		var url = getURL(portal.mng.bsessionid, widget);
		// ie下会发两次请求, 可能和后边执行append有关系, 所以改为在初始化后统一执行刷新
		// $('iframe', widget.el).src(url);

		$('.refresh', widget.el).click((function(widget, url) {
			return function() {
				$('iframe', widget.el).enableIframeScroll().src(url);
				return false;
			};
		})(widget, url));

	};

	PortalView.prototype.addWidget = function(widget) {
		this.createWidget(widget);
		this.layout.obj.add(widget.dock, widget.el);
		$('.refresh', widget.el).click();
	};

	PortalView.prototype.removeWidget = function(widgetId) {
		var widget;
		for ( var i in this.widgets) {
			if (this.widgets.hasOwnProperty(i))
				if (this.widgets[i].widgetId == widgetId) {
					widget = this.widgets[i];
					delete this.widgets[i];
					break;
				}
		}
		if (widget) {
			$('#' + widget.id).remove();
		}
	};

	PortalView.prototype.setWidgetTitle = function(id, title) {
		var widget = this.widgets[id];
		if (widget) {
			widget.title = title;
			widget.titleEl.text(title);
			widget.titleInputEl.val(title);
		}
	};

	PortalView.prototype.setWidgetColor = function(id, color) {
		var widget = this.widgets[id];
		if (widget && (widget.color != color)) {
			widget.el.addClass('color-' + color);
			widget.el.removeClass('color-' + widget.color);
			widget.color = color;
			this.mng.setWidgetAttr(widget.widgetId, 'color', color);
		}
	};

	PortalView.prototype.deleteWidget = function(id) {
		var widget = this.widgets[id];
		if (widget) {
			this.mng.removeWidget(widget.widgetId);
		}
	};

	PortalView.prototype.makeSortable = function() {
		var $sortableItems = $('.dock > .widget[sortable!=true]', this.el), portal = this;

		$sortableItems.find('.widget-head').css({
			cursor : 'move'
		}).mousedown(function(e) {
			$sortableItems.css({
				width : ''
			});
			$(this).parent().css({
				width : $(this).parent().width() + 'px'
			});
		}).mouseup(function() {
			if (!$(this).parent().hasClass('dragging')) {
				$(this).parent().css({
					width : ''
				});
			} else {
				$('.dock', portal.el).sortable('disable');
			}
		}).attr('sortable', 'true');

		$sortableItems = $('.dock > .widget', this.el);
		$('.dock', this.el).sortable('destroy');
		$('.dock', this.el).sortable(
				{

					// Specify those items which will be sortable:
					items : $sortableItems,

					// Connect each column with every other column:
					connectWith : $('.dock', this.el),

					// Set the handle to the top bar:
					handle : '.widget-head',

					// Define class of placeholder (styled in inettuts.js.css)
					placeholder : 'widget-placeholder',

					// Make sure placeholder size is retained:
					forcePlaceholderSize : true,

					// Animated revent lasts how long?
					revert : 300,

					// Delay before action:
					delay : 100,

					// Opacity of 'helper' (the thing that's dragged):
					opacity : 0.8,

					// Set constraint of dragging to the document's edge:
					// containment: this.el,

					// Function to be called when dragging starts:
					start : function(e, ui) {
						$(ui.helper).addClass('dragging');
					},

					// Function to be called when dragging stops:
					stop : function(e, ui) {

						// Reset width of units and remove dragging class:
						$(ui.item).css({
							width : ''
						}).removeClass('dragging');

						// Re-enable sorting (we disabled it on mouseup of the
						// handle):
						$('.dock', portal.el).sortable('enable');

						portal.layout.obj.resize();

						var index = ui.item.parent().attr("index");
						index = parseInt(index);
						if (index != undefined) {
							portal.mng.setWidgetDock(ui.item.attr("widget"),
									index, getPosition(ui.item.parent()));
						}
					}

				});
	}

	function getPosition(el) {
		var position = {};
		$('[widget]', el).each(function(i, item) {
			position[$(item).attr('widget')] = i;
		});
		return position;
	}

	globel.PortalView = PortalView;
	justep.Portal.PortalView = PortalView;
})(window);

/*
 * file from "UI\portal2\process\portal\components\portalview\widgetlayout.js"
 */

(function(globel) {
	function WidgetLayout(config) {
		this.docks = [];
		$.extend(this, config);
		this.id = this.id || this.el.attr('id');
		this.el = this.el || $('#' + this.id);
		this.dockClass = this.dockClass || 'dock';
		this.layout = util.clone(this.layout);
		this.init();
	}

	WidgetLayout.prototype = {
		init : function() {
			this.el.addClass('widgetlayout');
			this.print(this.layout, this.el);
		},
		print : function(layout, container) {
			var me = this;
			if (!layout)
				return;
			if (layout.columns) {
				var widths = cut(util.map(layout.columns, function(column) {
					return column.width;
				}));
				$.each(layout.columns, function(i, column) {
					column.el = util.domHelp.div().addClass('column').css({
						background : column.background
					});
					column.el.width((widths[i] + '%'));
					var dock = util.domHelp.div().addClass('dock');
					me.print(column, dock);
					column.el.append(dock);
					container.append(column.el);
					if (column.index != undefined) {
						me.docks[column.index] = dock;
						dock.attr('index', column.index);
					}
				});
			} else if (layout.rows) {
				$.each(layout.rows, function(i, row) {
					row.el = util.domHelp.div().addClass('row').css({
						background : row.background
					});
					var dock = util.domHelp.div().addClass('dock');
					me.print(row, dock);
					row.el.append(dock);
					container.append(row.el);
					if (row.index != undefined) {
						me.docks[row.index] = dock;
						dock.attr('index', row.index);
					}
				});
			}
		},
		resize : function() {
			function doResize(layout) {
				var h = 0;
				if (layout.columns) {
					$.each(layout.columns, function(i, column) {
						var height;
						if (column.rows || column.columns) {
							height = doResize(column);
						} else {
							height = column.el.height();
						}
						if (height > h)
							h = height;
					});
				} else if (layout.rows) {
					$.each(layout.rows, function(i, row) {
						if (row.rows || row.columns) {
							var height = doResize(row);
							row.el.height(height);
							h += height;
						} else
							h += row.el.height();
					});
				}
				return h;
			}
			var h = doResize(this.layout);
			this.el.height(h);
		},
		add : function(index, el) {
			if (typeof index != 'number') {
				el = index;
				index = 1;
			}
			var target = this.docks[index];
			if (target) {
				target.append(el);
				this.resize();
			}
		},
		getDockCount : function() {
			return this.docks.length;
		}
	};

	function cut(widths) {
		var isPercent = true;
		/*
		 * $.each(widths, function(i, width){ if(width!=undefined){ isPercent =
		 * (width+'').indexOf('%')!=-1; if(!isPercent) return true; } });
		 */
		if (isPercent) {
			var total = 0, l = 0;
			$.each(widths, function(i, width) {
				if (width != undefined) {
					width = parseInt(width);
					total += width;
				} else {
					l++;
				}
			});
			var number = widths.length;
			remaider = ((100 - total) % l) || 0,
					value = (100 - total - remaider) / l;
			for ( var i = 0; i < number; i++) {
				if (widths[i] == undefined)
					widths[i] = value;
			}
			widths[number - 1] = widths[number - 1] + remaider;
			return widths;
		}
	}

	globel.WidgetLayout = WidgetLayout;
})(window);

/*
 * file from "UI\portal2\process\portal\components\accordion\accordion.js"
 */

(function(global) {
	function Accordion(options) {
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	}

	Accordion.prototype = {
		init : function() {
			var me = this;
			var content = this.el.children();
			$(content).hide();
			// this.el.empty();
			this.el.addClass('accordion');

			this.listEl = $('<dl></dl>');
			this.el.append(this.listEl);
			$.each(this.pages, function(i, page) {
				page.el = $('<dt><a class="title" href="#">' + page.title
						+ '</a></dt>');
				page.ddEl = $('<dd></dd>');
				page.ddEl.append($('#' + page.id).show());
				page.titleEl = $('.title', page.el);
				page.barEl = $('span', page.el);
				if (me.disslide) {
					$('.title', page.el).addClass('disslide');
					page.el.css({
						display : 'none'
					});
				} else
					page.titleEl.click(function() {
						me.slidePage(i);
						return false;
					});
				if (!page.enable) {
					page.el.css({
						display : 'none'
					});
					page.ddEl.css({
						display : 'none'
					});
				}
				me.listEl.append(page.el);
				me.listEl.append(page.ddEl);
			});

		},
		togglePage : function(index) {
			$('>dl >dt:eq(' + index + ')', this.el).toggle();
			$('>dl >dd:eq(' + index + ')', this.el).toggle();
		},
		setPageTitle : function(index, name) {
			$('>dl >dt:eq(' + index + ') .title', this.el).html(name);
		},
		slidePage : function(index) {
			var page = this.pages[index];
			page.ddEl.slideToggle(1000, function() {
				page.titleEl.toggleClass('on');
				page.barEl.toggle();
			});
		},
		extendPage : function(index) {
			var page = this.pages[index];
			if (page.ddEl.is(":hidden"))
				page.ddEl.slideDown(1000, function() {
					page.titleEl.toggleClass('on');
					page.barEl.toggle();
				});
		},
		unextendPage : function(index) {
			var page = this.pages[index];
			if (page.ddEl.is(":visible"))
				page.ddEl.slideUp(1000, function() {
					page.titleEl.toggleClass('on');
					page.barEl.toggle();
				});
		},
		extendAll : function() {
			var me = this;
			$.each(this.pages, function(i, page) {
				me.extendPage(i);
			});
		},
		unextendAll : function() {
			var me = this;
			$.each(this.pages, function(i, page) {
				me.unextendPage(i);
			});
		},
		enable : function(index, value) {
			var page = this.pages[index];
			if (page)
				if (value) {

					page.el.show();
					page.ddEl.show();
				} else {
					page.el.hide();
					page.ddEl.hide();
				}

		}
	};

	global.Accordion = Accordion;
})(window);

/*
 * file from "UI\portal2\process\portal\components\funcframe\funcFrame.js"
 */

(function(global) {

	var FuncFrame = function(options) {
		$.extend(this, options);
		this.init();
	};

	FuncFrame.prototype.init = function() {
		var me = this;
		this.cache = {};
		this.el = $('#' + this.id);
		// 改变内容区域大小
		// this.el.removeClass("min-func").addClass("max-func");;
		this.headEl = $('' + '<div class="fixed-head">'
				+ '<div class="fun-head">' + '<div class="fun-head-inner">'
				+ '<div class="fun-head-bar">' + '<div class="fun-head-left">'
				+ '<a class="home-btn">首页</a>' + '<span class="title">'
				+ '</span>' + '</div>' + '<div class="fun-head-right">'
				+ '<span class="user">' +
				// '<span class="name"></span>' +
				// '<span class="loginTime"></span>' +
				'</span>' + '<span>' + '<a class="close">关闭功能</a>' + '</span>'
				+ '</div>' + '</div>' +

				'</div>' + '</div>' + '</div>' + '');
		$('.home-btn', this.headEl).click(function() {
			me.backHome();
			return false;
		});

		if (!justep.Portal.agentInfo)
			$('.logout', this.headEl).click(function() {
				if (confirm("请您注意，是否打开的功能都保存了，关闭系统将导致没有保存的数据丢失！\r\r您确定要退出吗？")) {
					justep.Portal.controllers.logouter.logout();
				}
				return false;
			});
		else
			$('.logout a', this.headEl)
					.click(
							function() {
								if (confirm("请您注意，是否打开的功能都保存了，关闭代理将导致没有保存的数据丢失！\r\r您确定要关闭代理吗？")) {
									window.close();
								}
								return false;
							}).html('[关闭代理页]');

		$('.close', this.headEl).click(function() {
			me.close();
			return false;
		});

		var showName = justep.Context.getOperatorName();
		if (justep.Portal.agentInfo) {
			showName = justep.Portal.agentInfo.currentPersonName + '('
					+ showName + ')';
		}
		$('.user .name', this.headEl).html(showName);
		$('.user .loginTime', this.headEl).html(util.time());
		// this.el.append(this.headEl);
	};
	// option需要
	FuncFrame.prototype.open = function(option) {
		var opened = this.cache[option.id];
		if (!opened) {
			// temp
			if (option.opener) {
				option.opener = this.getCacheByWindow(option.opener);
			}
			var uiserverName = window.location.pathname.split('/')[1];
			var url = option.url;

			if (/^http.*/.test(url)) {
				if (option.params) {
					if (url.indexOf('?') != -1)
						url += '&';
					else
						url += '?';
					url += option.params;
				}

			} else {
				if (url.indexOf('?') != -1)
					url += '&$log=1';
				else
					url += '?$log=1';

				url = '/' + uiserverName + url + '&bsessionid='
						+ this.bsessionid;
				if (option.process)
					url += '&process=' + option.process;
				if (option.activity)
					url += '&activity=' + option.activity;
				if (option.executor)
					url += '&executor=' + option.executor;

				url += '&language=' + justep.Portal.language;

				if (option.params)
					url += option.params;
			}

			option.frame = $('<iframe frameBorder=0></iframe>');
			this.cache[option.id] = option;
			this.el.append(option.frame);
			option.frame.src(url, function(iframe, duration) {
				if (option.onload)
					option.onload.apply(this);
			});
		}
		this._active(option);
	};

	FuncFrame.prototype.resize = function() {
		if (this.activeId && this.cache[this.activeId]) {
			var option = this.cache[this.activeId];
			// //Math.max($("#functree_owner").height(),$(window).height(),200)-(121+parseInt($("#header").css("top").match(/-?\d+/)))
			option.frame.height($(window).height() - $("#main").height() - 5);// ie8
			// 下如果不多减一些会出滚动条
			// this.el.height() - 5
			// option.frame.height(this.el.height() - 5);
			if (option.frame.height()) {
				$(".left").height(option.frame.height());
			}
		}
	};

	FuncFrame.prototype.refresh = function(option) {
		var opened = this.cache[option.oldId];
		if (opened) {
			delete this.cache[option.oldId];
			var uiserverName = window.location.pathname.split('/')[1];
			var url = option.url;

			if (/^http.*/.test(url)) {
				if (option.params) {
					if (url.indexOf('?') != -1)
						url += '&';
					else
						url += '?';
					url += option.params;
				}

			} else {
				if (url.indexOf('?') != -1)
					url += '&$log=1';
				else
					url += '?$log=1';

				url = '/' + uiserverName + url + '&bsessionid='
						+ this.bsessionid;
				if (option.process)
					url += '&process=' + option.process;
				if (option.activity)
					url += '&activity=' + option.activity;
				if (option.executor)
					url += '&executor=' + option.executor;

				url += '&language=' + justep.Portal.language;

				if (option.params)
					url += option.params;
			}
			option.frame = opened.frame;
			this.cache[option.id] = option;
			option.frame.height($(document).height() - 43 - 3);// ie8
			// 下如果不多减一些会出滚动条
			option.frame.src(url, function(iframe, duration) {
				if (option.onload)
					option.onload.apply(this);
			});
		}
		this._active(option);
	};

	FuncFrame.prototype.getIFrame = function(url) {
		if (this.cache[url])
			return this.cache[url].frame.get(0);
	};

	FuncFrame.prototype.backHome = function() {
		if (this.onback) {
			this.onback();
		}
	};

	/**
	 * 返回功能的opener所属的顶级功能Iframe的window。注意opener可能是Iframe内部的iframe发起。
	 * 
	 * @param win
	 * @returns
	 */
	FuncFrame.prototype.getCacheByWindow = function(win) {
		for ( var k in this.cache) {
			if (this.cache.hasOwnProperty(k)) {
				// 修复opener是this.cache[k].frame.get(0).contentWindow内部子frame时，无法获得opener的bug
				var frameWin = this.cache[k].frame.get(0).contentWindow;
				var p = win;
				while (p) {
					if (frameWin == p)
						return this.cache[k];
					if (p.parent == p)
						break;
					p = p.parent;
				}
			}
		}
		return null;
	};

	FuncFrame.prototype.deleteOpenerAsMe = function(closing) {
		for ( var k in this.cache) {
			if (this.cache.hasOwnProperty(k)) {
				var option = this.cache[k];
				if (option.opener == closing) {
					delete option.opener;
				}
			}
		}
	};

	FuncFrame.prototype.close = function(id) {
		id = id || this.activeId;
		if (typeof id == 'object')
			id = id.id;
		var opened = this.cache[id];
		if (!opened)
			return;
		// 删除opener等于我的cahce的option的opener属性
		this.deleteOpenerAsMe(opened);
		opened.frame.onload = null;
		opened.frame.hide();
		opened.frame.src('about:blank', function() {
			opened.frame.remove();
		});
		delete this.cache[id];
		this.activeId = null;
		if (this.onclose) {
			this.onclose(opened);
		}
	};

	// private
	FuncFrame.prototype._active = function(option) {
		for ( var k in this.cache) {
			if (this.cache.hasOwnProperty(k)) {
				this.cache[k].frame.hide();
			}
		}
		this.activeId = option.id;
		this.resize();
		$('.title', this.headEl).html(option.label);
		var opened = this.cache[option.id];
		opened.frame.show();
		// 兼容
		if (opened.frame.get(0).contentWindow.tabActive)
			opened.frame.get(0).contentWindow.tabActive();

	}

	global.FuncFrame = FuncFrame;
	justep.Portal.FuncFrame = FuncFrame;
})(window);

/*
 * file from "UI\portal2\process\portal\components\agentlist\agentlist.js"
 */

(function(global) {

	function AgentList(options) {
		$.extend(this, options);
		this.init();
	}

	AgentList.prototype = {
		init : function() {
			var me = this;
			this.el = $('#' + this.id);
			this.el.addClass('agentlist');
			if (this.mng.getAgentCount() > 0) {
				this.el.append("<span>代理:</span>");
				this.mng.eachAgent(function(agent) {
					agentEl = $(
							'<a href="#" class="grey-button pcb"><span>'
									+ agent.name + '</span></a>').click(
							function() {
								me.mng.openAgentPage(agent.id);
								return false;
							});
					me.el.append(agentEl);
				});
			}
		}
	};

	global.AgentList = AgentList;
})(window);
/*
 * file from "UI\portal2\process\portal\components\dialog\dialog.js"
 */

(function(global) {
	/*
	 * options: id title
	 */

	var Dialog = function(options) {
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};

	Dialog.prototype.init = function() {
		var me = this;
		this.el.addClass("dialog");
		this.width = parseInt(this.width) || 560;
		this.height = parseInt(this.height) || 420;
		this.el.css({
			width : this.width + 'px',
			height : this.height + 'px',
			margin : (-this.width / 2 + 'px') + " 0 0 "
					+ (-this.height / 2 + 'px')
		});

		var html = [];
		html.push("<div class='dialog-header'>");
		html.push("<button type='button' class='close'>&times;</button>");
		html.push("<h3>");
		html.push(this.title);
		html.push("</h3></div>");
		html.push("<div class='dialog-body'>");
		html.push("<iframe frameborder='0'></iframe>");
		html.push("</div>");
		html.push("<div class='dialog-footer'>");
		// html.push("<a href='#' class='btn'>Close</a>");
		// html.push("<a href='#' class='btn btn-primary'>Save changes</a>");
		html.push("</div>");

		this.el.append(html.join("\n"));

		this.backdrop = $("<div class='dialog-backdrop'></div>");
		$("body").append(this.backdrop);

		$('.dialog-header .close', this.el).click(function() {
			me.close();
			return false;
		});

	};

	Dialog.prototype.show = function() {
		this.backdrop.show();
		this.el.show();
		this.resize();
	};

	Dialog.prototype.close = function() {
		this.el.hide();
		this.backdrop.hide();
	};

	Dialog.prototype.refresh = function(options) {
		$.extend(this, options);
		if (options.title)
			$('.dialog-header h3', this.el).html(options.title);
		if (options.url)
			$('.dialog-body iframe', this.el).src(options.url);

		if (options.width || options.height) {
			var width = parseInt(options.width || this.width), height = parseInt(options.height
					|| this.height);
			this.el.css({
				width : width + 'px',
				height : height + 'px',
				margin : (-width / 2 + 'px') + " 0 0 " + (-height / 2 + 'px')
			});
		}

	};

	Dialog.prototype.resize = function() {
		var h = this.el.height(), hh = $('.dialog-header', this.el)
				.outerHeight(), hf = $('.dialog-footer', this.el).outerHeight();
		$('.dialog-body', this.el).height(h - hh - hf);
	};

	global.Dialog = Dialog;

})(window);

/*
 * file from "UI\portal2\process\portal\components\reminder\reminder.js"
 */

(function(globe) {

	var Reminder = function(options) {
		$.extend(this, options);
		this.el = $("#" + this.id);
		this.init();
	};

	Reminder.prototype.init = function() {
		this.el.addClass("reminder");
		this.interval = this.interval || 30000;
		this.url = this.url || "/SA/task/remind/remindNewCount2.j";
		var me = this;

		setInterval(function() {
			me.refresh();
		}, this.interval);

		this.el.append("<a href='#'></a>").click(function() {
			return me.click();
		});

	};

	Reminder.prototype.refresh = function() {
		var result = justep.Request.sendHttpRequest(encodeURI(this.url));
		result = justep.Request.responseParseJSON(result);
		if (result.flag = (result.flag == "true")) {
			$('a', this.el).html(result.text);
		}

		this.current = result;
		this.reloaded = false;
	};

	Reminder.prototype.click = function() {
		if (!this.reloaded) {
			var params = this.current.parameters;
			if (this.current && this.current.flag) {
				if (!this.dialog) {
					this.initDialog();
				}
			}
			this.dialog.refresh({
				title : params.title,
				height : params.height,
				width : params.width,
				url : (function() {
					var url = params.url, uiserver = window.location.pathname
							.split('/')[1];
					url = '/' + uiserver + url;
					url += url.indexOf('?') == -1 ? '?' : '&';
					url += 'bsessionid='
							+ justep.Portal.controllers.funcManager.bsessionid;
					return url;
				})()
			});

			this.reloaded = true;
		}

		this.dialog.show();

		return false;
	};

	Reminder.prototype.initDialog = function() {
		var id = this.id + '-dialog';
		$('body').append("<div id='" + id + "'></div>");
		this.dialog = new Dialog({
			id : id,
			title : '消息提醒'
		});
	};

	globe.Reminder = Reminder;
})(window);

/*
 * file from "UI\portal2\process\portal\components\scrollbar\scrollbar.js"
 */

(function(global) {

	var ScrollBar = function(options) {
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
		if (this.oncreate)
			this.oncreate.call(this);
	};

	ScrollBar.prototype = {
		init : function() {
			var me = this, items = this.items || [];

			this.items = new Collection();
			this.items.getKey = function(obj) {
				return obj.id;
			};
			this.items.addAll(items);
			this.el.addClass('scrollbar');
			if (this.baseClass) {
				this.el.addClass(this.baseClass);
			}
			this.el.empty();
			this.el
					.append('<a class="prev icon icon-system-left-open" href="#"></a>');
			this.el
					.append('<a class="next icon icon-system-right-open" href="#"></a>');
			this.el
					.append('<div class="wrap"><ul class="fixed"></ul><div class="other"><ul></ul></div></div>');
			this.fixedULEl = $('.fixed', this.el);
			this.items.each(function(item) {
				if (item.fixed)
					me.doAdd(item);
			});

			$('.wrap .other', this.el).css({
				marginLeft : this.fixedULEl.width()
			});

			this.ulEl = $('.wrap .other ul', this.el);
			this.ulEl.disableSelection();

			this.items.each(function(item) {
				if (!item.fixed)
					me.doAdd(item);
			});

			var cfd = this.ulEl.carouFredSel({
				circular : false,
				auto : false,
				width : '100%',
				align : 'left',
				padding : [ 0, 5, 0, 0 ],
				prev : $('.prev', this.el),
				next : $('.next', this.el),
				mousewheel : true,
				swipe : {
					onMouse : true,
					onTouch : true
				}
			});

			this.inited = true;
		},
		close : function() {
			$(this.el).slideUp(600);
			if (this.onclose) {
				this.onclose.call(this);
			}
		},
		open : function() {
			$(this.el).slideDown(600);
		},
		refresh : function(option) {
			if (option) {
				var old = this.items.get(option.oldId);
				this.items.removeAtKey(option.oldId);
				this.items.add(option);
				this.doRefresh(option, old);
			}
		},
		doRefresh : function(btn, old) {
			if (old) {
				old.el.remove();
				old.el = null;
			}
			this.add(btn);
		},
		add : function(option) {
			if (option) {
				this.items.add(option);
				this.doAdd(option);
			}
		},
		// private
		doAdd : function(btn) {
			var me = this;
			btn.el = $('<li funcId="' + btn.id + '"><a>' + btn.label
					+ '</a></li>');
			if (!btn.fixed && !this.canNotDelete)
				btn.el.append('<span><a class="delete"></a></span>');
			if (justep.Browser.IE7)
				btn.el.css({
					display : 'inline'
				});
			else
				btn.el.css({
					display : 'inline-block'
				});

			btn.deleteEl = $('.delete', btn.el).click(function() {
				me.remove(btn);
				if (me.ondelete) {
					me.ondelete.call(me, btn);
				}
			});
			$('>a', btn.el).click(function() {
				if (me.onclick)
					me.onclick(btn);
			});
			if (btn.fixed) {
				this.fixedULEl.append(btn.el);
			} else {
				if (this.inited)
					this.ulEl.trigger("insertItem", [ btn.el ]);
				else
					this.ulEl.append(btn.el);
				// this.ulEl.trigger("nextPage");
			}

			if (this.onadd) {
				this.onadd.call(this, btn);
			}
		},
		remove : function(btn) {
			var me = this;
			btn = this.items.removeAtKey(btn.id);
			if (btn) {
				btn.el.fadeOut(600, function() {
					me.ulEl.trigger("removeItem", [ btn.el ]);
					btn.el = null;
				});
			}
		}
	};

	global.ScrollBar = ScrollBar;
})(window);

(function(global) {

	global.utils = {};

	global.hideContent = function() {
		$('.content').hide();
		$("#default-iframe").hide();
	};
	global.utils.truncate = function(target, length, truncation) {
		length = length || 30;
		truncation = truncation === void (0) ? "..." : truncation;
		return target.length > length ? target.slice(0, length
				- truncation.length)
				+ truncation : String(target);
	};
})(window);