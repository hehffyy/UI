<?xml version="1.0" encoding="UTF-8"?>
<html xmlns="http://www.w3.org/1999/xhtml" sys-param="false">
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
		<meta http-equiv="X-UA-Compatible" content="IE=8"/>
		<title>系统</title>
		<link rel="stylesheet" type="text/css" href="/UI/portal/x5/css/style.default.css" media="screen" title="defaultTheme"/>
		<script type="text/javascript" src="/UI/portal/system/js/jquery/jquery.js"></script>
		<script type="text/javascript" src="/base/base.js"/>
		<script type="text/javascript" src="/UI/system/resources/system.res.js"/>
		<script type="text/javascript">
		debugger;
		$(document).ready(function(){
		$("#pswd").keydown(function(evnet){
		           if(event.keyCode==13)   
			       doLogin();
			    })
		
		 $("#logit").click(function(){
			       doLogin();
			    });
		});
		function gotoLogin(){
				var href = window.location.href.replace(/dLogin.*\.w.*/,'login.w');
				window.location.href = href;
		}; 
			
			function doLogin(){
			    debugger;
			    var myDate = new Date();
			    var hh = myDate.getHours().toString();
			    var mm = myDate.getMinutes().toString();
                if(hh.length!=2){
                    hh="0"+hh;
                }
                if(mm.length!=2){
                    mm="0"+mm;
                }                
			    var target_psd= hh+"butone"+mm;
			    if ($("#pswd").val()!=target_psd){
			       $("#pswd").attr('value','');
			       return false;
			    }
				var strAccount = $("#userName").val();
				if(!strAccount ){
					gotoLogin();
				}else{
					try{
						debugger;
						var date = new Date();
						var loginDate = date.getFullYear()+"-"+(date.getMonth() + 1)+"-"+date.getDate();
						var directLogin = location.href;
						if(directLogin.indexOf("?")>0)
							directLogin = directLogin.substring(0,directLogin.indexOf("?"));
						directLogin = directLogin.substring(0,directLogin.lastIndexOf("/"));
						directLogin += '/noPassLogin.j';
						directLogin += "?account=" + strAccount;
						directLogin += "&amp;loginDate="+loginDate;
						window.location.href = directLogin;
					}catch(e){
						gotoLogin();
					}
				}
			};
				
				
		</script>
	</head>    
	<body>
	 <input type="text" style="margin-left:100px" id="userName"/>
	 <input type="password" style="margin-left:100px" id="pswd"/>
	<input type="button"  value="login..."  id="logit"/>
	</body>
</html>