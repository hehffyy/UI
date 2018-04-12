var butone = butone || {};

butone.DateFilterExt = function(xblObject) {
	var el = $(xblObject.domNode);
	this.dataIsKSQL = !(el.attr('dataIsKSQL') == "false");
	if (!this.dataIsKSQL && xblObject.filterData) {
		xblObject.filterData.attachEvent(
				justep.XData.EVENT_REFRESHDATA_CREATEPARAM,
				this._doCreateRefreshDataParam, this);
	}
};

/**
 * 设置过滤条件
 */
butone.DateFilterExt.setFilter = function(id, filterData, filterMode,
		dateRelation1, dateRelation2, currentSelect, defaultSelect,
		customBeginDate, customEndDate, onGetConditionEvent, isRefresh) {
	if (!filterData || !dateRelation1)
		return;
	var filterName = justep.DateFilter.getFilterName(id);
	var condition = justep.DateFilter._doGetCondition(id, filterData,
			filterMode, dateRelation1, dateRelation2, currentSelect,
			defaultSelect, customBeginDate, customEndDate, onGetConditionEvent);
	var oldCondition = filterData.getFilter(filterName);
	if (condition != oldCondition) {
		filterData.setFilter(filterName, condition);
		if (isRefresh)
			filterData.refreshData();
	}
};

/**
 * 获取条件
 */
butone.DateFilterExt._doGetCondition = function(id, filterData, filterMode,
		dateRelation1, dateRelation2, currentSelect, defaultSelect,
		customBeginDate, customEndDate, onGetConditionEvent) {
	var condition = butone.DateFilterExt.getFilter(filterMode, dateRelation1,
			dateRelation2, currentSelect, defaultSelect, customBeginDate,
			customEndDate);
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

butone.DateFilterExt.getFilter = function(filterMode, dateRelation1,
		dateRelation2, currentSelect, defaultSelect, customBeginDate,
		customEndDate) {
	if (!currentSelect && defaultSelect)
		currentSelect = defaultSelect;
	if (!currentSelect)
		return "";

	var r1 = justep.Components.FilterUtils.getRelationAlias(this.filterDataID,
			dateRelation1);
	var r2 = justep.Components.FilterUtils.getRelationAlias(this.filterDataID,
			dateRelation2);
	var r = justep.DateFilter.getDateRange(currentSelect, customBeginDate,
			customEndDate);
	return justep.DateFilter.range2condition(filterMode, r1, r2, r.beginDate,
			r.endDate);
};

butone.DateFilterExt.prototype = {
	_doCreateRefreshDataParam : function(event) {
		// TODO
		var param = event.param;
		var variables = param.getParam();
		if (!variables) {
			variables = new justep.Request.MapParam();
			param.setMap("variables", variables);
		}

		var pName = this.data + "_00000_" + this.relation;
		var refData = justep.xbl(this.data);
		if (refData.loaded || refData.active)
			variables.put(pName, justep.xbl(this.data).getValue(this.relation));
		else
			variables.put(pName, null);

	},

	getDateFilterExt : function(field, beginDate, endDate) {
		if (!this.queryVariants) {
			this.queryVariants = new justep.Request.MapParam();
		} else {
			this.queryVariants.clear();
		}

		var p1 = null;
		if (Object.prototype.toString.apply(beginDate) == "[object Date]") {
			p1 = new justep.Request.SimpleParam(beginDate,
					justep.XML.Namespaces.XMLSCHEMA_DATE);
			this.queryVariants.put(this.getBeginParamName(), p1);
		}

		var p2 = null;
		if (Object.prototype.toString.apply(endDate) == "[object Date]") {
			p2 = new justep.Request.SimpleParam(endDate,
					justep.XML.Namespaces.XMLSCHEMA_DATE);
			this.queryVariants.put(this.getEndParamName(), p2);
		}

		if (p1 && p2)
			return "(" + this.getBeginParamName() + " <= " + field + ") AND ("
					+ this.getEndParamName() + " > " + field + ")";
		else if (beginStr)
			return "(" + this.getBeginParamName() + " <= " + field + ")";
		else if (endStr)
			return "(" + this.getEndParamName() + " > " + field + ")";
		else
			return "";
	},

	getDateRangeFilterExt : function(beginField, endField, beginDate, endDate) {
		if (!this.queryVariants) {
			this.queryVariants = new justep.Request.MapParam();
		} else {
			this.queryVariants.clear();
		}
		var p1 = null;
		if (Object.prototype.toString.apply(beginDate) == "[object Date]") {
			p1 = new justep.Request.SimpleParam(beginDate,
					justep.XML.Namespaces.XMLSCHEMA_DATE);
			this.queryVariants.put(this.getBeginParamName(), p1);
		}
		var p2 = null;
		if (Object.prototype.toString.apply(endDate) == "[object Date]") {
			p2 = new justep.Request.SimpleParam(endDate,
					justep.XML.Namespaces.XMLSCHEMA_DATE);
			this.queryVariants.put(this.getEndParamName(), p2);
		}

		if (p1 && p2)
			return "((" + endField + " IS NULL) OR ("
					+ this.getBeginParamName() + " <= " + endField + ")) "
					+ " AND ((" + beginField + " IS NULL) OR ("
					+ this.getEndParamName() + " > " + beginField + "))";
		else if (p1)
			return "((" + endField + " IS NULL) OR ("
					+ this.getBeginParamName() + " <= " + endField + "))";
		else if (p2)
			return "((" + beginField + " IS NULL) OR ("
					+ this.getEndParamName() + " > " + beginField + "))";
		else
			return "";
	},

	getCondition : function() {
		
		debugger;
		var r = this.getDateRange();
		var condition;
		
		if(!this.filterDateMode)
			this.filterDateMode = "single";
		
		if (this.filterDateMode == "single") {
			var relationAlias = justep.Components.FilterUtils.getRelationAlias(
					this.filterDataID, this.dateRelation1);
			if (this.dataIsKSQL)
				condition = justep.Components.FilterUtils.getDateFilter(
						relationAlias, r.beginDate, r.endDate);
			else
				condition = this.getDateFilterExt(relationAlias, r.beginDate,
						r.endDate);
		} else {
			var r1 = justep.Components.FilterUtils.getRelationAlias(
					this.filterDataID, this.dateRelation1);
			var r2 = justep.Components.FilterUtils.getRelationAlias(
					this.filterDataID, this.dateRelation2);
			if (this.dataIsKSQL)
				condition = justep.Components.FilterUtils.getDateRangeFilter(
						r1, r2, r.beginDate, r.endDate);
			else
				condition = this.getDateRangeFilterExt(r1, r2, r.beginDate,
						r.endDate);
		}
		if (this.onGetCondition) {
			var eventData = {
				"filterData" : this.filterData,
				"filterMode" : this.filterDateMode,
				"dateRelation1" : this.dateRelation1,
				"dateRelation2" : this.dateRelation2,
				"currentSelect" : this.getCurrentSelect(),
				"defaultSelect" : this.defaultValue,
				"customBeginDate" : r.beginDate,
				"customEndDate" : r.endDate,
				"defaultCondition" : condition
			};
			var ret = this.onGetCondition(eventData);
			if (ret)
				condition = ret;
		}
		return condition;
	}
};
