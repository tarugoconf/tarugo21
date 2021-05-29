import copy from "./clipboard.js";

class Copy extends HTMLElement {
  connectedCallback() {
    this.addEventListener("click", (ev) => {
      const data = this.dataset.text.trim();
      copy(data);
      ev.preventDefault();
      this.classList.add("is-copied");
      setTimeout(() => this.classList.remove("is-copied"), 3000);
    })
  }
}

customElements.define("tarugo-copy", Copy);