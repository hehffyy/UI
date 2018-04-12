(function(butone) {
	var bizOperationDefine = {
		"preempt" : {
			label : "办理",
			iconClass : "icon-system-play",
			cssClass : "button-green"
		},
		"revokePreempt" : {
			label : "取消办理",
			iconClass : "icon-system-reply"
		},
		"advance" : {
			label : "发送",
			iconClass : "icon-system-play",
			cssClass : "button-blue"
		},
		"batchAdvance" : {
			label : "批量发送",
			iconClass : "icon-system-play"
		},
		"transfer" : {
			label : "转发",
			iconClass : "icon-system-forward"
		},

		"back" : {
			label : "回退",
			iconClass : "icon-system-reply"
		},
		"abort" : {
			label : "作废办结",
			iconClass : "icon-system-back"
		},

		"untread" : {
			label : "退文办结",
			iconClass : "icon-system-back"
		},
		"delete" : {
			label : "删除办结",
			iconClass : "icon-system-back"
		},
		"apprize" : {
			label : "补正告知",
			iconClass : "icon-system-pause"
		},
		"specialProcedure" : {
			label : "特别程序",
			iconClass : "icon-system-pause"
		},
		"suspend" : {
			label : "挂起",
			iconClass : "icon-system-pause"
		},
		"special" : {
			label : "特事特办",
			iconClass : "icon-system-sitemap"
		},
		"submit" : {
			label : "转报办结",
			iconClass : "icon-system-pause"
		},

		"resume" : {
			label : "解挂",
			iconClass : "icon-system-play"
		},
		"apprizeAccept" : {
			label : "补正受理",
			iconClass : "icon-system-play"
		},
		"apprizeAbort" : {
			label : "补正不来办结",
			iconClass : "icon-system-back"
		},
		"specialProcResult" : {
			label : "特别程序结果",
			iconClass : "icon-system-play"
		}
	};

	butone.BizOperation = {
		getBizOperationDefine : function() {
			return bizOperationDefine;
		},
		getBizOperationDialogUrl : function(event) {
			if (event.action == "suspendQuery") {
				if (event.options.suspendKind == "skSpecialProcedure") {
					return "/UI/base/core/flowOperation/specialDialog.w";
				} else if (event.options.suspendKind == "skApprize") {
					return "/UI/base/core/flowOperation/bujiaoDialog.w";
				} else
					return "/UI/base/core/flowOperation/suspendDialog.w";
			} else if (event.action == "resumeQuery") {
				if (event.options.suspendKind == "skApprize")
					return "/UI/base/core/flowOperation/bujiaoShouliDialog.w";
				else if (event.options.suspendKind == "skSpecialProcedure") {
					return "/UI/base/core/flowOperation/specialResultDialog.w"
				}
			} else if (event.action == "apprizeAcceptQuery") {
				return "/UI/base/core/flowOperation/bujiaoShouliDialog.w";
			} else if (event.action == "specialProcResultQuery") {
				return "/UI/base/core/flowOperation/specialResultDialog.w";
			} else if (event.action == "advanceQuery") {
				if (!event.options.isBatch && event.data.to.length == 1
						&& event.data.to[0]["@is-end"] == "true") {
					return "/UI/base/core/flowOperation/finishDialog.w";
				}else if(event.options.isBatch){
					return justep.Context._getNodeValue("/form/bizParams/batchAdvanceProcessDialog/text()")||"/UI/base/core/flowOperation/batchProcessDialog.w"
				}
			} else if (event.action == "abortQuery") {
				return "/UI/base/core/flowOperation/finishDialog.w";
			}
		}
	};
})(butone);