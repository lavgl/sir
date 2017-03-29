module.exports = {
  env: {
    browser: true,
    node: true,
    es6: true
  },
  parser: "babel-eslint",
  extends: [
    "eslint:recommended"
  ],
  plugins: [
    "react"
  ],
  rules: {
    "no-console": 1
  }
};