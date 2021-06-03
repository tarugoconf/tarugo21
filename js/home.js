import dialogPolyfill from './dialog-polyfill.esm.js';

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
    if (entry.intersectionRatio > 0) {
      history.replaceState(null, "", `#${entry.target.id}`);

      currentLink = menu.querySelector(`a[href='#${entry.target.id}']`);
  
      if (currentLink) {
        menu.querySelectorAll(".is-visible").forEach((element) =>
          element.classList.remove("is-visible")
        );
        currentLink.classList.add("is-visible");
      }
    }
  }
}, { rootMargin: "100px 0px -66% 0px" });

document.querySelectorAll(".maincontent-content > [id]")
  .forEach((section) => menuObserver.observe(section));


// Diálogos
document.querySelectorAll('dialog').forEach((dialog) => {
  dialogPolyfill.registerDialog(dialog);
});

document.querySelectorAll(".js-openDialog").forEach((btn) => {
  btn.addEventListener("click", (ev) => {
    const dialog = document.getElementById(btn.dataset.target);

    if (dialog) {
      dialog.showModal();
    }
  })
})
document.querySelectorAll(".js-closeDialog").forEach((btn) => {
  btn.addEventListener("click", (ev) => {
    const dialog = btn.closest("dialog");

    if (dialog) {
      dialog.close();
    }
  })
})
