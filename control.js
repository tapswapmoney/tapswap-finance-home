const mainNav = document.getElementById("mainnav");
const logoColumn = document.getElementById("logo-column");
const navBtn = document.querySelector(".burger-button");

var mainNavOpen = false;

navBtn.addEventListener("click", toggleNav);
mainNav.addEventListener("load", toggleNav);

window.addEventListener("load", () => {
  mainNav.style.left = "-13vw";
  mainNavOpen = false;
  console.log(mainNavOpen);
});

function toggleNav() {
  if (mainNavOpen) {
    mainNav.style.left = "-13vw";
    mainNavOpen = false;
  } else {
    /**
     * if close --> open
     */
    mainNav.style.left = "0vw";
    mainNavOpen = true;
  }
}
