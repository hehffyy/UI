var mapBrowser = {
	mapBaseUrl : location.protocol + "//" + location.host + "/onemap-webapp"
};

/**
 * data :
 * {url:"http://localhost:9080/onemap-webapp",subSystemName:"zbgh",urlParams:"",actions:[{name:"drawFeature",params:"123"}]}
 */
mapBrowser.windowReceiverReceive = function(event) {
	var data = event.data;
	var mapUrl = (data.url ? data.url : this.mapBaseUrl)
			+ (data.subSystemName ? "/" + data.subSystemName : "")
			+ "?loadApi=true";
	if (data.urlParams) {
		if (data.urlParams.charAt(0) != "&")
			mapUrl += "&";
		mapUrl += data.urlParams;
	}
	this.callURL(mapUrl, data.actions);
};

mapBrowser.callURL = function(mapUrl, actions) {
	if (mapUrl)
		this.mapUrl = mapUrl;
	if (actions)
		this.actions = actions;
	if (this.mapUrl) {
		this.$iframe.attr("src", "about:blank");
		var self = this;
		var urlA = this.mapUrl;
		window.setTimeout(function() {
			self.$iframe.attr("src", urlA);
		}, 1);
	}
};

mapBrowser.showMessage = function(msg,details){
		 (new justep.System.showMessage()).open({
          msg : msg,
          details:details,
          title:"提示",
          type :0
          });

};

mapBrowser.initOneMap = function() {
	this.$iframe = $("#oneMap");
	var frame = this.$iframe[0];
	try {// 沉默跨域的url
		this.mapWindow = frame.contentWindow;
		try {
			var mapApi = this.mapWindow.MapAPI;
			if (mapApi) {
				this.mapApi = mapApi;
				if (justep.WindowReceiver.windowParentObj) {
					window.justep.windowReceiver.windowEnsure(this, true);
				}
				butone.defer(this._initInvokeAction, 0, this);
			}
		} catch (e) {
		}
	} catch (e) {
	}
};

/**
 * 添加graphic到地图中。
 * 
 * @param {(esri/graphic|Array
 *            <Object>)} graphic graphic对象或者graphic列表。
 * @param {{zoom:boolean,idAttribute:String,removeExist:boolean}}
 *            [options] 添回graphic的选项。
 * @param {function}
 *            [callback] 回调方法。
 * @param {function(Error)}
 *            [errback] 错误回调方法。
 */
mapBrowser.addGraphic = function(graphic, options, callback, errback) {
	this.applyMapAction("addGraphic", [ graphic, options, callback, errback ]);
},

mapBrowser._initInvokeAction = function() {
	if (!this.actions)
		return;
	for ( var n in this.actions) {
		var action = this.actions[n];
		this.applyMapAction(action.name, action.args);
	}
};

mapBrowser.applyMapAction = function(name, args) {
	if (this.mapApi) {
		var tags = name.split(".");
		var fn = this.mapApi[tags[0]];
		for ( var i = 1; i < tags.length; i++)
			fn = fn[tags[i]];
		if (fn && typeof (fn) == "function") {
			debugger;
			fn.apply(this.mapApi, args);
			
		}
	}
};
