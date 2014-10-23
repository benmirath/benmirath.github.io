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
	},
	events : {
		'click' : 'loadColor'
	},
	loadColor : function (e) {
		console.log(e);
		colorObjTest = e;
		var tar = e;
		//hair color is active, return to default;
		if ($(tar.target).hasClass('active')) {
			$(tar.target).removeClass('active');
			curColor = '';
			colorize = false;
			imageHair.src = curHaircut.attributes.hf_imageOriginal;

		} else {
			$('.colorHair.active').each(function(){
				$(this).removeClass('active')
			});
			// $(tar.target).children('.hairColor').addClass('active');
			$(tar.target).addClass('active');
			curColor = $(tar.target).data('color_val');
			colorize = true;
			// imageHair.src = '';
			imageHair.src = curHaircut.attributes.hf_imageGrayscale;
			colorizeHair();
		}

		// Caman(hairstyleCollection.models[0].attributes.hf_imageOriginal,'#displayPane', function () {
		// 	this.render();
		// });
		// $('#displayPane img#imageHair').attr('src', curHaircut.model.attributes.hf_imageGrayscale).css('background-color', '').css('background-blend-mode', '');
		// $('#displayPane img#imageHair');
	}
});

