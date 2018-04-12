justep.SmartFilter = function(xblObject) {
	dhtmlxEventable(this);
	this.id = xblObject.domNode.id;
	var attributeNode = xblObject.getElementByXblID('attribute');
	xblObject.filterDataID = attributeNode.getAttribute('filter-data');
	xblObject.filterRelations = attributeNode.getAttribute('filter-relations');
	this.autoRefresh = attributeNode.getAttribute('auto-refresh') == "true";

	this._modelID = attributeNode.getAttribute('model-id');
	this._innerDataID = attributeNode.getAttribute('inner-data-id');
	this._inputID = attributeNode.getAttribute('input-id');
	this.exact = attributeNode.getAttribute('exact') == "true";
	this.showPlaceholder = attributeNode.getAttribute('showPlaceholder') == "true";
	this.useContains = attributeNode.getAttribute('useContains') == "true";

	this.onGetCondition = attributeNode.getAttribute('onGetCondition');
	var innerData = this.getInnerData();
	innerData.attachEvent(justep.XData.EVENT_DATA_CHANGED, function(event) {
		this._ingoreKeyEnter = this.autoRefresh;
		this._doValueChanged(event);
	}, xblObject);
	this.xblObject = xblObject;
	$(this.getInnerInput().controlElement).keydown($.proxy(function(event) {
		if (event.keyCode == 13) {
			var self = this;
			if(self.xblObject._ingoreKeyEnter){
				self.xblObject._ingoreKeyEnter = false;
			}else{
				var timer = setTimeout(function() {
					clearTimeout(timer);
					self.xblObject._ingoreKeyEnter = false;
					self.getFilterData().refreshData();
				}, 0);
			}
		}
	}, this));
	this.resetPlaceHolder();
};

justep.SmartFilter.prototype.resetPlaceHolder = function() {
	var $input = $(this.getInnerInput().controlElement);
	if (this.showPlaceholder) {
		var filterData = this.getFilterData();
		if (filterData) {
			var rs = this.xblObject.filterRelations.split(","), placeholder = "";
			for ( var i in rs) {
				var info = filterData.getRelationInfo(rs[i]);
				if (info && info.label)
					placeholder += "," + info.label + (this.exact ? "" : "*");
			}
			if (placeholder.length > 0) {
				$input.attr("placeholder", placeholder.substring(1));
			}
		}
	} else {
		$input.removeAttr("placeholder");
	}
};

/**
 * 单一字段的多关键词查询
 */
justep.SmartFilter.prototype.setMultiKey = function(value){
	this.multiKey = value;
};

justep.SmartFilter.prototype.setExact = function(value) {
	this.exact = value;
    //设置exact时，重新计算 filter
	this.setFilter(this.xblObject.filterDataID,
			this.xblObject.filterRelations, this.getValue());

	this.resetPlaceHolder();
};

justep.SmartFilter.prototype.setShowPlaceholder = function(value) {
	this.showPlaceholder = value;
	this.resetPlaceHolder();
};

justep.SmartFilter.prototype._doValueChanged = function(event) {
	if (event.column == "value") {
		this.setFilter(this.xblObject.filterDataID,
				this.xblObject.filterRelations, event.value);
	}
};

justep.SmartFilter.prototype.getFilterName = function() {
	return "_" + this.id + "_filter";
};

justep.SmartFilter.prototype.getFilterData = function() {
	return this.xblObject.filterData ? this.xblObject.filterData : justep
			.xbl(this.xblObject.filterDataID);
	;
};

justep.SmartFilter.prototype.getRelationAlias = function(relation) {
	if (!this.xblObject.filterDataID || !relation || relation === "")
		return relation;
	var d = this.getFilterData();
	var r = d.defRelations[relation];
	return r ? r.relation : relation;
};

justep.SmartFilter.prototype.getFilter = function() {
	var rs = this.xblObject.filterRelations.split(","), relations = [];
	if (this.exact) {
		if (rs.length > 1)
			throw '精确查询只允许一个字段';
		else if (rs.length == 0)
			throw '未设置查询字段';
		var alias = this.getRelationAlias(rs[0]);
		return justep.Components.FilterUtils.getSingleSelectFilter(alias,
				this.xblObject._value);
	} else {
		for ( var i in rs) {
			var alias = this.getRelationAlias(rs[i]);
			if (alias)
				relations.push(alias);
		}
		if (this.useContains)
			return this.getMultiLikeFilter(relations, this.xblObject._value,
					",");
		else if(this.multiKey && relations.length==1){
			if(this.xblObject._value.indexOf(" ")>=0){
				var args = this.xblObject._value.split(" "), customFilter = "";
				for ( var n in args) {
					var s = args[n].trim();
					if (s.length > 0) {
						customFilter += " and " + relations[0] + " like '%"+ s +"%'";
					}
				}
				if (customFilter.length > 5)
					customFilter = customFilter.substring(4);
				return customFilter;
			}else{
				return justep.Components.FilterUtils.getMultiLikeFilter(relations,
						this.xblObject._value, ",");
			}
		}
		else
			return justep.Components.FilterUtils.getMultiLikeFilter(relations,
					this.xblObject._value, ",");
	}

};

justep.SmartFilter.prototype.getInnerInput = function() {
	return xforms(this._inputID);
};

justep.SmartFilter.prototype.getInnerData = function() {
	return justep.xbl(this._innerDataID);
};

justep.SmartFilter.prototype.getValue = function() {
	return this.getInnerData().getValue("value");
};

justep.SmartFilter.prototype.setFilter = function(filterDataID,
		filterRelations, value) {
	this.xblObject.filterDataID = filterDataID;
	this.xblObject.filterRelations = filterRelations;
	this.xblObject._value = value;
	var filterName = this.getFilterName();
	var condition = this._doGetCondition(value);
	var filterData = this.getFilterData();
	var oldCondition = filterData.getFilter(filterName);
	if (condition != oldCondition) {
		filterData.setFilter(filterName, condition);
		if (this.xblObject.checkEvent("onAfterSetFilter")) {
			this.xblObject.callEvent("onAfterSetFilter", [ {
				'source' : this.xblObject,
				'data' : {
					target : filterData,
					filterName : filterName,
					condition : condition
				}
			} ]);
		}
		if (this.autoRefresh)
			filterData.refreshData();
	}
};

justep.SmartFilter.prototype.setAutoRefresh = function(autoRefresh) {
	this.autoRefresh = autoRefresh;
};

justep.SmartFilter.prototype.clearFilter = function() {
	var filterData = this.getFilterData();
	filterData.setFilter(this.getFilterName(), "");
	this.getInnerData().setValue("value", "");
};

justep.SmartFilter.prototype._doGetCondition = function() {
	var condition = this.getFilter();
	var fun = justep.Function.get(this.onGetCondition);
	if (fun) {
		var eventData = {
			"source" : this,
			"id" : this.id,
			"filterData" : this.getFilterData(),
			"filterRelations" : this.xblObject.filterRelations,
			"value" : this.getValue(),
			"defaultCondition" : condition,
			"handled" : false
		};
		var customCondition = fun(eventData);
		if (eventData.handled)
			condition = customCondition;
	}

	return condition;
};

/**
 * 生成多字段全文检索过滤条件
 * 
 * @fields 过滤的字段，逗号分隔的字符串或字符串数组
 * @value string
 */
justep.SmartFilter.prototype.getMultiLikeFilter = function(fields, value, split) {
	if (value === "")
		return "";
	if (!split)
		split = ",";

	var fieldArray = [];
	if (typeof (fields) == "string")
		fieldArray = fields.split(split);
	else if (Object.prototype.toString.apply(fields) == "[object Array]")
		fieldArray = fields;
	else {
		var msg = new justep.Message(justep.Message.JUSTEP231044);
		throw justep.Error.create(msg);
	}

	value = value.toUpperCase();
	var filter = "";
	for ( var i = 0; i < fieldArray.length; i++) {
		
		var theFilterValue=value;

		theFilterValue=theFilterValue.replace(/\(/g,"\\(");
		theFilterValue=theFilterValue.replace(/\)/g,"\\)");
		sql_filter="";
		var array = theFilterValue.split('%');
		for(var o in array){
		   if (array[o])
			   sql_filter =sql_filter+ ((sql_filter=='')?'':' and ') + " contains("+fieldArray[i]+",'"+array[o]+"')>0 ";
		}
		filter = justep.Components.FilterUtils.joinFilter(filter,sql_filter , "OR");
	}

	return filter;
};
