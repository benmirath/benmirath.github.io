//Namespace our app
var app = app || {};

app.hf_model_bottomMenuItem = Backbone.Model.extend({
	defaults : {
		hf_buttonName : "default",
		hf_buttonID : "default",
		hf_buttonActive : false,
		hf_buttonSubState : 0,
	}

});