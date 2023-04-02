var cssnano = require("cssnano");
var postcss = require("postcss");

/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = () => {
  // Work with options here

  return {
    postcssPlugin: "postcss-test",

    Root(root) {
      const whitelist = new Set(["*,:before,:after", "*,:after,:before"]);
      let selectors = new Set();
      let duplicates = new Set();

      postcss([cssnano])
        .process(root.toString())
        .then((result) => {
          postcss.parse(result.css).walkRules((rule) => {
            if (selectors.has(rule.selector) && !whitelist.has(rule.selector)) {
              duplicates.add(rule.selector);
            }
            selectors.add(rule.selector);
          });

          if (duplicates.size > 0) {
            throw new Error(
              `🤌  You have duplicate css selectors!: ${[...duplicates].join(
                ", "
              )}`
            );
          }
        });
    },
  };
};

module.exports.postcss = true;
