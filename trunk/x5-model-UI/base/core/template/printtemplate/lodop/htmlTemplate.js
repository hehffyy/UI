(function(global) {
	/**
	 * templateData:模板数据,templatePath:html模板Url,options:{displayOption:{ds:[F1,F2]}}
	 */
	function HtmlTemplate(templateData, templatePath, options) {
		
		this._tempalteData = templateData;
		this._templatePath = templatePath;
		this._templateHtml = this._getHtmlTemplate();
		this._$template = $(this._templateHtml);
		this._options = options;
		this._displayOption={};
		this._hideOption={};
		if(options!=null && options.displayOption )
			this._displayOption = options.displayOption;
		if(options!=null && options.hideOption )
			this._hideOption = options.hideOption;
	}
	;

	// 构造Html
	HtmlTemplate.prototype.createHtml = function() {
		
		var $templateCopy = this._$template.clone();
		for ( var i = 0; i < this._tempalteData.length; i++) {
			var item = this._tempalteData[i];
			this._createHtmlByOneData(item, $templateCopy);
		}
		//控制隐藏元素 
		for(var ds in this._hideOption){
			var flds = this._hideOption[ds];
			for(var i in flds){
				var fld = ds+"."+flds[i];
				
				$templateCopy.find("[relFlds$='" + fld+ "']").remove();
			}
		}
		return $templateCopy.html();
	};

	// 获取Html模板
	HtmlTemplate.prototype._getHtmlTemplate = function() {
		var html = "";
		var url = justep.Request.convertURL(this._templatePath, false);
		url = location.protocol + "//" + location.host + url;
		$.ajax({
			type : "GET",
			url : url,
			async : false,
			dataType : "txt",
			success : function(rs) {
				html = $($(rs)[2]).attr("outerHTML");
			},

			error : function() {
				alert("error");
			}
		});
		return html;
	};

	HtmlTemplate.prototype._createHtmlByOneData = function(oneData, $parent) {
		
		var id = oneData.id;
		var displayOption;
		// 获得模板元素
		var curTpl = $parent.find("[name$='" + id + "']");
		var items = oneData.items;
		items.reverse();
		for ( var i = 0; i < items.length; i++) {
			var item = items[i];
			var curTplCopy = curTpl.clone();
			// 替换当前模板内容
			for ( var fld in item) {
				var value = item[fld];
				var fldEle = curTplCopy.find("fld[name$='" + id + "." + fld
						+ "']");
				this._setEleValue(fldEle,id,fld,value);
			}
			// 循环子数据
			if (item.clds) {
				for ( var j = 0; j < item.clds.length; j++) {
					var cld = item.clds[j];
					this._createHtmlByOneData(cld, curTplCopy);
				}
			}
			curTpl.after(curTplCopy);
		}
		curTpl.remove();
	};

	//设置模板元素值
	HtmlTemplate.prototype._setEleValue = function(fldEle,id,fld,value){
		//判断是否需要显示
		/*var ary=this._displayOption[id];
		if(ary==null || ary.indexOf(fld)==-1)
			fldEle.text(value);
		else
			fldEle.text("******");*/
		fldEle.text(value);
	};
	global.HtmlTemplate = HtmlTemplate;
})(window);
