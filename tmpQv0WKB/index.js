/**
 * @type {import('postcss').PluginCreator}
 */
module.exports = (opts = {}) => {
  // Work with options here

  return {
    postcssPlugin: "postcss-test",

    Root(root) {
      let selectors = new Set();
      // Transform CSS AST here
      root.walkRules((rule) => {
        if (selectors.has(rule.selector))
          console.error(`selector already used: ${rule.selector}`);
        selectors.add(rule.selector);
      });

      console.log(selectors);
    },

    /*
    Declaration (decl, postcss) {
      // The faster way to find Declaration node
    }
    */

    /*
    Declaration: {
      color: (decl, postcss) {
        // The fastest way find Declaration node if you know property name
      }
    }
    */
  };
};

module.exports.postcss = true;
