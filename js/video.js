import Player from "./vimeo-player.es.js";

//Videos vimeo
const primaryColor = getComputedStyle(document.documentElement).getPropertyValue('--color-primary');
const color = primaryColor.replace('#', '').trim();

//Vimeo player
document.querySelectorAll('.video').forEach((el) => {
  el.addEventListener("click", () => {
    el.innerHTML = "";
    el.classList.add("is-loaded");
    new Player(el.id, {
      id: el.dataset.id,
      autoplay: true,
      title: false,
      byline: false,
      portrait: false,
      dnt: true,
      color,
    })
  }, { once: true })
});