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

//navbar
const navLinks = document.querySelector('.nav__links');

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

//Smooth scroll to section 1

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

//nav links smooth scrolling to thier related section
function navLinksScroll(e) {
  e.preventDefault();
  /*since we have attached the eventListener to parent element, Now we need a Mathching strategy other wise even when we
   click on .nav__links space where there are no link this will get executed but we need this for only real links*/
  //e.target.classList.length === 1 this condition is to exclude .nav__link--btn from other .nav__link elements
  //Matching Strategy
  if (
    e.target.classList.contains('nav__link') &&
    e.target.classList.length === 1
  ) {
    /*the href is same as id of the section we want to scroll to so we can get that from .nav__link 
    and scroll to section with same id, however we should use getArribute method otherwise we get 
    the complete absolute href, something like site.com/sectionid or 127.0.0.1:8080/sectionid
    but no section has that id, we ONLY need the relative href which is section id*/
    const matchingSection = document.querySelector(
      e.target.getAttribute('href')
    );
    matchingSection.scrollIntoView({ behavior: 'smooth' });
  }
}

/*adding Eventlistener to parent element of each of the .navlink elements which is .navlinks
if an click event happen at any of .navlink elements, then during bubbling phase it will also happen at thier parent,
and we use that instead of attaching the event to all the link, this will prevent us from OVERWRITING our function for
every .nav__link, this way our function is only written once for parent element*/
navLinks.addEventListener('click', navLinksScroll);
