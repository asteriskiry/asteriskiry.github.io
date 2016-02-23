function SynergiaSite() {

	// SELECT ONCE
	var variables = {
        body: $("body"),
		header: $(".header"),
        nav: $(".nav")
	};

	// Site initialization flow.
	function init() {
        initResponsiveNav();
        initStickyNavigation();
   	    initMap();
        // If not a "mobile" device.
        if (!Modernizr.touch) {
            // Activate smooth scrolling.
            setupNavClickHandlers();
        }
	}

    // Initializes the responsive navigation.
    function initResponsiveNav() {
        var nav = responsiveNav(".nav-collapse", { // Selector
          animate: true, // Boolean: Use CSS3 transitions, true or false
          transition: 284, // Integer: Speed of the transition, in milliseconds
          label: "", // String: Label for the navigation toggle
          insert: "before", // String: Insert the toggle before or after the navigation
          customToggle: "", // Selector: Specify the ID of a custom toggle
          closeOnNavClick: true, // Boolean: Close the navigation when one of the links are clicked
          openPos: "relative", // String: Position of the opened nav, relative or static
          navClass: "nav-collapse", // String: Default CSS class. If changed, you need to edit the CSS too!
          navActiveClass: "js-nav-active", // String: Class that is added to  element when nav is active
          jsClass: "js", // String: 'JS enabled' class which is added to  element
          init: function(){}, // Function: Init callback
          open: function(){}, // Function: Open callback
          close: function(){} // Function: Close callback
        });
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
                // Disable map type selection
                mapTypeControl: false,
                // Disable streetview control
                streetViewControl: false,
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
                                        hue:"#007f00"
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

            var MapMarkerImage = new google.maps.MarkerImage('img/mapmarker.png');

            // Map markers for places
			
            var kauppisMercaMarker = new google.maps.Marker({
                position: new google.maps.LatLng(60.4545853,22.2884077),
                map: map,
                title: 'Turku School of Economics',
                icon: MapMarkerImage
            });
            // var ictMarker = new google.maps.Marker({
                // position: new google.maps.LatLng(60.4490542,22.295841),
                // map: map,
                // title: 'ICT-talo',
                // icon: MapMarkerImage
            // });
            // var proffaMarker = new google.maps.Marker({
                // position: new google.maps.LatLng(60.454436,22.287984),
                // map: map,
                // title: 'Proffan Kellari',
                // icon: MapMarkerImage
            // });
            var kauppisMercaInfoWindow = new google.maps.InfoWindow({
                    content: '<p><b>Turku School of Economics</b><br />Merca stands, Speeches</p>'
                });
            // var ictInfowindow = new google.maps.InfoWindow({
                    // content: '<p><b>ICT-talo</b><br />Seminaariluennot</p>'
                // });
            // var proffaInfowindow = new google.maps.InfoWindow({
                    // content: '<p><b>Proffan Kellari</b><br />Tikkakisa</p>'
                // });
            // google.maps.event.addListener(uusisMarker, 'click', function() {
                // uusisInfowindow.open(map, uusisMarker);
            // });
            // google.maps.event.addListener(ictMarker, 'click', function() {
                // ictInfowindow.open(map, ictMarker);
            // });
            // google.maps.event.addListener(proffaMarker, 'click', function() {
                // proffaInfowindow.open(map, proffaMarker);
            // });

        }
	}

    // Initiates the sticky navigation.
    function initStickyNavigation() {
        variables.header.sticky({topSpacing:0});
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