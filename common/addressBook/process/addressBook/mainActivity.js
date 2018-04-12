var mainActivity = {};

mainActivity.model1Load = function(event) {
	this.initAddressInfo();
};

mainActivity.initAddressInfo = function(){
	var m = 3;
	if (window.screen.height >= 1080) {
		m = 4;
	}
	var HTMLStr = '';
	var str = "";
	var data = justep.xbl("bizData");
	var sFName = "";
	for(var i=0,j=0; i<data.getCount()+1; i++,j++){
		if(i==data.getCount()){
			str +='</div>';
			HTMLStr += '<div class="box_left" style="width:99%;">'+str+'</div>';
			break;
		}
		var rowID = data.getID(i);
		var deptID = data.getValue("SA_OPOrg", rowID);
		var fName = data.getValue("sFName", rowID);
		if(fName!=""&&fName!=sFName){
			sFName = fName;
			var deptName = fName.substring(1,fName.length);
			deptName = deptName.substring(deptName.indexOf("/")+1,deptName.length);
			if(i==0){
				str = '<h2 id="'+deptID+'" class="bt1">&nbsp;&nbsp;'+deptName+'</h2><div class="bg1 infobox-container">';
			}
			if(str.length>0 &&i >0){
				str +='</div></div>';
				HTMLStr += '<div class="box_left" style="width:99%;">'+str+'</div>';
				str = '<h2 id="'+deptID+'" class="bt1">&nbsp;&nbsp;'+deptName+'</h2><div class="bg1 infobox-container">';
				j=0;
			}
		}
		var name = data.getValue("sName", rowID);
		if(name.length==2)
			name = name.substr(0,1)+"&nbsp;&nbsp;&nbsp;&nbsp;"+name.substr(1,2);
		var title = data.getValue("sTitle", rowID)==""?"其他":data.getValue("sTitle", rowID);
		var sMobilePhone = data.getValue("sMobilePhone", rowID)==""?"暂无":data.getValue("sMobilePhone", rowID);
		str += '<div class="infobox infobox-green"><div class="infobox-data"><span class="infobox-data-number">'+name+' <a class="mark">'+title+'</a></span><div class="infobox-content"><span class="icon-telephone"></span>'+sMobilePhone+'</div></div></div>';
	}
	$("#view2").html(HTMLStr);
	justep.xbl("dOrgTree").expandRowsToLevel(0, justep.xbl("dOrgTree").getCurrentID());
	this._toTop();
};

mainActivity._toTop = function(){
	$("<a  href='#view2'></a>")
			.prependTo($("#view2"))
			.css(
					{
						"z-index" : 12,
						position : "fixed",
						width : "50px",
						bottom : "51px",
						right : "15px",
						background : "transparent  url("
								+ location.protocol
								+ "//"
								+ location.host
								+ justep.Request.BASE_URL
								+ "/UI/EGovSys_X/images/sideCatalog.gif) no-repeat -1px -62px",
						height : "45px"
					});
};

/**
	name:grid#onRowClick
	description: 行单击事件
	@param {object} event <br/>
	<b>参数结构：</b>
	<xmp>
	{
		"source" : XFGrid对象, 
		"instance" : instance,
		"grid" : dhtmlxGrid对象,
		"rowID" : 行ID
	}
	</xmp>
*/
mainActivity.gridOrgTreeRowClick = function(event){
	window.location.hash = "#"+event.rowID;
};

mainActivity.searchOrgClick = function(event){
	this.treeFilter();
};

mainActivity.input_searchOrgKeydown = function(event){
	if (event.keyCode == 13) {
		this.treeFilter();
	}
};

mainActivity.treeFilter = function(){
	var data = justep.xbl("dOrgTree");
	var searchText =  $.trim($("#input_searchOrg").val());
	var filter = "SA_OPOrg.sParent is null and SA_OPOrg.sValidState<>-1 and SA_OPOrg.sName <> '起步软件'";
	if (searchText != null && searchText != "") {
		filter = "SA_OPOrg.sName like '%" + searchText + "%'";
		data.setTreeRootFilter(filter);
		data.refreshData();
	} else {
		data.setTreeRootFilter(filter);
		data.refreshData();
		data.expandRowsToLevel(0, data.getCurrentID());
	}
};

mainActivity.input_searchOrgChange = function(event){
	this.treeFilter();
};

/**
	name:grid#onAfterIndexChanged
	description: 当前行改变结束后触发
	@param {object} event <br/>
	<b>参数结构：</b>
	<xmp>
	{
		"source" : XFGrid对象, 
		"instance" : instance,
		"grid" : dhtmlxGrid对象,
		"rowID" : 选中行的ID,
		"oldRowID" : 行改变前的rowID
	}
	</xmp>
*/
mainActivity.gridOrgTreeAfterIndexChanged = function(event){
	var data = justep.xbl("dOrgTree");
	if(!!data.getValue("sParent", event.rowID))
		window.location.hash = "#"+event.rowID;
	else
		window.location.hash = "#view2";
};

mainActivity.input_searchPersonKeydown = function(event){
	if (event.keyCode == 13) {
		this.personFilter();
	}
};

mainActivity.searchPersonClick = function(event){
	this.personFilter();
};

mainActivity.personFilter = function(){
	var data = justep.xbl("bizData");
	data.filters.clear();
	var searchText =  $.trim($("#input_searchPerson").val());
	var filter = "1=1";
	if (searchText != null && searchText != "") {
		filter = "SA_OPOrg.sFName like '%"+searchText+"%' or SA_OPPerson.sName like '%"+searchText+"%' or SA_OPPerson.sMobilePhone like '%"+searchText+"%'";
		data.setFilter("filter", filter);
		data.refreshData();
	} else {
		data.setFilter("filter", filter);
		data.refreshData();
	}
	this.initAddressInfo();
	window.location.hash = "#view2";
};

mainActivity.gridOrgTreeRowDblClick = function(event){
	justep.xbl("dOrgTree").expandRow(event.rowID);
};

mainActivity.input_searchPersonChange = function(event){
	this.personFilter();
};
