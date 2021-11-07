$(document).ready(function(){     


  /* animation on scroll plagin */

  AOS.init({
    offset: 200,
    duration: 500,
    easing: 'ease-in-sine',
  });


  /* JQuery Form Validator  */

  function formValidate (form, nReq, nMinLngth, eReq, eFor, tReq) {      // as a function coz we need to validate more then one form...
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
        textarea: "required"
			},
			messages: {                              // customize error msg 
				name: {
					required: nReq,
					minlength: jQuery.validator.format(nMinLngth)
				},
				email: {
					required: eReq,
					email: eFor
				},
        textarea: {
          required: tReq,
        }
			}
		});
    
	}


  /* simple (probably dumb) solution translation for form validator, maybe i should rework it */
  const fT = [
    ["Name is required.", "Введите Имя"],
    ["{0} symbols or more.", "Не менее {0} символов."],
    ["Email is Required!", "Введите Ел-почту."],
    ["E-mail should be in this format: name@domain.com", "Ел-почта должна быть такого формата: имя@домен.com."],
    ["Comment is required.", "Введите комментарий."]
  ];
  
  if (window.location.hash == '#en') {
    formValidate('.contacts__form', fT[0][0], fT[1][0], fT[2][0], fT[3][0], fT[4][0]);
  } else {
    formValidate('.contacts__form', fT[0][1], fT[1][1], fT[2][1], fT[3][1], fT[4][1]);
  }



  /* change menu on scroll  */

  $(window).scroll(function () {
    $('.menu').toggleClass('menu_sticky', window.scrollY > 0);
  });


  /* show/hide Pageg up btn  */
	$(window).scroll(function(){
		if ($(this).scrollTop() > 1600) {
			$('.page-up').fadeIn('slow');
		} else {
			$('.page-up').fadeOut('slow');
		}
	});

  /* smooth scroll  */

  function smoothScroll (el) {
    $(el).click(function(){
      const _href = $(this).attr('href');
      $('html, body').animate({scrollTop: $(_href).offset().top+'px'});
      return false;
    });
  } 

  smoothScroll("a.page-up");
  smoothScroll("nav a[href^='#']");
  smoothScroll(".promo a[href^='#']");



  /* click-scroll/spy-scroll  plagin */

  function clickScroll () {

    const sectionArray = [1, 2, 3, 4, 5, 6];

    $.each(sectionArray, function(index, value){
              
        $(document).scroll(function(){
            const offsetSection = $('#' + 'section_' + value).offset().top;
            const docScroll = $(document).scrollTop();
            const docScroll1 = docScroll + 1;
            
            if ( docScroll1 >= offsetSection ){
                $('li a').removeClass('active');
                $('li a:link').addClass('inactive');  
                $('li a').eq(index).addClass('active');
                $('li a:link').eq(index).removeClass('inactive');
            }
        });
        $('li a').eq(index).click(function(e){
            const offsetClick = $('#' + 'section_' + value).offset().top;
            e.preventDefault();
            $('html, body').animate({
                'scrollTop':offsetClick
            }, 300)
        });   
    });
    $(document).ready(function(){
        $('li a:link').addClass('inactive');    
        $('li a').eq(0).addClass('active');
        $('li a:link').eq(0).removeClass('inactive');
    });

  };

  clickScroll();



  /* Dropdown Menu plagin */

  function dropDownMenu () {
    $('.dropdown').click(function () {
      $(this).attr('tabindex', 1).focus();
      $(this).toggleClass('active');
      $(this).find('.dropdown-menu').slideToggle(300);
    });
    $('.dropdown').focusout(function () {
      $(this).removeClass('active');
      $(this).find('.dropdown-menu').slideUp(300);
    });
    $('.dropdown .dropdown-menu li').click(function () {
      $(this).parents('.dropdown').find('span').text($(this).text());
      $(window).scrollTop(0);
    });
  }
  dropDownMenu()



  /* mobile menu and burger class change */

  function menuTgl () {

    const hamburger = $('.hamburger'),
    menu = $('.menu__block'),
    menuLink = $('.menu__link a');

    function menuClassToggle (el) {
      el.click(function() {
        menu.toggleClass('active');
        hamburger.toggleClass('active');
      })
    }

    menuClassToggle(hamburger);

    menuLink.each(function() {
      menuClassToggle($(this));
    });

  }
  menuTgl();



  /* hide overlay on click */
  $('.modal__close').click(function () {
    $('.overlay').fadeOut('slow');
  }) 


  /* age calc for about section */

  function calcAge () {
    const date = new Date(),
      crntYear = date.getFullYear(),
      crntDay = date.getDate(),
      crntMnth = date.getMonth(),
      birthYear = +$('.birth-year').text(),
      myAge = $('.my-age');
  
    if (crntMnth == 8 && crntDay >= 6 || crntMnth >= 9 ) {
      myAge.text(crntYear - birthYear);
    } else myAge.text(crntYear - birthYear - 1);
  }
  calcAge();

  

  /* progress bar animation on view */
  function progressBar () {
    
    /* triger progress barr calc functuin when it is comes into view */
    let observer = new IntersectionObserver(function(entries) {
      if(entries[0].isIntersecting === true)
      pBarCalc();
      
    }, { threshold: [0.8] });
    
    const skillRatings = ($(".skills__ratings")[0]);
    observer.observe(skillRatings);
    
    /* progress bar, takes value from data-val of counter asings it to progress bar */  
  
    function pBarCalc () {
      const progress = $('.skills__ratings-progress span'),
      counter = $('.skills__ratings-counter');

      observer.unobserve(skillRatings);
      
      counter.each(function (i, e) {
        move(progress[i], e);
      })
  
      /* animated progress bar */
  
      function move(el, cntr) {
        let i = 0;
        if (i == 0) {
          i = 1;
          let width = 1;
          let id = setInterval(frame, 20);
          function frame() {
            if (width >= +cntr.getAttribute('data-val')) {
              clearInterval(id);
              i = 0;
            } else {
              width++;
              el.style.width = width + "%";
              cntr.innerHTML = width  + "%";
            }
          }
        }
      }
    }

  };

  progressBar();


  /* mailer that will let us send date to the mailbox using php script */

  function mailer () {
    $('form').submit(function(e) {      // forms that you want, currently all forms
      e.preventDefault();             // to prevent page reaload
  
      if (!$(this).valid()) {         // to prevent sending empty letter 
          return;
      }
  
      $.ajax({
          type: 'POST',
          url: 'mailer/smart.php',
          data: $(this).serialize()       // prepare data before sending it to server
      }).done(function() {
          $(this).find('input').val('');  // clear all inputs after form submit
          $('.overlay, #thanks').fadeIn('slow');
  
          $('form').trigger('reset');     // reset/clear all forms
      });
      return false;
    });
  };

  mailer();


});

/* typed text plagin*/

function typedText () {
  
  const typedTextSpan = document.querySelector(".typed-text");
  const cursorSpan = document.querySelector(".cursor");
  
  let textArray = ["Serj Shovkun.", "A Web Developer."];
  if (window.location.hash == '#ru') textArray = ["Серж Шовкун.", "Веб Разработчик."];
  const typingDelay = 200;
  const erasingDelay = 100;
  const newTextDelay = 2000; // Delay between current and next text
  let textArrayIndex = 0;
  let charIndex = 0;
  
  function type() {
    if (charIndex < textArray[textArrayIndex].length) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent += textArray[textArrayIndex].charAt(charIndex);
      charIndex++;
      setTimeout(type, typingDelay);
    } 
    else {
      cursorSpan.classList.remove("typing");
      setTimeout(erase, newTextDelay);
    }
  }
  function erase() {
    if (charIndex > 0) {
      if(!cursorSpan.classList.contains("typing")) cursorSpan.classList.add("typing");
      typedTextSpan.textContent = textArray[textArrayIndex].substring(0, charIndex-1);
      charIndex--;
      setTimeout(erase, erasingDelay);
    } 
    else {
      cursorSpan.classList.remove("typing");
      textArrayIndex++;
      if(textArrayIndex>=textArray.length) textArrayIndex=0;
      setTimeout(type, typingDelay + 1100);
    }
  }
  
  document.addEventListener("DOMContentLoaded", function() { // On DOM Load initiate the effect
    if(textArray.length) setTimeout(type, newTextDelay + 250);
  });
  
}
typedText();



/* multi language  */

function multiLanguage () {
  
  const allLang = ['en', 'ru'];
  const select = document.querySelectorAll('.dropdown-menu li');
  
  select.forEach(el => {
    el.addEventListener('click', changeURLlanguage);
  })
  
  function changeURLlanguage () {
    let lang = this.getAttribute('id');
    location.href = window.location.pathname + '#' + lang;
    location.reload();
  }
  
  function changeLanguage () {
    let active = document.querySelector('.dropdown .select span');
    let hash = window.location.hash;
    let current;
    hash = hash.substr(1);
    
    if(!allLang.includes(hash)) {
      location.href = window.location.pathname + '#en';
      current = document.querySelector('#en');
      location.reload();
    } else {
      current = document.querySelector('#' + hash);
    }
    
    active.innerHTML = current.innerHTML;
    
    document.querySelector('title').innerHTML = langArr['title'][hash];
    
    for (let key in langArr) {
      let el = document.querySelectorAll('.lng-' + key);
      el.forEach(e => {
        if (e && langArr[key][hash]) {
          e.innerHTML = langArr[key][hash];
        }
      })
    }
  }
  
  changeLanguage();
  
}

multiLanguage();



/* change things on #ru hash that does not change multiLanguage fn */
function changeElOnRu () {

  /* change width of about__item */
  const aboutItemRu = document.querySelectorAll('.info_big .about__item');

  /* change translation of form placeholders */
  const placeHolders = document.querySelectorAll('form [placeholder]');

  /* translate form error's */
  const nameEr = document.querySelector('#name-error');

  if (window.location.hash == '#ru') {
    aboutItemRu.forEach(e => e.style.gridTemplateColumns = "130px auto");

    placeHolders[0].setAttribute('placeholder', 'Имя');
    placeHolders[1].setAttribute('placeholder', 'Ел-почтa');
    placeHolders[2].setAttribute('placeholder', 'Сообщение . . .');

  } 
}

changeElOnRu();



/* Color-picker plagin + change css variable var(--active-color) to the one that chosen */

function replaceWithColorBox(source) {
  const root = document.querySelector(':root'),
    rootStyles = getComputedStyle(root);
  if (source.hasColorBox) {
      return;
  }
  source.hasColorBox = true;
  let box = document.createElement('span'),
      color = source.value;
  box.className = 'color-box';
  box.value = color; // Hacky :(
  box.style.backgroundColor = color;
  source.parentNode.insertBefore(box, source);
  source.type = 'hidden';
  const picker = new CP(box);
  picker.on('change', function(r, g, b, a) {
      let color = this.color(r, g, b, a);
      source.value = color;
      this.source.value = color; // Hacky :(
      this.source.style.backgroundColor = color;
      root.style.setProperty('--active-color', color);
  });
}

replaceWithColorBox(document.querySelector('#color'));


  /* mobile adaptation for progress bar */

  function mobileA () {
    let cntr = document.querySelectorAll('.skills__ratings-counter');
    let prgrs = document.querySelectorAll('.skills__ratings-progress span');

    if (screen.width <= 400) {
      cntr.forEach((e, i) => {
        prgrs[i].style.width = e.getAttribute('data-val') + '%';
        e.innerHTML = e.getAttribute('data-val') + '%';
      })
    }
  }
  mobileA();

