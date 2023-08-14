'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

//smooth scroll
const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

//Modal window functions
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

for (let i = 0; i < btnsOpenModal.length; i++)
  btnsOpenModal[i].addEventListener('click', openModal);

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

btnScrollTo.addEventListener('click', () => {
  /*TODO:1.getBoundingClientRect can be called on any element and it will return width hieght and 
  coordinates of element including x y and space from top left right bottom just CONSIDER 
  all this coordinates are calculate based on viewport size and also 
  if you scroll then you change position so they will change (they're dynamic)*/
  //console.log(e.target.getBoundingClientRect());
  /*TODO:2 window.scrollY return how much have you scroll downed from the top, when you're at the
  top of the page like navbar then this will be 0 but if you scroll down it will get values*/
  //console.log(window.scrollX);
  /*TODO:3 document.documentElement.clientHeight will return viewport hight and .clientWidth will return width*/
  //console.log(document.documentElement.clientHeight);
  /*TODO: old way => We will get the position of section 1 related to current top based on how much we have scrolled
   then we get how much we have scrolled from top then calculate thier sum and scroll to that position*/
  /* const objScroll = {
    top: section1.getBoundingClientRect().top + window.scrollY,
    left: section1.getBoundingClientRect().left + window.scrollX,
    behavior: 'smooth',
  };
  window.scrollTo(objScroll); */
  //element.scrollIntoView() only takes behavior and we DON'T need to calculate scroll and el top and left
  section1.scrollIntoView({ behavior: 'smooth' });
});
