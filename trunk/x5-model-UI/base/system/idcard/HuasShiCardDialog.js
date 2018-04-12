var HuasShiCardDialog = {};

HuasShiCardDialog.modelXBLLoaded = function(event) {
	$('<OBJECT id="IDCard" height=0 width=0  TYPE="application/x-itst-activex"  CLSID="{10946843-7507-44FE-ACE8-2B3483D179B7}"></OBJECT>')
			.appendTo($("#view4"));
};

HuasShiCardDialog.btnReadClick = function(event) {
	this.readCard();
};

HuasShiCardDialog.readCard = function() {
	var IDCard = document.getElementById("IDCard");
	var strReadResult = IDCard.ReadCard();
	if (strReadResult == "0") {
		$("#lblName").text(IDCard.Name);
		$("#lblSex").text(IDCard.Sex);
		$("#lblMz").text(IDCard.Nation);
		$("#lblBorn").text(IDCard.Born);
		$("#lblAddr").text(IDCard.Address);
		$("#lblCardNo").text(IDCard.CardNo);
		$("#lblDate").text(IDCard.EffectedDate + "至" + IDCard.ExpiredDate);
		document.all['PhotoDisplay'].src = 'data:image/jpeg;base64,'
				+ IDCard.Picture;
	} else {
		$("#lblName").text(IDCard.Name);
		$("#lblSex").text(IDCard.Sex);
		$("#lblMz").text(IDCard.Nation);
		$("#lblBorn").text(IDCard.Born);
		$("#lblAddr").text(IDCard.Address);
		$("#lblCardNo").text(IDCard.CardNo);
		$("#lblDate").text(IDCard.EffectedDate + "至" + IDCard.ExpiredDate);
		document.all['PhotoDisplay'].src = 'data:image/jpeg;base64,'
				+ IDCard.Picture;
		alert(strReadResult);
	}
};

HuasShiCardDialog.modelLoad = function(event){
debugger;
   this.readCard();	
};

HuasShiCardDialog.sureBtnClick = function(event){
var psnKind = 0;
	if($("#ckFr")[0].checked)
		psnKind=1;
	else if ($("#ckDlr")[0].checked)
		psnKind =2;
	var data = {
		name : $("#lblName").text(),
		sex :  $("#lblSex").text(),
		nation : $("#lblMz").text(),
		address : $("#lblAddr").text(),
		cardNo : $("#lblCardNo").text(),
		psnKind: psnKind
	};
	justep.xbl("sysReceiver").windowEnsure(data);	
};



HuasShiCardDialog.cancelBtnClick = function(event){
justep.xbl("sysReceiver").windowCancel();	
};
