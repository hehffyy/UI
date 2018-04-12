/*
 * xyh  对话框 2010.5.7
 * 
 */
justep.Dialog = function(id, title, modal, status, width, height, left, top,
		onInit, onOpen, onClose) {
	if (typeof (dhtmlxEventable) != 'undefined')
		dhtmlxEventable(this);
	else if (typeof (justep.Utils.eventable) != 'undefined')
		justep.Utils.eventable(this);
	this.id = id;
	this.left = left || -1;
	this.top = top || -1;
	this.width = width || 400;
	this.height = height || 300;

	if (typeof this.top == "string") {
		try {
			this.top = parseInt(this.top);
		} catch (e) {
			var msg = new justep.Message(justep.Message.JUSTEP231047, "top",
					this.top);
			throw justep.Error.create(msg);
		}
	}
	if (typeof this.left == "string") {
		try {
			this.left = parseInt(this.left);
		} catch (e) {
			var msg = new justep.Message(justep.Message.JUSTEP231047, "left",
					this.left);
			throw justep.Error.create(msg);
		}
	}
	if (typeof this.width == "string") {
		try {
			this.width = parseInt(this.width);
		} catch (e) {
			var msg = new justep.Message(justep.Message.JUSTEP231047, "width",
					this.width);
			throw justep.Error.create(msg);
		}
	}
	if (typeof this.height == "string") {
		try {
			this.height = parseInt(this.height);
		} catch (e) {
			var msg = new justep.Message(justep.Message.JUSTEP231047, "height",
					this.height);
			throw justep.Error.create(msg);
		}
	}

	this.modal = modal;
	this.title = title;
	this.closeable = true;
	this.minmaxable = true;
	this.resizable = true;
	this.neighbor = null;
	this.autoSize = false;
	this.status = status;
	this.isShowTitle = true;
	this.dlg = null;

	if (!justep(this.id)) {
		var xblDiv = document.createElement("div");
		document.body.appendChild(xblDiv);
		xblDiv.id = this.id;
		xblDiv.xblObject = this;
	}

	if (onInit && onInit != "") {
		var f = null;
		try {
			f = justep.Function.get(onInit);
		} catch (e) {
		}
		if (f && typeof f == "function") {
			this.attachEvent("onInit", f, this);
		}
	}
	if (onOpen && onOpen != "") {
		var f = null;
		try {
			f = justep.Function.get(onOpen);
		} catch (e) {
		}
		if (f && typeof f == "function") {
			this.attachEvent("onOpen", f, this);
		}
	}
	if (onClose && onClose != "") {
		var f = null;
		try {
			f = justep.Function.get(onClose);
		} catch (e) {
		}
		if (f && typeof f == "function") {
			this.attachEvent("onClose", f, this);
		}
	}
};

justep.Dialog.prototype.initDialog = function() {
	var self = this;
	if (!justep.Dialog.dialogs) {
		justep.Dialog.dialogs = new dhtmlXWindows();
		justep.Dialog.dialogs.setImagePath(justep.Request.convertURL(
				"form/dhtmlx/" + "dhtmlxWindows/imgs/", true));
	}
	if (this.neighbor) {
		var n = justep(this.neighbor);
		var pos = $(n).position();
		this.left = pos.left;
		this.top = pos.top + n.offsetHeight;
	}
	this.dlg = justep.Dialog.dialogs.createWindow(this.id + "-dlg-id",
			this.left, this.top, this.width, this.height);

	// TODO modify by 唐科杰 2015-09-29 解决弹出框双滚动
	$(this.dlg).bind("mousewheel", function(event) {
		event.preventDefault();
		event.stopPropagation();
	});

	// TODO modify by 唐科杰 2015-07-23，解决弹出框所在容器存在滚动条的问题
	$(this.dlg).css("position", "fixed");
	// end todo
	this.dlg.keepInViewport(true);
	this.dlg.setText(this.title);
	this.setShowTitle(this.isShowTitle);
	if (justep(this.id + "-content")) {
		this.dlg.attachObject(this.id + "-content", this.autoSize);
	}
	// 最大化时隐藏可视区域，解决平板上的穿透问题
	this.dlg.attachEvent("onMaximize", function() {
		// TODO modify by 唐科杰 2015-07-23，解决弹出框所在容器存在滚动条的问题
		// $(this).css("position","fixed")
		$(this).css({
			"top" : "0px"
		});
		// end todo
		$("#visible-element").hide();
	});
	// 退出最大化状态时显示可视区
	var showVisibleelement = function() {
		$("#visible-element").show();
		// TODO modify by 唐科杰 2015-07-23，解决弹出框所在容器存在滚动条的问题
		// $(this).css("position","");
		// end todo
		try {
			$(window).resize();
		} catch (e) {
		}
	};
	this.dlg.attachEvent("onHide", showVisibleelement);
	this.dlg.attachEvent("onParkUp", showVisibleelement);
	this.dlg.attachEvent("onMinimize", showVisibleelement);

	// 接管dlg的关闭，不允许关闭，只是隐藏
	this.dlg.attachEvent("onClose", function() {
		self.close();
	});

	if (this.checkEvent("onInit")) {
		this.callEvent("onInit", [ {
			source : this
		} ]);
	}
};

justep.Dialog.prototype.open = function() {
	var isFirst = !this.dlg;
	if (isFirst) {
		this.initDialog();

		if (this.status == "maximize") {
			this.dlg.maximize();
		}
	} else {
		this.dlg.show();
		this.setShowTitle(this.isShowTitle);
	}
	this.dlg.bringToTop();

	if (this.closeable) {
		this.dlg.button("close").show();
	} else {
		this.dlg.button("close").hide();
	}
	if (this.minmaxable) {
		this.dlg.button("park").show();
		// this.dlg.button("minmax1").show();
		// this.dlg.button("minmax2").show();
	} else {
		this.dlg.button("park").hide();
		this.dlg.button("minmax1").hide();
		this.dlg.button("minmax2").hide();
	}
	if (this.resizable) {

	} else {
		this.dlg.denyResize();
	}

	if (!justep.Dialog.dialogs._fixedSize) {
		// dhtmlx 对于 滚动条的情况，有bug, fixed
		justep.Dialog.dialogs._fixedSize = true;
		justep.Dialog.dialogs._resize = false;
		var d = $(document);
		var w = $(window);
		var coverd = $(justep.Dialog.dialogs.modalCoverD);
		var fw = 0;
		var fh = 0;
		var _cal_size = function() {
			if (justep.Dialog.dialogs._resize)
				return;
			justep.Dialog.dialogs._resize = true;
			try {
				if (justep.Browser.IE) {
					fw = d.scrollTop() ? 18 : 0;
					fh = d.scrollLeft() ? 18 : 0;
					if (fw == 18 && fh == 19) {
						fw = 0;
						fh = 0;
					}
				} else {
					fw = 0;
					fh = 0;
				}
				coverd.height(Math.max(d.height() - fh, w.height()));
				coverd.width(Math.max(d.width() - fw, w.width()));
			} finally {
				justep.Dialog.dialogs._resize = false;
			}
		};
		_cal_size();

		var _r_size = function() {
			if (coverd.height()) {
				_cal_size();
			}
		};

		d.bind("resize", _r_size);
		// ie6，ie7下有bug
		if (!justep.Browser.IE6 && !justep.Browser.IE7)
			w.bind("resize", _r_size);
	}

	// 如果第一次，并且不是最大化，并且没有邻居 ，则显示在屏幕中央，自己计算（dhtmlx提供的方法有bug）
	if (!this.dlg._isMaximized && !this.neighbor && this.left == -1
			&& this.top == -1 && !this.dlg._inited) {
		var b = $(document);
		var w = $(window);
		if (typeof this.dlg.w == "string") {
			this.dlg.w = parseInt(this.dlg.w);
		}
		this.dlg.x = (w.width() - this.dlg.w - 22) / 2; // b.scrollLeft()+
		// ,modify by 唐科杰
		// 2015-07-23，默认postion:fixed，不再考虑scroll

		if (typeof this.dlg.h == "string") {
			this.dlg.h = parseInt(this.dlg.h);
		}
		this.dlg.y = (w.height() - this.dlg.h - 4) / 2; // b.scrollTop()+,modify
		// by 唐科杰
		// 2015-07-23，默认postion:fixed，不再考虑scroll

		if (this.dlg.y < 0)
			this.dlg.y = 0;
		if (this.dlg.x < 0)
			this.dlg.x = 0;
		this.dlg.style.left = this.dlg.x + "px";
		this.dlg.style.top = this.dlg.y + "px";
		this.dlg._inited = true;
	}

	if (this.modal) {
		justep.Dialog.dialogs._setWindowModal(this.dlg, true);
	}

	if (this.checkEvent("onOpen")) {
		this.callEvent("onOpen", [ {
			source : this
		} ]);
	}
	justep.XBLObject.resize(this.id);
};

justep.Dialog.prototype.close = function() {
	if (this.status == "maximize")
		$("#visible-element").show();
	if (!this.dlg || this.dlg.style.display == "none")
		return;
	this.dlg.hide();
	if (this.modal) {
		this.dlg.setModal(false);
	}
	if (this.checkEvent("onClose")) {
		this.callEvent("onClose", [ {
			source : this
		} ]);
	}
};

justep.Dialog.prototype.setClosable = function(flag) {
	if (this.dlg) {
		if (flag)
			this.dlg.button("close").show();
		else
			this.dlg.button("close").hide();
	} else
		this.closeable = flag;
};

justep.Dialog.prototype.setMinmaxable = function(flag) {
	if (this.dlg) {
		if (this.minmaxable) {
			this.dlg.button("park").show();
		} else {
			this.dlg.button("park").hide();
			this.dlg.button("minmax1").hide();
			this.dlg.button("minmax2").hide();
		}
	} else
		this.minmaxable = flag;
};

justep.Dialog.prototype.setResizable = function(flag) {
	if (this.dlg) {
		if (!flag)
			this.dlg.denyResize();
	} else
		this.resizable = flag;
};

justep.Dialog.prototype.setNeighbor = function(neighbor) {
	if (this.dlg) {
		if (neighbor) {
			var n = justep(neighbor);
			var pos = $(n).position();
			this.left = pos.left;
			this.top = pos.top + n.offsetHeight;
			this.dlg.setPosition(this.left, this.top);
		}
	} else
		this.neighbor = neighbor;
};

justep.Dialog.prototype.setAutoSize = function(flag) {
	if (this.dlg)
		if (justep(this.id + "-content")) {
			this.dlg.attachObject(this.id + "-content", this.autoSize);
		} else
			this.autoSize = flag;
};

justep.Dialog.prototype.setContentHTML = function(str) {
	if (!this.dlg)
		this.initDialog();
	this.dlg.attachHTMLString(str);
};

justep.Dialog.prototype.setContentById = function(objId, autoSize) {
	if (!this.dlg)
		this.initDialog();
	this.dlg.attachObject(objId, autoSize);
};

justep.Dialog.prototype.setTitle = function(title) {
	this.title = title;
	if (this.dlg)
		this.dlg.setText(title);
};

justep.Dialog.prototype.setShowTitle = function(isShow) {
	this.isShowTitle = isShow;
	if (this.dlg)
		isShow ? this.dlg.showHeader() : this.dlg.hideHeader();
};

justep.Dialog.prototype.getWidth = function() {
	return this.width;
};

justep.Dialog.prototype.setWidth = function(width) {
	this.width = width;
	if (typeof this.width == "string") {
		try {
			this.width = parseInt(this.width);
		} catch (e) {
			var msg = new justep.Message(justep.Message.JUSTEP231047, "width",
					this.width);
			throw justep.Error.create(msg);
		}
	}
	if (this.dlg) {
		this.dlg.w = this.width;
		justep.XBLObject.resize(this.id);
	}
};

justep.Dialog.prototype.setHeight = function(height) {
	this.height = height;
	if (typeof this.height == "string") {
		try {
			this.height = parseInt(this.height);
		} catch (e) {
			var msg = new justep.Message(justep.Message.JUSTEP231047, "height",
					this.height);
			throw justep.Error.create(msg);
		}
	}
	if (this.dlg) {
		this.dlg.h = this.height;
		justep.XBLObject.resize(this.id);
	}
};
