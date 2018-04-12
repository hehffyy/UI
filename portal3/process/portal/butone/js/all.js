/*
 * file from "UI\portal2\process\portal\components\tab\tab.js"
 */
(function(global){
	function Tab(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	}
	
	Tab.prototype = {
		init: function(){
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
			$.each(this.pages, function(i, page){
				page.el = $('<li><span/><a href="#">' + page.title + '</a></li>');
				page.el.click(function(){
					$('li', me.listEl).removeClass('on');
					$(this).addClass('on');
					$(content).hide();
					$('#'+page.id).show();
					if(me.onIndexChange)
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

(function(global){
	
	var SliddingPanel = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};
	
	SliddingPanel.prototype = {
			init: function(){
				var content = this.el.children();
				this.el.empty();
				this.el.addClass('sliddingpanel');
				this.contentEl = $('<div><div class="c">' +
					'<div class="inner"></div>' +
					'</div>' +
					'</div>');
				
				this.cEl = $('.c', this.contentEl);
				$('.inner', this.contentEl).append(content);
				this.el.append(this.contentEl);
			},
			show: function(){
				this.cEl.show();
			},
			hide:function(){
				this.cEl.hide();
			},
			close: function(){
				var me = this;
				this.cEl.slideToggle(100);
			}
		};
	
	global.SliddingPanel = SliddingPanel;
})(window);

/*
 * file from "UI\portal2\process\portal\components\setpwd\setpwd.js"
 */

(function(global){
	
	var SetPwd = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};
	
	SetPwd.prototype = {
		init: function(){
			var me = this;
			this.el.addClass('setpwd');
			this.contentEl = $('' +
				'<div>'+
				'<div class="pwd-head"><span class="pwd-title">修改密码</span></div>' +
				'<div class="left">' +
				'<div class="row">' +
					'<label>旧密码</label>' +
					'<input type="password" class="field oldpwd"></input></div>' +
				'<div class="row">' +
					'<label>新密码</label>' +
					'<input type="password" class="field pwd"></input><span class="newPwd"></span></div>' +
				'<div class="row">' +
					'<label>请确认新密码</label>' +
					'<input type="password" class="field pwd2"></input><span class="newPwd"></span></div>' +
				'<div class="row btnBar">' + 
				'<a class="saveBtn" href="#">确定</a>' +
				'<a class="cancelBtn" href="#">取消</a>'+
				'<a class="message">some text</a>'+
				'</div>' +
				'</div>' +
				// '<div class="right">' + this.description + '</div>' +
				'</div>'
			);
			this.el.append(this.contentEl);
			this.msgEl = $('.message', this.el);
			$('.saveBtn', this.el).click(function(){
				me.change();
			});
			$('.cancelBtn', this.el).click(function(){
				me.reset();
			});
			var tisPwd = null;
			var tisPwd2 = null;
			var tipsOpt = {
			        guide: 1,
			        style: ['background-color:#08C; color:#fff', '#08C'],
			        maxWidth:240
			    };
			$('.pwd', this.el).focus(function(){
				$(this).siblings(".newPwd").text(me.description);
				// tisPwd = layer.tips(me.description, this, tipsOpt);
			}).blur(function(){
				$(this).siblings(".newPwd").text("");
				// layer.close(tisPwd);
			});
			
			$('.pwd2', this.el).focus(function(){
				// tisPwd2 = layer.tips(me.description, this, tipsOpt);
				$(this).siblings(".newPwd").text(me.description);
			}).blur(function(){
				// layer.close(tisPwd2);
				$(this).siblings(".newPwd").text("");
			});
			
		},
		message: function(msg, error){
			var me = this;
			if(error){
				this.msgEl.addClass('error');
			};
			this.msgEl.html(msg);
			this.msgEl.fadeIn(200, function(){
				setTimeout(function(){
					me.msgEl.fadeOut(500, function(){
						me.msgEl.html('');
						me.msgEl.removeClass('error');
					});
				}, 5000);
			});
		},
		change: function(){
			var me = this, msg='';
			if(msg = this.check()){
				this.message(msg, true);
			}else{
				var oldpwd = $('.oldpwd', this.el).val(),
					pwd = $('.pwd', this.el).val();
					username = justep.Context.getCurrentPersonMemberCode();

				var url = this.getChangeURL();
				url += '?username=' + username 
					+ '&password=' + hex_md5(oldpwd) 
					+ '&new_password=' + hex_md5(pwd);
				// todo:
					// + '&language=' + this.getLocale();

				var result = justep.Request.sendHttpRequest(url);
				result = justep.Request.responseParseJSON(result);
				if(result.flag){
					this.message('密码修改成功');
					this.reset();
				}else{
					this.message(result.message, true);
				}
			}
		},
		getChangeURL: function(){
			return window.location.href.replace(/index.*\.w.*/, 'ChangePassword.j');
		},
		reset: function(){
			$('input', this.el).val('');
		},
		check: function(){
			var oldpwd = $('.oldpwd', this.el).val(),
				pwd = $('.pwd', this.el).val(),
				pwd2 = $('.pwd2', this.el).val();
			if(!oldpwd) return '旧密码不能为空';
			if(!pwd) return '新密码不能为空';
			if(pwd != pwd2) return '新密码录入不一致,请再确认';
			return this.validate && this.validate(pwd);
		}
	};
	
	global.SetPwd = SetPwd;
})(window);

/*
 * file from "UI\portal2\process\portal\components\advancedset\advancedset.js"
 */

(function(global){
	
	var AdvancedSet = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};
	
	AdvancedSet.prototype = {
		init: function(){
			this.el.addClass('advancedset');
			this.contentEl = $('' +
				'<div class="adv-head"><span class="adv-title">高级设置</span></div>' +
				'<div class="row">' +
					'<span>您可以恢复为系统的初始布局, 系统初始布局是由系统管理员为您分配和负责管理的. 恢复为默认布局后您现有的布局将无法恢复.</span><br/>' +
				'</div>'+
				'<div class="adv-foot"><a class="saveBtn" href="#">恢复为系统初始布局</a><span class="success">操作已经成功, 需要重新登陆后生效.</span></div>'
			);
			this.el.append(this.contentEl);
			var me = this;
			$('.saveBtn', this.el).click(function(){
				var params = new justep.Request.ActionParam();	
				params.setString('personID', justep.Context.getCurrentPersonID());
				response = justep.Request.sendBizRequest("/portal2/process/portal/portalProcess", "index", "clearPortalAction", params, null, null, false);
				if(!justep.Request.isBizSuccess(response)){
					var msg = new justep.Message(justep.Message.JUSTEP233002);
					throw justep.Error.create(msg);
			    }else{
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

(function(global){
	
	var PortalSet = function(options){
		$.extend(this, options);
		eventable(this);
		this.el = $('#' + this.id);
		this.init();
	};
	
	PortalSet.prototype = {
		init: function(){
			this.el.addClass('portalset');

			var me = this;
			
			this.el.append($('<div class="pageset"  style="width: ' + ('100%') + '">' +
				'<div class="section w-portal" style="width:' + '600px' + ';height:240px;"><div class="section-inner">' +
					'<div class="w-head">调整布局</div>' +
					'<div class="select-layout w-content">' +
						'<div style="min-height: 140px;"></div>' +
					'</div>' +
				'</div></div>' + 
				'<div class="section w-portal" style="width:' + '600px' + ';height:240px;"><div class="section-inner">' +
					'<div class="w-head">选择模块</div>' +
					'<div class="select-widget w-content" style="width:570px" >' +
						'<ul></ul>' +
					'</div>' +
				'</div></div>' + 
			'</div>'));
			
			(function(){
				var ul = $(".select-widget>ul", me.el);
				me.mng.eachWidgetDef(function(widget, category){
					var title = (category? (category+':'):'') + widget.title,
						li = $("<li><a href='#' widgetid='" + widget.id + "'>" + title + "</a></li>");
					ul.append(li);
					$('a', li).click(function(){
						if($(this).hasClass('checked')){
							me.mng.removeWidget(widget.id);
						}else{
							me.mng.addWidget(widget.id);
						}
						$(this).toggleClass('checked');
					});
				});					
			})();
			(function(){
				var layoutsEl = $('.select-layout>div', me.el);
				me.mng.eachLayout(function(layout, name){
					function print(layout, container){
						if(layout.columns){
							var widths = util.cut(util.map(layout.columns, function(column){
								return column.width;
							}));
							$.each(layout.columns, function(i, column){
								column.el = util.domHelp.div().addClass('column');
								if(column.background)
									column.el.css({background: column.background});
								column.el.width((widths[i] + '%'));
								print(column, column.el);
								container.append(column.el);
								if (column.index != undefined) {
									column.el.addClass('color-layout-'+column.index);
								}
							});
						}else if(layout.rows){
							var heights = util.cut(util.map(layout.rows, function(row){
								return;
							}));
							$.each(layout.rows, function(i, row){
								row.el = util.domHelp.div().addClass('row').height(heights[i]+'%');
								if(row.background)
									row.el.css({background: row.background});
								print(row, row.el);
								container.append(row.el);
								if (row.index != undefined) {
									row.el.addClass('color-layout-'+row.index);
								}
							});
						}
					}
					var conttainer = $('<div class="select-layout-item"><div class="thumbnail thumbnail-select" value="' + name + '"></div><input type="radio" name="layout"  value="' + name + '"></input></div>');
					layoutsEl.append(conttainer);
					print(layout, $('.thumbnail', conttainer));
				});
				$('input[name=layout]', layoutsEl).click(function(){
					var value = $(this).attr('value');
					me.mng.setLayout(value);
					$('.thumbnail', layoutsEl).removeClass('thumbnail-select');
					$('.select-layout-item .thumbnail[value=' + value + ']', layoutsEl).addClass('thumbnail-select');
				});
				$('.select-layout-item .thumbnail', layoutsEl).click(function(){
					var value = $(this).attr('value');
					me.mng.setLayout(value);
					$('.thumbnail', layoutsEl).removeClass('thumbnail-select');
					$('.select-layout-item .thumbnail[value=' + value + ']', layoutsEl).addClass('thumbnail-select');
					$('input[name=layout][value=' + value +	 ']', layoutsEl).get(0).checked = true;
				});

				$('input[name=layout][value=' + me.mng.layout + ']', layoutsEl).get(0).checked = true;
				$('.thumbnail', layoutsEl).removeClass('thumbnail-select');
				$('.select-layout-item .thumbnail[value=' + me.mng.layout + ']', layoutsEl).addClass('thumbnail-select');
				
				$('.select-widget >ul >li>a', me.el).removeClass('checked');
				for(var i=0;i<me.mng.widgets.length; i++){
					var id = me.mng.widgets[i].widgetId;
					if(id){
						$('.select-widget ul >li>a[widgetid=' + id + ']', me.el).addClass('checked');
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

(function(global){

	var Customizer = function(config){
		$.extend(this, config);
		this.enableSave = !justep.Portal.agentInfo;
	};
	
	Customizer.prototype = {
		doSave: function(key, data){
			if(!this.enableSave) return;
			var params = new justep.Request.ActionParam();	
			params.setString(key, JSON.stringify(data));
			params.setString('personID', justep.Context.getCurrentPersonID());
			var action = key ==='functree'? "saveFunctreeAction" : "savePortalAction";
			response = justep.Request.sendBizRequest("/portal2/process/portal/portalProcess", "index", action, params, null, null, false);
			if(!justep.Request.isBizSuccess(response)){
				var msg = new justep.Message(justep.Message.JUSTEP233000, key);
				throw justep.Error.create(msg);
		    }
		},
		saveFunctree: function(data){
			this.doSave("functree", data);
		},
		savePortal: function(data){
			this.doSave("portal", data);
		},
		save: function(key, data){
			if(!this.enableSave) return;
			this.other[key] = data; 
			var params = new justep.Request.ActionParam();	
			params.setString("other", JSON.stringify(this.other));
			params.setString('personID', justep.Context.getCurrentPersonID());
			response = justep.Request.sendBizRequest("/portal2/process/portal/portalProcess", "index", "saveOtherAction", params, null, null, false);
			if(!justep.Request.isBizSuccess(response)){
				var msg = new justep.Message(justep.Message.JUSTEP233000, key);
				throw justep.Error.create(msg);
		    }
		},
		get: function(key){
			return this.other[key];
		}
		
	};
	
	global.Customizer = Customizer;
	justep.Portal.Customizer = Customizer;
})(window);
/*
 * file from "UI\portal2\process\portal\components\portalManager.js"
 */

(function(global){
	
	function PortalManager(config){
		$.extend(this, config);
		this.widgets = this.widgets || [];
		if(this.customizer.portal.widgets){
			$.extend(this, this.customizer.portal);
		}
		eventable(this);
		this.data = {};
		this.init();
	};
	
	// this.callEvent('remove-shortcut', [this.clone(item)]);
	
	PortalManager.prototype = {
		init: function(){
			this.indexTable = {};
			for(var c in this.widgetDefs){
				if(this.widgetDefs.hasOwnProperty(c)){
					var some = this.widgetDefs[c].widgets,
						category = this.widgetDefs[c].category;
					for(var i in some){
						var one = some[i];
						// 生成唯一id
						one.id = this.funcMng.genId(one);
						if(!this.indexTable[one.id]){
							this.indexTable[one.id] = one;
						}
					}
				}
			}
		},
		setLayout: function(id){
			if(this.layout != id){
				this.layout = id;
				this.callEvent('layout-change', [id]);
				this.save();
			}
		},
		addWidget: function(id){
			// 默认加到dock 0
			var me = this, dock = 0,
				widget = {dock: dock, widgetId: id, position: (function(){
					var max = 0;
					for(var i in me.widgets){
						if(me.widgets[i].dock === dock)
							max = max > me.widgets[i].position? max : (me.widgets[i].position + 1);  
					}
					return max;
				})()};

			this.widgets.push(widget);
			this.callEvent('add-widget', [widget]);
			this.save();
		},
		removeWidget: function(id){
			var widgets = this.widgets;
			this.widgets = [];
			for(var i=0; i<widgets.length; i++){
				var widget = widgets[i];
				if(widget.widgetId === id)
					continue;
				this.widgets.push(widget);
			}
			this.callEvent('remove-widget', [id]);
			this.save();
		},
		setWidgetDock: function(id, dockIndex, position){
			var widgets = this.widgets;
			for(var i=0; i<widgets.length; i++){
				var widget = widgets[i];
				if(position[widget.widgetId] != undefined){
					widget.position = position[widget.widgetId]; 
				}
				if(widget.widgetId === id){
					if(widget.dock != dockIndex){
						widget.dock = dockIndex;
						this.callEvent('dock-changed', [id, dockIndex]);
					}	
				}
			}
			this.save();
		},
		setWidgetAttr: function(id, name, value){
			var widgets = this.widgets;
			for(var i=0; i<widgets.length; i++){
				var widget = widgets[i];
				if(widget.widgetId === id){
					if(widget[name] != value){
						widget[name] = value;
						this.save();
					}
					return;
				}
			}
		},
		eachLayout: function(cb){
			var me = this;
			$.each(util.getKeys(this.layouts), function(i, name){
				cb(me.layouts[name], name);
			});
		},
		getWidgetDefById: function(id){
			return this.indexTable[id];
		},
		eachWidgetDef: function(cb){
			for(var c in this.widgetDefs){
				if(this.widgetDefs.hasOwnProperty(c)){
					var some = this.widgetDefs[c].widgets,
						category = this.widgetDefs[c].category;
					for(var i in some){
						var one = some[i];
						if((this.indexTable[one.id] == one) && one.url)
							cb(one, category);
					}
				}
			}
			return null;
		},
		save: function(){
			this.customizer.savePortal({
				widgets: this.widgets,
				layout: this.layout
			});
		},
		runFunc: function(item){
			this.funcMng.runFunc(item);
		},
		refresh: function(all){
			this.callEvent('refresh-widget', [all]);
		}
	};	
		
	global.PortalManager = PortalManager;
	justep.Portal.PortalManager = PortalManager;
})(window);

/*
 * file from "UI\portal2\process\portal\components\collection.js"
 */

(function(global){

	function Collection(){
		this.keys = [];
		this.items = [];
		this.map = {};
		this.length  = 0;
	}
	
	Collection.prototype = {
	    add : function(key, obj){
	        var me = this,
	            myObj = obj,
	            myKey = key,
	            old;

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
	    
	    addAll : function(objs){
	        var me = this,
	            i = 0,
	            args,
	            len,
	            key;

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
	    get: function(id){
	    	var index = this.indexOfKey(id);
	    	return this.items[index];
	    },

	    each : function(fn, scope){
	        var items = [].concat(this.items), // each safe for removal
	            i = 0,
	            len = items.length,
	            item;
	
	        for (; i < len; i++) {
	            item = items[i];
	            if (fn.call(scope || item, item, i, len) === false) {
	                break;
	            }
	        }
	    },
	    removeAt : function(index){
	        var me = this,
	            o,
	            key;
	
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
	    
	    insert : function(index, key, obj){
	        var me = this,
	            myKey = key,
	            myObj = obj;

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
	
	    removeAtKey : function(key){
	        return this.removeAt(this.indexOfKey(key));
	    },
		
	    indexOfKey : function(key){
	        return util.Array.indexOf(this.keys, key);
	    },
	    
	    containsKey : function(key){
	        return typeof this.map[key] != 'undefined';
	    },
	    
	    moveTo: function(index, key){
	    	return this.insert(index, key, this.map[key]);
	    }
	};

	global.Collection = Collection;
})(window);
/*
 * file from "UI\portal2\process\portal\components\funcManager.js"
 */

(function(global){
	
	/*
	 * event: run-func close-func
	 */
	
	function FuncManager(config){
		eventable(this);
		// 正在运行的功能
		this.runing = {};
		this.arrLeftNode = [];
		$.extend(this, config);

		// 和待办相关
		this.openers = [];
		this.agents = this.agents || [];

		//
		this.init();
		
		// 常用功能 可排序
		this.shortcut = new Collection();
		this.shortcut.getKey = function(obj){
	         return obj;
	    };
	    var enabled = [],
	    	shortcut = this.customizer.functree.shortcut;
	    for(var i in shortcut){
	    	if(this.getItem(shortcut[i])){
	    		enabled.push(shortcut[i]);
	    	}
	    }
	    this.shortcut.addAll(enabled);
	    
	};
	
	// 获取叶子节点，zhengff 20150331
	FuncManager.prototype.setLeafNode = function(item){
		var __value = item;
	    this.arrLeftNode.push({
	    	label:__value.label,
	    	value:__value.id
	    });
	    return this;
	};
	
	// 获取叶子节点，zhengff 20150331
	FuncManager.prototype.getLeafNode = function(){
	    return this.arrLeftNode;
	};
	
	// 遍历功能树, 深度优先 level，zhengff 20150331
	FuncManager.prototype.each = function(cb){
		function walk(data,level, parent){
			for(var i=0; i<data.length; i++){
				var item = data[i];
				if(!cb(item,level, parent, i) && item.childNodes){
					walk(item.childNodes,level+1, item);
				}
			}
		}
		walk(this.data,0);
	}
	// 添加 级别属性 level，zhengff 20150331
	FuncManager.prototype.init = function(){
		var me = this;
		this.indexTable = {};
		this.each(function(item,level, parent, index){
			item.parent = parent;
			item.level = level;
			item.index = parent? (parent.index + ' ' + index) : index;
			item.fullName = parent ? (parent.fullName + '\\' + item.title) : item.title;
			if(item.url){
				item.executor = me.genExecutor();
				item.id = me.genId(item);
				if(!me.indexTable[item.id]){
					me.indexTable[item.id] = item;
				}
				me.setLeafNode(item);
			}
		});
	};
	
	FuncManager.prototype.genExecutor = function(){
		return justep.Portal.agentInfo? 
			justep.Portal.agentInfo.currentPersonID : 
			justep.Context.getCurrentPersonID();
	};	
	
	FuncManager.prototype.genId = function(item){
		// *基于url activity process params 生成id(md5)
		var s = ((item.url||"") + (item.activity||"") + (item.process||"") + (item.params||"")).toLowerCase();
		return hex_md5(s);
	};

	FuncManager.prototype.getItem = function(id){
		return this.indexTable[id];
	};
	
	FuncManager.prototype.getFuncTree = function(){
		return this.data;
	};
	
	// private
	FuncManager.prototype.clone = function(item, executor){
		return {
			id: item.id,
			label: item.label,
			fullName: item.fullName,
			url: item.url,
			params: item.params,
			process: item.process,
			activity: item.activity,
			onload: item.onload,
			executor: executor || item.executor,
			opener: item.opener,
			icon: item.icon,
			icon16: item.icon16,
			icon32: item.icon32,
			icon64: item.icon64
		};
	}

	// name, url, parm
	FuncManager.prototype.runFunc = function(id, executor){
		var item = id;
		if(typeof item == "string")
			item = this.getItem(item);
		
		if(item){
			if(!item.id) 
				item.id = this.genId(item);
			
			if(!this.isRuned(item.id)){
				this.runing[item.id] = item;
				this.callEvent('run-func', [this.clone(item, executor)]);
			}else{
				this.callEvent('active-func', [this.clone(item, executor)]);
			}
			return item.id;
		}
	};

	FuncManager.prototype.refreshFunc = function(item){
		if(!item.oldId || !this.isRuned(item.oldId)){
			this.runFunc(item);
			return;
		}
		if(!item.id) 
			item.id = this.genId(item);
			
		if(!this.isRuned(item.id)){
			delete this.runing[item.oldId];
			this.runing[item.id] = item;
			var temp = this.clone(item);
			temp.oldId = item.oldId;
			this.callEvent('refresh-func', [temp]);
		}else{
			this.callEvent('active-func', [this.clone(item)]);
		}
		return item.id;
	};
	
	// TODO TKJ 关闭前调用frame.contentWindow.onbeforeunload
	FuncManager.prototype.beforeCloseFunc = function(id,callback){
		id = id || justep.Portal.getWindowId();
		if(typeof id == 'object')
			id = id.id;
		var item = this.runing[id];
		if(item){
			var option = this.clone(item);
			this.callEvent('before-close-func', [option,callback]);
		}
	};
	
	FuncManager.prototype.closeFunc = function(id){
		id = id || justep.Portal.getWindowId();
		if(typeof id == 'object')
			id = id.id;
		var item = this.runing[id];
		if(item){
			delete this.runing[id];
			this.callEvent('close-func', [this.clone(item)]);
		}
	};
	
	FuncManager.prototype.isShortcut = function(id){
		return this.shortcut.indexOfKey(id) != -1;
	};
	
	FuncManager.prototype.isRuned = function(id){
		return !!this.runing[id];
	};
	
	FuncManager.prototype.addShortcut = function(id){
		var item = id;
		if(typeof item == 'string')
			item = this.getItem(item);
		
		if(item && this.shortcut.indexOfKey(item.id) == -1){
			this.shortcut.add(item.id);
			this.callEvent('add-shortcut', [this.clone(item)]);
			this.save();
		}
	};
	
	FuncManager.prototype.removeShortcut = function(id){
		var item = id;
		if(typeof item == 'string')
			item = this.getItem(item);
		
		id = this.shortcut.removeAtKey(item.id);
		if(id){
			this.callEvent('remove-shortcut', [this.clone(item)]);
			this.save();
		}
	};
	
	FuncManager.prototype.moveShortcut = function(index, id){
		this.shortcut.moveTo(index, id);
		this.save();
	};
	
	FuncManager.prototype.eachShortcut = function(cb){
		var me = this;
		this.shortcut.each(function(id){
			var item = me.getItem(id);
			cb(me.clone(item));
		});
	};
	
	FuncManager.prototype.getRunedCount = function(){
		var count = 0;
		for (var k in this.runing) {
		    if (this.runing.hasOwnProperty(k)) {
		       ++count;
		    }
		}
		return count;
	};
	
	FuncManager.prototype.save = function(){
		var shortcut = [];
		this.customizer.saveFunctree({
			shortcut: this.shortcut.items
		});
	};
	
	FuncManager.prototype.getAgentCount = function(cb){
		return this.agents.length;
	};
	
	FuncManager.prototype.eachAgent = function(cb){
		for(var i in this.agents){
			cb(this.agents[i]);
		}
	}
	
	FuncManager.prototype.openAgentPage = function(agentId){
		var opener = window.open("index.w?agent="+agentId+'&bsessionid=' + this.bsessionid+"&process=/portal2/process/portal/portalProcess", agentId);
		this.openers.push(opener);
		return opener;
	};
	
	FuncManager.prototype.closeAllAgentPage = function(){
		for(var i in this.openers){
			this.openers[i].close();
		}
	};
	
	global.FuncManager = FuncManager;
	justep.Portal.FuncManager = FuncManager;
})(window);

/*
 * file from "UI\portal2\process\portal\components\functreeview\funcTreeView.js"
 */

(function(globel){
	var FuncTreeView = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};
	
	// private
	FuncTreeView.prototype.init = function(){
		this.data = this.funcMng.getFuncTree();
		function walkData(data, level, path, cb){
			for(var i=0; i<data.length; i++){
				var item = data[i];
				cb(item, level, path);
				item.childNodes && walkData(item.childNodes, level+1, path + '/' + item.label, cb);
			}
		}
		walkData(this.data, 0, '', function(item, level, path){
			item.level = level;
			item.extended = false;
			item.column = null;
			item.el = null;
			item.scrolled = false;
			item.role = (item.url == undefined)? 'dir' : (function(){
				item.fullName = path + '/' + item.label;
				return 'func'; 
			})();
			
		});
		this.el.addClass('functreeview');
		
		// create root column
		this.el.empty();
		this.el.append($("<a class='close' href='#close'>close</a>").click(function(){
			$('#fun-map-close-btn').click();
		}));
		this.rootColumn = this.createColumn(this.data);
		this.el.append(this.rootColumn);

		if(!this.scolling){
			$(this.rootColumn).jScrollPane();
			this.scolling = true;
		}
	};
	
	// private
	FuncTreeView.prototype.createColumn = function(data, level){
		var me = this;
			column = $('<div class=\'column\'></div>'),
			ul = $('<ul></ul>').appendTo(column);
		for(var i=0;i<data.length;i++){
			var item = data[i],
				serverName = window.location.pathname.split('/')[1],
				style = ((item.role == 'func') && (item.icon16 || item.icon))? ('style="background-image: url(/' + serverName + (item.icon16 || item.icon) + ')"') : undefined;
				
			var li = $('<li role="' + item.role + '"><a href=\'#\' ' + style + '>' + item.label + '</a></li>');
			item.el = li;
			li.click((function(item){
				return function(){
					if(item.extended) return false;
					me.extend(item);
					return false;
				}
			})(item));
			if(item.role == 'func')
				li.dblclick((function(item){
					return function(){
						me.funcMng.runFunc(item);
					};	
				})(item));
			ul.append(li);
		}
		var left = level==undefined? 0 : level*this.rootColumn.width();
		column.css({left: left});
		return column;
	};
	
	// private
	FuncTreeView.prototype.getExtendedInColumn = function(data){
		for(var i=0; data && i<data.length; i++){
			if(data[i].extended){
				return data[i]; 
			}
		}
		return null;
	}
	// private
	FuncTreeView.prototype.getColumnAt = function(level){
		var childNodes = this.data;
		while(--level>=0){
			var item = this.getExtendedInColumn(childNodes);
			if(!item) break;
			childNodes = item.childNodes;
		}
		return childNodes;
	}
	
	// private
	FuncTreeView.prototype.getActiveAt = function(level){
		var column = this.getColumnAt(level);
		return this.getExtendedInColumn(column);
	}
	
	// private
	FuncTreeView.prototype.shrink = function(item){
		if(typeof item == 'number'){
			item = this.getActiveAt(item);
		}
		if(item && item.extended){
			var subExtended = this.getExtendedInColumn(item.childNodes);
			this.shrink(subExtended);
			item.column.hide();
			item.el.attr('extended', 'off');
			item.extended = false;
		}
	}
	
	// private
	FuncTreeView.prototype.find = function(path){
		if(typeof path == 'string')
			path = path.split(' ');
		var item, data = this.data;	
		while(path.length){
			var index = parseInt(path.shift());
			item = data[index];
			data = item.childNodes;
		}
		return item;
	}
	
	// private
	FuncTreeView.prototype.getEmptyColumn = function(){
		if(!this.emptyColumn){
			this.emptyColumn =  $('<div class="column"><span class="empty">&lt;空&gt;</span></div>');
		}
		return this.emptyColumn; 
	}
	
	FuncTreeView.prototype.createDetail = function(item){
		var me = this, div = $('<div class="detail">' +
			'<div style="width:100%;">' +
				'<div class="bar">' +
					'<ul>' +
						'<li>' +
							'<a class="fun-run-btn" href="#">运行</a>' +
						'</li>' +
						'<li class="set-quick-func-btn">' +
							'<a href="#">设置为常用功能</a>' +
						'</li>' +
					'</ul>' +
				'</div>' +
				'<div class="info">' +
					'<span>' + item.label + '</span>' +
					'<a class="more-info-btn"  href="#">详细</a>' +
					'<div class="more">' +
						'<span>' + item.fullName + '</span><br/>' +
						'<span>' + item.url + '</span><br/>' +
						'<a class="more-info-close-btn" href="#">隐藏</a>' +
					'</div>' +
				'</div>' +
				'<div class="pos">' +
					'<span>岗位选择</span>' +
					'<a class="more-info-btn"  href="#">详细</a>' +
					'<div class="more">' +
					'</div>' +
				'</div>' +
			'</div>' +
		'</div>');

		if(parseInt(item.psmCount)>1){
			$('.pos', div).css({display: "block"});
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
			if(!justep.Request.isBizSuccess(response, 'json')){
				var msg = new justep.Message(justep.Message.JUSTEP233001);
				throw justep.Error.create(msg);
		    }
			var psm = justep.Request.responseParseJSON(response).data.value;
			var more = $('.pos .more', div);
			for(var key in psm){
				if(psm.hasOwnProperty(key)){
					var posRun = $('<span><a href="#">' + psm[key] + '</a></span><br/>').click((function(key){
						return function(){
							me.funcMng.runFunc(item, key);
						};
					})(key));
					more.append(posRun);
				}
			}	
			more.append('<a class="more-info-close-btn" href="#">隐藏</a>');
		}
		
		var w = this.rootColumn.width() * (item.level+1);
		div.css({'margin-left': w});
		$('.fun-run-btn', div).click(function(){
			me.funcMng.runFunc(item);
			if(me.onrun){
				me.onrun.call(this, {label: item.label});
			}
			return false;
		});
		if(this.funcMng.isShortcut(item.id)){
			$('.set-quick-func-btn', div).hide();
		}
		$('.set-quick-func-btn', div).click(function(){
			me.funcMng.addShortcut(item);
			$(this).fadeOut(500);
			return false;
		});
		
		$('.info .more-info-btn', div).click(function(){
			$('.info .more', div).show();
			$(this).hide();	
			return false;
		});
		
		$('.info .more-info-close-btn', div).click(function(){
			$('.info .more', div).hide();
			$('.info .more-info-btn', div).show();	
			return false;
		});

		$('.pos .more-info-btn', div).click(function(){
			$('.pos .more', div).show();
			$(this).hide();	
			return false;
		});
		
		$('.pos .more-info-close-btn', div).click(function(){
			$('.pos .more', div).hide();
			$('.pos .more-info-btn', div).show();	
			return false;
		});
		 
		return div;
	};
	
	FuncTreeView.prototype.setShortcutable = function(id){
		var id = (typeof id == 'string')? id : id.id,
			item = this.funcMng.getItem(id);
		if(item && (item.role == 'func') && item.column){
			$('.set-quick-func-btn', item.column).fadeIn(500);
		}
	};
	
	FuncTreeView.prototype.extend = function(item){
		var me = this;
		if(this.extending) return;
		this.extending = true;
		if(typeof item == 'string'){
			item = this.find(item);
		}
		this.shrink(item.level);
		
		item.extended = true;
		item.el.attr('extended', 'on');
		if(!item.column){
			if(item.role == 'dir'){
				if(item.childNodes && item.childNodes.length>0)
					item.column = this.createColumn(item.childNodes, item.level + 1);
				else
					item.column = this.getEmptyColumn();							
			}
			if(item.role == 'func'){
				item.column = this.createDetail(item);
			}
			item.column.hide();
			this.el.append(item.column);
		}
		
		if(item.column){
			// item.column.css({'overflow': 'hidden'});
			if(item.role == 'dir')
				item.column.effect('slide', 400, function(){
					if((item.role == 'dir') &&!item.scrolled){
						$(item.column).jScrollPane();
						item.scrolled = true;
					}
					me.extending = false;
				});
			else{
				item.column.show();	
				this.extending = false;
			}
		}else{
			this.extending = false;
		}
	};
	
	globel.FuncTreeView = FuncTreeView; 
	justep.Portal.FuncTreeView = FuncTreeView;
})(window);

(function(globel){
	var CustomScroll = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};
	
	// private
	CustomScroll.prototype.init = function(){
		this.createScroll({
			height:'500px',
			alwaysVisible: true
		});
	};
	
	// private
	CustomScroll.prototype.createScroll = function(options){
		this.el.slmScroll(options);
	};
	
	globel.CustomScroll = CustomScroll; 
	justep.Portal.CustomScroll = CustomScroll;
})(window);
/*
 * file from "UI\portal2\process\portal\components\functreemenu\functreemenu.js"
 */

(function(globel){
	var FuncTreeMenu = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};
	
	// private
	FuncTreeMenu.prototype.init = function(){
		var me = this;
		this.data = this.funcMng.getFuncTree();
		/*
		 * function walkData(data, level, path, cb){ for(var i=0; i<data.length;
		 * i++){ var item = data[i]; cb(item, level, path); item.childNodes &&
		 * walkData(item.childNodes, level+1, path + '/' + item.label, cb); } }
		 */
		var me = this;
		this.el.addClass('functreemenu');
		// create root column
		this.el.empty();
		
	// this.el.append('<a class="carou-scroll prev" href="#"><i
	// class="iconfont">&#xe751;</i></a>');
	// this.el.append('<a class="carou-scroll next" href="#"><i
	// class="iconfont">&#xe756;</i></a>');
		this.el.append('<div class="hd">'+
				'<a class="carou-scroll next" href="#"><i class="iconfont">&#xe756;</i></a>'+
				'<a class="carou-scroll prev" href="#"><i class="iconfont">&#xe751;</i></a>'+
				// '<ul></ul>'+
				'</div>');
		this.rootColumn = this.createColumn(this.data);
		this.el.append(this.rootColumn);
		this.rootColumn.accMenu({
	        speed: 0,
		    closedSign: '<i class="iconfont">&#xf004d;</i>',
			openedSign: '<i class="iconfont">&#xe661;</i>'
		});
		$('h2','.product-wrap').click(function(event){
			$(".item").removeClass("active");
			$(".product-wrap" , ".item").hide();
		});
		$('.product',this.rootColumn).click(function(event){
			var currentObj = $(this).parent(".item");
			if(currentObj.hasClass("active")){
				currentObj.removeClass("active");
			}else{
				$(this).parent(".item").siblings("li.item").removeClass("active");
				$(this).parent(".item").addClass("active");
			}
			
			// 全部
			var $arr = $(this).parent(".item").siblings("li.item").children(".product-wrap");
			$arr.hide();
			$(this).siblings(".product-wrap").toggle();
			var headHeight = $('.head').height();
			var bodyHeight = $('body').height();
			var h = bodyHeight - headHeight-47;
			$(this).siblings(".product-wrap ").children(".accWrap").height(h).jScrollPane();
		});
		// 隐藏显示
		var navSize = $("li.item",".nav ul.all-nav").size();
		var showSize = Math.floor(($(window).height()-80)/80);
		if(navSize <= showSize){
			$(".functreemenu").children("div.hd").hide();
		}
		$(".functreemenu").slide({
			mainCell:".nav ul.all-nav",
			autoPage:true,
			effect:"top",
			autoPlay:false,
			vis:showSize,
			trigger:"click"
		});
	};
	FuncTreeMenu.prototype.truncate = function(target, length, truncation){
		length = length || 30;
		truncation = truncation === void(0) ?"..." : truncation;
		return target.length > length ?
			   target.slice(0, length) + truncation : String(target);
	};
	FuncTreeMenu.prototype.getImagePath = function(){
		var serverPath = window.location.pathname;
		var repath =  /^portal[0-9]*$/;
		if(repath.test(serverPath.split('/')[2])){ 
			return "/"+serverPath.split('/')[1]+"/UI/" + serverPath.split('/')[2] +"/process/portal/";
		}else{
			return "/"+serverPath.split('/')[1]+"/" + serverPath.split('/')[2] + "/" +serverPath.split('/')[3]+"/process/portal/";
		}
	}
	FuncTreeMenu.prototype.levelTruncate = function(str,levelNum){
		if(levelNum <1){
			return str;
		}
		var _str = str;
		switch(levelNum){
		    case 1: 
			  _str = this.truncate(str, 8);
			  break;
			case 2: 
			  _str = this.truncate(str, 8);
			  break;
			case 3:
			  _str = this.truncate(str, 8);
			  break;
			default:
			  _str = this.truncate(str, 6);
			  break;
		}
		return _str;
	};
	// private
	FuncTreeMenu.prototype.createColumn = function(data){
		var skinPath = globel.Module.skin || "default";
		var serverPortalName = this.getImagePath();
		var me = this;
		var html = [];
		var print = function(data, one ,obj){
			var startTag = "<ul>";
			var endTag = "</ul>";
			
			if(one === 0){
				startTag = '<div class="nav">'
					       +'<ul class="all-nav">';
				endTag = "</ul></div>";
			}else if(one === 1){
				startTag = '<li class="item">'+
				              '<div class="product">'+
				              '<h3><a title='+obj.name+' class="icn" style="background:url('+obj.icon+') no-repeat center top">'+
				              '<span>'+me.truncate(obj.name, 8)+'</span></a>'+
				              '</h3>'+
				              '</div>'+
				                  '<div class="product-wrap pos01 menu-t" style="display:none">'+
				                  '<h2 title='+obj.name+'>'+me.truncate(obj.name, 9)+'<a class="expIcon" title="点击隐藏"><i class="iconfont">&#xe604;</i></a></h2>'+
				                  '<div class="accWrap">'+
				                  '<ul class="accMenu">';
				endTag = "</ul></div></div></li>";
			}
			html.push(startTag);
			for(var i in data){
				var item = data[i];
				if(item.url == undefined){
					if(one === 0){
						if(item.childNodes && item.childNodes.length > 0)
							print(item.childNodes, item.level+1,{
								name : item.label,
								icon : serverPortalName + "butone/themes/"+skinPath+"/images/32/"+item.icon16 || item.icon
							});
					}else{
						
						html.push('<li><a href="#" title='+item.label+' level='+item.level+'>');
						html.push(me.levelTruncate(item.label, item.level));
						html.push('</a>');
						
						if(item.childNodes && item.childNodes.length > 0)
							print(item.childNodes, item.level+1);
						html.push('</li>');
					}
				}else {
					// 可以点击打开功能项
					html.push('<li funcId="'+item.id+'"><a href="#" title='+item.label+' level='+item.level+'>');
					html.push(me.levelTruncate(item.label, item.level));
					html.push('</a></li>');
				}	
			}
			
			html.push(endTag);
		};
		
		print(data, 0);
		var rst = $(html.join('')), me = this;
		$('li a', rst).click(function(){
			var id = $(this).parent("li").attr('funcId');
			if(id){
				$(".nav").find("a").removeClass("nav-selected");
				$(this).children("a").addClass("nav-selected");
				me.rootColumn.removeClass('open');
				$(".item").removeClass("active");
				// $('>li >ul', me.rootColumn).hide();
				me.funcMng.runFunc(id);
			}
		});
		return rst;
	};
	
	globel.FuncTreeMenu = FuncTreeMenu; 
	justep.Portal.FuncTreeMenu = FuncTreeMenu;
})(window);
/*
 * file from "UI\portal2\process\portal\components\flagbar\flagbar.js"
 */

(function(global){
	
	var FlagBar = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.buttons = this.buttons || [];
		this.init();
		if(this.onCreated){
			this.onCreated.call(this);
		}
	};
	
	FlagBar.prototype = {
		init: function(){
			var me = this;
			this.el.addClass('flagbar');
			this.el.empty();
			var ul = $('<ul></ul>');
			for (var i in this.buttons) {
				var btn = this.buttons[i];
				var html = '<li><a>' + btn.title + '</a></li>';
				var li = $(html);

				btn.name = i;
				btn.el = li;
				li.attr('show', 'on');

				if(btn.click){
					li.click((
						function(btn){
							return function(){
								btn.click.call(me, btn.name);
								return false;
							};
						}
					)(btn));
				}
				
				if (btn.flag) {
					var span = $('<span class="flag"></span>');
					li.append(span);
					btn.flag.el = span;
					this.flag(btn.name, btn.flag.defaultValue);
				}
				
				ul.append(li);
			}
			this.el.append(ul);
			this._innerProcess();
		},
		// private
		_innerProcess: function(){
			$('li[show=on]', this.el).removeAttr('first').first().attr('first', '');
			$('li[show=on]', this.el).removeAttr('last').last().attr('last', '');
			
			
		},
		show: function(id, effect){
			if(effect == undefined) effect = true;
			var btn =this.buttons[id];
			if(btn){
				btn.el.fadeIn(effect? 600 : 0);
				btn.el.attr('show', 'on');
				this._innerProcess();
			}
		},
		hide: function(id, effect){
			if(effect == undefined) effect = true;
			var btn =this.buttons[id];
			if(btn){
				btn.el.fadeOut(effect ? 600 : 0);
				btn.el.attr('show', 'off');
				this._innerProcess();
			}
		},
		click: function(id){
			var btn = this.buttons[id];
			if(btn){
				btn.click.call(this, btn.name);
			}			
		},
		flag: function(name, value){
			var btn =this.buttons[name];
			if (btn && btn.flag) {
				if(value == undefined){
					return btn.flag.value; 
				}
				btn.flag.value = value;
				btn.flag.el.html(value);
				if(value == 0 || value == "0")
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

(function(global){
	
	
	var SortableBar = function(options){
		$.extend(this, options);
		this.emptyText = this.emptyText || '&lt;空&gt;';
		this.el = $('#' + this.id);
		this.init();
		if(this.oncreate)
			this.oncreate.call(this); 
	};
	
	SortableBar.prototype = {
		init: function(){
			var me = this,
				items = this.buttons || [];
			this.buttons = new Collection();
			this.buttons.getKey = function(obj){
				return obj.id;
			};
			this.buttons.addAll(items);
			this.el.addClass('sortablebar');
			if(this.baseClass){
				this.el.addClass(this.baseClass);
			}
			this.el.empty();
			this.emptyEl = $('<span class="empty">' + this.emptyText + '</span>');
			this.ulEl = $('<ul></ul>');
			this.buttons.each(function(item){
				me.doAdd(item);
			});
			
			this.el.append(this.emptyEl);
			this.el.append(this.ulEl);
			
			if(!this.canNotConfig){
				this.configEl = $('<a href="#config" class="config-btn">config</a>');
				this.configEl.click(function(){
					me.toggleConfig();
				});
				this.el.append(this.configEl);
			}
			
			if(!this.canNotClose){
				this.closeEl = $('<a href="#close" class="close-btn">Close</a>');
				this.closeEl.click(function(){
					me.close();
				});
				this.el.append(this.closeEl);
			}
			
			
			// this.ulEl.sortable({ handle: '.move', axis: 'x'});
			this.ulEl.disableSelection();			
		},
		toggleConfig: function(){
			if(this.configEl.attr('set')==='on'){
				$('ul li>span', this.el).hide();
				this.configEl.attr('set', 'off');
			}else{
				$('ul li>span', this.el).show();
				this.configEl.attr('set', 'on');
			}
		},
		close: function(){
			$(this.el).slideUp(600);
			if(this.onclose){
				this.onclose.call(this);
			}
		},
		open: function(){
			$(this.el).slideDown(600);
		},
		toggle: function(){
			this.el.is(':visible') ? this.close() : this.open();
		},
		refresh: function(option){
			if(option){
				var old = this.buttons.get(option.oldId);
				this.buttons.removeAtKey(option.oldId);
				this.buttons.add(option);
				this.doRefresh(option, old);
			}
		},
		doRefresh: function(btn, old){
			if(old){
				old.el.remove();
				old.el = null;
			}
			this.add(btn);
		},
		add: function(option){
			if(option){
				this.buttons.add(option);
				this.doAdd(option);
			}
		},
		// private
		doAdd: function(btn){
			this.emptyEl.hide();
			var me = this;
			btn.el = $('<li funcId="' + btn.id + '"><a>' + btn.label + '</a><span><a class="move"></a><a class="delete"></a></span></li>');
			if(justep.Browser.IE7)
				btn.el.css({display: 'inline'});
			else
				btn.el.css({display: 'inline-block'});
				
			btn.deleteEl = $('.delete', btn.el).click(function(){
				var _$remove = function(){
					me.remove(btn);
					if(me.ondelete){
						me.ondelete.call(me, btn);
					}
				};
				// TODO TKJ 关闭前判断
				if(me.onbeforeclose){
					var option = {id:btn.id};
					me.onbeforeclose.call(me,option,_$remove);
				}else{
					_$remove();
				}
				
			});
			$('>a', btn.el).click(function(){
				if(me.onclick)
					me.onclick(btn);
			});
			btn.el.hide();
			this.ulEl.append(btn.el);
			if(!this.sorted){
				this.sorted = true;
				this.ulEl.sortable({
					handle : '.move',
					containment : this.el,
					update: function(event, ui) {
						var index = ui.item.index(),
							key = ui.item.attr('funcId');
						me.buttons.moveTo(index, key);
						if(me.onsort){
							me.onsort.call(me, index, key);
						}
					}
				});
			}
			btn.el.fadeIn(600);
			if(this.onadd){
				this.onadd(btn);
			}
		},
		// private
		getCount: function(){
			return this.buttons.length;
		},
		remove: function(btn){
			var me = this;
			btn = this.buttons.removeAtKey(btn.id);
			if(btn){
				btn.el.fadeOut(600, function(){
					btn.el.remove();
					btn.el = null;
					if(me.getCount() == 0){
						me.emptyEl.show();
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

(function(global){

	var QuickList = function(config){
		config = config || {};
		config.baseClass = 'quicklist';
		SortableBar.apply(this, [config]);
		this.mng = config.mng;
		var me = this;
		this.mng.attachEvent('add-shortcut', function(option){
			me.add(option);
		});
		this.mng.eachShortcut(function(item){
			me.add(item);
		})
	};

	util.extend(QuickList, SortableBar);
	
	QuickList.prototype.ondelete = function(option){
		this.mng.removeShortcut(option);
	};

	QuickList.prototype.onclick = function(option){
		this.mng.runFunc(option);
	};
	
	QuickList.prototype.onsort = function(index, id){
		this.mng.moveShortcut(index, id);
	};
	
	QuickList.prototype.doAdd = function(btn){
		SortableBar.prototype.doAdd.call(this, btn);
		var serverName = window.location.pathname.split('/')[1];
		if(btn.icon32)
			$('>a', btn.el).css({'background-image': 'url(/' + serverName + btn.icon32 + ')'});
	};
	
	global.QuickList = QuickList;
})(window);
/*
 * file from "UI\portal2\process\portal\components\portalview\portalView.js"
 */
(function(globel){

	function PortalView(config){
		$.extend(this, config);
		this.el = $('#' + this.id);
		this.init();
	}
	
	PortalView.prototype.init = function(){
		var me = this;

		this.el.addClass('portalpageview');
		this.initWidgets();
		this.initLayout(this.mng.layout);
		this.makeSortable();

		
		this.mng.attachEvent('add-widget', function(widget){
			me.addWidget(util.clone(widget));
			me.makeSortable();
		});
		this.mng.attachEvent('remove-widget', function(id){
			me.removeWidget(id);
		});
		this.mng.attachEvent('layout-change', function(id){
			me.reLayout(id);
		});
		this.mng.attachEvent('dock-changed', function(id, dockIndex){
			me.setWidgetDock(id, dockIndex);
		});
		this.mng.attachEvent('refresh-widget', function(all){
			me.refreshWidget(all);
		});
		// 统一执行一次刷新
		this.mng.refresh(true);
	};	
	
	PortalView.prototype.initLayout = function(layoutId){
		var id = util.getId(this.id, 'layout');
		this.layout = {el: util.domHelp.div(id)};
		this.layout.obj = new WidgetLayout({
			el: this.layout.el,
			layout: this.mng.layouts[layoutId]	

		});
		this.el.append(this.layout.el);
		var sorted = [];
		for(var i in this.widgets){
			if(this.widgets.hasOwnProperty(i)){
				var widget = this.widgets[i];
				var p = parseInt(widget.position),
					d = parseInt(widget.dock) || 0;
				if(!isNaN(p)){
					sorted[d * 100 + p] = widget;
				}
			}
		}
		for(var i=0; i<sorted.length; i++){
			var widget = sorted[i];
			if(widget)
				this.layout.obj.add(widget.dock, widget.el);
		}
	};

	PortalView.prototype.reLayout = function(layoutId){
		this.layout.el.remove();
		this.initWidgets();
		this.initLayout(layoutId);
		this.makeSortable();
		this.mng.refresh(true);
	}

	PortalView.prototype.setWidgetDock = function(widgetId, dock){
		var widget;
		for(var i in this.widgets){
			if(this.widgets.hasOwnProperty(i))
				if(this.widgets[i].widgetId == widgetId){
					widget = this.widgets[i];
					break;
				}
		}
		if(widget && (widget.dock != dock)){
			widget.dock = dock;
			this.layout.obj.add(dock, widget.el);
		}
	};
	
	PortalView.prototype.initWidgets = function(){
		var me = this;
		this.widgets = {};
		$.each(this.mng.widgets, function(i, widget){
			me.createWidget(util.clone(widget));
		});	
	};
	
	PortalView.prototype.refreshWidget = function(all){
		for(var i in this.widgets){
			var widget = this.widgets[i];
			if(all || widget.refresh === 'true')
				$('.refresh', widget.el).click();
		}
	};
	
	PortalView.prototype.viewPortTran = function(all){
		var viewHeight = $(window).height();// 浏览器当前窗口可视区域高度
		// 768>x>650 180
		// 900>x>768 230
		if(viewHeight <= 768){
			return 230
		}else{
			return 280;
		}
	};
	PortalView.prototype.createWidget = function(widget){
		var portal = this,
		def = this.mng.getWidgetDefById(widget.widgetId);
	var id = widget.id = widget.id || util.getId();
	$.extend(widget, def);
	if(!widget.url) return;
	widget.dock = widget.dock===undefined? 0 : widget.dock;
	widget.id = id;
	widget["class"] = "widget-" + (widget["class"] || "default");
	portal.widgets[widget.id] = widget;
	
	widget.el = $('<div id="' + widget.id + '" class="widget '+ widget["class"] +'" widget="' + widget.widgetId + '">' + 
		'<div class="widget-head">' +
			'<a class="collapse" href="#" title="点击隐藏" ><i class="iconfont">&#xe6de;</i></a>' + 
			'<span class="widget-title">' + widget.title + '</span>' + 
			'<span class="right">' +
			'<a class="edit" href="#" title="点击编辑"><i class="iconfont">&#xe018;</i></a>' + 
				'<a class="refresh" href="#" title="点击刷新"><i class="iconfont">&#xe601;</i></a>' + 
				(widget.more? '<a class="more" href="#" title="查看更多"><i class="iconfont">&#xe602;</i></a>' : '') + 
			'</span>' +
		'</div>' + 
		'<div class="edit-box">' +
			'<ul>' +
				'<li class="item" style="display: none;">' +
					'<label>修改标题</label>' +
					'<input value="' + widget.title + '"></input>' +
				'</li>' +
				'<li class="item">' +
					'<label>位置设置</label>' +
					'<select class="docks">' +
						'<option value="0">第1区</option>' +
						'<option value="1">第2区</option>' +
						'<option value="2">第3区</option>' +
						'<option value="3">第4区</option>' +
					'</select>' +
				'</li>' +
				'<li class="item">' +
					'<a class="want-delete" href="#">要删除这块内容吗?</a>' +
					'<span class="delete-box">' +
						'<span style="padding-left: 10px;">确定删除吗?</span>' +
						'<input class="delete" type="button" value="确定"></input>' +
						'<a class="cancel-delete" href="#">取消</a>' +
					'</span>' +
				'</li>' +
			'</ul>' +
		'</div>' + 
		'<div class="widget-content">' +
			'<iframe frameborder=0></iframe>' +
		'</div>' + 
	'</div>');
	widget.headEl = $('.widget-head', widget.el);
	widget.titleEl = $('h5', widget.headEl);
	widget.contentEl = $('.widget-content', widget.el);
	if(parseFloat(widget.height))
		widget.contentEl.css({height: parseFloat(portal.viewPortTran())});
	widget.color = widget.color? widget.color : 'green'; 
	widget.el.addClass('portal-widget-title-color');
	widget.collapseEl = $('.collapse', widget.el).click((function(widget){
		return function(){
			var $i = widget.collapseEl.children("i"); 
			if(widget.contentEl.is(':hidden')){
				widget.collapseEl.attr("title","点击显示");
				$i.html("&#xe6de;");
			}else{
				$i.html("&#xe661;");
				widget.collapseEl.attr("title","点击隐藏");
			}
			widget.contentEl.toggle();
			return false;
		}
	})(widget));
	widget.editBoxEl = $('.edit-box', widget.el);
	widget.editEl = $('.edit', widget.el).click((function(widget){
		return function(){
			widget.editEl.toggleClass('open');
			widget.editBoxEl.toggle();
			return false;
		};
	})(widget));
	widget.titleInputEl = $('input', widget.editBoxEl).keyup((function(widget){
		return function(){
			portal.setWidgetTitle(widget.id, $(this).val());
		};
	})(widget));
	$('.docks', widget.el).val(widget.dock).change((function(widget){
		return function(){
			var dock = $(this).val();
			dock = parseInt(dock);
			portal.mng.setWidgetDock(portal.index, widget.widgetId, dock, getPosition(widget.el.parent()));
		};
	})(widget));
	/*
	 * $('.colors li', widget.el).click((function(widget){ return function(){
	 * var me = $(this); portal.setWidgetColor(widget.id,
	 * me.attr('color-value')); }; })(widget));
	 */
	widget.deleteBoxEl = $('.delete-box', widget.el);
	widget.wantDeleteEl = $('.want-delete', widget.el).click((function(widget){
		return function(){
			$(this).hide();
			widget.deleteBoxEl.show();
			return false;
		};
	})(widget));
	$('.delete', widget.el).click((function(widget){
		return function(){
			portal.deleteWidget(widget.id);
			return false;
		};
	})(widget));
	$('.cancel-delete', widget.el).click((function(widget){
		return function(){
			widget.deleteBoxEl.hide();
			widget.wantDeleteEl.show();
			return false;
		};
	})(widget));

	if(widget.more)
		$('.more', widget.el).click((function(widget){
			return function(){
				var item = util.clone(widget.more);
				item.label = item.title; 
				if(justep.Portal.agentInfo)
					item.executor = justep.Portal.agentInfo.currentPersonID;
				portal.mng.runFunc(item);
				return false;
			};
		})(widget));
	
	var getURL = function(bsessionid, option){
		if(!option.url) return "about:blank";
		
		switch(option.type){
			case "link":
				var url = option.url;
				if(option.params){
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
				if(option.url.indexOf('?') != -1){
					a = '&';
				}
				var url = '/' + uiserverName + option.url + a + 'bsessionid=' + bsessionid;
				if(option.process)
					url += '&process=' + option.process;
				if(option.activity)
					url += '&activity=' + option.activity;
				if(option.params)
					url += '&' + option.params;
				if(justep.Portal.agentInfo || option.executor)
					url += '&executor=' + (justep.Portal.agentInfo.currentPersonID || option.executor);

				url += '&language=' + justep.Portal.language;
				return url;
			default:
				return "about:blank";
		}
	};
	
	var url = getURL(portal.mng.bsessionid, widget);
	// ie下会发两次请求, 可能和后边执行append有关系, 所以改为在初始化后统一执行刷新
	// $('iframe', widget.el).src(url);

	$('.refresh', widget.el).click((function(widget, url){
		return function(){
			$('iframe', widget.el).enableIframeScroll().src(url);
			return false;
		};
	})(widget, url));
	
};

	PortalView.prototype.addWidget = function(widget){
		this.createWidget(widget);
		this.layout.obj.add(widget.dock, widget.el);
		$('.refresh', widget.el).click();
	};
	
	PortalView.prototype.removeWidget = function(widgetId){
		var widget;
		for(var i in this.widgets){
			if(this.widgets.hasOwnProperty(i))
				if(this.widgets[i].widgetId == widgetId){
					widget = this.widgets[i];
					delete this.widgets[i];
					break;
				}
		}
		if(widget){
			$('#' + widget.id).remove();
		}
	};
	
	PortalView.prototype.setWidgetTitle = function(id, title){
		var widget = this.widgets[id];
		if(widget){
			widget.title = title;
			widget.titleEl.text(title);
			widget.titleInputEl.val(title);
		}
	};
	
	PortalView.prototype.setWidgetColor = function(id, color){
		var widget = this.widgets[id];
		if(widget && (widget.color != color)){
			widget.el.addClass('color-' + color);
			widget.el.removeClass('color-' + widget.color);
			widget.color = color;
			this.mng.setWidgetAttr(widget.widgetId, 'color', color);
		}
	};
	
	PortalView.prototype.deleteWidget = function(id){
		var widget = this.widgets[id];
		if (widget) {
			this.mng.removeWidget(widget.widgetId);
		}
	};
	
	PortalView.prototype.makeSortable = function(){
		var $sortableItems = $('.dock > .widget[sortable!=true]', this.el), portal = this;

		$sortableItems.find('.widget-head').css({  
	        cursor: 'move'  
	    }).mousedown(function (e) {
	        $sortableItems.css({width:''});  
	        $(this).parent().css({  
	            width: $(this).parent().width() + 'px'  
	        });
	    }).mouseup(function () {  
	        if(!$(this).parent().hasClass('dragging')) {  
	            $(this).parent().css({width:''});  
	        } else {  
	            $('.dock', portal.el).sortable('disable');
	        }
	    }).attr('sortable', 'true');
		
		$sortableItems = $('.dock > .widget', this.el);
		$('.dock', this.el).sortable('destroy');
		$('.dock', this.el).sortable({  
		  
		        // Specify those items which will be sortable:
		        items: $sortableItems,  
		  
		        // Connect each column with every other column:
		        connectWith: $('.dock', this.el),  
		  
		        // Set the handle to the top bar:
		        handle: '.widget-head',  
		  
		        // Define class of placeholder (styled in inettuts.js.css)
		        placeholder: 'widget-placeholder',  
		  
		        // Make sure placeholder size is retained:
		        forcePlaceholderSize: true,  
		  
		        // Animated revent lasts how long?
		        revert: 300,  
		  
		        // Delay before action:
		        delay: 100,  
		  
		        // Opacity of 'helper' (the thing that's dragged):
		        opacity: 0.8,  
		  
		        // Set constraint of dragging to the document's edge:
		        // containment: this.el,
		  
		        // Function to be called when dragging starts:
		        start: function (e,ui) {  
		            $(ui.helper).addClass('dragging');  
		        },  
		  
		        // Function to be called when dragging stops:
		        stop: function (e,ui) {  
		  
		            // Reset width of units and remove dragging class:
		            $(ui.item).css({width:''}).removeClass('dragging');  
		  
		            // Re-enable sorting (we disabled it on mouseup of the
					// handle):
		            $('.dock', portal.el).sortable('enable');
					
					portal.layout.obj.resize();  
		  
		        	var index = ui.item.parent().attr("index");
		        	index = parseInt(index);
		        	if(index != undefined){
		        		portal.mng.setWidgetDock(ui.item.attr("widget"), index, getPosition(ui.item.parent()));
		        	}
		        }
		        
		    });  		
	}
	
	function getPosition(el){
		var position = {};
		$('[widget]', el).each(function(i, item){
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

(function(globel){
	function WidgetLayout(config){
		this.docks = [];
		$.extend(this, config);
		this.id = this.id || this.el.attr('id');
		this.el = this.el || $('#' + this.id);
		this.dockClass = this.dockClass || 'dock';
		this.layout = util.clone(this.layout);
		this.init();
	}
	
	WidgetLayout.prototype = {
		init: function(){
			this.el.addClass('widgetlayout');
			this.print(this.layout, this.el);
		},
		print: function(layout, container){
			var me = this;
			if(!layout) return;
			if(layout.columns){
				var widths = cut(util.map(layout.columns, function(column){
					return column.width;
				}));
				$.each(layout.columns, function(i, column){
					column.el = util.domHelp.div().addClass('column').css({background: column.background});
					column.el.width((widths[i] + '%'));
					var dock  = util.domHelp.div().addClass('dock');
					me.print(column, dock);
					column.el.append(dock);
					container.append(column.el);
					if(column.index!=undefined){
						me.docks[column.index] = dock;
						dock.attr('index', column.index);
					}
				});
			}else if(layout.rows){
				$.each(layout.rows, function(i, row){
					row.el = util.domHelp.div().addClass('row').css({background: row.background});
					var dock  = util.domHelp.div().addClass('dock');
					me.print(row, dock);
					row.el.append(dock);
					container.append(row.el);
					if(row.index!=undefined){
						me.docks[row.index] = dock; 
						dock.attr('index', row.index);
					}
				});
			}
		},
		resize: function(){
			function doResize(layout){
				var h = 0;
				if(layout.columns){
					$.each(layout.columns, function(i, column){
						var height;
						if(column.rows || column.columns){
							height = doResize(column);
						}else{
							height = column.el.height();
						}
						if(height > h) h = height;
					});
				}else if(layout.rows){
					$.each(layout.rows, function(i, row){
						if(row.rows || row.columns){
							var height = doResize(row);
							row.el.height(height);
							h += height;
						}else
							h += row.el.height();
					});
				}
				return h;
			}
			var h = doResize(this.layout);
			this.el.height(h);
		},
		add: function(index, el){
			if(typeof index != 'number'){
				el = index;
				index = 1;
			}
			var target = this.docks[index];
			if(target){
				target.append(el);
				this.resize();
			}
		},
		getDockCount: function(){
			return this.docks.length;
		}
	};
	
	function cut(widths){
		var isPercent = true;
		/*
		 * $.each(widths, function(i, width){ if(width!=undefined){ isPercent =
		 * (width+'').indexOf('%')!=-1; if(!isPercent) return true; } });
		 */
		if(isPercent){
			var total = 0, l = 0;
			$.each(widths, function(i, width){
				if(width!=undefined){
					width = parseInt(width);
					total += width;
				}else{
					l++;
				}
			});
			var number = widths.length;
				remaider  = ((100-total) % l) || 0,
				value = (100-total-remaider)/l;
			for(var i = 0; i<number; i++){
				if(widths[i] == undefined)
					widths[i] = value; 
			} 
			widths[number-1] = widths[number-1] + remaider;
			return widths;
		}
	}
		
	globel.WidgetLayout = WidgetLayout;
})(window);

/*
 * file from "UI\portal2\process\portal\components\accordion\accordion.js"
 */

(function(global){
	function Accordion(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	}
	
	Accordion.prototype = {
		init: function(){
			var me = this;
			var content = this.el.children();
			$(content).hide();
			// this.el.empty();
			this.el.addClass('accordion');

			this.listEl = $('<dl></dl>');
			this.el.append(this.listEl);
			$.each(this.pages, function(i, page){
				page.el = $('<dt><a class="title" href="#">' + page.title + '</a></dt>');
				page.ddEl = $('<dd></dd>');
				page.ddEl.append($('#' + page.id).show());
				page.titleEl = $('.title', page.el);
				page.barEl = $('span', page.el);
				if(me.disslide){
					$('.title', page.el).addClass('disslide');
					page.el.css({display: 'none'});
				} else
					page.titleEl.click(function(){
						me.slidePage(i);
						return false;
					});
				if(!page.enable){
					page.el.css({display: 'none'});
					page.ddEl.css({display: 'none'});
				}
				me.listEl.append(page.el);
				me.listEl.append(page.ddEl);
			});
			
		},
		togglePage: function(index){
			$('>dl >dt:eq(' + index + ')', this.el).toggle();
			$('>dl >dd:eq(' + index + ')', this.el).toggle();
		},
		setPageTitle: function(index, name){
			$('>dl >dt:eq(' + index + ') .title', this.el).html(name);
		},
		slidePage: function(index){
			var page = this.pages[index];
			page.ddEl.slideToggle(1000, function(){
				page.titleEl.toggleClass('on');
				page.barEl.toggle();
			});
		},
		extendPage: function(index){
			var page = this.pages[index];
			if(page.ddEl.is(":hidden"))
				page.ddEl.slideDown(1000, function(){
					page.titleEl.toggleClass('on');
					page.barEl.toggle();
				});
		},
		unextendPage: function(index){
			var page = this.pages[index];
			if(page.ddEl.is(":visible"))
				page.ddEl.slideUp(1000, function(){
					page.titleEl.toggleClass('on');
					page.barEl.toggle();
				});
		},
		extendAll: function(){
			var me = this;
			$.each(this.pages, function(i, page){
				me.extendPage(i);
			});
		},
		unextendAll: function(){
			var me = this;
			$.each(this.pages, function(i, page){
				me.unextendPage(i);
			});
		},
		enable: function(index, value){
			var page = this.pages[index];
			if(page)
				if(value){
					
					page.el.show();
					page.ddEl.show();
				}else{
					page.el.hide();
					page.ddEl.hide();
				}
			
		}
	};
	
	
	global.Accordion = Accordion;
})(window);

/*
 * file from "UI\portal2\process\portal\components\funcframe2\funcFrame2.js"
 */

(function(global){
	
	var FuncFrame2 = function(options){
		$.extend(this, options);
		this.init();	
	};
	
	FuncFrame2.prototype.init = function(){
		var me = this;
		this.cache = {};
		this.el = $('#' + this.id);
		this.el.addClass('funcFrame');
	};
	
	// option需要
	FuncFrame2.prototype.open = function(option,_lay){
		var opened = this.cache[option.id];
		if(!opened){
			// temp
			if(option.opener){
				option.opener = this.getCacheByWindow(option.opener);
			}
			var uiserverName = window.location.pathname.split('/')[1];
			var url = option.url;

			if(/^http.*/.test(url)){
				if(option.params){
					if(url.indexOf('?') != -1)
						url += '&';
					else
						url += '?';
					url += option.params;
				}
				
			}else{
				if(url.indexOf('?') != -1)
					url += '&$log=1';
				else
					url += '?$log=1';
					
				url = '/' + uiserverName + url + '&bsessionid=' + this.bsessionid;
				if(option.process)
					url += '&process=' + option.process;
				if(option.activity)
					url += '&activity=' + option.activity;
				if(option.executor)
					url += '&executor=' + option.executor;
				
				url += '&language=' + justep.Portal.language;
				
				if(option.params)
					url += option.params;
			}
			
			option.frame = $('<iframe frameBorder=0></iframe>');
			this.cache[option.id] = option;
			this.el.append(option.frame);
			option.frame.src(url, function(iframe, duration){
				// layer loding状态加载器
				if(!!_lay){
					layer.close(_lay);
				}
				if(option.onload) option.onload.apply(this);
			});
		}
		this._active(option);
	};

	FuncFrame2.prototype.refresh = function(option){
		var opened = this.cache[option.oldId];
		if(opened){
			delete this.cache[option.oldId];
			var uiserverName = window.location.pathname.split('/')[1];
			var url = option.url;

			if(/^http.*/.test(url)){
				if(option.params){
					if(url.indexOf('?') != -1)
						url += '&';
					else
						url += '?';
					url += option.params;
				}
				
			}else{
				if(url.indexOf('?') != -1)
					url += '&$log=1';
				else
					url += '?$log=1';
					
				url = '/' + uiserverName + url + '&bsessionid=' + this.bsessionid;
				if(option.process)
					url += '&process=' + option.process;
				if(option.activity)
					url += '&activity=' + option.activity;
				if(option.executor)
					url += '&executor=' + option.executor;
				
				url += '&language=' + justep.Portal.language;
				
				if(option.params)
					url += option.params;
			}
			option.frame = opened.frame;
			this.cache[option.id] = option;
			option.frame.src(url, function(iframe, duration){
				if(option.onload) option.onload.apply(this);
			});
		}
		this._active(option);
	};
	
	FuncFrame2.prototype.getIFrame = function(url){
		if(this.cache[url])
			return this.cache[url].frame.get(0);
	};
	
	FuncFrame2.prototype.getCacheByWindow = function(win){
		for(var k in this.cache){
			if(this.cache.hasOwnProperty(k)){
				/*
				 * 存在bug代码 if(this.cache[k].frame.get(0).contentWindow == win)
				 * return this.cache[k];
				 */
				
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
	
	FuncFrame2.prototype.deleteOpenerAsMe = function(closing) {
		for ( var k in this.cache) {
			if (this.cache.hasOwnProperty(k)) {
				var option = this.cache[k];
				if (option.opener == closing) {
					delete option.opener;
				}
			}
		}
	};
	
	// TODO TKJ 关闭前调用frame.contentWindow.onbeforeunload
	FuncFrame2.prototype.beforeClose = function(option,callback){
		var id = option;
		if(id){
			if(typeof id == 'object'){
				id = id.id;
			}
		}else{
			id = this.activeId;
		}
		var	opened = this.cache[id];
		if(!opened) return;
		var win = opened.frame.get(0).contentWindow;
		if(win.__onBeforeClose){
			win.__onBeforeClose.call(win,callback);
		}else{
			callback();
		}
	};
	
	FuncFrame2.prototype.close = function(id){
		if(id){
			if(typeof id == 'object')
				id = id.id;
		}else{
			id = this.activeId;
		}
		var isCurrent = id == this.activeId;
		var	opened = this.cache[id];
		if(!opened) return;
		// 删除opener等于我的cahce的option的opener属性 [bug处理]
		this.deleteOpenerAsMe(opened);
		
		opened.frame.onload = null;
		opened.frame.hide();
		opened.frame.src('about:blank', function(){
			opened.frame.remove();
		});
		delete this.cache[id];
		isCurrent && (this.activeId = null);
		if(this.onclose){
			opened.isCurrent = isCurrent; 
			this.onclose(opened);
		}
	};
	
	// private
	FuncFrame2.prototype._active = function(option){
		for(var k in this.cache){
			if(this.cache.hasOwnProperty(k)){
				this.cache[k].frame.hide();
			}
		}
		this.activeId = option.id;
		$('.title', this.headEl).html(option.label);
		var opened = this.cache[option.id];
		opened.frame.show();
		// 兼容
		if (opened.frame.get(0).contentWindow.tabActive)
			opened.frame.get(0).contentWindow.tabActive();
		
	}
	
	// 刷新父页面
	FuncFrame2.prototype.refreshOpener = function(option){
		var opened = this.cache[option.id];
		console.dir(opened);
		// 根据当前id，获取父页面 然后打开刷新
		this.funcMng.runFunc(opened.opener);
		// this.refresh(opened.opener);
	};
	
	global.FuncFrame2 = FuncFrame2; 
	justep.Portal.FuncFrame2 = FuncFrame2;
	justep.Portal.FuncFrame = FuncFrame2;
})(window);

/*
 * file from "UI\portal2\process\portal\components\agentlist\agentlist.js"
 */

(function(global){
	
	function AgentList(options){
		$.extend(this, options);
		this.init();
	}
	
	AgentList.prototype = {
		init: function(){
			var me = this;
			this.el = $('#' + this.id);
			this.el.addClass('agentButton');
			if(this.mng.getAgentCount() > 0){
				this.el.append("<div class='agentList'/>");
				var agentList = this.el.children(".agentList");
				this.mng.eachAgent(function(agent){
					agentEl = $('<a href="#" class="grey-button pcb"><span>' + agent.name + '</span></a>').click(function(){
						me.mng.openAgentPage(agent.id);
						return false;
					});
					agentList.append(agentEl);
				});
			} else {
				this.el.parent().hide();
			}
			this.el.mouseenter(function(){agentList.show();});
			this.el.parent().mouseleave(function(){agentList.hide();});
		}
	};
	
	global.AgentList = AgentList; 
})(window);
/*
 * file from "UI\portal2\process\portal\components\dialog\dialog.js"
 */

(function(global){
	/*
	 * options: id title
	 */
	
	var Dialog = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};
	
	Dialog.prototype.init = function(){
		var me = this;
		this.el.addClass("dialog");
		this.width = parseInt(this.width) || 560; 
		this.height = parseInt(this.height) || 420; 
		this.el.css({
			width: this.width+'px',
			height: this.height+'px',
			margin: (-this.width/2+'px') + " 0 0 " + (-this.height/2 + 'px')
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
		
		$('.dialog-header .close', this.el).click(function(){
			me.close();
			return false;
		});
		
	};
	
	Dialog.prototype.show = function(){
		this.backdrop.show();
		this.el.show();
		this.resize();
	};
	
	Dialog.prototype.close = function(){
		this.el.hide();
		this.backdrop.hide();
	};
	
	Dialog.prototype.refresh = function(options){
		$.extend(this, options);
		if(options.title)
			$('.dialog-header h3', this.el).html(options.title);
		if(options.url)
			$('.dialog-body iframe', this.el).src(options.url);
		
		if(options.width || options.height){
			var width = parseInt(options.width || this.width),
				height = parseInt(options.height || this.height);
			this.el.css({
				width: width+'px',
				height: height+'px',
				margin: (-width/2+'px') + " 0 0 " + (-height/2 + 'px')
			});
		}
		
	};
	
	Dialog.prototype.resize = function(){
		var h = this.el.height(),
			hh = $('.dialog-header', this.el).outerHeight(), 
			hf = $('.dialog-footer', this.el).outerHeight();
		$('.dialog-body', this.el).height(h - hh - hf);  
	};
	
	global.Dialog = Dialog;
	
})(window);

/*
 * file from "UI\portal2\process\portal\components\reminder\reminder.js"
 */

(function(globe){
	
	var Reminder = function(options){
		$.extend(this, options);
		this.el = $("#" + this.id);
		this.init();
	};
	
	Reminder.prototype.init = function(){
		this.el.addClass("reminder");
		this.interval = this.interval || 30000;
		this.url = this.url || "/SA/task/remind/remindNewCount2.j";
		var me = this;

		setInterval(function(){
			me.refresh();
		}, this.interval);
		
		this.el.append("<a href='#'></a>").click(function(){
			return me.click();
		});
		
	};
	
	Reminder.prototype.refresh = function(){
		var result = justep.Request.sendHttpRequest(encodeURI(this.url));
		result = justep.Request.responseParseJSON(result);
		if(result.flag = (result.flag == "true")){
			$('a', this.el).html(result.text);
		}
		
		this.current = result;
		this.reloaded = false;
	};
	
	Reminder.prototype.click = function(){
		if(!this.reloaded){
			var params = this.current.parameters;
			if(this.current && this.current.flag){
				if(!this.dialog){
					this.initDialog();
				}
			}
			
			this.dialog.refresh({
				title: params.title,
				height: params.height,
				width: params.width,
				url: (function(){
					var url = params.url,
						uiserver = window.location.pathname.split('/')[1];
					url = '/' + uiserver + url;
					url += url.indexOf('?')==-1? '?' : '&';
					url += 'bsessionid=' + justep.Portal.controllers.funcManager.bsessionid;
					return url;
				})()
			});
			
			this.reloaded = true;
		}	
		
		this.dialog.show();

		return false;
	};
	
	Reminder.prototype.initDialog = function(){
		var id =  this.id + '-dialog';
		$('body').append("<div id='" + id + "'></div>");
		this.dialog = new Dialog({
			id: id,
			title: '消息提醒'
		});
	};
	
	globe.Reminder = Reminder;
})(window);
/*
 * file from "UI\portal2\process\portal\components\scrollbar\scrollbar.js"
 */

(function(global){
	
	
	var ScrollBar = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
		if(this.oncreate)
			this.oncreate.call(this); 
	};
	 
	ScrollBar.prototype = {
		init: function(){
			var me = this,
				items = this.items || [];

			this.items = new Collection();
			this.items.getKey = function(obj){
				return obj.id;
			};
			this.items.addAll(items);
			this.el.addClass('scrollbar');
			if(this.baseClass){
				this.el.addClass(this.baseClass);
			}
			this.el.empty();
			// this.el.append('<a class="prev icon icon-system-left-open"
			// href="#"></a>');
			// this.el.append('<a class="next icon icon-system-right-open"
			// href="#"></a>');
			this.el.append('<div class="wrap clearfix">'+
					       '<ul class="fixed"></ul>'+
					       '<div class="other"><ul></ul></div>'+
					       '<a class="prev icon icon-system-left-open" href="#"></a>'+
					       '<a class="next icon icon-system-right-open" href="#"></a>'+
// '<div class="nav-search">'+
// '<input id="nav-search-input" class="nav-search-input" placeholder="Search
// ..." type="text"/>'+
// '<i class="iconfont nav-search-icon">&#xe05b;</i>'+
// '</div>'+
					       '</div>');
			this.fixedULEl = $('.fixed', this.el);
			this.items.each(function(item){
				if(item.fixed)
					me.doAdd(item);
			});
			// console.dir(this.funcMng.getLeafNode());
			$(".nav-search input").focus();
			// objects为json数据源对象
	        $(".nav-search input").autocomplete(me.funcMng.getLeafNode(), {
	        	width:171,
	            minChars: 0, // 表示在自动完成激活之前填入的最小字符
	            max: 5, // 表示列表里的条目数
	            autoFill: true, // 表示自动填充
	            mustMatch: false, // 表示必须匹配条目,文本框里输入的内容,必须是data参数里的数据,如果不匹配,文本框就被清空
	            matchContains: true, // 表示包含匹配,相当于模糊匹配
	            scrollHeight: 200, // 表示列表显示高度,默认高度为180
	            formatItem: function (row) {
	                return row.label;
	            },
	            formatMatch: function (row) {
	                return row.label;
	            },
	            formatResult: function (row) {
	                return row.label;
	            }
	        }).result(function( event, data, formatted) {
	        	me.funcMng.runFunc(data.value);
	        });

			// $('.wrap .other', this.el).css({marginLeft:
			// this.fixedULEl.width()+12});

			this.ulEl = $('.wrap .other ul', this.el);
			this.ulEl.disableSelection();

			this.items.each(function(item){
				if(!item.fixed)
					me.doAdd(item);
			});

			var cfd = this.ulEl.carouFredSel({
				circular: false,
				auto: false,
				width: 948,
				align: 'left',
				padding: [0, 5, 0, 0],
				prev: $('.prev', this.el),
				next: $('.next', this.el),
				mousewheel: true,
				swipe: {
					onMouse: true,
					onTouch: true
				}
			});
			
			this.inited = true;
		},
		close: function(){
			$(this.el).slideUp(600);
			if(this.onclose){
				this.onclose.call(this);
			}
		},
		open: function(){
			$(this.el).slideDown(600);
		},
		refresh: function(option){
			if(option){
				var old = this.items.get(option.oldId);
				this.items.removeAtKey(option.oldId);
				this.items.add(option);
				this.doRefresh(option, old);
			}
		},
		doRefresh: function(btn, old){
			if(old){
				old.el.remove();
				old.el = null;
			}
			this.add(btn);
		},
		add: function(option){
			if(option){
				this.items.add(option);
				this.doAdd(option);
			}
		},
		// private
		doAdd: function(btn){
			var me = this;
			btn.el = $('<li funcId="' + btn.id + '"><a>' + btn.label + '</a></li>');
			if(!btn.fixed && !this.canNotDelete) btn.el.append('<span><a class="delete"><i class="iconfont del">&#xe605;</i></a></span>');
			if(justep.Browser.IE7)
				btn.el.css({display: 'inline'});
			else
				btn.el.css({display: 'inline-block'});
				
			btn.deleteEl = $('.delete', btn.el).click(function(){
				var _$remove = function(){
					me.remove(btn);
					if(me.ondelete){
						me.ondelete.call(me, btn);
					}
					// butone zhengff 2015329
					if(btn.el.hasClass("on")){
						var lastEl = btn.el.siblings("li:last");
						if(!lastEl.size()){
							// 首页
							lastEl = $('.wrap .fixed').children("li");
						}
						lastEl.children("a").trigger("click");
					}
				};
				
				// TODO TKJ 关闭前判断
				if(me.onbeforeclose){
					var option = {id:btn.id};
					me.onbeforeclose.call(me,option,_$remove);
				}else{
					_$remove();
				}
			});
			$('>a', btn.el).click(function(){
				if(me.onclick)
					me.onclick(btn);
			});
			if(btn.fixed){
				this.fixedULEl.append(btn.el);
			}else {
				if(this.inited)
					this.ulEl.trigger("insertItem", [btn.el]);
				else
					this.ulEl.append(btn.el);
				// this.ulEl.trigger("nextPage");
			}
			
			if(this.onadd){
				this.onadd.call(this, btn);
			}
		},
		remove: function(btn){
			var me = this;
			btn = this.items.removeAtKey(btn.id);
			if(btn){
				btn.el.fadeOut(600, function(){
					me.ulEl.trigger("removeItem", [btn.el]);
					btn.el = null;
				});
			}
		}
	};

	global.ScrollBar = ScrollBar;
})(window);

// 动态加载js css
;(function(global){
	
	var Use = {
			getBasePath : function(){
				var js = document.scripts, jsPath = js[js.length - 1].src;
			    return jsPath.substring(0, jsPath.lastIndexOf("/") - 9);
			}(),
			/**
			 * 路径地址
			 * 
			 * @param {[type]}
			 *            name [description]
			 * @return {[type]} [description]
			 */
			path: function(fileName) {
				return fileName;
			},
			/**
			 * 加载js文件
			 * 
			 * @return {[type]} [description]
			 */
			loadJS: function(jsName , callback) {
				var jsPath,
				self = this;
				// 加载js
				jsPath = this.path(jsName);
				this.request(jsPath, function() {
					callback();
				});
			},
			/**
			 * 加载css文件
			 * 
			 * @return {[type]} [description]
			 */
			loadCSS: function(cssName , callback) {
				var cssPath,
				self = this;
				// 加载css
				cssPath = this.path(cssName);
				this.request(cssPath, function() {
					callback();
				});
			},
			request: function(url, callback, charset) {
				var IS_CSS_RE = /\.css(?:\?|$)/i,
					isCSS = IS_CSS_RE.test(url),
					node = document.createElement(isCSS ? "link" : "script");
				
				if (charset) {
					var cs = isFunction(charset) ? charset(url) : charset
					if (cs) {
						node.charset = cs;
					}
				}

				this.addOnload(node, callback, isCSS, url);

				if (isCSS) {
					node.rel = "stylesheet";
					node.href = url;
					node.id = "skin";
				} else {
					node.async = true;
					node.src = url;
				}

				// For some cache cases in IE 6-8, the script executes
				// IMMEDIATELY after
				// the end of the insert execution, so use
				// `currentlyAddingScript` to
				// hold current node, for deriving url in `define` call
				// currentlyAddingScript = node
				var head = document.getElementsByTagName("head")[0] || document.documentElement;
				var baseElement = head.getElementsByTagName("base")[0];
				// ref: #185 & http://dev.jquery.com/ticket/2709
				baseElement ?
					head.insertBefore(node, baseElement) :
					head.appendChild(node);

				// currentlyAddingScript = null
			},
			addOnload: function(node, callback, isCSS, url) {
				var supportOnload = "onload" in node,
					that = this;
				var isOldWebKit = /webkit/i.test(navigator.userAgent);
				// for Old WebKit and Old Firefox
				if (isCSS && !node.attachEvent) {
					setTimeout(function() {
						that.pollCss(node, callback)
					}, 1); // Begin after node insertion
					return
				}

				if (supportOnload) {
					node.onload = onload;
					node.onerror = function() {
						onload();
					};
				} else {
					node.onreadystatechange = function() {
						if (/loaded|complete/.test(node.readyState)) {
							onload();
						};
					}
				}

				function onload() {
					// Ensure only run once and handle memory leak in IE
					node.onload = node.onerror = node.onreadystatechange = null

					// Remove the script to reduce memory leak
					if (!isCSS) {
						var head = document.getElementsByTagName("head")[0] || document.documentElement;
						head.removeChild(node);
					}

					// Dereference the node
					node = null;
					callback();
				}
			},
			pollCss: function(node, callback) {
				var sheet = node.sheet,
					isLoaded,
					that = this;
				var isOldWebKit = /webkit/i.test(navigator.userAgent);
				// for WebKit < 536
				if (isOldWebKit) {
					if (sheet) {
						isLoaded = true;
					}
				}
				// for Firefox < 9.0
				else if (sheet) {
					try {
						if (sheet.cssRules) {
							isLoaded = true;
						}
					} catch (ex) {
						// The value of `ex.name` is changed from
						// "NS_ERROR_DOM_SECURITY_ERR"
						// to "SecurityError" since Firefox 13.0. But Firefox is
						// less than 9.0
						// in here, So it is ok to just rely on
						// "NS_ERROR_DOM_SECURITY_ERR"
						if (ex.name === "NS_ERROR_DOM_SECURITY_ERR") {
							isLoaded = true;
						}
					}
				}

				setTimeout(function() {
					if (isLoaded) {
						// Place callback here to give time for style rendering
						callback();
					} else {
						that.pollCss(node, callback);
					}
				}, 20)
			}
	};
	
	  global.Use = Use;
}(window));
/*
 * 主题切换代码
 */
(function(global){
	var Module = function(options){
		$.extend(this, options);
		this.el = $('#' + (this.id || "skin"));
		this.SELECTOR = '[data-action]';
		this._actionList = null;
		this.component = null;
	};
	Module.skin = "default";
	Module.prototype = {
			genKey :function(options){
				var k = {jpolite_key_req_version: "0.1"};
				if (options.bean) k.jpolite_key_req_bean = options.bean.replace(/\/|\\/g, '.').replace(/^\.+|\.+$/g, "");
				return k;
			},
			ajax: function(options){
				options = options || {};
				var serverName = window.location.pathname.split('/')[1];
				var o = {};
				$.extend(o, options, {
					async: options.async || false,
					type: options.type || 'post',
					dataType: options.dataType || 'json',
					url: "/"+serverName +'/portal/controller/' + $.trim(options.action || 'system/Error').replace(/\.|\\/g, '/').replace(/^\/+|\/+$/g, ""),
					data:$.extend(options.data, this.genKey(options)),
					success:function(data, textStatus){
						return options.success?options.success(data, textStatus):null;
					}
				});
				return $.ajax(o);
			},
			getBasePath:function(){
			    var js = document.scripts, jsPath = js[js.length - 1].src;
			    return jsPath.substring(0, jsPath.lastIndexOf("/") - 9);
			}(),
			_convertURL:function(name){
				return this.getBasePath + "/butone/themes/" + name + "/scheme_" + name + ".css";
			},
			_loadCSS:function(name){
				$("#skin").attr('href',this._convertURL(name));
			},
			_createCSS:function(name,callback){
				// 动态创建css文件，探测css预加载完成，后回调处理
				global.Use.loadCSS(this._convertURL(name),callback);
			},
			_getSkinCookie:function(){
				return $.cookie("butone-skin") || "default";
			},
			_setSkinCookie:function(theme){
				$.cookie("butone-skin", theme || "default", {expires:7,path:'/'});
			},
			loadCss:function(name,isRe,callback){
				!!isRe ? this._loadCSS(name):this._createCSS(name,callback);
			},
			send: function(action, data, callback, async, bean){
				return this.ajax({action:action,data:data,success:callback,bean:bean,async:async});
			},
			loadTheme: function(callback) {
				return this.send('system/Layout/loadTheme',{executor:""},callback);
			},
			saveTheme: function(theme, callback) {
				return this.send('system/Layout/saveTheme',{theme:theme||""},callback,true);
			},
			removeTheme: function(callback) {
				return this.send('system/Layout/removeTheme',{},callback);
			},
			init:function(callback){
				var _skin = this._getSkinCookie();
				this.loadCss(_skin , false , callback);
				Module.skin = _skin;
				this.component = callback;
			},
			run:function(options){
				var barTitle = '<div class="mark">' + options.title_zh +'</div>'+
		                       '<div class="en">' + options.title_en +'</div>';
				$(".logo",".head").append(barTitle);
				
				if(!options.title_en){
					$(".logo",".head").addClass("sign");
				}
				
				var navSerchStr = !global._config.isSearch ?"" : '<div class="nav-search">'+
	             '<input id="nav-search-input" class="nav-search-input" placeholder="请输入内容" type="text"/>'+
	             '<i class="iconfont nav-search-icon">&#xe05b;</i>'+
	              '</div>';
				var barTools = '<div>'+navSerchStr+
							'<div class="tools-nav-user">'+
								'<div class="tools-user-icon"><i class="iconfont iconfont-tools iconfont-tools-user">&#xe686;</i></div>'+
									'<a data-toggle="myIcon" class="myIcon user">'+
										 '<span class="name" ></span>'+
									'</a>'+
								'</div>'+
							'<div class="tools-nav-other">'+
							    '<ul id="tools-nav">'+
							    '<li class="rightNav tools-nav-pad">'+
									'<a id="agents" data-toggle="myIcon" class="myIcon" title="代理">'+
										'<i class="iconfont iconfont-tools iconfont-tools-other">&#xe001;</i>'+
									'</a>'+
								'</li>'+
								'<li class="rightNav tools-nav-pad">'+
									'<a id="idiom-btn" data-toggle="myIcon" class="myIcon" title="惯用语">'+
										'<i class="iconfont iconfont-tools iconfont-tools-other">&#xe005;</i>'+
									'</a>'+
								'</li>'+
								'<li class="rightNav tools-nav-pad">'+
									'<a id="setting-btn" data-toggle="myIcon" class="myIcon">'+
										'<i class="iconfont iconfont-tools iconfont-tools-other">&#xe018;</i>'+
									'</a>'+
								'</li>'+
								'<li class="rightNav tools-nav-pad">'+
									'<a id="logout" data-toggle="myIcon" class="myIcon" href="###">'+
										'<i class="iconfont iconfont-tools iconfont-tools-other">&#xe059;</i>'+
									'</a>'+
								'</li>'+
								'</ul>'+
							'</div>'+
				        '</div>';
				$(".bar",".head").append(barTools);
			},
			reloadSkin:function(theme){
				this._setSkinCookie(theme);
				this.loadCss(this._getSkinCookie(),true);
			},
			add :function(actionSet){
				this._actionList = actionSet;
				return this;
			},
			getActionList:function(__){
				if(__ === undefined) return this._actionList.name;
				return this._actionList[__];
			},
			_formatActionName:function(){
				return s ? $.trim(String(s).replace(/^[#!\s]+/, '')) : '';
			},
			_getActionName:function($elem){
				return $elem.data('action') || $.trim($elem.attr('data-action'));
			},
			_handle:function(actionName, context){
				// 获取列表的集合，是否存在
				var isFName = $.inArray(actionName,this._actionList.name);
				var fn = this._actionList["handle"];
				if(isFName === -1) return;
				if (fn && $.isFunction(fn)) {
					return fn.call(context || window);
				}
			},
			rendDom:function(){
				var _items = [];
				var __uArray = this.getActionList();
				var currentSelected = "";
				var currentTheme = this._getSkinCookie();
				
				for(var index =0,maxLength = __uArray.length;index < maxLength;index++){
					
					 currentTheme === __uArray[index] ? currentSelected = "selected" : currentSelected = "";
					 
					_items.push(
							   '<div class="skin '+currentSelected+'">'+
							       '<a data-action="'+__uArray[index]+'" href="###"  class="'+__uArray[index]+'"></a>'+
							   '</div>'
							   );
				}
				// rend dom
				this.ULEL.append(_items.join(""));
			},
			createSkin:function(options,callback){
				var me = this;
				this.ULEL = $("#" + options.id);
				
				this.add({
					name   : options.skin || [],
					handle : function(ev){
						var theme = me._getActionName($(this));
						// 选中状态
						me.ULEL.children("div.skin").removeClass("selected");
						$(this).parent("div.skin").addClass("selected");
						Module.skin = theme;
						callback();
						me.reloadSkin(theme);
					}
				}).rendDom();
				
				
				$(this.SELECTOR , this.ULEL).live("click",function(ev){
					ev.preventDefault();
					var $elem = $(this);
					var actionName = me._getActionName($elem);
					me._handle(actionName, this);
				});
			}
	};
	global.Module = Module;
})(window);