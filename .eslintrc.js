module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: "babel-eslint",
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    }
  },
  extends: [
    "eslint:recommended"
  ],
  plugins: [
    "react"
  ],
  rules: {
    "no-console": 1,
    "no-unused-vars": 1
  }
};