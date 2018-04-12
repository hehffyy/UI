/*! 
* BeX5 v3 (http://www.justep.com) 
* Copyright 2015 Justep, Inc.
*/ 
/**
 *  properties type: String, Decimal, boolean, array, object
 *  binds: key是DOM上的属性名称, value是收集到component中的名称
 */
define(function(require){
	return {
		properties: {
			keyID:'String',
			limit:'Decimal',
			limitSize:"String",
			subPath:'String',
			access:'String',
			showName:'Boolean'
		},
		events:["onBrowse","onFileSelect","onStart","onProgress","onSuccess","onError","onNewFromTemplate",
		        "onOfficeLoaded","onDownload","onBrowse","onDelete","onEdit","onOpenOfficeEditor","onCreateVersion",
		        "onShowHistory"],
		binds:{"bind-ref": "ref"}
	};
});