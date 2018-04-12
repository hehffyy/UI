/**
 * 流程相关的操作<br/>
 * 
 * @class 流程相关的操作
 */

justep.ProcessEngine = function(xblObject) {
	dhtmlxEventable(this);

	this._buildOperations(xblObject);

	this._dataType = xblObject.domNode.getAttribute("data-type");
	this._id = xblObject.domNode.getAttribute("id");
	this._processDialogID = this.id + "_processDialog";
	this._processDialogWindow = xblObject.domNode.getAttribute("dialog-window");
	this._processDialogHeight = xblObject.domNode.getAttribute("dialog-height") == "" ? 480
			: xblObject.domNode.getAttribute("dialog-height") * 1;
	this._processDialogWidth = xblObject.domNode.getAttribute("dialog-width") == "" ? 600
			: xblObject.domNode.getAttribute("dialog-width") * 1;

	if (!this._processDialogWindow) {
		this._processDialogWindow = "/UI/system/service/process/dialogs/processDialog.w";
	}

	this._isOldVersion = ("true" == xblObject.domNode
			.getAttribute("old-version"));
	/*
	 * if (!this._processDialogWindow){ this._isOldVersion = true; }
	 */
	if (this._isOldVersion && (this._dataType == "json")) {
		var msg = new justep.Message(justep.Message.JUSTEP230000);
		throw justep.Error.create(msg);
	}

	// 设置auto close
	{
		var autoCloseAttr = xblObject.domNode.getAttribute("auto-close");
		if (autoCloseAttr && (autoCloseAttr == "false")) {
			this._autoClose = false;
		} else {
			this._autoClose = true;
		}
	}

	// 设置data
	{
		var dataAttr = xblObject.domNode.getAttribute("data");
		if (dataAttr) {
			this._data = justep.xbl(dataAttr);
			if (!this._data) {
				var msg = new justep.Message(justep.Message.JUSTEP230001,
						dataAttr);
				throw justep.Error.create(msg);
			}
		}
	}

	// 设置auto start
	{
		var autoStartAttr = xblObject.domNode.getAttribute("auto-start");
		if (autoStartAttr && (autoStartAttr == "false")) {
			this._autoStart = false;
		} else {
			this._autoStart = true;
			if (this._data) {
				var processObj = this;
				var data = this._data;
				this._data.attachEvent(justep.XData.EVENT_SAVEDATA_AFTER,
						function(event) {
							if (xblObject.isAutoStart()) {
								var dataObj = event.source;
								var rowid = dataObj.getCurrentRowId();
								var state = dataObj.getRowState(rowid);
								if ("new" == state) {
									processObj.start(null, null, rowid);
								}
							}
						}, data);

			} else {
				var msg = new justep.Message(justep.Message.JUSTEP230002,
						"auto-start");
				throw justep.Error.create(msg);
			}
		}
	}

	// 设置auto save
	{
		var autoSaveAttr = xblObject.domNode.getAttribute("auto-save");
		if (autoSaveAttr && (autoSaveAttr == "false")) {
			this._autoSave = false;
		} else {
			this._autoSave = true;
			if (!this._data) {
				var msg = new justep.Message(justep.Message.JUSTEP230002,
						"auto-save");
				throw justep.Error.create(msg);
			}
		}
	}

	// 设置auto filter
	{
		var autoFilterAttr = xblObject.domNode.getAttribute("auto-filter");
		if (autoFilterAttr && (autoFilterAttr == "false")) {
			this._autoFilter = false;
		} else {
			this._autoFilter = true;
			if (this._data) {
				/*
				 * this._data.attachEvent(justep.XData.EVENT_REFRESHDATA_BEFORE,
				 * function(event){ debugger; if (xblObject.isAutoFilter()){ var
				 * conceptName = event.source.getConceptAliasName(); var value =
				 * justep.Context.getProcessData1(); var condition = null; if
				 * (value){ condition = conceptName + "='" + value + "'"; }else{
				 * condition = "1=0"; }
				 * event.source.setFilter("_process-filter_", condition); }else{
				 * event.source.setFilter("_process-filter_", "1=1"); } },
				 * this._data);
				 */
			} else {
				var msg = new justep.Message(justep.Message.JUSTEP230002,
						"auto-filter");
				throw justep.Error.create(msg);
			}
		}
	}

	var data = xblObject.getElementByXblID("_processInputData_");
	this._processControlDialog = document.getElementById(data
			.getAttribute('processControlDialogID')).xformsObject; // chrome
	this._processConfirmDialog = document.getElementById(data
			.getAttribute('processConfirmDialogID')).xformsObject; // chrome
	this._processConfirmContent = xblObject.getElementByXblID(data
			.getAttribute('processConfirmContentID')); // chrome
	this._iframeID = data.getAttribute('iframeID'); // chrome

	this._customizedDialogID = data.getAttribute('customizedDialogID');
	this._customizedDialogIFrameID = data
			.getAttribute('customizedDialogIFrameID');

	this._processChartDialogID = data.getAttribute('processChartDialogID');

	var processControlDialog = this._processControlDialog;
	document.getElementById(this._iframeID).callback = function(isOk,
			processControlXMLString) {
		processControlDialog._isOk = isOk;
		if (isOk) {
			processControlDialog._processControl = new justep.ProcessControl();
			processControlDialog._processControl
					.loadFromXml(processControlXMLString);
		}
		processControlDialog.close();
	};

	this.BEFORE_START = "onBeforeStart";
	this.AFTER_START = "onAfterStart";
	this.START_COMMIT = "onStartCommit";
	this.START_ERROR = "onStartError";

	this._addListener(this.BEFORE_START, xblObject.domNode
			.getAttribute(this.BEFORE_START), xblObject);
	this._addListener(this.AFTER_START, xblObject.domNode
			.getAttribute(this.AFTER_START), xblObject);
	this._addListener(this.START_COMMIT, xblObject.domNode
			.getAttribute(this.START_COMMIT), xblObject);
	this._addListener(this.START_ERROR, xblObject.domNode
			.getAttribute(this.START_ERROR), xblObject);

	this.BEFORE_EXECUTE = "onBeforeExecute";
	this.BEFORE_ADVANCE = "onBeforeAdvance";
	this.AFTER_ADVANCE = "onAfterAdvance";
	this.ADVANCE_COMMIT = "onAdvanceCommit";
	this.ADVANCE_ERROR = "onAdvanceError";
	this.BEFORE_ADVANCE_QUERY = "onBeforeAdvanceQuery";
	this.AFTER_ADVANCE_QUERY = "onAfterAdvanceQuery";
	this.ADVANCE_QUERY_ERROR = "onAdvanceQueryError";
	this.BEFORE_OPEN_DIALOG = "onBeforeOpenDialog";
	// TODO tkj
	this.BEFORE_CREATE_DIALOG = "onBeforeCreateDialog";

	this._addListener(this.BEFORE_EXECUTE, xblObject.domNode
			.getAttribute(this.BEFORE_EXECUTE), xblObject);
	this._addListener(this.BEFORE_ADVANCE, xblObject.domNode
			.getAttribute(this.BEFORE_ADVANCE), xblObject);
	this._addListener(this.AFTER_ADVANCE, xblObject.domNode
			.getAttribute(this.AFTER_ADVANCE), xblObject);
	this._addListener(this.ADVANCE_COMMIT, xblObject.domNode
			.getAttribute(this.ADVANCE_COMMIT), xblObject);
	this._addListener(this.ADVANCE_ERROR, xblObject.domNode
			.getAttribute(this.ADVANCE_ERROR), xblObject);
	this._addListener(this.BEFORE_ADVANCE_QUERY, xblObject.domNode
			.getAttribute(this.BEFORE_ADVANCE_QUERY), xblObject);
	this._addListener(this.AFTER_ADVANCE_QUERY, xblObject.domNode
			.getAttribute(this.AFTER_ADVANCE_QUERY), xblObject);
	this._addListener(this.ADVANCE_QUERY_ERROR, xblObject.domNode
			.getAttribute(this.ADVANCE_QUERY_ERROR), xblObject);
	this._addListener(this.BEFORE_OPEN_DIALOG, xblObject.domNode
			.getAttribute(this.BEFORE_OPEN_DIALOG), xblObject);
	this._addListener(this.BEFORE_CREATE_DIALOG, xblObject.domNode
			.getAttribute(this.BEFORE_CREATE_DIALOG), xblObject);

	this.BEFORE_BACK = "onBeforeBack";
	this.AFTER_BACK = "onAfterBack";
	this.BACK_COMMIT = "onBackCommit";
	this.BACK_ERROR = "onBackError";
	this.BEFORE_BACK_QUERY = "onBeforeBackQuery";
	this.AFTER_BACK_QUERY = "onAfterBackQuery";
	this.BACK_QUERY_ERROR = "onBackQueryError";

	this._addListener(this.BEFORE_BACK, xblObject.domNode
			.getAttribute(this.BEFORE_BACK), xblObject);
	this._addListener(this.AFTER_BACK, xblObject.domNode
			.getAttribute(this.AFTER_BACK), xblObject);
	this._addListener(this.BACK_COMMIT, xblObject.domNode
			.getAttribute(this.BACK_COMMIT), xblObject);
	this._addListener(this.BACK_ERROR, xblObject.domNode
			.getAttribute(this.BACK_ERROR), xblObject);
	this._addListener(this.BEFORE_BACK_QUERY, xblObject.domNode
			.getAttribute(this.BEFORE_BACK_QUERY), xblObject);
	this._addListener(this.AFTER_BACK_QUERY, xblObject.domNode
			.getAttribute(this.AFTER_BACK_QUERY), xblObject);
	this._addListener(this.BACK_QUERY_ERROR, xblObject.domNode
			.getAttribute(this.BACK_QUERY_ERROR), xblObject);

	this.BEFORE_ABORT = "onBeforeAbort";
	this.AFTER_ABORT = "onAfterAbort";
	this.ABORT_COMMIT = "onAbortCommit";
	this.ABORT_ERROR = "onAbortError";
	this.BEFORE_ABORT_QUERY = "onBeforeAbortQuery";
	this.AFTER_ABORT_QUERY = "onAfterAbortQuery";
	this.ABORT_QUERY_ERROR = "onAbortQueryError";

	this._addListener(this.BEFORE_ABORT, xblObject.domNode
			.getAttribute(this.BEFORE_ABORT), xblObject);
	this._addListener(this.AFTER_ABORT, xblObject.domNode
			.getAttribute(this.AFTER_ABORT), xblObject);
	this._addListener(this.ABORT_COMMIT, xblObject.domNode
			.getAttribute(this.ABORT_COMMIT), xblObject);
	this._addListener(this.ABORT_ERROR, xblObject.domNode
			.getAttribute(this.ABORT_ERROR), xblObject);
	this._addListener(this.BEFORE_ABORT_QUERY, xblObject.domNode
			.getAttribute(this.BEFORE_ABORT_QUERY), xblObject);
	this._addListener(this.AFTER_ABORT_QUERY, xblObject.domNode
			.getAttribute(this.AFTER_ABORT_QUERY), xblObject);
	this._addListener(this.ABORT_QUERY_ERROR, xblObject.domNode
			.getAttribute(this.ABORT_QUERY_ERROR), xblObject);

	this.BEFORE_SUSPEND = "onBeforeSuspend";
	this.AFTER_SUSPEND = "onAfterSuspend";
	this.SUSPEND_COMMIT = "onSuspendCommit";
	this.SUSPEND_ERROR = "onSuspendError";
	this.BEFORE_SUSPEND_QUERY = "onBeforeSuspendQuery";
	this.AFTER_SUSPEND_QUERY = "onAfterSuspendQuery";
	this.SUSPEND_QUERY_ERROR = "onSuspendQueryError";

	this._addListener(this.BEFORE_SUSPEND, xblObject.domNode
			.getAttribute(this.BEFORE_SUSPEND), xblObject);
	this._addListener(this.AFTER_SUSPEND, xblObject.domNode
			.getAttribute(this.AFTER_SUSPEND), xblObject);
	this._addListener(this.SUSPEND_COMMIT, xblObject.domNode
			.getAttribute(this.SUSPEND_COMMIT), xblObject);
	this._addListener(this.SUSPEND_ERROR, xblObject.domNode
			.getAttribute(this.SUSPEND_ERROR), xblObject);
	this._addListener(this.BEFORE_SUSPEND_QUERY, xblObject.domNode
			.getAttribute(this.BEFORE_SUSPEND_QUERY), xblObject);
	this._addListener(this.AFTER_SUSPEND_QUERY, xblObject.domNode
			.getAttribute(this.AFTER_SUSPEND_QUERY), xblObject);
	this._addListener(this.SUSPEND_QUERY_ERROR, xblObject.domNode
			.getAttribute(this.SUSPEND_QUERY_ERROR), xblObject);

	this.BEFORE_TRANSFER = "onBeforeTransfer";
	this.AFTER_TRANSFER = "onAfterTransfer";
	this.TRANSFER_COMMIT = "onTransferCommit";
	this.TRANSFER_ERROR = "onTransferError";
	this.BEFORE_TRANSFER_QUERY = "onBeforeTransferQuery";
	this.AFTER_TRANSFER_QUERY = "onAfterTransferQuery";
	this.TRANSFER_QUERY_ERROR = "onTransferQueryError";

	this._addListener(this.BEFORE_TRANSFER, xblObject.domNode
			.getAttribute(this.BEFORE_TRANSFER), xblObject);
	this._addListener(this.AFTER_TRANSFER, xblObject.domNode
			.getAttribute(this.AFTER_TRANSFER), xblObject);
	this._addListener(this.TRANSFER_COMMIT, xblObject.domNode
			.getAttribute(this.TRANSFER_COMMIT), xblObject);
	this._addListener(this.TRANSFER_ERROR, xblObject.domNode
			.getAttribute(this.TRANSFER_ERROR), xblObject);
	this._addListener(this.BEFORE_TRANSFER_QUERY, xblObject.domNode
			.getAttribute(this.BEFORE_TRANSFER_QUERY), xblObject);
	this._addListener(this.AFTER_TRANSFER_QUERY, xblObject.domNode
			.getAttribute(this.AFTER_TRANSFER_QUERY), xblObject);
	this._addListener(this.TRANSFER_QUERY_ERROR, xblObject.domNode
			.getAttribute(this.TRANSFER_QUERY_ERROR), xblObject);

	this.BEFORE_START_CUSTOMIZED_QUERY = "onBeforeStartCustomizedQuery";
	this.AFTER_START_CUSTOMIZED_QUERY = "onAfterStartCustomizedQuery";
	this.START_CUSTOMIZED_QUERY_ERROR = "onStartCustomizedQueryError";
	/*
	 * this.BEFORE_START_CUSTOMIZED = "onBeforeStartCustomized";
	 * this.AFTER_START_CUSTOMIZED = "onAfterStartCustomized";
	 * this.START_CUSTOMIZED_COMMIT = "onStartCustomizedCommit";
	 * this.START_CUSTOMIZED_ERROR = "onStartCustomizedError";
	 * 
	 * this._addListener(this.BEFORE_START_CUSTOMIZED,
	 * xblObject.domNode.getAttribute(this.BEFORE_START_CUSTOMIZED), xblObject);
	 * this._addListener(this.AFTER_START_CUSTOMIZED,
	 * xblObject.domNode.getAttribute(this.AFTER_START_CUSTOMIZED), xblObject);
	 * this._addListener(this.START_CUSTOMIZED_COMMIT,
	 * xblObject.domNode.getAttribute(this.START_CUSTOMIZED_COMMIT), xblObject);
	 * this._addListener(this.START_CUSTOMIZED_ERROR,
	 * xblObject.domNode.getAttribute(this.START_CUSTOMIZED_ERROR), xblObject);
	 */
	this._addListener(this.BEFORE_START_CUSTOMIZED_QUERY, xblObject.domNode
			.getAttribute(this.BEFORE_START_CUSTOMIZED_QUERY), xblObject);
	this._addListener(this.AFTER_START_CUSTOMIZED_QUERY, xblObject.domNode
			.getAttribute(this.AFTER_START_CUSTOMIZED_QUERY), xblObject);
	this._addListener(this.START_CUSTOMIZED_QUERY_ERROR, xblObject.domNode
			.getAttribute(this.START_CUSTOMIZED_QUERY_ERROR), xblObject);

	this.BEFORE_SPECIAL = "onBeforeSpecial";
	this.AFTER_SPECIAL = "onAfterSpecial";
	this.SPECIAL_COMMIT = "onSpecialCommit";
	this.SPECIAL_ERROR = "onSpecialError";
	this.BEFORE_SPECIAL_QUERY = "onBeforeSpecialQuery";
	this.AFTER_SPECIAL_QUERY = "onAfterSpecialQuery";
	this.SPECIAL_QUERY_ERROR = "onSpecialQueryError";

	this._addListener(this.BEFORE_SPECIAL, xblObject.domNode
			.getAttribute(this.BEFORE_SPECIAL), xblObject);
	this._addListener(this.AFTER_SPECIAL, xblObject.domNode
			.getAttribute(this.AFTER_SPECIAL), xblObject);
	this._addListener(this.SPECIAL_COMMIT, xblObject.domNode
			.getAttribute(this.SPECIAL_COMMIT), xblObject);
	this._addListener(this.SPECIAL_ERROR, xblObject.domNode
			.getAttribute(this.SPECIAL_ERROR), xblObject);
	this._addListener(this.BEFORE_SPECIAL_QUERY, xblObject.domNode
			.getAttribute(this.BEFORE_SPECIAL_QUERY), xblObject);
	this._addListener(this.AFTER_SPECIAL_QUERY, xblObject.domNode
			.getAttribute(this.AFTER_SPECIAL_QUERY), xblObject);
	this._addListener(this.SPECIAL_QUERY_ERROR, xblObject.domNode
			.getAttribute(this.SPECIAL_QUERY_ERROR), xblObject);

	this._customizedServiceURL = "/system/service/process/customizedProcess.w";
	this._customizedGraphWindow = "/system/service/process/customizedProcess2.w";
	this._customizedGraph2Window = "/SA/process/template/template.w";

	this._startAction = "externalStartProcessAction";
	this._advanceQueryAction = "externalAdvanceProcessQueryAction";
	this._advanceAction = "externalAdvanceProcessAction";
	this._backQueryAction = "externalBackProcessQueryAction";
	this._backAction = "externalBackProcessAction";
	this._abortQueryAction = "externalAbortProcessQueryAction";
	this._abortAction = "externalAbortProcessAction";
	this._suspendQueryAction = "externalSuspendProcessQueryAction";
	this._suspendAction = "externalSuspendProcessAction";
	this._transferQueryAction = "externalTransferTaskQueryAction";
	this._specialTransferQueryAction = "externalMultiTransferQueryAction";
	this._transferAction = "externalTransferTaskAction";
	this._specialQueryAction = "externalSpecialProcessQueryAction";
	this._specialAction = "externalSpecialProcessAction";

	// TODO
	this.AFTER_PREEMPT = "onAfterPreempt";
	this.AFTER_REVOKEPREEMPT = "onAfterRevokePreempt";
	this.AFTER_RESUME = "onAfterResume";

	this._addListener(this.AFTER_PREEMPT, xblObject.domNode
			.getAttribute(this.AFTER_PREEMPT), xblObject);
	this._addListener(this.AFTER_REVOKEPREEMPT, xblObject.domNode
			.getAttribute(this.AFTER_REVOKEPREEMPT), xblObject);
	this._addListener(this.AFTER_RESUME, xblObject.domNode
			.getAttribute(this.AFTER_RESUME), xblObject);

	this._task = null;
	// TODO TKJ
	this._customProcessDialog = {};

};

justep.supportOperation(justep.ProcessEngine);

// TODO tkj 默认对话框构造器
justep.ProcessEngine._dialogConstructor = justep.WindowDialog;

justep.ProcessEngine.prototype.isReadonly = function() {
	return justep.Context.isReadonlyMode();
};

// TODO 增加扩展的业务操作
justep.ProcessEngine.prototype._buildOperations = function(xblObject) {
	var me = this;
	this.defineOperation('advance', {
		label : new justep.Message(justep.Message.JUSTEP230003).getMessage(),
		src : '',
		disSrc : '',
		async : true,
		iconClass : 'icon-system-play',
		successHint : new justep.Message(justep.Message.JUSTEP230004)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		method : function(fn) {
			me.advanceQuery({
				"onSuccess" : fn
			});
		}
	});

	this.defineOperation('transfer', {
		label : new justep.Message(justep.Message.JUSTEP230005).getMessage(),
		src : '',
		disSrc : '',
		async : true,
		successHint : new justep.Message(justep.Message.JUSTEP230006)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		method : function(fn) {
			me.transferQuery({
				"onSuccess" : fn
			});
		}
	});

	this.defineOperation('special', {
		label : new justep.Message(justep.Message.JUSTEP230007).getMessage(),
		src : '',
		disSrc : '',
		async : true,
		successHint : new justep.Message(justep.Message.JUSTEP230008)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		method : function(fn) {
			me.specialQuery({
				"onSuccess" : fn
			});
		}
	});

	this.defineOperation('back', {
		label : new justep.Message(justep.Message.JUSTEP230009).getMessage(),
		src : '',
		disSrc : '',
		async : true,
		iconClass : 'icon-system-back',
		successHint : new justep.Message(justep.Message.JUSTEP230010)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		method : function(fn) {
			me.backQuery({
				"onSuccess" : fn
			});
		}
	});

	this.defineOperation('suspend', {
		label : '普通挂起',
		src : '',
		disSrc : '',
		async : true,
		iconClass : 'icon-system-pause',
		successHint : new justep.Message(justep.Message.JUSTEP230012)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		queryImpl : "suspendQuery",
		getExecuteOptions : function() {
			return {
				"suspendKind" : "skSuspend"
			};
		},
		method : function(fn) {
			me.suspendQuery($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.defineOperation('abort', {
		label : '作废办结',
		src : '',
		disSrc : '',
		async : true,
		iconClass : 'icon-system-stop',
		successHint : new justep.Message(justep.Message.JUSTEP230014)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		queryImpl : "abortQuery",
		getExecuteOptions : function() {
			return {
				"finishKind" : "fkAbort",
				"isAbort" : true
			};
		},
		method : function(fn) {
			me.abortQuery($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.defineOperation('executeList', {
		label : new justep.Message(justep.Message.JUSTEP230015).getMessage(),
		src : '',
		disSrc : '',
		method : function() {
			me.openExecuteListDialog();
		}
	});

	this.defineOperation('customized', {
		label : new justep.Message(justep.Message.JUSTEP230016).getMessage(),
		src : '',
		disSrc : '',
		iconClass : 'icon-system-config',
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		method : function() {
			me.startCustomizedQuery();
		}
	});

	this.defineOperation('showChart', {
		label : new justep.Message(justep.Message.JUSTEP230017).getMessage(),
		src : '',
		disSrc : '',
		iconClass : 'icon-system-flow-tree',
		method : function() {
			me.showChart();
		}
	});

	// TODO 操作扩展
	this.defineOperation('preempt', {
		label : '签 　　收',
		iconClass : 'icon-system-play',
		async : true,
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		method : function(fn) {
			me.preempt();
		}
	});

	this.defineOperation('revokePreempt', {
		label : '撤销签收',
		iconClass : 'icon-system-reply',
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		method : function(fn) {
			me.revokePreempt();
		}
	});

	this.defineOperation('batchAdvance', {
		label : '批量发送',
		async : true,
		iconClass : 'icon-system-play',
		successHint : new justep.Message(justep.Message.JUSTEP230004)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		queryImpl : "advanceQuery",
		getExecuteOptions : function() {
			return {
				"isBatch" : true
			};
		},
		method : function(fn) {
			me.advanceQuery($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.defineOperation('apprize', {
		label : '补正告知',
		async : false, // 异步使用method(fn)为 execute的参数,为了支持二次补正
		iconClass : 'icon-system-pause',
		successHint : new justep.Message(justep.Message.JUSTEP230012)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		queryImpl : "suspendQuery",
		getExecuteOptions : function() {
			return {
				"suspendKind" : "skApprize"
			};
		},
		method : function(fn) {
			if (!fn || typeof fn == "function")
				me.suspendQuery($.extend({
					"onSuccess" : fn
				}, this.getExecuteOptions()));
			else {
				// 二次补正
				me.suspendQuery(fn);
			}
		}
	});

	this.defineOperation('specialProcedure', {
		label : '特别程序',
		async : true,
		iconClass : 'icon-system-pause',
		successHint : new justep.Message(justep.Message.JUSTEP230012)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		queryImpl : "suspendQuery",
		getExecuteOptions : function() {
			return {
				"suspendKind" : "skSpecialProcedure"
			};
		},
		method : function(fn) {
			me.suspendQuery($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.defineOperation('submit', {
		label : '转报办结',
		async : true,
		iconClass : 'icon-system-pause',
		successHint : new justep.Message(justep.Message.JUSTEP230012)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		queryImpl : "suspendQuery",
		getExecuteOptions : function() {
			return {
				"suspendKind" : "skSubmit"
			};
		},
		method : function(fn) {
			me.suspendQuery($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.defineOperation('resume', {
		label : '解挂',
		async : true,
		iconClass : 'icon-system-play',
		getExecuteOptions : function() {
			return {
				"suspendKind" : "skSuspend",
				"dlgTitle" : this.label
			};
		},
		method : function(fn) {
			me.resume($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.defineOperation('apprizeAccept', {
		label : '补正受理',
		async : true,
		iconClass : 'icon-system-play',
		getExecuteOptions : function() {
			return {
				"suspendKind" : "skApprize",
				"dlgTitle" : this.label
			};
		},
		method : function(fn) {
			me.resume($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.defineOperation('specialProcResult', {
		label : '特别程序结果',
		async : true,
		iconClass : 'icon-system-play',
		getExecuteOptions : function() {
			return {
				"suspendKind" : "skSpecialProcedure",
				"dlgTitle" : this.label
			};
		},
		method : function(fn) {
			me.resume($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.defineOperation('apprizeAbort', {
		label : '补正不来办结',
		async : true,
		iconClass : 'icon-system-stop',
		successHint : new justep.Message(justep.Message.JUSTEP230014)
				.getMessage(),
		queryImpl : "abortQuery",
		getExecuteOptions : function() {
			return {
				"finishKind" : "fkApprizeAbort",
				"isAbort" : true
			};
		},
		method : function(fn) {
			me.abortQuery($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.defineOperation('untread', {
		label : '退文办结',
		async : true,
		iconClass : 'icon-system-stop',
		successHint : new justep.Message(justep.Message.JUSTEP230014)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		queryImpl : "abortQuery",
		getExecuteOptions : function() {
			return {
				"finishKind" : "fkUntread",
				"isAbort" : true
			};
		},
		method : function(fn) {
			me.abortQuery($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.defineOperation('delete', {
		label : '删除办结',
		async : true,
		iconClass : 'icon-system-stop',
		successHint : new justep.Message(justep.Message.JUSTEP230014)
				.getMessage(),
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		queryImpl : "abortQuery",
		getExecuteOptions : function() {
			return {
				"finishKind" : "fkDelete",
				"isAbort" : true
			};
		},
		method : function(fn) {
			me.abortQuery($.extend({
				"onSuccess" : fn
			}, this.getExecuteOptions()));
		}
	});

	this.customOperation(xblObject.getOperations());
};

/**
 * 定义指定名称的转发操作
 * 
 * @param action
 * @param name
 */
justep.ProcessEngine.prototype.defineSpecialTransferOperation = function(
		action, name) {
	var extParameters = new justep.Request.ActionParam;
	extParameters.setString("name", name);
	this.defineOperation(action, {
		label : name,
		src : '',
		disSrc : '',
		async : true,
		extParameters : extParameters,
		getInnerEnable : function() {
			return !this.owner.isReadonly();
		},
		queryImpl : "specialTransferQuery",
		getExecuteOptions : function() {
			return {
				"extParameters" : this.extParameters
			};
		},
		method : function(fn) {
			this.owner.specialTransferQuery({
				"onSuccess" : fn,
				"extParameters" : this.extParameters
			});
		}
	});
};

/**
 * 办理(抢占)
 */
justep.ProcessEngine.prototype.preempt = function(options) {
	var me = this;
	if (!me._YesNoDlg) {
		me._YesNoDlg = new justep.System.showMessage();
	}
	var agent = justep.Context.getCurrentPersonMemberNameWithAgent() != justep.Context
			.getCurrentPersonName() ? '【<font color="blue">代理'
			+ justep.Context.getCurrentPersonName() + '</font>】' : '';
	var deptName = justep.Context.getCurrentDeptName()? justep.Context.getCurrentDeptName(): justep.Context.getCurrentOgnName();
	me._YesNoDlg.open({
		msg : '是否' + agent + '办理【<font color="blue">' + deptName + '</font>】的案卷?',
		img : 'question',
		title : '提示信息',
		type : 2,
		callback : function(e) {
			if (e.status == "yes") {
				var param = new justep.Request.ActionParam();
				param.setString("task", me.getTask());
				param.setString("executor", justep.Context.getExecutor());
				justep.Request.sendBizRequest2({
					async : true,
					contentType : 'application/json',
					dataType : "json",
					parameters : param,
					action : "preemptTaskAction",
					callback : function(callbackData) {
						callbackData.ignoreError = false;
						if (callbackData.state) {
							var evt = {
								source : me
							};
							options && options.onSuccess
									&& options.onSuccess(evt);
							me.checkEvent(me.AFTER_PREEMPT)
									&& me.callEvent(me.AFTER_PREEMPT, [ evt ]);
						} else {
							options && options.onError && options.onError({
								data : callbackData.response
							});
							throw new Error(callbackData.response.message);
						}
					}
				});
			}
		}
	});
};

/**
 * 放弃办理
 */
justep.ProcessEngine.prototype.revokePreempt = function(options) {
	var param = new justep.Request.ActionParam();
	param.setString("task", this.getTask());
	var ret = justep.Request.sendBizRequest(null, null,
			"revokePreemptTaskAction", param, null, null, true);
	if (justep.Request.isSuccess(ret)) {
		var evt = {
			source : this
		};
		options && options.onSuccess && options.onSuccess(evt);
		this.checkEvent(this.AFTER_REVOKEPREEMPT)
				&& this.callEvent(this.AFTER_REVOKEPREEMPT, [ evt ]);
	} else {
		options && options.onError && options.onError({
			source : this,
			data : ret
		});
		throw new Error(justep.XML.eval(ret.responseXML,
				"/root/message/text()", "single").nodeValue);
	}
};

/**
 * 执行解挂
 */
justep.ProcessEngine.prototype.resume = function(options) {
	this.resumeExt(options);
};

justep.ProcessEngine.prototype._processResumeDialogOnReceice = function(event) {
	var me = this, task = me.getTask(), options = event.data.options;
	var execute = function() {
		var ret, suspendKind = options.suspendKind;
		if (suspendKind == "skApprize" && options.apprizeAgain) {
			// 如果是补正受理，并且是再次补正，执行挂起
			setTimeout(function() {
				me.getOperation("apprize").execute({
					onSuccess : options.onSuccess,
					apprizeAgain : true,
					suspendKind : suspendKind,
					paramExt : options.paramExt?options.paramExt:{}
				});
			}, 0);
		} else {
			// 解除挂起
			var param = new justep.Request.ActionParam();
			param.setString("task", task);
			var suspendInfo = new justep.Request.MapParam();
			suspendInfo.put("suspendKind", suspendKind);
			suspendInfo.put("tables", event.data.tables);
			param.setMap("suspendInfo", suspendInfo);
			ret = justep.Request.sendBizRequest(justep.Context
					.getCurrentProcess(), justep.Context.getCurrentActivity(),
					"butoneResumeProcessAction", param);
			if (justep.Request.isBizSuccess(ret)) {
				var evt = {
					source : me
				};
				options.onSuccess && options.onSuccess(evt);
				me.checkEvent(me.AFTER_RESUME)
						&& me.callEvent(me.AFTER_RESUME, [ evt ]);
			} else {
				options.onError && options.onError({
					source : action,
					data : ret
				});
				throw new Error(justep.XML.eval(ret.responseXML,
						"/root/message/text()", "single").nodeValue);
			}
		}
	};
	var beforeEventData = {
		'task' : task,
		'cancel' : false,
		'source' : me,
		'action' : "resume",
		'suspendKind' : options.suspendKind
	};
	if (me.checkEvent(me.BEFORE_EXECUTE)) {
		me.callEvent(me.BEFORE_EXECUTE, [ beforeEventData ]);
	}
	if (beforeEventData.cancel) {
		if (beforeEventData.continuePromise) {
			beforeEventData.continuePromise.done(function() {
				execute();
			});
		}
		return;
	}
	execute();
};

justep.ProcessEngine.prototype.resumeExt = function(options) {
	if (!options || !options.suspendKind) {
		throw new Error("缺少挂起类型参数");
	}
	var me = this, task = me.getTask();
	if (options.suspendKind == "skSuspend") {
		var execute = function() {
			// 解除挂起
			var param = new justep.Request.ActionParam();
			param.setString("task", task);
			var suspendInfo = new justep.Request.MapParam();
			suspendInfo.put("suspendKind", "skSuspend");
			param.setMap("suspendInfo", suspendInfo);
			ret = justep.Request.sendBizRequest(justep.Context
					.getCurrentProcess(), justep.Context.getCurrentActivity(),
					"butoneResumeProcessAction", param);
			if (justep.Request.isBizSuccess(ret)) {
				var evt = {
					source : me
				};
				options.onSuccess && options.onSuccess();
				me.checkEvent(me.AFTER_RESUME)
						&& me.callEvent(me.AFTER_RESUME, [ evt ]);

			} else {
				options.onError && options.onError({
					source : action,
					data : ret
				});
				throw new Error(justep.XML.eval(ret.responseXML,
						"/root/message/text()", "single").nodeValue);
			}
		};
		var beforeEventData = {
			'task' : task,
			'cancel' : false,
			'source' : me,
			'action' : "resume",
			'suspendKind' : options.suspendKind
		};
		if (me.checkEvent(me.BEFORE_EXECUTE)) {
			me.callEvent(me.BEFORE_EXECUTE, [ beforeEventData ]);
		}
		if (beforeEventData.cancel) {
			if (beforeEventData.continuePromise) {
				beforeEventData.continuePromise.done(function() {
					execute();
				});
			}
			return;
		}
		execute();

	} else {
		var url = null;
		if (me.checkEvent(me.BEFORE_CREATE_DIALOG)) {
			url = me.callEvent(me.BEFORE_CREATE_DIALOG, [ {
				"source" : me,
				"action" : "resumeQuery",
				"task" : task,
				"options" : options
			} ]);
		}
		var dialog = me._getProcessDialog("resume" + options.suspendKind, url,
				this._processResumeDialogOnReceice.bind(this));
		var eventData = {
			"source" : me,
			"action" : "resumeQuery",
			"task" : task,
			"options" : $.extend({}, options, {
				context : butone && butone.Context ? butone.Context : null
			}),
			"dialog" : dialog,
			"cancel" : false
		};
		if (me.checkEvent(me.BEFORE_OPEN_DIALOG)) {
			me.callEvent(me.BEFORE_OPEN_DIALOG, [ eventData ]);
		}
		if (eventData.cancel)
			return;
		dialog.open(eventData, options.dlgTitle);
	}

};

justep.ProcessEngine.prototype.canModifyExecutor = function() {
	return this.canModifyExecutorExt(this.getTask());
};

justep.ProcessEngine.prototype.canModifyExecutorExt = function(task) {
	var options = {};
	options.process = justep.Context.getCurrentProcess();
	options.activity = justep.Context.getCurrentActivity();
	options.action = "canModifyExecutorAction";
	var param = new justep.Request.ActionParam();
	param.setString("task", task);
	options.parameters = param;
	options.directExecute = true;
	var type = "applaction/json";
	options.contentType = type;
	options.dataType = type;
	var response = justep.Request.sendBizRequest2(options);
	if (justep.Request.isBizSuccess(response, type)) {
		var o = justep.Request.responseParseJSON(response);
		return o.data.value;
	} else {
		return false;
	}

};

justep.ProcessEngine.prototype.getProcessDialogOnReceive = function(operation) {
	if (operation.match("specialProcResult|apprizeAccept")) {
		// 特别程序结果和补正受理对话框消息处理
		return this._processResumeDialogOnReceice.bind(this);
	} else if (operation
			.match("advance|batchAdvance|back|abort|untread|delete|suspend|apprize|specialProcedure|submit|transfer|special|transfer")
			|| operation.indexOf(":transfer") > 0) {
		// 流程对话框消息处理
		return this._processDialogOnReceive.bind(this);
	} else {
		throw justep.Error.create("没有定义" + operation + "消息接受处理方法");
	}
};

justep.ProcessEngine.prototype.modifyExecutor = function(options) {
	this.modifyExecutorExt(this.getTask(), true);
};

justep.ProcessEngine.prototype.modifyExecutorExt = function(task, check,
		options) {
	if (check == false) {
		check = false;
	} else {
		check = true;
	}
	if (check) {
		if (!this.canModifyExecutorExt(task)) {
			var msg = new justep.Message(justep.Message.JUSTEP230018);
			alert(msg.getMessage());
			return;
		}
	}

	var dialog = this._getModifyExecutorDialog();
	dialog._task = task;
	dialog._check = check;
	dialog._options = options;
	dialog.open({
		"rootFilter" : "SA_OPOrg.sParent is null",
		"filter" : "",
		"manageCodes" : "",
		"orgKinds" : "",
		"includeDisabledOrg" : false,
		"cascade" : false
	});
};

justep.ProcessEngine.prototype._modifyExecutorDialogOnReceive = function(event) {
	if (event.data.length > 0) {
		var fid = event.data[0].sFID;
		var options = {};
		options.process = justep.Context.getCurrentProcess();
		options.activity = justep.Context.getCurrentActivity();
		options.action = "modifyExecutorAction";
		var param = new justep.Request.ActionParam();
		param.setString("task", this._getModifyExecutorDialog()._task);
		param.setString("fid", fid);
		param.setBoolean("check", this._getModifyExecutorDialog()._check);
		options.parameters = param;
		options.directExecute = true;
		var type = "applaction/json";
		options.contentType = type;
		options.dataType = type;
		var self = this;
		var onSuccessCB = this._getOption(
				this._getModifyExecutorDialog()._options, "onSuccess");
		options.callback = function(data) {
			if (data.state) {
				if (onSuccessCB) {
					onSuccessCB({
						"source" : self
					});
				}
				var msg = new justep.Message(justep.Message.JUSTEP230019);
				alert(msg.getMessage());
				if (self._autoClose) {
					setTimeout(function() {
						justep.Portal.closeWindow();
					}, 1);
				}
			}
		};
		justep.Request.sendBizRequest2(options);
	} else {
		var msg = new justep.Message(justep.Message.JUSTEP230020);
		alert(msg.getMessage());
	}
};

justep.ProcessEngine.prototype._getModifyExecutorDialog = function() {
	var self = this;
	var callback = function(event) {
		self._modifyExecutorDialogOnReceive(event);
	};

	if (!this._modifyExecutorDialog) {
		this._modifyExecutorDialog = new justep.WindowDialog(this.id
				+ "_modifyExecutorDialog",
				"/UI/system/components/orgDialog/dialogs/orgSingleSelect.w",
				"", true, null, "500px", "400px", null, null, false, null,
				callback);
	}
	return this._modifyExecutorDialog;
};

justep.ProcessEngine.prototype.withdrawTask = function() {
	this.withdrawTaskExt(this.getTask());
};

justep.ProcessEngine.prototype.withdrawTaskExt = function(task) {
	if ((task == null) || (task == undefined)) {
		var msg = new justep.Message(justep.Message.JUSTEP230021);
		alert(msg.getMessage());
	} else {
		var msg = new justep.Message(justep.Message.JUSTEP230022);
		if (confirm(msg.getMessage())) {

			var options = {};
			options.process = justep.Context.getCurrentProcess();
			options.activity = justep.Context.getCurrentActivity();
			options.action = "externalWithdrawTaskAction";
			var param = new justep.Request.ActionParam();
			param.setString("task", task);
			options.parameters = param;
			options.directExecute = true;
			var type = "applaction/json";
			options.contentType = type;
			options.dataType = type;
			var self = this;
			options.callback = function(data) {

				if (data.state) {
					var msg = new justep.Message(justep.Message.JUSTEP230023);
					alert(msg.getMessage());

					if (self._autoClose) {
						setTimeout(function() {
							justep.Portal.closeWindow();
						}, 1);
					}
				} else {

					alert(data.response.message);
					data.ignoreError = true;
				}
			};
			justep.Request.sendBizRequest2(options);
		}
	}
};

justep.ProcessEngine.prototype._addListener = function(name, funname, xblObject) {
	var fun = justep.Function.get(funname);
	if (fun != null) {
		this.attachEvent(name, fun, xblObject);
	}
};

justep.ProcessEngine.prototype._message = function() {
	alert("process component message");
};

justep.ProcessEngine.prototype.showChart = function() {
	justep.xbl(this._processChartDialogID).open();
};

/**
 * 获取最近的任务: 如果最近启动了流程，启动流程返回的任务；否则使用系统参数中的任务
 */
justep.ProcessEngine.prototype.getTask = function() {
	if (this._task != null) {
		return this._task;
	} else {
		return justep.Context.getTask();
	}
};

justep.ProcessEngine.prototype._getOption = function(options, name) {
	var result = undefined;
	if ((options != null) && (options != undefined)) {
		if ((options[name] != undefined) && (options[name] != null)) {
			result = options[name];
		}
	}

	return result;
};

/**
 * 启动流程[高级]
 * 
 * @param process
 *            流程标识, 为null时, 默认使用当前的process;
 * @param relations
 *            流程任务属性值列表
 * @param options
 *            可选参数, 是一个json格式, 有以下三个参数executor，onSuccess和onError, executor:
 *            表示首环节的执行者，可以不指定, 这时默认就是当前人员成员; onSuccess: 表示启动流程成功后的回调函数,
 *            回调函数的参数event结构如下：{"source":组件的js对象}; onError: 表示启动流程失败后的回调函数
 *            回调函数的参数event结构如下：{"source":组件的js对象}; 格式如下：{"executor": {String},
 *            "onSuccesss": {Function}, "onError": {Function}}
 * @return boolean
 */

justep.ProcessEngine.prototype.startExt = function(process, relations, options) {
	var executor = this._getOption(options, "executor");
	if ((executor == undefined) || (executor == null)) {
		executor = "";
	}
	var onSuccessCB = this._getOption(options, "onSuccess");
	var onErrorCB = this._getOption(options, "onError");

	var begineExecute = false;
	try {
		if ((relations["sData1"] == undefined) || (relations["sData1"] == null)) {
			var msg = new justep.Message(justep.Message.JUSTEP230024);
			throw justep.Error.create(msg);
		}

		var currentProcess = justep.Context.getCurrentProcess();
		var currentActivity = justep.Context.getCurrentActivity();
		if ((process == undefined) && (process == null)) {
			process = currentProcess;
		}

		begineExecute = justep.Request.beginBatch();
		if (!begineExecute) {
			var msg = new justep.Message(justep.Message.JUSTEP230025);
			throw justep.Error.create(msg);
		}

		var beforeEventData = {
			'process' : process,
			"relations" : relations,
			"executor" : executor,
			"cancel" : false,
			"source" : this
		};
		if (this.checkEvent(this.BEFORE_START)) {
			this.callEvent(this.BEFORE_START, [ beforeEventData ]);
		}

		if (beforeEventData.cancel) {
			justep.Request.cancelBatch();
			return false;
		}

		var params = new justep.Request.ActionParam();
		params.setString("process", process);
		params.setString("executor", executor);
		params.setNULL("control");

		var attributes = new justep.Request.MapParam();
		for ( var p in relations) {
			if ((relations[p] != undefined) && (relations[p] != null)) {
				attributes.put(p, relations[p]);
			}
		}
		params.setMap("attributes", attributes);

		var self = this;
		var options = {
			'contentType' : "application/xml",
			'dataType' : "application/json",
			'process' : currentProcess,
			'activity' : currentActivity,
			'action' : self._startAction,
			'parameters' : params,
			'callback' : function(data) {
				if (data.state) {
					if (data.response && data.response.length > 0
							&& data.response[0] && data.response[0].task) {
						self._task = data.response[0].task;

						// hcr 启动之后设置justep.Context.setTask
						justep.Context.setTask(self._task);
						justep.Context.setProcessData1(relations["sData1"]);
					} else {
						self._task = null;
					}

					var commitAfterEventData = {
						'process' : process,
						"relations" : relations,
						"executor" : executor,
						"task" : self._task,
						"cancel" : false,
						"source" : self
					};

					if (onSuccessCB) {
						onSuccessCB({
							"source" : self
						});
					}

					if (self.checkEvent(self.START_COMMIT)) {
						self.callEvent(self.START_COMMIT,
								[ commitAfterEventData ]);
					}

				} else {
					var commitErrorEventData = {
						'process' : process,
						"relations" : relations,
						"executor" : executor,
						"errorType" : "server",
						"errorNode" : data.response,
						"cancel" : false,
						"source" : self
					};
					if (onErrorCB) {
						onErrorCB({
							"source" : self
						});
						onErrorCB = undefined;
					}
					if (self.checkEvent(self.START_ERROR)) {
						self.callEvent(self.START_ERROR,
								[ commitErrorEventData ]);
					}

					data.ignoreError = commitErrorEventData.cancel;
				}
			}
		};

		justep.Request.sendBizRequest2(options);

		var afterEventData = {
			'process' : process,
			"relations" : relations,
			"executor" : executor,
			"cancel" : false,
			"source" : this
		};
		if (this.checkEvent(this.AFTER_START)) {
			this.callEvent(this.AFTER_START, [ afterEventData ]);
		}

		if (afterEventData.cancel) {
			justep.Request.cancelBatch();
			return false;
		}

		justep.Request.endBatch();
		begineExecute = false;

		return true;
	} catch (e) {
		if (begineExecute) {
			justep.Request.cancelBatch();
		}

		var errorEventData = {
			'process' : process,
			"relations" : relations,
			"executor" : executor,
			"cancel" : false,
			"errorType" : "client",
			"error" : e,
			"source" : this
		};
		if (onErrorCB) {
			onErrorCB({
				"source" : self
			});
			onErrorCB = undefined;
		}

		if (this.checkEvent(this.START_ERROR)) {
			this.callEvent(this.START_ERROR, [ errorEventData ]);
		}
		if (!errorEventData.cancel) {
			throw e;
		}

		return false;
	}
};

justep.ProcessEngine.prototype.setAutoClose = function(v) {
	this._autoClose = v;
};

justep.ProcessEngine.prototype.isAutoClose = function() {
	return this._autoClose;
};

justep.ProcessEngine.prototype.setAutoFilter = function(v) {
	this._autoFilter = v;
};

justep.ProcessEngine.prototype.isAutoFilter = function() {
	return this._autoFilter;
};

justep.ProcessEngine.prototype.setAutoStart = function(v) {
	this._autoStart = v;
};

justep.ProcessEngine.prototype.isAutoStart = function() {
	return this._autoStart;
};

justep.ProcessEngine.prototype.setAutoSave = function(v) {
	this._autoSave = v;
};

justep.ProcessEngine.prototype.isAutoSave = function() {
	return this._autoSave;
};

/**
 * 启动流程[简单]
 * 
 * @param process
 *            必须, 流程标识, 当为null时，默认使用当前的Process
 * @param sName
 *            必须, 流程实例名称
 * @param sData1
 *            必须, 流程关联的sData1
 * @param options
 *            可选参数, 是一个json格式, 有以下三个参数executor，onSuccess和onError, executor:
 *            表示首环节的执行者，可以不指定, 这时默认就是当前人员成员; onSuccess: 表示启动流程成功后的回调函数,
 *            回调函数的参数event结构如下：{"source":组件的js对象}; onError: 表示启动流程失败后的回调函数
 *            回调函数的参数event结构如下：{"source":组件的js对象}; 格式如下：{"executor": {String},
 *            "onSuccesss": {Function}, "onError": {Function}}
 * @return boolean 例如: justep.xbl('id').start("流程标识", "流程实例名称", "业务数据标识");
 * 
 */
justep.ProcessEngine.prototype.start = function(process, sName, sData1, options) {
	var relations = {};
	relations["sName"] = sName;
	relations["sData1"] = sData1;
	return this.startExt(process, relations, options);
};

justep.ProcessEngine.prototype.startByTemplate = function(process, templateID,
		sName, sData1, options) {
	var relations = {};
	relations["sName"] = sName;
	relations["sData1"] = sData1;
	if (!!templateID) {
		relations["sProcessTemplateID2"] = templateID;
	} else {
		var msg = new justep.Message(justep.Message.JUSTEP230026);
		throw justep.Error.create(msg);
	}
	return this.startExt(process, relations, options);
};

/**
 * 流转查询[简单] 使用默认task执行流转查询
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示流转查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示流转查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @return boolean
 */
justep.ProcessEngine.prototype.advanceQuery = function(options) {
	return this.advanceQueryExt(this.getTask(), options);
};

/**
 * TODO 当前不支持批流转 流转查询[高级]
 * 
 * @param task
 *            基于指定的任务执行advanceQuery, 不能为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示流转查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示流转查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @return boolean
 */
justep.ProcessEngine.prototype.advanceQueryExt = function(task, options) {
	return this._query(task, "advanceQuery", options);
};

justep.ProcessEngine.prototype._advanceQueryImpl = function(task, options) {
	return this._queryProcess(this._advanceQueryAction, task,
			this.BEFORE_ADVANCE_QUERY, this.AFTER_ADVANCE_QUERY,
			this.ADVANCE_QUERY_ERROR, options);
};

/**
 * 流转[简单] 使用默认任务进行流转
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示流转成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示流转失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * 
 */
justep.ProcessEngine.prototype.advance = function(options) {
	return this.advanceExt(this.getTask(), null, options);
};

/**
 * TODO 当前不支持批流转 流转[高级]
 * 
 * @param task
 *            必须, 任务标识; 不能为null;
 * @param processControl
 *            必须, 流转相关的信息; 可以为null;
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示流转成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示流转失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}} 例如:
 *            this.advanceExt(task1, processControl);
 */
justep.ProcessEngine.prototype.advanceExt = function(task, processControl,
		options) {
	return this._doProcess(task, processControl, "advance",
			this._advanceAction, this.BEFORE_ADVANCE, this.AFTER_ADVANCE,
			this.ADVANCE_COMMIT, this.ADVANCE_ERROR, options);
};

/**
 * 回退查询[简单] 基于默认的任务回退查询
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示回退查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示回退查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.backQuery = function(options) {
	return this.backQueryExt(this.getTask(), options);
};

/**
 * 回退查询[高级]
 * 
 * @param task
 *            回退查询的任务，不能为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示回退查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示回退查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.backQueryExt = function(task, options) {
	return this._query(task, "backQuery", options);
};

justep.ProcessEngine.prototype._backQueryImpl = function(task, options) {
	return this._queryProcess(this._backQueryAction, task,
			this.BEFORE_BACK_QUERY, this.AFTER_BACK_QUERY,
			this.BACK_QUERY_ERROR, options);
};

/**
 * 回退[简单] 基于默认的任务进行回退
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示回退成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示回退失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.back = function(options) {
	return this.backExt(this.getTask(), null, options);
};

/**
 * 回退[高级]
 * 
 * @param task
 *            回退的任务, 不能为null
 * @param processControl
 *            回退信息, 可以为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示回退成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示回退失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.backExt = function(task, processControl, options) {
	return this._doProcess(task, processControl, "back", this._backAction,
			this.BEFORE_BACK, this.AFTER_BACK, this.BACK_COMMIT,
			this.BACK_ERROR, options);
};

/**
 * 终止查询[简单] 基于默认的任务执行终止查询
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示终止查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示终止查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.abortQuery = function(options) {
	return this.abortQueryExt(this.getTask(), options);
};

/**
 * 终止查询[高级]
 * 
 * @param task
 *            任务标识，不能为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示终止查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示终止查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.abortQueryExt = function(task, options) {
	return this._query(task, "abortQuery", options);
};

justep.ProcessEngine.prototype._abortQueryImpl = function(task, options) {
	return this._queryProcess(this._abortQueryAction, task,
			this.BEFORE_ABORT_QUERY, this.AFTER_ABORT_QUERY,
			this.ABORT_QUERY_ERROR, options);
};

/**
 * 终止[简单] 基于默认任务执行终止
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示终止成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示终止失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.abort = function(options) {
	return this.abortExt(this.getTask(), null, options);
};

/**
 * 终止[高级]
 * 
 * @param task
 *            任务标识, 不能为null
 * @param processControl
 *            终止信息，可以为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示终止成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示终止失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.abortExt = function(task, processControl,
		options) {
	return this._doProcess(task, processControl, "abort", this._abortAction,
			this.BEFORE_ABORT, this.AFTER_ABORT, this.ABORT_COMMIT,
			this.ABORT_ERROR, options);
};

/**
 * 暂停查询[简单] 基于默认的任务执行暂停查询
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示暂停查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示暂停查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.suspendQuery = function(options) {
	return this.suspendQueryExt(this.getTask(), options);
};

/**
 * 暂停查询[高级]
 * 
 * @param task
 *            任务标识，不能为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示暂停查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示暂停查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.suspendQueryExt = function(task, options) {
	return this._query(task, "suspendQuery", options);
};

justep.ProcessEngine.prototype._suspendQueryImpl = function(task, options) {
	return this._queryProcess(this._suspendQueryAction, task,
			this.BEFORE_SUSPEND_QUERY, this.AFTER_SUSPEND_QUERY,
			this.SUSPEND_QUERY_ERROR, options);
};

/**
 * 暂停[简单] 基于默认任务执行暂停
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示暂停成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示暂停失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.suspend = function(options) {
	return this.suspendExt(this.getTask(), null, options);
};

/**
 * 暂停[高级]
 * 
 * @param task
 *            任务标识, 不能为null
 * @param processControl
 *            暂停信息，可以为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示暂停成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示暂停失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.suspendExt = function(task, processControl,
		options) {
	return this._doProcess(task, processControl, "suspend",
			this._suspendAction, this.BEFORE_SUSPEND, this.AFTER_SUSPEND,
			this.SUSPEND_COMMIT, this.SUSPEND_ERROR, options);
};

/**
 * 特送查询[简单] 基于默认的任务执行特送查询
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示特送查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示特送查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.specialQuery = function(options) {
	return this.specialQueryExt(this.getTask(), options);
};

/**
 * 特送查询[高级]
 * 
 * @param task
 *            任务标识，不能为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示特送查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示特送查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.specialQueryExt = function(task, options) {
	return this._query(task, "specialQuery", options);
};

justep.ProcessEngine.prototype._specialQueryImpl = function(task, options) {
	return this._queryProcess(this._specialQueryAction, task,
			this.BEFORE_SPECIAL_QUERY, this.AFTER_SPECIAL_QUERY,
			this.SPECIAL_QUERY_ERROR, options);
};

/**
 * 特送[简单] 基于默认任务执行特送
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示特送成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示特送失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.special = function(options) {
	return this.specialExt(this.getTask(), null, options);
};

/**
 * 特送[高级]
 * 
 * @param task
 *            任务标识, 不能为null
 * @param processControl
 *            暂停信息，可以为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示特送成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示特送失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.specialExt = function(task, processControl,
		options) {
	return this._doProcess(task, processControl, "special",
			this._specialAction, this.BEFORE_SPECIAL, this.AFTER_SPECIAL,
			this.SPECIAL_COMMIT, this.SPECIAL_ERROR, options);
};

/**
 * 转发查询[简单] 基于默认的任务执行转发查询
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示转发查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示转发查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.transferQuery = function(options) {
	return this.transferQueryExt(this.getTask(), options);
};

/**
 * 转发查询[高级]
 * 
 * @param task
 *            任务标识，不能为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示转发查询成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示转发查询失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.transferQueryExt = function(task, options) {
	return this._query(task, "transferQuery", options);
};

justep.ProcessEngine.prototype._transferQueryImpl = function(task, options) {
	return this._queryProcess(this._transferQueryAction, task,
			this.BEFORE_TRANSFER_QUERY, this.AFTER_TRANSFER_QUERY,
			this.TRANSFER_QUERY_ERROR);
};

/**
 * 指定的移交查询
 * 
 * @param options
 * @returns
 */
justep.ProcessEngine.prototype.specialTransferQuery = function(options) {
	return this.specialTransferQueryExt(this.getTask(), options);
};

justep.ProcessEngine.prototype.specialTransferQueryExt = function(task, options) {
	return this._query(task, "specialTransferQuery", options);
};

justep.ProcessEngine.prototype._specialTransferQueryImpl = function(task,
		options) {
	return this._queryProcess(this._specialTransferQueryAction, task,
			this.BEFORE_TRANSFER_QUERY, this.AFTER_TRANSFER_QUERY,
			this.TRANSFER_QUERY_ERROR, options);
};

/**
 * 转发[简单] 基于默认任务执行转发
 * 
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示转发成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示转发失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.transfer = function(options) {
	return this.transferExt(this.getTask(), null, options);
};

/**
 * 转发[高级]
 * 
 * @param task
 *            任务标识, 不能为null
 * @param processControl
 *            转发信息，可以为null
 * @param options
 *            可选参数, 是一个json格式, 有以下两个参数onSuccess和onError, onSuccess:
 *            表示转发成功后的回调函数, 回调函数的参数event结构如下：{"source":组件的js对象}; onError:
 *            表示转发失败后的回调函数 回调函数的参数event结构如下：{"source":组件的js对象};
 *            格式如下：{"onSuccesss": {Function}, "onError": {Function}}
 * @returns boolean
 */
justep.ProcessEngine.prototype.transferExt = function(task, processControl,
		options) {
	return this._doProcess(task, processControl, "transfer",
			this._transferAction, this.BEFORE_TRANSFER, this.AFTER_TRANSFER,
			this.TRANSFER_COMMIT, this.TRANSFER_ERROR, options);
};

justep.ProcessEngine.prototype._getActionName = function(action) {
	if (action == "start") {
		var msg = new justep.Message(justep.Message.JUSTEP230027);
		return msg.getMessage();
	} else if (action == "advance") {
		var msg = new justep.Message(justep.Message.JUSTEP230003);
		return msg.getMessage();
	} else if (action == "advanceQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230028);
		return msg.getMessage();
	} else if (action == "back") {
		var msg = new justep.Message(justep.Message.JUSTEP230009);
		return msg.getMessage();
	} else if (action == "backQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230029);
		return msg.getMessage();
	} else if (action == "abort") {
		var msg = new justep.Message(justep.Message.JUSTEP230013);
		return msg.getMessage();
	} else if (action == "abortQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230030);
		return msg.getMessage();
	} else if (action == "suspend") {
		var msg = new justep.Message(justep.Message.JUSTEP230011);
		return msg.getMessage();
	} else if (action == "suspendQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230031);
		return msg.getMessage();
	} else if (action == "transfer") {
		var msg = new justep.Message(justep.Message.JUSTEP230005);
		return msg.getMessage();
	} else if (action == "transferQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230032);
		return msg.getMessage();
	} else {
		return action;
	}
};

justep.ProcessEngine.prototype._validateTask = function(task, action) {
	if ((task == undefined) || (task == null)) {
		var msg = new justep.Message(justep.Message.JUSTEP230033, this
				._getActionName(action));
		throw justep.Error.create(msg);
		return false;
	} else {
		return true;
	}
};

/**
 * 弹出ProcessControl编辑对话框
 * 
 * @param processControl
 *            需要编辑的ProcessControl
 */
justep.ProcessEngine.prototype._processControlEditDialog = function(callback,
		task, processControl, options) {
	this._processControlDialog._callback = callback;
	this._processControlDialog._task = task;
	this._processControlDialog._options = options;

	this._processControlDialog.open();
	justep.Request.callURL("/system/service/process/processDialog.j",
			this._iframeID, processControl.getXMLString());
};

/**
 * 流程确认
 * 
 * @param title
 *            对话框标题
 * @param content
 *            对话框显示的内容
 * @param callback
 *            确认的回调函数
 * @param task
 *            任务标识
 * @param processControl
 *            流转信息
 */
justep.ProcessEngine.prototype._confirm = function(action, title, callback,
		task, processControl, options) {
	this._processConfirmDialog._callback = callback;
	this._processConfirmDialog._task = task;
	this._processConfirmDialog._processControl = processControl;
	this._processConfirmDialog._options = options;

	this._processConfirmContent.innerHTML = processControl.getMessage(action);
	this._processConfirmDialog.open();

	this._processConfirmDialog.dlg.setText(title);
};

justep.ProcessEngine.prototype._query = function(task, action, options) {
	if (require) {
		var self = this;
		require([ "base/components/knockout/windowDialog" ], function(
				WindowDialog) {
			justep.ProcessEngine._dialogConstructor = WindowDialog;
			self._queryExt(task, action, options);
		});
	} else {
		this._queryExt(task, action, options);
	}

};

justep.ProcessEngine.prototype._queryExt = function(task, action, options) {
	// 自动保存
	if (this._autoSave) {
		if (butone && butone.Context && butone.Context.frameForm) {
			var me = this;
			butone.Context.frameForm.saveDats().done(function() {
				if (!task) {
					task = me.getTask();
				}
				me._actualQueryExt(task, action, options);
			});
			return false;
		} else if (!this._data.saveData()) {
			return false;
		}
		// 以下逻辑是为流程启动环节中，没有保存时执行流程相关query操作时使用的，对于其它环节不严格
		if (!task) {
			task = this.getTask();
		}
	}
	return this._actualQueryExt(task, action, options)

};

justep.ProcessEngine.prototype._actualQueryExt = function(task, action, options) {
	if (this._validateTask(task, action)) {
		var queryImpl = this._getQueryImpl(action);
		if (!queryImpl) {
			var msg = new justep.Message(justep.Message.JUSTEP230043, action);
			throw justep.Error.create(msg);
		}
		var processControl = this[queryImpl](task, options);
		if (processControl != null) {
			if (options.isBatch || processControl.enableDialog()) {
				if (this._isOldVersion) {
					// 旧版本的流转框
					if (processControl.hasProcessData()) {
						this._processControlEditDialog(this
								._getQueryCallBack(action), task,
								processControl, options);
					} else {
						this._confirm(action, this._getConfirmDialogTitle(
								action, options), this
								._getQueryCallBack(action), task,
								processControl, options);
					}
				} else {
					// 新版本的流转框
					var data = null;
					if (processControl.getDataType() == "json") {
						data = processControl.getData();
					} else {
						data = justep.ProcessControl.xmlToJson(processControl
								.getXMLString());
					}

					var eventData = {
						"source" : me,
						"action" : action,
						"task" : task,
						"data" : data,
						"options" : options
					};

					var dialogUrl = null;
					if (this.checkEvent(this.BEFORE_CREATE_DIALOG)) {
						dialogUrl = this.callEvent(this.BEFORE_CREATE_DIALOG,
								[ eventData ]);
					}
					var processDialog = this._getProcessDialog(action,
							dialogUrl);

					// TODO tkj 增加参数 dialog、options.context
					var me = this;
					var eventData = {
						"source" : me,
						"action" : action,
						"task" : task,
						"data" : data,
						"options" : $.extend({}, options, {
							context : butone && butone.Context ? butone.Context
									: null
						}),
						"dialog" : processDialog,
						"cancel" : false
					};
					if (this.checkEvent(this.BEFORE_OPEN_DIALOG)) {
						this.callEvent(this.BEFORE_OPEN_DIALOG, [ eventData ]);
					}

					if (!eventData.cancel) {
						processDialog.open(eventData, this
								._getConfirmDialogTitle(action, options));
					} 
				}

			} else {
				// 静默处理的简单提示
				var items = processControl.getToItems();
				if (items && items.length > 0) {
					var msg = "是否发送到：",toEnd = false;
					for ( var n = 0; n < items.length; n++) {
						var item = items[n];
						if(item.isEnd()){
							toEnd = true;	
						}else{
							if(toEnd){
								throw justep.Error.create("不允许同时选择办结及活动环节");
							}
							var sActivityName = item.getTaskRelationValue('sActivityName'),
							line = '<br>环节【<font color="blue">' + sActivityName + '</font>】';
							var executors = item.getExecutors(), executorNames = "";
							for ( var i = 0; i < executors.length; i++) {
								var s = executors[i].fname, s = s.substring(s.lastIndexOf("/")+1);
								executorNames += "、" + s;
							}
							if (executorNames.length > 1) {
								line += '，接收者【<font color="blue">'+executorNames.substring(1)+'</font>】';
							}
							msg += line;		
						}
					}
					if(toEnd){
						this[this._getQueryCallBack(action)](task, processControl,options);
					}else{
						var me = this;
						if (!me._YesNoDlg) {
							me._YesNoDlg = new justep.System.showMessage();
						}
						me._YesNoDlg.open({
							msg : msg,
							img : 'question',
							title : '提示信息',
							type : 2,
							callback : function(e) {
								if (e.status == "yes") {
									me[me._getQueryCallBack(action)](task,processControl, options);
								}
							}
						});
					}
				} else {
					this[this._getQueryCallBack(action)](task, processControl,options);
				}
			}
			return true;
		} else {
			return false;
		}
	} else {
		return false;
	}
};

justep.ProcessEngine.prototype._processDialogOnReceive = function(event) {
	var data = event.data.data;
	{
		// 将没有选择的item删除
		var tmp = new justep.ProcessControl();
		tmp.loadFromJson(data);
		tmp._generateResult();
		data = tmp.getData();
	}
	var processControl = new justep.ProcessControl();
	if (this._dataType == "json") {
		processControl.loadFromJson(data);
	} else {
		var jsonString = JSON.stringify(data);
		var xmlString = justep.ProcessControl.jsonToXml(jsonString);
		processControl.loadFromXml(xmlString);
	}
	// TODO TKJ
	if (event.data.exts) {
		for ( var n in event.data.exts) {
			var ext = event.data.exts[n], param = ext;
			if (typeof ext == "object") {
				// object 转为 MapParam
				param = new justep.Request.MapParam();
				for (p in ext) {
					param.put(p, ext[p]);
				}
			}
			processControl.setExt(n, param);
		}
	}
	this[this._getQueryCallBack(event.data.action)](event.data.task,processControl, event.data.options);

};

justep.ProcessEngine.prototype._getProcessDialog = function(action, dialogUrl,
		callback) {
	// TODO TKJ
	var dialog;
	var _width = this._processDialogWidth;
	var _height = this._processDialogHeight;
	if (action == "resumeskApprize") {
		_width = "850px";
	}
	if (!dialogUrl || dialogUrl == this._processDialogWindow) {
		!this._defaultProcessDialog
				&& (this._defaultProcessDialog = this._createProcessDialog(
						this._processDialogID, this._processDialogWindow,
						_width, _height));
		dialog = this._defaultProcessDialog;
	} else {
		!this._customProcessDialog[action]
				&& (this._customProcessDialog[action] = this
						._createProcessDialog(this._processDialogID + "_"
								+ action, dialogUrl, _width, _height));
		dialog = this._customProcessDialog[action];
	}
	var self = this;
	callback = callback || function(event) {
		self._processDialogOnReceive(event);
	};
	if (dialog instanceof justep.WindowDialog) {
		if (dialog.__onReceiveHandler) {
			dialog.detachEvent(dialog.__onReceiveHandler);
		}
		dialog.__onReceiveHandler = dialog.attachEvent("onReceive", callback);
	} else {
		dialog.off("onReceive");
		dialog.on("onReceive", callback);
	}
	return dialog;
};

justep.ProcessEngine.prototype._createProcessDialog = function(dialogId, url,
		width, height) {
	if (justep.ProcessEngine._dialogConstructor == justep.WindowDialog) {
		if (!!!width) {
			width = $("body").width() * 0.8;
		}
		if (!!!height) {
			height = $("body").height() * 0.8;
		}
		return new justep.WindowDialog(dialogId, url, "", true, null, width,
				height, null, null, false);

	} else {
		var dialog = new justep.ProcessEngine._dialogConstructor({
			id : dialogId,
			url : url,
			reloadOnOpen : true,
			resizable : true,
			parentNode : $("body").get(0),
			showTitle : true
		});
		dialog.init();
	}
	return dialog;
};

justep.ProcessEngine.prototype._queryProcess = function(name, task,
		commitBefore, commitAfter, commitError, options1) {
	// var onSuccessCB = this._getOption(options1, "onSuccess");
	var onErrorCB = this._getOption(options1, "onError");
	try {
		var commitBeforeEventData = {
			'task' : task,
			'cancel' : false,
			'source' : this
		};
		if (this.checkEvent(commitBefore)) {
			this.callEvent(commitBefore, [ commitBeforeEventData ]);
		}

		if (commitBeforeEventData.cancel) {
			return null;
		}
		var actionParam = new justep.Request.ActionParam();
		if (options1 && options1.extParameters) {
			for ( var n in options1.extParameters.param) {
				var p = options1.extParameters.param[n];
				actionParam.setParam(n, p);
			}
		}
		actionParam.setString("task", task);
		var options = {};
		options.process = justep.Context.getCurrentProcess();
		options.activity = justep.Context.getCurrentActivity();
		options.action = name;
		options.parameters = actionParam;
		// options.parameters = " <parameters
		// xmlns:xbiz=\"http://www.justep.com/xbiz#\">" +
		// " <parameter name=\"task\">" +
		// " <xbiz:simple type=\"" + justep.XML.Namespaces.XMLSCHEMA_STRING +
		// "\"" +
		// " >" + task + "</xbiz:simple>" +
		// " </parameter>" +
		// " </parameters>";
		options.directExecute = true;
		options.dataType = this.getDataType();

		var response = justep.Request.sendBizRequest2(options);
		if (justep.Request.isBizSuccess(response, this.getDataType())) {
			var processControl = new justep.ProcessControl();
			if (justep.Request.isJson(this._dataType)) {
				var result = justep.Request.responseParseJSON(response);
				processControl.loadFromJson(result.data.value.object);
			} else {
				var responseXML = response.responseXML;
				var resultNode = justep.XML.eval(responseXML,
						"/root/data/*/process-control", "single");
				var processControlXMLString = justep.XML.toString(resultNode);
				processControl.loadFromXml(processControlXMLString);
			}

			var commitAfterEventData = {
				'task' : task,
				'processControl' : processControl,
				'cancel' : false,
				'source' : this
			};
			/*
			 * if (onSuccessCB){ onSuccessCB({"source":this}); }
			 */
			if (this.checkEvent(commitAfter)) {
				this.callEvent(commitAfter, [ commitAfterEventData ]);
			}
			if (commitAfterEventData.cancel) {
				return null;
			} else {
				return processControl;
			}

		} else {
			var message = null;
			if (justep.Request.isJson(this._dataType)) {
				var result = justep.Request.responseParseJSON(response);
				message = result.message;

			} else {
				var responseXML = response.responseXML;
				var resultNode = justep.XML.eval(responseXML, "/root/message",
						"single");
				message = justep.XML.getNodeText(resultNode);
			}

			var commitErrorEventData = {
				'task' : task,
				'errorNode' : message,
				'cancel' : false,
				'errorType' : "server",
				'source' : this
			};
			if (onErrorCB) {
				onErrorCB({
					"source" : this
				});
				onErrorCB = undefined;
			}
			if (this.checkEvent(commitError)) {
				this.callEvent(commitError, [ commitErrorEventData ]);
			}

			if (commitErrorEventData.cancel) {
				return null;
			} else {
				throw new Error(message);
			}
		}

	} catch (e) {
		var errorEventData = {
			'task' : task,
			'error' : e,
			'cancel' : false,
			'errorType' : "client",
			'source' : this
		};
		if (onErrorCB) {
			onErrorCB({
				"source" : this
			});
			onErrorCB = undefined;
		}
		if (this.checkEvent(commitError)) {
			this.callEvent(commitError, [ errorEventData ]);
		}
		if (errorEventData.cancel) {
			return null;
		} else {
			throw e;
		}
	}
};

justep.ProcessEngine.prototype._doProcess = function(task, processControl,
		action, bizAction, before, after, commitAfter, commitError, options1) {
	var self = this;
	// 自动保存
	if (self._autoSave) {
		if (butone && butone.Context && butone.Context.frameForm) {
			butone.Context.frameForm.saveDats().done(
					function() {
						if (!task) {
							task = self.getTask();
						}
						self._actualDoProcess(task, processControl, action,
								bizAction, before, after, commitAfter,
								commitError, options1);
					});
			return false;
		} else if (!self._data.saveData()) {
			return false;
		}
		// 以下逻辑是为流程启动环节中，没有保存时执行流程相关query操作时使用的，对于其它环节不严格
		if (!task) {
			task = self.getTask();
		}
	}
	self._actualDoProcess(task, processControl, action, bizAction, before,
			after, commitAfter, commitError, options1);
};

justep.ProcessEngine.prototype._actualDoProcess = function(task,
		processControl, action, bizAction, before, after, commitAfter,
		commitError, options1) {
	var onSuccessCB = this._getOption(options1, "onSuccess");
	var onErrorCB = this._getOption(options1, "onError");
	var self = this;
	var begineExecute = false;
	try {
		if (self._validateTask(task, action)) {
			begineExecute = justep.Request.beginBatch();
			if (!begineExecute) {
				var msg = new justep.Message(justep.Message.JUSTEP230034, this
						._getActionName(action));
				throw justep.Error.create(msg);
			}

			var execute = function() {
				var options = {};
				options.process = justep.Context.getCurrentProcess();
				options.activity = justep.Context.getCurrentActivity();
				options.action = bizAction;

				if (self._dataType == "json") {
					options.parameters = new justep.Request.ActionParam();
					options.parameters.setString("task", task);
					if ((processControl != undefined)
							&& (processControl != null)) {
						options.parameters
								.setParam(
										"control",
										{
											"class" : "com.justep.system.process.ProcessControl",
											"object" : processControl.getData()
										});
					}
					options.contentType = "json";

				} else {
					var processControlParameter = "";
					if ((processControl != undefined)
							&& (processControl != null)
							&& (processControl.getXMLString() != null)) {
						processControlParameter = "<parameter name=\"control\"><xbiz:object class=\"com.justep.system.process.ProcessControl\">"
								+ processControl.getXMLString()
								+ "</xbiz:object></parameter>";
					}

					options.parameters = "	<parameters xmlns:xbiz=\"http://www.justep.com/xbiz#\">"
							+ "		<parameter name=\"task\">"
							+ "			<xbiz:simple type=\""
							+ justep.XML.Namespaces.XMLSCHEMA_STRING
							+ "\""
							+ "				>"
							+ task
							+ "</xbiz:simple>"
							+ "		</parameter>"
							+ processControlParameter
							+ "	</parameters>";
				}

				options.callback = function(data) {
					if (data.state) {
						var commitAfterEventData = {
							'task' : task,
							"processControl" : processControl,
							'cancel' : false,
							'source' : self
						};

						if (onSuccessCB) {
							onSuccessCB({
								"source" : self
							});
						}

						if (self.checkEvent(commitAfter)) {
							self.callEvent(commitAfter,
									[ commitAfterEventData ]);
						}

						if (!commitAfterEventData.cancel) {
							// 关闭相关的动作
							if (self._autoClose) {
								setTimeout(function() {
									justep.Portal.closeWindow();
								}, 1);
							}
						}

					} else {
						var commitErrorEventData = {
							'task' : task,
							"processControl" : processControl,
							"errorNode" : data.response,
							'cancel' : false,
							'errorType' : "server",
							'source' : self
						};
						if (onErrorCB) {
							onErrorCB({
								"source" : self
							});
							onErrorCB = undefined;
						}
						if (self.checkEvent(commitError)) {
							self.callEvent(commitError,
									[ commitErrorEventData ]);
						}

						data.ignoreError = commitErrorEventData.cancel;
						/*
						 * if (!commitErrorEventData.cancel){ //throw new
						 * Error(data.response.text ||
						 * data.response.textContent);
						 * justep.Request.errorMessage(data.response, null,
						 * data.url, data.param); }
						 */
					}
				};

				justep.Request.sendBizRequest2(options);

				var afterEventData = {
					'task' : task,
					"processControl" : processControl,
					'cancel' : false
				};
				if (self.checkEvent(after)) {
					self.callEvent(after, [ afterEventData ]);
				}
				if (afterEventData.cancel) {
					justep.Request.cancelBatch();
					return false;
				}
				justep.Request.endBatch();
				begineExecute = false;
				return true;
			};

			var beforeEventData = {
				'task' : task,
				"processControl" : processControl,
				'cancel' : false,
				'source' : self,
				action : action
			};

			if (self.checkEvent(self.BEFORE_EXECUTE)) {
				self.callEvent(self.BEFORE_EXECUTE, [ beforeEventData ]);
			}

			if (!beforeEventData.cancel && self.checkEvent(before)) {
				self.callEvent(before, [ beforeEventData ]);
			}

			if (beforeEventData.cancel) {
				if (beforeEventData.continuePromise) {
					var dtd = new $2.Deferred();
					beforeEventData.continuePromise.then(function() {
						dtd.resolve(execute());
					}, function() {
						justep.Request.cancelBatch();
						dtd.resolve(false);
					});
					return dtd.promise();
				} else {
					justep.Request.cancelBatch();
					return false;
				}
			} else
				return execute();
		} else {
			return false;
		}
	} catch (e) {
		if (begineExecute) {
			justep.Request.cancelBatch();
		}

		var errorEventData = {
			'task' : task,
			"processControl" : processControl,
			'cancel' : false,
			'errorType' : "client",
			'error' : e,
			"source" : self
		};
		if (onErrorCB) {
			onErrorCB({
				"source" : self
			});
			onErrorCB = undefined;
		}
		if (self.checkEvent(commitError)) {
			self.callEvent(commitError, [ errorEventData ]);
		}
		if (!errorEventData.cancel) {
			throw e;
		}

		return false;
	}
};

justep.ProcessEngine.prototype._getConfirmDialogTitle = function(action,
		options) {
	if (action == "advanceQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230035);
		return msg.getMessage();
	} else if (action == "backQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230036);
		return msg.getMessage();
	} else if (action == "abortQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230037);
		return msg.getMessage();
	} else if (action == "suspendQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230038);
		return msg.getMessage();
	} else if (action == "transferQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230039);
		return msg.getMessage();
	} else if (action == "specialTransferQuery") {
		return options.extParameters.getParam("name").value + "确认";
	} else if (action == "specialQuery") {
		var msg = new justep.Message(justep.Message.JUSTEP230040);
		return msg.getMessage();
	} else {
		var msg = new justep.Message(justep.Message.JUSTEP230041, action);
		throw justep.Error.create(msg);
	}
};

justep.ProcessEngine.prototype._getQueryCallBack = function(action) {
	if (action == "advanceQuery") {
		return "advanceExt";
	} else if (action == "backQuery") {
		return "backExt";
	} else if (action == "abortQuery") {
		return "abortExt";
	} else if (action == "suspendQuery") {
		return "suspendExt";
	} else if (action == "transferQuery" || action == "specialTransferQuery") {
		return "transferExt";
	} else if (action == "specialQuery") {
		return "specialExt";
	} else {
		var msg = new justep.Message(justep.Message.JUSTEP230042, action);
		throw justep.Error.create(msg);
	}
};

justep.ProcessEngine.prototype._getQueryImpl = function(action) {
	if (action == "advanceQuery") {
		return "_advanceQueryImpl";
	} else if (action == "backQuery") {
		return "_backQueryImpl";
	} else if (action == "abortQuery") {
		return "_abortQueryImpl";
	} else if (action == "suspendQuery") {
		return "_suspendQueryImpl";
	} else if (action == "transferQuery") {
		return "_transferQueryImpl";
	} else if (action == "specialTransferQuery") {
		return "_specialTransferQueryImpl";
	} else if (action == "specialQuery") {
		return "_specialQueryImpl";
	} else {
		return null;
	}
};

justep.ProcessEngine.prototype.startCustomizedQuery = function(options) {
	return this.startCustomizedQueryExt(this.getTask(), options);
};

/*
 * justep.ProcessEngine.prototype.startCustomized = function(task, template){
 * var action = "externalStartCustomizedProcessAction"; var actionName =
 * "启动流程定制"; //自动保存 if (this._autoSave){ if (!this._data.saveData()){ return; }
 * 
 * //以下逻辑是为流程启动环节中，没有保存时执行流程相关query操作时使用的，对于其它环节不严格 if (!task){ task =
 * this.getTask(); } }
 * 
 * var begineExecute = false; try{ if (this._validateTask(task, actionName)){
 * begineExecute = justep.Request.beginBatch(); if (!begineExecute){ throw new
 * Error("执行" + actionName + "时启动事务失败!"); }
 * 
 * var beforeEventData = {'task':task, "template":template, 'cancel':false,
 * 'source':this}; if (this.checkEvent(this.BEFORE_START_CUSTOMIZED)){
 * this.callEvent(BEFORE_START_CUSTOMIZED, [beforeEventData]); }
 * 
 * if (beforeEventData.cancel){ justep.Request.cancelBatch(); return; }
 * 
 * var process = justep.Context.getCurrentProcess(); var activity =
 * justep.Context.getCurrentActivity(); var param = new
 * justep.Request.ActionParam(); param.setString("task", getTaskId());
 * param.setString("template", this.getRowId()); var self = this; var result =
 * justep.Request.sendBizRequest(process, activity, action, param, null, null,
 * function(event){ if (event.state){ var commitEventData = {'task':task,
 * "template":template, 'cancel':false}; if
 * (this.checkEvent(START_CUSTOMIZED_COMMIT)){
 * this.callEvent(START_CUSTOMIZED_COMMIT, [commitEventData]); }
 * 
 * 
 * }else{ var commitErrorEventData = {'task':task, "template":template,
 * "errorNode":data.response, 'cancel':false, 'errorType':"server",
 * 'source':self}; if (self.checkEvent(START_CUSTOMIZED_ERROR)){
 * self.callEvent(START_CUSTOMIZED_ERROR, [commitErrorEventData]); }
 * 
 * 
 * if (!commitErrorEventData.cancel){ throw new Error(data.response.text); } }
 * });
 * 
 * 
 * var afterEventData = {'task':task, "template":template, 'cancel':false}; if
 * (this.checkEvent(AFTER_START_CUSTOMIZED)){
 * this.callEvent(AFTER_START_CUSTOMIZED, [afterEventData]); } if
 * (afterEventData.cancel){ justep.Request.cancelBatch(); return; }
 * 
 * justep.Request.endBatch(); begineExecute = false; }
 * 
 * }catch(e){ if (begineExecute){ justep.Request.cancelBatch(); }
 * 
 * var errorEventData = {'task':task, "processControl":processControl,
 * 'cancel':false, 'errorType': "client", 'error': e, "source":this}; if
 * (this.checkEvent(commitError)){ this.callEvent(commitError,
 * [errorEventData]); } if (!errorEventData.cancel){ throw e; } } };
 */

justep.ProcessEngine.prototype.startCustomizedQueryExt = function(task, options) {
	var onSuccessCB = this._getOption(options, "onSuccess");
	var onErrorCB = this._getOption(options, "onError");

	if (this._autoSave) {
		if (!this._data.saveData()) {
			return false;
		}

		// 以下逻辑是为流程启动环节中，没有保存时执行流程相关query操作时使用的，对于其它环节不严格
		if (!task) {
			task = this.getTask();
		}
	}

	try {
		var beforeEventData = {
			'task' : task,
			'cancel' : false,
			'source' : this
		};
		if (this.checkEvent(this.BEFORE_START_CUSTOMIZED_QUERY)) {
			this.callEvent(this.BEFORE_START_CUSTOMIZED_QUERY,
					[ beforeEventData ]);
		}

		if (beforeEventData.cancel) {
			return false;
		}

		var process = justep.Context.getCurrentProcess();
		var activity = justep.Context.getCurrentActivity();
		var param = new justep.Request.ActionParam();
		param.setString("task", task);
		var actionOp = {};
		actionOp.contentType = 'application/json';
		actionOp.process = process;
		actionOp.activity = activity;
		actionOp.dataType = "json";
		actionOp.parameters = param;
		actionOp.action = "externalStartCustomizedProcessQueryAction";
		actionOp.directExecute = true;
		actionOp.callback = function() {
		}; // 忽略request底层报错处理
		var result = justep.Request.sendBizRequest2(actionOp);
		if (justep.Request.isBizSuccess(result, actionOp.dataType)) {
			var afterEventData = {
				'task' : task,
				'cancel' : false,
				'source' : this
			};
			if (onSuccessCB) {
				onSuccessCB({
					"source" : this
				});
			}
			if (this.checkEvent(this.AFTER_START_CUSTOMIZED_QUERY)) {
				this.callEvent(this.AFTER_START_CUSTOMIZED_QUERY,
						[ afterEventData ]);
			}
			if (afterEventData.cancel) {
				return false;
			}

			var resultData = justep.Request.getData(result);
			var enabled = resultData["enabled"];
			if (enabled == "true") {
				var curTemplate = resultData["template"] || "";
				var curTemplateSequence = resultData["templateItemSequence"]
						|| "";
				var curTemplateType = resultData["templateType"] || "";
				var curProcess = resultData["process"] || "";
				var curProcessName = resultData["processName"] || "";
				var curActivity = resultData["activity"] || "";
				var curActivityName = resultData["activityName"] || "";

				if (curTemplateType == "graph2") { // 流程图, 推荐方案
					var activeActivities = JSON
							.parse(resultData["activeActivities"]);
					var finishedActivities = JSON
							.parse(resultData["finishedActivities"]);

					var processDialog = this._getCustomizedGraph2Dialog();
					var msg = new justep.Message(justep.Message.JUSTEP230044);
					processDialog.open({
						"noName" : true,
						"id" : curTemplate,
						"task" : task,
						"isInPI" : true,
						"sProcess" : curProcess,
						"sProcessName" : curProcessName,
						"activity" : curActivity,
						"activeActivities" : activeActivities,
						"finishedActivities" : finishedActivities
					}, msg.getMessage());

				} else if (curTemplateType == "graph") { // 图形片段
					var processDialog = this._getCustomizedGraphDialog();
					var msg = new justep.Message(justep.Message.JUSTEP230044);
					processDialog.open({
						"template" : curTemplate,
						"task" : task,
						"templateType" : curTemplateType,
						"process" : curProcess,
						"processName" : curProcessName,
						"activity" : curActivity,
						"activityName" : curActivityName,
						"templateSequence" : curTemplateSequence
					}, msg.getMessage());

				} else { // 表格片段
					var dialog = justep.xbl(this._customizedDialogID);
					if (dialog) {
						dialog.template = curTemplate;
						dialog.templateSequence = curTemplateSequence;
						dialog.customizedDialogID = this._customizedDialogID;
						dialog.customizedFrameID = this._customizedDialogIFrameID;
						dialog.customizedUrl = this._customizedServiceURL;
						dialog.customizedProcessLabel = curProcessName;
						dialog.customizedProcess = curProcess;
						dialog.customizedActivity = curActivity;
						dialog.customizedActivityLabel = curActivityName;

						dialog.process = process;
						dialog.activity = activity;
						dialog.task = task;
						if (typeof (dialog.eventAttached) == "undefined") {
							dialog.attachEvent("onOpen", function() {
								var params = "<input-param>" + "<dialog-id>"
										+ this.customizedDialogID
										+ "</dialog-id>" + "<template-id>"
										+ this.template + "</template-id>"
										+ "<template-sequence>"
										+ this.templateSequence
										+ "</template-sequence>" + "<task-id>"
										+ this.task + "</task-id>"
										+ "<customized-process>"
										+ this.customizedProcess
										+ "</customized-process>"
										+ "<customized-process-label>"
										+ this.customizedProcessLabel
										+ "</customized-process-label>"
										+ "<customized-activity>"
										+ this.customizedActivity
										+ "</customized-activity>"
										+ "<customized-activity-label>"
										+ this.customizedActivityLabel
										+ "</customized-activity-label>"
										+ "</input-param>";
								justep.Request.callURL(this.customizedUrl
										+ "?process=" + this.process
										+ "&activity=" + this.activity,
										this.customizedFrameID, params);
							}, dialog);

							justep
									.xbl(this._customizedDialogID)
									.attachEvent(
											"onClose",
											function() {
												justep(this.customizedFrameID).src = "";

											}, dialog);

							dialog.eventAttached = true;
						}

						dialog.open();
					}
				}
			} else {
				var msg = new justep.Message(justep.Message.JUSTEP230045);
				alert(msg.getMessage());
			}

			return true;
		} else {
			/*
			 * var responseXML = result.responseXML; var resultNode =
			 * justep.XML.eval(responseXML, "/root/message", "single"); var
			 * message = justep.XML.getNodeText(resultNode);
			 */
			var message = justep.Request.responseParseJSON(result).message
					|| "";
			var errorEventData = {
				'task' : task,
				'errorNode' : message,
				'cancel' : false,
				'errorType' : "server",
				'source' : this
			};
			if (onErrorCB) {
				onErrorCB({
					"source" : this
				});
				onErrorCB = undefined;
			}
			if (this.checkEvent(this.START_CUSTOMIZED_QUERY_ERROR)) {
				this.callEvent(this.START_CUSTOMIZED_QUERY_ERROR,
						[ errorEventData ]);
			}

			if (errorEventData.cancel) {
				return false;
			} else {
				throw new Error(message);
			}

			return false;
		}

	} catch (e) {
		var errorEventData = {
			'task' : task,
			'error' : e,
			'cancel' : false,
			'errorType' : "client",
			'source' : this
		};
		if (onErrorCB) {
			onErrorCB({
				"source" : this
			});
			onErrorCB = undefined;
		}
		if (this.checkEvent(this.START_CUSTOMIZED_QUERY_ERROR)) {
			this.callEvent(this.START_CUSTOMIZED_QUERY_ERROR,
					[ errorEventData ]);
		}
		if (errorEventData.cancel) {
			return null;
		} else {
			throw e;
		}

		return false;
	}
};

justep.ProcessEngine.prototype._getCustomizedGraphDialog = function() {
	var dialogID = this._id + "_customized_graph_dialog";
	if (!this._customizedGraphDialog) {
		this._customizedGraphDialog = new justep.WindowDialog(this._id
				+ "_customized_graph_dialog", this._customizedGraphWindow
				+ "?process=" + justep.Context.getCurrentProcess()
				+ "&activity=" + justep.Context.getCurrentActivity(), "", true,
				"maximize", "600", "800", "0", "0", false, null,
				function(event) {

				});
		this._customizedGraphDialog.setMinmaxable(false);
		this._customizedGraphDialog.setResizable(false);
	}
	return this._customizedGraphDialog;
};

justep.ProcessEngine.prototype._getCustomizedGraph2Dialog = function() {
	var dialogID = this._id + "_customized_graph2_dialog";
	if (!this._customizedGraph2Dialog) {
		this._customizedGraph2Dialog = new justep.WindowDialog(this._id
				+ "_customized_graph2_dialog", this._customizedGraph2Window
				+ "?process=" + justep.Context.getCurrentProcess()
				+ "&activity=" + justep.Context.getCurrentActivity(), "", true,
				"maximize", "600", "800", "0", "0", false, null,
				function(event) {

				});
		this._customizedGraph2Dialog.setMinmaxable(false);
		this._customizedGraph2Dialog.setResizable(false);
	}
	return this._customizedGraph2Dialog;
};

justep.ProcessEngine.prototype.getDataType = function() {
	if (this._dataType != "json") {
		return "xml";
	} else {
		return "json";
	}
};

justep.ProcessEngine.prototype._getExecuteListDialog = function() {
	if (!this._executeListDialog) {
		var msg = new justep.Message(justep.Message.JUSTEP230046);
		this._executeListDialog = new justep.WindowDialog(this.id
				+ "_executeListDialog",
				"/UI/system/service/process/processExecuteList.w", msg
						.getMessage(), true, null, 800, 500);
	}
	return this._executeListDialog;
};

justep.ProcessEngine.prototype.openExecuteListDialog = function(task) {
	if (!task) {
		task = this.getTask();
	}
	this._getExecuteListDialog().open({
		"task" : task
	});
};

/**
 * 流转信息ProcessControl 以json格式为主，兼容之前的xml格式及接口
 */

justep.ProcessControl = function() {
	this._dataType = null;

	this._xmlData = null;
	this._jsonData = null;
};

justep.ProcessControl.XML_ELEMENT_TAG = "@@tag";
justep.ProcessControl.XML_CHILDREN = "@@children";

justep.ProcessControl.xmlToJson = function(xml) {
	var r = justep.Request.sendHttpRequest(
			"/system/service/process/dialogs/processControlXmlToJson.j", xml);
	return r.responseText;
};

justep.ProcessControl.jsonToXml = function(json) {
	var r = justep.Request.sendHttpRequest(
			"/system/service/process/dialogs/processControlJsonToXml.j", json);
	return r.responseText;
};

justep.ProcessControl.prototype.getData = function() {
	if (this._dataType == "json") {
		return this._jsonData;
	} else {
		return this._xmlData;
	}
};

justep.ProcessControl.prototype.getDataType = function() {
	return this._dataType;
};

justep.ProcessControl.prototype.getXMLString = function() {
	if (this._dataType == "xml") {
		if ((this._xmlData != undefined) && (this._xmlData != null)) {
			return justep.XML.toString(this._xmlData);
		} else {
			return null;
		}
	} else {
		var msg = new justep.Message(justep.Message.JUSTEP230047);
		throw justep.Error.create(msg);
	}
};

justep.ProcessControl.prototype.getJsonString = function() {
	if (this._dataType == "json") {
		if ((this._jsonData != undefined) && (this._jsonData != null)) {
			return JSON.stringify(this._jsonData);
		} else {
			return null;
		}
	} else {
		var msg = new justep.Message(justep.Message.JUSTEP230048);
		throw justep.Error.create(msg);
	}
};

// 以下三个私有方法做兼容保留，但仅当数据类型为xml时有效
justep.ProcessControl.prototype._hasNode = function(path) {
	if (this._dataType == "xml") {
		var result = justep.XML.eval(this._xmlData, path);
		if ((result != undefined) && (result.length > 0)) {
			return true;
		} else {
			return false;
		}
	} else {
		var msg = new justep.Message(justep.Message.JUSTEP230049, "_hasNode");
		throw justep.Error.create(msg);
	}
};

justep.ProcessControl.prototype._getNodeValue = function(path) {
	if (this._dataType == "xml") {
		return justep.XML.getNodeText(this._xmlData, path);
	} else {
		var msg = new justep.Message(justep.Message.JUSTEP230049,
				"_getNodeValue");
		throw justep.Error.create(msg);
	}
};

justep.ProcessControl.prototype._setNodeValue = function(path, value) {
	if (this._dataType == "xml") {
		justep.XML.setNodeText(this._xmlData, path, value);
	} else {
		var msg = new justep.Message(justep.Message.JUSTEP230049,
				"_setNodeValue");
		throw justep.Error.create(msg);
	}
};

justep.ProcessControl.prototype.enableDialog = function() {
	if (this._dataType == "xml") {
		var enableDialogValue = this
				._getNodeValue("/process-control/dialog-enabled/text()");
		return enableDialogValue == "true";
	} else {
		return this._jsonData["dialog-enabled"] == "true";
	}
};

justep.ProcessControl.prototype.hasProcessData = function() {
	if (this._dataType == "xml") {
		return this._hasNode("//process-control-item");
	} else {
		return ((this.getToItems().length + this.getNoticeItems().length) > 0);
	}
};

justep.ProcessControl.prototype.getMessage = function(action) {
	/*
	 * if (this._dataType == "xml") { var status =
	 * this._getNodeValue("/process-control/status/text()"); } else { var status =
	 * this._jsonData["status"]; }
	 * 
	 * if (action == "abortQuery"){ return "流程即将终止"; }else if (action ==
	 * "suspendQuery"){ return "流程即将暂停"; }else if ((status=="executorFinish") ||
	 * (status == "taskFinish") || (status == "activityFinish")) { if
	 * (this._dataType == "xml") { return
	 * this._getNodeValue("/process-control/message/text()"); } else { return
	 * this._jsonData["message"]; } }
	 */
	if (this._dataType == "xml") {
		return this._getNodeValue("/process-control/message/text()");
	} else {
		return this._jsonData["message"];
	}

};

justep.ProcessControl.prototype.isOk = function() {
	if (this._dataType == "xml") {
		var status = this._getNodeValue("/process-control/status/text()");
	} else {
		var status = this._jsonData["status"];
	}
	if ((status == "none") || (status == "processSuspend")
			|| (status == "processAbort") || (status == "processFinish")
			|| (status == "executorFinish") || (status == "taskFinish")
			|| (status == "activityFinish")) {
		return true;
	} else {
		return false;
	}
};

justep.ProcessControl.prototype.loadFromXml = function(xml) {
	this._dataType = "xml";
	this._xmlData = new justep.XML.fromString(xml);
};

justep.ProcessControl.prototype.loadFromJson = function(json) {
	this._dataType = "json";
	this._initJsonObject(json);
};

justep.ProcessControl.prototype._initJsonObject = function(json) {
	if ((typeof json) == "string") {
		json = JSON.parse(json);
	}
	this._jsonData = json;

	// 流转对象实例
	this._toItems = this._createItems(this._jsonData["to"]);
	// 通知对象实例
	this._noticeItems = this._createItems(this._jsonData["notice"]);
	// 环节对象实例，必须先创建_toItems
	this._activities = this
			._createActivities(this._jsonData["runnable-activities"]);
};

justep.ProcessControl.prototype._createActivities = function(activitiesData) {
	var activities = new Array();
	if (!activitiesData)
		return activities;
	for ( var i = 0; i < activitiesData.length; i++) {
		var children = null;
		if (typeof (activitiesData[i][justep.ProcessControl.XML_CHILDREN]) != "undefined") {
			children = this
					._createActivities(activitiesData[i][justep.ProcessControl.XML_CHILDREN]);
		}
		var toItem = this.getToItemByID(activitiesData[i]["@id"]);
		var activity = new justep.ProcessControl.Activity(activitiesData[i],
				children, toItem);
		activities.push(activity);
	}
	return activities;
};

// 获得环节对象实例
justep.ProcessControl.prototype.getActivities = function() {
	return this._activities;
};

justep.ProcessControl.prototype._createItems = function(itemsData) {
	var items = new Array();
	for ( var i = 0; i < itemsData.length; i++) {
		var item = new justep.ProcessControl.Item(itemsData[i]);
		items.push(item);
	}
	return items;
};

justep.ProcessControl.prototype.getToItems = function() {
	return this._toItems;
};

justep.ProcessControl.prototype.getToItemByID = function(id) {
	for ( var i = 0; i < this._toItems.length; i++) {
		if (this._toItems[i].getID() == id) {
			return this._toItems[i];
		}
	}
	return null;
};

// 设置选中的to
justep.ProcessControl.prototype.setSelectedToItems = function(toItemIDs) {
	for ( var i = 0; i < this._toItems.length; i++) {
		this._toItems[i].setSelected(false);
		for ( var j = 0; j < toItemIDs.length; j++) {
			if (this._toItems[i].getID() == toItemIDs[j]) {
				this._toItems[i].setSelected(true);
				break;
			}
		}
	}
};

justep.ProcessControl.prototype.getNoticeItems = function() {
	return this._noticeItems;
};

justep.ProcessControl.prototype.getNoticeItemByID = function(id) {
	for ( var i = 0; i < this._noticeItems.length; i++) {
		if (this._noticeItems[i].getID() == id) {
			return this._noticeItems[i];
		}
	}
	return null;
};

// 设置选中的notice
justep.ProcessControl.prototype.setSelectedNoticeItems = function(noticeItemIDs) {
	for ( var i = 0; i < this._noticeItems.length; i++) {
		this._noticeItems[i].setSelected(false);
		for ( var j = 0; j < noticeItemIDs.length; j++) {
			if (this._noticeItems[i].getID() == noticeItemIDs[j]) {
				this._noticeItems[i].setSelected(true);
				break;
			}
		}
	}
};

// json格式返回数据处理
justep.ProcessControl.prototype._generateResult = function() {
	// 删除不需要返回的数据
	for ( var i = this._jsonData.to.length - 1; i >= 0; i--) {
		if (this._jsonData.to[i]["@selected"] != "true") {
			this._jsonData.to.splice(i, 1);
		}
	}
	for ( var i = this._jsonData.notice.length - 1; i >= 0; i--) {
		if (this._jsonData.notice[i]["@selected"] != "true") {
			this._jsonData.notice.splice(i, 1);
		}
	}
	delete this._jsonData["runnable-activities"];
};

// ProcessControl 扩展
justep.ProcessControl.prototype.getExts = function() {
	return this._jsonData["exts"];
};

justep.ProcessControl.prototype.clearExts = function() {
	this._jsonData["exts"] = {};
};

justep.ProcessControl.prototype.getExt = function(name) {
	return this._jsonData["exts"][name];
};

justep.ProcessControl.prototype.setExt = function(name, value) {
	this._jsonData["exts"][name] = value;
};

/*******************************************************************************
 * 环节对象 activityData: 环节数据 children: 构成树形结构
 ******************************************************************************/
justep.ProcessControl.Activity = function(activityData, children, toItem) {
	this._activityData = activityData;
	this._children = children;
	this._toItem = toItem;
	if (children)
		for ( var r = 0; r < children.length; r++)
			children[r].parent = this
};

// 环节ID
justep.ProcessControl.Activity.prototype.getID = function() {
	return this._activityData["@id"];
};

// 环节名称
justep.ProcessControl.Activity.prototype.getName = function() {
	return this._activityData[justep.ProcessControl.XML_ELEMENT_TAG];
};

// 子环节（构成环节树）
justep.ProcessControl.Activity.prototype.getChildren = function() {
	return this._children;
};

// 环节显示名称
justep.ProcessControl.Activity.prototype.getLabel = function() {
	return this._activityData["@label"];
};

// 是否能选
justep.ProcessControl.Activity.prototype.isSelectable = function() {
	return (this._activityData["@selectable"] == "true");
};

// 是否可选
justep.ProcessControl.Activity.prototype.isOptional = function() {
	return (this._activityData["@optional"] == "true");
};

// 流转或通知对象
justep.ProcessControl.Item = function(itemData) {
	this._itemData = itemData;
};

justep.ProcessControl.Item.prototype.getID = function() {
	return this._itemData["@id"];
};

// 环节ID
justep.ProcessControl.Item.prototype.getActivityID = function() {
	return this._itemData["@activity-id"];
};

// 是否结束
justep.ProcessControl.Item.prototype.isEnd = function() {
	return (this._itemData["@is-end"] == "true");
};

// 是否只读
justep.ProcessControl.Item.prototype.isReadonly = function() {
	return (this._itemData["@readonly"] == "true");
};

// 是否选中
justep.ProcessControl.Item.prototype.isSelected = function() {
	return (this._itemData["@selected"] == "true");
};

// 设置是否选中
justep.ProcessControl.Item.prototype.setSelected = function(value) {
	this._itemData["@selected"] = value ? "true" : "false";
};

// 过程
justep.ProcessControl.Item.prototype.getProcess = function() {
	return this._itemData["process"];
};

// 环节
justep.ProcessControl.Item.prototype.getUnit = function() {
	return this._itemData["unit"];
};

// 任务分配方式
justep.ProcessControl.Item.prototype.getTaskAssignMode = function() {
	return this._itemData["task-assign-mode"];
};

// 执行者类型
justep.ProcessControl.Item.prototype.getExecutorKinds = function() {
	var orgKinds = this._itemData["executor-kinds"].toLowerCase();
	return (orgKinds == "") ? "psm" : orgKinds;
};

// 执行者范围
justep.ProcessControl.Item.prototype.getExecutorRange = function() {
	return this._itemData["executor-range"];
};

// 执行者
justep.ProcessControl.Item.prototype.getExecutors = function() {
	return this._itemData["executors"];
};

// 清除执行者
justep.ProcessControl.Item.prototype.clearExecutors = function() {
	this.getExecutors().splice(0, this.getExecutors().length);
};

// 添加执行者
justep.ProcessControl.Item.prototype.addExecutor = function(fid, fname,
		responsible) {
	var orgUnit = {
		"@@tag" : "org-unit",
		"fid" : fid,
		"fname" : fname,
		"responsible" : responsible
	};
	this.getExecutors().push(orgUnit);
	return orgUnit;
};

// 获得所有任务关系
justep.ProcessControl.Item.prototype.getTaskRelationValues = function() {
	return this._itemData["task-relation-value"];
};

// 获得指定任务关系的值
justep.ProcessControl.Item.prototype.getTaskRelationValue = function(relation) {
	return this._itemData["task-relation-value"][relation];
};

// 设置指定任务关系的值
justep.ProcessControl.Item.prototype.setTaskRelationValue = function(relation,
		value) {
	this._itemData["task-relation-value"][relation] = value;
};

// ProcessControl Item 扩展
justep.ProcessControl.Item.prototype.getExts = function() {
	return this._itemData["exts"];
};

justep.ProcessControl.Item.prototype.clearExts = function() {
	this._itemData["exts"] = {};
};

justep.ProcessControl.Item.prototype.getExt = function(name) {
	return this._itemData["exts"][name];
};

justep.ProcessControl.Item.prototype.setExt = function(name, value) {
	this._itemData["exts"][name] = value;
};

// TODO 以下为扩展方法

justep.ProcessControl.prototype.reset = function() {
	var e, t = this._noticeItems || [];
	for (e = 0; e < t.length; e++)
		t[e].setSelected(!0);
	var n = this._activities || [];
	for (e = 0; e < n.length; e++)
		this.updateActivityStatus(n[e], !1);
	var r = this.getFirstSelectableActivity();
	r && this.updateActivityStatus(r, !0);

};

justep.ProcessControl.prototype.getFirstSelectableActivity = function() {
	return this._getActivity(this._activities, function(e) {
		return e.isSelectable();
	})
};

justep.ProcessControl.prototype._getActivity = function(e, t) {
	e = e || [];
	for ( var n = 0; n < e.length; n++) {
		if (t.apply(this, [ e[n] ]))
			return e[n];
		var r = this._getActivity(e[n].getChildren(), t);
		if (r)
			return r
	}
	return null
};

justep.ProcessControl.prototype.getActivityByID = function(e) {
	return this._getActivity(this._activities, function(t) {
		return e === t.getID()
	})
};

justep.ProcessControl.prototype.getPostscript = function() {
	if (this._dataType == "xml") {
		return this._getNodeValue("/process-control/postscript/text()");
	} else {
		return this._jsonData["postscript"];
	}
};

justep.ProcessControl.prototype.setPostscript = function(e) {
	if (this._dataType == "xml") {
		return this._setNodeValue("/process-control/postscript", e);
	} else {
		return this._jsonData["postscript"] = e;
	}
};

justep.ProcessControl.prototype.hasSelectedActivity = function() {
	for ( var i = 0; i < this._activities.length; i++) {
		var e = this._activities[i];
		if (e.isSelected() && e.isSelectable())
			return true;
	}
	return false;
};

justep.ProcessControl.prototype.updateActivityStatus = function(e, t) {
	(typeof e == "string") && (e = this.getActivityByID(e)), this
			._updateActivityStatus(e, null, t, !0, !0)
};

justep.ProcessControl.prototype._updateActivityStatus = function(e, t, n, r, i) {
	var s, o;
	e.setSelected(n), e.isSelectable()
			&& this.getActivityByID(e.getID()).setSelected(n);
	if (i) {
		var u = e.getChildren();
		if (u)
			for (s = 0; s < u.length; s++)
				if (u[s] !== t) {
					var a = n && e.isXor() ? t ? !1 : s === 0 : n;
					u[s].isSelected() !== a
							&& this._updateActivityStatus.call(this, u[s],
									null, a, !1, !0)
				}
	}
	if (r) {
		var f = e.getParent();
		if (f) {
			if (f.isAnd() && e.isOptional()) {
				if (!n)
					for (s = 0; s < f.getChildren().length; s++) {
						o = f.getChildren()[s];
						if (o !== e && o.isSelected())
							return;
					}
				else if (f.isSelected())
					return;
			} else if (n && f.isXor() && f.isSelected()) {
				for (s = 0; s < f.getChildren().length; s++)
					o = f.getChildren()[s], o !== e && o.isSelected()
							&& this._updateActivityStatus(o, null, !1, !1, !0);
				return;
			}
			this._updateActivityStatus(f, e, n, !0, !0)
		}
	}
};

justep.ProcessControl.Activity.prototype.setSelected = function(e) {
	this._activityData["@selected"] = e + ""
};

justep.ProcessControl.Activity.prototype.getParent = function() {
	return this.parent
};

justep.ProcessControl.Activity.prototype.isSelected = function() {
	return this._activityData["@selected"] == "true"
};

justep.ProcessControl.Activity.prototype.isOptional = function() {
	return this._activityData["@optional"] == "true"
}, justep.ProcessControl.Activity.prototype.isXor = function() {
	return this._activityData["@@tag"] == "xor"
}, justep.ProcessControl.Activity.prototype.isAnd = function() {
	return this._activityData["@@tag"] == "and"
}
