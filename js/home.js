const navbar = document.querySelector(".navbar");
const menu = document.querySelector(".navbar-menu");
let currentLink;

const ctaObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.intersectionRatio > 0) {
      navbar.classList.remove("is-sticky");
      history.replaceState(null, "", "/");
    } else {
      navbar.classList.add("is-sticky");
      if (currentLink) {
        history.replaceState(null, "", currentLink.getAttribute("href"));
      }
    }
  }
}, { threshold: [0, 0.5, 1] });

ctaObserver.observe(document.querySelector(".project-actions"));

// Marcar a opción actual no menú
const menuObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    currentLink = menu.querySelector(`a[href='#${entry.target.id}']`);

    if (currentLink && entry.intersectionRatio > 0) {
      menu.querySelectorAll(".is-visible").forEach((element) =>
        element.classList.remove("is-visible")
      );
      currentLink.classList.add("is-visible");
      history.replaceState(null, "", currentLink.getAttribute("href"));
    }
  }
}, { rootMargin: "100px 0px -66% 0px" });

document.querySelectorAll(".maincontent-content > [id]")
  .forEach((section) => menuObserver.observe(section));

// Abrir e cerrar o menú en móbil
const menuBtn = document.querySelector(".navbar-menu-button");

menuBtn.addEventListener("click", (event) => {
  menu.classList.add("is-open");
  event.stopPropagation();
});
menu.addEventListener("click", (event) => {
  if (event.target.matches("a")) {
    setTimeout(() => menu.classList.remove("is-open"), 100);
  }
  event.stopPropagation()
});
document.body.addEventListener("click", () => menu.classList.remove("is-open"));

