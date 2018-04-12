var chuanYueActivity = {};
var bCy = true;
chuanYueActivity.trigger1Click = function(event) {
	var result = [];
	var orgDs = justep.xbl("bizData1");
	var sIDs = justep.xbl("data1").getValue("personID");
	var sNames = justep.xbl("data1").getValue("personName");
	var idea = justep.xbl("data1").getValue("idea");
	if (bCy && sIDs == "") {
		alert("请选择传阅人");
		return;
	}
	result.push([ justep.Context.getCurrentPersonID(),
			justep.Context.getCurrentPersonName(),
			justep.Context.getCurrentDeptID(),
			justep.Context.getCurrentDeptName(),
			idea
			 ]);
	if(sIDs!=""){
		sIDs = sIDs.split(" ");
	sNames = sNames.split(" ");
	for ( var i = 0; i < sIDs.length; i++) {
		var sID = sIDs[i];
		var sName = sNames[i];
		var sFID = orgDs.getValue("sFID", sID);
		var sFName = orgDs.getValue("sFName", sID);
		var sDeptID = justep.Org.OrgUtils.getIDByFID(sFID, "dpt");
		var sDeptName = justep.Org.OrgUtils.getNameByFName(sFID, sFName, "dpt");
		var sGlobalSequence = orgDs.getValue("sGlobalSequence", sID);
		sID = orgDs.getValue("sPersonID", sID);
		result.push([ sID, sName, sDeptID, sDeptName, "", sGlobalSequence ]);
	}
	}
	justep.xbl("windowReceiver").windowEnsure(result);
};

chuanYueActivity.trigger2Click = function(event) {
	justep.xbl("windowReceiver").windowCancel();
};

chuanYueActivity.windowReceiverReceive = function(event) {
	if (event.data.isYueBan) {
		justep.xbl("VSplitter1").moveToStart();
		bCy = false;
	}
	if(!!event.data.idea){
		justep.xbl("data1").setValue("idea",event.data.idea);
	}
};
