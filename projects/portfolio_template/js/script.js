$(document).ready(function(){     

	function formValidate (form) {      // as a function coz we need to validate more then one form...
		$(form).validate ({
			rules: {                                         // here we can set what name element is required for exmaple 
				name: {                                      // we have name attribute in our HTML  name: name 
					required: true,                        // set minmum number of symbols to 2
					minlength: 2
				},
				email: {
					required: true,                       
					email: true                             // tell plagin that this field will need to be validated as email
				},
				checkbox: "required"
			},
			messages: {                              // customize error msg 
				name: {
					required: "Пожалуйста, введите свое имя!",
					minlength: jQuery.validator.format("Минимум {0} символа!")
				},
				email: {
					required: "Пожалуйста, введите свой e-mail!",
					email: "Ваш e-mail должен быть такого формата: name@domain.com"
				},
				checkbox: {
					required: "Пожалуйста, подтвердите что вы согласны с политикой конфиденциальности"
				}
			}
		});
	}
	
	formValidate('.contacts__form');

	$(window).scroll(function(){
		if ($(this).scrollTop() > 1600) {
			$('.page-up').fadeIn('slow');
		} else {
			$('.page-up').fadeOut('slow');
		}
	});

	// $("a[href='#up']").click(function(){
	// 	const _href = $(this).attr('href');
	// 	$('html, body').animate({scrollTop: $(_href).offset().top+'px'});
	// 	return false;
	// });

	function smoothScroll (el) {
		$(el).click(function(){
			const _href = $(this).attr('href');
			$('html, body').animate({scrollTop: $(_href).offset().top+'px'});
			return false;
		});
	} 

	smoothScroll("a[href='#up']");
	smoothScroll("nav a[href^='#']");
	smoothScroll(".promo a[href^='#']");
	
});

const hamburger = document.querySelector('.hamburger'),
	closeBtn = document.querySelector('.menu__close'),
	menu = document.querySelector('.menu'),
	menuLink = document.querySelectorAll('.menu__link a');

hamburger.addEventListener('click', () => {
	menu.classList.add('active');
});

closeBtn.addEventListener('click', () => {
	menu.classList.remove('active');
});

menuLink.forEach(el => el.addEventListener('click', () => {
	menu.classList.remove('active');
}));

const progress = document.querySelectorAll('.skills__ratings-progress span'),
	counter = document.querySelectorAll('.skills__ratings-counter');

function pBarCalc () {
	counter.forEach((el, i) => {
		progress[i].style.width = el.innerHTML;
	})
}
pBarCalc();

const promoLink = document.querySelectorAll('.promo__link');

promoLink.forEach(el => {
	el.addEventListener('click', () => {
		if (!el.classList.contains('button')) {
			promoLink.forEach(el => el.classList.toggle('button'));
		}
	});
});