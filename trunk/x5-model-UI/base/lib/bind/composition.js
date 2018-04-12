define(
		"base/lib/bind/composition",
		[ "require", "jquery", "./error" ],
		function(require, $, _Error) {
			// --------------composition begin
			var composition = {
				insufficientInfoMessage : 'Insufficient Information to Bind',
				unexpectedViewMessage : 'Unexpected View Type',

				_bind : function(element, modelToBind, option) {
					if (!element || !modelToBind) {
						composition.error(option, new Error(
								this.insufficientInfoMessage));
					}
					if (!element.getAttribute) {
						composition.error(option, new Error(
								this.unexpectedViewMessage));
					}
					var viewId = element.getAttribute('id');
					try {
						butone.Bind.applyBindings(modelToBind, element);
					} catch (e) {
						e.message = e.message + ';\nView: ' + viewId;
						composition.error(option, e);
					}
				},

				bindAndShow : function(element, modelToBind, option) {
					var self = this;
					try {
						var bodys = $(element).parents("body");
						if ((bodys.length > 0) && (bodys[0] === document.body)) {
						} else {
							return;
						}
						var currentModel = butone.Bind.dataFor(element);

						if (currentModel != modelToBind) {
							self._bind(element, modelToBind, option);
						}
						modelToBind.attached();
					} catch (err) {
						composition.error(option, err);
					}
				},

				error : function(option, err) {
					if (console && console.log && err) {
						console.log(err.stack || "");
					}
					var cancel = false;
					if (option && option.loadError)
						cancel = option.loadError(err);
					if (!cancel)
						throw err;
				}
			};
			// --------------composition end
			butone.Composition = composition;
			return composition;
		});
