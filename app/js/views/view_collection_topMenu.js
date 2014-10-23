var app = app || {};

app.hf_view_collection_topMenu = Backbone.View.extend({
	tagName : "ul",
	className : "topMenu",
	template : _.template( $('#hf_topMenuElement').html() ),
	render : function() {
		this.collection.each(this.addTopMenuItem, this);
		return this;
	},
	addTopMenuItem : function(_menuItem) {
		var topMenuItemView = new app.hf_view_model_topMenuItem ({ model : _menuItem});
		this.$el.append(topMenuItemView.render().el);
	}
});