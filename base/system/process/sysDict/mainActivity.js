var mainActivity = {};

mainActivity.listDataNewCreateParam = function(event) {
	var data = justep.xbl("dataMain");
	event.defaultValues = [ {
		FTYPE : data.getValue("FTYPE"),
		FDISPORDER : event.source.getCount() + 1
	} ];
};

mainActivity.dataMainValueChanged = function(event) {
	if (event.column == 'FTYPE') {
		var data = justep.xbl("listData");
		for ( var n = 0; n < data.getCount(); n++) {
			var rowId = data.getID(n);
			data.setValue("FTYPE", event.value, rowId);
		}
	} else if (event.column == 'FNAME') {
		var data = event.source;
		if (!data.getValue("FTYPE")) {
			data.setValue("FTYPE", justep.String.makeFirstPY(event.value));
		}
	}
};
