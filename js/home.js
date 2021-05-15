const navbar = document.querySelector(".navbar");
const ctaObserver = new IntersectionObserver((entries) => {
  for (const entry of entries) {
    if (entry.intersectionRatio > 0) {
      navbar.classList.remove("is-sticky");
    } else {
      navbar.classList.add("is-sticky");
    }
  }
}, { threshold: [0, 0.5, 1] });

ctaObserver.observe(document.querySelector(".project-actions"));
