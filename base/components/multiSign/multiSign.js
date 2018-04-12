(function(global) {
	var portal = justep.Portal._isPortal2() ? justep.Portal._getPortal2().justep.Portal
			: justep.Portal._getJPolite().justep.Portal;
	var GDCA = portal && portal.getGDCA ? portal.getGDCA() : null;
	var jQuery;
	if (portal.getPortal && portal.getPortal() && portal.getPortal().jQuery) {
		jQuery = portal.getPortal().jQuery;
	} else {
		jQuery = window.jQuery;
	}

	var multiSign = function(xblObject) {
		var me = this, node = xblObject.domNode, id = node.id, dataId = node
				.getAttribute('data');
		me.element = node;
		me.data = justep.xbl(dataId);

		me.template = node.getAttribute('template');
		if (me.template == "grid") {
			var grid = justep.xbl(node.getAttribute('innerGridId'));
			grid.attachEvent("onRowDblClick", function(event) {
				me.edit();
			});
		}
		me.shadow = node.getAttribute('shadow') == "true";
		me.deptGroup = node.getAttribute('deptGroup') == "true";
		me.multiTime = node.getAttribute('multiTime') == "true";
		me.attachment = node.getAttribute('attachment') == "true";
		me.protectFields = [];
		if (me.template == "celllayout") {
			var table = $(">table", node).css({
				display : "table",
				width : "100%",
				height : "auto"
			});
			var rowTemplate = $(".signRow", table).remove();
			if (rowTemplate.length == 0) {
				table.css("display", "none");
				$(node).append(
						"<h2 style='color:red'>签名数据行未设置class='signRow'</h2>");
			} else {
				me._cellLayoutRowTemplate = rowTemplate;
				me.deptGroup = me.deptGroup && rowTemplate.length == 1;
			}
			me.cellLayoutTable = table;
		}

		var protectFields = node.getAttribute('protectFields'); // 保护字段
		if (protectFields) {
			me.protectFields = protectFields.split(",");
		}

		var anchor_scroll = document.createElement("a");
		anchor_scroll = $(anchor_scroll).attr({
			"id" : me.element.id + "_anchor_scroll",
			href : "#",
			style : "display:none"
		});
		anchor_scroll.appendTo(me.element);
		me.anchor_scroll = anchor_scroll;

		if (me.data) {
			if (me.data.masterData)
				me.masterData = justep.xbl(me.data.masterData.id);

			me.data.attachEvent(justep.XData.EVENT_NEWDATA_BEFORE, $.proxy(
					me._onBeforeNewData, me));
			me.data.attachEvent(justep.XData.EVENT_NEWDATA_AFTER, $.proxy(
					me._onAfterNewData, me));
			me.data.attachEvent(justep.XData.EVENT_CHANGED, $.proxy(
					me._onDataChanged, me));

			if (me.data.loaded) {
				me.rebuild();
			}
			me.data.deleteConfirm = false;
			me.hasAttachment = !!me.data.getRelationInfo("fAttachment").relation;
		}
		me.useCA = !!GDCA;

		// ----通过<xforms:output/>与ref绑定，监听其他表单对数据的修改
		// var refControl = document.getElementById(id + "_ref");
		// if (refControl) {
		// new xforms.Listener(refControl, "xforms-value-changed", null,
		// function(
		// event) {
		// debugger;
		// if (event.currentTarget.node) {
		// var store = event.currentTarget.node.store;
		// if (store == me.data.getStore())
		// return;
		// // 数据改变,包括修改、删除、新增
		// var rowID = store.currentRowId;
		// store.setValueById(rowID, "fSignTime", justep.System
		// .datetimeString());
		// me._changeDefaultSignInfo(rowID,
		// event.currentTarget.node.getValue());
		// } else {
		// // 无数据
		// if ($(">tbody>tr", me.getTable()).length > 1) {
		// me.rebuild();
		// }
		// }
		//
		// });
		// refControl.refreshCallback=function(refC){
		// debugger;
		// };
		// refControl.refreshCallback(refControl.xformsObject);
		// }
	};

	multiSign.prototype.dispose = function() {
		var refControl = document.getElementById(this.element.id + "_ref");
		if (refControl)
			refControl.refreshCallback = null;
		justep.XBLObject.prototype.dispose.call(this);

	};

	multiSign.prototype._getDateTimeText = function(date) {
		if (!date)
			return "";
		if (typeof date == "string")
			return date;
		return justep.Date.toString(date, justep.Date.STANDART_FORMAT);
	},

	/**
	 * 获取保护数据
	 */
	multiSign.prototype._getProtectData = function(protectedFields, rowID) {
		if (typeof protectedFields == "string") {
			protectedFields = protectedFields.split(",");
		}
		var ret = {
			text : "",
			data : {}
		};
		for ( var n in protectedFields) {
			var protectField = protectedFields[n];
			var args = protectField.split(".");
			// args[0]:概念ID，args[1]关系名
			// source.defRelations[args[1]] 关系显示名
			var target = justep.xbl(args[0]);
			if (target == null) {
				throw justep.Error.create("工作表" + args[0] + "不存在");
			} else if (!target.loaded) {
				if (target.masterData && target.masterData.id) {
					target.loadDataByMaster();
				} else {
					target.loadData();
				}
			}
			var v = target.getValue(args[1]) || "";
			ret.data[protectField] = v;
			ret.text += v;
		}
		// 追加签名信息
		ret.data["fSignName"] = this.data.getValue("fPersonName", rowID),
				ret.text += ret.data["fSignName"];
		ret.data["fSignInfo"] = this.data.getValue("fSignInfo", rowID),
				ret.text += ret.data["fSignInfo"];
		ret.data["fSignTime"] = this._getDateTimeText(this.data.getValue(
				"fSignTime", rowID)), ret.text += ret.data["fSignTime"];
		return ret;
	},
	/**
	 * 计算[加密]要保护数据
	 * 
	 * @param protectFields
	 * @returns {Object}
	 */
	multiSign.prototype._calcProtectData = function(protectFields, rowID) {
		var signData = new Object(), protectData = this._getProtectData(
				protectFields, rowID);
		// 保护的字段
		signData.protectedFields = this.protectFields;
		// 原始数据
		signData.orgiData = protectData.data;
		if (this.useCA) {
			if (GDCA.ActiveXInit(true)) {
				signData.algoName = "GDCA";
				signData.algoParam = GDCA.getCertData(2);
				GDCA.getSignData(protectData.text, function(data) {
					signData.encryptData = data;
				}, function(err) {
					throw justep.Error.create(err);
				});
			} else {
				GDCA.getLastError().then(function(err) {
					dtd.reject("初始化GDCA错误," + err);
				});
			}
		} else {
			signData.encryptData = hex_md5(protectData.text);
		}
		return signData;
	};

	multiSign.prototype.getTable = function() {
		return this.template == "celllayout" ? this.cellLayoutTable : $("#"
				+ this.element.id + ">table");
	};

	multiSign.prototype.getTableElement = function() {
		return (this.template == "celllayout" ? this.cellLayoutTable : $("#"
				+ this.element.id + ">table"))[0];
	};

	multiSign.prototype.getSignInfoHeight = function() {
		return this.element.getAttribute("signInfo-height");
	};

	multiSign.prototype.getHeaderHeight = function() {
		return this.element.getAttribute("header-height");
	};

	multiSign.prototype.transformDatetime = function(timeString) {
		var signTime = xforms.I8N.parse(timeString, xforms.I8N
				.get("format.datetime"));
		signTime = xforms.I8N.format(signTime, "yyyy年MM月dd日 hh:mm");
		return signTime;
	};

	multiSign.prototype._onBeforeNewData = function(event) {
		if (this.masterData) {
			if (!this.masterData.getID()) {
				throw justep.Error.create("会签主表无记录");
			}
			if (this.masterData.isChanged("self"))
				this.masterData.saveData();
		}
	};

	multiSign.prototype._onAfterNewData = function(event) {
		var ids = event.ids, me = this;
		for ( var n in ids) {
			var id = ids[n];
			if (!me.data.getValue("fPersonId", id))
				me.data.setValue("fPersonId", justep.Context
						.getCurrentPersonID(), id);
			if (!me.data.getValue("fPersonName", id))
				me.data.setValue("fPersonName", justep.Context
						.getCurrentPersonMemberNameWithAgent(), id);
			if (!me.data.getValue("fDeptId", id))
				me.data.setValue("fDeptId", justep.Context.getCurrentDeptID()
						|| justep.Context.getCurrentOgnID(), id);
			if (!me.data.getValue("fDeptName", id))
				me.data.setValue("fDeptName", justep.Context
						.getCurrentDeptName()
						|| justep.Context.getCurrentOgnName(), id);
			if (!me.data.getValue("fSignTime", id))
				me.data.setValue("fSignTime", justep.System.datetimeString(),
						id);
		}
	};

	multiSign.prototype._onDataChanged = function(event) {
		if (event.type == "new") {
			if (!this.template || this.template == "default") {
				this._appendDefaultRow(event.id[0], true);
			} else if (this.template == "celllayout") {
				this._appendCellLayoutRow(event.id[0], true);
			}
			this.resetTotalHeight();
		} else if (event.type == "refresh") {
			this.rebuild();
		} else if (event.type == "delete") {
			if (this.template == "grid")
				return;
			var me = this, isCellLayout = this.template == "celllayout";
			$.each(event.deleteIDList, function(idx, rowId) {
				if (isCellLayout) {
					me._removeCellLayoutRow(rowId);
				} else {
					me._removeDefaultRow(rowId);
				}
			});
			this.resetTotalHeight();
		} else if (event.type == "valueChanged" && event.column == "fSignInfo") {
			event.changedSource.setValue("fSignTime", justep.System
					.datetimeString(), event.rowID);
			if (!this.template || this.template == "default") {
				this._changeDefaultSignInfo(event.rowID, event.value);
			} else if (this.template == "celllayout") {

			}
		}
	};

	multiSign.getCurrentPersonSignRowData = function(personId) {
		if (!this.data.loaded) {
			this.data.refreshData();
		}
		if (!personId)
			personId = justep.Context.getCurrentPersonID();
		var ids = this.data.locate([ personId ], [ "fPersonId" ]);
		return this.data.getRowData(ids[0]);
	};
	multiSign.prototype.orderComp = function(a, b) {
				(!a)
						&& (a = "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ"),
				(!b)
						&& (b = "ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZ");
		return a.localeCompare(b);
	};

	multiSign.prototype._doRebuild = function() {
		var me = this;
		if (me._deferBuild) {
			delete me._deferBuild;
		}
		if (me.template != "grid") {
			// 清空
			if (me.template == "celllayout") {
				$(">tbody>tr[rowid]", me.getTable()).remove();
			} else {
				if (me.deptGroup) {
					$(">tbody>tr", me.getTable()).remove();
				} else {
					$(">tbody>tr[rowid]", me.getTable()).remove();
				}
			}
			// 排序
			var hasDeptOrder = !!me.data.getRelationInfo("fDeptOrder").relation;
			var hasPersonOrder = !!me.data.getRelationInfo("fPersonOrder").relation;
			var rowsBuffer = me.data.getStore().rowsBuffer.concat();
			if (hasDeptOrder || hasPersonOrder) {
				var deptGroup = me.deptGroup && hasDeptOrder;
				rowsBuffer.sort(function(a, b) {
					if (deptGroup) {
						var d1 = a._systemData["fDeptOrder"].originalValue;
						var d2 = b._systemData["fDeptOrder"].originalValue;
						if (d1 != d2 || !hasPersonOrder) {
							return me.orderComp(d1, d2);
						} else {
							var p1 = a._systemData["fSignTime"].originalValue;
							var p2 = b._systemData["fSignTime"].originalValue;
							return me.orderComp(p1, p2);
						}
					} else if (hasPersonOrder) {
						var p1 = a._systemData["fPersonOrder"].originalValue;
						var p2 = b._systemData["fPersonOrder"].originalValue;
						return me.orderComp(p1, p2);
					}
				});
			}

			for ( var i = 0; i < rowsBuffer.length; i++) {
				var row = rowsBuffer[i];
				var rowID = row.originalId || row.idd;
				if (me.template == "celllayout") {
					me._appendCellLayoutRow(rowID);
				} else {
					me._appendDefaultRow(rowID);
				}
			}

		}
		me.resetTotalHeight();
	};

	multiSign.prototype.rebuild = function() {
		if (this.template == "grid")
			return;
		// TODO 明细表触发2次刷新？增加个延时处理
		if (this._deferBuild)
			this._deferBuild.remove();
		this._deferBuild = butone.defer(this._doRebuild, 10, this);
	};

	multiSign.prototype.resetTotalHeight = function() {
		if (this.template == "grid")
			return;
		$(this.element).parent().height(
				(this.getTableElement().offsetHeight + 1) + "px");
	};

	multiSign.prototype.showSignDialog = function(msg, attachment, readonly) {
		if (!this._signDialog) {
			this._signDialog = new justep.WindowDialog(this.element.id
					+ "_dialog", "/UI/base/components/multiSign/signDialog.w",
					this.title ? this.title : "办理意见", true, null, 650, 400,
					null, null, true, null, $.proxy(this._signDialogOnReceive,
							this));
			this._signDialog.setMinmaxable(false);
			this._signDialog.setResizable(false);
		}
		this._signDialog.open2({
			data : {
				msg : msg,
				attachment : attachment,
				readonly : readonly,
				showAttachment : this.hasAttachment
			}
		});
	};

	/**
	 * 清除签名
	 */
	multiSign.prototype.remove = function() {
		if (this.data.getInstance().readonly)
			return;
		var ids = this.data.locate([ justep.Context.getCurrentPersonID() ],
				[ "fPersonId" ]);
		if (ids.length > 0) {
			this.data.deleteData(ids);
		}
		this.data.saveData();
	};

	/**
	 * 删除当前签名
	 */
	multiSign.prototype.removeCurrent = function() {
		if (this.data.getInstance().readonly)
			return;
		if (this.data.getValue("fPersonId") == justep.Context
				.getCurrentPersonID()) {
			this.data.deleteData([ this.data.getID() ]);
		}
		this.data.saveData();
	};

	// multiSign.prototype._signDialogOnSend = function(event) {
	// var ids = this.data.locate([ justep.Context.getCurrentPersonID() ],
	// [ "fPersonId" ]);
	// if (ids.length > 0)
	// return this.data.getValue("fSignInfo", ids[0]);
	// else
	// return "";
	// };
	/**
	 * 签名
	 */
	multiSign.prototype.sign = function() {
		var msg = "", attachment = "";
		if (!this.multiTime) {
			// 不支持多次签名，则取当前操作者签名
			var ids = this.data.locate([ justep.Context.getCurrentPersonID() ],
					[ "fPersonId" ]);
			if (ids.length > 0) {
				msg = this.data.getValue("fSignInfo", ids[0]);
				if (this.hasAttachment)
					attachment = this.data.getValue("fAttachment", ids[0]);
			}
		}
		this._action = "sign";
		this.showSignDialog(msg, attachment, this.data.getInstance().readonly);
	};

	/**
	 * 编辑
	 */
	multiSign.prototype.edit = function() {
		var msg = this.data.getValue("fSignInfo"), attachment = "", readonly = this.data
				.getValue("fPersonId") != justep.Context.getCurrentPersonID();
		if (this.hasAttachment)
			attachment = this.data.getValue("fAttachment");
		this._action = "edit";
		this.showSignDialog(msg, attachment, readonly
				|| this.data.getInstance().readonly);
	};

	multiSign.prototype.verifyGDCASignData = function(signCert, inData, encData) {
		var actionParam = new justep.Request.ActionParam();
		actionParam.setString("signCert", signCert);
		actionParam.setString("inData", inData);
		actionParam.setString("encData", encData);
		var options = {};
		options.process = "/base/thirdLogin/process/thirdLoginProcess";
		options.activity = "mainActivity";
		options.action = "gdcaVerifySignDataAction";
		options.parameters = actionParam;
		options.dataType = "json";
		options.contentType = "json";
		var response = justep.Request.sendBizRequest2(options);
		if (justep.Request.isBizSuccess(response, options.dataType)) {
			var o = justep.Request.responseParseJSON(response);
			return o.data.value;
		} else {
			return false;
		}
	};

	multiSign.prototype.verifySignData = function(algoName, algoParam, text,
			encryptData) {
		if ("GDCA" == algoName) {
			return this.verifyGDCASignData(algoParam, text, encryptData);
		} else {
			return hex_md5(text) == encryptData;
		}
	};

	multiSign.prototype.doVerify = function(rowID) {
		var signDataStr = this.data.getValue("fSignData", rowID), ret = {
			rowID : rowID,
			tag : 0,
			msg : "验证通过"
		};

		if (!signDataStr) {
			ret.tag = 2;
			ret.msg = "无签名认证数据";
			return ret;
		}

		var signData;
		try {
			signData = JSON.parse(signDataStr);
		} catch (e) {
			ret.tag = -1;
			ret.msg = "签名加密数据已被篡改";
			return ret;
		}
		var currData = this._getProtectData(signData.protectedFields, rowID);
		var b = this.verifySignData(signData.algoName, signData.algoParam,
				currData.text, signData.encryptData);
		if (!b) {
			ret.tag = -1;
			ret.msg = "签名加密数据已被篡改";
		}
		return ret;
	};

	multiSign.prototype._innerVerify = function(all) {
		// if (!this.data.loaded) {
		// this.data.refreshData();
		// }
		var ret = [], info = "", n = 0, err = false;
		for ( var i = 0; i < this.data.getCount(); i++) {
			var rowID = this.data.getID(i);
			if (this.data.getState(rowID) == justep.XData.STATE.DELETE)
				continue;
			if (!all
					&& this.data.getValue("fPersonId", rowID) != justep.Context
							.getCurrentPersonID())
				continue;
			var c = this.doVerify(rowID);
			!err && c.tag !== 0 && (err = true);
			info += "<h4 style='" + (c.tag !== 0 ? "color:red" : "") + "'>签名"
					+ (++n) + ":" + c.msg + "</h3>";
			ret.push(c);
		}
		if (ret.length == 0) {
			this.getMsgDialog().open({
				title : "验证信息",
				msg : "会签表 无数据",
				type : 0,
				img : "right"
			});
		} else {
			this.getMsgDialog().open({
				title : "验证信息",
				msg : info,
				type : 0,
				img : err ? "error" : "right"
			});
		}
		return ret;

	};

	/**
	 * 验证当前行签名
	 */
	multiSign.prototype.verify = function(all) {
		if (!this.data.loaded) {
			this.data.refreshData();
		}
		var me = this;
		if (butone && butone.Context && butone.Context.frameForm) {
			var form = butone.Context.frameForm.getRootForm();
			form.promiseRefreshControls().done(function() {
				me._innerVerify(all);
			});
		} else {
			setTimeout(function() {
				me._innerVerify(all);
			}, 100);
		}
	};

	/**
	 * 验证所有签名
	 */
	multiSign.prototype.verifyAll = function() {
		this.verify(true);
	};

	multiSign.prototype.getMsgDialog = function() {
		if (!this._messageDialog) {
			this._messageDialog = new justep.System.showMessage();
		}
		return this._messageDialog;
	};

	multiSign.prototype.showError = function(msg) {
		this.getMsgDialog().open({
			title : "验证信息",
			msg : msg,
			type : 0,
			img : 'error'
		});
	};

	multiSign.prototype._signDialogOnReceive = function(event) {
		var signInfoId, attachment = "";
		if (this.hasAttachment)
			attachment = event.data.attachment;
		if (this._action == "sign") {
			var ids = this.data.locate([ justep.Context.getCurrentPersonID() ],
					[ "fPersonId" ]);
			if (ids.length > 0 && !this.multiTime) {
				signInfoId = ids[0];
				this.data.setValue("fSignInfo", event.data.info, signInfoId);
				if (this.hasAttachment)
					this.data.setValue("fAttachment", attachment, signInfoId);
			} else {
				if (this.hasAttachment)
					this.data.newData({
						defaultValues : [ {
							fSignInfo : event.data.info,
							fAttachment : attachment
						} ]
					});
				else
					this.data.newData({
						defaultValues : [ {
							fSignInfo : event.data.info
						} ]
					});
				signInfoId = this.data.getID();
			}
		} else {
			signInfoId = this.data.getID();
			this.data.setValue("fSignInfo", event.data.info, signInfoId);
			if (this.hasAttachment)
				this.data.setValue("fAttachment", attachment, signInfoId);
		}
		var signData;
		try {
			signData = JSON.stringify(this._calcProtectData(this.protectFields,
					signInfoId));
		} catch (e) {
			var msg = "";
			if (this.data.getState(signInfoId) == "edit") {
				msg = "系统清除您上次签名的保护数据，";
			}
			this.getMsgDialog().open(
					{
						title : "提示信息",
						msg : "加密签名数据失败：" + e.message
								+ "<br><font color='red'>" + msg
								+ "请您重新进行签名操作</font>",
						type : 0,
						img : 'error'
					});
			if (this.data.getState(signInfoId) == "edit") {
				this.data.setValue("fSignData", "", signInfoId);
			} else if (this.data.getState(signInfoId) == "new") {
				// TODO 是否还原数据？
			}
			return;
		}
		this.data.setValue("fSignData", signData, signInfoId);
		this.data.saveData();
		if (this.masterData) {
			// TODO 为什么要刷新主？
			this.masterData.refreshConfirm = false;
			this.masterData.refreshData();
		}

		if (this.anchor_scroll) {
			var signInfoId = this.element.id + '_signInfo_' + signInfoId;
			this.anchor_scroll.attr("href", "#" + signInfoId);
			this.anchor_scroll[0].click();
		}
	};

	multiSign.prototype._changeDefaultSignInfo = function(rowID, value) {
		var $table = this.getTable();
		var signInfoId = this.element.id + '_signInfo_' + rowID;
		$("#" + signInfoId, $table).val(value);
		var signTime = this.transformDatetime(this.data.getValue("fSignTime",
				rowID));
		var signTimeId = this.element.id + '_signTime_' + rowID;
		$("#" + signTimeId, $table).html(signTime);
		this.anchor_scroll.attr("href", "#" + signInfoId);
		this.anchor_scroll[0].click();

	};

	multiSign.prototype._removeCellLayoutRow = function(rowID) {
		var $signRow = $(">tbody>tr[rowid='" + rowID + "']", this.getTable());
		if ($signRow.length == 0)
			return;
		var me = this;
		if (me._cellLayoutDeptNameCellIndex >= 0) {
			var deptId = $signRow.attr("deptId");
			var $deptGroup = $(">tbody>tr[deptId='" + deptId + "']", me
					.getTable());
			if ($deptGroup[0] == $signRow[0]) {
				// 移除第一行后
				if ($deptGroup.length > 1) {
					// 第二行设置rowSpan
					$deptGroup[1].rowSpan = me._cellLayoutDeptNameRowSpan
							* ($deptGroup.length - 1);
				}
			} else {
				// 修改第一行rowSpan
				$deptGroup[0].rowSpan = me._cellLayoutDeptNameRowSpan
						* ($deptGroup.length - 1);
			}
		}
		$signRow.remove();

	};

	multiSign.prototype._removeDefaultRow = function(rowID) {
		if (this.deptGroup) {
			$(">tbody>tr>td>table>tbody>tr>td[rowid='" + rowID + "']",
					this.getTable()).each(function() {
				var node = this;
				var $rowSpanTD = $(".deptName", node.parentNode.parentNode);
				var rowSpan = parseInt($rowSpanTD.attr("rowSpan"));
				var rowIndex = node.parentNode.rowIndex;
				var row = node.parentNode;
				if (rowIndex == 1) {
					if (row.parentNode.rows.length == 2) {
						// 最后一条记录，删除部门所属行
						$($(row).parents("tr")[0]).remove();
					} else {
						// 还有其他记录，删除部门所属行
						var next = row.parentNode.rows[row.rowIndex + 1];
						$rowSpanTD.attr("rowSpan", rowSpan - 1);
						$(row).remove();
						$rowSpanTD.prependTo(next);
					}
				} else {
					// 非第一行
					$(row).remove();
					$rowSpanTD.attr("rowSpan", rowSpan - 1);
				}

			});
		} else {
			$(">tbody>tr[rowid='" + rowID + "']", this.getTable()).each(
					function() {
						$(this).remove();
					});
		}

	};
	multiSign.prototype._appendCellLayoutRow = function(rowID, sort) {
		var me = this, data = me.data;
		if (!me._cellLayoutRowTemplate || me._cellLayoutRowTemplate.length == 0
				|| justep.XData.STATE.DELETE == data.getState(rowID))
			return;
		var signTime = me.transformDatetime(data.getValue("fSignTime", rowID));
		var $table = this.getTable();

		var rowTemplate = me._cellLayoutRowTemplate;
		if (me.deptGroup && !me.hasOwnProperty("_cellLayoutDeptNameCellIndex")) {
			$(">td:contains('fDeptName')", rowTemplate).each(function() {
				var node = this;
				me._cellLayoutDeptNameCellIndex = node.cellIndex;
				me._cellLayoutDeptNameRowSpan = $(node).attr("rowSpan");
				return false;
			});
		}

		var signData = rowTemplate.attr("outerHTML");
		var signInfoId = me.element.id + '_signInfo_' + rowID;
		var personID = data.getValue("fPersonId", rowID);
		var personOrder = data.getValue("fPersonOrder", rowID);
		var deptOrder = data.getValue("fDeptOrder", rowID);
		var relations = me.data.defRelations;
		var opt = {};
		for ( var r in relations) {
			opt[r] = data.getValue(r, rowID);
		}
		opt["fSignTime"] = signTime;

		signData = butone.String.format(signData, opt);
		var $signRow = $(signData).attr({
			rowid : rowID,
			deptOrder : deptOrder,
			personOrder : personOrder,
			deptId : opt.fDeptId
		});

		if (me.deptGroup) {
			var $deptGroup = $(">tbody>tr[deptId='" + opt.fDeptId + "']",
					$table);
			if ($deptGroup.length == 0) {
				// 不存在同部门
				if (sort) {
					// 部门不存在比较部门顺序
					var first;
					$(">tbody>tr[rowid]", $table).each(function() {
						var node = this;
						var o2 = $(node).attr("deptOrder");
						if (me.orderComp(deptOrder, o2) <= 0) {
							first = node;
							return false;
						}
					});
					if (first) {
						$signRow.insertBefore(first);
					} else {
						$signRow.appendTo($table);
					}
				} else {
					$signRow.appendTo($table);
				}
			} else {
				if (sort) {
					// 存在相同部门行比较人员顺序
					var first;
					$deptGroup.each(function() {
						var node = this;
						var o2 = $(node).attr("personOrder");
						if (me.orderComp(personOrder, o2) <= 0) {
							first = node;
							return false;
						}
					});
					if (first) {
						if (me._cellLayoutDeptNameCellIndex >= 0) {
							if (first == $deptGroup[0]) {
								// 移除当前组内第一行的部门列
								$(first.cells[me._cellLayoutDeptNameCellIndex])
										.remove();
							} else {
								// 删除部门列
								$(
										$signRow[0].cells[me._cellLayoutDeptNameCellIndex])
										.remove();
							}
						}
						$signRow.insertBefore(first);
					} else {
						// 删除部门列
						if (me._cellLayoutDeptNameCellIndex >= 0) {
							$(
									$signRow[0].cells[me._cellLayoutDeptNameCellIndex])
									.remove();
						}
						$signRow.insertAfter($deptGroup[$deptGroup.length - 1]);
					}
				} else {
					// 删除部门列
					if (me._cellLayoutDeptNameCellIndex >= 0) {
						$($signRow[0].cells[me._cellLayoutDeptNameCellIndex])
								.remove();
					}
					$signRow.insertAfter($deptGroup[$deptGroup.length - 1]);
				}

				if (me._cellLayoutDeptNameCellIndex >= 0) {
					// 合并部门行
					$deptGroup = $(">tbody>tr[deptId='" + opt.fDeptId + "']",
							$table);
					$deptGroup[0].cells[me._cellLayoutDeptNameCellIndex].rowSpan = me._cellLayoutDeptNameRowSpan
							* $deptGroup.length;
				}
			}
		} else {
			if (sort) {
				// 人员排序
				var first;
				$(">tbody>tr[rowid]", $table).each(function() {
					var node = this;
					var o2 = $(node).attr("personOrder");
					if (me.orderComp(personOrder, o2) <= 0) {
						first = node;
						return false;
					}
				});
				if (first) {
					$signRow.insertBefore(first);
				} else {
					$signRow.appendTo($table);
				}
			} else {
				$signRow.appendTo($table);
			}
		}
		$signRow.mousedown(function() {
			var rowid = $(this).parents("tr[rowid]").attr("rowid");
			var idx = me.data.getIndex(rowid);
			me.data.setIndex(idx);
		});
		$signRow.dblclick(function() {
			me.edit();
		});
	};

	multiSign.prototype.browseDocByFileID = function(docPath, docName, fileID) {
		justep.doc.InnerUtils.browseDocByFileID(docPath, docName, fileID,
				"last", "content", 'OpenOffice');
	};

	multiSign.prototype.downloadDocByFileID = function(docPath, fileID) {
		justep.doc.InnerUtils.downloadDocByFileID(docPath, fileID);
	};

	multiSign.prototype._appendDefaultRow = function(rowID, sort) {
		var data = this.data, me = this;
		if (justep.XData.STATE.DELETE == data.getState(rowID))
			return;
		var signTime = me.transformDatetime(data.getValue("fSignTime", rowID));
		var signAttachment = "";
		if (me.attachment)
			signAttachment = data.getValue("fAttachment", rowID);
		var rowHeight = me.getHeaderHeight() ? (me.getHeaderHeight() - 1)
				+ "px" : "40px";
		rowHeight = "40px";
		var signInfoHeight = (me.getSignInfoHeight() - 1) + "px";

		var signInfoId = me.element.id + '_signInfo_' + rowID;
		var signAttachmentId = me.element.id + '_signAttachment_' + rowID;
		var downAttachmentId = me.element.id + '_downAttachment_' + rowID;
		var signTimeId = me.element.id + '_signTime_' + rowID;
		var personID = data.getValue("fPersonId", rowID);

		function createPersonTable() {
			var header = "<tr><td/><td style='width:50px'/><td style='width:30px'/><td style='width:100%'/><td style='WIDTH:140px'/><td style='width:160px'/></tr>";
			var rowSignInfo = "<tr>"
					+ "<td style='height:"
					+ signInfoHeight
					+ "'/>"
					+ "<td colSpan='5' style='height:"
					+ signInfoHeight
					+ ";border-bottom:1px dotted #ccc'><div class='signInfo' id='"
					+ signInfoId + "' style='overflow-y:auto;min-height:"
					+ signInfoHeight + ";' class='xui-autofill'/></td></tr>";
			var rowSignAttachment = "";
			if (!!signAttachment && signAttachment.length > 5) {
				var docName = JSON.parse(signAttachment)[0].docName;
				rowSignAttachment = "<tr>"
						+ "<td style='height:30px;'/>"
						+ "<td colSpan='4' style='height:30px;border-bottom:1px dotted #ccc'><a readonly='true' id='"
						+ signAttachmentId
						+ "'><span>附件：</span><span class='att_body_btn att_name_btn'>"
						+ docName
						+ "</span></a></td><td id='"
						+ downAttachmentId
						+ "' style='height:30px;border-bottom:1px dotted #ccc'>"
						+ "<a><span class='att_body_btn att_down_btn' style='float:right;padding-right:15px;'>下载<span></a></td></tr>";
			}
			var rowSignOther = "<tr><td style='height:" + rowHeight
					+ "'/><td></td><td></td>"
					+ "<td></td><td class='personName'>"
					+ data.getValue("fPersonName", rowID)
					+ "</td><td class='signTime' id='" + signTimeId + "'>"
					+ signTime + "</td></tr>";
			var personTable = "<table class='personTable "
					+ (personID == justep.Context.getCurrentPersonID() ? "currentPerson"
							: "")
					+ "' cellpadding='0' cellspacing='0' style='width:100%;table-layout:fixed;padding:2px 2px;text-align: left;vertial-align:bottom;border: 1px solid #ccc;'><tbody>"
					+ header + rowSignInfo + rowSignAttachment + rowSignOther
					+ "</tbody><table>";
			return personTable;
		}

		var deptId = data.getValue("fDeptId", rowID);
		deptId = me.element.id + "_dept_" + deptId;

		var personOrder = data.getValue("fPersonOrder", rowID);

		function createDeptTable() {
			var header = "<tr><td style='width:60px'/><td style='width:100%'/></tr>";
			var personTable = createPersonTable();
			var rowTable = "<table id='"
					+ deptId
					+ "' cellpadding='0' cellspacing='0' style='width:100%;table-layout:fixed;padding:2px 2px;text-align: left;vertial-align:bottom;border: 1px solid #ccc;'><tbody>"
					+ header + "<tr><td rowSpan='1' class='deptName'>"
					+ data.getValue("fDeptName", rowID) + "</td><td rowid='"
					+ rowID + "' order='" + personOrder
					+ "' style='padding:6px 6px'>" + personTable + "</td></tr>"
					+ "</tbody><table>";
			return rowTable;
		}

		var $table = me.getTable();
		if (me.deptGroup) {
			var $dept = $("#" + deptId, $table);
			if ($dept.length == 0) {
				var deptOrder = data.getValue("fDeptOrder", rowID);
				if (sort) {
					var first;
					$(">tbody>tr[order]", $table).each(function() {
						var node = this;
						var o2 = $(node).attr("order");
						if (me.orderComp(deptOrder, o2) <= 0) {
							first = node;
							return false;
						}
					});
					if (first) {
						$(
								"<tr order='" + deptOrder
										+ "'><td style='padding:6px 6px'>"
										+ createDeptTable() + "</td></tr>")
								.insertBefore(first);
					} else {
						$table.append("<tr order='" + deptOrder
								+ "'><td style='padding:6px 6px'>"
								+ createDeptTable() + "</td></tr>");
					}
				} else {
					// 添加到最后
					$table.append("<tr order='" + deptOrder
							+ "'><td style='padding:6px 6px'>"
							+ createDeptTable() + "</td></tr>");
				}
				// 部门设置阴影
				if (me.shadow) {
					$(">tbody>tr>td>#" + deptId, $table).css("box-shadow",
							"2px 2px 4px 2px rgba(0,0,0,0.5)");
				}
			} else {
				var $tbody = $(">tbody", $dept);
				var $rowSpanTD = $(".deptName", $tbody);
				var rowSpan = parseInt($rowSpanTD.attr("rowSpan"));
				$rowSpanTD.attr("rowSpan", rowSpan + 1);
				var personTable = createPersonTable();
				// 查找第一个顺序号大于等于我的，插入到它之前
				if (sort) {
					var first;
					$("tr>td[rowid]", $tbody).each(function() {
						var node = this;
						var o2 = $(node).attr("order");
						if (me.orderComp(personOrder, o2) <= 0) {
							first = node.parentNode;
							return false;
						}
					});
					if (!first) {
						// 添加到部门最后
						$tbody.append("<tr><td rowid='" + rowID
								+ "' style='padding:6px 6px'>" + personTable
								+ "</td></tr>");
					} else if (first.rowIndex == 1) {
						// 添加到部门内的第一个，并删除原第一个的合并td
						$(
								"<tr>" + first.cells[0].outerHTML
										+ "<td rowid='" + rowID
										+ "' style='padding:6px 6px'>"
										+ personTable + "</td></tr>")
								.insertBefore(first);
						$(first.cells[0]).remove();
					} else {
						// 添加到first之前
						$(
								"<tr><td rowid='" + rowID
										+ "' style='padding:6px 6px'>"
										+ personTable + "</td></tr>")
								.insertBefore(first);
					}

				} else {
					// 添加到部门最后
					$tbody.append("<tr><td rowid='" + rowID
							+ "' style='padding:6px 6px'>" + personTable
							+ "</td></tr>");
				}

			}

		} else {
			if (sort) {
				// 查找第一个顺序号大于等于我的，插入到它之前
				var first;
				$(">tbody>tr[rowid]", $table).each(function() {
					var node = this;
					var o2 = $(node).attr("order");
					if (me.orderComp(personOrder, o2) <= 0) {
						first = node;
						return false;
					}
				});
				if (!first) {
					// 添加到最后
					$table.append("<tr rowid='" + rowID + "' order='"
							+ personOrder + "'><td style='padding:6px 6px'>"
							+ createPersonTable() + "</td></tr>");
				} else {
					// 添加到first之前
					$(
							"<tr rowid='" + rowID + "' order='" + personOrder
									+ "'><td style='padding:6px 6px'>"
									+ createPersonTable() + "</td></tr>")
							.insertBefore(first);
				}

			} else {
				// 添加到最后
				$table.append("<tr rowid='" + rowID + "' order='" + personOrder
						+ "'><td style='padding:6px 6px'>"
						+ createPersonTable() + "</td></tr>");

			}
			// 人员设置阴影
			if (me.shadow) {
				$(">tbody>tr[rowid='" + rowID + "']>td>table", $table).css(
						"box-shadow", "2px 2px 4px 2px rgba(0,0,0,0.5)");
			}
		}
		$("#" + signInfoId, $table).dblclick(function() {
			me.edit();
		}).mousedown(function() {
			var rowid = $(this).parents("td[rowid]").attr("rowid");
			var idx = me.data.getIndex(rowid);
			me.data.setIndex(idx);
		}).html(data.getValue("fSignInfo", rowID));

		$("#" + signAttachmentId, $table).click(function() {
			var docName = JSON.parse(signAttachment)[0].docName;
			var docPath = JSON.parse(signAttachment)[0].docPath;
			var fileID = JSON.parse(signAttachment)[0].fileID;
			me.browseDocByFileID(docPath, docName, fileID);
		});

		$("#" + downAttachmentId, $table).click(function() {
			var docPath = JSON.parse(signAttachment)[0].docPath;
			var fileID = JSON.parse(signAttachment)[0].fileID;
			me.downloadDocByFileID(docPath, fileID);
		});
	};
	var com = global.com = global.com || {};
	com.butone = com.butone || {};
	com.butone.MultiSign = multiSign;
	return multiSign;

})(window);
