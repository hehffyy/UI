var blankBizOperation = {};

blankBizOperation.modelModelConstruct = function(event) {
	var me = this;
	require([ "jquery" ], function($) {
		var promise = butone.Context.getBindModelPromise();
		!me.receiveDataDTD && (me.receiveDataDTD = $.Deferred());
		$.when(promise, me.receiveDataDTD).done(me._initBindModel.bind(me));
	});
};

blankBizOperation.windowReceiverReceive = function(event) {
	var me = this;
	require([ "jquery" ], function($) {
		!me.receiveDataDTD && (me.receiveDataDTD = $.Deferred());
		me.receiveDataDTD.resolve(event.data);
	});
};

blankBizOperation._initBindModel = function(model, receiveData) {
	blankBizOperation._extendBindModel(model);
	butone.Composition.bindAndShow($("#rootView").get(0), model);
	model.reload(receiveData);
};

blankBizOperation._extendBindModel = function(model) {
	var modelExtend = {
		reload : function(receiveData) {
			this.receiveData = receiveData;
		},
		okBtnClick : function(event) {
			var model = butone.Context.getBindModel();
			var receiver = justep.xbl("windowReceiver");
			receiver.windowEnsure(this.receiveData);
		},

		cancelBtnClick : function(event) {
			justep.xbl("windowReceiver").windowCancel();
		}

	};
	butone.Util.apply(model, modelExtend);
};
