var mainActivity = {};

mainActivity.modelModelConstruct = function(event) {
	var me = this;
	require([ "jquery" ], function($) {
		var promise = butone.Context.getBindModelPromise();
		promise && promise.then(me._initBindModel);
	});
};

mainActivity._initBindModel = function() {
	var Composition = butone.Composition, $2 = require("jquery");
	// 计算相对位置
	function getOffsetPosition(ele, container) {
		var ret = {
			left : 0,
			top : 0
		};
		var p = ele;
		while (p) {
			ret.left += p.offsetLeft;
			ret.top += p.offsetTop;
			p = p.offsetParent;
			if (p == container)
				break;
		}
		return ret;
	}

	function parseProcessActivityFormUrl(url) {
		var process = url.substring(3, url.lastIndexOf("/"));
		return {
			process : process + "/"
					+ process.substring(process.lastIndexOf("/") + 1)
					+ "Process",
			activity : url
					.substring(url.lastIndexOf("/") + 1, url.indexOf("."))
		};
	}

	function sendBizRecMessage(bizRecId, title, url) {
		var actionParam = new justep.Request.ActionParam();
		actionParam.setString("bizRecId", bizRecId);
		actionParam.setString("title", !!title ? title : "");
		actionParam.setString("url", !!url ? url : "");
		var options = {};
		options.process = "/base/system/messageCenter/messageCenter";
		options.activity = "mainActivity";
		options.action = "sendBizRecMQTTMessageAction";
		options.parameters = actionParam;
		options.directExecute = true;
		options.dataType = "json";
		var response = justep.Request.sendBizRequest2(options);
		if (!justep.Request.isBizSuccess(response, "json")) {
			var message = null;
			if (justep.Request.isJson("json")) {
				var result = justep.Request.responseParseJSON(response);
				message = result.message;
			} else {
				var responseXML = response.responseXML;
				var resultNode = justep.XML.eval(responseXML, "/root/message",
						"single");
				message = justep.XML.getNodeText(resultNode);
			}
			butone.Util.hint(message);
		}
	}

	var model = butone.Context.getBindModel(), $gzPop = $2("#gzPop"), $zhuXianTable = $2("#zhuXianTable");

	model.registeData("myZhuXian");
	model.registeData("huoDongOfZX");

	model.myZhuXian.__data.attachEvent("onIndexChanged", function(event) {
		model.setSelection(null, event.rowID);
	});
	model.myZhuXian.__data.attachEvent("onAfterRefresh", function(event) {
		if (event.source.getCount() > 0)
			setTimeout(function() {
				model.setSelection(null, event.source.getID());
			}, 1);
	});
	var modelExtend = {
		// 容器ID,用于绑定html的style
		contentId : butone.Bind.observable("containerList"),
		includeYueJian : butone.Bind.observable(false),
		// 主线类别,用于绑定header信息
		listTypeName : butone.Bind.observable("我的主线"),

		// 设置列表类别，查询主线。
		setListType : function($object, event) {
			var $target = $2(event.currentTarget || event.srcElement.parentNode), listType = $target
					.attr("title");
			this.showList();
			var oldListType = this.listTypeName.get();
			this.listTypeName.set(listType);
			$target.parent().siblings().children("a").removeClass("active");
			$target.addClass("active");
			var filter2 = justep.xbl("gridFilter2");
			if (listType == "回收站") {
				filter2.autoRefresh = false;
				this._oldSmartFilterValue = filter2.getInnerData().getValue(
						'value');
				filter2.clearFilter();
				this.myZhuXian.__data.queryAction = "queryMyDeletedZhuXianAction";
				this.myZhuXian.refreshData();
			} else if (listType == "我的主线") {
				if (oldListType == "回收站") {
					filter2.autoRefresh = false;
					filter2.getInnerData().setValue('value',
							this._oldSmartFilterValue);
				}
				this.myZhuXian.__data.queryAction = "queryMyAllZhuXianAction";
				this.myZhuXian.refreshData();
				filter2.autoRefresh = true;

			} else if (listType == "特别关注") {
				if (oldListType == "回收站") {
					filter2.autoRefresh = false;
					filter2.getInnerData().setValue('value',
							this._oldSmartFilterValue);
				}
				this.myZhuXian.__data.queryAction = "queryMyGuanZhuZhuXianAction";
				this.myZhuXian.refreshData();
				filter2.autoRefresh = true;
			}

		},

		// 获得主线的标题HTML
		getZhuXianTitleHTML : function(type, title) {
			return "[" + (type.get() ? type.get() : "无") + "]&nbsp;&nbsp;"
					+ "<span class='darkblue'>" + title.get() + "<span/>";
		},

		// 显示详情
		showDetial : function(event) {
			this.contentId.set("containerDetail");
			$2("#listPage").hide();
			$2("#containerList").hide();
			$2("#containerDetail").show();
			this.setSelection(event);
		},

		// 显示列表
		showList : function() {
			this.contentId.set("containerList");
			$2("#listPage").show();
			$2("#containerList").show();
			$2("#containerDetail").hide();
		},

		// 时间转换
		transformDatetime : function(ref, date) {
			if (!ref)
				return "";
			var ret = xforms.I8N.parse(ref.get(), xforms.I8N
					.get(date ? "format.date" : "format.datetime"));
			ret = xforms.I8N.format(ret, date ? "yyyy-MM-dd"
					: "yyyy-MM-dd hh:mm:ss");
			if (ret.substring(11) == "00:00:00") {
				ret = ret.substring(0, 10);
			}
			return ret;
		},

		// 显示关注菜单
		showPopGuanZhu : function(event, direction) {
			var row = butone.Bind.contextFor(event.target || event.srcElement).$object, bLeft = direction == "left";
			if (row == model) {
				row = model.myZhuXian.getCurrentRow();
			}
			var $menu = $gzPop.children(".popover"), $menuContent = $menu
					.children(".popover-content:eq(0)");
			if (bLeft) {
				$menu.removeClass("right").addClass("left");
			} else {
				$menu.removeClass("left").addClass("right");
			}

			var pos = getOffsetPosition(event.target || event.srcElement, $menu
					.parent()[0]);
			$gzPop.data("row", row).show();
			pos.left += bLeft ? -$menuContent.width() - 40 : 20;
			pos.top += -$menuContent.height() / 2;
			$menu.css(pos);
			event.cancelBubble = true;
			if (event.stopPropagation)
				event.stopPropagation();
			$2('body').on("keydown", function(event) {
				if (event.keyCode == 27) {// esc
					$2('body').off("keydown", arguments.callee);
					model.hidePopGuanZhu();
				}
			});
		},

		// 隐藏关注菜单
		hidePopGuanZhu : function() {
			$gzPop.hide();
			$gzPop.children(".x-popMenu-content").css("top", -1000);
		},

		// 设置关注级别
		setGuanZhu : function(event) {
			this.hidePopGuanZhu();
			var row = $gzPop.data("row");
			var levelId = $2(event.target || event.srcElement).attr("level");
			mainActivity.callRequestSetGuanZhu(row.rowid, levelId);
			row.val("fLevelId", levelId);
		},

		// 获得关注级别的图标
		getGuanZhuIcon : function(levelId) {
			return "icon2-gz" + (levelId ? levelId : "0");
		},

		// 选中主线
		setSelection : function(event, rowid) {
			var tr, me = this;
			if (event) {
				tr = $2(event.currentTarget || event.srcElement);
				if (tr.get(0).nodeName.toLowerCase() != "tr")
					tr = tr.parents("tr:eq(0)");
			} else if (rowid) {
				tr = $2("tr[rowid='" + rowid + "']:eq(0)", $zhuXianTable);
			}
			if (tr && tr.get(0)) {
				tr.addClass("currentzhuxian");
				if (me._lastSel) {
					tr.siblings("[rowid='" + this._lastSel + "']:eq(0)")
							.removeClass("currentzhuxian");
				}
				me._lastSel = tr.attr("rowid");
			}

			setTimeout(function() {
				me.includeYueJian.set(me.huoDongOfZX.locate([ '阅件' ],
						[ 'fItemType' ], true).length > 0);
			}, 1);
		},

		// 浏览活动事项
		viewGongZuoItem : function(event, row) {
			var url = row.val("fItemViewUrl"), rowid = row.val("fActivityItem"), itemType = row
					.val("fItemType");
			if (!url) {
				butone.Util.hint("无详情页面");
				return;
			}
			var option = parseProcessActivityFormUrl(url);
			option.url = url + (url.indexOf("?") >= 0 ? "&" : "?") + "rowid="
					+ rowid;
			option.title = row.val("fItemName") + " -- "
					+ row.val("fActivityTitle");
			if (itemType == "办件") {
				option.data = {
					bizRecId : rowid
				};
			}
			justep.xbl("wrViewHuoDong").open2(option);
		},

		// 设置主线状态
		setStatusToFinish : function(event, row) {
			var newStatus = row.val('fStatus') == '处理中' ? '已完成' : '处理中';
			new justep.System.showMessage().open({
				msg : "是否设置为" + newStatus + "？",
				title : '提示信息',
				type : 2,// 显示是否按钮
				callback : function(event) {
					if (event.status == 'yes') {
						row.val('fStatus', newStatus);
						row.data.saveData();
						row.data.refreshData();
					}

				}
			});
		},

		// 编辑主线内容
		editZhuXianContext : function(event, row) {
			var option = {
				title : "编辑",
				data : {
					rowid : row.getID()
				}
			};
			justep.xbl("wdZhuXian").open2(option);
		},

		// 发起一个活动
		newCustomHuoDong : function(event, row) {
			alert("功能开发中....启动一个通知、会议、或者一个办公业务");
		},

		// 移动到回收站
		moveToRecycle : function(event, row) {
			new justep.System.showMessage().open({
				msg : "是否移动到回收站？",
				title : '提示信息',
				type : 2,// 显示是否按钮
				callback : function(event) {
					if (event.status == 'yes') {
						mainActivity.callRequestSetGuanZhu(row.rowid, '');
						row.val('fStatus', '已删除');
						row.data.saveData();
						row.data.refreshData();
					}

				}
			});

		},

		// 查看阅件意见
		viewYueJianYiJian : function(event, row) {
			var url = "/UI/common/gzzx/process/gzzx/yueJianCenter.w";
			var option = parseProcessActivityFormUrl(url);
			option.url = url;
			option.title = "阅件";
			justep.xbl("wrViewHuoDong").open2(option);
		},

		// 办件督办
		urgeHuoDong : function(event, row) {

		},

		// 编辑活动目标
		editHuoDongTarget : function(event, row) {
			var option = {
				title : "编辑工作目标",
				data : {
					value : row.val("fActivityTarget"),
					attachment : row.val("fAttachment")
				}
			};
			var dialog = justep.xbl("wdEdit");
			var hR = dialog.attachEvent("onReceive", function(event) {
				row.val("fActivityTarget", event.data.value);
				justep.xbl("huoDongOfZX").saveData();
			});
			var hC = dialog.dialog.attachEvent("onClose", function() {
				dialog.detachEvent(hR);
				dialog.dialog.detachEvent(hC);
			});
			dialog.open2(option);
		},

		// 工作催办
		gongZuoCuiban : function(event, row) {
			var option = {
				data : {
					rowid : row.getID(),
					value : "请抓紧办理"
				}
			};

			var dialog = justep.xbl("wdCuiBan");
			var hR = dialog.attachEvent("onReceive", function(event) {
				var data = justep.xbl("huoDongCB");
				data.newData({
					defaultValues : [ {
						fContent : event.data.value,
						fZhuXian : row.val("fZhuXian"),
						fActivityItem : row.val("fActivityItem")
					} ]
				});
				data.saveData();
				data.remove(data.getID());
				if (event.data.sendMsg) {
					sendBizRecMessage(row.val("fActivityItem"),
							event.data.value);
					butone.Util.hint("催办已发送");
				}
			});
			var hC = dialog.dialog.attachEvent("onClose", function() {
				dialog.detachEvent(hR);
				dialog.dialog.detachEvent(hC);
			});
			dialog.open2(option);
		}
	};

	function checkZhuXianAttachmentAccess(attachment) {
		var b = model.myZhuXian.val("fCreator") == justep.Context
				.getCurrentPersonID();
		attachment.set("access", b ? "duud" : "d");
	}

	butone.Util.apply(model, modelExtend);
	model.componentPromise("attachmentZhuXian").then(function(attachment) {
		checkZhuXianAttachmentAccess(attachment);
		attachment.on("onDataChanged", function(event) {
			checkZhuXianAttachmentAccess(event.source);
		});
	});
	Composition.bindAndShow($2("#rootView").get(0), model);
	// 模拟我的主线click，查询主线数据

	$2("#navZhuXian>li:eq(0)>a").click();
	model.setSelection(null, model.myZhuXian.getCurrentRowID());

};

mainActivity.callRequestSetGuanZhu = function(guid, level) {
	var actionParam = new justep.Request.ActionParam();
	actionParam.setString("guid", guid);
	actionParam.setString("level", level);

	var options = {};
	options.process = justep.Context.getCurrentProcess();
	options.activity = justep.Context.getCurrentActivity();
	options.action = "setGaunZhuAction";
	options.parameters = actionParam;
	options.contentType = "application/json";

	justep.Request.sendBizRequest2(options);
};

mainActivity.modelModelConstructDone = function(event) {
	var data = justep.xbl("myZhuXian");
	data.autoLoad = true, data.getInstance().autoLoad = true;
};

mainActivity.modelXBLLoaded = function(event) {

};

mainActivity.modelLoad = function(event) {
	$("input", "#smartFilter1").attr("placeholder", "主线标题");
	// $("ul>li:last-child>a", "#listPage").css("border-radius", "0");

	var filter1 = justep.xbl("gridFilter1");
	filter1.setAutoRefresh(true);

	var filter2 = justep.xbl("gridFilter2");
	filter2.getInnerData().setValue("value", "处理中"), filter2
			.setAutoRefresh(true);
};

mainActivity.newCustomZhuXianClick = function(event) {
	justep.xbl("wdZhuXian").open();
};

mainActivity.btnSearchClick = function(event) {
	justep.XData.refreshControls();
	justep.xbl("myZhuXian").refreshData();
};

mainActivity.myZhuXianValueChanged = function(event) {
	if (event.column == 'fAttachment') {
		setTimeout(function() {
			event.source.saveData();
		}, 1);
	}
};

mainActivity.wdZhuXianReceive = function(event) {
	justep.xbl("myZhuXian").refreshData();
};
