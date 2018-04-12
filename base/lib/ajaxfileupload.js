(function(jQuery) {
	function createUploadIframe(id, secureuri) {
		// create frame
		if (window.ActiveXObject) {
			var io = document.createElement('iframe');
			if (typeof secureuri == 'boolean') {
				io.src = 'javascript:false';
			} else if (typeof secureuri == 'string') {
				io.src = secureuri;
			}
		} else {
			var io = document.createElement('iframe');
		}
		io.style.position = 'absolute';
		io.style.top = '-1000px';
		io.style.left = '-1000px';
		io.id = id;
		io.name = id;
		return jQuery(io).appendTo($("body"));
	}

	function createUploadForm(action, fileElementId, options) {
		// create form
		var form = jQuery('<form  action="' + action
				+ '" method="POST" enctype="multipart/form-data"></form>');
		if (fileElementId) {
			var oldElement = jQuery('#' + fileElementId), newElement = oldElement
					.clone();
			oldElement.attr("id", "");
			newElement.attr("id", fileElementId);
			oldElement.before(newElement);
			oldElement.appendTo(form);
		}
		for ( var n in options) {
			form.append("<input name='" + n + "' type='hidden' value='"
					+ options[n] + "'/>");
		}
		// set attributes
		form.css('position', 'absolute');
		form.css('top', '-1200px');
		form.css('left', '-1200px');
		return form.appendTo($("body"));
	}

	function uploadHttpData(r, type) {
		var data = !type;
		data = type == "xml" || data ? r.responseXML : r.responseText;
		// ifthe type is "script", eval it in global context
		if (type == "script") {
			jQuery.globalEval(data);
		}

		// Get the JavaScript object, ifJSON is used.
		if (type == "json") {
			eval("data = " + data);
		}

		// evaluate scripts within html
		if (type == "html") {
			jQuery("<div>").html(data).evalScripts();
		}

		return data;
	}

	var obj = {
		ajaxFileUpload : function(s) {
			// TODO introduce global settings, allowing the client to
			// modify
			// them for all requests, not only timeout
			s = jQuery.extend({}, jQuery.ajaxSettings, s);
			var form = createUploadForm(s.url, s.fileElementId, s.data);
			var io = createUploadIframe("jqUpload_"
					+ (s.fileElementId || (new Date).getTime()), s.secureuri), ioFrame = io[0];

			if (s.global && !jQuery.active++) {
				// Watch for a new set of requests
				jQuery.event.trigger("ajaxStart");
			}
			var requestDone = false;
			// Create the request object
			var xml = {};
			if (s.global) {
				jQuery.event.trigger("ajaxSend", [ xml, s ]);
			}
			var uploadCallback = function(isTimeout) {
				// Wait for a response to come back

				try {
					if (ioFrame.contentWindow) {
						xml.responseText = ioFrame.contentWindow.document.body ? ioFrame.contentWindow.document.body.textContent
								: null;
						xml.responseXML = ioFrame.contentWindow.document.XMLDocument ? ioFrame.contentWindow.document.XMLDocument
								: ioFrame.contentWindow.document;

					} else if (ioFrame.contentDocument) {
						xml.responseText = ioFrame.contentDocument.document.body ? ioFrame.contentDocument.document.body.innerHTML
								: null;
						xml.responseXML = ioFrame.contentDocument.document.XMLDocument ? ioFrame.contentDocument.document.XMLDocument
								: ioFrame.contentDocument.document;
					}
				} catch (e) {
					jQuery.handleError(s, xml, null, e);
				}
				if (xml || isTimeout == "timeout") {
					requestDone = true;
					var status;
					try {
						status = isTimeout != "timeout" ? "success" : "error";
						// Make sure that the request was successful or
						// notmodified
						if (status != "error") {
							// process the data (runs the xml through
							// httpData regardless of callback)
							var data = uploadHttpData(xml, s.dataType);
							if (s.success) {
								// ifa local callback was specified,
								// fire it
								// and pass it the data
								s.success(data, status);
							}
							if (s.global) {
								// Fire the global callback
								jQuery.event.trigger("ajaxSuccess", [ xml, s ]);
							}
						} else {
							jQuery.handleError(s, xml, status);
						}

					} catch (e) {
						status = "error";
						jQuery.handleError(s, xml, status, e);
					}
					if (s.global) {
						// The request was completed
						jQuery.event.trigger("ajaxComplete", [ xml, s ]);
					}

					// Handle the global AJAX counter
					if (s.global && !--jQuery.active) {
						jQuery.event.trigger("ajaxStop");
					}

					if (s.complete) {
						s.complete(xml, status);
					}

					io.unbind();

					setTimeout(function() {
						try {
							io.remove();
							form.remove();
						} catch (e) {
							jQuery.handleError(s, xml, null, e);
						}

					}, 100);

					xml = null;

				}
			}
			// Timeout checker
			if (s.timeout > 0) {
				setTimeout(function() {
					if (!requestDone) {
						// Check to see ifthe request is still happening
						uploadCallback("timeout");
					}

				}, s.timeout);
			}
			if (window.attachEvent) {
				ioFrame.attachEvent('onload', uploadCallback);
			} else {
				ioFrame.addEventListener('load', uploadCallback, false);
			}
			try {
				form.attr('method', 'POST');
				form.attr('target', io.attr("name"));
				form.submit();
			} catch (e) {
				jQuery.handleError(s, xml, null, e);
			}

			return {
				abort : function() {
				}
			};

		}
	};

	jQuery.extend(obj);
})(jQuery);
