//Namespace our app
var app = app || {};

app.hf_model_topMenuItem = Backbone.Model.extend({
	defaults : {
		hf_buttonName : "default",
		hf_buttonID : "default",
		hf_buttonActive : false,
		hf_buttonSubState : 0,
		hf_buttonSubMenu : [
			"defaultVal"	
		]
	}

});