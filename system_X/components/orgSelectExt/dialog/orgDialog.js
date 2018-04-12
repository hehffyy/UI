var orgDialog = {};

orgDialog.model1ModelConstruct = function(event) {
	var me = this;
	require([ "jquery" ], function($) {
		var promise = butone.Context.getBindModelPromise();
		!me.receiveDataDTD && (me.receiveDataDTD = $.Deferred());
		$.when(promise, me.receiveDataDTD).done(
				orgDialog._initBindModel.bind(orgDialog));
	});
};

orgDialog._initBindModel = function(model, receiveData) {
	// model.filterListSize = butone.Bind.observable(-1);
	butone.Util.apply(model, orgDialog.getModelExtend());
	var $rootView = $("#rootView");
	butone.Composition.bindAndShow($rootView.get(0), model);
	$rootView.show();
	model.reload(receiveData);

};

orgDialog.getModelExtend = function() {
	var Express = require("base/lib/bind/express");

	var Mapping = require("base/lib/bind/bind.mapping");
	var Org = require("base/lib/bind/org"), OrgRow = Org.Row, OrgUtil = Org.Util;
	var URL = require("base/lib/bind/url"), OrgRow = Org.Row, OrgUtil = Org.Util;
	var $ = require("jquery");
	var modelExtend = {
		list : [],
		currentRow : butone.Bind.observable(),
		multiSelection : butone.Bind.observable(true),
		showFName : butone.Bind.observable(false),
		filterText : butone.Bind.observable(null),

		reload : function(receiveData) {
			this.filterText.set(null);
			this.filterText.extend({
				rateLimit : 0
			});
			this.multiSelection.set(receiveData.multiSelection);
			if (receiveData.showFilter) {
				if ("string" === typeof receiveData.showFilter) {
					this.showFilter = new Express(receiveData.showFilter);
				} else if (receiveData.showFilter instanceof Express) {
					this.showFilter = receiveData.showFilter;
				}
			}
			this.initOrgs(receiveData.orgs, receiveData.selected);
			this.filterText.set("");
			this.filterText.extend({
				rateLimit : 500
			});
		},

		initOrgs : function(orgs, selected) {
			this.list = [];
			for ( var i = 0; i < orgs.length; i++) {
				var org = orgs[i], sName = justep.Org.OrgUtils.getNameByFName(
						org.fid, org.fname), row = {
					sFName : org.fname,
					sFID : org.fid,
					sName : sName,
					sChineseFirstPY : justep.String.makeFirstPY(sName)
							.toUpperCase(),
					sOrgKindID : justep.Org.OrgUtils.getOrgKindID(org.fid),
					selected : false
				};
				for (j = 0; j < selected.length; j++) {
					if (selected[j].fid == org.fid) {
						row.selected = true;
						break;
					}
				}

				row = Mapping.fromJS(row);
				row._org = org;
				if (this.showFilter) {
					var ctx = {
						$model : this,
						$row : new OrgRow(row)
					};
					if (Express.eval(this.showFilter, ctx.$row, ctx))
						this.list.push(row);
				} else
					this.list.push(row);
			}
		},

		// foreach提供数据的方法
		getList : function() {
			var filterText = this.filterText.get();
			if (filterText)
				return this.getFilterList(filterText);
			return this.list;
		},

		getRowValue : function(row, name) {
			return OrgUtil.getRowValue(row, name);
		},

		getFilterList : function(filterText) {
			var ret = [];
			if (!filterText)
				return ret;
			filterText = filterText.toUpperCase();
			var len = this.list.length;
			for ( var i = 0; i < len; i++) {
				var row = this.list[i];
				var v = this.getRowValue(row, "sName"), v1 = this.getRowValue(
						row, "sChineseFirstPY"), v2 = this.getRowValue(row,
						"sFName");
				if (v.indexOf(filterText) > -1 || v1.indexOf(filterText) > -1
						|| v2.indexOf(filterText) > -1) {
					ret.push(row);
				}
			}
			return ret;
		},

		doRowClick : function($object, evt) {
			if (!this.multiSelection.get() && this.doSelectFilter($object)) {
				this.checkboxAllChange({
					"checked" : false
				});
				this.currentRow.set($object);
				$("input",evt.currentTarget.parentNode).prop("checked",true);
			}
			var b = !$object.selected.get();
			$object.selected.set(b && this.doSelectFilter($object));
		},

		doSelectFilter : function(row) {
			if (this.selectFilter) {
				if ('string' == typeof (this.selectFilter))
					this.selectFilter = new Express(this.selectFilter);
				if (this.selectFilter instanceof Express) {
					var ctx = {
						$model : this,
						$row : row
					};
					return Express.eval(this.selectFilter, ctx.$row, ctx);
				}
			}
			return true;
		},

		clsfilterText : function() {
			var me = this;
			setTimeout(function() {
				me.filterText.set('');
				// me.filterListSize.set(me.limit);
			}, 50);
		},

		getOrgImageUrl : function(ele, fid) {
			var OrgUtils = justep.Org.OrgUtils, orgKind = OrgUtils
					.getOrgKindID(fid), orgID = justep.Org.OrgUtils
					.getIDByFID(fid);
			if (orgKind == justep.Org.OrgKinds.ORGKIND_PERSONMEMBER) {
				var pid = orgID.substring(0, orgID.lastIndexOf("@"));
				Org.Util.queryPersonImageURL(pid).done(function(url) {
					$(ele).attr("src", url);
				});
			}
			return require.toUrl("base/lib/bind/img/org.png");
		},

		checkboxAllChange : function(event) {
			var rows = this.getList();
			for ( var i = 0; i < rows.length; i++)
				rows[i].selected.set(event.checked);
		},

		doCheckChanged : function(event) {
			if (!this.multiSelection.get())
				this.checkboxAllChange({
					"checked" : false
				});
			event.bindingContext.$object.selected.set(event.value);
		},

		showOrHideFName : function(event) {
			if (this.showFName.get()) {
				this.showFName.set(false);
				$("div.x-org-image").css("width", "48px").css("height", "38px");
				$("div.x-org-checkbox").css("padding-top", "5px");
				$(".media-heading").css("padding-top", "10px");
			} else {
				this.showFName.set(true);
				$("div.x-org-image").css("width", "58px").css("height", "48px");
				$("div.x-org-checkbox").css("padding-top", "5px");
				$(".media-heading").css("padding-top", "5px");
			}
		},

		okBtnClick : function() {
			var ret = [];
			for ( var n in this.list) {
				var item = this.list[n];
				if (item.selected.get()) {
					ret.push(item._org);
				}
			}
			justep.xbl("windowReceiver1").windowEnsure(ret);
		},

		cancelBtnClick : function() {
			justep.xbl("windowReceiver1").windowCancel();
		}
	};
	return modelExtend;
};

orgDialog.windowReceiver1Receive = function(event) {
	var me = this;
	require([ "jquery" ], function($) {
		!me.receiveDataDTD && (me.receiveDataDTD = $.Deferred());
		me.receiveDataDTD.resolve(event.data);
	});
};
