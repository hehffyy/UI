var camaraForm = {};
var w = 320, h = 240;
var pos = 0, ctx = null, saveCB, image = [], _param = null,scanSubPath=null;
camaraForm.model1Load = function(event) {

	var canvas = document.createElement("canvas");
	canvas.setAttribute("width", w);
	canvas.setAttribute("height", h);

	if (canvas.toDataURL) {
		ctx = canvas.getContext("2d");
		image = ctx.getImageData(0, 0, w, h);
		saveCB = function(data) {
			var col = data.split(";");
			var img = image;

			for ( var i = 0; i < w; i++) {
				var tmp = parseInt(col[i]);
				img.data[pos + 0] = (tmp >> 16) & 0xff;
				img.data[pos + 1] = (tmp >> 8) & 0xff;
				img.data[pos + 2] = tmp & 0xff;
				img.data[pos + 3] = 0xff;
				pos += 4;
			}
			if (pos >= 4 * w * h) {
				ctx.putImageData(img, 0, 0);
				var param = {
					kind : "image"
				};
				param.fileName = "照片.png";
				if(scanSubPath==null)
					scanSubPath="拍摄照片临时";
				param.subPath = scanSubPath;
				param.docId = "";
				param.file = canvas.toDataURL("image/png");
				_param = param;
				document.getElementById("img").src = param.file;
			}
		};

	} else {
		debugger;
		// saveCB = function(data) {
		// image.push(data);
		//
		// pos += 4 * w;
		//
		// if (pos >= 4 * w * h) {
		// $.post("${ctx}/common/webcam/uploadPhoto", {
		// type : "pixel",
		// image : image.join('|')
		// }, function(msg) {
		// console.log(msg);
		// pos = 0;
		// $("#img").attr("src", "${ctx}/" + msg);
		// });
		// }
		// };
	}
	$("#webcam").webcam({
		width : w,
		height : h,
		mode : "callback",
		swffile : "js/jscam_canvas_only.swf",

		onSave : saveCB,

		onCapture : function() {
			webcam.save();
		},

		debug : function(type, string) {
			console.log(type + ": " + string);
		}
	});
};

camaraForm.btnCamaraClick = function(event) {
	pos = 0;
	webcam.capture();
};

camaraForm.btnOkClick = function(event) {
	if(_param==null){
		return;
	}
	var param = JSON.stringify(_param);
	var result = butoneEx.Common.callAction({
		param : param
	}, "uploadDocString",
			"/base/system/process/SystemConfig/systemConfigProcess",
			"unitTypeConfig");
	if (result.sucess) {
		var docIds = JSON.parse(result.content);
		justep.xbl("windowReceiver").windowEnsure({
					kind : 'upload',
					attachs : [ docIds ]
				});
		console.error(result.sucess);
	}
};

camaraForm.windowReceiverReceive = function(event){
	if (event.data) {
		var data = event.data;
		scanSubPath = data.subPath;
	}
};
