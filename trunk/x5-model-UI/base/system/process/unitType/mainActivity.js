var mainActivity = {};



mainActivity.model1Load = function(event){
	var data1 = justep.xbl('data1');
	var param = new justep.Request.ActionParam();
	
	justep.Request.sendBizRequest2({
		dataType : "json",
		action : "selectSysDictInfo",
		parameters : param,
		callback : function(result) {
			if (result.state) {
//				alert("返回值 -> " + JSON.stringify(result.response));
				data1.loadJson(result.response);
			} else {
				throw new Error("调用失败！|" + result.response.message);
			}
		}
	});
};

/**
	name:bizData#onAfterNew
	description: <b>[回调型事件]</b>业务数据新增后
	@param {object} event 
	<br/><b>结构如下：</b>
	<xmp> 
	{
		"source" : 组件的js对象,
		"ids" : 新增的行Id数组
	}
	</xmp>	
*/
mainActivity.bizUnitTypeAfterNew = function(event){
	var mainData = justep.xbl('bizUnitType');
	var cData = justep.xbl('data1');
	var fTypeName = cData.getValue("FNAME");
	mainData.setValue("fUnitType", fTypeName);
	
};
