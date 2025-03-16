"use strict";

///////////////////////////////////////
// Modal window

const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");

const openModal = function(event) {
  event.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function() {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btn) => btn.addEventListener("click", openModal));

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function(e) {
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

  //Modern wat
  section1.scrollIntoView({ behavior: "smooth" });
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
document.querySelector(".nav__links").addEventListener("click", function(event) {
  event.preventDefault();
  if (event.target.classList.contains("nav__link")) {
    const id = event.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});