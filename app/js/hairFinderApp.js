// APP MENU OPTIONS
app.hf_language_option = {
	hf_menu_option : {
		MODEL : "Model",
		STYLE : "Style",
		LENGTH : "Length",
		TEXTURE : "Texture"
	},
	hf_model_option : {
		FEMALE : "Female",
		MALE : "Male",
		YOU : "Your face"
	},
	hf_style_option : {
		ALL : "All",
		SALON : "Salon",
		CELEBRITY : "Celebrity"
	},
	hf_length_option : {
		ALL : "All",
		SHORT : "Short",
		MEDIUM : "Medium",
		LONG : "Long",
		UPDO : "Updo"
	},
	hf_texture_option : {
		ALL : "All",
		STRAIGHT : "Straight",
		WAVY : "Wavy",
		CURLY : "Curly"
	},
	hf_bottom_menu_option : {
		HAIR_COLOR : "Hair Colors",
		LANGUAGE : "Language",
		SAVE_SHARE : "Save/Share ",
		ACCOUNT : "Account"
	}
};

var DEBUG = false;

// MVC VARIABLES
var hairstyleCollection = new app.hf_collection_hairstyles();
var hairstyleCollectionView;
var facesCollection;
var facesCollectionView;
var colorCollection;
var colorCollectionHairView;
var colorCollectionHighlightView;

var accountModel;
var accountModelView;
var languagesCollection;
var languagesCollectionView;
var shareModel;
var shareModelView;

var topMenuItem1 = new app.hf_model_topMenuItem ({ 
	hf_buttonName : app.hf_language_option.hf_menu_option.MODEL, 
	hf_buttonID : "topMenuModel", 
	hf_buttonSubMenu : [
		app.hf_language_option.hf_model_option.FEMALE, 
		app.hf_language_option.hf_model_option.MALE, 
		app.hf_language_option.hf_model_option.YOU
	] 
});
var topMenuItem2 = new app.hf_model_topMenuItem ({
	hf_buttonName : app.hf_language_option.hf_menu_option.STYLE, 
	hf_buttonID : "topMenuStyle", 
	hf_buttonSubMenu : [
		app.hf_language_option.hf_style_option.ALL, 
		app.hf_language_option.hf_style_option.SALON, 
		app.hf_language_option.hf_style_option.CELEBRITY
	] 
});
var topMenuItem3 = new app.hf_model_topMenuItem ({ 
	hf_buttonName : app.hf_language_option.hf_menu_option.LENGTH, 
	hf_buttonID : "topMenuLength", 
	hf_buttonSubMenu : [
		app.hf_language_option.hf_length_option.ALL, 
		app.hf_language_option.hf_length_option.SHORT, 
		app.hf_language_option.hf_length_option.MEDIUM, 
		app.hf_language_option.hf_length_option.LONG, 
		app.hf_language_option.hf_length_option.UPDO
	] 
});
var topMenuItem4 = new app.hf_model_topMenuItem ({ 
	hf_buttonName : app.hf_language_option.hf_menu_option.TEXTURE, 
	hf_buttonID : "topMenuTexture", 
	hf_buttonSubMenu : [
		app.hf_language_option.hf_texture_option.ALL, 
		app.hf_language_option.hf_texture_option.STRAIGHT, 
		app.hf_language_option.hf_texture_option.WAVY, 
		app.hf_language_option.hf_texture_option.CURLY
	] 
});
var topMenu 		= new app.hf_collection_topMenu ( [topMenuItem1, topMenuItem2, topMenuItem3, topMenuItem4] );
var topMenuView 	= new app.hf_view_collection_topMenu({ collection : topMenu });

var bottomMenuItem1 = new app.hf_model_bottomMenuItem ({ 
	hf_buttonName : app.hf_language_option.hf_bottom_menu_option.HAIR_COLOR, 
	hf_buttonID : "bottomMenuColor" 
});
var bottomMenuItem2 = new app.hf_model_bottomMenuItem ({ 
	hf_buttonName : app.hf_language_option.hf_bottom_menu_option.SAVE_SHARE, 
	hf_buttonID : "bottomMenuSave"
});
var bottomMenuItem3 = new app.hf_model_bottomMenuItem ({ 
	hf_buttonName : app.hf_language_option.hf_bottom_menu_option.LANGUAGE, 
	hf_buttonID : "bottomMenuLanguage" 
});
var bottomMenuItem4 = new app.hf_model_bottomMenuItem ({ 
	hf_buttonName : app.hf_language_option.hf_bottom_menu_option.ACCOUNT, 
	hf_buttonID : "bottomMenuAccount",
	hf_subMenu : {
		hf_loginEmail : '',
		hf_loginPassword : '',
		hf_loginRememberMe : false
	}
});
var bottomMenu 		= new app.hf_collection_bottomMenu ( [bottomMenuItem1, bottomMenuItem2, bottomMenuItem3, bottomMenuItem4] );
var bottomMenuView 	= new app.hf_view_collection_bottomMenu( { collection : bottomMenu } );

// SESSION VARIABLES
// - App Management
var imageBlank = 'images/blank.png';
var imageHair = new Image();
var imageHairHighlight = new Image();
var colorize = false;
var curHaircut;
var curHaircutElement;
var curFaceElement;
var curColor = '';
var curColorHighlight = '';

// - Canvas
var display;
var displayContext;
var tintCanvas;
var tintCtx;

var displayHighlight;
var displayContextHighlight;
var tintCanvasHighlight;
var tintCtxHighlight;

// var tintCanvas = document.createElement('canvas');
// tintCanvas.width = display.width;
// tintCanvas.height = display.height;
// var tintCtx = tintCanvas.getContext('2d');

// var tintCanvasHighlight = document.createElement('canvas');
// tintCanvasHighlight.width = display.width;
// tintCanvasHighlight.height = display.height;
// var tintCtxHighlight = tintCanvasHighlight.getContext('2d');

// - Left Pane
var curPage = 1;
var totalPages = 0;
var hairstyles = [];

var userProfile;
var signedIn = false;
// var login_username;
var login_password;
var login_email;

$(document).ready(function(){
	init();	
});

function init () {
	display = document.getElementById('displayPane');
	displayContext = display.getContext('2d');
	displayHighlight = document.getElementById('displayPaneHighlight');
	displayHighlightContext = displayHighlight.getContext('2d');
	// $(document).bind( "contextmenu", function(e) {	return false; } );
	var fieldString = '';
	$('#topPane').html(topMenuView.render().el);
	$('#bottomPane').html(bottomMenuView.render().el);

	requestFaces();
	requestHairstyles();
	renderBottomMenu();
	registerEvents();
}

function registerEvents () {
	$('#hf_signedOutRememberMe').click(function() {
        if ($('#hf_signedOutRememberMe').is(':checked')) {
            // save username and password
            localStorage.email = $('#hf_signedOutEmail').val();
            localStorage.password = $('#hf_signedOutPassword').val();
            localStorage.rememberMe = $('#hf_signedOutRememberMe').prop('checked');
        } else {
            localStorage.email = '';
            localStorage.password = '';
            localStorage.rememberMe = '';
        }
    });
    checkForUser();

    $('.accountMenuInputButton').click(function(e) {
		e.preventDefault();
		var val = $(e.currentTarget).attr('id');
		// console.log(val);
		// $('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
		switch (val) {
			// SIGNED OUT MENU
			case "hf_signedOutSignIn":
				requestUserAuthentication()
				// account
			break;
			case "hf_signedOutForgotPassword":
				$('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
				$('.accountForgot').addClass('active');
			break;
			case "hf_signedOutRegister":
				$('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
				$('.accountRegister').addClass('active');
			break;
			// SIGNED IN MENU
			case "hf_signedInUpdatePassword":
			break;
			case "hf_signedInUpdateGender":
				requestUpdateGender();
			break;
			case "hf_signedInSignOut":
				signedIn = false;
				$('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
				$('.accountSignedOut').addClass('active');
			break;
			case "hf_signedInDelete":
				$('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
				$('.accountDelete').addClass('active');
			break;
			// DELETE MENU
			case "hf_deleteYes":
				requestUserDeletion();
			break;
			case "hf_deleteNo":
				$('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
				$('.accountSignedIn').addClass('active');
			break;
			// REGISTER MENU
			case "hf_registerSubmit":
				requestUserRegistration();
			break;
		}
	});

	display.onload = function () {
		$(display).css('opacity', 1);
	}
	displayContext.onload = function () {
		$(display).css('opacity', 1);
	}
	imageHair.onload = function () {
		$('#imageLoad').hide();
		$(display).css('opacity', 1);
		displayContext.clearRect(0,0, display.width, display.height);
		displayContext.globalAlpha = 1;
		displayContext.drawImage(imageHair, 0, 0);
	  	colorizeHair();
	}
	imageHairHighlight.onload = function () {
		$(displayHighlight).css('opacity', 1);
		displayHighlightContext.clearRect(0,0, display.width, display.height);
		displayHighlightContext.globalAlpha = 1;
		displayContext.drawImage(imageHair, 0, 0);
		colorizeHair();
	}
}


function checkForUser () {
	if(typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		if (localStorage.rememberMe && localStorage.rememberMe != '') {
			login_email = localStorage.email;
			login_password = localStorage.password;
			$('#hf_signedOutEmail').val(login_email);
			$('#hf_signedOutPassword').val(login_password);
			$('#hf_signedOutRememberMe').prop('checked', true);
			requestUserAuthentication ();
		}
		// signedIn = true;
	} else {
	    // Sorry! No Web Storage support..
	    return;
	}
	// Call to user authentication
}

function sanitizeUserTextInput () {

}

function checkPasswordMatch(id1, id2) {
    // var password = $("#hf_signedInPassword").val();
    // var confirmPassword = $("#hf_signedInPasswordConfirm").val();

    if (id1.val() != id2.val()) {
    	$(id1).css('border-color', '#ff0000');
    	$(id2).css('border-color', '#ff0000');
    } else {
    	$(id1).css('border-color', '#008000');
    	$(id2).css('border-color', '#008000');
    }
}
// var test5;
// UPDATE UI METHODS
function renderBottomMenu () {
	requestColors();
	renderAccountMenuView();
}

function updateLanguageMenuView () {
	languagesCollection;
	languagesCollectionView;

}

function updateShareMenuView () {
	shareModel;
	shareModelView;

}
function renderAccountMenuView () {
	$('#bottomMenuAccountSub').append($('#hf_accountMenuElement').html());
}
function updateLeftPaneView () {
	var queryObj = {}
	if (topMenu.models[0].attributes.hf_buttonActive === true) {
		queryObj = { hf_gender : topMenu.models[0].attributes.hf_buttonSubMenu[topMenu.models[0].attributes.hf_buttonSubState].toLowerCase() }
		facesCollectionView.collection = new app.hf_collection_faces(facesCollection.where(queryObj));
		$('#leftPane').empty().html(facesCollectionView.render().el);
	}
	else {
		queryObj.hf_gender = topMenu.models[0].attributes.hf_buttonSubMenu[topMenu.models[0].attributes.hf_buttonSubState].toLowerCase();
		if (topMenu.models[1].attributes.hf_buttonSubState !== 0) 
			queryObj.hf_style = topMenu.models[1].attributes.hf_buttonSubMenu[topMenu.models[1].attributes.hf_buttonSubState].toLowerCase();
		if (topMenu.models[2].attributes.hf_buttonSubState !== 0) 
			queryObj.hf_length = topMenu.models[2].attributes.hf_buttonSubMenu[topMenu.models[2].attributes.hf_buttonSubState].toLowerCase();
		if (topMenu.models[3].attributes.hf_buttonSubState !== 0) 
			queryObj.hf_texture = topMenu.models[3].attributes.hf_buttonSubMenu[topMenu.models[3].attributes.hf_buttonSubState].toLowerCase();
		hairstyleCollectionView.collection = new app.hf_collection_hairstyles(hairstyleCollection.where(queryObj));
		$('#leftPane').empty().html(hairstyleCollectionView.render().el);	
	}
}



function updateLanguages () {
	
}
// function colorizeHair () {
// 	displayContext.clearRect(0,0, display.width, display.height);
// 	displayContext.globalAlpha = 1;
// 	displayContext.drawImage(imageHair, 0, 0);
// 	displayContext.globalAlpha = 0.4;

// 	if (curColor !== '') {
// 		tintCanvas = document.createElement('canvas');
// 		tintCanvas.width = display.width;
// 		tintCanvas.height = display.height;

// 		tintCtx = tintCanvas.getContext('2d');
// 		tintCtx.fillStyle = curColor;
// 	    tintCtx.fillRect(0,0,tintCanvas.width,tintCanvas.height);
// 	    tintCtx.globalCompositeOperation = "destination-atop";
// 	    // tintCtx.globalCompositeOperation = "multiply";
// 	    tintCtx.drawImage(imageHair, 0, 0);

// 	    displayContext.drawImage(tintCanvas, 0, 0);
// 	}
// 	if (curColorHighlight !== '') {
// 		tintCanvasHighlight = document.createElement('canvas');
// 		tintCanvasHighlight.width = display.width;
// 		tintCanvasHighlight.height = display.height;
		
// 		tintCtxHighlight = tintCanvasHighlight.getContext('2d');
// 		tintCtxHighlight.fillStyle = curColorHighlight;
// 	    tintCtxHighlight.fillRect(0,0,tintCanvasHighlight.width, tintCanvasHighlight.height);
// 	    tintCtxHighlight.globalCompositeOperation = "destination-atop";
// 	    // tintCtxHighlight.globalCompositeOperation = "multiply";
// 	    tintCtxHighlight.drawImage(imageHairHighlight, 0, 0);
// 	    displayContext.drawImage(tintCanvasHighlight, 0, 0);	
// 	}
// }

function colorizeHair () {
	displayContext.clearRect(0,0, display.width, display.height);
	displayContext.globalAlpha = 1;
	displayContext.drawImage(imageHair, 0, 0);
	displayContext.globalAlpha = 0.4;

	if (curColor !== '') {
		tintCanvas = document.createElement('canvas');
		tintCanvas.width = display.width;
		tintCanvas.height = display.height;

		tintCtx = tintCanvas.getContext('2d');
		tintCtx.fillStyle = curColor;
	    tintCtx.fillRect(0,0,tintCanvas.width,tintCanvas.height);
	    tintCtx.globalCompositeOperation = "destination-atop";
	    tintCtx.drawImage(imageHair, 0, 0);
	    tintCtx.blendOnto (displayContext, 'overlay');
	}
	if (curColorHighlight !== '') {
		displayHighlightContext.clearRect(0,0, displayHighlight.width, displayHighlight.height);
		displayHighlightContext.globalAlpha = 1;
		displayHighlightContext.drawImage(imageHairHighlight, 0, 0);
		displayHighlightContext.globalAlpha = 0.4;
		
		tintCanvasHighlight = document.createElement('canvas');
		tintCanvasHighlight.width = displayHighlight.width;
		tintCanvasHighlight.height = displayHighlight.height;		
		
		tintCtxHighlight = tintCanvasHighlight.getContext('2d');
		tintCtxHighlight.fillStyle = curColorHighlight;
		tintCtxHighlight.fillRect(0,0,tintCanvasHighlight.width, tintCanvasHighlight.height);
		tintCtxHighlight.globalCompositeOperation = "destination-atop";		
		tintCtxHighlight.drawImage(imageHairHighlight, 0, 0);
		tintCtxHighlight.blendOnto (displayHighlightContext, 'overlay');
	}
}

function compareHairstyle(a,b) {
  if (a.attributes.hf_id < b.attributes.hf_id)
     return -1;
  if (a.attributes.hf_id > b.attributes.hf_id)
    return 1;
  return 0;
}
function compareColors(a,b) {
	if (a.attributes.hf_color_categoryIndex < b.attributes.hf_color_categoryIndex)
		return -1;
	if (a.attributes.hf_color_categoryIndex > b.attributes.hf_color_categoryIndex)
		return 1;
	return 0;
}