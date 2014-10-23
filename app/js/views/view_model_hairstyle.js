var app = app || {};

app.hf_view_model_hairstyle = Backbone.View.extend({
	tagName : "div",
	template : _.template( $('#hf_hairstyleElement').html() ),
	
	render : function() {
		var hairstyleTemplate = this.template(this.model.toJSON());
		this.$el.html(hairstyleTemplate);
		return this;
	},
	events : {
		'click' : 'loadHairstyle'
	},
	loadHairstyle : function (e) {
		console.log(e);
		if (curHaircut != this) {
			$('.hairstyleElementFilter.active').each (function(){ $(this).removeClass('active') });
			$(e.currentTarget.children[0]).addClass('active')
			// $('#displayPane img#imageHair').attr('src', this.model.attributes.hf_imageGrayscale);
			// Caman('#imageHair').image.src = this.model.attributes.hf_imageOriginal;
			// Caman(this.model.attributes.hf_imageOriginal,'#displayPane', function () {
			// 	this.render();
			// });
			imageHair.src = this.model.attributes.hf_imageOriginal;
			curHaircut = this.model;
			curColor = '';
			colorize = false;

			$('p#imageID').html(String(this.model.attributes.hf_id));
			$('.colorHair.active').each( function() { $(this).removeClass('active') } );
			if (!$(e.currentTarget[0]).hasClass('active')) $('#imageLoad').show();
			
		} else {
			// load page logic
		}
	}
});