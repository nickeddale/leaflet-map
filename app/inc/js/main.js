$(document).ready(function(){

	// create a map in the "map" div, set the view to a given place and zoom
	var map = L.map('map',{
		fullscreenControl: true,
	}).setView(L.latLng(40.7127, -74.0059), 12);

	// Happy Icon Set up
	var happy = L.icon({
	    iconUrl: '/inc/img/happy.png',
	    iconSize:     [20, 20], // size of the icon
	    iconAnchor:   [22, 94], // point of the icon which will correspond to marker's location
	    popupAnchor:  [-3, -76] // point from which the popup should open relative to the iconAnchor
	});

	// empty icon for region labels
	var noIcon = L.icon({
		iconUrl: ' ',
		iconSize: [1, 1],
		iconAnchor: [1, 1],
		labelAnchor: [1, 1]
	});

	// initialize global variables
	
	var regionLabelsArray = L.layerGroup();

	var markers = new L.FeatureGroup();

	var hotelsDisplay;
	var selectedRegion;

	// add an OpenStreetMap tile layer
	var tileLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	    attribution: '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
	});
	

	// 
	// Set up for region polygons with event functions
	// 

	var geojson = L.geoJson(statesData, {
	style: style,
	onEachFeature: function(feature, layer){

			addRegionLabels(layer);

	        layer.on('mouseover', function (e) {
		        	this.setStyle({
				        fillColor: '#fff',
				        weight: 2,
				        opacity: 1,
				        color: 'white',
				        dashArray: '3',
				        fillOpacity: 0.5
		            });
	        });
	        
	        layer.on('mouseout', function (e) {
		        	this.setStyle(style());
	        });

	        layer.on('click', function(e){

	        		if ( map.getZoom() <= 11 )
	        		{
	        			map.fitBounds(e.target.getBounds());
	        		}
		        	
		        	var region = regionCheck(layer.feature.properties);

		        	showHotels(region);
					info.update(layer.feature.properties, 'click');

		        	this.setStyle(style());
		        	
		        });
	        } //end oneachfeature
	

	});

	// Set up for region labels layer control
	// Called by each region set up
	// Adds a label for each region

	function addRegionLabels(layer)
	{		

        	var name = returnName(layer.feature.properties);

        	var center = layer.getBounds().getCenter();

        	// creates static marker and places it at the center
        	var marker = L.marker(center, {
	        		icon: noIcon
	        	}).bindLabel(name, {
	        		noHide: true,
	        		className: 'region-label'
	        	});

	        regionLabelsArray.addLayer(marker);	
	        
	}

	var labels = {'Region Labels': regionLabelsArray};

	var info = L.control();

	info.onAdd = function (map) {
	    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
		L.DomEvent
	        .addListener(this._div, 'click', L.DomEvent.stopPropagation)
		    .addListener(this._div, 'click', function (e) {
		       		display(e.target);
		        });		
		this.update();
	    return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info.update = function(props, event) {

		if (props)
		{
			var name = returnName(props);
		}

		var review = '
		<div class="review-box" id="review-box">

		      <h4>' + name + '</h4>
		      <form>
				<small class="region-hotels-description">Show hotels only for this region:</small>
		      	<input id="command" class="region-hotels cmn-toggle cmn-toggle-round" checked="true" type="checkbox"/>
		      	<label class="cmn-label" for="command"></label>
		      	
		      </form>

		      <hr />
		      
		      <p><small>Rated for you</small></p>
		      <p class="review review-summary text-center">
					<span class="glyphicon glyphicon-star"></span>
					<span class="glyphicon glyphicon-star"></span>
					<span class="glyphicon glyphicon-star"></span>
					<span class="glyphicon glyphicon-star"></span>
					<span class="glyphicon glyphicon-star-empty"></span>
			  </p>
		      <hr>
		    <div class="user-specific-reviews">

		      	<p><small>Top ratings for you</small></p>

		        <p class="review">Shopping:
					<span class="glyphicon pull-right glyphicon-star"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>
		        </p>
		        <p class="review">Clubs:
					<span class="glyphicon pull-right glyphicon-star-empty"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>
		        </p>
		        <p class="review">Music:

					<span class="glyphicon pull-right glyphicon-star-empty"></span>
					<span class="glyphicon pull-right glyphicon-star-empty"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>
					<span class="glyphicon pull-right glyphicon-star"></span>

		        </p>

		    </div>

			<span class="more-reviews glyphicon glyphicon-option-horizontal"></span>

	        <hr />

	        <div class="all-reviews">


				<p class="review">Transportation:
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				</p>
				<p class="review">Family:
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				</p>
				<p class="review">Nature:
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				</p>
				<p class="review">Expense:
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				</p>
				<p class="review">Culture:
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				  <span class="glyphicon pull-right glyphicon-star"></span>
				</p>

		    </div>

		    <div class="explore-region text-center">
		      	<button id="explore-region" class="btn btn-default btn-xs">
		      		<small>Explore '+ name + ' <span class="glyphicon glyphicon-share-alt"></span></small></a>
		      	</button>
		    </div>

		</div>
			';

		selectedRegion = name;

		return this._div.innerHTML = (props ? review : 'Click a region to explore');	

 		
	};

	// 
	// Handling info box buttons
	// 

	function display(target)
	{
		if ( $(target).hasClass('more-reviews') )
		{
			return toggleAllReviews(target);	
		}

		if ( $(target).hasClass('region-hotels') )
		{
			return toggleHotels();
			

		}
	}

	function toggleHotels()
	{
		console.log(hotelsDisplayed + ' ' + selectedRegion);

		if (hotelsDisplayed !== 'all')
		{
			console.log('display all hotels');
			return showHotels('all');
		}

		console.log('display hotels only for ' + selectedRegion);
		return showHotels(selectedRegion);
				
	}

	// 
	// Helper functions
	// 


	function returnName(properties)
	{
		if (properties.alt_name)
		{
			return properties.alt_name;
		} 
		return properties.name;
	}

	function style(){
		return {
	        fillColor: '#fff',
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '5',
	        fillOpacity: 0.1
	    };

	}

	function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
	}

	// returns hotels for all regions or for specific region
	function showHotels(region){

		if (markers) //clears hotel markers currently on display
		{
			markers.clearLayers();	
		}

		data = {'region': region};
		$.ajax({
			type: 'POST',
			url: "/maps/hoteldata",
			data: data,
			dataType: 'json',
			success: function(data) {
				for (var i = data.length - 1; i >= 0; i--) {
					var marker = L.marker([data[i].latitude, data[i].longitude],{icon: happy})
					marker.bindPopup(data[i].id + '-' + data[i].name);
					markers.addLayer(marker);
					hotelsDisplayed = region;
				};
			}
		}).done(function() {
		  	map.addLayer(markers);
		});

	}


	function regionCheck(properties)
	{
		if (properties !== 'all') 
		{
			return returnName(properties);	
		}

		return properties;
	}

	function toggleAllReviews(target)
	{
		var $allReviews = $('.all-reviews');

		if ($allReviews.is(':visible'))
		{
			return $allReviews.slideUp();
		}	

		return $allReviews.slideDown();
	}



	//Functions to either disable (onmouseover) or enable (onmouseout) the map's dragging
	function controlEnter(e) {
		// console.log('disable');
	    map.dragging.disable();
	}
	function controlLeave() {
		// console.log('enable');
	    map.dragging.enable();
	}

	//Finally, add Controls and layers

	tileLayer.addTo(map);

	geojson.addTo(map);

	L.control.layers(null, labels, {position: 'bottomleft'}).addTo(map); //add layers control

	info.addTo(map); //add ratings

	map.on('load', showHotels('all')); //load all hotels on map load

	// Disable map draggin when hovering over info control
	document.getElementsByClassName("info")[0].onmouseover = controlEnter; 
	document.getElementsByClassName("info")[0].onmouseout = controlLeave;





}); //end doc ready