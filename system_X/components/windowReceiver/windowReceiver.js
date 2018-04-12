justep.WindowReceiver = function(id){
	var node = document.getElementById(id);
	if(node){
		this.domNode = node;
		var s = node.getAttribute('onReceive');
		if(s) justep.WindowReceiver.acceptParentParamsFun = s;
		node._xblObject = this;//特殊机制
	}
};

justep.WindowReceiver.prototype = new justep.XBLObject();

justep.WindowReceiver.prototype.initXBL = function(){
	this.domNode.xblObject = this.domNode._xblObject;//特殊机制，组件在xbl之前创建，通过initXBL把之前创建的xbl重新赋值
};
	
justep.WindowReceiver.prototype.initXBL2 = function(){
	var openerId = justep.Request.URLParams['$opener'];
	if(openerId && opener){
		var winOpener = opener.justep.openers[openerId];
		$(window).unload(function(event){
			if(winOpener && winOpener.dispatchCloseEvent) winOpener.dispatchCloseEvent();
		});
		if(winOpener && winOpener.sendToWindow) winOpener.sendToWindow();
	}else if(window.frameElement && window.frameElement.opener){
		// TODO TKJ 将windowDialog和windowRunner中的sendToFrame移动到这里，并去掉了延迟
		window.frameElement.opener.sendToFrame();
	}
};

justep.WindowReceiver.prototype.sendData = function(data){
	justep.WindowReceiver.windowEnsure(data, true);
};

justep.WindowReceiver.prototype.windowEnsure = function(data, noclose){
	justep.WindowReceiver.windowEnsure(data, noclose);
};

justep.WindowReceiver.prototype.windowRefresh = function (){
	justep.WindowReceiver.windowRefresh();
};

justep.WindowReceiver.prototype.windowCancel = function (){
	justep.WindowReceiver.windowCancel();
};

justep.WindowReceiver.prototype.getMappingData = function(dataid,idArr,relationArr){
	var data = justep.xbl(dataid);
	if(!data){
		var msg = new justep.Message(justep.Message.JUSTEP231002, dataid);
		throw justep.Error.create(msg);
	}
	
	var rArr = relationArr;
	var concept = data.getConceptAliasName();
	if(!rArr || rArr == ""){
		if(data.getResultRelations){
			rArr = data.getResultRelations().split(",");
		}else{
			rArr = data.getRelationAlias();
			rArr.push("rowid");
		}
	}
	
	var result = [];
	for(var i in idArr){
		var id = idArr[i], row = {};
		if(data.isExist && !data.isExist(id)) continue;
		for(var j in rArr){
			var relation = rArr[j], value = "";
			if(relation && relation != ""){		
				try{
					// TODO 增加查询回填含主键字段的判断
					if(relation == "rowid" || relation == concept || data.idColumn && data.idColumn.name == relation){
						relation = "rowid";
						value = id;
					}else if(relation == "version"){
						if(data.getVersionColumnValue){
							value = data.getVersionColumnValue();							
						}else{
							value = data.getValue(relation,id);
						}
					}else{
						value = data.getValue(relation,id);				
					}
				}catch(e){
					var msg = new justep.Message(justep.Message.JUSTEP231068, id, relation);
					throw justep.Error.create(msg);
				}
				row[relation] = value; 
			}
		}
		result.push(row);
	}
	return result;
};

/**
 * 父页面注册对象，使用者不必处理
 */
justep.WindowReceiver.windowParentObj = null; 

/**
 * 使用页面注册接收接收数据函数 
 */
justep.WindowReceiver.acceptParentParamsFun = null;

/**
 * 接收父页面传入的参数 ，使用者不必处理
 */
justep.WindowReceiver.windowReceive = function (obj){
	if(typeof(justep.WindowReceiver.acceptParentParamsFun) == "function")
		justep.WindowReceiver.acceptParentParamsFun(obj);
	else if(typeof(justep.WindowReceiver.acceptParentParamsFun) == 'string'){
		eval(justep.WindowReceiver.acceptParentParamsFun + "(obj);");
	}
};

/**
 * 确定调用的函数 ，参数为返回父页面的对象
 */
justep.WindowReceiver.windowEnsure = function (obj,noclose){
	if(justep.WindowReceiver.windowParentObj)
		justep.WindowReceiver.windowParentObj.ensure(obj,noclose);
};

/**
 * 取消调用的函数
 */
justep.WindowReceiver.windowCancel = function (){
	if(justep.WindowReceiver.windowParentObj)
		justep.WindowReceiver.windowParentObj.cancel();
	else{//认为是portal打开，使用portal方式关闭
		if(!justep.Client.MOBILE)justep.Portal.closeWindow();
		//mobile关闭
		else top.justep.mobile.Portal.back();
	}
};

/**
 * 刷新调用的函数
 */
justep.WindowReceiver.windowRefresh = function (){
	if(justep.WindowReceiver.windowParentObj)
		justep.WindowReceiver.windowParentObj.refresh();
};

justep.windowReceiver = justep.WindowReceiver;
