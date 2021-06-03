// Abrir e cerrar o menú en móbil
const menuBtn = document.querySelector(".navbar-menu-button");
const menu = document.querySelector(".navbar-menu");

menuBtn.addEventListener("click", (event) => {
  menu.classList.add("is-open");
  event.stopPropagation();
});
menu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    setTimeout(() => menu.classList.remove("is-open"), 100);
  }
  event.stopPropagation();
});
document.body.addEventListener("click", () => menu.classList.remove("is-open"));
