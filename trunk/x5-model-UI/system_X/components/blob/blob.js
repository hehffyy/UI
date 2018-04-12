/**
 * blob组件对象
 */
justep.Blob = function(xblObject) {
	this.disabled = xblObject.domNode.getAttribute('disabled');
	this.onRefreshButton = xblObject.domNode.getAttribute('onRefreshButton');
	if (this.onRefreshButton)
		this.onRefreshButton = justep.Function.get(this.onRefreshButton);
	else
		this.onRefreshButton = null;
	this.onRefresh = xblObject.domNode.getAttribute('onRefresh');
	if (this.onRefresh)
		this.onRefresh = justep.Function.get(this.onRefresh);
	else
		this.onRefresh = null;
	this.onSubmit = xblObject.domNode.getAttribute('onSubmit');
	if (this.onSubmit)
		this.onSubmit = justep.Function.get(this.onSubmit);
	else
		this.onSubmit = null;

	this.xblObjId = xblObject.__getAttributeValue('xbl-obj-id');
	this.size = xblObject.domNode.getAttribute('size');
	this.dialogId = xblObject.__getAttributeValue('dialog-id');
	this.ctrlId = xblObject.__getAttributeValue('ctrl-id');
	this.ctrl = justep(this.ctrlId);
	this.formId = xblObject.__getAttributeValue('form-id');
	this.formDeleteId = xblObject.__getAttributeValue('form-delete-id');
	this.editButton = justep(xblObject.__getAttributeValue('edit-button'));
	this.deleteButton = justep(xblObject.__getAttributeValue('delete-button'));
}

justep.Blob.prototype = {
	getXblObjId : function() {
		return this.xblObjId;
	},
	getDialog : function() {
		if (!this.dialog)
			this.dialog = justep.xbl(this.dialogId);
		return this.dialog;
	},
	getAttributeValue : function(name) {
		return this.domNode.getAttribute(name);
	},
	getData : function() {
		return justep.xbl(this.domNode.getAttribute('data'));
	},
	getProcess : function() {
		var s = justep.xbl(this.domNode.getAttribute('process'));
		if (!s)
			return justep.Context.getCurrentProcess();
		else
			return s;
	},
	getActivity : function() {
		var s = justep.xbl(this.domNode.getAttribute('activity'));
		if (!s)
			return justep.Context.getCurrentActivity();
		else
			return s;
	},
	useKeyRelation : function() {
		return 'true' == this.getAttributeValue('use-key-relation');
	},
	getKeyRelationValue : function(index) {
		if (index < 1 || index > 5)
			return "";
		var data = this.getData();
		if (!data)
			return "";
		var relationName = this.getAttributeValue('key-relation' + index);
		if (!relationName)
			return "";
		return data.getValue(relationName);
	},
	getConcept : function() {
		var s = this.domNode.getAttribute('concept');
		if (!s) {
			var data = this.getData();
			if (data && data.getConceptName)
				return data.getConceptName();
			else
				return ""
		} else
			return s;
	},
	getEditButtonImgUrl : function(enable) {
		var t = !justep.Browser.hasTouch?"16.gif":"32.png";
		var s = justep.xbl(this.domNode.getAttribute(enable ? 'edit-image'
				: 'unedit-image'));
		return s ? s : (enable ? ('/UI/system/components/blob/edit'+t)
				: ('/UI/system/components/blob/unedit'+t));
	},
	getDeleteButtonImgUrl : function(enable) {
		var t = !justep.Browser.hasTouch?"16.gif":"32.png";
		var s = justep.xbl(this.domNode.getAttribute(enable ? 'delete-image'
				: 'undelete-image'));
		return s ? s : (enable ? ('/UI/system/components/blob/remove'+t)
				: ('/UI/system/components/blob/unremove'+t));
	},
	generateButton : function(src, disSrc, enable, alt, attrs) {
		var s = "<img src=\"" + justep.Request.BASE_URL
		+ (enable ? src : disSrc) + "\" alt=\""
				+ alt
				+ "\" style=\"border:1px solid #ffffff\" "
				+ attrs
				+ " onmouseover=\"this.style.border='1px ridge'\" onmouseout=\"this.style.border='1px solid #ffffff'\" ";
		if (!enable)
			s += " disabled=\"true\" ";
		s += "/></img>";
		return s;
	},
	attachStoreEvent : function() {
		var data = this.getData();
		if (data) {
			var callback = function(event) {
				var self = this;
				window.setTimeout(function() {
					self.refresh();
				}, 200);
			}
			if (!justep.Client.MOBILE) {
				data.attachEvent(justep.XData.EVENT_REFRESHPAGEDATA_AFTER,
						callback, this);
				data.attachEvent(justep.XData.EVENT_INDEX_CHANGED, callback,
						this);
				data.attachEvent(
						justep.Client.MOBILE ? justep.mobile.BizData.EventType.EVENT_REFRESHDATA_BEFORE
								: justep.XData.EVENT_REFRESHDATA_AFTER,
								callback, this);
				var saveCallback = function(event) {
					var self = this;
					window.setTimeout(function() {
						self.refreshButton();
					}, 200);
				}
				data.attachEvent(
						justep.Client.MOBILE ? justep.mobile.BizData.EventType.EVENT_SAVEDATA_AFTER
								: justep.XData.EVENT_SAVEDATA_AFTER,
								saveCallback, this);
			}
		}
	},
	refresh : function(rowid) {
		if(rowid) this.rowId = rowid;
		var data = this.getData();
		if (data) {
			if (this.onRefresh)
				this.onRefresh({
					'source' : this,
					'url' : this.getBlobUrl(rowid)
				});
			this.refreshButton();
			if (justep.Client.MOBILE)
				this.domouseover(this.domNode);
		}
	},
	getDefaultReadonly : function() {
		var data = this.getData();
		if(data){
			return (data.getCount?data.getCount():(data.getLength?data.getLength():0)) <= 0 
				|| 'new' == (data.getRowState?data.getRowState(data.getRowId()):(data.getState?data.getState(data.getID(0)):''));
		}else return false;
	},
	refreshButton : function() {
		var defaultReadonly = this.getDefaultReadonly();
		if (this.editButton) {
			var editReadonly = defaultReadonly;
			if (!editReadonly && this.onRefreshButton)
				editReadonly = !this.onRefreshButton({
					'source' : this,
					'kind' : 'edit'
				});
			this.editButton.innerHTML = this
					.generateButton(
							this.getEditButtonImgUrl(true),
							this.getEditButtonImgUrl(false),
							!editReadonly,
							(new justep.Message(justep.Message.JUSTEP231038)).getMessage(),
							' onclick="if('+"'true'"+'!=$(this).attr('+"'disabled'"+')){justep.XBLObject.getXBLObject(this).editBlob();}"');
		}
		if (this.deleteButton) {
			var deleteReadonly = defaultReadonly;
			if (!editReadonly && this.onRefreshButton)
				deleteReadonly = !this.onRefreshButton({
					'source' : this,
					'kind' : 'delete'
				});
			this.deleteButton.innerHTML = this
					.generateButton(
							this.getDeleteButtonImgUrl(true),
							this.getDeleteButtonImgUrl(false),
							!deleteReadonly,
							(new justep.Message(justep.Message.JUSTEP231039)).getMessage(),
							' onclick="if('+"'true'"+'!=$(this).attr('+"'disabled'"+')) justep.XBLObject.getXBLObject(this).deleteBlob();"');
		}
	},
	dialogOk : function() {
		var ok = true;
		if (this.onSubmit)
			ok = this.onSubmit({
				'source' : this,
				'kind' : 'edit',
				'file' : $("#" + this.formId)
						.children("input[name='blobData']").val()
			});
		if (ok) {
			this.postData('edit');
			if (this.getDialog())
				this.getDialog().close();
		}
	},
	dialogCancel : function() {
		if (this.getDialog())
			this.getDialog().close();
	},
	editBlob : function() {
		if (this.getDialog())
			this.getDialog().open();
	},
	deleteBlob : function() {
		var ok = confirm((new justep.Message(justep.Message.JUSTEP231040)).getMessage());
		if (ok && this.onSubmit)
			ok = this.onSubmit({
				'source' : this,
				'kind' : 'delete',
				'file' : ''
			});
		if (ok)
			// this.postData('delete');
			this.deleteAction();
	},
	deleteAction : function() {
		var param = new justep.Request.ActionParam();
		// param.setString('concept', this.getConcept());
		// TODO 5.2与5.3参数不一样 
		param.setString('blobConcept', this.getConcept());
		param.setString('blobDataModel', this.getDataModel());
		param.setString('blobConceptValue', this.getRowId());
		param.setString('blobRelation', this.getAttributeValue('relation'));

		var r = justep.Request.sendBizRequest(this.getProcess(), this
				.getActivity(), 'blobDeleteAction', param, null, null, true);
		if (justep.Request.isBizSuccess(r))
			this.refresh();
	},
	postData : function(kind) {
		var f = justep(this.formId);
		if (f) {
			this.readySubmit(f);
			f.submit();
		}
	},
	getDataModel : function() {
		return justep.Client.MOBILE ? this.getData().getModel() : this
				.getData().dataModel;
	},
	readySubmit : function(f) {
		$f = $(f);
		//lzg 2012.7.2 ie6,7有bug不能通过setAttribute设置属性值
		justep.Request.setFormAction(f, justep.Request.convertURL("/UI/system/service/common/bizAction.j"));
		$f.children("input[name='blobDataModel']").val(this.getDataModel());
		$f.children("input[name='blobConcept']").val(this.getConcept());
		$f.children("input[name='blobRelation']").val(
				this.getAttributeValue('relation'));
		$f.children("input[name='process']").val(this.getProcess());
		$f.children("input[name='activity']").val(this.getActivity());
		$f.children("input[name='blobConceptValue']").val(this.getRowId());
		$f.children("input[name='limitSize']").val(this.size?this.size:'');
	},
	getRowId : function(){
		var data = this.getData();
		if (data) {
			this.rowId = justep.Client.MOBILE ? (this.rowId?this.rowId:data.getID(0)) : data.getRowId();
			return this.rowId; 
		}else return "";
	},
	getBlobUrl : function(rowid) {
		if (!rowid) {
			rowid = this.getRowId();
		}
		if (!rowid) return;
		
		if(!this.getDefaultReadonly())
			return justep.Request.setBizParams(justep.Request
				.convertURL("/UI/system/service/common/bizAction.j")
				+ "&blobDataModel="
				+ this.getDataModel()
				+ "&blobConcept="
				+ this.getConcept()
				+ "&blobRelation="
				+ this.getAttributeValue('relation')
				+ "&blobConceptValue="
				+ rowid
				+ "&process="
				+ this.getProcess()
				+ "&activity="
				+ this.getActivity()
				+ "&action=blobDownloadAction"
				+ "&$query-version="
				+ (new justep.UUID()).valueOf());
		else return "about:blank";
	},
	checkResult : function(iframe) {
		if (iframe && iframe.contentWindow && iframe.contentWindow.document) {//特殊支持i9
			var doc = (!justep.Browser.IE||(justep.Browser.IE>=9))?iframe.contentWindow.document:iframe.contentWindow.document.XMLDocument;
			if(doc){
				var data = justep.XML.eval0(doc, "/root/data","single");
				var flag = justep.Request.getFlag(doc);
			}
			if (data && flag) {
				var isok = 'false' != flag;

				if (isok) {
					this.refresh();
				} else {
					var msg = justep.Request.getMessage(doc);
					throw new Error(msg);
				}
			}
		}
	},
	domouseover : function(self, always) {
		if (this.ctrl) {
			if (!this.disabled) {
				this.ctrl.style.display = 'block';
				if (!this.ctrl.setTopOK || always) {
					this.ctrl.setTopOK = true;
					var t = !justep.Browser.hasTouch?0:16;
					this.ctrl.style.top = ($(self).height() - 25 - t)+'px';
					this.ctrl.style.left = ($(self).width() - 45 - t - t)+'px';
				}
			} else
				this.ctrl.style.display = 'none';
		}
	},
	domouseout : function(self) {
		if (!justep.Client.MOBILE && this.ctrl) {
			this.ctrl.style.display = 'none';
		}
	}
}

justep.Blob.imgFileTest = function(event) {
	if (event) {
		if ('edit' == event.kind) {
			var result = false;
			var types = new Array(".gif", ".jpg", ".png", ".bmp", ".jpeg");
			var file = event.file;
			var extPosition = file.lastIndexOf('.');
			if (extPosition > 0) {
				var ext = file.substring(extPosition);
				if (ext) {
					ext = ext.toLowerCase();
					for ( var i = 0; i < types.length; i++) {
						if (types[i] == ext) {
							result = true;
							break;
						}
					}
				}
			}
			if (!result) {
				var msg = new justep.Message(justep.Message.JUSTEP231041, types.join("  "));
				throw justep.Error.create(msg);
			}
			return result;
		}
	}
	return true;
}