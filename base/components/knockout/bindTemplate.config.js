/**
 * properties type: String, number, Boolean, array, object binds: key是DOM上的属性名称,
 * value是收集到component中的名称
 */
define(function(require) {
	return {
		properties : {
			relDatas : "String",
			list : "Boolean",
			data : "String",
			shadow : "Boolean",
			disablePullToRefresh : "Boolean",
			disableInfiniteLoad : "Boolean",
			filter : "String"
		},
		events : [ "onAfterRender" ],
		binds : {}
	};
});