var groupDataPermission = {};

groupDataPermission.hasGroupID = function() {
	return !!justep.Context.getRequestParameter("groupID");
};

groupDataPermission.dataMainNewCreateParam = function(event) {
	event.defaultValues = [ {
		fBusinessGroupId : justep.Context.getRequestParameter("groupID")
	} ];
};

groupDataPermission.dataMainBeforeRefresh = function(event){
	event.source.setFilter("f1","fBusinessGroupId='"+justep.Context.getRequestParameter("groupID")+"'");
};
