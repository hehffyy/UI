 //-------------------开始加载待办事项....--------------
;(function(exports, justep){
	exports.initWidget = function(data){
		//-----------------处理逻辑------------------
		  var _data = [];
		  var index = 0;
		  for(index , maxLength = data.length; index < maxLength; index++){
			  _data.push(data[index].name);
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
		        data:_data
		    },
		    calculable : true,
		    series : [
		        {
		            type:'pie',
		            radius : '80%',
		            center: ['60%', '50%'],
		            data:data
		        }
		    ]
		  };
		  
		  echarts.init($('#ajtb-box')[0],exports.theme).setOption(option);
	};
	 
}(window, justep));