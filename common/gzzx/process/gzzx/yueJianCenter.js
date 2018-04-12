var yueJianCenter = {};

yueJianCenter.modelLoad = function(event) {
	$("input", "#smartFilter1").attr("placeholder", "来文单位或来文名称");
	// $("ul>li:last-child>a", "#listPage").css("border-radius", "0");
	yueJianCenter.getPermission();
};

// 设置阅件类型信息
yueJianCenter.getPermission = function(){
	var data = justep.xbl("data");
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "getPermissionAction",
		callback : function(result) {
			if (result.state) {
				var ret = result.response;
				switch (ret) {
				case 0:
					data.newData({
						defaultValues : [ {
							status : "",
							name : "全部类型"
						}, {
							status : "网上舆情",
							name : "网上舆情"
						}, {
							status : "公告信息",
							name : "公告信息"
						} ]
					});
					break;
				case 1:
					data.newData({
						defaultValues : [ {
							status : "",
							name : "全部类型"
						}, {
							status : "阅处件",
							name : "阅处件"
						}, {
							status : "普通阅件",
							name : "普通阅件"
						}, {
							status : "网上舆情",
							name : "网上舆情"
						}, {
							status : "公告信息",
							name : "公告信息"
						} ]
					});
					break;
				default:
					data.newData({
						defaultValues : [ {
							status : "",
							name : "全部类型"
						}, {
							status : "阅处件",
							name : "阅处件"
						}, {
							status : "普通阅件",
							name : "普通阅件"
						}, {
							status : "公告信息",
							name : "公告信息"
						} ]
					});
				}
			}
		}
	});
};

yueJianCenter.modelModelConstruct = function(event) {
	var promise = butone.Context.getBindModelPromise();
	promise &&promise.then(yueJianCenter._initBindModel);
};

yueJianCenter._initBindModel = function() {
	var $2 = require("jquery");
	var scrolltop = $2("#scrolltop");
	$2("#containerDetail").scroll(function() {
		model.listScrollTop.set($2(this).scrollTop());
	});

	var Composition = butone.Composition, $2 = require("jquery"), _Str = require("base/lib/bind/string");

	var model = butone.Context.getBindModel();
	model.registeData("huoDong");
	model.registeData("lingDaoPS");
	model.registeData("chuLi");
	model.huoDong.__data.attachEvent("onIndexChanged", function(event) {
		model.lingDaoPS.refreshData();
		// model.setSelection(null, event.rowID);
	});
	model.huoDong.__data.attachEvent("onAfterRefresh", function(event) {
		model.lingDaoPS.refreshData();
		if (event.source.getCount() > 0) {
			// setTimeout(function() {
			// model.setSelection(null, event.source.getID());
			// }, 1);
		}
	});

	var modelExtend = {
		listScrollTop : butone.Bind.observable(0),
		// 容器ID,用于绑定html的style
		contentId : butone.Bind.observable("containerList"),

		// 获得主线的标题HTML
		getZhuXianTitleHTML : function(type, title) {
			return "[" + type.get() + "]&nbsp;&nbsp;"
					+ "<span class='darkblue'>" + title.get() + "<span/>";
		},

		// 显示详情
		showDetial : function(event) {
			this.contentId.set("containerDetail");
			justep.xbl("lingDaoPS").refreshData();
			this.updateStatus(event.bindingContext.$object.rowid);
			this.browseFile(event.bindingContext.$object.val("fZhuXianAttachment"));
		},
		
		browseFile : function(attachment) {
			if (!!attachment && attachment.length > 5) {
				var attachmentJSON = JSON.parse(attachment);
				justep.doc.InnerUtils.browseDocByFileID(attachmentJSON[0].docPath,	attachmentJSON[0].docName, attachmentJSON[0].fileID);
			}
		},

		// 显示列表
		showList : function() {
			this.contentId.set("containerList");
			justep.xbl("huoDong").refreshData();
			// $2("#listPage").show();
			// $2("#containerList").show();
			// $2("#containerDetail").hide();
		},

		// 时间转换
		transformDatetime : function(ref, date) {
			if (!ref)
				return "";
			var ret = xforms.I8N.parse(ref.get(), xforms.I8N
					.get(date ? "format.date" : "format.datetime"));
			ret = xforms.I8N.format(ret, date ? "yyyy-MM-dd"
					: "yyyy-MM-dd hh:mm:ss");
			return ret;
		},
		
		// 次数格式化
		formatCount : function(v) {
			if(!!v)
				return v;
			else
				return 0;
		},
		
		// 获取查看和发表次数
		getViewOrChuliCount : function(){
			return model.formatCount(self.huoDong.getValue("fViewCount",
					self.huoDong.getCurrentRowID()))
					+ "/"
					+ model.formatCount(self.huoDong.getValue("fChuLiCount",
							self.huoDong.getCurrentRowID()));
		},

		// 时间转换
		formatDateTime : function(ref) {
			if (!ref)
				return "";

			var now = new Date(), date = xforms.I8N.parse(ref.get(), xforms.I8N
					.get("format.datetime"));
			var ret = "<font style='color:{0}'>{1}</font>", opt = {};
			var d = justep.Date.between(date, now);
			if (d == 0) {
				// 今天
				opt.color = "#ff0000";
				var h = justep.Date.diff(date, now, 'h');
				if (h >= 1) {
					opt.date = h + "小时前";
				} else {
					var n = justep.Date.diff(date, now, 'n');
					opt.date = n + "分钟前";
				}
			} else if (d == 1) {
				// 昨天
				opt.color = "#0000ff";
				opt.date = "昨天&nbsp;" + xforms.I8N.format(date, "hh:mm");
			} else if (d <= 6) {
				opt.color = "#000";
				opt.date = d + "天前";
			} else {
				opt.color = "#000";
				opt.date = xforms.I8N.format(date, "yyyy-MM-dd");
			}
			
			// 只显示日期 
			opt.color = "#000";
			opt.date = xforms.I8N.format(date, "yyyy-MM-dd");
			return _Str.format(ret, opt.color, opt.date);
		},
		// 发表意见
		publishYiJian : function() {
			var self = this;
			var option = {
				title : "发表意见",
				data : {
					attachment : "[]"
				}
			};
			var dialog = justep.xbl("wdEdit");
			var hR = dialog.attachEvent("onReceive", function(event) {
				var huoDong = justep.xbl("huoDong");
				var chuLi = justep.xbl("chuLi");
				chuLi.newData({
					defaultValues : [ {
						fOrgUnitID : justep.Context.getCurrentPersonID(),
						fOrgUnitName : justep.Context.getCurrentPersonName(),
						fActivityItem : huoDong.getValue("fActivityItem",huoDong.getCurrentID()),
						fContent : event.data.value,
						fFinishTime : justep.System.datetimeString(),
						fAttachment : event.data.attachment
					} ]
				});
				chuLi.saveData();
				model.callIncreaseHuoDongViewOrChuliCount(huoDong.getCurrentID(), false);
				justep.xbl("lingDaoPS").refreshData();
			});
			var hC = dialog.dialog.attachEvent("onClose", function() {
				dialog.detachEvent(hR);
				dialog.dialog.detachEvent(hC);
			});
			dialog.open2(option);
		},
		// 标为已阅
		updateStatus : function(huoDongID){
			var huoDong = justep.xbl("huoDong");
			var chuLi = justep.xbl("chuLi");
			chuLi.newData({
				defaultValues : [ {
					fOrgUnitID : justep.Context.getCurrentPersonID(),
					fOrgUnitName : justep.Context.getCurrentPersonName(),
					fActivityItem : huoDong.getValue("fActivityItem", huoDongID),
					fContent : "已阅",
					fFinishTime : justep.System.datetimeString()
				} ]
			});
			chuLi.saveData();
//			this.callIncreaseHuoDongViewOrChuliCount(huoDongID, true);
			justep.xbl("lingDaoPS").refreshData();
		},
		// 交办事项
		jbsx : function() {
			var huoDong = justep.xbl("huoDong");
			var option = {
				title : "发表意见",
				data : {
					title : huoDong.getValue("fActivityTitle"),
					attachment : huoDong.getValue("fZhuXianAttachment")
				}
			};
			var dialog = justep.xbl("changeDialog");
			var hR = dialog.attachEvent("onReceive", function(event) {
//				justep.xbl("lingDaoPS").refreshData();
			});
			var hC = dialog.dialog.attachEvent("onClose", function() {
				dialog.detachEvent(hR);
				dialog.dialog.detachEvent(hC);
			});
			dialog.open2(option);
		},
		// 更新浏览或处理次数
		callIncreaseHuoDongViewOrChuliCount : function(guid, isView) {
			var actionParam = new justep.Request.ActionParam();
			actionParam.setString("huodong", guid);
			actionParam.setBoolean("isView", isView);
			var options = {};
			options.process = justep.Context.getCurrentProcess();
			options.activity = justep.Context.getCurrentActivity();
			options.action = "increaseHuoDongViewCountAction";
			options.parameters = actionParam;
			options.contentType = "application/json";
			options.dataType = "json";
			options.callback = function(ret) {
				if (ret.state) {
					if (isView)
						justep.xbl("huoDong").setValue("fViewCount",
								ret.response, guid);
					else
						justep.xbl("huoDong").setValue("fChuLiCount",
								ret.response, guid);
				}
			};
			justep.Request.sendBizRequest2(options);

		}
	};

	butone.Util.apply(model, modelExtend);
	Composition.bindAndShow($2("#rootView").get(0), model);

};

yueJianCenter.lingDaoPSRefreshCreateParam = function(event) {
	var variables = event.param.getParam("variables");
	variables.put("zhuXian", justep.xbl("huoDong").getValue("fZhuXian"));
};

yueJianCenter.btnSearchClick = function(event) {
	justep.XData.refreshControls();
	justep.xbl("huoDong").refreshData();
};

yueJianCenter.gridSelect1Closeup = function(event){
	var personID = justep.Context.getCurrentPersonID();
	var fitler = "";
	var mainData = justep.xbl("huoDong");
	if (!!event.label) {
		if (event.label == "未阅") {
			fitler = " 1=1 and not exists (select 1 from B_HuoDongChuLi B_HuoDongChuLi where B_GongZuoHuoDong.FGUID = B_HuoDongChuLi.fHuoDong AND B_HuoDongChuLi.fOrgUnitID = '"+personID+"')";
		} else if (event.label == "已阅") {
			fitler = " 1=1 and exists (select 1 from B_HuoDongChuLi B_HuoDongChuLi where B_GongZuoHuoDong.FGUID = B_HuoDongChuLi.fHuoDong AND B_HuoDongChuLi.fOrgUnitID = '"+personID+"')";
		}
	}
	mainData.setFilter("fitler", fitler);
	mainData.refreshData();
};

yueJianCenter.modelReady = function(event){
	var personID = justep.Context.getCurrentPersonID();
	justep.xbl("cdata").setValue("state", "未阅");
	justep.xbl("cdata").setValue("name", "未阅");
	var mainData = justep.xbl("huoDong");
	var fitler = " 1=1 and not exists (select 1 from B_HuoDongChuLi B_HuoDongChuLi where B_GongZuoHuoDong.FGUID = B_HuoDongChuLi.fHuoDong AND B_HuoDongChuLi.fOrgUnitID = '"+personID+"')";
	mainData.setFilter("fitler", fitler);
	mainData.refreshData();
};
