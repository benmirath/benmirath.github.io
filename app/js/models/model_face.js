//Namespace our app
var app = app || {};

app.hf_model_face = Backbone.Model.extend({
	defaults : {
		hf_id : 00000,
		hf_gender : "female",
		hf_image_full : "imagePath",
		hf_image_thumb : "imagePath"
	}
});