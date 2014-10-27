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
		if (curHaircut != this.model) {
				console.log($(this));
				$('.hairstyleElementFilter.active').each (function(){ $(this).removeClass('active') });
				curHaircut = this.model;
				curHaircutElement = $(e.currentTarget.children[0]).attr('id');
				$('#'+curHaircutElement).addClass('active');
				imageHair.src = this.model.attributes.hf_imageOriginal;
				curColor = '';
				colorize = false;
				$('p#imageID').html(String(this.model.attributes.hf_id));
				$('.colorHair.active').each( function() { $(this).removeClass('active') } );
				$('#imageLoad').show();			
		} else {
			// load page logic
		}
	}
});