// APP MENU OPTIONS
app.hf_menu_option = {
	MODEL : "Model",
	STYLE : "Style",
	LENGTH : "Length",
	TEXTURE : "Texture"
};
app.hf_model_option = {
	FEMALE : "Female",
	MALE : "Male",
	YOU : "Your face"
};
app.hf_style_option = {
	ALL : "All",
	SALON : "Salon",
	CELEBRITY : "Celebrity"
};
app.hf_length_option = {
	ALL : "All",
	SHORT : "Short",
	MEDIUM : "Medium",
	LONG : "Long",
	UPDO : "Updo"
};
app.hf_texture_option = {
	ALL : "All",
	STRAIGHT : "Straight",
	WAVY : "Wavy",
	CURLY : "Curly"
};
app.hf_bottom_menu_option = {
	HAIR_COLOR : "Hair Colors",
	LANGUAGE : "Language",
	SAVE_SHARE : "Save/Share ",
	ACCOUNT : "Account"
};

var DEBUG = false;

var baseURL 				= 'http://hairstyler.fabraz.com/';
var hairstyleUrlParameters 	= '?json=get_posts&post_type=hairstyle&include=id,attachments,custom_fields';
var faceUrlParameters 		= '?json=get_posts&post_type=model&include=id,attachments,custom_fields';
var colorUrlParameters 		= '?json=get_posts&post_type=color&include=id,custom_fields';

var hairstyleCollection;
var hairstyleCollectionView;
var facesCollection;
var facesCollectionView;
var colorCollection;
var colorCollectionHairView;
var colorCollectionHighlightView;

var topMenuItem1 	= new app.hf_model_topMenuItem ( { hf_buttonName : app.hf_menu_option.MODEL, hf_buttonID : "topMenuModel", hf_buttonSubMenu : [app.hf_model_option.FEMALE, app.hf_model_option.MALE, app.hf_model_option.YOU] } );
var topMenuItem2 	= new app.hf_model_topMenuItem ( { hf_buttonName : app.hf_menu_option.STYLE, hf_buttonID : "topMenuStyle", hf_buttonSubMenu : [app.hf_style_option.ALL, app.hf_style_option.SALON, app.hf_style_option.CELEBRITY] } );
var topMenuItem3 	= new app.hf_model_topMenuItem ( { hf_buttonName : app.hf_menu_option.LENGTH, hf_buttonID : "topMenuLength", hf_buttonSubMenu : [app.hf_length_option.ALL, app.hf_length_option.SHORT, app.hf_length_option.MEDIUM, app.hf_length_option.LONG, app.hf_length_option.UPDO] } );
var topMenuItem4 	= new app.hf_model_topMenuItem ( { hf_buttonName : app.hf_menu_option.TEXTURE, hf_buttonID : "topMenuTexture", hf_buttonSubMenu : [app.hf_texture_option.ALL, app.hf_texture_option.STRAIGHT, app.hf_texture_option.WAVY, app.hf_texture_option.CURLY] } );
var topMenu 		= new app.hf_collection_topMenu ( [topMenuItem1, topMenuItem2, topMenuItem3, topMenuItem4] );
var topMenuView 	= new app.hf_view_collection_topMenu({ collection : topMenu });

var bottomMenuItem1 = new app.hf_model_bottomMenuItem ( { hf_buttonName : app.hf_bottom_menu_option.HAIR_COLOR, hf_buttonID : "bottomMenuColor" } );
var bottomMenuItem2 = new app.hf_model_bottomMenuItem ( { hf_buttonName : app.hf_bottom_menu_option.SAVE_SHARE, hf_buttonID : "bottomMenuSave" } );
var bottomMenuItem3 = new app.hf_model_bottomMenuItem ( { hf_buttonName : app.hf_bottom_menu_option.LANGUAGE, hf_buttonID : "bottomMenuLanguage" } );
var bottomMenuItem4 = new app.hf_model_bottomMenuItem ( { hf_buttonName : app.hf_bottom_menu_option.ACCOUNT, hf_buttonID : "bottomMenuAccount" } );
var bottomMenu 		= new app.hf_collection_bottomMenu ( [bottomMenuItem1, bottomMenuItem2, bottomMenuItem3, bottomMenuItem4] );
var bottomMenuView 	= new app.hf_view_collection_bottomMenu( { collection : bottomMenu } );


var display;
var displayContext;

var imgHair;
var colorize = false;
var curHaircut;
var curHaircutElement;
var curColor = '';

var testObj;



// main image loaded ?
$(document).ready(function(){
	display = document.getElementById('displayPane');
	displayContext = display.getContext('2d');

	// $(document).bind( "contextmenu", function(e) {	return false; } );

	// $('#imageFace').on('load', function(){
	//   	$('#imageLoad').hide();
	//   	$('#imageFace').css('background-image', 'url(' + $('#imageHair').attr('src') + ')');
	//   	$('#imageFace').attr('src', '');		
	// });

	var fieldString = '';
	$('#topPane').html(topMenuView.render().el);
	$('#bottomPane').html(bottomMenuView.render().el);

	requestFaces();
	requestHairstyles();
	requestColors();
	// $.ajax({
	// 	// url : baseURL + hairstyleUrlParameters+"&count=-1", 
	// 	url : baseURL + hairstyleUrlParameters+'&order=desc&orderby=title', 
	// 	crossDomain : true,
	// 	xhrFields : {
	// 		withCredentials : true
	// 	},
	// 	headers: {
	// 	     'Authorization': "Basic XXXXX"
	// 	},
	// 	type: "GET",
	// 	dataType: 'jsonp',
	// 	mimeType : 'image/png',
	// 	success : function (response) {
	// 		testObj = response;
	// 		console.log(response);
	// 		console.timeEnd("hairstyle");
	// 		console.time("hairstyleRender");
	// 		var hairstyles = [];
	// 		for (obj in response.posts) {
	// 			var hairstyle = new app.hf_model_hairstyle ({
	// 				hf_id : response.posts[obj].custom_fields.hairstyle_id[0],
	// 				hf_gender : response.posts[obj].custom_fields.hairstyle_gender[0],
	// 				hf_length : response.posts[obj].custom_fields.hairstyle_length[0],
	// 				hf_texture : response.posts[obj].custom_fields.hairstyle_texture[0],
	// 				hf_style : response.posts[obj].custom_fields.hairstyle_style[0],
	// 				hf_imageThumbnail : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_thumbnail[0]) } )[0].url,
	// 				hf_imageOriginal : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_original[0])} )[0].url,
	// 				hf_imageGrayscale : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.hairstyle_image_grayscale[0]) } )[0].url					
	// 			});
	// 			hairstyles.push(hairstyle);
	// 		}
	// 		hairstyles.sort(compareHairstyle);
	// 		hairstyleCollection = new app.hf_collection_hairstyles(hairstyles);
	// 		hairstyleCollectionView = new app.hf_view_collection_hairstyles( { collection : hairstyleCollection } );
	// 		hairstyleCollectionView.collection = new app.hf_collection_hairstyles(hairstyleCollection.where( { hf_gender : "female" } ));
	// 		console.timeEnd("hairstyleRender");
	// 		$('#leftPane').html(hairstyleCollectionView.render().el);

	// 		$('.hf_collection_hairstyle div:first-child .hairstyleElementFilter').addClass('active');
	// 		curHaircut = hairstyleCollection.models[0];
	// 		imageHair = new Image();
	// 		imageHair.src = hairstyleCollection.models[0].attributes.hf_imageOriginal
	// 		imageHair.onload = function () {
	// 			$('#imageLoad').hide();
	// 			if (colorize == true) {
	// 		  		colorizeHair();
	// 			} else {
	// 				displayContext.clearRect(0,0, display.width, display.height);
	// 				displayContext.globalAlpha = 1;
	// 				displayContext.drawImage(imageHair, 0, 0);
	// 			}
	// 		};
	// 	},
	// 	error : function (response) {
	// 		console.log(response);
	// 	}
	// });
	// $.ajax({
	// 	url : baseURL + colorUrlParameters+"&count=-1",
	// 	crossDomain : true,
	// 	xhrFields : {
	// 		withCredentials : true
	// 	},
	// 	headers : {
	// 	     'Authorization': "Basic XXXXX"
	// 	},
	// 	type : "GET",
	// 	dataType : 'jsonp',
	// 	mimeType : 'image/png',
	// 	success : function (response) {
	// 		var colors = [];
	// 		for (obj in response.posts) {
	// 			var color = new app.hf_model_color ({
	// 				hf_color_name : response.posts[obj].custom_fields.color_name[0],
	// 				hf_color_value : response.posts[obj].custom_fields.color_value[0]
	// 			});
	// 			colors.push(color);
	// 		}
	// 		colors.sort(compare);
	// 		colorCollection = new app.hf_collection_colors(colors);
	// 		colorCollectionHairView = new app.hf_view_collection_colors ( { collection : colorCollection } );
	// 		colorCollectionHairView.setDisplayType(app.hf_color_display_type.HAIR);
	// 		colorCollectionHighlightView = new app.hf_view_collection_colors ( { collection : colorCollection } );
	// 		colorCollectionHighlightView.setDisplayType(app.hf_color_display_type.HIGHLIGHT);
	// 		$('#bottomPane #bottomMenuColorSub').append(colorCollectionHairView.render().el);
	// 		$('#bottomPane #bottomMenuColorSub').append(colorCollectionHighlightView.render().el);
	// 	}
	// });
	// var hairstyleRouter = new app.Router();
	// Backbone.history.start();
});

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
			console.log(response);
			var models = [];
			for (obj in response.posts) {
				var model = new app.hf_model_face({
					hf_id : response.posts[obj].custom_fields.model_id[0],
					hf_gender : response.posts[obj].custom_fields.model_gender[0],
					hf_image_full : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.model_image_detail[0]) } )[0].url,
					hf_image_thumb : _.where( response.posts[obj].attachments, { id : parseInt(response.posts[obj].custom_fields.model_image_thumbnail[0]) } )[0].url
				});
				models.push(model);
				console.log("success: "+obj);
			}
			models.sort(compareHairstyle);
			facesCollection = new app.hf_collection_faces (models);
			facesCollectionView = new app.hf_view_collection_faces( { collection : facesCollection } );
			$('#imageFace').css('background-image', 'url('+facesCollection.models[0].attributes.hf_image_full+')');
		},
		error : function (response) {
			console.log("error");
			console.log(response)
		}
	});
}

var curPage = 1;
var totalPages = 0;
var hairstyles = [];
hairstyleCollection = new app.hf_collection_hairstyles();
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
			// hairstyleCollection = new app.hf_collection_hairstyles(hairstyles);
			hairstyleCollection = new app.hf_collection_hairstyles(hairstyles);
			hairstyleCollectionView = new app.hf_view_collection_hairstyles( { collection : hairstyleCollection } );
			// hairstyleCollectionView.collection = new app.hf_collection_hairstyles(hairstyleCollection.where( { hf_gender : "female" } ));
			// hairstyleCollectionView.collection = new app.hf_collection_hairstyles( hairstyleCollection.where ( { hf_gender : "female" } ) );
			// $('#leftPane').html(hairstyleCollectionView.render().el);
			updateLeftPaneView();
			if (curPage == 1) {
				$('.hf_collection_hairstyle div:first-child .hairstyleElementFilter').addClass('active');
				curHaircut = hairstyleCollection.models[0];
				imageHair = new Image();
				imageHair.src = hairstyleCollection.models[0].attributes.hf_imageOriginal
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
			colors.sort(compare);
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


function updateLeftPaneView () {
	var queryObj = {}
	if (topMenu.models[0].attributes.hf_buttonActive) {
		queryObj = { hf_gender : topMenu.models[0].attributes.hf_buttonSubMenu[topMenu.models[0].attributes.hf_buttonSubState].toLowerCase() }
		facesCollectionView.collection = new app.hf_collection_faces(facesCollection.where(queryObj));
		$('#leftPane').empty().html(facesCollectionView.render().el);
	}
	else {
		queryObj.hf_gender = topMenu.models[0].attributes.hf_buttonSubMenu[topMenu.models[0].attributes.hf_buttonSubState].toLowerCase();
		if (topMenu.models[1].attributes.hf_buttonSubState != 0) queryObj.hf_style = topMenu.models[1].attributes.hf_buttonSubMenu[topMenu.models[1].attributes.hf_buttonSubState].toLowerCase();
		if (topMenu.models[2].attributes.hf_buttonSubState != 0) queryObj.hf_length = topMenu.models[2].attributes.hf_buttonSubMenu[topMenu.models[2].attributes.hf_buttonSubState].toLowerCase();
		if (topMenu.models[3].attributes.hf_buttonSubState != 0) queryObj.hf_texture = topMenu.models[3].attributes.hf_buttonSubMenu[topMenu.models[3].attributes.hf_buttonSubState].toLowerCase();
		hairstyleCollectionView.collection = new app.hf_collection_hairstyles(hairstyleCollection.where(queryObj));
		$('#leftPane').empty().html(hairstyleCollectionView.render().el);	
	}
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

function compare(a,b) {
  if (a.id < b.id)
     return -1;
  if (a.id > b.id)
    return 1;
  return 0;
}