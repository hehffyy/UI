var mainActivity = {};

mainActivity.getIdiomsData = function() {
	return justep.xbl("idiomsData");
};

mainActivity.idiomsDataAfterNew = function(event) {
	mainActivity.getIdiomsData().setValue("owner", 1);
};

mainActivity.upClick = function(event) {
	var store = mainActivity.getIdiomsData().getStore();
	var rowID = store.getSelectedRowId();
	if (rowID)
		store.moveRowPro(-1, rowID);
	mainActivity.sortData();
};

mainActivity.downClick = function(event) {
	var store = mainActivity.getIdiomsData().getStore();
	var rowID = store.getSelectedRowId();
	if (rowID)
		store.moveRowPro(1, rowID);
	mainActivity.sortData();
};

mainActivity.sortData = function(){
	var idiomsData = mainActivity.getIdiomsData();
	for(var i=0;i<idiomsData.getCount();i++){
		var rowID = idiomsData.getID(i);
		idiomsData.setValue("fSort",i,rowID);
	}
	idiomsData.saveData();
};