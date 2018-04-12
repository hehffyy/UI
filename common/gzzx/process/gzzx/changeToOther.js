var changeToOther = {};

changeToOther.btnCancelClick = function(event){
	justep.xbl("windowReceiver").windowCancel();
};

changeToOther.btnEnsureClick = function(event){
	if(justep.xbl("t_ldjbsxxxb").saveData())
		justep.xbl("windowReceiver").windowEnsure();
};

/**
	name:windowReceiver#onReceive
	@event 
description: <b>[回调型事件]</b> window接收调用者传入的数据
	@param event 
	<br/><b>格式说明：</b>
	<xmp>
	{
		"source" : 组件的js对象,
		"data" : 传入的数据
	}
	</xmp>
	@example
	//接受传入的rowid，组成filter刷新data
	1、data组件上定义filter1 = DEMO_TABLE1 = :rowid
	2、接管onReceive
	windowReceiverReceive = function(event){
		if(event.data && event.data.rowid){
			var data = justep.xbl('mainData');
			//给变参:rowid赋值
			data.filters.setStringVar('rowid', event.data.rowid);
			data.refreshData();
		}
	}
*/
changeToOther.windowReceiverReceive = function(event){
	var data = justep.xbl("t_ldjbsxxxb");
	data.setValue("bt", event.data.title);
	data.setValue("fj", event.data.attachment);
};
