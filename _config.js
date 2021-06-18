import lume from "lume/mod.js";
import postcss from "lume/plugins/postcss.js";
import inline from "lume/plugins/inline.js";
import date from "lume/plugins/date.js";
import base_path from "lume/plugins/base_path.js";
import attributes from "lume/plugins/attributes.js";
import slugify_urls from "lume/plugins/slugify_urls.js";

const site = lume({
  location: "https://tarugoconf.com"
});

site
  .ignore("README.md")
  .copy("js")
  .copy("img")
  .copy("admin")
  .copy("favicons", ".")
  .use(inline())
  .use(date())
  .use(postcss())
  .use(base_path())
  .use(attributes())
  .use(slugify_urls())
  .data("now", new Date());

export default site;
