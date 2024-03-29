module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
  },
  extends: [
    "airbnb-base",
    "eslint:recommended",
  ],
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: "latest",
  },
  rules: {
    semi: ["error", "always"],
    quotes: ["error", "double"],
    indent: "off",
  },
};
