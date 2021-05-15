import lume from "lume/mod.js";
import postcss from "lume/plugins/postcss.js";

const site = lume();

site
  .ignore("README.md")
  .copy("js")
  .use(postcss());

export default site;
