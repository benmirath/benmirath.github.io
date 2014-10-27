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
// app.hf_menu_option = {
// 	MODEL : "Model",
// 	STYLE : "Style",
// 	LENGTH : "Length",
// 	TEXTURE : "Texture"
// };
// app.hf_model_option = {
// 	FEMALE : "Female",
// 	MALE : "Male",
// 	YOU : "Your face"
// };
// app.hf_style_option = {
// 	ALL : "All",
// 	SALON : "Salon",
// 	CELEBRITY : "Celebrity"
// };
// app.hf_length_option = {
// 	ALL : "All",
// 	SHORT : "Short",
// 	MEDIUM : "Medium",
// 	LONG : "Long",
// 	UPDO : "Updo"
// };
// app.hf_texture_option = {
// 	ALL : "All",
// 	STRAIGHT : "Straight",
// 	WAVY : "Wavy",
// 	CURLY : "Curly"
// };
// app.hf_bottom_menu_option = {
// 	HAIR_COLOR : "Hair Colors",
// 	LANGUAGE : "Language",
// 	SAVE_SHARE : "Save/Share ",
// 	ACCOUNT : "Account"
// };

var DEBUG = false;

// AJAX PARAMETERS
var baseURL 							= 'http://hairstyler.fabraz.com/';
var hairstyleUrlParameters 				= 'api/get_posts/?post_type=hairstyle&include=id,attachments,custom_fields';
var faceUrlParameters 					= 'api/get_posts/?post_type=model&include=id,attachments,custom_fields';
var colorUrlParameters 					= 'api/get_posts/?post_type=color&include=id,custom_fields';
var userAuthenticationNonceRegister		= 'api/get_nonce/?controller=user&method=register';
var userAuthenticationNonceCookie		= 'api/get_nonce/?controller=user&method=generate_auth_cookie';
var userAuthenticationCookieParameters 	= 'api/user/generate_auth_cookie/?nonce=';

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
var imageHair = new Image();
var colorize = false;
var curHaircut;
var curHaircutElement;
var curFaceElement;
var curColor = '';

// - Canvas
var display;
var displayContext;

// - Left Pane
var curPage = 1;
var totalPages = 0;
var hairstyles = [];

var userProfile;
var signedIn = false;
var login_username;
var login_password;
var login_email;

$(document).ready(function(){
	init();	
});

function init () {
	display = document.getElementById('displayPane');
	displayContext = display.getContext('2d');

	// $(document).bind( "contextmenu", function(e) {	return false; } );
	var fieldString = '';
	$('#topPane').html(topMenuView.render().el);
	$('#bottomPane').html(bottomMenuView.render().el);

	requestFaces();
	requestHairstyles();
	// requestColors();
	renderBottomMenu();

	$('#hf_loginRememberMe').click(function() {

        if ($('#hf_loginRememberMe').is(':checked')) {
            // save username and password
            localStorage.email = $('#hf_loginEmail').val();
            localStorage.password = $('#hf_loginPassword').val();
            localStorage.rememberMe = $('#hf_loginRememberMe').val();
        } else {
            localStorage.email = '';
            localStorage.password = '';
            localStorage.rememberMe = '';
        }
    });

	imageHair.onload = function () {
		$('#imageLoad').hide();
		if (colorize == true) {
	  		colorizeHair();
		} else {
			displayContext.clearRect(0,0, display.width, display.height);
			displayContext.globalAlpha = 1;
			displayContext.drawImage(imageHair, 0, 0);
		}
	};
}


function checkForUser () {
	if(typeof(Storage) !== "undefined") {
		// Code for localStorage/sessionStorage.
		if (localStorage.rememberMe && localStorage.rememberMe != '') {
			login_email = localStorage.email;
			login_password = localStorage.password;
		}
		// signedIn = true;
	} else {
	    // Sorry! No Web Storage support..
	    return;
	}
	// Call to user authentication
}

// API/BACKEND QUERIES
function requestUserAuthentication () {
	$.ajax({
		url : baseURL + userAuthenticationNonceCookie,
		type: "GET",
		dataType: 'json',
		success : function (response) {
			console.log("Success");
			console.log(response);
			var nonce = response.nonce;
			$.ajax({
				// url : response.authentication.oauth1.request,
				url : baseURL + userAuthenticationCookieParameters + nonce + '&username=adminBen&password=Petrichor2357!',
				success : function (data) {
					console.log(baseURL + userAuthenticationCookieParameters + nonce + '&username=adminBen&password=Petrichor2357!');
					console.log(data);
				},
				error : function (data) {
					console.log(baseURL + userAuthenticationCookieParameters + nonce + '&username=adminBen&password=Petrichor2357!');
					console.log(data);
				}
			});
		},
		error : function (response) {
			console.log("Error");
			console.log(response)
		}
	});	
}
function requestFaces () {
	$.ajax({
		url : baseURL + faceUrlParameters+"&count=-1",
		crossDomain : true,
		xhrFields : {
			withCredentials : true
		},
		headers: {
		     'Authorization': "Basic XXXXX"
		},
		type: "GET",
		dataType: 'jsonp',
		mimeType : 'image/png',
		success : function (response) {
			var models = [];
			for (obj in response.posts) {
				var model = new app.hf_model_face({
					hf_id : response.posts[obj].custom_fields.model_id[0],
					hf_gender : response.posts[obj].custom_fields.model_gender[0],
					hf_image_full : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.model_image_detail[0]) } )[0].url,
					hf_image_thumb : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.model_image_thumbnail[0]) } )[0].url
				});
				models.push(model);
			}
			models.sort(compareHairstyle);
			facesCollection = new app.hf_collection_faces (models);
			facesCollectionView = new app.hf_view_collection_faces( { collection : facesCollection } );
			$('#imageFace').css('background-image', 'url('+facesCollection.models[0].attributes.hf_image_full+')');
		},
		error : function (response) {

		}
	});
}
function requestHairstyles () {
	$.ajax({
		// url : baseURL + hairstyleUrlParameters+"&count=-1", 
		url : baseURL + hairstyleUrlParameters+'&order=desc&orderby=title&count=14&page='+curPage, 
		crossDomain : true,
		xhrFields : {
			withCredentials : true
		},
		headers: {
		     'Authorization': "Basic XXXXX"
		},
		type: "GET",
		dataType: 'jsonp',
		mimeType : 'image/png',
		success : function (response) {
			for (obj in response.posts) {
				var hairstyle = new app.hf_model_hairstyle ({
					hf_id : response.posts[obj].custom_fields.hairstyle_id[0],
					hf_gender : response.posts[obj].custom_fields.hairstyle_gender[0],
					hf_length : response.posts[obj].custom_fields.hairstyle_length[0],
					hf_texture : response.posts[obj].custom_fields.hairstyle_texture[0],
					hf_style : response.posts[obj].custom_fields.hairstyle_style[0],
					hf_imageThumbnail : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_thumbnail[0]) } )[0].url,
					hf_imageOriginal : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_original[0])} )[0].url,
					hf_imageGrayscale : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_grayscale[0]) } )[0].url					
				});
				hairstyles.push(hairstyle);
			}
			hairstyleCollection = new app.hf_collection_hairstyles(hairstyles);
			hairstyleCollectionView = new app.hf_view_collection_hairstyles( { collection : hairstyleCollection } );
			updateLeftPaneView();
			if (curPage == 1) {
				curHaircut = hairstyleCollection.models[0];
				curHaircutElement = $('.hf_collection_hairstyle div:first-child .hairstyleElementFilter').attr('id');
				imageHair.src = curHaircut.attributes.hf_imageOriginal;
				
			}
			$('#'+curHaircutElement).addClass('active');
			if (curPage < response.pages) {
				curPage++;
				requestHairstyles();
			}
		},
		error : function (response) {
			console.log(response);
		}
	});
}
function requestColors () {
	$.ajax({
		url : baseURL + colorUrlParameters+"&count=-1",
		crossDomain : true,
		xhrFields : {
			withCredentials : true
		},
		headers : {
		     'Authorization': "Basic XXXXX"
		},
		type : "GET",
		dataType : 'jsonp',
		mimeType : 'image/png',
		success : function (response) {
			var colors = [];
			for (obj in response.posts) {
				var color = new app.hf_model_color ({
					hf_color_name : response.posts[obj].custom_fields.color_name[0],
					hf_color_value : response.posts[obj].custom_fields.color_value[0]
				});
				colors.push(color);
			}
			colors.sort(compareColors);
			colorCollection = new app.hf_collection_colors(colors);
			colorCollectionHairView = new app.hf_view_collection_colors ( { collection : colorCollection } );
			colorCollectionHairView.setDisplayType(app.hf_color_display_type.HAIR);
			colorCollectionHighlightView = new app.hf_view_collection_colors ( { collection : colorCollection } );
			colorCollectionHighlightView.setDisplayType(app.hf_color_display_type.HIGHLIGHT);
			$('#bottomPane #bottomMenuColorSub').append(colorCollectionHairView.render().el);
			$('#bottomPane #bottomMenuColorSub').append(colorCollectionHighlightView.render().el);
		}
	});
}

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
	console.log('rendering bottom menu');
	var menuContent = $('<div id="accountMenu"></div>');
	var accountSignedOut = $('<form class="accountMenu accountSignedOut">Please enter your account info<br/>Email:<br/><input id="hf_signedOutEmail" type="text"><br/>Password:<br/><input id="hf_signedOutPassword" type="text"><br/><input id="hf_signedOutRememberMe" name="rememberMe" type="checkbox"><br/><input id="hf_signedOutSignIn" name="signIn" type="submit"><br/><input id="hf_signedOutForgotPassword" name="forgotPassword" type="submit"><br/><input id="hf_signedOutRegister" name="register" type="submit"></form>');
	var accountSignedIn = $('<form class="accountMenu accountSignedIn">Update your account settings<br/>Password:<br/><input id="hf_signedInPassword" type="text"><br/><input id="hf_signedInPasswordConfirm" type="text"><br/><select id="hf_signedInGender"><option id="hf_signedInGender_Female">Female</option><option id="hf_signedInGender_Male">Male</option></select><br/><input id="hf_signedInUpdate" type="submit"><br/><input id="hf_signedInSignOut" type="submit"><br/><input id="hf_signedInDelete" type="submit"></form>');
	var accountRegister = $('<form class="accountMenu accountRegister">Please fill out the form below to register your account:<br/><input id="hf_registerEmail" type="text"><br/><input id="hf_registerPassword" type="text"><br/><input id="hf_registerPasswordConfirm" type="text"><br/><input id="hf_registerGender"><option id="hf_registerGender_Female">Female</option><option id="hf_registerGender_Male">Male</option></select><br/><input id="hf_registerSubmit" type="submit"></form>');
	var accountDelete = $('<form class="accountMenu accountDelete">Are you sure you want to delete your account?<br/><input id="hf_deleteYes" type="submit"><br/><input id="hf_deleteNo" type="submit"></form>');
	var accountForgot = $('<form class="accountMenu accountForgot">Enter the email connected to your account below, and we\'ll email you your password<br/><input id="hf_forgotEmail" type="text"><br/><input id="hf_forgotConfrom" type="text"></form>');

	menuContent.append(accountSignedOut);
	menuContent.append(accountSignedIn);
	menuContent.append(accountRegister);
	menuContent.append(accountDelete);
	menuContent.append(accountForgot);
	console.log(menuContent);
	$('.bottomMenuSubWrapper').append(menuContent);

	// accountModel.constructor.template;
	// accountModelView;
	// bottomMenuItem4.template
	// _.template( $('#hf_faceElement').html() ),

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
function colorizeHair () {
	displayContext.clearRect(0,0, display.width, display.height);
	var tintCanvas = document.createElement('canvas');
	tintCanvas.width = display.width;
	tintCanvas.height = display.height;
	var tintCtx = tintCanvas.getContext('2d');

	tintCtx.fillStyle = curColor;
    tintCtx.fillRect(0,0,tintCanvas.width,tintCanvas.height);
    tintCtx.globalCompositeOperation = "destination-atop";
    tintCtx.drawImage(imageHair, 0, 0);
    displayContext.globalAlpha = 1;
    displayContext.drawImage(imageHair, 0, 0);
    displayContext.globalAlpha = 0.25;
	displayContext.drawImage(tintCanvas, 0, 0);	
}

function compareHairstyle(a,b) {
  if (a.attributes.hf_id < b.attributes.hf_id)
     return -1;
  if (a.attributes.hf_id > b.attributes.hf_id)
    return 1;
  return 0;
}
function compareColors(a,b) {
  // if (a.attributes.hf_id < b.attributes.hf_id)
  //    return -1;
  // if (a.attributes.hf_id > b.attributes.hf_id)
  //   return 1;
  // return 0;
}