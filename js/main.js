function SynergiaSite() {

	// SELECT ONCE
	var variables = {
        body: $("body"),
		nav: $(".nav")
	};

	// Site initialization flow.
	function init() {
        initStickyNavigation();
   	    initMap();
        // If not a "mobile" device.
        if (!Modernizr.touch) {
            // Activate smooth scrolling.
            setupNavClickHandlers();
        }
	}

    // Initializes the Google Maps object with a custom theme.
	function initMap() {
		// When the window has finished loading create our google map below
        google.maps.event.addDomListener(window, 'load', initGM);

        function initGM() {
            // Basic options for a simple Google Map
            // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
            var mapOptions = {
                // How zoomed in you want the map to start at (always required)
                zoom: 15,
                // Disable scroll wheel to prevent map zoom while scrolling the page.
                scrollwheel: false,
                // The latitude and longitude to center the map (always required)
                center: new google.maps.LatLng(60.4541253,22.2917672), // Turku
                // How you would like to style the map.
                // This is where you would paste any style found on Snazzy Maps.

                // This is http://snazzymaps.com/style/30/cobalt
                styles: [
                            {
                                featureType:"all",
                                elementType:"all",
                                stylers:[
                                    {
                                        invert_lightness:true
                                    },
                                    {
                                        saturation:10
                                    },
                                    {
                                        lightness:30
                                    },
                                    {
                                        gamma:0.5
                                    },
                                    {
                                        hue:"#435158"
                                    }
                                ]
                            }
                        ]
            }; 

            // Get the HTML DOM element that will contain your map
            // We are using a div with id="map" seen below in the <body>
            var mapElement = document.getElementById('map');

            // Create the Google Map using out element and options defined above
            var map = new google.maps.Map(mapElement, mapOptions);

            // Map markers for places
            var uusisMarker = new google.maps.Marker({
                position: new google.maps.LatLng(60.4562776,22.292009),
                map: map,
                title: 'Uusi-S'
            });
            var ictMarker = new google.maps.Marker({
                position: new google.maps.LatLng(60.4490542,22.295841),
                map: map,
                title: 'ICT-talo'
            });
            var proffaMarker = new google.maps.Marker({
                position: new google.maps.LatLng(60.454436,22.287984),
                map: map,
                title: 'Proffan Kellari'
            });
            
        }
	}

    // Initiates the sticky navigation.
    function initStickyNavigation() {
        variables.nav.sticky({topSpacing:0});
    }

    // Scrolls to a given element.
    function scrollToElement(selector, time, verticalOffset) {
        time = typeof(time) != 'undefined' ? time : 1000;
        verticalOffset = typeof(verticalOffset) != 'undefined' ? verticalOffset : 0;
        element = $(selector);
        offset = element.offset();
        offsetTop = offset.top + verticalOffset;
        $('html, body').animate({
            scrollTop: offsetTop
        }, time);
    }

    // Attaches click handlers to navigation.
    function setupNavClickHandlers() {
        variables.nav.find("a").each(function() {
            $(this).click(function(e) {
                e.preventDefault();
                if (this.hash !== "") {
                    scrollToElement(this.hash, 200, -80);
                } else {
                    scrollToElement(variables.body, 200, 0);
                }

            });
        });
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