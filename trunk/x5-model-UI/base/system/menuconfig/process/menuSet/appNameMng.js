var appNameMng = {};

appNameMng.trg_delClick = function(event){
	var listData = justep.xbl("B_Menu");
	var rowID = listData.getCurrentID();
	if (!rowID)
		return;
	var param = new justep.Request.ActionParam();
	param.setString("fParentID", rowID);
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "hasChildAction",
		parameters : param,
		callback : function(result) {
			if (result.state && !result.response) {
				listData.deleteData(rowID);
				listData.saveData();
			} else
				butone.Dialog.info("请先删除已配置的菜单！");
		}
	});
};
