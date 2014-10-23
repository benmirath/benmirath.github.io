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
			var newSub = $('<li class="hf_topMenuSubItem" id="' + this.model.attributes.hf_buttonName + '_' + this.model.attributes.hf_buttonSubMenu[subItem] + '" data-subValue='+subItem+'>' + this.model.attributes.hf_buttonSubMenu[subItem] + '</li>');
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
		// TOP MENU
		if (targetObj.classList.contains('hf_topMenuItem')) {			
			// disable button and sub
			if (targetObj.classList.contains('active')){
				this.model.attributes.hf_buttonActive = false;
				
				this.$el.removeClass('active');
				this.$el.children('.topMenuSub').removeClass('active');
			} 
			// enable button and sub, and disable other buttons
			else {
				this.model.attributes.hf_buttonActive = true;
				$('.hf_topMenuItem.active').each (function() { 
					$(this).removeClass('active');
					$(this).children('.topMenuSub').removeClass('active');
				});
				this.$el.addClass('active');
				this.$el.children('.topMenuSub').addClass('active');
			}
			updateLeftPaneView ();
			// if (targetObj.children[0].id === "topMenuModel") this.updateLeftPaneView ("model");
			// else  updateLeftPaneView ();
			// else  this.updateLeftPaneView ("hairstyle");
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
				$('.hf_topMenuSubItem.active').each (function(){ 
					if (targetObj.parentElement.id === $(this).parent().attr('id')) $(this).removeClass('active');
				});
				this.model.attributes.hf_buttonSubState = $(targetObj).data('subvalue');
				$(targetObj).addClass('active');
			}
			if ($(targetObj).data('subvalue') != 0) $(targetObj).parent().parent().addClass('subActive');
			else $(targetObj).parent().parent().removeClass('subActive');
			
			if (targetObj.parentElement.id === "topMenuModelSub") {
				this.updateLeftPaneView ("model");
				$('#displayPane #imageHair').attr('src', 'images/blank.png');
				$('#displayPane #imageFace').attr('src', facesCollectionView.collection.models[0].attributes.hf_image_full);
			}
			else  updateLeftPaneView ();
			// else  this.updateLeftPaneView ("hairstyle");
		}
	}
	// updateLeftPaneView : function (mode) {
	// 	var queryObj = {}
	// 	if (topMenu.models[0].attributes.hf_buttonActive) {
	// 		queryObj = { hf_gender : topMenu.models[0].attributes.hf_buttonSubMenu[topMenu.models[0].attributes.hf_buttonSubState].toLowerCase() }
	// 		facesCollectionView.collection = new app.hf_collection_faces(facesCollection.where(queryObj));
	// 		$('#leftPane').empty().html(facesCollectionView.render().el);
	// 	}
	// 	else {
	// 		queryObj.hf_gender = topMenu.models[0].attributes.hf_buttonSubMenu[topMenu.models[0].attributes.hf_buttonSubState].toLowerCase();
	// 		if (topMenu.models[1].attributes.hf_buttonSubState != 0) queryObj.hf_style = topMenu.models[1].attributes.hf_buttonSubMenu[topMenu.models[1].attributes.hf_buttonSubState].toLowerCase();
	// 		if (topMenu.models[2].attributes.hf_buttonSubState != 0) queryObj.hf_length = topMenu.models[2].attributes.hf_buttonSubMenu[topMenu.models[2].attributes.hf_buttonSubState].toLowerCase();
	// 		if (topMenu.models[3].attributes.hf_buttonSubState != 0) queryObj.hf_texture = topMenu.models[3].attributes.hf_buttonSubMenu[topMenu.models[3].attributes.hf_buttonSubState].toLowerCase();
	// 		hairstyleCollectionView.collection = new app.hf_collection_hairstyles(hairstyleCollection.where(queryObj));
	// 		$('#leftPane').empty().html(hairstyleCollectionView.render().el);	
	// 	}
	// },
});