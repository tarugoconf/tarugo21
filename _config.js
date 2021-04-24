import lume from "https://deno.land/x/lume@v0.18.0/mod.js";
import postcss from "https://deno.land/x/lume@v0.18.0/plugins/postcss.js";

const site = lume();

site.use(postcss());

export default site;
