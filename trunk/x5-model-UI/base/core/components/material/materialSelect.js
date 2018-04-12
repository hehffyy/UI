/**
 * 当前用于补正告知时选择材料
 */
var materialSelect = {};
var process;
materialSelect.windowReceiverReceive = function(event) {
	process = event.data;
	justep.xbl("main").refreshData();
};

materialSelect.mainRefreshCreateParam = function(event) {
	var mapParam = new justep.Request.MapParam();
	mapParam.put("fProcess", new justep.Request.SimpleParam(process,
			justep.XML.Namespaces.XMLSCHEMA_STRING));
	mapParam.put("fBizRecId", process.bizRecId);			
	event.param.setMap("variables", mapParam);
};


materialSelect.ensure_btnClick = function(event){
debugger;
	var result = [];
	var rows = justep.xbl("grid").grid.rowsAr;
	for(var i in rows){
	  if(i==0)
	     continue;
	  var checked=rows[i].cells[0].chstate=="1";
	  if(!checked)
	     continue;
	   result.push({fMaterialId:rows[i]._systemData.fMaterialId.value,fMaterialName:rows[i].cells[2].innerText});
	}
//	var ds = justep.xbl("main");
//    for(var i=0;i<ds.getCount();i++){
//       var id = ds.getID(i);
//       if(ds.getValue("sel",id)==0)
//          continue;
//       result.push({fMaterialId:ds.getValue("fMaterialId",id),fMaterialName:ds.getValue("fMaterialName",id)});
//    }	
    justep.xbl("windowReceiver").windowEnsure(result);
};
