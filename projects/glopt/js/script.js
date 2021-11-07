$(document).ready(function(){

   function menuToggle (el) {
      $(el).on('click', () => {
         $('.hamburger').toggleClass('hamburger_active');
         $('.menu').toggleClass('menu_active');
      })
   };

   menuToggle('.hamburger');
   menuToggle('.menu__links a');

   // toggle cards 

   function toggleCard (item) {
      $(item).each(function (i) {
         $(this).on('click', function (e) {
            e.preventDefault();
            $('.price__item-front').eq(i).toggleClass('price__item-front_active');
            $('.price__item-back').eq(i).toggleClass('price__item-back_active');
         });
      });
   };

   toggleCard('.price__item-front__btn');
   toggleCard('.price__item-back__back');

   // carousel

   $('.feedback__carousel').slick({
      speed: 700,
      infinite: false,
      prevArrow: `<button type="button" class="slick-prev"><img src="../icons/feedback/arrow_left.png"></button>`,
      nextArrow: `<button type="button" class="slick-next"><img src="../icons/feedback/arrow_right.png"></button>`,
      variableWidth: true,
      slidesToShow: 1,
      centerMode: true,
      centerPadding: '50px'

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

   formValidate('.order form');
   formValidate('.question form');
   formValidate('#order-modal form');
   formValidate('#question-modal form');


      // Modal
   
      $('[data-modal=order]').on('click', function() {
         $('.overlay, #order-modal').fadeIn('slow');
      });

      $('[data-modal=question]').on('click', function() {
         $('.overlay, #question-modal').fadeIn('slow');
      });

      $('.modal__close').on('click', function() {
         $('.overlay, #order-modal, #question-modal, #thanks').fadeOut('slow');
      });
   
   
      // scroll-up fade

      $(window).scroll(function(){
         if ($(this).scrollTop() > 1600) {
            $('.page-up').fadeIn('slow');
         } else {
            $('.page-up').fadeOut('slow');
         }
      });
   
      // smooth scroll 
   
      $("a[href='#up'], .menu__links a").click(function(){
         const _href = $(this).attr('href');
         $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
         return false;
      });
      
});
