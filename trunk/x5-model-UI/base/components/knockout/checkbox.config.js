/**
 *  properties type: string, number, boolean, array, object
 *  binds: key是DOM上的属性名称, value是收集到component中的名称
 */
define(function(require){
	return {
		properties: {},
		events:["onChange"],
		binds:{
			"bind-ref": "ref" ,
			"bind-label": "label",
			"bind-value": "value"
		}
	};
});