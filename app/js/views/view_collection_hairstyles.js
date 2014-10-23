var app = app || {};

app.hf_view_collection_hairstyles = Backbone.View.extend({
	tagName : "div",
	className : "hf_collection_hairstyle",
	template : _.template( $('#hf_hairstyleElement').html() ),
	render : function() {
		// var hairstyleTemplate = this.template(this.model.toJSON());
		// this.$el.html(hairstyleTemplate);
		this.$el.empty();
		this.collection.each(this.addHairstyle, this);
		return this;
	},
	addHairstyle : function(_hairstyle) {
		var hairstyleView = new app.hf_view_model_hairstyle ({ model : _hairstyle});
		this.$el.append(hairstyleView.render().el);
	}
});