//Namespace our app
var app = app || {};

app.hf_model_color = Backbone.Model.extend({
	defaults : {
		hf_color_name : "default",
		hf_color_value : "default"
	}
});