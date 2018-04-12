/**
 *  properties type: String, number, Boolean, array, object
 *  binds: key是DOM上的属性名称, value是收集到component中的名称
 */
define(function(require){
	return {
		properties: {
			dataType: "String",			
			placeHolder: "String",
			pattern: "String",
			format: "String",
			min: "String",
			max: "String",
			maxLength: "Integer",
			autoFocus: "Boolean",
			autoComplete: "Boolean",
			disabled: "Boolean",
			readonly: "Boolean"
		},
		events:["onChange", "onRender"],
		binds:{"bind-ref": "ref"}
	};
});