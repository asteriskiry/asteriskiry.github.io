function SynergiaSite() {

	// SELECT ONCE
	var variables = {
		nav: null
	};

	// Site initialization flow.
	function init() {
		$(".nav").sticky({topSpacing:0});

   	initMap();
	}

	function initMap () {
		// When the window has finished loading create our google map below
    google.maps.event.addDomListener(window, 'load', initGM);

    function initGM() {
        // Basic options for a simple Google Map
        // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
        var mapOptions = {
            // How zoomed in you want the map to start at (always required)
            zoom: 11,

            // The latitude and longitude to center the map (always required)
            center: new google.maps.LatLng(40.6700, -73.9400), // New York

            // How you would like to style the map.
            // This is where you would paste any style found on Snazzy Maps.
            styles: [	{		featureType:"all",		elementType:"all",		stylers:[		{			invert_lightness:true		},		{			saturation:10		},		{			lightness:30		},		{			gamma:0.5		},		{			hue:"#435158"		}		]	}	]
        };

        // Get the HTML DOM element that will contain your map
        // We are using a div with id="map" seen below in the <body>
        var mapElement = document.getElementById('map');

        // Create the Google Map using out element and options defined above
        var map = new google.maps.Map(mapElement, mapOptions);
    }
	}

	// RETURN
	return {
		init: init
	};

}

// Document ready
$(document).ready( function() {
	var site = new SynergiaSite();
	site.init();
});