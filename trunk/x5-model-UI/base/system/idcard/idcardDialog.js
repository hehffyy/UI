var idcardDialog = {};
// 身份证阅读器类别 0 精伦,
var _cCardIEItems = [ "10946843-7507-44FE-ACE8-2B3483D179B7" ];
var _typeIndex = justep.Request.URLParams["type"];
if (_typeIndex == null)
	_typeIndex = 0;

idcardDialog.modelLoad = function(event) {
	if (!justep.Browser.IE)
		IDCard = document.getElementById("IDCard");
	this.readCard();
};

idcardDialog.btnReadClick = function(event) {
	try{
		this.readCard();
	}catch(err){
		$("#lblError").text("未安装驱动，无法使用！");
	}
};

idcardDialog.readCard = function() {
	var ret;
	if (justep.Browser.IE) {
		ret = IDCard.ReadCard();
		if (ret == "0") {
			this.setInfo();
			return;
		} else {
			alert("读卡错误,错误原因:" + ret);
		}
	}
	// chrome
	else {
		if(IDCard.setPortNum==null)
			 throw "未安装驱动，无法使用！";
		var port = IDCard.setPortNum(0); // changed args
		if (port == 0) {
			alert("端口初始化失败！");
			return;
		}

		// 使用重复读卡功能
		IDCard.Flag = 0;
		// obj.BaudRate=115200;
		// 设置照片保存路径，默认路径为系统临时目录, 照片文件名：photo.bmp, photo.jpg。
		// 读卡
		ret = IDCard.IDCardOn(); // 0-换了身份证 1-当前身份证仍在
		if (ret == 1) // 0-换了身份证 1-当前身份证仍在
		{
			//alert("当前身份证已读");
			//this.setInfo();
			//return;
		}

		// if(ret == 0) //0-换了身份证 1-当前身份证仍在
		// {
		ret = IDCard.ReadCard();
		// 获取各项信息
		if (ret == 0x90) {
			this.setInfo();
		}
	}
};

idcardDialog.setInfo = function() {
	if (justep.Browser.IE) {
		$("#lblName").text(IDCard.Name);
		if (IDCard.Sex == "1")
			$("#lblSex").text('男');
		else
			$("#lblSex").text('女');
		$("#lblMz").text(IDCard.Nation);
		$("#lblBorn").text(IDCard.Born);
		$("#lblAddr").text(IDCard.Address);
		$("#lblCardNo").text(IDCard.CardNo);
		$("#lblDate").text(IDCard.EffectedDate + "至" + IDCard.ExpiredDate);
		document.all['PhotoDisplay'].src = 'data:image/jpeg;base64,'
				+ IDCard.Picture;
	} else {
		$("#lblName").text(IDCard.NameL());
		$("#lblSex").text(IDCard.SexL());
		$("#lblMz").text(IDCard.NationL());
		$("#lblBorn").text(IDCard.BornL());
		$("#lblAddr").text(IDCard.Address());
		$("#lblCardNo").text(IDCard.CardNo());
		$("#lblDate").text(IDCard.ActivityLFrom + "至" + IDCard.ActivityLTo);
		$("#base64Image").value =IDCard.GetImage();

	}
};
idcardDialog.sureBtnClick = function(event) {
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

idcardDialog.cancelBtnClick = function(event) {
	justep.xbl("sysReceiver").windowCancel();
};

idcardDialog.modelXBLLoaded = function(event) {
debugger;
	if (justep.Browser.IE) {
		$("#divPhoto").hide();
		document.write('<OBJECT id=IDCard height=0 width=0 classid=clsid:'
				+ _cCardIEItems[_typeIndex] + ' name=IDCard></OBJECT>');
	} else {
		$("#PhotoDisplay").hide();
		$(
				'<embed id="IDCard" type="application/mozilla-npruntime-scriptable-plugin" width="100%" height="100%" />')
				.appendTo($("#divPhoto"));
	}
};
