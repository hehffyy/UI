!function() {
	// Cloud Float...
	var $main = $cloud = mainwidth = null;
	var offset1 = 800;
	var offset2 = 150;

	var offsetbg = 0;

	$(document).ready(function() {

		$main = $("#mainBody");
		$body = $("body");
		$cloud1 = $("#cloud1").attr("disabled", true);
		$cloud2 = $("#cloud2").attr("disabled", true);
		mainwidth = $main.outerWidth();
		function flutter() {
			if (offset1 >= mainwidth) {
				offset1 = -580;
			}

			if (offset2 >= mainwidth) {
				offset2 = -580;
			}

			offset1 += 1.1;
			offset2 += 1;
			$cloud1.css("background-position", offset1 + "px 250px");

			$cloud2.css("background-position", offset2 + "px 50px");
		}
		// 飘动
		if ($cloud1.length > 0 && $cloud2.length > 0) {
			// setInterval(flutter, 70);
		}
	});
}();