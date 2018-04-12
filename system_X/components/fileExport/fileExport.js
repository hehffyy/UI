(function(global) {

	var downlaodURL = justep.Request
			.convertURL("/UI/system_X/components/fileExport/fileExport.j");
	var process = "/base/system/process/bizSystem/bizSystemProcess";
	var activity = "mainActivity";

	var fileExport = function(xblObj) {
		if (typeof (dhtmlxEventable) != 'undefined')
			dhtmlxEventable(this);
		else if (typeof (justep.Utils.eventable) != 'undefined')
			justep.Utils.eventable(this);

		var el = $(xblObj.domNode);
		this.id = justep.Utils.randomString();
		this.url = el.attr('url');
		this.downloadFilename = el.attr("download-filename");
		this.async = el.attr("async") == "true";
		var onBeforeExecute = justep.Function.get(el.attr("onBeforeExecute"));
		if (onBeforeExecute) {
			this.attachEvent("onBeforeExecute", onBeforeExecute, this);
		}
	};

	fileExport.prototype = {
		/***/
		execute : function() {
			var me = this, options = {}, evt = {
				bizRecId : justep.Context.getProcessData1(),
				variants : new justep.Request.MapParam(),
				filters : new justep.Request.MapParam()
			};
			if (this.checkEvent("onBeforeExecute")) {
				this.callEvent("onBeforeExecute", [ evt ]);
			}
			var param = new justep.Request.ActionParam();
			param.setString('url', justep.String.HTMLEncode(this.url));
			param.setString('bizRecId', justep.Context.getProcessData1());
			param.setMap('variants', evt.variants);
			param.setMap('filters', evt.filters);
			param
					.setString('targetProcess', justep.Context
							.getCurrentProcess());
			param.setString('targetActivity', justep.Context
					.getCurrentActivity());
			options.contentType = 'application/json';
			options.dataType = "json";
			options.parameters = param;
			options.process = process;
			options.activity = activity;
			options.action = "exportExternalFileAction";
			options.callback = function(data) {
				if (data.state) {
					var fileName = data.response;
					me._downloadFile(fileName);
				} else {
					butone.Dialog.error(data.response.message);
				}
			};
			justep.Request.sendBizRequest2(options);
		},

		_showWaiting : function() {
			var me = this, ds = parseInt(new Date() - me._waitingStart) / 1000; // 两个时间相差的秒数
			var ss = ds % 60;// 余为秒
			var mm = ds / 60;// 商为分
			$("#statusPanel").html(mm + ":" + ss).show().unbind("click").bind(
					"click", function() {
						me._closeWaiting();
					});
		},

		_closeWaiting : function() {
			$("#statusPanel").html("... 加载  ...").unbind("click").hide();
		},
		/**
		 * 解析json返回结果
		 * 
		 * @param response
		 */
		_downloadFile : function(fileName) {
			var self = this, url = justep.Request.convertURL(downlaodURL)
					+ "&action=downloadExternalFileAction&fileName="
					+ encodeURI(fileName)
					+ (self.downloadFilename ? ('&$downloadFilename=' + encodeURI(self.downloadFilename))
							: '');
			url = justep.Request.setBizParams(url, process, activity);
			var callDownload = function() {
				var frame = $(self.getElementByXblID('download'));
				if (!justep.Browser.hasTouch && frame)
					$(self.getElementByXblID('download')).attr('src', url);
				else
					window.open(url);
			};
			if (self.async) {
				if (self._timer) {
					clearInterva(_timer);
					delete self._timer;
				}
				self._waitingStart = new Date();
				self._showWaiting();
				self._timer = setInterval(function() {
					var param = new justep.Request.ActionParam();
					param.setString('fileName', fileName);
					options.contentType = 'application/json';
					options.dataType = "json";
					options.parameters = param;
					options.process = process;
					options.activity = activity;
					options.action = "exportFileFinishedAction";
					options.callback = function(data) {
						if (data.state) {
							if (data.response) {
								self._closeWaiting();
								callDownload();
							}
						}
					};
				}, 1000);
			} else {
				callDownload();
			}
		}
	};

	var com = global.com = global.com || {};
	com.butone = com.butone || {};
	com.butone.FileExport = fileExport;
})(window);
