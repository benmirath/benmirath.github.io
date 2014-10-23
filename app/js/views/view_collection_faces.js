var app = app || {};

app.hf_view_collection_faces = Backbone.View.extend({
	tagName : "div",
	className : "hf_collection_face",
	template : _.template( $('#hf_faceElement').html() ),
	render : function() {
		this.$el.empty();
		this.collection.each(this.addFace, this);
		return this;
	},
	addFace : function(_face) {
		var faceView = new app.hf_view_model_face ({ model : _face});
		this.$el.append(faceView.render().el);
	}
});