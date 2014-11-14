//Namespace our app
var app = app || {};

app.hf_model_language = Backbone.Model.extend({
	defaults : {
		hf_language_name : "default",
		hf_language_strings : {}
	}
});