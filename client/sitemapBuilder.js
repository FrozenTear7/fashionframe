require("@babel/register")({
  ignore: [/\/(build|node_modules)\//],
  presets: ["@babel/preset-env", "@babel/preset-react"],
  plugins: [
    "@babel/plugin-syntax-dynamic-import",
    "dynamic-import-node",
    "@babel/plugin-transform-runtime"
  ]
});

const router = require("./src/components/core/router.js").default;
const Sitemap = require("./src").default;

new Sitemap(router)
  .build("https://fashionframe.herokuapp.com")
  .save("./sitemap.xml");
