const navbar = document.querySelector(".navbar");
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
    currentLink = navbar.querySelector(`a[href='#${entry.target.id}']`);

    if (currentLink && entry.intersectionRatio > 0) {
      navbar.querySelectorAll(".is-visible").forEach((element) => element.classList.remove("is-visible"));
      currentLink.classList.add("is-visible");
      history.replaceState(null, "", currentLink.getAttribute("href"));
    }
  }
}, { rootMargin: "100px 0px -66% 0px" });

document.querySelectorAll(".maincontent-content > [id]")
  .forEach((section) => menuObserver.observe(section));