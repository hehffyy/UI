var pageSetup = {};
var pageSetup = {
	changeCount : 0
};

/**
 * name:data#onValueChanged description: <b>[回调型事件]</b>数据变化
 * 
 * @param event
 *            它的结构如下:<br/>{"source":组件的js对象,"column":关系,"rowIndex":行索引,"value":新值,"originalValue":旧值}
 */
pageSetup.pageInfoValueChanged = function(data) {
	try {
		pageSetup.changeCount++;
		if (pageSetup.changeCount == 1) {
			if (data.column == 'paperType' || data.column == 'orientation') {
				var select = justep.xbl('selectpaperType');
				var paperType = select.getValue();

				var pageTypeData = justep.xbl('pageType');
				var width = pageTypeData.getValue('pageWidth');
				var height = pageTypeData.getValue('pageHeight');
				debugger;
//				if (data.source.getValue('orientation') == '1') {
//					data.source.setValue('pageWidth', height);
//					data.source.setValue('pageHeight', width);
//				} else {
					data.source.setValue('pageWidth', width);
					data.source.setValue('pageHeight', height);
				//}
			} else if ((data.column == 'pageWidth')
					|| (data.column == 'pageHeight')) {
				var pageInfo = justep.xbl('pageInfo');
				pageInfo.setValue('paperType', 'custom');
				pageInfo.setValue('displayName', '自定义');
			}
		}
	} finally {
		pageSetup.changeCount--;
	}

};

function getPageInfoData() {
	xforms.blur(true);
	var data = justep.xbl("pageInfo");
	var returnData = {};
	var colArray = data.getColumns().split(',');
	$.each(data.getRowData(data.getCurrentRowId()), function(i, n) {
		returnData[colArray[i]] = n;
	});
	return returnData;
}

pageSetup.windowReceiver1Receive = function(event) {
	justep.xbl('pageType').next();
	var data = event.data;
	data.fid = "excel";
	try {
		pageSetup.changeCount++;
		var pageInfo = justep.xbl("pageInfo");
		debugger;
		pageInfo.setValue('paperType', data.paperType);
		pageInfo.setValue('displayName', data.paperType);
		pageInfo.setValue('pageWidth', data.pageWidth);
		pageInfo.setValue('pageHeight', data.pageHeight);
		pageInfo.setValue('orientation', data.orientation);
		pageInfo.setValue('marginTop', data.marginTop);
		pageInfo.setValue('marginLeft', data.marginLeft);
		var  printer = justep.xbl("printer");
		printer.deleteAllRow();
		for(var i in data.printers){
			printer.newData();
			printer.setValue("name",data.printers[i]);
		}
		pageInfo.setValue("printer", data.printer);
	} finally {
		pageSetup.changeCount--;
	}
	/**
	 * { paperType:"A4", pageWidth:"210mm", pageHeight:"297mm", orientation:"",
	 * marginTop:"10mm", marginBottom:"10mm", marginLeft:"10mm",
	 * marginRight:"10mm", marginHeader:"", marginFootter:"" }
	 */
};

