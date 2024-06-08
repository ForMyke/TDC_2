import json from "@rollup/plugin-json";

export default {
  input: "src/index.js",
  output: {
    file: "public/bundle.js",
    format: "iife",
    name: "MyBundle",
  },
  plugins: [json()],
};
