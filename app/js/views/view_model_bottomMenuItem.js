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
		if (!e.target.classList.contains('hf_bottomMenuItem')) return;
		
		e.preventDefault();
		targetObj = e.target;
		if (targetObj.classList.contains('hf_bottomMenuItem') || targetObj.classList.contains('bottomMenuItem')) { 
			console.log(targetObj);
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
		if ($(targetObj).has('#bottomMenuAccount')) {
			$('.accountMenu.active').each( function () { $(this).removeClass('active') } );
			if (signedIn) {
				$('.accountSignedIn').addClass('active');
			} else {
				$('.accountSignedOut').addClass('active');
			}
		}
	},
});

function menuFunctionAccountRegister () {
	// $('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
	// $('.accountSignedOut').removeClass('active');
	$('.accountRegister').addClass('active');
	console.log("working");
}

function menuFunctionAccountForgot () {
	$('.accountaccountSignedOut').addClass('active');
}
function menuFunctionAccountSignedOut () {
	// $('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
	// $('.accountSignedOut').removeClass('active');
	$('.accountaccountSignedOut').addClass('active');	
}
function menuFunctionAccountSignIn () {

}