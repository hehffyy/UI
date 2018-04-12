var uploadFile = {};

uploadFile.receiverReceive = function(event) {
	var data = event.data, $form = $("#uploadForm"), $hint = $("#waitHint");
	var fileInput = "<input id='inputFile' name='"
			+ data.inputFile
			+ "' type='file' style='width:100%;height:20px;vertical-align:middle;line-height:18px;'/>";
	$(fileInput).appendTo($form).bind(
			"change",
			function() {
				$form.hide();
				$hint.show();
				debugger;
				if (data.needFileNameParam && data.needFileNameParam == true) {
					var fileName = $("#inputFile").val();
					fileName = fileName.substr(fileName.lastIndexOf("\\") + 1,
							fileName.length);
					data.parameters["fileName"] = justep.Base64.encode(fileName);
				}
				$.ajaxFileUpload({
					url : data.uploadURL, // 用于文件上传的服务器端请求地址
					fileElementId : this.id, // 文件上传域的ID
					dataType : 'xml', // 返回值类型json、xml、html
					data : data.parameters,
					success : function(data, status) // 服务器成功响应处理函数
					{
						$hint.hide();
						$form.show();
						justep.xbl("receiver").windowEnsure(data);
					},
					error : function(data, status, e)// 服务器响应失败处理函数
					{
						$hint.hide();
						$form.show();
						new justep.System.showMessage().open({
							msg : e,
							img : 'error',
							title : '错误信息',
							type : 0
						});
						justep.xbl("receiver").windowCancel();
					}
				});
			});
};
