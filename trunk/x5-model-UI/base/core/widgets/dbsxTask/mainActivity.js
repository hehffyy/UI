var mainActivity = {};

mainActivity.model1Load = function(event){
	/*
 //-------------------数据--------------
 var series_data = [
                {value:310, name:'新增案卷'},
                {value:234, name:'已办案卷'},
                {value:135, name:'在办案卷'},
                {value:1548, name:'办文总数'}
            ];
  //-----------------处理逻辑------------------
  var data = [];
  var index = 0;
  for(index , maxLength = series_data.length; index < maxLength; index++){
       data.push(series_data[index].name);
  };
  
 //-------------------配置--------------
 var option = {
	tooltip : {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        orient : 'vertical',
        x : '30',
        y : 'center',
        textStyle : {color : 'auto'},
        data:data
    },
    calculable : true,
    series : [
        {
            type:'pie',
            radius : '80%',
            center: ['60%', '50%'],
            data:series_data
        }
    ]
  }
  
  echarts.init(document.getElementById('pieChart'),theme).setOption(option);
  */
	 //-------------------数据--------------
	  var json = [{
	      "name":"未阅件",
	      "count":"8",
	      "icon":"myIcon-wy",
	      "url":"/UI/GZMOI/official/process/receiveDoc/businessDocActivity.w"
	  },{
	      "name":"未阅件",
	      "count":"8",
	      "icon":"myIcon-wy",
	      "url":"/UI/GZMOI/official/process/receiveDoc/businessDocActivity.w"
	  },{
	      "name":"未阅件",
	      "count":"8",
	      "icon":"myIcon-wy",
	      "url":"/UI/GZMOI/official/process/receiveDoc/businessDocActivity.w"
	  },{
	      "name":"未阅件",
	      "count":"8",
	      "icon":"myIcon-wy",
	      "url":"/UI/GZMOI/official/process/receiveDoc/businessDocActivity.w"
	  },{
	      "name":"未阅件",
	      "count":"8",
	      "icon":"myIcon-wy",
	      "url":"/UI/GZMOI/official/process/receiveDoc/businessDocActivity.w"
	  },{
	      "name":"未阅件",
	      "count":"8",
	      "icon":"myIcon-wy",
	      "url":"/UI/GZMOI/official/process/receiveDoc/businessDocActivity.w"
	  }];
	  
	   //-------------------视图--------------
	  var liTempalte ='<li><a href="#" title="${name}" data-url="${url}" class="${icon}"><span>${count}</span>${name}</a></li>';
	   //-------------------执行逻辑--------------
	   var $ul = $("<ul></ul>");
	   $.template('template', liTempalte);
	   $.tmpl('template', json).appendTo($ul);
	   
	   $('a',$ul[0]).live('click', function() {
	       var _url =  $(this).attr("data-url"),	
	       title =  $(this).attr("title");
	       justep.Portal.openWindow(title, _url, false, null);
	    });
	   
	   $(".pro-item").append($ul);
};
