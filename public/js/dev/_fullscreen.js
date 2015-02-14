$(document).ready(function(){
	
	map.isFullscreen() // Is the map fullscreen?
	map.toggleFullscreen() // Either go fullscreen, or cancel the existing fullscreen.

	// `fullscreenchange` Event that's fired when entering or exiting fullscreen.
	map.on('fullscreenchange', function () {
	    if (map.isFullscreen()) {
	        console.log('entered fullscreen');
	    } else {
	        console.log('exited fullscreen');
	    }
	});

	L.Control.Fullscreen

});

