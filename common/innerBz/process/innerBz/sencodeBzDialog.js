var sencodeBzDialog = {};

sencodeBzDialog.cancelBtnClick = function(event){
	justep.xbl("receiver1").windowCancel();
};

sencodeBzDialog.sureBtnClick = function(event){
debugger;
	justep.xbl("receiver1").windowEnsure({
		"reason" : document.getElementById("textarea1").value
	});	
};
