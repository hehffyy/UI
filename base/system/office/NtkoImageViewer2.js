var NtkoImageViewer2 = {};


NtkoImageViewer2.windowReceiver1Receive = function(event){
debugger;
  
var hihm = '<img class="xui-no-border xui-autofill" hspace="100%" id="image1" src="'+event.data.url+
'" style="width:100%;">';
$('body').css('height','auto');
$('body').html(hihm);

};
