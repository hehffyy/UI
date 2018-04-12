(function(global) {
	var About_Blank = "about:blank";
	var portal = justep.Portal._isPortal2() ? justep.Portal._getPortal2().justep.Portal
			: justep.Portal._getJPolite().justep.Portal;
	if (portal && !portal.getGDCA) {
		console.error("portal没有getGDCA方法，api.js...");
	}
	var GDCA = portal && portal.getGDCA ? portal.getGDCA() : null;
	var jQuery;
	if (portal.getPortal && portal.getPortal() && portal.getPortal().jQuery) {
		jQuery = portal.getPortal().jQuery;
	} else {
		jQuery = window.jQuery;
	}
	/**
	 * 组件运行时的JS
	 */
	var sign = function(xbl) {
		this.domNode = xbl.domNode;
		var $C = $(xbl.domNode), ref = $C.attr("ref"), thisId = $C.attr("id");
		var info = ref.match(/(instance|data)\([\"\'](.*)[\"\']\)\/(.*)/i);
		this.data = justep.xbl(info[2]);
		this.signField = info[3];
		if (this.data && this.signField) {
			var relationInfo = this.data.getRelationInfo(this.signField
					+ "_DATA");
			if (relationInfo.relation) {
				this.signDataField = this.signField + "_DATA";
			}
		}
		this._menuId = thisId + "_signMenu";
		this._triggerId = thisId + "_trigger";

		this.signDateField = $C.attr("signDateField");

		// 获取保护字段 [data1.r1,data1.r2,data2.r1]
		this.protectFields = [];
		var protectFields = $C.attr('protectFields'); // 保护字段
		if (protectFields) {
			this.protectFields = protectFields.split(",");
		}

		this.useCA = !!GDCA;

		this.verifyPassword = $C.attr("verifyPassword") == "true";
		this.useSignImage = $C.attr("useSignImage") == "true";
		this.useSignDevice = $C.attr("useSignDevice") == "true"
				|| !!$C.attr("handWriteDevice");// 使用签名设备
		
		if (this.useSignImage) {
			var $input = $("#" + thisId + "_input", $C);
			$input.parent().css("width", $input.outerWidth());
			$input.hide();
			$(this.domNode).css("position", "relative");
			this.signImage = $("<img/>").appendTo(this.domNode).attr({
				id : thisId + "_img"
			}).css({
				"left" : "0px",
				"top" : "5px",
				"position" : "absolute",
				// "width":$input.parent().outerWidth(),
				"height" : $input.parent().outerHeight(),
				// "display" : "none",
				"z-index" : 100
			});
			var callback = function(event) {
				var self = this;
				window.setTimeout(function() {
					self.refreshSignImage();
				}, 200);
			};
			if (!justep.Client.MOBILE) {
				this.data.attachEvent(justep.XData.EVENT_REFRESHPAGEDATA_AFTER,
						callback, this);
				this.data.attachEvent(justep.XData.EVENT_INDEX_CHANGED,
						callback, this);
				this.data
						.attachEvent(
								justep.Client.MOBILE ? justep.mobile.BizData.EventType.EVENT_REFRESHDATA_BEFORE
										: justep.XData.EVENT_REFRESHDATA_AFTER,
								callback, this);
			}

			var refControl = $input[0];
			if (refControl) {
				refControl.refreshCallback = function(refC) {
					refC.readonly ? this.disableImageMover() : this.enableImageMover();
				}.bind(this);
				refControl.refreshCallback(refControl.xformsObject);
			}
		}
		// 签字按钮禁用时隐藏
		var trigger = $("#" + this._triggerId,this.domNode)[0];
		if (trigger) {
			trigger.refreshCallback = function(refC) {
				var $ele = $(refC.element);
				$ele.hasClass("xforms-disabled")?$ele.parent().hide():$ele.parent().show();
			}.bind(this);
			trigger.refreshCallback(trigger.xformsObject);
		}

	};

	function getPosition(g, c) {
		if (!c) {
			var c = document.body
		}
		var b = g;
		var f = 0;
		var e = 0;
		while ((b) && (b != c)) {
			f += b.offsetLeft - b.scrollLeft;
			e += b.offsetTop - b.scrollTop;
			b = b.offsetParent
		}
		return new Array(f, e);
	}

	sign.prototype = {
		/**
		 * 静止拖动图片
		 */
		disableImageMover : function() {
			if (this.signImage.draggable
					&& this.signImage.draggable("instance")) {
				this.signImage.draggable('destroy');
			}
		},
		/**
		 * 开启图片拖动
		 */
		enableImageMover : function() {
			if (!this.signImage.draggable)
				return;

			var stop = function(event) {
				var pos = $(event.target || event.srcElement).position();
				var signData = JSON.parse(this.data
						.getValue(this.signDataField));
				signData.signImage.left = pos.left;
				signData.signImage.top = pos.top;
				this.data
						.setValue(this.signDataField, JSON.stringify(signData));
			}.bind(this);
			this.signImage.draggable({
				distance : 5,
				stop : stop
			});
		},
		/**
		 * 显示按钮
		 */
		showMenu : function() {
			var menu = justep.xbl(this._menuId), domNode = justep
					.xbl(this._triggerId).element;
			// if (!this.signDataField) {
			// menu.menu.hideItem("toVerify");
			// }
			var h = getPosition(domNode);
			window.setTimeout(function() {
				menu.showContextMenu(h[0], h[1] + domNode.offsetHeight);
			}, 100);
		},

		/**
		 * 更新签名数据
		 * 
		 * @param imgID
		 */
		_doUpdateSignData : function(imgID) {
			// 签名日期
			if (this.signDateField) {
				if (this.data.getRelationInfo(this.signDateField).type == 'Date') {
					this.data.setValue(this.signDateField, justep.Date
							.toString(justep.System.datetime(),
									justep.Date.STANDART_FORMAT_SHOT));
				} else {
					this.data.setValue(this.signDateField, justep.Date
							.toString(justep.System.datetime(),
									justep.Date.STANDART_FORMAT));
				}
			}
			this.data.setValue(this.signField, justep.Context
					.getCurrentPersonMemberNameWithAgent());
			// 进行数据加密计算 ，设置密文
			if (this.signDataField) {
				// 转换(JSON)保护字段
				var data;
				try {
					data = this._calcProtectData(this.protectFields);
					// 考虑是否提交数据，用户可能签名后又修改被保护的字段（如何控制？？）
				} catch (e) {
					butone.Components.Sign
							.showMessage(
									"提示信息",
									"加密签名数据失败："
											+ e.message
											+ "<br><font color='red'>系统将清除您的签名信息，请您重新进行签名操作</font>",
									0, "error");
					this.data.setValue(this.signField, "");
					if (this.signDateField)
						this.data.setValue(this.signDateField, "");
					return;
				}
				if (imgID) {
					// var pos = getPosition(this.domNode);
					data.signImage = {
						rowid : imgID,
						left : 0,
						top : 0
					};
				}
				// 设置加密字段的值
				this.data.setValue(this.signDataField, JSON.stringify(data));
			}
		},

		/**
		 * 通过图片签名
		 */
		_doSignByImage : function() {
			var me = this;
			var imgs = butone.Components.Sign.getSignImages() || [];
			if (imgs.length == 1) {
				me._doUpdateSignData(imgs[0].rowid);
				me.refreshSignImage();
			} else {
				butone.Window.dialog({
					id : "wd_signImageSelector",
					title : "签名图片",
					status : "maximize",
					url : "/UI/system/components/sign/signImageSelector.w",
					data : imgs,
					onReceive : function(event) {
						setTimeout(function() {
							me._doUpdateSignData(event.data);
							me.refreshSignImage();
						}, 10);
					}
				});
			}
		},
		/**
		 * 通过签名设备签名
		 */
		_doSignByDevice : function() {
			var me = this;
			butone.Window
					.dialog({
						id : "wd_signImageSelector",
						title : "签批屏",
						width : "800px",
						height : "300px",
						// status : "maximize",
						url : "/UI/common/otherPlugin/process/otherPlugin/hwSignActivity.w",
						data : null,
						onReceive : function(event) {
							setTimeout(function() {
								me._doUpdateSignData(event.data);
								me.refreshSignImage();
							}, 10);
						}
					});
		},
		/**
		 * 签名
		 * 
		 * @param evt
		 * @param menuName
		 */
		_signClick : function() {
			// 判断是否已经签名
			var signName = this.data.getValue(this.signField);// 获取签名字段
			// 如果签名字段为空
			if (!signName) {
				if (this.useSignImage && this.signDataField) {
					if (this.useSignDevice) {
						butone.Dialog.question("确认使用签批屏吗?", "", function(evt) {
							if (evt.status == "yes")
								this._doSignByDevice();
							else
								this._doSignByImage();
						});
					} else
						this._doSignByImage();
				} else {
					this._doUpdateSignData();
				}
			}
			// 弹出下拉菜单
			else {
				this.showMenu();
			}
		},

		/**
		 * 刷新签名图片
		 */
		refreshSignImage : function() {
			if (this.signDataField && this.useSignImage) {
				var signDataStr = this.data.getValue(this.signDataField), imgAttr, imgPos;
				if (signDataStr) {
					try {
						var signData = JSON.parse(signDataStr);
						if (signData.signImage && signData.signImage.rowid) {
							imgAttr = {
								src : (justep.Request
										.setBizParams(justep.Request
												.convertURL("/UI/system/service/common/bizAction.j")
												+ "&blobDataModel=/base/personInfo/data"
												+ "&blobConcept=B_PersonSignImage"
												+ "&blobRelation=fImage"
												+ "&blobConceptValue="
												+ signData.signImage.rowid
												+ "&process="
												+ justep.Context
														.getCurrentProcess()
												+ "&activity="
												+ justep.Context
														.getCurrentActivity()
												+ "&action=blobDownloadAction"
												+ "&$query-version="
												+ (new justep.UUID()).valueOf()))
							};
							imgPos = {
								left : signData.signImage.left,
								top : signData.signImage.top
							};
						} else {
							imgAttr = {
								src : About_Blank,
								alt : "无签名信息"
							};
						}
					} catch (e) {
						imgAttr = {
							src : About_Blank,
							alt : "签名数据无效"
						};
					}
					// if (!imgPos || !!imgPos.hasOwnProperty("left")
					// || !!imgPos.hasOwnProperty("top")) {
					// var pos = getPosition(this.domNode);
					// imgPos = {
					// left : pos[0],
					// top : pos[1]
					// };
					// }
					imgPos && this.signImage.css(imgPos);
					this.signImage.show();
				} else {
					imgAttr = {
						src : About_Blank
					};
					this.signImage.hide();
				}
				this.signImage.attr(imgAttr);
			}
		},

		/**
		 * 计算[加密]要保护数据
		 * 
		 * @param protectFields
		 * @returns {Object}
		 */
		_calcProtectData : function(protectFields) {
			var signData = new Object(), protectData = butone.Components.Sign
					.getProtectData(this.data, protectFields, {
						signField : this.signField,
						signDateField : this.signDateField
					});
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
						throw justep.Error.create("初始化GDCA错误," + err);
					});
				}
			} else {
				signData.encryptData = hex_md5(protectData.text);
			}
			return signData;
		},

		/**
		 * 验证/清除
		 * 
		 * @param evt
		 */
		_menuClick : function(evt) {
			var itemId = evt.getData().menuitem.label;
			if (itemId == "验证") {
				var ret = butone.Components.Sign.getSignVerifyInfo(this.data, {
					signField : this.signField,
					signDateField : this.signDateField,
					signDataField : this.signDataField
				});
				butone.Components.Sign.showMessage("验证信息",
						ret.tag == 0 ? "验证通过" : ("验证不通过," + ret.msg), 0,
						ret.tag == 0 ? "right" : "error", ret.details);
			} else if (itemId == "清除") {
				this.toClear();
			} else if (itemId == "重置位置") {
				this.signImage && this.signImage.css({
					left : 0,
					top : 0
				});
			}
		},

		/**
		 * 验证签名 返回验证结果 {tag,msg},tag<0 验证不通过
		 * 
		 * @returns {Object}
		 */
		toVerify : function() {
			return butone.Components.Sign.signVerify(this.data, {
				signField : this.signField,
				signDateField : this.signDateField,
				signDataField : this.signDataField
			});
		},

		/**
		 * 清除签名
		 */
		toClear : function() {
			// 清除签名
			this.data.setValue(this.signField, "");
			if (this.signDataField) {
				this.data.setValue(this.signDataField, "");
			}
			if (this.signDateField) {
				this.data.setValue(this.signDateField, null);
			}
			if (this.useSignImage) {
				this.refreshSignImage();
			}
		}
	};

	var com = global.com = global.com || {};
	com.butone = com.butone || {};
	com.butone.Sign = sign;
	return sign;
})(window);
