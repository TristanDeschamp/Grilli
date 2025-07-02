'use strict';

/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});

/**
 * Ajoute des événements sur plusieurs éléments.
 */
const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}

/**
 * Navbar
 */
const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  const isScrollBottom = lastScrollPos < window.scrollY;
  if (isScrollBottom) {
    header.classList.add("hide");
  } else {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});



/**
 * HERO SLIDER
 */

// Sélectionne le slider principal (balise avec l'attribut data-hero-slider)
const heroSlider = document.querySelector("[data-hero-slider]");

// Sélectionne tous les éléments individuels du slider (chaque slide)
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");

// Bouton "précédent" et "suivant" du slider (icônes de navigation)
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

// Position actuelle dans le slider (index du slide affiché)
let currentSlidePos = 0;

// Stocke le dernier élément actif (slide affiché précédemment)
// Sert à retirer proprement la classe "active" avant d'activer le suivant
let lastActiveSliderItem = heroSliderItems[0];

/**
 * Fonction qui met à jour l'affichage du slider :
 * - retire la classe "active" du slide précédent
 * - ajoute la classe "active" au nouveau slide affiché
 * - mémorise le slide actif comme "dernier actif"
 */
const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

/**
 * Fonction pour passer au slide suivant :
 * - Si on est sur le dernier slide, revient au premier (boucle infinie)
 * - Sinon, avance d'un slide
 * - Met à jour l'affichage via updateSliderPos()
 */
const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }
  updateSliderPos();
}

// Ajoute un événement au clic sur le bouton "suivant" pour faire défiler le slider
heroSliderNextBtn.addEventListener("click", slideNext);

/**
 * Fonction pour passer au slide précédent :
 * - Si on est sur le premier slide, va au dernier (boucle inversée)
 * - Sinon, recule d'un slide
 * - Met à jour l'affichage via updateSliderPos()
 */
const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }
  updateSliderPos();
}

// Ajoute un événement au clic sur le bouton "précédent" pour faire défiler en arrière
heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */
const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  // Calcule la position relative de la souris
  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // Inverse les directions
  x = x - (x * 2);
  y = y - (y * 2);

  // Applique le mouvement à chaque élément avec une vitesse différente.
  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});