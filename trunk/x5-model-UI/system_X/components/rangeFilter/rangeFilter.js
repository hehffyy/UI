var com = com || {};
com.butone = com.butone || {};
com.butone.RangeFilter = function(xblObject) {

	dhtmlxEventable(this);

	this.id = xblObject.domNode.id;

	this._attributeNode = xblObject.getElementByXblID('attribute');
	this.filterDataID = this._attributeNode.getAttribute('filter-data');
	this.filterRelations = this._attributeNode.getAttribute('filter-relations');
	this.operator = this._attributeNode.getAttribute('operator');
	this.autoRefresh = this._attributeNode.getAttribute('auto-refresh') == "true";

	this._modelID = this._attributeNode.getAttribute('model-id');
	this._innerDataID = this._attributeNode.getAttribute('inner-data-id');
	this._inputID = this._attributeNode.getAttribute('input-id');

	this.onGetCondition = this._attributeNode.getAttribute('onGetCondition');

	var innerData = this.getInnerData();
	innerData.attachEvent(justep.XData.EVENT_DATA_CHANGED, function(event) {
		this._doValueChanged(event);
	}, xblObject);

};

com.butone.RangeFilter.prototype._doValueChanged = function(event) {
	if (event.column == "value") {
		this.setFilter(this.filterDataID, this.filterRelations, event.value);
	}
};

com.butone.RangeFilter.prototype.getFilterName = function() {
	return "_" + this.id + "_filter";
};

com.butone.RangeFilter.prototype.getFilter = function() {
 
	var relation = this.filterRelations;
	var operator = this.operator;
	if(this._value)
		return relation + operator + this._value;
};

com.butone.RangeFilter.prototype.getFilterData = function() {
	return justep.xbl(this.filterDataID);
};

com.butone.RangeFilter.prototype.getInnerInput = function() {
	return xforms(this._inputID);
};

com.butone.RangeFilter.prototype.getInnerData = function() {
	return justep.xbl(this._innerDataID);
};

com.butone.RangeFilter.prototype.getValue = function() {
	return this.getInnerData().getValue("value");
};

com.butone.RangeFilter.prototype.setFilter = function(filterDataID, filterRelations, value){
	this.filterDataID = filterDataID;
	this.filterRelations = filterRelations;
	this._value = value;
	var filterName = this.getFilterName();
	var condition = this._doGetCondition(value);
	var filterData = justep.xbl(this.filterDataID);
	var oldCondition = filterData.getFilter(filterName);
	if (condition != oldCondition) {
		filterData.setFilter(filterName, condition);
		if (this.autoRefresh)
			filterData.refreshData();
	}	
};

com.butone.RangeFilter.prototype.setAutoRefresh = function(autoRefresh){
	this.autoRefresh = autoRefresh;
};

com.butone.RangeFilter.prototype.clearFilter = function(){
	var filterData = justep.xbl(this.filterDataID);
	filterData.setFilter(this.getFilterName(),"");
	this.getInnerData().setValue("value","");
};

com.butone.RangeFilter.prototype._doGetCondition = function() {
	
	var condition = this.getFilter();
	var fun = justep.Function.get(this.onGetCondition);
	if (fun) {
		var eventData = {
			"source" : this,	
			"id" : this.id,
			"filterData" : justep.xbl(this.filterDataID),
			"filterRelations" : this.filterRelations,
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
