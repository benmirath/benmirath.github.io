//Namespace our app
var app = app || {};

app.hf_model_hairstyle = Backbone.Model.extend({
	defaults : {
		hf_id : 00000,
		hf_gender : "female",
		hf_length : "short",
		hf_texture : "straight",
		hf_style : "salon",
		hf_imageThumbnail : "imagePath",
		hf_imageOriginal : "imagePath",
		hf_imageGrayscale : "imagePath",
		hf_imageHighlight : "imagePath",
		hf_colors : [1]
	}
});