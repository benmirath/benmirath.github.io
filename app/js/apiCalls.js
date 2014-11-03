// AJAX PARAMETERS
var baseURL 							= 'http://hairstyler.fabraz.com/';
var hairstyleUrlParameters 				= 'api/get_posts/?post_type=hairstyle&include=id,attachments,custom_fields';
var faceUrlParameters 					= 'api/get_posts/?post_type=model&include=id,attachments,custom_fields';
var colorUrlParameters 					= 'api/get_posts/?post_type=color&include=id,custom_fields';

var userAuthenticationNonceRegister		= 'api/get_nonce/?controller=user&method=register';
var userAuthenticationNonceCookie		= 'api/get_nonce/?controller=user&method=generate_auth_cookie';
var userAuthenticationCookieParameters 	= 'api/user/generate_auth_cookie/';
var userGetMetaURL						= 'api/user/get_user_meta/';
var userSetMetaURL						= 'api/user/update_user_meta/';
// var userRegistrationParameters			= 'api/user/register/?'
var userRegistrationParameters			= 'api/hairstyle/custom_register/'
var userDeletionParameters				= 'api/hairstyle/delete_account/';
var curUser;
var curUserMeta;
var curCookie;
var curNonce;

var testData;

// API/BACKEND QUERIES
function requestUserAuthentication () {
	// if(typeof(Storage) !== "undefined" && 
	// 	localStorage.rememberMe !== '' && 
	// 	localStorage.rememberMe !== '') {
	// 		login_email = localStorage.email;
	// 		login_password = localStorage.password;
	// } else {
		login_email = $('#hf_signedOutEmail').val();
		login_password = $('#hf_signedOutPassword').val();
	// }

	$.ajax({
		url : baseURL + userAuthenticationNonceCookie,
		type: "POST",
		dataType: 'json',
		success : function (response) {
			console.log(response);
			var _nonce = response.nonce;
			curNonce = _nonce;
			$.ajax({
				url : baseURL + userAuthenticationCookieParameters,
				data : {
					nonce : _nonce,
					username : login_email,
					password : login_password
				},
				success : function (data1) {
					testData = data1;
					if (data1.error) {
						alert ("1: "+data1.error);
					} else {
						curUser = data1.user;
						curCookie = data1.cookie;
						$.ajax({
							url : baseURL + userGetMetaURL,
							type : 'POST',
							data : {
								cookie : curCookie,
								meta_key : 'gender'
							},
							success : function (data2) {
								curUserMeta = data2;
							}
						});
						signedIn = true;
						$('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
						$('.accountSignedIn').addClass('active');
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
			console.log("Error");
			console.log(response);
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
				console.log("Success");
				console.log(response);
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
							$('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
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
				console.log("Error");
				console.log(response);
			}
		});	
	} else {
		alert ("Please make sure that both password fields match.");
		$('#hf_registerPassword').css('border-color', '#ff0000');
    	$('#hf_registerPasswordConfirm').css('border-color', '#ff0000');
	}
}

function requestUserDeletion () {
	$.ajax ({
		url : baseURL + userAuthenticationNonceCookie,
		success : function (data) {
			console.log(data);
			var nonce = data.nonce;
			$.ajax({
				type : 'POST',
				url : baseURL + "api/hairstyle/delete_account/?cookie="+curCookie+"&user_id="+curUser.id,
				// url : baseURL + "api/hairstyle/delete_account/?cookie="+curCookie,
				success : function (data) {
					console.log("Yup");
					console.log(baseURL + "api/hairstyle/delete_account/?cookie="+curCookie+"&user_id="+curUser.id);
					console.log(data);
					signedIn = false;
					localStorage.email = '';
					localStorage.password = '';
					$('.bottomMenuSub .accountMenu.active').each ( function () { $(this).removeClass('active'); } );
					$('.accountSignedOut').addClass('active');
				}, 
				error : function () {
					console.log("Nope");
					console.log(data);
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
					hf_imageGrayscale : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_grayscale[0]) } )[0].url,
					hf_imageHighlight : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_highlight[0]) } )[0].url					
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
					hf_color_value : response.posts[obj].custom_fields.color_value[0],
					hf_color_categoryName : response.posts[obj].custom_fields.color_category[0]
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