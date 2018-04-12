

/* Open New Window */
function openBrWindow(url,w,h,Brresize,Brscroll,windowName)

{

       var width = w;
       var height = h;
       var name = windowName;
       var toolbar = 'no';
       var location = 'no';
       var status = 'no';       
       var menubar = 'no';
       var scrollbars = Brscroll;
       var resizable = Brresize;
       var left = parseInt((screen.availWidth/2) - (width/2));
       var top = parseInt((screen.availHeight/2) - (height/2));
       var windowFeatures = "width=" + width + ",height=" + height + ",left="+

         				left + ",top=" + top + ",screenX=" + left + ",screenY=" + 
						
               			top + ",toolbar=" + toolbar + ",location=" + location + ",status=" + 

               			status + ",menubar=" + menubar + ",scrollbars=" + scrollbars + ",resizable=" + resizable;


      return window.open(url,name,windowFeatures);
}

/* Left frame items link */
function gourl(obj)
{
	parent.document.all.item("rightframe").src=obj;
	
}

/* Button over style */
function buttonover(obj)
{
	obj.className='buttonTable_active';
	
}

/* Button out style */
function buttonout(obj)
{
	obj.className='buttonTable';
	
}

/* Leftframe List Show and Hide */
function shContent(){
	var a = shContent.arguments;
			
	if (document.all.item(a[0])==null){
		
		return;
	}
	if(document.all.item(a[0]).style.display == "none")
	{
		document.all.item(a[0]).style.display = "block";
		document.all.item(a[0]+"img").src = "/platform/styles/default/images/close.gif";
	}
	else
	{
		document.all.item(a[0]).style.display = "none";
		document.all.item(a[0]+"img").src = "/platform/styles/default/images/open.gif";
	}
		
	
}

/* Leftframe List Show and Hide */
function shContent2(){
	var a = shContent2.arguments;
			
	if (document.all.item(a[0])==null){
		
		return;
	}
	if(document.all.item(a[0]).style.display == "none")
	{
		document.all.item(a[0]).style.display = "block";
		document.all.item(a[0]+"img").src = "/platform/styles/default/images/icon8left.gif";
	}
	else
	{
		document.all.item(a[0]).style.display = "none";
		document.all.item(a[0]+"img").src = "/platform/styles/default/images/icon8right.gif";
	}
		
	
}

/* action when left and middle bar is clicked*/
function onLMClick(item)
{
	if (item == 'l')
	{
		if (window.top.MainFrame.leftFrame.document.all.item("lefttree").style.display == "none")
		{
			if (window.top.MainFrame.middleFrame.document.all.item("lefttree2").style.display == "none")
			{
				parent.document.all.item("framemain").cols="170,8,*";
			}
			else
			{
				parent.document.all.item("framemain").cols="170,150,*";
			}
		}
		else
		{
			if (window.top.MainFrame.middleFrame.document.all.item("lefttree2").style.display == "none")
			{
				parent.document.all.item("framemain").cols="8,8,*";
			}
			else
			{
				parent.document.all.item("framemain").cols="8,150,*";
			}
		}
	}
	else
	{
		if (window.top.MainFrame.middleFrame.document.all.item("lefttree2").style.display == "none")
		{
			if (window.top.MainFrame.leftFrame.document.all.item("lefttree").style.display == "none")
			{
				parent.document.all.item("framemain").cols="8,150,*";
			}
			else
			{
				parent.document.all.item("framemain").cols="170,150,*";
			}
		}
		else
		{
			if (window.top.MainFrame.leftFrame.document.all.item("lefttree").style.display == "none")
			{
				parent.document.all.item("framemain").cols="8,8,*";
			}
			else
			{
				parent.document.all.item("framemain").cols="170,8,*";
			}
		}
	}
	
}


/* action when banner navigate button is clicked*/
var onNavClickid = 0;
 
function onNavClick()
{
	if (window.top.MainFrame.leftFrame.document.all.item("lefttree").style.display == "none")
	{
		if (window.top.MainFrame.middleFrame.document.all.item("lefttree2").style.display == "none")
		{
			parent.document.all.item("framemain").cols="8,8,*";
			onNavClick = 0;
		}
		else
		{
			parent.document.all.item("framemain").cols="8,170,*";
			onNavClick = 1;
		}
	}
	else
	{
		if (window.top.MainFrame.middleFrame.document.all.item("lefttree2").style.display == "none")
		{
			parent.document.all.item("framemain").cols="170,8,*";
			onNavClick = 2;
		}
		else
		{
			parent.document.all.item("framemain").cols="170,170,*";
			onNavClick = 3;
		}
	}
	
}

/* Leftframe Hide */
function toleft()
{
	window.top.MainFrame.document.all.item("framemain").cols="0,*";
}

var sourceid = 0;

var sourceid1 = 0;

function Shideleft()
{
if (sourceid == 1) {
	
	
	window.top.MainFrame.leftFrame.document.all.item("lefttree").style.display="none";
	window.top.MainFrame.leftFrame.document.all.item("middleimg").src = "gstyle/images/icon8left.gif";
	sourceid = 0;
	if (window.top.MainFrame.middleFrame.document.all.item("lefttree2").style.display == "none")
	{	window.top.MainFrame.document.all.item("framemain").cols="8,8,*";
		
		}
	else
	{	window.top.MainFrame.document.all.item("framemain").cols="8,150,*";
		}
	
}
else {
	
	
	window.top.MainFrame.leftFrame.document.all.item("lefttree").style.display="block";
	window.top.MainFrame.leftFrame.document.all.item("middleimg").src = "gstyle/images/icon8right.gif";
	sourceid = 1;
	if (window.top.MainFrame.middleFrame.document.all.item("lefttree2").style.display == "none")
	{	window.top.MainFrame.document.all.item("framemain").cols="170,8,*";
		
		}
	else
	{	window.top.MainFrame.document.all.item("framemain").cols="170,150,*";
		}
	
}

}


function  middleimgover(obj)
{
	if (sourceid == 1) {
		obj.src = "/platform/styles/default/images/icon8left_action.gif";
	}else
	{
		obj.src = "/platform/styles/default/images/icon8right_action.gif";
	}
}
function  middleimgout(obj)
{
	if (sourceid == 1) {
		obj.src = "/platform/styles/default/images/icon8left.gif";
	}else
	{
		obj.src = "/platform/styles/default/images/icon8right.gif";
	}
}
function toleft()
{
	window.top.MainFrame.document.all.item("framemain").cols="0,*";
}


function Shidemiddle()
{
if (sourceid1 == 1) {
	
	
	
	parent.middleFrame.document.all.item("lefttree2").style.display="none";
	parent.middleFrame.document.all.item("middleimg").src = "/platform/styles/default/images/icon8left.gif";
	sourceid1 = 0;
	if (window.top.MainFrame.leftFrame.document.all.item("lefttree").style.display == "none")
	{	parent.document.all.item("framemain").cols="8,8,*";
		
		}
	else
	{	parent.document.all.item("framemain").cols="170,8,*";
		}
	
}
else {
	
	
	parent.middleFrame.document.all.item("lefttree2").style.display="block";
	parent.middleFrame.document.all.item("middleimg").src = "/platform/styles/default/images/icon8right.gif";
	sourceid1 = 1;
	if (window.top.MainFrame.leftFrame.document.all.item("lefttree").style.display == "none")
	{	parent.document.all.item("framemain").cols="8,150,*";}
	else
	{	parent.document.all.item("framemain").cols="170,150,*";}
	
}
}

function  middleimgover1(obj)
{
	if (sourceid1 == 1) {
		obj.src = "/platform/styles/default/images/icon8left_action.gif";
	}else
	{
		obj.src = "/platform/styles/default/images/icon8right_action.gif";
	}
}
function  middleimgout1(obj)
{
	if (sourceid1 == 1) {
		obj.src = "/platform/styles/default/images/icon8left.gif";
	}else
	{
		obj.src = "/platform/styles/default/images/icon8right.gif";
	}
}
/* Leftframe Show */
function toright()
{
	window.top.MainFrame.document.all.item("framemain").cols="190,*";
}

/* Topbanner Hide */
function totop()
{
	window.top.topFrame.document.all.item("banner").style.display="none";
	window.top.document.all.item("frametop").rows="31,*";
}
/* Topbanner Show */
function tobottom()
{
	window.top.topFrame.document.all.item("banner").style.display="block";	
	window.top.document.all.item("frametop").rows="116,*";
}
var oldcols1;
/* banner frame items link */
function goNavurl(lefturl,righturl)
{
		
		var oCols = new Array();
		oCols = window.top.MainFrame.document.all.item("framemain").cols.split(',');
		if (oCols[1] != 0)
		{
			oldcols1 = oCols[1];		
			window.top.MainFrame.document.all.item("leftframe").src=lefturl;
			window.top.MainFrame.document.all.item("rightframe").src=righturl;
			window.top.MainFrame.document.all.item("framemain").cols=oCols[0] + "," + oldcols1 + "," + oCols[2];
			
			
			
				
		}
		else 
		{
			window.top.MainFrame.document.all.item("leftframe").src=lefturl;
			window.top.MainFrame.document.all.item("rightframe").src=righturl;			
			window.top.MainFrame.document.all.item("framemain").cols=oCols[0] + "," + oldcols1 + "," + oCols[2];
			
		}
			
		
	
}


/* ??????? */
function gotoLocationPage(obj){
	document.location.href=obj;
}

/* Refresh Openner */
function reloadopener()
{
	if (window.opener != null)
	{
		window.opener.location.reload(true);
	}
}
var oldtID=1;
function swapTab(tID){

var curTab = "tabLabel" + tID;
var oldTab = "tabLabel" + oldtID;
var curTd = "tabLabeltd" + tID;
var oldTd = "tabLabeltd" + oldtID;
var curDiv = "swaptab" + tID;
var oldDiv = "swaptab" + oldtID;
//alert(oldTab);
	if (tID==oldtID)
	return;
	else
    {
        
	document.all.item(oldTab).className = "ganb_tabLabelunActive";
	
	document.all.item(curTab).className = "ganb_tabLabelActive"
	
	document.all.item(oldTd).className = "ganb_tabTdSpace";
	
	document.all.item(curTd).className = ""
	
	document.all.item(oldDiv).className = "ganb_tabhide";	
		
	document.all.item(curDiv).className = "ganb_tabshow";	
	
	oldtID = tID;
    }
}

var selectedTabItem = null;
function OnTabItemClick(objDiv, url)
{
	objDiv.className = "TabItemContainerAction";
	if (selectedTabItem!=null) selectedTabItem.className = "TabItemContainer";
	selectedTabItem = objDiv;
	document.all("DetailsFrame").src = url;
}




//日期设置
function  setDateTime(ctrID,outFormat)
{
	  var url,ops,retValue,dWidth,dHeight,time,date;
	  if(outFormat =="d"){ //??????
			dWidth=205;dHeight=300;
			url = "/common/pubpage/calender.jsp?outFormat="+outFormat;
		
	  }else if(outFormat == "t"){ 	//?????
			url = "/common/pubpage/calender.jsp?outFormat="+outFormat;  
			dWidth=220;dHeight=150;
		
	  }else if(outFormat == "m") { //?????
	  		url = "/common/pubpage/calender.jsp?outFormat="+outFormat;  
			dWidth=220;dHeight=120;
	  }else{ //???????
			dWidth=205;dHeight=330;
			url = "/common/pubpage/calender.jsp?outFormat="+outFormat;
	  } 
	  
	  ops = "dialogHeight:"+dHeight+"px;dialogWidth:"+dWidth+"px;center:yes;resizable:no;status:no;scrollbars=no;";
	  showDialog(url,"setDateTime"+ctrID,ops,DialogAction,ctrID);
}

//日期返回
function DialogAction(objID)
{
	document.getElementsByName(objID)[0].value = getDialogReturnValue();
	if(document.getElementsByName(objID)[0].value=="undefined")
		document.getElementsByName(objID)[0].value = "";
}

function Save(bForm){
	if(validater(bForm)){
		document.forms[0].submit();
	} 
}

//javascript map------------------------------begin-------------------------------------//

var parentMap = new classMap();
var parentSelectMap = new classMap();
var map = parent.window.parentMap;
var selectMap = parent.window.parentSelectMap;

function struct(key, value){

  this.key = key;
  this.value = value;

}

function put(key, value){
  
  for (var i = 0; i < this.map.length; i++)
  {
	if ( this.map[i].key === key )
	{
	  this.map[i].value = value;
	  return;
	}
  }
  
  this.map[this.map.length] = new struct(key, value);

}

function get(key)
{
  for (var i = 0; i < this.map.length; i++)
  {
	if ( this.map[i].key === key )
	{
	  return this.map[i].value;
	}
  }
  
  return null;
}

function removeKey(key)
{
  var v;
  for (var i = 0; i < this.map.length; i++)
  {
	v = this.map.pop();
	if ( v.key === key )
	  continue;
	this.map.unshift(v);
  }
}

function getCount(){
  return this.map.length;
}

function isMapEmpty(){
  return this.map.length <= 0;
}

function mapToString(){

	var stringMap = "";
	for(var i = 0; i < this.map.length; i++){
		stringMap = stringMap + "'"+ this.map[i].value + "'" + ",";
	}
	if(stringMap != ""){
		return stringMap.substring(0,stringMap.length-1)
	} else {
		return "";		
	}
}

function clear(){
	this.map = new Array();
}

function classMap() {

  this.map = new Array();
  
  this.get = get;
  this.put = put;
  this.removeKey = removeKey;
  this.getCount = getCount;
  this.isMapEmpty = isMapEmpty;
  this.mapToString = mapToString;
  this.clear = clear;
}

function setCheckValue(checkId,checkValue){
	if(document.getElementById(checkId).checked == true){
		selectMap.put(checkId,checkValue);
	} else {
		selectMap.removeKey(checkId);
	}
}



function editChildInfo(url,msg){

	if (parentSelectMap.getCount() == 0) {
		alert("请选择要进行"+msg+"的记录！");
		return false;
	}
	if (parentSelectMap.getCount() > 1) {
		alert("一次只能选择一条记录进行"+msg+"！");
		return false;
	}
	var retKey = parentSelectMap.mapToString();
	retKey = retKey.substring(1,retKey.length-1);	
	openBrWindow(url+'&fkey='+retKey,'800','420','yes','yes','');
}
//-----------------------------end-----------------------------------------------//



