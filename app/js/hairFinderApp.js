var DEBUG = false;

// MVC VARIABLES
var hairstyleCollection = new app.hf_collection_hairstyles();
var hairstyleCollectionView;
var facesCollection;
var facesCollectionView;
var colorCollection;
var colorCollectionHairView;
var colorCollectionHighlightView;
var languageCollection;
var languageCollectionView;

var accountModel;
var accountModelView;
var languagesCollection;
var languagesCollectionView;
var shareModel;
var shareModelView;

var topMenuItem1 	= new app.hf_model_topMenuItem ({ 
	hf_buttonName : topMenu_model_header, 
	hf_buttonID : "topMenuModel", 
	hf_buttonSubMenu : [
		topMenu_model_subHeader1,
		topMenu_model_subHeader2,
		topMenu_model_subHeader3		
	] 
});
var topMenuItem2 	= new app.hf_model_topMenuItem ({
	hf_buttonName : topMenu_style_header, 
	hf_buttonID : "topMenuStyle", 
	hf_buttonSubMenu : [
		topMenu_style_subHeader1,
		topMenu_style_subHeader2,
		topMenu_style_subHeader3
	]
});
var topMenuItem3 	= new app.hf_model_topMenuItem ({ 
	hf_buttonName : topMenu_length_header,
	hf_buttonID : "topMenuLength", 
	hf_buttonSubMenu : [
		topMenu_length_subHeader1,
		topMenu_length_subHeader2,
		topMenu_length_subHeader3,
		topMenu_length_subHeader4,
		topMenu_length_subHeader5
	] 
});
var topMenuItem4 	= new app.hf_model_topMenuItem ({ 
	hf_buttonName : topMenu_texture_header,
	hf_buttonID : "topMenuTexture", 
	hf_buttonSubMenu : [
		topMenu_texture_subHeader1,
		topMenu_texture_subHeader2,
		topMenu_texture_subHeader3,
		topMenu_texture_subHeader4
	] 
});
var topMenu 		= new app.hf_collection_topMenu ( [topMenuItem1, topMenuItem2, topMenuItem3, topMenuItem4] );
var topMenuView 	= new app.hf_view_collection_topMenu({ collection : topMenu });

console.log(bottomMenu_colors);
var bottomMenuItem1 = new app.hf_model_bottomMenuItem ({ 
	hf_buttonName : bottomMenu_colors, 
	hf_buttonID : "bottomMenuColor" 
});
var bottomMenuItem2 = new app.hf_model_bottomMenuItem ({ 
	hf_buttonName : bottomMenu_save, 
	hf_buttonID : "bottomMenuSave"
});
var bottomMenuItem3 = new app.hf_model_bottomMenuItem ({ 
	hf_buttonName : bottomMenu_language, 
	hf_buttonID : "bottomMenuLanguage" 
});
var bottomMenuItem4 = new app.hf_model_bottomMenuItem ({ 
	hf_buttonName : bottomMenu_account, 
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
var curLanguage;

// - Canvas
var display, 
	displayContext,
	tintCanvas,
	tintCtx;

var displayHighlight,
	displayContextHighlight,
	tintCanvasHighlight,
	tintCtxHighlight;

// - Left Pane
var curPage = 1;
var totalPages = 0;
var hairstyles = [];

var userProfile;
var signedIn = false;
// var login_username;
var login_password;
var login_email;

var cachedUserPhoto;

var offsetX = 0,
	offsetY = 0,
	offsetIncrementor = 4,
	scalingX = 0,
	scalingY = 0,
	scalingIncrementor = 0.01;

$(document).ready(function(){
	init();	
});

function init () {
	requestLanguages();
	display = document.getElementById('displayPane');
	displayContext = display.getContext('2d');
	displayHighlight = document.getElementById('displayPaneHighlight');
	displayHighlightContext = displayHighlight.getContext('2d');
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
		switch (val) {
			// SIGNED OUT MENU
			case "hf_signedOutSignIn":
				requestUserAuthentication()
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
				requestUpdatePassword();
			break;
			case "hf_signedInUpdateSettings":
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
			case "hf_forgotSend":
				requestLostPassword ();
				$('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
				$('.accountSignedOut').addClass('active');
			break;
			// REGISTER MENU
			case "hf_registerSubmit":
				requestUserRegistration();
			break;
		}
	});

	$('#share_save').click(function (e) {
		renderCanvasForDownload();
	});
	$('#share_print').click(function (e) {
		renderCanvasForPrint();
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
		if (localStorage.rememberMe && localStorage.rememberMe != '') {
			login_email = localStorage.email;
			login_password = localStorage.password;
			$('#hf_signedOutEmail').val(login_email);
			$('#hf_signedOutPassword').val(login_password);
			$('#hf_signedOutRememberMe').prop('checked', true);
			requestUserAuthentication ();
		}
	} else {
	    return;
	}
}

function checkPasswordMatch(id1, id2) {
    if (id1.val() != id2.val()) {
    	$(id1).css('border-color', '#ff0000');
    	$(id2).css('border-color', '#ff0000');
    } else {
    	$(id1).css('border-color', '#008000');
    	$(id2).css('border-color', '#008000');
    }
}

// UPDATE UI METHODS
function renderBottomMenu () {
	requestColors();
	renderSaveMenuView();
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
function renderSaveMenuView () {
	$('#bottomMenuSaveSub').append($('#hf_sharingMenu').html());	
}


// var queryObj;
function updateLeftPaneView () {
	var queryObj = {}
	if (topMenu.models[0].attributes.hf_buttonActive === true && $('#Model_YourFace').hasClass('active')) {
		if (signedIn) {
			if (curUserMeta.customPhoto) {
				renderCustomFaceView_SignedIn_Photo();
			} else {
				renderCustomFaceView_SignedIn_NoPhoto();
			}
		} else {
			renderCustomFaceView_SignedOut();
		}
	} else {
		clearCustomFaceView();
		if (topMenu.models[0].attributes.hf_buttonActive === true) {
			queryObj = { hf_gender : topMenu.models[0].attributes.hf_buttonSubMenu[topMenu.models[0].attributes.hf_buttonSubState].toLowerCase() }
			facesCollectionView.collection = new app.hf_collection_faces(facesCollection.where(queryObj));
			$('#leftPane').empty().html(facesCollectionView.render().el);
		}
		else {
			if (topMenu.models[0].attributes.hf_buttonSubState > 1) queryObj.hf_gender = curUserMeta.gender[0].toLowerCase();
			else queryObj.hf_gender = topMenu.models[0].attributes.hf_buttonSubMenu[topMenu.models[0].attributes.hf_buttonSubState].toLowerCase();

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
}


function colorizeHair () {
	displayContext.clearRect(offsetX, offsetY, display.width, display.height);
	displayContext.globalAlpha = 1;
	displayContext.drawImage(imageHair, offsetX, offsetY, imageHair.width + scalingX, imageHair.height + scalingY);
	if (curColor !== '') {
		tintCanvas = document.createElement('canvas');
		tintCanvas.width = display.width;
		tintCanvas.height = display.height;

		tintCtx = tintCanvas.getContext('2d');
		tintCtx.fillStyle = curColor;
	    tintCtx.fillRect(0,0,tintCanvas.width,tintCanvas.height);
	    tintCtx.globalCompositeOperation = "destination-atop";

	    tintCtx.drawImage(imageHair, offsetX, offsetY, imageHair.width + scalingX, imageHair.height + scalingY);
	    tintCtx.blendOnto (displayContext, 'overlay');
	} else {
		

	}
	if (curColorHighlight !== '') {
		displayContext.globalAlpha = 0.4;
		displayHighlightContext.clearRect(offsetX, offsetY, displayHighlight.width, displayHighlight.height);
		displayHighlightContext.globalAlpha = 1;
		displayHighlightContext.drawImage(imageHairHighlight, offsetX, offsetY, imageHairHighlight.width + scalingX, imageHairHighlight.height + scalingY);
		displayHighlightContext.globalAlpha = 0.4;
		
		tintCanvasHighlight = document.createElement('canvas');
		tintCanvasHighlight.width = displayHighlight.width;
		tintCanvasHighlight.height = displayHighlight.height;		
		
		tintCtxHighlight = tintCanvasHighlight.getContext('2d');
		tintCtxHighlight.fillStyle = curColorHighlight;
		tintCtxHighlight.fillRect(offsetX, offsetY, tintCanvasHighlight.width, tintCanvasHighlight.height);
		tintCtxHighlight.globalCompositeOperation = "destination-atop";

		tintCtxHighlight.drawImage(imageHairHighlight, offsetX, offsetY, imageHairHighlight.width + scalingX, imageHairHighlight.height + scalingY);
		tintCtxHighlight.blendOnto (displayHighlightContext, 'overlay');
	}
}

function renderCanvasForDownload () {
	var canvas = document.createElement('canvas');
	canvas.width = display.width;
	canvas.height = display.height;
	var canvasContext = canvas.getContext('2d');

	var imageFace = document.getElementById('imageFace');
	var imageHair = document.getElementById('displayPane');
	var imageHighlight = document.getElementById('displayPaneHighlight');

	if (imageFace.src != '') canvasContext.drawImage(imageFace, 0, 0);
	if (imageHair.src != '') canvasContext.drawImage(imageHair, 0, 0);
	if (imageHighlight.src != '') canvasContext.drawImage(imageHighlight, 0, 0);

	image = canvas.toDataURL("image/png").replace("image/png", "image/octet-stream");
	var newView = window.open(image);
}
function renderCanvasForPrint () {
	var canvas = document.createElement('canvas');
	canvas.width = display.width;
	canvas.height = display.height;
	var canvasContext = canvas.getContext('2d');

	var imageFace = document.getElementById('imageFace');
	var imageHair = document.getElementById('displayPane');
	var imageHighlight = document.getElementById('displayPaneHighlight');

	if (imageFace.src != '') canvasContext.drawImage(imageFace, 0, 0);
	if (imageHair.src != '') canvasContext.drawImage(imageHair, 0, 0);
	if (imageHighlight.src != '') canvasContext.drawImage(imageHighlight, 0, 0);

	image = canvas.toDataURL("image/png");	
	var newView = window.open(image);
	newView.onload = function () {
		newView.focus();
		newView.print();
		newView.close();	
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