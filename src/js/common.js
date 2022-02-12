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

	$('.js-smooth-scrolling-nav').on('click', 'a', function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;

		if($('.js-nav').hasClass('is-opened')) {
			$('.js-nav').removeClass('is-opened');
			$('html').removeClass('is-fixed');
			$('.js-open-mobile-menu-btn').removeClass('is-active');
		}

		$('html, body').animate({scrollTop: top}, 300);
	});	

	$('.js-smooth-scroll-link').on('click', function (e) {
		e.preventDefault();
		var id = $(this).attr('href'),
			top = $(id).offset().top;

		$('html, body').animate({scrollTop: top}, 300);
	});	


	$('.js-open-mobile-menu-btn').on('click', function(e) {
		e.preventDefault();

		$(this).toggleClass('is-active');
		$('.js-nav').toggleClass('is-opened');
		$('html').toggleClass('is-fixed');
	});


	var headerOffset = $('.header').offset().top;

	if (html < 1100) {
		$(window).on('scroll', function(e) {
			var scroll = $(this).scrollTop();
			if (scroll > headerOffset) {
				$('.header').addClass('is-fixed');
			} else {
				$('.header').removeClass('is-fixed');
			}
		});
	}

	


	var videoOffset = $('.video').offset().top;

	$(window).on('scroll', function() {

		var documentScroll = $(document).scrollTop();
		var scroll = $(this).scrollTop();
		var windowHeight = $(window).height();

		var visibilityPoint = videoOffset - windowHeight - 200;

		if (documentScroll > visibilityPoint) {
			$('.video').addClass('is-loaded');
			$('.video video').attr('preload', '');
			$('.video video').attr('autoplay', '');
		}



	});


	// Popup
	$('.js-open-popup-form-btn').on('click',function(e) {
		e.preventDefault();
		$('.js-popup-form').fadeIn(300);
		$('html').addClass('is-fixed');
	});


	$('.js-close-popup-btn').on('click',function(e) {
		e.preventDefault();
		$(this).parents('.js-popup').fadeOut(300);
		$('html').removeClass('is-fixed');
		$('html').removeClass('a-fullscreen');
	});

	$('.popup__overflow').on('click', function(e) {
		e.stopPropagation();

		var content = $(this).find('.popup__body');

		if(!content.is(e.target) && content.has(e.target).length === 0) {
			$('html').removeClass('is-fixed');
			$('.js-popup').fadeOut(300);
		}

	});

	$('a.js-privacy-policy-link').on('click', function(e) {
		e.preventDefault();

		$('.js-popup-form').fadeOut(200);
		$('.js-popup-policy').fadeIn(200);
		$('html').addClass('is-fixed');
	});



	$('.fancy-link').fancybox({
		loop: true,
		buttons: [
			"zoom",
			"close"
		]
	});


	var animationBlocks = $('.js-animated-block').toArray();

	$(window).on('scroll', function() {

		var documentScroll = $(document).scrollTop();
		var scroll = $(this).scrollTop();
		var windowHeight = $(window).height();

		animationBlocks.forEach(function(item) {
			var itemOffset = $(item).offset().top;
			var itemHeight = $(item).outerHeight();
			var visibilityPoint = itemOffset - windowHeight;

			if (documentScroll > visibilityPoint) {
				$(item).addClass('is-animated');
			}

		});


	});


	


	$('.js-tab-content').not(":first").hide();
	$('.js-tab-btn:first').addClass('is-active');

	$('.js-tab-btn').on('click', function(e) {
		e.preventDefault();
		$('.js-tab-content').removeClass('is-active');
		$('.js-tab-btn').removeClass('is-active').eq($(this).index()).addClass('is-active');
		$('.js-tab-content').hide().eq($(this).index()).fadeIn().addClass('is-active');
	}).eq(0).addClass('is-active');


	AOS.init({
		once: true,
		duration: 800
	});



	var enteringSlider = new Swiper('.js-entering-slider', {
		slidesPerView: 1,
		loop: true,
		speed: 800,
		spaceBetween: 10,
		navigation: {
			nextEl: '.js-entering-slider-btn-next',
			prevEl: '.js-entering-slider-btn-prev',
		},
		breakpoints: {
			1280: {
				slidesPerView: 'auto',
				spaceBetween: 50,
			},
			992: {
				slidesPerView: 3,
				spaceBetween: 20,
			},
			420: {
				slidesPerView: 2,
				spaceBetween: 10,
			}
		}
	});

	var buildingSlider = new Swiper('.js-building-slider', {
		slidesPerView: 1,
		loop: true,
		speed: 800,
		spaceBetween: 20,
		navigation: {
			nextEl: '.js-building-slider-btn-next',
			prevEl: '.js-building-slider-btn-prev',
		},
		breakpoints: {
			767: {
				slidesPerView: 2,
				spaceBetween: 50
			}
		}
	});


	// Form
	$('.form-input').on('focus', function() {
		var self = $(this);
		var label = self.parents('.form-group__label');

		label.addClass('is-active');
	});

	$('.js-required-input').on('focus',function() {
		var self = $(this);
		var formGroup = self.parents('.form-group__label');

		formGroup.addClass('is-active');

		if(formGroup.hasClass('is-error')) {
			formGroup.removeClass('is-error');
		}

	});

	$('.form-input').on('blur', function() {
		var self = $(this);
		var label = self.parents('.form-group__label');


		if (label.hasClass('is-active') && self.val() || self.val() !== '') {
			label.addClass('is-valid');
		} else {
			label.removeClass('is-valid');
			label.removeClass('is-active');
		}

		
	});


	$('a.js-privacy-policy-link').on('click', function(e) {
		e.preventDefault();

		$('.js-popup-form').fadeOut(200);
		$('.js-popup-policy').fadeIn(200);
		$('html').addClass('is-fixed');
	});



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


	$("input[type=tel]").inputmask({"mask": "+38 (999) 999-9999","clearIncomplete": false, showMaskOnHover: false});


	setTimeout(function(){
		$('body').addClass('is-loaded');
	}, 2000);


});
