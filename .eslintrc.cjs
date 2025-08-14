/* eslint-env node */
module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-prettier",
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  env: {
    "vue/setup-compiler-macros": true,
  },
  ignorePatterns: ["backup/**/*", "dist/**/*"],
  rules: {
    "vue/multi-word-component-names": "off",
    "no-prototype-builtins": "off",
  },
};
