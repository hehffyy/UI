justep.design.Attachment = function(config) {
	justep.design.Attachment.superclass.constructor.call(this, config);

};

justep
		.extend(
				justep.design.Attachment,
				justep.design.Component,
				{
					paintContent : function(xmlNode) {
						this.createElement("<div id='" + this.id
								+ "' isViewPartContent ='false'></div>",
								xmlNode);
						$(this.element)
								.append(
										'<div class="x-attachment"><div class="x-attachment-content x-card-border">'
												+ '<div class="x-doc-process">'
												+ '<div class="progress-bar x-doc-process-bar" role="progressbar" style="width:0%;"/>'
												+ '</div>'
												// data-bind="foreach:$attachmentItems"
												+ '<div>'
												// each item
												+ '<div class="x-attachment-cell"><div>'
												+ '<div class="x-attachment-item x-item-other"><a class="x-remove-barget"/></div>'
												+ '<label data-bind="text:$object.docName,visible:$model.showName" style="display:block;margin-left:10px"/>'
												+ '</div></div>'
												+ '</div>'
												// data-bind upload
												+ '<div class="x-attachment-cell"><div class="x-attachment-item x-item-upload"/></div>'
												+ '<div class="x-attachment-cell"><div class="x-attachment-item x-item-remove"/></div>'
												//x-attachment-toolbar
//												+ '<div class="x-attachment-toolbar">'
//												+ '<div class="x-item-name"><a class="btn btn-link" /><span class="btn btn-link"/></div>'   
//												+ '<div class="x-item-edit"><a class="btn btn-link">编辑</a></div>'  
//												+ '<div class="x-item-download"><a class="btn btn-link" >历史</a></div>'  
//												+ '<div class="x-item-download"><a class="btn btn-link">下载</a></div>'
//												+ '<div class="x-item-delete"><a class="btn btn-link">删除</a></div>'
//												+ '</div>'
												+ '<div style="clear:both;"/>'
												+ '</div></div>');
					}
				});
