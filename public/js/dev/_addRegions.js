$(document).ready(function(){
		var geojson = L.geoJson(statesData, {
	style: style,
	onEachFeature: function(feature, layer){
		var defaultStyle = layer.style,
        that = this;

        layer.on('mouseover', function (e) {
            this.setStyle({
                color: '#fff',
                weight: 3,
                opacity: 0.6,
                fillOpacity: 0.1,
                fillColor: '#fff'
            });

            info.update(layer.feature.properties);

        });
        layer.on('mouseout', function (e) {
             this.setStyle({	        
		        fillColor: '#fff',
		        weight: 2,
		        opacity: 1,
		        color: 'white',
		        dashArray: '3',
		        fillOpacity: 0.5
		    });

            info.update();

        });
        layer.on('click', zoomToFeature);
	}
	}).addTo(map);


	var info = L.control();

	info.onAdd = function (map) {
	    this._div = L.DomUtil.create('div', 'info'); // create a div with a class "info"
	    this.update();
	    return this._div;
	};

	// method that we will use to update the control based on feature properties passed
	info.update = function (props) {

		if (props)
		{
			if (props.alt_name)
			{
				var name = props.alt_name;
			} else
			{
				var name = props.name;
			}
		}
	    this._div.innerHTML = '<h4>Region</h4>' +  (props ?
	        '<b>' + name + '</b><br />'
	        : 'Hover over an area');
	};

	info.addTo(map);

	function style(){
		return {
	        fillColor: '#fff',
	        weight: 2,
	        opacity: 1,
	        color: 'white',
	        dashArray: '3',
	        fillOpacity: 0.5
	    };

	}

	function zoomToFeature(e) {
    map.fitBounds(e.target.getBounds());
	}

});