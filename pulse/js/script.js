$(document).ready(function(){

	// Карусель/Слайдер
	$('.carousel__inner').slick({
		speed: 1200,
		adaptiveHeight: true,
		prevArrow: '<button type="button" class="slick-prev"><img src="icons/left-skip.svg"></button>',
		nextArrow: '<button type="button" class="slick-next"><img src="icons/right-skip.svg"></button>',
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 600,
				settings: {
					dots: true,
					arrows: false
				}
			},
			{
				breakpoint: 480,
				settings: {
					dots: true,
					arrows: false
				}
			}
		]
	});

	// Табы/Переключение между табами, закрепление таба за контентом
	$('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
		$(this)
			.addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
			.closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
	});

	// Функционал кнопок "Подробнее" и "Назад"
	function toggleSlide(item) {
		$(item).each(function(i) {
			$(this).on('click', function(e) {
				e.preventDefault();
				$('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
				$('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
			})
		});
	};

	toggleSlide('.catalog-item__link');
	toggleSlide('.catalog-item__back');


	// Modal

	$('[data-modal=consultation]').on('click', function() {
		$('.overlay, #consultation').fadeIn();
	});
	$('.modal__close').on('click', function() {
		$('.overlay, #consultation, #order, #thanks').fadeOut();
	});
	$('.button_mini').each(function(i) {
		$(this).on('click', function() {
			$('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text())
			$('.overlay, #order').fadeIn();		
		});
	});

	function valideForms(form) {
		$(form).validate({
			rules: {
				name: {
			      required: true,
			      minlength: 2
			    },
				phone: "required",
				email: {
					required: true,
					email: true
				}
			},
			messages: {
			    name: {
			      required: "Пожалуйста, введите своё имя",
			      minlength: jQuery.validator.format("Введите {0} символа!")
			    },
			    phone: "Пожалуйста, введите свой номер телефона",
			    email: {
			      required: "Пожалуйста, введите свою почту",
			      email: "Неправильно введен адрес почты"
			    }
			}
		});
	};

	valideForms('#consultation-form');
	valideForms('#consultation form');
	valideForms('#order form');

	$('input[name=phone]').mask("+7 (999) 999-99-99");

	$('form').submit(function(e) {
		e.preventDefault();

		if (!$(this).valid()){
			return;
		}

		$.ajax({
			type: "POST",
			url: "mailer/smart.php",
			data: $(this).serialize()
		}).done(function() {
			$(this).find("input").val("");
			$('#consultation, #order').fadeOut();
			$('.overlay, #thanks').fadeIn("slow");

			$('form').trigger('reset');
		});
		return false;
	});

	// Smooth scroll and pageup
	$(window).scroll(function() {
		if ($(this).scrollTop() > 1600) {
			$('.pageup').fadeIn();
		} else {
			$('.pageup').fadeOut();
		}
	});

	$("a[href^='#up']").on('click', function(event) {
	    
      // Prevent default anchor click behavior
      event.preventDefault();

      // Store hash
      var hash = this.hash;

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area
      $('html, body').animate({
        scrollTop: $(hash).offset().top
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
        window.location.hash = hash;
      });
	});

	new WOW().init();
});