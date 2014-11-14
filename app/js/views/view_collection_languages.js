var app = app || {};

app.hf_view_collection_languages = Backbone.View.extend({
	tagName : "ul",
	className : "languageCollection",
	template : _.template( $('#hf_languageElement').html() ),
	render : function() {
		this.$el.empty();
		$('#bottomLanguageMenuSub').append($('<h2 id="language_header">Choose your language</h2>'));
		var menuWrapper = $('<div id="languageMenuWrapper"></div>');
		// $('#bottomLanguageMenuSub')
		this.collection.each(this.addLanguage, this);
		// this.collection.each(this.addLanguage, this);
		// this.$el.parent().prepend($('<h2 id="language_header">Choose your language</h2>'));
		return this;
	},
	addLanguage : function(_Language) {
		var languageView = new app.hf_view_model_language ({ model : _Language});
		this.$el.append(languageView.render().el);
	}
});