//Namespace our app
var app = app || {};

app.hf_model_color = Backbone.Model.extend({
	defaults : {
		hf_color_name : "default",
		hf_color_value : "default",
		hf_color_categoryName : "",
		hf_color_categoryIndex : "",
		hf_display_type : "",
		hf_blend_type : "overlay"
	}
});