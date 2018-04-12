
function openTask(sProcess, sActivity, sName, wUrl) {
	var openURL = wUrl + "?process=" + sProcess + "&activity=" + sActivity;
	justep.Portal.openWindow(sName, encodeURI(openURL));
}

function collapse(widgetId) {
	var contentEl = $('#'+widgetId+' .widget-content'); // 内容
	var collapseEl = $('#'+widgetId+' .collapse');
	collapseEl.toggleClass('down');
	contentEl.toggle();
}

function openAll(){
	var contentEl = $('.widget-content'); // 内容
	var collapseEl = $('.collapse');
	collapseEl.toggleClass('down');
	contentEl.toggle();
}