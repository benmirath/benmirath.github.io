var app = app || {};

app.hf_view_model_topMenuItem = Backbone.View.extend({
	tagName : "li",
	className : "hf_topMenuItem",
	template : _.template( $('#hf_topMenuItemElement').html() ),
	render : function() {
		var topMenuItemTemplate = this.template(this.model.toJSON());
		this.$el.html(topMenuItemTemplate);

		var subMenu = this.$el.children('.topMenuSub');
		for (subItem in this.model.attributes.hf_buttonSubMenu) {
			// console.log("loop val: "+subItem);
			var newSub = $('<li class="hf_topMenuSubItem" id="' + this.model.attributes.hf_buttonName + '_' + String(this.model.attributes.hf_buttonSubMenu[subItem]).split(' ').join('') + '" data-subValue='+subItem+'>' + this.model.attributes.hf_buttonSubMenu[subItem] + '</li>');
			// var newSub = $('<li class="hf_topMenuSubItem" id="' + this.model.attributes.hf_buttonName + '_' + String(this.model.attributes.hf_buttonSubMenu[subItem]).split(' ').join('') + '" data-subValue='+subItem+'>' + language_topMenu_Model(this.model.attributes.hf_buttonName + '_' + String(this.model.attributes.hf_buttonSubMenu[subItem]).split(' ').join('')) + '</li>');
			if (subItem == 0) newSub.addClass('active');
			subMenu.append(newSub);
		}
		return this;
	},
	events : {
		'click' : 'toggleMenu'
	},
	toggleMenu : function (e) {
		var targetObj = e.target;
		console.log(e);
		// TOP MENU
		if (targetObj.classList.contains('hf_topMenuItem')) {
			// disable button and sub
			if (targetObj.classList.contains('active')) {
				this.model.attributes.hf_buttonActive = false;
				this.$el.removeClass('active');
				this.$el.children('.topMenuSub').removeClass('active');
			} 
			// enable button and sub, and disable other buttons
			else {	
				$('.hf_topMenuItem.active').each (function() { 
					$(this).removeClass('active');
					$(this).children('.topMenuSub').removeClass('active');
				});
				for (obj in topMenu.models) {
					topMenu.models[obj].attributes.hf_buttonActive = false;
				};
				this.model.attributes.hf_buttonActive = true;
				this.$el.addClass('active');
				this.$el.children('.topMenuSub').addClass('active');
			}
			// updateLeftPaneView ();
		} 
		//SUB MENU
		else {
			// button is already active, disable
			if (targetObj.classList.contains('active') && $(targetObj).data('subvalue') != 0) {
				this.model.attributes.hf_buttonSubState = 0;
				$(targetObj).removeClass('active');
				$(targetObj.parentElement.childNodes[0]).addClass('active');
			} 
			// button is not active, enable
			else {
				$('.hf_topMenuSubItem.active').each (function() { if ( targetObj.parentElement.id === $(this).parent().attr('id') ) $(this).removeClass('active'); } );
				this.model.attributes.hf_buttonSubState = $(targetObj).data('subvalue');
				$(targetObj).addClass('active');
			}
			if ($(targetObj).data('subvalue') != 0) $(targetObj).parent().parent().addClass('subActive');
			else $(targetObj).parent().parent().removeClass('subActive');
			// updateLeftPaneView ();
		}
		updateLeftPaneView ();
	}
});