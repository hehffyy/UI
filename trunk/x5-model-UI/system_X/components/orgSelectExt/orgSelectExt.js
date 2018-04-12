(function(global) {

	var orgSelectExt = function(xblObj) {
		xblObj._selected = [];
		if (typeof (dhtmlxEventable) != 'undefined')
			dhtmlxEventable(this);
		else if (typeof (justep.Utils.eventable) != 'undefined')
			justep.Utils.eventable(this);
		
		if ($(xblObj.domNode).attr("onBeforeCalcOrgExpr"))
			this.attachEvent("onBeforeCalcOrgExpr", justep.Function.get($(
					xblObj.domNode).attr("onBeforeCalcOrgExpr")));
		var dialog = justep.xbl(xblObj.dialogId);
		dialog.attachEvent("onReceive", $.proxy(
				this._selectExecutorsDialogReceive, xblObj), dialog);
	};

	orgSelectExt.prototype = {
		setRange: function(expr){
			this.range = expr;
		},
		_selectExecutorsDialogReceive : function(event) {
			this.data.setValue(this.relation, null);
			if (this.extRelation){
				this.data.setValue(this.extRelation, null);
			}
			this._selected = [];
			if (event.data.length > 0) {
				var names = "";
				var ids = "";
				for ( var i = 0; i < event.data.length; i++) {
					var orgUnit = event.data[i];
					this._selected.push(orgUnit);
					if (names.length > 0)
						names += ",";
					if (ids.length > 0)
						ids += ",";
					if(this.showType=="tree"){
						names += orgUnit.sName;
						ids += orgUnit.sFID;
					} else {
						names += orgUnit.fname.substr(orgUnit.fname.lastIndexOf("/") + 1);
						ids += orgUnit.fid;
					}
				}
				this.data.setValue(this.relation, names);
				if (this.extRelation)
					this.data.setValue(this.extRelation, ids);

			}
		},
		_clear:function(){
			this.data.setValue(this.relation, null);
			if (this.extRelation){
				this.data.setValue(this.extRelation, null);
			}	 
		},
		
		_queryOrgUnitRange : function(){
			if(this.showType=="tree"){
				if (this.checkEvent("onBeforeCalcOrgExpr")) {
					var event = {
							"rootFilter" : "",
							"filter" : ""
					};
					this.callEvent("onBeforeCalcOrgExpr", [ event ]);
					this.rootFilter = event.rootFilter || "";
					this.filter = event.filter || "";
				}
				this._getOrgSelectExtInfocallBack();
			} else {
				var params = new justep.Request.ActionParam();
				params.setString("conceptName", this.data.getConceptName());
				params.setString("relationName", this.relation);
				params.setString("expr", this.range||"");
				params.setString("bizRecId", justep.Context.getProcessData1());
				if (this.checkEvent("onBeforeCalcOrgExpr")) {
					var event = {
							"variants" : new justep.Request.MapParam(),
							"filters" : new justep.Request.MapParam()
					};
					this.callEvent("onBeforeCalcOrgExpr", [ event ]);
					params.setMap("variants", event.variants);
					params.setMap("filters", event.filters);
				}
				
				justep.Request.sendBizRequest2({
					action : "getOrgSelectExtInfoAction",
					dataType : "json",
					parameters : params,
					executor : justep.Context.getExecutor(),
					executeContext : justep.Context.getExecuteContext(),
					callback : $.proxy(this._getOrgSelectExtInfocallBack, this)
				});
			}
		},
		
		_selectOrgUnit : function(evt) {
			this._selected = [];
			if (this.extRelation){
				var fIDs  = this.data.getValue(this.extRelation).split(",");
				if(this.showType=="tree"){
					this._selected = fIDs;
				} else {
					for(var i = 0; i < fIDs.length; i++){
						this._selected.push({"fid":fIDs[i]});
					}
				}
			}
			// 调用保存frameForm.js中butone.FrameForm的保存数据，因为getOrgSelectExtInfo计算表达式
			if (butone && butone.Context && butone.Context.frameForm) {
				var me = this;
				butone.Context.frameForm.saveDatas().done(function(){
					me._queryOrgUnitRange();
				});
			}else{
				this._queryOrgUnitRange();
			}
		},

		_getOrgSelectExtInfocallBack : function(result) {
			var data = {
					multiSelection : this.multiSelect,
					selected : this._selected,
					orgKinds : this.orgKinds,
					cascade : true
			};
			var url = "/UI/system/components/orgSelectExt/dialog/orgDialog.w";
			if(this.showType=="tree"){
				url = this.multiSelect? "/UI/system/components/orgDialog/dialogs/orgMultiSelect.w" : "/UI/system/components/orgDialog/dialogs/orgSingleSelect.w";
				data.rootFilter = this.rootFilter;
				data.filter = this.filter;
			} else {
				if (result.state)
					data.orgs = result.response;
				else 
					throw new Error("获得机构内容失败:\n" + result.response.message);
			}
			var dialog = justep.xbl(this.dialogId);
			dialog.setURL(url);
			dialog.open(data);
		}
	};

	var com = global.com = global.com || {};
	com.butone = com.butone || {};
	com.butone.OrgSelectExt = orgSelectExt;
	return orgSelectExt;
})(window);
