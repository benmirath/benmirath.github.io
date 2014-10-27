var app = app || {};

app.hf_view_model_bottomMenuItem = Backbone.View.extend({
	tagName : "li",
	className : "hf_bottomMenuItem",
	template : _.template( $('#hf_bottomMenuItemElement').html() ),

	
	render : function() {
		var bottomMenuItemTemplate = this.template(this.model.toJSON());
		this.$el.html(bottomMenuItemTemplate);
		return this;
		// var subMenu = this.$el.children('.bottomMenuSub');
	},
	events : {
		'click' : 'toggleMenu'
	},
	toggleMenu : function (e) {
		// targetting base bottom menu item
		targetObj = e.target;
		console.log(targetObj);
		if (targetObj.classList.contains('hf_bottomMenuItem') || targetObj.classList.contains('bottomMenuItem')) { 
			// If active, disable button 
			if (targetObj.classList.contains('active')) {
				this.model.attributes.hf_buttonActive = false;
				this.$el.removeClass('active');
				this.$el.parent().removeClass('bottomMenuColorActive');
				this.$el.parent().removeClass('bottomMenuSaveActive');
				this.$el.parent().removeClass('bottomMenuLanguageActive');
				this.$el.parent().removeClass('bottomMenuAccountActive');
			}
			// else enable button and sub, disable other buttons
			else {
				this.model.attributes.hf_buttonActive = true;
				$('.hf_bottomMenuItem.active').each( function() {
					$(this).removeClass('active');
					$(this).children('.bottomMenuSub').removeClass('active');
				});
				this.$el.addClass('active');
				this.$el.parent().removeClass('bottomMenuColorActive');
				this.$el.parent().removeClass('bottomMenuSaveActive');
				this.$el.parent().removeClass('bottomMenuLanguageActive');
				this.$el.parent().removeClass('bottomMenuAccountActive');
				this.$el.parent().addClass(this.model.attributes.hf_buttonID+'Active');
			}

		}

	}
});