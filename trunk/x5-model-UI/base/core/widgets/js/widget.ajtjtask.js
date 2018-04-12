 //-------------------开始加载待办事项....--------------
;(function(exports, justep){
	exports.initWidget = function(data){
		   //-------------------视图--------------
		  var liTempalte =
		           '<li class="${icon}">'+
		              '<div ><a href="#" title ="${name}" data-url="${url}"></a></div>'+
		              '<div class="sjlb_wz">'+
		                '<span class="an-font">${count}件</span>'+
		                '<span>${name}</span>'+
		              '</div>'+
		            '</li>';
		   //-------------------执行逻辑--------------
		   var $ul = $("<ul class='sjlb'></ul>");
		   $.template('template', liTempalte);
		   
		   $.tmpl('template', data).appendTo($ul);
		   
		   // 添加事件监听
		   $('a',$ul[0]).live('click', function() {
		       var _url =  $(this).attr("data-url"),
		       title =  $(this).attr("title");
		       justep.Portal.openWindow('案卷中心', _url, false, null,justep.Context.getCurrentPersonID());
				 
		    });
		   
		   $("#ajtj-box").append($ul);
	};
	 
}(window, justep));