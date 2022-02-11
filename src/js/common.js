$(document).ready(function() {
	//  ========= Variables =========
	var body = $('body'),
			html = body.width(),
			timer; // for disable scroll
	// ========= =========== =========== ===========

	// Disable hover effect when client scrolles the page
	$(window).on('scroll',function() {
		clearTimeout(timer);
		if(!body.hasClass('disable-hover')) {
			body.addClass('disable-hover');
		}

		timer = setTimeout(function() {
			body.removeClass('disable-hover');
		}, 200);
	});



	$('[data-fancybox]').fancybox({
		loop: true,
		buttons: [
			"zoom",
			"close"
		]
	});


	$('.js-tab-content').not(":first").hide();
	$('.js-tab-btn:first').addClass('is-active');

	$('.js-tab-btn').on('click', function(e) {
		e.preventDefault();
		$('.js-tab-content').removeClass('is-active');
		$('.js-tab-btn').removeClass('is-active').eq($(this).index()).addClass('is-active');
		$('.js-tab-content').hide().eq($(this).index()).fadeIn().addClass('is-active');
	}).eq(0).addClass('is-active');



	// Google map
	var mapStyles = [
    {
        "featureType": "all",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "weight": "2.00"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#9c9c9c"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f2f2f2"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 45
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#eeeeee"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#7b7b7b"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#46bcec"
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#c8d7d4"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "color": "#070707"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "color": "#ffffff"
            }
        ]
    }
];

	var latitude = $('.infrastructure-map').attr('data-latitude'), // coordinates 
		longitude = $('.infrastructure-map').attr('data-longitude'), // coordinates 
		markerUrl = 'img/icons/svg/location.svg';



		var map;
		var services;
		var infowindow = new google.maps.InfoWindow;


		$('.js-map-btn').on('click', function(e) {
			e.preventDefault();

			var self = $(this);

			var mapType = self.attr('data-map-type');

			$('.js-map-btn').removeClass('is-active');
			self.addClass('is-active');

			initFullMap(mapType);

		});

		function initFullMap(mapType) {

			var mapType = mapType;

			var center = new google.maps.LatLng(latitude, longitude);

			map = new google.maps.Map(document.getElementById('map'), {
				center: center,
				zoom: 15,
				panControl: false,
				zoomControl: true,
				mapTypeControl: false,
				streetViewControl: false,
				mapTypeId: google.maps.MapTypeId.ROADMAP,
				scrollwheel: false,
				styles: mapStyles
			});

			marker = new google.maps.Marker({
				position: new google.maps.LatLng(latitude, longitude),
				map: map,
				visible: true,
				icon: markerUrl
			});


			var cafe = {
				location: center,
				radius: '1000',
				type: 'cafe'
			};

			var restoraunts = {
				location: center,
				radius: '1000',
				type: 'restaurant'
			};

			var shops = {
				location: center,
				radius: '1000',
				type: 'shopping_mall'
			};

			var schools = {
				location: center,
				radius: '1000',
				type: 'school'
			};

			var metro = {
				location: center,
				radius: '1000',
				type: 'subway_station'
			};

			var park = {
				location: center,
				radius: '1500',
				type: 'park'
			};

			services = new google.maps.places.PlacesService(map);

			switch (mapType) {
				case 'school':
				services.nearbySearch(schools, callback);
				break;

				case 'park':
				services.nearbySearch(park, callback);
				break;

				case 'cafe':
				services.nearbySearch(restoraunts, callback);
				break;

				case 'shopping_mall':
				services.nearbySearch(shops, callback);
				break;


				default:
				services.nearbySearch(cafe, callback);
				services.nearbySearch(restoraunts, callback);
				services.nearbySearch(schools, callback);
				services.nearbySearch(metro, callback);
				services.nearbySearch(park, callback);
			}


		}

		function createMarker(place, markerTypes) {
			var placeLoc = place.geometry.location;

			var markerTypes = markerTypes;

			var markerArr = [
			{
				markerUrl: 'img/icons/svg/map_school.svg',
				type: 'school'
			},
			{
				markerUrl: 'img/icons/svg/map_cafe.svg',
				type: 'cafe'
			},
			{
				markerUrl: 'img/icons/svg/map_cafe.svg',
				type: 'restaurant'
			},
			{
				markerUrl: 'img/icons/svg/map_cafe.svg',
				type: 'bar'
			},
			{
				markerUrl: 'img/icons/svg/map_market.svg',
				type: 'shopping_mall'
			},
			{
				markerUrl: 'img/icons/svg/map_park.svg',
				type: 'park'
			}
			];

			var markerTypeUrl;



			markerArr.forEach( function(obj) {
				if (markerTypes.indexOf(obj.type) >=0) {
					markerTypeUrl = obj.markerUrl;
				} 
			});



			var marker = new google.maps.Marker({
				map : map,
				position : place.geometry.location,
				visible: true,
				icon: markerTypeUrl
			});

			google.maps.event.addListener(marker, 'click', function() {
				infowindow.setContent(place.name);
				infowindow.open(map, this);
			});


		}


		function callback(results, status) {
			if (status == google.maps.places.PlacesServiceStatus.OK) {
				for (var i = 0; i < results.length; i++) {
					createMarker(results[i], results[i].types);
				}
			}
		}

		initFullMap();


});
