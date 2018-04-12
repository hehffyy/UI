justep.DateFilter = function(xblObject) {
	
	dhtmlxEventable(this);

	this.id = xblObject.domNode.id;
	this._attributeNode = xblObject.getElementByXblID('attribute');
	this.filterDataID = this._attributeNode.getAttribute('filter-data');
	this.filterDateMode = this._attributeNode.getAttribute('filter-date-mode');
	this.filterDateRelation1 = this._attributeNode.getAttribute('filter-date-relation1');
	this.filterDateRelation2 = this._attributeNode.getAttribute('filter-date-relation2');
	this.defaultSelect = this._attributeNode.getAttribute('default-select');
	this.autoRefresh = this._attributeNode.getAttribute('auto-refresh') == "true";

	this._modelID = this._attributeNode.getAttribute('model-id');
	this._innerDataID = this._attributeNode.getAttribute('inner-data-id');
	this._selectID = this._attributeNode.getAttribute('select-id');
	this._dialogID = this._attributeNode.getAttribute('dialog-id');

	this._isDialogOK = false;
	this._lastSelect = null;
	this._lastLabel = null;
	this._lastCustomBeginDate = null;
	this._lastCustomEndDate = null;

	this.onGetCondition = this._attributeNode.getAttribute('onGetCondition');
	this.__onChanged = this._attributeNode.getAttribute("onChanged")?justep.Function.get(this._attributeNode.getAttribute("onChanged")):null;
	
	var innerData = this.getInnerData();
	if(this.defaultSelect) this.getInnerData().setValue("value",this.defaultSelect);
	
	innerData.attachEvent(justep.XData.EVENT_DATA_CHANGED, function(event) {
		this._doValueChanged(event);
	}, xblObject);

	var select = this.getInnerSelect();
	select.attachEvent("onDropdown", function(event) {
		this._doDropdown(event);
	}, xblObject);
	select.attachEvent("onCloseup", function(event) {
		this._doCloseup(event);
	}, xblObject);

	var dialog = this.getInnerDialog();
	dialog.attachEvent("onOpen", function(event) {
		this._doDialogOpen(event);
	}, xblObject);
	dialog.attachEvent("onClose", function(event) {
		this._doDialogClose(event);
	}, xblObject);

};

justep.DateFilter.prototype._doValueChanged = function(event) {
	if (event.column == "value") {
		this._lastSelect = this.getCurrentSelect();
		this._lastLabel = this.getCurrentLabel();
		if (event.value != justep.DateFilter.CUSTOM_SELECT) {
			justep.DateFilter.setFilter(this.id, 
				this.getFilterData(), 
				this.filterDateMode,
				this.filterDateRelation1,
				this.filterDateRelation2,
				event.value, 
				this.defaultSelect,
				this.getCustomBeginDate(),
				this.getCustomEndDate(),
				this.onGetCondition, 
				this.autoRefresh);
			
			if(this.__onChanged) this.__onChanged({'source':this});
		}
	}
};

justep.DateFilter.prototype._doDropdown = function(event) {
	var value = this.getCurrentSelect();
	if (!value) {
		var defaultValue = this.defaultSelect;
		if (defaultValue) {
			this.getInnerData().setValue("value", defaultValue);
			this.getInnerSelect().changeRowsStatus();
		}
	}
};

justep.DateFilter.prototype._doCloseup = function(event) {
	if (event.value == justep.DateFilter.CUSTOM_SELECT) {
		this.getInnerDialog().open();
	}
};

justep.DateFilter.prototype._doDialogOpen = function(event) {
	this._isDialogOK = false;
	
	if (this.getCustomBeginDate() == "" && this.getCustomEndDate() == "") {
		var today = justep.Date.toString(justep.DateFilter._getToday(), "YYYY-MM-DD");
		var innerData = this.getInnerData();
		innerData.setValue("beginDate", today);
		innerData.setValue("endDate", today);
	}
};

justep.DateFilter.prototype._doDialogClose = function(event) {
	xforms.blur();
	if (this._isDialogOK) {
		this._lastSelect = this.getCurrentSelect();
		this._lastLabel = this.getCurrentLabel();
		this._lastCustomBeginDate = this.getCustomBeginDate();
		this._lastCustomEndDate = this.getCustomEndDate();
		justep.DateFilter.setFilter(this.id, 
			this.getFilterData(), 
			this.filterDateMode,
			this.filterDateRelation1,
			this.filterDateRelation2,
			this.getCurrentSelect(), 
			this.defaultSelect,
			this.getCustomBeginDate(),
			this.getCustomEndDate(),
			this.onGetCondition, 
			this.autoRefresh);
		
		if(this.__onChanged) this.__onChanged({'source':this});
	} else {
		var innerData = this.getInnerData();
		innerData.setValue("beginDate", this._lastCustomBeginDate);
		innerData.setValue("endDate", this._lastCustomEndDate);
		this.getInnerSelect().valueChanged(this._lastSelect, this._lastLabel);
	}
};

justep.DateFilter.prototype._doDialogCheck = function(event) {
	if (this.getCustomBeginDate() == "" || this.getCustomEndDate() == "") {
		alert((new justep.Message(justep.Message.JUSTEP231045)).getMessage());
		return false;
	}
	var beginDate = justep.DateFilter.str2date(this.getCustomBeginDate());
	var endDate = justep.DateFilter.str2date(this.getCustomEndDate());
	if (beginDate > endDate) {
		alert((new justep.Message(justep.Message.JUSTEP231046)).getMessage());
		return false;
	}
	this._isDialogOK = true;
	return true;
};

justep.DateFilter.prototype.getFilterName = function() {
	return justep.DateFilter.getFilterName(this.id);
};

justep.DateFilter.prototype.getFilter = function() {
	return justep.DateFilter.getFilter(this.filterDateMode,
			this.filterDateRelation1, this.filterDateRelation2,
			this.getCurrentSelect(), this.defaultSelect, 
			this.getCustomBeginDate(), this.getCustomEndDate());
};

justep.DateFilter.prototype.getFilterData = function() {
	return this.filterDataID?justep.xbl(this.filterDataID):null;
};

justep.DateFilter.prototype.getInnerSelect = function() {
	return xforms(this._selectID);
};

justep.DateFilter.prototype.getInnerDialog = function() {
	return xforms(this._dialogID);
};

justep.DateFilter.prototype.getInnerData = function() {
	return justep.xbl(this._innerDataID);
};

justep.DateFilter.prototype.getCurrentSelect = function() {
	return this.getInnerData().getValue("value");
};

justep.DateFilter.prototype.getCurrentLabel = function() {
	return this.getInnerData().getValue("label");
};

justep.DateFilter.prototype.getCustomBeginDate = function() {
	return this.getInnerData().getValue("beginDate");
};

justep.DateFilter.prototype.getCustomEndDate = function() {
	return this.getInnerData().getValue("endDate");
};

justep.DateFilter.prototype.setTabIndex = function(tabIndex) {
	this.getInnerSelect().setTabIndex(tabIndex);
};

justep.DateFilter.prototype.getTabIndex = function() {
	return this.getInnerSelect().getTabIndex();
};

justep.DateFilter.prototype.setAccessKey = function(key) {
	this.getInnerSelect().setAccessKey(key);
};

justep.DateFilter.prototype.getAccessKey = function() {
	return this.getInnerSelect().getAccessKey();
};

justep.DateFilter.prototype.setReadonly = function(readonly) {
	this.getInnerSelect().setReadonly(readonly);
};

justep.DateFilter.prototype.getReadonly = function() {
	return this.getInnerSelect().getReadonly();
};

justep.DateFilter.prototype.setDisabled = function(disabled) {
	this.getInnerSelect().setDisabled(disabled);
};

justep.DateFilter.prototype.getDisabled = function() {
	return this.getInnerSelect().getDisabled();
};

/**
 * 兼容老组件
 */
justep.DateFilter.prototype.getBeginDatetime = function(){
	return justep.DateFilter.getDateRange(this.getCurrentSelect(), this.getCustomBeginDate(), this.getCustomEndDate()).beginDate;                   
};

justep.DateFilter.prototype.getEndDatetime = function(){
	return justep.DateFilter.getDateRange(this.getCurrentSelect(), this.getCustomBeginDate(), this.getCustomEndDate()).endDate;
};

justep.DateFilter.prototype.getDateFilter = function(relation){
	if(!relation) return '';
	var beginDate = this.getBeginDatetime();
	var endDate = this.getEndDatetime();
	return justep.Components.FilterUtils.getDateFilter(relation, beginDate, endDate);
};

justep.DateFilter.CUSTOM_SELECT = "9"; 

/**
 * 设置过滤条件
 */
justep.DateFilter.setFilter = function(id, filterData,
		filterMode, dateRelation1, dateRelation2, currentSelect, defaultSelect,
		customBeginDate, customEndDate, onGetConditionEvent, isRefresh) {
	if(!filterData || !dateRelation1) return;
	var filterName = justep.DateFilter.getFilterName(id);
	var condition = justep.DateFilter._doGetCondition(id,
			filterData, filterMode, dateRelation1, dateRelation2,
			currentSelect, defaultSelect, customBeginDate, customEndDate,
			onGetConditionEvent);
	var oldCondition = filterData.getFilter(filterName);
	if (condition != oldCondition) {
		filterData.setFilter(filterName, condition);
		if (isRefresh)
			filterData.refreshData();
	}
};

/**
 * 构造filter name
 */
justep.DateFilter.getFilterName = function(id) {
	return "_" + id + "_filter";
};

/**
 * 构造条件
 */
justep.DateFilter.getFilter = function(filterMode,
		dateRelation1, dateRelation2, currentSelect, defaultSelect,
		customBeginDate, customEndDate) {
	if (!currentSelect && defaultSelect)
		currentSelect = defaultSelect;
	if (!currentSelect)
		return "";
	
	var r1 = justep.Components.FilterUtils.getRelationAlias(this.filterDataID,dateRelation1);
	var r2 = justep.Components.FilterUtils.getRelationAlias(this.filterDataID,dateRelation2);
	var r = justep.DateFilter.getDateRange(currentSelect, customBeginDate, customEndDate); 
	return justep.DateFilter.range2condition(filterMode, r1, r2, r.beginDate, r.endDate);
};

justep.DateFilter.getDateRange = function(select, customBeginDate, customEndDate) {
	var result = {'beginDate': null, 'endDate': null};
	if(typeof(select) == "string" && select) select = parseInt(select);
	if(typeof(select) != "number") return result;

	var today = justep.DateFilter._getToday();

	switch(select){
		case 0: break;
		case 1:{
			result.beginDate = today;
			result.endDate = result.beginDate;
			break;
		}
		case 2:{
			result.beginDate = justep.Date.increase(today, -1, "d");
			result.endDate = result.beginDate;
			break;
		}
		case 3:{
			result.beginDate = justep.Date.increase(today, -today.getDay(), "d");
			result.endDate = justep.Date.increase(result.beginDate, 6, "d");
			break;
		}
		case 4:{
			result.beginDate = justep.Date.increase(today, -today.getDay()-7, "d");
			result.endDate = justep.Date.increase(result.beginDate, 6, "d");
			break;
		}
		case 5:{
			result.beginDate = new Date(today.getFullYear(), today.getMonth(), 1);
			result.endDate = justep.Date.increase(new Date(today.getFullYear(), today.getMonth()+1, 1), -1, "d");
			break;
		}
		case 6:{
			result.beginDate = new Date(today.getFullYear(), today.getMonth()-1, 1);
			result.endDate = justep.Date.increase(new Date(today.getFullYear(), today.getMonth(), 1), -1, "d");
			break;
		}
		case 7:{
			result.beginDate = new Date(today.getFullYear(), 0, 1);
			result.endDate = justep.Date.increase(new Date(today.getFullYear()+1, 0, 1), -1, "d");
			break;
		}
		case 8:{
			result.beginDate = new Date(today.getFullYear()-1, 0, 1);
			result.endDate = justep.Date.increase(new Date(today.getFullYear(), 0, 1), -1, "d");
			break;
		}
		case 9:{
			result.beginDate = justep.Date.increase(today, -1, "y");
			result.endDate = today;
			break;
		}
		case 10:{
			if (customBeginDate) 
				result.beginDate = justep.DateFilter.str2date(customBeginDate);
			if (customEndDate) 
				result.endDate = justep.DateFilter.str2date(customEndDate);
			break;
		}
	}
	return result;	
};

justep.DateFilter.range2condition = function(filterMode, dateRelation1, dateRelation2, beginDate, endDate) {
	if (filterMode == "single")
		return justep.Components.FilterUtils.getDateFilter(dateRelation1, beginDate, endDate);
	else
		return justep.Components.FilterUtils.getDateRangeFilter(dateRelation1, dateRelation2, beginDate, endDate);;
};

justep.DateFilter.str2date = function(d) {
	return new Date(parseInt(d.substr(0, 4), 10), parseInt(d.substr(5, 2), 10) - 1, parseInt(d.substr(8, 2), 10));
};

/**
 * 获取条件
 */
justep.DateFilter._doGetCondition = function(id, filterData,
		filterMode, dateRelation1, dateRelation2, currentSelect, defaultSelect,
		customBeginDate, customEndDate, onGetConditionEvent) {
	var condition = justep.DateFilter.getFilter(
			filterMode, dateRelation1, dateRelation2, currentSelect,
			defaultSelect, customBeginDate, customEndDate);
	var fun = justep.Function.get(onGetConditionEvent);
	if (fun) {
		var eventData = {
			"filterData" : filterData,
			"filterMode" : filterMode,
			"dateRelation1" : dateRelation1,
			"dateRelation2" : dateRelation2,
			"currentSelect" : currentSelect,
			"defaultSelect" : defaultSelect,
			"customBeginDate" : customBeginDate,
			"customEndDate" : customEndDate,
			"defaultCondition" : condition
		};
		var customCondition = fun(eventData);
		if (eventData.handled)
			condition = customCondition;
	}

	return condition;
};

justep.DateFilter._getToday = function() {
	return justep.DateFilter.str2date(justep.System.datetimeString());
};

