(function(global) {

	function createPoint(x, y) {
		return [ parseFloat(x), parseFloat(y) ];
	}

	/**
	 * 添加到环
	 * 
	 * @param ring
	 * @param x
	 * @param y
	 * @returns
	 */
	function addToRing(ring, x, y) {
		if (!ring)
			ring = [];
		ring.push(createPoint(x, y));
		return ring;
	}

	gisUtils = {

		/**
		 * 通过数据集获得属性对象
		 * 
		 * @param data
		 *            {XData}数据集
		 * @param attr
		 *            {Array} 字段列表
		 * @param label
		 *            {Boolean} 可选。是否使用字段的label当做属性名
		 * @param rowId
		 *            {String} 可选。主键值,data.getID(index)，默认当前记录。
		 * @param o
		 *            {Object} 可选。原始对象，可选，追加属性到原始对象。
		 * @returns {Object}
		 * @example
		 * 
		 * <pre>
		 * var obj = gisUtils.fetchAttributes(justep.xbl('BizRec'), [ 'fBizRecId' ]);
		 * obj = gisUtils
		 * 		.fetchAttributes(justep.xbl('xmxx'), [ 'xmmc', 'pwh' ], null, obj);
		 * </pre>
		 */
		fetchAttributes : function(data, attr, label, rowId, o) {
			var attr = {};
			for ( var n in attr) {
				var l = data.getRelationInfo(n).label;
				if (!l || "" == l)
					l = n;
				attr[l] = data.getValue(attr[n], rowId);
			}
			return justep.extend(o || {}, attr);
		},

		/**
		 * 通过数据集创建环Ring数组
		 * 
		 * @param data
		 *            {XData}数据集
		 * @param arrtPart
		 *            {String}环号字段
		 * @param arrtX
		 *            {String}X坐标字段
		 * @param attrY
		 *            {String}Y坐标字段
		 * @returns {Array}
		 */
		createRings : function(data, arrtPart, arrtX, attrY) {
			var rings = [];
			var spa = {};
			if (data.limit != -1)
				data.loadAllPageData();
			var length = data.getCount();
			var part = justep.Utils.randomString();
			var ring;
			for ( var i = 0; i < length; i++) {
				var rowId = data.getID(i);
				if (part != data.getValue(arrtPart, rowId) || rings.length == 0) {
					ring = [];
					rings.push(ring);
					part = data.getValue(arrtPart, rowId);
				}
				ring = addToRing(ring, data.getValue(arrtX, rowId), data
						.getValue(attrY, rowId));
			}
			return rings;
		},

		/**
		 * 创建面
		 * 
		 * @param rings
		 *            {Array} 环组成的数组
		 * @param spatialReference
		 *            {String|Integer} 可选。空间参考
		 *            Integer为wkid,String为wkt，如果图形与地图参考不一致必须设置，否则无法投影
		 */
		createPolygon : function(rings, spatialReference) {
			var polygon = {
				rings : rings
			};
			if (spatialReference) {
				if (typeof (spatialReference) == "number")
					polygon.spatialReference = {
						wkid : spatialReference
					};
				else
					polygon.spatialReference = {
						wkt : spatialReference
					};
			}
		},

		/**
		 * 创建要素。用于绘制是可增加symbol属性
		 * 
		 * @param attributes
		 *            {Object} 属性
		 * @param geometry
		 *            {Object}图形
		 * @returns {Object}
		 */
		createFeature : function(attributes, geometry) {
			return {
				attributes : attributes,
				geometry : geometry
			};
		},

		/**
		 * 
		 * @param style
		 *            {String} esriSFSBackwardDiagonal | esriSFSCross |
		 *            esriSFSDiagonalCross | esriSFSForwardDiagonal |
		 *            esriSFSHorizontal | esriSFSNull | esriSFSSolid |
		 *            esriSFSVertical
		 * @param outline
		 *            {Object} 参考createSimpleLineSymbol
		 * @param color
		 *            {Array} [r,g,b,t] 三原色及透明度，透明度可选
		 * @returns {Object}
		 */
		createFillSymbol : function(style, outline, color) {
			return $.extend({
				"type" : "esriSFS",
				"style" : style,
				"color" : color,
				"outline" : outline
			}, new gisUtils.Symbol());
		},

		/**
		 * 创建线符号，可用于FillSymbol的outline
		 * 
		 * @param style
		 *            {String} esriSLSDash | esriSLSDashDotDot | esriSLSDot |
		 *            esriSLSNull | esriSLSSolid
		 * @param width
		 *            {Number} 线宽
		 * @param color
		 *            {Array} [r,g,b,a] 三原色及透明度，透明度可选
		 * @returns {Object}
		 */
		createLineSymbol : function(style, width, color) {
			return $.extend({
				"type" : "esriSLS",
				"style" : style,
				"color" : color,
				"width" : width
			}, new gisUtils.Symbol());
		},

		/**
		 * 以新window窗口形式打开地图。返回WindowOpener对象，重复打开 WindowOpener.open({data:data})
		 * 
		 * @param data
		 *            {subSystemName:"子系统",urlParams:"初始化参数",actions:[{name:"动作名",params:[参数1,参数2,...]}]}
		 * @param options {
		 *            "modal" : true, "status" : "fullscreen"}
		 * @returns {justep.WindowOpener}
		 */
		openMap : function(data, options) {
			options = options || {};
			options.url = "/UI/base/mapBrowser/mapBrowser.w";
			if (false != options.model)
				options.model = true;
			if (!options.status)
				options.status = "fullscreen";
			var opener = new justep.WindowOpener(options);
			opener.open({
				data : data
			});
			return opener;
		},

		/**
		 * 以系统功能的形式打开地图。返回WindowRunner对象，重复打开 WindowRunner.open2({data:data})
		 * 
		 * @param data
		 *            {subSystemName:"子系统",urlParams:"初始化参数",actions:[{name:"动作名",params:[参数1,参数2,...]}]}
		 * @param title
		 *            {String} 标题
		 * @returns {justep.WindowRunner}
		 */
		runMap : function(data, title, onReceive) {
			var runner = new justep.WindowRunner(
					"/UI/base/mapBrowser/mapBrowser.w?time="
							+ justep.Utils.randomString(), title);
			var options = {
				data : data,
				onReceive : onReceive
			};
			runner.open2(options);
			return runner;
		},

		locateMap : function(openKind, title, subSystemName, locatorType,
				where, onSucess, onError) {
			var me = this;
			butone.Loader.requireJS(
					[ "system/components/dialog/dialog",
							"system/components/windowDialog/windowDialog",
							"system/components/windowRunner/windowRunner" ])
					.done(function(){
						me._locateMap(openKind, title, subSystemName,
								locatorType, where, onSucess, onError);
					}
							);
		},

		/**
		 * 定位地图
		 * 
		 * @param openKind
		 *            打开方式 runner,dialog
		 * @param subSystemName
		 *            子系统
		 * @param title
		 *            标题
		 * @param locatorType
		 *            一张图定位组件中配置的Type
		 * @param where
		 *            过滤条件
		 * @param onSucess
		 *            成功回调
		 * @param onError
		 *            错误回调
		 */

		_locateMap : function(openKind, title, subSystemName, locatorType,
				where, onSucess, onError) {
			if (!where)
				throw "地图定位条件不允许为空！";
			var locate_opt = {
				dataType : locatorType,
				params : {
					where : where
				}
			};
			var action = {
				name : "locate",
				args : [
						locate_opt,
						function(data) {
							var mapBrowser = this.mapRunner.iframe.contentWindow.mapBrowser;
							var event = {
								data : data,
								mapBrowser : mapBrowser
							};
							if (data.length == 0 && !onSucess)
								mapBrowser.showMessage("不存在指定的要素，请核查图形是否入库。");
							else
								onSucess(event);
						},
						function(data) {
							var mapBrowser = this.mapRunner.getContentWindow().mapBrowser;
							var event = {
								error : data,
								mapBrowser : mapBrowser
							};
							if (data.length == 0 && !onError)
								mapBrowser.showMessage("不存在指定的要素，请核查图形是否入库。");
							// mapBrowser.showMessage("地图定位操作失败", data);
							else
								onError(event);
						} ]
			};
			var param = {
				subSystemName : subSystemName,
				actions : [ action ]
			};
			debugger;
			if (openKind == null || openKind == "runner")
				window.mapRunner = gisUtils.runMap(param, title);
			else
				window.mapRunner = gisUtils.dialogMap(param, title, {
					modal : true,
					status : "maximize",
					reloadOnOpen : true
				});
		},
		/**
		 * 以弹出框形式打开地图。返回WindowDialog对象，重复打开 WindowDialog.open2({data:data})
		 * 
		 * @param data
		 *            {subSystemName:"子系统",urlParams:"初始化参数",actions:[{name:"动作名",params:[参数1,参数2,...]}]}
		 * @param title
		 *            标题
		 * @param options
		 *            {modal:true,status:"undefined|minimize|maximize",width:400,height:300,top:0,left:0,reloadOnOpen:false}
		 * @returns {justep.WindowDialog}
		 */
		dialogMap : function(data, title, options) {
			options = options || {};
			var dialog = new justep.WindowDialog(null,
					"/UI/base/mapBrowser/mapBrowser.w", title, options.modal,
					options.status, options.width, options.height,
					options.left, options.top, options.reloadOnOpen);
			dialog.open2({
				data : data
			});
			return dialog;
		}

	};

	gisUtils.Symbol = function() {

	};

	gisUtils.Symbol.prototype = {
		toString : function() {
			return JSON.stringify(this);
		}
	};

	global.gisUtils = gisUtils;
}(window));