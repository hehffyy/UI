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
			this.msgEl = $('.message', this.el);
			
			$('.saveBtn', this.el).click(function(){
				me.change();
			});
			$('.cancelBtn', this.el).click(function(){
				me.reset();
			});
			
			$('.pwd', this.el).focus(function(){
				$(this).siblings(".newPwd").text(me.description);
			}).blur(function(){
				$(this).siblings(".newPwd").text("");
			});
			
			$('.pwd2', this.el).focus(function(){
				$(this).siblings(".newPwd").text(me.description);
			}).blur(function(){
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
			if(pwd != pwd2) return '两次密码输入不一致';
			return this.validate && this.validate(pwd);
		},
		description: "6到12个字符，区分大小写。", 
		validate: function(newpwd){
				if(!(/[a-z|A-Z|0-9]{6,12}/.test(newpwd) && newpwd && newpwd.length <= 12))
					return "密码不符合规则";
				if(!/[a-z,A-Z]/.test(newpwd))
					return "密码必须包含英文";
				if(!/[0-9]/.test(newpwd))
					return "密码必须包含数字";}
	};
	
	global.SetPwd = SetPwd;
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
	
	/*event:
	 * run-func
	 * close-func
	 */
	
	function FuncManager(config){
		eventable(this);
		//正在运行的功能
		this.runing = {};
		this.arrLeftNode = [];
		$.extend(this, config);

		//和待办相关
		this.openers = [];
		this.agents = this.agents || [];

		//
		this.init();
		
		//常用功能 可排序
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
	
	//获取叶子节点，zhengff 20150331
	FuncManager.prototype.setLeafNode = function(item){
		var __value = item;
	    this.arrLeftNode.push({
	    	label:__value.label,
	    	value:__value.id
	    });
	    return this;
	};
	
	//获取叶子节点，zhengff 20150331
	FuncManager.prototype.getLeafNode = function(){
	    return this.arrLeftNode;
	};
	
	//遍历功能树, 深度优先 level，zhengff 20150331
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
		//*基于url activity process params 生成id(md5)
		var s = ((item.url||"") + (item.activity||"") + (item.process||"") + (item.params||"")).toLowerCase();
		return hex_md5(s);
	};

	FuncManager.prototype.getItem = function(id){
		return this.indexTable[id];
	};
	
	FuncManager.prototype.getFuncTree = function(){
		return this.data;
	};
	
	//private
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

	//name, url, parm
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
	
	FuncManager.prototype.closeTab = function(id){
		id = id || justep.Portal.getWindowId();
		if(typeof id == 'object')
			id = id.id;
		var item = this.runing[id];
		if(item){
			delete this.runing[id];
			this.callEvent('close-tab',  [this.clone(item)]);
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
		var param = "&activity=index&process=/portal2/process/portal/portalProcess";
		var opener = window.open("index.w?agent="+agentId+'&bsessionid=' + this.bsessionid + param, agentId);
		
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
	var CustomScroll = function(options){
		$.extend(this, options);
		this.el = $('#' + this.id);
		this.init();
	};
	
	//private
	CustomScroll.prototype.init = function(){
		this.createScroll({
			height:'500px',
			alwaysVisible: true
		});
	};
	
	//private
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
	
	//private
	FuncTreeMenu.prototype.init = function(){
		var me = this;
		this.data = this.funcMng.getFuncTree();
		function walkData(data, level, path, cb){
			for(var i=0; i<data.length; i++){
				var item = data[i];
				cb(item, level, path);
				item.childNodes && walkData(item.childNodes, level+1, path + '/' + item.label, cb);
			}
		}
		var me = this;
		this.el.addClass('functreemenu');
		
		//create root column
		this.el.empty();
		this.el.append('<div class="menuWrap"></div>');
		this.rootColumn = this.createColumn(this.data);
		this.rootColumn.addClass("nav");
		// &#xe02c;
		$('.menuWrap', this.el).append('<div class="sidebar-title"><span class="ui-nav-dd"></span><span>功能导航</span></div>');
		$('.menuWrap', this.el).append(this.rootColumn);
		this.rootColumn.accMenu({
	        speed: 500,
		    closedSign: '<a class="ui-nav-draw ui-nav-add"></a>',
			openedSign: '<a class="ui-nav-draw ui-nav-minus"></a>'
		});
		//2016.11.28给被点击的li 的a 加上颜色；
		$('#cv2 .nav li>a').click(function(){
					$('#cv2 .nav li>a').removeClass('a-color-fen');
					$(this).addClass('a-color-fen');		       
				});
		
		$('#showFuncMenu').click(function(){
			if(me.el.is(':visible')){
				$('.sider-title-draw').trigger("click");
			}else{
				$(".sider-title-up").trigger("click");
			}
		});
		
		// 点击隐藏 menu
		$('.sider-title-draw').click(function(){
			var $funcMenu = $("#bs-frame-menu");
			
			me.el.hide();
			$("#scorllHide").hide();
			// 改变宽度
			$funcMenu.removeClass("func-menu-show").addClass("func-menu-hide");
			$funcMenu.children(".left-nav").removeClass("left-nav-show").addClass("left-nav-hide");
			//$("#funHide").show();
			me.resize.call(me);
		});
		
		
		
		// 点击显示 menu
		$(".sider-title-up").click(function(){
			var $funcMenu = $("#bs-frame-menu");
			me.el.show();
			$("#scorllHide").show();
			$funcMenu.removeClass("func-menu-hide").addClass("func-menu-show");
			$funcMenu.children(".left-nav").removeClass("left-nav-hide").addClass("left-nav-show");
			$("#funHide").hide();
			me.resize.call(me);
		});
    
/*
		var cfd = this.rootColumn.carouFredSel({
			circular: false,
			auto: false,
			width: '100%',
			align: 'left',
			height:600,
			padding: [0, 5, 0, 0],
			prev: $('.prev', this.el),
			next: $('.next', this.el)
		});
		$('>li >ul', this.rootColumn).addClass('down');
		$('>li', this.rootColumn).mouseover(function(){
			me.rootColumn.addClass('open');
			$('>ul', this).css({
				top: $(this).offset().top - $('body').scrollTop() + $(this).height(), 
				left: $(this).offset().left - $('body').scrollLeft()
			}).show();
		}).mouseout(function(){
			$('>ul', this).hide();
		});
		
		$('li ul', this.rootColumn).mouseover(function(){
			var p = $(this).parent();
			if(($(window).width() - (p.offset().left + p.width())) < 150){
				$(this).addClass('right');
			}
		});
		*/
		
	};
	FuncTreeMenu.prototype.truncate = function(target, length, truncation){
		length = length || 30;
		truncation = truncation === void(0) ?"..." : truncation;
		return target.length > length ?
			   target.slice(0, length) + truncation : String(target);
	};
	FuncTreeMenu.prototype.levelTruncate = function(str,levelNum){
		 
		var _str = str;
		switch(levelNum){
		    case 0: 
			  _str = this.truncate(str, 8);
			  break;
		    case 1: 
			  _str = this.truncate(str, 8);
			  break;
			case 2: 
			  _str = this.truncate(str, 6);
			  break;
			case 3:
			  _str = this.truncate(str, 6);
			  break;
			default:
			  _str = this.truncate(str, 6);
			  break;
		}
		return _str;
	};
	//private
	FuncTreeMenu.prototype.createColumn = function(data, level){
		var me = this;
		var html = [];
		var print = function(data, isboot){
			html.push('<ul>');
			for(var i in data){
				var item = data[i];
				if(item.url == undefined){
					var mark = "";
					if(item.level == 0){
						var iconUrl =item["cname"];
						if(!iconUrl){
							iconUrl = "nav-icon-default";
						}
						mark = '<div class="navImage"><i class='+ iconUrl + '></i></div>';
			
					}
					//下面是显示生成列表的三行代码
					html.push('<li><a href="#" title="'+item.label+'">'+mark);
					html.push(me.levelTruncate(item.label,item.level));
					html.push('</a>');
				//手风琴~~
				if(item.childNodes && item.childNodes.length > 0)
						print(item.childNodes);
						html.push('</li>');
				}else {
					//下面是显示二级菜单的三行代码
                    html.push('<li funcId="', item.id, '"><a href="#" title="'+item.label+'">');
					html.push(me.levelTruncate(item.label,item.level));
					html.push('</a></li>');
				}	
			}
			html.push('</ul>');
		};
		
		print(data, true);
		
		var rst = $(html.join('')),
		    me = this;
		$('li', rst).click(function(){
			var id = $(this).attr('funcId');
			if(id){
				$(".nav").find("li").removeClass("active");
				$(this).addClass("active");
				me.rootColumn.removeClass('open');
				//$('>li >ul', me.rootColumn).hide();
				me.funcMng.runFunc(id);
			}
			// 选中变色
		});
		return rst;
	};
	
	globel.FuncTreeMenu = FuncTreeMenu; 
	justep.Portal.FuncTreeMenu = FuncTreeMenu;
})(window);

/*
 * file from "UI\portal2\process\portal\components\funcframe2\funcFrame2.js"
 */

;(function(global){
	
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
	
	//option需要
	FuncFrame2.prototype.open = function(option,_lay){
		var opened = this.cache[option.id];
		if(!opened){
			//temp
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
				//	layer.close(_lay);
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
				/* 存在bug代码
				if(this.cache[k].frame.get(0).contentWindow == win)
					return this.cache[k]; 
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
	
	//private
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
		//兼容
		if (opened.frame.get(0).contentWindow.tabActive)
			opened.frame.get(0).contentWindow.tabActive();
		
	}
	
	//刷新父页面
	FuncFrame2.prototype.refreshOpener = function(option){
		var opened = this.cache[option.id];
		console.dir(opened);
		// 根据当前id，获取父页面 然后打开刷新
		this.funcMng.runFunc(opened.opener);
		//this.refresh(opened.opener);
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
			if(this.mng.getAgentCount() > 0){	
				$('#agentmen').show().append('<ul id="agents" class="agentlist js-short cons"></ul>');
				//this.el.show().after('<ul id="agents" class="agentlist js-short cons"></ul>');
				this.mng.eachAgent(function(agent){
					agentEl = $('<li><a href="#" class="cons"><span>' + agent.name + '</span></a></li>').click(function(){
						me.mng.openAgentPage(agent.id);
						return false;
					});
					var $agent = $('#agents').append(agentEl); 
					//me.el.append($agent);
				});
			}else{
				this.el.hide()
			}
		}
	};
	
	global.AgentList = AgentList; 
})(window);
/*
 * file from "UI\portal2\process\portal\components\dialog\dialog.js"
 */

(function(global){
	/*
	 * options:
	 * id
	 * title
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
	var QuickTab = {
			options:{
	                baseCls: "bs-tab",
	                tabWidth: 150,
	                tabHeight: 36
	         },
	         _init: function(options){
	        	$.extend(this, options);
	        	this.element = $(".bs-tab-btns");
	 			this.$tabs = $(".bs-tab-names");
	 			this.$menuItems = $(".bs-tab-menu-items");
	 			//this.$btnTabs = $(".bs-tab-names");
	 			this.$btnTabs = this.$tabs;
	 			this.$homeTab = $(".bs-tab-homepage");
	 			this.$homeContent = $("#bs-content-homepage");
	 			this.$content = $(".bs-tab-content");
	 			this.currentTabWidth = this.options.tabWidth;
	            this.visibleTabCount = 0;
	            this.loadedEntries = [];
	            this._resizeTabs();
	            this._btnEvents();
	         },
	         _getEntries:function(id){
	        	 var _arr = this.loadedEntries;
	        	 for(var index=0;index <_arr.length;index++){
	        		 if(_arr[index] && _arr[index].id == id){
	        			 return _arr[index];
	        		 }
	        	 }
	         },
	         
	         getTabCount : function(){
	        	 return this.$tabs.children().length;
	         },
	         
	         _resizeTabs:function(){
					var paintWidth = tabWidths = this.element.width();
		            this.$tabs.siblings().each(function(){
		            	// 减去所有兄弟的宽度
		            	paintWidth = paintWidth - $(this).width();
		            });

		            this.$tabs.width(paintWidth);
		            
		            var items = this.$tabs.children();
					// 当前定宽下容纳tab个数临界数(例如1590下是11个)
		            var limit = Math.floor(paintWidth / this.options.tabWidth) + 1;
					//默认tab页签的宽度
		            var singleTabWidth = this.options.tabWidth;
					// 当前tabs容器下的个数超过临界数时候，重新计算每个tab的宽度
		            if (items.length >= limit) {
						// 每一个的宽度
		            	singleTabWidth = Math.floor(paintWidth / limit);
		            }
		            if (singleTabWidth !== this.currentTabWidth) {
		                $.each(items,function(index, el) {
		                    $(el).outerWidth(singleTabWidth);
		                    $(".bs-tab-item-label", $(el)).outerWidth(singleTabWidth - 20);
		                    
		                });
		                this.currentTabWidth = singleTabWidth;
		            }
		            this.visibleTabCount = limit;
		            
		            var h = this._getSelectedTab();
		            if (h !== null) {
		                this._doSelectTab(h);
		            }
				},
				_getSelectedTab:function() {
	                var elment = null;
	                $.each(this.$tabs.children(),function(i, el) {
	                    if ($(el).hasClass("select")) {
	                    	elment = $(el);
	                        return false;
	                    }
	                });
	                return elment;
	            },
	            // 根据当前对象，获取当前选中节点的索引位置,相对于tabs容器下
	            _getTabIndex: function(el) {
	            	if (!el) return - 1;
	                return $.inArray(el.get(0), this.$tabs.children());
	            },
	           _getTabByIndex: function(el) {
	                return $(this.$tabs.children().get(el));
	            },
	            _doSelectHomepage:function(){
	            	this.$homeContent.show();
	            	$(".select", this.$btnTabs).removeClass("select");
	            	if (!this.$homeTab.hasClass("select")) {
	            		this.$homeTab.addClass("select");
	            	}
	            	this.$content.hide();
	            	
	            	// 选中首页进行刷新
	            	if($("#homeFrame")[0].contentWindow.tabActive){
	            		$("#homeFrame")[0].contentWindow.tabActive();
	            	}
	            },
	            _doCloseTab: function(el) {
	            	if(!el)
	            		return;
	            	var _self = this;
	            	var removeItem = function(currentIndex,selectIndex,$selectObj){
		                var _select = null;
		                if (currentIndex !== selectIndex) {
		    				// 不是选中元素情况，将选中的元素赋于_select
		                	_select = $selectObj;
		                } else {
		    				// 选中元素处理
		                    if (currentIndex + 1 < _self.loadedEntries.length) {
		                    	_select = _self._getTabByIndex(currentIndex + 1);
		                    } else {
		                    	_select = _self._getTabByIndex(_self.loadedEntries.length - 1);
		                    }
		                }
		               _self._doSelectTab(_select);
	                };
	            	var _remove = function(){
		                var currentIndex = _self._getTabIndex(el);
		                var $selectObj = _self._getSelectedTab();
		                var selectIndex = _self._getTabIndex($selectObj);
		                var tabID = el.find("a").attr("funcid");
		                var option = _self._getEntries(tabID);
		                // 删除tab元素，并刷新tab浮动下拉
		                el.animate({
		                    width: "-=" + _self.currentTabWidth
		                },"fast", function(){
		                	var _cIndex = _self._getTabIndex(el);
		                    el.remove();
		                    _self.loadedEntries.splice(_cIndex, 1);
		                    if (_self.loadedEntries.length === 0) {
		                    	_self._doSelectHomepage()
		                    }
		                    _self._refreshMenu();
		                    removeItem(currentIndex,selectIndex,$selectObj);
		                    // 功能Tab为0时显示功能菜单
		                    if(_self.getTabCount()==0)
		                    	$(".sider-title-up").trigger("click");
		                });
		                if(_self.destroy){
		                	_self.destroy.call(_self, option);
			    		}
		           };
	            	var tabID = el.find("a").attr("funcid");
	                var option = this._getEntries(tabID);
	            	 if(this.onbeforeclose){
			    			this.onbeforeclose.call(this, option,_remove);
			    	 }else{
			    		_remove();
			    	 }
	            },
	            // 页签移动
	            _moveTabByIndex: function(index,beLimit) {
	            	var items = this.$tabs.children();
	            	items.splice(beLimit, 0, items.splice(index, 1)[0]);
	            	this.$tabs.append(items);
	            	this.loadedEntries.splice(beLimit, 0, this.loadedEntries.splice(index, 1)[0]);
	            },
	            _refreshMenu: function() {
	            	//_this.$menu.children(".slimScrollDiv").detach();
	            	var _self = this;
	            	this.$menuItems.empty();
	            	var hiddenTabs = this.loadedEntries.slice(this.visibleTabCount);
		            $.each(hiddenTabs,function(index, item) {
		                 //  e += 30;  浮动窗体显示滚动条使用
		                 //var f = b._addMenuItemFromEntry(el);
		            	if(!item){return;}
		            	var $el = $('<a funcid='+item.id+' class="bs-tab-menu-item nav-btn" style="display: block;" />');
		            	$("<span/>").text(item.label).attr("title", item.label).appendTo($el);
		            	$('<i class="bs-nav-ts bs-nav-close" title="关闭"/>').click(function(e) {
		                    var obj = $(this).closest(".bs-tab-menu-item");
		                    var $elment = _self._findLoadedTabFromEntry(item);
		                    _self._doCloseTab($elment);
		                    e.stopPropagation();
		                }).show().appendTo($el);
		            	
		            	_self.$menuItems.append($el);
		            });
	            },
	            // 选择页签
	            _doSelectTab : function(el){
	            	var index = this._getTabIndex(el);
	            	if (index < 0) return;
	                var beLimit = this.visibleTabCount - 1;
	                if (index > beLimit) {
	                	this._moveTabByIndex(index, beLimit);
	                }
	            	if (!el.hasClass("select")) {
	                    $(".select", this.$btnTabs).removeClass("select");
	                    el.addClass("select");
	                    this.$homeTab.removeClass("select");
	                }
	            	if (this.$content && this.$content.is(":hidden")) {
	            		this.$content.show();
	                }
	            	var item = this._getEntries($(el).find("a").attr("funcid"));
	            	if(this.open){
		    			this.open.call(this, item);
		    		}
	            	this._refreshMenu();
	            },
	            // 对比
	            _compareEntry: function(old, target) {
	                if (!old || !target) {
	                    return false;
	                }
	                if (old === target) {
	                    return true
	                } else {
	                    if (typeof old == "object" && typeof old == "object") {
	                        if (old.id === target.id) {
	                            return true;
	                        } else {
	                            if (!!old.id && old.id === target.id) {
	                                return true;
	                            }
	                        }
	                    }
	                }
	                return false;
	            },
	            // 在页签容器里面进行查询，是否存在当前元素并返回
	            _findLoadedTabFromEntry: function(obj) {
	            	if(!obj)
	            		return null;
	                var _this = this;
	                var el = null;
	                $.each(_this.loadedEntries,function(index, item) {
	                    if (_this._compareEntry(obj, item)) {
	                    	$.each(_this.$tabs.children(),function(i,v){
	                    		var funcid = $(_this.$tabs.children()[i]).find("a").attr("funcid") || "";
	                    		if(funcid == obj.id){
	                    			el = $(v);
	                    			return false;
	                    		}
	                    	});
	                    }
	                    if(!!el)
	                    	return false;
	                });
	                return el;
	            },
	            _addNewTabFromEntry:function(option){
	            	var _self = this;
			    	var $el = $('<li class="bs-tab-item nav-btn"/>').hover(function() {
			    		//$(this).find("i").css("display","inline-block");
			    	},function(){
			    		var $el = $(this).find("i");
			    		if(!$(this).hasClass("select")){
			    			//$el.css("display","none");
			    		}
			    	});
			    	$el.appendTo(this.$tabs);
			    	$el.outerWidth(this.currentTabWidth);
			    	var $innerEl = $('<div class="bs-tab-item-label">').outerWidth(this.currentTabWidth - 20).append(
			    			$("<a funcid='"+option.id+"' href='###'/>").append($("<span/>").text(option.label).attr("title", option.label))).appendTo($el);
			    	
			    	$('<i class="bs-nav-ts bs-nav-close" title="关闭"/>').click(function(e) {
			    		console.dir($(this).closest(".bs-tab-item"));
			    		_self._doCloseTab($(this).closest(".bs-tab-item"));
			            e.stopPropagation();
			        }).appendTo($innerEl.children("a"));
			    	this.loadedEntries.push(option);
			    	this._resizeTabs();
			    	this._doSelectTab($el);
	            },
	            _btnEvents:function(){
	            	var _self = this;
	            	// 页签点击事件
	                this.$btnTabs.click(function(e){
	                	var el = e.target;
	                	var $navBtn = $(el).closest(".nav-btn");
	                	_self._doSelectTab($navBtn);
	                });
	                // 浮动窗体点击
	                this.$menuItems.click(function(e){
	                	var el = e.target;
	                	var $navBtn = $(el).closest(".nav-btn");
	                	// 根据当前元素，去$tabs里面查找
	                	_self._doSelectTab(_self._findLoadedTabFromEntry({"id":$navBtn.attr("funcid")}));
	                	_self._resizeTabs();
	                });
	                // 首页点击
	                this.$homeTab.click(function(e){
	                	_self._doSelectHomepage();
	                });
	                // 浮动页签栏 bs-tab-more
	                $(".bs-tab-more").click(function(e){
	                	$(".bs-tab-float").toggle("fast");
	                });
	                // 关闭-所有/其他
	                $(".bs-tab-menu-options").click(function(e){
	                	var el = e.target;
	                	var $navBtn = $(el).closest(".nav-btn");
	                	var type = $navBtn.attr("data-type");
	                	var $select = _self._getSelectedTab();
                        $.each(_self.$tabs.children(),function(index, _el) {
                            if ($select.context !== _el) {
                            	_self._doCloseTab($(_el));
                            } else if(type == "closeAll"){
                            	setTimeout(function(){
                					$(_el).find("i").click();;
	                			},500);
                            }
                        });
	                	_self._resizeTabs();
	                });
	            }
	};
	global.QuickTab = QuickTab;
})(window);