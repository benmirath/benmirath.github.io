var app = app || {};

app.hf_view_model_face = Backbone.View.extend({
	tagName : "div",
	template : _.template( $('#hf_faceElement').html() ),
	
	render : function() {
		var faceTemplate = this.template(this.model.toJSON());
		this.$el.html(faceTemplate);
		return this;
	},
	events : {
		'click' : 'loadFace'
	},
	loadFace : function (e) {
		console.log(e);
		$('.faceElementFilter.active').each (function(){ $(this).removeClass('active') });
		$(e.currentTarget.children[0]).addClass('active')
		// $('#imageFace').attr('src', this.model.attributes.hf_image_full);
		$('#imageFace').css('background-image', 'url('+this.model.attributes.hf_image_full+')');
	}
});