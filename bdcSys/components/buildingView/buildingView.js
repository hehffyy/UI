(function(global) {

	function attachEvent(node, event, context) {
		var fn = node.getAttribute(event);
		if (fn && fn != "")
			context.attachEvent(event, eval(fn), context);
	}

	var BuildingView = function(xblObject) {
		if (typeof (dhtmlxEventable) != 'undefined')
			dhtmlxEventable(this);
		else if (typeof (justep.Utils.eventable) != 'undefined')
			justep.Utils.eventable(this);

		var me = this, node = xblObject.domNode, id = node.id;
		me.element = node;
		me.reader = node.getAttribute("reader") || "queryBDC_HAction";
		me.writer = node.getAttribute("writer") || "changeBDC_H_CHAction";
		me.process = node.getAttribute("process");
		me.activity = node.getAttribute("activity");
		var showZT = node.getAttribute("showZT");
		if (showZT) {
			me.showZT = showZT.split(",");
		}

		me.ztLabel = {
			fz : [ "无", "确权", "发证" ],
			dj : [ "无", "冻结" ],
			dy : [ "无", "在建", "抵押" ],
			cf : [ "无", "预查", "查封" ],
			yy : [ "无", "异议" ],
			yg : [ "无", "预告" ]
		};

		me.ztHidden = {
			fz : [ 0 ],
			dj : [ 0 ],
			dy : [ 0 ],
			cf : [ 0 ],
			yy : [ 0 ],
			yg : [ 0 ]
		};

		attachEvent(node, "onInited", this);
		attachEvent(node, "onCreateQueryActionParam", this);

		attachEvent(node, "onAfterRender", this);
		attachEvent(node, "onHIDClick", this);
		attachEvent(node, "onShowRecInfo", this);
		attachEvent(node, "onHZTClick", this);
		attachEvent(node, "onChangeCH", this);

		this._initBindModel();

	};

	BuildingView.prototype._initBindModel = function() {
		var me = this;
		require([ "jquery", "bind", "base/lib/bind/bind.mapping" ], function(
				$2, Bind, Mapping, View) {
			me._bindingModel = {
				showZRZName : Bind.observable("false" != me.element
						.getAttribute("showZRZName")),
				zrzName : Bind.observable(""),
				maxHPerC : 0,
				cengs : Bind.observableArray([]),

				bindModelFn : me.bindModelFn.bind(me),
				hidClick : me.hidClick.bind(me),
				hztClick : me.hztClick.bind(me),
				isShowHZT : me.isShowHZT.bind(me),
				getHZTLabel : me.getHZTLabel.bind(me),
				showRecInfo : me.showRecInfo.bind(me),
				afterRenderColH : me.afterRenderColH.bind(me),
				dodragStart : me.dodragStart.bind(me),
				dodragEnter : me.dodragEnter.bind(me),
				dodragOver : me.dodragOver.bind(me),
				dodrop : me.dodrop.bind(me),
				dodragEnd : me.dodragEnd.bind(me)
			};
			Bind.applyBindings(me._bindingModel, me.element);
			$(".container_cengs", me.element).show();
			if (me.checkEvent("onInited")) {
				me.callEvent("onInited", [ {
					source : me
				} ]);
			}
		});
	};

	BuildingView.prototype.bindModelFn = function(func, caller) {
		return this._bindModelFn(func, {
			model : this,
			caller : caller
		});
	};
	BuildingView.prototype._bindModelFn = function(func, context) {
		if (!$.isFunction(func))
			return func;
		context = context || {
			model : this
		};
		var ret = function() {
			if (this.model.isDestroyed) {
				if ('function' === typeof (this.modelDestroyHandle))
					this.modelDestroyHandle();
				return;
			}
			func.apply(this.caller || this.model, arguments);
		};
		return ret.bind(context);
	},

	BuildingView.prototype.dodragStart = function(item, event) {
		if (!this.checkEvent("onChangeCH") || !item.HID) {
			event.preventDefault ? event.preventDefault()
					: event.returnValue = false;
			return false;
		}
		event.originalEvent.dataTransfer.setData("hid", item.HID);
		event.originalEvent.dataTransfer.setData("ch", item.CH);
	};

	BuildingView.prototype.dodragEnter = function(item, event) {
		var target = $(event.currentTarget);
		if (target.hasClass("row_ceng") && !target.hasClass("dragover")) {
			target.parent().children(".dragover").removeClass("dragover");
			target.addClass("dragover");
		}
	};

	BuildingView.prototype.dodragOver = function(item, event) {
		event.preventDefault ? event.preventDefault()
				: event.returnValue = false;
		return false;
	};

	BuildingView.prototype.dodragEnd = function(item, event) {
		$(".dragover", this.element).removeClass("dragover");
	};

	BuildingView.prototype.findRow = function(hid) {
		var row;
		$(this._buildingTable.rows).each(function() {
			if (this.userdata.id.value == hid) {
				row = this;
				return false;
			}
		});
		return row;
	};

	BuildingView.prototype.dodrop = function(item, event) {
		var hid = event.originalEvent.dataTransfer.getData("hid");
		var ch = event.originalEvent.dataTransfer.getData("ch");
		var context = butone.Bind.contextFor(event.target);
		if (context.$object._kind == "h") {
			context = context.$parentContext;
		}
		var newch = context.$object.CH;
		if (ch == newch)
			return;

		this.callEvent("onChangeCH", [ {
			source : this,
			hid : hid,
			ch : newch
		} ]);
		this.refresh();
	};

	BuildingView.prototype.refresh = function(zrzid) {
		var me = this;
		if (zrzid)
			me.zrzid = zrzid;
		var params;
		if (me.checkEvent("onCreateQueryActionParam")) {
			params = me.callEvent("onCreateQueryActionParam", [ {
				source : me
			} ]);
		} else {
			var params = new justep.Request.ActionParam();
			params.setString("zrzid", me.zrzid);
		}
		justep.Request.sendBizRequest2({
			action : me.reader,
			process : me.process,
			activity : me.activity,
			dataType : "json",
			parameters : params,
			callback : function(result) {
				if (result.state) {
					me._buildingTable = result.response;
					me._build();
				} else {
					throw new Error("调用失败！|" + result.response.message);
				}
			}
		});
	};

	BuildingView.prototype.afterRenderColH = function(eles, item) {
		if (this.checkEvent("onAfterRender")) {
			this.callEvent("onAfterRender", [ {
				source : this,
				element : $(eles).filter(".colH").get(0),
				row : item
			} ]);
		}
	};

	BuildingView.prototype.getHZTLabel = function(ztName, ztValue) {
		return this.ztLabel[ztName][ztValue];
	};

	BuildingView.prototype.showRecInfo = function(item, event) {
		if (this.checkEvent("onShowRecInfo")) {
			this.callEvent("onShowRecInfo", [ {
				source : this,
				recid : item.RECID,
				row : item
			} ]);
		}
	};

	BuildingView.prototype.hidClick = function(item, event) {
		if (this.checkEvent("onHIDClick")) {
			this.callEvent("onHIDClick", [ {
				source : this,
				hid : item.HID,
				row : item
			} ]);
		}
	};

	BuildingView.prototype.setZTLabel = function(value) {
		this.ztLabel = value;
	};

	BuildingView.prototype.setZTHidden = function(value) {
		this.ztHidden = value;
	};

	BuildingView.prototype.setZRZName = function(name) {
		this._bindingModel && this._bindingModel.zrzName.set(name);
	};
	BuildingView.prototype.setZRZID = function(zrzid) {
		this.zrzid = zrzid;
	};

	BuildingView.prototype.setShowZRZName = function(value) {
		this._bindingModel && this._bindingModel.showZRZName.set(value);
	};
	BuildingView.prototype.hztClick = function(item, event) {
		var me = this, name = $(event.target || event.srcElement).attr("name");
		if (!name)
			return;
		if (this.checkEvent("onHZTClick")) {
			me.callEvent("onHZTClick", [ {
				source : me,
				ztName : name,
				ztValue : item[name.toUpperCase() + "ZT"],
				row : item
			} ]);
		}
	};

	BuildingView.prototype.isShowHZT = function(ztName, ztValue) {
		var r = (!this.showZT || justep.Array.contain(this.showZT, ztName))
				&& (ztValue != null && ztValue != undefined && !justep.Array
						.contain(this.ztHidden[ztName], ztValue));
		return r;
	};

	BuildingView.prototype.test = function() {
		var ztLabel = this.ztLabel;
		$.each(this._buildingTable.rows || [], function(idx, item) {
			for ( var n in item) {
				if (n !== 'userdata' && n !== 'HID') {
					if (n.indexOf("ZT") > 0) {
						var ztName = n.substring(0, 2).toLowerCase();
						item[n].value = Math.floor((Math.random() * 10))
								% ztLabel[ztName].length;
					}
				}
			}
			if (!item.RECID.value)
				item.RECID.value = justep.Utils.randomString();
		});
		this._build();
	};

	BuildingView.prototype._build = function(table) {
		var table = this._buildingTable;
		var model = this._bindingModel;
		model.maxHPerC = 0;
		model.cengs.splice(0, model.cengs.get().length);
		var cengs = [], ceng = null, maxCol = 0;
		if (table.rows.length > 0) {
			$.each(table.rows || [], function(idx, item) {
				if (ceng === null || ceng.CH != item.CH.value) {
					if (ceng !== null) {
						maxCol = Math.max(maxCol, ceng.items.length);
					}
					ceng = {
						_kind : "c",
						CH : item.CH.value,
						items : []
					};
					cengs.push(ceng);
				}

				var h = {
					_kind : "h",
					HID : item.userdata.id.value
				};

				for ( var n in item) {
					if (n !== 'userdata' && n !== 'HID') {
						h[n] = item[n].value;
					}
				}
				ceng.items.push(h);
			});
			maxCol = Math.max(maxCol, ceng.items.length);
			$.each(cengs, function(idx, ceng) {
				while (ceng.items.length < maxCol)
					ceng.items.push({
						_kind : "h"
					});
			});
		}
		model.maxHPerC = maxCol;
		model.cengs.push.apply(model.cengs, cengs);
	};

	BuildingView.prototype.find = function(value, first) {
		var rows = [];
		$(".colH", this.element).each(
				function() {
					var row = butone.Bind.contextFor(this).$object;
					if (row.HH && row.HH.indexOf(value) >= 0 || row.ZL
							&& row.ZL.indexOf(value) >= 0) {
						rows.push({
							element : this,
							row : row
						});
						if (first)
							return false;
					}
				});
		return rows;
	};

	BuildingView.prototype.scrollTo = function(element) {
		$("html,body").animate({
			scrollTop : $(element).offset().top
		}, 0, 'swing');
	};

	var com = global.com = global.com || {};
	com.butone = com.butone || {};
	com.butone.BuildingView = BuildingView;
	return BuildingView;

})(window);
