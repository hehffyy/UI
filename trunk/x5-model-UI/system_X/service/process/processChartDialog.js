var processChartDialog = {};
processChartDialog.taskGuid="";
processChartDialog.isPertLoaded = false;

processChartDialog.model1Load = function(event){
	processChartDialog.taskGuid = justep.Request.URLParams["taskID"];
	if(!processChartDialog.taskGuid)return;
	justep.xbl('track').loadByTask(processChartDialog.taskGuid);
};

processChartDialog.tabPage1Select = function(event){
	if(!processChartDialog.taskGuid){
		processChartDialog.taskGuid  = justep.Request.URLParams["taskID"];
	}
	if (!processChartDialog.isPertLoaded){
		processChartDialog.isPertLoaded = true;
		justep.xbl("pert").loadByTask(processChartDialog.taskGuid);
	}
};
