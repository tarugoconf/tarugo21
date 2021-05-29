import lume from "lume/mod.js";
import postcss from "lume/plugins/postcss.js";
import inline from "lume/plugins/inline.js";
import date from "lume/plugins/date.js";

const site = lume();

site
  .ignore("README.md")
  .copy("js")
  .copy("img")
  .copy("admin")
  .use(inline())
  .use(date())
  .use(postcss())
  .data("now", new Date());

export default site;
