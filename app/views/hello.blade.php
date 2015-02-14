<!doctype html>
<html lang="en">
  <head>
 	
 	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/3.0.2/normalize.min.css" />
 	<link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.css" />
  <link href='//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v0.0.2/leaflet.fullscreen.css' rel='stylesheet' />
	
  {{ HTML::style('//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css') }}
  {{ HTML::style('/css/leaflet.label.css') }}
  {{ HTML::style('/css/style.css') }}

 	<style>
      header {
        height: 126px;
      }

      footer {
        height: 126px;
      }
      .map {
        height: 616px;
      }

      .info {
      	right: 20px;
      	min-width: 170px;
		    padding: 6px 8px;
		    font: 14px/16px Arial, Helvetica, sans-serif;
		    background: white;
		    background: rgba(255,255,255,0.8);
		    box-shadow: 0 0 15px rgba(0,0,0,0.2);
		    border-radius: 5px;
        font-size: 12px;
		}
		.info h4 {
		    margin: 0 0 5px;
		    color: #777;
		}

    </style>

	<script src="http://cdn.leafletjs.com/leaflet-0.7.3/leaflet.js"></script>
	<script src="http://requirejs.org/docs/release/2.1.11/minified/require.js"></script>
	<script src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
  <script src='//api.tiles.mapbox.com/mapbox.js/plugins/leaflet-fullscreen/v0.0.2/Leaflet.fullscreen.min.js'></script>
    
  

    <title>Hotel Map</title>
  </head>
  <body>
    <header class="col-md-12">
      <h1 class="text-center">Hotel Map With Counties</h1>
      <hr>
    </header>

    <div class="col-md-10 col-md-offset-1">
      <div class="col-md-2"></div> 
      <div class="col-md-8">
        <div id="map" class="map"></div>
      </div>
      <div class="col-md-2">
      </div>
    </div>
    <hr>



    <footer class="col-md-12">
    </footer>

    <script>
    	var statesData = <?php include(app_path() . '/data/new-york-area.json'); ?>;
    </script>

    {{ HTML::script('//maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js') }}
    {{ HTML::script('/js/leaflet.label.js') }}

    {{ HTML::script('/js/min.js') }}
    
  </body>
</html>

