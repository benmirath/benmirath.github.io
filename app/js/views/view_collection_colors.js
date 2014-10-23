var app = app || {};

app.hf_view_collection_colors = Backbone.View.extend({
	tagName : "ul",
	className : "hf_collection_colors",
	// template : _.template( $('#hf_colorElement').html() ),
	collectionDisplayType : 'test',
	render : function() {
		this.$el.empty();
		this.collection.each(this.addColor, this);
		return this;
	},
	setDisplayType : function(type) {
		this.collectionDisplayType = type;
		this.className = "hf_collection_colors "+type;
	},
	addColor : function(_color) {
		var colorView = new app.hf_view_model_color ({ model : _color});
		colorView.setDisplayType(this.collectionDisplayType);
		// colorView.__proto__.displayType = this.__proto__.collectionDisplayType;
		// console.log(colorView);
		this.$el.append(colorView.render().el);
	}
});