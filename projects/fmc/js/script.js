$(document).ready(function () {

   function carousel(carousel, arrow, dotsVal) {
      $(carousel).slick({    
         speed: 1300,
         dots: dotsVal,
         customPaging: function () {
            return '<span class="dot"></span>';
         },
         prevArrow: `<button type="button" class="slick-prev"><img src="icons/${arrow}/arrow_left.png"></button>`,
         nextArrow: `<button type="button" class="slick-next"><img src="icons/${arrow}/arrow_right.png"></button>`,
         variableWidth: true,
         responsive: [
            {
               breakpoint: 768,
               settings: {
                  arrows: false,
                  dots: true
               }
            }
         ]
      });
   };

   carousel('.promo__carousel', 'first_screen', true);
   carousel('.solutions__carousel', 'third_screen', false);

   
   // catalog
   $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
      $(this)
         .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
         .closest('div.catalog').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
   });

   // hamburger and menu 

   function toggleHamburger (el) {
      $(el).on('click', function () {
         $('.hamburger').toggleClass('hamburger-active');
         $('.menu').toggleClass('menu-active');
         $('.contacts').removeClass('contacts-active');
      });
   };

   toggleHamburger('.hamburger');
   toggleHamburger('.menu__list');

   // contacts toggle 

   $('.promo__arrow').on('click', function() {
      $(this).toggleClass('promo__arrow-active');
      $('.contacts').toggleClass('contacts-active');
   });

   // modal 

   $('.button').on('click', function() {
      $('.overlay, #consultation').fadeIn('slow');
   });

   $('.modal__close').on('click', function() {
      $('.overlay, #consultationm, #order, #thnaks').fadeOut('slow');
   });

   function formValidate (form) {
      $(form).validate ({
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
               required: "Пожалуйста, введите свое имя!",
               minlength: jQuery.validator.format("Минимум {0} символа!")
            },
            phone: "Пожалуйста, введите свой номер телефона!",
            email: {
               required: "Пожалуйста, введите свой e-mail!",
               email: "Ваш e-mail должен быть такого формата: name@domain.com"
            }
         }
      });
   }

   formValidate('#consultation form');

   
});
