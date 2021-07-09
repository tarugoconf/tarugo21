import lume from "lume/mod.ts";
import postcss from "lume/plugins/postcss.ts";
import inline from "lume/plugins/inline.ts";
import date from "lume/plugins/date.ts";
import base_path from "lume/plugins/base_path.ts";
import attributes from "lume/plugins/attributes.ts";
import slugify_urls from "lume/plugins/slugify_urls.ts";

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
  .use(slugify_urls());

export default site;
