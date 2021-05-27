import Carousel from "./carousel.js";
import Player from "./player.js";

//Carousel
customElements.define("tarugo-carousel", Carousel);

document.querySelectorAll("tarugo-carousel").forEach((carousel) => {
  const player = new Player(carousel);
  player.play();

  const next = carousel.parentElement.querySelector(".js-carousel-next");
  const prev = carousel.parentElement.querySelector(".js-carousel-prev");

  next.addEventListener("click", (e) => {
    player.stop();
    carousel.next();
  });
  prev.addEventListener("click", (e) => {
    player.stop();
    carousel.prev();
  });

  //Disable buttons
  let isScrolling;

  carousel.addEventListener(
    "scroll",
    (event) => {
      clearTimeout(isScrolling);
      isScrolling = setTimeout(showHideButtons, 100);
    },
    false,
  );

  function showHideButtons() {
    prev.disabled = carousel.scrollFromLeft < 5;
    next.disabled = carousel.scrollFromRight < 5;
  }

  showHideButtons();
});
