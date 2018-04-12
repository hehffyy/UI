var fieldActivity = {};

fieldActivity.fBusinessGroupId =null;
/**
	name:bizData#onRefreshCreateParam
	description: <b>[回调型事件]</b>业务新增数据创建新增参数事件，可以增加和修改用户自定义的参数
	@see justep.Request.ActionParam
	@param {object} event 
	<br/><b>结构如下：</b>
	<xmp> 
	{
		"source" : 组件的js对象,
		"param" : {justep.Request.ActionParam} 新增参数对象
	}
	</xmp>	
*/
fieldActivity.fieldChoiceDataRefreshCreateParam = function(event){
	var mapParam = new justep.Request.MapParam();
    mapParam.put("fBusinessGroupId", fieldActivity.fBusinessGroupId );
    event.param.setMap("variables", mapParam);  	
};

fieldActivity.model1Load = function(event){
 
	//justep.xbl("fieldChoiceData").refreshData();
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
fieldActivity.windowReceiver1Receive = function(event){
	fieldActivity.fBusinessGroupId  = event.data.fBusinessGroupId;
 	justep.xbl("fieldChoiceData").refreshData();
//	var params = new justep.Request.ActionParam();
//	 	params.setString("fBusinessGroupId", event.data.fBusinessGroupId );
// 
//	justep.Request.sendBizRequest2({
//		dataType: "json",
//		action: "getBusinessTablesAction",
//		parameters: params, 
//		callback: function(callbackData) {
//			if (callbackData.state) {
//				justep.xbl("fieldChoiceData").refreshData();
//			}
//		}
//	});
	

};
