define(["require","jquery","./object","base/lib/bind/express","base/lib/bind/url"],function (e,$,Object,Express,URL) {
	var t = e("jquery"),
	psm = [],
	org = [],
	loaded = !1,
	a = null,
	f = [19, 54, 68, 73, 25, 11, 86, 34],
	getRowValue = function (e, t) {
		if (e) {
			var r = e[t];
			return butone.Bind.isObservable(r) ? r.get() : r;
		}
	},
	setRowValue = function (e, t, r) {
		if (e) {
			var i = e[t];
			butone.Bind.isObservable(i) ? i.set(r) : e[t] = r;
		}
	},
	Row = Object.extend({
			constructor : function (e) {
				this._row = e;
			},
			ref : function (e) {
				return this._row[e];
			},
			getID : function () {
				return this.val("SA_OPOrg");
			},
			val : function (e, t) {
				if (arguments.length == 1)
					return getRowValue(this._row, e);
				setRowValue(this._row, e, t);
			}
		}),
	getOrgs = function () {
		var r = a && "function" == typeof a.getContext ? a.getContext() : null;
		r && Util.addCookie("bsessionid", r.getBSessionID(), "/");
		var i = t.Deferred(),
		s = window.__justep && window.__justep.__portalContext && window.__justep.__portalContext.data ? window.__justep.__portalContext.data.orgVersion : null,
		u = new URL(e.toUrl("$UI/system/components/justep/org/server/getOrgs.j"));
		return u.setParam("$orgVersion", s),
		u.setParam("$includePersonPhotoLastModified", !0),
		t.ajax({
			type : "GET",
			url : u.toString(),
			contentType : "application/json",
			dataType : "json",
			async : !0,
			cache : !0,
			success : function (e) {
				org = e.data.value.rows,
				i.resolve();
			}
		}),
		i.promise();
	},
	_loadPSM = function () {
		psm = [];
		var e = org.length;
		for (var t = 0; t < e; t++) {
			var n = org[t];
			"psm" == n["sOrgKindID"] && psm.push(n);
		}
	},
	_loadOrgs = function () {
		var e = t.Deferred();
		return getOrgs().done(function () {
			Sort(),
			_loadPSM(),
			e.resolve();
		}),
		e.promise();
	},
	m = function (e) {
		localStorage._orgData_ = e;
	},
	g = function (r) {
		var i = a && "function" == typeof a.getContext ? a.getContext() : null;
		i && Util.addCookie("bsessionid", i.getBSessionID(), "/");
		var s;
		r = r || (window.__justep && window.__justep.__portalContext && window.__justep.__portalContext.data ? window.__justep.__portalContext.data.orgVersion : null);
		var o = new URL(e.toUrl("$UI/system/components/justep/org/server/getOrgs.j"));
		return o.setParam("$orgVersion", r),
		t.ajax({
			type : "GET",
			url : o.toString(),
			contentType : "application/json",
			dataType : "json",
			async : !1,
			cache : !0,
			success : function (e) {
				s = e.data.value;
			}
		}),
		s;
	},
	y = function (e, t) {},
	b = function (e, t) {
		var n = "",
		r = t.length;
		for (var i = 0; i < e.length; i++)
			n += String.fromCharCode(e.charCodeAt(i)^t[i % r]);
		return n;
	},
	loadOrg = function () {
		var e = t.Deferred(),
		n;
		if (n) {
			"{" !== n[0] ? n = b(n, f) : m(b(n, f));
			var r = JSON.parse(n);
			org = r.org,
			psm = r.psm,
			loaded = !0,
			e.resolve();
		} else
			_loadOrgs().done(function () {
				loaded = !0,
				e.resolve();
			});
		return e.promise();
	},
	Sort = function () {
		var e = function (e, t) {
			return e.sChineseFirstPY || (e.sChineseFirstPY = justep.String.makeFirstPY(e.sName).toUpperCase()),
			t.sChineseFirstPY || (t.sChineseFirstPY = i.makeFirstPY(t.sName).toUpperCase()),
			e.sChineseFirstPY > t.sChineseFirstPY ? 1 : -1;
		};
		org.sort(e);
	},
	S = function (e, n) {
		e && t.isArray(e) && e.length > 0 && t.each(e, function (e, t) {
			t.sFID && t.sFID.value && n.push(t.sFID.value),
			S(t.rows, n);
		});
	},
	x = function () {
		var e = [],
		n = k.loadGroupRootByMobile(a.getContext());
		return n.rows && t.isArray(n.rows) && n.rows.length > 0 && S(n.rows, e),
		e;
	},
	_getOrgData = function (org, includeOrgKind, showFilter, includeDisabled, commonGroupOrg) {
		if (!includeOrgKind && !showFilter && !commonGroupOrg)
			return org;
		var u = [];
		commonGroupOrg && (u = x()),
		includeOrgKind && typeof r == "string" && (includeOrgKind = includeOrgKind.split(","));
		var f = function (e, r, i) {
			if (!includeDisabled && "1" != e["sValidState"])
				return !1;
			var f = !0,
			l = e.sOrgKindID,
			c = e.sFID,
			p,
			d;
			if (t.isArray(r)) {
				f = !1,
				d = r.length;
				var v;
				for (p = 0; p < d; p++) {
					v = r[p];
					if (l.toLowerCase() == v.toLowerCase()) {
						f = !0;
						break;
					}
				}
			}
			if (f && commonGroupOrg && t.isArray(u)) {
				f = !1,
				d = u.length;
				var m;
				for (p = 0; p < d; p++) {
					m = u[p];
					if (0 === c.indexOf(m)) {
						f = !0;
						break;
					}
				}
			}
			if (f && i instanceof Express) {
				var g = new Row(e),
				y = {
					$model : a,
					$row : g
				};
				return Express.eval(i, y.$row, y);
			}
			return f;
		},
		l = [],
		c = org.length;
		for (var p = 0; p < c; p++) {
			var d = org[p];
			f(d, includeOrgKind, showFilter) && l.push(d);
		}
		return l;
	},
	N = function (e, t) {
		var n = t.length;
		for (var r = 0; r < n; r++) {
			var i = t[r];
			if (i["sFID"] == e || i["SA_OPOrg"] == e)
				return i.sPhotoLastModified;
		}
	},
	Util = {
		getOrgTreeData : function (e) {
			return g(e);
		},
		setOrgTreeData : function (e, t) {
			y(e, t);
		},
		getOrgData : function (mode, includeOrgKind, showFilter, includeDisabled, commonGroupOrg) {
			showFilter && typeof showFilter == "string" && (showFilter = new Express(showFilter)),
			a = mode;
			var l = t.Deferred();
			return loaded ? l.resolve(_getOrgData(org, includeOrgKind, showFilter, includeDisabled, commonGroupOrg)) : loadOrg().done(function () {
				l.resolve(_getOrgData(org, includeOrgKind, showFilter, includeDisabled, commonGroupOrg));
			}),
			l.promise();
		},
		getPsmData : function (e) {
			a = e;
			var n = t.Deferred();
			return loaded ? n.resolve(psm) : loadOrg().done(function () {
				n.resolve(psm);
			}),
			n.promise();
		},
		getPhotoLastModified : function (e, n) {
			var r = t.Deferred();
			return this.getPsmData(e).done(function (e) {
				r.resolve(N(n, e));
			}),
			r.promise();
		},
		reload : function (e) {
			a = e,
			localStorage._orgData_ = "",
			L = null,
			loaded = !1;
		},
		getValidFilter : function (e) {
			return e ? "" : "SA_OPOrg.sValidState=1";
		},
		getIncludeOrgKindFilter : function (e) {
			typeof e == "string" && (e = e.split(","));
			if (!t.isArray(e))
				return "";
			var r = "";
			for (var i = 0; i < e.length; i++) {
				var s = e[i],
				o = justep.String.trim(s);
				o && (r += (r !== "" ? "," : "") + "'" + o + "'");
			}
			return r !== "" ? "SA_OPOrg.sOrgKindID in (" + r + ")" : "";
		},
		getRowValue : getRowValue,
		setRowValue : setRowValue,
		
		find : function(fields, values, First, CaseInsensitive, PartialKey) {
			var res = [];
			var len = 0;
			if (values && fields)
				len = values.length > fields.length ? fields.length : values.length;
			if (len > 0) {
				this.each(function(data) {
					var ok = true;
					var r = data.row;
					for ( var i = 0; i < len; i++) {
						var v = this.getRowValue(r,fields[i]);
						if (typeof (v) === 'string') {
							v = !CaseInsensitive ? v : v.toLowerCase();
							var value = !CaseInsensitive ? values[i] : (values[i] + '').toLowerCase();
							ok = ok && (!PartialKey ? v == value : v.indexOf(value) != -1);
						} else
							ok = values[i] == v;
						if (!ok)
							break;
					}
					if (ok) {
						res.push(r);
						if (First)
							data.cancel = true;
					}
				}, this);
			}
			return res;
		},
		
		each : function(callback, caller){
			if ('function' !== typeof (callback))
				return;
			var len = org.length;
			for ( var i = 0; i < len; i++) {
				var param = {
					index : i,
					row : org[i],
					cancel : false,
					data : this
				};
				callback.call(caller || param.row, param);
				if (param.cancel)
					return;
			}
			return true;
		},
		queryPerson : function(id,columns) {
			var dtd = $.Deferred();
			var o = new butone.URL(require
					.toUrl("system_X/service/common/getPerson.j")), s;
			o.setParam({
				rowid : id,
				columns : columns
			}), $.ajax({
				type : "GET",
				url : justep.Request.addBsessionid(o.toString()),
				contentType : "application/json",
				dataType : "json",
				async : true,
				cache : true,
				success : function(e) {
					dtd.resolve(e.data.value.rows[0]);
				},
				error : function(e) {
					dtd.fail(e);
				}
			});
			return dtd.promise();
		},
		
		queryPersonImageURL : function(id) {
			var dtd = $.Deferred(),self = this;
			
			self.queryPerson(id, "sPhotoLastModified").then(function(person){
					if (person.sPhotoLastModified.value) {
						var t = {
							process : justep.Context
									.getCurrentProcess(),
							activity : justep.Context
									.getCurrentActivity(),
							action : "blobDownloadAction",
							blobDataModel : "/system/data",
							blobConcept : "SA_OPPerson",
							blobRelation : "sPhoto",
							blobConceptValue : id,
							"$query-version" : (new justep.UUID())
									.valueOf()
						}, r = new butone.URL(
								require
										.toUrl("system/service/common/bizAction.j"));
						r.setParam(t);
						dtd.resolve(justep.Request.addBsessionid(r
								.toString()));
					}else{
						dtd.resolve(require.toUrl("base/lib/bind/img/person.png"));
					}
				},function(){
					dtd.resolve(require.toUrl("base/lib/bind/img/person.png"));
				});
			return dtd.promise();
		}
		
	},
	k = {},
	L = null;
	return k.GROUP_ROOT_ID = "_group_",
	k.GROUP_ORGKIND = "group",
	k.GROUP_QUERY_ACTION = "queryOrgCommonGroupAction",
	k.loadGroupRoot = function (e, t, n) {
		var i,
		s = new justep.Request.TranslateParam();
		s.dataType = justep.Request.TranslateParam.DATATYPE_ROW_TREE,
		s.rowOption.sequence = t,
		s.setTreeOption("tree-parent-relation", "sParent");
		var o = new justep.Request.ActionParam();
		return o.setString("filter", n),
		o.setInteger("offset", 0),
		o.setInteger("limit", -1),
		justep.Request.sendBizRequest({
			context : e,
			dataType : "json",
			directExecute : !0,
			action : k.GROUP_QUERY_ACTION,
			parameters : o,
			translateParam : s,
			callback : function (e) {
				e.ignoreError = !1,
				e.state && (i = e.response);
			}
		}),
		i;
	},
	k.loadGroupRootByMobile = function (e) {
		var t = L;
		return L || (t = k.loadGroupRoot(e, "SA_OPOrg,sName,sCode,sLongName,sFName,sFCode,sFID,sOrgKindID,sPersonID,sValidState", ""), L = t),
		t;
	},
	k.hasCommonGroup = function (e) {
		var n = k.loadGroupRootByMobile(e);
		return n.rows && t.isArray(n.rows) && n.rows.length > 0;
	},
	k.isGroupOrgID = function (e) {
		return e.indexOf("/" + k.GROUP_ROOT_ID + "/") === 0;
	},
	k.getOrgIDOfGroupOrgID = function (e) {
		return k.isGroupOrgID(e) ? e.substring(e.lastIndexOf("/") + 1, e.length) : e;
	},
	k.getGroupIDOfGroupOrgID = function (e) {
		if (k.isGroupOrgID(e)) {
			var t = e.substring(("/" + k.GROUP_ROOT_ID + "/").length, e.length);
			return t = t.substring(0, t.indexOf("/")),
			t;
		}
		return null;
	}, {
		Util : Util,
		Row : Row,
		CommonGroup : k
	};
});