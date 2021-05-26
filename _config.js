import lume from "lume/mod.js";
import postcss from "lume/plugins/postcss.js";
import inline from "lume/plugins/inline.js";

const site = lume();

site
  .ignore("README.md")
  .copy("js")
  .copy("img")
  .copy("admin")
  .use(inline())
  .use(postcss());

export default site;
