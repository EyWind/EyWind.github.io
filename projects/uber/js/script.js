// let menu = document.querySelector('.menu');
// let hamburger = document.querySelector('.hamburger')

// function f1() {
//    this.classList.toggle('hamburger_active');
//    menu.classList.toggle('menu_active');
// }

// hamburger.addEventListener('click', f1);

// function f2() {
//    if (hamburger.classList.contains('hamburger_active')) {
//       hamburger.classList.remove('hamburger_active');
//       menu.classList.remove('menu_active');
//    }
// }

// document.querySelectorAll('.menu li').forEach(e => e.addEventListener('click', f2));


 // Modal
   
$(document).ready(function(){

    $('[data-modal=consultation]').on('click', function() {
       $('.overlay, #consultation').fadeIn('slow');
    });
    $('.modal__close').on('click', function() {
       $('.overlay, #consultationm, #thanks').fadeOut('slow');
    });
    
    // Validation 
    
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





window.addEventListener('DOMContentLoaded', () => {
   const menu = document.querySelector('.menu'),
   menuItem = document.querySelectorAll('.menu_item'),
   hamburger = document.querySelector('.hamburger');

   hamburger.addEventListener('click', () => {
       hamburger.classList.toggle('hamburger_active');
       menu.classList.toggle('menu_active');
   });

   menuItem.forEach(item => {
       item.addEventListener('click', () => {
           hamburger.classList.toggle('hamburger_active');
           menu.classList.toggle('menu_active');
       })
   })
})