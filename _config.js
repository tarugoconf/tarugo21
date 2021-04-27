import lume from "https://deno.land/x/lume@v0.18.1/mod.js";
import postcss from "https://deno.land/x/lume@v0.18.1/plugins/postcss.js";

const site = lume();

site
  .ignore("README.md")
  .use(postcss());

export default site;
