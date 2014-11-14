var customPhoto_dataURI;
var cachedHair = '';

function assignCustomFaceEvents () {
    $('.customFace_capture input').click(function (e) {
    	renderCustomFaceView_SignedIn_TakePhoto();
    	e.preventDefault();
    	Webcam.set({
			width: 818,
			height: 613,
			crop_height: 613,
			crop_width: 484,
			image_format: 'jpeg',
			jpeg_quality: 90
		});
		Webcam.attach ('#userWebcamDisplay');    	
    });

    $('.customFace_snap input').click(function (e) {
    	e.preventDefault();

    	Webcam.snap(function (data_uri) {
    		customPhoto_dataURI = data_uri;
    	});
    	clearCustomFaceView();
    	requestUpdateCustomPhoto();    	
    });
    $('.customFace_upload input').change(function(){
    	var filesSelected = document.getElementById("customFace_uploadInput_photo").files;
		if (filesSelected.length > 0) {
			var fileToLoad = filesSelected[0];
			var fileReader = new FileReader();
			fileReader.readAsDataURL(fileToLoad);

			fileReader.onload = function (e) {
				console.log(e);
			    customPhoto_dataURI = e.target.result;
			    clearCustomFaceView();
    			requestUpdateCustomPhoto();
			}
		}
	 });
    $('#customFace_controls_up').click(function () {
		offsetY -= offsetIncrementor;
		colorizeHair();
	});
	$('#customFace_controls_down').click(function () {
		offsetY += offsetIncrementor;
		colorizeHair();
	});
	$('#customFace_controls_left').click(function () {
		offsetX -= offsetIncrementor;
		colorizeHair();
	});
	$('#customFace_controls_right').click(function () {
		offsetX += offsetIncrementor;
		colorizeHair();
	});
	$('#customFace_controls_reset').click(function () {
		offsetX = 0;
		offsetY = 0;
		colorizeHair();
	});
	$('#customFace_controls_plus').click(function () {
		// console.log("logged");
		scalingX += imageHair.width * scalingIncrementor;
		scalingY += imageHair.height * scalingIncrementor;
		colorizeHair();
	});
	$('#customFace_controls_minus').click(function () {
		// console.log("logged: ");
		scalingX -= imageHair.width * scalingIncrementor;
		scalingY -= imageHair.height * scalingIncrementor;
		colorizeHair();
	});
	$('#customFace_controls_reset').click(function () {
		offsetX = 0;
		offsetY = 0;
		scalingX = 0
		scalingY = 0
		colorizeHair();
	});
}
function clearCustomFaceView () {
	if (imageHair.src !== cachedHair && cachedHair !== '') imageHair.src = cachedHair;
	$('#leftPane').empty();
	if (Webcam.container)
		Webcam.reset();

}
function renderCustomFaceViewBase () {
	$('#leftPane').empty().append($('#hf_leftPaneCustom').html());
	$('#leftPane').append($('hf_leftPaneCustom_Display').html());
	language_render_customFace();
	assignCustomFaceEvents();
}
function renderCustomFaceView_SignedIn_NoPhoto () {
	if (imageHair.src !== cachedHair && cachedHair !== '') imageHair.src = cachedHair;
	renderCustomFaceViewBase();
	$('#customFace_SignedIn_NoPhoto').addClass('active');
}
function renderCustomFaceView_SignedIn_TakePhoto () {
	cachedHair = imageHair.src;
	imageHair.src = 'images/sihl2.png'

	renderCustomFaceViewBase();
	$('#customFace_SignedIn_TakePhoto').addClass('active');
}
function renderCustomFaceView_SignedIn_Photo () {
	if (imageHair.src !== cachedHair && cachedHair !== '') imageHair.src = cachedHair;
	renderCustomFaceViewBase();
	$('#customFace_SignedIn_Photo').addClass('active');
	if (curUserMeta.customPhoto) $('#imageFace').attr('src', curUserMeta.customPhoto);
	else if (customPhoto_dataURI) $('#imageFace').attr('src', customPhoto_dataURI);
	else renderCustomFaceView_SignedIn_NoPhoto();
}
function renderCustomFaceView_SignedOut () {
	if (imageHair.src !== cachedHair && cachedHair !== '') imageHair.src = cachedHair;
	renderCustomFaceViewBase();
	$('#customFace_SignedOut').addClass('active');
}
function resetHairOffset () {

}