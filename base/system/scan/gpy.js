var dev1;
var dev2;
var video1;
var video2;

var scanTempFolder = "D:\\扫描临时文件夹";
var resolutionIndex = 3;//1024
var scanFileHead = "扫描件";
var scanSubPath = "系统自定义扫描件";

function plugin() {
	return document.getElementById('view1');
}

function view1() {
	return document.getElementById('view1');
}

function view2() {
	return document.getElementById('view2');
}

function thumb1() {
	return document.getElementById('thumb1');
}

function addEvent(obj, name, func) {
	if (obj.attachEvent) {
		obj.attachEvent("on" + name, func);
	} else {
		obj.addEventListener(name, func, false);
	}
}
function OpenVideo() {
	CloseVideo();

	var select1 = document.getElementById('selRes1');
	var subtype1 = (plugin().Device_GetSubtype(dev1) == 2 ? 2 : 1);// 1
	// 表示仅支持YUY2
	// ，2
	// 表示仅支持MJPG，3
	// 表示两者均支持
	var nResolution1 = select1.selectedIndex;

	video1 = plugin().Device_CreateVideo(dev1, nResolution1, subtype1);
	if (video1) {
		view1().View_SelectVideo(video1);
		view1().View_SetText("打开视频中，请等待...", 0);
	}
}

function CloseVideo() {
	if (video1) {
		view1().View_SetText("", 0);
		plugin().Video_Release(video1);
		video1 = null;
	}
}

function Load() {
	// 设备接入和丢失
	// type设备类型， 1 表示视频设备， 2 表示音频设备
	// idx设备索引
	// dbt 1 表示设备到达， 2 表示设备丢失
	// 设置临时文件夹
	
	var temp = $.cookie("scanTempFolder");
	if (temp) {
		scanTempFolder = temp;
		$("#inputScanTempFolder").val(scanTempFolder);
	}
	plugin().Global_CreateDir(scanTempFolder);
	addEvent(plugin(), 'DevChange', function(type, idx, dbt) {
		if (1 == type) {
			if (0 == idx) {
				if (1 == dbt) {
					dev1 = plugin().Global_CreateDevice(1, 0);
					if (dev1) {
						video1 = plugin().Device_CreateVideo(dev1,
								resolutionIndex, 0);
						if (video1) {
							if (plugin().Global_GetEloamType(1, 0) == 1) {
								view1().View_SelectVideo(video1);
								view1().View_SetText("打开视频中，请等待...", 0);
							} else {
								view2().View_SelectVideo(video1);
								view2().View_SetText("打开视频中，请等待...", 0);
							}
							setTimeout(function(){
								Right();
							},5000);
						}

						var select = document.getElementById('selRes1');

						var nResolution = plugin().Device_GetResolutionCount(
								dev1);
						for ( var i = 0; i < nResolution; i++) {
							var width = plugin().Device_GetResolutionWidth(
									dev1, i);
							var heigth = plugin().Device_GetResolutionHeight(
									dev1, i);
							select.add(new Option(width.toString() + "*"
									+ heigth.toString()));
						}
						select.selectedIndex = resolutionIndex;
					}
				} else if (2 == dbt) {
					if (dev1) {
						if (plugin().Device_GetIndex(dev1) == idx) {
							if (video1) {
								view1().View_SetText("", 0);
								plugin().Video_Release(video1);
								video1 = null;
							}
							plugin().Device_Release(dev1);
							dev1 = null;
						}
					}
					if (dev2) {
						if (plugin().Device_GetIndex(dev2) == idx) {
							if (video2) {
								view2().View_SetText("", 0);
								plugin().Video_Release(video2);
								video2 = null;
							}
							plugin().Device_Release(dev2);
							dev2 = null;
						}
					}
				}
			} else if (1 == idx) {
				if (1 == dbt) {
					dev2 = null;//plugin().Global_CreateDevice(1, 1);
					if (dev2) {
						video2 = plugin().Device_CreateVideo(dev2, 0, 0);
						if (video2) {
							if (plugin().Global_GetEloamType(1, 1) == 1) {
								view1().View_SelectVideo(video2);
								view1().View_SetText("打开视频中，请等待...", 0);
							} else {
								view2().View_SelectVideo(video2);
								view2().View_SetText("打开视频中，请等待...", 0);
							}
						}

						var select = document.getElementById('selRes2');
						var nResolution = plugin().Device_GetResolutionCount(
								dev2);
						for ( var i = 0; i < nResolution; i++) {
							var width = plugin().Device_GetResolutionWidth(
									dev2, i);
							var heigth = plugin().Device_GetResolutionHeight(
									dev2, i);
							select.add(new Option(width.toString() + "*"
									+ heigth.toString()));
						}
					}
				} else if (2 == dbt) {
					if (dev1) {
						if (plugin().Device_GetIndex(dev1) == idx) {
							if (video1) {
								view1().View_SetText("", 0);
								plugin().Video_Release(video1);
								video1 = null;
							}
							plugin().Device_Release(dev1);
							dev1 = null;
						}
					}
					if (dev2) {
						if (plugin().Device_GetIndex(dev2) == idx) {
							if (video2) {
								view2().View_SetText("", 0);
								plugin().Video_Release(video2);
								video2 = null;
							}
							plugin().Device_Release(dev2);
							dev2 = null;
						}
					}
				}
			}
		}
	});

	addEvent(plugin(), 'MoveDetec', function(video, id) {
		// 自动拍照事件
	});

	addEvent(plugin(), 'Deskew', function(video, view, list) {
		// 纠偏回调事件
		var count = plugin().RegionList_GetCount(list);
		for ( var i = 0; i < count; ++i) {
			var region = plugin().RegionList_GetRegion(list, i);

			var x1 = plugin().Region_GetX1(region);
			var y1 = plugin().Region_GetY1(region);

			var width = plugin().Region_GetWidth(region);
			var height = plugin().Region_GetHeight(region);

			plugin().Region_Release(region);
		}

		plugin().RegionList_Release(list);
	});

	var title = document.title;
	document.title = title + plugin().version;

	view1().Global_SetWindowName("view");
	// view2().Global_SetWindowName("view");
	thumb1().Global_SetWindowName("thumb");

	plugin().Global_InitDevs();

	plugin().Global_InitIdCard();
	plugin().Global_InitBiokey();
	plugin().Global_InitReader();
	plugin().Global_InitMagneticCard();

	plugin().Global_DiscernIdCard();
	plugin().Global_ReaderStart();
	plugin().Global_MagneticCardReaderStart();
}

function Unload() {
	if (video1) {
		view1().View_SetText("", 0);
		plugin().Video_Release(video1);
		video1 = null;
		plugin().Device_Release(dev1);
		dev1 = null;
	}

	plugin().Global_DeinitMagneticCard();
	plugin().Global_DeinitReader();
	plugin().Global_DeinitBiokey();
	plugin().Global_DeinitIdCard();

	plugin().Global_DeinitDevs();
}

function EnableDate(obj) {
	if (obj.checked) {
		var offsetx = 1000;
		var offsety = 60;

		var font;
		font = plugin().Global_CreateTypeface(50, 50, 0, 0, 2, 0, 0, 0, "宋体");

		if (video1) {
			var width = plugin().Video_GetWidth(video1);
			var heigth = plugin().Video_GetHeight(video1);

			plugin().Video_EnableDate(video1, font, width - offsetx,
					heigth - offsety, 0xffffff, 0);
		}
		if (video2) {
			var width = plugin().Video_GetWidth(video2);
			var heigth = plugin().Video_GetHeight(video2);

			plugin().Video_EnableDate(video2, font, width - offsetx,
					heigth - offsety, 0xffffff, 0);
		}
		plugin().Font_Release(font);
	} else {
		if (video1) {
			plugin().Video_DisableDate(video1);
		}
		if (video2) {
			plugin().Video_DisableDate(video2);
		}
	}
}

function AddText(obj) {
	if (obj.checked) {
		var font;
		font = plugin().Global_CreateTypeface(100, 100, 200, 0, 2, 0, 0, 0,
				"宋体");

		if (video1) {
			var width = plugin().Video_GetWidth(video1);
			var heigth = plugin().Video_GetHeight(video1);

			plugin().Video_EnableAddText(video1, font, width / 2, heigth / 2,
					"文字水印", 0x0000FF, 150);
		}
		if (video2) {
			var width = plugin().Video_GetWidth(video2);
			var heigth = plugin().Video_GetHeight(video2);

			plugin().Video_EnableAddText(video2, font, width / 2, heigth / 2,
					"文字水印", 0x0000FF, 150);
		}
		plugin().Font_Release(font);
	} else {
		if (video1) {
			plugin().Video_DisableAddText(video1);
		}
		if (video2) {
			plugin().Video_DisableAddText(video2);
		}
	}
}

function ShowProperty() {
	if (dev1) {
		plugin().Device_ShowProperty(dev1, view1().View_GetObject());
	}
}

function Deskew(obj) {
	if (obj.checked) {
		if (video1) {
			plugin().Video_EnableDeskewEx(video1, 1);
		}
		if (video2) {
			plugin().Video_EnableDeskewEx(video2, 1);
		}
	} else {
		if (video1) {
			plugin().Video_DisableDeskew(video1);
		}
		if (video2) {
			plugin().Video_DisableDeskew(video2);
		}
	}
}

function SetState(obj) {
	var stat1 = view1().View_GetState();
	if (1 == stat1) {
		view1().View_SetState(2);
	} else if (2 == stat1) {
		view1().View_SetState(1);
	}
}

function Left() {
	if (video1) {
		plugin().Video_RotateLeft(video1);
	}
	if (video2) {
		plugin().Video_RotateLeft(video2);
	}

}

function Right() {
	if (video1) {
		plugin().Video_RotateRight(video1);
	}
	if (video2) {
		plugin().Video_RotateRight(video2);
	}

}

function Scan() {
	var imgList = plugin().Video_CreateImageList(video1, 0,
			view1().View_GetObject());
	if (imgList) {
		var len = plugin().ImageList_GetCount(imgList);
		for ( var i = 0; i < len; i++) {
			var img = plugin().ImageList_GetImage(imgList, i);
			var Name = scanTempFolder + "\\" +getScanName();
			var b = plugin().Image_Save(img, Name, 0);
			if (b) {
				thumb1().Thumbnail_Add(Name);
				thumb1().Thumbnail_SetCheck(thumb1().Thumbnail_GetCount(), true);
			}
			plugin().Image_Release(img);
		}
		plugin().ImageList_Release(imgList);
	}
}

function getScanName(){
	var count = thumb1().Thumbnail_GetCount();
	if(count==0){
		return  scanFileHead + "(1).jpg";
	}
	var fileName = thumb1().Thumbnail_GetFileName(count-1);
	var startIndex=fileName.lastIndexOf("(");
	var endIndex = fileName.lastIndexOf(")");
	var curCount = parseInt(fileName.substr(startIndex+1,endIndex-startIndex-1))+1;
	return scanFileHead + "("+curCount+").jpg";
}
