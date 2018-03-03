 $(document).ready(function(){
	
	// MAIN CAROUSEL
	$('.main-carousel').slick({
		arrows: false,
		dots: true,
		speed: 800,
		fade: true,
		cssEase: 'linear',
		autoplay: true,
		autoplaySpeed: 5000
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
		$('#search-input').focus();
		$('#search-form').click();
	});

	$('#close-button').click(function(){
		$('#search-form').slideUp();
		$('#search-input').val('');
	});

	// USER BUTTON INTERACTION
	$('#user-button').find('i').on('click', function(){
		$('#user-menu').fadeToggle(400);
	});

	// MY CART BUTTON INTERACTION
	$('.cart-icon').click(function(){
		$('#cart').fadeToggle(400);
	});

	// MOBILE PANEL MENU
	$('.im-button').click(function(){
		$('.mobile-panel').toggleClass('active');
		$('body').toggleClass('overflow');
		$('.nav-search').toggle('slow',function(){});
	});

	// CLOSE ELEMENTS LISTENER
	window.addEventListener('click', function(e){
		if($('#user-button').get(0).contains(e.target)){

		}else{
			$('#user-menu').fadeOut();
		};

		if($('#my-cart-button').get(0).contains(e.target) || $(e.target).data('clicked')){

		}else{
			$('#cart').fadeOut();
		};

		if(($('#search-form').get(0).contains(e.target) && $('#search-button').get(0).contains(e.target)) 
			|| ($('#search-button').get(0).contains(e.target))
			|| ($('#search-form').get(0).contains(e.target))){
		}else{
			$('#search-form').slideUp();
			$('#search-input').val('');
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

	function scrollFunction() {
		if (document.body.scrollTop > 100 || document.documentElement.scrollTop > 100) {
			$('#toTop').fadeIn();
		} else {
			$('#toTop').fadeOut();
		}
	}

	window.onscroll = function(){scrollFunction()};

	$('#toTop').click(function(){
		$('body').scrollTop(0);
		$(document.documentElement).scrollTop(0);
	});

	// CART

	$('.add-cart').click(function(event){
		event.preventDefault();
		$('#cart').addClass('filled');
		var productID = $(this).data('id');
		var product = $(this).closest('.slide');
		var product_name = product.find('.product-name').text();
		var price = product.find('.price');
		var img = product.find('img:first-child');
		var priceFloat = parseFloat(price.text());

		var li_product = document.createElement('li');

		var productsAmount = $('#productID-'+productID);
		
		if (productsAmount.length){

			var quant = parseInt(productsAmount.text()) + 1;

			productsAmount.text(quant);

			productsAmount.next().text((quant * priceFloat).toFixed(2) + '$');

		}else{

			$(li_product).addClass('cart_products clearfix').html('<div>' +
									'<p>' + product_name + '</p>' +
									'<div class="quantity">' +
									'<span id="productID-' + productID + '">1</span>' +
									' &#x2716; '+
									'<span data-oprice="'+ priceFloat +'">' + price.text() + '</span>'+
									'</div>' +
									'<button data-clicked=true onclick="removeProduct(this)" class="delete_product">&#x2716;</button>');
			$('#cart ul').append(li_product);

			$(li_product).prepend(img.clone());

		}
		refreshValues();
	});
});

function removeProduct(e){

	var quantity = $(e).closest('.cart_products').find('.quantity span:first-child');
	var price = parseFloat(quantity.next().data('oprice'));

	if(quantity.text() == 1){
		$(e).closest('.cart_products').remove();
	}else{
		var numQuant = parseInt(quantity.text());
		quantity.text(--numQuant);
		quantity.next().text((numQuant * price).toFixed(2) + '$');
	}

	if($('#cart ul').children().length == 0){
		$('#cart').removeClass('filled');
	}

	refreshValues();

 }

 function refreshValues(){
 	var prices = $('.quantity span:last-child');
 	var items = $('.quantity span:first-child');
 	var subTotal = 0;
 	var incart_counter = 0;

 	for(var i=0; i < prices.length; i++){
 		subTotal+= parseFloat($(prices[i]).text());
 		incart_counter+= parseInt($(items[i]).text());
 	}

 	$('#cart_total span').text(subTotal.toFixed(2) + '$');
 	$('#incart-counter').text(incart_counter);

 }