$(document).ready(function(){

	// create a map in the "map" div, set the view to a given place and zoom
	
	var map = L.map('map',{fullscreenControl: true}).setView(L.latLng(40.7127, -74.0059), 10);

	// add an OpenStreetMap tile layer
	L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	}).addTo(map);

	$.getScript('/js/dev/_addRegions.js');
	
	// require(['/js/dev/_addRegions.js']);
	// require(['/js/dev/_markers.js']);
	// require(['/js/dev/_fullscreen.js']);
	

});