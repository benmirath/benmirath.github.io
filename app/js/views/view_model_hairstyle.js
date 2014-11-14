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
		e.stopPropagation();
		if (curHaircut != this.model) {
			$('.hairstyleElementFilter.active').each (function(){ $(this).removeClass('active') });
			curHaircut = this.model;
			curHaircutElement = $(e.currentTarget.children[0]).attr('id');
			$('#'+curHaircutElement).addClass('active');
			
			imageHair.src = this.model.attributes.hf_imageOriginal;
			imageHairHighlight.src = imageBlank;
			// imageHairHighlight.src = 'images/blank.png';


			curColor = '';
			curColorHighlight = '';
			colorize = false;

			$('.Hair.active').each( function() { $(this).removeClass('active') } );
			$('.Highlight.active').each( function() { $(this).removeClass('active') } );
			$('p#imageID').html(String(this.model.attributes.hf_id));
			$('#imageLoad').show();			
		} else {
			
		}
	}
});

var myObj