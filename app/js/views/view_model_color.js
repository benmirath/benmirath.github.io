var app = app || {};

app.hf_color_display_type = {
	HAIR : "Hair",
	HIGHLIGHT : "Highlight"
}
var colorObjTest;
app.hf_view_model_color = Backbone.View.extend({
	tagName : "li",
	template : _.template( $('#hf_colorHairElement').html() ),
	displayType : '',
	render : function() {
		if (this.displayType == app.hf_color_display_type.HAIR) this.__proto__.template = _.template( $('#hf_colorHairElement').html() );
		else if (this.displayType == app.hf_color_display_type.HIGHLIGHT) this.__proto__.template = _.template( $('#hf_colorHighlightElement').html() );
		else console.log('ERROR: hf_view_model_color - '+this.displayType);
		var colorTemplate = this.template(this.model.toJSON());
		this.$el.html(colorTemplate);
		return this;
	},
	setDisplayType : function(type) {
		this.displayType = type;
		this.model.attributes.hf_display_type = type;
	},
	events : {
		'click' : 'loadColor'
	},
	loadColor : function (e) {
		if ($(e.target).data('color_val') == '' || $(e.target).data('color_val') == undefined) return;
		colorObjTest = e;
		var tar = e;
		//hair color is active, return to default;
		if ($(tar.target).hasClass('active')) {
			$(tar.target).removeClass('active');
			if (this.displayType === "Hair") {
				curColor = '';
				imageHair.src = curHaircut.attributes.hf_imageOriginal;
			} else if (this.displayType === "Highlight") {
				imageHairHighlight.src = imageBlank;
				curColorHighlight = '';
			}
		} else {
			if (imageHair.src != curHaircut.attributes.hf_imageGrayscale && this.displayType === "Hair") {
				$(display).css('opacity', 0);
			}
			if (imageHairHighlight.src != curHaircut.attributes.hf_imageHighlight && this.displayType === "Highlight") {
				$(displayHighlight).css('opacity', 0);
			}

			if (this.displayType === "Hair") {
				$('.colorHair.active').each( function() { $(this).removeClass('active') } );
				curColor = $(tar.target).data('color_val');
				imageHair.src = curHaircut.attributes.hf_imageGrayscale;
			} else if (this.displayType === "Highlight") {
				$('.Highlight.active').each( function() { $(this).removeClass('active') } );
				curColorHighlight = $(tar.target).data('color_val');

				imageHairHighlight.src = curHaircut.attributes.hf_imageHighlight;
			}
			$(tar.target).addClass('active');			
		}
		colorizeHair();
	}
});

