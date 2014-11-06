function hasGetUserMedia() {
  return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
            navigator.mozGetUserMedia || navigator.msGetUserMedia);
}

function checkMedia () {
	if (hasGetUserMedia()) {
		return true;
	  	// Good to go!
	} else {

		alert('getUserMedia() is not supported in your browser');
		return false;
	}
}	

function loadWebcam () {
	console.log("hmmm");
	var errorCallback = function(e) {
		console.log('Webcam not supported!', e);
	};

	// Not showing vendor prefixes.
	navigator.getUserMedia  = navigator.getUserMedia ||
                          navigator.webkitGetUserMedia ||
                          navigator.mozGetUserMedia ||
                          navigator.msGetUserMedia;

    console.log("okay");
	// var video = document.getElementById('userWebcamDisplay');                          
	var video = document.querySelector('video');                          
	console.log(video);
	console.log("so far so good");
	navigator.getUserMedia({video: true, audio: false}, function(localMediaStream) {
		console.log("woot");
		video.src = window.URL.createObjectURL(localMediaStream);

		// Note: onloadedmetadata doesn't fire in Chrome when using it with getUserMedia.
		// See crbug.com/110938.
		video.onloadedmetadata = function(e) {
	  		// Ready to go. Do some stuff.
		};
	}, errorCallback);
}

function fallback(e) {
  video.src = 'fallbackvideo.webm';
}

function success(stream) {
  video.src = window.URL.createObjectURL(stream);
}
