var manageActivity = {};

manageActivity.newDirMIClick = function(event) {
	justep.xbl("folderDlg").open({
		opr : 'new'
	});
};

manageActivity.folderDlgReceive = function(event) {
	var data = event.data;
	var ds = justep.xbl("docFolder");
	var id = ds.getCurrentID();
	var parentid = ds.getValue("fParentID");
	if (data.opr == "new") {
		ds.newData({
			parentID : parentid
		});
		ds.setValue("fParentID", parentid);
	} else {
		ds.newData({
			parentID : id
		});
		ds.setValue("fParentID", id);
	}
	ds.setValue("fFolderName", data.name);
	ds.saveData();
};

manageActivity.newCldDirMIClick = function(event) {
	justep.xbl("folderDlg").open({
		opr : 'newCld'
	});
};

function setFileReadOnly() {
	return true;
}
manageActivity.setAuth = function(rowid, bCurFolder) {
	var control = justep.xbl("authControl");
	if (control.getCount() == 0)
		control.newData();
	var canEdit = false;
	var authDs = justep.xbl("docAuth");
	var canEdit = justep.Context.getCurrentPersonName() == 'system'
			|| authDs.find([ "fFolderID", "fLimitKind" ], [ rowid, "编辑" ],
					true, false, false).length > 0;
	var canAddFolder = justep.Context.getCurrentPersonName() == 'system'
			|| !bCurFolder;
	control.setValue("dirAuth", 0);

	if (canEdit) {
		control.setValue("fileAuth", 1);
		if (canAddFolder) {
			$("[name='newDirMI']").parent().show();
			$("[name='delDirMI']").parent().show();
			$("[name='authMI']").parent().show();
			control.setValue("dirAuth", 1);
		} else {
			$("[name='newDirMI']").parent().hide();
			$("[name='delDirMI']").parent().hide();
			$("[name='authMI']").parent().hide();
			control.setValue("dirAuth", 0);
		}
		$("[name='newCldDirMI']").parent().show();
	} else {
		control.setValue("fileAuth", 0);
		$("[name='newDirMI']").parent().hide();
		$("[name='newCldDirMI']").parent().hide();
		$("[name='delDirMI']").parent().hide();
		$("[name='authMI']").parent().hide();
	}
	return canEdit;
};
manageActivity.docFolderIndexChanged = function(event) {
	var ds = justep.xbl("docFolder");
	var rowid = event.rowID;
	if (rowid == null)
		rowid = ds.getCurrentID();
	if (manageActivity.setAuth(rowid, true))
		return;
	while (true) {
		var parentid = ds.getValue("fParentID", rowid);
		rowid = parentid;
		if (parentid) {
			if (manageActivity.setAuth(rowid))
				return;
		} else
			break;
	}
};

manageActivity.docFolderAfterRefresh = function(event) {
	manageActivity.docFolderIndexChanged(event);
};

manageActivity.authMIClick = function(event) {
	justep.xbl("authDlg").open({
		folderID : justep.xbl("docFolder").getCurrentID()
	});
};

manageActivity.delDirMIClick = function(event) {
	butone.Dialog.question("确认删除当前目录吗？", "", function(evt) {
		if (evt.status != "yes")
			return;
		butoneEx.Common.callAction({
			folderID : justep.xbl("docFolder").getCurrentID()
		}, "deleteFolder");
		justep.xbl("docFolder").refreshData();
	});
};

manageActivity.btnDelFileClick = function(event) {
	butone.Dialog.question("确认删除当前文件吗？", "", function(evt) {
		if (evt.status != "yes")
			return;
		butoneEx.Common.callAction({
			fileID : justep.xbl("docFile").getCurrentID()
		}, "deleteFile");
		justep.xbl("docFile").refreshData();
	});
};
