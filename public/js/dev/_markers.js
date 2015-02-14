$(document).ready(function(){
	
	var happy = L.icon({
    iconUrl: '/inc/img/happy.png',

    iconSize:     [20, 20], // size of the icon
    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	L.marker([40.7127, -74.0059], {icon: happy}).addTo(map).bindPopup('Happy Hotel');
	L.marker([40.70, -74.0040], {icon: happy}).addTo(map).bindPopup('Hotel Hero');
	
});


