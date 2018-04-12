justep.design.calendar = function(config){ 
        this.regAttributes(["disabled","readonly"]);
        justep.design.calendar.superclass.constructor.call(this,config);
};

justep.extend(justep.design.calendar, justep.design.Component,{
         paintContent:function(xmlNode){  
        	this.createElement("<div  id='"+this.id+"'>" +
      "<table  border='1'  style='width:100%;height:15%'>" +
        "<tr align='center'>" +
			"<td    ><<</td>" +
			"<td    ><</td>" +
			"<td    >xxxx-xx-xx</td>" +
			"<td    >></td>" +
			"<td    >>></td>" +
			"<td    >今天</td>" +
			"<td    >农历:XX月XX日</td>" +
		"</tr>" +
	 "</table>" +
	 "<table  border='1'  style='width:100%;height:85%'>" +
		"<tr align='center'>" +
			"<td   >日</td>" +
			"<td   >一</td>" +
			"<td   >二</td>" +
			"<td   >三</td>" +
			"<td   >四</td>" +
			"<td   >五</td>" +
			"<td   >六</td>" +
		"</tr>" +
		"<tr align='center'>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" + 
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
		"</tr>" +
		"<tr align='center'>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" + 
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
		"</tr>" +
		"<tr align='center'>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" + 
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
		"</tr>" +
		"<tr align='center'>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" + 
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
		"</tr>" +
		"<tr align='center'>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" + 
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
		"</tr>" +
		"<tr align='center'>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" + 
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
			"<td   >&nbsp;</td>" +
		"</tr>" +			      		
      "</table>" +
    "</div>",xmlNode);
        }
});