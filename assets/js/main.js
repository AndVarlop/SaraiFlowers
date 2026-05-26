/*=============== SHOW MENU ===============*/
const navMenu = document.getElementById('nav-menu'),
    navToggle = document.getElementById('nav-toggle'),
    navClose = document.getElementById('nav-close')

/* Menu show */
if (navToggle) {
    navToggle.addEventListener('click', () => {
        navMenu.classList.add('show-menu')
    })
}

/* Menu hidden */
if (navClose) {
    navClose.addEventListener('click', () => {
        navMenu.classList.remove('show-menu')
    })
}

/*=============== REMOVE MENU MOBILE ===============*/
const navLink = document.querySelectorAll('.nav__link')

const linkAction = () => {
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show-menu')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*=============== ADD BLUR HEADER ===============*/
const blurHeader = () => {
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the blur-header class to the header tag
    this.scrollY >= 50 ? header.classList.add('blur-header')
        : header.classList.remove('blur-header')
}
window.addEventListener('scroll', blurHeader)

/*=============== SHOW SCROLL UP ===============*/ 
const scrollUp = () => {
    const scrollUp = document.getElementById('scroll-up')
    // When the scroll is higher than 350 viewport height, add the show-scroll class to the a tag with the scrollup class
    this.scrollY >= 350 ? scrollUp.classList.add('show-scroll')
        : scrollUp.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollUp)

/*=============== SCROLL SECTIONS ACTIVE LINK ===============*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () => {
    const scrollDown = window.scrollY

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight,
            sectionTop = current.offsetTop - 58,
            sectionId = current.getAttribute('id'),
            sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')

        if (scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight) {
            sectionsClass.classList.add('active-link')
        } else {
            sectionsClass.classList.remove('active-link')
        }
    })
}
window.addEventListener('scroll', scrollActive)

/*=============== SCROLL REVEAL ANIMATION ===============*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '40px',
    opacity: 1,
    scale: 1.1,
    duration: 1200,
    deplay: 300,
    //reset: true, // animations repeat
})

// sr.reveal('.home__data') — handled by anime.js below

//Home animation
sr.reveal('.home__image', {rotate: {z: -15}})
sr.reveal('.home__flower', {rotate: {z: 15}})

//Flower animation
sr.reveal('.flower__card:nth-child(1) img', { rotate: {z: 15, distance: 0} })
sr.reveal('.flower__card:nth-child(2) img', { rotate: {z: -30, distance: 0, delay: 600} })
sr.reveal('.flower__card:nth-child(3) img', { rotate: { z: 15, distance: 0, delay: 900 } })
sr.reveal('.flower__card:nth-child(4) img', { rotate: { z: -30, distance: 0, delay: 1200 } })

/*=============== ANIME.JS ===============*/
;(function initAnime() {
  if (typeof anime === 'undefined') return;

  const { animate, stagger } = anime;

  /* Hero entrance */
  animate('.home__title', {
    translateY: [55, 0],
    opacity: [0, 1],
    duration: 1400,
    ease: 'outExpo',
    delay: 150
  });

  animate('.home__data .button', {
    translateY: [25, 0],
    opacity: [0, 1],
    duration: 950,
    ease: 'outBack',
    delay: 800
  });

  /* Main flower floating loop */
  animate('.home__img', {
    translateY: [-11, 11],
    duration: 2900,
    direction: 'alternate',
    loop: true,
    ease: 'inOutSine'
  });

  /* Flower cards staggered entrance on scroll */
  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate('.flowers__card', {
        translateY: [55, 0],
        opacity: [0, 1],
        scale: [0.93, 1],
        duration: 1050,
        ease: 'outBack',
        delay: stagger(230)
      });
      cardObserver.disconnect();
    });
  }, { threshold: 0.12 });

  const flowersGrid = document.querySelector('.flowers__content');
  if (flowersGrid) cardObserver.observe(flowersGrid);

  /* Gallery items entrance */
  const galleryObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate('.gallery__item', {
        scale: [0.92, 1],
        opacity: [0, 1],
        duration: 600,
        ease: 'outBack',
        delay: stagger(55)
      });
      galleryObserver.disconnect();
    });
  }, { threshold: 0.04 });

  const galleryGrid = document.querySelector('.gallery__grid');
  if (galleryGrid) galleryObserver.observe(galleryGrid);

  /* About section entrance */
  const aboutObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate('.about__data', {
        translateY: [35, 0],
        opacity: [0, 1],
        duration: 1100,
        ease: 'outExpo'
      });
      aboutObserver.disconnect();
    });
  }, { threshold: 0.08 });

  const aboutData = document.querySelector('.about__data');
  if (aboutData) aboutObserver.observe(aboutData);

  /* Credit entrance */
  const creditObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      animate('.credit__content', {
        scale: [0.9, 1],
        opacity: [0, 1],
        duration: 1200,
        ease: 'outBack'
      });
      creditObserver.disconnect();
    });
  }, { threshold: 0.2 });

  const creditContent = document.querySelector('.credit__content');
  if (creditContent) creditObserver.observe(creditContent);
})();

/*=============== FLIP CARDS ===============*/

/* Galería — clic en cualquier parte del item */
document.querySelectorAll('.gallery__item.flip-card').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('is-flipped'));
});

/* Flores — clic en el icono de flor para voltear */
document.querySelectorAll('.flowers__flip-trigger').forEach(trigger => {
  trigger.addEventListener('click', (e) => {
    e.stopPropagation();
    trigger.closest('.flowers__card').classList.add('is-flipped');
  });
});

/* Flores — botón cerrar en el reverso */
document.querySelectorAll('.flowers__back-close').forEach(btn => {
  btn.addEventListener('click', (e) => {
    e.stopPropagation();
    btn.closest('.flowers__card').classList.remove('is-flipped');
  });
});

/*=============== PETAL RAIN ===============*/
;(function createPetals() {
  const container = document.getElementById('petals-container');
  if (!container) return;

  const count = 24;

  for (let i = 0; i < count; i++) {
    const petal = document.createElement('div');
    const isTulip = Math.random() < 0.65; // tulipanes = favorita, más de ellas

    petal.className = 'petal ' + (isTulip ? 'petal-tulip' : 'petal-gerbera');

    const size    = 9 + Math.random() * 13;
    const left    = Math.random() * 100;
    const dur     = 7500 + Math.random() * 9000;
    const delay   = Math.random() * 7000;

    petal.style.cssText =
      'width:'              + size  + 'px;' +
      'height:'             + size  + 'px;' +
      'left:'               + left  + '%;'  +
      'animation-duration:' + dur   + 'ms;' +
      'animation-delay:-'   + delay + 'ms;';

    container.appendChild(petal);
  }
})();

