!function() {
	function initCloud() {
		var $main = $("#mainBody"), $cloud1 = $("#cloud1"), $cloud2 = $("#cloud2");
		var mainwidth = $main.outerWidth();
		var offset1 = 800;
		var offset2 = 150;

		// / 飘动
		setInterval(function flutter() {
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
		}, 70);
	}
	$(document).ready(initCloud);

}();