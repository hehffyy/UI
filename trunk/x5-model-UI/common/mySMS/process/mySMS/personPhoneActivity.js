var personPhoneActivity = {};

personPhoneActivity.trigger2Click = function(event){
	justep.xbl("windowReceiver").windowEnsure(justep.xbl("data"));
};

personPhoneActivity.trigger1Click = function(event){
	justep.xbl("windowReceiver").windowCancel();
};
