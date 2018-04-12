var templateActivity = {};

templateActivity.personDialogReceive = function(event) {
	var data = event.data;
	var B_personPhoneTemplate = justep.xbl("B_personPhoneTemplate");
	var B_receivePersonTemplate = justep.xbl("B_receivePersonTemplate");
	B_receivePersonTemplate.newData();
	B_receivePersonTemplate.setValue("fPersonName", data.getValue("name"));
	B_receivePersonTemplate.setValue("fPhone", data.getValue("phone"));
	B_receivePersonTemplate.saveData();
	B_personPhoneTemplate.saveData();
};

templateActivity.trigger6Click = function(event) {
	var B_personPhoneTemplate = justep.xbl("B_personPhoneTemplate");
	if (B_personPhoneTemplate.saveData()
			&& B_personPhoneTemplate.getCurrentID())
		justep.xbl("personDialog").open();
	else
		alert("请先新增模版");
};

templateActivity.trigger8Click = function(event) {
	var B_receivePersonTemplate = justep.xbl("B_receivePersonTemplate");
	if (!B_receivePersonTemplate.getCurrentID())
		return;
	templateActivity.showMessage("清除后将无法撤回，确定清除号码？", 1, "question", function(
			evt) {
		if (evt.status == "ok") {
			B_receivePersonTemplate.deleteAllRow();
			B_receivePersonTemplate.saveData();
			justep.xbl("B_personPhoneTemplate").saveData();
		}
	});
};

/**
 * 信息提示框 显示的图标{('info','error','question','right')，或者自定义的img url} 按钮
 * {0(默认):确定；1：确定，取消；2：是，否；3:是,否,取消}
 */
templateActivity.showMessage = function(msg, type, img, callback) {
	new justep.System.showMessage().open({
		msg : msg,
		title : '系统提示',
		type : type,// 0(默认):确定；1：确定，取消；2：是，否；3:是,否,取消
		img : img,// 显示的图标('info','error','question','right')，或者自定义的img url,
		height : 100,
		width : 350,
		callback : callback
	});
};

templateActivity.trigger2Click = function(event) {
	var B_personPhoneTemplate = justep.xbl("B_personPhoneTemplate");
	var B_receivePersonTemplate = justep.xbl("B_receivePersonTemplate");
	if (!B_personPhoneTemplate.getCurrentID())
		return;
	templateActivity.showMessage("删除模版后将清空此模版下所有号码，确定删除模版？", 1, "question",
			function(evt) {
				if (evt.status == "ok") {
					B_receivePersonTemplate.deleteAllRow();
					B_personPhoneTemplate.deleteData(B_personPhoneTemplate
							.getCurrentID());
					B_receivePersonTemplate.saveData();
					B_personPhoneTemplate.saveData();
				}
			});
};

templateActivity.trigger7Click = function(event) {
	var B_receivePersonTemplate = justep.xbl("B_receivePersonTemplate");
	if (!B_receivePersonTemplate.getCurrentID())
		return;
	templateActivity.showMessage("号码删除后将无法撤回，确定删除号码？", 1, "question", function(
			evt) {
		if (evt.status == "ok") {
			B_receivePersonTemplate.deleteData(B_receivePersonTemplate
					.getCurrentID());
			B_receivePersonTemplate.saveData();
			justep.xbl("B_personPhoneTemplate").saveData();
		}
	});
};

templateActivity.trigger5Click = function(event) {
	if(!!justep.xbl("B_personPhoneTemplate").getCurrentID())
		justep.xbl("orgDialog").open();
};

templateActivity.orgDialogReceive = function(event) {
	var rows = event.data;
	var personIDs = new justep.Request.ListParam();
	if (rows.length > 0) {
		for ( var i = 0; i < rows.length; i++) {
			var row = rows[i];
			personIDs.add(row.sPersonID);
		}
	}
	var params = new justep.Request.ActionParam();
	params.setList("personIDs", personIDs);
	params.setString("templateID", justep.xbl("B_personPhoneTemplate").getCurrentID());
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "copyPersonInfoFromOrgToTempAction",
		parameters : params,
		callback : function(result) {
			if (result.state) {
				templateActivity.showMessage(result.response, 0, "right");
				justep.xbl("B_personPhoneTemplate").refreshData();
			} else {
				throw new Error("添加失败！|" + result.response.message);
			}
		}
	});
};
