"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const openModal = function (event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

btnScrollTo.addEventListener("click", () => {
  const s1coords = section1.getBoundingClientRect();

  // Old way
  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: "smooth"
  // });

  // Modern way
  section1.scrollIntoView({behavior: "smooth"});
});

// document.querySelector(".nav__link").addEventListener("click", function(event) {
//   this.style.backgroundColor = "red";
//   console.log("LINK", event.target);
//   console.log("LINK", event.currentTarget);
//   console.log("LINK", event.target === this);
//
//   // Stop propagation
//   // event.stopPropagation();
// });
// document.querySelector(".nav__links").addEventListener("click", function(event) {
//   this.style.backgroundColor = "green";
//   console.log("CONTAINER", event.target);
//   console.log("LINK", event.currentTarget);
//   console.log("CONTAINER", event.target === this);
// });

// document.querySelectorAll(".nav__link")
//   .forEach((el) => {
//     el.addEventListener("click", function(event) {
//       event.preventDefault();
//       const id = this.getAttribute("href");
//       document.querySelector(id).scrollIntoView({ behavior: "smooth" });
//     });
//   });

// OR
document.querySelector(".nav__links").addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.classList.contains("nav__link")) {
    const id = event.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({behavior: "smooth"});
  }
});

// Tabbed component
const tabs = document.querySelectorAll(".operations__tab");
const tabsContainer = document.querySelector(".operations__tab-container");
const tabsContent = document.querySelectorAll(".operations__content");

tabsContainer.addEventListener("click", function (event) {
  const clicked = event.target.closest(".operations__tab");

  if (!clicked) {
    return;
  }

  tabs.forEach(tab => tab.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  tabsContent.forEach(tab => tab.classList.remove("operations__content--active"));
  document.querySelector(`.operations__content--${clicked.dataset.tab}`).classList.add("operations__content--active");
});

// Menu fade animation
const nav = document.querySelector(".nav");

function handleHover(event) {
  if (event.target.classList.contains("nav__link")) {
    const link = event.target;
    const subLinks = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");

    subLinks.forEach(subLink => {
      if (subLink !== link) {
        subLink.classList.opacity = this;
      }
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", handleHover.bind(0.5));
nav.addEventListener("mouseout", handleHover.bind(1));

// Sticky navigation

// Old way
/*const initialCoords = section1.getBoundingClientRect();

window.addEventListener("scroll", function (event) {
  if(window.scrollY > initialCoords.top) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});*/

// Modern way
const header = document.querySelector(".header");
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;

  if (!entry.isIntersecting) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
};

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
});
headerObserver.observe(header);

// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.remove("section--hidden");
      observer.unobserve(entry.target);
    }
  });
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
})

// Lazy image loading
const imgTargets = document.querySelectorAll("img[data-src]");

const loadImg = function (entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;

      entry.target.addEventListener("load", function () {
        entry.target.classList.remove("lazy-img");
      });

      observer.unobserve(entry.target);
    }
  });
}

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px'
});

imgTargets.forEach(img => imgObserver.observe(img));

// Slider
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let curSlide = 0;
const masSlides = slides.length;

function createDots() {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML("beforeend",
      `<button class="dots__dot" data-slide="${i}"></button>`);
  })
}

createDots();

function activeDot(slideIndex) {
  document.querySelectorAll(".dots__dot")
    .forEach(dot => dot.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${slideIndex}"]`)
    .classList.add("dots__dot--active");
}

function goToSlide(slideIndex) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - slideIndex)}%)`;
  })
}

goToSlide(curSlide);
activeDot(curSlide);

function nextSlide() {
  if (curSlide === masSlides - 1) {
    curSlide = 0;
  } else {
    curSlide++;
  }

  goToSlide(curSlide);
  activeDot(curSlide);
}

function prevSlide() {
  if (curSlide === 0) {
    curSlide = masSlides - 1;
  } else {
    curSlide--;
  }

  goToSlide(curSlide);
  activeDot(curSlide);
}

btnRight.addEventListener("click", nextSlide);
btnLeft.addEventListener("click", prevSlide);

document.addEventListener("keydown", function (event) {
  if (event.key === "ArrowLeft") {
    prevSlide();
  } else if (event.key === "ArrowRight") {
    nextSlide();
  }
});

dotContainer.addEventListener("click", function (event) {
  if (event.target.classList.contains("dots__dot")) {
    curSlide = Number(event.target.dataset.slide);
    goToSlide(curSlide);
    activeDot(curSlide);
  }
});