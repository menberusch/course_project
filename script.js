$(document).ready(function(){
	
	// MAIN CAROUSEL
	$('.main-carousel').slick({
		arrows: false,
		dots: true,
		speed: 500,
		fade: true,
		cssEase: 'linear',
		autoplay: true
	});

	// weekly products carousel
	$('.weekly-products-carousel').slick({
		slidesToShow: 4,
		infinite: false,
		arrows: true,
		dots: false,
		responsive: [
			{
				breakpoint: 1325,
				settings: {
					arrows: false
				}
			},
			{
				breakpoint: 1240,
				settings: {
					slidesToShow: 3,
					arrows: false
				}
			},
			{
				breakpoint: 789,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			},
			{
				breakpoint: 492,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}
		]
	});

	// special products carousel
	$('.special-products-carousel').slick({
		slidesToShow: 3,
		infinite: false,
		arrows: true,
		dots: false,
		responsive: [
			{
				breakpoint: 1325,
				settings: {
					arrows: false
				}
			},
			{
				breakpoint: 789,
				settings: {
					slidesToShow: 2,
					arrows: false
				}
			},
			{
				breakpoint: 492,
				settings: {
					slidesToShow: 1,
					arrows: false
				}
			}
		]
	});

	// latest news carousel

	$('.latest-news-carousel').slick({
		slidesToShow: 2,
		slidesToScroll: 2,
		arrows: true,
		dots: false,
		responsive: [
			{
				breakpoint: 1325,
				settings: {
					arrows: false
				}
			},
			{
				breakpoint: 1240,
				settings: {
					slidesToShow: 1,
					arrows: false,
					slidesToScroll: 1
				}
			}
		]
	});

	// SEARCH BUTTON INTERACTION
	$('#search-button').on('click', function(){
		$('#search-form').slideDown();
		$('#search-form').click();
	});

	$('#close-button').click(function(){
		$('#search-form').slideUp();
	});

	// USER BUTTON INTERACTION
	$('#user-button').find('i').on('click', function(){
		$('#user-menu').fadeToggle(400);
	});

	// MY CART BUTTON INTERACTION
	$('#my-cart-button').find('i').click(function(){
		$('#my-cart-button > div').fadeToggle(400);
	});

	// MOBILE PANEL MENU
	$('.im-button').click(function(){
		$('.mobile-panel').toggleClass('active');
		$('body').toggleClass('overflow');
		$('.nav-search').toggle('slow',function(){});
	});

	// CLOSE ELEMENTS LISTENER
	window.addEventListener('click', function(e){
		if(document.getElementById('user-button').contains(e.target)){

		}else{
			$('#user-menu').fadeOut();
		};

		if(document.getElementById('my-cart-button').contains(e.target)){

		}else{
			$('#my-cart-button > div').fadeOut();
		};

		if((document.getElementById('search-form').contains(e.target) && document.getElementById('search-button').contains(e.target)) 
			|| (document.getElementById('search-button').contains(e.target))
			|| (document.getElementById('search-form').contains(e.target))){
		}else{
			$('#search-form').slideUp();
		};
	});

	function viewportListener(viewport){

		if(viewport.matches){
			$('.nav-search').appendTo('.mobile-panel');
			$('.nav-menu').appendTo('.inner-menu');
			$('#search-form').appendTo('.mobile-panel');
		}else{
			$('.nav-search').appendTo('#main-top');
			$('.nav-menu').prependTo('#main-top');
			$('#search-form').appendTo('.header-container');
		}
	}

	var viewport = window.matchMedia('(max-width: 788px)');

	viewportListener(viewport);

	viewport.addListener(viewportListener);


});