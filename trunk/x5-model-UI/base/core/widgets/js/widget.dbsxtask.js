 //-------------------开始加载待办事项....--------------
;(function(exports, justep){
	 //-------------------数据--------------
	exports.initWidget = function(data){
	   //-------------------视图--------------
	   var liTempalte ='<li><a href="#" title="${name}" data-url="${url}" class="${icon}"><span>${count}</span>${name}</a></li>';
	   //-------------------执行逻辑--------------
	   var $ul = $("<ul></ul>");
	   $.template('template', liTempalte);
	   $.tmpl('template', data).appendTo($ul);
	   
	   $('a',$ul[0]).live('click', function() {
	       var _url =  $(this).attr("data-url"),	
	       title =  $(this).attr("title");
	       justep.Portal.openWindow('案卷中心', _url, false, null);
	    });
	   
	   $(".pro-item").append($ul);
	};
	 
}(window, justep));