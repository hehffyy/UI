var qllxChoice = {};
 
 

qllxChoice.trigger6Click = function(event){
		justep.xbl("qllxData").setValue("qllx","国有建设用地使用权及房屋所有权登记");
};

qllxChoice.trigger7Click = function(event){
	 
		var qllxData = justep.xbl("qllxData");
		var qllxbh  = qllxData.getValue("qllxbh");
		var djdlbh  = qllxData.getValue("djdlbh");
		var qllx  = qllxData.getValue("qllx");
		var djdl  = qllxData.getValue("djdl");
		var zmlb  = qllxData.getValue("zmlmc");
		
		var data = event.data || {};
		data.djxl = qllxbh;
		data.djxlmc = qllx;
		data.djdl = djdlbh;
		data.djdlmc = djdl;
		data.zmlb = zmlb;
		
		
	
		data.actionType = "insert";
		justep.xbl("windowReceiver2").sendData(data);
	 
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
qllxChoice.windowReceiver2Receive = function(event){
	var data = event.data || {};
	
		var qllxData = justep.xbl("qllxData");
		var rowID = qllxData.getCurrentID();
		
	if(data.djtype=='证明类'){
		window.document.getElementById("view2").hidden = false;
		if(qllxData.getValue("zmlmc")=='登记业务' ){
			qllxData.setValue("zmlbh", "", rowID);
			qllxData.setValue("zmlmc", "", rowID);
		}
		
	}else  if(data.djtype=='权籍类'){
		window.document.getElementById("view2").hidden = false;
		qllxData.setValue("zmlbh", "980", rowID);
		qllxData.setValue("zmlmc", "权籍调查", rowID);
	}
	
	else{
		window.document.getElementById("view2").hidden = true;
		qllxData.setValue("zmlbh", "", rowID);
		qllxData.setValue("zmlmc", "登记业务", rowID);
	}
};

 

 

qllxChoice.trigger2Click = function(event){

		var data = event.data || {};
		data.actionType = "cancel";
		justep.xbl("windowReceiver2").sendData(data);
 
};
