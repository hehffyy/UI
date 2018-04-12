(function(jQuery) {
	var // Keep a UserAgent string for use with jQuery.browser
	userAgent = navigator.userAgent;

	function uaMatch(ua) {
		ua = ua.toLowerCase();

		var match = /(webkit)[ \/]([\w.]+)/.exec(ua)
				|| /(opera)(?:.*version)?[ \/]([\w.]+)/.exec(ua)
				|| /(msie) ([\w.]+)/.exec(ua) || !/compatible/.test(ua)
				&& /(mozilla)(?:.*? rv:([\w.]+))?/.exec(ua) || [];

		return {
			browser : match[1] || "",
			version : match[2] || "0"
		};
	}
	var browserMatch = uaMatch(navigator.userAgent);
	jQuery.browser = {};
	if (browserMatch.browser) {
		jQuery.browser[browserMatch.browser] = true;
		jQuery.browser.version = browserMatch.version;
	}

	// Deprecated, use jQuery.browser.webkit instead
	if (jQuery.browser.webkit) {
		jQuery.browser.safari = true;
	}

})(jQuery);