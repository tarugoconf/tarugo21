class Img extends HTMLElement {
  connectedCallback() {
    this.image = this.querySelector("img");
    this.canvas = document.createElement("canvas");
    const style = document.createElement("style");
    style.innerHTML = `
    canvas {
      display: block;
      width: 100%;
      height: auto;
    }
    `;

    const shadow = this.attachShadow({ mode: "open" });
    shadow.appendChild(this.canvas);
    shadow.appendChild(style);

    if (this.image.complete) {
      this.init();
    } else {
      this.image.addEventListener("load", () => this.init());
    }
  }

  init() {
    const ctx = this.canvas.getContext("2d");
    const width = this.image.naturalWidth;
    const height = this.image.naturalHeight;
    this.canvas.width = width;
    this.canvas.height = height;
    ctx.drawImage(this.image, 0, 0, width, height);

    const imageData = ctx.getImageData(0, 0, width, height);

    const size = 30;
    let paused = true;
    const animated = this.hasAttribute("animated");

    function animate() {
      if (paused) {
        ctx.putImageData(imageData, 0, 0);
        return;
      }

      ctx.putImageData(
        rgbSplit(imageData, {
          rOffset: offset(0, size),
          gOffset: offset(0, size),
          bOffset: offset(0, size),
        }),
        0,
        0,
      );
      
      if (animated) {
        requestAnimationFrame(animate);
      }
    }

    this.addEventListener("mouseenter", () => {
      paused = false;
      animate();
    });
    this.addEventListener("mouseleave", () => {
      paused = true;
      animate();
    });
  }
}

customElements.define("tarugo-img", Img);

function offset(current, size) {
  const limit = size * 5;
  current += Math.round(Math.random() * size) * (Math.random() > 0.5 ? 1 : -1);

  return Math.max(-limit, Math.min(current, limit));
}

function rgbSplit(imageData, options) {
  const { rOffset = 0, gOffset = 0, bOffset = 0 } = options;
  const originalArray = imageData.data;
  const newArray = new Uint8ClampedArray(originalArray);

  for (let i = 0; i < originalArray.length; i += 4) {
    newArray[i + 0 + rOffset * 4] = originalArray[i + 0]; // 🔴
    newArray[i + 1 + gOffset * 4] = originalArray[i + 1]; // 🟢
    newArray[i + 2 + bOffset * 4] = originalArray[i + 2]; // 🔵
  }

  return new ImageData(newArray, imageData.width, imageData.height);
}
