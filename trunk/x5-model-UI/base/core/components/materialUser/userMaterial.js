var userMaterial = {};

userMaterial.grid2_calculate0Render = function(event){
var html = "<a id=\"btnupdate\" style='color:red;' onclick=\"userMaterial.choiceClass('" + event.rowId + "')\" >确定</a>";
return html;
	
};

userMaterial.choiceClass = function(userProcessId){
	
	var data=justep.xbl("newUserData");
	data.saveData();
	var r = {
				"fBusinessName" : data.getValue("fBusinessName",userProcessId),
				"fUserProcessId" : userProcessId
			};
	justep.xbl('windowReceiver1').windowEnsure(r);
};
userMaterial.BizchoiceClass = function(userProcessId){
	debugger;
	var data=justep.xbl("userProcessData");
	data.saveData();
	
	
	var r = {
				"fBusinessName" : data.getValue("fBusinessName",userProcessId),
				"fUserProcessId" : userProcessId
			};
	justep.xbl('windowReceiver1').windowEnsure(r);
};

 
userMaterial.copyNewClick = function(event){

	var data=justep.xbl("newUserData");
	var rowid=data.getCurrentID();
	var personID=justep.Context.getCurrentPersonID();
	var personName=justep.Context.getCurrentPersonName();
	var map = new justep.Request.MapParam();// variables
	map.put("rowid", rowid);
	map.put("personID", personID);
	map.put("personName", personName);
	var options = {};
	var param = new justep.Request.ActionParam();
	param.setMap("variables", map);
	options.contentType = 'application/json';
	options.dataType = "json";
	options.action = "copyMaterialAction";
	options.parameters = param;
	var result = justep.Request.sendBizRequest2(options);
	
	data.refreshData();

};


userMaterial.materialDataRefreshCreateParam = function(event){
	var mapParam = new justep.Request.MapParam();
	mapParam.put('dictType', 'clsx');
	event.param.setMap('variables', mapParam);	
};

userMaterial.setDefaultClick = function(event){

	var mainData = justep.xbl('newUserData') ;
	
	for(var i=0;i<mainData.getCount();i++){
		var rowID = mainData.getID(i);
		mainData.setValue("fIsDefault",'否',rowID);
	}	
	
	mainData.setValue("fIsDefault",'是',mainData.getCurrentID());
	mainData.saveData();
	mainData.refreshData();
			
};

userMaterial.grid1_calculate0Render = function(event){
var html = "<a id=\"btnupdate\" style='color:red;' onclick=\"userMaterial.BizchoiceClass('" + event.rowId + "')\" >确定</a>";
return html;
		
};


userMaterial.model1XBLLoaded = function(event){

var newUserData=justep.xbl("newUserData");	
var personid=justep.Context.getCurrentPersonID();
newUserData.setFilter("B_UserProcess", "B_UserProcess.fUserID='"+personid+"'");	
newUserData.refreshData();	
	var UserBusinessMaterialData=justep.xbl("UserBusinessMaterialData");
	UserBusinessMaterialData.setFilter("B_UserBusinessMaterial", "B_UserBusinessMaterial.fUserProcessID='"+newUserData.getCurrentID()+"'");
	UserBusinessMaterialData.refreshData();	
};

userMaterial.tabPage1Select = function(event){

var newUserData=justep.xbl("newUserData");	
var personid=justep.Context.getCurrentPersonID();
newUserData.setFilter("B_UserProcess", "B_UserProcess.fUserID='"+personid+"'");	
newUserData.refreshData();	
var newUserData=justep.xbl("newUserData");
var UserBusinessMaterialData=justep.xbl("UserBusinessMaterialData");
	UserBusinessMaterialData.setFilter("B_UserBusinessMaterial", "B_UserBusinessMaterial.fUserProcessID='"+newUserData.getCurrentID()+"'");
	UserBusinessMaterialData.refreshData();	
	justep.xbl("trigger4").setDisabled(false);
	justep.xbl("trigger6").setDisabled(false);
	justep.xbl("UserBusinessMaterialData").setReadonly(false);
};

userMaterial.tabPage2Select = function(event){
debugger;
var userProcessData=justep.xbl("userProcessData");	
var fProcess=justep.Context.getCurrentProcess();
userProcessData.setFilter("B_UserProcess1", "B_UserProcess.fProcess='"+fProcess+"' and fUserID is null ");	
userProcessData.refreshData();
	var UserBusinessMaterialData=justep.xbl("UserBusinessMaterialData");
	UserBusinessMaterialData.setFilter("B_UserBusinessMaterial", "B_UserBusinessMaterial.fUserProcessID='"+userProcessData.getCurrentID()+"'");
	UserBusinessMaterialData.refreshData();		
	justep.xbl("trigger4").setDisabled(true);
	justep.xbl("trigger6").setDisabled(true);
	justep.xbl("UserBusinessMaterialData").setReadonly(true);
};






userMaterial.trigger9Click = function(event){

	var data=justep.xbl("newUserData");
	var userProcessData=justep.xbl("userProcessData");
	var rowid=userProcessData.getCurrentID();
	var personID=justep.Context.getCurrentPersonID();
	var personName=justep.Context.getCurrentPersonName();
	var map = new justep.Request.MapParam();// variables
	map.put("rowid", rowid);
	map.put("personID", personID);
	map.put("personName", personName);
	var options = {};
	var param = new justep.Request.ActionParam();
	param.setMap("variables", map);
	options.contentType = 'application/json';
	options.dataType = "json";
	options.action = "copyMaterialAction";
	options.parameters = param;
	var result = justep.Request.sendBizRequest2(options);
	
	data.refreshData();	
	justep.xbl("tabPanel1").setTabActive("tabPage1");
};




userMaterial.userProcessDataIndexChanged = function(event){
var userProcessData=justep.xbl("userProcessData");		
	var UserBusinessMaterialData=justep.xbl("UserBusinessMaterialData");
	UserBusinessMaterialData.setFilter("B_UserBusinessMaterial", "B_UserBusinessMaterial.fUserProcessID='"+userProcessData.getCurrentID()+"'");
	UserBusinessMaterialData.refreshData();		
};


userMaterial.newUserDataIndexChanged = function(event){
var newUserData=justep.xbl("newUserData");
var UserBusinessMaterialData=justep.xbl("UserBusinessMaterialData");
	UserBusinessMaterialData.setFilter("B_UserBusinessMaterial", "B_UserBusinessMaterial.fUserProcessID='"+newUserData.getCurrentID()+"'");
	UserBusinessMaterialData.refreshData();		
};


userMaterial.trigger4Click = function(event){
debugger;
var UserBusinessMaterialData=justep.xbl("UserBusinessMaterialData");
UserBusinessMaterialData.setValue("fUserProcessID", justep.xbl("newUserData").getCurrentID(), UserBusinessMaterialData.getCurrentID());	
		
};

userMaterial.trigger3Click = function(event){
debugger;
	var FBUSINESSNAME;
	var map = new justep.Request.MapParam();// variables
	var fUserProcessID=justep.xbl("newUserData").getValue("fID");
	map.put("fUserProcessID", fUserProcessID);
	var options = {};
	var param = new justep.Request.ActionParam();
	param.setMap("variables", map);
	options.contentType = 'application/json';
	options.dataType = "json";
	options.action = "deleteMaterialAction";
	options.parameters = param;
	
	var result = justep.Request.sendBizRequest2(options);	
	justep.xbl("UserBusinessMaterialData").refreshData();
};
