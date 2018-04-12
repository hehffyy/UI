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
		events:["onBrowse","onFileSelect","onStart","onProgress","onSuccess","onError"],
		binds:{"bind-ref": "ref"}
	};
});