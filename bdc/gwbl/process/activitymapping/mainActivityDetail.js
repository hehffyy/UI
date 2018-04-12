var mainActivityDetail = {};
mainActivityDetail.windowReceiverReceive = function(event){
	var operator = event.data.operator;
	var data = justep.xbl('detailData');
	if (operator == "new") {
		data.loadXML("");
		data.newData();
	} else if (operator == "edit") {
		var id = event.data.id;
		data.filters.setFilter("idFilter", data.getConceptAliasName() + "='" + id + "'");
		data.refreshData();
	}
};


mainActivityDetail.triggerOKClick = function(event){
	xforms.blur(true);
	var data = justep.xbl('detailData');
	if (data.saveData())
		justep.windowReceiver.windowEnsure({
			id : data.getCurrentRowId()
		});
};

mainActivityDetail.triggerCancelClick = function(event){
	justep.windowReceiver.windowCancel();
};

/**
	name:bizData#onValueChanged
	description: <b>[回调型事件]</b>数据变化
	@param {object} event 
	<br/><b>结构如下：</b>
	<xmp> 
	{
		"source" : 组件的js对象,
		"column" : 关系,
		"rowIndex" : 行索引,
		"value" : 新值,
		"originalValue" : 旧值
	}
	</xmp>	
*/
mainActivityDetail.detailDataValueChanged = function(event){

		var detailData = justep.xbl('detailData');
		var rowID = detailData.getCurrentID();
		if(event.column=='fDjType'){
		
			var fDjType = detailData.getValue("fDjType");
			
			if(fDjType=='证明类'){
				justep.xbl('gridSelect3').setDisabled(false);
				detailData.setValue("fzmlbh", null, rowID);
				detailData.setValue("fzmlmc", null, rowID);
				
			}else{
				justep.xbl('gridSelect3').setDisabled(true);
				detailData.setValue("fzmlbh", null, rowID);
				detailData.setValue("fzmlmc", "登记业务", rowID);
				
			}
			
		}
		
 
		var fywdm = detailData.getValue("fdjxlbh")+detailData.getValue("fzmlbh")+detailData.getValue("fdjdlbh");
		var fywdmc = detailData.getValue("fdjxlmc");
		if(detailData.getValue("fzmlmc") !='登记业务')
			fywdmc += detailData.getValue("fzmlmc");
			
		fywdmc += detailData.getValue("fdjdlmc");
		
		detailData.setValue("fywdmmc", fywdmc, rowID);
		detailData.setValue("fywdm", fywdm, rowID);
	 
		


	 	
};
