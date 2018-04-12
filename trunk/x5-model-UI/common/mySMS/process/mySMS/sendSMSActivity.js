var sendSMSActivity = {};

sendSMSActivity.personDialogReceive = function(event) {
	var data = event.data;
	var B_smsReceivePerson = justep.xbl("B_smsReceivePerson");
	B_smsReceivePerson.newData();
	B_smsReceivePerson.setValue("fPersonName", data.getValue("name"));
	B_smsReceivePerson.setValue("fPhone", data.getValue("phone"));
};

sendSMSActivity.trigger3Click = function(event) {
	justep.xbl("personDialog").open();
};

/**
 * 信息提示框 显示的图标{('info','error','question','right')，或者自定义的img url} 按钮
 * {0(默认):确定；1：确定，取消；2：是，否；3:是,否,取消}
 */
sendSMSActivity.showMessage = function(msg, type, img, callback) {
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

sendSMSActivity.trigger5Click = function(event) {
	var B_smsInfo = justep.xbl("B_smsInfo");
	var smsID = B_smsInfo.getCurrentID();
	if(!!B_smsInfo.getValue("fSMSContent", smsID) && !!justep.xbl("B_smsReceivePerson").getCurrentID()){
		B_smsInfo.setValue("fSenderTime", justep.System.datetimeString());
		B_smsInfo.setValue("fStatus", "已提交");
		if(justep.xbl("B_smsReceivePerson").saveData() && B_smsInfo.saveData()){
			var info = "确定发送短信";
			var fWXContent = B_smsInfo.getValue("fWXContent");
			if(!!$.trim(fWXContent))
				info = "确定发送短信和微信？";
			sendSMSActivity.showMessage(info, 1, "question", function(evt) {
				if (evt.status == "ok") {
					// 微信内容不为空，同时发送微信
					if(!!$.trim(fWXContent))
						sendSMSActivity.sendWeiXinMessage();
					var params = new justep.Request.ActionParam();
					params.setString("smsID", smsID);
					justep.Request.sendBizRequest2({
						dataType : "json",
						action : "sendSMSMessageAction",
						parameters : params,
						callback : function(result) {
							if (result.state && result.response.status == "true") {
								sendSMSActivity.showMessage(result.response.info,0,"right");
								justep.xbl("windowReceiver").sendData(true);
								justep.Portal.closeWindow();
							} else if (result.state && result.response.status == "false") {
								sendSMSActivity.showMessage(result.response.info,0,"info");
							} else {
								throw new Error("发送失败！|" + result.response.message);
							}
						}
					});
				}
			});
		}
	} else {
		sendSMSActivity.showMessage("短信内容或接收者不能为空！", 0, "info");
	}
};

sendSMSActivity.sendWeiXinMessage = function() {
	var personIDs = "";
	var data = justep.xbl("B_smsReceivePerson");
	for ( var i = 0; i < data.getCount(); i++) {
		var rowID = data.getID(i);
		personIDs = personIDs + "," + data.getValue("fPersonID", rowID);
	}
	personIDs = personIDs.substring(1);
	var params = new justep.Request.ActionParam();
	params.setString("targets", personIDs);
	params.setString("title", justep.xbl("B_smsInfo").getValue("fWXContent"));
	params.setString("type", "default");
	params.setString("url", null);
	params.setMap("exts", null);
	params.setString("kind", "短信微信提醒");
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "sendMQTTMessageAction",
		parameters : params,
		callback : function(result) {
			if (result.state) {
			}
		}
	});
};

sendSMSActivity.trigger2Click = function(event){
	if(!!justep.xbl("B_smsInfo").getCurrentID()&& justep.xbl("B_smsInfo").saveData())
		justep.xbl("templateDialog").open();
};


sendSMSActivity.templateDialogReceive = function(event){
	var templateID = event.data;
	var params = new justep.Request.ActionParam();
	params.setString("templateID", templateID);
	params.setString("smsID", justep.xbl("B_smsInfo").getCurrentID());
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "copyPersonInfoFromTempToRecAction",
		parameters : params,
		callback : function(result) {
			if (result.state) {
				sendSMSActivity.showMessage(result.response, 0, "right");
				justep.xbl("B_smsReceivePerson").refreshData();
			} else {
				throw new Error("添加失败！|" + result.response.message);
			}
		}
	});
};

sendSMSActivity.trigger1Click = function(event){
	if(!!justep.xbl("B_smsInfo").getCurrentID()&& justep.xbl("B_smsInfo").saveData())
		justep.xbl("orgDialog").open();
};

sendSMSActivity.orgDialogReceive = function(event){
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
	params.setString("smsID", justep.xbl("B_smsInfo").getCurrentID());
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "copyPersonInfoFromOrgToRecAction",
		parameters : params,
		callback : function(result) {
			if (result.state) {
				sendSMSActivity.showMessage(result.response, 0, "right");
				justep.xbl("B_smsReceivePerson").refreshData();
			} else {
				throw new Error("添加失败！|" + result.response.message);
			}
		}
	});
};

sendSMSActivity.trigger4Click = function(event){
	var B_smsReceivePerson = justep.xbl("B_smsReceivePerson");
	if (!B_smsReceivePerson.getCurrentID())
		return;
	sendSMSActivity.showMessage("号码删除后将无法撤回，确定删除号码？", 1, "question", function(
			evt) {
		if (evt.status == "ok") {
			B_smsReceivePerson.deleteData(B_smsReceivePerson.getCurrentID());
			B_smsReceivePerson.saveData();
			justep.xbl("B_smsInfo").saveData();
		}
	});
};

sendSMSActivity.windowReceiverReceive = function(event){
	var data = event.data;
	var B_smsInfo = justep.xbl("B_smsInfo");
	if(!!data && !!data.operate && data.operate=="edit"){
		B_smsInfo.setFilter("filter", "B_smsInfo='"+data.rowID+"'");
		B_smsInfo.refreshData();
	} else {
		B_smsInfo.newData();
	}
	
};

sendSMSActivity.trigger6Click = function(event){
	var B_smsInfo = justep.xbl("B_smsInfo");
	var B_smsReceivePerson = justep.xbl("B_smsReceivePerson");
	sendSMSActivity.showMessage("取消发送短信后，会清除信息，确认取消？", 1, "question", function(
			evt) {
		if (evt.status == "ok") {
			B_smsReceivePerson.deleteAllRow();
			B_smsInfo.deleteData(B_smsInfo.getCurrentID());
			B_smsReceivePerson.saveData();
			B_smsInfo.saveData();
			justep.xbl("windowReceiver").sendData(true);
			justep.Portal.closeWindow();
		}
	});
	
	
};

sendSMSActivity.model1UnLoad = function(event){
	justep.xbl("windowReceiver").sendData(true);
};
