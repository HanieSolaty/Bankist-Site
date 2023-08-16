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
const nav = document.querySelector('.nav');
const navLogo = document.querySelector('.nav__logo');

//Tabbed Component
const tabContianer = document.querySelector('.operations__tab-container');

//header section
const headerSection = document.querySelector('header');

//all sections
const sections = document.querySelectorAll('.section');

//imgs in feature section
//selecting el[attr] will return element with given attr
const featureImgs = document.querySelectorAll('img[data-src]');

//slider
const sectionSlider = document.querySelector('.slider');
const slides = document.querySelectorAll('.slide');
const btnSliderRight = document.querySelector('.slider__btn--right');
const btnSliderLeft = document.querySelector('.slider__btn--left');
const dotsContainer = document.querySelector('.dots');

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Functionality

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

function tabbedComponent(e) {
  /*when we click on the button we can also click on the span which contians btn number and then we get that span
  as e.target but we don't want the span in the btn with want the btn itself, since span is whithin btn and therefor
  a child of btn we can use element.closest('.operations__tab') method to find the closest parent with class .operations__tab
  of element click, if we click on the btn itself which has this class the btn will be returned and if we click on the span
  which doesn't have this class .closest() will look for a parent with this class, namely btn and in both cases we get btn*/
  const clickedBtn = e.target.closest('.operations__tab');
  /*if we click outside of btn in tabContianer then since it is parent of clickedBtn, clickedBtn will be null and no
  btns are clicked so we simply return from here and stop*/
  if (!clickedBtn) return;
  //remove active class from all btn and then add it to the btn that was clicked
  document.querySelectorAll('.operations__tab').forEach(btn => {
    btn.classList.remove('operations__tab--active');
  });
  clickedBtn.classList.add('operations__tab--active');
  //element.dataset give us data- attr of el and each word after data- will be used like this data-tab => el.dataset.tab
  const selectedContent = document.querySelector(
    `.operations__content--${clickedBtn.dataset.tab}`
  );
  document.querySelectorAll('.operations__content').forEach(btn => {
    btn.classList.remove('operations__content--active');
  });
  selectedContent.classList.add('operations__content--active');
}

tabContianer.addEventListener('click', tabbedComponent);

//nav link hover
function handleHover(e) {
  if (e.target.classList.contains('nav__link')) {
    const hoverdLink = e.target;
    document.querySelectorAll('.nav__link').forEach(link => {
      link.style.opacity = this;
    });
    navLogo.style.opacity = this;
    hoverdLink.style.opacity = 1;
  }
}

//hover event for navlinks
//this is 1 approach to send an arg to eventHandler we have to call a function and in that function call the handler
/* nav.addEventListener('mouseover', function (e) {
  e.opacity = 0.5;
  handleHover(e);
  //  handleHover.bind(0.5);
}); */

/*this is 2 approach to send an arg to eventHandler we have to use bind method which will gives us the same function but
 it will also set the this KEYWORD to what ever value here (0.5) or any object we gave to
 so in the function we can get opacity by simply using the bind method*/
nav.addEventListener('mouseover', handleHover.bind(0.5));

nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navbar
//using IntersectionObserver
const navHight = nav.getBoundingClientRect().height;
function headerObserverFunction(entries) {
  entries.forEach(entry => {
    /*when we have passed header into section1 and also passed excatly height of navbar (because of rootMargin) then 
    entry function will get called. 2 below lines show this. height = y passed from section 1*/
    /* console.log(nav.getBoundingClientRect().height);
    console.log(section1.getBoundingClientRect().y); */
    if (!entry?.isIntersecting) {
      nav.classList.add('nav-sticky');
    } else nav.classList.remove('nav-sticky');
  });
}

//root: null, means check for intersection with whole viewport (no spesific el),
//threshold: 0, means as soon any part of observed el is in viewport or when it's completely out
/*rootMargin: `${navHight}px`, is alos to add navbar hieght to the amount of root el (in this case vp) before we act on threshold,
this will basically wait to reach or pass threshold % of observed el and then it will call the handler*/
const headerObserver = new IntersectionObserver(headerObserverFunction, {
  root: null,
  threshold: 0,
  rootMargin: `${navHight}px`,
});

headerObserver.observe(headerSection);

//Revealing each section on scroll
function sectionsObserverFunction(entries, observer) {
  entries.forEach(entry => {
    if (!entry?.isIntersecting) return;
    else entry.target.classList.remove('section--hidden');
    //unobserve would stop observing each section that we already saw
    observer.unobserve(entry.target);
  });
}
const sectionsObserver = new IntersectionObserver(sectionsObserverFunction, {
  root: null,
  threshold: 0.15,
});

sections.forEach(section => {
  sectionsObserver.observe(section);
  section.classList.add('section--hidden');
});

/*TODO: this func is very IMPORTANT this will be called on imgs and we approach them based on observer and once
they are appoarch their intial src which is set to low resultion img will be set to high resultion img whose address
is stored in data-set attr of imgaes, once src is changed we call eventHandler for load event on imges and when pic
is loaded then we remove .lazy-img class which simply bulr low resultion img until high resultion in loaded*/
function imgObserverFunction(entries, observer) {
  entries.forEach(entry => {
    if (!entry?.isIntersecting) return;
    //set src of img to high resultion which is stored in data-src attr
    entry.target.src = entry.target.dataset.src;
    //waiting for img to load and then removing lazy-img class which simply blur low resultion img
    entry.target.addEventListener('load', () => {
      entry.target.classList.remove('lazy-img');
      //unobserve since imgs are already loaded
      observer.unobserve(entry.target);
    });
  });
}

//this rootMagrin : -200 means the handler will be called 200 px before we reach the threshold
const imgObserver = new IntersectionObserver(imgObserverFunction, {
  root: null,
  threshold: 0.2,
  rootMargin: '-200px',
});

featureImgs.forEach(img => {
  imgObserver.observe(img);
});

//slider feature
//first I hide all slide so overflow is not visible
slides.forEach(s => {
  s.style.visibility = 'hidden';
});
let curSlide = 0;
//sectionSlider.style.overflow = 'hidden';

//Add dots to slider
dotsContainer.innerHTML = '';
slides.forEach((_, i) => {
  dotsContainer.insertAdjacentHTML(
    'beforeend',
    `<button class="dots__dot" data-slide="${i}"></button>`
  );
});

//Adding Slider component

function goToSlide() {
  //if this keyword is 1 to go right
  //if this keyword is -1 for left btn
  //when we load for the FIRST time this keyword is 0 only to set everything in right position
  //next if checks if we are in firth or last slide and user wants to go further
  if ((curSlide === 2 && this > 0) || (curSlide === 0 && this < 0)) return;
  if (this !== 0) {
    //first make btns visible and if this is not 0 so set curSlide to slide that we wanna go
    btnSliderRight.style.visibility = 'visible';
    btnSliderLeft.style.visibility = 'visible';
    //in next line technicaly we say which slide we wanna go, the after sliding current, not the one we are in
    this > 0 ? curSlide++ : curSlide--;
  }
  //if the slide we wanna go is last or first hide btn left or right and return so no moves are made
  switch (curSlide) {
    case 0:
      btnSliderLeft.style.visibility = 'hidden';
      break;
    case 2:
      btnSliderRight.style.visibility = 'hidden';
      break;
  }

  //first Reomve activeDot class from all dots and then add activeDot class to the dot same as curSlide (now that curSlide is set)
  document.querySelectorAll('.dots__dot').forEach(dot => {
    dot.classList.remove('dots__dot--active');
  });
  document
    .querySelector(`.dots__dot[data-slide="${curSlide}"]`)
    .classList.add('dots__dot--active');
  //based on current slide we konw where we wanna go so with translateX we move
  slides.forEach((slide, i) => {
    //translateX property for each slide
    //right direction: first: 0, 100, 200 and second: -100, 0 , 100 and third: -200, -100 , 0
    //left reserve of up

    //these slides are all on top of each other so we translateX to show them in a row
    slide.style.transform = `translateX(${100 * (i - curSlide)}%)`;
  });

  //after 1 sec when first transition is complete , make slides vivilbe
  setTimeout(() => {
    slides.forEach(s => {
      s.style.visibility = 'visible';
    });
  }, 1000);
}

goToSlide.bind(0)();

//sliding with right and left Btns
btnSliderRight.addEventListener('click', goToSlide.bind(1));
btnSliderLeft.addEventListener('click', goToSlide.bind(-1));

//sliding with right and left arrow keys
document.addEventListener('keydown', e => {
  switch (e.key) {
    case 'ArrowRight':
      goToSlide.bind(1)();
      break;

    case 'ArrowLeft':
      goToSlide.bind(-1)();
      break;
  }
});

//slding with dots

//add event listener to the dots parent element which is dotsContainer
function dotSliding(e) {
  //check if user has clicked out side of dots in dotContainer (Matching Strategy) || if we aleady are in the same slice as clicked
  const selectedSlide = Number(e.target.dataset.slide);
  if (!e.target.classList.contains('dots__dot') || selectedSlide === curSlide)
    return;
  if (e.target.dataset.slide > curSlide) {
    //set the curslide to one after the selected and go left with goToSlide method
    curSlide = selectedSlide + 1;
    goToSlide.bind(-1)();
  } else {
    //set the curslide to one before the selected and go Right with goToSlide method
    curSlide = selectedSlide - 1;
    goToSlide.bind(1)();
  }
}

dotsContainer.addEventListener('click', dotSliding);

//asking user are you sure to leave
/* window.addEventListener('beforeunload', event => {
  event.returnValue = '';
}); */
