var exportConfig = {};
var dataId = '';
function allSelect(selected) {
	var data = justep.xbl('main');
	var grid = data.getStore();
	var len = data.getCount();
	var value = selected ? '1' : '0';
	for ( var i = 0; i < len; i++) {
		grid.setValueByName('ch', value, i);
	}
}
function move(v) {
	var data = justep.xbl('main');
	var grid = data.getStore();
	grid.moveRowPro(v);
}
exportConfig.windowReceiver1Receive = function(event) {
	var obj = event.data;
	if (obj.dataId != dataId) {
		var mainData = justep.xbl('main');
		if (mainData.getCount() > 0)
			return;
		dataId = obj.dataId;
		var data = obj.getData();
		var exportCalculate = obj.isExportCalculate();
		var ids = obj.getRelations();
		if (ids.length <= 0) {
			ids = data.getColumnIds();
			ids = ids.split(data.delim);
		}
		for ( var i = ids.length - 1; i >= 0; i--) {
			var colInfo = data.getColumnInfo(ids[i]);
			if ((data.versionRelation != ids[i]) && ('space-column' != ids[i])
					&& (exportCalculate || ('EXPRESS' != colInfo.define))) {
				var l = obj.getRelationLabel(ids[i]);
				var values = [ '1', (l ? l : colInfo.label),
						obj.getRelationWidth(ids[i]), ids[i], colInfo.type,
						(i + 1) + '' ];
				mainData.insert(i + '', 0, values);
			}
		}
		if (obj.isExportKey())
			mainData.insert(mainData.createUUID(), 0, [ '1',
					data.getConceptName(), '', '主键', 'key', '0' ]);
	}
};

exportConfig.trigger7Click = function(event){
	justep.WindowReceiver.windowEnsure(justep.xbl('main'));
};

exportConfig.trigger8Click = function(event){
	justep.WindowReceiver.windowCancel();
};
