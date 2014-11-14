// AJAX PARAMETERS
var baseURL 							= 'http://hairstyler.fabraz.com/';
var postRequestURL 						= 'api/get_posts/';
var userAuthenticationNonceRegister		= 'api/get_nonce/?controller=user&method=register';
var userAuthenticationNonceCookie		= 'api/get_nonce/?controller=user&method=generate_auth_cookie';
var userAuthenticationCookieParameters 	= 'api/user/generate_auth_cookie/';
var userGetMetaURL						= 'api/user/get_user_meta/';
var userSetMetaURL						= 'api/user/update_user_meta/';
var userForgotPasswordURL				= 'api/user/retrieve_password/';
var userSetPassword						= 'api/hairstyle/update_password/';

var userRegistrationParameters			= 'api/hairstyle/custom_register/';
var userDeletionParameters				= 'api/hairstyle/delete_account/';
var curUser;
var curUserMeta;
var curCookie;
var curNonce;

var testData;

// API/BACKEND QUERIES
function requestUserAuthentication () {
	if(login_email != undefined && login_password != undefined) {
		// console.log("user auth 1");

	} else if ((localStorage.email != '' && localStorage.password != '') 
		&& (localStorage.email != null && localStorage.password != null)
		&& (localStorage.email != undefined && localStorage.password != undefined)) {
		// console.log("user auth 2");
		login_email = localStorage.email;
		login_password = localStorage.password;
	} else {
		// console.log("user auth 3");
		login_email = $('#hf_signedOutEmail').val();
		login_password = $('#hf_signedOutPassword').val();	
	}

	
	$.ajax({
		url : baseURL + userAuthenticationNonceCookie,
		type: "POST",
		dataType: 'json',
		success : function (response) {
			// console.log(response);
			var _nonce = response.nonce;
			curNonce = _nonce;
			$.ajax({
				url : baseURL + userAuthenticationCookieParameters,
				data : {
					nonce : _nonce,
					email : login_email,
					username : login_email,
					password : login_password
				},
				success : function (data1) {
					// testData = data1;
					if (data1.error) {
						alert ("1: "+data1.error);
					} else {
						curUser = data1.user;
						curCookie = data1.cookie;
						requestUserMeta();
						$('.bottomMenuSub .accountMenu.active').each ( function () { 
							$(this).removeClass('active'); 
						});
						$('.accountSignedIn').addClass('active');
						// $.ajax({
						// 	url : baseURL + userGetMetaURL,
						// 	type : 'POST',
						// 	data : {
						// 		cookie : curCookie,
						// 		meta_key : 'gender'
						// 	},
						// 	success : function (data2) {
						// 		curUserMeta = data2;
						// 	}
						// });
						// signedIn = true;
						// $('.bottomMenuSub .accountMenu.active').each ( function () { 
						// 	$(this).removeClass('active'); 
						// });
						// $('.accountSignedIn').addClass('active');
					}
				},
				error : function (data) {
					signedIn = false;
					testData = data;
					alert ("2: "+data.error);
				}
			});
		},
		error : function (response) {
			// console.log("Error");
			// console.log(response);
		}
	});	
}
function requestUserMeta () {
	$.ajax({
		url : baseURL + userGetMetaURL,
		type : 'POST',
		data : {
			cookie : curCookie
			// meta_key : 'gender'
		},
		success : function (data2) {
			curUserMeta = data2;
			signedIn = true;
		}
	});
	
}

function requestUserRegistration () {
	var desiredEmail = $('#hf_registerEmail').val();
	var desiredPassword = $('#hf_registerPassword').val();
	var confirmPassword = $('#hf_registerPasswordConfirm').val();
	var desiredGender = $('#hf_registerGender').val();

	if (desiredPassword === confirmPassword) {
		login_email = desiredEmail;
		login_password = desiredPassword;
		$.ajax({
			url : baseURL + userAuthenticationNonceRegister,
			type: "POST",
			dataType: 'json',
			success : function (response) {
				// console.log("Success");
				// console.log(response);
				var _nonce = response.nonce;
				$.ajax({
					url : baseURL + userRegistrationParameters,
					type: "POST",
					data : {
						nonce : _nonce,
						username : login_email,
						email : login_email,
						display_name : login_email,
						password : login_password,
						gender : desiredGender
					},
					success : function (data) {
						if (data.error) {
							// Expand based on what the factors of the errors were
							alert (data.error);
						} else {
							requestUserAuthentication();
							$('.bottomMenuSub .accountMenu.active').each ( 
								function () { $(this).removeClass('active'); 
							});
							$('.accountSignedIn').addClass('active');
						}
					},
					error : function (data) {
						signedIn = false;
						console.log(data);
						console.log(baseURL + userRegistrationParameters+'username=' + login_email + '&password=' +  login_password);
					}
				});
			},
			error : function (response) {
				// console.log("Error");
				// console.log(response);
			}
		});	
	} else {
		alert ("Please make sure that both password fields match.");
	}
}
function requestLostPassword () {
	$.ajax({
		url : baseURL + userForgotPasswordURL,
		data : {
			user_login : $('#hf_forgotEmail').val()
		},
		type : 'POST',
		success : function (data) {
			// console.log(data);
		},
		error : function (data) {
			// console.log("AJAX error: lost password failure");
			// console.log(data);
		}
	});
}
function requestUserDeletion () {
	$.ajax ({
		url : baseURL + userAuthenticationNonceCookie,
		success : function (data) {
			// console.log(data);
			var nonce = data.nonce;
			$.ajax({
				url : baseURL + userDeletionParameters,
				data : {
					cookie : curCookie,
					user_id : curUser.id
				},
				type : 'POST',
				success : function (data) {
					signedIn = false;
					localStorage.email = '';
					localStorage.password = '';
					$('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
					$('.accountSignedOut').addClass('active');
				}, 
				error : function () {
					// console.log("Nope");
					// console.log(data);
				}
			});
		}
	});
}

function requestUpdateGender () {
	var desiredGender = $('#hf_signedInGender').val();
	$.ajax({
		url : baseURL + userSetMetaURL,
		type : 'POST',
		data : {
			cookie : curCookie,
			meta_key : 'gender',
			meta_value : desiredGender
		},
		success : function (data2) {
			alert ("Gender changed to "+desiredGender+".");
		}
	});
}
function requestUpdateCustomPhoto () {
	var desiredGender = $('#hf_signedInGender').val();
	$.ajax({
		url : baseURL + userSetMetaURL,
		type : 'POST',
		data : {
			cookie : curCookie,
			meta_key : 'customPhoto',
			meta_value : customPhoto_dataURI
		},
		success : function (data2) {
			curUserMeta.customPhoto[0] = customPhoto_dataURI;
			renderCustomFaceView_SignedIn_Photo();
			// alert ("Gender changed to "+desiredGender+".");
		}
	});
}
function requestUpdatePassword () {
	var desiredPassword = $('#hf_signedInPassword').val();
	var confirmPassword = $('#hf_signedInPasswordConfirm').val();
	if (desiredPassword === confirmPassword) {
		$.ajax({
			url : baseURL + userSetPassword,
			type : 'POST',
			data : {
				cookie : curCookie,
				user_id : curUser.id,
				password : desiredPassword
			},
			success : function (data) {
				// console.log(data);
				alert ("Password has been successfully changed!");
			},
			error : function (data) {
				// console.log(data);
			}
		});
	} else {
		alert ("Please make sure that both password fields match.");
	}
}

function requestFaces () {
	$.ajax({
		url : baseURL + postRequestURL,
		data : {
			post_type : "model",
			include : "id,attachments,custom_fields",
			count : -1
		},
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
			$('#imageFace').attr('src', facesCollection.models[0].attributes.hf_image_full);
		},
		error : function (response) {

		}
	});
}
function requestHairstyles () {
	$.ajax({
		url : baseURL + postRequestURL, 
		data : {
			post_type : 'hairstyle',
			includ : 'id, attachments, custom_fields',			// Sooooo, for some reason, this parameter needs to be misspelled. Which is F#$%ing dumb.
			order : 'desc',
			orderby : 'title',
			count : 14,
			page : curPage
		},
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

				var dest;
				if (response.posts[obj].custom_fields.hairstyle_web_page_link !== undefined)
					dest = response.posts[obj].custom_fields.hairstyle_web_page_link[0];
				else
					dest = 'http://www.hairfinder.com';

				var hairstyle = new app.hf_model_hairstyle ({
					hf_id : response.posts[obj].custom_fields.hairstyle_id[0],
					hf_gender : response.posts[obj].custom_fields.hairstyle_gender[0],
					hf_length : response.posts[obj].custom_fields.hairstyle_length[0],
					hf_texture : response.posts[obj].custom_fields.hairstyle_texture[0],
					hf_style : response.posts[obj].custom_fields.hairstyle_style[0],
					hf_imageThumbnail : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_thumbnail[0]) } )[0].url,
					hf_imageOriginal : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_original[0])} )[0].url,
					hf_imageGrayscale : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_grayscale[0]) } )[0].url,
					hf_imageHighlight : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_highlight[0]) } )[0].url,
					hf_url : dest
				});
				hairstyles.push(hairstyle);
			}
			hairstyleCollection = new app.hf_collection_hairstyles(hairstyles);
			hairstyleCollectionView = new app.hf_view_collection_hairstyles( { collection : hairstyleCollection } );
			if (topMenu.models[0].attributes.hf_buttonActive === false) updateLeftPaneView();
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
			// console.log(response);
		}
	});
}
function requestLanguages () {
	$.ajax({
		url : baseURL + postRequestURL,
		type : 'POST',
		data : {
			post_type : "language",
			include : "id,custom_fields",
			count : -1
		},
		dataType : 'jsonp',
		success : function (response) {
			console.log('SUCCESS');
			console.log(bottomMenu_save);
			console.log(response);
			languageModel = response;
			var languages = [];
			for (var obj in response.posts) {
				// console.log(response.posts[obj].bottom_menu__save__save_button[0]);
				// console.log(response.posts[obj]);

				var language = new app.hf_model_language ({
					hf_language_name : response.posts[obj].custom_fields.language_name[0],
					hf_language_strings : {
						topMenu_model_header : response.posts[obj].custom_fields.top_menu__model__header[0],
						topMenu_model_subHeader1 : response.posts[obj].custom_fields.top_menu__model__subheader1[0],
						topMenu_model_subHeader2 : response.posts[obj].custom_fields.top_menu__model__subheader2[0],
						topMenu_model_subHeader3 : response.posts[obj].custom_fields.top_menu__model__subheader3[0],
						//Custom Face Menu Content
						topMenu_model_subHeader3_signedOut_body : response.posts[obj].custom_fields.top_menu__model__subheader3__signed_out__body[0],
						topMenu_model_subHeader3_noPhoto_body : response.posts[obj].custom_fields.top_menu__model__subheader3__no_photo__body[0],
						topMenu_model_subHeader3_takePhoto_body : response.posts[obj].custom_fields.top_menu__model__subheader3__take_photo__body[0],
						topMenu_model_subheader3_photo_header1 : response.posts[obj].custom_fields.top_menu__model__subheader3__photo__header1[0],
						topMenu_model_subheader3_photo_body1 : response.posts[obj].custom_fields.top_menu__model__subheader3__photo__body1[0],
						topMenu_model_subheader3_photo_header2 : response.posts[obj].custom_fields.top_menu__model__subheader__photo__header2[0],
						topMenu_model_subheader3_photo_header3 : response.posts[obj].custom_fields.top_menu__model__subheader3__photo__header3[0],
						topMenu_model_subheader3_reset : response.posts[obj].custom_fields.top_menu__model__subheader3__reset[0],
						topMenu_model_subHeader3_upload : response.posts[obj].custom_fields.top_menu__model__subheader3__upload[0],
						topMenu_model_subHeader3_capture : response.posts[obj].custom_fields.top_menu__model__subheader3__capture[0],
						topMenu_model_subHeader3_snap : response.posts[obj].custom_fields.top_menu__model__subheader3__snap[0],
						topMenu_style_header : response.posts[obj].custom_fields.top_menu__style__header[0],
						topMenu_style_subHeader1 : response.posts[obj].custom_fields.top_menu__style__subheader1[0],
						topMenu_style_subHeader2 : response.posts[obj].custom_fields.top_menu__style__subheader2[0],
						topMenu_style_subHeader3 : response.posts[obj].custom_fields.top_menu__style__subheader3[0],
						topMenu_length_header : response.posts[obj].custom_fields.top_menu__length__header[0],
						topMenu_length_subHeader1 : response.posts[obj].custom_fields.top_menu__length__subheader1[0],
						topMenu_length_subHeader2 : response.posts[obj].custom_fields.top_menu__length__subheader2[0],
						topMenu_length_subHeader3 : response.posts[obj].custom_fields.top_menu__length__subheader3[0],
						topMenu_length_subHeader4 : response.posts[obj].custom_fields.top_menu__length__subheader4[0],
						topMenu_length_subHeader5 : response.posts[obj].custom_fields.top_menu__length__subheader5[0],
						topMenu_texture_header : response.posts[obj].custom_fields.top_menu__texture__header[0],
						topMenu_texture_subHeader1 : response.posts[obj].custom_fields.top_menu__texture__subheader1[0],
						topMenu_texture_subHeader2 : response.posts[obj].custom_fields.top_menu__texture__subheader2[0],
						topMenu_texture_subHeader3 : response.posts[obj].custom_fields.top_menu__texture__subheader3[0],
						topMenu_texture_subHeader4 : response.posts[obj].custom_fields.top_menu__texture__subheader4[0],

						bottomMenu_colors : response.posts[obj].custom_fields.bottom_menu__colors__header[0],
						bottomMenu_save : response.posts[obj].custom_fields.bottom_menu__save__header[0],
						bottomMenu_save_saveButton : response.posts[obj].custom_fields.bottom_menu__save__save_button[0],
						bottomMenu_save_printButton : response.posts[obj].custom_fields.bottom_menu__save__print[0],
						bottomMenu_language : response.posts[obj].custom_fields.bottom_menu__language__header[0],
						bottomMenu_language_header : response.posts[obj].custom_fields.bottom_menu__language__subheader[0],
						bottomMenu_account : response.posts[obj].custom_fields.bottom_menu__account__header[0],
						//Account Menu
						bottomMenu_account_signedOut_header : response.posts[obj].custom_fields.bottom_menu__account__signed_out__header[0],
						bottomMenu_account_signedIn_header : response.posts[obj].custom_fields.bottom_menu__account__signed_in__header[0],
						bottomMenu_account_register_header : response.posts[obj].custom_fields.bottom_menu__account__register__header[0],
						bottomMenu_account_delete_header : response.posts[obj].custom_fields.bottom_menu__account__delete__header[0],
						bottomMenu_account_remember_header : response.posts[obj].custom_fields.bottom_menu__account__remember__header[0],
						bottomMenu_account_fieldEmail : response.posts[obj].custom_fields.bottom_menu__account__field__email[0],
						bottomMenu_account_fieldPassword : response.posts[obj].custom_fields.bottom_menu__account__field__password[0],
						bottomMenu_account_fieldPasswordConfirm : response.posts[obj].custom_fields.bottom_menu__account__field__passwordconfirm[0],
						bottomMenu_account_checkRemember : response.posts[obj].custom_fields.bottom_menu__account__check__remember[0],
						bottomMenu_account_buttonSignIn : response.posts[obj].custom_fields.bottom_menu__account__button__sign_in[0],
						bottomMenu_account_buttonSignOut : response.posts[obj].custom_fields.bottom_menu__account__button__sign_out[0],
						bottomMenu_account_buttonForgot : response.posts[obj].custom_fields.bottom_menu__account__button__forgot[0],
						bottomMenu_account_buttonSend : response.posts[obj].custom_fields.bottom_menu__account__button__send_new_password[0],
						bottomMenu_account_buttonRegister : response.posts[obj].custom_fields.bottom_menu__account__button__register[0],
						bottomMenu_account_buttonDelete : response.posts[obj].custom_fields.bottom_menu__account__button__delete[0],
						bottomMenu_account_buttonUpdate : response.posts[obj].custom_fields.bottom_menu__account__button__update[0],
						bottomMenu_account_buttonYes : response.posts[obj].custom_fields.bottom_menu__account__button__yes[0],
						bottomMenu_account_buttonNo : response.posts[obj].custom_fields.bottom_menu__account__button__no[0],
						bottomMenu_account_selectGender : response.posts[obj].custom_fields.bottom_menu__account__select_gender__header[0],
						bottomMenu_account_selectGender_female : response.posts[obj].custom_fields.bottom_menu__account__select_gender__female[0],
						bottomMenu_account_selectGender_male : response.posts[obj].custom_fields.bottom_menu__account__select_gender__male[0],
						bottomMenu_account_selectLanguage : response.posts[obj].custom_fields.bottom_menu__account__selectlanguage__header[0],
						//Errors
						errorMessage_general : response.posts[obj].custom_fields.error_message__general[0],
						errorMessage_changeGender : response.posts[obj].custom_fields.error_message__change_gender[0],
						errorMessage_passwordFieldMatch : response.posts[obj].custom_fields.error_message__password_fields_match[0]
					}

				});
				// console.log(language);
				languages.push(language);
				// languageModels.push(language);



				


			}
			languageCollection = new app.hf_collection_languages(languages);
			languageCollectionView = new app.hf_view_collection_languages ( { collection : languageCollection } );
			// $('#bottomPane #bottomMenuLanguageSub').append(languageCollectionView.render().el);
			var languageWrapper = $('<div id="languageWrapper"></div>');
			languageWrapper.append(languageCollectionView.render().el);
			
			$('#bottomPane #bottomMenuLanguageSub').prepend($('<h2 id="language_header">Choose your language</h2>'));
			$('#bottomPane #bottomMenuLanguageSub').append(languageWrapper);
		}
	});
}

function requestColors () {
	$.ajax({
		url : baseURL + postRequestURL,
		data : {
			post_type : "color",
			include : "id,custom_fields",
			count : -1
		}, 
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
				var blend;
				if (response.posts[obj].custom_fields.color_blend_type)
					blend = response.posts[obj].custom_fields.color_blend_type[0];
				else
					blend = 'overlay';

				var color = new app.hf_model_color ({
					hf_color_name : response.posts[obj].custom_fields.color_name[0],
					hf_color_value : response.posts[obj].custom_fields.color_value[0],
					hf_color_categoryName : response.posts[obj].custom_fields.color_category[0],
					hf_blend_type : blend
					// hf_blend_type : response.posts[obj].custom_fields.color_blend_type[0]
				});
				switch (color.attributes.hf_color_categoryName) {
					case "Black":
						color.attributes.hf_color_categoryIndex = 0;
						break;
					case "Brown":
						color.attributes.hf_color_categoryIndex = 1;
						break;
					case "Auburn":
						color.attributes.hf_color_categoryIndex = 2;
						break;
					case "Red":
						color.attributes.hf_color_categoryIndex = 3;
						break;
					case "Blond":
						color.attributes.hf_color_categoryIndex = 4;
						break;
					case "Grey":
						color.attributes.hf_color_categoryIndex = 5;
						break;
					case "Special":
						color.attributes.hf_color_categoryIndex = 6;
						break;
				}
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