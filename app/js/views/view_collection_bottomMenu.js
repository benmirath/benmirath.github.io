var app = app || {};

app.hf_view_collection_bottomMenu = Backbone.View.extend({
	tagName : "ul",
	className : "bottomMenu",
	template : _.template( $('#hf_bottomMenuElement').html() ),
	render : function() {
		this.$el.empty();
		this.collection.each(this.addBottomMenu, this);
		return this;
	},
	addBottomMenu : function(_menuItem) {
		var menuItemView = new app.hf_view_model_bottomMenuItem ({ model : _menuItem});
		this.$el.append(menuItemView.render().el);
	}
});