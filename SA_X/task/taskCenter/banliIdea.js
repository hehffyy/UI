var banliIdea = {};


banliIdea.dataTaskBeforeRefresh = function(event){
	if(justep.Request.URLParams["bizRecID"])
		event.source.setFilter("customeFilter","sData1='"+justep.Request.URLParams["bizRecID"]+"'");
	else if(justep.Request.URLParams["pi"])
		event.source.setFilter("customeFilter","sFlowID='"+justep.Request.URLParams["pi"]+"'");
	else
		event.source.setFilter("customeFilter","1=0");
};