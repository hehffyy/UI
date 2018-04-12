var XzxCardDialog = {};

XzxCardDialog.modelXBLLoaded = function(event) {
	$(
			'<OBJECT id="IDCard" height=0 width=0  TYPE="application/x-itst-activex"  CLSID="{46E4B248-8A41-45C5-B896-738ED44C1587}"></OBJECT>')
			.appendTo($("#view4"));
};

XzxCardDialog.btnReadClick = function(event) {
	this.readCard();
};

XzxCardDialog.readCard = function() {
	var IDCard = document.getElementById("IDCard");
	if (IDCard.ReadCardMsg == null) {
		var strHtmInstall = "<br><font color='#FF00FF'>控件未安装!点击这里<br><a href='"
				+justep.Request
				.convertURL(
						"/UI/common/otherPlugin/process/otherPlugin/install/ffactivex-setup-r39.exe",
						true)
				+"' target='_self'>执行安装[Active兼容插件]</a><br><a href='"
				+ justep.Request
						.convertURL(
								"/UI/common/otherPlugin/process/otherPlugin/install/setup_xzx.exe",
								true)
				+ "' target='_self'>执行安装[身份证插件]</a>,安装后请刷新页面或重新进入。</font>";
		var checkOcxDialog = new justep.Dialog("butoneCheckOcxDialog", "安装提示",
				true, null, 400, 150, null, null, function() {
					checkOcxDialog.setContentHTML(strHtmInstall);
				});
		checkOcxDialog.setMinmaxable(false);
		checkOcxDialog.setResizable(false);
		checkOcxDialog.open();
		return;
	}
	var str= IDCard.FindReader();
  	if (str <= 0 )
  	{
  		alert("没有找到读卡器");
  		return
  	}
	IDCard.SetPhotoType(2);
	var strReadResult = IDCard.ReadCardMsg();
	if (strReadResult == 0) {
		$("#lblName").text(IDCard.NameA);
		$("#lblSex").text(IDCard.Sex==1?'男':'女');
		$("#lblMz").text(IDCard.Nation=="01"?'汉族':'其他');
		$("#lblBorn").text(IDCard.Born);
		$("#lblAddr").text(IDCard.Address);
		$("#lblCardNo").text(IDCard.CardNo);
		$("#lblDate").text(IDCard.UserLifeB + "至" + IDCard.UserLifeE);
		document.all['PhotoDisplay'].src = 'data:image/jpeg;base64,'
				+ IDCard.Base64Photo;
	} else {
		alert("请检查设备连接是否正常");
	}
};

XzxCardDialog.modelLoad = function(event) {
	this.readCard();
};

XzxCardDialog.sureBtnClick = function(event) {
	var psnKind = 0;
	if ($("#ckFr")[0].checked)
		psnKind = 1;
	else if ($("#ckDlr")[0].checked)
		psnKind = 2;
	var data = {
		name : $("#lblName").text(),
		sex : $("#lblSex").text(),
		nation : $("#lblMz").text(),
		address : $("#lblAddr").text(),
		cardNo : $("#lblCardNo").text(),
		psnKind : psnKind
	};
	justep.xbl("sysReceiver").windowEnsure(data);
};

XzxCardDialog.cancelBtnClick = function(event) {
	justep.xbl("sysReceiver").windowCancel();
};
