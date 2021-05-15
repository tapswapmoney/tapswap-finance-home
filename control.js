const mainNav = document.getElementById("mainnav");
const logoColumn = document.getElementById("logo-column");
const navBtn = document.querySelector(".burger-button");
const navBtnChild = document.querySelector("#navigation-button");

var mainNavOpen = false;

navBtn.addEventListener("click", toggleNav);

window.addEventListener("load", () => {
  mainNav.style.left = `-250px`;
  mainNavOpen = false;
});

window.addEventListener("resize", () => {
  mainNav.style.left = `-250px`;
  mainNavOpen = false;
});

function toggleNav() {
  if (mainNavOpen) {
    mainNav.style.left = "-250px";
    mainNavOpen = false;
    navBtnChild.classList.add("ti-align-right");
    navBtnChild.classList.remove("ti-close");
  } else {
    /**
     * if close --> open
     */
    navBtnChild.classList.remove("ti-align-right");
    navBtnChild.classList.add("ti-close");
    mainNav.style.left = "0vw";
    mainNavOpen = true;
  }
}

$(document).ready(function () {
  $(".roadmap-slider").slick({
    infinite: false,
    speed: 300,
    slidesToShow: 1,
    adaptiveHeight: true,
    slidesToShow: 3,
    autoplay: true,
    autoplaySpeed: 2000,
  });
});
